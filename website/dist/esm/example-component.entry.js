import { r as registerInstance, c as createEvent, h, H as Host } from './index-51a778fc.js';

const exampleComponentCss = ":host{display:block;border:1px dashed coral;padding:10px}:host>button{background-color:teal;color:aliceblue;padding:5px;margin-top:10px}";

const ExampleComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.exampleEvent = createEvent(this, "exampleEvent", 7);
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
    return (h(Host, null, this.exampleProp && h("h2", null, " ", this.exampleProp, " "), h("slot", null), h("br", null), h("button", { onClick: (ev) => this.exampleHandler(ev) }, "exampleEvent abgeben")));
  }
};
ExampleComponent.style = exampleComponentCss;

export { ExampleComponent as example_component };
