(this["webpackJsonpred-tetris"]=this["webpackJsonpred-tetris"]||[]).push([[0],{82:function(n,t){},85:function(n,t){var e={server:{host:"localhost",port:"3004",get url(){return"http://"+this.host+":"+this.port}}};n.exports=e},94:function(n,t,e){},95:function(n,t,e){},96:function(n,t,e){"use strict";e.r(t);var r=e(1),c=e(0),o=e.n(c),i=e(50),a=e.n(i),s=e(12),u=e(3),b=e(51),l=e.n(b),j=(e(85),l()("https://red-tetris-malg.herokuapp.com/")),f=o.a.createContext(j),d=e(11),O=e(7),m=e(2),p=e(4),x=e(5);function h(){var n=Object(p.a)(["\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-start;\n"]);return h=function(){return n},n}function v(){var n=Object(p.a)(["\n  padding: 3.5%;\n  max-width: 50%;\n  .cell {\n    border: solid 1px;\n    width: 2vw;\n    height: 2vw;\n    background: rgba(",", 0.8);\n    border-bottom-color: rgba(",", 0.1);\n    border-right-color: rgba(",", 1);\n    border-top-color: rgba(",", 1);\n    border-left-color: rgba(",", 0.3);\n  }\n"]);return v=function(){return n},n}var g=x.a.div(v(),(function(n){return n.color}),(function(n){return n.color}),(function(n){return n.color}),(function(n){return n.color}),(function(n){return n.color})),y=x.a.div(h()),w=function(n){return Object(r.jsx)(g,{children:Object(r.jsx)(y,{children:Object(r.jsx)("table",{children:Object(r.jsx)("tbody",{children:n.HTMLgrid})})})})};var k=function(n,t){var e=Object(c.useRef)(null);Object(c.useEffect)((function(){e.current=n})),Object(c.useEffect)((function(){if(null!==t){var n=setInterval((function(){"undefined"!==typeof(null===e||void 0===e?void 0:e.current)&&(null===e||void 0===e||e.current())}),t);return function(){return clearInterval(n)}}}),[t])};var C={rotate:function(n,t,e){var r=n.x-t.x,c=n.y-t.y;return{x:Math.round(r*Math.cos(e)-c*Math.sin(e)+t.x),y:Math.round(r*Math.sin(e)+c*Math.cos(e)+t.y)}},translateX:function(n,t){return{x:n.x+t,y:n.y}},translateY:function(n,t){return{x:n.x,y:n.y+t}}};var N={rotate:function(n){return Object(O.a)(Object(O.a)({},n),{},{points:n.points.map((function(t){return C.rotate(t,n.center,90*Math.PI/180)}))})},Right:function(n){return Object(O.a)(Object(O.a)({},n),{},{position:C.translateX(n.position,1)})},Left:function(n){return Object(O.a)(Object(O.a)({},n),{},{position:C.translateX(n.position,-1)})},Down:function(n){return Object(O.a)(Object(O.a)({},n),{},{position:C.translateY(n.position,1)})}};function S(){var n=Object(p.a)(["\n  box-sizing: border-box;\n  display: flex;\n  align-items: center; \n  margin: 0 0 20px 0;\n  padding: 20px;\n  border: 4px solid #333;\n  min-height: 30px;\n  width: 100%;\n  border-radius: 20px;\n  color: ",";\n  background: #000;\n  font-family: Pixel, Arial, Helvetica, sans-serif;\n  font-size: 0.8rem;\n"]);return S=function(){return n},n}var R=x.a.div(S(),(function(n){return n.gameOver?"red":"#999"})),z=function(n){var t=n.gameOver,e=n.text;return Object(r.jsx)(R,{gameOver:t,children:e})};function E(){var n=Object(p.a)(["\n  box-sizing: border-box;\n  margin: 0 0 20px 0;\n  padding: 20px;\n  min-height: 30px;\n  width: 100%;\n  border-radius: 20px;\n  border: none;\n  color: white;\n  background: #333;\n  font-family: Pixel, Arial, Helvetica, sans-serif;\n  font-size: 1rem;\n  outline: none;\n  cursor: pointer;\n"]);return E=function(){return n},n}var A=x.a.button(E()),P=function(n){var t=n.callback;return Object(r.jsx)(A,{onClick:t,children:"Start Game"})},D=o.a.memo(P);function H(){var n=Object(p.a)(["\n  box-sizing: border-box;\n  margin: 0 0 0.5vw 0;\n  padding: 0.5vw;\n  min-height: 0.1vw;\n  width: 100%;\n  border-radius: 1vw;\n  border: none;\n  color: white;\n  background: #333;\n  font-family: Pixel, Arial, Helvetica, sans-serif;\n  font-size: 1rem;\n  outline: none;\n  cursor: pointer;\n"]);return H=function(){return n},n}function M(){var n=Object(p.a)(["\n  box-sizing: border-box;\n  margin: 0 0 0.5vw 0;\n  padding: 1vw;\n  min-height: 0.2vw;\n  width: 100%;\n  border-radius: 1vw;\n  border: none;\n  color: white;\n  background: #333;\n  font-family: Pixel, Arial, Helvetica, sans-serif;\n  font-size: 1rem;\n  outline: none;\n  cursor: pointer;\n"]);return M=function(){return n},n}function L(){var n=Object(p.a)(["\n  display: flex;\n  overflow: auto;\n"]);return L=function(){return n},n}var I=x.a.div(L()),T=x.a.button(M()),B=x.a.button(H()),J=e(55),G=e.p+"static/media/tetris.7ffe6109.mp3",U=function(){var n=Object(c.useState)(.1),t=Object(m.a)(n,2),e=t[0],o=t[1],i=Object(c.useState)(!1),a=Object(m.a)(i,2),s=a[0],u=a[1],b=Object(J.a)(G,{volume:s?0:e}),l=Object(m.a)(b,2),j=l[0],f=l[1].stop;return Object(c.useEffect)((function(){return j(),function(){f()}}),[j]),Object(r.jsxs)(I,{children:[Object(r.jsx)(B,{className:"btn btn-danger",onClick:function(){o(e-.01)},children:"-"}),Object(r.jsx)(T,{className:"btn btn-danger",onClick:function(){u(!s)},children:s?"Unmute":"Mute"}),Object(r.jsx)(B,{className:"btn btn-danger",onClick:function(){o(e+.01)},children:"+"})]})};function X(){var n=Object(p.a)(["\n  box-sizing: border-box;\n  margin: 0 0 20px 0;\n  padding: 20px;\n  min-height: 30px;\n  width: 100%;\n  border-radius: 20px;\n  border: none;\n  color: white;\n  background: #333;\n  font-family: Pixel, Arial, Helvetica, sans-serif;\n  font-size: 1rem;\n  outline: none;\n  cursor: pointer;\n"]);return X=function(){return n},n}var Y=x.a.button(X()),Z=function(){var n=Object(c.useContext)(f),t=Object(u.e)();return Object(r.jsx)("div",{children:Object(r.jsx)(Y,{className:"btn btn-danger",onClick:function(){n.emit("leaveRoom"),t.push("/Rooms")},children:"Leave Room"})})};function K(){var n=Object(p.a)(["\n    max-width: 25%;\n"]);return K=function(){return n},n}var W=x.a.aside(K()),q=function(n){return Object(r.jsxs)(W,{children:[n.gameOver?Object(r.jsx)(z,{gameOver:n.gameOver,text:"Game Over"}):Object(r.jsx)("div",{children:Object(r.jsx)(U,{})}),Object(r.jsx)(z,{text:"Score: ".concat(n.score)}),Object(r.jsx)(D,{callback:n.startGame}),Object(r.jsx)(Z,{})]})},F=e(56);function Q(){var n=Object(p.a)(["\n    text-align:center;\n    border: solid;\n    th {\n        border: solid;\n        font-weight:bold;\n        font-size:2vw;\n        padding-right: 20px;\n    }\n    td {\n        font-size:1vw;\n    }\n"]);return Q=function(){return n},n}function V(){var n=Object(p.a)(["\n"]);return V=function(){return n},n}var $=x.a.tbody(V()),_=x.a.tr(Q()),nn=function(n){var t=function(n){var t,e="",r=Object(F.a)(n.keys());try{for(r.s();!(t=r.n()).done;){var c=t.value;e=0!=c?e.concat("-"+n[c]):e.concat(n[c])}}catch(o){r.e(o)}finally{r.f()}return e};return Object(r.jsx)("table",{children:Object(r.jsxs)($,{children:[Object(r.jsxs)(_,{children:[Object(r.jsx)("th",{children:"Player"}),Object(r.jsx)("th",{children:"Score"}),Object(r.jsx)("th",{children:"Spectrum"})]}),Object.keys(n.players).map((function(e,c){return Object(r.jsxs)(_,{children:[Object(r.jsx)("td",{children:n.players[e].name}),Object(r.jsx)("td",{children:n.players[e].score}),Object(r.jsx)("td",{children:t(n.players[e].spectrum)})]},c)}))]})})};function tn(){var n=Object(p.a)(["\n  display: flex;\n  flew-flow: row wrap;\n  width: 100%;\n  font-family: Pixel, Arial, Helvetica, sans-serif;\n  font-size: 0.8rem;\n  aside {\n    width: 100%;\n    max-width: 200px;\n    display: block;\n    padding: 0 20px;\n  }\n"]);return tn=function(){return n},n}var en=x.a.div(tn()),rn=function(){var n=10,t=20,e=Object(c.useState)(!1),o=Object(m.a)(e,2),i=o[0],a=o[1],s=Object(c.useState)([]),b=Object(m.a)(s,2),l=b[0],j=b[1],p=Object(c.useState)({}),x=Object(m.a)(p,2),h=x[0],v=x[1],g=Object(c.useState)({}),y=Object(m.a)(g,2),C=y[0],S=y[1],R=Object(c.useState)(new Array(t).fill().map((function(t){return new Array(n).fill("white")}))),z=Object(m.a)(R,2),E=z[0],A=z[1],P=Object(c.useState)(new Array(t).fill().map((function(t){return new Array(n).fill(0)}))),D=Object(m.a)(P,2),H=D[0],M=D[1],L=Object(c.useState)([]),I=Object(m.a)(L,2),T=I[0],B=I[1],J=Object(c.useContext)(f),G=Object(c.useState)({}),U=Object(m.a)(G,2),X=U[0],Y=U[1],Z=Object(c.useState)({}),K=Object(m.a)(Z,2),W=K[0],F=K[1],Q=Object(c.useState)(!1),V=Object(m.a)(Q,2),$=V[0],_=V[1],tn=Object(c.useState)(0),rn=Object(m.a)(tn,2),cn=rn[0],on=rn[1],an=Object(u.e)(),sn=/#([a-zA-Z]+)\[([a-zA-Z]+)\]/,un=function(e){return!!e.points.find((function(r){var c=e.position.x+r.x,o=e.position.y+r.y;return c<0||c>=n||o<0||o>=t||"white"!==E[o][c]}))},bn=function(n){var t=function(n){for(;!un(n);)n=N.Down(n);return n=Object(O.a)(Object(O.a)({},n),{},{position:Object(O.a)(Object(O.a)({},n.position),{},{y:n.position.y-1})}),S(n),n}(n),e=H.map((function(n){return n.map((function(n){return 0}))}));v(n),t.points.map((function(n){e[t.position.y+n.y][t.position.x+n.x]=2})),n.points.map((function(t){e[n.position.y+t.y][n.position.x+t.x]=1})),M(Object(d.a)(e))},ln=function(){var e=Object(d.a)(E);h.points.map((function(n){e[h.position.y+n.y][h.position.x+n.x]=h.color})),A(Object(d.a)(e));var r=l.shift();l.length<3&&J.emit("getTetris",(function(n){j((function(t){return[].concat(Object(d.a)(t),[n])}))})),un(r)?_(!0):(e=function(){var t=Object(d.a)(E),e=0;return E.map((function(r,c){r.find((function(n){return"white"===n||"grey"===n}))||(e+=100,t.splice(c,1),t.splice(0,0,new Array(n).fill("white")),J.emit("sendBlackbar"))})),on((function(n){return n+(400===e?2*e:e)})),A(t),Object(d.a)(t)}(),bn(r)),J.emit("updateSpectrum",function(e){for(var r=[],c=0;c<n;++c){for(var o=0,i=0;i<t;++i)"white"===e[i][c]&&++o;r.push(o)}return r}(e))};Object(c.useEffect)((function(){for(var e=[],c=0;c<t;++c){for(var o=[],i=0;i<n;++i)o.push(Object(r.jsx)("td",{className:"cell",style:{backgroundColor:1===H[c][i]?h.color:E[c][i],borderWidth:2===H[c][i]?"2px":"1px",borderColor:2===H[c][i]?h.color:"black"}},"".concat(c*n+i)));e.push(Object(r.jsx)("tr",{children:o},"".concat(c)))}B(e)}),[H]),k((function(){!$&&i&&(un(N.Down(h))?ln():bn(N.Down(h)))}),1e3),Object(c.useEffect)((function(){J.on("getBlackbar",(function(){A((function(e){return e.splice(t,0,new Array(n).fill("grey")),e.splice(0,1),e})),v((function(n){return n.position.y-=1,n}))}))}),[]),Object(c.useEffect)((function(){J.on("newTetris",(function(n){j((function(t){return[].concat(Object(d.a)(t),[n])}))}))}),[]);var jn=function(n,t){var e=n,r=Object(d.a)(E);a(!0),r=r.map((function(n){return n.map((function(n){return"white"}))})),A(r),j(Object(d.a)(t)),v(e),_(!1),on(0)};Object(c.useEffect)((function(){J.on("getSetTetris",(function(n,t){jn(n,t)}))}),[]);return Object(c.useEffect)((function(){var n=sn.exec(location.hash);n?J.emit("joinRoom",n[1],n[2],(function(n,t){n?(an.push("/Rooms"),alert(n)):(F(t),Y(t.players))})):an.push("/Home")}),[J]),Object(c.useEffect)((function(){J.on("updatePlayers",(function(n){Y(n)}))}),[X,J]),Object(c.useEffect)((function(){return function(){J.emit("leaveRoom")}}),[]),Object(r.jsxs)("div",{className:"container",children:[Object(r.jsx)("h1",{children:W.name}),Object(r.jsxs)(en,{id:"gameSection",role:"button",tabIndex:"0",onKeyDown:function(n){window.addEventListener("keydown",(function(n){[32,37,38,39,40].indexOf(n.keyCode)>-1&&n.preventDefault()}),!1),function(n){37===n.keyCode?un(N.Left(h))||bn(N.Left(h)):39===n.keyCode?un(N.Right(h))||bn(N.Right(h)):38===n.keyCode?un(N.rotate(h))||bn(N.rotate(h)):40===n.keyCode?un(N.Down(h))?ln():(on((function(n){return n+1})),bn(N.Down(h))):32===n.keyCode&&(bn(C),on((function(n){return n+(C.position.y-h.position.y)})))}(n)},children:[Object(r.jsx)(w,{HTMLgrid:T}),Object(r.jsx)(q,{gameOver:$,startGame:function(){document.getElementById("gameSection").focus(),J.emit("start",(function(n,t){jn(n,t)}))},score:cn}),Object(r.jsx)(nn,{players:X})]})]})},cn=function(){var n=Object(u.e)();return Object(r.jsxs)("div",{className:"container",children:[Object(r.jsx)("h1",{children:"Bienvenue sur Red Tetris"}),Object(r.jsx)("button",{className:"btn btn-danger",onClick:function(){n.push("/Rooms")},children:"Play"})]})},on=function(n){var t=n.rooms,e=n.createRoom,c=n.joinRoom;return Object(r.jsxs)("div",{className:"container",children:[Object(r.jsx)("h1",{children:"Room list"}),Object(r.jsx)("div",{className:"list-group mb-3",children:Object.keys(t).map((function(n,e){return Object(r.jsxs)("li",{className:"list-group-item p-1",children:[Object(r.jsxs)("label",{children:[Object(r.jsx)("b",{children:t[n].name})," ",Object(r.jsxs)("b",{children:["(",Object.keys(t[n].players).length,")"]})]}),Object(r.jsx)("button",{className:"btn btn-danger float-right",onClick:function(){return c(t[n].name)},children:"Join"})]},e)}))}),Object(r.jsx)("button",{className:"btn btn-danger",onClick:e,children:"Create New Room"})]})},an=function(n){var t=n.roomName,e=Object(c.useState)(""),o=Object(m.a)(e,2),i=o[0],a=o[1],s=Object(u.e)();return Object(r.jsxs)("div",{className:"container",children:[Object(r.jsxs)("h1",{children:['Join "',t,'"']}),Object(r.jsxs)("form",{children:[Object(r.jsx)("div",{className:"form-group",children:Object(r.jsx)("input",{className:"form-control",placeholder:"Username",onChange:function(n){a(n.target.value)}})}),Object(r.jsx)("input",{className:"btn btn-danger",type:"submit",value:"Join",onClick:function(n){n.preventDefault(),i&&s.push("/#".concat(t,"[").concat(i,"]"))}})]})]})},sn=(e(94),function(){var n=Object(c.useContext)(f),t=Object(u.e)(),e=Object(c.useState)({}),o=Object(m.a)(e,2),i=o[0],a=o[1],s=Object(c.useState)(null),b=Object(m.a)(s,2),l=b[0],j=b[1],d=function(){t.push("/New-room")},O=function(n){j(n)},p=function(){return l?Object(r.jsx)(an,{roomName:l}):Object(r.jsx)(on,{rooms:i,createRoom:d,joinRoom:O})};return Object(c.useEffect)((function(){n.emit("getRooms",(function(n){a(n)}))}),[n]),Object(c.useEffect)((function(){n.on("updateRooms",(function(n){a(n)}))}),[i]),Object(r.jsx)(p,{})}),un=function(){Object(c.useContext)(f);var n=Object(u.e)(),t=Object(c.useState)(""),e=Object(m.a)(t,2),o=e[0],i=e[1],a=Object(c.useState)(""),s=Object(m.a)(a,2),b=s[0],l=s[1];return Object(r.jsxs)("div",{className:"container",children:[Object(r.jsx)("h1",{children:"New Room Creation"}),Object(r.jsxs)("form",{children:[Object(r.jsx)("div",{className:"form-group",children:Object(r.jsx)("input",{className:"form-control",type:"text",placeholder:"Username",onChange:function(n){i(n.target.value)}})}),Object(r.jsx)("div",{className:"form-group",children:Object(r.jsx)("input",{className:"form-control",type:"text",placeholder:"Room name",onChange:function(n){l(n.target.value)}})}),Object(r.jsx)("input",{className:"btn btn-danger",type:"submit",value:"Create",onClick:function(t){t.preventDefault(),o&&b&&n.push("/#".concat(b,"[").concat(o,"]"))}})]})]})},bn=(e(95),function(){return Object(r.jsx)(f.Provider,{value:j,children:Object(r.jsxs)(s.a,{children:[Object(r.jsx)(u.a,{path:"/",exact:!0,component:rn}),Object(r.jsx)(u.a,{path:"/Home",component:cn}),Object(r.jsx)(u.a,{path:"/Rooms",component:sn}),Object(r.jsx)(u.a,{path:"/New-room",component:un})]})})});a.a.render(Object(r.jsx)(bn,{}),document.getElementById("tetris"))}},[[96,1,2]]]);
//# sourceMappingURL=main.42d5c165.chunk.js.map