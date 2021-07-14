(function(FuseBox){FuseBox.$fuse$=FuseBox;
FuseBox.target = "server";
// allowSyntheticDefaultImports
FuseBox.sdep = true;
Object.assign(process.env, {"NODE_ENV":"development"})
FuseBox.pkg("default", {}, function(___scope___){
___scope___.file("node-test/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_graphql_1 = require("express-graphql");
const routes_1 = require("./routes");
const app = express_1.default();
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});
app.use(express_1.default.json());
app.use(cors_1.default());
app.use('/user', express_graphql_1.graphqlHTTP({
    rootValue: routes_1.users.rootValue,
    schema: routes_1.users.schema,
    graphiql: true
}));
app.listen(3000);
console.log('Server on port', 3000);

});
___scope___.file("node-test/routes/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
var user_1 = require("./user");
Object.defineProperty(exports, "users", { enumerable: true, get: function () { return __importDefault(user_1).default; } });

});
___scope___.file("node-test/routes/user.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const db_1 = require("../db");
const bcryptjs_1 = require("bcryptjs");
const uuid_1 = require("uuid");
exports.default = {
    rootValue: {
        async getUserByKey({ ukey }) {
            const [row] = (await db_1.pool.query("SELECT * FROM users WHERE ukey = $1", [ukey])).rows;
            return row;
        },
        async getUserByEmail({ email, }) {
            const [row] = (await db_1.pool.query("SELECT * FROM users WHERE email = $1", [email])).rows;
            return row;
        },
        async register({ email, password, confirmation, }) {
            if (password !== confirmation) {
                const result = {
                    data: Error("Podane hasła nie zgadzają się"),
                    status: 400,
                };
                return result.data;
            }
            const u = await this.getUserByEmail({ email });
            if (u != undefined) {
                const result = {
                    data: Error("Użytkownik o podanym mailu istnieje"),
                    status: 400,
                };
                return result.data;
            }
            const hpass = await bcryptjs_1.hash(password, 12);
            const user = {
                email: email,
                password: hpass,
                ukey: uuid_1.v4()
            };
            const [row] = await this.query('INSERT INTO users (ukey, email, password) VALUES ($1, $2, $3) RETURNING  ukey, email, password', [user.ukey, user.email, user.password]);
            return row;
        },
        async confirm({ email }, context) {
            const u = await this.getUserByEmail({ email });
            if (u === undefined) {
                const result = {
                    data: Error("Użytkownik nie istnieje"),
                    status: 400,
                };
                return result.data;
            }
            if (u.confirmed === true) {
                const result = {
                    data: Error("Użytkownik potwierdzony"),
                    status: 400,
                };
                return result.data;
            }
            const success = await this.query("UPDATE Users SET confirm=true where email = $1", [email]);
            if (!success) {
                const result = {
                    data: Error("Wystąpił błąd"),
                    status: 500,
                };
                return result.data;
            }
            return true;
        },
        async login({ email, password }) {
            const u = await this.getUserByEmail({ email });
            if (u === undefined) {
                const result = {
                    data: Error("Użytkownik nie istnieje"),
                    status: 400,
                };
                return result.data;
            }
            if (u.confirmed == false) {
                const result = {
                    data: Error("Użytkownik nie potwierdzony"),
                    status: 401,
                };
                return result.data;
            }
            const valid = await bcryptjs_1.compare(password, u.password);
            if (valid) {
                const accessToken = `accesss-token-${u.ukey}`;
                const result = {
                    data: { ukey: u.ukey, access_token: accessToken },
                    status: 200
                };
                return result.data;
            }
        },
        async profile({ ukey }, context) {
            return { ukey: "ukey", email: "email" };
        },
        async query(command, values) {
            const result = await db_1.pool.query(command, values);
            return result.rows;
        },
    },
    schema: graphql_1.buildSchema(require("../graphql/user.gql")),
};

});
___scope___.file("node-test/db/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    host: 'localhost',
    database: 'Weather',
    port: 5432,
    user: 'admin',
    password: 'admin',
    idleTimeoutMillis: 30000
});

});
___scope___.file("node-test/graphql/user.gql", function(exports, require, module, __filename, __dirname){

module.exports = "type RegisteredUser{\r\n  ukey: ID,\r\n  confirm_token: ID\r\n}\r\ntype AccessToken{\r\n  ukey: ID,\r\n  access_token: ID\r\n}\r\ntype Profile{\r\n  ukey: ID,\r\n  email:String\r\n}\r\ntype Query{\r\n  profile(ukey: String!): Profile\r\n}\r\ntype Mutation{\r\n  register(email: String!, password: String!, confirmation: String!):RegisteredUser\r\n  login(email: String!, password: String!) : AccessToken\r\n  confirm(email: String!): Boolean\r\n}"
});
return ___scope___.entry = "node-test/index.js";
});

