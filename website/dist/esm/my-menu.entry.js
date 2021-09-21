import { r as registerInstance, h, H as Host } from './index-51a778fc.js';

const myMenuCss = ":host{display:block;position:sticky}.button{background:#941c2f;border:1px solid #941c2f;border-radius:0;color:#fffcfe;font-family:'Catamaran', 'open-sans';font-size:1.5rem;font-weight:500;letter-spacing:2px;text-transform:uppercase;text-align:center;width:33.33%;box-sizing:border-box;height:55px;display:block;float:left;position:sticky;cursor:pointer;transition:font-size 0.3s, background 0.3s}.button:hover{font-size:1.6rem}button:hover{background:#fffcfe;color:#941c2f}button:focus{outline:none}.footer{position:fixed;left:0;bottom:0;width:100%;height:100px;text-align:center}";

const MyMenu = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  clicked() {
    console.log(this.window);
    if (this.element) {
      const scrollTarget = document.querySelector(this.element);
      console.log(scrollTarget);
      scrollTarget.scrollIntoView({ behavior: 'smooth' });
    }
    else if (this.url) {
      if (this.window && this.window === "new") {
        window.open(this.url, "_blank");
      }
      else {
        window.open(this.url, "_self");
      }
    }
  }
  render() {
    return (h(Host, null, h("slot", null, h("div", { class: "leiste" }, h("button", { class: "button", type: "button", onClick: () => this.clicked() }, this.name)))));
  }
};
MyMenu.style = myMenuCss;

export { MyMenu as my_menu };
