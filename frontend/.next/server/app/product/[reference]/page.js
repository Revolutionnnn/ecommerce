(()=>{var e={};e.id=424,e.ids=[424],e.modules={846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},9121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},3873:e=>{"use strict";e.exports=require("path")},3194:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>a.a,__next_app__:()=>m,pages:()=>d,routeModule:()=>u,tree:()=>c});var s=r(260),o=r(8203),n=r(5155),a=r.n(n),i=r(7292),l={};for(let e in i)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>i[e]);r.d(t,l);let c=["",{children:["product",{children:["[reference]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,8354)),"/home/maicol/ecommerce/frontend/app/product/[reference]/page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,9611)),"/home/maicol/ecommerce/frontend/app/layout.tsx"],error:[()=>Promise.resolve().then(r.bind(r,2627)),"/home/maicol/ecommerce/frontend/app/error.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,9937,23)),"next/dist/client/components/not-found-error"]}],d=["/home/maicol/ecommerce/frontend/app/product/[reference]/page.tsx"],m={require:r,loadChunk:()=>Promise.resolve()},u=new s.AppPageRouteModule({definition:{kind:o.RouteKind.APP_PAGE,page:"/product/[reference]/page",pathname:"/product/[reference]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},702:(e,t,r)=>{Promise.resolve().then(r.bind(r,2627))},454:(e,t,r)=>{Promise.resolve().then(r.bind(r,4551))},5071:(e,t,r)=>{Promise.resolve().then(r.bind(r,8354))},5319:(e,t,r)=>{Promise.resolve().then(r.bind(r,7864))},247:(e,t,r)=>{Promise.resolve().then(r.bind(r,6355)),Promise.resolve().then(r.bind(r,9808)),Promise.resolve().then(r.bind(r,8590))},7039:(e,t,r)=>{Promise.resolve().then(r.bind(r,4274)),Promise.resolve().then(r.bind(r,7193)),Promise.resolve().then(r.bind(r,6790))},8828:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,3219,23)),Promise.resolve().then(r.t.bind(r,4863,23)),Promise.resolve().then(r.t.bind(r,5155,23)),Promise.resolve().then(r.t.bind(r,9350,23)),Promise.resolve().then(r.t.bind(r,6313,23)),Promise.resolve().then(r.t.bind(r,8530,23)),Promise.resolve().then(r.t.bind(r,8921,23))},6972:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,6959,23)),Promise.resolve().then(r.t.bind(r,3875,23)),Promise.resolve().then(r.t.bind(r,1284,23)),Promise.resolve().then(r.t.bind(r,4178,23)),Promise.resolve().then(r.t.bind(r,6013,23)),Promise.resolve().then(r.t.bind(r,7190,23)),Promise.resolve().then(r.t.bind(r,1365,23))},4551:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});var s=r(5512);function o({error:e,reset:t}){return(0,s.jsxs)("div",{children:[(0,s.jsx)("h2",{children:"Ops algo parece que esta mal"}),(0,s.jsx)("button",{onClick:()=>t(),children:"Try again"})]})}r(8009)},7864:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>h});var s=r(5512),o=r(9334),n=r(2273),a=r(8009),i=r(2723),l=r(7124),c=r(5917),d=r(2634),m=r(1738),u=r(1109);function h({params:e}){let t=(0,o.useRouter)(),r=(0,n.wA)(),h=(0,n.d4)(e=>e.cart.items),[p,x]=(0,a.useState)(null),[f,v]=(0,a.useState)(!0),[b,g]=(0,a.useState)(null);if(f)return(0,s.jsx)("div",{className:"text-center text-xl font-bold",children:"Cargando..."});if(!p)return(0,s.jsx)("div",{className:"text-center text-xl font-bold",children:"Producto no encontrado"});let j=h.find(e=>e.id===p.reference)?.quantity||0,y=e=>{if(j+e>p.cantidadStock){alert(`No puedes agregar m\xe1s de ${p.cantidadStock} unidades al carrito. Ya tienes ${j} en el carrito.`);return}r((0,u.bE)({id:p.id,title:p.titulo,price:p.basePrice,quantity:e,image:p.imagenUrl}))};return(0,s.jsxs)("div",{className:"flex flex-col items-center gap-6 py-10 px-4",children:[(0,s.jsxs)(l.Z,{className:"w-full max-w-lg shadow-lg",children:[(0,s.jsxs)(c.U,{className:"flex flex-col items-center",children:[(0,s.jsx)(d.W,{alt:p.titulo,className:"rounded-lg",height:200,src:p.imagenUrl||void 0,width:300}),(0,s.jsx)("h1",{className:"text-3xl font-bold mt-4",children:p.titulo}),(0,s.jsx)("p",{className:"text-gray-500 mt-2 text-center",children:p.description}),(0,s.jsxs)("p",{className:"text-2xl font-semibold mt-4 text-primary",children:["$",p.basePrice]}),(0,s.jsx)("p",{className:`text-lg mt-2 ${p.cantidadStock>10?"text-green-600":"text-red-600"} font-medium`,children:p.cantidadStock>0?`\xa1Quedan ${p.cantidadStock} en stock!`:"No disponible"})]}),(0,s.jsx)(m.Z,{children:(0,s.jsxs)("div",{className:"flex flex-col gap-3 w-full",children:[(0,s.jsxs)("div",{className:"flex items-center gap-2",children:[(0,s.jsx)("label",{className:"text-sm font-medium",htmlFor:"quantity",children:"Cantidad:"}),(0,s.jsx)("input",{className:"border rounded-lg px-2 py-1 w-16 text-center",defaultValue:"1",disabled:0===p.cantidadStock,id:"quantity",max:p.cantidadStock,min:"1",type:"number"})]}),(0,s.jsx)(i.T,{className:"w-full",color:"primary",disabled:0===p.cantidadStock,variant:"shadow",onPress:()=>{let e=parseInt(document.getElementById("quantity").value);e>0&&y(e)},children:"A\xf1adir al Carrito"}),(0,s.jsx)(i.T,{className:"w-full",color:"success",disabled:0===p.cantidadStock,variant:"flat",onPress:()=>t.push("/summary"),children:"Comprar Ahora"})]})})]}),(0,s.jsx)(i.T,{onPress:()=>t.back(),children:"Volver"})]})}r(8210)},4274:(e,t,r)=>{"use strict";r.d(t,{Providers:()=>m});var s=r(5512);r(8009);var o=r(1513),n=r(9334),a=r(3371),i=r(2273),l=r(2231),c=r(1109);let d=(0,l.U1)({reducer:{cart:c.Ay}});function m({children:e,themeProps:t}){let r=(0,n.useRouter)();return(0,s.jsx)(o.b,{navigate:r.push,children:(0,s.jsx)(i.Kq,{store:d,children:(0,s.jsx)(a.N,{...t,children:e})})})}},7193:(e,t,r)=>{"use strict";r.d(t,{Navbar:()=>v});var s=r(5512),o=r(6697),n=r(9886),a=r(6749),i=r(8321),l=r(6008),c=r(8009),d=r(2273),m=r(2992),u=r(8995),h=r(4187),p=r(2574),x=r(1109);let f=()=>{let e=(0,d.wA)(),t=(0,d.d4)(e=>e.cart.items),[r,o]=(0,c.useState)([]),[n,a]=(0,c.useState)(!1);(0,c.useEffect)(()=>{o(t)},[t]);let i=t=>{e((0,x.dt)(t))},l=({onClick:e})=>(0,s.jsx)("svg",{className:"h-5 w-5 text-danger cursor-pointer",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",onClick:e,children:(0,s.jsx)("path",{d:"M19 7L5 7M10 11v6m4-6v6m-7 4h10a2 2V7H5v11a2 2 0 002 2zm3-16h4a2 2v1H9V3a2 2 0 012-2z",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2})});return(0,s.jsxs)(m.A,{isOpen:n,onOpenChange:()=>{a(e=>!e)},children:[(0,s.jsx)(u.b,{children:(0,s.jsxs)("div",{className:"relative cursor-pointer",role:"button",tabIndex:0,children:[(0,s.jsx)("svg",{className:"h-6 w-6 text-primary",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:(0,s.jsx)("path",{d:"M3 3h18l-2 13H5L3 3zm7 13a3 3 0 106 0m-6 0H5m7 0h5",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2})}),r?.length>0&&(0,s.jsx)("span",{className:"absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2",children:r.reduce((e,t)=>e+t.quantity,0)})]})}),(0,s.jsx)(h.y,{"aria-label":"Carrito",children:r?.length>0?r.map((e,t)=>(0,s.jsx)(p.Y,{children:(0,s.jsxs)("div",{className:"flex items-center gap-3",children:[e.image?(0,s.jsx)("img",{alt:e.title,className:"w-12 h-12 rounded-md object-cover",src:e.image}):(0,s.jsx)("div",{className:"w-12 h-12 rounded-md bg-gray-200 animate-pulse flex items-center justify-center"}),(0,s.jsxs)("div",{className:"flex-1",children:[(0,s.jsx)("p",{className:"font-bold text-sm",children:e.title}),(0,s.jsxs)("p",{className:"text-sm text-gray-600",children:["Cantidad: ",e.quantity]})]}),(0,s.jsx)(l,{onClick:()=>i(e.id)})]})},e.id||`item-${t}`)):(0,s.jsx)(p.Y,{className:"text-center",children:"El carrito est\xe1 vac\xedo"},"empty-cart")})]})},v=()=>(0,s.jsx)(o.H,{maxWidth:"xl",position:"sticky",children:(0,s.jsxs)(n.t,{className:"basis-1/5 sm:basis-full",justify:"start",children:[(0,s.jsx)(a.$,{as:"li",className:"gap-3 max-w-fit",children:(0,s.jsx)(l.default,{className:"flex justify-start items-center gap-1",href:"/",children:(0,s.jsx)("p",{className:"font-bold text-inherit",children:"ECOMMERCE"})})}),(0,s.jsx)(i.p,{children:(0,s.jsx)(f,{})})]})})},8210:(e,t,r)=>{"use strict";r.d(t,{A:()=>s});let s={baseUrl:process.env.NEXT_PUBLIC_API_URL||"http://localhost:3000"}},1109:(e,t,r)=>{"use strict";r.d(t,{Ay:()=>d,bE:()=>i,dt:()=>l,sX:()=>c});var s=r(2231);let o=e=>{try{let t=JSON.stringify(e);localStorage.setItem("cart",t)}catch(e){console.error("Error guardando el estado del carrito en localStorage:",e)}},n=(()=>{try{return{items:[]}}catch(e){return console.error("Error cargando el estado del carrito desde localStorage:",e),{items:[]}}})(),a=(0,s.Z0)({name:"cart",initialState:n,reducers:{addToCart:(e,t)=>{let r=e.items.find(e=>e.id===t.payload.id);r?r.quantity+=t.payload.quantity:e.items.push(t.payload),o(e)},removeFromCart:(e,t)=>{e.items=e.items.filter(e=>e.id!==t.payload),o(e)},clearCart:e=>{e.items=[],o(e)}}}),{addToCart:i,removeFromCart:l,clearCart:c}=a.actions,d=a.reducer},2627:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});let s=(0,r(6760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/home/maicol/ecommerce/frontend/app/error.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/home/maicol/ecommerce/frontend/app/error.tsx","default")},9611:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>u,metadata:()=>d,viewport:()=>m});var s=r(2740);r(3141);var o=r(8590),n=r(3673),a=r(6355),i=r(2280),l=r.n(i),c=r(9808);let d={title:{default:"Tecnology",template:"Tecnology - %s"},description:"Tecnology",icons:{icon:"/favicon.ico"}},m={themeColor:[{media:"(prefers-color-scheme: light)",color:"white"},{media:"(prefers-color-scheme: dark)",color:"black"}]};function u({children:e}){return(0,s.jsxs)("html",{suppressHydrationWarning:!0,lang:"en",children:[(0,s.jsx)("head",{}),(0,s.jsx)("body",{className:(0,n.A)("min-h-screen bg-background font-sans antialiased",l().variable),children:(0,s.jsx)(a.Providers,{themeProps:{attribute:"class",defaultTheme:"dark"},children:(0,s.jsxs)("div",{className:"relative flex flex-col h-screen",children:[(0,s.jsx)(c.Navbar,{}),(0,s.jsx)("main",{className:"container mx-auto max-w-7xl pt-16 px-6 flex-grow",children:e}),(0,s.jsx)("footer",{className:"w-full flex items-center justify-center py-3",children:(0,s.jsxs)(o.Link,{isExternal:!0,className:"flex items-center gap-1 text-current",href:"https://github.com/Revolutionnnn/",title:"Github",children:[(0,s.jsx)("span",{className:"text-default-600",children:"Powered by"}),(0,s.jsx)("p",{className:"text-primary",children:"Michael Buritica"})]})})]})})})]})}},8354:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});let s=(0,r(6760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/home/maicol/ecommerce/frontend/app/product/[reference]/page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/home/maicol/ecommerce/frontend/app/product/[reference]/page.tsx","default")},6355:(e,t,r)=>{"use strict";r.d(t,{Providers:()=>s});let s=(0,r(6760).registerClientReference)(function(){throw Error("Attempted to call Providers() from the server but Providers is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/home/maicol/ecommerce/frontend/app/providers.tsx","Providers")},9808:(e,t,r)=>{"use strict";r.d(t,{Navbar:()=>s});let s=(0,r(6760).registerClientReference)(function(){throw Error("Attempted to call Navbar() from the server but Navbar is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/home/maicol/ecommerce/frontend/components/navbar.tsx","Navbar")},3141:()=>{}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[84,723,664],()=>r(3194));module.exports=s})();