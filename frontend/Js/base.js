document.addEventListener("DOMContentLoaded", () => {
  console.log("Welcome to Juventus Pieces 💎");

  // === SEARCH FUNCTIONALITY ===
  const searchBtn = document.querySelector('.search-btn');
  const searchInput = document.querySelector('.search-bar');

  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
      const query = searchInput.value.trim();
      if (query) {
        alert(`Searching for: ${query}`);
        // You can later add filter logic or redirect
      } else {
        alert('Please enter something to search.');
      }
    });
  }

  // === CART FUNCTIONALITY ===
  const cart = document.querySelector('.cart');
  const cartCount = document.querySelector('.cart-count');

  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  function updateCartCount() {
    const totalQty = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    if (cartCount) cartCount.textContent = totalQty;
  }
  updateCartCount();

  if (cart) {
    cart.addEventListener('click', () => {
      window.location.href = "cart.html";
    });
  }
});
