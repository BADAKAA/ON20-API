import { Component, Host, h, Prop, State, Element } from '@stencil/core';
let componentElement;
let front;
let back;
export class FlipCard {
  constructor() {
    this.flipcard = "flipcard";
  }
  handleMouseOver() {
    this.turnable ? (this.flipcard = "flipcard flipcard-mouseover") : this.flipcard = "flipcard";
  }
  handleMouseOut() {
    this.flipcard = "flipcard";
  }
  googleMaps() {
    const place = this.place;
    const url = "https://www.google.com/maps/place/" + place;
    window.open(url);
  }
  meme() {
    window.open("https://entwicklergate.de/t/lustige-entwickler-programmierer-memes/371");
  }
  render() {
    return (h(Host, null,
      h("div", { class: "flipcardContainer" },
        h("div", { class: this.flipcard, onClick: () => this.meme(), onMouseOver: () => this.handleMouseOver(), onMouseOut: () => this.handleMouseOut() },
          h("div", { class: "content" },
            h("div", { class: "front" },
              h("div", { class: "imgBox" }, this.img && h("img", { src: this.img })),
              this.name && h("h2", null,
                " ",
                this.name,
                " ")),
            h("div", { class: "back" },
              this.name && h("h2", null,
                " ",
                this.name,
                " "),
              h("div", { class: "backInput" },
                h("element", { onClick: () => this.googleMaps() },
                  h("h3", null,
                    " \uD83D\uDCCD ",
                    this.place,
                    " ")),
                h("h3", null,
                  " \uD83D\uDCC5 ",
                  this.date,
                  " "),
                h("p", null,
                  " ",
                  this.description))))))));
  }
  componentDidLoad() {
    componentElement = this.el.shadowRoot;
    front = componentElement.querySelector(".front");
    back = componentElement.querySelector(".back");
    if (this.colorfront) {
      front.style.backgroundColor = this.colorfront;
    }
    if (this.colorback) {
      back.style.backgroundColor = this.colorback;
    }
    if (this.textfront) {
      front.style.color = this.textfront;
    }
    if (this.textback) {
      back.style.color = this.textback;
    }
  }
  static get is() { return "flip-card"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["flip-card.css"]
  }; }
  static get styleUrls() { return {
    "$": ["flip-card.css"]
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
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "name",
      "reflect": false
    },
    "turnable": {
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
      "attribute": "turnable",
      "reflect": false
    },
    "img": {
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
      "attribute": "img",
      "reflect": false
    },
    "place": {
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
      "attribute": "place",
      "reflect": false
    },
    "date": {
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
      "attribute": "date",
      "reflect": false
    },
    "description": {
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
      "attribute": "description",
      "reflect": false
    },
    "colorfront": {
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
      "attribute": "colorfront",
      "reflect": false
    },
    "colorback": {
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
      "attribute": "colorback",
      "reflect": false
    },
    "textfront": {
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
      "attribute": "textfront",
      "reflect": false
    },
    "textback": {
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
      "attribute": "textback",
      "reflect": false
    }
  }; }
  static get states() { return {
    "flipcard": {}
  }; }
  static get elementRef() { return "el"; }
}
