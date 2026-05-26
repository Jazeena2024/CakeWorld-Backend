import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY
);

router.post("/checkout", async (req, res) => {

  try {

    const { amount } = req.body;

    const session =
      await stripe.checkout.sessions.create({

        payment_method_types: ["card"],

        line_items: [

          {
            price_data: {

              currency: "usd",

              product_data: {
                name: "Cake Order"
              },

              // ✅ Dynamic amount
              unit_amount: amount * 100

            },

            quantity: 1

          }

        ],

        mode: "payment",

        success_url:
          "http://localhost:5173/success",

        cancel_url:
          "http://localhost:5173/cancel"

      });

    res.json({
      url: session.url
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

export default router;