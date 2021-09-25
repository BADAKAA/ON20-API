//UTILS
function copy(text) {
    const element = document.createElement("textarea");
    document.body.appendChild(element);
    element.value = text;
    element.select();
    element.setSelectionRange(0, 99999); // https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
    navigator.clipboard.writeText(element.value);
    element.remove();
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const $ = (query) => document.querySelector(query);

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
            let error = await response.text();
            if (error.includes("<!DOCTYPE")) error= response.statusText;
            if (error[0]==="{") error = JSON.parse(error).message; 
            showMessage("Failed request: " + error);
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

const errorField = $("#error-message")
let errorTimeout = 0;

const loginContainer = $("#login-container");
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
    showMessage("URL copied!",true)
}
const addEventButton = $("#add-event-button");
addEventButton.addEventListener("click", addEvent);

const eventSelector = $("#index-input");
eventSelector.addEventListener("change",updateEventPreview)

const previewEventButton = $("#update-preview-button");
previewEventButton?.addEventListener("click", updateEventPreview);

const deleteEventButton = $("#delete-event-button");
deleteEventButton.addEventListener("click", deleteEvent);

const updateEventButton = $("#update-event-button");
updateEventButton.addEventListener("click", updateEvent);

const loginButton = $("#login-button");
loginButton.addEventListener("click", loginRequest);

const logoutButton = $("#logout-button");
logoutButton.addEventListener("click", logout);

const previewEventInputs = document.querySelectorAll(".preview-event-input");
for (const input of previewEventInputs) {
    input.addEventListener("keydown",e=> {
        if(e.key==="Enter") updateEvent(e);
    })
}

function showMessage(error,positive) {
    if (errorField.classList.contains("positive")) errorField.classList.remove("positive");
    if (positive && !errorField.classList.contains("positive")) errorField.classList.add("positive"); 
    errorField.textContent = error;
    clearInterval(errorTimeout)
    errorTimeout = setInterval(() => errorField.textContent = "", 5000)
}

function logout() {
    loggedIn = false;
    loginData.username = "";
    loginData.password = "";

    localStorage.removeItem("ON20-Event-API-preferences");

    if (loginContainer.classList.contains("logged-in")) loginContainer.classList.remove("logged-in");
}