FuseBox.import("default/node-test/index.js");
FuseBox.main("default/node-test/index.js");
})
(function(e){function r(e){var r=e.charCodeAt(0),n=e.charCodeAt(1);if((m||58!==n)&&(r>=97&&r<=122||64===r)){if(64===r){var t=e.split("/"),i=t.splice(2,t.length).join("/");return[t[0]+"/"+t[1],i||void 0]}var o=e.indexOf("/");if(o===-1)return[e];var a=e.substring(0,o),f=e.substring(o+1);return[a,f]}}function n(e){return e.substring(0,e.lastIndexOf("/"))||"./"}function t(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];for(var n=[],t=0,i=arguments.length;t<i;t++)n=n.concat(arguments[t].split("/"));for(var o=[],t=0,i=n.length;t<i;t++){var a=n[t];a&&"."!==a&&(".."===a?o.pop():o.push(a))}return""===n[0]&&o.unshift(""),o.join("/")||(o.length?"/":".")}function i(e){var r=e.match(/\.(\w{1,})$/);return r&&r[1]?e:e+".js"}function o(e){if(m){var r,n=document,t=n.getElementsByTagName("head")[0];/\.css$/.test(e)?(r=n.createElement("link"),r.rel="stylesheet",r.type="text/css",r.href=e):(r=n.createElement("script"),r.type="text/javascript",r.src=e,r.async=!0),t.insertBefore(r,t.firstChild)}}function a(e,r){for(var n in e)e.hasOwnProperty(n)&&r(n,e[n])}function f(e){return{server:require(e)}}function u(e,n){var o=n.path||"./",a=n.pkg||"default",u=r(e);if(u&&(o="./",a=u[0],n.v&&n.v[a]&&(a=a+"@"+n.v[a]),e=u[1]),e)if(126===e.charCodeAt(0))e=e.slice(2,e.length),o="./";else if(!m&&(47===e.charCodeAt(0)||58===e.charCodeAt(1)))return f(e);var s=x[a];if(!s){if(m&&"electron"!==_.target)throw"Package not found "+a;return f(a+(e?"/"+e:""))}e=e?e:"./"+s.s.entry;var l,d=t(o,e),c=i(d),p=s.f[c];return!p&&c.indexOf("*")>-1&&(l=c),p||l||(c=t(d,"/","index.js"),p=s.f[c],p||"."!==d||(c=s.s&&s.s.entry||"index.js",p=s.f[c]),p||(c=d+".js",p=s.f[c]),p||(p=s.f[d+".jsx"]),p||(c=d+"/index.jsx",p=s.f[c])),{file:p,wildcard:l,pkgName:a,versions:s.v,filePath:d,validPath:c}}function s(e,r,n){if(void 0===n&&(n={}),!m)return r(/\.(js|json)$/.test(e)?h.require(e):"");if(n&&n.ajaxed===e)return console.error(e,"does not provide a module");var i=new XMLHttpRequest;i.onreadystatechange=function(){if(4==i.readyState)if(200==i.status){var n=i.getResponseHeader("Content-Type"),o=i.responseText;/json/.test(n)?o="module.exports = "+o:/javascript/.test(n)||(o="module.exports = "+JSON.stringify(o));var a=t("./",e);_.dynamic(a,o),r(_.import(e,{ajaxed:e}))}else console.error(e,"not found on request"),r(void 0)},i.open("GET",e,!0),i.send()}function l(e,r){var n=y[e];if(n)for(var t in n){var i=n[t].apply(null,r);if(i===!1)return!1}}function d(e){if(null!==e&&["function","object","array"].indexOf(typeof e)!==-1&&!e.hasOwnProperty("default"))return Object.isFrozen(e)?void(e.default=e):void Object.defineProperty(e,"default",{value:e,writable:!0,enumerable:!1})}function c(e,r){if(void 0===r&&(r={}),58===e.charCodeAt(4)||58===e.charCodeAt(5))return o(e);var t=u(e,r);if(t.server)return t.server;var i=t.file;if(t.wildcard){var a=new RegExp(t.wildcard.replace(/\*/g,"@").replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&").replace(/@@/g,".*").replace(/@/g,"[a-z0-9$_-]+"),"i"),f=x[t.pkgName];if(f){var p={};for(var v in f.f)a.test(v)&&(p[v]=c(t.pkgName+"/"+v));return p}}if(!i){var g="function"==typeof r,y=l("async",[e,r]);if(y===!1)return;return s(e,function(e){return g?r(e):null},r)}var w=t.pkgName;if(i.locals&&i.locals.module)return i.locals.module.exports;var b=i.locals={},j=n(t.validPath);b.exports={},b.module={exports:b.exports},b.require=function(e,r){var n=c(e,{pkg:w,path:j,v:t.versions});return _.sdep&&d(n),n},m||!h.require.main?b.require.main={filename:"./",paths:[]}:b.require.main=h.require.main;var k=[b.module.exports,b.require,b.module,t.validPath,j,w];return l("before-import",k),i.fn.apply(k[0],k),l("after-import",k),b.module.exports}if(e.FuseBox)return e.FuseBox;var p="undefined"!=typeof ServiceWorkerGlobalScope,v="undefined"!=typeof WorkerGlobalScope,m="undefined"!=typeof window&&"undefined"!=typeof window.navigator||v||p,h=m?v||p?{}:window:global;m&&(h.global=v||p?{}:window),e=m&&"undefined"==typeof __fbx__dnm__?e:module.exports;var g=m?v||p?{}:window.__fsbx__=window.__fsbx__||{}:h.$fsbx=h.$fsbx||{};m||(h.require=require);var x=g.p=g.p||{},y=g.e=g.e||{},_=function(){function r(){}return r.global=function(e,r){return void 0===r?h[e]:void(h[e]=r)},r.import=function(e,r){return c(e,r)},r.on=function(e,r){y[e]=y[e]||[],y[e].push(r)},r.exists=function(e){try{var r=u(e,{});return void 0!==r.file}catch(e){return!1}},r.remove=function(e){var r=u(e,{}),n=x[r.pkgName];n&&n.f[r.validPath]&&delete n.f[r.validPath]},r.main=function(e){return this.mainFile=e,r.import(e,{})},r.expose=function(r){var n=function(n){var t=r[n].alias,i=c(r[n].pkg);"*"===t?a(i,function(r,n){return e[r]=n}):"object"==typeof t?a(t,function(r,n){return e[n]=i[r]}):e[t]=i};for(var t in r)n(t)},r.dynamic=function(r,n,t){this.pkg(t&&t.pkg||"default",{},function(t){t.file(r,function(r,t,i,o,a){var f=new Function("__fbx__dnm__","exports","require","module","__filename","__dirname","__root__",n);f(!0,r,t,i,o,a,e)})})},r.flush=function(e){var r=x.default;for(var n in r.f)e&&!e(n)||delete r.f[n].locals},r.pkg=function(e,r,n){if(x[e])return n(x[e].s);var t=x[e]={};return t.f={},t.v=r,t.s={file:function(e,r){return t.f[e]={fn:r}}},n(t.s)},r.addPlugin=function(e){this.plugins.push(e)},r.packages=x,r.isBrowser=m,r.isServer=!m,r.plugins=[],r}();return m||(h.FuseBox=_),e.FuseBox=_}(this))