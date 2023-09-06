"use strict";var U=Object.create;var n=Object.defineProperty;var R=Object.getOwnPropertyDescriptor;var P=Object.getOwnPropertyNames;var k=Object.getPrototypeOf,T=Object.prototype.hasOwnProperty;var S=(o,e)=>{for(var r in e)n(o,r,{get:e[r],enumerable:!0})},u=(o,e,r,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let t of P(e))!T.call(o,t)&&t!==r&&n(o,t,{get:()=>e[t],enumerable:!(s=R(e,t))||s.enumerable});return o};var C=(o,e,r)=>(r=o!=null?U(k(o)):{},u(e||!o||!o.__esModule?n(r,"default",{value:o,enumerable:!0}):r,o)),N=o=>u(n({},"__esModule",{value:!0}),o);var V={};S(V,{verifyEmail:()=>I});module.exports=N(V);var g=require("express");var E=require("zod");var i=C(require("jsonwebtoken")),c=class{constructor(e){this.showUserPerUserIdRepository=e}async validAuth(e){let[,r]=e.split(" ");if(!i.default.verify(r,process.env.TOKEN_SECRET??""))throw Error("Invalid token");let{id:t,email:p}=i.default.verify(r,process.env.TOKEN_SECRET??""),m=await this.showUserPerUserIdRepository?.show(t);if(p!==m?.email)throw Error("Invalid token");return t}async authentication(e,r){if(!await e.comparePasswords(r))throw Error("Invalid password");return i.default.sign({id:e.userId,email:e.userEmail},process.env.TOKEN_SECRET??"",{expiresIn:process.env.TOKEN_EXPIRATION})}async authenticationProvider(e,r){return i.default.sign({id:e,email:r},process.env.TOKEN_SECRET??"",{expiresIn:process.env.TOKEN_EXPIRATION})}},h=c;var l=class{constructor(e){this.showUserPerIdRepository=e}async execute(e){let s=await new h(this.showUserPerIdRepository).validAuth(e);return!!await this.showUserPerIdRepository.show(s)}};var y=require("@prisma/client"),w=new y.PrismaClient;var d=class{async show(e){return await w.user.findUnique({where:{id:e}})}};var v=`<!DOCTYPE html>
<html>
<head>
    <title>Verifica\xE7\xE3o de E-mail Conclu\xEDda</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        h1 {
            background-color: #007BFF;
            color: #fff;
            padding: 20px;
            text-align: center;
        }

        p {
            text-align: center;
            font-size: 18px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <h1>Verifica\xE7\xE3o de E-mail Conclu\xEDda com Sucesso</h1>
    <p>O seu endere\xE7o de e-mail foi validado com sucesso. Agora voc\xEA pode acessar nossos servi\xE7os.</p>
</body>
</html>`,f=`<!DOCTYPE html>
<html>
<head>
    <title>Valida\xE7\xE3o de E-mail</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        h1 {
            background-color: #FF4500;
            color: #fff;
            padding: 20px;
            text-align: center;
        }

        p {
            text-align: center;
            font-size: 18px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <h1>Valida\xE7\xE3o de E-mail Falhou</h1>
    <p>N\xE3o foi poss\xEDvel validar o endere\xE7o de e-mail. Por favor, verifique o endere\xE7o e tente novamente.</p>
</body>
</html>`;var O=E.z.string(),a=class{async handle(e,r,s){try{let t=O.parse(e.query.token);if(!t)return r.status(401).send(`${f}`);let p=new d,m=new l(p),x=`Bearer ${t}`;return await m.execute(x)===!1?r.status(400).send(`${f}`):r.status(200).send(`${v}`)}catch{return r.status(400).send("<h1>N\xE3o foi possivel validar seu e-mail</h1>")}}};var I=(0,g.Router)(),b=new a;I.get("/verify-email",b.handle);0&&(module.exports={verifyEmail});
