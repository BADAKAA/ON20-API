'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-9fa09edd.js');

const faqComponentCss = ":host{display:block}.faqCard{margin-top:10px;width:45%;background-color:#FFFCF9;display:block}.heading{font-family:'Open Sans', sans-serif;font-size:20px;font-weight:600;background-color:#941C2F;color:#FFFCF9;padding-left:15px;padding-right:0px;width:100%;display:flex;align-items:center}.question{cursor:pointer}.textBody{padding-left:15px;padding-right:15px;padding-bottom:10px;max-width:100%;text-align:justify;display:none}";

let componentElement;
let questionElement;
const FaqComponent = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return (index.h(index.Host, null, index.h("div", { class: "faqCard" }, index.h("div", { class: "heading" }, index.h("p", { class: "question" }, this.question)), index.h("div", { class: "textBody" }, index.h("p", { id: "answerText" }, this.answer)))));
  }
  componentDidLoad() {
    componentElement = this.el.shadowRoot;
    defineObjectReferences();
  }
  get el() { return index.getElement(this); }
};
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
FaqComponent.style = faqComponentCss;

exports.faq_component = FaqComponent;
