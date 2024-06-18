import apiClient from "@/utils/generic/api";

const makePayment = async ({priceId, mode="payment", successUrl=window.location.href}) => {
    const res = await apiClient.post("/stripe/create-checkout", {
        priceId,
        mode,
        successUrl,
        cancelUrl: window.location.href,
    });

    window.location.href = res.url;
}

export default makePayment;