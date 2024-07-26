document.addEventListener('DOMContentLoaded', () => {
    const product = JSON.parse(localStorage.getItem('selectedProduct'));
    if (product) {
        displayProductDetails(product);
    }
    updateWishlistCount();
    updateCartCount();
});

function displayProductDetails(product) {
    const productDetailsContainer = document.querySelector('#product-details');
    productDetailsContainer.innerHTML = `
        <div class="product-detail-card">
            <img src="${product.strCategoryThumb}" alt="${product.strCategory}">
            <h1>${product.strCategory}</h1>
            <p>${product.strCategoryDescription}</p>
            <h3>Reviews</h3>
            <div class="reviews">
                <!-- Add reviews section here -->
            </div>
            <button onclick="addToWishlist(${product.idCategory})">Add to Wishlist</button>
            <button onclick="addToCart(${product.idCategory})">Add to Cart</button>
            <button onclick="orderNow(${product.idCategory})">Order Now</button>
        </div>
    `;
}

function addToWishlist(productId) {
    const wishlist = JSON.parse(localStorage.getItem('WishlistItemArray')) || [];
    const product = JSON.parse(localStorage.getItem('selectedProduct'));

    if (!wishlist.some(item => item.idCategory === productId)) {
        wishlist.push(product);
        localStorage.setItem('WishlistItemArray', JSON.stringify(wishlist));
        updateWishlistCount();
    }
}

function addToCart(productId) {
    const cart = JSON.parse(localStorage.getItem('CartItemArray')) || [];
    const product = JSON.parse(localStorage.getItem('selectedProduct'));

    if (!cart.some(item => item.idCategory === productId)) {
        cart.push(product);
        localStorage.setItem('CartItemArray', JSON.stringify(cart));
        updateCartCount();
    }
}

function orderNow(productId) {
    const orders = JSON.parse(localStorage.getItem('OrderItemArray')) || [];
    const product = JSON.parse(localStorage.getItem('selectedProduct'));

    if (!orders.some(item => item.idCategory === productId)) {
        orders.push(product);
        localStorage.setItem('OrderItemArray', JSON.stringify(orders));
    }
    
    window.location.href = 'billing-address.html';
}

function updateWishlistCount() {
    const wishlist = JSON.parse(localStorage.getItem('WishlistItemArray')) || [];
    document.getElementById('wishlistCount').textContent = wishlist.length;
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('CartItemArray')) || [];
    document.getElementById('cartCount').textContent = cart.length;
}
