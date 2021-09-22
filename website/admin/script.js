class HTTP {
        
    async request(method,url,body) {
        const HTTPRequest = {
            method: method,
            headers: {
                'Content-type': 'application/json'
            }
        };
        if (body) HTTPRequest.body = JSON.stringify(body);
        const response = await fetch(url, HTTPRequest);
        console.log("The following request was sent to ",url.trim(),":\n",HTTPRequest,"\n\nThe response was:\n",response);
        if (!response.ok) console.error("Response error:\n",await response.text());
        return response;
    }

    delete = async (url) => this.request("DELETE",url);
    get = async (url) => this.request("GET",url);
    patch = async (url,body) => this.request("PATCH",url,body);
    post = async (url,body) => this.request("POST",url,body);

}

const http = new HTTP();

let firstEventDisplayed = false;

const addEventButton = document.querySelector("#add-event-button"); 
addEventButton.addEventListener("click",sendPost);

const previewEventButton = document.querySelector("#update-preview-button"); 
previewEventButton.addEventListener("click",updatePreview);

const deleteEventButton = document.querySelector("#delete-event-button"); 
deleteEventButton.addEventListener("click",deleteEvent);

const updateEventButton = document.querySelector("#update-event-button"); 
updateEventButton.addEventListener("click",updateEvent);

const previewImageButtons = document.querySelectorAll(".preview-image-button")
for (const button of previewImageButtons) {
    button.addEventListener("click",previewImage)
};

function previewImage(e) {
    const inputLink = e.target.parentElement.querySelector("input").value;
    if (!inputLink) return e.preventDefault();
    e.target.href = inputLink;
}


async function deleteEvent(e) {
    e.preventDefault();
    if (!firstEventDisplayed) return console.error("No event selected yet.");
    const eventSelector = document.querySelector("#index-input");
    const response = await http.delete("http://localhost:8080/events/delete/"+eventSelector.value);
    if (response.ok) console.log("DELETION SUCESSFULL");
}

async function updateEvent(e) {
    e.preventDefault();
    if (!firstEventDisplayed) return console.error("No event selected yet.");
    const eventSelector = document.querySelector("#index-input");
    const newEvent = {};
    const inputs = document.querySelectorAll(".preview-event-input");
    for (const input of inputs) {
        newEvent[input.name] = input.value??"";
    }
    const response = await http.patch("http://localhost:8080/events/patch/"+eventSelector.value,newEvent);
    if (!response) return console.error("Event not found.");
}

async function updatePreview(e) {
    e.preventDefault();
    firstEventDisplayed=true;
    const eventSelector = document.querySelector("#index-input");
    const response = await http.get("http://localhost:8080/events/"+eventSelector.value);
    if (!response) return console.error("Event not found.");
    const selectedEvent = await response.json();
    const inputs = document.querySelectorAll(".preview-event-input");
    for (const input of inputs) {
        input.value = selectedEvent[input.name]??"";
        if (input.nodeName=="TEXTAREA") {
            input.style.height = "";
            input.style.height = input.scrollHeight + "px";
        }
    }
}
function sendPost(e) {
    e.preventDefault();
    const inputs = document.querySelectorAll(".add-event-input");
    const values = {};

    for (const input of inputs) {
        values[input.id] = input.value;
    }
    http.post("http://localhost:8080/events/post",{
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


