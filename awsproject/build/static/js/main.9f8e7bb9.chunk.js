(this.webpackJsonpawsproject=this.webpackJsonpawsproject||[]).push([[0],{16:function(e,t,s){},25:function(e,t,s){},33:function(e,t,s){"use strict";s.r(t);var c=s(1),n=s.n(c),r=s(18),a=s.n(r),i=(s(25),s(16),s(19)),o=s(2),j=s(7);var l=s(0);function u(){var e=Object(c.useState)(!1),t=Object(j.a)(e,2),s=t[0],n=t[1],r=Object(c.useState)(""),a=Object(j.a)(r,2),i=a[0],o=a[1],u=Object(c.useState)([]),d=Object(j.a)(u,2),b=d[0],h=d[1],p=Object(c.useRef)(!0);Object(c.useEffect)((function(){if(p.current=!0,!b.length||s)return fetch("https://bzj0anqy3l.execute-api.us-east-1.amazonaws.com/dev/getAllQuizByEmail?email=example@gmail.com",{method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer "+sessionStorage.getItem("token")}}).then((function(e){return e.json()})).then((function(e){p.current&&h(e)})),function(){return p.current=!1}}),[s,b]),Object(c.useEffect)((function(){s&&setTimeout((function(){p.current&&n(!1)}),1e3)}),[s]);var O=function(e){var t;e.preventDefault(),(t=i,fetch("https://bzj0anqy3l.execute-api.us-east-1.amazonaws.com/dev/createQuiz",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:t,status:"Draft"})}).then((function(e){return e.json()}))).then((function(){p.current&&(o(""),n(!0))}))};return Object(l.jsxs)("div",{className:"App dashboard-wrapper",children:[Object(l.jsx)("ul",{className:"breadcrumbs",children:Object(l.jsx)("li",{children:Object(l.jsx)("a",{href:"/dashboard",children:"Dashboard"})})}),Object(l.jsxs)("div",{className:"title-line",children:[Object(l.jsx)("h1",{id:"dashboard-title",children:"Quiz Dashboard"}),s&&Object(l.jsx)("h2",{id:"successful-alert",children:" * Quiz Creation Successful "}),Object(l.jsxs)("form",{id:"create-quiz-form",onSubmit:O,children:[Object(l.jsx)("label",{children:Object(l.jsx)("input",{type:"text",id:"create-quiz-input",onChange:function(e){return o(e.target.value)},value:i})}),Object(l.jsx)("button",{type:"submit",className:"new-quiz-btn",onClick:O,children:"Create New Quiz"})]})]}),Object(l.jsx)("div",{className:"dashboard-grid",children:b.map((function(e){return Object(l.jsx)("a",{href:"/report",className:"grid-item-link",children:Object(l.jsxs)("div",{className:"grid-item",children:[Object(l.jsx)("h3",{children:e.title}),Object(l.jsxs)("p",{children:["Status: ",e.status]}),Object(l.jsxs)("p",{children:["Created: ",e.creationDate]}),"Published"===e.status||"Closed"===e.status?Object(l.jsx)(c.Fragment,{children:Object(l.jsxs)("p",{children:["Published: ",e.publishDate]})}):null,"Closed"===e.status?Object(l.jsx)(c.Fragment,{children:Object(l.jsxs)("p",{children:["Closed: ",e.closingDate]})}):null,"Published"===e.status||"Closed"===e.status?Object(l.jsx)(c.Fragment,{children:Object(l.jsx)("a",{href:"/report",children:Object(l.jsx)("button",{className:"report-btn",children:"Results Report"})})}):null]},e.id)})}))})]})}var d=s(10),b=s.n(d),h=s(13),p=s.p+"static/media/AYT-Logo.3f47015f.png",O=s.p+"static/media/footer-logo.f14cf9fc.PNG";function x(e){return m.apply(this,arguments)}function m(){return(m=Object(h.a)(b.a.mark((function e(t){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",fetch(" https://bzj0anqy3l.execute-api.us-east-1.amazonaws.com/dev/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then((function(e){return e.json()})));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function f(e){var t=e.setToken,s=Object(c.useState)(),n=Object(j.a)(s,2),r=n[0],a=n[1],i=Object(c.useState)(),o=Object(j.a)(i,2),u=o[0],d=o[1],m=function(){var e=Object(h.a)(b.a.mark((function e(s){var c;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s.preventDefault(),e.next=3,x({email:r,password:u});case 3:c=e.sent,t(c);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(l.jsxs)("div",{className:"wrapper app",children:[Object(l.jsx)("div",{className:"header",children:Object(l.jsx)("footer",{children:Object(l.jsxs)("div",{className:"app-header",children:[Object(l.jsx)("img",{src:p,alt:"Ask Your Team Logo",className:"logo header-logo"}),Object(l.jsx)("p",{className:"horizontal-rule",children:" | "}),Object(l.jsx)("p",{className:"running-text",children:"Quiz"})]})})}),Object(l.jsxs)("div",{className:"login-wrapper",children:[Object(l.jsx)("h1",{children:"Admin Login"}),Object(l.jsx)("p",{children:"To get an account please contact your company's office or IT department."}),Object(l.jsxs)("form",{onSubmit:m,children:[Object(l.jsxs)("label",{children:[Object(l.jsx)("p",{children:"Email Address"}),Object(l.jsx)("input",{type:"email",onChange:function(e){return a(e.target.value)},required:!0})]}),Object(l.jsxs)("label",{children:[Object(l.jsx)("p",{children:"Password"}),Object(l.jsx)("input",{type:"password",onChange:function(e){return d(e.target.value)},required:!0})]}),Object(l.jsx)("div",{children:Object(l.jsx)("button",{type:"submit",id:"create-quiz-btn",children:"Submit"})})]})]}),Object(l.jsx)("div",{className:"footer",children:Object(l.jsx)("footer",{children:Object(l.jsx)("div",{className:"app-footer",children:Object(l.jsx)("img",{src:O,alt:"Ask Your Team Logo",className:"logo"})})})})]})}function g(){return Object(l.jsxs)("div",{className:"App",children:[Object(l.jsxs)("ul",{className:"breadcrumbs",children:[Object(l.jsx)("li",{children:Object(l.jsx)("a",{href:"/dashboard",children:"Dashboard"})}),Object(l.jsx)("li",{children:Object(l.jsx)("a",{href:"/report",children:"Report"})})]}),Object(l.jsx)("h2",{children:"Results Report"})]})}var v=function(){return Object(l.jsx)("div",{className:"header",children:Object(l.jsx)("footer",{children:Object(l.jsxs)("div",{className:"app-header",children:[Object(l.jsx)("img",{src:p,alt:"Ask Your Team Logo",className:"logo header-logo"}),Object(l.jsx)("p",{className:"horizontal-rule",children:" | "}),Object(l.jsx)("p",{className:"running-text",children:"Quiz"})]})})})};var N=function(){return Object(l.jsx)("div",{className:"footer",children:Object(l.jsx)("footer",{children:Object(l.jsx)("div",{className:"app-footer",children:Object(l.jsx)("img",{src:O,alt:"Ask Your Team Logo",className:"logo"})})})})};var y=function(){var e=function(){var e=Object(c.useState)(function(){var e=sessionStorage.getItem("token"),t=JSON.parse(e);return null===t||void 0===t?void 0:t.token}()),t=Object(j.a)(e,2),s=t[0],n=t[1];return{setToken:function(e){sessionStorage.setItem("token",JSON.stringify(e)),n(e.token)},token:s}}(),t=e.token,s=e.setToken;return t?Object(l.jsx)("div",{className:"wrapper app",children:Object(l.jsxs)(i.a,{children:[Object(l.jsx)(v,{}),Object(l.jsxs)(o.d,{children:[Object(l.jsx)(o.a,{exact:!0,from:"/",to:"/dashboard"}),Object(l.jsx)(o.b,{path:"/dashboard",children:Object(l.jsx)(u,{})}),Object(l.jsx)(o.b,{path:"/report",children:Object(l.jsx)(g,{})})]}),Object(l.jsx)(N,{})]})}):Object(l.jsx)(f,{setToken:s})},S=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,34)).then((function(t){var s=t.getCLS,c=t.getFID,n=t.getFCP,r=t.getLCP,a=t.getTTFB;s(e),c(e),n(e),r(e),a(e)}))};a.a.render(Object(l.jsx)(n.a.StrictMode,{children:Object(l.jsx)(y,{})}),document.getElementById("root")),S()}},[[33,1,2]]]);
//# sourceMappingURL=main.9f8e7bb9.chunk.js.map