'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-9fa09edd.js');

function format(first, middle, last) {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

const myComponentCss = ":host{display:block}";

const MyComponent = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  getText() {
    return format(this.first, this.middle, this.last);
  }
  testTsx() {
    return index.h("span", null, "Max Mustermann");
  }
  render() {
    return index.h("div", null, "Hello, World! I'm ", this.getText().length > 0 ? this.getText() : this.testTsx());
  }
};
MyComponent.style = myComponentCss;

exports.my_component = MyComponent;
