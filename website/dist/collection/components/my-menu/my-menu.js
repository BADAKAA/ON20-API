import { Component, Host, h, Prop } from '@stencil/core';
//enthält  events, location, persönliche eventübersicht
export class MyMenu {
  clicked() {
    console.log(this.window);
    if (this.element) {
      const scrollTarget = document.querySelector(this.element);
      console.log(scrollTarget);
      scrollTarget.scrollIntoView({ behavior: 'smooth' });
    }
    else if (this.url) {
      if (this.window && this.window === "new") {
        window.open(this.url, "_blank");
      }
      else {
        window.open(this.url, "_self");
      }
    }
  }
  render() {
    return (h(Host, null,
      h("slot", null,
        h("div", { class: "leiste" },
          h("button", { class: "button", type: "button", onClick: () => this.clicked() }, this.name)))));
  }
  static get is() { return "my-menu"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["my-menu.css"]
  }; }
  static get styleUrls() { return {
    "$": ["my-menu.css"]
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
    },
    "url": {
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
      "attribute": "url",
      "reflect": false
    },
    "window": {
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
      "attribute": "window",
      "reflect": false
    }
  }; }
}
