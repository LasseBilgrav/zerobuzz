"use strict";

// Shopping cart object
let cart = JSON.parse(localStorage.getItem("cart")) || {};

// Function to update cart UI
function updateCartUI() {
    const cartSection = document.querySelector("section:nth-child(2)"); // Assuming cart section is the second section
    cartSection.innerHTML = "<h2>Indkøbskurv</h2>";

    let total = 0;
    let cartItems = Object.keys(cart);

    if (cartItems.length === 0) {
        cartSection.innerHTML += "<p>Kurven er tom</p>";
    } else {
        let ul = document.createElement("ul");
        cartItems.forEach((product) => {
            let li = document.createElement("li");
            li.textContent = `${product} x${cart[product].quantity} - ${cart[product].price * cart[product].quantity} kr`;
            ul.appendChild(li);
            total += cart[product].price * cart[product].quantity;
        });
        cartSection.appendChild(ul);
    }

    // Show total price
    let totalPrice = document.createElement("p");
    totalPrice.innerHTML = `<strong>Total: ${total} kr</strong>`;
    cartSection.appendChild(totalPrice);

    // Add clear cart button
    let clearButton = document.createElement("button");
    clearButton.textContent = "Tøm kurv";
    clearButton.addEventListener("click", clearCart);
    cartSection.appendChild(clearButton);
}

// Function to add an item to the cart
function addToCart(productName, price) {
    if (!cart[productName]) {
        cart[productName] = { quantity: 1, price };
    } else {
        cart[productName].quantity++;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
}

// Function to remove an item from the cart
function removeFromCart(productName) {
    if (cart[productName]) {
        cart[productName].quantity--;
        if (cart[productName].quantity <= 0) {
            delete cart[productName];
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
}

// Function to clear the cart
function clearCart() {
    cart = {};
    localStorage.removeItem("cart");
    updateCartUI();
}

// Attach event listeners to all + and - buttons
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".add-button").forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const productCard = event.target.closest(".product-card");
            const productName = productCard.querySelector(".product-title").textContent;
            const price = parseInt(productCard.querySelector(".product-price").textContent);
            addToCart(productName, price);
        });
    });

    document.querySelectorAll(".remove-button").forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const productCard = event.target.closest(".product-card");
            const productName = productCard.querySelector(".product-title").textContent;
            removeFromCart(productName);
        });
    });

    updateCartUI(); // Initialize cart on page load
});