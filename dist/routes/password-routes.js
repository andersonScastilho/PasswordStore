"use strict";var N=Object.create;var d=Object.defineProperty;var O=Object.getOwnPropertyDescriptor;var A=Object.getOwnPropertyNames;var B=Object.getPrototypeOf,_=Object.prototype.hasOwnProperty;var j=(t,r)=>{for(var o in r)d(t,o,{get:r[o],enumerable:!0})},R=(t,r,o,e)=>{if(r&&typeof r=="object"||typeof r=="function")for(let s of A(r))!_.call(t,s)&&s!==o&&d(t,s,{get:()=>r[s],enumerable:!(e=O(r,s))||e.enumerable});return t};var f=(t,r,o)=>(o=t!=null?N(B(t)):{},R(r||!t||!t.__esModule?d(o,"default",{value:t,enumerable:!0}):o,t)),K=t=>R(d({},"__esModule",{value:!0}),t);var z={};j(z,{passwordRoutes:()=>k});module.exports=K(z);var T=require("express");var P=require("@prisma/client"),g=new P.PrismaClient;var m=class{async show(r,o){return await g.storage.findFirst({where:{AND:{id:r,userId:o}}})}};var l=f(require("crypto")),L="aes-256-gcm",V=Buffer.from(process.env.SECRET_CRYPTO??"","hex"),G=l.default.randomBytes(16);var U=t=>{try{let r=l.default.createDecipheriv(L,V,Buffer.from(t.iv,"hex"));r.setAuthTag(Buffer.from(t.tag,"hex"));let o=Buffer.from(t.content,"hex");return Buffer.concat([r.update(o),r.final()]).toString("utf8")}catch{throw new Error("Erro ao descriptografar os dados.")}};var u=class{get storageId(){return this.props.storageId}get password(){return this.props.password}get account(){return this.props.account}get usageLocation(){return this.props.usageLocation}get link(){return this.props.link}get description(){return this.props.description}get userId(){return this.props.userId}constructor(r){this.props=r}showPassword(r){let[o,e,s]=r.split(":");return U({iv:o,content:e,tag:s})}};var E=f(require("bcrypt")),w=class{constructor(r,o){this.showStorageRepository=r;this.showUserPerUserIdRepository=o}async execute(r,o,e){let s=await this.showStorageRepository.show(r,o);if(!s)throw Error("Storage not found");let n=new u({account:s.account,password:s.password,storageId:s.id,usageLocation:s.usageLocation,userId:s.userId,description:s.description??"",link:s.link??""}),i=await this.showUserPerUserIdRepository.show(o);if(!i)throw Error("User not found");if(!await E.default.compare(e,i.password_hash))throw Error("Invalid password");return n.showPassword(n.password)}};var a=class{async show(r){return await g.user.findUnique({where:{id:r}})}};var p=require("zod"),F=p.z.object({password:p.z.string()}),b=p.z.object({storageId:p.z.string(),userId:p.z.string()}),h=class{async handle(r,o,e){try{let{password:s}=F.parse(r.body),{storageId:n,userId:i}=b.parse(r.params);if(!s)return o.status(400).json({error:"Missing data"});let I=new m,S=new a,C=await new w(I,S).execute(n,i,s);return o.status(200).json({descryptedPassword:C})}catch(s){e(s)}}};var c=f(require("jsonwebtoken")),y=class{constructor(r){this.showUserPerUserIdRepository=r}async validAuth(r){let[,o]=r.split(" ");if(!c.default.verify(o,process.env.TOKEN_SECRET??""))throw Error("Invalid token");let{id:s,email:n}=c.default.verify(o,process.env.TOKEN_SECRET??""),i=await this.showUserPerUserIdRepository?.show(s);if(n!==i?.email)throw Error("Invalid token");return s}async authentication(r,o){if(!await r.comparePasswords(o))throw Error("Invalid password");return c.default.sign({id:r.userId,email:r.userEmail},process.env.TOKEN_SECRET??"",{expiresIn:process.env.TOKEN_EXPIRATION})}async authenticationProvider(r,o){return c.default.sign({id:r,email:o},process.env.TOKEN_SECRET??"",{expiresIn:process.env.TOKEN_EXPIRATION})}},v=y;var x=async(t,r,o)=>{let{authorization:e}=t.headers;try{let s=new a;if(!e)return r.status(401).json({errors:["Login required"]});let i=await new v(s).validAuth(e);return t.params={...t.params,userId:i},o()}catch{return r.status(401).json({error:"Token expired or invalid"})}};var k=(0,T.Router)(),q=new h;k.post("/passwords/storages/:storageId",x,q.handle);0&&(module.exports={passwordRoutes});