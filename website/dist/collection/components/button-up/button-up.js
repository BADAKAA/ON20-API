import { Component, Host, h, Prop } from '@stencil/core';
let componentElement;
let elementBackground;
let elementHover;
let elementText;
export class ButtonUp {
  backToTop() {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }
  MouseUp() {
    componentElement = document.querySelector("button-up").shadowRoot;
    elementBackground = componentElement.querySelector("#buttonUp");
    if (this.colorbackground) {
      elementBackground.style.backgroundColor = this.colorbackground;
    }
  }
  MouseOver() {
    componentElement = document.querySelector("button-up").shadowRoot;
    elementHover = componentElement.querySelector("#buttonUp");
    if (this.colorhover) {
      elementHover.style.backgroundColor = this.colorhover;
    }
  }
  render() {
    return (h(Host, null,
      h("div", { class: "button" },
        h("button", { id: "buttonUp", onClick: () => this.backToTop(), onMouseMove: () => this.MouseOver(), onMouseOut: () => this.MouseUp() }, this.name))));
  }
  componentDidLoad() {
    componentElement = document.querySelector("button-up").shadowRoot;
    elementBackground = componentElement.querySelector("#buttonUp");
    elementText = componentElement.querySelector("#buttonUp");
    if (this.colorbackground) {
      elementBackground.style.backgroundColor = this.colorbackground;
    }
    if (this.colortext) {
      elementText.style.color = this.colortext;
    }
  }
  static get is() { return "button-up"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["button-up.css"]
  }; }
  static get styleUrls() { return {
    "$": ["button-up.css"]
  }; }
  static get properties() { return {
    "name": {
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
      "attribute": "name",
      "reflect": false
    },
    "colorbackground": {
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
      "attribute": "colorbackground",
      "reflect": false
    },
    "colorhover": {
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
      "attribute": "colorhover",
      "reflect": false
    },
    "colortext": {
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
      "attribute": "colortext",
      "reflect": false
    }
  }; }
}
