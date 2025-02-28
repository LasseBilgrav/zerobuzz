"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartList = document.querySelector(".cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const clearCartBtn = document.querySelector(".clear-cart");

    function updateCart() {
        cartList.innerHTML = "";
        let total = 0;

        cartItems.forEach((item, index) => {
            total += item.price * item.quantity;
            const li = document.createElement("li");
            li.innerHTML = `
                ${item.name} - ${item.price} kr x ${item.quantity}
                <button class="decrease" data-index="${index}">-</button>
                <button class="increase" data-index="${index}">+</button>
                <button class="remove" data-index="${index}">❌</button>
            `;
            cartList.appendChild(li);
        });

        totalPriceElement.textContent = `${total} kr`;
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            const name = button.dataset.name;
            const price = parseInt(button.dataset.price);

            const existingItem = cartItems.find(item => item.name === name);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cartItems.push({ name, price, quantity: 1 });
            }

            updateCart();
        });
    });

    cartList.addEventListener("click", (event) => {
        const index = event.target.dataset.index;

        if (event.target.classList.contains("decrease")) {
            if (cartItems[index].quantity > 1) {
                cartItems[index].quantity--;
            } else {
                cartItems.splice(index, 1);
            }
        }

        if (event.target.classList.contains("increase")) {
            cartItems[index].quantity++;
        }

        if (event.target.classList.contains("remove")) {
            cartItems.splice(index, 1);
        }

        updateCart();
    });

    clearCartBtn.addEventListener("click", () => {
        cartItems.length = 0;
        updateCart();
    });

    updateCart();
});
