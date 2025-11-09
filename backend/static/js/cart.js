document.addEventListener("DOMContentLoaded", () => {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const cartContainer = document.getElementById("cart-items");
  const totalContainer = document.getElementById("cart-total");
  const clearCartBtn = document.getElementById("clear-cart");

  function saveCart() {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  function displayCart() {
    if (!cartContainer) return;

    if (cartItems.length === 0) {
      cartContainer.innerHTML = "<p style='text-align:center;'>Your cart is empty.</p>";
      totalContainer.innerHTML = "";
      return;
    }

    let total = 0;
    cartContainer.innerHTML = cartItems
      .map((item, i) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        return `
          <div class="cart-card">
            <img src="${item.image}" alt="${item.name}" class="cart-image">
            <div class="cart-info">
              <h4>${item.name}</h4>
              <p>Price: UGX ${item.price.toLocaleString()}</p>
              <div class="quantity-control">
                <button class="minus" data-i="${i}">-</button>
                <span>${item.quantity}</span>
                <button class="plus" data-i="${i}">+</button>
              </div>
              <p>Subtotal: UGX ${subtotal.toLocaleString()}</p>
              <button class="remove" data-i="${i}">Remove</button>
            </div>
          </div>
        `;
      })
      .join("");

    totalContainer.innerHTML = `<h3>Total: UGX ${total.toLocaleString()}</h3>`;

    // Quantity Buttons
    document.querySelectorAll(".minus").forEach(btn =>
      btn.addEventListener("click", e => {
        const i = e.target.dataset.i;
        if (cartItems[i].quantity > 1) cartItems[i].quantity--;
        else cartItems.splice(i, 1);
        saveCart();
        displayCart();
      })
    );

    document.querySelectorAll(".plus").forEach(btn =>
      btn.addEventListener("click", e => {
        const i = e.target.dataset.i;
        cartItems[i].quantity++;
        saveCart();
        displayCart();
      })
    );

    // Remove Buttons
    document.querySelectorAll(".remove").forEach(btn =>
      btn.addEventListener("click", e => {
        cartItems.splice(e.target.dataset.i, 1);
        saveCart();
        displayCart();
      })
    );
  }

  clearCartBtn.addEventListener("click", () => {
    cartItems = [];
    saveCart();
    displayCart();
  });

  displayCart();
});
