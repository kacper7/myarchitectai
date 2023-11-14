const LEMON_SQUEEZY_URL = process.env.NEXT_PUBLIC_LEMON_SQUEEZY_URL
const LEMON_SQUEEZY_SIGNING_KEY = process.env.LEMON_SQUEEZY_SIGNING_KEY || ""

const SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET || ""

const MAX_FREE_RENDERS = parseInt(process.env.MAX_FREE_RENDERS || '10', 10)
const MAX_STARTER_RENDERS = parseInt(process.env.MAX_STARTER_RENDERS || '100')

export {
  LEMON_SQUEEZY_URL,
  LEMON_SQUEEZY_SIGNING_KEY,
  SUPABASE_JWT_SECRET,
  MAX_FREE_RENDERS,
  MAX_STARTER_RENDERS,
}
