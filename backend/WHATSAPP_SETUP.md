# WhatsApp Business API Integration Guide

## 📋 Overview
This dental management system now integrates with WhatsApp Business API to send:
- Payment reminders
- Appointment reminders
- Treatment confirmations

## 🔧 Setup Instructions

### Step 1: Create a Meta Business Account
1. Go to [Meta Business Suite](https://business.facebook.com/)
2. Create or select your business account
3. Navigate to **Settings** → **Business Settings**

### Step 2: Set Up WhatsApp Business API
1. Go to [Meta for Developers](https://developers.facebook.com/)
2. Create a new app or select existing one
3. Add **WhatsApp** product to your app
4. Complete the business verification process

### Step 3: Get Your Credentials

#### 1. Phone Number ID
- In your app dashboard → **WhatsApp** → **API Setup**
- Copy the **Phone Number ID** (numeric ID like `123456789012345`)

#### 2. Access Token
- In app dashboard → **WhatsApp** → **API Setup**
- Click **Generate Token** or use existing permanent token
- Copy the **Access Token** (starts with `EAAG...`)

#### 3. Business Account ID
- In app dashboard → **WhatsApp** → **API Setup**
- Find your **WhatsApp Business Account ID**

#### 4. Webhook Verify Token
- Create your own secure token (e.g., `dental_clinic_webhook_2024`)
- You'll use this when setting up the webhook

### Step 4: Configure Environment Variables

Update your `.env` file in the backend:

```env
# WhatsApp Business API (Meta)
WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id
WHATSAPP_ACCESS_TOKEN=your_permanent_access_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_VERIFY_TOKEN=your_webhook_verify_token
```

### Step 5: Set Up Webhook (Production Only)

1. **Deploy your backend** to a public server (e.g., Heroku, Railway, DigitalOcean)
2. Your webhook URL will be: `https://your-domain.com/api/whatsapp/webhook`

3. In Meta for Developers:
   - Go to **WhatsApp** → **Configuration**
   - Click **Edit** next to Webhook
   - Enter your webhook URL: `https://your-domain.com/api/whatsapp/webhook`
   - Enter your **Verify Token** (same as in .env)
   - Click **Verify and Save**

4. Subscribe to webhook fields:
   - `messages` - to receive incoming messages
   - `message_status` - to track delivery status

### Step 6: Test the Integration

#### Test Payment Reminder (Development):
```typescript
import { sendPaymentReminder } from "./libs/whatsapp";

// Test sending
await sendPaymentReminder(
  "212612345678", // WhatsApp number with country code
  "Ahmed Mohamed",
  500 // Amount in MAD
);
```

#### Production Usage:
The system automatically sends WhatsApp reminders when:
1. Creating a new Feuille de Soins with `rappelPaiement` checkbox enabled
2. Patient has a valid WhatsApp number in their profile

## 📱 WhatsApp Number Format

**Important**: Phone numbers must be in international format without `+` or spaces:
- ✅ Correct: `212612345678` (Morocco)
- ✅ Correct: `33612345678` (France)
- ❌ Wrong: `+212 612 345 678`
- ❌ Wrong: `0612345678`

## 🔒 Security Notes

1. **Never commit your access token** to version control
2. Keep your `.env` file secure and add it to `.gitignore`
3. Use environment variables for all sensitive credentials
4. Regenerate tokens if they are ever exposed

## 💰 Pricing

WhatsApp Business API pricing (as of 2024):
- **Free Tier**: 1,000 conversations/month
- **User-Initiated**: ~$0.005-0.015 per conversation
- **Business-Initiated**: ~$0.03-0.05 per conversation

A "conversation" = 24-hour window from first message

## 📊 Monitoring

Check message delivery status in:
- Meta Business Manager → WhatsApp → Analytics
- Your backend logs (console output)

## 🆘 Troubleshooting

### Error: "Invalid access token"
- Regenerate your access token in Meta for Developers
- Ensure token is a **permanent token**, not temporary

### Error: "Phone number not registered"
- Verify your WhatsApp Business number is properly configured
- Check that the number is verified with Meta

### Messages not sending
- Verify phone number format (no + or spaces)
- Check that patient has WhatsApp number in database
- Ensure your access token hasn't expired

### Webhook not receiving events
- Ensure backend is deployed to public HTTPS URL
- Verify webhook subscription in Meta dashboard
- Check that verify token matches exactly

## 📚 Resources

- [WhatsApp Business API Documentation](https://developers.facebook.com/docs/whatsapp)
- [Meta for Developers](https://developers.facebook.com/)
- [WhatsApp Business Manager](https://business.facebook.com/wa/manage/home/)

## ✅ Current Features

- ✅ Send payment reminders
- ✅ Send appointment reminders
- ✅ Send treatment confirmations
- ✅ Webhook for incoming messages
- ✅ Message delivery status tracking
- ✅ Automatic formatting and validation

## 🚀 Next Steps

To enable WhatsApp in production:
1. Complete Meta business verification
2. Deploy backend to public server with HTTPS
3. Configure webhook URL in Meta dashboard
4. Add real credentials to production .env
5. Test with real phone numbers

---

**Note**: For local development, WhatsApp messages won't actually send unless you have valid production credentials. The code will log errors but continue working normally.
