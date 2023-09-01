"use strict";var e=Object.defineProperty;var f=Object.getOwnPropertyDescriptor;var m=Object.getOwnPropertyNames;var c=Object.prototype.hasOwnProperty;var d=(r,s)=>{for(var t in s)e(r,t,{get:s[t],enumerable:!0})},l=(r,s,t,n)=>{if(s&&typeof s=="object"||typeof s=="function")for(let o of m(s))!c.call(r,o)&&o!==t&&e(r,o,{get:()=>s[o],enumerable:!(n=f(s,o))||n.enumerable});return r};var j=r=>l(e({},"__esModule",{value:!0}),r);var g={};d(g,{errorHandler:()=>E});module.exports=j(g);var a=require("@prisma/client"),i=require("zod"),u=require("zod-validation-error"),E=async(r,s,t,n)=>{if(r instanceof a.Prisma.PrismaClientInitializationError)return t.status(500).json({error:"Failed to connect to the database"});if(r instanceof a.Prisma.PrismaClientKnownRequestError)return r.code==="P2025"?t.status(400).json({error:"The record no exists"}):r.code==="P2002"?t.status(400).json({error:"Record already exists"}):t.status(400).json({error:r.message});if(r instanceof i.ZodError){let{message:o}=(0,u.fromZodError)(r);return t.status(400).json({error:o})}if(r instanceof Error)return r.message==="invalid token"?t.status(401).json({error:r.message}):t.status(400).json({error:r.message});if(r)return t.status(400).json({error:"An error occurred"});n()};0&&(module.exports={errorHandler});
