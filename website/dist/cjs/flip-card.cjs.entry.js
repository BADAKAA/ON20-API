'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-9fa09edd.js');

const flipCardCss = ":host{display:inline-block}.flipcardContainer{position:relative;width:clamp(100px, 22vw, 400px);padding-top:110%;background:none}.flipcard{position:absolute;height:100%;width:100%;perspective:1000px;font-size:clamp(10pt, 1.4rem, 26pt);transform:translateY(-100%)}.content{position:relative;display:flex;width:100%;height:100%;transition:transform 1s;transform-style:preserve-3d;text-align:center;justify-content:center}.imgBox{position:relative;margin-left:5%;margin-top:5%;width:90%;padding-top:86%;backface-visibility:hidden}img{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;backface-visibility:hidden}.content h2{font-family:'Catamaran', sans-serif;font-size:1.25em;margin:0.2em 0 0 0}.front,.back{position:absolute;height:100%;width:100%;background:white;backface-visibility:hidden;box-shadow:0 0 15px rgba(0, 0, 0, 0.3)}.back{background:#03446A;color:white;transform:rotateY( 180deg);text-align:left}.back h2{font-family:'Catamaran', sans-serif;margin-top:15px;margin-left:20px}.back h3{font-family:'Catamaran', sans-serif;font-size:0.75em;margin-top:0.5em}.backInput{margin:0 1em 0.5em 1em}.backInput p{font-family:'Catamaran', sans-serif;font-size:0.7em;text-align:justify}.backInput element{cursor:pointer}.flipcard-mouseover .content{transform:rotateY(180deg);transition:transform 1s}";

let componentElement;
let front;
let back;
const FlipCard = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.flipcard = "flipcard";
  }
  handleMouseOver() {
    this.turnable ? (this.flipcard = "flipcard flipcard-mouseover") : this.flipcard = "flipcard";
  }
  handleMouseOut() {
    this.flipcard = "flipcard";
  }
  googleMaps() {
    const place = this.place;
    const url = "https://www.google.com/maps/place/" + place;
    window.open(url);
  }
  meme() {
    window.open("https://entwicklergate.de/t/lustige-entwickler-programmierer-memes/371");
  }
  render() {
    return (index.h(index.Host, null, index.h("div", { class: "flipcardContainer" }, index.h("div", { class: this.flipcard, onClick: () => this.meme(), onMouseOver: () => this.handleMouseOver(), onMouseOut: () => this.handleMouseOut() }, index.h("div", { class: "content" }, index.h("div", { class: "front" }, index.h("div", { class: "imgBox" }, this.img && index.h("img", { src: this.img })), this.name && index.h("h2", null, " ", this.name, " ")), index.h("div", { class: "back" }, this.name && index.h("h2", null, " ", this.name, " "), index.h("div", { class: "backInput" }, index.h("element", { onClick: () => this.googleMaps() }, index.h("h3", null, " \uD83D\uDCCD ", this.place, " ")), index.h("h3", null, " \uD83D\uDCC5 ", this.date, " "), index.h("p", null, " ", this.description))))))));
  }
  componentDidLoad() {
    componentElement = this.el.shadowRoot;
    front = componentElement.querySelector(".front");
    back = componentElement.querySelector(".back");
    if (this.colorfront) {
      front.style.backgroundColor = this.colorfront;
    }
    if (this.colorback) {
      back.style.backgroundColor = this.colorback;
    }
    if (this.textfront) {
      front.style.color = this.textfront;
    }
    if (this.textback) {
      back.style.color = this.textback;
    }
  }
  get el() { return index.getElement(this); }
};
FlipCard.style = flipCardCss;

exports.flip_card = FlipCard;
