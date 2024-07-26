document.addEventListener('DOMContentLoaded', () => {
    updateCartSummary();

    document.getElementById('billingForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const billingInfo = {
            name: document.getElementById('name').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            zip: document.getElementById('zip').value
        };

        const paymentInfo = {
            cardNumber: document.getElementById('cardNumber').value,
            expiryDate: document.getElementById('expiryDate').value,
            cvv: document.getElementById('cvv').value
        };

        // For demonstration purposes, store both billing and payment info in localStorage
        localStorage.setItem('billingInfo', JSON.stringify(billingInfo));
        localStorage.setItem('paymentInfo', JSON.stringify(paymentInfo));

        // Finalize the order (you might want to send this data to your server)
        alert('Order placed successfully!');

        // Redirect to a confirmation page or home page
        window.location.href = 'confirmation.html';
    });
});

function updateCartSummary() {
    const cartItems = JSON.parse(localStorage.getItem('CartItemArray')) || [];
    const cartContainer = document.querySelector('#cartSummary');
    cartContainer.innerHTML = ''; // Clear existing content

    let totalAmount = 0;

    cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <div>
                <h3>${item.name}</h3>
                <p>Price: $${item.price.toFixed(2)}</p>
                <input type="number" value="${item.quantity}" min="1" data-id="${item.id}" class="quantity-input">
                <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <button data-id="${item.id}" class="remove-item-btn">Remove</button>
        `;
        cartContainer.appendChild(itemElement);

        // Calculate total amount
        totalAmount += item.price * item.quantity;
    });

    // Display total amount
    const totalElement = document.createElement('div');
    totalElement.innerHTML = `<h2>Total Amount: $${totalAmount.toFixed(2)}</h2>`;
    cartContainer.appendChild(totalElement);

    // Add event listeners for quantity changes and remove buttons
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', updateQuantity);
    });

    document.querySelectorAll('.remove-item-btn').forEach(button => {
        button.addEventListener('click', removeItem);
    });
}

function updateQuantity(event) {
    const itemId = event.target.getAttribute('data-id');
    const newQuantity = parseInt(event.target.value);

    const cartItems = JSON.parse(localStorage.getItem('CartItemArray')) || [];
    const itemIndex = cartItems.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        cartItems[itemIndex].quantity = newQuantity;
        localStorage.setItem('CartItemArray', JSON.stringify(cartItems));
        updateCartSummary();
    }
}

function removeItem(event) {
    const itemId = event.target.getAttribute('data-id');

    let cartItems = JSON.parse(localStorage.getItem('CartItemArray')) || [];
    cartItems = cartItems.filter(item => item.id !== itemId);
    localStorage.setItem('CartItemArray', JSON.stringify(cartItems));
    updateCartSummary();
}
