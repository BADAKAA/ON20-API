import { Component, Host, h, Prop } from '@stencil/core';
export class MySmlink {
  componentDidLoad() { }
  instagram() {
    const instagram = this.link;
    window.open(instagram);
  }
  facebook() {
    const facebook = this.link;
    window.open(facebook);
  }
  twitter() {
    const twitter = this.link;
    window.open(twitter);
  }
  render() {
    return (h(Host, null,
      h("slot", null,
        h("div", { class: "smlink" },
          h("element", { onClick: () => this.instagram() },
            this.icon && h("img", { src: this.icon }),
            " ")))));
  }
  static get is() { return "my-smlink"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["my-smlink.css"]
  }; }
  static get styleUrls() { return {
    "$": ["my-smlink.css"]
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
    "link": {
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
      "attribute": "link",
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
    }
  }; }
}
/*<button class={`btn ${this.aussehen}`}type="button">
{this.name}
 </button> */
