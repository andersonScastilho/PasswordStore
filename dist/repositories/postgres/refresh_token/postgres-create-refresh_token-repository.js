"use strict";var i=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var f=Object.getOwnPropertyNames;var h=Object.prototype.hasOwnProperty;var c=(r,e)=>{for(var o in e)i(r,o,{get:e[o],enumerable:!0})},k=(r,e,o,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of f(e))!h.call(r,s)&&s!==o&&i(r,s,{get:()=>e[s],enumerable:!(t=p(e,s))||t.enumerable});return r};var T=r=>k(i({},"__esModule",{value:!0}),r);var R={};c(R,{PostgresCreateRefreshToken:()=>m});module.exports=T(R);var n=require("@prisma/client"),a=new n.PrismaClient;var m=class{async create({expiresIn:e,id:o,userId:t}){return await a.refresh_Token.create({data:{expiresIn:e,id:o,userId:t}})}};0&&(module.exports={PostgresCreateRefreshToken});
