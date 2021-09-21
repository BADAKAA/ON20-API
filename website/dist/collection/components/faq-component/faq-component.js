import { Component, Host, h, Prop, Element } from '@stencil/core';
let componentElement;
let questionElement;
export class FaqComponent {
  render() {
    return (h(Host, null,
      h("div", { class: "faqCard" },
        h("div", { class: "heading" },
          h("p", { class: "question" }, this.question)),
        h("div", { class: "textBody" },
          h("p", { id: "answerText" }, this.answer)))));
  }
  componentDidLoad() {
    componentElement = this.el.shadowRoot;
    defineObjectReferences();
  }
  static get is() { return "faq-component"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["faq-component.css"]
  }; }
  static get styleUrls() { return {
    "$": ["faq-component.css"]
  }; }
  static get properties() { return {
    "question": {
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
      "attribute": "question",
      "reflect": false
    },
    "answer": {
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
      "attribute": "answer",
      "reflect": false
    }
  }; }
  static get elementRef() { return "el"; }
}
function defineObjectReferences() {
  questionElement = componentElement.querySelector(".question");
  questionElement.addEventListener("click", (ev) => makeAnswerInvisible(ev));
}
function makeAnswerInvisible(ev) {
  const targetElement = ev.target;
  const textBody = targetElement.parentElement.parentElement.querySelector(".textBody");
  console.log(textBody);
  if (textBody.style.display == "inline-block") {
    textBody.style.display = "none";
  }
  else {
    textBody.style.display = "inline-block";
  }
}
