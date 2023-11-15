import LemonSqueezy from "@lemonsqueezy/lemonsqueezy.js";
import { LEMON_SQUEEZY_API_KEY } from "./constants";

const lsClient = new LemonSqueezy(LEMON_SQUEEZY_API_KEY);

export default lsClient
