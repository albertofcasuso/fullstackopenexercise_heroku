(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(13),c=t.n(u),o=t(14),l=t(2),i=t(3),m=t.n(i),s="/api/persons",f=function(){return m.a.get(s).then((function(e){return e.data}))},b=function(e){return m.a.post(s,e)},d=function(e){return m.a.delete("".concat(s,"/").concat(e)).then((function(e){return e.data}))},p=function(e,n){return m.a.put("".concat(s,"/").concat(e),n)},h=function(e){var n=e.persons,t=e.search,a=e.click,u=(t?n.filter((function(e){return e.name.toLowerCase().includes(t)})):n).map((function(e){return r.a.createElement("li",{key:e.id,className:"persona"},e.name,": ",e.number,r.a.createElement("button",{onClick:function(){return a(e.id)}},"Delete"))}));return r.a.createElement("div",null,r.a.createElement("ul",null,u))},v=function(e){var n=e.value,t=e.onChange;return r.a.createElement("div",null,r.a.createElement("p",null,"Search by name: "),r.a.createElement("input",{value:n,onChange:t}))},E=function(e){var n=e.onSubmit,t=e.nameValue,a=e.numberValue,u=e.numberChange,c=e.nameChange;return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:t,onChange:c})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:a,onChange:u})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"Add"))))},O=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{className:"error"},n)};t(37);function g(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}var j=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],u=n[1],c=Object(a.useState)(""),i=Object(l.a)(c,2),m=i[0],s=i[1],j=Object(a.useState)(""),y=Object(l.a)(j,2),w=y[0],S=y[1],C=Object(a.useState)(""),k=Object(l.a)(C,2),P=k[0],D=k[1],N=Object(a.useState)(null),V=Object(l.a)(N,2),T=V[0],x=V[1];Object(a.useEffect)((function(){f().then((function(e){return u(e)}))}),[]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(v,{value:P,onChange:function(e){D(e.target.value)}}),r.a.createElement("h2",null,"Add new person:"),r.a.createElement(O,{message:T}),r.a.createElement(E,{onSubmit:function(e){e.preventDefault();var n={name:m,number:w};if(t.some((function(e){return e.name===m}))){var a=t.find((function(e){return e.name===m})),r=function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?g(t,!0).forEach((function(n){Object(o.a)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):g(t).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}({},a,{number:w});window.confirm("".concat(a.name," already exists, change number?"))&&p(a.id,r).then((function(e){u(t.map((function(n){return n.name===m?e.data:n}))),x("Has cambiado el numero de: ".concat(a.name)),setTimeout((function(){x(null)}),3e3)})).catch((function(e){x("No se puede cambiar el numero de ".concat(a.name)),console.log(e),setTimeout((function(){x(null)}),3e3)}))}else b(n).then((function(e){u(t.concat(e.data)),x("Has a\xf1adido a: ".concat(m)),setTimeout((function(){x(null)}),3e3)}))},nameValue:m,numberValue:w,numberChange:function(e){S(e.target.value)},nameChange:function(e){s(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(h,{persons:t,search:P,click:function(e){var n=t.filter((function(n){return n.id!==e?n:null})),a=t.find((function(n){return n.id===e}));if(!window.confirm("Seriously delete ".concat(a.name,"?")))return null;d(e).then(u(n))}}))};c.a.render(r.a.createElement(j,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.2180fe28.chunk.js.map