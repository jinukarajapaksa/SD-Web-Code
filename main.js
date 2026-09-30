let modalId;

// storage helpers
function loadList(key) {
  const text = localStorage.getItem(key);
  if (text === null) {
    return [];
  }
  return JSON.parse(text);
}

function saveList(key, list) {
  localStorage.setItem(key, JSON.stringify(list));
}

// products
function getProduct(id) {
  for (let i = 0; i < PRODUCTS.length; i++) {
    if (PRODUCTS[i].id === id) {
      return PRODUCTS[i];
    }
  }
}

function formatPrice(amount) {
  return "Rs. " + amount.toFixed(2);
}

// message pop-up
function showMessage(text) {
  const box = document.getElementById("message");
  box.innerText = text;
  box.classList.remove("hidden");
  setTimeout(hideMessage, 2000);
}

function hideMessage() {
  document.getElementById("message").classList.add("hidden");
}

// cart
function showCartCount() {
  const cart = loadList("cart");
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].qty;
  }
  document.getElementById("cartCount").innerText = total;
}

function addToCart(id) {
  const cart = loadList("cart");
  let found = false;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      cart[i].qty++;
      found = true;
    }
  }
  if (found === false) {
    cart.push({ id: id, qty: 1 });
  }
  saveList("cart", cart);
  showCartCount();
  showMessage("Added to cart");
}

// wishlist
function inWishlist(id) {
  const list = loadList("wishlist");
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      return true;
    }
  }
  return false;
}

function toggleWishlist(id, button) {
  if (inWishlist(id)) {
    const oldList = loadList("wishlist");
    const newList = [];
    for (let i = 0; i < oldList.length; i++) {
      if (oldList[i].id !== id) {
        newList.push(oldList[i]);
      }
    }
    saveList("wishlist", newList);
    button.classList.remove("on");
    button.innerText = "Wishlist";
    showMessage("Removed from wishlist");
  } else {
    const list = loadList("wishlist");
    list.push({ id: id, status: "Interested" });
    saveList("wishlist", list);
    button.classList.add("on");
    button.innerText = "In wishlist";
    showMessage("Saved to wishlist");
  }
}

// product card (used on Home, Products and Wishlist)
function makeCard(p) {
  let badge = "";
  let oldPrice = "";
  if (p.oldPrice > 0) {
    badge = `<span class="tag sale">SALE</span>`;
    oldPrice = `<del>${formatPrice(p.oldPrice)}</del>`;
  } else if (p.tag !== "") {
    badge = `<span class="tag">${p.tag}</span>`;
  }

  let wishClass = "";
  let wishText = "Wishlist";
  if (inWishlist(p.id)) {
    wishClass = "on";
    wishText = "In wishlist";
  }

  return `<article class="card">
    <div class="pic">
      <img src="${p.image}" alt="${p.name}" width="400" height="300" onclick="openModal(${p.id})">
      ${badge}
    </div>
    <div class="info">
      <p class="cat">${p.category}</p>
      <h3>${p.name}</h3>
      <p class="price">${formatPrice(p.price)} ${oldPrice}</p>
      <button type="button" onclick="addToCart(${p.id})">Add to Cart</button>
      <button type="button" class="wish ${wishClass}" onclick="toggleWishlist(${p.id}, this)">${wishText}</button>
    </div>
  </article>`;
}

// modal
function openModal(id) {
  const p = getProduct(id);
  modalId = id;
  document.getElementById("mImg").setAttribute("src", p.image);
  document.getElementById("mImg").setAttribute("alt", p.name);
  document.getElementById("mName").innerText = p.name;
  document.getElementById("mCat").innerText = p.category;
  document.getElementById("mDesc").innerText = p.desc;
  document.getElementById("mPrice").innerText = formatPrice(p.price);
  document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

// category and search hand-over to the Products page
function saveCategory(name) {
  localStorage.setItem("category", name);
}

function searchSite() {
  localStorage.setItem("searchText", document.getElementById("searchBox").value);
  window.location.href = "products.html";
}

// newsletter
function subscribe() {
  const box = document.getElementById("newsEmail");
  const email = box.value;
  if (email === "" || email.includes("@") === false) {
    showMessage("Please enter a valid email");
    return;
  }
  const list = loadList("newsletter");
  list.push(email);
  saveList("newsletter", list);
  box.value = "";
  showMessage("Thanks for subscribing!");
}

// when page loads
document.getElementById("searchBtn").addEventListener("click", searchSite);
document.getElementById("newsBtn").addEventListener("click", subscribe);
showCartCount();