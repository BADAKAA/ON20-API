'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-9fa09edd.js');

const mySmlinkCss = ":host{display:block}.smlink{transition:opacity 0.3s;box-sizing:border-box;margin:40px;float:right;cursor:pointer}img{width:50px;height:50px}.smlink:hover{opacity:50%}";

const MySmlink = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
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
    return (index.h(index.Host, null, index.h("slot", null, index.h("div", { class: "smlink" }, index.h("element", { onClick: () => this.instagram() }, this.icon && index.h("img", { src: this.icon }), " ")))));
  }
};
MySmlink.style = mySmlinkCss;

exports.my_smlink = MySmlink;
