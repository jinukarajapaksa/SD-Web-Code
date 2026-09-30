// get references to interactive elements
const wishGrid = document.getElementById("wishGrid");
const statusFilter = document.getElementById("statusFilter");

// listen for user interactions
statusFilter.addEventListener("change", showWishlist);

const statuses = ["Interested", "Owned", "Not interested"];

// show the wishlist
function showWishlist() {
  const list = loadList("wishlist");
  const filter = statusFilter.value;
  let html = "";
  let count = 0;

  for (let i = 0; i < list.length; i++) {
    if (filter === "All" || list[i].status === filter) {
      const p = getProduct(list[i].id);

      // status dropdown with the current status selected
      let options = "";
      for (let j = 0; j < statuses.length; j++) {
        let selected = "";
        if (statuses[j] === list[i].status) {
          selected = "selected";
        }
        options += `<option value="${statuses[j]}" ${selected}>${statuses[j]}</option>`;
      }

      html += `<article class="card">
        <div class="pic">
          <img src="${p.image}" alt="${p.name}" width="400" height="300" onclick="openModal(${p.id})">
        </div>
        <div class="info">
          <p class="cat">${p.category}</p>
          <h3>${p.name}</h3>
          <p class="price">${formatPrice(p.price)}</p>
          <label for="status${p.id}">Status:</label>
          <select id="status${p.id}" onchange="changeStatus(${p.id}, this.value)">${options}</select>
          <button type="button" onclick="addToCart(${p.id})">Add to Cart</button>
          <button type="button" class="wish" onclick="removeFromWishlist(${p.id})">Remove</button>
        </div>
      </article>`;
      count++;
    }
  }

  if (count === 0) {
    html = "<p>Nothing here yet. Save some toys from the <a href='products.html'>Products</a> page.</p>";
  }
  wishGrid.innerHTML = html;
  document.getElementById("count").innerText = `${count} item(s)`;
}

// when user changes a status
function changeStatus(id, newStatus) {
  const list = loadList("wishlist");
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      list[i].status = newStatus;
    }
  }
  saveList("wishlist", list);
  showMessage("Status updated");
  showWishlist();
}

// when user clicks remove
function removeFromWishlist(id) {
  const oldList = loadList("wishlist");
  const newList = [];
  for (let i = 0; i < oldList.length; i++) {
    if (oldList[i].id !== id) {
      newList.push(oldList[i]);
    }
  }
  saveList("wishlist", newList);
  showMessage("Removed from wishlist");
  showWishlist();
}

showWishlist();