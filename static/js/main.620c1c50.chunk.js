(this.webpackJsonplikelihood=this.webpackJsonplikelihood||[]).push([[0],{10:function(e,a,n){"use strict";n.r(a);var t=n(3),h=n(4),c=n(1),i=n(6),s=n(5),l=n(2),r=n.n(l),d=n(9),u=n.n(d),o=(n(15),n(0));var v=function(e){Object(i.a)(n,e);var a=Object(s.a)(n);function n(e){var h;return Object(t.a)(this,n),(h=a.call(this,e)).handleChange=h.handleChange.bind(Object(c.a)(h)),h}return Object(h.a)(n,[{key:"handleChange",value:function(e){this.props.onValueChange(e.target.value)}},{key:"render",value:function(){var e=this.props.value;return Object(o.jsxs)("div",{children:[Object(o.jsx)("input",{type:"radio",value:"Normal",checked:"Normal"===e,name:"adv",onChange:this.handleChange}),"Normal"," ",Object(o.jsx)("input",{type:"radio",value:"Advantage",checked:"Advantage"===e,name:"adv",onChange:this.handleChange}),"Advantage"," ",Object(o.jsx)("input",{type:"radio",value:"Disadvantage",name:"adv",checked:"Disadvantage"===e,onChange:this.handleChange}),"Disadvantage"," "]})}}]),n}(r.a.Component),j=function(e){Object(i.a)(n,e);var a=Object(s.a)(n);function n(e){var h;return Object(t.a)(this,n),(h=a.call(this,e)).handleChange=h.handleChange.bind(Object(c.a)(h)),h}return Object(h.a)(n,[{key:"handleChange",value:function(e){this.props.onValueChange(e.target.value)}},{key:"render",value:function(){var e=this.props.value;return Object(o.jsxs)("div",{children:[Object(o.jsx)("input",{type:"radio",value:"DnD 5e",checked:"DnD 5e"===e,name:"sys",onChange:this.handleChange}),"DnD 5e"," ",Object(o.jsx)("input",{type:"radio",value:"PF 2e",checked:"PF 2e"===e,name:"sys",onChange:this.handleChange}),"PF 2e"," "]})}}]),n}(r.a.Component),b=function(e){Object(i.a)(n,e);var a=Object(s.a)(n);function n(e){var h;return Object(t.a)(this,n),(h=a.call(this,e)).handleChange=h.handleChange.bind(Object(c.a)(h)),h}return Object(h.a)(n,[{key:"handleChange",value:function(e){this.props.onValueChange(e.target.value)}},{key:"render",value:function(){var e=this.props.value;return Object(o.jsxs)("label",{children:[this.props.label,Object(o.jsx)("input",{type:"number",value:e,onChange:this.handleChange})]})}}]),n}(r.a.Component),g=function(e){Object(i.a)(n,e);var a=Object(s.a)(n);function n(e){var h;return Object(t.a)(this,n),(h=a.call(this,e)).state={attack:"0",ac:"10",adv:"Normal",sys:"DnD 5e"},h.handleAcChange=h.handleAcChange.bind(Object(c.a)(h)),h.handleAttackChange=h.handleAttackChange.bind(Object(c.a)(h)),h.handleAdvChange=h.handleAdvChange.bind(Object(c.a)(h)),h.handleSysChange=h.handleSysChange.bind(Object(c.a)(h)),h}return Object(h.a)(n,[{key:"handleAcChange",value:function(e){this.setState({ac:e})}},{key:"handleAttackChange",value:function(e){this.setState({attack:e})}},{key:"handleAdvChange",value:function(e){this.setState({adv:e})}},{key:"handleSysChange",value:function(e){this.setState({sys:e})}},{key:"render",value:function(){var e,a,n=this.state.ac,t=this.state.attack,h=this.state.sys;"DnD 5e"===h?(e=this.state.adv,a=Object(o.jsx)(v,{onValueChange:this.handleAdvChange,value:e})):(e="Normal",a=Object(o.jsx)("div",{children:"\xa0"}));var c=function(e,a,n){var t=Number(0);if(!Number.isNaN(a)&&!Number.isNaN(e)){var h=Number(parseInt(e)+20-parseInt(a));h>0&&(h>19?t=1:(t=h/20,"Advantage"===n?t+=(1-t)*t:"Disadvantage"===n&&(t-=t*(1-t))))}return Math.round(100*t*100)/100}(t,n,e);return Object(o.jsxs)("div",{children:[Object(o.jsx)(j,{onValueChange:this.handleSysChange,value:h}),Object(o.jsx)("div",{children:"\xa0"}),Object(o.jsx)(b,{value:t,onValueChange:this.handleAttackChange,label:"Attack: "}),"\xa0",Object(o.jsx)(b,{value:n,onValueChange:this.handleAcChange,label:"AC:"}),Object(o.jsx)("div",{children:"\xa0"}),a,Object(o.jsxs)("p",{children:["Likelihood Hit: ",c," %"]})]})}}]),n}(r.a.Component);u.a.render(Object(o.jsx)(g,{}),document.getElementById("root"))},15:function(e,a,n){}},[[10,1,2]]]);
//# sourceMappingURL=main.620c1c50.chunk.js.map