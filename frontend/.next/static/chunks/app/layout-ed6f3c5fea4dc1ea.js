(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[177],{1369:(e,t,r)=>{Promise.resolve().then(r.bind(r,7381)),Promise.resolve().then(r.bind(r,1027)),Promise.resolve().then(r.bind(r,5802)),Promise.resolve().then(r.t.bind(r,8563,23)),Promise.resolve().then(r.t.bind(r,301,23)),Promise.resolve().then(r.t.bind(r,1315,23))},7381:(e,t,r)=>{"use strict";r.d(t,{Providers:()=>m});var s=r(5155);r(2115);var a=r(6138),i=r(6046),l=r(7113),n=r(3391),o=r(8943),d=r(891);let c=(0,o.U1)({reducer:{cart:d.Ay}});function m(e){let{children:t,themeProps:r}=e,o=(0,i.useRouter)();return(0,s.jsx)(a.b,{navigate:o.push,children:(0,s.jsx)(n.Kq,{store:c,children:(0,s.jsx)(l.N,{...r,children:t})})})}},1027:(e,t,r)=>{"use strict";r.d(t,{Navbar:()=>v});var s=r(5155),a=r(2317),i=r(8336),l=r(2327),n=r(8251),o=r(7396),d=r(2115),c=r(3391),m=r(2979),h=r(6340),u=r(7170),x=r(7569),p=r(891);let j=()=>{let e=(0,c.wA)(),t=(0,c.d4)(e=>e.cart.items),[r,a]=(0,d.useState)([]),[i,l]=(0,d.useState)(!1);(0,d.useEffect)(()=>{a(t)},[t]);let n=t=>{e((0,p.dt)(t))},o=e=>{let{onClick:t}=e;return(0,s.jsx)("svg",{className:"h-5 w-5 text-danger cursor-pointer",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",onClick:t,children:(0,s.jsx)("path",{d:"M19 7L5 7M10 11v6m4-6v6m-7 4h10a2 2V7H5v11a2 2 0 002 2zm3-16h4a2 2v1H9V3a2 2 0 012-2z",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2})})};return(0,s.jsxs)(m.A,{isOpen:i,onOpenChange:()=>{l(e=>!e)},children:[(0,s.jsx)(h.b,{children:(0,s.jsxs)("div",{className:"relative cursor-pointer",role:"button",tabIndex:0,children:[(0,s.jsx)("svg",{className:"h-6 w-6 text-primary",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:(0,s.jsx)("path",{d:"M3 3h18l-2 13H5L3 3zm7 13a3 3 0 106 0m-6 0H5m7 0h5",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2})}),(null==r?void 0:r.length)>0&&(0,s.jsx)("span",{className:"absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2",children:r.reduce((e,t)=>e+t.quantity,0)})]})}),(0,s.jsx)(u.y,{"aria-label":"Carrito",children:(null==r?void 0:r.length)>0?r.map((e,t)=>(0,s.jsx)(x.Y,{children:(0,s.jsxs)("div",{className:"flex items-center gap-3",children:[e.image?(0,s.jsx)("img",{alt:e.title,className:"w-12 h-12 rounded-md object-cover",src:e.image}):(0,s.jsx)("div",{className:"w-12 h-12 rounded-md bg-gray-200 animate-pulse flex items-center justify-center"}),(0,s.jsxs)("div",{className:"flex-1",children:[(0,s.jsx)("p",{className:"font-bold text-sm",children:e.title}),(0,s.jsxs)("p",{className:"text-sm text-gray-600",children:["Cantidad: ",e.quantity]})]}),(0,s.jsx)(o,{onClick:()=>n(e.id)})]})},e.id||"item-".concat(t))):(0,s.jsx)(x.Y,{className:"text-center",children:"El carrito est\xe1 vac\xedo"},"empty-cart")})]})},v=()=>(0,s.jsx)(a.H,{maxWidth:"xl",position:"sticky",children:(0,s.jsxs)(i.t,{className:"basis-1/5 sm:basis-full",justify:"start",children:[(0,s.jsx)(l.$,{as:"li",className:"gap-3 max-w-fit",children:(0,s.jsx)(o.default,{className:"flex justify-start items-center gap-1",href:"/",children:(0,s.jsx)("p",{className:"font-bold text-inherit",children:"ECOMMERCE"})})}),(0,s.jsx)(n.p,{children:(0,s.jsx)(j,{})})]})})},891:(e,t,r)=>{"use strict";r.d(t,{Ay:()=>c,bE:()=>n,dt:()=>o,sX:()=>d});var s=r(8943);let a=e=>{try{let t=JSON.stringify(e);localStorage.setItem("cart",t)}catch(e){console.error("Error guardando el estado del carrito en localStorage:",e)}},i=(()=>{try{let e=localStorage.getItem("cart");if(null===e)return{items:[]};return JSON.parse(e)}catch(e){return console.error("Error cargando el estado del carrito desde localStorage:",e),{items:[]}}})(),l=(0,s.Z0)({name:"cart",initialState:i,reducers:{addToCart:(e,t)=>{let r=e.items.find(e=>e.id===t.payload.id);r?r.quantity+=t.payload.quantity:e.items.push(t.payload),a(e)},removeFromCart:(e,t)=>{e.items=e.items.filter(e=>e.id!==t.payload),a(e)},clearCart:e=>{e.items=[],a(e)}}}),{addToCart:n,removeFromCart:o,clearCart:d}=l.actions,c=l.reducer},8563:()=>{}},e=>{var t=t=>e(e.s=t);e.O(0,[306,939,1,505,562,543,441,517,358],()=>t(1369)),_N_E=e.O()}]);