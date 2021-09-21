import { Component, Host, Element, Prop, h } from '@stencil/core';
let eventData;
let componentElement;
let listElement;
let detailButton;
let sortButton;
let expanded = false;
let previousYears = [];
export class EventList {
  render() {
    return (h(Host, null,
      h("ul", { class: "eventList" })));
  }
  componentDidLoad() {
    console.log(this.dataurl);
    referenceObjects(this.el);
    //Event data is fetched AFTER elements have been referenced. Otherwise, there would be nowhere to append elements in fillList()
    fetch(this.dataurl)
      .then(results => results.json())
      .then(data => {
      eventData = data.events;
      sortItems();
      console.log(`%cEvent data was last updated ${data.lastUpdated}.`, "color:darkgreen; font-family:'Open Sans', sans-serif;line-height:20pt");
      updateLayout();
    });
    if (this.buttons)
      addButtons();
    if (this.color)
      this.el.style.cssText = "--line-color:" + this.color;
    if (this.animated)
      listElement.classList.add("animated");
    if (this.animated && this.buttons)
      componentElement.querySelector(".buttonFrame").classList.add("fadeIn");
  }
  static get is() { return "event-list"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["event-list.css"]
  }; }
  static get styleUrls() { return {
    "$": ["event-list.css"]
  }; }
  static get properties() { return {
    "dataurl": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "dataurl",
      "reflect": false
    },
    "buttons": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "buttons",
      "reflect": false
    },
    "animated": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "animated",
      "reflect": false
    },
    "color": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "color",
      "reflect": false
    }
  }; }
  static get elementRef() { return "el"; }
}
function referenceObjects(hostElement) {
  componentElement = hostElement.shadowRoot;
  listElement = componentElement.querySelector("ul");
}
function fillList() {
  listElement.innerHTML = "";
  previousYears = [];
  for (const event of eventData) {
    const date = new Date(event.date);
    checkIfYearIsNew(date);
    const listItem = document.createElement("LI");
    const listItemContent = `
    <div class="date">
      <small>${getMonth(date)}</small>
      <p class="dateNumber">${getDate(date)}</p>
    </div>
    <div class="event">
        <h5 class="time"><p class='weekday'>${event.start + ' – ' + event.end + ' Uhr'}</p></h5>
      <h2 class="eventTitle">${event.title}</h2>
      <div class="info">
        <h3 class="city">${event.city}</h3> ${event.location}
      <p class="description">${event.description}</p>
      </div>
      <div class="details" style='display:none'>
        <h4 class="adress"><p class="detail">Adress 📍</p>${event.adress}</h4>
        <h4 class="location"><p class="detail">Location </p>${event.location}</h4>
        <h4 class="clickDate"><p class="detail">Date <small>📅</small></p>${getDayName(date) + ", " + (convertDate(date))}</h4>
        <h4><p class="detail">Time</p>${event.start} – ${event.end} Uhr </h4> 
        <h4 style="margin-top:0.5em"><p class="detail">Description</p></h4>
        <div style='text-align: justify'>
          <p class="eventText">${event.description}</p>
        </div>
      </div>
    </div>
    <div class="eventImage" style="background-image:${"url(" + getImageLink(event) + ")"}">
    </div>`;
    listItem.innerHTML = listItemContent;
    listItem.addEventListener("click", () => expandItem(listItem));
    listItem.querySelectorAll(".adress").forEach(a => a.addEventListener("click", () => openAdress(event.adress)));
    listItem.querySelectorAll(".location").forEach(a => a.addEventListener("click", () => googleLocation(event.location, event.adress)));
    listItem.querySelector(".clickDate").addEventListener("click", () => openDate(event.date));
    listElement.appendChild(listItem);
  }
}
function getImageLink(event) {
  if (!event.image) {
    //retun link to stock image in case no image link was specified.
    return "https://images.unsplash.com/photo-1529651737248-dad5e287768e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1901&q=80";
  }
  return event.image;
}
function checkIfYearIsNew(date) {
  const currentYear = date.getFullYear();
  const yearHeader = document.createElement("DIV");
  yearHeader.className = "yearHeader";
  yearHeader.textContent = currentYear.toString();
  ;
  if (previousYears.indexOf(currentYear) == -1) {
    listElement.appendChild(yearHeader);
    previousYears.push(currentYear);
    listElement.appendChild(document.createElement("HR"));
  }
}
function openAdress(adress) {
  const url = 'https://www.google.com/maps/place/' + adress;
  window.open(url, '_blank');
}
function openDate(input) {
  const date = new Date(input);
  const day = date.getFullYear() + "/" + (date.getMonth() + 1).toString() + "/" + date.getDate();
  const url = 'https://calendar.google.com/calendar/u/0/r/day/' + day;
  window.open(url, '_blank');
}
function googleLocation(location, adress) {
  const url = 'http://www.google.com/search?q=' + location + " " + adress;
  window.open(url, '_blank');
}
function expandItem(listItem) {
  const info = listItem.querySelector(".info");
  const details = listItem.querySelector(".details");
  if (details.style.display == "none") {
    info.style.display = "none";
    details.style.display = "contents";
    listItem.style.cursor = "auto";
  }
  else {
    info.style.display = "contents";
    details.style.display = "none";
    listItem.style.cursor = "pointer";
  }
}
function convertDate(date) {
  let day = date.getDate().toString();
  if (day.length < 2)
    day = "0" + day;
  let month = (date.getMonth() + 1).toString();
  if (month.length < 2)
    month = "0" + month;
  return day + "." + month + "." + date.getFullYear();
}
function getDayName(date, short) {
  const weekdays = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];
  if (short)
    return weekdays[date.getDay()].slice(0, 3).toUpperCase();
  return weekdays[date.getDay()];
}
function getDate(date) {
  let dateNumber = date.getDate().toString();
  if (dateNumber.length < 2)
    dateNumber = "0" + dateNumber;
  return dateNumber;
}
function getMonth(date) {
  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
  ];
  return monthNames[date.getMonth()];
}
//This code adds a buttons to collapse or expand all elements and to sort items.
function addButtons() {
  const buttonFrame = document.createElement("DIV");
  buttonFrame.classList.add("buttonFrame");
  detailButton = document.createElement("P");
  detailButton.textContent = "Show Details";
  detailButton.classList.add("detailButton");
  sortButton = document.createElement("P");
  sortButton.textContent = "Sort Items";
  sortButton.classList.add("sortButton");
  componentElement.insertBefore(buttonFrame, listElement);
  buttonFrame.appendChild(detailButton);
  buttonFrame.appendChild(sortButton);
  detailButton = componentElement.querySelector(".detailButton");
  detailButton.addEventListener("click", expandAllItems);
  sortButton = componentElement.querySelector(".sortButton");
  sortButton.addEventListener("click", sortItems);
}
function expandAllItems() {
  //this function forces all elements to collapse or expand, reagrdless of their current state
  const listItems = componentElement.querySelectorAll("LI");
  for (const listItem of listItems) {
    const info = listItem.querySelector(".info");
    const details = listItem.querySelector(".details");
    if (!expanded) {
      detailButton.textContent = "Hide Details";
      info.style.display = "none";
      details.style.display = "contents";
      listItem.style.cursor = "auto";
    }
    else {
      detailButton.textContent = "Show Details";
      info.style.display = "contents";
      details.style.display = "none";
      listItem.style.cursor = "pointer";
    }
  }
  expanded = !expanded;
}
function sortItems() {
  if (sortButton.textContent.includes("↓")) {
    sortButton.textContent = "Sort Items ↑";
    eventData.sort(compareDescending);
  }
  else {
    sortButton.textContent = "Sort Items ↓";
    eventData.sort(compareAscending);
  }
  fillList();
}
function compareAscending(a, b) {
  //sorting function adapted from https://stackoverflow.com/a/1129270
  if (a.date < b.date) {
    return -1;
  }
  if (a.date > b.date) {
    return 1;
  }
  return 0;
}
function compareDescending(a, b) {
  if (a.date > b.date) {
    return -1;
  }
  if (a.date < b.date) {
    return 1;
  }
  return 0;
}
//responsiveness
window.addEventListener("resize", updateLayout);
function updateLayout() {
  {
    //Images disapper if viewport width is less than 1000px.
    let imageDisplay = "contents";
    let gridStyle = "1.5fr 9fr 6fr";
    if (window.innerWidth < 1000) {
      imageDisplay = "none";
      gridStyle = "1fr 6fr";
    }
    listElement.querySelectorAll("li").forEach(li => li.style.gridTemplateColumns = gridStyle);
    const images = componentElement.querySelectorAll(".image");
    for (const image of images) {
      image.style.display = imageDisplay;
    }
  }
}
