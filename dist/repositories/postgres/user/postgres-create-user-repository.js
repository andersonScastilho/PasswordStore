"use strict";var i=Object.defineProperty;var n=Object.getOwnPropertyDescriptor;var u=Object.getOwnPropertyNames;var f=Object.prototype.hasOwnProperty;var d=(e,r)=>{for(var o in r)i(e,o,{get:r[o],enumerable:!0})},U=(e,r,o,a)=>{if(r&&typeof r=="object"||typeof r=="function")for(let s of u(r))!f.call(e,s)&&s!==o&&i(e,s,{get:()=>r[s],enumerable:!(a=n(r,s))||a.enumerable});return e};var h=e=>U(i({},"__esModule",{value:!0}),e);var w={};d(w,{PostgresCreateUserRepository:()=>m});module.exports=h(w);var p=require("@prisma/client"),l=new p.PrismaClient;var m=class{async create(r){let{userEmail:o,userFullName:a,userPassword:s,userId:c}=r,t=await l.user.create({data:{email:o,fullName:a,id:c,password_hash:s}});if(!t)throw Error("N\xE3o foi possivel criar o usuario");return t}};0&&(module.exports={PostgresCreateUserRepository});
