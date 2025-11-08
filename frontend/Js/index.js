document.addEventListener("DOMContentLoaded", () => {
  console.log("Welcome to Juventus Pieces 💎");

  // === SEARCH FUNCTIONALITY ===
  const searchBtn = document.querySelector('.search-btn');
  const searchInput = document.querySelector('.search-bar');

  if (searchBtn && searchInput) {
    function performSearch() {
      const query = searchInput.value.trim();
      if (query) {
        // Store search term temporarily in localStorage
        localStorage.setItem("searchQuery", query);
        // Redirect to products page
        window.location.href = "products.html";
      } else {
        alert('Please enter something to search.');
      }
    }

    // When the user clicks the search button
    searchBtn.addEventListener('click', performSearch);

    // When the user presses Enter
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === "Enter") performSearch();
    });
  }

  // === CART FUNCTIONALITY ===
  const cart = document.querySelector('.cart');
  const cartCount = document.querySelector('.cart-count');

  // Load cart from localStorage or start empty
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  function updateCartCount() {
    if (cartCount) {
      const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      cartCount.textContent = totalQty;
    }
  }

  // Global addToCart function
  window.addToCart = function(productName = "Unknown Item", productPrice = 0) {
    const existing = cartItems.find(item => item.name === productName);
    if (existing) existing.quantity += 1;
    else cartItems.push({ name: productName, price: productPrice, quantity: 1 });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();
    alert(`${productName} added to cart!`);
  };

  // Clicking the cart icon redirects to the cart page
  if (cart) {
    cart.addEventListener('click', () => {
      window.location.href = "cart.html";
    });
  }

  // Initial cart count update
  updateCartCount();
});
