//The main logic fpr the search bar comes from this tutorial:
//https://www.youtube.com/watch?v=3NG8zy0ywIk
import { Component, Host, h, Prop, Element, } from '@stencil/core';
import { componentNotFound, getSearchedElement } from '../../utils/findElement';
import { clearSearchTerm, resetSearch, searchElement } from '../../utils/searchElement';
//variables to control this component
let componentElement;
let searchBarContainer;
let searchBarFrame;
let searchIcon;
let searchBar;
//variables to store user input preperties
let componentToBeSearchedIn;
let elementToBeSearchedIn;
//element in which the search bar is acitve
let searchedElement;
export class SearchBar {
  render() {
    return (h(Host, null,
      h("div", { class: "searchBarContainer" },
        h("div", { class: "searchBarFrame" },
          h("img", { class: "searchIcon", src: "./assets/search.png" }),
          h("input", { type: "text", id: "searchBar", placeholder: "Suche..." })))));
  }
  componentDidLoad() {
    //declare variables to control this component
    componentElement = this.el.shadowRoot;
    searchBarFrame = componentElement.querySelector(".searchBarFrame");
    searchBarContainer = componentElement.querySelector(".searchBarContainer");
    searchIcon = componentElement.querySelector(".searchIcon");
    searchBar = componentElement.querySelector("#searchBar");
    //check if google-mode was activated by user through "google" property
    if (this.google && this.google == "true") {
      searchIcon.addEventListener("click", googleSearch);
      searchBar.addEventListener("keypress", (e) => { if (e.key == "Enter")
        googleSearch(); });
      searchBar.placeholder = "Search Google...";
    }
    else {
      componentToBeSearchedIn = this.component;
      elementToBeSearchedIn = this.element;
      //the search-bar component is initialised only when the element that is supposed to be searched is found.
      const checkIfElementIsReady = setInterval(() => {
        searchedElement = getSearchedElement(componentToBeSearchedIn, elementToBeSearchedIn);
        if (searchedElement) {
          this.initializeSearchBar();
          clearInterval(checkIfElementIsReady);
        }
      }, 500);
      //If the element to be searched in cannot be found after 10 seconds, the search for it is ended.
      setTimeout(() => {
        clearInterval(checkIfElementIsReady);
        componentNotFound(searchedElement);
      }, 10000);
    }
    //apply user input style porperties
    if (this.offset)
      searchBarFrame.style.transform += ` translateY(${this.offset})`;
    if (this.position && this.position == "absolute")
      searchBarContainer.style.position = "absolute";
    if (this.margin)
      searchBarFrame.style.margin = this.margin;
    if (this.icon)
      searchIcon.style.background = this.icon;
    if (this.background)
      searchBar.style.background = this.background;
    if (checkIfValid(this.width))
      searchBarFrame.style.width = this.width;
    if (checkIfValid(this.height))
      searchBarFrame.style.height = this.height;
    style(this.design);
    if (this.justify) {
      let justify = "center";
      if (this.justify == "right")
        justify = "flex-end";
      if (this.justify == "left")
        justify = "flex-start";
      searchBarContainer.style.justifyContent = justify;
    }
  }
  initializeSearchBar() {
    searchBar.addEventListener("input", search);
    searchBar.addEventListener("keypress", (e) => { if (e.key == "Enter")
      clearSearch(); });
    searchIcon.addEventListener("click", () => clearSearch());
    searchedElement = getSearchedElement(componentToBeSearchedIn, elementToBeSearchedIn);
    console.log("%cSearch bar target found.\nThis is the element the seach bar is active in: ", "color:darkgreen; font-weight:bold;font-family:'Open sans', sans-serif;line-height:12pt");
    console.log(searchedElement);
  }
  static get is() { return "search-bar"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["search-bar.css"]
  }; }
  static get styleUrls() { return {
    "$": ["search-bar.css"]
  }; }
  static get properties() { return {
    "component": {
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
      "attribute": "component",
      "reflect": false
    },
    "element": {
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
      "attribute": "element",
      "reflect": false
    },
    "position": {
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
      "attribute": "position",
      "reflect": false
    },
    "icon": {
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
      "attribute": "icon",
      "reflect": false
    },
    "width": {
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
      "attribute": "width",
      "reflect": false
    },
    "height": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "height",
      "reflect": false
    },
    "google": {
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
      "attribute": "google",
      "reflect": false
    },
    "offset": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "offset",
      "reflect": false
    },
    "justify": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "justify",
      "reflect": false
    },
    "margin": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "margin",
      "reflect": false
    },
    "design": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "design",
      "reflect": false
    },
    "background": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "background",
      "reflect": false
    }
  }; }
  static get elementRef() { return "el"; }
}
function clearSearch() {
  searchBar.value = "";
  search();
  /*
    If this  function was not called, the search term would remain in "searchElement.ts".
    This would not cause any Problems with the search bar itself, as the search term in "searchElement.ts" is reset on a new search.
    However, the next search with the date picker would only return results that match both the date and the last search term.
    This is because picking a date should preserve the search term.
    Thus, the date picker starts a search without an input search value.
    Because the search function only changes the search term when an input is received, the last term would remain.
  */
  clearSearchTerm();
}
function search() {
  const input = searchBar.value.toLowerCase();
  if (searchBar.value !== "") {
    searchIcon.src = "./assets/clear.png";
    searchElement(searchedElement, input);
  }
  else {
    searchIcon.src = "./assets/search.png";
    resetSearch();
  }
}
function googleSearch() {
  //code adapted  from https://stackoverflow.com/a/16649417
  const input = searchBar.value;
  const url = 'http://www.google.com/search?q=' + input;
  window.open(url, '_blank');
}
function style(design) {
  if (design && design == "angular") {
    searchBar.style.borderRadius = "0px";
    searchIcon.classList.add("angular");
  }
  else {
    searchIcon.classList.add("round");
    searchBar.style.borderRadius = (searchBar.offsetHeight / 2).toString() + "px";
  }
  searchBar.style.paddingLeft = (1.5 * searchIcon.offsetHeight).toString() + "px";
}
function checkIfValid(input) {
  if (!input)
    return false;
  if (input.includes("px") || input.includes("%") || input.includes("vw"))
    return true;
  console.log('%cPlease input a valid width or height. Permitted units are: "px", "%", "vw" ("vw"="%")', "color:darkorange; font-weight:bold;font-family:'Open sans'");
  return false;
}
