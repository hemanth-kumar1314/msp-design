// -----------------------------------------------------------
//  Base64 Decoder
// -----------------------------------------------------------
function decodeBase64(encoded) {
    return atob(encoded);
}

// -----------------------------------------------------------
//  MAIN WhatsApp ORDER SCRIPT
// -----------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('whatsappOrderForm');

    if (!form) {
        console.error("Form not found: whatsappOrderForm");
        return;
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Stop refresh

        // Collect values
        const orderType = document.querySelector('input[name="orderTypeOptions"]:checked').value;
        const itemListDetails = document.getElementById('itemListDetails').value.trim();
        const numberOfItems = document.getElementById('numberOfItems').value.trim();
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const deliveryAddress = document.getElementById('deliveryAddress').value.trim();
        const state = document.getElementById('stateSelect').value;

        // Validation
        if (!itemListDetails || !numberOfItems || !fullName || !deliveryAddress) {
            alert("Please fill all the required details.");
            return;
        }

        // Your encoded WhatsApp number
        const encodedNumber = "OTE2MzA0MzA3MzIx";  // 916304307321

        const whatsappNumber = decodeBase64(encodedNumber);

        // Build message
        let message =
`*NEW WHATSAPP ORDER REQUEST* 🛒

*Order Type:* ${orderType}
*Items:* ${itemListDetails}
*Total Item Types:* ${numberOfItems}

---------------------------
*Customer Name:* ${fullName}
*Email:* ${email}
*State:* ${state}
*Address:* ${deliveryAddress}
`;

        const encodedMessage = encodeURIComponent(message);

        // WhatsApp URL
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Open WhatsApp
        window.open(whatsappURL, "_blank");
    });
});
