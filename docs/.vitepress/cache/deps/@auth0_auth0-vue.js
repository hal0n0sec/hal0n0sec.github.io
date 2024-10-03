import {
  inject,
  ref,
  unref,
  watchEffect
} from "./chunk-PAUCAATC.js";
import "./chunk-G3PMV62Z.js";

// node_modules/@auth0/auth0-vue/dist/auth0-vue.production.esm.js
var n = Symbol("$auth0");
function a(e, t) {
  var i = {};
  for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (i[o] = e[o]);
  if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
    var n2 = 0;
    for (o = Object.getOwnPropertySymbols(e); n2 < o.length; n2++) t.indexOf(o[n2]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[n2]) && (i[o[n2]] = e[o[n2]]);
  }
  return i;
}
var s = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
function r(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function c(e, t) {
  return e(t = { exports: {} }, t.exports), t.exports;
}
var l = c(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: true });
  var i = function() {
    function e2() {
      var e3 = this;
      this.locked = /* @__PURE__ */ new Map(), this.addToLocked = function(t2, i2) {
        var o = e3.locked.get(t2);
        void 0 === o ? void 0 === i2 ? e3.locked.set(t2, []) : e3.locked.set(t2, [i2]) : void 0 !== i2 && (o.unshift(i2), e3.locked.set(t2, o));
      }, this.isLocked = function(t2) {
        return e3.locked.has(t2);
      }, this.lock = function(t2) {
        return new Promise(function(i2, o) {
          e3.isLocked(t2) ? e3.addToLocked(t2, i2) : (e3.addToLocked(t2), i2());
        });
      }, this.unlock = function(t2) {
        var i2 = e3.locked.get(t2);
        if (void 0 !== i2 && 0 !== i2.length) {
          var o = i2.pop();
          e3.locked.set(t2, i2), void 0 !== o && setTimeout(o, 0);
        } else e3.locked.delete(t2);
      };
    }
    return e2.getInstance = function() {
      return void 0 === e2.instance && (e2.instance = new e2()), e2.instance;
    }, e2;
  }();
  t.default = function() {
    return i.getInstance();
  };
});
r(l);
var d = r(c(function(e, t) {
  var i = s && s.__awaiter || function(e2, t2, i2, o2) {
    return new (i2 || (i2 = Promise))(function(n3, a3) {
      function s2(e3) {
        try {
          c3(o2.next(e3));
        } catch (e4) {
          a3(e4);
        }
      }
      function r3(e3) {
        try {
          c3(o2.throw(e3));
        } catch (e4) {
          a3(e4);
        }
      }
      function c3(e3) {
        e3.done ? n3(e3.value) : new i2(function(t3) {
          t3(e3.value);
        }).then(s2, r3);
      }
      c3((o2 = o2.apply(e2, t2 || [])).next());
    });
  }, o = s && s.__generator || function(e2, t2) {
    var i2, o2, n3, a3, s2 = { label: 0, sent: function() {
      if (1 & n3[0]) throw n3[1];
      return n3[1];
    }, trys: [], ops: [] };
    return a3 = { next: r3(0), throw: r3(1), return: r3(2) }, "function" == typeof Symbol && (a3[Symbol.iterator] = function() {
      return this;
    }), a3;
    function r3(a4) {
      return function(r4) {
        return function(a5) {
          if (i2) throw new TypeError("Generator is already executing.");
          for (; s2; ) try {
            if (i2 = 1, o2 && (n3 = 2 & a5[0] ? o2.return : a5[0] ? o2.throw || ((n3 = o2.return) && n3.call(o2), 0) : o2.next) && !(n3 = n3.call(o2, a5[1])).done) return n3;
            switch (o2 = 0, n3 && (a5 = [2 & a5[0], n3.value]), a5[0]) {
              case 0:
              case 1:
                n3 = a5;
                break;
              case 4:
                return s2.label++, { value: a5[1], done: false };
              case 5:
                s2.label++, o2 = a5[1], a5 = [0];
                continue;
              case 7:
                a5 = s2.ops.pop(), s2.trys.pop();
                continue;
              default:
                if (!((n3 = (n3 = s2.trys).length > 0 && n3[n3.length - 1]) || 6 !== a5[0] && 2 !== a5[0])) {
                  s2 = 0;
                  continue;
                }
                if (3 === a5[0] && (!n3 || a5[1] > n3[0] && a5[1] < n3[3])) {
                  s2.label = a5[1];
                  break;
                }
                if (6 === a5[0] && s2.label < n3[1]) {
                  s2.label = n3[1], n3 = a5;
                  break;
                }
                if (n3 && s2.label < n3[2]) {
                  s2.label = n3[2], s2.ops.push(a5);
                  break;
                }
                n3[2] && s2.ops.pop(), s2.trys.pop();
                continue;
            }
            a5 = t2.call(e2, s2);
          } catch (e3) {
            a5 = [6, e3], o2 = 0;
          } finally {
            i2 = n3 = 0;
          }
          if (5 & a5[0]) throw a5[1];
          return { value: a5[0] ? a5[1] : void 0, done: true };
        }([a4, r4]);
      };
    }
  }, n2 = s;
  Object.defineProperty(t, "__esModule", { value: true });
  var a2 = "browser-tabs-lock-key", r2 = { key: function(e2) {
    return i(n2, void 0, void 0, function() {
      return o(this, function(e3) {
        throw new Error("Unsupported");
      });
    });
  }, getItem: function(e2) {
    return i(n2, void 0, void 0, function() {
      return o(this, function(e3) {
        throw new Error("Unsupported");
      });
    });
  }, clear: function() {
    return i(n2, void 0, void 0, function() {
      return o(this, function(e2) {
        return [2, window.localStorage.clear()];
      });
    });
  }, removeItem: function(e2) {
    return i(n2, void 0, void 0, function() {
      return o(this, function(e3) {
        throw new Error("Unsupported");
      });
    });
  }, setItem: function(e2, t2) {
    return i(n2, void 0, void 0, function() {
      return o(this, function(e3) {
        throw new Error("Unsupported");
      });
    });
  }, keySync: function(e2) {
    return window.localStorage.key(e2);
  }, getItemSync: function(e2) {
    return window.localStorage.getItem(e2);
  }, clearSync: function() {
    return window.localStorage.clear();
  }, removeItemSync: function(e2) {
    return window.localStorage.removeItem(e2);
  }, setItemSync: function(e2, t2) {
    return window.localStorage.setItem(e2, t2);
  } };
  function c2(e2) {
    return new Promise(function(t2) {
      return setTimeout(t2, e2);
    });
  }
  function d2(e2) {
    for (var t2 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz", i2 = "", o2 = 0; o2 < e2; o2++) i2 += t2[Math.floor(Math.random() * t2.length)];
    return i2;
  }
  var u2 = function() {
    function e2(t2) {
      this.acquiredIatSet = /* @__PURE__ */ new Set(), this.storageHandler = void 0, this.id = Date.now().toString() + d2(15), this.acquireLock = this.acquireLock.bind(this), this.releaseLock = this.releaseLock.bind(this), this.releaseLock__private__ = this.releaseLock__private__.bind(this), this.waitForSomethingToChange = this.waitForSomethingToChange.bind(this), this.refreshLockWhileAcquired = this.refreshLockWhileAcquired.bind(this), this.storageHandler = t2, void 0 === e2.waiters && (e2.waiters = []);
    }
    return e2.prototype.acquireLock = function(t2, n3) {
      return void 0 === n3 && (n3 = 5e3), i(this, void 0, void 0, function() {
        var i2, s2, l2, u3, h2, p2, m2;
        return o(this, function(o2) {
          switch (o2.label) {
            case 0:
              i2 = Date.now() + d2(4), s2 = Date.now() + n3, l2 = a2 + "-" + t2, u3 = void 0 === this.storageHandler ? r2 : this.storageHandler, o2.label = 1;
            case 1:
              return Date.now() < s2 ? [4, c2(30)] : [3, 8];
            case 2:
              return o2.sent(), null !== u3.getItemSync(l2) ? [3, 5] : (h2 = this.id + "-" + t2 + "-" + i2, [4, c2(Math.floor(25 * Math.random()))]);
            case 3:
              return o2.sent(), u3.setItemSync(l2, JSON.stringify({ id: this.id, iat: i2, timeoutKey: h2, timeAcquired: Date.now(), timeRefreshed: Date.now() })), [4, c2(30)];
            case 4:
              return o2.sent(), null !== (p2 = u3.getItemSync(l2)) && (m2 = JSON.parse(p2)).id === this.id && m2.iat === i2 ? (this.acquiredIatSet.add(i2), this.refreshLockWhileAcquired(l2, i2), [2, true]) : [3, 7];
            case 5:
              return e2.lockCorrector(void 0 === this.storageHandler ? r2 : this.storageHandler), [4, this.waitForSomethingToChange(s2)];
            case 6:
              o2.sent(), o2.label = 7;
            case 7:
              return i2 = Date.now() + d2(4), [3, 1];
            case 8:
              return [2, false];
          }
        });
      });
    }, e2.prototype.refreshLockWhileAcquired = function(e3, t2) {
      return i(this, void 0, void 0, function() {
        var n3 = this;
        return o(this, function(a3) {
          return setTimeout(function() {
            return i(n3, void 0, void 0, function() {
              var i2, n4, a4;
              return o(this, function(o2) {
                switch (o2.label) {
                  case 0:
                    return [4, l.default().lock(t2)];
                  case 1:
                    return o2.sent(), this.acquiredIatSet.has(t2) ? (i2 = void 0 === this.storageHandler ? r2 : this.storageHandler, null === (n4 = i2.getItemSync(e3)) ? (l.default().unlock(t2), [2]) : ((a4 = JSON.parse(n4)).timeRefreshed = Date.now(), i2.setItemSync(e3, JSON.stringify(a4)), l.default().unlock(t2), this.refreshLockWhileAcquired(e3, t2), [2])) : (l.default().unlock(t2), [2]);
                }
              });
            });
          }, 1e3), [2];
        });
      });
    }, e2.prototype.waitForSomethingToChange = function(t2) {
      return i(this, void 0, void 0, function() {
        return o(this, function(i2) {
          switch (i2.label) {
            case 0:
              return [4, new Promise(function(i3) {
                var o2 = false, n3 = Date.now(), a3 = false;
                function s2() {
                  if (a3 || (window.removeEventListener("storage", s2), e2.removeFromWaiting(s2), clearTimeout(r3), a3 = true), !o2) {
                    o2 = true;
                    var t3 = 50 - (Date.now() - n3);
                    t3 > 0 ? setTimeout(i3, t3) : i3(null);
                  }
                }
                window.addEventListener("storage", s2), e2.addToWaiting(s2);
                var r3 = setTimeout(s2, Math.max(0, t2 - Date.now()));
              })];
            case 1:
              return i2.sent(), [2];
          }
        });
      });
    }, e2.addToWaiting = function(t2) {
      this.removeFromWaiting(t2), void 0 !== e2.waiters && e2.waiters.push(t2);
    }, e2.removeFromWaiting = function(t2) {
      void 0 !== e2.waiters && (e2.waiters = e2.waiters.filter(function(e3) {
        return e3 !== t2;
      }));
    }, e2.notifyWaiters = function() {
      void 0 !== e2.waiters && e2.waiters.slice().forEach(function(e3) {
        return e3();
      });
    }, e2.prototype.releaseLock = function(e3) {
      return i(this, void 0, void 0, function() {
        return o(this, function(t2) {
          switch (t2.label) {
            case 0:
              return [4, this.releaseLock__private__(e3)];
            case 1:
              return [2, t2.sent()];
          }
        });
      });
    }, e2.prototype.releaseLock__private__ = function(t2) {
      return i(this, void 0, void 0, function() {
        var i2, n3, s2, c3;
        return o(this, function(o2) {
          switch (o2.label) {
            case 0:
              return i2 = void 0 === this.storageHandler ? r2 : this.storageHandler, n3 = a2 + "-" + t2, null === (s2 = i2.getItemSync(n3)) ? [2] : (c3 = JSON.parse(s2)).id !== this.id ? [3, 2] : [4, l.default().lock(c3.iat)];
            case 1:
              o2.sent(), this.acquiredIatSet.delete(c3.iat), i2.removeItemSync(n3), l.default().unlock(c3.iat), e2.notifyWaiters(), o2.label = 2;
            case 2:
              return [2];
          }
        });
      });
    }, e2.lockCorrector = function(t2) {
      for (var i2 = Date.now() - 5e3, o2 = t2, n3 = [], s2 = 0; ; ) {
        var r3 = o2.keySync(s2);
        if (null === r3) break;
        n3.push(r3), s2++;
      }
      for (var c3 = false, l2 = 0; l2 < n3.length; l2++) {
        var d3 = n3[l2];
        if (d3.includes(a2)) {
          var u3 = o2.getItemSync(d3);
          if (null !== u3) {
            var h2 = JSON.parse(u3);
            (void 0 === h2.timeRefreshed && h2.timeAcquired < i2 || void 0 !== h2.timeRefreshed && h2.timeRefreshed < i2) && (o2.removeItemSync(d3), c3 = true);
          }
        }
      }
      c3 && e2.notifyWaiters();
    }, e2.waiters = void 0, e2;
  }();
  t.default = u2;
}));
var u = { timeoutInSeconds: 60 };
var h = { name: "auth0-spa-js", version: "2.1.3" };
var p = () => Date.now();
var m = class _m extends Error {
  constructor(e, t) {
    super(t), this.error = e, this.error_description = t, Object.setPrototypeOf(this, _m.prototype);
  }
  static fromPayload({ error: e, error_description: t }) {
    return new _m(e, t);
  }
};
var g = class _g extends m {
  constructor(e, t, i, o = null) {
    super(e, t), this.state = i, this.appState = o, Object.setPrototypeOf(this, _g.prototype);
  }
};
var f = class _f extends m {
  constructor() {
    super("timeout", "Timeout"), Object.setPrototypeOf(this, _f.prototype);
  }
};
var y = class _y extends f {
  constructor(e) {
    super(), this.popup = e, Object.setPrototypeOf(this, _y.prototype);
  }
};
var w = class _w extends m {
  constructor(e) {
    super("cancelled", "Popup closed"), this.popup = e, Object.setPrototypeOf(this, _w.prototype);
  }
};
var b = class _b extends m {
  constructor(e, t, i) {
    super(e, t), this.mfa_token = i, Object.setPrototypeOf(this, _b.prototype);
  }
};
var v = class _v extends m {
  constructor(e, t) {
    super("missing_refresh_token", `Missing Refresh Token (audience: '${k(e, ["default"])}', scope: '${k(t)}')`), this.audience = e, this.scope = t, Object.setPrototypeOf(this, _v.prototype);
  }
};
function k(e, t = []) {
  return e && !t.includes(e) ? e : "";
}
var _ = () => window.crypto;
var I = () => {
  const e = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_~.";
  let t = "";
  return Array.from(_().getRandomValues(new Uint8Array(43))).forEach((i) => t += e[i % e.length]), t;
};
var S = (e) => btoa(e);
var Z = (e) => {
  var { clientId: t } = e, i = a(e, ["clientId"]);
  return new URLSearchParams(((e2) => Object.keys(e2).filter((t2) => void 0 !== e2[t2]).reduce((t2, i2) => Object.assign(Object.assign({}, t2), { [i2]: e2[i2] }), {}))(Object.assign({ client_id: t }, i))).toString();
};
var W = (e) => ((e2) => decodeURIComponent(atob(e2).split("").map((e3) => "%" + ("00" + e3.charCodeAt(0).toString(16)).slice(-2)).join("")))(e.replace(/_/g, "/").replace(/-/g, "+"));
var T = async (e, t) => {
  const i = await fetch(e, t);
  return { ok: i.ok, json: await i.json() };
};
var C = async (e, t, i, o, n2, a2, s2 = 1e4) => n2 ? (async (e2, t2, i2, o2, n3, a3, s3) => {
  return r2 = { auth: { audience: t2, scope: i2 }, timeout: n3, fetchUrl: e2, fetchOptions: o2, useFormData: s3 }, c2 = a3, new Promise(function(e3, t3) {
    const i3 = new MessageChannel();
    i3.port1.onmessage = function(o3) {
      o3.data.error ? t3(new Error(o3.data.error)) : e3(o3.data), i3.port1.close();
    }, c2.postMessage(r2, [i3.port2]);
  });
  var r2, c2;
})(e, t, i, o, s2, n2, a2) : (async (e2, t2, i2) => {
  const o2 = new AbortController();
  let n3;
  return t2.signal = o2.signal, Promise.race([T(e2, t2), new Promise((e3, t3) => {
    n3 = setTimeout(() => {
      o2.abort(), t3(new Error("Timeout when executing 'fetch'"));
    }, i2);
  })]).finally(() => {
    clearTimeout(n3);
  });
})(e, o, s2);
async function j(e, t) {
  var { baseUrl: i, timeout: o, audience: n2, scope: s2, auth0Client: r2, useFormData: c2 } = e, l2 = a(e, ["baseUrl", "timeout", "audience", "scope", "auth0Client", "useFormData"]);
  const d2 = c2 ? Z(l2) : JSON.stringify(l2);
  return await async function(e2, t2, i2, o2, n3, s3, r3) {
    let c3, l3 = null;
    for (let a2 = 0; a2 < 3; a2++) try {
      c3 = await C(e2, i2, o2, n3, s3, r3, t2), l3 = null;
      break;
    } catch (e3) {
      l3 = e3;
    }
    if (l3) throw l3;
    const d3 = c3.json, { error: u2, error_description: h2 } = d3, p2 = a(d3, ["error", "error_description"]), { ok: g2 } = c3;
    if (!g2) {
      const t3 = h2 || `HTTP error. Unable to fetch ${e2}`;
      if ("mfa_required" === u2) throw new b(u2, t3, p2.mfa_token);
      if ("missing_refresh_token" === u2) throw new v(i2, o2);
      throw new m(u2 || "request_error", t3);
    }
    return p2;
  }(`${i}/oauth/token`, o, n2 || "default", s2, { method: "POST", body: d2, headers: { "Content-Type": c2 ? "application/x-www-form-urlencoded" : "application/json", "Auth0-Client": btoa(JSON.stringify(r2 || h)) } }, t, c2);
}
var P = (...e) => {
  return (t = e.filter(Boolean).join(" ").trim().split(/\s+/), Array.from(new Set(t))).join(" ");
  var t;
};
var O = class _O {
  constructor(e, t = "@@auth0spajs@@", i) {
    this.prefix = t, this.suffix = i, this.clientId = e.clientId, this.scope = e.scope, this.audience = e.audience;
  }
  toKey() {
    return [this.prefix, this.clientId, this.audience, this.scope, this.suffix].filter(Boolean).join("::");
  }
  static fromKey(e) {
    const [t, i, o, n2] = e.split("::");
    return new _O({ clientId: i, scope: n2, audience: o }, t);
  }
  static fromCacheEntry(e) {
    const { scope: t, audience: i, client_id: o } = e;
    return new _O({ scope: t, audience: i, clientId: o });
  }
};
var X = class {
  set(e, t) {
    localStorage.setItem(e, JSON.stringify(t));
  }
  get(e) {
    const t = window.localStorage.getItem(e);
    if (t) try {
      return JSON.parse(t);
    } catch (e2) {
      return;
    }
  }
  remove(e) {
    localStorage.removeItem(e);
  }
  allKeys() {
    return Object.keys(window.localStorage).filter((e) => e.startsWith("@@auth0spajs@@"));
  }
};
var z = class {
  constructor() {
    this.enclosedCache = /* @__PURE__ */ function() {
      let e = {};
      return { set(t, i) {
        e[t] = i;
      }, get(t) {
        const i = e[t];
        if (i) return i;
      }, remove(t) {
        delete e[t];
      }, allKeys: () => Object.keys(e) };
    }();
  }
};
var K = class {
  constructor(e, t, i) {
    this.cache = e, this.keyManifest = t, this.nowProvider = i || p;
  }
  async setIdToken(e, t, i) {
    var o;
    const n2 = this.getIdTokenCacheKey(e);
    await this.cache.set(n2, { id_token: t, decodedToken: i }), await (null === (o = this.keyManifest) || void 0 === o ? void 0 : o.add(n2));
  }
  async getIdToken(e) {
    const t = await this.cache.get(this.getIdTokenCacheKey(e.clientId));
    if (!t && e.scope && e.audience) {
      const t2 = await this.get(e);
      if (!t2) return;
      if (!t2.id_token || !t2.decodedToken) return;
      return { id_token: t2.id_token, decodedToken: t2.decodedToken };
    }
    if (t) return { id_token: t.id_token, decodedToken: t.decodedToken };
  }
  async get(e, t = 0) {
    var i;
    let o = await this.cache.get(e.toKey());
    if (!o) {
      const t2 = await this.getCacheKeys();
      if (!t2) return;
      const i2 = this.matchExistingCacheKey(e, t2);
      i2 && (o = await this.cache.get(i2));
    }
    if (!o) return;
    const n2 = await this.nowProvider(), a2 = Math.floor(n2 / 1e3);
    return o.expiresAt - t < a2 ? o.body.refresh_token ? (o.body = { refresh_token: o.body.refresh_token }, await this.cache.set(e.toKey(), o), o.body) : (await this.cache.remove(e.toKey()), void await (null === (i = this.keyManifest) || void 0 === i ? void 0 : i.remove(e.toKey()))) : o.body;
  }
  async set(e) {
    var t;
    const i = new O({ clientId: e.client_id, scope: e.scope, audience: e.audience }), o = await this.wrapCacheEntry(e);
    await this.cache.set(i.toKey(), o), await (null === (t = this.keyManifest) || void 0 === t ? void 0 : t.add(i.toKey()));
  }
  async clear(e) {
    var t;
    const i = await this.getCacheKeys();
    i && (await i.filter((t2) => !e || t2.includes(e)).reduce(async (e2, t2) => {
      await e2, await this.cache.remove(t2);
    }, Promise.resolve()), await (null === (t = this.keyManifest) || void 0 === t ? void 0 : t.clear()));
  }
  async wrapCacheEntry(e) {
    const t = await this.nowProvider();
    return { body: e, expiresAt: Math.floor(t / 1e3) + e.expires_in };
  }
  async getCacheKeys() {
    var e;
    return this.keyManifest ? null === (e = await this.keyManifest.get()) || void 0 === e ? void 0 : e.keys : this.cache.allKeys ? this.cache.allKeys() : void 0;
  }
  getIdTokenCacheKey(e) {
    return new O({ clientId: e }, "@@auth0spajs@@", "@@user@@").toKey();
  }
  matchExistingCacheKey(e, t) {
    return t.filter((t2) => {
      var i;
      const o = O.fromKey(t2), n2 = new Set(o.scope && o.scope.split(" ")), a2 = (null === (i = e.scope) || void 0 === i ? void 0 : i.split(" ")) || [], s2 = o.scope && a2.reduce((e2, t3) => e2 && n2.has(t3), true);
      return "@@auth0spajs@@" === o.prefix && o.clientId === e.clientId && o.audience === e.audience && s2;
    })[0];
  }
};
var R = class {
  constructor(e, t, i) {
    this.storage = e, this.clientId = t, this.cookieDomain = i, this.storageKey = `a0.spajs.txs.${this.clientId}`;
  }
  create(e) {
    this.storage.save(this.storageKey, e, { daysUntilExpire: 1, cookieDomain: this.cookieDomain });
  }
  get() {
    return this.storage.get(this.storageKey);
  }
  remove() {
    this.storage.remove(this.storageKey, { cookieDomain: this.cookieDomain });
  }
};
var x = (e) => "number" == typeof e;
var N = ["iss", "aud", "exp", "nbf", "iat", "jti", "azp", "nonce", "auth_time", "at_hash", "c_hash", "acr", "amr", "sub_jwk", "cnf", "sip_from_tag", "sip_date", "sip_callid", "sip_cseq_num", "sip_via_branch", "orig", "dest", "mky", "events", "toe", "txn", "rph", "sid", "vot", "vtm"];
var L = c(function(e, t) {
  var i = s && s.__assign || function() {
    return i = Object.assign || function(e2) {
      for (var t2, i2 = 1, o2 = arguments.length; i2 < o2; i2++) for (var n3 in t2 = arguments[i2]) Object.prototype.hasOwnProperty.call(t2, n3) && (e2[n3] = t2[n3]);
      return e2;
    }, i.apply(this, arguments);
  };
  function o(e2, t2) {
    if (!t2) return "";
    var i2 = "; " + e2;
    return true === t2 ? i2 : i2 + "=" + t2;
  }
  function n2(e2, t2, i2) {
    return encodeURIComponent(e2).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/\(/g, "%28").replace(/\)/g, "%29") + "=" + encodeURIComponent(t2).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent) + function(e3) {
      if ("number" == typeof e3.expires) {
        var t3 = /* @__PURE__ */ new Date();
        t3.setMilliseconds(t3.getMilliseconds() + 864e5 * e3.expires), e3.expires = t3;
      }
      return o("Expires", e3.expires ? e3.expires.toUTCString() : "") + o("Domain", e3.domain) + o("Path", e3.path) + o("Secure", e3.secure) + o("SameSite", e3.sameSite);
    }(i2);
  }
  function a2(e2) {
    for (var t2 = {}, i2 = e2 ? e2.split("; ") : [], o2 = /(%[\dA-F]{2})+/gi, n3 = 0; n3 < i2.length; n3++) {
      var a3 = i2[n3].split("="), s2 = a3.slice(1).join("=");
      '"' === s2.charAt(0) && (s2 = s2.slice(1, -1));
      try {
        t2[a3[0].replace(o2, decodeURIComponent)] = s2.replace(o2, decodeURIComponent);
      } catch (e3) {
      }
    }
    return t2;
  }
  function r2() {
    return a2(document.cookie);
  }
  function c2(e2, t2, o2) {
    document.cookie = n2(e2, t2, i({ path: "/" }, o2));
  }
  t.__esModule = true, t.encode = n2, t.parse = a2, t.getAll = r2, t.get = function(e2) {
    return r2()[e2];
  }, t.set = c2, t.remove = function(e2, t2) {
    c2(e2, "", i(i({}, t2), { expires: -1 }));
  };
});
r(L), L.encode, L.parse, L.getAll;
var Y = L.get;
var G = L.set;
var J = L.remove;
var V = { get(e) {
  const t = Y(e);
  if (void 0 !== t) return JSON.parse(t);
}, save(e, t, i) {
  let o = {};
  "https:" === window.location.protocol && (o = { secure: true, sameSite: "none" }), (null == i ? void 0 : i.daysUntilExpire) && (o.expires = i.daysUntilExpire), (null == i ? void 0 : i.cookieDomain) && (o.domain = i.cookieDomain), G(e, JSON.stringify(t), o);
}, remove(e, t) {
  let i = {};
  (null == t ? void 0 : t.cookieDomain) && (i.domain = t.cookieDomain), J(e, i);
} };
var U = { get: (e) => V.get(e) || V.get(`_legacy_${e}`), save(e, t, i) {
  let o = {};
  "https:" === window.location.protocol && (o = { secure: true }), (null == i ? void 0 : i.daysUntilExpire) && (o.expires = i.daysUntilExpire), (null == i ? void 0 : i.cookieDomain) && (o.domain = i.cookieDomain), G(`_legacy_${e}`, JSON.stringify(t), o), V.save(e, t, i);
}, remove(e, t) {
  let i = {};
  (null == t ? void 0 : t.cookieDomain) && (i.domain = t.cookieDomain), J(e, i), V.remove(e, t), V.remove(`_legacy_${e}`, t);
} };
var E = { get(e) {
  if ("undefined" == typeof sessionStorage) return;
  const t = sessionStorage.getItem(e);
  return null != t ? JSON.parse(t) : void 0;
}, save(e, t) {
  sessionStorage.setItem(e, JSON.stringify(t));
}, remove(e) {
  sessionStorage.removeItem(e);
} };
var H;
var F = ("Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwohZnVuY3Rpb24oKXsidXNlIHN0cmljdCI7Y2xhc3MgZSBleHRlbmRzIEVycm9ye2NvbnN0cnVjdG9yKHQscil7c3VwZXIociksdGhpcy5lcnJvcj10LHRoaXMuZXJyb3JfZGVzY3JpcHRpb249cixPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcyxlLnByb3RvdHlwZSl9c3RhdGljIGZyb21QYXlsb2FkKHtlcnJvcjp0LGVycm9yX2Rlc2NyaXB0aW9uOnJ9KXtyZXR1cm4gbmV3IGUodCxyKX19Y2xhc3MgdCBleHRlbmRzIGV7Y29uc3RydWN0b3IoZSxzKXtzdXBlcigibWlzc2luZ19yZWZyZXNoX3Rva2VuIixgTWlzc2luZyBSZWZyZXNoIFRva2VuIChhdWRpZW5jZTogJyR7cihlLFsiZGVmYXVsdCJdKX0nLCBzY29wZTogJyR7cihzKX0nKWApLHRoaXMuYXVkaWVuY2U9ZSx0aGlzLnNjb3BlPXMsT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsdC5wcm90b3R5cGUpfX1mdW5jdGlvbiByKGUsdD1bXSl7cmV0dXJuIGUmJiF0LmluY2x1ZGVzKGUpP2U6IiJ9ImZ1bmN0aW9uIj09dHlwZW9mIFN1cHByZXNzZWRFcnJvciYmU3VwcHJlc3NlZEVycm9yO2NvbnN0IHM9ZT0+e3ZhcntjbGllbnRJZDp0fT1lLHI9ZnVuY3Rpb24oZSx0KXt2YXIgcj17fTtmb3IodmFyIHMgaW4gZSlPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSxzKSYmdC5pbmRleE9mKHMpPDAmJihyW3NdPWVbc10pO2lmKG51bGwhPWUmJiJmdW5jdGlvbiI9PXR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKXt2YXIgbz0wO2ZvcihzPU9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZSk7bzxzLmxlbmd0aDtvKyspdC5pbmRleE9mKHNbb10pPDAmJk9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChlLHNbb10pJiYocltzW29dXT1lW3Nbb11dKX1yZXR1cm4gcn0oZSxbImNsaWVudElkIl0pO3JldHVybiBuZXcgVVJMU2VhcmNoUGFyYW1zKChlPT5PYmplY3Qua2V5cyhlKS5maWx0ZXIoKHQ9PnZvaWQgMCE9PWVbdF0pKS5yZWR1Y2UoKCh0LHIpPT5PYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sdCkse1tyXTplW3JdfSkpLHt9KSkoT2JqZWN0LmFzc2lnbih7Y2xpZW50X2lkOnR9LHIpKSkudG9TdHJpbmcoKX07bGV0IG89e307Y29uc3Qgbj0oZSx0KT0+YCR7ZX18JHt0fWA7YWRkRXZlbnRMaXN0ZW5lcigibWVzc2FnZSIsKGFzeW5jKHtkYXRhOnt0aW1lb3V0OmUsYXV0aDpyLGZldGNoVXJsOmksZmV0Y2hPcHRpb25zOmMsdXNlRm9ybURhdGE6YX0scG9ydHM6W3BdfSk9PntsZXQgZjtjb25zdHthdWRpZW5jZTp1LHNjb3BlOmx9PXJ8fHt9O3RyeXtjb25zdCByPWE/KGU9Pntjb25zdCB0PW5ldyBVUkxTZWFyY2hQYXJhbXMoZSkscj17fTtyZXR1cm4gdC5mb3JFYWNoKCgoZSx0KT0+e3JbdF09ZX0pKSxyfSkoYy5ib2R5KTpKU09OLnBhcnNlKGMuYm9keSk7aWYoIXIucmVmcmVzaF90b2tlbiYmInJlZnJlc2hfdG9rZW4iPT09ci5ncmFudF90eXBlKXtjb25zdCBlPSgoZSx0KT0+b1tuKGUsdCldKSh1LGwpO2lmKCFlKXRocm93IG5ldyB0KHUsbCk7Yy5ib2R5PWE/cyhPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30scikse3JlZnJlc2hfdG9rZW46ZX0pKTpKU09OLnN0cmluZ2lmeShPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30scikse3JlZnJlc2hfdG9rZW46ZX0pKX1sZXQgaCxnOyJmdW5jdGlvbiI9PXR5cGVvZiBBYm9ydENvbnRyb2xsZXImJihoPW5ldyBBYm9ydENvbnRyb2xsZXIsYy5zaWduYWw9aC5zaWduYWwpO3RyeXtnPWF3YWl0IFByb21pc2UucmFjZShbKGQ9ZSxuZXcgUHJvbWlzZSgoZT0+c2V0VGltZW91dChlLGQpKSkpLGZldGNoKGksT2JqZWN0LmFzc2lnbih7fSxjKSldKX1jYXRjaChlKXtyZXR1cm4gdm9pZCBwLnBvc3RNZXNzYWdlKHtlcnJvcjplLm1lc3NhZ2V9KX1pZighZylyZXR1cm4gaCYmaC5hYm9ydCgpLHZvaWQgcC5wb3N0TWVzc2FnZSh7ZXJyb3I6IlRpbWVvdXQgd2hlbiBleGVjdXRpbmcgJ2ZldGNoJyJ9KTtmPWF3YWl0IGcuanNvbigpLGYucmVmcmVzaF90b2tlbj8oKChlLHQscik9PntvW24odCxyKV09ZX0pKGYucmVmcmVzaF90b2tlbix1LGwpLGRlbGV0ZSBmLnJlZnJlc2hfdG9rZW4pOigoZSx0KT0+e2RlbGV0ZSBvW24oZSx0KV19KSh1LGwpLHAucG9zdE1lc3NhZ2Uoe29rOmcub2ssanNvbjpmfSl9Y2F0Y2goZSl7cC5wb3N0TWVzc2FnZSh7b2s6ITEsanNvbjp7ZXJyb3I6ZS5lcnJvcixlcnJvcl9kZXNjcmlwdGlvbjplLm1lc3NhZ2V9fSl9dmFyIGR9KSl9KCk7Cgo=", null, false, function(e) {
  return H = H || function(e2, t, i) {
    var o = void 0 === t ? null : t, n2 = function(e3, t2) {
      var i2 = atob(e3);
      if (t2) {
        for (var o2 = new Uint8Array(i2.length), n3 = 0, a3 = i2.length; n3 < a3; ++n3) o2[n3] = i2.charCodeAt(n3);
        return String.fromCharCode.apply(null, new Uint16Array(o2.buffer));
      }
      return i2;
    }(e2, void 0 !== i && i), a2 = n2.indexOf("\n", 10) + 1, s2 = n2.substring(a2) + (o ? "//# sourceMappingURL=" + o : ""), r2 = new Blob([s2], { type: "application/javascript" });
    return URL.createObjectURL(r2);
  }("Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwohZnVuY3Rpb24oKXsidXNlIHN0cmljdCI7Y2xhc3MgZSBleHRlbmRzIEVycm9ye2NvbnN0cnVjdG9yKHQscil7c3VwZXIociksdGhpcy5lcnJvcj10LHRoaXMuZXJyb3JfZGVzY3JpcHRpb249cixPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcyxlLnByb3RvdHlwZSl9c3RhdGljIGZyb21QYXlsb2FkKHtlcnJvcjp0LGVycm9yX2Rlc2NyaXB0aW9uOnJ9KXtyZXR1cm4gbmV3IGUodCxyKX19Y2xhc3MgdCBleHRlbmRzIGV7Y29uc3RydWN0b3IoZSxzKXtzdXBlcigibWlzc2luZ19yZWZyZXNoX3Rva2VuIixgTWlzc2luZyBSZWZyZXNoIFRva2VuIChhdWRpZW5jZTogJyR7cihlLFsiZGVmYXVsdCJdKX0nLCBzY29wZTogJyR7cihzKX0nKWApLHRoaXMuYXVkaWVuY2U9ZSx0aGlzLnNjb3BlPXMsT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsdC5wcm90b3R5cGUpfX1mdW5jdGlvbiByKGUsdD1bXSl7cmV0dXJuIGUmJiF0LmluY2x1ZGVzKGUpP2U6IiJ9ImZ1bmN0aW9uIj09dHlwZW9mIFN1cHByZXNzZWRFcnJvciYmU3VwcHJlc3NlZEVycm9yO2NvbnN0IHM9ZT0+e3ZhcntjbGllbnRJZDp0fT1lLHI9ZnVuY3Rpb24oZSx0KXt2YXIgcj17fTtmb3IodmFyIHMgaW4gZSlPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSxzKSYmdC5pbmRleE9mKHMpPDAmJihyW3NdPWVbc10pO2lmKG51bGwhPWUmJiJmdW5jdGlvbiI9PXR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKXt2YXIgbz0wO2ZvcihzPU9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZSk7bzxzLmxlbmd0aDtvKyspdC5pbmRleE9mKHNbb10pPDAmJk9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChlLHNbb10pJiYocltzW29dXT1lW3Nbb11dKX1yZXR1cm4gcn0oZSxbImNsaWVudElkIl0pO3JldHVybiBuZXcgVVJMU2VhcmNoUGFyYW1zKChlPT5PYmplY3Qua2V5cyhlKS5maWx0ZXIoKHQ9PnZvaWQgMCE9PWVbdF0pKS5yZWR1Y2UoKCh0LHIpPT5PYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sdCkse1tyXTplW3JdfSkpLHt9KSkoT2JqZWN0LmFzc2lnbih7Y2xpZW50X2lkOnR9LHIpKSkudG9TdHJpbmcoKX07bGV0IG89e307Y29uc3Qgbj0oZSx0KT0+YCR7ZX18JHt0fWA7YWRkRXZlbnRMaXN0ZW5lcigibWVzc2FnZSIsKGFzeW5jKHtkYXRhOnt0aW1lb3V0OmUsYXV0aDpyLGZldGNoVXJsOmksZmV0Y2hPcHRpb25zOmMsdXNlRm9ybURhdGE6YX0scG9ydHM6W3BdfSk9PntsZXQgZjtjb25zdHthdWRpZW5jZTp1LHNjb3BlOmx9PXJ8fHt9O3RyeXtjb25zdCByPWE/KGU9Pntjb25zdCB0PW5ldyBVUkxTZWFyY2hQYXJhbXMoZSkscj17fTtyZXR1cm4gdC5mb3JFYWNoKCgoZSx0KT0+e3JbdF09ZX0pKSxyfSkoYy5ib2R5KTpKU09OLnBhcnNlKGMuYm9keSk7aWYoIXIucmVmcmVzaF90b2tlbiYmInJlZnJlc2hfdG9rZW4iPT09ci5ncmFudF90eXBlKXtjb25zdCBlPSgoZSx0KT0+b1tuKGUsdCldKSh1LGwpO2lmKCFlKXRocm93IG5ldyB0KHUsbCk7Yy5ib2R5PWE/cyhPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30scikse3JlZnJlc2hfdG9rZW46ZX0pKTpKU09OLnN0cmluZ2lmeShPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30scikse3JlZnJlc2hfdG9rZW46ZX0pKX1sZXQgaCxnOyJmdW5jdGlvbiI9PXR5cGVvZiBBYm9ydENvbnRyb2xsZXImJihoPW5ldyBBYm9ydENvbnRyb2xsZXIsYy5zaWduYWw9aC5zaWduYWwpO3RyeXtnPWF3YWl0IFByb21pc2UucmFjZShbKGQ9ZSxuZXcgUHJvbWlzZSgoZT0+c2V0VGltZW91dChlLGQpKSkpLGZldGNoKGksT2JqZWN0LmFzc2lnbih7fSxjKSldKX1jYXRjaChlKXtyZXR1cm4gdm9pZCBwLnBvc3RNZXNzYWdlKHtlcnJvcjplLm1lc3NhZ2V9KX1pZighZylyZXR1cm4gaCYmaC5hYm9ydCgpLHZvaWQgcC5wb3N0TWVzc2FnZSh7ZXJyb3I6IlRpbWVvdXQgd2hlbiBleGVjdXRpbmcgJ2ZldGNoJyJ9KTtmPWF3YWl0IGcuanNvbigpLGYucmVmcmVzaF90b2tlbj8oKChlLHQscik9PntvW24odCxyKV09ZX0pKGYucmVmcmVzaF90b2tlbix1LGwpLGRlbGV0ZSBmLnJlZnJlc2hfdG9rZW4pOigoZSx0KT0+e2RlbGV0ZSBvW24oZSx0KV19KSh1LGwpLHAucG9zdE1lc3NhZ2Uoe29rOmcub2ssanNvbjpmfSl9Y2F0Y2goZSl7cC5wb3N0TWVzc2FnZSh7b2s6ITEsanNvbjp7ZXJyb3I6ZS5lcnJvcixlcnJvcl9kZXNjcmlwdGlvbjplLm1lc3NhZ2V9fSl9dmFyIGR9KSl9KCk7Cgo=", null, false), new Worker(H, e);
});
var D = {};
var B = class {
  constructor(e, t) {
    this.cache = e, this.clientId = t, this.manifestKey = this.createManifestKeyFrom(this.clientId);
  }
  async add(e) {
    var t;
    const i = new Set((null === (t = await this.cache.get(this.manifestKey)) || void 0 === t ? void 0 : t.keys) || []);
    i.add(e), await this.cache.set(this.manifestKey, { keys: [...i] });
  }
  async remove(e) {
    const t = await this.cache.get(this.manifestKey);
    if (t) {
      const i = new Set(t.keys);
      return i.delete(e), i.size > 0 ? await this.cache.set(this.manifestKey, { keys: [...i] }) : await this.cache.remove(this.manifestKey);
    }
  }
  get() {
    return this.cache.get(this.manifestKey);
  }
  clear() {
    return this.cache.remove(this.manifestKey);
  }
  createManifestKeyFrom(e) {
    return `@@auth0spajs@@::${e}`;
  }
};
var M = { memory: () => new z().enclosedCache, localstorage: () => new X() };
var A = (e) => M[e];
var $ = (e) => {
  const { openUrl: t, onRedirect: i } = e, o = a(e, ["openUrl", "onRedirect"]);
  return Object.assign(Object.assign({}, o), { openUrl: false === t || t ? t : i });
};
var Q = new d();
var q = class {
  constructor(e) {
    let t, i;
    if (this.userCache = new z().enclosedCache, this.defaultOptions = { authorizationParams: { scope: "openid profile email" }, useRefreshTokensFallback: false, useFormData: true }, this._releaseLockOnPageHide = async () => {
      await Q.releaseLock("auth0.lock.getTokenSilently"), window.removeEventListener("pagehide", this._releaseLockOnPageHide);
    }, this.options = Object.assign(Object.assign(Object.assign({}, this.defaultOptions), e), { authorizationParams: Object.assign(Object.assign({}, this.defaultOptions.authorizationParams), e.authorizationParams) }), "undefined" != typeof window && (() => {
      if (!_()) throw new Error("For security reasons, `window.crypto` is required to run `auth0-spa-js`.");
      if (void 0 === _().subtle) throw new Error("\n      auth0-spa-js must run on a secure origin. See https://github.com/auth0/auth0-spa-js/blob/main/FAQ.md#why-do-i-get-auth0-spa-js-must-run-on-a-secure-origin for more information.\n    ");
    })(), e.cache && e.cacheLocation && console.warn("Both `cache` and `cacheLocation` options have been specified in the Auth0Client configuration; ignoring `cacheLocation` and using `cache`."), e.cache) i = e.cache;
    else {
      if (t = e.cacheLocation || "memory", !A(t)) throw new Error(`Invalid cache location "${t}"`);
      i = A(t)();
    }
    this.httpTimeoutMs = e.httpTimeoutInSeconds ? 1e3 * e.httpTimeoutInSeconds : 1e4, this.cookieStorage = false === e.legacySameSiteCookie ? V : U, this.orgHintCookieName = `auth0.${this.options.clientId}.organization_hint`, this.isAuthenticatedCookieName = ((e2) => `auth0.${this.options.clientId}.is.authenticated`)(), this.sessionCheckExpiryDays = e.sessionCheckExpiryDays || 1;
    const o = e.useCookiesForTransactions ? this.cookieStorage : E;
    var n2;
    this.scope = P("openid", this.options.authorizationParams.scope, this.options.useRefreshTokens ? "offline_access" : ""), this.transactionManager = new R(o, this.options.clientId, this.options.cookieDomain), this.nowProvider = this.options.nowProvider || p, this.cacheManager = new K(i, i.allKeys ? void 0 : new B(i, this.options.clientId), this.nowProvider), this.domainUrl = (n2 = this.options.domain, /^https?:\/\//.test(n2) ? n2 : `https://${n2}`), this.tokenIssuer = ((e2, t2) => e2 ? e2.startsWith("https://") ? e2 : `https://${e2}/` : `${t2}/`)(this.options.issuer, this.domainUrl), "undefined" != typeof window && window.Worker && this.options.useRefreshTokens && "memory" === t && (this.options.workerUrl ? this.worker = new Worker(this.options.workerUrl) : this.worker = new F());
  }
  _url(e) {
    const t = encodeURIComponent(btoa(JSON.stringify(this.options.auth0Client || h)));
    return `${this.domainUrl}${e}&auth0Client=${t}`;
  }
  _authorizeUrl(e) {
    return this._url(`/authorize?${Z(e)}`);
  }
  async _verifyIdToken(e, t, i) {
    const o = await this.nowProvider();
    return ((e2) => {
      if (!e2.id_token) throw new Error("ID token is required but missing");
      const t2 = ((e3) => {
        const t3 = e3.split("."), [i3, o3, n4] = t3;
        if (3 !== t3.length || !i3 || !o3 || !n4) throw new Error("ID token could not be decoded");
        const a2 = JSON.parse(W(o3)), s2 = { __raw: e3 }, r2 = {};
        return Object.keys(a2).forEach((e4) => {
          s2[e4] = a2[e4], N.includes(e4) || (r2[e4] = a2[e4]);
        }), { encoded: { header: i3, payload: o3, signature: n4 }, header: JSON.parse(W(i3)), claims: s2, user: r2 };
      })(e2.id_token);
      if (!t2.claims.iss) throw new Error("Issuer (iss) claim must be a string present in the ID token");
      if (t2.claims.iss !== e2.iss) throw new Error(`Issuer (iss) claim mismatch in the ID token; expected "${e2.iss}", found "${t2.claims.iss}"`);
      if (!t2.user.sub) throw new Error("Subject (sub) claim must be a string present in the ID token");
      if ("RS256" !== t2.header.alg) throw new Error(`Signature algorithm of "${t2.header.alg}" is not supported. Expected the ID token to be signed with "RS256".`);
      if (!t2.claims.aud || "string" != typeof t2.claims.aud && !Array.isArray(t2.claims.aud)) throw new Error("Audience (aud) claim must be a string or array of strings present in the ID token");
      if (Array.isArray(t2.claims.aud)) {
        if (!t2.claims.aud.includes(e2.aud)) throw new Error(`Audience (aud) claim mismatch in the ID token; expected "${e2.aud}" but was not one of "${t2.claims.aud.join(", ")}"`);
        if (t2.claims.aud.length > 1) {
          if (!t2.claims.azp) throw new Error("Authorized Party (azp) claim must be a string present in the ID token when Audience (aud) claim has multiple values");
          if (t2.claims.azp !== e2.aud) throw new Error(`Authorized Party (azp) claim mismatch in the ID token; expected "${e2.aud}", found "${t2.claims.azp}"`);
        }
      } else if (t2.claims.aud !== e2.aud) throw new Error(`Audience (aud) claim mismatch in the ID token; expected "${e2.aud}" but found "${t2.claims.aud}"`);
      if (e2.nonce) {
        if (!t2.claims.nonce) throw new Error("Nonce (nonce) claim must be a string present in the ID token");
        if (t2.claims.nonce !== e2.nonce) throw new Error(`Nonce (nonce) claim mismatch in the ID token; expected "${e2.nonce}", found "${t2.claims.nonce}"`);
      }
      if (e2.max_age && !x(t2.claims.auth_time)) throw new Error("Authentication Time (auth_time) claim must be a number present in the ID token when Max Age (max_age) is specified");
      if (null == t2.claims.exp || !x(t2.claims.exp)) throw new Error("Expiration Time (exp) claim must be a number present in the ID token");
      if (!x(t2.claims.iat)) throw new Error("Issued At (iat) claim must be a number present in the ID token");
      const i2 = e2.leeway || 60, o2 = new Date(e2.now || Date.now()), n3 = /* @__PURE__ */ new Date(0);
      if (n3.setUTCSeconds(t2.claims.exp + i2), o2 > n3) throw new Error(`Expiration Time (exp) claim error in the ID token; current time (${o2}) is after expiration time (${n3})`);
      if (null != t2.claims.nbf && x(t2.claims.nbf)) {
        const e3 = /* @__PURE__ */ new Date(0);
        if (e3.setUTCSeconds(t2.claims.nbf - i2), o2 < e3) throw new Error(`Not Before time (nbf) claim in the ID token indicates that this token can't be used just yet. Current time (${o2}) is before ${e3}`);
      }
      if (null != t2.claims.auth_time && x(t2.claims.auth_time)) {
        const n4 = /* @__PURE__ */ new Date(0);
        if (n4.setUTCSeconds(parseInt(t2.claims.auth_time) + e2.max_age + i2), o2 > n4) throw new Error(`Authentication Time (auth_time) claim in the ID token indicates that too much time has passed since the last end-user authentication. Current time (${o2}) is after last auth at ${n4}`);
      }
      if (e2.organization) {
        const i3 = e2.organization.trim();
        if (i3.startsWith("org_")) {
          const e3 = i3;
          if (!t2.claims.org_id) throw new Error("Organization ID (org_id) claim must be a string present in the ID token");
          if (e3 !== t2.claims.org_id) throw new Error(`Organization ID (org_id) claim mismatch in the ID token; expected "${e3}", found "${t2.claims.org_id}"`);
        } else {
          const e3 = i3.toLowerCase();
          if (!t2.claims.org_name) throw new Error("Organization Name (org_name) claim must be a string present in the ID token");
          if (e3 !== t2.claims.org_name) throw new Error(`Organization Name (org_name) claim mismatch in the ID token; expected "${e3}", found "${t2.claims.org_name}"`);
        }
      }
      return t2;
    })({ iss: this.tokenIssuer, aud: this.options.clientId, id_token: e, nonce: t, organization: i, leeway: this.options.leeway, max_age: (n2 = this.options.authorizationParams.max_age, "string" != typeof n2 ? n2 : parseInt(n2, 10) || void 0), now: o });
    var n2;
  }
  _processOrgHint(e) {
    e ? this.cookieStorage.save(this.orgHintCookieName, e, { daysUntilExpire: this.sessionCheckExpiryDays, cookieDomain: this.options.cookieDomain }) : this.cookieStorage.remove(this.orgHintCookieName, { cookieDomain: this.options.cookieDomain });
  }
  async _prepareAuthorizeUrl(e, t, i) {
    const o = S(I()), n2 = S(I()), a2 = I(), s2 = ((e2) => {
      const t2 = new Uint8Array(e2);
      return ((e3) => {
        const t3 = { "+": "-", "/": "_", "=": "" };
        return e3.replace(/[+/=]/g, (e4) => t3[e4]);
      })(window.btoa(String.fromCharCode(...Array.from(t2))));
    })(await (async (e2) => {
      const t2 = _().subtle.digest({ name: "SHA-256" }, new TextEncoder().encode(e2));
      return await t2;
    })(a2)), r2 = ((e2, t2, i2, o2, n3, a3, s3, r3) => Object.assign(Object.assign(Object.assign({ client_id: e2.clientId }, e2.authorizationParams), i2), { scope: P(t2, i2.scope), response_type: "code", response_mode: r3 || "query", state: o2, nonce: n3, redirect_uri: s3 || e2.authorizationParams.redirect_uri, code_challenge: a3, code_challenge_method: "S256" }))(this.options, this.scope, e, o, n2, s2, e.redirect_uri || this.options.authorizationParams.redirect_uri || i, null == t ? void 0 : t.response_mode), c2 = this._authorizeUrl(r2);
    return { nonce: n2, code_verifier: a2, scope: r2.scope, audience: r2.audience || "default", redirect_uri: r2.redirect_uri, state: o, url: c2 };
  }
  async loginWithPopup(e, t) {
    var i;
    if (e = e || {}, !(t = t || {}).popup && (t.popup = ((e2) => {
      const t2 = window.screenX + (window.innerWidth - 400) / 2, i2 = window.screenY + (window.innerHeight - 600) / 2;
      return window.open("", "auth0:authorize:popup", `left=${t2},top=${i2},width=400,height=600,resizable,scrollbars=yes,status=1`);
    })(), !t.popup)) throw new Error("Unable to open a popup for loginWithPopup - window.open returned `null`");
    const o = await this._prepareAuthorizeUrl(e.authorizationParams || {}, { response_mode: "web_message" }, window.location.origin);
    t.popup.location.href = o.url;
    const n2 = await ((e2) => new Promise((t2, i2) => {
      let o2;
      const n3 = setInterval(() => {
        e2.popup && e2.popup.closed && (clearInterval(n3), clearTimeout(a3), window.removeEventListener("message", o2, false), i2(new w(e2.popup)));
      }, 1e3), a3 = setTimeout(() => {
        clearInterval(n3), i2(new y(e2.popup)), window.removeEventListener("message", o2, false);
      }, 1e3 * (e2.timeoutInSeconds || 60));
      o2 = function(s2) {
        if (s2.data && "authorization_response" === s2.data.type) {
          if (clearTimeout(a3), clearInterval(n3), window.removeEventListener("message", o2, false), e2.popup.close(), s2.data.response.error) return i2(m.fromPayload(s2.data.response));
          t2(s2.data.response);
        }
      }, window.addEventListener("message", o2);
    }))(Object.assign(Object.assign({}, t), { timeoutInSeconds: t.timeoutInSeconds || this.options.authorizeTimeoutInSeconds || 60 }));
    if (o.state !== n2.state) throw new m("state_mismatch", "Invalid state");
    const a2 = (null === (i = e.authorizationParams) || void 0 === i ? void 0 : i.organization) || this.options.authorizationParams.organization;
    await this._requestToken({ audience: o.audience, scope: o.scope, code_verifier: o.code_verifier, grant_type: "authorization_code", code: n2.code, redirect_uri: o.redirect_uri }, { nonceIn: o.nonce, organization: a2 });
  }
  async getUser() {
    var e;
    const t = await this._getIdTokenFromCache();
    return null === (e = null == t ? void 0 : t.decodedToken) || void 0 === e ? void 0 : e.user;
  }
  async getIdTokenClaims() {
    var e;
    const t = await this._getIdTokenFromCache();
    return null === (e = null == t ? void 0 : t.decodedToken) || void 0 === e ? void 0 : e.claims;
  }
  async loginWithRedirect(e = {}) {
    var t;
    const i = $(e), { openUrl: o, fragment: n2, appState: s2 } = i, r2 = a(i, ["openUrl", "fragment", "appState"]), c2 = (null === (t = r2.authorizationParams) || void 0 === t ? void 0 : t.organization) || this.options.authorizationParams.organization, l2 = await this._prepareAuthorizeUrl(r2.authorizationParams || {}), { url: d2 } = l2, u2 = a(l2, ["url"]);
    this.transactionManager.create(Object.assign(Object.assign(Object.assign({}, u2), { appState: s2 }), c2 && { organization: c2 }));
    const h2 = n2 ? `${d2}#${n2}` : d2;
    o ? await o(h2) : window.location.assign(h2);
  }
  async handleRedirectCallback(e = window.location.href) {
    const t = e.split("?").slice(1);
    if (0 === t.length) throw new Error("There are no query params available for parsing.");
    const { state: i, code: o, error: n2, error_description: a2 } = ((e2) => {
      e2.indexOf("#") > -1 && (e2 = e2.substring(0, e2.indexOf("#")));
      const t2 = new URLSearchParams(e2);
      return { state: t2.get("state"), code: t2.get("code") || void 0, error: t2.get("error") || void 0, error_description: t2.get("error_description") || void 0 };
    })(t.join("")), s2 = this.transactionManager.get();
    if (!s2) throw new m("missing_transaction", "Invalid state");
    if (this.transactionManager.remove(), n2) throw new g(n2, a2 || n2, i, s2.appState);
    if (!s2.code_verifier || s2.state && s2.state !== i) throw new m("state_mismatch", "Invalid state");
    const r2 = s2.organization, c2 = s2.nonce, l2 = s2.redirect_uri;
    return await this._requestToken(Object.assign({ audience: s2.audience, scope: s2.scope, code_verifier: s2.code_verifier, grant_type: "authorization_code", code: o }, l2 ? { redirect_uri: l2 } : {}), { nonceIn: c2, organization: r2 }), { appState: s2.appState };
  }
  async checkSession(e) {
    if (!this.cookieStorage.get(this.isAuthenticatedCookieName)) {
      if (!this.cookieStorage.get("auth0.is.authenticated")) return;
      this.cookieStorage.save(this.isAuthenticatedCookieName, true, { daysUntilExpire: this.sessionCheckExpiryDays, cookieDomain: this.options.cookieDomain }), this.cookieStorage.remove("auth0.is.authenticated");
    }
    try {
      await this.getTokenSilently(e);
    } catch (e2) {
    }
  }
  async getTokenSilently(e = {}) {
    var t;
    const i = Object.assign(Object.assign({ cacheMode: "on" }, e), { authorizationParams: Object.assign(Object.assign(Object.assign({}, this.options.authorizationParams), e.authorizationParams), { scope: P(this.scope, null === (t = e.authorizationParams) || void 0 === t ? void 0 : t.scope) }) }), o = await ((e2, t2) => {
      let i2 = D[t2];
      return i2 || (i2 = e2().finally(() => {
        delete D[t2], i2 = null;
      }), D[t2] = i2), i2;
    })(() => this._getTokenSilently(i), `${this.options.clientId}::${i.authorizationParams.audience}::${i.authorizationParams.scope}`);
    return e.detailedResponse ? o : null == o ? void 0 : o.access_token;
  }
  async _getTokenSilently(e) {
    const { cacheMode: t } = e, i = a(e, ["cacheMode"]);
    if ("off" !== t) {
      const e2 = await this._getEntryFromCache({ scope: i.authorizationParams.scope, audience: i.authorizationParams.audience || "default", clientId: this.options.clientId });
      if (e2) return e2;
    }
    if ("cache-only" !== t) {
      if (!await (async (e2, t2 = 3) => {
        for (let i2 = 0; i2 < t2; i2++) if (await e2()) return true;
        return false;
      })(() => Q.acquireLock("auth0.lock.getTokenSilently", 5e3), 10)) throw new f();
      try {
        if (window.addEventListener("pagehide", this._releaseLockOnPageHide), "off" !== t) {
          const e3 = await this._getEntryFromCache({ scope: i.authorizationParams.scope, audience: i.authorizationParams.audience || "default", clientId: this.options.clientId });
          if (e3) return e3;
        }
        const e2 = this.options.useRefreshTokens ? await this._getTokenUsingRefreshToken(i) : await this._getTokenFromIFrame(i), { id_token: o, access_token: n2, oauthTokenScope: a2, expires_in: s2 } = e2;
        return Object.assign(Object.assign({ id_token: o, access_token: n2 }, a2 ? { scope: a2 } : null), { expires_in: s2 });
      } finally {
        await Q.releaseLock("auth0.lock.getTokenSilently"), window.removeEventListener("pagehide", this._releaseLockOnPageHide);
      }
    }
  }
  async getTokenWithPopup(e = {}, t = {}) {
    var i;
    const o = Object.assign(Object.assign({}, e), { authorizationParams: Object.assign(Object.assign(Object.assign({}, this.options.authorizationParams), e.authorizationParams), { scope: P(this.scope, null === (i = e.authorizationParams) || void 0 === i ? void 0 : i.scope) }) });
    return t = Object.assign(Object.assign({}, u), t), await this.loginWithPopup(o, t), (await this.cacheManager.get(new O({ scope: o.authorizationParams.scope, audience: o.authorizationParams.audience || "default", clientId: this.options.clientId }))).access_token;
  }
  async isAuthenticated() {
    return !!await this.getUser();
  }
  _buildLogoutUrl(e) {
    null !== e.clientId ? e.clientId = e.clientId || this.options.clientId : delete e.clientId;
    const t = e.logoutParams || {}, { federated: i } = t, o = a(t, ["federated"]), n2 = i ? "&federated" : "";
    return this._url(`/v2/logout?${Z(Object.assign({ clientId: e.clientId }, o))}`) + n2;
  }
  async logout(e = {}) {
    const t = $(e), { openUrl: i } = t, o = a(t, ["openUrl"]);
    null === e.clientId ? await this.cacheManager.clear() : await this.cacheManager.clear(e.clientId || this.options.clientId), this.cookieStorage.remove(this.orgHintCookieName, { cookieDomain: this.options.cookieDomain }), this.cookieStorage.remove(this.isAuthenticatedCookieName, { cookieDomain: this.options.cookieDomain }), this.userCache.remove("@@user@@");
    const n2 = this._buildLogoutUrl(o);
    i ? await i(n2) : false !== i && window.location.assign(n2);
  }
  async _getTokenFromIFrame(e) {
    const t = Object.assign(Object.assign({}, e.authorizationParams), { prompt: "none" }), i = this.cookieStorage.get(this.orgHintCookieName);
    i && !t.organization && (t.organization = i);
    const { url: o, state: n2, nonce: a2, code_verifier: s2, redirect_uri: r2, scope: c2, audience: l2 } = await this._prepareAuthorizeUrl(t, { response_mode: "web_message" }, window.location.origin);
    try {
      if (window.crossOriginIsolated) throw new m("login_required", "The application is running in a Cross-Origin Isolated context, silently retrieving a token without refresh token is not possible.");
      const i2 = e.timeoutInSeconds || this.options.authorizeTimeoutInSeconds, d2 = await ((e2, t2, i3 = 60) => new Promise((o2, n3) => {
        const a3 = window.document.createElement("iframe");
        a3.setAttribute("width", "0"), a3.setAttribute("height", "0"), a3.style.display = "none";
        const s3 = () => {
          window.document.body.contains(a3) && (window.document.body.removeChild(a3), window.removeEventListener("message", r3, false));
        };
        let r3;
        const c3 = setTimeout(() => {
          n3(new f()), s3();
        }, 1e3 * i3);
        r3 = function(e3) {
          if (e3.origin != t2) return;
          if (!e3.data || "authorization_response" !== e3.data.type) return;
          const i4 = e3.source;
          i4 && i4.close(), e3.data.response.error ? n3(m.fromPayload(e3.data.response)) : o2(e3.data.response), clearTimeout(c3), window.removeEventListener("message", r3, false), setTimeout(s3, 2e3);
        }, window.addEventListener("message", r3, false), window.document.body.appendChild(a3), a3.setAttribute("src", e2);
      }))(o, this.domainUrl, i2);
      if (n2 !== d2.state) throw new m("state_mismatch", "Invalid state");
      const u2 = await this._requestToken(Object.assign(Object.assign({}, e.authorizationParams), { code_verifier: s2, code: d2.code, grant_type: "authorization_code", redirect_uri: r2, timeout: e.authorizationParams.timeout || this.httpTimeoutMs }), { nonceIn: a2, organization: t.organization });
      return Object.assign(Object.assign({}, u2), { scope: c2, oauthTokenScope: u2.scope, audience: l2 });
    } catch (e2) {
      throw "login_required" === e2.error && this.logout({ openUrl: false }), e2;
    }
  }
  async _getTokenUsingRefreshToken(e) {
    const t = await this.cacheManager.get(new O({ scope: e.authorizationParams.scope, audience: e.authorizationParams.audience || "default", clientId: this.options.clientId }));
    if (!(t && t.refresh_token || this.worker)) {
      if (this.options.useRefreshTokensFallback) return await this._getTokenFromIFrame(e);
      throw new v(e.authorizationParams.audience || "default", e.authorizationParams.scope);
    }
    const i = e.authorizationParams.redirect_uri || this.options.authorizationParams.redirect_uri || window.location.origin, o = "number" == typeof e.timeoutInSeconds ? 1e3 * e.timeoutInSeconds : null;
    try {
      const n2 = await this._requestToken(Object.assign(Object.assign(Object.assign({}, e.authorizationParams), { grant_type: "refresh_token", refresh_token: t && t.refresh_token, redirect_uri: i }), o && { timeout: o }));
      return Object.assign(Object.assign({}, n2), { scope: e.authorizationParams.scope, oauthTokenScope: n2.scope, audience: e.authorizationParams.audience || "default" });
    } catch (t2) {
      if ((t2.message.indexOf("Missing Refresh Token") > -1 || t2.message && t2.message.indexOf("invalid refresh token") > -1) && this.options.useRefreshTokensFallback) return await this._getTokenFromIFrame(e);
      throw t2;
    }
  }
  async _saveEntryInCache(e) {
    const { id_token: t, decodedToken: i } = e, o = a(e, ["id_token", "decodedToken"]);
    this.userCache.set("@@user@@", { id_token: t, decodedToken: i }), await this.cacheManager.setIdToken(this.options.clientId, e.id_token, e.decodedToken), await this.cacheManager.set(o);
  }
  async _getIdTokenFromCache() {
    const e = this.options.authorizationParams.audience || "default", t = await this.cacheManager.getIdToken(new O({ clientId: this.options.clientId, audience: e, scope: this.scope })), i = this.userCache.get("@@user@@");
    return t && t.id_token === (null == i ? void 0 : i.id_token) ? i : (this.userCache.set("@@user@@", t), t);
  }
  async _getEntryFromCache({ scope: e, audience: t, clientId: i }) {
    const o = await this.cacheManager.get(new O({ scope: e, audience: t, clientId: i }), 60);
    if (o && o.access_token) {
      const { access_token: e2, oauthTokenScope: t2, expires_in: i2 } = o, n2 = await this._getIdTokenFromCache();
      return n2 && Object.assign(Object.assign({ id_token: n2.id_token, access_token: e2 }, t2 ? { scope: t2 } : null), { expires_in: i2 });
    }
  }
  async _requestToken(e, t) {
    const { nonceIn: i, organization: o } = t || {}, n2 = await j(Object.assign({ baseUrl: this.domainUrl, client_id: this.options.clientId, auth0Client: this.options.auth0Client, useFormData: this.options.useFormData, timeout: this.httpTimeoutMs }, e), this.worker), a2 = await this._verifyIdToken(n2.id_token, i, o);
    return await this._saveEntryInCache(Object.assign(Object.assign(Object.assign(Object.assign({}, n2), { decodedToken: a2, scope: e.scope, audience: e.audience || "default" }), n2.scope ? { oauthTokenScope: n2.scope } : null), { client_id: this.options.clientId })), this.cookieStorage.save(this.isAuthenticatedCookieName, true, { daysUntilExpire: this.sessionCheckExpiryDays, cookieDomain: this.options.cookieDomain }), this._processOrgHint(o || a2.claims.org_id), Object.assign(Object.assign({}, n2), { decodedToken: a2 });
  }
};
var ee = class {
};
function te(t) {
  return new Promise((i) => {
    !function(t2, i2) {
      const o = watchEffect(() => {
        t2() && (i2(), o());
      });
    }(t, i);
  });
}
function ie(e) {
  (null == e ? void 0 : e.redirect_uri) && (console.warn("Using `redirect_uri` has been deprecated, please use `authorizationParams.redirect_uri` instead as `redirectUri` will be no longer supported in a future version"), e.authorizationParams = e.authorizationParams || {}, e.authorizationParams.redirect_uri = e.redirect_uri, delete e.redirect_uri);
}
var oe = () => {
  console.error("Please ensure Auth0's Vue plugin is correctly installed.");
};
var ne = { isLoading: ref(false), isAuthenticated: ref(false), user: ref(void 0), idTokenClaims: ref(void 0), error: ref(null), loginWithPopup: oe, loginWithRedirect: oe, getAccessTokenSilently: oe, getAccessTokenWithPopup: oe, logout: oe, checkSession: oe, handleRedirectCallback: oe };
var ae = ref(ne);
var se = class {
  constructor(e, i) {
    var o, n2;
    this.clientOptions = e, this.pluginOptions = i, this.isLoading = ref(true), this.isAuthenticated = ref(false), this.user = ref({}), this.idTokenClaims = ref(), this.error = ref(null), o = this, n2 = ["constructor"], Object.getOwnPropertyNames(Object.getPrototypeOf(o)).filter((e2) => !n2.includes(e2)).forEach((e2) => o[e2] = o[e2].bind(o));
  }
  install(e) {
    this._client = new q(Object.assign(Object.assign({}, this.clientOptions), { auth0Client: { name: "auth0-vue", version: "2.3.1" } })), this.__checkSession(e.config.globalProperties.$router), e.config.globalProperties.$auth0 = this, e.provide(n, this), ae.value = this;
  }
  async loginWithRedirect(e) {
    return ie(e), this._client.loginWithRedirect(e);
  }
  async loginWithPopup(e, t) {
    return ie(e), this.__proxy(() => this._client.loginWithPopup(e, t));
  }
  async logout(e) {
    return (null == e ? void 0 : e.openUrl) || false === (null == e ? void 0 : e.openUrl) ? this.__proxy(() => this._client.logout(e)) : this._client.logout(e);
  }
  async getAccessTokenSilently(e = {}) {
    return ie(e), this.__proxy(() => this._client.getTokenSilently(e));
  }
  async getAccessTokenWithPopup(e, t) {
    return ie(e), this.__proxy(() => this._client.getTokenWithPopup(e, t));
  }
  async checkSession(e) {
    return this.__proxy(() => this._client.checkSession(e));
  }
  async handleRedirectCallback(e) {
    return this.__proxy(() => this._client.handleRedirectCallback(e));
  }
  async __checkSession(e) {
    var t, i, o;
    const n2 = window.location.search;
    try {
      if ((n2.includes("code=") || n2.includes("error=")) && n2.includes("state=") && !(null === (t = this.pluginOptions) || void 0 === t ? void 0 : t.skipRedirectCallback)) {
        const t2 = await this.handleRedirectCallback(), o2 = null == t2 ? void 0 : t2.appState, n3 = null !== (i = null == o2 ? void 0 : o2.target) && void 0 !== i ? i : "/";
        return window.history.replaceState({}, "", "/"), e && e.push(n3), t2;
      }
      await this.checkSession();
    } catch (t2) {
      window.history.replaceState({}, "", "/"), e && e.push((null === (o = this.pluginOptions) || void 0 === o ? void 0 : o.errorPath) || "/");
    }
  }
  async __refreshState() {
    this.isAuthenticated.value = await this._client.isAuthenticated(), this.user.value = await this._client.getUser(), this.idTokenClaims.value = await this._client.getIdTokenClaims(), this.isLoading.value = false;
  }
  async __proxy(e, t = true) {
    let i;
    try {
      i = await e(), this.error.value = null;
    } catch (e2) {
      throw this.error.value = e2, e2;
    } finally {
      t && await this.__refreshState();
    }
    return i;
  }
};
async function re(e, t, o) {
  const n2 = async () => !!unref(e.isAuthenticated) || (await e.loginWithRedirect(Object.assign({ appState: { target: t.fullPath } }, o)), false);
  return unref(e.isLoading) ? (await te(() => !unref(e.isLoading)), n2()) : n2();
}
function ce(e) {
  const { app: t, redirectLoginOptions: o } = !e || "config" in e ? { app: e, redirectLoginOptions: void 0 } : e;
  return async (e2) => re(t ? t.config.globalProperties.$auth0 : unref(ae), e2, o);
}
async function le(e) {
  return re(unref(ae), e);
}
function de(e, t) {
  return ie(e), new se(e, t);
}
function ue() {
  return inject(n);
}
export {
  n as AUTH0_INJECTION_KEY,
  se as Auth0Plugin,
  z as InMemoryCache,
  X as LocalStorageCache,
  ee as User,
  le as authGuard,
  de as createAuth0,
  ce as createAuthGuard,
  ue as useAuth0
};
//# sourceMappingURL=@auth0_auth0-vue.js.map