import { LEMON_SQUEEZY_URL, LEMON_SQUEEZY_URL_PARAMS } from "../utils/constants";
import type { User } from "@supabase/supabase-js";


function generateCheckoutLink(user: User | null): string {
  let lemonSqueezyUrl = `${LEMON_SQUEEZY_URL}?${LEMON_SQUEEZY_URL_PARAMS.toString()}`
  if (user) {
    const params = LEMON_SQUEEZY_URL_PARAMS;
    params.set("checkout[email]", user.email || "")
    params.set("checkout[custom][user_id]", user.id)
    lemonSqueezyUrl = `${LEMON_SQUEEZY_URL}?${params.toString()}`
  }

  return lemonSqueezyUrl;
}

export {
  generateCheckoutLink
}
