module.exports = { contents: "\"use strict\";\r\nvar _options = { _vueModuleId: 'data-v-2028b74e' };\r\nObject.assign(_options, { _scopeId: 'data-v-2028b74e' });\r\nObject.assign(_options, {\r\n    _scopeId: \"data-v-2028b74e\",\r\n    render: function render() { var _vm = this; var _h = _vm.$createElement; var _c = _vm._self._c || _h; return _c('div', [_c('Nav'), _vm._v(\" \"), _c('router-view'), _vm._v(\" \"), _c('Footer')], 1); },\r\n    staticRenderFns: []\r\n});\r\n\"use strict\";\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst vue_1 = __importDefault(require(\"vue\"));\r\nconst bootstrap_vue_1 = require(\"bootstrap-vue\");\r\nconst Nav_1 = __importDefault(require(\"../Nav\"));\r\nconst Footer_1 = __importDefault(require(\"../Footer\"));\r\nrequire(\"bootstrap/dist/css/bootstrap.css\");\r\nrequire(\"bootstrap-vue/dist/bootstrap-vue.css\");\r\nvue_1.default.use(bootstrap_vue_1.BootstrapVue);\r\nexports.default = vue_1.default.extend({\r\n    name: 'App',\r\n    components: { Nav: Nav_1.default, Footer: Footer_1.default }\r\n});\r\nObject.assign(exports.default.options || exports.default, _options);\r\nrequire(\"fuse-box-css\")(\"default/seed/components/App/App.vue.css\", \"\\n*[data-v-2028b74e]{\\r\\n  margin:0;\\r\\n  padding: 0;\\r\\n  box-sizing: border-box;\\n}\\nbody[data-v-2028b74e]{\\r\\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\\n}\\n#app[data-v-2028b74e]{\\r\\n  background-color:deepskyblue;\\r\\n  background-size: cover;\\r\\n  background-position: bottom;\\r\\n  transition: 0.4s;\\n}\\r\\n\");\r\nvar process = FuseBox.import('process');\r\nif (process.env.NODE_ENV !== \"production\") {\r\n    var api = require('vue-hot-reload-api');\r\n    if (api && !api.isRecorded('data-v-2028b74e')) {\r\n        api.createRecord('data-v-2028b74e', module.exports.default);\r\n    }\r\n}\r\n//# sourceMappingURL=App.vue.js.map",
dependencies: ["fuse-box-css","vue-hot-reload-api","vue","vue","bootstrap-vue","../Nav","../Footer","bootstrap/dist/css/bootstrap.css","bootstrap-vue/dist/bootstrap-vue.css","fuse-box-css","vue-hot-reload-api","vue","bootstrap-vue","../Nav","../Footer","bootstrap/dist/css/bootstrap.css","bootstrap-vue/dist/bootstrap-vue.css","fuse-box-css","vue-hot-reload-api"],
sourceMap: "{\"version\":3,\"sources\":[\"../../src/seed/components/App/App.ts\"],\"names\":[],\"mappings\":\";;;;;;;;;;;;AAAA,8CAAsB;AACtB,iDAA4C;AAC5C,iDAAyB;AACzB,uDAA8B;AAC9B,4CAAyC;AACzC,gDAA6C;AAE7C,aAAG,CAAC,GAAG,CAAC,4BAAY,CAAC,CAAC;AAGtB,kBAAe,aAAG,CAAC,MAAM,CAAC;IACxB,IAAI,EAAE,KAAK;IACX,UAAU,EAAE,EAAE,GAAG,EAAH,aAAG,EAAE,MAAM,EAAN,gBAAM,EAAE;CAC5B,CAAC,CAAC\",\"file\":\"\",\"sourcesContent\":[\"import Vue from 'vue';\\r\\nimport { BootstrapVue} from 'bootstrap-vue';\\r\\nimport Nav from '../Nav';\\r\\nimport Footer from '../Footer'\\r\\nimport 'bootstrap/dist/css/bootstrap.css'\\r\\nimport 'bootstrap-vue/dist/bootstrap-vue.css'\\r\\n\\r\\nVue.use(BootstrapVue);\\r\\n\\r\\n\\r\\nexport default Vue.extend({\\r\\n  name: 'App',\\r\\n  components: { Nav, Footer }\\r\\n});\"]}",
headerContent: undefined,
mtime: 1626785568648,
devLibsRequired : undefined,
ac : undefined,
_ : {"template":{"seed/components/App/App.vue.html":{"contents":"Object.assign(_options, {\n        _scopeId: \"data-v-2028b74e\",\n        render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('Nav'),_vm._v(\" \"),_c('router-view'),_vm._v(\" \"),_c('Footer')],1)},\n        staticRenderFns: []\n      })"},"override":""},"script":{"seed/components/App/App.js":{"contents":"\"use strict\";\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst vue_1 = __importDefault(require(\"vue\"));\r\nconst bootstrap_vue_1 = require(\"bootstrap-vue\");\r\nconst Nav_1 = __importDefault(require(\"../Nav\"));\r\nconst Footer_1 = __importDefault(require(\"../Footer\"));\r\nrequire(\"bootstrap/dist/css/bootstrap.css\");\r\nrequire(\"bootstrap-vue/dist/bootstrap-vue.css\");\r\nvue_1.default.use(bootstrap_vue_1.BootstrapVue);\r\nexports.default = vue_1.default.extend({\r\n    name: 'App',\r\n    components: { Nav: Nav_1.default, Footer: Footer_1.default }\r\n});\r\n//# sourceMappingURL=module.js.map","sourceMap":"{\"version\":3,\"file\":\"module.js\",\"sourceRoot\":\"../../\",\"sources\":[\"/src/seed/components/App/App.ts\"],\"names\":[],\"mappings\":\";;;;;AAAA,8CAAsB;AACtB,iDAA4C;AAC5C,iDAAyB;AACzB,uDAA8B;AAC9B,4CAAyC;AACzC,gDAA6C;AAE7C,aAAG,CAAC,GAAG,CAAC,4BAAY,CAAC,CAAC;AAGtB,kBAAe,aAAG,CAAC,MAAM,CAAC;IACxB,IAAI,EAAE,KAAK;IACX,UAAU,EAAE,EAAE,GAAG,EAAH,aAAG,EAAE,MAAM,EAAN,gBAAM,EAAE;CAC5B,CAAC,CAAC\",\"sourcesContent\":[\"import Vue from 'vue';\\r\\nimport { BootstrapVue} from 'bootstrap-vue';\\r\\nimport Nav from '../Nav';\\r\\nimport Footer from '../Footer'\\r\\nimport 'bootstrap/dist/css/bootstrap.css'\\r\\nimport 'bootstrap-vue/dist/bootstrap-vue.css'\\r\\n\\r\\nVue.use(BootstrapVue);\\r\\n\\r\\n\\r\\nexport default Vue.extend({\\r\\n  name: 'App',\\r\\n  components: { Nav, Footer }\\r\\n});\"]}"},"override":""},"styles":{"seed/components/App/App.vue.css":{"contents":"\n*[data-v-2028b74e]{\r\n  margin:0;\r\n  padding: 0;\r\n  box-sizing: border-box;\n}\nbody[data-v-2028b74e]{\r\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n}\n#app[data-v-2028b74e]{\r\n  background-color:deepskyblue;\r\n  background-size: cover;\r\n  background-position: bottom;\r\n  transition: 0.4s;\n}\r\n"},"override":""}}
}
