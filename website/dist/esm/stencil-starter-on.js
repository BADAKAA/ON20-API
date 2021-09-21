import { p as promiseResolve, b as bootstrapLazy } from './index-51a778fc.js';

/*
 Stencil Client Patch Browser v2.4.0 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = import.meta.url;
    const opts =  {};
    if ( importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return promiseResolve(opts);
};

patchBrowser().then(options => {
  return bootstrapLazy([["button-up",[[1,"button-up",{"name":[1],"colorbackground":[1],"colorhover":[1],"colortext":[1]}]]],["cookie-banner",[[1,"cookie-banner",{"heading":[1],"bannertext":[1],"buttontext":[1],"linkguidelines":[1],"link":[1]}]]],["date-picker",[[1,"date-picker",{"backgroundcolor":[1],"width":[1],"component":[1],"element":[1]}]]],["event-list",[[1,"event-list",{"dataurl":[1],"buttons":[4],"animated":[4],"color":[1]}]]],["example-component",[[1,"example-component",{"exampleProp":[1,"example-prop"],"exampleToUpperCase":[64]},[[0,"click","clickListener"]]]]],["faq-component",[[1,"faq-component",{"question":[1],"answer":[1]}]]],["flip-card",[[1,"flip-card",{"name":[1],"turnable":[4],"img":[1],"place":[1],"date":[1],"description":[1],"colorfront":[1],"colorback":[1],"textfront":[1],"textback":[1],"flipcard":[32]}]]],["heart-button",[[1,"heart-button",{"color":[1],"width":[1],"height":[1],"clickcolor":[1],"icon":[1],"iconsize":[1]}]]],["image-slider",[[1,"image-slider",{"sources":[1],"autoplay":[1],"time":[1],"height":[1],"width":[1]}]]],["my-component",[[1,"my-component",{"first":[1],"middle":[1],"last":[1]}]]],["my-menu",[[1,"my-menu",{"name":[1],"element":[1],"url":[1],"window":[1]}]]],["my-smlink",[[1,"my-smlink",{"name":[1],"link":[1],"icon":[1]}]]],["search-bar",[[1,"search-bar",{"component":[1],"element":[1],"position":[1],"icon":[1],"width":[1],"height":[1],"google":[1],"offset":[1],"justify":[1],"margin":[1],"design":[1],"background":[1]}]]]], options);
});
