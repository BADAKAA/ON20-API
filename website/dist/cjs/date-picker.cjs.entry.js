'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-9fa09edd.js');
const searchElement = require('./searchElement-5f7711e6.js');

const datePickerCss = ":host{position:relative;display:flex;justify-content:center;margin-bottom:0px}.datePicker{width:330px;font-size:16pt}.Header{font-size:20pt;font-family:'Catamaran', sans-serif;font-weight:750;margin-top:5px;text-align:center}#previous{margin-right:20px;cursor:pointer}#next{margin-left:20px;cursor:pointer}.monthBoxes{width:45px;text-align:center;font-family:'Open Sans', sans-serif;display:inline-block;padding:8px;cursor:pointer;margin:4px;margin-left:13px;margin-right:6px;margin-bottom:12px;transition:background 0.3s, color}.monthBoxes:hover{background-color:#941C2F;color:#fffcf9}#datePickerFrame{text-align:center}";

const monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dez'
];
const year = new Date().getFullYear();
let yearBox;
let componentElement;
let datePickerElement;
let searchedElement;
const DatePicker = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    //code to find searched element copied from search-bar.tsx 
    const checkIfElementIsReady = setInterval(() => {
      searchedElement = searchElement.getSearchedElement(this.component, this.element);
      if (searchedElement) {
        clearInterval(checkIfElementIsReady);
      }
    }, 500);
  }
  componentDidLoad() {
    componentElement = this.el.shadowRoot;
    const datePickerFrame = componentElement.querySelector('#datePickerFrame');
    this.initialiseMonths(datePickerFrame);
    datePickerElement = componentElement.querySelector('.datePicker');
    yearBox = componentElement.getElementById('year');
    //taken from search-bar.tsx
    if (this.width) {
      if (this.width.includes("px") || this.width.includes("%") || this.width.includes("vw")) {
        datePickerElement.style.width = this.width;
      }
      else {
        console.log('%c Please input a valid width. Permitted units: "px", "%", "vw" ("vw"="%")', "color:orange; font-weight:bold;font-family:'Open sans'");
        throw new Error('Please input a valid width. Permitted units: "px", "%", "vw" ("vw"="%")');
      }
    }
    if (this.backgroundcolor) {
      datePickerElement.style.background = this.backgroundcolor;
    }
  }
  //hier werden die Monate dargestellt
  initialiseMonths(datePickerFrame) {
    for (const monthName of monthNames) {
      const monthBox = document.createElement('DIV');
      monthBox.className = 'monthBoxes';
      monthBox.textContent = monthName;
      monthBox.addEventListener('click', (ev) => monthClicked(ev));
      datePickerFrame.appendChild(monthBox);
    }
  }
  ;
  render() {
    return (index.h(index.Host, null, index.h("div", { class: 'datePicker' }, index.h("div", { class: 'Header' }, index.h("span", { id: 'previous', onClick: () => changeYear('-') }, '<'), index.h("span", { id: 'year' }, year), index.h("span", { id: 'next', onClick: () => changeYear('+') }, '>')), index.h("div", { id: 'datePickerFrame' }))));
  }
  get el() { return index.getElement(this); }
};
function monthClicked(ev) {
  const monthElement = ev.target;
  const monthIndex = monthNames.indexOf(monthElement.textContent) + 1;
  let month = monthIndex.toString();
  if (month.length < 2)
    month = "0" + month;
  if (monthElement.style.background == "") {
    clearMonthColor();
    //only search when month has not been clicked previously.
    monthElement.style.background = '#941C2F';
    monthElement.style.color = '#fffcf9';
    searchElement.searchDate(month.toString() + "." + yearBox.textContent, searchedElement);
  }
  else {
    clearMonthColor();
    searchElement.clearDateSearch();
    searchElement.resetSearch();
  }
}
function changeYear(direction) {
  let year = parseInt(yearBox.textContent);
  if (direction === '-') {
    year--;
  }
  if (direction === '+') {
    year++;
  }
  yearBox.textContent = year.toString();
}
function clearMonthColor() {
  const allMonths = document.querySelector('date-picker').shadowRoot.querySelectorAll('.monthBoxes');
  for (const monthBox of allMonths) {
    monthBox.style.background = '';
    monthBox.style.color = '';
  }
}
DatePicker.style = datePickerCss;

exports.date_picker = DatePicker;
