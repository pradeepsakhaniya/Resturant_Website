document.addEventListener('DOMContentLoaded', () => {
    updateWishlistCount();
    updateCartCount();
});

function updateWishlistCount() {
    const wishlist = JSON.parse(localStorage.getItem('WishlistItemArray')) || [];
    document.getElementById('wishlistCount').textContent = wishlist.length;
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('CartItemArray')) || [];
    document.getElementById('cartCount').textContent = cart.length;
}

document.querySelector('#wishlistBtn').addEventListener('click', () => {
    window.location.href = 'wishlist.html';
});

document.querySelector('#cartBtn').addEventListener('click', () => {
    window.location.href = 'cart.html';
});
