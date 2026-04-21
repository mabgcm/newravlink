import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const priceMap = {
  starter: process.env.STRIPE_PRICE_STARTER,
  growth: process.env.STRIPE_PRICE_GROWTH,
  scale: process.env.STRIPE_PRICE_SCALE,
};

const withPlanParam = (url, plan) => {
  const parsedUrl = new URL(url);
  parsedUrl.searchParams.set("plan", plan);
  return parsedUrl.toString();
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  try {
    const { plan } = req.body || {};
    const price = priceMap[plan];
    const successUrl = process.env.SUCCESS_URL;
    const cancelUrl = process.env.CANCEL_URL;

    if (!price || !successUrl || !cancelUrl) {
      return res.status(400).json({ ok: false, message: "Missing Stripe config" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price, quantity: 1 }],
      success_url: withPlanParam(successUrl, plan),
      cancel_url: withPlanParam(cancelUrl, plan),
    });

    return res.status(200).json({ ok: true, url: session.url });
  } catch {
    return res.status(500).json({ ok: false });
  }
}
