class HTTP {

    async request(method, url, body) {
        const HTTPRequest = {
            method: method,
            headers: {
                'Content-type': 'application/json'
            }
        };
        if (body) HTTPRequest.body = JSON.stringify(body);
        const response = await fetch(url, HTTPRequest);
        console.log("The following request was sent to ", url.trim(), ":\n", HTTPRequest, "\n\nThe response was:\n", response);
        if (!response.ok) showError("Failed request: " + await response.text());
        return response;
    }

    delete = async (url, body) => this.request("DELETE", url, body);
    get = async (url) => this.request("GET", url);
    patch = async (url, body) => this.request("PATCH", url, body);
    post = async (url, body) => this.request("POST", url, body);

}

const http = new HTTP();

let firstEventDisplayed = false;

let loggedIn = false;
const loginData = { username: "", password: "" };

const errorField = document.querySelector("#error-message")
let errorTimeout = 0;

const loginContainer = document.querySelector("#login-container");
loginContainer.querySelectorAll("input").forEach(i => i.addEventListener("keydown", e => {
    if (e.key == "Enter") loginRequest();
}));

const previewImageButtons = document.querySelectorAll(".preview-image-button")
for (const button of previewImageButtons) {
    button.addEventListener("click", previewImage)
};

const addEventButton = document.querySelector("#add-event-button");
addEventButton.addEventListener("click", addEvent);

const previewEventButton = document.querySelector("#update-preview-button");
previewEventButton.addEventListener("click", updatePreview);

const deleteEventButton = document.querySelector("#delete-event-button");
deleteEventButton.addEventListener("click", deleteEvent);

const updateEventButton = document.querySelector("#update-event-button");
updateEventButton.addEventListener("click", updateEvent);

const loginButton = document.querySelector("#login-button");
loginButton.addEventListener("click", loginRequest);

const logoutButton = document.querySelector("#logout-button");
logoutButton.addEventListener("click", logout);



function showError(error) {
    errorField.textContent = error;
    clearInterval(errorTimeout)
    errorTimeout = setInterval(() => errorField.textContent = "", 5000)
}

async function loginRequest(username, password) {

    const usernameInput = document.querySelector("#username-input");
    const passwordInput = document.querySelector("#password-input")

    const newUserName = username || usernameInput.value.trim();
    const newPassword = password || passwordInput.value.trim();

    const response = await http.post("http://localhost:8080/login", { username: newUserName, password: newPassword });

    logout();

    if (response.ok) {
        loggedIn = true;
        loginData.username = newUserName;
        loginData.password = newPassword;

        loginContainer.classList.add("logged-in");
        localStorage.setItem("ON20-Event-API-preferences", JSON.stringify(loginData));
    }
}
function initalLogin() {
    const savedLogin = JSON.parse(localStorage.getItem("ON20-Event-API-preferences"));
    if (savedLogin) loginRequest(savedLogin.username, savedLogin.password);
}

function logout() {
    loggedIn = false;
    loginData.username = "";
    loginData.password = "";

    localStorage.removeItem("ON20-Event-API-preferences");

    if (loginContainer.classList.contains("logged-in")) loginContainer.classList.remove("logged-in");
}

function previewImage(e) {
    const inputLink = e.target.parentElement.querySelector("input").value;
    if (!inputLink) return e.preventDefault();
    e.target.href = inputLink;
}


async function deleteEvent(e) {
    e.preventDefault();
    if (!firstEventDisplayed) return showError("No event selected yet.");
    const eventSelector = document.querySelector("#index-input");
    const response = await http.delete("http://localhost:8080/events/delete/" + eventSelector.value, loginData);
    updatePreview();
    if (response.ok) console.log("Deletion successful.");
}

async function updateEvent(e) {
    e.preventDefault();
    if (!firstEventDisplayed) return showError("No event selected yet.");
    const eventSelector = document.querySelector("#index-input");
    const newEvent = {};
    const inputs = document.querySelectorAll(".preview-event-input");
    for (const input of inputs) {
        newEvent[input.name] = input.value ?? "";
    }
    const response = await http.patch("http://localhost:8080/events/patch/" + eventSelector.value, newEvent);
    if (!response) return console.error("Event not found.");
}

async function updatePreview(e) {
    if (e) e.preventDefault();
    firstEventDisplayed = true;
    const eventSelector = document.querySelector("#index-input");
    const response = await http.get("http://localhost:8080/events/" + eventSelector.value);

    const inputs = document.querySelectorAll(".preview-event-input");
    if (!response || !response.ok) {
        for (const input of inputs) {
            input.value = "";
            if (input.nodeName == "TEXTAREA") {
                input.style.height = "";
                input.style.height = input.scrollHeight + "px";
            }
        }
        console.error("Event not found.");
        return;
    }
    const selectedEvent = await response.json();
    for (const input of inputs) {
        input.value = selectedEvent[input.name] ?? "";
        if (input.nodeName == "TEXTAREA") {
            input.style.height = "";
            input.style.height = input.scrollHeight + "px";
        }
    }
}

function addEvent(e) {
    e.preventDefault();
    const inputs = document.querySelectorAll(".add-event-input");
    const values = {};

    for (const input of inputs) {
        values[input.id] = input.value;
    }
    http.post("http://localhost:8080/events/post", {
        title: values.title,
        date: values.date,
        start: values.start,
        end: values.end,
        city: values.city,
        country: values.country,
        location: values.location,
        adress: values.adress,
        description: values.description,
        image: values.image,
    });
}

initalLogin();