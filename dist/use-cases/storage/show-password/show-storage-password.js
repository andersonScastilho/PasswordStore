"use strict";var f=Object.create;var n=Object.defineProperty;var y=Object.getOwnPropertyDescriptor;var m=Object.getOwnPropertyNames;var S=Object.getPrototypeOf,I=Object.prototype.hasOwnProperty;var l=(t,r)=>{for(var o in r)n(t,o,{get:r[o],enumerable:!0})},d=(t,r,o,e)=>{if(r&&typeof r=="object"||typeof r=="function")for(let s of m(r))!I.call(t,s)&&s!==o&&n(t,s,{get:()=>r[s],enumerable:!(e=y(r,s))||e.enumerable});return t};var h=(t,r,o)=>(o=t!=null?f(S(t)):{},d(r||!t||!t.__esModule?n(o,"default",{value:t,enumerable:!0}):o,t)),v=t=>d(n({},"__esModule",{value:!0}),t);var R={};l(R,{ShowStoragePassword:()=>p});module.exports=v(R);var c=h(require("crypto")),x="aes-256-gcm",P=Buffer.from(process.env.SECRET_CRYPTO??"","hex"),k=c.default.randomBytes(16);var u=t=>{try{let r=c.default.createDecipheriv(x,P,Buffer.from(t.iv,"hex"));r.setAuthTag(Buffer.from(t.tag,"hex"));let o=Buffer.from(t.content,"hex");return Buffer.concat([r.update(o),r.final()]).toString("utf8")}catch{throw new Error("Erro ao descriptografar os dados.")}};var i=class{get storageId(){return this.props.storageId}get password(){return this.props.password}get account(){return this.props.account}get usageLocation(){return this.props.usageLocation}get link(){return this.props.link}get description(){return this.props.description}get userId(){return this.props.userId}constructor(r){this.props=r}showPassword(r){let[o,e,s]=r.split(":");return u({iv:o,content:e,tag:s})}};var w=h(require("bcrypt")),p=class{constructor(r,o){this.showStorageRepository=r;this.showUserPerUserIdRepository=o}async execute(r,o,e){let s=await this.showStorageRepository.show(r,o);if(!s)throw Error("Storage not found");let a=new i({account:s.account,password:s.password,storageId:s.id,usageLocation:s.usageLocation,userId:s.userId,description:s.description??"",link:s.link??""}),g=await this.showUserPerUserIdRepository.show(o);if(!g)throw Error("User not found");if(!await w.default.compare(e,g.password_hash))throw Error("Invalid password");return a.showPassword(a.password)}};0&&(module.exports={ShowStoragePassword});
