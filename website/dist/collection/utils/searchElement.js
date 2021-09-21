let searchedDate = "";
let searchedElement;
let searchTerm = "";
export function searchElement(element, input) {
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
export function searchDate(date, element) {
  searchedDate = date;
  if (element)
    searchElement(element);
}
export function clearDateSearch() {
  searchedDate = "";
  searchElement();
}
export function resetSearch() {
  const childElements = getChildren();
  for (const element of childElements) {
    element.style.visibility = "";
    element.style.position = "";
    element.style.opacity = "1";
  }
}
export function clearSearchTerm() {
  searchTerm = "";
  searchElement();
}
export function getChildren() {
  if (typeof searchedElement === typeof HTMLUListElement || typeof searchedElement === typeof HTMLOListElement) {
    return searchedElement.querySelectorAll("li");
  }
  return searchedElement.children;
}
