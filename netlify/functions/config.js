exports.handler = async () => {
    return {
      statusCode: 200,
      body: JSON.stringify({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      })
    };
  };