(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[1],{12:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var r={home:"/",login:"/login",logout:"/logout",dashboard:"/dashboard",addNewLog:"/addlog",register:"/register",settings:"/settings",allLogs:"/logs",viewLog:"/logs/:id",delete:"/delete",stats:"/stats"}},14:function(e,t,a){"use strict";a.d(t,"b",(function(){return u})),a.d(t,"c",(function(){return i})),a.d(t,"a",(function(){return l}));var r=a(29),n=a(0),c=a.n(n),s=c.a.createContext(),o=c.a.createContext();function u(){return Object(n.useContext)(s)}function i(){return Object(n.useContext)(o)}function l(e){var t=e.children,a=Object(n.useState)(function(){var e=localStorage.getItem("nightmode");return void 0!==e&&"true"===e}()),u=Object(r.a)(a,2),i=u[0],l=u[1];Object(n.useEffect)((function(){!0===i?(document.body.style.background="rgb(51, 51, 51)",document.body.style.color="rgb(242,242,242"):(document.body.style.background="#FFFFFF",document.body.style.color="#000000")}),[i]);return c.a.createElement(s.Provider,{value:i},c.a.createElement(o.Provider,{value:function(){l((function(e){return localStorage.setItem("nightmode",!e),!e}))}},t))}},15:function(e,t,a){e.exports={header:"Header_header__26Q9C",top:"Header_top__2ou-7",nightMode:"Header_nightMode__1B3nS",logoContainer:"Header_logoContainer__3kS0k",logo:"Header_logo__1RtJY",bars:"Header_bars__3SokF",rotateButton:"Header_rotateButton__n8exW",nightmode_button:"Header_nightmode_button__1kTM1",nightmode_button_caption:"Header_nightmode_button_caption__1yctb"}},17:function(e,t,a){e.exports={loadingScreen:"loading_loadingScreen__2L2K8",barContainer:"loading_barContainer__26aGf",dark:"loading_dark__1Hh-2",bar:"loading_bar__1UekV",wave:"loading_wave__22obD",delay1:"loading_delay1__2mzyY",delay2:"loading_delay2__1snf7"}},2:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var r={canLog:{request:"CAN_LOG_REQUEST",receive:"CAN_LOG_RECEIVE"},getLastLogs:{request:"GET_LAST_LOGS_REQUEST",receive:"GET_LAST_LOGS_RECEIVE",reset:"GET_LAST_LOGS_RESET"},getLog:{request:"GET_LOG_REQUEST",receive:"GET_LOG_RECEIVE",reset:"GET_LOG_RESET"},getLogs:{request:"GET_LOGS_REQUEST",receive:"GET_LOGS_RECEIVE",reset:"GET_LOGS_RESET"},postLog:{request:"POST_LOG_REQUEST",receive:"POST_LOG_RECEIVE",reset:"POST_LOG_RESET"}}},25:function(e,t,a){e.exports={navBar:"NavBar_navBar__28POm",appearTop:"NavBar_appearTop__AkjbT",navItem:"NavBar_navItem__t4_d1",nightmode:"NavBar_nightmode__tJMeS",navBarMask:"NavBar_navBarMask__2MECL",fadeIn:"NavBar_fadeIn__Ec-oC"}},28:function(e,t,a){"use strict";var r=a(0),n=a.n(r),c=a(17),s=a.n(c),o=a(14),u=a(20),i=a.n(u);t.a=function(){var e=Object(o.b)();return(n.a.createElement("div",{className:s.a.loadingScreen},n.a.createElement("div",null,"Loading"),n.a.createElement("br",null),n.a.createElement("div",{className:i()(s.a.barContainer,e&&s.a.dark)},n.a.createElement("div",{className:s.a.bar}),n.a.createElement("div",{className:[s.a.bar,s.a.delay1].join(" ")}),n.a.createElement("div",{className:[s.a.bar,s.a.delay2].join(" ")}))))}},3:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var r={createUser:{request:"CREATE_USER_REQUEST",receive:"CREATE_USER_RECEIVE",reset:"CREATE_USER_RESET"},loginUser:{request:"LOGIN_USER_REQUEST",receive:"LOGIN_USER_RECEIVE"},clearUserData:"CLEAR_USER",userAuth:"USER_AUTH",editUser:{request:"EDIT_USER_REQUEST",receive:"EDIT_USER_RECEIVE",reset:"EDIT_USER_RESET"},changePassword:{request:"CHANGE_PASSWORD_REQUEST",receive:"CHANGE_PASSWORD_RECEIVE",reset:"CHANGE_PASSWORD_RESET"}}},32:function(e,t,a){"use strict";a.d(t,"a",(function(){return i})),a.d(t,"f",(function(){return l})),a.d(t,"b",(function(){return g})),a.d(t,"g",(function(){return d})),a.d(t,"c",(function(){return p})),a.d(t,"h",(function(){return f})),a.d(t,"e",(function(){return h})),a.d(t,"i",(function(){return v})),a.d(t,"d",(function(){return b}));var r=a(38),n=a(4),c=a.n(n),s=a(11),o=a.n(s),u=a(2),i=function(e,t,a){var r;return c.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return r={userId:a,date:e,timing:t},n.abrupt("return",(function(e){var t,a;return c.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,c.a.awrap(o.a.post("/api/canLog",r));case 2:if(t=n.sent,a=t.data,e({type:u.a.canLog.request}),!a||!a.data){n.next=8;break}return e({type:u.a.canLog.receive,payload:a.data.canLog}),n.abrupt("return");case 8:e({type:u.a.canLog.receive,payload:!1});case 9:case"end":return n.stop()}}))}));case 2:case"end":return n.stop()}}))},l=function(e){var t,a,r,n;return c.a.async((function(s){for(;;)switch(s.prev=s.next){case 0:return t=e.userId,a=e.limit,r=void 0===a?9:a,n="/api/getLogs?id=".concat(t,"&limit=").concat(r),s.abrupt("return",(function(e){var t,a,r,s;return c.a.async((function(i){for(;;)switch(i.prev=i.next){case 0:return e({type:u.a.getLastLogs.request}),i.prev=1,i.next=4,c.a.awrap(o.a.get(n));case 4:if(t=i.sent,a=t.data,r=a.success,!(s=a.error)){i.next=10;break}return e({type:u.a.getLastLogs.receive,payload:{logs:[],error:s,isFetching:!1}}),i.abrupt("return");case 10:if(!r||!a.data){i.next=13;break}return e({type:u.a.getLastLogs.receive,payload:{logs:a.data,error:null,isFetching:!1}}),i.abrupt("return");case 13:i.next=18;break;case 15:i.prev=15,i.t0=i.catch(1),e({type:u.a.getLastLogs.receive,payload:{logs:[],error:i.t0,isFetching:!1}});case 18:case"end":return i.stop()}}),null,null,[[1,15]])}));case 3:case"end":return s.stop()}}))},g=function(){return function(e){return e({type:u.a.getLastLogs.reset})}},d=function(e){return c.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",(function(t){var a,r,n,s,i;return c.a.async((function(l){for(;;)switch(l.prev=l.next){case 0:return a="/api/getLog?id=".concat(e),t({type:u.a.getLog.request}),l.prev=2,l.next=5,c.a.awrap(o.a.get(a));case 5:if(r=l.sent,n=r.data,s=n.error,i=n.data,!s){l.next=10;break}return t({type:u.a.getLog.receive,payload:{isFetching:!1,error:s,logData:{}}}),l.abrupt("return");case 10:t({type:u.a.getLog.receive,payload:{isFetching:!1,error:!1,logData:i}}),l.next=16;break;case 13:l.prev=13,l.t0=l.catch(2),t({type:u.a.getLog.receive,payload:{isFetching:!1,error:l.t0,logData:{}}});case 16:case"end":return l.stop()}}),null,null,[[2,13]])}));case 1:case"end":return t.stop()}}))},p=function(){return function(e){e({type:u.a.getLog.reset})}},f=function(e){var t,a,n,s;return c.a.async((function(i){for(;;)switch(i.prev=i.next){case 0:return t=e.userId,a=e.start,n=e.limit,s=e.currentLogs,i.abrupt("return",(function(e){var i,l,g,d,p;return c.a.async((function(f){for(;;)switch(f.prev=f.next){case 0:return i="/api/getLogs?id=".concat(t).concat(a?"&skip=".concat(a):"","&limit=").concat(n),e({type:u.a.getLogs.request}),f.prev=2,f.next=5,c.a.awrap(o.a.get(i));case 5:if(l=f.sent,g=l.data,d=g.data,!(p=g.error)){f.next=10;break}return e({type:u.a.getLogs.receive,payload:{isFetching:!1,error:p}}),f.abrupt("return");case 10:e({type:u.a.getLogs.receive,payload:{isFetching:!1,error:!1,logs:s?[].concat(Object(r.a)(s),Object(r.a)(d)):d,noLogsLeft:!d.length}}),f.next=16;break;case 13:f.prev=13,f.t0=f.catch(2),e({type:u.a.getLogs.receive,payload:{isFetching:!1,error:f.t0}});case 16:case"end":return f.stop()}}),null,null,[[2,13]])}));case 2:case"end":return i.stop()}}))},h=function(){return function(e){e({type:u.a.getLogs.reset})}},v=function(e){var t,a,r,n,s,i;return c.a.async((function(l){for(;;)switch(l.prev=l.next){case 0:return t=e.userId,a=e.date,r=e.timing,n=e.rating,s=e.text,i={userId:t,date:a,timing:r,rating:n,text:s},l.abrupt("return",(function(e){var t,a,r,n;return c.a.async((function(s){for(;;)switch(s.prev=s.next){case 0:return s.prev=0,e({type:u.a.postLog.request}),s.next=4,c.a.awrap(o.a.post("/api/postLog",i));case 4:if(t=s.sent,a=t.data,r=a.error,n=a.success,!r&&n){s.next=10;break}return e({type:u.a.postLog.receive,payload:{isPosting:!1,success:!1,error:r||"Unknown error occured"}}),s.abrupt("return");case 10:e({type:u.a.postLog.receive,payload:{isPosting:!1,success:!0,error:null}}),s.next=16;break;case 13:s.prev=13,s.t0=s.catch(0),e({type:u.a.postLog.receive,payload:{isPosting:!1,success:!1,error:s.t0}});case 16:case"end":return s.stop()}}),null,null,[[0,13]])}));case 3:case"end":return l.stop()}}))},b=function(){return function(e){e({type:u.a.postLog.reset})}}},39:function(e,t,a){"use strict";a.d(t,"g",(function(){return g})),a.d(t,"d",(function(){return d})),a.d(t,"j",(function(){return p})),a.d(t,"i",(function(){return f})),a.d(t,"a",(function(){return h})),a.d(t,"h",(function(){return v})),a.d(t,"e",(function(){return b})),a.d(t,"b",(function(){return E})),a.d(t,"c",(function(){return m})),a.d(t,"f",(function(){return _}));var r=a(1),n=a(4),c=a.n(n),s=a(3),o=a(11),u=a.n(o),i=a(32),l=new(a(50).a),g=function(e){return c.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",(function(t){var a,r,n,o;return c.a.async((function(i){for(;;)switch(i.prev=i.next){case 0:return t({type:s.a.createUser.request}),i.prev=1,i.next=4,c.a.awrap(u.a.post("/api/users",e));case 4:if(a=i.sent,r=a.data,n=r.success,!(o=r.error)&&n){i.next=10;break}return t({type:s.a.createUser.receive,payload:{success:!1,error:o||"Could not create user"}}),i.abrupt("return");case 10:n&&t({type:s.a.createUser.receive,payload:{success:!0,error:null}}),i.next=16;break;case 13:i.prev=13,i.t0=i.catch(1),t({type:s.a.createUser.receive,payload:{success:!1,error:i.t0||"Could not create user"}});case 16:case"end":return i.stop()}}),null,null,[[1,13]])}));case 1:case"end":return t.stop()}}))},d=function(){return function(e){return e({type:s.a.createUser.reset})}},p=function(e){return c.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",(function(t){var a,r,n,o;return c.a.async((function(i){for(;;)switch(i.prev=i.next){case 0:return t({type:s.a.loginUser.request}),i.prev=1,i.next=4,c.a.awrap(u.a.post("/api/login",e));case 4:if(a=i.sent,r=a.data,n=r.isAuth,!(o=r.error)){i.next=10;break}return t({type:s.a.loginUser.receive,payload:{isAuth:!1,authError:o}}),i.abrupt("return");case 10:n&&t({type:s.a.loginUser.receive,payload:{isAuth:n,error:null}}),i.next=16;break;case 13:i.prev=13,i.t0=i.catch(1),t({type:s.a.loginUser.receive,payload:{isAuth:!1,error:i.t0}});case 16:case"end":return i.stop()}}),null,null,[[1,13]])}));case 1:case"end":return t.stop()}}))};function f(){var e=u.a.get("/api/logout");return function(t){e.then((function(e){200===e.status&&(l.remove("auth"),t({type:s.a.clearUserData}),Object(i.e)(),Object(i.b)())}))}}function h(){var e=u.a.get("/api/auth").then((function(e){return e.data}));return{type:s.a.userAuth,payload:e}}var v=function(e){var t,a,n;return c.a.async((function(o){for(;;)switch(o.prev=o.next){case 0:return t=e.userId,a=e.details,"/api/editAccount",n=Object(r.a)({id:t},a),o.abrupt("return",(function(e){var t,a,r;return c.a.async((function(o){for(;;)switch(o.prev=o.next){case 0:return e({type:s.a.editUser.request}),o.prev=1,o.next=4,c.a.awrap(u.a.post("/api/editAccount",n));case 4:if(t=o.sent,a=t.data,!(r=a.error)){o.next=10;break}return e({type:s.a.editUser.receive,payload:{isEditing:!1,success:!1,error:r.toString()}}),o.abrupt("return");case 10:e({type:s.a.editUser.receive,payload:{isEditing:!1,success:!0,error:null}}),o.next=16;break;case 13:o.prev=13,o.t0=o.catch(1),e({type:s.a.editUser.receive,payload:{isEditing:!1,success:!1,error:o.t0.toString()}});case 16:case"end":return o.stop()}}),null,null,[[1,13]])}));case 4:case"end":return o.stop()}}))},b=function(){return function(e){e({type:s.a.editUser.reset})}},E=function(e){var t,a,r;return c.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return t=e.userId,a=e.currentPassword,r=e.newPassword,n.abrupt("return",(function(e){var n,o,i,l;return c.a.async((function(g){for(;;)switch(g.prev=g.next){case 0:if(t&&a&&r){g.next=2;break}return g.abrupt("return");case 2:return n="/api/changePassword",o={id:t,oldPassword:a,newPassword:r},g.next=6,c.a.awrap(e({type:s.a.changePassword.request}));case 6:return g.prev=6,g.next=9,c.a.awrap(u.a.post(n,o));case 9:if(i=g.sent,!(l=i.error)){g.next=14;break}return e({type:s.a.changePassword.receive,payload:{isChanging:!1,error:l,success:!1}}),g.abrupt("return");case 14:e({type:s.a.changePassword.receive,payload:{isChanging:!1,error:null,success:!0}}),g.next=20;break;case 17:g.prev=17,g.t0=g.catch(6),e({type:s.a.changePassword.receive,payload:{isChanging:!1,error:g.t0,success:!1}});case 20:case"end":return g.stop()}}),null,null,[[6,17]])}));case 2:case"end":return n.stop()}}))},m=function(){return c.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(function(e){return c.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:e({type:s.a.changePassword.reset});case 1:case"end":return t.stop()}}))}));case 1:case"end":return e.stop()}}))},_=function(){return c.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(function(e){return c.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:e({type:s.a.clearUserData});case 1:case"end":return t.stop()}}))}));case 1:case"end":return e.stop()}}))}},51:function(e,t,a){"use strict";var r=a(0),n=a.n(r),c=function(e){var t=e.showWhite,a=e.className;return(n.a.createElement("img",{src:t?"media/logo_white.png":"media/logo_blue.png",alt:"MoodApp",className:a}))};a.d(t,"a",(function(){return c}))},62:function(e,t,a){e.exports=a(94)},94:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),c=a(30),s=a.n(c),o=a(26),u=a(22),i=a(18),l=a(53),g=a.n(l),d=a(54),p=a(1),f=a(2),h={canLog:null,lastLogs:{logs:[],error:null,isFetching:!1},singleLog:{logData:{},error:null,isFetching:!1},allLogs:{isFetching:!1,error:null,logs:[],noLogsLeft:!1},postLog:{isPosting:!1,success:null,error:null}},v=a(3),b={createUser:{success:null,error:null},isAuth:null,authError:null,userData:{id:null,email:null,firstName:"",lastName:""},editUser:{isEditing:!1,success:null,error:null},changePassword:{isChangingPassword:!1,changePasswordError:null,changePasswordSuccess:null}},E=Object(i.c)({logs:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h,t=arguments.length>1?arguments[1]:void 0,a=t.payload,r=t.type;switch(r){case f.a.canLog.request:return Object(p.a)({},e,{canLog:null});case f.a.canLog.receive:return Object(p.a)({},e,{canLog:a});case f.a.getLastLogs.request:return Object(p.a)({},e,{lastLogs:{logs:[],error:null,isFetching:!0}});case f.a.getLastLogs.receive:return Object(p.a)({},e,{lastLogs:Object(p.a)({},a)});case f.a.getLastLogs.reset:return Object(p.a)({},e,{lastLogs:Object(p.a)({},h.lastLogs)});case f.a.getLog.request:return Object(p.a)({},e,{singleLog:{isFetching:!0,error:null,logData:{}}});case f.a.getLog.receive:return Object(p.a)({},e,{singleLog:Object(p.a)({},a)});case f.a.getLog.reset:return Object(p.a)({},e,{singleLog:Object(p.a)({},h.singleLog)});case f.a.getLogs.request:return Object(p.a)({},e,{allLogs:Object(p.a)({},e.allLogs,{isFetching:!0,error:null})});case f.a.getLogs.receive:return Object(p.a)({},e,{allLogs:Object(p.a)({},e.allLogs,{},a)});case f.a.getLogs.reset:return Object(p.a)({},e,{allLogs:Object(p.a)({},h.allLogs)});case f.a.postLog.request:return Object(p.a)({},e,{postLog:{isPosting:!0,success:null,error:null}});case f.a.postLog.receive:return a.success?Object(p.a)({},e,{canLog:!1,postLog:Object(p.a)({},a)}):Object(p.a)({},e,{postLog:Object(p.a)({},a)});case f.a.postLog.reset:return Object(p.a)({},e,{postLog:Object(p.a)({},h.postLog)});default:return e}},user:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:b,t=arguments.length>1?arguments[1]:void 0,a=t.type,r=t.payload;switch(a){case v.a.createUser.request:return Object(p.a)({},e,{createUser:{success:null,error:null}});case v.a.createUser.receive:return Object(p.a)({},e,{createUser:Object(p.a)({},r)});case v.a.createUser.reset:return Object(p.a)({},e,{createUser:Object(p.a)({},b.createUser)});case v.a.loginUser.request:return Object(p.a)({},e,{isAuth:null,authError:null});case v.a.loginUser.receive:return Object(p.a)({},e,{},r);case v.a.userAuth:return r.error?Object(p.a)({},e,{authError:r.error,isAuth:!1}):Object(p.a)({},e,{authError:null,isAuth:!0,userData:{id:r.id||null,email:r.email||null,firstName:r.firstName||"",lastName:r.lastName||""}});case v.a.clearUserData:return Object(p.a)({},e,{authError:b.authError,isAuth:b.isAuth,userData:Object(p.a)({},b.userData)});case v.a.editUser.request:return Object(p.a)({},e,{editUser:{isEditing:!0,success:null,error:null}});case v.a.editUser.receive:return Object(p.a)({},e,{editUser:Object(p.a)({},r)});case v.a.editUser.reset:return Object(p.a)({},e,{editUser:Object(p.a)({},b.editUser)});case v.a.changePassword.request:return Object(p.a)({},e,{changePassword:{isChanging:!0,error:null,success:null}});case v.a.changePassword.receive:return Object(p.a)({},e,{changePassword:Object(p.a)({},r)});case v.a.changePassword.reset:return Object(p.a)({},e,{changePassword:Object(p.a)({},b.changePassword)});default:return e}}}),m=a(19),_=a(12),y=a(15),L=a.n(y),O=a(25),j=a.n(O),x=a(8),w=[{iconName:x.f,path:"/",text:"Home",isAuth:null},{iconName:x.j,path:"/login",text:"Log In",isAuth:!1},{iconName:x.k,path:"/logout",text:"Log Out",isAuth:!0},{iconName:x.p,path:"/register",text:"Sign Up",isAuth:null},{iconName:x.c,path:"/dashboard",text:"Your Dashboard",isAuth:!0},{iconName:x.e,path:"/settings",text:"Settings",isAuth:!0}],S=a(14),U=a(21),N=a(20),A=a.n(N),k=function(e){var t=e.isAuth,a=e.toggleNav,r=Object(S.b)(),c=function(e,t){return n.a.createElement(o.b,{to:e.path,key:t},n.a.createElement("div",{className:A()(j.a.navItem,r&&j.a.nightmode),onClick:a},n.a.createElement(U.a,{icon:e.iconName})," ",e.text))};return n.a.createElement("div",null,n.a.createElement("div",{className:A()(j.a.navBar,r&&j.a.nightMode)},function(e){return e.map((function(e,a){return t&&e.isAuth?c(e,a):t||!1!==e.isAuth?null===e.isAuth?c(e,a):null:c(e,a)}))}(w)),n.a.createElement("div",{className:j.a.navBarMask,onClick:a}))},C=function(e){var t=e.showNav,a=e.toggleNav;return(n.a.createElement("div",{className:L.a.bars},t?n.a.createElement(U.a,{icon:x.o,onClick:a,style:{fontSize:"1.5em",padding:"2px",color:"#f2f2f2",transform:"rotate(90deg)",transition:"0.5s"}}):n.a.createElement(U.a,{icon:x.b,onClick:a,style:{fontSize:"1.5em",padding:"2px",color:"#f2f2f2",transform:"rotate(180deg)",transition:"0.5s"}})))},R=function(){var e=Object(S.b)(),t=Object(S.c)();return n.a.createElement("button",{className:L.a.nightmode_button,onClick:t},n.a.createElement(U.a,{icon:e?x.l:x.h,style:{fontSize:"1.5rem"}}),n.a.createElement("div",{className:L.a.nightmode_button_caption},e?"Day mode":"Night mode"))},T=a(51),P=a(29);var I=Object(u.b)((function(e){return{isAuth:e.user.isAuth}}))((function(e){var t=e.isAuth,a=Object(S.b)(),c=function(){var e=Object(r.useState)(!1),t=Object(P.a)(e,2),a=t[0],n=t[1],c=Object(r.useCallback)((function(){n(!a)}),[a]);return{showNav:a,toggleNav:c}}(),s=c.showNav,o=c.toggleNav;return n.a.createElement("div",{className:L.a.header},n.a.createElement("div",{className:A()(L.a.top,a&&L.a.nightMode),style:a?{backgroundColor:"#2F2F2F"}:{}},n.a.createElement("div",{className:L.a.logoContainer},n.a.createElement(T.a,{className:L.a.logo,showWhite:!0})),n.a.createElement(C,{showNav:s,toggleNav:o}),n.a.createElement(R,null)),s&&n.a.createElement(k,{toggleNav:o,isAuth:t}))})),G=a(28),F=a(56),q=a(57),D=a(59),B=a(58),z=a(60),H=a(39),M=function(e,t){var a=function(a){function r(){return Object(F.a)(this,r),Object(D.a)(this,Object(B.a)(r).apply(this,arguments))}return Object(z.a)(r,a),Object(q.a)(r,[{key:"UNSAFE_componentWillMount",value:function(){this.props.dispatch(Object(H.a)())}},{key:"UNSAFE_componentWillReceiveProps",value:function(e){var a=e.user;a&&a.isAuth?a.isAuth&&!1===t&&this.props.history.push("/dashboard"):t&&this.props.history.push("/login")}},{key:"render",value:function(){var t=this.props.user;return!t||null===t.isAuth&&"/login"!==window.location.pathname?n.a.createElement(G.a,null):n.a.createElement(e,Object.assign({},this.props,{user:this.props.user}))}}]),r}(r.Component);return Object(u.b)((function(e){return{user:e.user}}))(a)},V=n.a.lazy((function(){return a.e(13).then(a.bind(null,194))})),Q=n.a.lazy((function(){return Promise.all([a.e(0),a.e(12)]).then(a.bind(null,190))})),W=n.a.lazy((function(){return Promise.all([a.e(0),a.e(9)]).then(a.bind(null,191))})),J=n.a.lazy((function(){return a.e(4).then(a.bind(null,184))})),Y=n.a.lazy((function(){return a.e(6).then(a.bind(null,188))})),X=n.a.lazy((function(){return a.e(7).then(a.bind(null,189))})),K=n.a.lazy((function(){return a.e(11).then(a.bind(null,193))})),Z=n.a.lazy((function(){return a.e(14).then(a.bind(null,192))})),$=n.a.lazy((function(){return Promise.all([a.e(0),a.e(5)]).then(a.bind(null,185))})),ee=n.a.lazy((function(){return a.e(8).then(a.bind(null,186))})),te=n.a.lazy((function(){return Promise.all([a.e(0),a.e(10)]).then(a.bind(null,187))})),ae=function(){return Object(r.useEffect)((function(){document.getElementById("loadingWindow").remove()}),[]),n.a.createElement(r.Fragment,null,n.a.createElement(I,null),n.a.createElement("div",{className:"content_wrapper"},n.a.createElement(m.c,null,n.a.createElement(r.Suspense,{fallback:n.a.createElement(G.a,null)},n.a.createElement(m.a,{path:_.a.home,exact:!0,component:V}),n.a.createElement(m.a,{path:_.a.login,exact:!0,component:M(Q,!1)}),n.a.createElement(m.a,{path:_.a.register,exact:!0,component:M(W,null)}),n.a.createElement(m.a,{path:_.a.dashboard,exact:!0,component:M(J,!0)}),n.a.createElement(m.a,{path:_.a.addNewLog,exact:!0,component:M(Y,!0)}),n.a.createElement(m.a,{path:_.a.allLogs,exact:!0,component:M(X,!0)}),n.a.createElement(m.a,{path:_.a.viewLog,exact:!0,component:M(K,!0)}),n.a.createElement(m.a,{path:_.a.logout,exact:!0,component:M(Z,!0)}),n.a.createElement(m.a,{path:_.a.settings,exact:!0,component:M($,!0)}),n.a.createElement(m.a,{path:_.a.delete,exact:!0,component:M(te,!0)}),n.a.createElement(m.a,{path:_.a.stats,exact:!0,component:M(ee,!0)})))))},re=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||i.d,ne=Object(i.e)(E,{},re(Object(i.a)(g.a,d.a)));s.a.render(n.a.createElement(u.a,{store:ne},n.a.createElement(S.a,null,n.a.createElement(o.a,null,n.a.createElement(ae,null)))),document.getElementById("root"))}},[[62,2,3]]]);