document.addEventListener('DOMContentLoaded', () => {
    const paymentForm = document.getElementById('paymentForm');

    paymentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const paymentInfo = {
            name: document.getElementById('paymentName').value,
            cardNumber: document.getElementById('paymentCardNumber').value,
            expiry: document.getElementById('paymentExpiry').value,
            cvv: document.getElementById('paymentCVV').value,
        };
        localStorage.setItem('paymentInfo', JSON.stringify(paymentInfo));
        alert('Payment information saved. Proceeding to confirmation.');
    });
});
