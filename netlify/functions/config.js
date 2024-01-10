exports.handler = async () => {
    return {
      statusCode: 200,
      body: JSON.stringify({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
        currency: process.env.CURRENCY || 'usd',
        paymentMethodConfiguration: process.env.ECE_PAYMENT_METHOD_CONFIGURATION,
      })
    };
  };