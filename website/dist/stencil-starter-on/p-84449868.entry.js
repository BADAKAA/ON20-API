import{r as t,h as e,H as s}from"./p-70729d89.js";let i,o,r,a,n,l,d,c,p,u,m,g=[],h=5e3,f=!1,v=2,w=!1,x=!1,B=!1;window.addEventListener("resize",(()=>{x=!0,b()}));const I=class{constructor(e){t(this,e);const s=this.sources.split(";");for(let t of s){const e=new Image;e.src=t,e.classList.add("slideshow-image"),g.push(e)}u=this.height,m=this.width,"true"===this.autoplay&&(w=!0),this.time&&(h=this.time.includes("s")?1e3*parseInt(this.time):parseInt(this.time))}render(){return e(s,null,e("div",{id:"slider-frame"},e("img",{src:"./assets/pause.png",class:"sliderButton",id:"stopSliderButton"}),e("img",{src:"./assets/arrow.png",class:"sliderButton",id:"previousImageButton"}),e("img",{src:"./assets/arrow.png",class:"sliderButton",id:"nextImageButton"}),e("div",{id:"slider"})),e("slot",null))}componentDidLoad(){a=document.querySelector("image-slider").shadowRoot,l=a.querySelector("#slider"),n=a.querySelector("#slider-frame"),r=a.querySelector("#nextImageButton"),o=a.querySelector("#stopSliderButton"),i=a.querySelector("#previousImageButton"),r.addEventListener("click",(t=>{T(t.target,"+")})),i.addEventListener("click",(t=>{T(t.target,"-")})),o.addEventListener("click",y),l.addEventListener("transitionend",(()=>{v>g.length+1?(l.style.transition="none",l.style.transform="translateX("+-d+"px)",v=2):1===v&&(l.style.transition="none",l.style.transform="translateX("+-d*g.length+"px)",v=g.length+1),B=!1,b()})),function(){l.appendChild(g[g.length-1]);for(let t of g)l.appendChild(t.cloneNode(!0));l.appendChild(g[0]).cloneNode(!0),b()}(),m&&(x=!0,n.style.minWidth=m),u&&(u.includes("%")?(x=!0,n.style.height=u.replace("%","vh")):(u.includes("px")||u.includes("vh"))&&(x=!0,n.style.height=u)),b(),w&&(p=setInterval((()=>{k("+")}),h))}};function b(){if(!B&&x){l.style.transition="transform 0.2s",d=n.clientWidth,l.style.transform="translateX("+-d*(v-1)+"px)",console.log("resized"),x=!1;const t=a.querySelectorAll(".slideshow-image");for(let e of t)e.style.minWidth=n.offsetWidth+"px"}}function k(t){if(!B){let e;switch(B=!0,l.style.transition="transform 2s ease-in-out",t){case"+":e=-v,v++;break;case"-":e=2-v,v--}l.style.transform="translateX("+d*e+"px)",f=!1}}function y(){f?f&&(o.src="./assets/pause.png",k("+"),p=setInterval((()=>{k("+")}),h),f=!1):(o.src="./assets/pauseToPlay.gif",clearInterval(p),f=!0)}function T(t,e){B||(t.src="./assets/arrow.gif",setTimeout((()=>t.src="./assets/arrow.png"),1e3),k(e),clearInterval(p),clearTimeout(c),c=setTimeout((()=>{f||y()}),7500))}I.style=":host{display:block}#slider-frame{width:80%;height:75vh;margin:auto;vertical-align:middle;overflow:hidden;position:relative}#slider{position:inherit;display:flex;width:100%;height:100%}.slideshow-image{width:100%;height:auto;display:inline-block;vertical-align:middle;object-fit:cover}.sliderButton{pointer-events:auto;position:absolute;cursor:pointer;margin:0 auto;z-index:1000;width:100px;top:50%;mix-blend-mode:lighten}#nextImageButton{right:1%;transform:translate(0, -50%) rotate(-90deg)}#previousImageButton{left:1%;transform:translate(0, -50%) rotate(90deg)}#stopSliderButton{left:50%;top:100%;transform:translate(-50%, -75%);opacity:0.5;width:75px;height:75px}";export{I as image_slider}