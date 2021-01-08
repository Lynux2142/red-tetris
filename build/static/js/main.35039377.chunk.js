(this["webpackJsonpred-tetris"]=this["webpackJsonpred-tetris"]||[]).push([[0],{81:function(t,e){},84:function(t,e){var n={server:{host:"localhost",port:"3004",get url(){return"http://"+this.host+":"+this.port}}};t.exports=n},85:function(t,e,n){},94:function(t,e,n){},95:function(t,e,n){},96:function(t,e,n){"use strict";n.r(e);var c=n(1),r=n(0),o=n.n(r),i=n(50),a=n.n(i),s=n(12),u=n(3),b=n(51),j=n.n(b),l=(n(84),j()("https://red-tetris-malg.herokuapp.com/")),f=o.a.createContext(l),d=n(2),O=n(10);var m=function(t,e){var n=Object(r.useRef)(null);Object(r.useEffect)((function(){n.current=t})),Object(r.useEffect)((function(){if(null!==e){var t=setInterval((function(){"undefined"!==typeof(null===n||void 0===n?void 0:n.current)&&(null===n||void 0===n||n.current())}),e);return function(){return clearInterval(t)}}}),[e])},h=n(11);var x={rotate:function(t,e,n){var c=t.x-e.x,r=t.y-e.y;return{x:Math.round(c*Math.cos(n)-r*Math.sin(n)+e.x),y:Math.round(c*Math.sin(n)+r*Math.cos(n)+e.y)}},translateX:function(t,e){return{x:t.x+e,y:t.y}},translateY:function(t,e){return{x:t.x,y:t.y+e}}};var p={rotate:function(t){return Object(h.a)(Object(h.a)({},t),{},{points:t.points.map((function(e){return x.rotate(e,t.center,90*Math.PI/180)}))})},Right:function(t){return Object(h.a)(Object(h.a)({},t),{},{position:x.translateX(t.position,1)})},Left:function(t){return Object(h.a)(Object(h.a)({},t),{},{position:x.translateX(t.position,-1)})},Down:function(t){return Object(h.a)(Object(h.a)({},t),{},{position:x.translateY(t.position,1)})}},v=(n(85),n(5)),g=n(6);function y(){var t=Object(v.a)(["\n  display: flex;\n  align-items: flex-start;\n  padding: 40px;\n  margin: 0 auto;\n  max-width: 900px;\n  aside {\n    width: 100%;\n    max-width: 200px;\n    display: block;\n    padding: 0 20px;\n  }\n"]);return y=function(){return t},t}function w(){var t=Object(v.a)(["\n  width: 100vw;\n  height: 100vh;\n  overflow: hidden;\n"]);return w=function(){return t},t}var k=g.a.div(w()),C=g.a.div(y());function N(){var t=Object(v.a)(["\n  box-sizing: border-box;\n  display: flex;\n  align-items: center; \n  margin: 0 0 20px 0;\n  padding: 20px;\n  border: 4px solid #333;\n  min-height: 30px;\n  width: 100%;\n  border-radius: 20px;\n  color: ",";\n  background: #000;\n  font-family: Pixel, Arial, Helvetica, sans-serif;\n  font-size: 0.8rem;\n"]);return N=function(){return t},t}var S=g.a.div(N(),(function(t){return t.gameOver?"red":"#999"})),R=function(t){var e=t.gameOver,n=t.text;return Object(c.jsx)(S,{gameOver:e,children:n})};function A(){var t=Object(v.a)(["\n  box-sizing: border-box;\n  margin: 0 0 20px 0;\n  padding: 20px;\n  min-height: 30px;\n  width: 100%;\n  border-radius: 20px;\n  border: none;\n  color: white;\n  background: #333;\n  font-family: Pixel, Arial, Helvetica, sans-serif;\n  font-size: 1rem;\n  outline: none;\n  cursor: pointer;\n"]);return A=function(){return t},t}var z=g.a.button(A()),E=function(t){var e=t.callback;return Object(c.jsx)(z,{onClick:e,children:"Start Game"})},M=o.a.memo(E);function P(){var t=Object(v.a)(["\n  box-sizing: border-box;\n  margin: 0 0 0.5vw 0;\n  padding: 0.5vw;\n  min-height: 0.1vw;\n  width: 100%;\n  border-radius: 1vw;\n  border: none;\n  color: white;\n  background: #333;\n  font-family: Pixel, Arial, Helvetica, sans-serif;\n  font-size: 1rem;\n  outline: none;\n  cursor: pointer;\n"]);return P=function(){return t},t}function D(){var t=Object(v.a)(["\n  box-sizing: border-box;\n  margin: 0 0 0.5vw 0;\n  padding: 1vw;\n  min-height: 0.2vw;\n  width: 100%;\n  border-radius: 1vw;\n  border: none;\n  color: white;\n  background: #333;\n  font-family: Pixel, Arial, Helvetica, sans-serif;\n  font-size: 1rem;\n  outline: none;\n  cursor: pointer;\n"]);return D=function(){return t},t}function H(){var t=Object(v.a)(["\n  display: flex;\n  overflow: auto;\n"]);return H=function(){return t},t}var J=g.a.div(H()),I=g.a.button(D()),B=g.a.button(P()),G=n(55),L=n.p+"static/media/tetris.7ffe6109.mp3",T=function(){var t=Object(r.useState)(.1),e=Object(d.a)(t,2),n=e[0],o=e[1],i=Object(r.useState)(!1),a=Object(d.a)(i,2),s=a[0],u=a[1],b=Object(G.a)(L,{volume:s?0:n}),j=Object(d.a)(b,2),l=j[0],f=j[1].stop;return Object(r.useEffect)((function(){return l(),function(){f()}}),[l]),Object(c.jsxs)(J,{children:[Object(c.jsx)(B,{className:"btn btn-danger",onClick:function(){o(n-.01)},children:"-"}),Object(c.jsx)(I,{className:"btn btn-danger",onClick:function(){u(!s)},children:s?"Unmute":"Mute"}),Object(c.jsx)(B,{className:"btn btn-danger",onClick:function(){o(n+.01)},children:"+"})]})};function U(){var t=Object(v.a)(["\n  box-sizing: border-box;\n  margin: 0 0 20px 0;\n  padding: 20px;\n  min-height: 30px;\n  width: 100%;\n  border-radius: 20px;\n  border: none;\n  color: white;\n  background: #333;\n  font-family: Pixel, Arial, Helvetica, sans-serif;\n  font-size: 1rem;\n  outline: none;\n  cursor: pointer;\n"]);return U=function(){return t},t}var X=g.a.button(U()),Z=function(){var t=Object(r.useContext)(f),e=Object(u.e)();return Object(c.jsx)("div",{children:Object(c.jsx)(X,{className:"btn btn-danger",onClick:function(){t.emit("leaveRoom"),e.push("/Room")},children:"Leave Room"})})},Y=function(t){return Object(c.jsxs)("aside",{children:[t.gameOver?Object(c.jsx)(R,{gameOver:t.gameOver,text:"Game Over"}):Object(c.jsxs)("div",{children:[Object(c.jsx)(T,{}),Object(c.jsx)(R,{text:"Score: ".concat(t.score)})]}),Object(c.jsx)(M,{callback:t.startGame}),Object(c.jsx)(Z,{})]})},K=function(){var t=Object(r.useContext)(f),e=10,n=20,o=Object(r.useState)(!1),i=Object(d.a)(o,2),a=i[0],s=i[1],u=Object(r.useState)([]),b=Object(d.a)(u,2),j=b[0],l=b[1],h=Object(r.useState)({}),x=Object(d.a)(h,2),v=x[0],g=x[1],y=Object(r.useState)(new Array(n).fill().map((function(t){return new Array(e).fill("white")}))),w=Object(d.a)(y,2),N=w[0],S=w[1],R=Object(r.useState)(new Array(n).fill().map((function(t){return new Array(e).fill(0)}))),A=Object(d.a)(R,2),z=A[0],E=A[1],M=Object(r.useState)([]),P=Object(d.a)(M,2),D=P[0],H=P[1],J=Object(r.useState)(!1),I=Object(d.a)(J,2),B=I[0],G=I[1],L=Object(r.useState)(0),T=Object(d.a)(L,2),U=T[0],X=T[1],Z=function(t){return!!t.points.find((function(c){var r=t.position.x+c.x,o=t.position.y+c.y;return r<0||r>=e||o<0||o>=n||"white"!==N[o][r]}))},K=function(t){var e=z.map((function(t){return t.map((function(t){return 0}))}));g(t),t.points.map((function(n){e[t.position.y+n.y][t.position.x+n.x]=1})),E(Object(O.a)(e))},q=function(){var c=Object(O.a)(N);v.points.map((function(t){c[v.position.y+t.y][v.position.x+t.x]=v.color})),t.emit("updateSpectrum",function(){for(var t=[],c=0;c<e;++c){for(var r=0,o=0;o<n;++o)"white"===N[o][c]&&++r;t.push(r)}return t}()),S(Object(O.a)(c));var r=j.shift();j.length<3&&t.emit("getTetris",(function(t){l((function(e){return[].concat(Object(O.a)(e),[t])}))})),Z(r)?(G(!0),s(!1)):(!function(){var n=Object(O.a)(N),c=0;N.map((function(r,o){r.find((function(t){return"white"===t||"grey"===t}))||(c+=100,n.splice(o,1),n.splice(0,0,new Array(e).fill("white")),t.emit("sendBlackbar"))})),X((function(t){return t+(400===c?2*c:c)})),S(n)}(),K(r))};Object(r.useEffect)((function(){for(var t=[],r=0;r<n;++r){for(var o=[],i=0;i<e;++i)o.push(Object(c.jsx)("td",{style:{backgroundColor:z[r][i]?v.color:N[r][i]}},"".concat(r*e+i)));t.push(Object(c.jsx)("tr",{children:o},"".concat(r)))}H(t)}),[z]),m((function(){!B&&a&&(Z(p.Down(v))?q():K(p.Down(v)))}),1e3),Object(r.useEffect)((function(){t.on("getBlackbar",(function(){S((function(t){return t.splice(n,0,new Array(e).fill("grey")),t.splice(0,1),t}))}))}),[]),Object(r.useEffect)((function(){t.on("newTetris",(function(t){l((function(e){return[].concat(Object(O.a)(e),[t])}))}))}),[]),Object(r.useEffect)((function(){t.on("getSetTetris",(function(t){var e=t.shift(),n=Object(O.a)(N);s(!0),n=n.map((function(t){return t.map((function(t){return"white"}))})),S(n),l(Object(O.a)(t)),g(e),K(e),G(!1),X(0)}))}),[]);return Object(c.jsx)(k,{role:"button",tabIndex:"0",onKeyDown:function(t){return function(t){37===t.keyCode?Z(p.Left(v))||K(p.Left(v)):39===t.keyCode?Z(p.Right(v))||K(p.Right(v)):38===t.keyCode?Z(p.rotate(v))||K(p.rotate(v)):40===t.keyCode&&(Z(p.Down(v))?q():(X((function(t){return t+1})),K(p.Down(v))))}(t)},children:Object(c.jsxs)(C,{children:[Object(c.jsx)("table",{children:Object(c.jsx)("tbody",{children:D})}),Object(c.jsx)(Y,{gameOver:B,startGame:function(){t.emit("start")},score:U})]})})},q=function(){var t=Object(r.useContext)(f),e=Object(r.useState)({}),n=Object(d.a)(e,2),o=n[0],i=n[1],a=Object(r.useState)({}),s=Object(d.a)(a,2),b=s[0],j=s[1],l=Object(u.e)(),O=/#([a-zA-Z]+)\[([a-zA-Z]+)\]/;return Object(r.useEffect)((function(){O.exec(location.hash)?t.emit("getMyRoom",(function(t,e){t?l.push("/Home"):(j(e),i(e.players))})):l.push("/Home")}),[t]),Object(r.useEffect)((function(){t.on("updatePlayers",(function(t){i(t)}))}),[o,t]),Object(c.jsxs)("div",{className:"container",children:[Object(c.jsx)("h1",{children:b.name}),Object.keys(o).map((function(t,e){return Object(c.jsx)("p",{children:o[t].name},e)})),Object(c.jsx)(K,{})]})},F=function(){var t=Object(u.e)();return Object(c.jsxs)("div",{className:"container",children:[Object(c.jsx)("h1",{children:"Bienvenue sur Red Tetris"}),Object(c.jsx)("button",{className:"btn btn-danger",onClick:function(){t.push("/Room")},children:"Play"})]})},Q=(n(94),function(){var t=Object(r.useContext)(f),e=Object(u.e)(),n=Object(r.useState)({}),o=Object(d.a)(n,2),i=o[0],a=o[1];return Object(r.useEffect)((function(){t.emit("getRooms",(function(t){a(t)}))}),[t]),Object(r.useEffect)((function(){t.on("updateRooms",(function(t){a(t)}))}),[i]),Object(c.jsxs)("div",{className:"container",children:[Object(c.jsx)("h1",{children:"Room list"}),Object(c.jsx)("div",{className:"list-group mb-3",children:Object.keys(i).map((function(t,n){return Object(c.jsxs)("li",{className:"list-group-item p-1",children:[Object(c.jsx)("label",{children:Object(c.jsx)("b",{children:i[t].name})}),Object(c.jsx)("button",{className:"btn btn-danger float-right",onClick:function(){return n=i[t].name,void e.push("/Join-room#".concat(n));var n},children:"Join"})]},n)}))}),Object(c.jsx)("button",{className:"btn btn-danger",onClick:function(){e.push("/New-room")},children:"Create New Room"})]})}),V=function(){var t=Object(r.useContext)(f),e=Object(u.e)(),n=Object(r.useState)(""),o=Object(d.a)(n,2),i=o[0],a=o[1],s=Object(r.useState)(""),b=Object(d.a)(s,2),j=b[0],l=b[1];return Object(c.jsxs)("div",{className:"container",children:[Object(c.jsx)("h1",{children:"New Room Creation"}),Object(c.jsxs)("form",{children:[Object(c.jsx)("div",{className:"form-group",children:Object(c.jsx)("input",{className:"form-control",type:"text",placeholder:"Username",onChange:function(t){a(t.target.value)}})}),Object(c.jsx)("div",{className:"form-group",children:Object(c.jsx)("input",{className:"form-control",type:"text",placeholder:"Room name",onChange:function(t){l(t.target.value)}})}),Object(c.jsx)("input",{className:"btn btn-danger",type:"submit",value:"Create",onClick:function(n){n.preventDefault(),i&&j&&(t.emit("join",i),t.emit("addRoom",j,(function(t){t?alert("Room name already exist"):e.push("/#".concat(j,"[").concat(i,"]"))})))}})]})]})},W=function(){var t=Object(r.useContext)(f),e=Object(r.useState)(""),n=Object(d.a)(e,2),o=n[0],i=n[1],a=Object(r.useState)(""),s=Object(d.a)(a,2),b=s[0],j=s[1],l=Object(u.e)(),O=/#([a-zA-Z]+)/;Object(r.useEffect)((function(){j(O.exec(location.hash)[1])}),[location.hash]);return Object(c.jsxs)("div",{className:"container",children:[Object(c.jsxs)("h1",{children:['Join "',b,'"']}),Object(c.jsxs)("form",{children:[Object(c.jsx)("div",{className:"form-group",children:Object(c.jsx)("input",{className:"form-control",placeholder:"Username",onChange:function(t){i(t.target.value)}})}),Object(c.jsx)("input",{className:"btn btn-danger",type:"submit",value:"Join",onClick:function(e){e.preventDefault(),o&&(t.emit("join",o),t.emit("joinRoom",b,(function(t){t?alert("Username already taken"):l.push("/#".concat(b,"[").concat(o,"]"))})))}})]})]})},$=(n(95),function(){return Object(c.jsx)(f.Provider,{value:l,children:Object(c.jsxs)(s.a,{children:[Object(c.jsx)(u.a,{path:"/",exact:!0,component:q}),Object(c.jsx)(u.a,{path:"/Home",component:F}),Object(c.jsx)(u.a,{path:"/Room",component:Q}),Object(c.jsx)(u.a,{path:"/New-room",component:V}),Object(c.jsx)(u.a,{path:"/Join-room",component:W})]})})});a.a.render(Object(c.jsx)($,{}),document.getElementById("tetris"))}},[[96,1,2]]]);
//# sourceMappingURL=main.35039377.chunk.js.map