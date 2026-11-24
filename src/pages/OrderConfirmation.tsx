
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { CheckCircle, Package, Phone, ArrowRight } from 'lucide-react';

const OrderConfirmation: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (orderId) {
      supabase
        .from('ecom_orders')
        .select('*, items:ecom_order_items(*)')
        .eq('id', orderId)
        .single()
        .then(({ data }) => {
          if (data) setOrder(data);
        });
    }
  }, [orderId]);

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full bg-white rounded-3xl p-8 shadow-xl text-center">
        {/* Success icon */}
        <div className="w-20 h-20 rounded-full gradient-green flex items-center justify-center mx-auto mb-6 shadow-green">
          <CheckCircle size={40} className="text-white" />
        </div>

        <h1 className="text-3xl font-black mb-2 text-green-800">شكراً على طلبك!</h1>
        <p className="text-gray-500 mb-6">تم تأكيد طلبك بنجاح وغادي نتواصلو معاك قريباً</p>

        {orderId && (
          <div className="bg-green-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-500">رقم الطلب</p>
            <p className="font-mono font-bold text-green-800 text-sm break-all">{orderId}</p>
          </div>
        )}

        {order && (
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-right">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <Package size={18} className="text-green-600" />
              تفاصيل الطلب
            </h3>
            {order.items?.map((item: any) => (
              <div key={item.id} className="flex justify-between py-1 text-sm">
                <span>{item.product_name} x{item.quantity}</span>
                <span className="font-bold">{(item.total / 100).toFixed(0)} د.م</span>
              </div>
            ))}
            <div className="border-t mt-2 pt-2 flex justify-between font-bold">
              <span>المجموع</span>
              <span className="text-green-700">{(order.total / 100).toFixed(0)} د.م</span>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full gradient-green text-white py-3 rounded-xl font-bold hover:opacity-90 transition-all"
          >
            <ArrowRight size={18} />
            رجع للصفحة الرئيسية
          </Link>

          <a
            href="https://wa.me/212700720490?text=سلام، عندي طلب وبغيت نتأكد منو"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600 transition-colors"
          >
            <Phone size={18} />
            تواصل معانا عبر واتساب
          </a>
        </div>

        <p className="text-xs text-gray-400 mt-6">
          غادي نتواصلو معاك عبر الهاتف لتأكيد الطلب والتوصيل
        </p>
      </div>
    </div>
  );
};

export default OrderConfirmation;
