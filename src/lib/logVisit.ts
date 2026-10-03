import { supabase } from "./supabase";

export async function logVisit() {
  await supabase.from("visits").insert({
    referrer: document.referrer || null,
    user_agent: navigator.userAgent || null,
  });
}
