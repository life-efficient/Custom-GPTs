import {ExpressCheckoutElement} from '@stripe/react-stripe-js';

const CheckoutPage = () => {

    const onConfirm = async (paymentIntent) => {
        // Handle the payment intent confirmation.
        // For example, you can call your server to save the payment intent.
        console.log('payment intent made:', paymentIntent);
    }

    return (
        <div id="checkout-page" className='bg-red-200 p-4 m-4 h-4 w-4'>
            hello world
            <ExpressCheckoutElement onConfirm={onConfirm} />
        </div>
    );
};

export default CheckoutPage;