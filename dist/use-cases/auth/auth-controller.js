"use strict";var A=Object.create;var d=Object.defineProperty;var C=Object.getOwnPropertyDescriptor;var _=Object.getOwnPropertyNames;var z=Object.getPrototypeOf,D=Object.prototype.hasOwnProperty;var F=(o,e)=>{for(var t in e)d(o,t,{get:e[t],enumerable:!0})},v=(o,e,t,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of _(e))!D.call(o,s)&&s!==t&&d(o,s,{get:()=>e[s],enumerable:!(r=C(e,s))||r.enumerable});return o};var p=(o,e,t)=>(t=o!=null?A(z(o)):{},v(e||!o||!o.__esModule?d(t,"default",{value:o,enumerable:!0}):t,o)),L=o=>v(d({},"__esModule",{value:!0}),o);var M={};F(M,{AuthController:()=>R});module.exports=L(M);var T=p(require("bcrypt"));var l=p(require("jsonwebtoken")),E=class{constructor(e){this.showUserPerUserIdRepository=e}async validAuth(e){let[,t]=e.split(" ");if(!l.default.verify(t,process.env.TOKEN_SECRET??""))throw Error("Invalid token");let{id:s,email:i}=l.default.verify(t,process.env.TOKEN_SECRET??""),a=await this.showUserPerUserIdRepository?.show(s);if(!a)throw Error("User not found");if(i!==a.email)throw Error("Invalid token");return s}async authentication(e,t){if(!await e.comparePasswords(t))throw Error("Invalid password");return l.default.sign({id:e.userId,email:e.userEmail},process.env.TOKEN_SECRET??"",{expiresIn:process.env.TOKEN_EXPIRATION})}async authenticationProvider(e,t){return l.default.sign({id:e,email:t},process.env.TOKEN_SECRET??"",{expiresIn:process.env.TOKEN_EXPIRATION})}},m=E;var I=p(require("nodemailer")),x=class{constructor(e,t,r){this._recipient=e;this._subject=t;this._text=r;this.sender="leosilvacast@gmail.com"}sendEmail(){let e=I.default.createTransport({service:"gmail",auth:{type:"OAuth2",user:process.env.MAIL_USERNAME,clientId:process.env.OAUTH_CLIENTID,clientSecret:process.env.OAUTH_CLIENT_SECRET,refreshToken:process.env.OAUTH_REFRESH_TOKEN}}),t={from:this.sender,to:this._recipient,subject:this._subject,html:this._text};e.sendMail(t,function(r,s){console.log(r?"Error "+r:"Email sent successfully")})}},P=x;var c=class{get userEmail(){return this.props.userEmail}get userFullName(){return this.props.userFullName}get userPassword(){return this.props.userPassword}get userId(){return this.props.userId}set hashPasswordToUserPassword(e){this.props.userPassword=e}set updateUserFullName(e){this.props.userFullName=e}set updateUserEmail(e){this.props.userEmail=e}constructor(e){this.props=e}async encryptedPassword(e){return await T.default.hash(e,10)}async comparePasswords(e){return await T.default.compare(e,this.userPassword)}async updatePassword(e,t,r){if(!await this.comparePasswords(e))throw Error("Invalid password");if(t!==r)throw Error("Password confirmation must be the same as password");let i=await this.encryptedPassword(t);this.props.userPassword=i}async sendEmailToVerify(){let t=await new m().authenticationProvider(this.props.userId,this.props.userEmail),r="Verifica\xE7\xE3o de Email",s=`<!doctype html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Simple Transactional Email</title>
        <style>
          /* -------------------------------------
              GLOBAL RESETS
          --------------------------------- ---- */
          
          /*All the styling goes here*/
          
          img {
            border: none;
            -ms-interpolation-mode: bicubic;
            max-width: 100%; 
          }
    
          body {
            background-color: #f6f6f6;
            font-family: sans-serif;
            -webkit-font-smoothing: antialiased;
            font-size: 14px;
            line-height: 1.4;
            margin: 0;
            padding: 0;
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%; 
          }
    
          table {
            border-collapse: separate;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            width: 100%; }
            table td {
              font-family: sans-serif;
              font-size: 14px;
              vertical-align: top; 
          }
    
          /* -------------------------------------
              BODY & CONTAINER
          ------------------------------------- */
    
          .body {
            background-color: #f6f6f6;
            width: 100%; 
          }
    
          /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
          .container {
            display: block;
            margin: 0 auto !important;
            /* makes it centered */
            max-width: 580px;
            padding: 10px;
            width: 580px; 
          }
    
          /* This should also be a block element, so that it will fill 100% of the .container */
          .content {
            box-sizing: border-box;
            display: block;
            margin: 0 auto;
            max-width: 580px;
            padding: 10px; 
          }
    
          /* -------------------------------------
              HEADER, FOOTER, MAIN
          ------------------------------------- */
          .main {
            background: #ffffff;
            border-radius: 3px;
            width: 100%; 
          }
    
          .wrapper {
            box-sizing: border-box;
            padding: 20px; 
          }
    
          .content-block {
            padding-bottom: 10px;
            padding-top: 10px;
          }
    
          .footer {
            clear: both;
            margin-top: 10px;
            text-align: center;
            width: 100%; 
          }
            .footer td,
            .footer p,
            .footer span,
            .footer a {
              color: #999999;
              font-size: 12px;
              text-align: center; 
          }
    
          /* -------------------------------------
              TYPOGRAPHY
          ------------------------------------- */
          h1,
          h2,
          h3,
          h4 {
            color: #000000;
            font-family: sans-serif;
            font-weight: 400;
            line-height: 1.4;
            margin: 0;
            margin-bottom: 30px; 
          }
    
          h1 {
            font-size: 35px;
            font-weight: 300;
            text-align: center;
            text-transform: capitalize; 
          }
    
          p,
          ul,
          ol {
            font-family: sans-serif;
            font-size: 14px;
            font-weight: normal;
            margin: 0;
            margin-bottom: 15px; 
          }
            p li,
            ul li,
            ol li {
              list-style-position: inside;
              margin-left: 5px; 
          }
    
          a {
            color: #3498db;
            text-decoration: underline; 
          }
    
          /* -------------------------------------
              BUTTONS
          ------------------------------------- */
          .btn {
            box-sizing: border-box;
            width: 100%; }
            .btn > tbody > tr > td {
              padding-bottom: 15px; }
            .btn table {
              width: auto; 
          }
            .btn table td {
              background-color: #ffffff;
              border-radius: 5px;
              text-align: center; 
          }
            .btn a {
              background-color: #ffffff;
              border: solid 1px #3498db;
              border-radius: 5px;
              box-sizing: border-box;
              color: #3498db;
              cursor: pointer;
              display: inline-block;
              font-size: 14px;
              font-weight: bold;
              margin: 0;
              padding: 12px 25px;
              text-decoration: none;
              text-transform: capitalize; 
          }
    
          .btn-primary table td {
            background-color: #3498db; 
          }
    
          .btn-primary a {
            background-color: #3498db;
            border-color: #3498db;
            color: #ffffff; 
          }
    
          /* -------------------------------------
              OTHER STYLES THAT MIGHT BE USEFUL
          ------------------------------------- */
          .last {
            margin-bottom: 0; 
          }
    
          .first {
            margin-top: 0; 
          }
    
          .align-center {
            text-align: center; 
          }
    
          .align-right {
            text-align: right; 
          }
    
          .align-left {
            text-align: left; 
          }
    
          .clear {
            clear: both; 
          }
    
          .mt0 {
            margin-top: 0; 
          }
    
          .mb0 {
            margin-bottom: 0; 
          }
    
          .preheader {
            color: transparent;
            display: none;
            height: 0;
            max-height: 0;
            max-width: 0;
            opacity: 0;
            overflow: hidden;
            mso-hide: all;
            visibility: hidden;
            width: 0; 
          }
    
          .powered-by a {
            text-decoration: none; 
          }
    
          hr {
            border: 0;
            border-bottom: 1px solid #f6f6f6;
            margin: 20px 0; 
          }
    
          /* -------------------------------------
              RESPONSIVE AND MOBILE FRIENDLY STYLES
          ------------------------------------- */
          @media only screen and (max-width: 620px) {
            table.body h1 {
              font-size: 28px !important;
              margin-bottom: 10px !important; 
            }
            table.body p,
            table.body ul,
            table.body ol,
            table.body td,
            table.body span,
            table.body a {
              font-size: 16px !important; 
            }
            table.body .wrapper,
            table.body .article {
              padding: 10px !important; 
            }
            table.body .content {
              padding: 0 !important; 
            }
            table.body .container {
              padding: 0 !important;
              width: 100% !important; 
            }
            table.body .main {
              border-left-width: 0 !important;
              border-radius: 0 !important;
              border-right-width: 0 !important; 
            }
            table.body .btn table {
              width: 100% !important; 
            }
            table.body .btn a {
              width: 100% !important; 
            }
            table.body .img-responsive {
              height: auto !important;
              max-width: 100% !important;
              width: auto !important; 
            }
          }
    
          /* -------------------------------------
              PRESERVE THESE STYLES IN THE HEAD
          ------------------------------------- */
          @media all {
            .ExternalClass {
              width: 100%; 
            }
            .ExternalClass,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass font,
            .ExternalClass td,
            .ExternalClass div {
              line-height: 100%; 
            }
            .apple-link a {
              color: inherit !important;
              font-family: inherit !important;
              font-size: inherit !important;
              font-weight: inherit !important;
              line-height: inherit !important;
              text-decoration: none !important; 
            }
            #MessageViewBody a {
              color: inherit;
              text-decoration: none;
              font-size: inherit;
              font-family: inherit;
              font-weight: inherit;
              line-height: inherit;
            }
            .btn-primary table td:hover {
              background-color: #34495e !important; 
            }
            .btn-primary a:hover {
              background-color: #34495e !important;
              border-color: #34495e !important; 
            } 
          }
    
        </style>
      </head>
      <body>
        <span class="preheader">This is preheader text. Some clients will show this text as a preview.</span>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
          <tr>
            <td>&nbsp;</td>
            <td class="container">
              <div class="content">
    
                <!-- START CENTERED WHITE CONTAINER -->
                <table role="presentation" class="main">
    
                  <!-- START MAIN CONTENT AREA -->
                  <tr>
                    <td class="wrapper">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td>
                            <p>Ol\xE1</p>
                            <p>Valide seu email clicando no botao abaixo.</p>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                              <tbody>
                                <tr>
                                  <td align="left">
                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                      <tbody>
                                        <tr>
                                          <td> <a href=${`${process.env.API_URL}/verify-email?token=${t}`} target="_blank">Validar Email</a> </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <p>Este email serve apenas para voc\xEA confirmar que o email que deseja cadastrar em nosso website \xE9 valido.</p>
                            <p>Fa\xE7a um bom uso do nosso website.</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
    
                <!-- END MAIN CONTENT AREA -->
                </table>
                <!-- END CENTERED WHITE CONTAINER -->
    
                <!-- START FOOTER -->
                <div class="footer">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
             
                    <tr>
                      <td class="content-block powered-by">
                        Desenvolvido por <a href="https://www.linkedin.com/in/andersonscastilho/">Anderson Leonardo</a>.
                      </td>
                    </tr>
                  </table>
                </div>
                <!-- END FOOTER -->
    
              </div>
            </td>
            <td>&nbsp;</td>
          </tr>
        </table>
      </body>
    </html>`;new P(this.props.userEmail,r,s).sendEmail()}};var N=p(require("dayjs")),S=require("uuid"),h=class{constructor(e,t,r){this.showUserPerEmailRepository=e;this.createRefreshTokenRepository=t;this.deleteRefreshTokenRepository=r}async execute({email:e,password:t}){let r=await this.showUserPerEmailRepository.show(e);if(!r)throw Error("User not found");if(console.log(r),r.verifiedEmail!==!0)throw Error("Unverified email");let s=new c({userEmail:r.email,userFullName:r.fullName,userId:r.id,userPassword:r.password_hash}),i=new m;await this.deleteRefreshTokenRepository.delete(r.id);let a=await i.authentication(s,t),g=(0,S.v4)(),y=(0,N.default)().add(7,"days").unix(),k=await this.createRefreshTokenRepository.create({expiresIn:y,id:g,userId:s.userId});return{token:a,refreshToken:k}}};var U=require("@prisma/client"),n=new U.PrismaClient;var f=class{async show(e){return await n.user.findUnique({where:{email:e}})}};var b=class{async create({expiresIn:e,id:t,userId:r}){return await n.refresh_Token.create({data:{expiresIn:e,id:t,userId:r}})}};var u=class{async delete(e){await n.refresh_Token.deleteMany({where:{userId:e}})}};var w=require("zod"),H=w.z.object({email:w.z.string().email(),password:w.z.string()}),R=class{async handle(e,t,r){try{let{email:s,password:i}=H.parse(e.body);if(!s||!i)return t.status(400).json({error:"Missing data"});let a=new f,g=new b,y=new u,O=await new h(a,g,y).execute({email:s,password:i});return t.status(200).json(O)}catch(s){r(s)}}};0&&(module.exports={AuthController});
