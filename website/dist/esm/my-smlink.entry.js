import { r as registerInstance, h, H as Host } from './index-51a778fc.js';

const mySmlinkCss = ":host{display:block}.smlink{transition:opacity 0.3s;box-sizing:border-box;margin:40px;float:right;cursor:pointer}img{width:50px;height:50px}.smlink:hover{opacity:50%}";

const MySmlink = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
    return (h(Host, null, h("slot", null, h("div", { class: "smlink" }, h("element", { onClick: () => this.instagram() }, this.icon && h("img", { src: this.icon }), " ")))));
  }
};
MySmlink.style = mySmlinkCss;

export { MySmlink as my_smlink };
