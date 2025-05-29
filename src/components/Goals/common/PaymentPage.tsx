import api from "../../../services/axios";
import { RAZORPAY_ID } from "../../../services/config";

const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

const handlePayment = async (amount: number, paymentType: string) => {
    try {
        const isScriptLoaded = await loadRazorpayScript();

        if (!isScriptLoaded) {
            alert("Failed to load Razorpay script. Please try again.");
            return;
        }

        const response = await api.post("/create-order", {
            amount: amount * 100, 
            payment_type: paymentType,
        });

        // console.log("Create order response:", response);

        if (response.data.status === "success") {
            const { order_id, amount } = response.data;

            const options = {
                key: RAZORPAY_ID,
                amount: amount, 
                currency: "INR",
                name: "Sustianability Olympiad",
                description: `${paymentType} Payment`,
                order_id: order_id,
                handler: async function (razorpayRes: any) {
                    try {
                        const verifyRes = await api.post("/payment-success", {
                            razorpay_payment_id: razorpayRes.razorpay_payment_id,
                            razorpay_order_id: razorpayRes.razorpay_order_id,
                            razorpay_signature: razorpayRes.razorpay_signature,
                            amount: amount, 
                            payment_type: paymentType,
                        });

                        // console.log("Verification response:", verifyRes);
                        if (verifyRes.data.payment.status === "completed") {
                            const { razorpay_payment_id, razorpay_order_id } = verifyRes.data.payment;

                            window.location.href = `/payment-success?order_id=${razorpay_order_id}&payment_id=${razorpay_payment_id}`;
                        } else {
                            alert("Payment verification failed.");
                        }
                    } catch (error) {
                        console.error("Error during payment verification:", error);
                        alert("Payment verification failed.");
                    }
                },

                theme: {
                    color: "#3399cc",
                },
            };

            const razorpay = new (window as any).Razorpay(options);
            razorpay.open();
        } else {
            alert("Failed to create order.");
        }
    } catch (error) {
        console.error("Error during payment initiation:", error);
        alert("Payment initiation failed.");
    }
};

export default handlePayment;
