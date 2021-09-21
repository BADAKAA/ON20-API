import { r as registerInstance, h } from './index-51a778fc.js';

function format(first, middle, last) {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

const myComponentCss = ":host{display:block}";

const MyComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  getText() {
    return format(this.first, this.middle, this.last);
  }
  testTsx() {
    return h("span", null, "Max Mustermann");
  }
  render() {
    return h("div", null, "Hello, World! I'm ", this.getText().length > 0 ? this.getText() : this.testTsx());
  }
};
MyComponent.style = myComponentCss;

export { MyComponent as my_component };
