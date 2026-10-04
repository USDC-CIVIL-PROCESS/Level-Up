const payButton = document.getElementById("pay-button");
const message = document.getElementById("payment-message");

payButton.addEventListener("click", async () => {
    payButton.disabled = true;
    payButton.textContent = "Loading...";
    message.textContent = "";

    try {
        const response = await fetch(
            "https://YOUR-PAYMENT-SERVER.com/create-checkout-session",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    product: "my-product"
                })
            }
        );

        if (!response.ok) {
            throw new Error("Unable to create payment session.");
        }

        const data = await response.json();

        if (!data.url) {
            throw new Error("Payment URL was not returned.");
        }

        window.location.href = data.url;

    } catch (error) {
        console.error(error);

        message.textContent =
            "Something went wrong. Please try again.";

        payButton.disabled = false;
        payButton.textContent = "Pay $25.00";
    }
});
