import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  typescript: true,
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headrs": "Content-Type,Authorization",
};

export const OPTIONS = () => {
  return NextResponse.json({}, { headers: corsHeaders });
};

export const POST = async (req: NextRequest) => {
  try {
    const { cartItems, customer } = await req.json();
    if (!cartItems || !customer) {
      return new NextResponse("Not enough data to checkout", { status: 404 });
    }

    //付款信息交互
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
      shipping_options: [
        { shipping_rate: "shr_1PclB8BmoK3h4yLlwF0u4Tvd" },
        { shipping_rate: "shr_1Pcl9sBmoK3h4yLlz6Yzs7CP" },
      ],
      line_items: cartItems.map((cartItem: any) => ({
        price_data: {
          currency: "hkd",
          product_data: {
            name: cartItem.item.title,
            metadata: {
              productId: cartItem.item.id,
              ...(cartItem.size && { size: cartItem.size }),
              ...(cartItem.color && { color: cartItem.color }),
            },
          },
          unit_amount: cartItem.item.price * 100,
        },
        quantity: cartItem.quantity,
      })),
      client_reference_id: customer.clerkId,
      success_url: `${process.env.ECOMMERCE_STORE_URL}/payment_success`,
      cancel_url: `${process.env.ECOMMERCE_STORE_URL}/cart`,
    });
    return NextResponse.json(session, { headers: corsHeaders });
  } catch (err) {
    console.log("[checkout_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
