/**
 * payment.service.js
 * Simulates a payment gateway.
 *
 * FUTURE INTEGRATION NOTE:
 * To plug in Razorpay, Stripe, or CCAvenue, replace the `processPayment`
 * function body with the actual SDK call. The service interface (what it
 * accepts and returns) stays the same, so matrimony.service.js won't change.
 *
 * Example Razorpay swap:
 *   const Razorpay = require('razorpay');
 *   const rzp = new Razorpay({ key_id, key_secret });
 *   const order = await rzp.orders.create({ amount: amountInPaise, currency: 'INR' });
 *   return { success: true, transactionId: order.id, amount };
 */

const FIXED_AMOUNT = 500; // ₹500 registration fee

/**
 * Process a payment (simulated).
 * @param {object} options
 * @param {boolean} options.simulateSuccess - Pass true to simulate success, false for failure
 * @returns {{ success: boolean, transactionId: string|null, amount: number, message: string }}
 */
async function processPayment({ simulateSuccess = true } = {}) {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (simulateSuccess) {
    return {
      success: true,
      transactionId: `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      amount: FIXED_AMOUNT,
      message: 'Payment successful',
    };
  }

  return {
    success: false,
    transactionId: null,
    amount: FIXED_AMOUNT,
    message: 'Payment failed — please try again',
  };
}

module.exports = { processPayment, FIXED_AMOUNT };
