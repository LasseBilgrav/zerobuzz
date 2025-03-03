"use strict";

// Varekurv struktur
let cart = {
    items: {},
    totalQuantity: 0,
    totalPrice: 0
};

// Initialiser når DOM er indlæst
document.addEventListener('DOMContentLoaded', () => {
    // Opret checkout container
    createCheckoutContainer();
    
    // Tilføj event listeners til knapper
    setupButtonListeners();
});

// Funktion til at oprette checkout container
function createCheckoutContainer() {
    const checkoutContainer = document.createElement('div');
    checkoutContainer.className = 'cart-container';
    checkoutContainer.innerHTML = `
        <div class="cart-header">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span class="cart-count">0</span>
        </div>
        <div class="cart-items">
            <!-- Her tilføjes varer dynamisk -->
        </div>
        <div class="cart-total">Total: 0 kr</div>
        <button class="checkout-button" style="display: none;">Checkout</button>
        <button class="clear-cart-button" style="display: none;">Tøm kurv</button>
    `;
    
    // Tilføj checkout knap styling
    const style = document.createElement('style');
    style.textContent = `
        .cart-container {
            width: 10%; /* Reduceret til 70% af original bredde */
            margin: 0 auto; /* Centrerer boksen */
        }
        .cart-total {
            margin-top: 10px;
            font-weight: bold;
            text-align: right;
        }
        .checkout-button {
            margin-top: 10px;
            width: 100%;
            padding: 8px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
        }
        .checkout-button:hover {
            background-color: #45a049;
        }
        .clear-cart-button {
            margin-top: 5px;
            width: 100%;
            padding: 8px;
            background-color: #f44336;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
        }
        .clear-cart-button:hover {
            background-color: #d32f2f;
        }
        .cart-count {
            background-color: white;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);
    
    // Tilføj til body
    document.body.appendChild(checkoutContainer);
    
    // Tilføj event listener til checkout knap
    const checkoutButton = checkoutContainer.querySelector('.checkout-button');
    checkoutButton.addEventListener('click', handleCheckout);
    
    // Tilføj event listener til tøm kurv knap
    const clearCartButton = checkoutContainer.querySelector('.clear-cart-button');
    clearCartButton.addEventListener('click', clearCart);
}

// Funktion til at opsætte knap event listeners
function setupButtonListeners() {
    // Find alle add knapper
    const addButtons = document.querySelectorAll('.add-button');
    addButtons.forEach(button => {
        button.addEventListener('click', handleAddToCart);
    });
    
    // Find alle remove knapper
    const removeButtons = document.querySelectorAll('.remove-button');
    removeButtons.forEach(button => {
        button.addEventListener('click', handleRemoveFromCart);
    });
}

// Funktion til at håndtere tilføjelse af varer
function handleAddToCart(event) {
    const productCard = event.target.closest('.product-card');
    if (!productCard) return;
    
    // Hent produkt information
    const productTitle = productCard.querySelector('.product-title').textContent;
    const productPrice = parseInt(productCard.querySelector('.product-price').textContent);
    
    // Opret et unikt id baseret på titlen
    const productId = productTitle.toLowerCase().replace(/\s+/g, '-');
    
    // Tilføj til kurv
    if (cart.items[productId]) {
        cart.items[productId].quantity++;
    } else {
        cart.items[productId] = {
            name: productTitle,
            price: productPrice,
            quantity: 1
        };
    }
    
    // Opdater totaler
    cart.totalQuantity++;
    cart.totalPrice += productPrice;
    
    // Opdater visning
    updateCartDisplay();
}

// Funktion til at håndtere fjernelse af varer
function handleRemoveFromCart(event) {
    const productCard = event.target.closest('.product-card');
    if (!productCard) return;
    
    // Hent produkt information
    const productTitle = productCard.querySelector('.product-title').textContent;
    const productPrice = parseInt(productCard.querySelector('.product-price').textContent);
    
    // Opret et unikt id baseret på titlen
    const productId = productTitle.toLowerCase().replace(/\s+/g, '-');
    
    // Fjern fra kurv hvis produktet findes
    if (cart.items[productId] && cart.items[productId].quantity > 0) {
        cart.items[productId].quantity--;
        cart.totalQuantity--;
        cart.totalPrice -= productPrice;
        
        // Fjern produktet helt hvis antal er 0
        if (cart.items[productId].quantity === 0) {
            delete cart.items[productId];
        }
        
        // Opdater visning
        updateCartDisplay();
    }
}

// Ny funktion til at tømme kurven
function clearCart() {
    // Nulstil kurv
    cart.items = {};
    cart.totalQuantity = 0;
    cart.totalPrice = 0;
    
    // Opdater visning
    updateCartDisplay();
    
    // Vis bekræftelse til brugeren
    alert('Din kurv er nu tom');
}

// Funktion til at opdatere kurv visning
function updateCartDisplay() {
    // Opdater antal
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.totalQuantity;
    
    // Opdater vareliste
    const cartItems = document.querySelector('.cart-items');
    cartItems.innerHTML = '';
    
    // Tilføj hver vare til listen
    for (const id in cart.items) {
        const item = cart.items[id];
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <span class="cart-item-name">${item.name} x ${item.quantity}</span>
            <span class="cart-item-price">${item.price * item.quantity} kr</span>
        `;
        cartItems.appendChild(itemElement);
    }
    
    // Opdater total
    const cartTotal = document.querySelector('.cart-total');
    cartTotal.textContent = `Total: ${cart.totalPrice} kr`;
    
    // Vis/skjul checkout knap
    const checkoutButton = document.querySelector('.checkout-button');
    checkoutButton.style.display = cart.totalQuantity > 0 ? 'block' : 'none';
    
    // Vis/skjul tøm kurv knap
    const clearCartButton = document.querySelector('.clear-cart-button');
    clearCartButton.style.display = cart.totalQuantity > 0 ? 'block' : 'none';
}

// Funktion til at håndtere checkout
function handleCheckout() {
    if (cart.totalQuantity > 0) {
        alert(`Tak for din ordre! Du har købt varer for ${cart.totalPrice} kr.`);
        
        // Nulstil kurv
        cart.items = {};
        cart.totalQuantity = 0;
        cart.totalPrice = 0;
        
        // Opdater visning
        updateCartDisplay();
    }
}