import { NextRequest, NextResponse } from 'next/server';
import lsClient from '../../utils/lemonsqueezy';
import { validateUserFromJWT } from "../../services/user";


export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get("sb.auth.token")?.value;
  const userDetails = await validateUserFromJWT(accessToken);
  if (!userDetails || !userDetails.lemon_squeezy_id) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    const response = await lsClient.getCustomer({ id: parseInt(userDetails.lemon_squeezy_id, 10) }) as any;
    if (!response) throw new Error("No response from Lemon Squeezy")

    const url = response["data"]["attributes"]["urls"]["customer_portal"]
    return NextResponse.redirect(new URL(url, request.url));
  } catch (err) {
    console.error(err)
    return NextResponse.redirect(new URL('/', request.url));
  }
}
