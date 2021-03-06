// gateway.js - payment gateway route module

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const stripe = require('stripe')('');
//Live I think //const endpointSecret = '';
const endpointSecret = ""; 

router.post('/create-checkout-session', async (req, res) => {

    if(req.session && req.session.passport && req.session.passport.user) {
        console.log(req.session.passport.user["data"][0]["email"]);
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
              {
                price: 'price_1HYQOVEfkoGz8UvN1biDK2Py',
                quantity: 1,
              },
            ],
            mode: 'subscription',
            success_url: 'https://www.isaiahcreati.com/premium?success=true',
            cancel_url: 'https://www.isaiahcreati.com/premium?success=false&cancel=true',
            customer_email: req.session.passport.user["data"][0]["email"],
            metadata: {
                'order_user_login': req.session.passport.user["data"][0]["login"],
                'order_user_id': req.session.passport.user["data"][0]["id"],
            }
          });
        
          res.json({ id: session.id });
    }

});
const markPaid = (subscription) => {
    console.log("Mark paid: " + subscription)
}
  
router.post('/webhook', bodyParser.raw({type: 'application/json'}), (request, response) => {
    const payload = request.body;
    const sig = request.headers['stripe-signature'];
  
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }
  
    switch (event.type) {

        case 'checkout.session.completed': {
            const session = event.data.object;
            // Save an order in your database, marked as 'awaiting payment'
            //createOrder(session);
            console.log(session);
            // Check if the order is paid (e.g., from a card payment)
            //
            // A delayed notification payment will have an `unpaid` status, as
            // you're still waiting for funds to be transferred from the customer's
            // account.
            if (session.payment_status === 'paid') {
                //fulfillOrder(session);
                console.log("Paid");
            }
    
            break;
        }

        case 'invoice.paid': {
            const invoice = event.data.object;
            const subscriptionId = invoice.subscription;
      
            //const subscription = findCustomerSignup(subscriptionId);
            console.log(invoice);
            // Check if this is the first invoice or a later invoice in the
            // subscription lifecycle.
            const firstInvoice = invoice.billing_reason === 'subscription_create';
      
            // You already handle marking the first invoice as paid in the
            // `checkout.session.completed` handler.
            //
            // Only use this for the 2nd invoice and later, so it doesn't conflict.
            if (!firstInvoice) {
                //markPaid(subscription);
            }
      
            break;
        }

        case 'invoice.payment_failed': {
            const invoice = event.data.object;
            const subscriptionId = invoice.subscription;

            //const subscription = findCustomerSignup(subscriptionId);
            console.log(invoice);
            //markPastDue(subscription);

            break;
        }

        case 'checkout.session.async_payment_succeeded': {
            const session = event.data.object;
    
            // Fulfill the purchase...
            //fulfillOrder(session);
            console.log(session);
            break;
        }
    
        case 'checkout.session.async_payment_failed': {
            const session = event.data.object;
    
            // Send an email to the customer asking them to retry their order
            //emailCustomerAboutFailedPayment(session);
            console.log(session);
            break;
        }
    }
  
    response.status(200);
});

module.exports = router;
