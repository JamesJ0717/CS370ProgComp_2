webpackJsonp([1],{"+h9Z":function(t,e){},"1kma":function(t,e){},"4Uwr":function(t,e,o){t.exports=o.p+"static/img/logo.894dda8.jpg"},IxM0:function(t,e){},NHnr:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=o("7+uW"),n={data:function(){return{option:"Login"}},mounted:function(){null!=localStorage.getItem("user")?this.option="Logout":this.option="Login"}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"Header"}},[a("nav",[a("ul",[a("li",[a("router-link",{attrs:{to:"/",exact:""}},[t._v("Home")])],1),t._v(" "),a("li",[a("router-link",{attrs:{to:"/dashboard",exact:""}},[t._v("Dashboard")])],1),t._v(" "),a("li",[a("router-link",{attrs:{to:"/about",exact:""}},[t._v("About Us")])],1),t._v(" "),"Login"===t.option?a("li",[a("router-link",{attrs:{to:"/login",exact:""}},[t._v("Login")])],1):a("li",[a("router-link",{attrs:{to:"/logout"}},[t._v("Logout")])],1)]),t._v(" "),a("img",{attrs:{id:"logo",src:o("4Uwr"),height:"64px",width:"64px"}})])])},staticRenderFns:[]};var r={name:"App",components:{Header:o("VU/8")(n,s,!1,function(t){o("IxM0")},"data-v-8615f42e",null).exports}},i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("Header",{attrs:{id:"header"}}),this._v(" "),e("router-view")],1)},staticRenderFns:[]};var l=o("VU/8")(r,i,!1,function(t){o("vCb4")},null,null).exports,u=o("/ocq"),d={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"aboutus"}},[o("tbody",[o("tr",[o("th",[o("br"),t._v(" "),o("div",{staticStyle:{height:"32px"}},[o("h3",[t._v("What is OPC?")])]),t._v(" "),o("div"),t._v(" "),o("div",[t._v("OPC, Online Programming Competition is an online programming\n\t          competition where users can create and participate in programming\n\t          competitions.")]),t._v(" "),o("div"),t._v(" "),o("div",[o("h4",[t._v("How does OPC work?")])]),t._v(" "),o("div"),t._v(" "),o("div",[t._v("Competition hosts will have the ability to host competitions,\n\t          and share them with competitors. Competitors then join, and submit\n\t          their code. Competitions hosts will have full control over the\n\t          rules of each individual competition, and be responsible for\n\t          providing the evaluation code to test each competitors code.")]),t._v(" "),o("div"),t._v(" "),o("div",[o("h4",[t._v("So what does OPC really do?")])]),t._v(" "),o("div"),t._v(" "),o("div",[t._v("OPC is the framework for online code evaluation and scoring.\n\t          Instead of receiving code from numerous competitors, running each\n\t          code for output, and then running it for an evaluation score\n\t          manually, OPC takes care of this in one fluid motion.")]),t._v(" "),o("div"),t._v(" "),o("div",[o("h4",[t._v("What's behind the scenes that allows OPC to do this?")])]),t._v(" "),o("div"),t._v(" "),o("div",[t._v("OPC is a full package system. It offers a friendly user\n\t          interface, easily accessible via your favorite web browser. Not\n\t          only user friendly, OPC is backboned by the safest and most secure\n\t          platforms that allow secure code computations and ensured\n\t          integrity. All of this comes in a lightweight, easy to install\n\t          package.")]),t._v(" "),o("div"),t._v(" "),o("div",[o("h4",[t._v(" The team from OPC ensures that your experience with our\n\t            online code competition solution is safe, user-friendly and of\n\t            course, fun!")])]),t._v(" "),o("div"),t._v(" "),o("div",[t._v("Best Regards,")]),t._v(" "),o("div"),t._v(" "),o("div",[o("address"),t._v(" "),o("div",[o("h2",[t._v("James Johnson, John Sorrentino, Aaron Gregory, Jesse Chain")])])]),t._v(" "),o("div")])])])])}]};var c=o("VU/8")({},d,!1,function(t){o("ptkh")},"data-v-aafdc446",null).exports,p={data:function(){return{comps:[],userName:JSON.parse(localStorage.getItem("user")).name}},mounted:function(){var t=this;this.$http.get("http://localhost:9999/scores/").then(function(e){if("empty"===e.data.reason)return t.comps.length=0;console.log(e);for(var o=new Array(e.data.number),a=0;a<e.data.number;a++)console.log(e.data.data[a]),o[a]=e.data.data[a];t.comps=o})}},m={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"leaderboard"}},[0!=t.comps.length?o("div",{attrs:{id:"scoreboard"}},[o("table",{attrs:{id:"scores"}},[t._m(0),t._v(" "),t._m(1),t._v(" "),t._l(t.comps,function(e,a){return e.userName===t.userName?o("tr",{key:a},[o("td",[t._v(t._s(e.compName))]),t._v(" "),o("td",[t._v(t._s(e.score))])]):t._e()})],2)]):o("div",[t._m(2)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("tr",[e("h2",[this._v("Your Recent Submissions:")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("tr",[e("th",[this._v("Competition Name")]),this._v(" "),e("th",[this._v("Your Score")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h1",[e("strong",[this._v("JOIN A COMPETITION!")])])}]};var v={name:"Dashboard",components:{Leaderboard:o("VU/8")(p,m,!1,function(t){o("ZvKt")},"data-v-49980b39",null).exports},data:function(){return{name:"",is_host:0}},methods:{getName:function(){return JSON.parse(localStorage.getItem("user")).name},getStatus:function(){return JSON.parse(localStorage.getItem("user")).is_host},goToComp:function(){this.$router.push("/competition")},createComp:function(){this.$router.push("/createComp")},updateComp:function(){this.$router.push("/updateComps")}},watch:{}},h={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"dash"}},[o("h2",[t._v("Hello, "+t._s(t.getName()))]),t._v(" "),0==t.getStatus()?o("div",{attrs:{id:"user"}},[o("button",{attrs:{id:"viewComps",type:"button"},on:{click:function(e){t.goToComp()}}},[t._v("View Competitions")]),t._v(" "),o("Leaderboard")],1):1==t.getStatus()?o("div",{attrs:{id:"host"}},[o("button",{attrs:{id:"create",type:"button"},on:{click:function(e){t.createComp()}}},[t._v("Create New Competition")]),t._v(" "),o("button",{attrs:{id:"update",type:"button"},on:{click:function(e){t.updateComp()}}},[t._v("Update Competitions")])]):t._e()])},staticRenderFns:[]};var _=o("VU/8")(v,h,!1,function(t){o("SY/A")},"data-v-d1cb47be",null).exports,f=o("mvHQ"),g=o.n(f),w={name:"Login",data:function(){return{email:"",password:""}},methods:{postLogin:function(){var t=this;this.$http.post("http://localhost:9999/login",{email:this.email,password:this.password}).then(function(e){"server"===e.data.response?t.$swal({type:"error",text:"There was a problem with the server"}):"email"===e.data.response?(console.log("Invalid email"),t.$swal({text:"Invalid email",type:"error"})):"password"===e.data.response?(console.log("Invalid password"),t.$swal({text:"Invalid password",type:"error"})):"good"===e.data.response&&t.$swal({text:"Logged in successfully!",type:"success",position:"top-end"}),localStorage.setItem("user",g()(e.data.user)),localStorage.setItem("jwt",e.data.token),null!=localStorage.getItem("jwt")&&(t.$emit("loggedIn"),null!=t.$route.params.nextUrl?t.$router.push(t.$route.params.nextUrl):t.$router.push("/dashboard"))})}}},b={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"login"},[o("label",{attrs:{for:"email"}},[t._v("Email:")]),t._v(" "),o("div",[o("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],attrs:{id:"email",required:"",type:"text"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}}),t._v(" "),o("br")]),t._v(" "),o("div",[o("label",[t._v("Password:")]),t._v(" "),o("div",[o("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{id:"password",required:"",type:"password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})])]),t._v(" "),o("button",{attrs:{type:"submit"},on:{click:function(e){t.postLogin()}}},[t._v("Login")]),t._v(" "),o("br"),t._v(" "),o("br"),t._v(" "),o("p",[t._v("Don't have an account?")]),t._v(" "),o("a",{attrs:{href:"/register"}},[t._v("Create one now")])])},staticRenderFns:[]};var y=o("VU/8")(w,b,!1,function(t){o("Ozrg")},"data-v-67e86cb2",null).exports,x={props:["nextUrl"],data:function(){return{name:"",email:"",password:"",password_confirmation:"",is_host:"0"}},methods:{handleSubmit:function(t){var e=this;if(t.preventDefault(),!(this.password===this.password_confirmation&&this.password.length>0))return this.password="",this.passwordConfirm="",this.$swal({text:"Passwords do not match",type:"error"});var o="http://localhost:9999/register";null!=this.is_host&&1==this.is_host&&(o="http://localhost:9999/register/admin"),this.$http.post(o,{name:this.name,email:this.email,password:this.password,is_host:this.is_host}).then(function(t){"email"==t.data.cause&&e.$swal({text:"An account with that email already exists!",type:"error"}),localStorage.setItem("user",g()(t.data.user)),localStorage.setItem("jwt",t.data.token),null!=localStorage.getItem("jwt")&&(e.$emit("loggedIn"),null!=e.$route.params.nextUrl?e.$router.push(e.$route.params.nextUrl):e.$router.push("/dashboard"))}).catch(function(t){t&&console.log(t)})}}},C={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"register"}},[o("div",{attrs:{id:"create"}},[o("h4",[t._v("Register")]),t._v(" "),o("form",[o("label",{attrs:{for:"name"}},[t._v("Name")]),t._v(" "),o("div",[o("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],attrs:{id:"name",type:"text",required:"",autofocus:""},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}})]),t._v(" "),o("label",{attrs:{for:"email"}},[t._v("E-Mail Address")]),t._v(" "),o("div",[o("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],attrs:{id:"email",type:"email",required:""},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}})]),t._v(" "),o("label",{attrs:{for:"password"}},[t._v("Password")]),t._v(" "),o("div",[o("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{id:"password",type:"password",required:""},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})]),t._v(" "),o("label",{attrs:{for:"password-confirm"}},[t._v("Confirm Password")]),t._v(" "),o("div",[o("input",{directives:[{name:"model",rawName:"v-model",value:t.password_confirmation,expression:"password_confirmation"}],attrs:{id:"password-confirm",type:"password",required:""},domProps:{value:t.password_confirmation},on:{input:function(e){e.target.composing||(t.password_confirmation=e.target.value)}}})]),t._v(" "),o("label",{attrs:{for:"password-confirm"}},[t._v("Is this a host account?")]),t._v(" "),o("div",[o("select",{directives:[{name:"model",rawName:"v-model",value:t.is_host,expression:"is_host"}],on:{change:function(e){var o=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.is_host=e.target.multiple?o:o[0]}}},[o("option",{attrs:{value:"1"}},[t._v("Yes")]),t._v(" "),o("option",{attrs:{value:"0"}},[t._v("No")])])]),t._v(" "),o("div",[o("button",{attrs:{type:"submit"},on:{click:t.handleSubmit}},[t._v("Register")])])])])])},staticRenderFns:[]};var $=o("VU/8")(x,C,!1,function(t){o("Tp0T")},"data-v-1a728cb3",null).exports,N={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"home"}},[o("h1",{attrs:{id:"welcome"}},[t._v("Welcome to OPC!")]),t._v(" "),o("p",[o("i",[t._v("If you're not taking part in online programming competitions via OPC, then you really ought to.")]),t._v(" - Edsger W. Dijkstra, 1973")]),t._v(" "),o("br"),o("br"),t._v(" "),o("h2",[t._v("\n    For Hosts (how to create a competition):\n  ")]),t._v(" "),o("p",{attrs:{align:"left"}},[o("ol",[o("li",[t._v("Log in (or register) as a host and go to your dashboard.")]),t._v(" "),o("li",[t._v("Click on "),o("i",[t._v("Create New Competition")]),t._v(". You will be prompted to enter the competition's name and a prompt, as well as its start and end dates.")]),t._v(" "),o("li",[t._v("After posting the competition, go to "),o("i",[t._v("Update Competitions")]),t._v(", and select the newly created competition. You will be prompted to upload two files. "),o("br"),t._v("\n    These must be either Python or Java code.\n    "),o("ol",{attrs:{type:"A"}},[o("li",[t._v("The "),o("i",[t._v("Gen")]),t._v(" file is executed before a competitor's code runs.\n      This file should generate a problem description (whatever that may entail in the context of your competition), which it prints to standard output.")]),t._v(" "),o("li",[t._v("The "),o("i",[t._v("Eval")]),t._v(" file should produce a score for the competitor's code's output, and print the score to standard output. "),o("br"),t._v("\n    Three relevant files are provided for score generation: "),o("br"),t._v(" "),o("ol",{attrs:{type:"i"}},[o("li",[t._v("generated/file.txt is the specification created by the Gen file.")]),t._v(" "),o("li",[t._v("output/file.txt is the solution created by the competitor's code.")]),t._v(" "),o("li",[t._v("output/stats.txt is a file containing two numbers: the first is how many cpu-seconds were used by the competitor's code, and the second is how much memory was used while running it.")])])])])])])]),t._v(" "),o("h2",[t._v("\n    For Competitors (how to join and compete):\n  ")]),t._v(" "),o("p",{attrs:{align:"left"}},[o("ol",[o("li",[t._v("Log in (or register) as a non-host and go to your dashboard.")]),t._v(" "),o("li",[t._v("Click on "),o("i",[t._v("View Competitions")]),t._v(". You will be presented with a list of competitions that you can enter.")]),t._v(" "),o("li",[t._v("Select a competition, and upload your submission file (which must be either Python or Java code). Your code should solve the competition problem which is fed in through standard input.")]),t._v(" "),o("li",[t._v("You will recieve the results of your submission as soon as they are available. In the meantime, feel free to browse other competitions.")])])])])}]};var S=o("VU/8")({},N,!1,function(t){o("+h9Z")},"data-v-103bc0cc",null).exports,I={name:"CreateComp",data:function(){return{name:"",question:"",startDate:"2018-09-15",endDate:"2018-09-15"}},methods:{postComp:function(){var t=this;this.$http.post("http://localhost:9999/addComp",{name:this.name,question:this.question,creator:JSON.parse(localStorage.getItem("user")).id,startDate:this.startDate,endDate:this.endDate}).then(function(e){200===e.data.status?(t.$swal({type:"success",text:"Successfully created competition. \nPlease go to your dashboard to upload the Gen and Eval files."}),t.$router.push("/dashboard")):500==e.data.status&&t.$swal({type:"error",text:"A competition with that name already exists!"}),console.log(e)})},handleGenFile:function(t){this.genFile=t},handleEvalFile:function(t){this.evalFile=t}}},k={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"create"}},[o("h3",[t._v("Create your competition here")]),t._v(" "),o("label",[t._v("Competition Name:")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],attrs:{type:"text",id:"name"},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}}),t._v(" "),o("br"),t._v(" "),o("label",[t._v("Competition Question:")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.question,expression:"question"}],attrs:{type:"text",id:"question"},domProps:{value:t.question},on:{input:function(e){e.target.composing||(t.question=e.target.value)}}}),t._v(" "),o("br"),t._v(" "),o("label",[t._v("Start Date:")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.startDate,expression:"startDate"}],attrs:{type:"date",min:"2018-09-05",max:"2099-12-31"},domProps:{value:t.startDate},on:{input:function(e){e.target.composing||(t.startDate=e.target.value)}}}),t._v(" "),o("br"),t._v(" "),o("label",[t._v("End Date:")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.endDate,expression:"endDate"}],attrs:{type:"date",min:"2018-09-05",max:"2099-12-31"},domProps:{value:t.endDate},on:{input:function(e){e.target.composing||(t.endDate=e.target.value)}}}),t._v(" "),o("br"),t._v(" "),o("button",{attrs:{type:"submit"},on:{click:function(e){t.postComp()}}},[t._v("Post Competition")])])},staticRenderFns:[]};var P=o("VU/8")(I,k,!1,function(t){o("1kma")},"data-v-3abfa603",null).exports,E={data:function(){return{name:"",comps:[]}},methods:{results:function(t){switch(t.data.status){case 200:this.$swal({type:"success",text:t.data.message+"\n"+t.data.score});break;case 400:case 401:case 404:case 500:this.$swal({type:"error",text:t.data.message})}},openComp:function(t){var e=this;this.comps&&this.$swal({title:this.comps[t].name,text:this.comps[t].question,input:"file",showCancelButton:!0,footer:"<strong>Starts</strong>: "+this.comps[t].start+"&nbsp; --\x3e &nbsp;<strong>Ends</strong>: "+this.comps[t].end,inputValidator:function(o){if(o){g()(o.name);var a=new FormData;a.append("filetoupload",o),a.append("compName",e.comps[t].name),a.append("compId",e.comps[t].id),a.append("userName",JSON.parse(localStorage.getItem("user")).name),e.$http.post("http://localhost:9999/fileupload",a,{headers:{"Content-type":"multipart/form-data"}}).then(function(t){console.log(t),e.results(t)})}e.$swal({position:"bottom-end",toast:!0,timer:5e3,text:"Running your code..."})}})}},mounted:function(){var t=this;this.$http.get("http://localhost:9999/getCompetitions/").then(function(e){if("empty"===e.data.cause)return t.comps.length=0;console.log(e);for(var o=new Array(e.data.number),a=0;a<e.data.number;a++)o[a]=e.data.data[a];t.comps=o})}},D={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"competition",onload:"getComps()"}},[o("p",[t._v("Here are the competitions.")]),t._v(" "),0!=t.comps.length?o("div",{attrs:{id:"comps"}},t._l(t.comps,function(e,a){return o("div",{key:e.name},[o("button",{attrs:{id:"comp"},on:{click:function(e){t.openComp(a)}}},[t._v(t._s(e.id)+". "+t._s(e.name))]),t._v(" "),o("p")])})):o("div",{attrs:{id:"empty"}},[o("p",[t._v("There are no active competitions.")])])])},staticRenderFns:[]};var O=o("VU/8")(E,D,!1,function(t){o("QFvl")},"data-v-0ff287b6",null).exports,U={data:function(){return{}},mounted:function(){localStorage.clear(),this.$swal({type:"success",text:"Successfully logged out!"}),this.$router.push("/")}},F={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{attrs:{id:"logout"}})},staticRenderFns:[]},q=o("VU/8")(U,F,!1,null,null,null).exports,A={data:function(){return{comps:[],evalName:"",genName:"",userID:JSON.parse(localStorage.getItem("user")).id}},methods:{openComp:function(t){var e=this,o=this.comps;o&&this.$swal.mixin({input:"file",confirmButtonText:"Next &rarr;",showCancelButton:!0,progressSteps:["Gen","Eval"]}).queue([{title:o[t].name+" Gen File",text:"Upload Gen File",input:"file",inputValidator:function(t){t&&(e.genName=t)}},{title:o[t].name+" Eval File",text:"Upload Eval File",input:"file",inputValidator:function(t){t&&(e.evalName=t)}}]).then(function(o){var a=new FormData;a.append("compName",e.comps[t].name),a.append("genfiletoupload",e.genName),a.append("evalfiletoupload",e.evalName),e.$http.post("http://localhost:9999/fileupload/question",a,{headers:{"Content-type":"multipart/form-data"}}).then(function(t){switch(console.log(t),t.data.status){case 200:e.$swal({type:"success",text:t.data.message});break;case 400:case 401:case 404:case 500:e.$swal({type:"error",text:t.data.message})}})})}},mounted:function(){var t=this;JSON.parse(localStorage.getItem("user")).id;this.$http.get("http://localhost:9999/getCompetitions/").then(function(e){if("empty"===e.data.reason)return console.log("empty"),t.comps.length=0;console.log(e.data);for(var o=new Array(e.data.number),a=0;a<e.data.number;a++)o[a]=e.data.data[a];t.comps=o})}},R={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"update"}},[0!=t.comps.length?o("div",[o("h2",[t._v("Here are your competitions.")]),t._v(" "),t._l(t.comps,function(e,a){return o("div",{key:e.name,attrs:{id:"comps"}},[e.creator===t.userID?o("div",[o("button",{attrs:{id:"comp"},on:{click:function(e){t.openComp(a)}}},[t._v(t._s(e.id)+". "+t._s(e.name))])]):t._e()])})],2):o("div",[o("p",[t._v("You have not created any competitions.")])])])},staticRenderFns:[]};var T=o("VU/8")(A,R,!1,function(t){o("Nxp9")},"data-v-bc11b84a",null).exports,L=new u.a({mode:"history",routes:[{path:"/",name:"Home",component:S},{path:"/About",name:"About",component:c},{path:"/login",name:"Login",component:y},{path:"/dashboard",name:"Dashboard",component:_,meta:{requiresAuth:!0}},{path:"/register",name:"Register",component:$,meta:{}},{path:"/createComp",name:"Create Comp",component:P,meta:{requiresAuth:!0,is_host:!0}},{path:"/competition",name:"Competition",component:O,meta:{requiresAuth:!0}},{path:"/logout",name:"Logout",component:q,meta:{requiresAuth:!0}},{path:"/updateComps",name:"Update Comp",component:T,meta:{requiresAuth:!0,is_host:!0}}]});L.beforeEach(function(t,e,o){if(t.matched.some(function(t){return t.meta.requiresAuth}))if(null==localStorage.getItem("jwt"))o({path:"/login",params:{nextUrl:t.fullPath}});else{var a=JSON.parse(localStorage.getItem("user"));t.matched.some(function(t){return t.meta.is_host})?1==a.is_host?o():o({name:"Dashboard"}):o()}else t.matched.some(function(t){return t.meta.guest})?null==localStorage.getItem("jwt")?o():o({name:"Register"}):o()});var V=L,J=o("mtWM"),H=o.n(J),Y=o("oYt9");a.a.config.productionTip=!1,a.a.use(u.a),a.a.prototype.$http=H.a,a.a.use(Y.a),new a.a({el:"#app",router:V,render:function(t){return t(l)}})},Nxp9:function(t,e){},Ozrg:function(t,e){},QFvl:function(t,e){},"SY/A":function(t,e){},Tp0T:function(t,e){},UdIB:function(t,e){},ZvKt:function(t,e){},ptkh:function(t,e){},vCb4:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.7323143679cccdc661fe.js.map