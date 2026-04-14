import { Router, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const router = Router();
const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || "dental_webhook_token";

/**
 * Webhook verification (GET)
 * Meta will call this to verify your webhook
 */
router.get("/webhook", (req: Request, res: Response) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("✅ Webhook verified successfully");
    res.status(200).send(challenge);
  } else {
    console.log("❌ Webhook verification failed");
    res.sendStatus(403);
  }
});

/**
 * Webhook for receiving messages (POST)
 * Meta will send incoming messages here
 */
router.post("/webhook", (req: Request, res: Response) => {
  try {
    const body = req.body;

    // Check if this is a WhatsApp webhook event
    if (body.object === "whatsapp_business_account") {
      body.entry?.forEach((entry: any) => {
        entry.changes?.forEach((change: any) => {
          if (change.field === "messages") {
            const value = change.value;
            
            // Process incoming messages
            if (value.messages) {
              value.messages.forEach((message: any) => {
                console.log("📨 Incoming WhatsApp message:", {
                  from: message.from,
                  text: message.text?.body,
                  timestamp: message.timestamp,
                });

                // Here you can process incoming messages
                // For example: patient confirmations, questions, etc.
              });
            }

            // Process message status updates
            if (value.statuses) {
              value.statuses.forEach((status: any) => {
                console.log("📊 Message status update:", {
                  id: status.id,
                  status: status.status,
                  timestamp: status.timestamp,
                });
              });
            }
          }
        });
      });

      res.status(200).send("EVENT_RECEIVED");
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
    res.sendStatus(500);
  }
});

export default router;
