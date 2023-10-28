const username = document.querySelector("#username");
const regUserBtn = document.querySelector("#regUserBtn");
let user;

const saveUser = () => {
  user = username.value;
  document.querySelector("#registatrion").classList.add("hidden");
  document.querySelector("#chatMessage").classList.remove("hidden");
};

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter" || event.keyCode === 13) {
    saveUser();
  }
});

regUserBtn.addEventListener("click", saveUser);

username.addEventListener("input", () => {
  if (username.value != "") {
    regUserBtn.disabled = false;
    regUserBtn.classList.remove("bg-gray-500");
    regUserBtn.classList.add("bg-green-500");
    regUserBtn.classList.add("hover:bg-green-700");
  } else {
    regUserBtn.disabled = true;
    regUserBtn.classList.remove("bg-green-500");
    regUserBtn.classList.add("bg-gray-500");
    regUserBtn.classList.remove("hover:bg-green-700");
  }
});

const input = document.querySelector("#input");
const submit = document.querySelector("#submit");

input.addEventListener("input", () => {
  if (input.value != "") {
    submit.disabled = false;
    submit.classList.remove("bg-gray-500");
    submit.classList.add("bg-green-500");
    submit.classList.add("hover:bg-green-700");
  } else {
    submit.disabled = true;
    submit.classList.remove("bg-green-500");
    submit.classList.add("bg-gray-500");
    submit.classList.remove("hover:bg-green-700");
  }
});

const socket = io();
const form = document.querySelector("form");
const messages = document.getElementById("messages");
const messagesDiv = document.querySelector("#messagesDiv");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  socket.emit("chat message", [user, input.value]);
  input.value = "";
  submit.disabled = true;
  submit.classList.remove("bg-green-500");
  submit.classList.add("bg-gray-500");
});

socket.on("chat message", (msg) => {
  const item = document.createElement("li");
  if (msg[0] === user) {
    item.innerHTML = `
    <div class="mb-4 bg-green-500 p-2 w-4/5 lg:w-3/5 rounded-md float-right">
      <p class="text-red-800 font-semibold">${msg[0]}:</p>
      <p class="text-gray-900">${msg[1]}</p>
    </div>

  `;
  } else {
    item.innerHTML = `
    <div class="mb-4 bg-gray-400 p-2 w-4/5 lg:w-3/5 rounded-md float-left">
        <p class="text-blue-800 font-semibold">${msg[0]}:</p>
        <p class="text-gray-900">${msg[1]}</p>
    </div>
  `;
  }
  messages.appendChild(item);
  messagesDiv.scrollTo(0, messagesDiv.scrollHeight);
});
