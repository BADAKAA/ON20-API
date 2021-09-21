/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface ButtonUp {
        "colorbackground"?: string;
        "colorhover"?: string;
        "colortext"?: string;
        "name": string;
    }
    interface CookieBanner {
        "bannertext": string;
        "buttontext": string;
        "heading": string;
        "link"?: string;
        "linkguidelines"?: string;
    }
    interface DatePicker {
        "backgroundcolor": string;
        "component"?: string;
        "element": string;
        "width": string;
    }
    interface EventList {
        "animated": boolean;
        "buttons": boolean;
        "color": string;
        "dataurl": string;
    }
    interface ExampleComponent {
        "exampleProp": string;
        "exampleToUpperCase": () => Promise<void>;
    }
    interface FaqComponent {
        "answer": string;
        "question": string;
    }
    interface FlipCard {
        "colorback"?: string;
        "colorfront"?: string;
        "date"?: string;
        "description"?: string;
        "img": string;
        "name"?: string;
        "place"?: string;
        "textback"?: string;
        "textfront"?: string;
        "turnable": boolean;
    }
    interface HeartButton {
        "clickcolor": string;
        "color": string;
        "height": string;
        "icon": string;
        "iconsize": string;
        "width": string;
    }
    interface ImageSlider {
        "autoplay"?: string;
        "height": string;
        "sources": string;
        "time"?: string;
        "width": string;
    }
    interface MyComponent {
        /**
          * The first name
         */
        "first": string;
        /**
          * The last name
         */
        "last": string;
        /**
          * The middle name
         */
        "middle": string;
    }
    interface MyMenu {
        "element": string;
        "name": string;
        "url": string;
        "window": string;
    }
    interface MySmlink {
        "icon": string;
        "link": string;
        "name": string;
    }
    interface SearchBar {
        "background"?: string;
        "component": string;
        "design"?: string;
        "element": string;
        "google": string;
        "height"?: string;
        "icon": string;
        "justify"?: string;
        "margin"?: string;
        "offset"?: string;
        "position": string;
        "width": string;
    }
}
declare global {
    interface HTMLButtonUpElement extends Components.ButtonUp, HTMLStencilElement {
    }
    var HTMLButtonUpElement: {
        prototype: HTMLButtonUpElement;
        new (): HTMLButtonUpElement;
    };
    interface HTMLCookieBannerElement extends Components.CookieBanner, HTMLStencilElement {
    }
    var HTMLCookieBannerElement: {
        prototype: HTMLCookieBannerElement;
        new (): HTMLCookieBannerElement;
    };
    interface HTMLDatePickerElement extends Components.DatePicker, HTMLStencilElement {
    }
    var HTMLDatePickerElement: {
        prototype: HTMLDatePickerElement;
        new (): HTMLDatePickerElement;
    };
    interface HTMLEventListElement extends Components.EventList, HTMLStencilElement {
    }
    var HTMLEventListElement: {
        prototype: HTMLEventListElement;
        new (): HTMLEventListElement;
    };
    interface HTMLExampleComponentElement extends Components.ExampleComponent, HTMLStencilElement {
    }
    var HTMLExampleComponentElement: {
        prototype: HTMLExampleComponentElement;
        new (): HTMLExampleComponentElement;
    };
    interface HTMLFaqComponentElement extends Components.FaqComponent, HTMLStencilElement {
    }
    var HTMLFaqComponentElement: {
        prototype: HTMLFaqComponentElement;
        new (): HTMLFaqComponentElement;
    };
    interface HTMLFlipCardElement extends Components.FlipCard, HTMLStencilElement {
    }
    var HTMLFlipCardElement: {
        prototype: HTMLFlipCardElement;
        new (): HTMLFlipCardElement;
    };
    interface HTMLHeartButtonElement extends Components.HeartButton, HTMLStencilElement {
    }
    var HTMLHeartButtonElement: {
        prototype: HTMLHeartButtonElement;
        new (): HTMLHeartButtonElement;
    };
    interface HTMLImageSliderElement extends Components.ImageSlider, HTMLStencilElement {
    }
    var HTMLImageSliderElement: {
        prototype: HTMLImageSliderElement;
        new (): HTMLImageSliderElement;
    };
    interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {
    }
    var HTMLMyComponentElement: {
        prototype: HTMLMyComponentElement;
        new (): HTMLMyComponentElement;
    };
    interface HTMLMyMenuElement extends Components.MyMenu, HTMLStencilElement {
    }
    var HTMLMyMenuElement: {
        prototype: HTMLMyMenuElement;
        new (): HTMLMyMenuElement;
    };
    interface HTMLMySmlinkElement extends Components.MySmlink, HTMLStencilElement {
    }
    var HTMLMySmlinkElement: {
        prototype: HTMLMySmlinkElement;
        new (): HTMLMySmlinkElement;
    };
    interface HTMLSearchBarElement extends Components.SearchBar, HTMLStencilElement {
    }
    var HTMLSearchBarElement: {
        prototype: HTMLSearchBarElement;
        new (): HTMLSearchBarElement;
    };
    interface HTMLElementTagNameMap {
        "button-up": HTMLButtonUpElement;
        "cookie-banner": HTMLCookieBannerElement;
        "date-picker": HTMLDatePickerElement;
        "event-list": HTMLEventListElement;
        "example-component": HTMLExampleComponentElement;
        "faq-component": HTMLFaqComponentElement;
        "flip-card": HTMLFlipCardElement;
        "heart-button": HTMLHeartButtonElement;
        "image-slider": HTMLImageSliderElement;
        "my-component": HTMLMyComponentElement;
        "my-menu": HTMLMyMenuElement;
        "my-smlink": HTMLMySmlinkElement;
        "search-bar": HTMLSearchBarElement;
    }
}
declare namespace LocalJSX {
    interface ButtonUp {
        "colorbackground"?: string;
        "colorhover"?: string;
        "colortext"?: string;
        "name"?: string;
    }
    interface CookieBanner {
        "bannertext"?: string;
        "buttontext"?: string;
        "heading"?: string;
        "link"?: string;
        "linkguidelines"?: string;
    }
    interface DatePicker {
        "backgroundcolor"?: string;
        "component"?: string;
        "element"?: string;
        "width"?: string;
    }
    interface EventList {
        "animated"?: boolean;
        "buttons"?: boolean;
        "color"?: string;
        "dataurl"?: string;
    }
    interface ExampleComponent {
        "exampleProp"?: string;
        "onExampleEvent"?: (event: CustomEvent<string>) => void;
    }
    interface FaqComponent {
        "answer"?: string;
        "question"?: string;
    }
    interface FlipCard {
        "colorback"?: string;
        "colorfront"?: string;
        "date"?: string;
        "description"?: string;
        "img"?: string;
        "name"?: string;
        "place"?: string;
        "textback"?: string;
        "textfront"?: string;
        "turnable"?: boolean;
    }
    interface HeartButton {
        "clickcolor"?: string;
        "color"?: string;
        "height"?: string;
        "icon"?: string;
        "iconsize"?: string;
        "width"?: string;
    }
    interface ImageSlider {
        "autoplay"?: string;
        "height"?: string;
        "sources"?: string;
        "time"?: string;
        "width"?: string;
    }
    interface MyComponent {
        /**
          * The first name
         */
        "first"?: string;
        /**
          * The last name
         */
        "last"?: string;
        /**
          * The middle name
         */
        "middle"?: string;
    }
    interface MyMenu {
        "element"?: string;
        "name"?: string;
        "url"?: string;
        "window"?: string;
    }
    interface MySmlink {
        "icon"?: string;
        "link"?: string;
        "name"?: string;
    }
    interface SearchBar {
        "background"?: string;
        "component"?: string;
        "design"?: string;
        "element"?: string;
        "google"?: string;
        "height"?: string;
        "icon"?: string;
        "justify"?: string;
        "margin"?: string;
        "offset"?: string;
        "position"?: string;
        "width"?: string;
    }
    interface IntrinsicElements {
        "button-up": ButtonUp;
        "cookie-banner": CookieBanner;
        "date-picker": DatePicker;
        "event-list": EventList;
        "example-component": ExampleComponent;
        "faq-component": FaqComponent;
        "flip-card": FlipCard;
        "heart-button": HeartButton;
        "image-slider": ImageSlider;
        "my-component": MyComponent;
        "my-menu": MyMenu;
        "my-smlink": MySmlink;
        "search-bar": SearchBar;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "button-up": LocalJSX.ButtonUp & JSXBase.HTMLAttributes<HTMLButtonUpElement>;
            "cookie-banner": LocalJSX.CookieBanner & JSXBase.HTMLAttributes<HTMLCookieBannerElement>;
            "date-picker": LocalJSX.DatePicker & JSXBase.HTMLAttributes<HTMLDatePickerElement>;
            "event-list": LocalJSX.EventList & JSXBase.HTMLAttributes<HTMLEventListElement>;
            "example-component": LocalJSX.ExampleComponent & JSXBase.HTMLAttributes<HTMLExampleComponentElement>;
            "faq-component": LocalJSX.FaqComponent & JSXBase.HTMLAttributes<HTMLFaqComponentElement>;
            "flip-card": LocalJSX.FlipCard & JSXBase.HTMLAttributes<HTMLFlipCardElement>;
            "heart-button": LocalJSX.HeartButton & JSXBase.HTMLAttributes<HTMLHeartButtonElement>;
            "image-slider": LocalJSX.ImageSlider & JSXBase.HTMLAttributes<HTMLImageSliderElement>;
            "my-component": LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
            "my-menu": LocalJSX.MyMenu & JSXBase.HTMLAttributes<HTMLMyMenuElement>;
            "my-smlink": LocalJSX.MySmlink & JSXBase.HTMLAttributes<HTMLMySmlinkElement>;
            "search-bar": LocalJSX.SearchBar & JSXBase.HTMLAttributes<HTMLSearchBarElement>;
        }
    }
}
