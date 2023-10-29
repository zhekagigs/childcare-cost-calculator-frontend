(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[894],{3207:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/form",function(){return r(1232)}])},1232:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return pages_form}});var s=r(5893),a=r(7294),i=JSON.parse('{"r":"bMSgesvr2c2T4EUYICpuE5lLmewmmVsZ2o7u5e9B"}');let Child=class Child{constructor(e){if(this.name="",this.dateOfBirth=new Date,this.pricePerDay=0,this.daysAttending=[1,1,1,1,1,0,0],this.taxBenefit=!1,this.thirtyHoursFree=!1,!e)return;e.name&&(this.name=e.name),e.dateOfBirth&&(this.dateOfBirth=e.dateOfBirth),e.pricePerDay&&(this.pricePerDay=e.pricePerDay),e.daysAttending&&(this.daysAttending=e.daysAttending),e.taxBenefit&&(this.taxBenefit=e.taxBenefit),e.thirtyHoursFree&&(this.thirtyHoursFree=e.thirtyHours)}};let ChildsCost=class ChildsCost{constructor(e){this.perTerm=0,this.perWeek=0,this.perYear=0,this.name="",this.perTerm=e.perTerm,this.perWeek=e.perWeek,this.perYear=e.perYear,this.sumsEachMonth=e.sumsEachMonth,this.perTerms=e.perTerms,this.baseCostsEachMonth=e.baseCostsEachMonth,this.taxBenefitMonthly=e.taxBenefitMonthly,this.thirtyHoursFree=e.thirtyHoursFree,this.name=e.name}};function convertToCostDataModel(e){return new ChildsCost(e)}function translateStatusToErrorMessage(e){switch(e){case 401:return"Please login again.";case 403:return"You do not have permission to view the project(s).";default:return"There was an error retrieving the project(s). Please try again."}}function parseJSON(e){return e.json()}function checkStatus(e){if(e.ok)return e;{let t={status:e.status,statusText:e.statusText,url:e.url};throw console.log("log server http error: ".concat(JSON.stringify(t))),Error(translateStatusToErrorMessage(t.status))}}let n=i.r,o={async get(e){let t={method:"POST",headers:{"Content-Type":"application/json","x-api-key":n},body:JSON.stringify(e)};try{let e=await fetch("https://hos1gevrm7.execute-api.eu-west-2.amazonaws.com/Prod/hello/ ",t),r=await checkStatus(e),s=await parseJSON(r);return convertToCostDataModel(s)}catch(e){throwError(e)}}};function throwError(e){throw console.log("ERROR: "+e),Error("There was an error retrieving the projects. Please try again.")}var c=r(1110),h=r.n(c),pages_form=function(e){let{setOnSave:t,setSubmitted:r}=e,[i,n]=(0,a.useState)(""),[c,l]=(0,a.useState)(""),[u,d]=(0,a.useState)(""),[p,f]=(0,a.useState)(""),m=(0,s.jsx)("pre",{children:JSON.stringify(p)});return(0,s.jsxs)("div",{className:h().form,children:[(0,s.jsxs)("form",{onSubmit:e=>{e.preventDefault();let s=new Child({name:i,dateOfBirth:c,pricePerDay:u});o.get(s).then(e=>{t(e),r(!0),console.log(e)}).catch(e=>{console.log(e),r(!1),f(e)})},className:"input-group vertical",children:[(0,s.jsx)("label",{children:"Child name:"}),(0,s.jsx)("input",{type:"text",value:i,onChange:e=>n(e.target.value)}),(0,s.jsx)("label",{children:"Price per day:"}),(0,s.jsx)("input",{type:"number",value:u,onChange:e=>d(e.target.value)}),(0,s.jsx)("label",{children:"Date of birth:"}),(0,s.jsx)("input",{type:"date",value:c,onChange:e=>l(e.target.value)}),(0,s.jsx)("label",{children:"Choose days attendance: "}),(0,s.jsxs)("div",{className:"input-group fluid left",children:[(0,s.jsx)("label",{children:"Mon"}),(0,s.jsx)("input",{type:"checkbox",id:"mon",className:"doc"}),(0,s.jsx)("label",{children:"Tue"}),(0,s.jsx)("input",{type:"checkbox",id:"tue",className:"doc"}),(0,s.jsx)("label",{children:"Wed"}),(0,s.jsx)("input",{type:"checkbox",id:"wed",className:"doc"}),(0,s.jsx)("label",{children:"Thu"}),(0,s.jsx)("input",{type:"checkbox",id:"thu",className:"doc"}),(0,s.jsx)("label",{children:"Fri"}),(0,s.jsx)("input",{type:"checkbox",id:"fri",className:"doc"})]}),(0,s.jsxs)("div",{className:"fluid",children:[(0,s.jsx)("label",{children:"Tax Benefit"}),(0,s.jsx)("input",{type:"checkbox",id:"tax-benefit",className:"doc"})]}),(0,s.jsxs)("div",{className:"fluid",children:[(0,s.jsx)("label",{children:"Thirty hours free"}),(0,s.jsx)("input",{type:"checkbox",id:"fri",className:"fatcheckbox"})]}),(0,s.jsx)("input",{className:"input-submit bordered ",type:"submit",value:"Submit"})]}),(0,s.jsx)("div",{children:p?m:null})]})}},1110:function(e){e.exports={centered:"Home_centered___jE2i",form:"Home_form__P1Xey",left:"Home_left__9_xW8"}}},function(e){e.O(0,[774,888,179],function(){return e(e.s=3207)}),_N_E=e.O()}]);