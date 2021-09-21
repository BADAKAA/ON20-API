'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-9fa09edd.js');

const heartButtonCss = ":host{display:block}#likeBtn{cursor:pointer;width:45px;height:45px;background-color:#100B00;border-radius:4px;color:white;font-size:150%;text-align:center;margin:30px;box-shadow:none;border:none;border-radius:50%}#likeBtn:focus{outline:none}";

let componentElement;
let buttonColor;
let buttonWidth;
let buttonHeight;
let buttonBackground;
let iconSize;
const HeartButton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  componentDidLoad() {
    componentElement = document.querySelector('heart-button').shadowRoot;
    buttonColor = componentElement.querySelector('#likeBtn');
    buttonWidth = componentElement.querySelector('#likeBtn');
    buttonHeight = componentElement.querySelector('#likeBtn');
    iconSize = componentElement.querySelector('#likeBtn');
    if (this.color) {
      buttonColor.style.backgroundColor = this.color;
    }
    if (this.width) {
      if (this.width.includes("px") || this.width.includes("%") || this.width.includes("vw")) {
        buttonWidth.style.width = this.width;
      }
      else {
        console.log('%c Please input a valid width. Permitted units: "px", "%", "vw" ("vw"="%")', "color:orange; font-weight:bold;font-family:'Open sans'");
        throw new Error('Please input a valid width. Permitted units: "px", "%", "vw" ("vw"="%")');
      }
    }
    if (this.height) {
      if (this.height.includes("px") || this.height.includes("%") || this.height.includes("vw")) {
        buttonHeight.style.height = this.height;
      }
      else {
        console.log('%c Please input a valid width. Permitted units: "px", "%", "vw" ("vw"="%")', "color:orange; font-weight:bold;font-family:'Open sans'");
        throw new Error('Please input a valid width. Permitted units: "px", "%", "vw" ("vw"="%")');
      }
    }
    if (this.iconsize) {
      iconSize.style.fontSize = this.iconsize;
    }
  }
  buttonClicked() {
    componentElement = document.querySelector('heart-button').shadowRoot;
    buttonBackground = componentElement.querySelector('#likeBtn');
    if (this.clickcolor) {
      buttonBackground.style.backgroundColor = this.clickcolor;
    }
    /*hier sollte noch Code stehen, um die gemrekten Events auf einer Seite darzustellen*/
  }
  render() {
    return (index.h(index.Host, null, index.h("div", { class: 'heartButton', onClick: () => this.buttonClicked() }, index.h("button", { id: 'likeBtn' }, this.icon))));
  }
  get el() { return index.getElement(this); }
};
HeartButton.style = heartButtonCss;

exports.heart_button = HeartButton;
