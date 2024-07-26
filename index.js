let products = [];
let wishlist = JSON.parse(localStorage.getItem('wishlistItems')) || [];
let cart = JSON.parse(localStorage.getItem('cartItems')) || [];

async function fetchProducts() {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        products = data.categories;
        console.log('Products fetched:', products);
        renderProducts();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function truncateString(str, num) {
    if (str.length <= num) {
        return str;
    }
    return str.slice(0, num) + '...';
}

function renderProducts() {
    const cardContainer = document.querySelector('.crd');
    cardContainer.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.addEventListener('click', () => openProductDetails(product)); // Add click event

        const image = document.createElement('img');
        image.src = product.strCategoryThumb;
        image.alt = product.strCategory;
        card.appendChild(image);

        const cardText = document.createElement('div');
        cardText.classList.add('cardText');

        const title = document.createElement('h2');
        title.textContent = truncateString(product.strCategory, 30);
        cardText.appendChild(title);

        const description = document.createElement('p');
        description.textContent = truncateString(product.strCategoryDescription, 20);
        cardText.appendChild(description);

        const orderButton = document.createElement('button');
        orderButton.textContent = 'Order Now';
        cardText.appendChild(orderButton);

        const wishlistButton = document.createElement('button');
        wishlistButton.textContent = 'Add to Wishlist';
        wishlistButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent card click event
            addToWishlist(product);
        });
        cardText.appendChild(wishlistButton);

        const addCartButton = document.createElement('button');
        addCartButton.textContent = 'Add to Cart';
        addCartButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent card click event
            addToCart(product);
        });
        cardText.appendChild(addCartButton);

        card.appendChild(cardText);
        cardContainer.appendChild(card);
    });
}

function openProductDetails(product) {
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    window.location.href = 'product-details.html';
}

function addToWishlist(product) {
    if (!wishlist.some(item => item.idCategory === product.idCategory)) {
        wishlist.push(product);
        updateWishlistStorage();
        renderWishlist();
        console.log('Wishlist:', wishlist);
    }
}

function updateWishlistStorage() {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlist));
    updateWishlistCount();
}

function renderWishlist() {
    const wishlistContainer = document.querySelector('.wishlist ul');
    wishlistContainer.innerHTML = '';

    wishlist.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item.strCategory;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => removeFromWishlist(item));

        listItem.appendChild(removeButton);
        wishlistContainer.appendChild(listItem);
    });

    // Show the wishlist section
    const wishlistSection = document.querySelector('.wishlist');
    wishlistSection.style.display = 'block';

    updateWishlistCount();
}

function removeFromWishlist(item) {
    wishlist = wishlist.filter(wishlistItem => wishlistItem.idCategory !== item.idCategory);
    updateWishlistStorage();
    renderWishlist();
}

function addToCart(product) {
    if (!cart.some(item => item.idCategory === product.idCategory)) {
        cart.push(product);
        updateCartStorage();
        renderCart();
        console.log('Cart:', cart);
    }
}

function updateCartStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cart));
    updateCartCount();
}

function renderCart() {
    const cartContainer = document.querySelector('.cart ul');
    cartContainer.innerHTML = " ";

    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item.strCategory;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => removeFromCart(item));

        listItem.appendChild(removeButton);
        cartContainer.appendChild(listItem);
    });

    // Show the cart section
    const cartSection = document.querySelector('.cart');
    cartSection.style.display = 'block';

    updateCartCount();
}

function removeFromCart(item) {
    cart = cart.filter(cartItem => cartItem.idCategory !== item.idCategory);
    updateCartStorage();
    renderCart();
}

function updateWishlistCount() {
    const wishlistCount = document.querySelector('#wishlistCount');
    wishlistCount.textContent = wishlist.length.toString();
}

function updateCartCount() {
    const cartCount = document.querySelector('#cartCount');
    cartCount.textContent = cart.length.toString();
}

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();

    // Retrieve wishlist and cart items from localStorage and render them
    renderWishlist();
    renderCart();
});

// Toggle wishlist visibility
document.querySelector('#wishlistBtn').addEventListener('click', () => {
    const wishlistSection = document.querySelector('.wishlist');
    wishlistSection.style.display = wishlistSection.style.display === 'none' ? 'block' : 'none';
});
