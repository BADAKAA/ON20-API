'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-9fa09edd.js');
const searchElement = require('./searchElement-5f7711e6.js');

const searchBarCss = ":host{display:block;width:100%}.searchBarContainer{justify-content:center;position:relative;display:flex;width:100%;z-index:1000}.searchBarFrame{justify-content:center;position:relative;display:flex;z-index:1000;height:60px;width:75%}#searchBar{font-family:'Open Sans', sans-serif;border:1px solid lightgray;padding:0 80px 0 80px;border-radius:30px;font-size:1.4em;outline:none;z-index:1000;width:100%;height:100%}.searchBar:hover{background:#F8F8F8}.searchBar:focus{outline:none;box-shadow:9px 9px 10px #00000077}.searchIcon.angular{height:calc(100% + 2px);background:black;position:absolute;cursor:pointer;z-index:2000;width:auto;left:0;top:0}.searchIcon.round{transform:translate(11%, -49%);background:black;border-radius:50%;position:absolute;cursor:pointer;z-index:2000;height:85%;width:auto;top:50%;left:0}";

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
const SearchBar = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return (index.h(index.Host, null, index.h("div", { class: "searchBarContainer" }, index.h("div", { class: "searchBarFrame" }, index.h("img", { class: "searchIcon", src: "./assets/search.png" }), index.h("input", { type: "text", id: "searchBar", placeholder: "Suche..." })))));
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
      searchBar.addEventListener("keypress", (e) => {
        if (e.key == "Enter")
          googleSearch();
      });
      searchBar.placeholder = "Search Google...";
    }
    else {
      componentToBeSearchedIn = this.component;
      elementToBeSearchedIn = this.element;
      //the search-bar component is initialised only when the element that is supposed to be searched is found.
      const checkIfElementIsReady = setInterval(() => {
        searchedElement = searchElement.getSearchedElement(componentToBeSearchedIn, elementToBeSearchedIn);
        if (searchedElement) {
          this.initializeSearchBar();
          clearInterval(checkIfElementIsReady);
        }
      }, 500);
      //If the element to be searched in cannot be found after 10 seconds, the search for it is ended.
      setTimeout(() => {
        clearInterval(checkIfElementIsReady);
        searchElement.componentNotFound(searchedElement);
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
    searchBar.addEventListener("keypress", (e) => {
      if (e.key == "Enter")
        clearSearch();
    });
    searchIcon.addEventListener("click", () => clearSearch());
    searchedElement = searchElement.getSearchedElement(componentToBeSearchedIn, elementToBeSearchedIn);
    console.log("%cSearch bar target found.\nThis is the element the seach bar is active in: ", "color:darkgreen; font-weight:bold;font-family:'Open sans', sans-serif;line-height:12pt");
    console.log(searchedElement);
  }
  get el() { return index.getElement(this); }
};
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
  searchElement.clearSearchTerm();
}
function search() {
  const input = searchBar.value.toLowerCase();
  if (searchBar.value !== "") {
    searchIcon.src = "./assets/clear.png";
    searchElement.searchElement(searchedElement, input);
  }
  else {
    searchIcon.src = "./assets/search.png";
    searchElement.resetSearch();
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
SearchBar.style = searchBarCss;

exports.search_bar = SearchBar;
