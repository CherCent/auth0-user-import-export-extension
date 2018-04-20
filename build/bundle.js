module.exports=function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var r={};return t.m=e,t.c=r,t.i=function(e){return e},t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=37)}([function(e,t){e.exports=require("auth0-extension-tools@1.3.1")},function(e,t,r){"use strict";e.exports=r(0).config()},function(e,t,r){const n=r(31),o=r(8),i=r(24),s=r(30);e.exports.createServer=n.createServer,e.exports.urlHelpers=o,e.exports.middlewares=i,e.exports.routes=s},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.JwksClient=void 0;var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},s=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),u=r(5),a=n(u),c=r(62),l=n(c),p=r(10),d=(n(p),r(11)),h=n(d),f=r(13),g=n(f),m=r(44),v=r(46);t.JwksClient=function(){function e(t){var r=this;o(this,e),this.getSigningKey=function(e,t){r.logger("Fetching signing key for '"+e+"'"),r.getSigningKeys(function(n,o){if(n)return t(n);var i=o.find(function(t){return t.kid===e});return i?t(null,i):(r.logger("Unable to find a signing key that matches '"+e+"'"),t(new g.default("Unable to find a signing key that matches '"+e+"'")))})},this.options=i({rateLimit:!1,cache:!1,strictSsl:!0},t),this.logger=(0,a.default)("jwks"),this.options.rateLimit&&(this.getSigningKey=(0,v.rateLimitSigningKey)(this,t)),this.options.cache&&(this.getSigningKey=(0,v.cacheSigningKey)(this,t))}return s(e,[{key:"getKeys",value:function(e){var t=this;this.logger("Fetching keys from '"+this.options.jwksUri+"'"),(0,l.default)({json:!0,uri:this.options.jwksUri,strictSSL:this.options.strictSsl},function(r,n){return r||n.statusCode<200||n.statusCode>=300?(t.logger("Failure:",n&&n.body||r),e(n?new h.default(n.body&&(n.body.message||n.body)||n.statusMessage||"Http Error "+n.statusCode):r)):(t.logger("Keys:",n.body.keys),e(null,n.body.keys))})}},{key:"getSigningKeys",value:function(e){var t=this;this.getKeys(function(r,n){if(r)return e(r);if(!n||!n.length)return e(new h.default("The JWKS endpoint did not contain any keys"));var o=n.filter(function(e){return"sig"===e.use&&"RSA"===e.kty&&e.kid&&(e.x5c&&e.x5c.length||e.n&&e.e)}).map(function(e){return e.x5c&&e.x5c.length?{kid:e.kid,nbf:e.nbf,publicKey:(0,m.certToPEM)(e.x5c[0])}:{kid:e.kid,nbf:e.nbf,rsaPublicKey:(0,m.rsaPublicKeyToPEM)(e.n,e.e)}});return o.length?(t.logger("Signing Keys:",o),e(null,o)):e(new h.default("The JWKS endpoint did not contain any signing keys"))})}}]),e}()},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.SigningKeyNotFoundError=t.JwksRateLimitError=t.JwksError=t.ArgumentError=void 0;var o=r(10),i=n(o),s=r(11),u=n(s),a=r(12),c=n(a),l=r(13),p=n(l);t.ArgumentError=i.default,t.JwksError=u.default,t.JwksRateLimitError=c.default,t.SigningKeyNotFoundError=p.default},function(e,t){e.exports=require("debug")},function(e,t){e.exports=require("express")},function(e,t,r){"use strict";var n=r(65);n.emitErrs=!0;var o=new n.Logger({transports:[new n.transports.Console({timestamp:!0,level:"debug",handleExceptions:!0,json:!1,colorize:!0})],exitOnError:!1});e.exports=o,e.exports.stream={write:function(e){o.info(e.replace(/\n$/,""))}}},function(e,t,r){function n(e){if(!e.container)return null;const t=e.container.replace(c,"\\$&"),r=e.jtn?e.jtn.replace(c,"\\$&"):"";if(e.url_format===a)return new RegExp("^/api/run/"+t+"/(?:"+r+"/?)?");if(e.url_format===u)return new RegExp("^/"+t+"/(?:"+r+"/?)?");if(e.url_format===s)return new RegExp("^/(?:"+r+"/?)?");throw new Error("Unsupported webtask URL format.")}function o(e,t){if(!e)return null;const r=e.indexOf("sandbox8")>=0?"8":"";return"https://"+t+"."+(e.split(".it.auth0.com")[0].split("-")[1]||"us")+r+".webtask.io/"}const i=r(63),s=3,u=2,a=1,c=/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,l=function(e,t){var r=i.parse(e).pathname||"";return r=r.replace(t,"").replace(/^\/|\/$/g,""),r.startsWith("/")||(r="/"+r),r.endsWith("/")||(r+="/"),r};e.exports.getBasePath=function(e){return l(e.originalUrl||"",e.path)},e.exports.getBaseUrl=function(e,t){var r=t;const n=i.parse(e.originalUrl||"").pathname||"";return i.format({protocol:r||"https",host:e.headers.host,pathname:n.replace(e.path,"").replace(/\/$/g,"")})},e.exports.getWebtaskUrl=function(e){const t=n(e.x_wt),r=e.url,s=e.url.replace(t,"/"),u=i.parse(s||"").pathname,a=e.x_wt&&e.x_wt.ectx&&e.x_wt.ectx.ISOLATED_DOMAIN||!1,c=i.parse(r||"").pathname||"";var l;if(a){l=i.format({protocol:"https",host:e.headers.host,pathname:c.replace(u,"").replace(/\/$/g,"")});const p=".it.auth0.com/api/run/"+e.x_wt.container+"/",d=o(l,e.x_wt.container);l.indexOf(p)>=0&&(l=l.replace("https://"+e.headers.host+"/api/run/"+e.x_wt.container+"/",d))}else l=c;return l}},function(e,t,r){"use strict";var n=r(52);e.exports=function(e,t,r){return function(o,i,s){var u=n(s);return!0===e||"function"==typeof e&&e(o,i,u)?t(o,i,u):r?r(o,i,u):u()}}},function(e,t,r){"use strict";function n(e){Error.call(this,e),Error.captureStackTrace(this,this.constructor),this.name="ArgumentError",this.message=e}n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,e.exports=n},function(e,t,r){"use strict";function n(e){Error.call(this,e),Error.captureStackTrace(this,this.constructor),this.name="JwksError",this.message=e}n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,e.exports=n},function(e,t,r){"use strict";function n(e){Error.call(this,e),Error.captureStackTrace(this,this.constructor),this.name="JwksRateLimitError",this.message=e}n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,e.exports=n},function(e,t,r){"use strict";function n(e){Error.call(this,e),Error.captureStackTrace(this,this.constructor),this.name="SigningKeyNotFoundError",this.message=e}n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,e.exports=n},function(e,t,r){"use strict";var n=r(49);e.exports=function(e,t){if("string"!=typeof e)throw new Error("Invalid token specified");t=t||{};var r=!0===t.header?0:1;return JSON.parse(n(e.split(".")[r]))}},function(e,t){var r=function(e,t,r,n){if(this.bucketSize=e,this.tokensPerInterval=t,"string"==typeof r)switch(r){case"sec":case"second":this.interval=1e3;break;case"min":case"minute":this.interval=6e4;break;case"hr":case"hour":this.interval=36e5;break;case"day":this.interval=864e5}else this.interval=r;this.parentBucket=n,this.content=0,this.lastDrip=+new Date};r.prototype={bucketSize:1,tokensPerInterval:1,interval:1e3,parentBucket:null,content:0,lastDrip:0,removeTokens:function(e,t){function r(){var r=Math.ceil((e-n.content)*(n.interval/n.tokensPerInterval));return setTimeout(function(){n.removeTokens(e,t)},r),!1}var n=this;return this.bucketSize?e>this.bucketSize?(process.nextTick(t.bind(null,"Requested tokens "+e+" exceeds bucket size "+this.bucketSize,null)),!1):(this.drip(),e>this.content?r():this.parentBucket?this.parentBucket.removeTokens(e,function(o,i){return o?t(o,null):e>n.content?r():(n.content-=e,void t(null,Math.min(i,n.content)))}):(this.content-=e,process.nextTick(t.bind(null,null,this.content)),!0)):(process.nextTick(t.bind(null,null,e,Number.POSITIVE_INFINITY)),!0)},tryRemoveTokens:function(e){return!this.bucketSize||!(e>this.bucketSize)&&(this.drip(),!(e>this.content)&&(!(this.parentBucket&&!this.parent.tryRemoveTokens(e))&&(this.content-=e,!0)))},drip:function(){if(!this.tokensPerInterval)return void(this.content=this.bucketSize);var e=+new Date,t=Math.max(e-this.lastDrip,0);this.lastDrip=e;var r=t*(this.tokensPerInterval/this.interval);this.content=Math.min(this.content+r,this.bucketSize)}},e.exports=r},function(e,t){e.exports=require("bluebird")},function(e,t){e.exports=require("express-jwt")},function(e,t){e.exports=require("lodash")},function(e,t){e.exports=require("superagent")},function(e,t,r){"use strict";(function(t){var n=r(61),o=r(6),i=r(53),s=r(2),u=r(0),a=r(7),c=r(1),l=r(40),p=r(33),d=r(32);e.exports=function(e,r){c.setProvider(e);var h=r?new u.WebtaskStorageContext(r,{force:1}):new u.FileStorageContext(n.join(t,"./data.json"),{mergeWrites:!0}),f=o();return f.use("/app",o.static(n.join(t,"../build"))),f.use(i.json()),f.use(i.urlencoded({extended:!1})),f.use("/meta",function(e,t){t.status(200).send(l)}),f.use(s.routes.dashboardAdmins({secret:c("EXTENSION_SECRET"),audience:"urn:user-import-export-extension",rta:c("AUTH0_RTA").replace("https://",""),domain:c("AUTH0_DOMAIN"),baseUrl:c("PUBLIC_WT_URL")||c("WT_URL"),clientName:"User Import / Export Extension",urlPrefix:"",sessionStorageKey:"user-import-export-extension:apiToken",scopes:"create:users read:users read:connections create:passwords_checking_job"})),f.use("/api",d(h)),f.get("*",p()),f.use(s.middlewares.errorHandler(a.error.bind(a))),f}}).call(t,"/")},function(e,t,r){const n=r(14),o=r(17),i=r(0),s=r(9);e.exports=function(e){if(!e||"object"!=typeof e)throw new i.ArgumentError("Must provide the options");if(null===e.secret||void 0===e.secret)throw new i.ArgumentError("Must provide a valid secret");if("string"!=typeof e.secret||0===e.secret.length)throw new i.ArgumentError("The provided secret is invalid: "+e.secret);if(null===e.audience||void 0===e.audience)throw new i.ArgumentError("Must provide a valid secret");if("string"!=typeof e.audience||0===e.audience.length)throw new i.ArgumentError("The provided audience is invalid: "+e.audience);if(null===e.baseUrl||void 0===e.baseUrl)throw new i.ArgumentError("Must provide a valid base URL");if("string"!=typeof e.baseUrl||0===e.baseUrl.length)throw new i.ArgumentError("The provided base URL is invalid: "+e.baseUrl);const t=o({audience:e.audience,issuer:e.baseUrl,secret:e.secret,algorithms:["HS256"],credentialsRequired:e.credentialsRequired||!0});return function(r,n,o){t(r,n,function(t){return t?o(t):e.onLoginSuccess?e.onLoginSuccess(r,n,o):o()})}},e.exports.optional=function(t){const r=e.exports(t);return s(function(e){if(e&&e.headers&&e.headers.authorization&&0===e.headers.authorization.indexOf("Bearer "))try{const r=n(e.headers.authorization.split(" ")[1]);return r&&r.iss===t.baseUrl}catch(e){return!1}return!1},r)}},function(e,t,r){const n=r(14),o=r(17),i=r(41),s=r(0),u=r(9),a=r(0).UnauthorizedError;e.exports=function(e){if(!e||"object"!=typeof e)throw new s.ArgumentError("Must provide the options");if(null===e.domain||void 0===e.domain)throw new s.ArgumentError("Must provide a valid domain");if("string"!=typeof e.domain||0===e.domain.length)throw new s.ArgumentError("The provided domain is invalid: "+e.domain);if(null===e.audience||void 0===e.audience)throw new s.ArgumentError("Must provide a valid audience");if("string"!=typeof e.audience||0===e.audience.length)throw new s.ArgumentError("The provided audience is invalid: "+e.audience);const t=o({secret:i.expressJwtSecret({cache:!0,rateLimit:!0,jwksRequestsPerMinute:5,jwksUri:"https://"+e.domain+"/.well-known/jwks.json",handleSigningKeyError:function(e,t){return t(e instanceof i.SigningKeyNotFoundError?new a("A token was provided with an invalid kid"):e)}}),audience:e.audience,issuer:"https://"+e.domain+"/",algorithms:["RS256"],credentialsRequired:e&&e.credentialsRequired||!0});return function(r,n,o){t(r,n,function(t){return t?o(t):e.onLoginSuccess?e.onLoginSuccess(r,n,o):o()})}},e.exports.optional=function(t){const r=e.exports(t);return u(function(e){if(e&&e.headers&&e.headers.authorization&&0===e.headers.authorization.indexOf("Bearer "))try{const r=n(e.headers.authorization.split(" ")[1]);return r&&r.iss==="https://"+t.domain+"/"}catch(e){return!1}return!1},r)}},function(e,t,r){e.exports=function(e){return function(t,r,n){return e&&e(t),t&&t.status?(n.status(t.status),n.json({error:t.code||t.name,message:t.message||t.name})):(n.status(t.status||500),n.json({error:"InternalServerError",message:t.message||t.name}))}}},function(e,t,r){e.exports.authenticateAdmins=r(21),e.exports.authenticateUsers=r(22),e.exports.requireAuthentication=r(26),e.exports.errorHandler=r(23),e.exports.managementApiClient=r(25),e.exports.validateHookToken=r(27),e.exports.webtaskConfig=r(28)},function(e,t,r){const n=r(0);e.exports=function(e){return function(t,r,o){const i=t,s=t.user&&t.user.access_token&&t.user.access_token.length,u=s?{domain:e.domain,accessToken:t.user.access_token}:e;n.managementApi.getClient(u).then(function(e){return i.auth0=e,o(),null}).catch(function(e){o(e)})}}},function(e,t,r){const n=r(0).UnauthorizedError;e.exports=function(e,t,r){return e.user?r():r(new n("Authentication required for this endpoint."))}},function(e,t,r){const n=r(0);e.exports=function(e,t,r){if(null===e||void 0===e)throw new n.ArgumentError("Must provide the domain");if("string"!=typeof e||0===e.length)throw new n.ArgumentError("The provided domain is invalid: "+e);if(null===t||void 0===t)throw new n.ArgumentError("Must provide the webtaskUrl");if("string"!=typeof t||0===t.length)throw new n.ArgumentError("The provided webtaskUrl is invalid: "+t);if(null===r||void 0===r)throw new n.ArgumentError("Must provide the extensionSecret");if("string"!=typeof r||0===r.length)throw new n.ArgumentError("The provided extensionSecret is invalid: "+r);return function(o){if(null===o||void 0===o)throw new n.ArgumentError("Must provide the hookPath");if("string"!=typeof o||0===o.length)throw new n.ArgumentError("The provided hookPath is invalid: "+o);return function(i,s,u){if(i.headers.authorization&&"Bearer"===i.headers.authorization.split(" ")[0]){const a=i.headers.authorization.split(" ")[1];try{if(n.validateHookToken(e,t,o,r,a))return u()}catch(e){return u(e)}}return u(new n.HookTokenError("Hook token missing for the call to: "+o))}}}},function(e,t,r){const n=r(0);e.exports=function(e){return function(t,r,o){return t.webtaskContext&&e.setProvider(n.configProvider.fromWebtaskContext(t.webtaskContext)),o()}}},function(e,t,r){const n=r(6),o=r(55),i=r(38),s=r(58),u=r(0),a=r(8);e.exports=function(e){if(!e||"object"!=typeof e)throw new u.ArgumentError("Must provide the options");if(null===e.secret||void 0===e.secret)throw new u.ArgumentError("Must provide a valid secret");if("string"!=typeof e.secret||0===e.secret.length)throw new u.ArgumentError("The provided secret is invalid: "+e.secret);if(null===e.audience||void 0===e.audience)throw new u.ArgumentError("Must provide a valid audience");if("string"!=typeof e.audience||0===e.audience.length)throw new u.ArgumentError("The provided audience is invalid: "+e.audience);if(null===e.rta||void 0===e.rta)throw new u.ArgumentError("Must provide a valid rta");if("string"!=typeof e.rta||0===e.rta.length)throw new u.ArgumentError("The provided rta is invalid: "+e.rta);if(null===e.domain||void 0===e.domain)throw new u.ArgumentError("Must provide a valid domain");if("string"!=typeof e.domain||0===e.domain.length)throw new u.ArgumentError("The provided domain is invalid: "+e.domain);if(null===e.baseUrl||void 0===e.baseUrl)throw new u.ArgumentError("Must provide a valid base URL");if("string"!=typeof e.baseUrl||0===e.baseUrl.length)throw new u.ArgumentError("The provided base URL is invalid: "+e.baseUrl);if(null===e.clientName||void 0===e.clientName)throw new u.ArgumentError("Must provide a valid client name");if("string"!=typeof e.clientName||0===e.clientName.length)throw new u.ArgumentError("The provided client name is invalid: "+e.clientName);const t=e.stateKey||"state",r=e.nonceKey||"nonce",c=e.urlPrefix||"",l=e.sessionStorageKey||"apiToken",p=n.Router();return p.get(c+"/login",function(n,i){const s=o.randomBytes(16).toString("hex"),l=o.randomBytes(16).toString("hex");i.cookie(t,s),i.cookie(r,l);const p=new u.SessionManager(e.rta,e.domain,e.baseUrl),d=p.createAuthorizeUrl({redirectUri:a.getBaseUrl(n)+c+"/login/callback",scopes:e.scopes,expiration:e.expiration,nonce:l,state:s});i.redirect(d)}),p.post(c+"/login/callback",i(),function(n,o,i){var c;try{c=s.decode(n.body.id_token)}catch(e){c=null}return c&&n.cookies&&n.cookies[r]===c.nonce?n.cookies&&n.cookies[t]===n.body.state?new u.SessionManager(e.rta,e.domain,e.baseUrl).create(n.body.id_token,n.body.access_token,{secret:e.secret,issuer:e.baseUrl,audience:e.audience}).then(function(e){o.header("Content-Type","text/html"),o.status(200).send('<html><head><script type="text/javascript">sessionStorage.setItem("'+l+'", "'+e+'");window.location.href = "'+a.getBaseUrl(n)+'";<\/script></head></html>')}).catch(function(e){i(e)}):i(new u.ValidationError("Login failed. State mismatch.")):i(new u.ValidationError("Login failed. Nonce mismatch."))}),p.get(c+"/logout",function(t,r){const n=encodeURIComponent(a.getBaseUrl(t));r.header("Content-Type","text/html"),r.status(200).send('<html><head><script type="text/javascript">sessionStorage.removeItem("'+l+'");window.location.href = "https://'+e.rta+"/v2/logout/?returnTo="+n+"&client_id="+n+'";<\/script></head></html>')}),p.get("/.well-known/oauth2-client-configuration",function(t,r){r.header("Content-Type","application/json"),r.status(200).send({redirect_uris:[a.getBaseUrl(t)+c+"/login/callback"],client_name:e.clientName,post_logout_redirect_uris:[a.getBaseUrl(t)]})}),p}},function(e,t,r){e.exports.dashboardAdmins=r(29)},function(e,t,r){const n=r(0),o=r(64);e.exports.createServer=function(e){const t=n.createServer(e);var r=null;return o.fromExpress(function(e,n){return r||(r=t(e.webtaskContext)),r(e,n)})}},function(e,t,r){"use strict";var n=(r(18),r(6)),o=r(57),i=r(2).middlewares,s=r(1),u=r(36),a=r(35);e.exports=function(e){var t=n.Router();return t.use(i.authenticateAdmins({credentialsRequired:!0,secret:s("EXTENSION_SECRET"),audience:"urn:user-import-export-extension",baseUrl:s("PUBLIC_WT_URL")||s("WT_URL"),onLoginSuccess:function(e,t,r){r()}})),t.post("/jobs/import",function(t,r,n){var i=new o.IncomingForm;i.keepExtensions=!0,i.parse(t,function(o,i,s){if(o)return n(o);a.usersImport(i.connection_id,s.users,e,t.user.access_token).then(function(e){return r.json(e)}).catch(n)})}),t.post("/jobs/export",function(t,r,n){a.usersExport(t.body,e,t.user.access_token).then(function(e){return r.json(e)}).catch(n)}),t.get("/jobs/:id",function(t,r,n){a.check(t.params.id,e,t.user.access_token).then(function(e){return r.json(e)}).catch(n)}),t.get("/jobs/:id/report",function(e,t,r){a.report(e.params.id,e.user.access_token).then(function(e){return t.json(e)}).catch(r)}),t.get("/connections",function(e,t,r){u.getConnections(e.query.strategy||null,e.user.access_token).then(function(e){return t.json(e)}).catch(r)}),t.get("/users",function(e,t,r){u.getUsersCount(e.query.connection||null,e.user.access_token).then(function(e){return t.json(e)}).catch(r)}),t.get("/history",function(t,r,n){e.read().then(function(e){return r.json(e)}).catch(n)}),t}},function(e,t,r){"use strict";var n=r(56),o=r(1),i=r(2).urlHelpers;e.exports=function(){var e='\n    <!DOCTYPE html>\n    <html lang="en">\n    <head>\n      <title>User Import / Export Dashboard</title>\n      <meta charset="UTF-8" />\n      <meta http-equiv="X-UA-Compatible" content="IE=Edge" />\n      <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n      <link rel="shortcut icon" href="https://cdn.auth0.com/styleguide/2.0.1/lib/logos/img/favicon.png">\n      <meta name="viewport" content="width=device-width, initial-scale=1">\n      <link rel="stylesheet" type="text/css" href="https://cdn.auth0.com/styles/zocial.min.css">\n      <link rel="stylesheet" type="text/css" href="https://cdn.auth0.com/manage/v0.3.973/css/index.min.css">\n      <link rel="stylesheet" type="text/css" href="https://cdn.auth0.com/styleguide/3.8.4/index.css">\n      <% if (assets.version) { %>\n        <link rel="stylesheet" type="text/css" href="//cdn.auth0.com/extensions/auth0-user-import-export/assets/auth0-user-import-export.ui.<%= assets.version %>.css">\n      <% } %>\n    </head>\n    <body>\n      <div id="app"></div>\n      <script type="text/javascript">window.config = <%- JSON.stringify(config) %>;<\/script>\n      <script type="text/javascript" src="//cdn.auth0.com/manage/v0.3.973/components/ZeroClipboard/ZeroClipboard.js"><\/script>\n      <script type="text/javascript" src="//cdn.auth0.com/manage/v0.3.973/js/bundle.js"><\/script>\n      <% if (assets.app) { %><script type="text/javascript" src="<%= assets.app %>"><\/script><% } %>\n      <% if (assets.version) { %>\n      <script type="text/javascript" src="//cdn.auth0.com/extensions/auth0-user-import-export/assets/auth0-user-import-export.ui.vendors.<%= assets.version %>.js"><\/script>\n      <script type="text/javascript" src="//cdn.auth0.com/extensions/auth0-user-import-export/assets/auth0-user-import-export.ui.<%= assets.version %>.js"><\/script>\n      <% } %>\n    </body>\n    </html>\n  ';return function(t,r){var s={HOSTING_ENV:o("HOSTING_ENV"),CLIENT_VERSION:"2.4.3",AUTH0_DOMAIN:o("AUTH0_DOMAIN"),BASE_URL:i.getBaseUrl(t),BASE_PATH:i.getBasePath(t)};0!==s.BASE_PATH.indexOf("/")&&(s.BASE_PATH="/"+s.BASE_PATH);return r.send(n.render(e,{config:s,assets:{version:"2.4.3"}}))}}},function(e,t,r){"use strict";var n=r(18);e.exports=function(e,t){return t.read().then(function(r){r=r||{},r.jobs=r.jobs||[];var o={id:e.id,type:e.type,date:e.date||new Date,status:e.status||"pending",summary:e.summary||{}},i=n.findIndex(r.jobs,{id:o.id});return i<0?r.jobs.push(o):(r.jobs[i].status=o.status,r.jobs[i].summary=o.summary),r.jobs.length>20&&(r.jobs=n.drop(r.jobs,r.jobs.length-20)),t.write(r).then(function(){return e})})}},function(e,t,r){"use strict";var n=r(16),o=r(19),i=r(34),s=r(1);e.exports={usersImport:function(e,t,r,u){var a="https://"+s("AUTH0_DOMAIN")+"/api/v2/jobs/users-imports";return new n(function(n,s){o.post(a).set("accept","json").set("Authorization","Bearer "+u).field("connection_id",e).attach("users",t.path).end(function(e,t){if(e||!t)return s(e||"Unknown error");if(t.status>=300)return s(t.error||t.body||t);var o={id:t.body.id,type:"import"};return i(o,r).then(function(){return n(t.body)})})})},usersExport:function(e,t,r){var u="https://"+s("AUTH0_DOMAIN")+"/api/v2/jobs/users-exports";return new n(function(n,s){o.post(u).send(e).set("accept","json").set("Authorization","Bearer "+r).end(function(e,r){if(e||!r)return s(e||"Unknown error");if(r.status>=300)return s(r.error||r.body||r);var o={id:r.body.id,type:"export"};return i(o,t).then(function(){return n(r.body)})})})},check:function(e,t,r){var u="https://"+s("AUTH0_DOMAIN")+"/api/v2/jobs/"+e;return new n(function(n,s){o.get(u).set("accept","json").set("Authorization","Bearer "+r).end(function(r,o){if(r||!o)return s(r||"Unknown error");if(o.status>=300)return s(o.error||o.body||o);var u={id:e,status:o.body.status,summary:o.body.summary};return i(u,t).then(function(){return n(o.body)})})})},report:function(e,t){var r="https://"+s("AUTH0_DOMAIN")+"/api/v2/jobs/"+e+"/errors";return new n(function(e,n){o.get(r).set("accept","json").set("Authorization","Bearer "+t).end(function(t,r){return t||!r?n(t||"Unknown error"):r.status>=300?n(r.error||r.body||r):e(204===r.status?["Failed to parse users file when importing users."]:r.body)})})}}},function(e,t,r){"use strict";var n=r(16),o=r(19),i=r(1),s=function(e,t){return new n(function(r,n){o.get(e).set("accept","json").set("Authorization","Bearer "+t).end(function(e,t){return e?n(e):t.status>=200&&t.status<=300?r(t.body):n(t&&t.error||t)})})},u=function(e,t){var r=[],o="https://"+i("AUTH0_DOMAIN")+"/api/v2/connections",u=0,a=0,c="?per_page=100";e&&(c+="&strategy=auth0");var l=function(){return s(""+o+c+"&page=0&include_totals=true",t).then(function(e){return u=e.total||0,a=Math.ceil(u/100),(e.connections||e||[]).forEach(function(e){return r.push(e)}),null})},p=function(e){return s(""+o+c+"&page="+e,t).then(function(e){return e.forEach(function(e){return r.push(e)}),null})};return function(){return l().then(function(){if(0===u||r.length>=u)return r;for(var e=[],t=1;t<=a;t++)e.push(t);return n.map(e,p,{concurrency:5})})}().then(function(){return r})};e.exports={getUsersCount:function(e,t){var r="https://"+i("AUTH0_DOMAIN")+"/api/v2/users?per_page=1&page=0&include_totals=true&search_engine=v2";return e&&(r+='&q=identities.connection:"'+e+'"'),s(r,t)},getConnections:u}},function(e,t,r){"use strict";var n=r(2),o=r(20),i=r(1),s=r(7),u=n.createServer(function(e,t){return s.info("Starting User Import/Export Extension - Version:","2.4.3"),o(e,t)});e.exports=function(e,t,r){i.setValue("PUBLIC_WT_URL",n.urlHelpers.getWebtaskUrl(t)),u(e,t,r)}},function(e,t,r){"use strict";function n(e,t){return function(r,n,o){if(r.cookies)return o();var s=r.headers.cookie,c=!e||Array.isArray(e)?e||[]:[e];if(r.secret=c[0],r.cookies=Object.create(null),r.signedCookies=Object.create(null),!s)return o();r.cookies=a.parse(s,t),0!==c.length&&(r.signedCookies=u(r.cookies,c),r.signedCookies=i(r.signedCookies)),r.cookies=i(r.cookies),o()}}function o(e){if("string"==typeof e&&"j:"===e.substr(0,2))try{return JSON.parse(e.slice(2))}catch(e){return}}function i(e){for(var t,r,n=Object.keys(e),i=0;i<n.length;i++)t=n[i],(r=o(e[t]))&&(e[t]=r);return e}function s(e,t){if("string"==typeof e){if("s:"!==e.substr(0,2))return e;for(var r=!t||Array.isArray(t)?t||[]:[t],n=0;n<r.length;n++){var o=c.unsign(e.slice(2),r[n]);if(!1!==o)return o}return!1}}function u(e,t){for(var r,n,o,i=Object.keys(e),u=Object.create(null),a=0;a<i.length;a++)n=i[a],o=e[n],r=s(o,t),o!==r&&(u[n]=r,delete e[n]);return u}var a=r(39),c=r(54);e.exports=n,e.exports.JSONCookie=o,e.exports.JSONCookies=i,e.exports.signedCookie=s,e.exports.signedCookies=u},function(e,t,r){"use strict";function n(e,t){if("string"!=typeof e)throw new TypeError("argument str must be a string");for(var r={},n=t||{},o=e.split(a),u=n.decode||s,c=0;c<o.length;c++){var l=o[c],p=l.indexOf("=");if(!(p<0)){var d=l.substr(0,p).trim(),h=l.substr(++p,l.length).trim();'"'==h[0]&&(h=h.slice(1,-1)),void 0==r[d]&&(r[d]=i(h,u))}}return r}function o(e,t,r){var n=r||{},o=n.encode||u;if("function"!=typeof o)throw new TypeError("option encode is invalid");if(!c.test(e))throw new TypeError("argument name is invalid");var i=o(t);if(i&&!c.test(i))throw new TypeError("argument val is invalid");var s=e+"="+i;if(null!=n.maxAge){var a=n.maxAge-0;if(isNaN(a))throw new Error("maxAge should be a Number");s+="; Max-Age="+Math.floor(a)}if(n.domain){if(!c.test(n.domain))throw new TypeError("option domain is invalid");s+="; Domain="+n.domain}if(n.path){if(!c.test(n.path))throw new TypeError("option path is invalid");s+="; Path="+n.path}if(n.expires){if("function"!=typeof n.expires.toUTCString)throw new TypeError("option expires is invalid");s+="; Expires="+n.expires.toUTCString()}if(n.httpOnly&&(s+="; HttpOnly"),n.secure&&(s+="; Secure"),n.sameSite){switch("string"==typeof n.sameSite?n.sameSite.toLowerCase():n.sameSite){case!0:s+="; SameSite=Strict";break;case"lax":s+="; SameSite=Lax";break;case"strict":s+="; SameSite=Strict";break;default:throw new TypeError("option sameSite is invalid")}}return s}function i(e,t){try{return t(e)}catch(t){return e}}t.parse=n,t.serialize=o;var s=decodeURIComponent,u=encodeURIComponent,a=/; */,c=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/},function(e,t){e.exports={title:"User Import / Export",name:"auth0-user-import-export",version:"2.4.3",author:"auth0",useHashName:!1,description:"This extension allows you to import/export users from/to your account.",type:"application",logoUrl:"https://cdn.rawgit.com/auth0/auth0-user-import-export-extension/master/assets/logo.svg",initialUrlPath:"/login",docsUrl:"https://auth0.com/docs/extensions/user-import-export",repository:"https://github.com/auth0/auth0-user-import-export-extension",keywords:["auth0","extension"],auth0:{scopes:"create:users read:users read:connections create:passwords_checking_job"}}},function(e,t,r){"use strict";var n=r(3),o=r(4),i=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}(o),s=r(43),u=r(42);e.exports=function(e){return new n.JwksClient(e)},e.exports.ArgumentError=i.ArgumentError,e.exports.JwksError=i.JwksError,e.exports.JwksRateLimitError=i.JwksRateLimitError,e.exports.SigningKeyNotFoundError=i.SigningKeyNotFoundError,e.exports.expressJwtSecret=u.expressJwtSecret,e.exports.hapiJwt2Key=s.hapiJwt2Key},function(e,t,r){"use strict";var n=r(4),o=r(3),i=function(e,t){return e&&"SigningKeyNotFoundError"===e.name?t(null):e?t(e):void 0};e.exports.expressJwtSecret=function(e){if(null===e||void 0===e)throw new n.ArgumentError("An options object must be provided when initializing expressJwtSecret");var t=new o.JwksClient(e),r=e.handleSigningKeyError||i;return function(e,n,o,i){if(!n||"RS256"!==n.alg)return i(null,null);t.getSigningKey(n.kid,function(e,t){return e?r(e,function(e){return i(e,null)}):i(null,t.publicKey||t.rsaPublicKey)})}}},function(e,t,r){"use strict";var n=r(4),o=r(3),i=function(e,t){return e&&"SigningKeyNotFoundError"===e.name?t(null,null,null):e?t(e,null,null):void 0};e.exports.hapiJwt2Key=function(e){if(null===e||void 0===e)throw new n.ArgumentError("An options object must be provided when initializing expressJwtSecret");var t=new o.JwksClient(e),r=e.handleSigningKeyError||i;return function(e,n){return e&&e.header?"RS256"!==e.header.alg?n(null,null,null):void t.getSigningKey(e.header.kid,function(e,t){return e?r(e,function(e){return n(e,null,null)}):n(null,t.publicKey||t.rsaPublicKey,t)}):n(null,null,null)}}},function(e,t,r){"use strict";function n(e){return e=e.match(/.{1,64}/g).join("\n"),e="-----BEGIN CERTIFICATE-----\n"+e+"\n-----END CERTIFICATE-----\n"}function o(e){var t=e[0];return t<"0"||t>"7"?"00"+e:e}function i(e){var t=e.toString(16);return t.length%2?"0"+t:t}function s(e){if(e<=127)return i(e);var t=i(e);return i(128+t.length/2)+t}function u(e,t){var r=new Buffer(e,"base64"),n=new Buffer(t,"base64"),i=o(r.toString("hex")),u=o(n.toString("hex")),a=i.length/2,c=u.length/2,l=s(a),p=s(c),d="30"+s(a+c+l.length/2+p.length/2+2)+"02"+l+i+"02"+p+u,h=new Buffer(d,"hex").toString("base64"),f="-----BEGIN RSA PUBLIC KEY-----\n";return f+=""+h.match(/.{1,64}/g).join("\n"),f+="\n-----END RSA PUBLIC KEY-----\n"}Object.defineProperty(t,"__esModule",{value:!0}),t.certToPEM=n,t.rsaPublicKeyToPEM=u},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=arguments.length<=1||void 0===arguments[1]?options:arguments[1],r=t.cacheMaxEntries,n=void 0===r?5:r,o=t.cacheMaxAge,s=void 0===o?(0,i.default)("10h"):o,a=(0,u.default)("jwks"),l=e.getSigningKey;return a("Configured caching of singing keys. Max: "+n+" / Age: "+s),(0,c.default)({load:function(e,t){l(e,function(r,n){return r?t(r):(a("Caching signing key for '"+e+"':",n),t(null,n))})},hash:function(e){return e},maxAge:s,max:n})};var o=r(60),i=n(o),s=r(5),u=n(s),a=r(59),c=n(a)},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.rateLimitSigningKey=t.cacheSigningKey=void 0;var o=r(45),i=n(o),s=r(47),u=n(s);t.cacheSigningKey=i.default,t.rateLimitSigningKey=u.default},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=arguments.length<=1||void 0===arguments[1]?options:arguments[1],r=t.jwksRequestsPerMinute,n=void 0===r?10:r,o=(0,i.default)("jwks"),u=e.getSigningKey,c=new s.RateLimiter(n,"minute",!0);return o("Configured rate limiting to JWKS endpoint at "+n+"/minute"),function(e,t){c.removeTokens(1,function(r,n){return r?t(r):(o("Requests to the JWKS endpoint available for the next minute:",n),n<0?(o("Too many requests to the JWKS endpoint"),t(new a.default("Too many requests to the JWKS endpoint"))):u(e,t))})}};var o=r(5),i=n(o),s=r(50),u=r(12),a=n(u)},function(e,t){function r(e){this.message=e}function n(e){var t=String(e).replace(/=+$/,"");if(t.length%4==1)throw new r("'atob' failed: The string to be decoded is not correctly encoded.");for(var n,i,s=0,u=0,a="";i=t.charAt(u++);~i&&(n=s%4?64*n+i:i,s++%4)?a+=String.fromCharCode(255&n>>(-2*s&6)):0)i=o.indexOf(i);return a}var o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.prototype=new Error,r.prototype.name="InvalidCharacterError",e.exports="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||n},function(e,t,r){function n(e){return decodeURIComponent(o(e).replace(/(.)/g,function(e,t){var r=t.charCodeAt(0).toString(16).toUpperCase();return r.length<2&&(r="0"+r),"%"+r}))}var o=r(48);e.exports=function(e){var t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw"Illegal base64url string!"}try{return n(t)}catch(e){return o(t)}}},function(e,t,r){t.RateLimiter=r(51),t.TokenBucket=r(15)},function(e,t,r){var n=r(15),o=function(e,t,r){this.tokenBucket=new n(e,e,t,null),this.tokenBucket.content=e,this.curIntervalStart=+new Date,this.tokensThisInterval=0,this.fireImmediately=r};o.prototype={tokenBucket:null,curIntervalStart:0,tokensThisInterval:0,fireImmediately:!1,removeTokens:function(e,t){function r(r,o){if(r)return t(r,null);n.tokensThisInterval+=e,t(null,o)}if(e>this.tokenBucket.bucketSize)return process.nextTick(t.bind(null,"Requested tokens "+e+" exceeds maximum tokens per interval "+this.tokenBucket.bucketSize,null)),!1;var n=this,o=Date.now();if(o-this.curIntervalStart>=this.tokenBucket.interval&&(this.curIntervalStart=o,this.tokensThisInterval=0),e>this.tokenBucket.tokensPerInterval-this.tokensThisInterval){if(this.fireImmediately)process.nextTick(t.bind(null,null,-1));else{var i=Math.ceil(this.curIntervalStart+this.tokenBucket.interval-o);setTimeout(function(){n.tokenBucket.removeTokens(e,r)},i)}return!1}return this.tokenBucket.removeTokens(e,r)},tryRemoveTokens:function(e){if(e>this.tokenBucket.bucketSize)return!1;var t=Date.now();return t-this.curIntervalStart>=this.tokenBucket.interval&&(this.curIntervalStart=t,this.tokensThisInterval=0),!(e>this.tokenBucket.tokensPerInterval-this.tokensThisInterval)&&this.tokenBucket.tryRemoveTokens(e)},getTokensRemaining:function(){return this.tokenBucket.drip(),this.tokenBucket.content}},e.exports=o},function(e,t,r){function n(e){var t=function(){return t.called?t.value:(t.called=!0,t.value=e.apply(this,arguments))};return t.called=!1,t}function o(e){var t=function(){if(t.called)throw new Error(t.onceError);return t.called=!0,t.value=e.apply(this,arguments)},r=e.name||"Function wrapped with `once`";return t.onceError=r+" shouldn't be called more than once",t.called=!1,t}var i=r(66);e.exports=i(n),e.exports.strict=i(o),n.proto=n(function(){Object.defineProperty(Function.prototype,"once",{value:function(){return n(this)},configurable:!0}),Object.defineProperty(Function.prototype,"onceStrict",{value:function(){return o(this)},configurable:!0})})},function(e,t){e.exports=require("body-parser")},function(e,t){e.exports=require("cookie-signature")},function(e,t){e.exports=require("crypto")},function(e,t){e.exports=require("ejs")},function(e,t){e.exports=require("formidable")},function(e,t){e.exports=require("jsonwebtoken")},function(e,t){e.exports=require("lru-memoizer")},function(e,t){e.exports=require("ms")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("request")},function(e,t){e.exports=require("url")},function(e,t){e.exports=require("webtask-tools")},function(e,t){e.exports=require("winston")},function(e,t){e.exports=require("wrappy")}]);