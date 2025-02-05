document.getElementById('cbtn')?.addEventListener('click', () => {
    window.location.href = "../homePage.html";
});

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log("Cart data:", cart); 
    const totalItemCount = cart.length; 
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = `Cart(${totalItemCount})`; 
    }
}

function calculateTotalAmount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    const shippingCost = cart.length > 0 ? 30 : 0;
    const totalAmount = totalPrice + shippingCost;

    document.querySelector('#total-price').innerText = `$${totalPrice.toFixed(2)}`;
    document.querySelector('.shipping .stwo').innerText = `$${shippingCost.toFixed(2)}`;
    document.querySelector('.amount .atwo').innerText = `$${totalAmount.toFixed(2)}`;
}

function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log("Cart loaded:", cart); 
    const container = document.querySelector('.container3');

    if (cart.length === 0) {
        container.innerHTML = `
            <br><br><br><br>
            <h1 class="empty">Your Cart is Empty</h1>
            <a href="../homePage.html">
                <button class="button btn btn-outline-dark" id="cbtn">
                    <i class="fa-solid fa-arrow-left left"></i>   Continue Shopping
                </button>
            </a>
            <br><br><br><br>
        `;
    } else {
        let cartItemsHTML = `
        <div class="fcart">
            <div class="cart-items">
                <span class="cart-top">Item List</span><br>
                <hr class="oline">
                ${cart.map((product, index) => `
                    <div class="cart-item">
                        <img src="${product.image}" alt="${product.title}" class="cart-item-image">
                        <h3>${product.title}</h3>
                        <div class="cart-item-details">
                            <button class="minus" data-index="${index}" onclick="updateQuantity(${index}, -1)">-</button>
                            <span id="quantity-${index}">${product.quantity || 1}</span>
                            <button class="plus" data-index="${index}" onclick="updateQuantity(${index}, 1)">+</button>
                            <p id="per-item-price-${index}" class="price">
                                ${product.quantity || 1} \u00D7 $${product.price.toFixed(2)}
                            </p>
                            <button class="remove btn btn-danger" onclick="removeFromCart(${index})">Remove</button>
                        </div>
                    </div>
                    <hr class="tline">
                `).join('')}
            </div>
            <div class="fcart2">
                <h3 class="summary">Order Summary</h3>
                <hr class="ooline">
                <div class="last">
                    <span class="lone" id="total-items">Products (${cart.reduce((sum, item) => sum + (item.quantity || 1), 0)})</span>
                    <span class="ltwo" id="total-price"> $0.00</span>
                </div>
                <div class="shipping">
                    <span class="sone">Shipping</span>
                    <span class="stwo">$30</span>
                </div>
                <div class="amount">
                    <span class="aone">Total Amount</span>
                    <span class="atwo">$0.00</span>
                </div>
                <button class="check">Go To Checkout</button>
            </div>
        </div>
        `;
        container.innerHTML = cartItemsHTML;
    }

    calculateTotalAmount(); 
    updateCartCount();
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); 
    localStorage.setItem('cart', JSON.stringify(cart)); 

    loadCartItems(); 
    updateCartCount(); 
}


function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart[index].quantity) {
        cart[index].quantity = 1; 
    }

    cart[index].quantity += change;

    if (cart[index].quantity < 1) {
        cart.splice(index, 1); 
    }

    localStorage.setItem('cart', JSON.stringify(cart)); 
    console.log("Cart after quantity update:", cart); 
    loadCartItems(); 
}

document.addEventListener('DOMContentLoaded', () => {
    loadCartItems(); 
});
