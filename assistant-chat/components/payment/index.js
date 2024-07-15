// import {Elements} from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/stripe-js';

import Link from "next/link"

// import CheckoutPage from './CheckoutPage';

// // Make sure to call `loadStripe` outside of a component's render to avoid
// // recreating the `Stripe` object on every render.
// const stripePromise = loadStripe('pk_test_51FOhyhCiQSLSNSsfgWfPOiCJFNKyLEyr3baF5H4hBcpm4fUxMDvu10CXH8io69YXTd1paB1u1JRUlGWDgmGlirub00zSV340A9');

// function App() {
//   const options = {
//     mode: 'payment',
//     amount: 1099,
//     currency: 'usd',
//     // Customizable with appearance API.
//     appearance: {/*...*/},
//   };

//   return (
//     <Elements stripe={stripePromise} options={options}>
//       <CheckoutPage />
//     </Elements>
//   );
// };

// export default App;

const CheckoutPage = () => {
    return <a className="border m-4 rounded-xl p-2 cursor-pointer" href="https://buy.stripe.com/test_7sIaH32XC00leHeaEE">
        Buy Now
    </a>
}

export default CheckoutPage;