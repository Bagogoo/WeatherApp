module.exports = { contents: "\"use strict\";\r\nvar _options = { _vueModuleId: 'data-v-88fa774e' };\r\nObject.assign(_options, {\r\n    _scopeId: null,\r\n    render: function render() { var _vm = this; var _h = _vm.$createElement; var _c = _vm._self._c || _h; return _c('div', [_c('div', [(!_vm.data.isValid) ? _c('b-nav', { attrs: { \"tabs\": \"\", \"fill\": \"\" } }, [_c('b-nav-item', { attrs: { \"href\": \"/\" } }, [_vm._v(\"Home\")]), _vm._v(\" \"), _c('b-nav-item', { attrs: { \"href\": \"/#/login\" } }, [_vm._v(\"Logowanie\")]), _vm._v(\" \"), _c('b-nav-item', { attrs: { \"href\": \"/#/register\" } }, [_vm._v(\"Rejestracja\")])], 1) : _c('b-nav', { attrs: { \"tabs\": \"\", \"fill\": \"\" } }, [_c('b-nav-item', { attrs: { \"href\": \"/\" } }, [_vm._v(\"Home\")]), _vm._v(\" \"), _c('b-nav-item', { on: { \"click\": function ($event) { return _vm.logout(); } } }, [_vm._v(\"Wyloguj\")])], 1)], 1)]); },\r\n    staticRenderFns: []\r\n});\r\n\"use strict\";\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try {\r\n            step(generator.next(value));\r\n        }\r\n        catch (e) {\r\n            reject(e);\r\n        } }\r\n        function rejected(value) { try {\r\n            step(generator[\"throw\"](value));\r\n        }\r\n        catch (e) {\r\n            reject(e);\r\n        } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst vue_1 = __importDefault(require(\"vue\"));\r\nexports.default = vue_1.default.extend({\r\n    name: 'Nav',\r\n    data() {\r\n        return {\r\n            data: {\r\n                isValid: false\r\n            }\r\n        };\r\n    },\r\n    mounted() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            this.isloggedIn();\r\n        });\r\n    },\r\n    methods: {\r\n        isloggedIn() {\r\n            return __awaiter(this, void 0, void 0, function* () {\r\n                if (localStorage.getItem('ukey')) {\r\n                    this.data.isValid = true;\r\n                }\r\n            });\r\n        },\r\n        logout() {\r\n            localStorage.removeItem('ukey');\r\n            location.reload();\r\n        }\r\n    }\r\n});\r\nObject.assign(exports.default.options || exports.default, _options);\r\nvar process = FuseBox.import('process');\r\nif (process.env.NODE_ENV !== \"production\") {\r\n    var api = require('vue-hot-reload-api');\r\n    if (api && !api.isRecorded('data-v-88fa774e')) {\r\n        api.createRecord('data-v-88fa774e', module.exports.default);\r\n    }\r\n}\r\n//# sourceMappingURL=Nav.vue.js.map",
dependencies: ["vue-hot-reload-api","vue","vue","../../services/userDataService","vue-hot-reload-api","vue","../../services/userDataService","vue-hot-reload-api","vue","../../services/userDataService","vue-hot-reload-api","vue","../../services/userDataService","vue-hot-reload-api","vue","vue-hot-reload-api","vue","vue-hot-reload-api","vue","vue-hot-reload-api","vue","vue-hot-reload-api","vue","vue-hot-reload-api","vue","vue-hot-reload-api","vue","vue-hot-reload-api","vue","vue-hot-reload-api","vue","vue-hot-reload-api","vue","vue-hot-reload-api","vue","vue-hot-reload-api","vue","vue-hot-reload-api"],
sourceMap: "{\"version\":3,\"sources\":[\"../../src/seed/components/Nav/Nav.ts\"],\"names\":[],\"mappings\":\";;;;;;;;;;;;;;;;;;;;AAAA,8CAAsB;AAQtB,kBAAe,aAAG,CAAC,MAAM,CAAC;IACtB,IAAI,EAAE,KAAK;IACX,IAAI;QACA,OAAO;YACH,IAAI,EAAE;gBACF,OAAO,EAAE,KAAK;aACjB;SACJ,CAAA;IACL,CAAC;IACK,OAAO;;YACT,IAAI,CAAC,UAAU,EAAE,CAAC;QACtB,CAAC;KAAA;IACD,OAAO,EAAE;QACC,UAAU;;gBACZ,IAAI,YAAY,CAAC,OAAO,CAAC,MAAM,CAAC,EAAE;oBAC9B,IAAI,CAAC,IAAI,CAAC,OAAO,GAAG,IAAI,CAAC;iBAC5B;YACL,CAAC;SAAA;QACD,MAAM;YACF,YAAY,CAAC,UAAU,CAAC,MAAM,CAAC,CAAC;YAChC,QAAQ,CAAC,MAAM,EAAE,CAAC;QACtB,CAAC;KACJ;CACJ,CAAC,CAAC\",\"file\":\"\",\"sourcesContent\":[\"import Vue from 'vue';\\r\\nimport { users } from '../../services/userDataService';\\r\\n\\r\\ninterface Data {\\r\\n    data: {\\r\\n        isValid: Boolean;\\r\\n    }\\r\\n}\\r\\nexport default Vue.extend({\\r\\n    name: 'Nav',\\r\\n    data(): Data {\\r\\n        return {\\r\\n            data: {\\r\\n                isValid: false\\r\\n            }\\r\\n        }\\r\\n    },\\r\\n    async mounted() {\\r\\n        this.isloggedIn();\\r\\n    },\\r\\n    methods: {\\r\\n        async isloggedIn() {\\r\\n            if (localStorage.getItem('ukey')) {\\r\\n                this.data.isValid = true;\\r\\n            }\\r\\n        },\\r\\n        logout() {\\r\\n            localStorage.removeItem('ukey');\\r\\n            location.reload();\\r\\n        }\\r\\n    }\\r\\n});\"]}",
headerContent: undefined,
mtime: 1627471662278,
devLibsRequired : undefined,
ac : undefined,
_ : {"template":{"seed/components/Nav/Nav.vue.html":{"contents":"Object.assign(_options, {\n        _scopeId: null,\n        render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',[(!_vm.data.isValid)?_c('b-nav',{attrs:{\"tabs\":\"\",\"fill\":\"\"}},[_c('b-nav-item',{attrs:{\"href\":\"/\"}},[_vm._v(\"Home\")]),_vm._v(\" \"),_c('b-nav-item',{attrs:{\"href\":\"/#/login\"}},[_vm._v(\"Logowanie\")]),_vm._v(\" \"),_c('b-nav-item',{attrs:{\"href\":\"/#/register\"}},[_vm._v(\"Rejestracja\")])],1):_c('b-nav',{attrs:{\"tabs\":\"\",\"fill\":\"\"}},[_c('b-nav-item',{attrs:{\"href\":\"/\"}},[_vm._v(\"Home\")]),_vm._v(\" \"),_c('b-nav-item',{on:{\"click\":function($event){return _vm.logout()}}},[_vm._v(\"Wyloguj\")])],1)],1)])},\n        staticRenderFns: []\n      })"},"override":""},"script":{"seed/components/Nav/Nav.js":{"contents":"\"use strict\";\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst vue_1 = __importDefault(require(\"vue\"));\r\nexports.default = vue_1.default.extend({\r\n    name: 'Nav',\r\n    data() {\r\n        return {\r\n            data: {\r\n                isValid: false\r\n            }\r\n        };\r\n    },\r\n    mounted() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            this.isloggedIn();\r\n        });\r\n    },\r\n    methods: {\r\n        isloggedIn() {\r\n            return __awaiter(this, void 0, void 0, function* () {\r\n                if (localStorage.getItem('ukey')) {\r\n                    this.data.isValid = true;\r\n                }\r\n            });\r\n        },\r\n        logout() {\r\n            localStorage.removeItem('ukey');\r\n            location.reload();\r\n        }\r\n    }\r\n});\r\n//# sourceMappingURL=module.js.map","sourceMap":"{\"version\":3,\"file\":\"module.js\",\"sourceRoot\":\"../../\",\"sources\":[\"/src/seed/components/Nav/Nav.ts\"],\"names\":[],\"mappings\":\";;;;;;;;;;;;;;AAAA,8CAAsB;AAQtB,kBAAe,aAAG,CAAC,MAAM,CAAC;IACtB,IAAI,EAAE,KAAK;IACX,IAAI;QACA,OAAO;YACH,IAAI,EAAE;gBACF,OAAO,EAAE,KAAK;aACjB;SACJ,CAAA;IACL,CAAC;IACK,OAAO;;YACT,IAAI,CAAC,UAAU,EAAE,CAAC;QACtB,CAAC;KAAA;IACD,OAAO,EAAE;QACC,UAAU;;gBACZ,IAAI,YAAY,CAAC,OAAO,CAAC,MAAM,CAAC,EAAE;oBAC9B,IAAI,CAAC,IAAI,CAAC,OAAO,GAAG,IAAI,CAAC;iBAC5B;YACL,CAAC;SAAA;QACD,MAAM;YACF,YAAY,CAAC,UAAU,CAAC,MAAM,CAAC,CAAC;YAChC,QAAQ,CAAC,MAAM,EAAE,CAAC;QACtB,CAAC;KACJ;CACJ,CAAC,CAAC\",\"sourcesContent\":[\"import Vue from 'vue';\\r\\nimport { users } from '../../services/userDataService';\\r\\n\\r\\ninterface Data {\\r\\n    data: {\\r\\n        isValid: Boolean;\\r\\n    }\\r\\n}\\r\\nexport default Vue.extend({\\r\\n    name: 'Nav',\\r\\n    data(): Data {\\r\\n        return {\\r\\n            data: {\\r\\n                isValid: false\\r\\n            }\\r\\n        }\\r\\n    },\\r\\n    async mounted() {\\r\\n        this.isloggedIn();\\r\\n    },\\r\\n    methods: {\\r\\n        async isloggedIn() {\\r\\n            if (localStorage.getItem('ukey')) {\\r\\n                this.data.isValid = true;\\r\\n            }\\r\\n        },\\r\\n        logout() {\\r\\n            localStorage.removeItem('ukey');\\r\\n            location.reload();\\r\\n        }\\r\\n    }\\r\\n});\"]}"},"override":""},"styles":{}}
}
