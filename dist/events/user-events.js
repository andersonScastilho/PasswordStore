"use strict";var c=Object.create;var i=Object.defineProperty;var l=Object.getOwnPropertyDescriptor;var f=Object.getOwnPropertyNames;var h=Object.getPrototypeOf,v=Object.prototype.hasOwnProperty;var E=(e,r)=>{for(var s in r)i(e,s,{get:r[s],enumerable:!0})},n=(e,r,s,p)=>{if(r&&typeof r=="object"||typeof r=="function")for(let t of f(r))!v.call(e,t)&&t!==s&&i(e,t,{get:()=>r[t],enumerable:!(p=l(r,t))||p.enumerable});return e};var _=(e,r,s)=>(s=e!=null?c(h(e)):{},n(r||!e||!e.__esModule?i(s,"default",{value:e,enumerable:!0}):s,e)),x=e=>n(i({},"__esModule",{value:!0}),e);var g={};E(g,{initializeEventsOn:()=>m,myEmitter:()=>d});module.exports=x(g);var u=_(require("events"));var w=require("@prisma/client"),a=new w.PrismaClient;var o=class extends u.default{},d=new o,m=class{constructor(){this._resetPassword(),this._verifiedEmail()}_verifiedEmail(){d.on("user/verifiedEmail-update",async r=>{await a.user.update({where:{id:r},data:{verifiedEmail:!0}})})}_resetPassword(){d.on("user/reset-password",async(r,s)=>{await a.user.update({where:{id:s},data:{password_hash:r}})})}};0&&(module.exports={initializeEventsOn,myEmitter});