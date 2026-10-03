import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://bhwzqqmneddqxfkziuwy.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_XLjdFHzhY-UyBh0-REuIUw_jtkrXwl8";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
