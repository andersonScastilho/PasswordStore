"use strict";var m=Object.defineProperty;var a=Object.getOwnPropertyDescriptor;var l=Object.getOwnPropertyNames;var c=Object.prototype.hasOwnProperty;var u=(e,r)=>{for(var i in r)m(e,i,{get:r[i],enumerable:!0})},f=(e,r,i,t)=>{if(r&&typeof r=="object"||typeof r=="function")for(let s of l(r))!c.call(e,s)&&s!==i&&m(e,s,{get:()=>r[s],enumerable:!(t=a(r,s))||t.enumerable});return e};var h=e=>f(m({},"__esModule",{value:!0}),e);var w={};u(w,{PostgresShowUserPerUserIdRepository:()=>o});module.exports=h(w);var n=require("@prisma/client"),p=new n.PrismaClient;var o=class{async show(r){return await p.user.findUnique({where:{id:r}})}};0&&(module.exports={PostgresShowUserPerUserIdRepository});