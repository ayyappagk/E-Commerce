let productData = [];

function truncatewords(str, numWords) {
    const words = str.split('');
    if (words.length <= numWords) {
        return str;
    }
    return words.slice(0, numWords).join('') + '...';
}

function normalizeCategory(category) {
    return category.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-');
}

fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
        productData = data; 

        const containersCards = productData.map((product) => {
            const truncateDescription = truncatewords(product.description, 60);
            const truncateTitle = truncatewords(product.title, 15);

            const normalizedCategory = normalizeCategory(product.category);

            return `
                <div class="product-card ${normalizedCategory}">
                    <div class="product-card2">
                        <img class="product-image" src="${product.image}" alt="${product.title}">
                        <p class="product-title">${truncateTitle}</p>
                        <p class="product-description">${truncateDescription}</p>
                    </div>
                    <hr>
                    <p class="product-price">$${product.price}</p>
                    <hr>
                    <div class="buttons">
                        <button onclick="showDetails(${product.id})">Details</button>
                        <button onclick='addToCart(${product.id})'>Add to Cart</button>
                    </div>
                </div>
            `;
        });

        const container = document.getElementById("container");
        container.innerHTML = containersCards.join('');
    })
    .catch((error) => {
        console.log(error);
    });

function filteritems(category) {
    const items = document.querySelectorAll('.product-card');
    const normalizedCategory = normalizeCategory(category);

    items.forEach((item) => {
        const itemCategory = item.classList[1];
        if (category === 'all' || itemCategory === normalizedCategory) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}


function addToCart(productId) {
    const product = productData.find((p) => p.id === productId);
    if (!product) {
        console.error('Product not found for ID:', productId);
        return;
    }

    console.log('Product added to cart:', product);

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        product.quantity = 1;  
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    updateCartCount();
}


function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const uniqueProductCount = cart.length;

    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = `Cart(${uniqueProductCount})`;  
    }
}

document.addEventListener('DOMContentLoaded', updateCartCount);
