import{r as t,h as i,H as e,g as n}from"./p-70729d89.js";let o,s,r,h,l,a;const d=class{constructor(i){t(this,i)}componentDidLoad(){if(o=document.querySelector("heart-button").shadowRoot,s=o.querySelector("#likeBtn"),r=o.querySelector("#likeBtn"),h=o.querySelector("#likeBtn"),a=o.querySelector("#likeBtn"),this.color&&(s.style.backgroundColor=this.color),this.width){if(!(this.width.includes("px")||this.width.includes("%")||this.width.includes("vw")))throw console.log('%c Please input a valid width. Permitted units: "px", "%", "vw" ("vw"="%")',"color:orange; font-weight:bold;font-family:'Open sans'"),new Error('Please input a valid width. Permitted units: "px", "%", "vw" ("vw"="%")');r.style.width=this.width}if(this.height){if(!(this.height.includes("px")||this.height.includes("%")||this.height.includes("vw")))throw console.log('%c Please input a valid width. Permitted units: "px", "%", "vw" ("vw"="%")',"color:orange; font-weight:bold;font-family:'Open sans'"),new Error('Please input a valid width. Permitted units: "px", "%", "vw" ("vw"="%")');h.style.height=this.height}this.iconsize&&(a.style.fontSize=this.iconsize)}buttonClicked(){o=document.querySelector("heart-button").shadowRoot,l=o.querySelector("#likeBtn"),this.clickcolor&&(l.style.backgroundColor=this.clickcolor)}render(){return i(e,null,i("div",{class:"heartButton",onClick:()=>this.buttonClicked()},i("button",{id:"likeBtn"},this.icon)))}get el(){return n(this)}};d.style=":host{display:block}#likeBtn{cursor:pointer;width:45px;height:45px;background-color:#100B00;border-radius:4px;color:white;font-size:150%;text-align:center;margin:30px;box-shadow:none;border:none;border-radius:50%}#likeBtn:focus{outline:none}";export{d as heart_button}