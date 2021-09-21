'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-9fa09edd.js');

const cookieBannerCss = ":host{display:flex;color:white;position:-webkit-sticky;position:sticky;top:50%;justify-content:center;z-index:100000}.container{position:absolute;transform:translateY(-50%);width:75vw;margin-left:30px;margin-right:30px;background-color:#1d6483;border-radius:5px;padding:10px 40px 30px 40px}.content{position:relative}#closeButton{position:absolute;top:0px;right:0px}.heading{font-size:20px;font-weight:600;margin-top:1px}p .link{text-decoration:underline white;cursor:pointer}.buttons{cursor:pointer}";

let body;
let componentElement;
let buttonClose;
let acceptButton;
let banner;
const CookieBanner = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  linkGuidelines() {
    window.open(this.link);
  }
  render() {
    return (index.h(index.Host, null, index.h("div", { class: "container" }, index.h("div", { class: "content" }, index.h("button", { id: "closeButton", class: "buttons" }, "\u2715"), index.h("p", { class: "heading" }, this.heading && index.h("p", null, this.heading)), index.h("p", null, this.bannertext && index.h("p", null, this.bannertext)), index.h("p", { onClick: () => this.linkGuidelines() }, this.linkguidelines && index.h("p", { class: "link" }, this.linkguidelines)), index.h("button", { id: "acceptButton", class: "buttons" }, this.buttontext && index.h("p", null, this.buttontext)))), index.h("slot", null)));
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

exports.cookie_banner = CookieBanner;
