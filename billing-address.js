document.addEventListener('DOMContentLoaded', () => {
    const billingForm = document.getElementById('billingForm');

    billingForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const billingInfo = {
            name: document.getElementById('billingName').value,
            address: document.getElementById('billingAddress').value,
            city: document.getElementById('billingCity').value,
            state: document.getElementById('billingState').value,
            zip: document.getElementById('billingZip').value,
        };
        localStorage.setItem('billingInfo', JSON.stringify(billingInfo));
        window.location.href = 'payment.html';
    });
});
