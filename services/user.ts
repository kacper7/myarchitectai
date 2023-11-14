import jwt from "jsonwebtoken";
import { SUPABASE_JWT_SECRET } from "../utils/constants";
import supabaseAdmin from "../utils/supabaseAdmin";
import { MAX_FREE_RENDERS, MAX_STARTER_RENDERS } from "../utils/constants";

async function validateUserFromJWT(accessToken?: string): Promise<any> {
  if (!accessToken) return null;

  try {
    const decoded = jwt.verify(accessToken, SUPABASE_JWT_SECRET);
    const { email, exp } = decoded as any;
    if (!email) return null;
    if (Date.now() >= exp * 1000) return null;

    const { data, error } = await supabaseAdmin.from("user_details").select("*").eq("email", email).single()
    if (error) throw error

    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

function allowedToRender(subscriptionPackage: string, currentRenders: number): boolean {
  if (subscriptionPackage === "pro") return true;
  if (subscriptionPackage === "starter" && currentRenders < MAX_STARTER_RENDERS) return true;
  if (!subscriptionPackage && currentRenders < MAX_FREE_RENDERS) return true;
  if (subscriptionPackage === "free" && currentRenders < MAX_FREE_RENDERS) return true;

  return false
}

async function updateRendersCount(userId: string) : Promise<void> {
  try {
    await supabaseAdmin.rpc('increment_user_renders_count', { userid: userId })
  } catch (err) {
    console.error(err)
  }
}

export {
  validateUserFromJWT,
  allowedToRender,
  updateRendersCount,
}
