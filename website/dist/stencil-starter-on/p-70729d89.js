let e,t,n=!1;const l="undefined"!=typeof window?window:{},s=l.document||{head:{}},o={t:0,l:"",jmp:e=>e(),raf:e=>requestAnimationFrame(e),ael:(e,t,n,l)=>e.addEventListener(t,n,l),rel:(e,t,n,l)=>e.removeEventListener(t,n,l),ce:(e,t)=>new CustomEvent(e,t)},c=e=>Promise.resolve(e),r=(()=>{try{return new CSSStyleSheet,"function"==typeof(new CSSStyleSheet).replace}catch(e){}return!1})(),i=(e,t,n)=>{n&&n.map((([n,l,s])=>{const c=e,r=a(t,s),i=u(n);o.ael(c,l,r,i),(t.o=t.o||[]).push((()=>o.rel(c,l,r,i)))}))},a=(e,t)=>n=>{try{256&e.t?e.i[t](n):(e.u=e.u||[]).push([t,n])}catch(e){I(e)}},u=e=>0!=(2&e),f=new WeakMap,$=e=>"sc-"+e.$,d={},y=e=>"object"==(e=typeof e)||"function"===e,h=(e,t,...n)=>{let l=null,s=!1,o=!1,c=[];const r=t=>{for(let n=0;n<t.length;n++)l=t[n],Array.isArray(l)?r(l):null!=l&&"boolean"!=typeof l&&((s="function"!=typeof e&&!y(l))&&(l+=""),s&&o?c[c.length-1].h+=l:c.push(s?m(null,l):l),o=s)};if(r(n),t){const e=t.className||t.class;e&&(t.class="object"!=typeof e?e:Object.keys(e).filter((t=>e[t])).join(" "))}const i=m(e,null);return i.m=t,c.length>0&&(i.p=c),i},m=(e,t)=>({t:0,S:e,h:t,g:null,p:null,m:null}),p={},b=(e,t,n,s,c,r)=>{if(n!==s){let i=G(e,t),a=t.toLowerCase();if("class"===t){const t=e.classList,l=S(n),o=S(s);t.remove(...l.filter((e=>e&&!o.includes(e)))),t.add(...o.filter((e=>e&&!l.includes(e))))}else if(i||"o"!==t[0]||"n"!==t[1]){const l=y(s);if((i||l&&null!==s)&&!c)try{if(e.tagName.includes("-"))e[t]=s;else{let l=null==s?"":s;"list"===t?i=!1:null!=n&&e[t]==l||(e[t]=l)}}catch(e){}null==s||!1===s?!1===s&&""!==e.getAttribute(t)||e.removeAttribute(t):(!i||4&r||c)&&!l&&e.setAttribute(t,s=!0===s?"":s)}else t="-"===t[2]?t.slice(3):G(l,a)?a.slice(2):a[2]+t.slice(3),n&&o.rel(e,t,n,!1),s&&o.ael(e,t,s,!1)}},w=/\s/,S=e=>e?e.split(w):[],g=(e,t,n,l)=>{const s=11===t.g.nodeType&&t.g.host?t.g.host:t.g,o=e&&e.m||d,c=t.m||d;for(l in o)l in c||b(s,l,o[l],void 0,n,t.t);for(l in c)b(s,l,o[l],c[l],n,t.t)},j=(t,n,l)=>{let o,c,r=n.p[l],i=0;if(null!==r.h)o=r.g=s.createTextNode(r.h);else if(o=r.g=s.createElement(r.S),g(null,r,!1),null!=e&&o["s-si"]!==e&&o.classList.add(o["s-si"]=e),r.p)for(i=0;i<r.p.length;++i)c=j(t,r,i),c&&o.appendChild(c);return o},v=(e,n,l,s,o,c)=>{let r,i=e;for(i.shadowRoot&&i.tagName===t&&(i=i.shadowRoot);o<=c;++o)s[o]&&(r=j(null,l,o),r&&(s[o].g=r,i.insertBefore(r,n)))},M=(e,t,n,l)=>{for(;t<=n;++t)(l=e[t])&&l.g.remove()},O=(e,t)=>e.S===t.S,k=(e,t)=>{const n=t.g=e.g,l=e.p,s=t.p,o=t.h;null===o?("slot"===t.S||g(e,t,!1),null!==l&&null!==s?((e,t,n,l)=>{let s,o=0,c=0,r=t.length-1,i=t[0],a=t[r],u=l.length-1,f=l[0],$=l[u];for(;o<=r&&c<=u;)null==i?i=t[++o]:null==a?a=t[--r]:null==f?f=l[++c]:null==$?$=l[--u]:O(i,f)?(k(i,f),i=t[++o],f=l[++c]):O(a,$)?(k(a,$),a=t[--r],$=l[--u]):O(i,$)?(k(i,$),e.insertBefore(i.g,a.g.nextSibling),i=t[++o],$=l[--u]):O(a,f)?(k(a,f),e.insertBefore(a.g,i.g),a=t[--r],f=l[++c]):(s=j(t&&t[c],n,c),f=l[++c],s&&i.g.parentNode.insertBefore(s,i.g));o>r?v(e,null==l[u+1]?null:l[u+1].g,n,l,c,u):c>u&&M(t,o,r)})(n,l,t,s):null!==s?(null!==e.h&&(n.textContent=""),v(n,null,t,s,0,s.length-1)):null!==l&&M(l,0,l.length-1)):e.h!==o&&(n.data=o)},C=e=>_(e).j,P=(e,t,n)=>{const l=C(e);return{emit:e=>x(l,t,{bubbles:!!(4&n),composed:!!(2&n),cancelable:!!(1&n),detail:e})}},x=(e,t,n)=>{const l=o.ce(t,n);return e.dispatchEvent(l),l},E=(e,t)=>{t&&!e.v&&t["s-p"]&&t["s-p"].push(new Promise((t=>e.v=t)))},L=(e,t)=>{if(e.t|=16,!(4&e.t))return E(e,e.M),le((()=>T(e,t)));e.t|=512},T=(e,t)=>{const n=e.i;return t&&(e.t|=256,e.u&&(e.u.map((([e,t])=>W(n,e,t))),e.u=null)),q(void 0,(()=>A(e,n,t)))},A=async(e,t,n)=>{const l=e.j,o=l["s-rc"];n&&(e=>{const t=e.O,n=e.j,l=t.t,o=((e,t)=>{let n=$(t),l=Q.get(n);if(e=11===e.nodeType?e:s,l)if("string"==typeof l){let t,o=f.get(e=e.head||e);o||f.set(e,o=new Set),o.has(n)||(t=s.createElement("style"),t.innerHTML=l,e.insertBefore(t,e.querySelector("link")),o&&o.add(n))}else e.adoptedStyleSheets.includes(l)||(e.adoptedStyleSheets=[...e.adoptedStyleSheets,l]);return n})(n.shadowRoot?n.shadowRoot:n.getRootNode(),t);10&l&&(n["s-sc"]=o,n.classList.add(o+"-h"))})(e);H(e,t),o&&(o.map((e=>e())),l["s-rc"]=void 0);{const t=l["s-p"],n=()=>R(e);0===t.length?n():(Promise.all(t).then(n),e.t|=4,t.length=0)}},H=(n,l)=>{try{l=l.render(),n.t&=-17,n.t|=2,((n,l)=>{const s=n.j,o=n.k||m(null,null),c=(e=>e&&e.S===p)(l)?l:h(null,null,l);t=s.tagName,c.S=null,c.t|=4,n.k=c,c.g=o.g=s.shadowRoot||s,e=s["s-sc"],k(o,c)})(n,l)}catch(e){I(e,n.j)}return null},R=e=>{const t=e.j,n=e.i,l=e.M;64&e.t||(e.t|=64,D(t),W(n,"componentDidLoad"),e.C(t),l||U()),e.P(t),e.v&&(e.v(),e.v=void 0),512&e.t&&ne((()=>L(e,!1))),e.t&=-517},U=()=>{D(s.documentElement),ne((()=>x(l,"appload",{detail:{namespace:"stencil-starter-on"}})))},W=(e,t,n)=>{if(e&&e[t])try{return e[t](n)}catch(e){I(e)}},q=(e,t)=>e&&e.then?e.then(t):t(),D=e=>e.classList.add("hydrated"),F=(e,t,n)=>{if(t.L){const l=Object.entries(t.L),s=e.prototype;if(l.map((([e,[l]])=>{31&l||2&n&&32&l?Object.defineProperty(s,e,{get(){return((e,t)=>_(this).T.get(t))(0,e)},set(n){((e,t,n,l)=>{const s=_(e),o=s.T.get(t),c=s.t,r=s.i;n=((e,t)=>null==e||y(e)?e:4&t?"false"!==e&&(""===e||!!e):1&t?e+"":e)(n,l.L[t][0]),8&c&&void 0!==o||n===o||(s.T.set(t,n),r&&2==(18&c)&&L(s,!1))})(this,e,n,t)},configurable:!0,enumerable:!0}):1&n&&64&l&&Object.defineProperty(s,e,{value(...t){const n=_(this);return n.A.then((()=>n.i[e](...t)))}})})),1&n){const t=new Map;s.attributeChangedCallback=function(e,n,l){o.jmp((()=>{const n=t.get(e);this[n]=(null!==l||"boolean"!=typeof this[n])&&l}))},e.observedAttributes=l.filter((([e,t])=>15&t[0])).map((([e,n])=>{const l=n[1]||e;return t.set(l,e),l}))}}return e},N=(e,t={})=>{const n=[],c=t.exclude||[],a=l.customElements,u=s.head,f=u.querySelector("meta[charset]"),d=s.createElement("style"),y=[];let h,m=!0;Object.assign(o,t),o.l=new URL(t.resourcesUrl||"./",s.baseURI).href,e.map((e=>e[1].map((t=>{const l={t:t[0],$:t[1],L:t[2],H:t[3]};l.L=t[2],l.H=t[3];const s=l.$,u=class extends HTMLElement{constructor(e){super(e),B(e=this,l),1&l.t&&e.attachShadow({mode:"open"})}connectedCallback(){h&&(clearTimeout(h),h=null),m?y.push(this):o.jmp((()=>(e=>{if(0==(1&o.t)){const t=_(e),n=t.O,l=()=>{};if(1&t.t)i(e,t,n.H);else{t.t|=1;{let n=e;for(;n=n.parentNode||n.host;)if(n["s-p"]){E(t,t.M=n);break}}n.L&&Object.entries(n.L).map((([t,[n]])=>{if(31&n&&e.hasOwnProperty(t)){const n=e[t];delete e[t],e[t]=n}})),(async(e,t,n,l,s)=>{if(0==(32&t.t)){{if(t.t|=32,(s=K(n)).then){const e=()=>{};s=await s,e()}s.isProxied||(F(s,n,2),s.isProxied=!0);const e=()=>{};t.t|=8;try{new s(t)}catch(e){I(e)}t.t&=-9,e()}if(s.style){let e=s.style;const t=$(n);if(!Q.has(t)){const l=()=>{};((e,t,n)=>{let l=Q.get(e);r&&n?(l=l||new CSSStyleSheet,l.replace(t)):l=t,Q.set(e,l)})(t,e,!!(1&n.t)),l()}}}const o=t.M,c=()=>L(t,!0);o&&o["s-rc"]?o["s-rc"].push(c):c()})(0,t,n)}l()}})(this)))}disconnectedCallback(){o.jmp((()=>(()=>{if(0==(1&o.t)){const e=_(this);e.o&&(e.o.map((e=>e())),e.o=void 0)}})()))}componentOnReady(){return _(this).R}};l.U=e[0],c.includes(s)||a.get(s)||(n.push(s),a.define(s,F(u,l,1)))})))),d.innerHTML=n+"{visibility:hidden}.hydrated{visibility:inherit}",d.setAttribute("data-styles",""),u.insertBefore(d,f?f.nextSibling:u.firstChild),m=!1,y.length?y.map((e=>e.connectedCallback())):o.jmp((()=>h=setTimeout(U,30)))},V=new WeakMap,_=e=>V.get(e),z=(e,t)=>V.set(t.i=e,t),B=(e,t)=>{const n={t:0,j:e,O:t,T:new Map};return n.A=new Promise((e=>n.P=e)),n.R=new Promise((e=>n.C=e)),e["s-p"]=[],e["s-rc"]=[],i(e,n,t.H),V.set(e,n)},G=(e,t)=>t in e,I=(e,t)=>(0,console.error)(e,t),J=new Map,K=e=>{const t=e.$.replace(/-/g,"_"),n=e.U,l=J.get(n);return l?l[t]:import(`./${n}.entry.js`).then((e=>(J.set(n,e),e[t])),I)},Q=new Map,X=[],Y=[],Z=(e,t)=>l=>{e.push(l),n||(n=!0,t&&4&o.t?ne(te):o.raf(te))},ee=e=>{for(let t=0;t<e.length;t++)try{e[t](performance.now())}catch(e){I(e)}e.length=0},te=()=>{ee(X),ee(Y),(n=X.length>0)&&o.raf(te)},ne=e=>c().then(e),le=Z(Y,!0);export{p as H,N as b,P as c,C as g,h,c as p,z as r}