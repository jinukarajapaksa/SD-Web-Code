// get references to interactive elements
const cartBox = document.getElementById("cartItems");
const totalText = document.getElementById("total");
const btnClear = document.getElementById("clearCart");
const btnCheckout = document.getElementById("checkout");

// listen for user interactions
btnClear.addEventListener("click", clearCart);
btnCheckout.addEventListener("click", goCheckout);

// show the cart
function showCart() {
  const cart = loadList("cart");
  let html = "";
  let total = 0;

  if (cart.length === 0) {
    cartBox.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    html = `<table cellspacing="0" cellpadding="10">
      <caption>Items in your cart</caption>
      <tr>
        <th>Image</th>
        <th>Name</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Subtotal</th>
        <th>Remove</th>
      </tr>`;
    for (let i = 0; i < cart.length; i++) {
      const p = getProduct(cart[i].id);
      const subtotal = p.price * cart[i].qty;
      total += subtotal;
      html += `<tr>
        <td><img src="${p.image}" alt="${p.name}" width="100" height="100"></td>
        <td>${p.name}</td>
        <td>${formatPrice(p.price)}</td>
        <td class="qty">
          <button type="button" onclick="changeQty(${p.id}, -1)">-</button>
          ${cart[i].qty}
          <button type="button" onclick="changeQty(${p.id}, 1)">+</button>
        </td>
        <td>${formatPrice(subtotal)}</td>
        <td><button type="button" onclick="removeItem(${p.id})">X</button></td>
      </tr>`;
    }
    html += "</table>";
    cartBox.innerHTML = html;
  }

  totalText.innerText = formatPrice(total);

  // disable buttons when the cart is empty
  btnClear.disabled = cart.length === 0;
  btnCheckout.disabled = cart.length === 0;
  showCartCount();
}

// change quantity (amount is 1 or -1)
function changeQty(id, amount) {
  const cart = loadList("cart");
  const newCart = [];
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      cart[i].qty += amount;
    }
    if (cart[i].qty > 0) {
      newCart.push(cart[i]);
    }
  }
  saveList("cart", newCart);
  showCart();
}

// remove one item
function removeItem(id) {
  const cart = loadList("cart");
  const newCart = [];
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id !== id) {
      newCart.push(cart[i]);
    }
  }
  saveList("cart", newCart);
  showCart();
  showMessage("Item removed");
}

// clear everything
function clearCart() {
  localStorage.removeItem("cart");
  showCart();
  showMessage("Cart cleared");
}

function goCheckout() {
  window.location.href = "checkout.html";
}

showCart();