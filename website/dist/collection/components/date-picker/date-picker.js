import { Prop, Component, h, Host, Element } from '@stencil/core';
import { getSearchedElement } from '../../utils/findElement';
import { clearDateSearch, resetSearch, searchDate } from '../../utils/searchElement';
const monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dez'
];
const year = new Date().getFullYear();
let yearBox;
let componentElement;
let datePickerElement;
let searchedElement;
export class DatePicker {
  constructor() {
    //code to find searched element copied from search-bar.tsx 
    const checkIfElementIsReady = setInterval(() => {
      searchedElement = getSearchedElement(this.component, this.element);
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
    return (h(Host, null,
      h("div", { class: 'datePicker' },
        h("div", { class: 'Header' },
          h("span", { id: 'previous', onClick: () => changeYear('-') }, '<'),
          h("span", { id: 'year' }, year),
          h("span", { id: 'next', onClick: () => changeYear('+') }, '>')),
        h("div", { id: 'datePickerFrame' }))));
  }
  static get is() { return "date-picker"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["date-picker.css"]
  }; }
  static get styleUrls() { return {
    "$": ["date-picker.css"]
  }; }
  static get properties() { return {
    "backgroundcolor": {
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
      "attribute": "backgroundcolor",
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
    "component": {
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
    }
  }; }
  static get elementRef() { return "el"; }
}
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
    searchDate(month.toString() + "." + yearBox.textContent, searchedElement);
  }
  else {
    clearMonthColor();
    clearDateSearch();
    resetSearch();
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
