document.addEventListener('DOMContentLoaded', async () => {
  // Load the publishable key from the server. The publishable key
  // is set in your .env file.
  const {publishableKey, currency} = await fetch('/.netlify/functions/config').then((r) =>
    r.json()
  );
  if (!publishableKey) {
    addMessage(
      'No publishable key returned from the server. Please check `.env` and try again'
    );
    alert('Please set your Stripe publishable API key in the .env file');
  }

  const stripe = Stripe(publishableKey, {});


  // Initialize Stripe Elements without any client secret. We will
  // then mount the payment element.
  const options = {
    mode: 'payment',
    amount: 1099,
    currency: currency,
  };

  const elements = stripe.elements(options);
  const paymentElement = elements.create('payment');
  paymentElement.mount('#payment-element');

  // When the form is submitted...
  const form = document.getElementById('payment-form');
  const submitBtn = document.getElementById('submit');

  const handleError = (error) => {
    const messageContainer = document.querySelector('#error-message');
    messageContainer.textContent = error.message;
    submitBtn.disabled = false;
  };

  form.addEventListener('submit', async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    // Prevent multiple form submissions
    if (submitBtn.disabled) {
      return;
    }

    // Disable form submission while loading
    submitBtn.disabled = true;

    // Trigger form validation and wallet collection
    const {error: submitError} = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

    // Create the PaymentIntent and obtain clientSecret
    const {error: backendError, clientSecret} = await fetch(
      '/.netlify/functions/create-payment-intent'
    ).then((r) => r.json());
    if (backendError) {
      addMessage(backendError.message);
    }
    addMessage(`Deferred Payment Intent created`);
    addMessage(`Client secret returned.`);

    // Confirm the PaymentIntent using the details collected by the Payment Element
    const {error} = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/return.html`,
      },
    });

    if (error) {
      // This point is only reached if there's an immediate error when
      // confirming the payment. Show the error to your customer (for example, payment details incomplete)
      // handleError(error);
      addMessage(error);
    } else {
      // Your customer is redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer is redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  });
});
