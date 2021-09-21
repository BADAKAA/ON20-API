import { Component, Host, h, Prop, Element } from '@stencil/core';
let componentElement;
let buttonColor;
let buttonWidth;
let buttonHeight;
let buttonBackground;
let iconSize;
export class HeartButton {
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
    return (h(Host, null,
      h("div", { class: 'heartButton', onClick: () => this.buttonClicked() },
        h("button", { id: 'likeBtn' }, this.icon))));
  }
  static get is() { return "heart-button"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["heart-button.css"]
  }; }
  static get styleUrls() { return {
    "$": ["heart-button.css"]
  }; }
  static get properties() { return {
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
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "height",
      "reflect": false
    },
    "clickcolor": {
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
      "attribute": "clickcolor",
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
    "iconsize": {
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
      "attribute": "iconsize",
      "reflect": false
    }
  }; }
  static get elementRef() { return "el"; }
}
