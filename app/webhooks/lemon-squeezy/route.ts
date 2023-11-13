import { NextResponse } from "next/server";
import { headers } from "next/headers";
import crypto from "crypto";
import { LEMON_SQUEEZY_SIGNING_KEY } from "../../../utils/constants";
import {
  handleSubscriptionUpdated,
} from "./handlers";

function validateSignature(secret: string, body: string, signature: string): boolean {
  try {
    const hmac = crypto.createHmac("sha256", secret)
    const digest = Buffer.from(hmac.update(body).digest('hex'), 'utf-8')
    const sig = Buffer.from(signature, 'utf-8')
    return crypto.timingSafeEqual(digest, sig)
  } catch (err) {
    console.error(err)
    return false
  }
}

export async function POST(request: Request) {
  const signature = headers().get("X-Signature") || ""
  const rawBody = await request.text()

  const valid = validateSignature(
    LEMON_SQUEEZY_SIGNING_KEY,
    rawBody,
    signature
  )

  if (!valid) {
    return new Response("Invalid signature", { status: 401 })
  }

  const body = JSON.parse(rawBody)
  const event = body.meta.event_name

  switch (event) {
    case "subscription_created":
    case "subscription_updated":
    case "subscription_cancelled":
    case "subscription_resumed":
    case "subscription_expired":
    case "subscription_paused":
    case "subscription_unpaused":
      await handleSubscriptionUpdated(body)
      break
    default:
      console.log(`Unhandled event: ${event}`)
      break
  }

  return NextResponse.json({ status: 200, body: "OK" })
}
