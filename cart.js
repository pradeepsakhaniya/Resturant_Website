document.addEventListener('DOMContentLoaded', () => {
    updateCartSummary();

    document.getElementById('checkoutBtn').addEventListener('click', () => {
        window.location.href = 'checkout.html';
    });
});

function updateCartSummary() {
    const cartItems = JSON.parse(localStorage.getItem('CartItemArray')) || [];
    const cartContainer = document.querySelector('#cartSummary');
    cartContainer.innerHTML = ''; // Clear existing content

    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        updateTotalAmount();
        return;
    }

    cartItems.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <div>
                <h3>${item.strCategory}</h3>
                <img src="${item.strCategoryThumb}" alt="${item.strCategory}">
                <p>${item.strCategoryDescription}</p>
                <div>
                    <button data-index="${index}" class="decrease-quantity-btn">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button data-index="${index}" class="increase-quantity-btn">+</button>
                </div>
                <p>Price: $<span class="item-price">${item.price * item.quantity}</span></p>
                <button data-index="${index}" class="remove-cart-item-btn">Remove</button>
            </div>
        `;
        cartContainer.appendChild(itemElement);
    });

    // Add event listeners for quantity buttons and remove buttons
    document.querySelectorAll('.decrease-quantity-btn').forEach(button => {
        button.addEventListener('click', decreaseQuantity);
    });

    document.querySelectorAll('.increase-quantity-btn').forEach(button => {
        button.addEventListener('click', increaseQuantity);
    });

    document.querySelectorAll('.remove-cart-item-btn').forEach(button => {
        button.addEventListener('click', removeCartItem);
    });

    updateTotalAmount();
}

function decreaseQuantity(event) {
    const index = event.target.getAttribute('data-index');
    let cartItems = JSON.parse(localStorage.getItem('CartItemArray')) || [];
    if (cartItems[index].quantity > 1) {
        cartItems[index].quantity--;
    }
    localStorage.setItem('CartItemArray', JSON.stringify(cartItems));
    updateCartSummary();
}

function increaseQuantity(event) {
    const index = event.target.getAttribute('data-index');
    let cartItems = JSON.parse(localStorage.getItem('CartItemArray')) || [];
    cartItems[index].quantity++;
    localStorage.setItem('CartItemArray', JSON.stringify(cartItems));
    updateCartSummary();
}

function removeCartItem(event) {
    const index = event.target.getAttribute('data-index');
    let cartItems = JSON.parse(localStorage.getItem('CartItemArray')) || [];
    cartItems.splice(index, 1);
    localStorage.setItem('CartItemArray', JSON.stringify(cartItems));
    updateCartSummary();
}

function updateTotalAmount() {
    const cartItems = JSON.parse(localStorage.getItem('CartItemArray')) || [];
    let totalAmount = 0;
    cartItems.forEach(item => {
        totalAmount += item.price * item.quantity;
    });
    document.getElementById('totalAmount').textContent = `$${totalAmount}`;
}
