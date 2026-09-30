// get references to interactive elements
const fName = document.getElementById("fName");
const fEmail = document.getElementById("fEmail");
const fMessage = document.getElementById("fMessage");
const sendBtn = document.getElementById("sendBtn");
const confirmBox = document.getElementById("confirm");

// listen for user interactions
sendBtn.addEventListener("click", sendFeedback);

// when user clicks send
function sendFeedback() {
  let ok = true;
  const name = fName.value.trim();
  const email = fEmail.value.trim();
  const message = fMessage.value.trim();

  if (name === "") {
    document.getElementById("fNameError").innerText = "Please enter your name";
    ok = false;
  } else {
    document.getElementById("fNameError").innerText = "";
  }

  if (email === "" || email.includes("@") === false || email.includes(".") === false) {
    document.getElementById("fEmailError").innerText = "Please enter a valid email";
    ok = false;
  } else {
    document.getElementById("fEmailError").innerText = "";
  }

  if (message.length < 10) {
    document.getElementById("fMessageError").innerText = "Please write at least 10 characters";
    ok = false;
  } else {
    document.getElementById("fMessageError").innerText = "";
  }

  if (ok === false) {
    return;
  }

  // save the feedback
  const feedback = loadList("feedback");
  feedback.push({ name: name, email: email, message: message });
  saveList("feedback", feedback);

  // clear the form and show a confirmation
  fName.value = "";
  fEmail.value = "";
  fMessage.value = "";
  confirmBox.innerText = `Thanks ${name}! We have received your message.`;
  confirmBox.classList.remove("hidden");
}