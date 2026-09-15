MR. YOGHURT — PRODUCTION-READY V2
===================================

This package upgrades the previous MVP with a deployment architecture designed for
Google Firebase:

1. GOOGLE FREE HOSTING
   Firebase Hosting provides a free no-cost tier and gives the site a project subdomain:
   https://YOUR_PROJECT_ID.web.app
   It also supports HTTPS and custom domains.

   Important:
   - "mr.yoghurt.com" is a custom domain, not a free Google domain.
   - You must own/register that domain and connect its DNS.
   - If you want a completely free public URL, use the Firebase web.app address.

2. SECURE LOGIN
   Use Firebase Authentication rather than browser localStorage for production accounts.
   Enable Email/Password and/or Google/Phone authentication in Firebase Console.

3. REAL DATABASE
   Use Cloud Firestore for:
   - products
   - orders
   - customers
   - settings
   - driver assignments
   - order statuses

4. ADMIN
   Set the owner's Firebase email in firestore.rules:
   REPLACE_WITH_ADMIN_EMAIL
   Then the admin can manage products and orders through authenticated access.

5. MULTILINGUAL AI
   firebase-ai-assistant.js uses Firebase AI Logic + Gemini.
   It instructs the model to understand the customer's language and answer in the same
   language. For production, configure Firebase AI Logic and App Check in the Firebase
   console.

6. QR CODE
   mr-yoghurt-web-qr.png opens the website directly at:
   https://mr.yoghurt.com
   After deploying to Firebase, regenerate it with the final free Firebase URL if you
   decide to use YOUR_PROJECT_ID.web.app.

7. DEPLOYMENT
   Install/use Firebase CLI or Firebase Cloud Shell:
     firebase login
     firebase init hosting firestore
     firebase deploy

   During hosting setup choose this folder as the public directory.
   Do NOT upload service-account private keys to the website.

8. PAYMENT
   The UI supports a Lipa Namba option, but a production payment flow should verify
   payment server-side through the selected Tanzanian payment provider. Never treat a
   customer-entered transaction reference as proof of payment.

9. IMPORTANT
   The supplied files are a production-ready architecture/starter, but they cannot
   actually be connected to YOUR Firebase project until you create the project and
   paste its Web App configuration. I cannot create/own a Google account or domain
   on your behalf from this chat.
