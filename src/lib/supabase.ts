import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://qzivkuqwrbtkzjguokey.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjZiMzdlYWZlLWQ1YzgtNGQxZC1hYjBkLTBlYzIzMDg0YmU0NSJ9.eyJwcm9qZWN0SWQiOiJxeml2a3Vxd3JidGt6amd1b2tleSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzc1MjQxODA0LCJleHAiOjIwOTA2MDE4MDQsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.OIxR1epHKcHDSp_BGwlj0frNPY6xEnr8xwhnA4gV2rE';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };