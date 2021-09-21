import { Component, Host, h, Prop, Event, Listen, Method } from '@stencil/core';
export class ExampleComponent {
  clickListener() {
    console.log("clicked");
  }
  async exampleToUpperCase() {
    this.exampleProp.toUpperCase;
  }
  exampleHandler(ev) {
    console.log(ev);
    this.exampleEvent.emit("custom value");
  }
  componentDidLoad() {
    console.log("Component loaded");
  }
  render() {
    return (h(Host, null,
      this.exampleProp && h("h2", null,
        " ",
        this.exampleProp,
        " "),
      h("slot", null),
      h("br", null),
      h("button", { onClick: (ev) => this.exampleHandler(ev) }, "exampleEvent abgeben")));
  }
  static get is() { return "example-component"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["example-component.css"]
  }; }
  static get styleUrls() { return {
    "$": ["example-component.css"]
  }; }
  static get properties() { return {
    "exampleProp": {
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
      "attribute": "example-prop",
      "reflect": false
    }
  }; }
  static get events() { return [{
      "method": "exampleEvent",
      "name": "exampleEvent",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      }
    }]; }
  static get methods() { return {
    "exampleToUpperCase": {
      "complexType": {
        "signature": "() => Promise<void>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    }
  }; }
  static get listeners() { return [{
      "name": "click",
      "method": "clickListener",
      "target": undefined,
      "capture": false,
      "passive": false
    }]; }
}
