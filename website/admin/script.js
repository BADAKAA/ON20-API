//UTILS
function copy(text) {
    const element = document.createElement("textarea");
    document.body.appendChild(element);
    element.value = text;
    element.select();
    document.execCommand("copy");
    element.remove();
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

// HTTP REQUEST HELPER CLASS
class HTTP {
    async request(method, url, body,auth) {
        const HTTPRequest = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
              }, 
        };
        if (body) HTTPRequest.body = JSON.stringify(body);
        if (auth) HTTPRequest.headers["Authorization"] = 'Basic '+btoa(auth.username+":"+auth.password) 
        const response = await fetch(url, HTTPRequest);
        console.log("The following request was sent to ", url.trim(), ":\n", HTTPRequest, "\n\nThe response was:\n", response);
        if (!response.ok) {
            const error = await response.text()
            showError("Failed request: " + (error[0]==="{" && JSON.parse(error).message || error));
        }
        return response;
    }

    delete = async (url, body,auth) => this.request("DELETE", url, body,auth);
    get = async (url) => this.request("GET", url);
    patch = async (url, body) => this.request("PATCH", url, body);
    post = async (url, body) => this.request("POST", url, body);
}

const http = new HTTP();

const ApiUrl = "http://localhost:8080/";

let firstEventDisplayed = false;

let loggedIn = false;
const loginData = { username: "", password: "" };

const errorField = document.querySelector("#error-message")
let errorTimeout = 0;

const loginContainer = document.querySelector("#login-container");
loginContainer.querySelectorAll("input").forEach(i => i.addEventListener("keydown", e => {
    if (e.key == "Enter") loginRequest();
}));

const previewImageButtons = document.querySelectorAll(".preview-image-button");
for (const button of previewImageButtons) {
    button.addEventListener("click", openImageInNewWindow)
};

const copyUrlButtons = document.querySelectorAll(".copy-url-button");
for (const button of copyUrlButtons) {
    button.addEventListener("click", copyImageLink)
};
function copyImageLink(e) {
    e.preventDefault();
    const inputLink = e.target.parentElement.querySelector("input").value;
    copy(inputLink);
    showError("URL copied!")
}
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

async function loginRequest(username, password, alreadyHashed) {

    const usernameInput = document.querySelector("#username-input");
    const passwordInput = document.querySelector("#password-input")

    const newUserName = username || usernameInput.value.trim();
    const newPassword = password || passwordInput.value.trim();

    const hashRequest = await http.post(`${ApiUrl}hash`, { input: newPassword })
    const hashedPassword = alreadyHashed ? newPassword : await hashRequest.text();

    const response = await http.post(ApiUrl + "login", { username: newUserName, password: hashedPassword });

    logout();

    if (response.ok) {
        loggedIn = true;
        loginData.username = newUserName;
        loginData.password = hashedPassword;

        loginContainer.classList.add("logged-in");
        localStorage.setItem("ON20-Event-API-preferences", JSON.stringify(loginData));
    }
}
function initalLogin() {
    const savedLogin = JSON.parse(localStorage.getItem("ON20-Event-API-preferences"));
    if (savedLogin) loginRequest(savedLogin.username, savedLogin.password, true);
}

function logout() {
    loggedIn = false;
    loginData.username = "";
    loginData.password = "";

    localStorage.removeItem("ON20-Event-API-preferences");

    if (loginContainer.classList.contains("logged-in")) loginContainer.classList.remove("logged-in");
}

function openImageInNewWindow(e) {
    const inputLink = e.target.parentElement.querySelector("input").value;
    if (!inputLink) return e.preventDefault();
    e.target.href = inputLink;
}


async function deleteEvent(e) {
    e.preventDefault();
    if (!firstEventDisplayed) return showError("No event selected yet.");
    const eventSelector = document.querySelector("#index-input");
    const response = await http.delete(ApiUrl + "events/delete/" + eventSelector.value, null,loginData);
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
    const response = await http.patch(ApiUrl + "events/patch/" + eventSelector.value, newEvent);
    if (!response) return console.error("Event not found.");
}

async function updatePreview(e) {
    if (e) e.preventDefault();
    firstEventDisplayed = true;
    const eventSelector = document.querySelector("#index-input");
    const response = await http.get(ApiUrl + "events/" + eventSelector.value);

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
    http.post(ApiUrl + "events/post", {
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


// IMAGE HANDLING
document.querySelector("#delete-image-button").addEventListener("click", deleteImage);
document.querySelector("#rename-image-button").addEventListener("click", renameImage);

document.querySelectorAll(".update-index-button").forEach(b=>b.addEventListener("click",updateIndex));
function updateIndex(e) {
    e.preventDefault();
    const input = e.target.parentElement.parentElement.querySelector("input");
    e.target.classList.contains("next") ? input.value++ : input.value--;
    previewImage();
}


const imageNameInput = document.querySelector("#image-name-input");
const imageIndexInput = document.querySelector("#image-index-input");
imageIndexInput.addEventListener("change",previewImage);
const imageUrlInput = document.querySelector("#image-url-input");
const previewImageElement = document.querySelector("#image-preview"); 

function resetImagePreview() {
    imageNameInput.value = "";
    imageUrlInput.value = "";
    previewImageElement.src = "";
}
async function getCurrentImageName() {
    const response = await http.get(`${ApiUrl}images`);
    const imageList = await response.json();
    const index = imageIndexInput.value == -1 ? imageList.length-1 :imageIndexInput.value ;
    return imageList[index];
}
let fileEnding = "";
async function previewImage() {
    const imageName = await getCurrentImageName();
    if (!imageName) {
        showError("This image was not found.");
        return resetImagePreview();
    }
    const imageURL = `${ApiUrl}images/${imageName}`;
    imageUrlInput.value = imageURL;
    const parsedName = imageName.split("."); // The ending is not displayed in the input field and is later added in the "renameImage()"-method.
    fileEnding = "."+parsedName.pop();
    imageNameInput.value = parsedName.join(".");
    previewImageElement.src = imageURL;
}
function deleteImage() {
    const imageName = imageNameInput.value.trim();
    http.delete(ApiUrl + "images/delete/" + imageName, loginData);
}
async function renameImage() {
    const oldName = await getCurrentImageName();
    const newName = imageNameInput.value.trim()+fileEnding;
    const body = {oldName:oldName,newName:newName};
    http.patch(ApiUrl + "images/rename/", body);
}

//IMAGE UPLOADING
const imageFileInput = document.querySelector("#image-file-input");
imageFileInput.addEventListener("change",updateUploadedImageName);
const uploadedImageNameElement = document.querySelector("#uploaded-image-name")
document.querySelector("#upload-image-button").addEventListener("click",uploadImage)

async function uploadImage(e) {
    e.preventDefault();
    const image = imageFileInput.files[0]; 
    const encoded = await toBase64(image);
    const response = await http.post(`${ApiUrl}images/upload/`,{name:image.name,data:encoded});
    if (response.ok) showError("Upload successful.")
}
function updateUploadedImageName() {
    uploadedImageNameElement.textContent = imageFileInput.files[0].name;
}
// Menu

const menuIcon = document.querySelector("#menu-icon");
menuIcon.addEventListener("click", toggleMenu);

function toggleMenu() {
    const menuOpen = loginContainer.classList.contains("open");
    if (!menuOpen) {
        loginContainer.classList.add("open");
        menuIcon.classList.replace("bi-list", "bi-x");
        return;
    }
    loginContainer.classList.remove("open");
    menuIcon.classList.replace("bi-x", "bi-list");
}

initalLogin();
previewImage();
updatePreview();