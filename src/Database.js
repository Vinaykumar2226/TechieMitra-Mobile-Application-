
import 'react-native-url-polyfill/auto';

import { createClient } from '@supabase/supabase-js'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setupURLPolyfill } from 'react-native-url-polyfill';

const url="https://dptsjpfwmeiwkwkpgpll.supabase.co";
const key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwdHNqcGZ3bWVpd2t3a3BncGxsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzI4NTI5NCwiZXhwIjoyMDA4ODYxMjk0fQ._uzrlrKsk-D6EhYUkDE6oBxNmQdqqTXRkyYj2R4OtJQ"

export const supabase = createClient(url,key,{
    auth: {
      detectSessionInUrl: false,
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      
    },
  });
// export default supabase;