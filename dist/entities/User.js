"use strict";var n=Object.create;var o=Object.defineProperty;var w=Object.getOwnPropertyDescriptor;var h=Object.getOwnPropertyNames;var c=Object.getPrototypeOf,P=Object.prototype.hasOwnProperty;var l=(r,s)=>{for(var t in s)o(r,t,{get:s[t],enumerable:!0})},d=(r,s,t,e)=>{if(s&&typeof s=="object"||typeof s=="function")for(let a of h(s))!P.call(r,a)&&a!==t&&o(r,a,{get:()=>s[a],enumerable:!(e=w(s,a))||e.enumerable});return r};var m=(r,s,t)=>(t=r!=null?n(c(r)):{},d(s||!r||!r.__esModule?o(t,"default",{value:r,enumerable:!0}):t,r)),g=r=>d(o({},"__esModule",{value:!0}),r);var y={};l(y,{User:()=>p});module.exports=g(y);var i=m(require("bcrypt")),p=class{get userEmail(){return this.props.userEmail}get userFullName(){return this.props.userFullName}get userPassword(){return this.props.userPassword}get userId(){return this.props.userId}set hashPasswordToUserPassword(s){this.props.userPassword=s}set updateUserFullName(s){this.props.userFullName=s}set updateUserEmail(s){this.props.userEmail=s}constructor(s){this.props=s}async encryptedPassword(s){return await i.default.hash(s,10)}async comparePasswords(s){return await i.default.compare(s,this.userPassword)}async updatePassword(s,t,e){if(!await this.comparePasswords(s))throw Error("Invalid password");if(t!==e)throw Error("Password confirmation must be the same as password");let u=await this.encryptedPassword(t);this.props.userPassword=u}};0&&(module.exports={User});