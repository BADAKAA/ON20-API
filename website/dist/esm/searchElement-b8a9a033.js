function getSearchedElement(componentToBeSearchedIn, elementToBeSearchedIn) {
  //if no component has been specified, search for the element directly.
  if (!componentToBeSearchedIn && document.querySelector(elementToBeSearchedIn)) {
    return document.querySelector(elementToBeSearchedIn);
  }
  //check if either the component element can be found in the document.
  if (!document.querySelector(componentToBeSearchedIn)) {
    throw new Error('The element you want to search in cannot be found.');
  }
  //check if the component has a shadowRoot and search within it if that is the case.
  if (document.querySelector(componentToBeSearchedIn).shadowRoot) {
    //if no element is specified, the last child of the component will be searched
    //→ no element property is required to use the "search-bar" with the "event-list" component, as this defines the list as searched object automatically.
    if (!elementToBeSearchedIn) {
      return document.querySelector(componentToBeSearchedIn).shadowRoot.lastChild;
    }
    if (document.querySelector(componentToBeSearchedIn).shadowRoot.querySelector(elementToBeSearchedIn)) {
      return document.querySelector(componentToBeSearchedIn).shadowRoot.querySelector(elementToBeSearchedIn);
    }
  }
  if (document.querySelector(componentToBeSearchedIn)) {
    return document.querySelector(componentToBeSearchedIn).querySelector(elementToBeSearchedIn);
  }
  console.log('%c The element you want to search in cannot be found.', "color:orange; font-weight:bold;font-family:'Open sans'");
  throw new Error('The element you want to search in cannot be found.');
}
function componentNotFound(element) {
  //check if searched Element was found
  if (element)
    return;
  //if not found:
  const errorMessage = "We looked everywhere, but the element you want to search in cannot be found.";
  const tipps = "Try checking the spelling of your element.\n\n" +
    `If you want to search within a component that has a shadow root, make sure to use the component-property (component="COMPONENT-NAME").\n\n` +
    "When searching for an element by id, put a hastag (#) in front of the id.\n" +
    "When searching by class, put a dot (.) in front of the class name.\n" +
    "If you are searching by type you do not need to put anything in front of the type name (e.g. element='ul').\n";
  console.log("%c\n" + errorMessage, "color:orangered; font-weight:bold;font-family:'Open sans', sans-serif;line-height:22pt");
  console.log("%c\n" + tipps, "color:darkgreen; font-weight:bold;font-family:'Open sans', sans-serif;line-height:14pt");
}

let searchedDate = "";
let searchedElement;
let searchTerm = "";
function searchElement(element, input) {
  if (input)
    searchTerm = input;
  if (element)
    searchedElement = element;
  resetSearch();
  const childElements = getChildren();
  for (const element of childElements) {
    //search for string value and disable all elements not containing it
    if (!element.textContent.toLowerCase().includes(searchTerm) || !element.textContent.toLowerCase().includes(searchedDate)) {
      element.style.position = "absolute";
      element.style.visibility = "hidden";
      element.style.opacity = "0";
    }
  }
}
function searchDate(date, element) {
  searchedDate = date;
  if (element)
    searchElement(element);
}
function clearDateSearch() {
  searchedDate = "";
  searchElement();
}
function resetSearch() {
  const childElements = getChildren();
  for (const element of childElements) {
    element.style.visibility = "";
    element.style.position = "";
    element.style.opacity = "1";
  }
}
function clearSearchTerm() {
  searchTerm = "";
  searchElement();
}
function getChildren() {
  if (typeof searchedElement === typeof HTMLUListElement || typeof searchedElement === typeof HTMLOListElement) {
    return searchedElement.querySelectorAll("li");
  }
  return searchedElement.children;
}

export { componentNotFound as a, clearSearchTerm as b, clearDateSearch as c, searchElement as d, getSearchedElement as g, resetSearch as r, searchDate as s };
