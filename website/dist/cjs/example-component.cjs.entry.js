'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-9fa09edd.js');

const exampleComponentCss = ":host{display:block;border:1px dashed coral;padding:10px}:host>button{background-color:teal;color:aliceblue;padding:5px;margin-top:10px}";

const ExampleComponent = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.exampleEvent = index.createEvent(this, "exampleEvent", 7);
  }
  clickListener() {
    console.log("clicked");
  }
  async exampleToUpperCase() {
  }
  exampleHandler(ev) {
    console.log(ev);
    this.exampleEvent.emit("custom value");
  }
  componentDidLoad() {
    console.log("Component loaded");
  }
  render() {
    return (index.h(index.Host, null, this.exampleProp && index.h("h2", null, " ", this.exampleProp, " "), index.h("slot", null), index.h("br", null), index.h("button", { onClick: (ev) => this.exampleHandler(ev) }, "exampleEvent abgeben")));
  }
};
ExampleComponent.style = exampleComponentCss;

exports.example_component = ExampleComponent;
