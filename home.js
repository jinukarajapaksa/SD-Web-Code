// hero slider
const slides = document.getElementsByClassName("slide");
let current = 0;

function nextSlide() {
  slides[current].classList.remove("active");
  current++;
  if (current === slides.length) {
    current = 0;
  }
  slides[current].classList.add("active");
}

setInterval(nextSlide, 4000);

// product of the day (changes every day)
const today = new Date().getDate();
const potd = PRODUCTS[today % PRODUCTS.length];
document.getElementById("potd").innerHTML = makeCard(potd);

// featured products (first 4)
let html = "";
for (let i = 0; i < 4; i++) {
  html += makeCard(PRODUCTS[i]);
}
document.getElementById("featured").innerHTML = html;