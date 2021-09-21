'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-9fa09edd.js');

/*
 Stencil Client Patch Esm v2.4.0 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return index.promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return index.bootstrapLazy([["button-up.cjs",[[1,"button-up",{"name":[1],"colorbackground":[1],"colorhover":[1],"colortext":[1]}]]],["cookie-banner.cjs",[[1,"cookie-banner",{"heading":[1],"bannertext":[1],"buttontext":[1],"linkguidelines":[1],"link":[1]}]]],["date-picker.cjs",[[1,"date-picker",{"backgroundcolor":[1],"width":[1],"component":[1],"element":[1]}]]],["event-list.cjs",[[1,"event-list",{"dataurl":[1],"buttons":[4],"animated":[4],"color":[1]}]]],["example-component.cjs",[[1,"example-component",{"exampleProp":[1,"example-prop"],"exampleToUpperCase":[64]},[[0,"click","clickListener"]]]]],["faq-component.cjs",[[1,"faq-component",{"question":[1],"answer":[1]}]]],["flip-card.cjs",[[1,"flip-card",{"name":[1],"turnable":[4],"img":[1],"place":[1],"date":[1],"description":[1],"colorfront":[1],"colorback":[1],"textfront":[1],"textback":[1],"flipcard":[32]}]]],["heart-button.cjs",[[1,"heart-button",{"color":[1],"width":[1],"height":[1],"clickcolor":[1],"icon":[1],"iconsize":[1]}]]],["image-slider.cjs",[[1,"image-slider",{"sources":[1],"autoplay":[1],"time":[1],"height":[1],"width":[1]}]]],["my-component.cjs",[[1,"my-component",{"first":[1],"middle":[1],"last":[1]}]]],["my-menu.cjs",[[1,"my-menu",{"name":[1],"element":[1],"url":[1],"window":[1]}]]],["my-smlink.cjs",[[1,"my-smlink",{"name":[1],"link":[1],"icon":[1]}]]],["search-bar.cjs",[[1,"search-bar",{"component":[1],"element":[1],"position":[1],"icon":[1],"width":[1],"height":[1],"google":[1],"offset":[1],"justify":[1],"margin":[1],"design":[1],"background":[1]}]]]], options);
  });
};

exports.defineCustomElements = defineCustomElements;
