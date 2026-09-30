// get references to interactive elements
const txtName = document.getElementById("name");
const txtEmail = document.getElementById("email");
const txtAddress = document.getElementById("address");
const radCard = document.getElementById("card");
const summaryBox = document.getElementById("summary");
const btnPlace = document.getElementById("placeOrder");
const orderForm = document.getElementById("orderForm");
const successBox = document.getElementById("success");

// listen for user interactions
btnPlace.addEventListener("click", placeOrder);

// declare variables used by more than one function
let subtotal = 0;
let delivery = 0;
let total = 0;

// show the order summary
function showSummary() {
  const cart = loadList("cart");
  let html = "";
  subtotal = 0;

  if (cart.length === 0) {
    html = `<p>Your cart is empty. <a href="products.html">Go shopping</a></p>`;
  }

  for (let i = 0; i < cart.length; i++) {
    const p = getProduct(cart[i].id);
    const line = p.price * cart[i].qty;
    subtotal += line;
    html += `<p>${p.name} x ${cart[i].qty} : ${formatPrice(line)}</p>`;
  }

  // free delivery over Rs. 10000
  let deliveryText = "Free";
  if (subtotal > 0 && subtotal < 10000) {
    delivery = 500;
    deliveryText = formatPrice(delivery);
  } else {
    delivery = 0;
  }
  total = subtotal + delivery;

  if (cart.length > 0) {
    html += `<hr>
      <p>Subtotal: ${formatPrice(subtotal)}</p>
      <p>Delivery: ${deliveryText}</p>
      <p><strong>Total: ${formatPrice(total)}</strong></p>`;
  }

  summaryBox.innerHTML = html;
  btnPlace.disabled = cart.length === 0;
}

// when user clicks place order
function placeOrder() {
  let ok = true;
  const name = txtName.value.trim();
  const email = txtEmail.value.trim();
  const address = txtAddress.value.trim();

  // check name
  if (name === "") {
    document.getElementById("nameError").innerText = "Please enter your name";
    ok = false;
  } else {
    document.getElementById("nameError").innerText = "";
  }

  // check email
  if (email === "" || email.includes("@") === false || email.includes(".") === false) {
    document.getElementById("emailError").innerText = "Please enter a valid email";
    ok = false;
  } else {
    document.getElementById("emailError").innerText = "";
  }

  // check address
  if (address === "") {
    document.getElementById("addressError").innerText = "Please enter your address";
    ok = false;
  } else {
    document.getElementById("addressError").innerText = "";
  }

  if (ok === false) {
    return;
  }

  // payment method
  let payment = "Cash on delivery";
  if (radCard.checked) {
    payment = "Card";
  }

  // save the order
  const cart = loadList("cart");
  const items = [];
  for (let i = 0; i < cart.length; i++) {
    const p = getProduct(cart[i].id);
    items.push({ name: p.name, price: p.price, qty: cart[i].qty });
  }
  const orders = loadList("orders");
  const orderNo = "TH" + (1001 + orders.length);
  orders.push({
    orderNo: orderNo,
    name: name,
    email: email,
    address: address,
    payment: payment,
    items: items,
    total: total
  });
  saveList("orders", orders);

  // empty the cart
  localStorage.removeItem("cart");
  showCartCount();

  // show the success message
  document.getElementById("sName").innerText = name;
  document.getElementById("sOrder").innerText = orderNo;
  document.getElementById("sTotal").innerText = formatPrice(total);
  document.getElementById("sPayment").innerText = payment;
  orderForm.classList.add("hidden");
  successBox.classList.remove("hidden");
}

showSummary();