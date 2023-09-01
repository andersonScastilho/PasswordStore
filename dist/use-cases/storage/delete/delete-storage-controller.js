"use strict";var g=Object.defineProperty;var y=Object.getOwnPropertyDescriptor;var d=Object.getOwnPropertyNames;var R=Object.prototype.hasOwnProperty;var u=(t,e)=>{for(var o in e)g(t,o,{get:e[o],enumerable:!0})},f=(t,e,o,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of d(e))!R.call(t,r)&&r!==o&&g(t,r,{get:()=>e[r],enumerable:!(s=y(e,r))||s.enumerable});return t};var x=t=>f(g({},"__esModule",{value:!0}),t);var I={};u(I,{DeleteStorageController:()=>c});module.exports=x(I);var S=require("@prisma/client"),i=new S.PrismaClient;var a=class{async delete(e){await i.storage.delete({where:{id:e}})}};var n=class{async show(e,o){return await i.storage.findFirst({where:{AND:{id:e,userId:o}}})}};var p=class{constructor(e,o){this.deleteStorageRepository=e;this.showStorageRepository=o}async execute(e,o){if(!await this.showStorageRepository.show(e,o))throw Error("Storage not found");await this.deleteStorageRepository.delete(e)}};var m=require("zod"),D=m.z.object({userId:m.z.string(),storageId:m.z.string()}),c=class{async handle(e,o,s){try{let{userId:r,storageId:l}=D.parse(e.params),w=new a,h=new n;return await new p(w,h).execute(l,r),o.status(200).json({})}catch(r){s(r)}}};0&&(module.exports={DeleteStorageController});