async function loginRequest(username, password, alreadyHashed) {

    const usernameInput = $("#username-input");
    const passwordInput = $("#password-input")

    const newUserName = username || usernameInput?.value.trim();
    const newPassword = password || passwordInput?.value.trim();

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

function openImageInNewWindow(e) {
    const inputLink = e.target.parentElement.querySelector("input").value;
    if (!inputLink) return e.preventDefault();
    e.target.href = inputLink;
}

async function updateEventPreview(e) {
    if (e) e.preventDefault();
    firstEventDisplayed = true;
    const eventRequest = await http.get(ApiUrl + "events");
    const events = await eventRequest.json();

    const response = await http.get(ApiUrl + "events/" + getIndex(eventSelector,events.length));

    if (!response || !response.ok) {
        for (const input of previewEventInputs) {
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
    for (const input of previewEventInputs) {
        input.value = selectedEvent[input.name] ?? "";
        if (input.nodeName == "TEXTAREA") {
            input.style.height = "";
            input.style.height = input.scrollHeight + "px";
        }
    }
}

async function deleteEvent(e) {
    e.preventDefault();
    if (!firstEventDisplayed) return showMessage("No event selected yet.");
    const eventSelector = $("#index-input");
    const response = await http.delete(ApiUrl + "events/delete/" + eventSelector.value, null,loginData);
    eventSelector.value = 0;
    updateEventPreview();
    if (response.ok) showMessage("Deletion successful.",true);
}

async function updateEvent(e) {
    e?.preventDefault();
    if (!firstEventDisplayed) return showMessage("No event selected yet.");
    const eventSelector = $("#index-input");
    const newEvent = {};
    for (const input of previewEventInputs) {
        newEvent[input.name] = input.value ?? "";
    }
    const response = await http.patch(ApiUrl + "events/patch/" + eventSelector.value, newEvent);
    if (!response.ok) return console.error("Event not found.");
    showMessage("Event updated successfully.",true)
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
$("#delete-image-button").addEventListener("click", deleteImage);
$("#rename-image-button").addEventListener("click", renameImage);

document.querySelectorAll(".update-index-button").forEach(b=>b.addEventListener("click",updateIndex));
function updateIndex(e) {
    e.preventDefault();
    const input = e.target.parentElement.parentElement.querySelector("input");
    e.target.classList.contains("next") ? input.value++ : input.value--;
    previewImage();
    updateEventPreview();
}


const imageNameInput = $("#image-name-input");
imageNameInput.addEventListener("keydown",e => {if(e.key==="Enter") renameImage(e)});
const imageIndexInput = $("#image-index-input");
imageIndexInput.addEventListener("change",previewImage);
const imageUrlInput = $("#image-url-input");
const previewImageElement = $("#image-preview"); 

function resetImagePreview() {
    imageNameInput.value = "";
    imageUrlInput.value = "";
    previewImageElement.src = "";
}
function getIndex(element,maxArrayLength) {
    let index = element.value;
    if (index > maxArrayLength-1) {
        if (index > maxArrayLength) showMessage("An element with this index does not exist");
        index = 0;
        element.value = index;
    }
    if (index < 0 || parseInt(index)<0) {
        index = maxArrayLength-1;
        element.value = index;
    }
    return index;
}
async function getCurrentImageName() {
    const response = await http.get(`${ApiUrl}images`);
    const imageList = await response.json();
    let index = getIndex(imageIndexInput,imageList.length);
    return imageList[index];
}
let fileEnding = "";
async function previewImage(filename) {
    const imageName = filename || await getCurrentImageName();
    if (!imageName) {
        showMessage("This image was not found.");
        return resetImagePreview();
    }
    const imageURL = `${ApiUrl}images/${imageName}`;
    imageUrlInput.value = imageURL;
    const parsedName = imageName.split("."); // The ending is not displayed in the input field and is later added in the "renameImage()"-method.
    fileEnding = "."+parsedName.pop();
    imageNameInput.value = parsedName.join(".");
    previewImageElement.src = imageURL;
}
async function deleteImage(e) {
    e.preventDefault();
    const imageName = await getCurrentImageName();
    const response = await http.delete(ApiUrl + "images/delete/" + imageName, null,loginData);
    if (response.ok) showMessage("Deletion successful.",true);
    imageIndexInput.value = 0;
    previewImage();
}
async function renameImage(e) {
    e?.preventDefault();
    const oldName = await getCurrentImageName();
    const newName = imageNameInput.value.trim()+fileEnding;
    const body = {oldName:oldName,newName:newName};
    const response = await http.patch(ApiUrl + "images/rename/", body);
    if (response.ok) showMessage("Image renamed successfully.",true);
    previewImage(newName);
}

//IMAGE UPLOADING
const imageFileInput = $("#image-file-input");
imageFileInput.addEventListener("change",updateUploadedImageName);
const uploadedImageNameElement = $("#uploaded-image-name")
$("#upload-image-button").addEventListener("click",uploadImage)

async function uploadImage(e) {
    e.preventDefault();
    const image = imageFileInput.files[0]; 
    const encoded = await toBase64(image);
    const response = await http.post(`${ApiUrl}images/upload/`,{name:image.name,data:encoded});
    if (response.ok) showMessage("Upload successful.",true);
    resetImageUpload();
}
function updateUploadedImageName() {
    uploadedImageNameElement.textContent = imageFileInput.files[0].name;
}
function resetImageUpload() {
    uploadedImageNameElement.textContent = "";
}
// MENU

const menuIcon = $("#menu-icon");
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
// HEADER
const header = $("header");
function updateHeader() {
    if (window.scrollY<10 && header.classList.contains("stuck")) header.classList.remove("stuck");
    if (window.scrollY>10 && !header.classList.contains("stuck")) header.classList.add("stuck");
}
window.addEventListener("scroll",updateHeader);

initalLogin();
previewImage();
updateEventPreview();