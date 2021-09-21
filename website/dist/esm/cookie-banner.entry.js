import { r as registerInstance, h, H as Host } from './index-51a778fc.js';

const cookieBannerCss = ":host{display:flex;color:white;position:-webkit-sticky;position:sticky;top:50%;justify-content:center;z-index:100000}.container{position:absolute;transform:translateY(-50%);width:75vw;margin-left:30px;margin-right:30px;background-color:#1d6483;border-radius:5px;padding:10px 40px 30px 40px}.content{position:relative}#closeButton{position:absolute;top:0px;right:0px}.heading{font-size:20px;font-weight:600;margin-top:1px}p .link{text-decoration:underline white;cursor:pointer}.buttons{cursor:pointer}";

let body;
let componentElement;
let buttonClose;
let acceptButton;
let banner;
const CookieBanner = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  linkGuidelines() {
    window.open(this.link);
  }
  render() {
    return (h(Host, null, h("div", { class: "container" }, h("div", { class: "content" }, h("button", { id: "closeButton", class: "buttons" }, "\u2715"), h("p", { class: "heading" }, this.heading && h("p", null, this.heading)), h("p", null, this.bannertext && h("p", null, this.bannertext)), h("p", { onClick: () => this.linkGuidelines() }, this.linkguidelines && h("p", { class: "link" }, this.linkguidelines)), h("button", { id: "acceptButton", class: "buttons" }, this.buttontext && h("p", null, this.buttontext)))), h("slot", null)));
  }
  componentDidLoad() {
    defineObjectReferences();
    body = document.querySelector("body");
    body.style.overflowY = "hidden";
  }
};
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
CookieBanner.style = cookieBannerCss;

export { CookieBanner as cookie_banner };
