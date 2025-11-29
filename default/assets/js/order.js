// Function to decode the Base64 number
function decodeBase64(encoded) {
    return atob(encoded);
}

// 🎯 jQuery Document Ready ensures the script runs only after the DOM is fully loaded.
$(document).ready(function() {

    // 🚨 IMPORTANT: REPLACE THIS STRING with YOUR unique encoded Base64 number!
    const encodedNumber = 'OTE2MzA0MzA3MzIx'; 
    const whatsappNumber = decodeBase64(encodedNumber); 
    // ----------------------------------------------------------------------

    // --- 1. HANDLER FOR THE PRIMARY WHATSAPP ORDER FORM (#whatsappOrderForm) ---
    $('#whatsappOrderForm').on('submit', function(event) {
        
        event.preventDefault(); 
        
        // Collect Data
        const orderType = $('input[name="orderTypeOptions"]:checked').val() || 'Regular Order';
        const itemListDetails = $('#itemListDetails').val().trim();
        const numberOfItems = $('#numberOfItems').val().trim();
        const fullName = $('#fullName').val().trim();
        const email = $('#email').val().trim();
        const deliveryAddress = $('#deliveryAddress').val().trim();
        const state = $('#stateSelect option:selected').val();

        // Validation
        if (!itemListDetails || !numberOfItems || !fullName || !deliveryAddress || !state) {
            alert("Please ensure all required Order and Contact fields are filled.");
            return;
        }

        // Message Construction
        let message = `*NEW WHATSAPP ORDER REQUEST (E-commerce Order)*\n\n`;
        message += `*Order Type:* ${orderType}\n`;
        message += `*Item/KG Details:*\n${itemListDetails}\n`;
        message += `*Number of Item Types:* ${numberOfItems}\n`;
        message += `----------------------------\n`;
        message += `*Customer Name:* ${fullName}\n`;
        message += `*Email:* ${email}\n`;
        message += `*Delivery State:* ${state}\n`;
        message += `*Delivery Address:* ${deliveryAddress}\n`;

        // Redirect
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank');
    });

    // --- 2. HANDLER FOR THE NEW INQUIRY FORM (#whatsappInquiryForm) ---
    $('#whatsappInquiryForm').on('submit', function(event) {

        event.preventDefault();

        // Collect Data
        const name = $('#inquiryName').val().trim();
        const company = $('#inquiryCompany').val().trim();
        const countryCode = $('#inquiryCountry option:selected').val(); // Gets value like '+91'
        const email = $('#inquiryEmail').val().trim();
        const product = $('#inquiryProducts option:selected').text();
        const requirement = $('#inquiryRequirement option:selected').text();
        const messageText = $('#inquiryMessage').val().trim();
        
        // Validation (Checking only required fields)
        if (!name || !countryCode || !email || !product || !requirement) {
            alert("Please fill out all required fields (Name, Country, Email, Product, Requirement).");
            return;
        }

        // Message Construction
        let message = `*NEW WHATSAPP INQUIRY (B2B / Custom)*\n\n`;
        message += `*Name:* ${name}\n`;
        message += `*Company:* ${company || 'N/A'}\n`;
        message += `*Country Code (from Form):* ${countryCode}\n`;
        message += `*Email:* ${email}\n`;
        message += `----------------------------\n`;
        message += `*Product Category:* ${product}\n`;
        message += `*Current Requirement:* ${requirement}\n`;
        message += `*Detailed Message:*\n${messageText || 'No detailed message provided.'}\n`;

        // Redirect
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank');
    });

});
