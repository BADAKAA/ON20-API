import { Component, Host, h, Prop } from '@stencil/core';
let body;
let componentElement;
let buttonClose;
let acceptButton;
let banner;
export class CookieBanner {
  linkGuidelines() {
    window.open(this.link);
  }
  render() {
    return (h(Host, null,
      h("div", { class: "container" },
        h("div", { class: "content" },
          h("button", { id: "closeButton", class: "buttons" }, "\u2715"),
          h("p", { class: "heading" }, this.heading && h("p", null, this.heading)),
          h("p", null, this.bannertext && h("p", null, this.bannertext)),
          h("p", { onClick: () => this.linkGuidelines() }, this.linkguidelines && h("p", { class: "link" }, this.linkguidelines)),
          h("button", { id: "acceptButton", class: "buttons" }, this.buttontext && h("p", null, this.buttontext)))),
      h("slot", null)));
  }
  componentDidLoad() {
    defineObjectReferences();
    body = document.querySelector("body");
    body.style.overflowY = "hidden";
  }
  static get is() { return "cookie-banner"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["cookie-banner.css"]
  }; }
  static get styleUrls() { return {
    "$": ["cookie-banner.css"]
  }; }
  static get properties() { return {
    "heading": {
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
      "attribute": "heading",
      "reflect": false
    },
    "bannertext": {
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
      "attribute": "bannertext",
      "reflect": false
    },
    "buttontext": {
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
      "attribute": "buttontext",
      "reflect": false
    },
    "linkguidelines": {
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
      "attribute": "linkguidelines",
      "reflect": false
    },
    "link": {
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
      "attribute": "link",
      "reflect": false
    }
  }; }
}
function defineObjectReferences() {
  componentElement = document.querySelector("cookie-banner").shadowRoot;
  buttonClose = componentElement.querySelector("#closeButton");
  acceptButton = componentElement.querySelector("#acceptButton");
  banner = componentElement.querySelector(".container");
  buttonClose.addEventListener("click", removeCookieBanner);
  acceptButton.addEventListener("click", removeCookieBanner);
}
function removeCookieBanner() {
  banner.style.display = "none";
  body.style.overflowY = "scroll";
}
