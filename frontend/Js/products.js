document.addEventListener("DOMContentLoaded", () => {
  // === CART FUNCTIONALITY ===
  window.addToCart = function(name, price, image) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existing = cartItems.find(item => item.name === name);

    if (existing) existing.quantity += 1;
    else cartItems.push({ name, price, quantity: 1, image });

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    alert(`${name} added to cart!`);
  };

  // === SEARCH FUNCTIONALITY ===
  const searchBar = document.querySelector(".search-bar");
  const searchBtn = document.querySelector(".search-btn");
  const productSections = document.querySelectorAll("section");
  const productCards = document.querySelectorAll(".product-card");

  function searchProducts() {
    const query = searchBar.value.trim().toLowerCase();
    let found = false;

    productSections.forEach(section => {
      let visibleCount = 0;
      const cards = section.querySelectorAll(".product-card");

      cards.forEach(card => {
        const name = card.querySelector("h4").textContent.toLowerCase();
        const category = section.id.toLowerCase();

        if (name.includes(query) || category.includes(query) || query === "") {
          card.style.display = "block";
          visibleCount++;
        } else {
          card.style.display = "none";
        }
      });

      section.style.display = visibleCount > 0 ? "block" : "none";
      if (visibleCount > 0) found = true;
    });

    // === Display "Product not available" message ===
    const messageId = "no-results";
    let message = document.getElementById(messageId);

    if (!found) {
      if (!message) {
        message = document.createElement("p");
        message.id = messageId;
        message.textContent = "Not available.";
        message.style.textAlign = "center";
        message.style.color = "#d4af37";
        message.style.fontWeight = "bold";
        message.style.marginTop = "30px";
        document.body.appendChild(message);
      }
    } else {
      if (message) message.remove();
    }
  }

  // === EVENT LISTENERS ===
  searchBtn.addEventListener("click", searchProducts);
  searchBar.addEventListener("keypress", e => {
    if (e.key === "Enter") searchProducts();
  });

  // === AUTO SEARCH WHEN REDIRECTED FROM HOMEPAGE ===
  const storedQuery = localStorage.getItem("searchQuery");
  if (storedQuery) {
    searchBar.value = storedQuery;
    setTimeout(() => {
      searchProducts();
      localStorage.removeItem("searchQuery");
    }, 300);
  }

  // Optional: enable live search (as user types)
  // searchBar.addEventListener("input", searchProducts);
});
