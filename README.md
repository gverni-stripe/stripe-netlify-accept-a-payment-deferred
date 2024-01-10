[![Netlify Status](https://api.netlify.com/api/v1/badges/fa16d4e4-5f71-4b4f-a386-8907b54d64e9/deploy-status?branch=ece)](https://app.netlify.com/sites/stripe-netlify-accept-a-payment-defer/deploys?branch=ece)

# Stripe collect payment details before creating an Intent with Express Checkout for Netlify 

Demo available [here](https://ece--stripe-netlify-accept-a-payment-defer.netlify.app/)

This sample is based on [Collect payment details before creating an Intent](https://stripe.com/docs/payments/accept-a-payment-deferred) and add a Express Checkout Element. 

In addition to that, the Express Checkout Element is only showing Link and Wallets, and PayPal is shown in Payment Element. 

To use this sample on Netlify from GitHub: 
* Clone the project into your GitHub profile
* Go on your Netlify console and click "Add a new site"
* Click "Deploy with GitHub"
* Select the repo you cloned
* Set the following Build settings:
  * Base Directory: leave empty
  * Build Command: leve empty
  * Publish directory: `client` (don't blame me for the name. I'm keeping it consistent with the sample app)
  * Functions directory: leave prefilled value (`netlify/functions`)
* Click on `Environment Variable` button and add the following environmental variable
  * `STRIPE_PUBLISHABLE_KEY`: your Stripe publishable key
  * `STRIPE_SECRET_KEY`: your stripe secret key
  * `CURRENCY`: currency for the payment intent. If not specified, the default value is `usd`
  * `ECE_PAYMENT_METHOD_CONFIGURATION`: Payment method congfiguration id for Express Checkout. Follow the instructions [here](https://stripe.com/docs/payments/multiple-payment-method-configs#create-payment-method-configuration) to create a new payment method configuration
* Click Deploy button

# Testing locally 

If you want to run this repo locally, install the netlify CLI and then run the following commands: 
* Install dependencies 
```
npm install
```
* Run netlify CLI in dev mode 
```
netlify dev 
```

The output should be something like: 

```
◈ Netlify Dev ◈
◈ Injecting environment variable values for all scopes
◈ Ignored general context env var: LANG (defined in process)
◈ Injected site settings env var: STRIPE_PUBLISHABLE_KEY
◈ Injected site settings env var: STRIPE_SECRET_KEY
◈ Setting up local development server
◈ Starting Netlify Dev with custom config
Serving "./client/" at http://127.0.0.1:3000
Ready for changes
✔ Waiting for framework port 3000. This can be configured using the 'targetPort' property in the netlify.toml
◈ Loaded function config
◈ Loaded function create-payment-intent

   ┌──────────────────────────────────────────────────┐
   │                                                  │
   │   ◈ Server now ready on http://localhost:8888    │
   │                                                  │
   └──────────────────────────────────────────────────┘
```

This will spawn two servers:
* `live-server` on port 3000 
* Netlify server on port 8888 (or another one depending on your system)

Open the Netlify server in your browser to have both static and functions served on the same port 
