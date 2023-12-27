const usernameInput = document.querySelector("#username");
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
  user = usernameInput.value;
  document.querySelector("#registatrion").classList.add("hidden");
  document.querySelector("#chatMessage").classList.remove("hidden");
};

document.addEventListener("keydown", (event) => {
  if ((event.key === "Enter" || event.keyCode === 13) && usernameInput.value !== "") {
    saveUser();
  }
});

regUserBtn.addEventListener("click", saveUser);

function toggleButtonState(btn, inp) {
  if (inp.value !== "") {
    btn.disabled = false;
    btn.classList.remove("bg-gray-500");
    btn.classList.add("bg-green-500", "hover:bg-green-700");
  } else {
    btn.disabled = true;
    btn.classList.remove("bg-green-500", "hover:bg-green-700");
    btn.classList.add("bg-gray-500");
  }
}

input.addEventListener("input", () => toggleButtonState(submit, input));
usernameInput.addEventListener("input", () => toggleButtonState(regUserBtn, usernameInput));

form.addEventListener("submit", (e) => {
  e.preventDefault();
  socket.emit("chat message", [user, input.value, userID]);
  input.value = "";
  toggleButtonState(submit, input);
});

socket.on("chat message", (msg) => {
  const item = document.createElement("li");
  const userMatches = msg[0] === user && userID === msg[2];
  const bgColorClass = userMatches ? "bg-green-500" : "bg-gray-400";
  const floatClass = userMatches ? "float-right" : "float-left";

  item.innerHTML = `
    <div class="mb-4 ${bgColorClass} p-2 w-4/5 lg:w-3/5 rounded-md ${floatClass}">
      <p class="${userMatches ? 'text-red-800' : 'text-blue-800'} font-semibold">${msg[0]}:</p>
      <p class="text-gray-900">${msg[1]}</p>
    </div>
  `;

  messages.appendChild(item);
  messagesDiv.scrollTo(0, messagesDiv.scrollHeight);
});
