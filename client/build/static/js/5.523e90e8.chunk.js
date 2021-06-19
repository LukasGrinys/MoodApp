(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[5],{100:function(e,a,t){e.exports={container:"ErrorBox_container__2Xlyv",fadeIn:"ErrorBox_fadeIn__1l7CO"}},101:function(e,a,t){"use strict";var r=t(0),n=t.n(r),s=t(102),c=t.n(s),l=t(21),i=t(8),o=t(14),u=t(20),d=t.n(u);a.a=function(){var e=Object(o.b)();return(n.a.createElement("div",{className:c.a.container},n.a.createElement("div",{className:d()(c.a.button,e&&c.a.dark),onClick:function(){window.history.back()}},n.a.createElement(l.a,{icon:i.a}),n.a.createElement("div",{className:c.a.text},"Go back"))))}},102:function(e,a,t){e.exports={container:"BackButton_container__3efh3",button:"BackButton_button__1DOSm",text:"BackButton_text__92CkS",dark:"BackButton_dark__Cwc1w"}},104:function(e,a,t){"use strict";var r=t(101);a.a=r.a},105:function(e,a,t){"use strict";var r=t(0),n=t.n(r),s=t(95),c=t.n(s),l=function(e){var a=e.children;return(n.a.createElement("h1",{className:c.a.heading},a))},i=function(e){var a=e.children;return(n.a.createElement("div",{className:c.a.formWrapper},a))},o=function(e){var a=e.children;return(n.a.createElement("span",{className:c.a.label},a))},u=function(e){var a=e.type,t=e.name,r=e.value,s=e.controlEvents,l=e.placeholder,i=s.handleChange,o=s.handleBlur;return"text"===a||"email"===a||"password"===a?n.a.createElement("input",{type:a,name:t,value:r,className:c.a.textInput,onChange:i,onBlur:o}):"textarea"===a?n.a.createElement("textarea",{name:t,onChange:i,onBlur:o,value:r,placeholder:l,className:c.a.textArea}):void 0};u.defaultProps={type:"text",name:"",value:"",controlEvents:{handleBlur:function(){},handleChange:function(){}},placeholder:""};var d=u,m=function(e){var a=e.children;return(n.a.createElement("div",{className:c.a.formFooter},a))},f=function(e){var a=e.children;return(n.a.createElement("div",{className:c.a.errorMessage},a))};t.d(a,"c",(function(){return l})),t.d(a,"f",(function(){return i})),t.d(a,"e",(function(){return o})),t.d(a,"d",(function(){return d})),t.d(a,"b",(function(){return m})),t.d(a,"a",(function(){return f}))},108:function(e,a,t){"use strict";t.d(a,"a",(function(){return r}));var r={required:"Required field",email:"Enter a proper e-mail address",passwordMatch:"Passwords do not match",min:"Minimum count of symbols is "}},109:function(e,a,t){"use strict";t.d(a,"a",(function(){return r}));var r={email:"",password:"",firstName:"",lastName:"",confirmPassword:"",currentPassword:""}},144:function(e,a,t){e.exports={miniHeader:"Settings_miniHeader__3UEUI"}},176:function(e,a,t){e.exports={container:"SuccessBox_container__1OKsK",fadeIn:"SuccessBox_fadeIn__1MRDj"}},185:function(e,a,t){"use strict";t.r(a);var r=t(0),n=t.n(r),s=t(26),c=t(104),l=t(105),i=t(96),o=t(97),u=t(176),d=t.n(u),m=function(e){var a=e.children;return(n.a.createElement("div",{className:d.a.container},a))},f=t(144),h=t.n(f),E=t(4),v=t.n(E),b=t(29),w=t(22),p=t(120),_=t(119),N=t(108),g=t(39),P=function(e){var a=e.email,t=function(e){var a=e.firstName,t=e.lastName,n=Object(r.useState)(!1),s=Object(b.a)(n,2),c=s[0],l=s[1],i=Object(w.c)(),o=Object(w.d)((function(e){var a=e.user;return{userData:a.userData||{},editUserData:a.editUser||{}}})),u=o.userData,d=o.editUserData,m=u.id,f=d.success,h=d.error,E=d.isEditing;Object(r.useEffect)((function(){return function(){i(Object(g.e)())}}),[]);var P=_.a({firstName:_.c().required(N.a.required),lastName:_.c().required(N.a.required)}),x={firstName:a,lastName:t},S=Object(p.a)({initialValues:x,validationSchema:P,enableReinitialize:!0,onSubmit:function(e){return v.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return l(!0),a.next=3,v.a.awrap(i(Object(g.h)({userId:m,details:e})));case 3:l(!1);case 4:case"end":return a.stop()}}))}}),B=S.values,O=S.errors,j=S.touched,k=S.isValid,C=S.handleBlur,y=S.handleChange;return{isSubmitting:c,isEditingUser:E,editUserError:h,editUserSuccess:f,values:B,errors:O,touched:j,isValid:k,handleSubmit:S.handleSubmit,controlEvents:{handleChange:y,handleBlur:C}}}({firstName:e.firstName,lastName:e.lastName}),s=t.isSubmitting,c=t.isEditingUser,u=t.editUserError,d=t.editUserSuccess,f=t.values,E=t.errors,P=t.touched,x=t.isValid,S=t.handleSubmit,B=t.controlEvents;return n.a.createElement(l.f,null,n.a.createElement("div",null,n.a.createElement("strong",null,"User: ")," ",a),n.a.createElement("br",null),n.a.createElement("h3",{className:h.a.miniHeader},"Edit details:"),n.a.createElement(l.e,null,"First name:"),n.a.createElement(l.d,{name:"firstName",value:f.firstName,controlEvents:B}),E.firstName&&P.firstName&&n.a.createElement(l.a,null,E.firstName),n.a.createElement(l.e,null,"Last name:"),n.a.createElement(l.d,{name:"lastName",value:f.lastName,controlEvents:B}),E.lastName&&P.lastName&&n.a.createElement(l.a,null,E.lastName),n.a.createElement(l.b,null,n.a.createElement(i.a,{disabled:s||!x||c,handleClick:S},"Save changes")),!c&&u&&n.a.createElement(o.a,null,u),!c&&d&&n.a.createElement(m,null,"Account information was saved"))},x=t(109),S=function(e){e.userId;var a=function(){var e=Object(r.useState)(!1),a=Object(b.a)(e,2),t=a[0],n=a[1],s=Object(w.c)(),c=Object(w.d)((function(e){var a=e.user;return{userData:a.userData||{},changePasswordData:a.changePassword||{}}})),l=c.userData,i=c.changePasswordData,o=l.id,u=i.success,d=i.error;Object(r.useEffect)((function(){return function(){s(Object(g.c)())}}),[]);var m=_.a({currentPassword:_.c().required(N.a.required),password:_.c().required(N.a.required).min(6,"".concat(N.a.min," 6")),confirmPassword:_.c().required(N.a.required).oneOf([_.b("password"),null],N.a.passwordMatch)}),f={currentPassword:x.a.currentPassword,password:x.a.password,confirmPassword:x.a.confirmPassword},h=Object(p.a)({initialValues:f,validationSchema:m,onSubmit:function(e){var a,t;return v.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return a=e.currentPassword,t=e.password,n(!0),r.next=4,v.a.awrap(s(Object(g.b)({userId:o,currentPassword:a,newPassword:t})));case 4:n(!1);case 5:case"end":return r.stop()}}))}}),E=h.values,P=h.errors,S=h.isValid,B=h.touched;return{values:E,controlEvents:{handleChange:h.handleChange,handleBlur:h.handleBlur},errors:P,isValid:S,touched:B,isSubmitting:t,handleSubmit:h.handleSubmit,changePasswordSuccess:u,changePasswordError:d}}(),t=a.values,s=a.controlEvents,c=a.errors,u=a.isValid,d=a.isSubmitting,f=a.handleSubmit,E=a.touched,P=a.changePasswordSuccess,S=a.changePasswordError;return n.a.createElement(l.f,null,n.a.createElement("h3",{className:h.a.miniHeader},"Change password"),n.a.createElement(l.e,null,"Current password:"),n.a.createElement(l.d,{type:"password",name:"currentPassword",controlEvents:s,value:t.currentPassword}),n.a.createElement(l.e,null,"New password:"),n.a.createElement(l.d,{type:"password",name:"password",controlEvents:s,value:t.password}),E.password&&c.password&&n.a.createElement(l.a,null,c.password),n.a.createElement(l.e,null,"Confirm new password:"),n.a.createElement(l.d,{type:"password",name:"confirmPassword",controlEvents:s,value:t.confirmPassword}),E.confirmPassword&&c.confirmPassword&&n.a.createElement(l.a,null,c.confirmPassword),n.a.createElement(l.b,null,n.a.createElement(i.a,{disabled:!u||d,handleClick:f},"Change password")),S&&n.a.createElement(o.a,null,S),P&&n.a.createElement(m,null,"Password was changed successfully"))},B=t(28),O=t(12),j=function(){var e=Object(w.d)((function(e){var a=e.user;return a&&a.userData?a.userData:{}})),a=e.email,t=e.firstName,r=e.lastName;return e&&Object.keys(e).length?n.a.createElement("div",null,n.a.createElement(c.a,null),n.a.createElement(l.c,null,"Account settings"),n.a.createElement(P,{email:a,firstName:t,lastName:r}),n.a.createElement("br",null),n.a.createElement(S,null),n.a.createElement("br",null),n.a.createElement(l.f,null,n.a.createElement("h3",{className:h.a.miniHeader},"Delete account"),n.a.createElement(l.b,null,n.a.createElement(s.b,{to:O.a.delete},n.a.createElement(i.a,null,"Delete account"))))):n.a.createElement(B.a,null)};a.default=j},95:function(e,a,t){e.exports={formWrapper:"Forms_formWrapper__1mko5",heading:"Forms_heading__3bPSY",label:"Forms_label__3IUAR",textInput:"Forms_textInput__1Cd0Y",errorMessage:"Forms_errorMessage__1yEd9",formFooter:"Forms_formFooter__2wssa",textArea:"Forms_textArea__1N_0h"}},96:function(e,a,t){"use strict";var r=t(98);a.a=r.a},97:function(e,a,t){"use strict";var r=t(0),n=t.n(r),s=t(100),c=t.n(s),l=function(e){var a=e.children;return(n.a.createElement("div",{className:c.a.container},a))};a.a=l},98:function(e,a,t){"use strict";var r=t(0),n=t.n(r),s=t(99),c=t.n(s),l=t(14),i=t(20),o=t.n(i);a.a=function(e){var a=e.color,t=void 0===a?"primary":a,r=e.handleClick,s=void 0===r?function(){}:r,i=e.disabled,u=e.children,d=Object(l.b)();return n.a.createElement("button",{className:o()(c.a.button,d&&c.a.btnDark,function(e){switch(e){case"primary":return c.a.btnPrimary;case"white":return c.a.btnWhite;default:return null}}(t)),onClick:s,disabled:i,type:"button"},u)}},99:function(e,a,t){e.exports={button:"Button_button__d3qRh",btnPrimary:"Button_btnPrimary__1Qie6",btnWhite:"Button_btnWhite___q7Zi",btnDark:"Button_btnDark__19vqj"}}}]);