(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[35],{3646:function(e,t,n){var r=n(7228);e.exports=function(e){if(Array.isArray(e))return r(e)}},9713:function(e){e.exports=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}},6860:function(e){e.exports=function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}},8206:function(e){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},319:function(e,t,n){var r=n(3646),o=n(6860),i=n(379),a=n(8206);e.exports=function(e){return r(e)||o(e)||i(e)||a()}},1143:function(e){"use strict";e.exports=function(e,t,n,r,o,i,a,s){if(!e){var u;if(void 0===t)u=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var c=[n,r,o,i,a,s],l=0;(u=new Error(t.replace(/%s/g,(function(){return c[l++]})))).name="Invariant Violation"}throw u.framesToPop=1,u}}},9917:function(e,t,n){"use strict";var r=n(3038),o=n(319),i=n(5318);t.default=function(e){var t=e.src,n=e.sizes,o=e.unoptimized,i=void 0!==o&&o,d=e.priority,p=void 0!==d&&d,h=e.loading,m=e.className,g=e.quality,y=e.width,b=e.height,x=e.objectFit,k=e.objectPosition,C=e.loader,O=void 0===C?S:C,j=e.placeholder,_=void 0===j?"empty":j,N=e.blurDataURL,A=(0,a.default)(e,["src","sizes","unoptimized","priority","loading","className","quality","width","height","objectFit","objectPosition","loader","placeholder","blurDataURL"]),M=n?"responsive":"intrinsic";"layout"in A&&(A.layout&&(M=A.layout),delete A.layout);var P="";if(function(e){return"object"===typeof e&&(v(e)||function(e){return void 0!==e.src}(e))}(t)){var R=v(t)?t.default:t;if(!R.src)throw new Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ".concat(JSON.stringify(R)));if(N=N||R.blurDataURL,P=R.src,(!M||"fill"!==M)&&(b=b||R.height,y=y||R.width,!R.height||!R.width))throw new Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ".concat(JSON.stringify(R)))}t="string"===typeof t?t:P;var D=w(y),I=w(b),$=w(g);0;var T=!p&&("lazy"===h||"undefined"===typeof h);t&&t.startsWith("data:")&&(i=!0,T=!1);var z,L,U,q=(0,f.useIntersection)({rootMargin:"200px",disabled:!T}),W=r(q,2),H=W[0],F=W[1],B=!T||F,V=(0,s.default)({position:"absolute",top:0,left:0,bottom:0,right:0,boxSizing:"border-box",padding:0,border:"none",margin:"auto",display:"block",width:0,height:0,minWidth:"100%",maxWidth:"100%",minHeight:"100%",maxHeight:"100%",objectFit:x,objectPosition:k},"blur"===_?{filter:"blur(20px)",backgroundSize:"cover",backgroundImage:'url("'.concat(N,'")')}:void 0);if("undefined"!==typeof D&&"undefined"!==typeof I&&"fill"!==M){var Z=I/D,X=isNaN(Z)?"100%":"".concat(100*Z,"%");"responsive"===M?(z={display:"block",overflow:"hidden",position:"relative",boxSizing:"border-box",margin:0},L={display:"block",boxSizing:"border-box",paddingTop:X}):"intrinsic"===M?(z={display:"inline-block",maxWidth:"100%",overflow:"hidden",position:"relative",boxSizing:"border-box",margin:0},L={boxSizing:"border-box",display:"block",maxWidth:"100%"},U='<svg width="'.concat(D,'" height="').concat(I,'" xmlns="http://www.w3.org/2000/svg" version="1.1"/>')):"fixed"===M&&(z={overflow:"hidden",boxSizing:"border-box",display:"inline-block",position:"relative",width:D,height:I})}else"undefined"===typeof D&&"undefined"===typeof I&&"fill"===M&&(z={display:"block",overflow:"hidden",position:"absolute",top:0,left:0,bottom:0,right:0,boxSizing:"border-box",margin:0});var G={src:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",srcSet:void 0,sizes:void 0};B&&(G=E({src:t,unoptimized:i,layout:M,width:D,quality:$,sizes:n,loader:O}));return u.default.createElement("div",{style:z},L?u.default.createElement("div",{style:L},U?u.default.createElement("img",{style:{maxWidth:"100%",display:"block",margin:0,border:"none",padding:0},alt:"","aria-hidden":!0,role:"presentation",src:"data:image/svg+xml;base64,".concat((0,l.toBase64)(U))}):null):null,!B&&u.default.createElement("noscript",null,u.default.createElement("img",Object.assign({},A,E({src:t,unoptimized:i,layout:M,width:D,quality:$,sizes:n,loader:O}),{decoding:"async",style:V,className:m}))),u.default.createElement("img",Object.assign({},A,G,{decoding:"async",className:m,ref:function(e){H(e),function(e,t){if("blur"===t&&e){var n=function(){e.src.startsWith("data:")||("decode"in e?e.decode():Promise.resolve()).catch((function(){})).then((function(){e.style.filter="none",e.style.backgroundSize="none",e.style.backgroundImage="none"}))};e.complete?n():e.onload=n}}(e,_)},style:V})),p?u.default.createElement(c.default,null,u.default.createElement("link",{key:"__nimg-"+G.src+G.srcSet+G.sizes,rel:"preload",as:"image",href:G.srcSet?void 0:G.src,imagesrcset:G.srcSet,imagesizes:G.sizes})):null)};var a=i(n(7316)),s=i(n(7154)),u=i(n(7294)),c=i(n(2775)),l=n(8814),d=n(5655),f=n(7426);var p=new Map([["imgix",function(e){var t=e.root,n=e.src,r=e.width,o=e.quality,i=["auto=format","fit=max","w="+r],a="";o&&i.push("q="+o);i.length&&(a="?"+i.join("&"));return"".concat(t).concat(k(n)).concat(a)}],["cloudinary",function(e){var t=e.root,n=e.src,r=e.width,o=e.quality,i=["f_auto","c_limit","w_"+r,"q_"+(o||"auto")].join(",")+"/";return"".concat(t).concat(i).concat(k(n))}],["akamai",function(e){var t=e.root,n=e.src,r=e.width;return"".concat(t).concat(k(n),"?imwidth=").concat(r)}],["default",function(e){var t=e.root,n=e.src,r=e.width,o=e.quality;0;return"".concat(t,"?url=").concat(encodeURIComponent(n),"&w=").concat(r,"&q=").concat(o||75)}]]);function v(e){return void 0!==e.default}var h={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"https://res.cloudinary.com/monad-systems/image/upload/",loader:"cloudinary"}||d.imageConfigDefault,m=h.deviceSizes,g=h.imageSizes,y=h.loader,b=h.path,x=(h.domains,[].concat(o(m),o(g)));function E(e){var t=e.src,n=e.unoptimized,r=e.layout,i=e.width,a=e.quality,s=e.sizes,u=e.loader;if(n)return{src:t,srcSet:void 0,sizes:void 0};var c=function(e,t,n){if(n&&("fill"===t||"responsive"===t)){for(var r,i=/(^|\s)(1?\d?\d)vw/g,a=[];r=i.exec(n);r)a.push(parseInt(r[2]));if(a.length){var s=.01*Math.min.apply(Math,a);return{widths:x.filter((function(e){return e>=m[0]*s})),kind:"w"}}return{widths:x,kind:"w"}}return"number"!==typeof e||"fill"===t||"responsive"===t?{widths:m,kind:"w"}:{widths:o(new Set([e,2*e].map((function(e){return x.find((function(t){return t>=e}))||x[x.length-1]})))),kind:"x"}}(i,r,s),l=c.widths,d=c.kind,f=l.length-1;return{sizes:s||"w"!==d?s:"100vw",srcSet:l.map((function(e,n){return"".concat(u({src:t,quality:a,width:e})," ").concat("w"===d?e:n+1).concat(d)})).join(", "),src:u({src:t,quality:a,width:l[f]})}}function w(e){return"number"===typeof e?e:"string"===typeof e?parseInt(e,10):void 0}function S(e){var t=p.get(y);if(t)return t((0,s.default)({root:b},e));throw new Error('Unknown "loader" found in "next.config.js". Expected: '.concat(d.VALID_LOADERS.join(", "),". Received: ").concat(y))}function k(e){return"/"===e[0]?e.slice(1):e}m.sort((function(e,t){return e-t})),x.sort((function(e,t){return e-t}))},7426:function(e,t,n){"use strict";var r=n(3038);t.__esModule=!0,t.useIntersection=function(e){var t=e.rootMargin,n=e.disabled||!a,u=(0,o.useRef)(),c=(0,o.useState)(!1),l=r(c,2),d=l[0],f=l[1],p=(0,o.useCallback)((function(e){u.current&&(u.current(),u.current=void 0),n||d||e&&e.tagName&&(u.current=function(e,t,n){var r=function(e){var t=e.rootMargin||"",n=s.get(t);if(n)return n;var r=new Map,o=new IntersectionObserver((function(e){e.forEach((function(e){var t=r.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)}))}),e);return s.set(t,n={id:t,observer:o,elements:r}),n}(n),o=r.id,i=r.observer,a=r.elements;return a.set(e,t),i.observe(e),function(){a.delete(e),i.unobserve(e),0===a.size&&(i.disconnect(),s.delete(o))}}(e,(function(e){return e&&f(e)}),{rootMargin:t}))}),[n,t,d]);return(0,o.useEffect)((function(){if(!a&&!d){var e=(0,i.requestIdleCallback)((function(){return f(!0)}));return function(){return(0,i.cancelIdleCallback)(e)}}}),[d]),[p,d]};var o=n(7294),i=n(3447),a="undefined"!==typeof IntersectionObserver;var s=new Map},3398:function(e,t,n){"use strict";var r;t.__esModule=!0,t.AmpStateContext=void 0;var o=((r=n(7294))&&r.__esModule?r:{default:r}).default.createContext({});t.AmpStateContext=o},6393:function(e,t,n){"use strict";t.__esModule=!0,t.isInAmpMode=a,t.useAmp=function(){return a(o.default.useContext(i.AmpStateContext))};var r,o=(r=n(7294))&&r.__esModule?r:{default:r},i=n(3398);function a(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ampFirst,n=void 0!==t&&t,r=e.hybrid,o=void 0!==r&&r,i=e.hasQuery,a=void 0!==i&&i;return n||o&&a}},2775:function(e,t,n){"use strict";var r=n(9713);function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}t.__esModule=!0,t.defaultHead=f,t.default=void 0;var i,a=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var t=d();if(t&&t.has(e))return t.get(e);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=r?Object.getOwnPropertyDescriptor(e,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=e[o]}n.default=e,t&&t.set(e,n);return n}(n(7294)),s=(i=n(3244))&&i.__esModule?i:{default:i},u=n(3398),c=n(1165),l=n(6393);function d(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return d=function(){return e},e}function f(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=[a.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(a.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function p(e,t){return"string"===typeof t||"number"===typeof t?e:t.type===a.default.Fragment?e.concat(a.default.Children.toArray(t.props.children).reduce((function(e,t){return"string"===typeof t||"number"===typeof t?e:e.concat(t)}),[])):e.concat(t)}var v=["name","httpEquiv","charSet","itemProp"];function h(e,t){return e.reduce((function(e,t){var n=a.default.Children.toArray(t.props.children);return e.concat(n)}),[]).reduce(p,[]).reverse().concat(f(t.inAmpMode)).filter(function(){var e=new Set,t=new Set,n=new Set,r={};return function(o){var i=!0,a=!1;if(o.key&&"number"!==typeof o.key&&o.key.indexOf("$")>0){a=!0;var s=o.key.slice(o.key.indexOf("$")+1);e.has(s)?i=!1:e.add(s)}switch(o.type){case"title":case"base":t.has(o.type)?i=!1:t.add(o.type);break;case"meta":for(var u=0,c=v.length;u<c;u++){var l=v[u];if(o.props.hasOwnProperty(l))if("charSet"===l)n.has(l)?i=!1:n.add(l);else{var d=o.props[l],f=r[l]||new Set;"name"===l&&a||!f.has(d)?(f.add(d),r[l]=f):i=!1}}}return i}}()).reverse().map((function(e,n){var i=e.key||n;if(!t.inAmpMode&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some((function(t){return e.props.href.startsWith(t)}))){var s=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},e.props||{});return s["data-href"]=s.href,s.href=void 0,s["data-optimized-fonts"]=!0,a.default.cloneElement(e,s)}return a.default.cloneElement(e,{key:i})}))}var m=function(e){var t=e.children,n=(0,a.useContext)(u.AmpStateContext),r=(0,a.useContext)(c.HeadManagerContext);return a.default.createElement(s.default,{reduceComponentsToState:h,headManager:r,inAmpMode:(0,l.isInAmpMode)(n)},t)};t.default=m},3244:function(e,t,n){"use strict";var r=n(319),o=n(4575),i=n(3913),a=(n(1506),n(2205)),s=n(8585),u=n(9754);function c(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=u(e);if(t){var o=u(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return s(this,n)}}t.__esModule=!0,t.default=void 0;var l=n(7294),d=function(e){a(n,e);var t=c(n);function n(e){var i;return o(this,n),(i=t.call(this,e))._hasHeadManager=void 0,i.emitChange=function(){i._hasHeadManager&&i.props.headManager.updateHead(i.props.reduceComponentsToState(r(i.props.headManager.mountedInstances),i.props))},i._hasHeadManager=i.props.headManager&&i.props.headManager.mountedInstances,i}return i(n,[{key:"componentDidMount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.add(this),this.emitChange()}},{key:"componentDidUpdate",value:function(){this.emitChange()}},{key:"componentWillUnmount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.delete(this),this.emitChange()}},{key:"render",value:function(){return null}}]),n}(l.Component);t.default=d},8814:function(e,t){"use strict";t.__esModule=!0,t.toBase64=function(e){return window.btoa(e)}},5655:function(e,t){"use strict";t.__esModule=!0,t.imageConfigDefault=t.VALID_LOADERS=void 0;t.VALID_LOADERS=["default","imgix","cloudinary","akamai"];t.imageConfigDefault={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",domains:[],disableStaticImages:!1}},9008:function(e,t,n){e.exports=n(2775)},5675:function(e,t,n){e.exports=n(9917)},1555:function(e,t,n){"use strict";var r=n(4036),o=n.n(r),i=n(7294),a=n(600),s=n(5893);const u=["xxl","xl","lg","md","sm","xs"],c=i.forwardRef((({bsPrefix:e,className:t,as:n="div",...r},i)=>{const c=(0,a.vE)(e,"col"),l=[],d=[];return u.forEach((e=>{const t=r[e];let n,o,i;delete r[e],"object"===typeof t&&null!=t?({span:n=!0,offset:o,order:i}=t):n=t;const a="xs"!==e?`-${e}`:"";n&&l.push(!0===n?`${c}${a}`:`${c}${a}-${n}`),null!=i&&d.push(`order${a}-${i}`),null!=o&&d.push(`offset${a}-${o}`)})),l.length||l.push(c),(0,s.jsx)(n,{...r,ref:i,className:o()(t,...l,...d)})}));c.displayName="Col",t.Z=c},682:function(e,t,n){"use strict";var r=n(4036),o=n.n(r),i=n(7294),a=n(600),s=n(5893);const u=i.forwardRef((({bsPrefix:e,fluid:t,as:n="div",className:r,...i},u)=>{const c=(0,a.vE)(e,"container"),l="string"===typeof t?`-${t}`:"-fluid";return(0,s.jsx)(n,{ref:u,...i,className:o()(r,t?`${c}${l}`:c)})}));u.displayName="Container",u.defaultProps={fluid:!1},t.Z=u},133:function(e,t,n){"use strict";n.d(t,{Z:function(){return ve}});var r=n(4036),o=n.n(r),i=n(7294);function a(){return(a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function s(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}n(1143);function u(e){return"default"+e.charAt(0).toUpperCase()+e.substr(1)}function c(e){var t=function(e,t){if("object"!==typeof e||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!==typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===typeof t?t:String(t)}function l(e,t){return Object.keys(t).reduce((function(n,r){var o,l=n,d=l[u(r)],f=l[r],p=s(l,[u(r),r].map(c)),v=t[r],h=function(e,t,n){var r=(0,i.useRef)(void 0!==e),o=(0,i.useState)(t),a=o[0],s=o[1],u=void 0!==e,c=r.current;return r.current=u,!u&&c&&a!==t&&s(t),[u?e:a,(0,i.useCallback)((function(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),o=1;o<t;o++)r[o-1]=arguments[o];n&&n.apply(void 0,[e].concat(r)),s(e)}),[n])]}(f,d,e[v]),m=h[0],g=h[1];return a({},p,((o={})[r]=m,o[v]=g,o))}),e)}function d(){var e=this.constructor.getDerivedStateFromProps(this.props,this.state);null!==e&&void 0!==e&&this.setState(e)}function f(e){this.setState(function(t){var n=this.constructor.getDerivedStateFromProps(e,t);return null!==n&&void 0!==n?n:null}.bind(this))}function p(e,t){try{var n=this.props,r=this.state;this.props=e,this.state=t,this.__reactInternalSnapshotFlag=!0,this.__reactInternalSnapshot=this.getSnapshotBeforeUpdate(n,r)}finally{this.props=n,this.state=r}}d.__suppressDeprecationWarning=!0,f.__suppressDeprecationWarning=!0,p.__suppressDeprecationWarning=!0;var v=/-(.)/g;var h=n(600),m=n(5893);const g=e=>{return e[0].toUpperCase()+(t=e,t.replace(v,(function(e,t){return t.toUpperCase()}))).slice(1);var t};const y=i.forwardRef((({bsPrefix:e,className:t,as:n,...r},i)=>{e=(0,h.vE)(e,"navbar-brand");const a=n||(r.href?"a":"span");return(0,m.jsx)(a,{...r,ref:i,className:o()(t,e)})}));y.displayName="NavbarBrand";var b=y;function x(e){var t=function(e){return e&&e.ownerDocument||document}(e);return t&&t.defaultView||window}var E=/([A-Z])/g;var w=/^ms-/;function S(e){return function(e){return e.replace(E,"-$1").toLowerCase()}(e).replace(w,"-ms-")}var k=/^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;var C=function(e,t){var n="",r="";if("string"===typeof t)return e.style.getPropertyValue(S(t))||function(e,t){return x(e).getComputedStyle(e,t)}(e).getPropertyValue(S(t));Object.keys(t).forEach((function(o){var i=t[o];i||0===i?!function(e){return!(!e||!k.test(e))}(o)?n+=S(o)+": "+i+";":r+=o+"("+i+") ":e.style.removeProperty(S(o))})),r&&(n+="transform: "+r+";"),e.style.cssText+=";"+n};n(5697);var O=n(3935),j=!1,_=i.createContext(null),N="unmounted",A="exited",M="entering",P="entered",R="exiting",D=function(e){var t,n;function r(t,n){var r;r=e.call(this,t,n)||this;var o,i=n&&!n.isMounting?t.enter:t.appear;return r.appearStatus=null,t.in?i?(o=A,r.appearStatus=M):o=P:o=t.unmountOnExit||t.mountOnEnter?N:A,r.state={status:o},r.nextCallback=null,r}n=e,(t=r).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n,r.getDerivedStateFromProps=function(e,t){return e.in&&t.status===N?{status:A}:null};var o=r.prototype;return o.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},o.componentDidUpdate=function(e){var t=null;if(e!==this.props){var n=this.state.status;this.props.in?n!==M&&n!==P&&(t=M):n!==M&&n!==P||(t=R)}this.updateStatus(!1,t)},o.componentWillUnmount=function(){this.cancelNextCallback()},o.getTimeouts=function(){var e,t,n,r=this.props.timeout;return e=t=n=r,null!=r&&"number"!==typeof r&&(e=r.exit,t=r.enter,n=void 0!==r.appear?r.appear:t),{exit:e,enter:t,appear:n}},o.updateStatus=function(e,t){void 0===e&&(e=!1),null!==t?(this.cancelNextCallback(),t===M?this.performEnter(e):this.performExit()):this.props.unmountOnExit&&this.state.status===A&&this.setState({status:N})},o.performEnter=function(e){var t=this,n=this.props.enter,r=this.context?this.context.isMounting:e,o=this.props.nodeRef?[r]:[O.findDOMNode(this),r],i=o[0],a=o[1],s=this.getTimeouts(),u=r?s.appear:s.enter;!e&&!n||j?this.safeSetState({status:P},(function(){t.props.onEntered(i)})):(this.props.onEnter(i,a),this.safeSetState({status:M},(function(){t.props.onEntering(i,a),t.onTransitionEnd(u,(function(){t.safeSetState({status:P},(function(){t.props.onEntered(i,a)}))}))})))},o.performExit=function(){var e=this,t=this.props.exit,n=this.getTimeouts(),r=this.props.nodeRef?void 0:O.findDOMNode(this);t&&!j?(this.props.onExit(r),this.safeSetState({status:R},(function(){e.props.onExiting(r),e.onTransitionEnd(n.exit,(function(){e.safeSetState({status:A},(function(){e.props.onExited(r)}))}))}))):this.safeSetState({status:A},(function(){e.props.onExited(r)}))},o.cancelNextCallback=function(){null!==this.nextCallback&&(this.nextCallback.cancel(),this.nextCallback=null)},o.safeSetState=function(e,t){t=this.setNextCallback(t),this.setState(e,t)},o.setNextCallback=function(e){var t=this,n=!0;return this.nextCallback=function(r){n&&(n=!1,t.nextCallback=null,e(r))},this.nextCallback.cancel=function(){n=!1},this.nextCallback},o.onTransitionEnd=function(e,t){this.setNextCallback(t);var n=this.props.nodeRef?this.props.nodeRef.current:O.findDOMNode(this),r=null==e&&!this.props.addEndListener;if(n&&!r){if(this.props.addEndListener){var o=this.props.nodeRef?[this.nextCallback]:[n,this.nextCallback],i=o[0],a=o[1];this.props.addEndListener(i,a)}null!=e&&setTimeout(this.nextCallback,e)}else setTimeout(this.nextCallback,0)},o.render=function(){var e=this.state.status;if(e===N)return null;var t=this.props,n=t.children,r=(t.in,t.mountOnEnter,t.unmountOnExit,t.appear,t.enter,t.exit,t.timeout,t.addEndListener,t.onEnter,t.onEntering,t.onEntered,t.onExit,t.onExiting,t.onExited,t.nodeRef,s(t,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]));return i.createElement(_.Provider,{value:null},"function"===typeof n?n(e,r):i.cloneElement(i.Children.only(n),r))},r}(i.Component);function I(){}D.contextType=_,D.propTypes={},D.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:I,onEntering:I,onEntered:I,onExit:I,onExiting:I,onExited:I},D.UNMOUNTED=N,D.EXITED=A,D.ENTERING=M,D.ENTERED=P,D.EXITING=R;var $=D,T=!("undefined"===typeof window||!window.document||!window.document.createElement),z=!1,L=!1;try{var U={get passive(){return z=!0},get once(){return L=z=!0}};T&&(window.addEventListener("test",U,U),window.removeEventListener("test",U,!0))}catch(he){}var q=function(e,t,n,r){if(r&&"boolean"!==typeof r&&!L){var o=r.once,i=r.capture,a=n;!L&&o&&(a=n.__once||function e(r){this.removeEventListener(t,e,i),n.call(this,r)},n.__once=a),e.addEventListener(t,a,z?r:i)}e.addEventListener(t,n,r)};var W=function(e,t,n,r){var o=r&&"boolean"!==typeof r?r.capture:r;e.removeEventListener(t,n,o),n.__once&&e.removeEventListener(t,n.__once,o)};var H=function(e,t,n,r){return q(e,t,n,r),function(){W(e,t,n,r)}};function F(e,t,n){void 0===n&&(n=5);var r=!1,o=setTimeout((function(){r||function(e,t,n,r){if(void 0===n&&(n=!1),void 0===r&&(r=!0),e){var o=document.createEvent("HTMLEvents");o.initEvent(t,n,r),e.dispatchEvent(o)}}(e,"transitionend",!0)}),t+n),i=H(e,"transitionend",(function(){r=!0}),{once:!0});return function(){clearTimeout(o),i()}}function B(e,t,n,r){null==n&&(n=function(e){var t=C(e,"transitionDuration")||"",n=-1===t.indexOf("ms")?1e3:1;return parseFloat(t)*n}(e)||0);var o=F(e,n,r),i=H(e,"transitionend",t);return function(){o(),i()}}function V(e,t){const n=C(e,t)||"",r=-1===n.indexOf("ms")?1e3:1;return parseFloat(n)*r}function Z(e,t){const n=V(e,"transitionDuration"),r=V(e,"transitionDelay"),o=B(e,(n=>{n.target===e&&(o(),t(n))}),n+r)}var X=function(...e){return e.filter((e=>null!=e)).reduce(((e,t)=>{if("function"!==typeof t)throw new Error("Invalid Argument Type, must only provide functions, undefined, or null.");return null===e?t:function(...n){e.apply(this,n),t.apply(this,n)}}),null)};var G=function(e){return e&&"function"!==typeof e?function(t){e.current=t}:e};var J=function(e,t){return(0,i.useMemo)((function(){return function(e,t){var n=G(e),r=G(t);return function(e){n&&n(e),r&&r(e)}}(e,t)}),[e,t])};var Q=i.forwardRef((({onEnter:e,onEntering:t,onEntered:n,onExit:r,onExiting:o,onExited:a,addEndListener:s,children:u,childRef:c,...l},d)=>{const f=(0,i.useRef)(null),p=J(f,c),v=e=>{var t;p((t=e)&&"setState"in t?O.findDOMNode(t):null!=t?t:null)},h=e=>t=>{e&&f.current&&e(f.current,t)},g=(0,i.useCallback)(h(e),[e]),y=(0,i.useCallback)(h(t),[t]),b=(0,i.useCallback)(h(n),[n]),x=(0,i.useCallback)(h(r),[r]),E=(0,i.useCallback)(h(o),[o]),w=(0,i.useCallback)(h(a),[a]),S=(0,i.useCallback)(h(s),[s]);return(0,m.jsx)($,{ref:d,...l,onEnter:g,onEntered:b,onEntering:y,onExit:x,onExited:w,onExiting:E,addEndListener:S,nodeRef:f,children:"function"===typeof u?(e,t)=>u(e,{...t,ref:v}):i.cloneElement(u,{ref:v})})}));const Y={height:["marginTop","marginBottom"],width:["marginLeft","marginRight"]};function K(e,t){const n=t[`offset${e[0].toUpperCase()}${e.slice(1)}`],r=Y[e];return n+parseInt(C(t,r[0]),10)+parseInt(C(t,r[1]),10)}const ee={[A]:"collapse",[R]:"collapsing",[M]:"collapsing",[P]:"collapse show"},te={in:!1,timeout:300,mountOnEnter:!1,unmountOnExit:!1,appear:!1,getDimensionValue:K},ne=i.forwardRef((({onEnter:e,onEntering:t,onEntered:n,onExit:r,onExiting:a,className:s,children:u,dimension:c="height",getDimensionValue:l=K,...d},f)=>{const p="function"===typeof c?c():c,v=(0,i.useMemo)((()=>X((e=>{e.style[p]="0"}),e)),[p,e]),h=(0,i.useMemo)((()=>X((e=>{const t=`scroll${p[0].toUpperCase()}${p.slice(1)}`;e.style[p]=`${e[t]}px`}),t)),[p,t]),g=(0,i.useMemo)((()=>X((e=>{e.style[p]=null}),n)),[p,n]),y=(0,i.useMemo)((()=>X((e=>{e.style[p]=`${l(p,e)}px`,e.offsetHeight}),r)),[r,l,p]),b=(0,i.useMemo)((()=>X((e=>{e.style[p]=null}),a)),[p,a]);return(0,m.jsx)(Q,{ref:f,addEndListener:Z,...d,"aria-expanded":d.role?d.in:null,onEnter:v,onEntering:h,onEntered:g,onExit:y,onExiting:b,childRef:u.ref,children:(e,t)=>i.cloneElement(u,{...t,className:o()(s,u.props.className,ee[e],"width"===p&&"width")})})}));ne.defaultProps=te;var re=ne;const oe=i.createContext(null);oe.displayName="NavbarContext";var ie=oe;const ae=i.forwardRef((({children:e,bsPrefix:t,...n},r)=>{t=(0,h.vE)(t,"navbar-collapse");const o=(0,i.useContext)(ie);return(0,m.jsx)(re,{in:!(!o||!o.expanded),...n,children:(0,m.jsx)("div",{ref:r,className:t,children:e})})}));ae.displayName="NavbarCollapse";var se=ae;var ue=function(e){var t=(0,i.useRef)(e);return(0,i.useEffect)((function(){t.current=e}),[e]),t};const ce=i.forwardRef((({bsPrefix:e,className:t,children:n,label:r,as:a="button",onClick:s,...u},c)=>{e=(0,h.vE)(e,"navbar-toggler");const{onToggle:l,expanded:d}=(0,i.useContext)(ie)||{},f=function(e){var t=ue(e);return(0,i.useCallback)((function(){return t.current&&t.current.apply(t,arguments)}),[t])}((e=>{s&&s(e),l&&l()}));return"button"===a&&(u.type="button"),(0,m.jsx)(a,{...u,ref:c,onClick:f,"aria-label":r,className:o()(t,e,!d&&"collapsed"),children:n||(0,m.jsx)("span",{className:`${e}-icon`})})}));ce.displayName="NavbarToggle",ce.defaultProps={label:"Toggle navigation"};var le=ce;var de=i.createContext(null);const fe=function(e,{displayName:t=g(e),Component:n,defaultProps:r}={}){const a=i.forwardRef((({className:t,bsPrefix:r,as:i=n||"div",...a},s)=>{const u=(0,h.vE)(r,e);return(0,m.jsx)(i,{ref:s,className:o()(t,u),...a})}));return a.defaultProps=r,a.displayName=t,a}("navbar-text",{Component:"span"}),pe=i.forwardRef(((e,t)=>{const{bsPrefix:n,expand:r,variant:a,bg:s,fixed:u,sticky:c,className:d,as:f="nav",expanded:p,onToggle:v,onSelect:g,collapseOnSelect:y,...b}=l(e,{expanded:"onToggle"}),x=(0,h.vE)(n,"navbar"),E=(0,i.useCallback)(((...e)=>{null==g||g(...e),y&&p&&(null==v||v(!1))}),[g,y,p,v]);void 0===b.role&&"nav"!==f&&(b.role="navigation");let w=`${x}-expand`;"string"===typeof r&&(w=`${w}-${r}`);const S=(0,i.useMemo)((()=>({onToggle:()=>null==v?void 0:v(!p),bsPrefix:x,expanded:!!p})),[x,p,v]);return(0,m.jsx)(ie.Provider,{value:S,children:(0,m.jsx)(de.Provider,{value:E,children:(0,m.jsx)(f,{ref:t,...b,className:o()(d,x,r&&w,a&&`${x}-${a}`,s&&`bg-${s}`,c&&`sticky-${c}`,u&&`fixed-${u}`)})})})}));pe.defaultProps={expand:!0,variant:"light",collapseOnSelect:!1},pe.displayName="Navbar";var ve=Object.assign(pe,{Brand:b,Toggle:le,Collapse:se,Text:fe})},4051:function(e,t,n){"use strict";var r=n(4036),o=n.n(r),i=n(7294),a=n(600),s=n(5893);const u=["xxl","xl","lg","md","sm","xs"],c=i.forwardRef((({bsPrefix:e,className:t,as:n="div",...r},i)=>{const c=(0,a.vE)(e,"row"),l=`${c}-cols`,d=[];return u.forEach((e=>{const t=r[e];let n;delete r[e],null!=t&&"object"===typeof t?({cols:n}=t):n=t;const o="xs"!==e?`-${e}`:"";null!=n&&d.push(`${l}${o}-${n}`)})),(0,s.jsx)(n,{ref:i,...r,className:o()(t,c,...d)})}));c.displayName="Row",t.Z=c},600:function(e,t,n){"use strict";n.d(t,{vE:function(){return s}});var r=n(7294);n(5893);const o=r.createContext({prefixes:{}}),{Consumer:i,Provider:a}=o;function s(e,t){const{prefixes:n}=(0,r.useContext)(o);return e||n[t]||t}},4036:function(e,t){var n;!function(){"use strict";var r={}.hasOwnProperty;function o(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var i=typeof n;if("string"===i||"number"===i)e.push(n);else if(Array.isArray(n)){if(n.length){var a=o.apply(null,n);a&&e.push(a)}}else if("object"===i)if(n.toString===Object.prototype.toString)for(var s in n)r.call(n,s)&&n[s]&&e.push(s);else e.push(n.toString())}}return e.join(" ")}e.exports?(o.default=o,e.exports=o):void 0===(n=function(){return o}.apply(t,[]))||(e.exports=n)}()}}]);