document.addEventListener('DOMContentLoaded', () => {
    updateWishlistSummary();

    document.getElementById('continueShoppingBtn').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});

function updateWishlistSummary() {
    const wishlistItems = JSON.parse(localStorage.getItem('WishlistItemArray')) || [];
    const wishlistContainer = document.querySelector('#wishlistSummary');
    wishlistContainer.innerHTML = ''; // Clear existing content

    if (wishlistItems.length === 0) {
        wishlistContainer.innerHTML = '<p>Your wishlist is empty.</p>';
        return;
    }

    wishlistItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('wishlist-item');
        itemElement.innerHTML = `
            <div>
                <h3>${item.strCategory}</h3>
                <img src="${item.strCategoryThumb}" alt="${item.strCategory}">
                <p>${item.strCategoryDescription}</p>
                <button data-id="${item.idCategory}" class="remove-wishlist-item-btn">Remove</button>
                <button data-id="${item.idCategory}" class="add-to-cart-btn">Add to Cart</button>
            </div>
        `;
        wishlistContainer.appendChild(itemElement);
    });

    // Add event listeners for remove and add to cart buttons
    document.querySelectorAll('.remove-wishlist-item-btn').forEach(button => {
        button.addEventListener('click', removeWishlistItem);
    });

    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', addToCartFromWishlist);
    });
}

function removeWishlistItem(event) {
    const itemId = event.target.getAttribute('data-id');

    let wishlistItems = JSON.parse(localStorage.getItem('WishlistItemArray')) || [];
    wishlistItems = wishlistItems.filter(item => item.idCategory !== itemId);
    localStorage.setItem('WishlistItemArray', JSON.stringify(wishlistItems));
    updateWishlistSummary();
    updateWishlistCount();
}

function addToCartFromWishlist(event) {
    const itemId = event.target.getAttribute('data-id');
    const wishlistItems = JSON.parse(localStorage.getItem('WishlistItemArray')) || [];
    const cartItems = JSON.parse(localStorage.getItem('CartItemArray')) || [];

    const item = wishlistItems.find(item => item.idCategory === itemId);

    if (item && !cartItems.some(cartItem => cartItem.idCategory === item.idCategory)) {
        item.quantity = 1; // Initialize quantity
        cartItems.push(item);
        localStorage.setItem('CartItemArray', JSON.stringify(cartItems));
        updateCartCount();
    }

    removeWishlistItem(event);
}
