const categories = ["All", "Figurines", "Toys", "Board Games", "Diecast Cars"];
const filterBox = document.getElementById("filterBox");
let category = "All";
let searchText = "";

// values handed over from Home tiles or the header search
const savedCategory = localStorage.getItem("category");
if (savedCategory !== null) {
  category = savedCategory;
  localStorage.removeItem("category");
}
const savedText = localStorage.getItem("searchText");
if (savedText !== null) {
  searchText = savedText;
  filterBox.value = savedText;
  localStorage.removeItem("searchText");
}

filterBox.addEventListener("input", changeText);

function changeText() {
  searchText = filterBox.value;
  showProducts();
}

function setCategory(name) {
  category = name;
  showProducts();
}

function showProducts() {
  // filter buttons
  let chips = "";
  for (let i = 0; i < categories.length; i++) {
    let cls = "chip";
    if (categories[i] === category) {
      cls = "chip on";
    }
    chips += `<button type="button" class="${cls}" onclick="setCategory('${categories[i]}')">${categories[i]}</button>`;
  }
  document.getElementById("chips").innerHTML = chips;

  // product cards
  let html = "";
  let count = 0;
  for (let i = 0; i < PRODUCTS.length; i++) {
    const p = PRODUCTS[i];
    const rightCategory = category === "All" || p.category === category;
    const rightName = p.name.toLowerCase().includes(searchText.toLowerCase());
    if (rightCategory && rightName) {
      html += makeCard(p);
      count++;
    }
  }
  if (count === 0) {
    html = "<p>No products found.</p>";
  }
  document.getElementById("grid").innerHTML = html;
  document.getElementById("count").innerText = `${count} product(s)`;
}

showProducts();