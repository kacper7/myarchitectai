import supabaseAdmin from "../../../utils/supabaseAdmin"

function packageName(variantName: string) : string {
  return variantName.split(" ")[0].toLowerCase()
}

async function getUser(email: string) {
  let user = null
  try {
    const {data, error} = await supabaseAdmin.from("user_details").select("*").eq("email", email).single()
    if (error) throw error
    user = data
  } catch (error) {
    console.error(error)
  }

  return user
}

async function handleSubscriptionUpdated(event: Record<string, any>) {
  const email = event.data.attributes.user_email
  const user = await getUser(email)
  if (!user) {
    console.error(`Subscription created for unknown user: ${email}`)
    return
  }

  await supabaseAdmin.from("user_details").update({
    lemon_squeezy_id: event.data.attributes.customer_id,
    lemon_squeezy_subscription_id: event.data.id,
    subscription_status: event.data.attributes.status,
    subscription_package: packageName(event.data.attributes.variant_name),
    subscription_renews_at: event.data.attributes.renews_at
  }).eq("email", user.email)
}

export {
  handleSubscriptionUpdated,
}
