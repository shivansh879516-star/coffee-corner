const cart = [];

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  cartCount.textContent = totalItems;
  cartTotal.textContent = `₹${totalPrice}`;

  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="empty-cart">Your cart is empty.</p>`;
    return;
  }

  cartItems.innerHTML = cart
    .map(
      (item, index) => `
        <div class="cart-item">
          <div>
            <strong>${item.name}</strong>
            <small>₹${item.price} each</small>
          </div>

          <div class="quantity-controls">
            <button onclick="changeQuantity(${index}, -1)">−</button>
            <span>${item.quantity}</span>
            <button onclick="changeQuantity(${index}, 1)">+</button>
          </div>
        </div>
      `
    )
    .join("");
}

window.addToCart = function (name, price) {
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1
    });
  }

  updateCart();
  document.getElementById("cart-panel").classList.add("open");
};

window.changeQuantity = function (index, amount) {
  cart[index].quantity += amount;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  updateCart();
};

window.toggleCart = function () {
  document.getElementById("cart-panel").classList.toggle("open");
};

window.checkoutOrder = function () {
  if (cart.length === 0) {
    alert("Please add at least one item to your order.");
    return;
  }

  const orderType = document.querySelector(
    'input[name="order-type"]:checked'
  ).value;

  const tableNumber = document.getElementById("table-number").value.trim();

  if (orderType === "Dine-in" && tableNumber === "") {
    alert("Please enter your table number.");
    return;
  }

  const itemList = cart
    .map(
      (item) =>
        `• ${item.name} × ${item.quantity} = ₹${item.price * item.quantity}`
    )
    .join("\n");

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  let message = `Hi Coffee Corner!\n\nI want to place a ${orderType} order.\n`;

  if (orderType === "Dine-in") {
    message += `Table Number: ${tableNumber}\n`;
  }

  message += `\nOrder:\n${itemList}\n\nTotal: ₹${totalPrice}`;

  const whatsappButton = document.querySelector(".whatsapp-float");

  if (!whatsappButton) {
    alert("WhatsApp button setup is missing.");
    return;
  }

  const whatsappNumberLink = whatsappButton.href.split("?")[0];

  window.open(
    `${whatsappNumberLink}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
};window.addComboToCart = function () {
  window.addToCart("Cold Coffee + Brownie Combo", 299);
};
