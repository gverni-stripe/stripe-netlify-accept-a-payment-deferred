const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  appInfo: {
    // For sample support and debugging, not required for production:
    name: 'stripe-samples/accept-a-payment-deferred/payment-element',
  },
});

exports.handler = async (request) => {
  // Create a PaymentIntent with the amount, currency, and a payment method type.
  //
  // See the documentation [0] for the full list of supported parameters.
  //
  // [0] https://stripe.com/docs/api/payment_intents/create

  const paymentMethodOptions = request.queryStringParameters
    .payment_method_configuration
    ? {
        payment_method_configuration:
          request.queryStringParameters.payment_method_configuration,
      }
    : {
        automatic_payment_methods: {enabled: true},
      };

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: process.env.CURRENCY || 'usd',
      amount: 1999,
      ...paymentMethodOptions,
    });

    // Send publishable key and PaymentIntent details to client
    return {
      statusCode: 200,
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret,
      }),
    };
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: {
          message: e.message,
        },
      }),
    };
  }
};
