const username = document.querySelector("#username");
const regUserBtn = document.querySelector("#regUserBtn");
const socket = io();
const form = document.querySelector("form");
const messagesDiv = document.querySelector("#messagesDiv");
const messages = document.getElementById("messages");
const input = document.querySelector("#input");
const submit = document.querySelector("#submit");
const userID = crypto.randomUUID();
let user;

const saveUser = () => {
  user = username.value;
  document.querySelector("#registatrion").classList.add("hidden");
  document.querySelector("#chatMessage").classList.remove("hidden");
};

document.addEventListener("keydown", function (event) {
  (event.key === "Enter" || event.keyCode === 13) && username.value !== ""
    ? saveUser()
    : null;
});

regUserBtn.addEventListener("click", saveUser);

function changeBtn(btn, inp) {
  if (inp.value != "") {
    btn.disabled = false;
    btn.classList.remove("bg-gray-500");
    btn.classList.add("bg-green-500");
    btn.classList.add("hover:bg-green-700");
  } else {
    btn.disabled = true;
    btn.classList.remove("bg-green-500");
    btn.classList.add("bg-gray-500");
    btn.classList.remove("hover:bg-green-700");
  }
}

input.addEventListener("input", changeBtn.bind(null, submit, input));
username.addEventListener("input", changeBtn.bind(null, regUserBtn, username));

form.addEventListener("submit", (e) => {
  e.preventDefault();
  socket.emit("chat message", [user, input.value, userID]);
  input.value = "";
  submit.disabled = true;
  submit.classList.remove("bg-green-500");
  submit.classList.remove("hover:bg-green-700");
  submit.classList.add("bg-gray-500");
});

socket.on("chat message", (msg) => {
  const item = document.createElement("li");
  if (msg[0] === user && userID === msg[2]) {
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
