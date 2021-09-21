import { r as registerInstance, h, H as Host, g as getElement } from './index-51a778fc.js';

const faqComponentCss = ":host{display:block}.faqCard{margin-top:10px;width:45%;background-color:#FFFCF9;display:block}.heading{font-family:'Open Sans', sans-serif;font-size:20px;font-weight:600;background-color:#941C2F;color:#FFFCF9;padding-left:15px;padding-right:0px;width:100%;display:flex;align-items:center}.question{cursor:pointer}.textBody{padding-left:15px;padding-right:15px;padding-bottom:10px;max-width:100%;text-align:justify;display:none}";

let componentElement;
let questionElement;
const FaqComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, null, h("div", { class: "faqCard" }, h("div", { class: "heading" }, h("p", { class: "question" }, this.question)), h("div", { class: "textBody" }, h("p", { id: "answerText" }, this.answer)))));
  }
  componentDidLoad() {
    componentElement = this.el.shadowRoot;
    defineObjectReferences();
  }
  get el() { return getElement(this); }
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

export { FaqComponent as faq_component };
