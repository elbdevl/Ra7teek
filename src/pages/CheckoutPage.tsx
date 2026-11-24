
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { supabase } from '@/lib/supabase';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { ArrowRight, Truck, Shield, Phone, Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const STRIPE_ACCOUNT_ID = 'STRIPE_ACCOUNT_ID';
const stripePromise = STRIPE_ACCOUNT_ID && STRIPE_ACCOUNT_ID !== 'STRIPE_ACCOUNT_ID'
  ? loadStripe('pk_live_51OJhJBHdGQpsHqInIzu7c6PzGPSH0yImD4xfpofvxvFZs0VFhPRXZCyEgYkkhOtBOXFWvssYASs851mflwQvjnrl00T6DbUwWZ', { stripeAccount: STRIPE_ACCOUNT_ID })
  : null;

const PROJECT_ID = '69d00a2d9d598beb9e85da92';

function CheckoutPaymentForm({ onSuccess, total }: { onSuccess: (pi: any) => void; total: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError('');

    const { error: submitError, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (submitError) {
      setError(submitError.message || 'خطأ في الدفع');
      setLoading(false);
    } else if (paymentIntent?.status === 'succeeded') {
      onSuccess(paymentIntent);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {error && <p className="text-red-500 mt-3 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full mt-4 gradient-green text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50 hover:opacity-90 transition-all"
      >
        {loading ? 'جاري المعالجة...' : `ادفع ${(total / 100).toFixed(0)} درهم`}
      </button>
    </form>
  );
}

const CheckoutPage: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<'cart' | 'shipping' | 'payment'>('cart');
  const [clientSecret, setClientSecret] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const [shippingCost, setShippingCost] = useState(0);
  const [tax, setTax] = useState(0);
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'المغرب',
  });

  const subtotal = cartTotal;
  const total = subtotal + shippingCost + tax;

  // Calculate shipping (free)
  useEffect(() => {
    if (cart.length > 0) {
      supabase.functions.invoke('calculate-shipping', {
        body: {
          cartItems: cart.map(item => ({ name: item.name, quantity: item.quantity, price: item.price })),
          shippingRules: 'Free shipping on all orders',
          subtotal,
        },
      }).then(({ data }) => {
        if (data?.success) setShippingCost(data.shippingCents);
      });
    }
  }, [cart, subtotal]);

  const handleShippingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingAddress.name || !shippingAddress.phone || !shippingAddress.city || !shippingAddress.address) {
      toast({ title: 'خطأ', description: 'المرجو ملء جميع الحقول المطلوبة', variant: 'destructive' });
      return;
    }

    // Calculate tax
    const { data: taxData } = await supabase.functions.invoke('calculate-tax', {
      body: { subtotal, state: shippingAddress.state },
    });
    if (taxData?.success) setTax(taxData.taxCents);

    const orderTotal = subtotal + shippingCost + (taxData?.taxCents || 0);

    // Create payment intent
    const { data, error } = await supabase.functions.invoke('create-payment-intent', {
      body: { amount: orderTotal, currency: 'mad' },
    });

    if (error || !data?.clientSecret) {
      setPaymentError('تعذر تهيئة الدفع. يرجى المحاولة لاحقاً.');
      setStep('payment');
      return;
    }

    setClientSecret(data.clientSecret);
    setStep('payment');
  };

  const handlePaymentSuccess = async (paymentIntent: any) => {
    try {
      // Create customer
      const { data: customer } = await supabase
        .from('ecom_customers')
        .upsert(
          { email: shippingAddress.email || `${shippingAddress.phone}@ra7teek.ma`, name: shippingAddress.name, phone: shippingAddress.phone },
          { onConflict: 'email' }
        )
        .select('id')
        .single();

      // Create order
      const { data: order } = await supabase
        .from('ecom_orders')
        .insert({
          customer_id: customer?.id,
          status: 'paid',
          subtotal,
          tax,
          shipping: shippingCost,
          total,
          shipping_address: shippingAddress,
          stripe_payment_intent_id: paymentIntent.id,
        })
        .select('id')
        .single();

      if (order) {
        const orderItems = cart.map(item => ({
          order_id: order.id,
          product_id: item.product_id,
          variant_id: item.variant_id || null,
          product_name: item.name,
          variant_title: item.variant_title || null,
          sku: item.sku || null,
          quantity: item.quantity,
          unit_price: item.price,
          total: item.price * item.quantity,
        }));
        await supabase.from('ecom_order_items').insert(orderItems);

        // Send confirmation email
        const { data: orderItemsData } = await supabase
          .from('ecom_order_items')
          .select('*')
          .eq('order_id', order.id);

        try {
          await fetch(`https://famous.ai/api/ecommerce/${PROJECT_ID}/send-confirmation`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderId: order.id,
              customerEmail: shippingAddress.email || `${shippingAddress.phone}@ra7teek.ma`,
              customerName: shippingAddress.name,
              orderItems: orderItemsData,
              subtotal,
              shipping: shippingCost,
              tax,
              total,
              shippingAddress,
            }),
          });
        } catch (e) {
          console.error('Email send error:', e);
        }

        clearCart();
        navigate(`/order-confirmation?orderId=${order.id}`);
      }
    } catch (err) {
      console.error('Order creation error:', err);
      toast({ title: 'خطأ', description: 'حدث خطأ أثناء إنشاء الطلب', variant: 'destructive' });
    }
  };

  if (cart.length === 0 && step === 'cart') {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center px-4">
        <div className="text-center bg-white rounded-3xl p-10 shadow-xl max-w-md w-full">
          <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold mb-2">السلة فارغة</h2>
          <p className="text-gray-500 mb-6">ما عندك حتى منتج فالسلة</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 gradient-green text-white px-6 py-3 rounded-full font-bold hover:opacity-90 transition-all"
          >
            <ArrowRight size={18} />
            رجع للمتجر
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-hero py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center gap-2 text-green-800 font-bold hover:text-green-600 transition-colors">
            <ArrowRight size={20} />
            رجع للمتجر
          </Link>
          <span className="text-2xl font-black text-gradient-green">ra7teek</span>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {['السلة', 'العنوان', 'الدفع'].map((label, i) => {
            const stepNames = ['cart', 'shipping', 'payment'] as const;
            const currentStepIndex = stepNames.indexOf(step);
            const isActive = i <= currentStepIndex;
            return (
              <React.Fragment key={i}>
                <div className={`flex items-center gap-2 ${isActive ? 'text-green-700' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isActive ? 'gradient-green text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {i + 1}
                  </div>
                  <span className="text-sm font-medium hidden sm:inline">{label}</span>
                </div>
                {i < 2 && <div className={`w-8 md:w-16 h-0.5 ${i < currentStepIndex ? 'bg-green-500' : 'bg-gray-200'}`} />}
              </React.Fragment>
            );
          })}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2">
            {/* Cart Step */}
            {step === 'cart' && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-6">السلة ديالك</h2>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.product_id + (item.variant_id || '')} className="flex items-center gap-4 bg-gray-50 rounded-xl p-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                      <div className="flex-1">
                        <h3 className="font-bold">{item.name}</h3>
                        {item.variant_title && <p className="text-sm text-gray-500">{item.variant_title}</p>}
                        <p className="text-green-700 font-bold">{(item.price / 100).toFixed(0)} درهم</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(item.product_id, item.quantity - 1, item.variant_id)} className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300">
                          <Minus size={14} />
                        </button>
                        <span className="font-bold w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product_id, item.quantity + 1, item.variant_id)} className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300">
                          <Plus size={14} />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.product_id, item.variant_id)} className="text-red-400 hover:text-red-600 p-2">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setStep('shipping')}
                  className="w-full mt-6 gradient-green text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all"
                >
                  متابعة الطلب
                </button>
              </div>
            )}

            {/* Shipping Step */}
            {step === 'shipping' && (
              <form onSubmit={handleShippingSubmit} className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-6">عنوان التوصيل</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium mb-1">الاسم الكامل *</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.name}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                      placeholder="الاسم الكامل"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">رقم الهاتف *</label>
                    <input
                      type="tel"
                      required
                      dir="ltr"
                      value={shippingAddress.phone}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-left"
                      placeholder="+212 6XX XXX XXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">البريد الإلكتروني</label>
                    <input
                      type="email"
                      dir="ltr"
                      value={shippingAddress.email}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-left"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium mb-1">العنوان *</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.address}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                      placeholder="الشارع، الحي، رقم المنزل"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">المدينة *</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                      placeholder="المدينة"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">الرمز البريدي</label>
                    <input
                      type="text"
                      dir="ltr"
                      value={shippingAddress.zip}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, zip: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-left"
                      placeholder="XXXXX"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setStep('cart')}
                    className="px-6 py-3 rounded-xl border border-gray-200 font-medium hover:bg-gray-50 transition-colors"
                  >
                    رجوع
                  </button>
                  <button
                    type="submit"
                    className="flex-1 gradient-green text-white py-3 rounded-xl font-bold text-lg hover:opacity-90 transition-all"
                  >
                    متابعة للدفع
                  </button>
                </div>
              </form>
            )}

            {/* Payment Step */}
            {step === 'payment' && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-6">الدفع</h2>

                {!stripePromise ? (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
                    <p className="text-yellow-800 font-medium mb-2">نظام الدفع قيد الإعداد</p>
                    <p className="text-yellow-600 text-sm mb-4">يمكنك الطلب عبر واتساب في الوقت الحالي</p>
                    <a
                      href={`https://wa.me/212700720490?text=سلام، بغيت نطلب ra7teek بلسم المفاصل. الاسم: ${shippingAddress.name}, المدينة: ${shippingAddress.city}, الهاتف: ${shippingAddress.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition-colors"
                    >
                      <Phone size={20} />
                      اطلب عبر واتساب
                    </a>
                  </div>
                ) : paymentError ? (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                    <p className="text-red-800 font-medium mb-2">{paymentError}</p>
                    <a
                      href={`https://wa.me/212700720490?text=سلام، بغيت نطلب ra7teek بلسم المفاصل. الاسم: ${shippingAddress.name}, المدينة: ${shippingAddress.city}, الهاتف: ${shippingAddress.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition-colors mt-3"
                    >
                      <Phone size={20} />
                      اطلب عبر واتساب
                    </a>
                  </div>
                ) : clientSecret ? (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutPaymentForm onSuccess={handlePaymentSuccess} total={total} />
                  </Elements>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                    <p className="text-gray-500">جاري تحميل نموذج الدفع...</p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="mt-4 px-6 py-3 rounded-xl border border-gray-200 font-medium hover:bg-gray-50 transition-colors"
                >
                  رجوع
                </button>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="font-bold text-lg mb-4">ملخص الطلب</h3>

              {cart.map((item) => (
                <div key={item.product_id + (item.variant_id || '')} className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">x{item.quantity}</p>
                  </div>
                  <span className="text-sm font-bold">{((item.price * item.quantity) / 100).toFixed(0)} د.م</span>
                </div>
              ))}

              <div className="space-y-2 text-sm mt-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">المجموع الفرعي</span>
                  <span>{(subtotal / 100).toFixed(0)} د.م</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>التوصيل</span>
                  <span className="font-bold">مجاني</span>
                </div>
                {tax > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">الضريبة</span>
                    <span>{(tax / 100).toFixed(0)} د.م</span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between text-lg font-bold">
                  <span>المجموع</span>
                  <span className="text-green-700">{(total / 100).toFixed(0)} د.م</span>
                </div>
              </div>

              {/* Trust badges */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Truck size={14} className="text-green-600" />
                  <span>توصيل مجاني لجميع المدن</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Shield size={14} className="text-green-600" />
                  <span>دفع آمن ومحمي</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
