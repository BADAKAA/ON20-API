import { r as registerInstance, h, H as Host } from './index-51a778fc.js';

const buttonUpCss = ":host{display:block;margin-bottom:30px}button{font-family:'Catamaran', sans-serif;font-size:200%;cursor:pointer;text-align:center;height:60px;width:60px;color:#FFFCF9;background-color:#BFBFBF;border-radius:50%;border:none;border-color:#BFBFBF;transition:background 0.3s, transform 0.3s}.button{position:relative;padding:10px 0 10px 0;text-align:center}button:hover{background-color:#941C2F;transform:scale(1.1,1.1)}button:focus{outline:none}";

let componentElement;
let elementBackground;
let elementHover;
let elementText;
const ButtonUp = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
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
    return (h(Host, null, h("div", { class: "button" }, h("button", { id: "buttonUp", onClick: () => this.backToTop(), onMouseMove: () => this.MouseOver(), onMouseOut: () => this.MouseUp() }, this.name))));
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
};
ButtonUp.style = buttonUpCss;

export { ButtonUp as button_up };
