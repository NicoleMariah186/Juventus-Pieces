document.addEventListener("DOMContentLoaded", () => {
  const checkoutContainer = document.getElementById("checkout-items");
  const totalContainer = document.getElementById("checkout-total");
  const paymentForm = document.getElementById("payment-form");
  const mobileDetails = document.getElementById("mobile-details");
  const bankDetails = document.getElementById("bank-details");
  const paymentRadios = document.querySelectorAll('input[name="payment-method"]');

  // Load cart items from localStorage
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  if (!checkoutContainer) return;

  // Display cart items and calculate total
  let total = 0;
  checkoutContainer.innerHTML = cartItems.map(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    return `
      <div class="checkout-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="item-info">
          <h4>${item.name}</h4>
          <p>UGX ${item.price.toLocaleString()} x ${item.quantity} = UGX ${subtotal.toLocaleString()}</p>
        </div>
      </div>
    `;
  }).join("");

  totalContainer.innerHTML = `<h3>Total: UGX ${total.toLocaleString()}</h3>`;

  // Toggle payment input fields
  paymentRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      if (radio.value === "mobile") {
        mobileDetails.style.display = "block";
        bankDetails.style.display = "none";
      } else {
        mobileDetails.style.display = "none";
        bankDetails.style.display = "block";
      }
    });
  });

  // Handle form submission
  paymentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Get customer info from form
    const customerName = document.getElementById("full-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const mainPhone = document.getElementById("phone").value.trim();

    if (!customerName || !email || !mainPhone) {
      alert("Please fill in all your details.");
      return;
    }

    // Get selected payment method
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
    let phone_number = mainPhone;

    if (paymentMethod === "mobile") {
      const mobileNumber = document.getElementById("mobile-number").value.trim();
      if (!mobileNumber) {
        alert("Please enter your mobile money number.");
        return;
      }
      phone_number = mobileNumber;
    } else {
      const bankName = document.getElementById("bank-name").value.trim();
      const accountNumber = document.getElementById("account-number").value.trim();
      if (!bankName || !accountNumber) {
        alert("Please enter your bank name and account number.");
        return;
      }
    }

    // Save order to backend before payment
fetch("http:/juventus-pieces.onrender.com/api/orders", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({
    full_name: customerName,
    email: email,
    phone: mainPhone,
    payment_method: paymentMethod,
    total: total,
    cartItems: cartItems,
    tx_ref: "JUVE_" + Date.now()
  })
})
.then(res => res.json())
.then(data => {
  console.log("Order saved:", data);
  // proceed with Flutterwave payment
})
.catch(err => console.error("Error saving order:", err));


    // Initialize Flutterwave payment
    FlutterwaveCheckout({
      public_key: "YOUR_PUBLIC_KEY_HERE", // Replace with your actual public key
      tx_ref: "JUVE_" + Date.now(),
      amount: total,
      currency: "UGX",
      payment_options: paymentMethod === "mobile" ? "mobilemoneyuganda" : "banktransfer",
      customer: {
        email: email,
        phone_number: phone_number,
        name: customerName
      },
      customizations: {
        title: "Juventus Pieces",
        description: "Purchase of luxury jewelry",
        logo: "https://yourdomain.com/images/logo.png"
      },
      callback: function (data) {
        alert("Payment successful! Thank you for your purchase.");
        localStorage.removeItem("cartItems");
        window.location.href = "index.html";
      },
      onclose: function() {
        alert("Payment window closed.");
      }
    });
  });
});
