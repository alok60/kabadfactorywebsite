(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const n of document.querySelectorAll('link[rel="modulepreload"]')) a(n);
  new MutationObserver((n) => {
    for (const u of n)
      if (u.type === "childList")
        for (const c of u.addedNodes)
          c.tagName === "LINK" && c.rel === "modulepreload" && a(c);
  }).observe(document, { childList: !0, subtree: !0 });
  function l(n) {
    const u = {};
    return (
      n.integrity && (u.integrity = n.integrity),
      n.referrerPolicy && (u.referrerPolicy = n.referrerPolicy),
      n.crossOrigin === "use-credentials"
        ? (u.credentials = "include")
        : n.crossOrigin === "anonymous"
          ? (u.credentials = "omit")
          : (u.credentials = "same-origin"),
      u
    );
  }
  function a(n) {
    if (n.ep) return;
    n.ep = !0;
    const u = l(n);
    fetch(n.href, u);
  }
})();
var vf = { exports: {} },
  Hu = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var wh = Symbol.for("react.transitional.element"),
  Mh = Symbol.for("react.fragment");
function Sf(e, t, l) {
  var a = null;
  if (
    (l !== void 0 && (a = "" + l),
    t.key !== void 0 && (a = "" + t.key),
    "key" in t)
  ) {
    l = {};
    for (var n in t) n !== "key" && (l[n] = t[n]);
  } else l = t;
  return (
    (t = l.ref),
    { $$typeof: wh, type: e, key: a, ref: t !== void 0 ? t : null, props: l }
  );
}
Hu.Fragment = Mh;
Hu.jsx = Sf;
Hu.jsxs = Sf;
vf.exports = Hu;
var i = vf.exports,
  jf = { exports: {} },
  qu = {},
  Nf = { exports: {} },
  kf = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(j, O) {
    var M = j.length;
    j.push(O);
    e: for (; 0 < M; ) {
      var G = (M - 1) >>> 1,
        se = j[G];
      if (0 < n(se, O)) ((j[G] = O), (j[M] = se), (M = G));
      else break e;
    }
  }
  function l(j) {
    return j.length === 0 ? null : j[0];
  }
  function a(j) {
    if (j.length === 0) return null;
    var O = j[0],
      M = j.pop();
    if (M !== O) {
      j[0] = M;
      e: for (var G = 0, se = j.length, Tl = se >>> 1; G < Tl; ) {
        var El = 2 * (G + 1) - 1,
          zl = j[El],
          ot = El + 1,
          wl = j[ot];
        if (0 > n(zl, M))
          ot < se && 0 > n(wl, zl)
            ? ((j[G] = wl), (j[ot] = M), (G = ot))
            : ((j[G] = zl), (j[El] = M), (G = El));
        else if (ot < se && 0 > n(wl, M)) ((j[G] = wl), (j[ot] = M), (G = ot));
        else break e;
      }
    }
    return O;
  }
  function n(j, O) {
    var M = j.sortIndex - O.sortIndex;
    return M !== 0 ? M : j.id - O.id;
  }
  if (
    ((e.unstable_now = void 0),
    typeof performance == "object" && typeof performance.now == "function")
  ) {
    var u = performance;
    e.unstable_now = function () {
      return u.now();
    };
  } else {
    var c = Date,
      s = c.now();
    e.unstable_now = function () {
      return c.now() - s;
    };
  }
  var r = [],
    o = [],
    b = 1,
    y = null,
    d = 3,
    p = !1,
    N = !1,
    A = !1,
    H = !1,
    h = typeof setTimeout == "function" ? setTimeout : null,
    f = typeof clearTimeout == "function" ? clearTimeout : null,
    m = typeof setImmediate < "u" ? setImmediate : null;
  function g(j) {
    for (var O = l(o); O !== null; ) {
      if (O.callback === null) a(o);
      else if (O.startTime <= j)
        (a(o), (O.sortIndex = O.expirationTime), t(r, O));
      else break;
      O = l(o);
    }
  }
  function v(j) {
    if (((A = !1), g(j), !N))
      if (l(r) !== null) ((N = !0), E || ((E = !0), We()));
      else {
        var O = l(o);
        O !== null && Al(v, O.startTime - j);
      }
  }
  var E = !1,
    S = -1,
    T = 5,
    J = -1;
  function R() {
    return H ? !0 : !(e.unstable_now() - J < T);
  }
  function Ne() {
    if (((H = !1), E)) {
      var j = e.unstable_now();
      J = j;
      var O = !0;
      try {
        e: {
          ((N = !1), A && ((A = !1), f(S), (S = -1)), (p = !0));
          var M = d;
          try {
            t: {
              for (
                g(j), y = l(r);
                y !== null && !(y.expirationTime > j && R());
              ) {
                var G = y.callback;
                if (typeof G == "function") {
                  ((y.callback = null), (d = y.priorityLevel));
                  var se = G(y.expirationTime <= j);
                  if (((j = e.unstable_now()), typeof se == "function")) {
                    ((y.callback = se), g(j), (O = !0));
                    break t;
                  }
                  (y === l(r) && a(r), g(j));
                } else a(r);
                y = l(r);
              }
              if (y !== null) O = !0;
              else {
                var Tl = l(o);
                (Tl !== null && Al(v, Tl.startTime - j), (O = !1));
              }
            }
            break e;
          } finally {
            ((y = null), (d = M), (p = !1));
          }
          O = void 0;
        }
      } finally {
        O ? We() : (E = !1);
      }
    }
  }
  var We;
  if (typeof m == "function")
    We = function () {
      m(Ne);
    };
  else if (typeof MessageChannel < "u") {
    var Sa = new MessageChannel(),
      ja = Sa.port2;
    ((Sa.port1.onmessage = Ne),
      (We = function () {
        ja.postMessage(null);
      }));
  } else
    We = function () {
      h(Ne, 0);
    };
  function Al(j, O) {
    S = h(function () {
      j(e.unstable_now());
    }, O);
  }
  ((e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (j) {
      j.callback = null;
    }),
    (e.unstable_forceFrameRate = function (j) {
      0 > j || 125 < j
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
          )
        : (T = 0 < j ? Math.floor(1e3 / j) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return d;
    }),
    (e.unstable_next = function (j) {
      switch (d) {
        case 1:
        case 2:
        case 3:
          var O = 3;
          break;
        default:
          O = d;
      }
      var M = d;
      d = O;
      try {
        return j();
      } finally {
        d = M;
      }
    }),
    (e.unstable_requestPaint = function () {
      H = !0;
    }),
    (e.unstable_runWithPriority = function (j, O) {
      switch (j) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          j = 3;
      }
      var M = d;
      d = j;
      try {
        return O();
      } finally {
        d = M;
      }
    }),
    (e.unstable_scheduleCallback = function (j, O, M) {
      var G = e.unstable_now();
      switch (
        (typeof M == "object" && M !== null
          ? ((M = M.delay), (M = typeof M == "number" && 0 < M ? G + M : G))
          : (M = G),
        j)
      ) {
        case 1:
          var se = -1;
          break;
        case 2:
          se = 250;
          break;
        case 5:
          se = 1073741823;
          break;
        case 4:
          se = 1e4;
          break;
        default:
          se = 5e3;
      }
      return (
        (se = M + se),
        (j = {
          id: b++,
          callback: O,
          priorityLevel: j,
          startTime: M,
          expirationTime: se,
          sortIndex: -1,
        }),
        M > G
          ? ((j.sortIndex = M),
            t(o, j),
            l(r) === null &&
              j === l(o) &&
              (A ? (f(S), (S = -1)) : (A = !0), Al(v, M - G)))
          : ((j.sortIndex = se),
            t(r, j),
            N || p || ((N = !0), E || ((E = !0), We()))),
        j
      );
    }),
    (e.unstable_shouldYield = R),
    (e.unstable_wrapCallback = function (j) {
      var O = d;
      return function () {
        var M = d;
        d = O;
        try {
          return j.apply(this, arguments);
        } finally {
          d = M;
        }
      };
    }));
})(kf);
Nf.exports = kf;
var Oh = Nf.exports,
  Af = { exports: {} },
  D = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ci = Symbol.for("react.transitional.element"),
  Dh = Symbol.for("react.portal"),
  _h = Symbol.for("react.fragment"),
  Rh = Symbol.for("react.strict_mode"),
  Ch = Symbol.for("react.profiler"),
  Uh = Symbol.for("react.consumer"),
  Hh = Symbol.for("react.context"),
  qh = Symbol.for("react.forward_ref"),
  Bh = Symbol.for("react.suspense"),
  Gh = Symbol.for("react.memo"),
  Tf = Symbol.for("react.lazy"),
  Ys = Symbol.iterator;
function Yh(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Ys && e[Ys]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Ef = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  zf = Object.assign,
  wf = {};
function ma(e, t, l) {
  ((this.props = e),
    (this.context = t),
    (this.refs = wf),
    (this.updater = l || Ef));
}
ma.prototype.isReactComponent = {};
ma.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "takes an object of state variables to update or a function which returns an object of state variables.",
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
ma.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Mf() {}
Mf.prototype = ma.prototype;
function Ui(e, t, l) {
  ((this.props = e),
    (this.context = t),
    (this.refs = wf),
    (this.updater = l || Ef));
}
var Hi = (Ui.prototype = new Mf());
Hi.constructor = Ui;
zf(Hi, ma.prototype);
Hi.isPureReactComponent = !0;
var Qs = Array.isArray,
  P = { H: null, A: null, T: null, S: null, V: null },
  Of = Object.prototype.hasOwnProperty;
function qi(e, t, l, a, n, u) {
  return (
    (l = u.ref),
    { $$typeof: Ci, type: e, key: t, ref: l !== void 0 ? l : null, props: u }
  );
}
function Qh(e, t) {
  return qi(e.type, t, void 0, void 0, void 0, e.props);
}
function Bi(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Ci;
}
function Xh(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (l) {
      return t[l];
    })
  );
}
var Xs = /\/+/g;
function uc(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? Xh("" + e.key)
    : t.toString(36);
}
function Ks() {}
function Kh(e) {
  switch (e.status) {
    case "fulfilled":
      return e.value;
    case "rejected":
      throw e.reason;
    default:
      switch (
        (typeof e.status == "string"
          ? e.then(Ks, Ks)
          : ((e.status = "pending"),
            e.then(
              function (t) {
                e.status === "pending" &&
                  ((e.status = "fulfilled"), (e.value = t));
              },
              function (t) {
                e.status === "pending" &&
                  ((e.status = "rejected"), (e.reason = t));
              },
            )),
        e.status)
      ) {
        case "fulfilled":
          return e.value;
        case "rejected":
          throw e.reason;
      }
  }
  throw e;
}
function _l(e, t, l, a, n) {
  var u = typeof e;
  (u === "undefined" || u === "boolean") && (e = null);
  var c = !1;
  if (e === null) c = !0;
  else
    switch (u) {
      case "bigint":
      case "string":
      case "number":
        c = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case Ci:
          case Dh:
            c = !0;
            break;
          case Tf:
            return ((c = e._init), _l(c(e._payload), t, l, a, n));
        }
    }
  if (c)
    return (
      (n = n(e)),
      (c = a === "" ? "." + uc(e, 0) : a),
      Qs(n)
        ? ((l = ""),
          c != null && (l = c.replace(Xs, "$&/") + "/"),
          _l(n, t, l, "", function (o) {
            return o;
          }))
        : n != null &&
          (Bi(n) &&
            (n = Qh(
              n,
              l +
                (n.key == null || (e && e.key === n.key)
                  ? ""
                  : ("" + n.key).replace(Xs, "$&/") + "/") +
                c,
            )),
          t.push(n)),
      1
    );
  c = 0;
  var s = a === "" ? "." : a + ":";
  if (Qs(e))
    for (var r = 0; r < e.length; r++)
      ((a = e[r]), (u = s + uc(a, r)), (c += _l(a, t, l, u, n)));
  else if (((r = Yh(e)), typeof r == "function"))
    for (e = r.call(e), r = 0; !(a = e.next()).done; )
      ((a = a.value), (u = s + uc(a, r++)), (c += _l(a, t, l, u, n)));
  else if (u === "object") {
    if (typeof e.then == "function") return _l(Kh(e), t, l, a, n);
    throw (
      (t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead.",
      )
    );
  }
  return c;
}
function Dn(e, t, l) {
  if (e == null) return e;
  var a = [],
    n = 0;
  return (
    _l(e, a, "", "", function (u) {
      return t.call(l, u, n++);
    }),
    a
  );
}
function Zh(e) {
  if (e._status === -1) {
    var t = e._result;
    ((t = t()),
      t.then(
        function (l) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = l));
        },
        function (l) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = l));
        },
      ),
      e._status === -1 && ((e._status = 0), (e._result = t)));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var Zs =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        if (
          typeof window == "object" &&
          typeof window.ErrorEvent == "function"
        ) {
          var t = new window.ErrorEvent("error", {
            bubbles: !0,
            cancelable: !0,
            message:
              typeof e == "object" && e !== null && typeof e.message == "string"
                ? String(e.message)
                : String(e),
            error: e,
          });
          if (!window.dispatchEvent(t)) return;
        } else if (
          typeof process == "object" &&
          typeof process.emit == "function"
        ) {
          process.emit("uncaughtException", e);
          return;
        }
        console.error(e);
      };
function Lh() {}
D.Children = {
  map: Dn,
  forEach: function (e, t, l) {
    Dn(
      e,
      function () {
        t.apply(this, arguments);
      },
      l,
    );
  },
  count: function (e) {
    var t = 0;
    return (
      Dn(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      Dn(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!Bi(e))
      throw Error(
        "React.Children.only expected to receive a single React element child.",
      );
    return e;
  },
};
D.Component = ma;
D.Fragment = _h;
D.Profiler = Ch;
D.PureComponent = Ui;
D.StrictMode = Rh;
D.Suspense = Bh;
D.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = P;
D.__COMPILER_RUNTIME = {
  __proto__: null,
  c: function (e) {
    return P.H.useMemoCache(e);
  },
};
D.cache = function (e) {
  return function () {
    return e.apply(null, arguments);
  };
};
D.cloneElement = function (e, t, l) {
  if (e == null)
    throw Error(
      "The argument must be a React element, but you passed " + e + ".",
    );
  var a = zf({}, e.props),
    n = e.key,
    u = void 0;
  if (t != null)
    for (c in (t.ref !== void 0 && (u = void 0),
    t.key !== void 0 && (n = "" + t.key),
    t))
      !Of.call(t, c) ||
        c === "key" ||
        c === "__self" ||
        c === "__source" ||
        (c === "ref" && t.ref === void 0) ||
        (a[c] = t[c]);
  var c = arguments.length - 2;
  if (c === 1) a.children = l;
  else if (1 < c) {
    for (var s = Array(c), r = 0; r < c; r++) s[r] = arguments[r + 2];
    a.children = s;
  }
  return qi(e.type, n, void 0, void 0, u, a);
};
D.createContext = function (e) {
  return (
    (e = {
      $$typeof: Hh,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
    }),
    (e.Provider = e),
    (e.Consumer = { $$typeof: Uh, _context: e }),
    e
  );
};
D.createElement = function (e, t, l) {
  var a,
    n = {},
    u = null;
  if (t != null)
    for (a in (t.key !== void 0 && (u = "" + t.key), t))
      Of.call(t, a) &&
        a !== "key" &&
        a !== "__self" &&
        a !== "__source" &&
        (n[a] = t[a]);
  var c = arguments.length - 2;
  if (c === 1) n.children = l;
  else if (1 < c) {
    for (var s = Array(c), r = 0; r < c; r++) s[r] = arguments[r + 2];
    n.children = s;
  }
  if (e && e.defaultProps)
    for (a in ((c = e.defaultProps), c)) n[a] === void 0 && (n[a] = c[a]);
  return qi(e, u, void 0, void 0, null, n);
};
D.createRef = function () {
  return { current: null };
};
D.forwardRef = function (e) {
  return { $$typeof: qh, render: e };
};
D.isValidElement = Bi;
D.lazy = function (e) {
  return { $$typeof: Tf, _payload: { _status: -1, _result: e }, _init: Zh };
};
D.memo = function (e, t) {
  return { $$typeof: Gh, type: e, compare: t === void 0 ? null : t };
};
D.startTransition = function (e) {
  var t = P.T,
    l = {};
  P.T = l;
  try {
    var a = e(),
      n = P.S;
    (n !== null && n(l, a),
      typeof a == "object" &&
        a !== null &&
        typeof a.then == "function" &&
        a.then(Lh, Zs));
  } catch (u) {
    Zs(u);
  } finally {
    P.T = t;
  }
};
D.unstable_useCacheRefresh = function () {
  return P.H.useCacheRefresh();
};
D.use = function (e) {
  return P.H.use(e);
};
D.useActionState = function (e, t, l) {
  return P.H.useActionState(e, t, l);
};
D.useCallback = function (e, t) {
  return P.H.useCallback(e, t);
};
D.useContext = function (e) {
  return P.H.useContext(e);
};
D.useDebugValue = function () {};
D.useDeferredValue = function (e, t) {
  return P.H.useDeferredValue(e, t);
};
D.useEffect = function (e, t, l) {
  var a = P.H;
  if (typeof l == "function")
    throw Error(
      "useEffect CRUD overload is not enabled in this build of React.",
    );
  return a.useEffect(e, t);
};
D.useId = function () {
  return P.H.useId();
};
D.useImperativeHandle = function (e, t, l) {
  return P.H.useImperativeHandle(e, t, l);
};
D.useInsertionEffect = function (e, t) {
  return P.H.useInsertionEffect(e, t);
};
D.useLayoutEffect = function (e, t) {
  return P.H.useLayoutEffect(e, t);
};
D.useMemo = function (e, t) {
  return P.H.useMemo(e, t);
};
D.useOptimistic = function (e, t) {
  return P.H.useOptimistic(e, t);
};
D.useReducer = function (e, t, l) {
  return P.H.useReducer(e, t, l);
};
D.useRef = function (e) {
  return P.H.useRef(e);
};
D.useState = function (e) {
  return P.H.useState(e);
};
D.useSyncExternalStore = function (e, t, l) {
  return P.H.useSyncExternalStore(e, t, l);
};
D.useTransition = function () {
  return P.H.useTransition();
};
D.version = "19.1.0";
Af.exports = D;
var z = Af.exports,
  Df = { exports: {} },
  Te = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Vh = z;
function _f(e) {
  var t = "https://react.dev/errors/" + e;
  if (1 < arguments.length) {
    t += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var l = 2; l < arguments.length; l++)
      t += "&args[]=" + encodeURIComponent(arguments[l]);
  }
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
function wt() {}
var Ae = {
    d: {
      f: wt,
      r: function () {
        throw Error(_f(522));
      },
      D: wt,
      C: wt,
      L: wt,
      m: wt,
      X: wt,
      S: wt,
      M: wt,
    },
    p: 0,
    findDOMNode: null,
  },
  Jh = Symbol.for("react.portal");
function $h(e, t, l) {
  var a = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: Jh,
    key: a == null ? null : "" + a,
    children: e,
    containerInfo: t,
    implementation: l,
  };
}
var Ua = Vh.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
function Bu(e, t) {
  if (e === "font") return "";
  if (typeof t == "string") return t === "use-credentials" ? t : "";
}
Te.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Ae;
Te.createPortal = function (e, t) {
  var l = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11))
    throw Error(_f(299));
  return $h(e, t, null, l);
};
Te.flushSync = function (e) {
  var t = Ua.T,
    l = Ae.p;
  try {
    if (((Ua.T = null), (Ae.p = 2), e)) return e();
  } finally {
    ((Ua.T = t), (Ae.p = l), Ae.d.f());
  }
};
Te.preconnect = function (e, t) {
  typeof e == "string" &&
    (t
      ? ((t = t.crossOrigin),
        (t =
          typeof t == "string" ? (t === "use-credentials" ? t : "") : void 0))
      : (t = null),
    Ae.d.C(e, t));
};
Te.prefetchDNS = function (e) {
  typeof e == "string" && Ae.d.D(e);
};
Te.preinit = function (e, t) {
  if (typeof e == "string" && t && typeof t.as == "string") {
    var l = t.as,
      a = Bu(l, t.crossOrigin),
      n = typeof t.integrity == "string" ? t.integrity : void 0,
      u = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
    l === "style"
      ? Ae.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
          crossOrigin: a,
          integrity: n,
          fetchPriority: u,
        })
      : l === "script" &&
        Ae.d.X(e, {
          crossOrigin: a,
          integrity: n,
          fetchPriority: u,
          nonce: typeof t.nonce == "string" ? t.nonce : void 0,
        });
  }
};
Te.preinitModule = function (e, t) {
  if (typeof e == "string")
    if (typeof t == "object" && t !== null) {
      if (t.as == null || t.as === "script") {
        var l = Bu(t.as, t.crossOrigin);
        Ae.d.M(e, {
          crossOrigin: l,
          integrity: typeof t.integrity == "string" ? t.integrity : void 0,
          nonce: typeof t.nonce == "string" ? t.nonce : void 0,
        });
      }
    } else t == null && Ae.d.M(e);
};
Te.preload = function (e, t) {
  if (
    typeof e == "string" &&
    typeof t == "object" &&
    t !== null &&
    typeof t.as == "string"
  ) {
    var l = t.as,
      a = Bu(l, t.crossOrigin);
    Ae.d.L(e, l, {
      crossOrigin: a,
      integrity: typeof t.integrity == "string" ? t.integrity : void 0,
      nonce: typeof t.nonce == "string" ? t.nonce : void 0,
      type: typeof t.type == "string" ? t.type : void 0,
      fetchPriority:
        typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
      referrerPolicy:
        typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
      imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
      imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
      media: typeof t.media == "string" ? t.media : void 0,
    });
  }
};
Te.preloadModule = function (e, t) {
  if (typeof e == "string")
    if (t) {
      var l = Bu(t.as, t.crossOrigin);
      Ae.d.m(e, {
        as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
        crossOrigin: l,
        integrity: typeof t.integrity == "string" ? t.integrity : void 0,
      });
    } else Ae.d.m(e);
};
Te.requestFormReset = function (e) {
  Ae.d.r(e);
};
Te.unstable_batchedUpdates = function (e, t) {
  return e(t);
};
Te.useFormState = function (e, t, l) {
  return Ua.H.useFormState(e, t, l);
};
Te.useFormStatus = function () {
  return Ua.H.useHostTransitionStatus();
};
Te.version = "19.1.0";
function Rf() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Rf);
    } catch (e) {
      console.error(e);
    }
}
(Rf(), (Df.exports = Te));
var Fh = Df.exports;
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var he = Oh,
  Cf = z,
  Wh = Fh;
function x(e) {
  var t = "https://react.dev/errors/" + e;
  if (1 < arguments.length) {
    t += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var l = 2; l < arguments.length; l++)
      t += "&args[]=" + encodeURIComponent(arguments[l]);
  }
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
function Uf(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function hn(e) {
  var t = e,
    l = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do ((t = e), t.flags & 4098 && (l = t.return), (e = t.return));
    while (e);
  }
  return t.tag === 3 ? l : null;
}
function Hf(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function Ls(e) {
  if (hn(e) !== e) throw Error(x(188));
}
function Ph(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = hn(e)), t === null)) throw Error(x(188));
    return t !== e ? null : e;
  }
  for (var l = e, a = t; ; ) {
    var n = l.return;
    if (n === null) break;
    var u = n.alternate;
    if (u === null) {
      if (((a = n.return), a !== null)) {
        l = a;
        continue;
      }
      break;
    }
    if (n.child === u.child) {
      for (u = n.child; u; ) {
        if (u === l) return (Ls(n), e);
        if (u === a) return (Ls(n), t);
        u = u.sibling;
      }
      throw Error(x(188));
    }
    if (l.return !== a.return) ((l = n), (a = u));
    else {
      for (var c = !1, s = n.child; s; ) {
        if (s === l) {
          ((c = !0), (l = n), (a = u));
          break;
        }
        if (s === a) {
          ((c = !0), (a = n), (l = u));
          break;
        }
        s = s.sibling;
      }
      if (!c) {
        for (s = u.child; s; ) {
          if (s === l) {
            ((c = !0), (l = u), (a = n));
            break;
          }
          if (s === a) {
            ((c = !0), (a = u), (l = n));
            break;
          }
          s = s.sibling;
        }
        if (!c) throw Error(x(189));
      }
    }
    if (l.alternate !== a) throw Error(x(190));
  }
  if (l.tag !== 3) throw Error(x(188));
  return l.stateNode.current === l ? e : t;
}
function qf(e) {
  var t = e.tag;
  if (t === 5 || t === 26 || t === 27 || t === 6) return e;
  for (e = e.child; e !== null; ) {
    if (((t = qf(e)), t !== null)) return t;
    e = e.sibling;
  }
  return null;
}
var F = Object.assign,
  Ih = Symbol.for("react.element"),
  _n = Symbol.for("react.transitional.element"),
  Da = Symbol.for("react.portal"),
  Hl = Symbol.for("react.fragment"),
  Bf = Symbol.for("react.strict_mode"),
  Gc = Symbol.for("react.profiler"),
  em = Symbol.for("react.provider"),
  Gf = Symbol.for("react.consumer"),
  bt = Symbol.for("react.context"),
  Gi = Symbol.for("react.forward_ref"),
  Yc = Symbol.for("react.suspense"),
  Qc = Symbol.for("react.suspense_list"),
  Yi = Symbol.for("react.memo"),
  _t = Symbol.for("react.lazy"),
  Xc = Symbol.for("react.activity"),
  tm = Symbol.for("react.memo_cache_sentinel"),
  Vs = Symbol.iterator;
function Na(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Vs && e[Vs]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var lm = Symbol.for("react.client.reference");
function Kc(e) {
  if (e == null) return null;
  if (typeof e == "function")
    return e.$$typeof === lm ? null : e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Hl:
      return "Fragment";
    case Gc:
      return "Profiler";
    case Bf:
      return "StrictMode";
    case Yc:
      return "Suspense";
    case Qc:
      return "SuspenseList";
    case Xc:
      return "Activity";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case Da:
        return "Portal";
      case bt:
        return (e.displayName || "Context") + ".Provider";
      case Gf:
        return (e._context.displayName || "Context") + ".Consumer";
      case Gi:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case Yi:
        return (
          (t = e.displayName || null),
          t !== null ? t : Kc(e.type) || "Memo"
        );
      case _t:
        ((t = e._payload), (e = e._init));
        try {
          return Kc(e(t));
        } catch {}
    }
  return null;
}
var _a = Array.isArray,
  w = Cf.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
  Q = Wh.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
  rl = { pending: !1, data: null, method: null, action: null },
  Zc = [],
  ql = -1;
function rt(e) {
  return { current: e };
}
function ye(e) {
  0 > ql || ((e.current = Zc[ql]), (Zc[ql] = null), ql--);
}
function I(e, t) {
  (ql++, (Zc[ql] = e.current), (e.current = t));
}
var ut = rt(null),
  Wa = rt(null),
  Xt = rt(null),
  iu = rt(null);
function su(e, t) {
  switch ((I(Xt, t), I(Wa, e), I(ut, null), t.nodeType)) {
    case 9:
    case 11:
      e = (e = t.documentElement) && (e = e.namespaceURI) ? Pr(e) : 0;
      break;
    default:
      if (((e = t.tagName), (t = t.namespaceURI)))
        ((t = Pr(t)), (e = nh(t, e)));
      else
        switch (e) {
          case "svg":
            e = 1;
            break;
          case "math":
            e = 2;
            break;
          default:
            e = 0;
        }
  }
  (ye(ut), I(ut, e));
}
function aa() {
  (ye(ut), ye(Wa), ye(Xt));
}
function Lc(e) {
  e.memoizedState !== null && I(iu, e);
  var t = ut.current,
    l = nh(t, e.type);
  t !== l && (I(Wa, e), I(ut, l));
}
function ru(e) {
  (Wa.current === e && (ye(ut), ye(Wa)),
    iu.current === e && (ye(iu), (sn._currentValue = rl)));
}
var Vc = Object.prototype.hasOwnProperty,
  Qi = he.unstable_scheduleCallback,
  cc = he.unstable_cancelCallback,
  am = he.unstable_shouldYield,
  nm = he.unstable_requestPaint,
  ct = he.unstable_now,
  um = he.unstable_getCurrentPriorityLevel,
  Yf = he.unstable_ImmediatePriority,
  Qf = he.unstable_UserBlockingPriority,
  fu = he.unstable_NormalPriority,
  cm = he.unstable_LowPriority,
  Xf = he.unstable_IdlePriority,
  im = he.log,
  sm = he.unstable_setDisableYieldValue,
  mn = null,
  He = null;
function Bt(e) {
  if (
    (typeof im == "function" && sm(e),
    He && typeof He.setStrictMode == "function")
  )
    try {
      He.setStrictMode(mn, e);
    } catch {}
}
var qe = Math.clz32 ? Math.clz32 : om,
  rm = Math.log,
  fm = Math.LN2;
function om(e) {
  return ((e >>>= 0), e === 0 ? 32 : (31 - ((rm(e) / fm) | 0)) | 0);
}
var Rn = 256,
  Cn = 4194304;
function nl(e) {
  var t = e & 42;
  if (t !== 0) return t;
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
      return 64;
    case 128:
      return 128;
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194048;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      return e & 62914560;
    case 67108864:
      return 67108864;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 0;
    default:
      return e;
  }
}
function Gu(e, t, l) {
  var a = e.pendingLanes;
  if (a === 0) return 0;
  var n = 0,
    u = e.suspendedLanes,
    c = e.pingedLanes;
  e = e.warmLanes;
  var s = a & 134217727;
  return (
    s !== 0
      ? ((a = s & ~u),
        a !== 0
          ? (n = nl(a))
          : ((c &= s),
            c !== 0
              ? (n = nl(c))
              : l || ((l = s & ~e), l !== 0 && (n = nl(l)))))
      : ((s = a & ~u),
        s !== 0
          ? (n = nl(s))
          : c !== 0
            ? (n = nl(c))
            : l || ((l = a & ~e), l !== 0 && (n = nl(l)))),
    n === 0
      ? 0
      : t !== 0 &&
          t !== n &&
          !(t & u) &&
          ((u = n & -n),
          (l = t & -t),
          u >= l || (u === 32 && (l & 4194048) !== 0))
        ? t
        : n
  );
}
function pn(e, t) {
  return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
}
function dm(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
    case 8:
    case 64:
      return t + 250;
    case 16:
    case 32:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      return -1;
    case 67108864:
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function Kf() {
  var e = Rn;
  return ((Rn <<= 1), !(Rn & 4194048) && (Rn = 256), e);
}
function Zf() {
  var e = Cn;
  return ((Cn <<= 1), !(Cn & 62914560) && (Cn = 4194304), e);
}
function ic(e) {
  for (var t = [], l = 0; 31 > l; l++) t.push(e);
  return t;
}
function bn(e, t) {
  ((e.pendingLanes |= t),
    t !== 268435456 &&
      ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
}
function hm(e, t, l, a, n, u) {
  var c = e.pendingLanes;
  ((e.pendingLanes = l),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.warmLanes = 0),
    (e.expiredLanes &= l),
    (e.entangledLanes &= l),
    (e.errorRecoveryDisabledLanes &= l),
    (e.shellSuspendCounter = 0));
  var s = e.entanglements,
    r = e.expirationTimes,
    o = e.hiddenUpdates;
  for (l = c & ~l; 0 < l; ) {
    var b = 31 - qe(l),
      y = 1 << b;
    ((s[b] = 0), (r[b] = -1));
    var d = o[b];
    if (d !== null)
      for (o[b] = null, b = 0; b < d.length; b++) {
        var p = d[b];
        p !== null && (p.lane &= -536870913);
      }
    l &= ~y;
  }
  (a !== 0 && Lf(e, a, 0),
    u !== 0 && n === 0 && e.tag !== 0 && (e.suspendedLanes |= u & ~(c & ~t)));
}
function Lf(e, t, l) {
  ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
  var a = 31 - qe(t);
  ((e.entangledLanes |= t),
    (e.entanglements[a] = e.entanglements[a] | 1073741824 | (l & 4194090)));
}
function Vf(e, t) {
  var l = (e.entangledLanes |= t);
  for (e = e.entanglements; l; ) {
    var a = 31 - qe(l),
      n = 1 << a;
    ((n & t) | (e[a] & t) && (e[a] |= t), (l &= ~n));
  }
}
function Xi(e) {
  switch (e) {
    case 2:
      e = 1;
      break;
    case 8:
      e = 4;
      break;
    case 32:
      e = 16;
      break;
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      e = 128;
      break;
    case 268435456:
      e = 134217728;
      break;
    default:
      e = 0;
  }
  return e;
}
function Ki(e) {
  return (
    (e &= -e),
    2 < e ? (8 < e ? (e & 134217727 ? 32 : 268435456) : 8) : 2
  );
}
function Jf() {
  var e = Q.p;
  return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : mh(e.type));
}
function mm(e, t) {
  var l = Q.p;
  try {
    return ((Q.p = e), t());
  } finally {
    Q.p = l;
  }
}
var tl = Math.random().toString(36).slice(2),
  Se = "__reactFiber$" + tl,
  Me = "__reactProps$" + tl,
  pa = "__reactContainer$" + tl,
  Jc = "__reactEvents$" + tl,
  pm = "__reactListeners$" + tl,
  bm = "__reactHandles$" + tl,
  Js = "__reactResources$" + tl,
  yn = "__reactMarker$" + tl;
function Zi(e) {
  (delete e[Se], delete e[Me], delete e[Jc], delete e[pm], delete e[bm]);
}
function Bl(e) {
  var t = e[Se];
  if (t) return t;
  for (var l = e.parentNode; l; ) {
    if ((t = l[pa] || l[Se])) {
      if (
        ((l = t.alternate),
        t.child !== null || (l !== null && l.child !== null))
      )
        for (e = tf(e); e !== null; ) {
          if ((l = e[Se])) return l;
          e = tf(e);
        }
      return t;
    }
    ((e = l), (l = e.parentNode));
  }
  return null;
}
function ba(e) {
  if ((e = e[Se] || e[pa])) {
    var t = e.tag;
    if (t === 5 || t === 6 || t === 13 || t === 26 || t === 27 || t === 3)
      return e;
  }
  return null;
}
function Ra(e) {
  var t = e.tag;
  if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
  throw Error(x(33));
}
function $l(e) {
  var t = e[Js];
  return (
    t ||
      (t = e[Js] = { hoistableStyles: new Map(), hoistableScripts: new Map() }),
    t
  );
}
function pe(e) {
  e[yn] = !0;
}
var $f = new Set(),
  Ff = {};
function vl(e, t) {
  (na(e, t), na(e + "Capture", t));
}
function na(e, t) {
  for (Ff[e] = t, e = 0; e < t.length; e++) $f.add(t[e]);
}
var ym = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
  ),
  $s = {},
  Fs = {};
function gm(e) {
  return Vc.call(Fs, e)
    ? !0
    : Vc.call($s, e)
      ? !1
      : ym.test(e)
        ? (Fs[e] = !0)
        : (($s[e] = !0), !1);
}
function Jn(e, t, l) {
  if (gm(t))
    if (l === null) e.removeAttribute(t);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
          e.removeAttribute(t);
          return;
        case "boolean":
          var a = t.toLowerCase().slice(0, 5);
          if (a !== "data-" && a !== "aria-") {
            e.removeAttribute(t);
            return;
          }
      }
      e.setAttribute(t, "" + l);
    }
}
function Un(e, t, l) {
  if (l === null) e.removeAttribute(t);
  else {
    switch (typeof l) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        e.removeAttribute(t);
        return;
    }
    e.setAttribute(t, "" + l);
  }
}
function dt(e, t, l, a) {
  if (a === null) e.removeAttribute(l);
  else {
    switch (typeof a) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        e.removeAttribute(l);
        return;
    }
    e.setAttributeNS(t, l, "" + a);
  }
}
var sc, Ws;
function Rl(e) {
  if (sc === void 0)
    try {
      throw Error();
    } catch (l) {
      var t = l.stack.trim().match(/\n( *(at )?)/);
      ((sc = (t && t[1]) || ""),
        (Ws =
          -1 <
          l.stack.indexOf(`
    at`)
            ? " (<anonymous>)"
            : -1 < l.stack.indexOf("@")
              ? "@unknown:0:0"
              : ""));
    }
  return (
    `
` +
    sc +
    e +
    Ws
  );
}
var rc = !1;
function fc(e, t) {
  if (!e || rc) return "";
  rc = !0;
  var l = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    var a = {
      DetermineComponentFrameRoot: function () {
        try {
          if (t) {
            var y = function () {
              throw Error();
            };
            if (
              (Object.defineProperty(y.prototype, "props", {
                set: function () {
                  throw Error();
                },
              }),
              typeof Reflect == "object" && Reflect.construct)
            ) {
              try {
                Reflect.construct(y, []);
              } catch (p) {
                var d = p;
              }
              Reflect.construct(e, [], y);
            } else {
              try {
                y.call();
              } catch (p) {
                d = p;
              }
              e.call(y.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (p) {
              d = p;
            }
            (y = e()) &&
              typeof y.catch == "function" &&
              y.catch(function () {});
          }
        } catch (p) {
          if (p && d && typeof p.stack == "string") return [p.stack, d.stack];
        }
        return [null, null];
      },
    };
    a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
    var n = Object.getOwnPropertyDescriptor(
      a.DetermineComponentFrameRoot,
      "name",
    );
    n &&
      n.configurable &&
      Object.defineProperty(a.DetermineComponentFrameRoot, "name", {
        value: "DetermineComponentFrameRoot",
      });
    var u = a.DetermineComponentFrameRoot(),
      c = u[0],
      s = u[1];
    if (c && s) {
      var r = c.split(`
`),
        o = s.split(`
`);
      for (
        n = a = 0;
        a < r.length && !r[a].includes("DetermineComponentFrameRoot");
      )
        a++;
      for (; n < o.length && !o[n].includes("DetermineComponentFrameRoot"); )
        n++;
      if (a === r.length || n === o.length)
        for (
          a = r.length - 1, n = o.length - 1;
          1 <= a && 0 <= n && r[a] !== o[n];
        )
          n--;
      for (; 1 <= a && 0 <= n; a--, n--)
        if (r[a] !== o[n]) {
          if (a !== 1 || n !== 1)
            do
              if ((a--, n--, 0 > n || r[a] !== o[n])) {
                var b =
                  `
` + r[a].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    b.includes("<anonymous>") &&
                    (b = b.replace("<anonymous>", e.displayName)),
                  b
                );
              }
            while (1 <= a && 0 <= n);
          break;
        }
    }
  } finally {
    ((rc = !1), (Error.prepareStackTrace = l));
  }
  return (l = e ? e.displayName || e.name : "") ? Rl(l) : "";
}
function xm(e) {
  switch (e.tag) {
    case 26:
    case 27:
    case 5:
      return Rl(e.type);
    case 16:
      return Rl("Lazy");
    case 13:
      return Rl("Suspense");
    case 19:
      return Rl("SuspenseList");
    case 0:
    case 15:
      return fc(e.type, !1);
    case 11:
      return fc(e.type.render, !1);
    case 1:
      return fc(e.type, !0);
    case 31:
      return Rl("Activity");
    default:
      return "";
  }
}
function Ps(e) {
  try {
    var t = "";
    do ((t += xm(e)), (e = e.return));
    while (e);
    return t;
  } catch (l) {
    return (
      `
Error generating stack: ` +
      l.message +
      `
` +
      l.stack
    );
  }
}
function Xe(e) {
  switch (typeof e) {
    case "bigint":
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function Wf(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function vm(e) {
  var t = Wf(e) ? "checked" : "value",
    l = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    a = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof l < "u" &&
    typeof l.get == "function" &&
    typeof l.set == "function"
  ) {
    var n = l.get,
      u = l.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return n.call(this);
        },
        set: function (c) {
          ((a = "" + c), u.call(this, c));
        },
      }),
      Object.defineProperty(e, t, { enumerable: l.enumerable }),
      {
        getValue: function () {
          return a;
        },
        setValue: function (c) {
          a = "" + c;
        },
        stopTracking: function () {
          ((e._valueTracker = null), delete e[t]);
        },
      }
    );
  }
}
function ou(e) {
  e._valueTracker || (e._valueTracker = vm(e));
}
function Pf(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var l = t.getValue(),
    a = "";
  return (
    e && (a = Wf(e) ? (e.checked ? "true" : "false") : e.value),
    (e = a),
    e !== l ? (t.setValue(e), !0) : !1
  );
}
function du(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
var Sm = /[\n"\\]/g;
function Le(e) {
  return e.replace(Sm, function (t) {
    return "\\" + t.charCodeAt(0).toString(16) + " ";
  });
}
function $c(e, t, l, a, n, u, c, s) {
  ((e.name = ""),
    c != null &&
    typeof c != "function" &&
    typeof c != "symbol" &&
    typeof c != "boolean"
      ? (e.type = c)
      : e.removeAttribute("type"),
    t != null
      ? c === "number"
        ? ((t === 0 && e.value === "") || e.value != t) &&
          (e.value = "" + Xe(t))
        : e.value !== "" + Xe(t) && (e.value = "" + Xe(t))
      : (c !== "submit" && c !== "reset") || e.removeAttribute("value"),
    t != null
      ? Fc(e, c, Xe(t))
      : l != null
        ? Fc(e, c, Xe(l))
        : a != null && e.removeAttribute("value"),
    n == null && u != null && (e.defaultChecked = !!u),
    n != null &&
      (e.checked = n && typeof n != "function" && typeof n != "symbol"),
    s != null &&
    typeof s != "function" &&
    typeof s != "symbol" &&
    typeof s != "boolean"
      ? (e.name = "" + Xe(s))
      : e.removeAttribute("name"));
}
function If(e, t, l, a, n, u, c, s) {
  if (
    (u != null &&
      typeof u != "function" &&
      typeof u != "symbol" &&
      typeof u != "boolean" &&
      (e.type = u),
    t != null || l != null)
  ) {
    if (!((u !== "submit" && u !== "reset") || t != null)) return;
    ((l = l != null ? "" + Xe(l) : ""),
      (t = t != null ? "" + Xe(t) : l),
      s || t === e.value || (e.value = t),
      (e.defaultValue = t));
  }
  ((a = a ?? n),
    (a = typeof a != "function" && typeof a != "symbol" && !!a),
    (e.checked = s ? e.checked : !!a),
    (e.defaultChecked = !!a),
    c != null &&
      typeof c != "function" &&
      typeof c != "symbol" &&
      typeof c != "boolean" &&
      (e.name = c));
}
function Fc(e, t, l) {
  (t === "number" && du(e.ownerDocument) === e) ||
    e.defaultValue === "" + l ||
    (e.defaultValue = "" + l);
}
function Fl(e, t, l, a) {
  if (((e = e.options), t)) {
    t = {};
    for (var n = 0; n < l.length; n++) t["$" + l[n]] = !0;
    for (l = 0; l < e.length; l++)
      ((n = t.hasOwnProperty("$" + e[l].value)),
        e[l].selected !== n && (e[l].selected = n),
        n && a && (e[l].defaultSelected = !0));
  } else {
    for (l = "" + Xe(l), t = null, n = 0; n < e.length; n++) {
      if (e[n].value === l) {
        ((e[n].selected = !0), a && (e[n].defaultSelected = !0));
        return;
      }
      t !== null || e[n].disabled || (t = e[n]);
    }
    t !== null && (t.selected = !0);
  }
}
function eo(e, t, l) {
  if (
    t != null &&
    ((t = "" + Xe(t)), t !== e.value && (e.value = t), l == null)
  ) {
    e.defaultValue !== t && (e.defaultValue = t);
    return;
  }
  e.defaultValue = l != null ? "" + Xe(l) : "";
}
function to(e, t, l, a) {
  if (t == null) {
    if (a != null) {
      if (l != null) throw Error(x(92));
      if (_a(a)) {
        if (1 < a.length) throw Error(x(93));
        a = a[0];
      }
      l = a;
    }
    (l == null && (l = ""), (t = l));
  }
  ((l = Xe(t)),
    (e.defaultValue = l),
    (a = e.textContent),
    a === l && a !== "" && a !== null && (e.value = a));
}
function ua(e, t) {
  if (t) {
    var l = e.firstChild;
    if (l && l === e.lastChild && l.nodeType === 3) {
      l.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var jm = new Set(
  "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
    " ",
  ),
);
function Is(e, t, l) {
  var a = t.indexOf("--") === 0;
  l == null || typeof l == "boolean" || l === ""
    ? a
      ? e.setProperty(t, "")
      : t === "float"
        ? (e.cssFloat = "")
        : (e[t] = "")
    : a
      ? e.setProperty(t, l)
      : typeof l != "number" || l === 0 || jm.has(t)
        ? t === "float"
          ? (e.cssFloat = l)
          : (e[t] = ("" + l).trim())
        : (e[t] = l + "px");
}
function lo(e, t, l) {
  if (t != null && typeof t != "object") throw Error(x(62));
  if (((e = e.style), l != null)) {
    for (var a in l)
      !l.hasOwnProperty(a) ||
        (t != null && t.hasOwnProperty(a)) ||
        (a.indexOf("--") === 0
          ? e.setProperty(a, "")
          : a === "float"
            ? (e.cssFloat = "")
            : (e[a] = ""));
    for (var n in t)
      ((a = t[n]), t.hasOwnProperty(n) && l[n] !== a && Is(e, n, a));
  } else for (var u in t) t.hasOwnProperty(u) && Is(e, u, t[u]);
}
function Li(e) {
  if (e.indexOf("-") === -1) return !1;
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var Nm = new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"],
  ]),
  km =
    /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
function $n(e) {
  return km.test("" + e)
    ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
    : e;
}
var Wc = null;
function Vi(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var Gl = null,
  Wl = null;
function er(e) {
  var t = ba(e);
  if (t && (e = t.stateNode)) {
    var l = e[Me] || null;
    e: switch (((e = t.stateNode), t.type)) {
      case "input":
        if (
          ($c(
            e,
            l.value,
            l.defaultValue,
            l.defaultValue,
            l.checked,
            l.defaultChecked,
            l.type,
            l.name,
          ),
          (t = l.name),
          l.type === "radio" && t != null)
        ) {
          for (l = e; l.parentNode; ) l = l.parentNode;
          for (
            l = l.querySelectorAll(
              'input[name="' + Le("" + t) + '"][type="radio"]',
            ),
              t = 0;
            t < l.length;
            t++
          ) {
            var a = l[t];
            if (a !== e && a.form === e.form) {
              var n = a[Me] || null;
              if (!n) throw Error(x(90));
              $c(
                a,
                n.value,
                n.defaultValue,
                n.defaultValue,
                n.checked,
                n.defaultChecked,
                n.type,
                n.name,
              );
            }
          }
          for (t = 0; t < l.length; t++)
            ((a = l[t]), a.form === e.form && Pf(a));
        }
        break e;
      case "textarea":
        eo(e, l.value, l.defaultValue);
        break e;
      case "select":
        ((t = l.value), t != null && Fl(e, !!l.multiple, t, !1));
    }
  }
}
var oc = !1;
function ao(e, t, l) {
  if (oc) return e(t, l);
  oc = !0;
  try {
    var a = e(t);
    return a;
  } finally {
    if (
      ((oc = !1),
      (Gl !== null || Wl !== null) &&
        (Fu(), Gl && ((t = Gl), (e = Wl), (Wl = Gl = null), er(t), e)))
    )
      for (t = 0; t < e.length; t++) er(e[t]);
  }
}
function Pa(e, t) {
  var l = e.stateNode;
  if (l === null) return null;
  var a = l[Me] || null;
  if (a === null) return null;
  l = a[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      ((a = !a.disabled) ||
        ((e = e.type),
        (a = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !a));
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (l && typeof l != "function") throw Error(x(231, t, typeof l));
  return l;
}
var kt = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  Pc = !1;
if (kt)
  try {
    var ka = {};
    (Object.defineProperty(ka, "passive", {
      get: function () {
        Pc = !0;
      },
    }),
      window.addEventListener("test", ka, ka),
      window.removeEventListener("test", ka, ka));
  } catch {
    Pc = !1;
  }
var Gt = null,
  Ji = null,
  Fn = null;
function no() {
  if (Fn) return Fn;
  var e,
    t = Ji,
    l = t.length,
    a,
    n = "value" in Gt ? Gt.value : Gt.textContent,
    u = n.length;
  for (e = 0; e < l && t[e] === n[e]; e++);
  var c = l - e;
  for (a = 1; a <= c && t[l - a] === n[u - a]; a++);
  return (Fn = n.slice(e, 1 < a ? 1 - a : void 0));
}
function Wn(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function Hn() {
  return !0;
}
function tr() {
  return !1;
}
function Oe(e) {
  function t(l, a, n, u, c) {
    ((this._reactName = l),
      (this._targetInst = n),
      (this.type = a),
      (this.nativeEvent = u),
      (this.target = c),
      (this.currentTarget = null));
    for (var s in e)
      e.hasOwnProperty(s) && ((l = e[s]), (this[s] = l ? l(u) : u[s]));
    return (
      (this.isDefaultPrevented = (
        u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1
      )
        ? Hn
        : tr),
      (this.isPropagationStopped = tr),
      this
    );
  }
  return (
    F(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l &&
          (l.preventDefault
            ? l.preventDefault()
            : typeof l.returnValue != "unknown" && (l.returnValue = !1),
          (this.isDefaultPrevented = Hn));
      },
      stopPropagation: function () {
        var l = this.nativeEvent;
        l &&
          (l.stopPropagation
            ? l.stopPropagation()
            : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0),
          (this.isPropagationStopped = Hn));
      },
      persist: function () {},
      isPersistent: Hn,
    }),
    t
  );
}
var Sl = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  Yu = Oe(Sl),
  gn = F({}, Sl, { view: 0, detail: 0 }),
  Am = Oe(gn),
  dc,
  hc,
  Aa,
  Qu = F({}, gn, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: $i,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== Aa &&
            (Aa && e.type === "mousemove"
              ? ((dc = e.screenX - Aa.screenX), (hc = e.screenY - Aa.screenY))
              : (hc = dc = 0),
            (Aa = e)),
          dc);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : hc;
    },
  }),
  lr = Oe(Qu),
  Tm = F({}, Qu, { dataTransfer: 0 }),
  Em = Oe(Tm),
  zm = F({}, gn, { relatedTarget: 0 }),
  mc = Oe(zm),
  wm = F({}, Sl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Mm = Oe(wm),
  Om = F({}, Sl, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  Dm = Oe(Om),
  _m = F({}, Sl, { data: 0 }),
  ar = Oe(_m),
  Rm = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  Cm = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  Um = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function Hm(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Um[e]) ? !!t[e] : !1;
}
function $i() {
  return Hm;
}
var qm = F({}, gn, {
    key: function (e) {
      if (e.key) {
        var t = Rm[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = Wn(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
          ? Cm[e.keyCode] || "Unidentified"
          : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: $i,
    charCode: function (e) {
      return e.type === "keypress" ? Wn(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? Wn(e)
        : e.type === "keydown" || e.type === "keyup"
          ? e.keyCode
          : 0;
    },
  }),
  Bm = Oe(qm),
  Gm = F({}, Qu, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  nr = Oe(Gm),
  Ym = F({}, gn, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: $i,
  }),
  Qm = Oe(Ym),
  Xm = F({}, Sl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Km = Oe(Xm),
  Zm = F({}, Qu, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
          ? -e.wheelDeltaY
          : "wheelDelta" in e
            ? -e.wheelDelta
            : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  Lm = Oe(Zm),
  Vm = F({}, Sl, { newState: 0, oldState: 0 }),
  Jm = Oe(Vm),
  $m = [9, 13, 27, 32],
  Fi = kt && "CompositionEvent" in window,
  Ha = null;
kt && "documentMode" in document && (Ha = document.documentMode);
var Fm = kt && "TextEvent" in window && !Ha,
  uo = kt && (!Fi || (Ha && 8 < Ha && 11 >= Ha)),
  ur = " ",
  cr = !1;
function co(e, t) {
  switch (e) {
    case "keyup":
      return $m.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function io(e) {
  return ((e = e.detail), typeof e == "object" && "data" in e ? e.data : null);
}
var Yl = !1;
function Wm(e, t) {
  switch (e) {
    case "compositionend":
      return io(t);
    case "keypress":
      return t.which !== 32 ? null : ((cr = !0), ur);
    case "textInput":
      return ((e = t.data), e === ur && cr ? null : e);
    default:
      return null;
  }
}
function Pm(e, t) {
  if (Yl)
    return e === "compositionend" || (!Fi && co(e, t))
      ? ((e = no()), (Fn = Ji = Gt = null), (Yl = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return uo && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Im = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function ir(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Im[e.type] : t === "textarea";
}
function so(e, t, l, a) {
  (Gl ? (Wl ? Wl.push(a) : (Wl = [a])) : (Gl = a),
    (t = Mu(t, "onChange")),
    0 < t.length &&
      ((l = new Yu("onChange", "change", null, l, a)),
      e.push({ event: l, listeners: t })));
}
var qa = null,
  Ia = null;
function ep(e) {
  th(e, 0);
}
function Xu(e) {
  var t = Ra(e);
  if (Pf(t)) return e;
}
function sr(e, t) {
  if (e === "change") return t;
}
var ro = !1;
if (kt) {
  var pc;
  if (kt) {
    var bc = "oninput" in document;
    if (!bc) {
      var rr = document.createElement("div");
      (rr.setAttribute("oninput", "return;"),
        (bc = typeof rr.oninput == "function"));
    }
    pc = bc;
  } else pc = !1;
  ro = pc && (!document.documentMode || 9 < document.documentMode);
}
function fr() {
  qa && (qa.detachEvent("onpropertychange", fo), (Ia = qa = null));
}
function fo(e) {
  if (e.propertyName === "value" && Xu(Ia)) {
    var t = [];
    (so(t, Ia, e, Vi(e)), ao(ep, t));
  }
}
function tp(e, t, l) {
  e === "focusin"
    ? (fr(), (qa = t), (Ia = l), qa.attachEvent("onpropertychange", fo))
    : e === "focusout" && fr();
}
function lp(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return Xu(Ia);
}
function ap(e, t) {
  if (e === "click") return Xu(t);
}
function np(e, t) {
  if (e === "input" || e === "change") return Xu(t);
}
function up(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var Ye = typeof Object.is == "function" ? Object.is : up;
function en(e, t) {
  if (Ye(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var l = Object.keys(e),
    a = Object.keys(t);
  if (l.length !== a.length) return !1;
  for (a = 0; a < l.length; a++) {
    var n = l[a];
    if (!Vc.call(t, n) || !Ye(e[n], t[n])) return !1;
  }
  return !0;
}
function or(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function dr(e, t) {
  var l = or(e);
  e = 0;
  for (var a; l; ) {
    if (l.nodeType === 3) {
      if (((a = e + l.textContent.length), e <= t && a >= t))
        return { node: l, offset: t - e };
      e = a;
    }
    e: {
      for (; l; ) {
        if (l.nextSibling) {
          l = l.nextSibling;
          break e;
        }
        l = l.parentNode;
      }
      l = void 0;
    }
    l = or(l);
  }
}
function oo(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
          ? oo(e, t.parentNode)
          : "contains" in e
            ? e.contains(t)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(t) & 16)
              : !1
    : !1;
}
function ho(e) {
  e =
    e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null
      ? e.ownerDocument.defaultView
      : window;
  for (var t = du(e.document); t instanceof e.HTMLIFrameElement; ) {
    try {
      var l = typeof t.contentWindow.location.href == "string";
    } catch {
      l = !1;
    }
    if (l) e = t.contentWindow;
    else break;
    t = du(e.document);
  }
  return t;
}
function Wi(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
var cp = kt && "documentMode" in document && 11 >= document.documentMode,
  Ql = null,
  Ic = null,
  Ba = null,
  ei = !1;
function hr(e, t, l) {
  var a = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
  ei ||
    Ql == null ||
    Ql !== du(a) ||
    ((a = Ql),
    "selectionStart" in a && Wi(a)
      ? (a = { start: a.selectionStart, end: a.selectionEnd })
      : ((a = (
          (a.ownerDocument && a.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (a = {
          anchorNode: a.anchorNode,
          anchorOffset: a.anchorOffset,
          focusNode: a.focusNode,
          focusOffset: a.focusOffset,
        })),
    (Ba && en(Ba, a)) ||
      ((Ba = a),
      (a = Mu(Ic, "onSelect")),
      0 < a.length &&
        ((t = new Yu("onSelect", "select", null, t, l)),
        e.push({ event: t, listeners: a }),
        (t.target = Ql))));
}
function al(e, t) {
  var l = {};
  return (
    (l[e.toLowerCase()] = t.toLowerCase()),
    (l["Webkit" + e] = "webkit" + t),
    (l["Moz" + e] = "moz" + t),
    l
  );
}
var Xl = {
    animationend: al("Animation", "AnimationEnd"),
    animationiteration: al("Animation", "AnimationIteration"),
    animationstart: al("Animation", "AnimationStart"),
    transitionrun: al("Transition", "TransitionRun"),
    transitionstart: al("Transition", "TransitionStart"),
    transitioncancel: al("Transition", "TransitionCancel"),
    transitionend: al("Transition", "TransitionEnd"),
  },
  yc = {},
  mo = {};
kt &&
  ((mo = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete Xl.animationend.animation,
    delete Xl.animationiteration.animation,
    delete Xl.animationstart.animation),
  "TransitionEvent" in window || delete Xl.transitionend.transition);
function jl(e) {
  if (yc[e]) return yc[e];
  if (!Xl[e]) return e;
  var t = Xl[e],
    l;
  for (l in t) if (t.hasOwnProperty(l) && l in mo) return (yc[e] = t[l]);
  return e;
}
var po = jl("animationend"),
  bo = jl("animationiteration"),
  yo = jl("animationstart"),
  ip = jl("transitionrun"),
  sp = jl("transitionstart"),
  rp = jl("transitioncancel"),
  go = jl("transitionend"),
  xo = new Map(),
  ti =
    "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " ",
    );
ti.push("scrollEnd");
function tt(e, t) {
  (xo.set(e, t), vl(t, [e]));
}
var mr = new WeakMap();
function Ve(e, t) {
  if (typeof e == "object" && e !== null) {
    var l = mr.get(e);
    return l !== void 0
      ? l
      : ((t = { value: e, source: t, stack: Ps(t) }), mr.set(e, t), t);
  }
  return { value: e, source: t, stack: Ps(t) };
}
var Qe = [],
  Kl = 0,
  Pi = 0;
function Ku() {
  for (var e = Kl, t = (Pi = Kl = 0); t < e; ) {
    var l = Qe[t];
    Qe[t++] = null;
    var a = Qe[t];
    Qe[t++] = null;
    var n = Qe[t];
    Qe[t++] = null;
    var u = Qe[t];
    if (((Qe[t++] = null), a !== null && n !== null)) {
      var c = a.pending;
      (c === null ? (n.next = n) : ((n.next = c.next), (c.next = n)),
        (a.pending = n));
    }
    u !== 0 && vo(l, n, u);
  }
}
function Zu(e, t, l, a) {
  ((Qe[Kl++] = e),
    (Qe[Kl++] = t),
    (Qe[Kl++] = l),
    (Qe[Kl++] = a),
    (Pi |= a),
    (e.lanes |= a),
    (e = e.alternate),
    e !== null && (e.lanes |= a));
}
function Ii(e, t, l, a) {
  return (Zu(e, t, l, a), hu(e));
}
function ya(e, t) {
  return (Zu(e, null, null, t), hu(e));
}
function vo(e, t, l) {
  e.lanes |= l;
  var a = e.alternate;
  a !== null && (a.lanes |= l);
  for (var n = !1, u = e.return; u !== null; )
    ((u.childLanes |= l),
      (a = u.alternate),
      a !== null && (a.childLanes |= l),
      u.tag === 22 &&
        ((e = u.stateNode), e === null || e._visibility & 1 || (n = !0)),
      (e = u),
      (u = u.return));
  return e.tag === 3
    ? ((u = e.stateNode),
      n &&
        t !== null &&
        ((n = 31 - qe(l)),
        (e = u.hiddenUpdates),
        (a = e[n]),
        a === null ? (e[n] = [t]) : a.push(t),
        (t.lane = l | 536870912)),
      u)
    : null;
}
function hu(e) {
  if (50 < $a) throw (($a = 0), (ji = null), Error(x(185)));
  for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
  return e.tag === 3 ? e.stateNode : null;
}
var Zl = {};
function fp(e, t, l, a) {
  ((this.tag = e),
    (this.key = l),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.refCleanup = this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = a),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null));
}
function Ue(e, t, l, a) {
  return new fp(e, t, l, a);
}
function es(e) {
  return ((e = e.prototype), !(!e || !e.isReactComponent));
}
function jt(e, t) {
  var l = e.alternate;
  return (
    l === null
      ? ((l = Ue(e.tag, t, e.key, e.mode)),
        (l.elementType = e.elementType),
        (l.type = e.type),
        (l.stateNode = e.stateNode),
        (l.alternate = e),
        (e.alternate = l))
      : ((l.pendingProps = t),
        (l.type = e.type),
        (l.flags = 0),
        (l.subtreeFlags = 0),
        (l.deletions = null)),
    (l.flags = e.flags & 65011712),
    (l.childLanes = e.childLanes),
    (l.lanes = e.lanes),
    (l.child = e.child),
    (l.memoizedProps = e.memoizedProps),
    (l.memoizedState = e.memoizedState),
    (l.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (l.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (l.sibling = e.sibling),
    (l.index = e.index),
    (l.ref = e.ref),
    (l.refCleanup = e.refCleanup),
    l
  );
}
function So(e, t) {
  e.flags &= 65011714;
  var l = e.alternate;
  return (
    l === null
      ? ((e.childLanes = 0),
        (e.lanes = t),
        (e.child = null),
        (e.subtreeFlags = 0),
        (e.memoizedProps = null),
        (e.memoizedState = null),
        (e.updateQueue = null),
        (e.dependencies = null),
        (e.stateNode = null))
      : ((e.childLanes = l.childLanes),
        (e.lanes = l.lanes),
        (e.child = l.child),
        (e.subtreeFlags = 0),
        (e.deletions = null),
        (e.memoizedProps = l.memoizedProps),
        (e.memoizedState = l.memoizedState),
        (e.updateQueue = l.updateQueue),
        (e.type = l.type),
        (t = l.dependencies),
        (e.dependencies =
          t === null
            ? null
            : { lanes: t.lanes, firstContext: t.firstContext })),
    e
  );
}
function Pn(e, t, l, a, n, u) {
  var c = 0;
  if (((a = e), typeof e == "function")) es(e) && (c = 1);
  else if (typeof e == "string")
    c = d0(e, l, ut.current)
      ? 26
      : e === "html" || e === "head" || e === "body"
        ? 27
        : 5;
  else
    e: switch (e) {
      case Xc:
        return ((e = Ue(31, l, t, n)), (e.elementType = Xc), (e.lanes = u), e);
      case Hl:
        return fl(l.children, n, u, t);
      case Bf:
        ((c = 8), (n |= 24));
        break;
      case Gc:
        return (
          (e = Ue(12, l, t, n | 2)),
          (e.elementType = Gc),
          (e.lanes = u),
          e
        );
      case Yc:
        return ((e = Ue(13, l, t, n)), (e.elementType = Yc), (e.lanes = u), e);
      case Qc:
        return ((e = Ue(19, l, t, n)), (e.elementType = Qc), (e.lanes = u), e);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case em:
            case bt:
              c = 10;
              break e;
            case Gf:
              c = 9;
              break e;
            case Gi:
              c = 11;
              break e;
            case Yi:
              c = 14;
              break e;
            case _t:
              ((c = 16), (a = null));
              break e;
          }
        ((c = 29),
          (l = Error(x(130, e === null ? "null" : typeof e, ""))),
          (a = null));
    }
  return (
    (t = Ue(c, l, t, n)),
    (t.elementType = e),
    (t.type = a),
    (t.lanes = u),
    t
  );
}
function fl(e, t, l, a) {
  return ((e = Ue(7, e, a, t)), (e.lanes = l), e);
}
function gc(e, t, l) {
  return ((e = Ue(6, e, null, t)), (e.lanes = l), e);
}
function xc(e, t, l) {
  return (
    (t = Ue(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = l),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
var Ll = [],
  Vl = 0,
  mu = null,
  pu = 0,
  Ke = [],
  Ze = 0,
  ol = null,
  yt = 1,
  gt = "";
function ul(e, t) {
  ((Ll[Vl++] = pu), (Ll[Vl++] = mu), (mu = e), (pu = t));
}
function jo(e, t, l) {
  ((Ke[Ze++] = yt), (Ke[Ze++] = gt), (Ke[Ze++] = ol), (ol = e));
  var a = yt;
  e = gt;
  var n = 32 - qe(a) - 1;
  ((a &= ~(1 << n)), (l += 1));
  var u = 32 - qe(t) + n;
  if (30 < u) {
    var c = n - (n % 5);
    ((u = (a & ((1 << c) - 1)).toString(32)),
      (a >>= c),
      (n -= c),
      (yt = (1 << (32 - qe(t) + n)) | (l << n) | a),
      (gt = u + e));
  } else ((yt = (1 << u) | (l << n) | a), (gt = e));
}
function ts(e) {
  e.return !== null && (ul(e, 1), jo(e, 1, 0));
}
function ls(e) {
  for (; e === mu; )
    ((mu = Ll[--Vl]), (Ll[Vl] = null), (pu = Ll[--Vl]), (Ll[Vl] = null));
  for (; e === ol; )
    ((ol = Ke[--Ze]),
      (Ke[Ze] = null),
      (gt = Ke[--Ze]),
      (Ke[Ze] = null),
      (yt = Ke[--Ze]),
      (Ke[Ze] = null));
}
var ke = null,
  ae = null,
  Y = !1,
  dl = null,
  at = !1,
  li = Error(x(519));
function bl(e) {
  var t = Error(x(418, ""));
  throw (tn(Ve(t, e)), li);
}
function pr(e) {
  var t = e.stateNode,
    l = e.type,
    a = e.memoizedProps;
  switch (((t[Se] = e), (t[Me] = a), l)) {
    case "dialog":
      (C("cancel", t), C("close", t));
      break;
    case "iframe":
    case "object":
    case "embed":
      C("load", t);
      break;
    case "video":
    case "audio":
      for (l = 0; l < nn.length; l++) C(nn[l], t);
      break;
    case "source":
      C("error", t);
      break;
    case "img":
    case "image":
    case "link":
      (C("error", t), C("load", t));
      break;
    case "details":
      C("toggle", t);
      break;
    case "input":
      (C("invalid", t),
        If(
          t,
          a.value,
          a.defaultValue,
          a.checked,
          a.defaultChecked,
          a.type,
          a.name,
          !0,
        ),
        ou(t));
      break;
    case "select":
      C("invalid", t);
      break;
    case "textarea":
      (C("invalid", t), to(t, a.value, a.defaultValue, a.children), ou(t));
  }
  ((l = a.children),
    (typeof l != "string" && typeof l != "number" && typeof l != "bigint") ||
    t.textContent === "" + l ||
    a.suppressHydrationWarning === !0 ||
    ah(t.textContent, l)
      ? (a.popover != null && (C("beforetoggle", t), C("toggle", t)),
        a.onScroll != null && C("scroll", t),
        a.onScrollEnd != null && C("scrollend", t),
        a.onClick != null && (t.onclick = Iu),
        (t = !0))
      : (t = !1),
    t || bl(e));
}
function br(e) {
  for (ke = e.return; ke; )
    switch (ke.tag) {
      case 5:
      case 13:
        at = !1;
        return;
      case 27:
      case 3:
        at = !0;
        return;
      default:
        ke = ke.return;
    }
}
function Ta(e) {
  if (e !== ke) return !1;
  if (!Y) return (br(e), (Y = !0), !1);
  var t = e.tag,
    l;
  if (
    ((l = t !== 3 && t !== 27) &&
      ((l = t === 5) &&
        ((l = e.type),
        (l = !(l !== "form" && l !== "button") || zi(e.type, e.memoizedProps))),
      (l = !l)),
    l && ae && bl(e),
    br(e),
    t === 13)
  ) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(x(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8)
          if (((l = e.data), l === "/$")) {
            if (t === 0) {
              ae = et(e.nextSibling);
              break e;
            }
            t--;
          } else (l !== "$" && l !== "$!" && l !== "$?") || t++;
        e = e.nextSibling;
      }
      ae = null;
    }
  } else
    t === 27
      ? ((t = ae), ll(e.type) ? ((e = Oi), (Oi = null), (ae = e)) : (ae = t))
      : (ae = ke ? et(e.stateNode.nextSibling) : null);
  return !0;
}
function xn() {
  ((ae = ke = null), (Y = !1));
}
function yr() {
  var e = dl;
  return (
    e !== null && (we === null ? (we = e) : we.push.apply(we, e), (dl = null)),
    e
  );
}
function tn(e) {
  dl === null ? (dl = [e]) : dl.push(e);
}
var ai = rt(null),
  Nl = null,
  xt = null;
function Ct(e, t, l) {
  (I(ai, t._currentValue), (t._currentValue = l));
}
function Nt(e) {
  ((e._currentValue = ai.current), ye(ai));
}
function ni(e, t, l) {
  for (; e !== null; ) {
    var a = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), a !== null && (a.childLanes |= t))
        : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t),
      e === l)
    )
      break;
    e = e.return;
  }
}
function ui(e, t, l, a) {
  var n = e.child;
  for (n !== null && (n.return = e); n !== null; ) {
    var u = n.dependencies;
    if (u !== null) {
      var c = n.child;
      u = u.firstContext;
      e: for (; u !== null; ) {
        var s = u;
        u = n;
        for (var r = 0; r < t.length; r++)
          if (s.context === t[r]) {
            ((u.lanes |= l),
              (s = u.alternate),
              s !== null && (s.lanes |= l),
              ni(u.return, l, e),
              a || (c = null));
            break e;
          }
        u = s.next;
      }
    } else if (n.tag === 18) {
      if (((c = n.return), c === null)) throw Error(x(341));
      ((c.lanes |= l),
        (u = c.alternate),
        u !== null && (u.lanes |= l),
        ni(c, l, e),
        (c = null));
    } else c = n.child;
    if (c !== null) c.return = n;
    else
      for (c = n; c !== null; ) {
        if (c === e) {
          c = null;
          break;
        }
        if (((n = c.sibling), n !== null)) {
          ((n.return = c.return), (c = n));
          break;
        }
        c = c.return;
      }
    n = c;
  }
}
function vn(e, t, l, a) {
  e = null;
  for (var n = t, u = !1; n !== null; ) {
    if (!u) {
      if (n.flags & 524288) u = !0;
      else if (n.flags & 262144) break;
    }
    if (n.tag === 10) {
      var c = n.alternate;
      if (c === null) throw Error(x(387));
      if (((c = c.memoizedProps), c !== null)) {
        var s = n.type;
        Ye(n.pendingProps.value, c.value) ||
          (e !== null ? e.push(s) : (e = [s]));
      }
    } else if (n === iu.current) {
      if (((c = n.alternate), c === null)) throw Error(x(387));
      c.memoizedState.memoizedState !== n.memoizedState.memoizedState &&
        (e !== null ? e.push(sn) : (e = [sn]));
    }
    n = n.return;
  }
  (e !== null && ui(t, e, l, a), (t.flags |= 262144));
}
function bu(e) {
  for (e = e.firstContext; e !== null; ) {
    if (!Ye(e.context._currentValue, e.memoizedValue)) return !0;
    e = e.next;
  }
  return !1;
}
function yl(e) {
  ((Nl = e),
    (xt = null),
    (e = e.dependencies),
    e !== null && (e.firstContext = null));
}
function je(e) {
  return No(Nl, e);
}
function qn(e, t) {
  return (Nl === null && yl(e), No(e, t));
}
function No(e, t) {
  var l = t._currentValue;
  if (((t = { context: t, memoizedValue: l, next: null }), xt === null)) {
    if (e === null) throw Error(x(308));
    ((xt = t),
      (e.dependencies = { lanes: 0, firstContext: t }),
      (e.flags |= 524288));
  } else xt = xt.next = t;
  return l;
}
var op =
    typeof AbortController < "u"
      ? AbortController
      : function () {
          var e = [],
            t = (this.signal = {
              aborted: !1,
              addEventListener: function (l, a) {
                e.push(a);
              },
            });
          this.abort = function () {
            ((t.aborted = !0),
              e.forEach(function (l) {
                return l();
              }));
          };
        },
  dp = he.unstable_scheduleCallback,
  hp = he.unstable_NormalPriority,
  oe = {
    $$typeof: bt,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0,
  };
function as() {
  return { controller: new op(), data: new Map(), refCount: 0 };
}
function Sn(e) {
  (e.refCount--,
    e.refCount === 0 &&
      dp(hp, function () {
        e.controller.abort();
      }));
}
var Ga = null,
  ci = 0,
  ca = 0,
  Pl = null;
function mp(e, t) {
  if (Ga === null) {
    var l = (Ga = []);
    ((ci = 0),
      (ca = Ts()),
      (Pl = {
        status: "pending",
        value: void 0,
        then: function (a) {
          l.push(a);
        },
      }));
  }
  return (ci++, t.then(gr, gr), t);
}
function gr() {
  if (--ci === 0 && Ga !== null) {
    Pl !== null && (Pl.status = "fulfilled");
    var e = Ga;
    ((Ga = null), (ca = 0), (Pl = null));
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
}
function pp(e, t) {
  var l = [],
    a = {
      status: "pending",
      value: null,
      reason: null,
      then: function (n) {
        l.push(n);
      },
    };
  return (
    e.then(
      function () {
        ((a.status = "fulfilled"), (a.value = t));
        for (var n = 0; n < l.length; n++) (0, l[n])(t);
      },
      function (n) {
        for (a.status = "rejected", a.reason = n, n = 0; n < l.length; n++)
          (0, l[n])(void 0);
      },
    ),
    a
  );
}
var xr = w.S;
w.S = function (e, t) {
  (typeof t == "object" &&
    t !== null &&
    typeof t.then == "function" &&
    mp(e, t),
    xr !== null && xr(e, t));
};
var hl = rt(null);
function ns() {
  var e = hl.current;
  return e !== null ? e : $.pooledCache;
}
function In(e, t) {
  t === null ? I(hl, hl.current) : I(hl, t.pool);
}
function ko() {
  var e = ns();
  return e === null ? null : { parent: oe._currentValue, pool: e };
}
var jn = Error(x(460)),
  Ao = Error(x(474)),
  Lu = Error(x(542)),
  ii = { then: function () {} };
function vr(e) {
  return ((e = e.status), e === "fulfilled" || e === "rejected");
}
function Bn() {}
function To(e, t, l) {
  switch (
    ((l = e[l]),
    l === void 0 ? e.push(t) : l !== t && (t.then(Bn, Bn), (t = l)),
    t.status)
  ) {
    case "fulfilled":
      return t.value;
    case "rejected":
      throw ((e = t.reason), jr(e), e);
    default:
      if (typeof t.status == "string") t.then(Bn, Bn);
      else {
        if (((e = $), e !== null && 100 < e.shellSuspendCounter))
          throw Error(x(482));
        ((e = t),
          (e.status = "pending"),
          e.then(
            function (a) {
              if (t.status === "pending") {
                var n = t;
                ((n.status = "fulfilled"), (n.value = a));
              }
            },
            function (a) {
              if (t.status === "pending") {
                var n = t;
                ((n.status = "rejected"), (n.reason = a));
              }
            },
          ));
      }
      switch (t.status) {
        case "fulfilled":
          return t.value;
        case "rejected":
          throw ((e = t.reason), jr(e), e);
      }
      throw ((Ya = t), jn);
  }
}
var Ya = null;
function Sr() {
  if (Ya === null) throw Error(x(459));
  var e = Ya;
  return ((Ya = null), e);
}
function jr(e) {
  if (e === jn || e === Lu) throw Error(x(483));
}
var Rt = !1;
function us(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, lanes: 0, hiddenCallbacks: null },
    callbacks: null,
  };
}
function si(e, t) {
  ((e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        callbacks: null,
      }));
}
function Kt(e) {
  return { lane: e, tag: 0, payload: null, callback: null, next: null };
}
function Zt(e, t, l) {
  var a = e.updateQueue;
  if (a === null) return null;
  if (((a = a.shared), K & 2)) {
    var n = a.pending;
    return (
      n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
      (a.pending = t),
      (t = hu(e)),
      vo(e, null, l),
      t
    );
  }
  return (Zu(e, a, t, l), hu(e));
}
function Qa(e, t, l) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (l & 4194048) !== 0))
  ) {
    var a = t.lanes;
    ((a &= e.pendingLanes), (l |= a), (t.lanes = l), Vf(e, l));
  }
}
function vc(e, t) {
  var l = e.updateQueue,
    a = e.alternate;
  if (a !== null && ((a = a.updateQueue), l === a)) {
    var n = null,
      u = null;
    if (((l = l.firstBaseUpdate), l !== null)) {
      do {
        var c = {
          lane: l.lane,
          tag: l.tag,
          payload: l.payload,
          callback: null,
          next: null,
        };
        (u === null ? (n = u = c) : (u = u.next = c), (l = l.next));
      } while (l !== null);
      u === null ? (n = u = t) : (u = u.next = t);
    } else n = u = t;
    ((l = {
      baseState: a.baseState,
      firstBaseUpdate: n,
      lastBaseUpdate: u,
      shared: a.shared,
      callbacks: a.callbacks,
    }),
      (e.updateQueue = l));
    return;
  }
  ((e = l.lastBaseUpdate),
    e === null ? (l.firstBaseUpdate = t) : (e.next = t),
    (l.lastBaseUpdate = t));
}
var ri = !1;
function Xa() {
  if (ri) {
    var e = Pl;
    if (e !== null) throw e;
  }
}
function Ka(e, t, l, a) {
  ri = !1;
  var n = e.updateQueue;
  Rt = !1;
  var u = n.firstBaseUpdate,
    c = n.lastBaseUpdate,
    s = n.shared.pending;
  if (s !== null) {
    n.shared.pending = null;
    var r = s,
      o = r.next;
    ((r.next = null), c === null ? (u = o) : (c.next = o), (c = r));
    var b = e.alternate;
    b !== null &&
      ((b = b.updateQueue),
      (s = b.lastBaseUpdate),
      s !== c &&
        (s === null ? (b.firstBaseUpdate = o) : (s.next = o),
        (b.lastBaseUpdate = r)));
  }
  if (u !== null) {
    var y = n.baseState;
    ((c = 0), (b = o = r = null), (s = u));
    do {
      var d = s.lane & -536870913,
        p = d !== s.lane;
      if (p ? (q & d) === d : (a & d) === d) {
        (d !== 0 && d === ca && (ri = !0),
          b !== null &&
            (b = b.next =
              {
                lane: 0,
                tag: s.tag,
                payload: s.payload,
                callback: null,
                next: null,
              }));
        e: {
          var N = e,
            A = s;
          d = t;
          var H = l;
          switch (A.tag) {
            case 1:
              if (((N = A.payload), typeof N == "function")) {
                y = N.call(H, y, d);
                break e;
              }
              y = N;
              break e;
            case 3:
              N.flags = (N.flags & -65537) | 128;
            case 0:
              if (
                ((N = A.payload),
                (d = typeof N == "function" ? N.call(H, y, d) : N),
                d == null)
              )
                break e;
              y = F({}, y, d);
              break e;
            case 2:
              Rt = !0;
          }
        }
        ((d = s.callback),
          d !== null &&
            ((e.flags |= 64),
            p && (e.flags |= 8192),
            (p = n.callbacks),
            p === null ? (n.callbacks = [d]) : p.push(d)));
      } else
        ((p = {
          lane: d,
          tag: s.tag,
          payload: s.payload,
          callback: s.callback,
          next: null,
        }),
          b === null ? ((o = b = p), (r = y)) : (b = b.next = p),
          (c |= d));
      if (((s = s.next), s === null)) {
        if (((s = n.shared.pending), s === null)) break;
        ((p = s),
          (s = p.next),
          (p.next = null),
          (n.lastBaseUpdate = p),
          (n.shared.pending = null));
      }
    } while (!0);
    (b === null && (r = y),
      (n.baseState = r),
      (n.firstBaseUpdate = o),
      (n.lastBaseUpdate = b),
      u === null && (n.shared.lanes = 0),
      (It |= c),
      (e.lanes = c),
      (e.memoizedState = y));
  }
}
function Eo(e, t) {
  if (typeof e != "function") throw Error(x(191, e));
  e.call(t);
}
function zo(e, t) {
  var l = e.callbacks;
  if (l !== null)
    for (e.callbacks = null, e = 0; e < l.length; e++) Eo(l[e], t);
}
var ia = rt(null),
  yu = rt(0);
function Nr(e, t) {
  ((e = Et), I(yu, e), I(ia, t), (Et = e | t.baseLanes));
}
function fi() {
  (I(yu, Et), I(ia, ia.current));
}
function cs() {
  ((Et = yu.current), ye(ia), ye(yu));
}
var Wt = 0,
  _ = null,
  L = null,
  re = null,
  gu = !1,
  Il = !1,
  gl = !1,
  xu = 0,
  ln = 0,
  ea = null,
  bp = 0;
function ce() {
  throw Error(x(321));
}
function is(e, t) {
  if (t === null) return !1;
  for (var l = 0; l < t.length && l < e.length; l++)
    if (!Ye(e[l], t[l])) return !1;
  return !0;
}
function ss(e, t, l, a, n, u) {
  return (
    (Wt = u),
    (_ = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (w.H = e === null || e.memoizedState === null ? ud : cd),
    (gl = !1),
    (u = l(a, n)),
    (gl = !1),
    Il && (u = Mo(t, l, a, n)),
    wo(e),
    u
  );
}
function wo(e) {
  w.H = vu;
  var t = L !== null && L.next !== null;
  if (((Wt = 0), (re = L = _ = null), (gu = !1), (ln = 0), (ea = null), t))
    throw Error(x(300));
  e === null || be || ((e = e.dependencies), e !== null && bu(e) && (be = !0));
}
function Mo(e, t, l, a) {
  _ = e;
  var n = 0;
  do {
    if ((Il && (ea = null), (ln = 0), (Il = !1), 25 <= n)) throw Error(x(301));
    if (((n += 1), (re = L = null), e.updateQueue != null)) {
      var u = e.updateQueue;
      ((u.lastEffect = null),
        (u.events = null),
        (u.stores = null),
        u.memoCache != null && (u.memoCache.index = 0));
    }
    ((w.H = Np), (u = t(l, a)));
  } while (Il);
  return u;
}
function yp() {
  var e = w.H,
    t = e.useState()[0];
  return (
    (t = typeof t.then == "function" ? Nn(t) : t),
    (e = e.useState()[0]),
    (L !== null ? L.memoizedState : null) !== e && (_.flags |= 1024),
    t
  );
}
function rs() {
  var e = xu !== 0;
  return ((xu = 0), e);
}
function fs(e, t, l) {
  ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~l));
}
function os(e) {
  if (gu) {
    for (e = e.memoizedState; e !== null; ) {
      var t = e.queue;
      (t !== null && (t.pending = null), (e = e.next));
    }
    gu = !1;
  }
  ((Wt = 0), (re = L = _ = null), (Il = !1), (ln = xu = 0), (ea = null));
}
function Ee() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return (re === null ? (_.memoizedState = re = e) : (re = re.next = e), re);
}
function fe() {
  if (L === null) {
    var e = _.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = L.next;
  var t = re === null ? _.memoizedState : re.next;
  if (t !== null) ((re = t), (L = e));
  else {
    if (e === null) throw _.alternate === null ? Error(x(467)) : Error(x(310));
    ((L = e),
      (e = {
        memoizedState: L.memoizedState,
        baseState: L.baseState,
        baseQueue: L.baseQueue,
        queue: L.queue,
        next: null,
      }),
      re === null ? (_.memoizedState = re = e) : (re = re.next = e));
  }
  return re;
}
function ds() {
  return { lastEffect: null, events: null, stores: null, memoCache: null };
}
function Nn(e) {
  var t = ln;
  return (
    (ln += 1),
    ea === null && (ea = []),
    (e = To(ea, e, t)),
    (t = _),
    (re === null ? t.memoizedState : re.next) === null &&
      ((t = t.alternate),
      (w.H = t === null || t.memoizedState === null ? ud : cd)),
    e
  );
}
function Vu(e) {
  if (e !== null && typeof e == "object") {
    if (typeof e.then == "function") return Nn(e);
    if (e.$$typeof === bt) return je(e);
  }
  throw Error(x(438, String(e)));
}
function hs(e) {
  var t = null,
    l = _.updateQueue;
  if ((l !== null && (t = l.memoCache), t == null)) {
    var a = _.alternate;
    a !== null &&
      ((a = a.updateQueue),
      a !== null &&
        ((a = a.memoCache),
        a != null &&
          (t = {
            data: a.data.map(function (n) {
              return n.slice();
            }),
            index: 0,
          })));
  }
  if (
    (t == null && (t = { data: [], index: 0 }),
    l === null && ((l = ds()), (_.updateQueue = l)),
    (l.memoCache = t),
    (l = t.data[t.index]),
    l === void 0)
  )
    for (l = t.data[t.index] = Array(e), a = 0; a < e; a++) l[a] = tm;
  return (t.index++, l);
}
function At(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function eu(e) {
  var t = fe();
  return ms(t, L, e);
}
function ms(e, t, l) {
  var a = e.queue;
  if (a === null) throw Error(x(311));
  a.lastRenderedReducer = l;
  var n = e.baseQueue,
    u = a.pending;
  if (u !== null) {
    if (n !== null) {
      var c = n.next;
      ((n.next = u.next), (u.next = c));
    }
    ((t.baseQueue = n = u), (a.pending = null));
  }
  if (((u = e.baseState), n === null)) e.memoizedState = u;
  else {
    t = n.next;
    var s = (c = null),
      r = null,
      o = t,
      b = !1;
    do {
      var y = o.lane & -536870913;
      if (y !== o.lane ? (q & y) === y : (Wt & y) === y) {
        var d = o.revertLane;
        if (d === 0)
          (r !== null &&
            (r = r.next =
              {
                lane: 0,
                revertLane: 0,
                action: o.action,
                hasEagerState: o.hasEagerState,
                eagerState: o.eagerState,
                next: null,
              }),
            y === ca && (b = !0));
        else if ((Wt & d) === d) {
          ((o = o.next), d === ca && (b = !0));
          continue;
        } else
          ((y = {
            lane: 0,
            revertLane: o.revertLane,
            action: o.action,
            hasEagerState: o.hasEagerState,
            eagerState: o.eagerState,
            next: null,
          }),
            r === null ? ((s = r = y), (c = u)) : (r = r.next = y),
            (_.lanes |= d),
            (It |= d));
        ((y = o.action),
          gl && l(u, y),
          (u = o.hasEagerState ? o.eagerState : l(u, y)));
      } else
        ((d = {
          lane: y,
          revertLane: o.revertLane,
          action: o.action,
          hasEagerState: o.hasEagerState,
          eagerState: o.eagerState,
          next: null,
        }),
          r === null ? ((s = r = d), (c = u)) : (r = r.next = d),
          (_.lanes |= y),
          (It |= y));
      o = o.next;
    } while (o !== null && o !== t);
    if (
      (r === null ? (c = u) : (r.next = s),
      !Ye(u, e.memoizedState) && ((be = !0), b && ((l = Pl), l !== null)))
    )
      throw l;
    ((e.memoizedState = u),
      (e.baseState = c),
      (e.baseQueue = r),
      (a.lastRenderedState = u));
  }
  return (n === null && (a.lanes = 0), [e.memoizedState, a.dispatch]);
}
function Sc(e) {
  var t = fe(),
    l = t.queue;
  if (l === null) throw Error(x(311));
  l.lastRenderedReducer = e;
  var a = l.dispatch,
    n = l.pending,
    u = t.memoizedState;
  if (n !== null) {
    l.pending = null;
    var c = (n = n.next);
    do ((u = e(u, c.action)), (c = c.next));
    while (c !== n);
    (Ye(u, t.memoizedState) || (be = !0),
      (t.memoizedState = u),
      t.baseQueue === null && (t.baseState = u),
      (l.lastRenderedState = u));
  }
  return [u, a];
}
function Oo(e, t, l) {
  var a = _,
    n = fe(),
    u = Y;
  if (u) {
    if (l === void 0) throw Error(x(407));
    l = l();
  } else l = t();
  var c = !Ye((L || n).memoizedState, l);
  (c && ((n.memoizedState = l), (be = !0)), (n = n.queue));
  var s = Ro.bind(null, a, n, e);
  if (
    (kn(2048, 8, s, [e]),
    n.getSnapshot !== t || c || (re !== null && re.memoizedState.tag & 1))
  ) {
    if (
      ((a.flags |= 2048),
      sa(9, Ju(), _o.bind(null, a, n, l, t), null),
      $ === null)
    )
      throw Error(x(349));
    u || Wt & 124 || Do(a, t, l);
  }
  return l;
}
function Do(e, t, l) {
  ((e.flags |= 16384),
    (e = { getSnapshot: t, value: l }),
    (t = _.updateQueue),
    t === null
      ? ((t = ds()), (_.updateQueue = t), (t.stores = [e]))
      : ((l = t.stores), l === null ? (t.stores = [e]) : l.push(e)));
}
function _o(e, t, l, a) {
  ((t.value = l), (t.getSnapshot = a), Co(t) && Uo(e));
}
function Ro(e, t, l) {
  return l(function () {
    Co(t) && Uo(e);
  });
}
function Co(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var l = t();
    return !Ye(e, l);
  } catch {
    return !0;
  }
}
function Uo(e) {
  var t = ya(e, 2);
  t !== null && Ge(t, e, 2);
}
function oi(e) {
  var t = Ee();
  if (typeof e == "function") {
    var l = e;
    if (((e = l()), gl)) {
      Bt(!0);
      try {
        l();
      } finally {
        Bt(!1);
      }
    }
  }
  return (
    (t.memoizedState = t.baseState = e),
    (t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: At,
      lastRenderedState: e,
    }),
    t
  );
}
function Ho(e, t, l, a) {
  return ((e.baseState = l), ms(e, L, typeof a == "function" ? a : At));
}
function gp(e, t, l, a, n) {
  if ($u(e)) throw Error(x(485));
  if (((e = t.action), e !== null)) {
    var u = {
      payload: n,
      action: e,
      next: null,
      isTransition: !0,
      status: "pending",
      value: null,
      reason: null,
      listeners: [],
      then: function (c) {
        u.listeners.push(c);
      },
    };
    (w.T !== null ? l(!0) : (u.isTransition = !1),
      a(u),
      (l = t.pending),
      l === null
        ? ((u.next = t.pending = u), qo(t, u))
        : ((u.next = l.next), (t.pending = l.next = u)));
  }
}
function qo(e, t) {
  var l = t.action,
    a = t.payload,
    n = e.state;
  if (t.isTransition) {
    var u = w.T,
      c = {};
    w.T = c;
    try {
      var s = l(n, a),
        r = w.S;
      (r !== null && r(c, s), kr(e, t, s));
    } catch (o) {
      di(e, t, o);
    } finally {
      w.T = u;
    }
  } else
    try {
      ((u = l(n, a)), kr(e, t, u));
    } catch (o) {
      di(e, t, o);
    }
}
function kr(e, t, l) {
  l !== null && typeof l == "object" && typeof l.then == "function"
    ? l.then(
        function (a) {
          Ar(e, t, a);
        },
        function (a) {
          return di(e, t, a);
        },
      )
    : Ar(e, t, l);
}
function Ar(e, t, l) {
  ((t.status = "fulfilled"),
    (t.value = l),
    Bo(t),
    (e.state = l),
    (t = e.pending),
    t !== null &&
      ((l = t.next),
      l === t ? (e.pending = null) : ((l = l.next), (t.next = l), qo(e, l))));
}
function di(e, t, l) {
  var a = e.pending;
  if (((e.pending = null), a !== null)) {
    a = a.next;
    do ((t.status = "rejected"), (t.reason = l), Bo(t), (t = t.next));
    while (t !== a);
  }
  e.action = null;
}
function Bo(e) {
  e = e.listeners;
  for (var t = 0; t < e.length; t++) (0, e[t])();
}
function Go(e, t) {
  return t;
}
function Tr(e, t) {
  if (Y) {
    var l = $.formState;
    if (l !== null) {
      e: {
        var a = _;
        if (Y) {
          if (ae) {
            t: {
              for (var n = ae, u = at; n.nodeType !== 8; ) {
                if (!u) {
                  n = null;
                  break t;
                }
                if (((n = et(n.nextSibling)), n === null)) {
                  n = null;
                  break t;
                }
              }
              ((u = n.data), (n = u === "F!" || u === "F" ? n : null));
            }
            if (n) {
              ((ae = et(n.nextSibling)), (a = n.data === "F!"));
              break e;
            }
          }
          bl(a);
        }
        a = !1;
      }
      a && (t = l[0]);
    }
  }
  return (
    (l = Ee()),
    (l.memoizedState = l.baseState = t),
    (a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Go,
      lastRenderedState: t,
    }),
    (l.queue = a),
    (l = ld.bind(null, _, a)),
    (a.dispatch = l),
    (a = oi(!1)),
    (u = gs.bind(null, _, !1, a.queue)),
    (a = Ee()),
    (n = { state: t, dispatch: null, action: e, pending: null }),
    (a.queue = n),
    (l = gp.bind(null, _, n, u, l)),
    (n.dispatch = l),
    (a.memoizedState = e),
    [t, l, !1]
  );
}
function Er(e) {
  var t = fe();
  return Yo(t, L, e);
}
function Yo(e, t, l) {
  if (
    ((t = ms(e, t, Go)[0]),
    (e = eu(At)[0]),
    typeof t == "object" && t !== null && typeof t.then == "function")
  )
    try {
      var a = Nn(t);
    } catch (c) {
      throw c === jn ? Lu : c;
    }
  else a = t;
  t = fe();
  var n = t.queue,
    u = n.dispatch;
  return (
    l !== t.memoizedState &&
      ((_.flags |= 2048), sa(9, Ju(), xp.bind(null, n, l), null)),
    [a, u, e]
  );
}
function xp(e, t) {
  e.action = t;
}
function zr(e) {
  var t = fe(),
    l = L;
  if (l !== null) return Yo(t, l, e);
  (fe(), (t = t.memoizedState), (l = fe()));
  var a = l.queue.dispatch;
  return ((l.memoizedState = e), [t, a, !1]);
}
function sa(e, t, l, a) {
  return (
    (e = { tag: e, create: l, deps: a, inst: t, next: null }),
    (t = _.updateQueue),
    t === null && ((t = ds()), (_.updateQueue = t)),
    (l = t.lastEffect),
    l === null
      ? (t.lastEffect = e.next = e)
      : ((a = l.next), (l.next = e), (e.next = a), (t.lastEffect = e)),
    e
  );
}
function Ju() {
  return { destroy: void 0, resource: void 0 };
}
function Qo() {
  return fe().memoizedState;
}
function tu(e, t, l, a) {
  var n = Ee();
  ((a = a === void 0 ? null : a),
    (_.flags |= e),
    (n.memoizedState = sa(1 | t, Ju(), l, a)));
}
function kn(e, t, l, a) {
  var n = fe();
  a = a === void 0 ? null : a;
  var u = n.memoizedState.inst;
  L !== null && a !== null && is(a, L.memoizedState.deps)
    ? (n.memoizedState = sa(t, u, l, a))
    : ((_.flags |= e), (n.memoizedState = sa(1 | t, u, l, a)));
}
function wr(e, t) {
  tu(8390656, 8, e, t);
}
function Xo(e, t) {
  kn(2048, 8, e, t);
}
function Ko(e, t) {
  return kn(4, 2, e, t);
}
function Zo(e, t) {
  return kn(4, 4, e, t);
}
function Lo(e, t) {
  if (typeof t == "function") {
    e = e();
    var l = t(e);
    return function () {
      typeof l == "function" ? l() : t(null);
    };
  }
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function Vo(e, t, l) {
  ((l = l != null ? l.concat([e]) : null), kn(4, 4, Lo.bind(null, t, e), l));
}
function ps() {}
function Jo(e, t) {
  var l = fe();
  t = t === void 0 ? null : t;
  var a = l.memoizedState;
  return t !== null && is(t, a[1]) ? a[0] : ((l.memoizedState = [e, t]), e);
}
function $o(e, t) {
  var l = fe();
  t = t === void 0 ? null : t;
  var a = l.memoizedState;
  if (t !== null && is(t, a[1])) return a[0];
  if (((a = e()), gl)) {
    Bt(!0);
    try {
      e();
    } finally {
      Bt(!1);
    }
  }
  return ((l.memoizedState = [a, t]), a);
}
function bs(e, t, l) {
  return l === void 0 || Wt & 1073741824
    ? (e.memoizedState = t)
    : ((e.memoizedState = l), (e = Bd()), (_.lanes |= e), (It |= e), l);
}
function Fo(e, t, l, a) {
  return Ye(l, t)
    ? l
    : ia.current !== null
      ? ((e = bs(e, l, a)), Ye(e, t) || (be = !0), e)
      : Wt & 42
        ? ((e = Bd()), (_.lanes |= e), (It |= e), t)
        : ((be = !0), (e.memoizedState = l));
}
function Wo(e, t, l, a, n) {
  var u = Q.p;
  Q.p = u !== 0 && 8 > u ? u : 8;
  var c = w.T,
    s = {};
  ((w.T = s), gs(e, !1, t, l));
  try {
    var r = n(),
      o = w.S;
    if (
      (o !== null && o(s, r),
      r !== null && typeof r == "object" && typeof r.then == "function")
    ) {
      var b = pp(r, a);
      Za(e, t, b, Be(e));
    } else Za(e, t, a, Be(e));
  } catch (y) {
    Za(e, t, { then: function () {}, status: "rejected", reason: y }, Be());
  } finally {
    ((Q.p = u), (w.T = c));
  }
}
function vp() {}
function hi(e, t, l, a) {
  if (e.tag !== 5) throw Error(x(476));
  var n = Po(e).queue;
  Wo(
    e,
    n,
    t,
    rl,
    l === null
      ? vp
      : function () {
          return (Io(e), l(a));
        },
  );
}
function Po(e) {
  var t = e.memoizedState;
  if (t !== null) return t;
  t = {
    memoizedState: rl,
    baseState: rl,
    baseQueue: null,
    queue: {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: At,
      lastRenderedState: rl,
    },
    next: null,
  };
  var l = {};
  return (
    (t.next = {
      memoizedState: l,
      baseState: l,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: At,
        lastRenderedState: l,
      },
      next: null,
    }),
    (e.memoizedState = t),
    (e = e.alternate),
    e !== null && (e.memoizedState = t),
    t
  );
}
function Io(e) {
  var t = Po(e).next.queue;
  Za(e, t, {}, Be());
}
function ys() {
  return je(sn);
}
function ed() {
  return fe().memoizedState;
}
function td() {
  return fe().memoizedState;
}
function Sp(e) {
  for (var t = e.return; t !== null; ) {
    switch (t.tag) {
      case 24:
      case 3:
        var l = Be();
        e = Kt(l);
        var a = Zt(t, e, l);
        (a !== null && (Ge(a, t, l), Qa(a, t, l)),
          (t = { cache: as() }),
          (e.payload = t));
        return;
    }
    t = t.return;
  }
}
function jp(e, t, l) {
  var a = Be();
  ((l = {
    lane: a,
    revertLane: 0,
    action: l,
    hasEagerState: !1,
    eagerState: null,
    next: null,
  }),
    $u(e)
      ? ad(t, l)
      : ((l = Ii(e, t, l, a)), l !== null && (Ge(l, e, a), nd(l, t, a))));
}
function ld(e, t, l) {
  var a = Be();
  Za(e, t, l, a);
}
function Za(e, t, l, a) {
  var n = {
    lane: a,
    revertLane: 0,
    action: l,
    hasEagerState: !1,
    eagerState: null,
    next: null,
  };
  if ($u(e)) ad(t, n);
  else {
    var u = e.alternate;
    if (
      e.lanes === 0 &&
      (u === null || u.lanes === 0) &&
      ((u = t.lastRenderedReducer), u !== null)
    )
      try {
        var c = t.lastRenderedState,
          s = u(c, l);
        if (((n.hasEagerState = !0), (n.eagerState = s), Ye(s, c)))
          return (Zu(e, t, n, 0), $ === null && Ku(), !1);
      } catch {
      } finally {
      }
    if (((l = Ii(e, t, n, a)), l !== null))
      return (Ge(l, e, a), nd(l, t, a), !0);
  }
  return !1;
}
function gs(e, t, l, a) {
  if (
    ((a = {
      lane: 2,
      revertLane: Ts(),
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    $u(e))
  ) {
    if (t) throw Error(x(479));
  } else ((t = Ii(e, l, a, 2)), t !== null && Ge(t, e, 2));
}
function $u(e) {
  var t = e.alternate;
  return e === _ || (t !== null && t === _);
}
function ad(e, t) {
  Il = gu = !0;
  var l = e.pending;
  (l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
    (e.pending = t));
}
function nd(e, t, l) {
  if (l & 4194048) {
    var a = t.lanes;
    ((a &= e.pendingLanes), (l |= a), (t.lanes = l), Vf(e, l));
  }
}
var vu = {
    readContext: je,
    use: Vu,
    useCallback: ce,
    useContext: ce,
    useEffect: ce,
    useImperativeHandle: ce,
    useLayoutEffect: ce,
    useInsertionEffect: ce,
    useMemo: ce,
    useReducer: ce,
    useRef: ce,
    useState: ce,
    useDebugValue: ce,
    useDeferredValue: ce,
    useTransition: ce,
    useSyncExternalStore: ce,
    useId: ce,
    useHostTransitionStatus: ce,
    useFormState: ce,
    useActionState: ce,
    useOptimistic: ce,
    useMemoCache: ce,
    useCacheRefresh: ce,
  },
  ud = {
    readContext: je,
    use: Vu,
    useCallback: function (e, t) {
      return ((Ee().memoizedState = [e, t === void 0 ? null : t]), e);
    },
    useContext: je,
    useEffect: wr,
    useImperativeHandle: function (e, t, l) {
      ((l = l != null ? l.concat([e]) : null),
        tu(4194308, 4, Lo.bind(null, t, e), l));
    },
    useLayoutEffect: function (e, t) {
      return tu(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      tu(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var l = Ee();
      t = t === void 0 ? null : t;
      var a = e();
      if (gl) {
        Bt(!0);
        try {
          e();
        } finally {
          Bt(!1);
        }
      }
      return ((l.memoizedState = [a, t]), a);
    },
    useReducer: function (e, t, l) {
      var a = Ee();
      if (l !== void 0) {
        var n = l(t);
        if (gl) {
          Bt(!0);
          try {
            l(t);
          } finally {
            Bt(!1);
          }
        }
      } else n = t;
      return (
        (a.memoizedState = a.baseState = n),
        (e = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: n,
        }),
        (a.queue = e),
        (e = e.dispatch = jp.bind(null, _, e)),
        [a.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = Ee();
      return ((e = { current: e }), (t.memoizedState = e));
    },
    useState: function (e) {
      e = oi(e);
      var t = e.queue,
        l = ld.bind(null, _, t);
      return ((t.dispatch = l), [e.memoizedState, l]);
    },
    useDebugValue: ps,
    useDeferredValue: function (e, t) {
      var l = Ee();
      return bs(l, e, t);
    },
    useTransition: function () {
      var e = oi(!1);
      return (
        (e = Wo.bind(null, _, e.queue, !0, !1)),
        (Ee().memoizedState = e),
        [!1, e]
      );
    },
    useSyncExternalStore: function (e, t, l) {
      var a = _,
        n = Ee();
      if (Y) {
        if (l === void 0) throw Error(x(407));
        l = l();
      } else {
        if (((l = t()), $ === null)) throw Error(x(349));
        q & 124 || Do(a, t, l);
      }
      n.memoizedState = l;
      var u = { value: l, getSnapshot: t };
      return (
        (n.queue = u),
        wr(Ro.bind(null, a, u, e), [e]),
        (a.flags |= 2048),
        sa(9, Ju(), _o.bind(null, a, u, l, t), null),
        l
      );
    },
    useId: function () {
      var e = Ee(),
        t = $.identifierPrefix;
      if (Y) {
        var l = gt,
          a = yt;
        ((l = (a & ~(1 << (32 - qe(a) - 1))).toString(32) + l),
          (t = "«" + t + "R" + l),
          (l = xu++),
          0 < l && (t += "H" + l.toString(32)),
          (t += "»"));
      } else ((l = bp++), (t = "«" + t + "r" + l.toString(32) + "»"));
      return (e.memoizedState = t);
    },
    useHostTransitionStatus: ys,
    useFormState: Tr,
    useActionState: Tr,
    useOptimistic: function (e) {
      var t = Ee();
      t.memoizedState = t.baseState = e;
      var l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null,
      };
      return (
        (t.queue = l),
        (t = gs.bind(null, _, !0, l)),
        (l.dispatch = t),
        [e, t]
      );
    },
    useMemoCache: hs,
    useCacheRefresh: function () {
      return (Ee().memoizedState = Sp.bind(null, _));
    },
  },
  cd = {
    readContext: je,
    use: Vu,
    useCallback: Jo,
    useContext: je,
    useEffect: Xo,
    useImperativeHandle: Vo,
    useInsertionEffect: Ko,
    useLayoutEffect: Zo,
    useMemo: $o,
    useReducer: eu,
    useRef: Qo,
    useState: function () {
      return eu(At);
    },
    useDebugValue: ps,
    useDeferredValue: function (e, t) {
      var l = fe();
      return Fo(l, L.memoizedState, e, t);
    },
    useTransition: function () {
      var e = eu(At)[0],
        t = fe().memoizedState;
      return [typeof e == "boolean" ? e : Nn(e), t];
    },
    useSyncExternalStore: Oo,
    useId: ed,
    useHostTransitionStatus: ys,
    useFormState: Er,
    useActionState: Er,
    useOptimistic: function (e, t) {
      var l = fe();
      return Ho(l, L, e, t);
    },
    useMemoCache: hs,
    useCacheRefresh: td,
  },
  Np = {
    readContext: je,
    use: Vu,
    useCallback: Jo,
    useContext: je,
    useEffect: Xo,
    useImperativeHandle: Vo,
    useInsertionEffect: Ko,
    useLayoutEffect: Zo,
    useMemo: $o,
    useReducer: Sc,
    useRef: Qo,
    useState: function () {
      return Sc(At);
    },
    useDebugValue: ps,
    useDeferredValue: function (e, t) {
      var l = fe();
      return L === null ? bs(l, e, t) : Fo(l, L.memoizedState, e, t);
    },
    useTransition: function () {
      var e = Sc(At)[0],
        t = fe().memoizedState;
      return [typeof e == "boolean" ? e : Nn(e), t];
    },
    useSyncExternalStore: Oo,
    useId: ed,
    useHostTransitionStatus: ys,
    useFormState: zr,
    useActionState: zr,
    useOptimistic: function (e, t) {
      var l = fe();
      return L !== null
        ? Ho(l, L, e, t)
        : ((l.baseState = e), [e, l.queue.dispatch]);
    },
    useMemoCache: hs,
    useCacheRefresh: td,
  },
  ta = null,
  an = 0;
function Gn(e) {
  var t = an;
  return ((an += 1), ta === null && (ta = []), To(ta, e, t));
}
function Ea(e, t) {
  ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
}
function Yn(e, t) {
  throw t.$$typeof === Ih
    ? Error(x(525))
    : ((e = Object.prototype.toString.call(t)),
      Error(
        x(
          31,
          e === "[object Object]"
            ? "object with keys {" + Object.keys(t).join(", ") + "}"
            : e,
        ),
      ));
}
function Mr(e) {
  var t = e._init;
  return t(e._payload);
}
function id(e) {
  function t(h, f) {
    if (e) {
      var m = h.deletions;
      m === null ? ((h.deletions = [f]), (h.flags |= 16)) : m.push(f);
    }
  }
  function l(h, f) {
    if (!e) return null;
    for (; f !== null; ) (t(h, f), (f = f.sibling));
    return null;
  }
  function a(h) {
    for (var f = new Map(); h !== null; )
      (h.key !== null ? f.set(h.key, h) : f.set(h.index, h), (h = h.sibling));
    return f;
  }
  function n(h, f) {
    return ((h = jt(h, f)), (h.index = 0), (h.sibling = null), h);
  }
  function u(h, f, m) {
    return (
      (h.index = m),
      e
        ? ((m = h.alternate),
          m !== null
            ? ((m = m.index), m < f ? ((h.flags |= 67108866), f) : m)
            : ((h.flags |= 67108866), f))
        : ((h.flags |= 1048576), f)
    );
  }
  function c(h) {
    return (e && h.alternate === null && (h.flags |= 67108866), h);
  }
  function s(h, f, m, g) {
    return f === null || f.tag !== 6
      ? ((f = gc(m, h.mode, g)), (f.return = h), f)
      : ((f = n(f, m)), (f.return = h), f);
  }
  function r(h, f, m, g) {
    var v = m.type;
    return v === Hl
      ? b(h, f, m.props.children, g, m.key)
      : f !== null &&
          (f.elementType === v ||
            (typeof v == "object" &&
              v !== null &&
              v.$$typeof === _t &&
              Mr(v) === f.type))
        ? ((f = n(f, m.props)), Ea(f, m), (f.return = h), f)
        : ((f = Pn(m.type, m.key, m.props, null, h.mode, g)),
          Ea(f, m),
          (f.return = h),
          f);
  }
  function o(h, f, m, g) {
    return f === null ||
      f.tag !== 4 ||
      f.stateNode.containerInfo !== m.containerInfo ||
      f.stateNode.implementation !== m.implementation
      ? ((f = xc(m, h.mode, g)), (f.return = h), f)
      : ((f = n(f, m.children || [])), (f.return = h), f);
  }
  function b(h, f, m, g, v) {
    return f === null || f.tag !== 7
      ? ((f = fl(m, h.mode, g, v)), (f.return = h), f)
      : ((f = n(f, m)), (f.return = h), f);
  }
  function y(h, f, m) {
    if (
      (typeof f == "string" && f !== "") ||
      typeof f == "number" ||
      typeof f == "bigint"
    )
      return ((f = gc("" + f, h.mode, m)), (f.return = h), f);
    if (typeof f == "object" && f !== null) {
      switch (f.$$typeof) {
        case _n:
          return (
            (m = Pn(f.type, f.key, f.props, null, h.mode, m)),
            Ea(m, f),
            (m.return = h),
            m
          );
        case Da:
          return ((f = xc(f, h.mode, m)), (f.return = h), f);
        case _t:
          var g = f._init;
          return ((f = g(f._payload)), y(h, f, m));
      }
      if (_a(f) || Na(f))
        return ((f = fl(f, h.mode, m, null)), (f.return = h), f);
      if (typeof f.then == "function") return y(h, Gn(f), m);
      if (f.$$typeof === bt) return y(h, qn(h, f), m);
      Yn(h, f);
    }
    return null;
  }
  function d(h, f, m, g) {
    var v = f !== null ? f.key : null;
    if (
      (typeof m == "string" && m !== "") ||
      typeof m == "number" ||
      typeof m == "bigint"
    )
      return v !== null ? null : s(h, f, "" + m, g);
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case _n:
          return m.key === v ? r(h, f, m, g) : null;
        case Da:
          return m.key === v ? o(h, f, m, g) : null;
        case _t:
          return ((v = m._init), (m = v(m._payload)), d(h, f, m, g));
      }
      if (_a(m) || Na(m)) return v !== null ? null : b(h, f, m, g, null);
      if (typeof m.then == "function") return d(h, f, Gn(m), g);
      if (m.$$typeof === bt) return d(h, f, qn(h, m), g);
      Yn(h, m);
    }
    return null;
  }
  function p(h, f, m, g, v) {
    if (
      (typeof g == "string" && g !== "") ||
      typeof g == "number" ||
      typeof g == "bigint"
    )
      return ((h = h.get(m) || null), s(f, h, "" + g, v));
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case _n:
          return (
            (h = h.get(g.key === null ? m : g.key) || null),
            r(f, h, g, v)
          );
        case Da:
          return (
            (h = h.get(g.key === null ? m : g.key) || null),
            o(f, h, g, v)
          );
        case _t:
          var E = g._init;
          return ((g = E(g._payload)), p(h, f, m, g, v));
      }
      if (_a(g) || Na(g)) return ((h = h.get(m) || null), b(f, h, g, v, null));
      if (typeof g.then == "function") return p(h, f, m, Gn(g), v);
      if (g.$$typeof === bt) return p(h, f, m, qn(f, g), v);
      Yn(f, g);
    }
    return null;
  }
  function N(h, f, m, g) {
    for (
      var v = null, E = null, S = f, T = (f = 0), J = null;
      S !== null && T < m.length;
      T++
    ) {
      S.index > T ? ((J = S), (S = null)) : (J = S.sibling);
      var R = d(h, S, m[T], g);
      if (R === null) {
        S === null && (S = J);
        break;
      }
      (e && S && R.alternate === null && t(h, S),
        (f = u(R, f, T)),
        E === null ? (v = R) : (E.sibling = R),
        (E = R),
        (S = J));
    }
    if (T === m.length) return (l(h, S), Y && ul(h, T), v);
    if (S === null) {
      for (; T < m.length; T++)
        ((S = y(h, m[T], g)),
          S !== null &&
            ((f = u(S, f, T)),
            E === null ? (v = S) : (E.sibling = S),
            (E = S)));
      return (Y && ul(h, T), v);
    }
    for (S = a(S); T < m.length; T++)
      ((J = p(S, h, T, m[T], g)),
        J !== null &&
          (e && J.alternate !== null && S.delete(J.key === null ? T : J.key),
          (f = u(J, f, T)),
          E === null ? (v = J) : (E.sibling = J),
          (E = J)));
    return (
      e &&
        S.forEach(function (Ne) {
          return t(h, Ne);
        }),
      Y && ul(h, T),
      v
    );
  }
  function A(h, f, m, g) {
    if (m == null) throw Error(x(151));
    for (
      var v = null, E = null, S = f, T = (f = 0), J = null, R = m.next();
      S !== null && !R.done;
      T++, R = m.next()
    ) {
      S.index > T ? ((J = S), (S = null)) : (J = S.sibling);
      var Ne = d(h, S, R.value, g);
      if (Ne === null) {
        S === null && (S = J);
        break;
      }
      (e && S && Ne.alternate === null && t(h, S),
        (f = u(Ne, f, T)),
        E === null ? (v = Ne) : (E.sibling = Ne),
        (E = Ne),
        (S = J));
    }
    if (R.done) return (l(h, S), Y && ul(h, T), v);
    if (S === null) {
      for (; !R.done; T++, R = m.next())
        ((R = y(h, R.value, g)),
          R !== null &&
            ((f = u(R, f, T)),
            E === null ? (v = R) : (E.sibling = R),
            (E = R)));
      return (Y && ul(h, T), v);
    }
    for (S = a(S); !R.done; T++, R = m.next())
      ((R = p(S, h, T, R.value, g)),
        R !== null &&
          (e && R.alternate !== null && S.delete(R.key === null ? T : R.key),
          (f = u(R, f, T)),
          E === null ? (v = R) : (E.sibling = R),
          (E = R)));
    return (
      e &&
        S.forEach(function (We) {
          return t(h, We);
        }),
      Y && ul(h, T),
      v
    );
  }
  function H(h, f, m, g) {
    if (
      (typeof m == "object" &&
        m !== null &&
        m.type === Hl &&
        m.key === null &&
        (m = m.props.children),
      typeof m == "object" && m !== null)
    ) {
      switch (m.$$typeof) {
        case _n:
          e: {
            for (var v = m.key; f !== null; ) {
              if (f.key === v) {
                if (((v = m.type), v === Hl)) {
                  if (f.tag === 7) {
                    (l(h, f.sibling),
                      (g = n(f, m.props.children)),
                      (g.return = h),
                      (h = g));
                    break e;
                  }
                } else if (
                  f.elementType === v ||
                  (typeof v == "object" &&
                    v !== null &&
                    v.$$typeof === _t &&
                    Mr(v) === f.type)
                ) {
                  (l(h, f.sibling),
                    (g = n(f, m.props)),
                    Ea(g, m),
                    (g.return = h),
                    (h = g));
                  break e;
                }
                l(h, f);
                break;
              } else t(h, f);
              f = f.sibling;
            }
            m.type === Hl
              ? ((g = fl(m.props.children, h.mode, g, m.key)),
                (g.return = h),
                (h = g))
              : ((g = Pn(m.type, m.key, m.props, null, h.mode, g)),
                Ea(g, m),
                (g.return = h),
                (h = g));
          }
          return c(h);
        case Da:
          e: {
            for (v = m.key; f !== null; ) {
              if (f.key === v)
                if (
                  f.tag === 4 &&
                  f.stateNode.containerInfo === m.containerInfo &&
                  f.stateNode.implementation === m.implementation
                ) {
                  (l(h, f.sibling),
                    (g = n(f, m.children || [])),
                    (g.return = h),
                    (h = g));
                  break e;
                } else {
                  l(h, f);
                  break;
                }
              else t(h, f);
              f = f.sibling;
            }
            ((g = xc(m, h.mode, g)), (g.return = h), (h = g));
          }
          return c(h);
        case _t:
          return ((v = m._init), (m = v(m._payload)), H(h, f, m, g));
      }
      if (_a(m)) return N(h, f, m, g);
      if (Na(m)) {
        if (((v = Na(m)), typeof v != "function")) throw Error(x(150));
        return ((m = v.call(m)), A(h, f, m, g));
      }
      if (typeof m.then == "function") return H(h, f, Gn(m), g);
      if (m.$$typeof === bt) return H(h, f, qn(h, m), g);
      Yn(h, m);
    }
    return (typeof m == "string" && m !== "") ||
      typeof m == "number" ||
      typeof m == "bigint"
      ? ((m = "" + m),
        f !== null && f.tag === 6
          ? (l(h, f.sibling), (g = n(f, m)), (g.return = h), (h = g))
          : (l(h, f), (g = gc(m, h.mode, g)), (g.return = h), (h = g)),
        c(h))
      : l(h, f);
  }
  return function (h, f, m, g) {
    try {
      an = 0;
      var v = H(h, f, m, g);
      return ((ta = null), v);
    } catch (S) {
      if (S === jn || S === Lu) throw S;
      var E = Ue(29, S, null, h.mode);
      return ((E.lanes = g), (E.return = h), E);
    } finally {
    }
  };
}
var ra = id(!0),
  sd = id(!1),
  $e = rt(null),
  it = null;
function Ut(e) {
  var t = e.alternate;
  (I(de, de.current & 1),
    I($e, e),
    it === null &&
      (t === null || ia.current !== null || t.memoizedState !== null) &&
      (it = e));
}
function rd(e) {
  if (e.tag === 22) {
    if ((I(de, de.current), I($e, e), it === null)) {
      var t = e.alternate;
      t !== null && t.memoizedState !== null && (it = e);
    }
  } else Ht();
}
function Ht() {
  (I(de, de.current), I($e, $e.current));
}
function vt(e) {
  (ye($e), it === e && (it = null), ye(de));
}
var de = rt(0);
function Su(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var l = t.memoizedState;
      if (
        l !== null &&
        ((l = l.dehydrated), l === null || l.data === "$?" || Mi(l))
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      ((t.child.return = t), (t = t.child));
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    ((t.sibling.return = t.return), (t = t.sibling));
  }
  return null;
}
function jc(e, t, l, a) {
  ((t = e.memoizedState),
    (l = l(a, t)),
    (l = l == null ? t : F({}, t, l)),
    (e.memoizedState = l),
    e.lanes === 0 && (e.updateQueue.baseState = l));
}
var mi = {
  enqueueSetState: function (e, t, l) {
    e = e._reactInternals;
    var a = Be(),
      n = Kt(a);
    ((n.payload = t),
      l != null && (n.callback = l),
      (t = Zt(e, n, a)),
      t !== null && (Ge(t, e, a), Qa(t, e, a)));
  },
  enqueueReplaceState: function (e, t, l) {
    e = e._reactInternals;
    var a = Be(),
      n = Kt(a);
    ((n.tag = 1),
      (n.payload = t),
      l != null && (n.callback = l),
      (t = Zt(e, n, a)),
      t !== null && (Ge(t, e, a), Qa(t, e, a)));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var l = Be(),
      a = Kt(l);
    ((a.tag = 2),
      t != null && (a.callback = t),
      (t = Zt(e, a, l)),
      t !== null && (Ge(t, e, l), Qa(t, e, l)));
  },
};
function Or(e, t, l, a, n, u, c) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(a, u, c)
      : t.prototype && t.prototype.isPureReactComponent
        ? !en(l, a) || !en(n, u)
        : !0
  );
}
function Dr(e, t, l, a) {
  ((e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(l, a),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(l, a),
    t.state !== e && mi.enqueueReplaceState(t, t.state, null));
}
function xl(e, t) {
  var l = t;
  if ("ref" in t) {
    l = {};
    for (var a in t) a !== "ref" && (l[a] = t[a]);
  }
  if ((e = e.defaultProps)) {
    l === t && (l = F({}, l));
    for (var n in e) l[n] === void 0 && (l[n] = e[n]);
  }
  return l;
}
var ju =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        if (
          typeof window == "object" &&
          typeof window.ErrorEvent == "function"
        ) {
          var t = new window.ErrorEvent("error", {
            bubbles: !0,
            cancelable: !0,
            message:
              typeof e == "object" && e !== null && typeof e.message == "string"
                ? String(e.message)
                : String(e),
            error: e,
          });
          if (!window.dispatchEvent(t)) return;
        } else if (
          typeof process == "object" &&
          typeof process.emit == "function"
        ) {
          process.emit("uncaughtException", e);
          return;
        }
        console.error(e);
      };
function fd(e) {
  ju(e);
}
function od(e) {
  console.error(e);
}
function dd(e) {
  ju(e);
}
function Nu(e, t) {
  try {
    var l = e.onUncaughtError;
    l(t.value, { componentStack: t.stack });
  } catch (a) {
    setTimeout(function () {
      throw a;
    });
  }
}
function _r(e, t, l) {
  try {
    var a = e.onCaughtError;
    a(l.value, {
      componentStack: l.stack,
      errorBoundary: t.tag === 1 ? t.stateNode : null,
    });
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
function pi(e, t, l) {
  return (
    (l = Kt(l)),
    (l.tag = 3),
    (l.payload = { element: null }),
    (l.callback = function () {
      Nu(e, t);
    }),
    l
  );
}
function hd(e) {
  return ((e = Kt(e)), (e.tag = 3), e);
}
function md(e, t, l, a) {
  var n = l.type.getDerivedStateFromError;
  if (typeof n == "function") {
    var u = a.value;
    ((e.payload = function () {
      return n(u);
    }),
      (e.callback = function () {
        _r(t, l, a);
      }));
  }
  var c = l.stateNode;
  c !== null &&
    typeof c.componentDidCatch == "function" &&
    (e.callback = function () {
      (_r(t, l, a),
        typeof n != "function" &&
          (Lt === null ? (Lt = new Set([this])) : Lt.add(this)));
      var s = a.stack;
      this.componentDidCatch(a.value, { componentStack: s !== null ? s : "" });
    });
}
function kp(e, t, l, a, n) {
  if (
    ((l.flags |= 32768),
    a !== null && typeof a == "object" && typeof a.then == "function")
  ) {
    if (
      ((t = l.alternate),
      t !== null && vn(t, l, n, !0),
      (l = $e.current),
      l !== null)
    ) {
      switch (l.tag) {
        case 13:
          return (
            it === null ? Ni() : l.alternate === null && ne === 0 && (ne = 3),
            (l.flags &= -257),
            (l.flags |= 65536),
            (l.lanes = n),
            a === ii
              ? (l.flags |= 16384)
              : ((t = l.updateQueue),
                t === null ? (l.updateQueue = new Set([a])) : t.add(a),
                _c(e, a, n)),
            !1
          );
        case 22:
          return (
            (l.flags |= 65536),
            a === ii
              ? (l.flags |= 16384)
              : ((t = l.updateQueue),
                t === null
                  ? ((t = {
                      transitions: null,
                      markerInstances: null,
                      retryQueue: new Set([a]),
                    }),
                    (l.updateQueue = t))
                  : ((l = t.retryQueue),
                    l === null ? (t.retryQueue = new Set([a])) : l.add(a)),
                _c(e, a, n)),
            !1
          );
      }
      throw Error(x(435, l.tag));
    }
    return (_c(e, a, n), Ni(), !1);
  }
  if (Y)
    return (
      (t = $e.current),
      t !== null
        ? (!(t.flags & 65536) && (t.flags |= 256),
          (t.flags |= 65536),
          (t.lanes = n),
          a !== li && ((e = Error(x(422), { cause: a })), tn(Ve(e, l))))
        : (a !== li && ((t = Error(x(423), { cause: a })), tn(Ve(t, l))),
          (e = e.current.alternate),
          (e.flags |= 65536),
          (n &= -n),
          (e.lanes |= n),
          (a = Ve(a, l)),
          (n = pi(e.stateNode, a, n)),
          vc(e, n),
          ne !== 4 && (ne = 2)),
      !1
    );
  var u = Error(x(520), { cause: a });
  if (
    ((u = Ve(u, l)),
    Ja === null ? (Ja = [u]) : Ja.push(u),
    ne !== 4 && (ne = 2),
    t === null)
  )
    return !0;
  ((a = Ve(a, l)), (l = t));
  do {
    switch (l.tag) {
      case 3:
        return (
          (l.flags |= 65536),
          (e = n & -n),
          (l.lanes |= e),
          (e = pi(l.stateNode, a, e)),
          vc(l, e),
          !1
        );
      case 1:
        if (
          ((t = l.type),
          (u = l.stateNode),
          (l.flags & 128) === 0 &&
            (typeof t.getDerivedStateFromError == "function" ||
              (u !== null &&
                typeof u.componentDidCatch == "function" &&
                (Lt === null || !Lt.has(u)))))
        )
          return (
            (l.flags |= 65536),
            (n &= -n),
            (l.lanes |= n),
            (n = hd(n)),
            md(n, e, l, a),
            vc(l, n),
            !1
          );
    }
    l = l.return;
  } while (l !== null);
  return !1;
}
var pd = Error(x(461)),
  be = !1;
function ge(e, t, l, a) {
  t.child = e === null ? sd(t, null, l, a) : ra(t, e.child, l, a);
}
function Rr(e, t, l, a, n) {
  l = l.render;
  var u = t.ref;
  if ("ref" in a) {
    var c = {};
    for (var s in a) s !== "ref" && (c[s] = a[s]);
  } else c = a;
  return (
    yl(t),
    (a = ss(e, t, l, c, u, n)),
    (s = rs()),
    e !== null && !be
      ? (fs(e, t, n), Tt(e, t, n))
      : (Y && s && ts(t), (t.flags |= 1), ge(e, t, a, n), t.child)
  );
}
function Cr(e, t, l, a, n) {
  if (e === null) {
    var u = l.type;
    return typeof u == "function" &&
      !es(u) &&
      u.defaultProps === void 0 &&
      l.compare === null
      ? ((t.tag = 15), (t.type = u), bd(e, t, u, a, n))
      : ((e = Pn(l.type, null, a, t, t.mode, n)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((u = e.child), !xs(e, n))) {
    var c = u.memoizedProps;
    if (
      ((l = l.compare), (l = l !== null ? l : en), l(c, a) && e.ref === t.ref)
    )
      return Tt(e, t, n);
  }
  return (
    (t.flags |= 1),
    (e = jt(u, a)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function bd(e, t, l, a, n) {
  if (e !== null) {
    var u = e.memoizedProps;
    if (en(u, a) && e.ref === t.ref)
      if (((be = !1), (t.pendingProps = a = u), xs(e, n)))
        e.flags & 131072 && (be = !0);
      else return ((t.lanes = e.lanes), Tt(e, t, n));
  }
  return bi(e, t, l, a, n);
}
function yd(e, t, l) {
  var a = t.pendingProps,
    n = a.children,
    u = e !== null ? e.memoizedState : null;
  if (a.mode === "hidden") {
    if (t.flags & 128) {
      if (((a = u !== null ? u.baseLanes | l : l), e !== null)) {
        for (n = t.child = e.child, u = 0; n !== null; )
          ((u = u | n.lanes | n.childLanes), (n = n.sibling));
        t.childLanes = u & ~a;
      } else ((t.childLanes = 0), (t.child = null));
      return Ur(e, t, a, l);
    }
    if (l & 536870912)
      ((t.memoizedState = { baseLanes: 0, cachePool: null }),
        e !== null && In(t, u !== null ? u.cachePool : null),
        u !== null ? Nr(t, u) : fi(),
        rd(t));
    else
      return (
        (t.lanes = t.childLanes = 536870912),
        Ur(e, t, u !== null ? u.baseLanes | l : l, l)
      );
  } else
    u !== null
      ? (In(t, u.cachePool), Nr(t, u), Ht(), (t.memoizedState = null))
      : (e !== null && In(t, null), fi(), Ht());
  return (ge(e, t, n, l), t.child);
}
function Ur(e, t, l, a) {
  var n = ns();
  return (
    (n = n === null ? null : { parent: oe._currentValue, pool: n }),
    (t.memoizedState = { baseLanes: l, cachePool: n }),
    e !== null && In(t, null),
    fi(),
    rd(t),
    e !== null && vn(e, t, a, !0),
    null
  );
}
function lu(e, t) {
  var l = t.ref;
  if (l === null) e !== null && e.ref !== null && (t.flags |= 4194816);
  else {
    if (typeof l != "function" && typeof l != "object") throw Error(x(284));
    (e === null || e.ref !== l) && (t.flags |= 4194816);
  }
}
function bi(e, t, l, a, n) {
  return (
    yl(t),
    (l = ss(e, t, l, a, void 0, n)),
    (a = rs()),
    e !== null && !be
      ? (fs(e, t, n), Tt(e, t, n))
      : (Y && a && ts(t), (t.flags |= 1), ge(e, t, l, n), t.child)
  );
}
function Hr(e, t, l, a, n, u) {
  return (
    yl(t),
    (t.updateQueue = null),
    (l = Mo(t, a, l, n)),
    wo(e),
    (a = rs()),
    e !== null && !be
      ? (fs(e, t, u), Tt(e, t, u))
      : (Y && a && ts(t), (t.flags |= 1), ge(e, t, l, u), t.child)
  );
}
function qr(e, t, l, a, n) {
  if ((yl(t), t.stateNode === null)) {
    var u = Zl,
      c = l.contextType;
    (typeof c == "object" && c !== null && (u = je(c)),
      (u = new l(a, u)),
      (t.memoizedState =
        u.state !== null && u.state !== void 0 ? u.state : null),
      (u.updater = mi),
      (t.stateNode = u),
      (u._reactInternals = t),
      (u = t.stateNode),
      (u.props = a),
      (u.state = t.memoizedState),
      (u.refs = {}),
      us(t),
      (c = l.contextType),
      (u.context = typeof c == "object" && c !== null ? je(c) : Zl),
      (u.state = t.memoizedState),
      (c = l.getDerivedStateFromProps),
      typeof c == "function" && (jc(t, l, c, a), (u.state = t.memoizedState)),
      typeof l.getDerivedStateFromProps == "function" ||
        typeof u.getSnapshotBeforeUpdate == "function" ||
        (typeof u.UNSAFE_componentWillMount != "function" &&
          typeof u.componentWillMount != "function") ||
        ((c = u.state),
        typeof u.componentWillMount == "function" && u.componentWillMount(),
        typeof u.UNSAFE_componentWillMount == "function" &&
          u.UNSAFE_componentWillMount(),
        c !== u.state && mi.enqueueReplaceState(u, u.state, null),
        Ka(t, a, u, n),
        Xa(),
        (u.state = t.memoizedState)),
      typeof u.componentDidMount == "function" && (t.flags |= 4194308),
      (a = !0));
  } else if (e === null) {
    u = t.stateNode;
    var s = t.memoizedProps,
      r = xl(l, s);
    u.props = r;
    var o = u.context,
      b = l.contextType;
    ((c = Zl), typeof b == "object" && b !== null && (c = je(b)));
    var y = l.getDerivedStateFromProps;
    ((b =
      typeof y == "function" || typeof u.getSnapshotBeforeUpdate == "function"),
      (s = t.pendingProps !== s),
      b ||
        (typeof u.UNSAFE_componentWillReceiveProps != "function" &&
          typeof u.componentWillReceiveProps != "function") ||
        ((s || o !== c) && Dr(t, u, a, c)),
      (Rt = !1));
    var d = t.memoizedState;
    ((u.state = d),
      Ka(t, a, u, n),
      Xa(),
      (o = t.memoizedState),
      s || d !== o || Rt
        ? (typeof y == "function" && (jc(t, l, y, a), (o = t.memoizedState)),
          (r = Rt || Or(t, l, r, a, d, o, c))
            ? (b ||
                (typeof u.UNSAFE_componentWillMount != "function" &&
                  typeof u.componentWillMount != "function") ||
                (typeof u.componentWillMount == "function" &&
                  u.componentWillMount(),
                typeof u.UNSAFE_componentWillMount == "function" &&
                  u.UNSAFE_componentWillMount()),
              typeof u.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof u.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = a),
              (t.memoizedState = o)),
          (u.props = a),
          (u.state = o),
          (u.context = c),
          (a = r))
        : (typeof u.componentDidMount == "function" && (t.flags |= 4194308),
          (a = !1)));
  } else {
    ((u = t.stateNode),
      si(e, t),
      (c = t.memoizedProps),
      (b = xl(l, c)),
      (u.props = b),
      (y = t.pendingProps),
      (d = u.context),
      (o = l.contextType),
      (r = Zl),
      typeof o == "object" && o !== null && (r = je(o)),
      (s = l.getDerivedStateFromProps),
      (o =
        typeof s == "function" ||
        typeof u.getSnapshotBeforeUpdate == "function") ||
        (typeof u.UNSAFE_componentWillReceiveProps != "function" &&
          typeof u.componentWillReceiveProps != "function") ||
        ((c !== y || d !== r) && Dr(t, u, a, r)),
      (Rt = !1),
      (d = t.memoizedState),
      (u.state = d),
      Ka(t, a, u, n),
      Xa());
    var p = t.memoizedState;
    c !== y ||
    d !== p ||
    Rt ||
    (e !== null && e.dependencies !== null && bu(e.dependencies))
      ? (typeof s == "function" && (jc(t, l, s, a), (p = t.memoizedState)),
        (b =
          Rt ||
          Or(t, l, b, a, d, p, r) ||
          (e !== null && e.dependencies !== null && bu(e.dependencies)))
          ? (o ||
              (typeof u.UNSAFE_componentWillUpdate != "function" &&
                typeof u.componentWillUpdate != "function") ||
              (typeof u.componentWillUpdate == "function" &&
                u.componentWillUpdate(a, p, r),
              typeof u.UNSAFE_componentWillUpdate == "function" &&
                u.UNSAFE_componentWillUpdate(a, p, r)),
            typeof u.componentDidUpdate == "function" && (t.flags |= 4),
            typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof u.componentDidUpdate != "function" ||
              (c === e.memoizedProps && d === e.memoizedState) ||
              (t.flags |= 4),
            typeof u.getSnapshotBeforeUpdate != "function" ||
              (c === e.memoizedProps && d === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = a),
            (t.memoizedState = p)),
        (u.props = a),
        (u.state = p),
        (u.context = r),
        (a = b))
      : (typeof u.componentDidUpdate != "function" ||
          (c === e.memoizedProps && d === e.memoizedState) ||
          (t.flags |= 4),
        typeof u.getSnapshotBeforeUpdate != "function" ||
          (c === e.memoizedProps && d === e.memoizedState) ||
          (t.flags |= 1024),
        (a = !1));
  }
  return (
    (u = a),
    lu(e, t),
    (a = (t.flags & 128) !== 0),
    u || a
      ? ((u = t.stateNode),
        (l =
          a && typeof l.getDerivedStateFromError != "function"
            ? null
            : u.render()),
        (t.flags |= 1),
        e !== null && a
          ? ((t.child = ra(t, e.child, null, n)), (t.child = ra(t, null, l, n)))
          : ge(e, t, l, n),
        (t.memoizedState = u.state),
        (e = t.child))
      : (e = Tt(e, t, n)),
    e
  );
}
function Br(e, t, l, a) {
  return (xn(), (t.flags |= 256), ge(e, t, l, a), t.child);
}
var Nc = {
  dehydrated: null,
  treeContext: null,
  retryLane: 0,
  hydrationErrors: null,
};
function kc(e) {
  return { baseLanes: e, cachePool: ko() };
}
function Ac(e, t, l) {
  return ((e = e !== null ? e.childLanes & ~l : 0), t && (e |= Je), e);
}
function gd(e, t, l) {
  var a = t.pendingProps,
    n = !1,
    u = (t.flags & 128) !== 0,
    c;
  if (
    ((c = u) ||
      (c =
        e !== null && e.memoizedState === null ? !1 : (de.current & 2) !== 0),
    c && ((n = !0), (t.flags &= -129)),
    (c = (t.flags & 32) !== 0),
    (t.flags &= -33),
    e === null)
  ) {
    if (Y) {
      if ((n ? Ut(t) : Ht(), Y)) {
        var s = ae,
          r;
        if ((r = s)) {
          e: {
            for (r = s, s = at; r.nodeType !== 8; ) {
              if (!s) {
                s = null;
                break e;
              }
              if (((r = et(r.nextSibling)), r === null)) {
                s = null;
                break e;
              }
            }
            s = r;
          }
          s !== null
            ? ((t.memoizedState = {
                dehydrated: s,
                treeContext: ol !== null ? { id: yt, overflow: gt } : null,
                retryLane: 536870912,
                hydrationErrors: null,
              }),
              (r = Ue(18, null, null, 0)),
              (r.stateNode = s),
              (r.return = t),
              (t.child = r),
              (ke = t),
              (ae = null),
              (r = !0))
            : (r = !1);
        }
        r || bl(t);
      }
      if (
        ((s = t.memoizedState), s !== null && ((s = s.dehydrated), s !== null))
      )
        return (Mi(s) ? (t.lanes = 32) : (t.lanes = 536870912), null);
      vt(t);
    }
    return (
      (s = a.children),
      (a = a.fallback),
      n
        ? (Ht(),
          (n = t.mode),
          (s = ku({ mode: "hidden", children: s }, n)),
          (a = fl(a, n, l, null)),
          (s.return = t),
          (a.return = t),
          (s.sibling = a),
          (t.child = s),
          (n = t.child),
          (n.memoizedState = kc(l)),
          (n.childLanes = Ac(e, c, l)),
          (t.memoizedState = Nc),
          a)
        : (Ut(t), yi(t, s))
    );
  }
  if (((r = e.memoizedState), r !== null && ((s = r.dehydrated), s !== null))) {
    if (u)
      t.flags & 256
        ? (Ut(t), (t.flags &= -257), (t = Tc(e, t, l)))
        : t.memoizedState !== null
          ? (Ht(), (t.child = e.child), (t.flags |= 128), (t = null))
          : (Ht(),
            (n = a.fallback),
            (s = t.mode),
            (a = ku({ mode: "visible", children: a.children }, s)),
            (n = fl(n, s, l, null)),
            (n.flags |= 2),
            (a.return = t),
            (n.return = t),
            (a.sibling = n),
            (t.child = a),
            ra(t, e.child, null, l),
            (a = t.child),
            (a.memoizedState = kc(l)),
            (a.childLanes = Ac(e, c, l)),
            (t.memoizedState = Nc),
            (t = n));
    else if ((Ut(t), Mi(s))) {
      if (((c = s.nextSibling && s.nextSibling.dataset), c)) var o = c.dgst;
      ((c = o),
        (a = Error(x(419))),
        (a.stack = ""),
        (a.digest = c),
        tn({ value: a, source: null, stack: null }),
        (t = Tc(e, t, l)));
    } else if (
      (be || vn(e, t, l, !1), (c = (l & e.childLanes) !== 0), be || c)
    ) {
      if (
        ((c = $),
        c !== null &&
          ((a = l & -l),
          (a = a & 42 ? 1 : Xi(a)),
          (a = a & (c.suspendedLanes | l) ? 0 : a),
          a !== 0 && a !== r.retryLane))
      )
        throw ((r.retryLane = a), ya(e, a), Ge(c, e, a), pd);
      (s.data === "$?" || Ni(), (t = Tc(e, t, l)));
    } else
      s.data === "$?"
        ? ((t.flags |= 192), (t.child = e.child), (t = null))
        : ((e = r.treeContext),
          (ae = et(s.nextSibling)),
          (ke = t),
          (Y = !0),
          (dl = null),
          (at = !1),
          e !== null &&
            ((Ke[Ze++] = yt),
            (Ke[Ze++] = gt),
            (Ke[Ze++] = ol),
            (yt = e.id),
            (gt = e.overflow),
            (ol = t)),
          (t = yi(t, a.children)),
          (t.flags |= 4096));
    return t;
  }
  return n
    ? (Ht(),
      (n = a.fallback),
      (s = t.mode),
      (r = e.child),
      (o = r.sibling),
      (a = jt(r, { mode: "hidden", children: a.children })),
      (a.subtreeFlags = r.subtreeFlags & 65011712),
      o !== null ? (n = jt(o, n)) : ((n = fl(n, s, l, null)), (n.flags |= 2)),
      (n.return = t),
      (a.return = t),
      (a.sibling = n),
      (t.child = a),
      (a = n),
      (n = t.child),
      (s = e.child.memoizedState),
      s === null
        ? (s = kc(l))
        : ((r = s.cachePool),
          r !== null
            ? ((o = oe._currentValue),
              (r = r.parent !== o ? { parent: o, pool: o } : r))
            : (r = ko()),
          (s = { baseLanes: s.baseLanes | l, cachePool: r })),
      (n.memoizedState = s),
      (n.childLanes = Ac(e, c, l)),
      (t.memoizedState = Nc),
      a)
    : (Ut(t),
      (l = e.child),
      (e = l.sibling),
      (l = jt(l, { mode: "visible", children: a.children })),
      (l.return = t),
      (l.sibling = null),
      e !== null &&
        ((c = t.deletions),
        c === null ? ((t.deletions = [e]), (t.flags |= 16)) : c.push(e)),
      (t.child = l),
      (t.memoizedState = null),
      l);
}
function yi(e, t) {
  return (
    (t = ku({ mode: "visible", children: t }, e.mode)),
    (t.return = e),
    (e.child = t)
  );
}
function ku(e, t) {
  return (
    (e = Ue(22, e, null, t)),
    (e.lanes = 0),
    (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null,
    }),
    e
  );
}
function Tc(e, t, l) {
  return (
    ra(t, e.child, null, l),
    (e = yi(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function Gr(e, t, l) {
  e.lanes |= t;
  var a = e.alternate;
  (a !== null && (a.lanes |= t), ni(e.return, t, l));
}
function Ec(e, t, l, a, n) {
  var u = e.memoizedState;
  u === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: a,
        tail: l,
        tailMode: n,
      })
    : ((u.isBackwards = t),
      (u.rendering = null),
      (u.renderingStartTime = 0),
      (u.last = a),
      (u.tail = l),
      (u.tailMode = n));
}
function xd(e, t, l) {
  var a = t.pendingProps,
    n = a.revealOrder,
    u = a.tail;
  if ((ge(e, t, a.children, l), (a = de.current), a & 2))
    ((a = (a & 1) | 2), (t.flags |= 128));
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Gr(e, l, t);
        else if (e.tag === 19) Gr(e, l, t);
        else if (e.child !== null) {
          ((e.child.return = e), (e = e.child));
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        ((e.sibling.return = e.return), (e = e.sibling));
      }
    a &= 1;
  }
  switch ((I(de, a), n)) {
    case "forwards":
      for (l = t.child, n = null; l !== null; )
        ((e = l.alternate),
          e !== null && Su(e) === null && (n = l),
          (l = l.sibling));
      ((l = n),
        l === null
          ? ((n = t.child), (t.child = null))
          : ((n = l.sibling), (l.sibling = null)),
        Ec(t, !1, n, l, u));
      break;
    case "backwards":
      for (l = null, n = t.child, t.child = null; n !== null; ) {
        if (((e = n.alternate), e !== null && Su(e) === null)) {
          t.child = n;
          break;
        }
        ((e = n.sibling), (n.sibling = l), (l = n), (n = e));
      }
      Ec(t, !0, l, null, u);
      break;
    case "together":
      Ec(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function Tt(e, t, l) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (It |= t.lanes),
    !(l & t.childLanes))
  )
    if (e !== null) {
      if ((vn(e, t, l, !1), (l & t.childLanes) === 0)) return null;
    } else return null;
  if (e !== null && t.child !== e.child) throw Error(x(153));
  if (t.child !== null) {
    for (
      e = t.child, l = jt(e, e.pendingProps), t.child = l, l.return = t;
      e.sibling !== null;
    )
      ((e = e.sibling),
        (l = l.sibling = jt(e, e.pendingProps)),
        (l.return = t));
    l.sibling = null;
  }
  return t.child;
}
function xs(e, t) {
  return e.lanes & t ? !0 : ((e = e.dependencies), !!(e !== null && bu(e)));
}
function Ap(e, t, l) {
  switch (t.tag) {
    case 3:
      (su(t, t.stateNode.containerInfo),
        Ct(t, oe, e.memoizedState.cache),
        xn());
      break;
    case 27:
    case 5:
      Lc(t);
      break;
    case 4:
      su(t, t.stateNode.containerInfo);
      break;
    case 10:
      Ct(t, t.type, t.memoizedProps.value);
      break;
    case 13:
      var a = t.memoizedState;
      if (a !== null)
        return a.dehydrated !== null
          ? (Ut(t), (t.flags |= 128), null)
          : l & t.child.childLanes
            ? gd(e, t, l)
            : (Ut(t), (e = Tt(e, t, l)), e !== null ? e.sibling : null);
      Ut(t);
      break;
    case 19:
      var n = (e.flags & 128) !== 0;
      if (
        ((a = (l & t.childLanes) !== 0),
        a || (vn(e, t, l, !1), (a = (l & t.childLanes) !== 0)),
        n)
      ) {
        if (a) return xd(e, t, l);
        t.flags |= 128;
      }
      if (
        ((n = t.memoizedState),
        n !== null &&
          ((n.rendering = null), (n.tail = null), (n.lastEffect = null)),
        I(de, de.current),
        a)
      )
        break;
      return null;
    case 22:
    case 23:
      return ((t.lanes = 0), yd(e, t, l));
    case 24:
      Ct(t, oe, e.memoizedState.cache);
  }
  return Tt(e, t, l);
}
function vd(e, t, l) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps) be = !0;
    else {
      if (!xs(e, l) && !(t.flags & 128)) return ((be = !1), Ap(e, t, l));
      be = !!(e.flags & 131072);
    }
  else ((be = !1), Y && t.flags & 1048576 && jo(t, pu, t.index));
  switch (((t.lanes = 0), t.tag)) {
    case 16:
      e: {
        e = t.pendingProps;
        var a = t.elementType,
          n = a._init;
        if (((a = n(a._payload)), (t.type = a), typeof a == "function"))
          es(a)
            ? ((e = xl(a, e)), (t.tag = 1), (t = qr(null, t, a, e, l)))
            : ((t.tag = 0), (t = bi(null, t, a, e, l)));
        else {
          if (a != null) {
            if (((n = a.$$typeof), n === Gi)) {
              ((t.tag = 11), (t = Rr(null, t, a, e, l)));
              break e;
            } else if (n === Yi) {
              ((t.tag = 14), (t = Cr(null, t, a, e, l)));
              break e;
            }
          }
          throw ((t = Kc(a) || a), Error(x(306, t, "")));
        }
      }
      return t;
    case 0:
      return bi(e, t, t.type, t.pendingProps, l);
    case 1:
      return ((a = t.type), (n = xl(a, t.pendingProps)), qr(e, t, a, n, l));
    case 3:
      e: {
        if ((su(t, t.stateNode.containerInfo), e === null)) throw Error(x(387));
        a = t.pendingProps;
        var u = t.memoizedState;
        ((n = u.element), si(e, t), Ka(t, a, null, l));
        var c = t.memoizedState;
        if (
          ((a = c.cache),
          Ct(t, oe, a),
          a !== u.cache && ui(t, [oe], l, !0),
          Xa(),
          (a = c.element),
          u.isDehydrated)
        )
          if (
            ((u = { element: a, isDehydrated: !1, cache: c.cache }),
            (t.updateQueue.baseState = u),
            (t.memoizedState = u),
            t.flags & 256)
          ) {
            t = Br(e, t, a, l);
            break e;
          } else if (a !== n) {
            ((n = Ve(Error(x(424)), t)), tn(n), (t = Br(e, t, a, l)));
            break e;
          } else {
            switch (((e = t.stateNode.containerInfo), e.nodeType)) {
              case 9:
                e = e.body;
                break;
              default:
                e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
            }
            for (
              ae = et(e.firstChild),
                ke = t,
                Y = !0,
                dl = null,
                at = !0,
                l = sd(t, null, a, l),
                t.child = l;
              l;
            )
              ((l.flags = (l.flags & -3) | 4096), (l = l.sibling));
          }
        else {
          if ((xn(), a === n)) {
            t = Tt(e, t, l);
            break e;
          }
          ge(e, t, a, l);
        }
        t = t.child;
      }
      return t;
    case 26:
      return (
        lu(e, t),
        e === null
          ? (l = af(t.type, null, t.pendingProps, null))
            ? (t.memoizedState = l)
            : Y ||
              ((l = t.type),
              (e = t.pendingProps),
              (a = Ou(Xt.current).createElement(l)),
              (a[Se] = t),
              (a[Me] = e),
              ve(a, l, e),
              pe(a),
              (t.stateNode = a))
          : (t.memoizedState = af(
              t.type,
              e.memoizedProps,
              t.pendingProps,
              e.memoizedState,
            )),
        null
      );
    case 27:
      return (
        Lc(t),
        e === null &&
          Y &&
          ((a = t.stateNode = ch(t.type, t.pendingProps, Xt.current)),
          (ke = t),
          (at = !0),
          (n = ae),
          ll(t.type) ? ((Oi = n), (ae = et(a.firstChild))) : (ae = n)),
        ge(e, t, t.pendingProps.children, l),
        lu(e, t),
        e === null && (t.flags |= 4194304),
        t.child
      );
    case 5:
      return (
        e === null &&
          Y &&
          ((n = a = ae) &&
            ((a = Ip(a, t.type, t.pendingProps, at)),
            a !== null
              ? ((t.stateNode = a),
                (ke = t),
                (ae = et(a.firstChild)),
                (at = !1),
                (n = !0))
              : (n = !1)),
          n || bl(t)),
        Lc(t),
        (n = t.type),
        (u = t.pendingProps),
        (c = e !== null ? e.memoizedProps : null),
        (a = u.children),
        zi(n, u) ? (a = null) : c !== null && zi(n, c) && (t.flags |= 32),
        t.memoizedState !== null &&
          ((n = ss(e, t, yp, null, null, l)), (sn._currentValue = n)),
        lu(e, t),
        ge(e, t, a, l),
        t.child
      );
    case 6:
      return (
        e === null &&
          Y &&
          ((e = l = ae) &&
            ((l = e0(l, t.pendingProps, at)),
            l !== null
              ? ((t.stateNode = l), (ke = t), (ae = null), (e = !0))
              : (e = !1)),
          e || bl(t)),
        null
      );
    case 13:
      return gd(e, t, l);
    case 4:
      return (
        su(t, t.stateNode.containerInfo),
        (a = t.pendingProps),
        e === null ? (t.child = ra(t, null, a, l)) : ge(e, t, a, l),
        t.child
      );
    case 11:
      return Rr(e, t, t.type, t.pendingProps, l);
    case 7:
      return (ge(e, t, t.pendingProps, l), t.child);
    case 8:
      return (ge(e, t, t.pendingProps.children, l), t.child);
    case 12:
      return (ge(e, t, t.pendingProps.children, l), t.child);
    case 10:
      return (
        (a = t.pendingProps),
        Ct(t, t.type, a.value),
        ge(e, t, a.children, l),
        t.child
      );
    case 9:
      return (
        (n = t.type._context),
        (a = t.pendingProps.children),
        yl(t),
        (n = je(n)),
        (a = a(n)),
        (t.flags |= 1),
        ge(e, t, a, l),
        t.child
      );
    case 14:
      return Cr(e, t, t.type, t.pendingProps, l);
    case 15:
      return bd(e, t, t.type, t.pendingProps, l);
    case 19:
      return xd(e, t, l);
    case 31:
      return (
        (a = t.pendingProps),
        (l = t.mode),
        (a = { mode: a.mode, children: a.children }),
        e === null
          ? ((l = ku(a, l)),
            (l.ref = t.ref),
            (t.child = l),
            (l.return = t),
            (t = l))
          : ((l = jt(e.child, a)),
            (l.ref = t.ref),
            (t.child = l),
            (l.return = t),
            (t = l)),
        t
      );
    case 22:
      return yd(e, t, l);
    case 24:
      return (
        yl(t),
        (a = je(oe)),
        e === null
          ? ((n = ns()),
            n === null &&
              ((n = $),
              (u = as()),
              (n.pooledCache = u),
              u.refCount++,
              u !== null && (n.pooledCacheLanes |= l),
              (n = u)),
            (t.memoizedState = { parent: a, cache: n }),
            us(t),
            Ct(t, oe, n))
          : (e.lanes & l && (si(e, t), Ka(t, null, null, l), Xa()),
            (n = e.memoizedState),
            (u = t.memoizedState),
            n.parent !== a
              ? ((n = { parent: a, cache: a }),
                (t.memoizedState = n),
                t.lanes === 0 &&
                  (t.memoizedState = t.updateQueue.baseState = n),
                Ct(t, oe, a))
              : ((a = u.cache),
                Ct(t, oe, a),
                a !== n.cache && ui(t, [oe], l, !0))),
        ge(e, t, t.pendingProps.children, l),
        t.child
      );
    case 29:
      throw t.pendingProps;
  }
  throw Error(x(156, t.tag));
}
function ht(e) {
  e.flags |= 4;
}
function Yr(e, t) {
  if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
  else if (((e.flags |= 16777216), !rh(t))) {
    if (
      ((t = $e.current),
      t !== null &&
        ((q & 4194048) === q
          ? it !== null
          : ((q & 62914560) !== q && !(q & 536870912)) || t !== it))
    )
      throw ((Ya = ii), Ao);
    e.flags |= 8192;
  }
}
function Qn(e, t) {
  (t !== null && (e.flags |= 4),
    e.flags & 16384 &&
      ((t = e.tag !== 22 ? Zf() : 536870912), (e.lanes |= t), (fa |= t)));
}
function za(e, t) {
  if (!Y)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var l = null; t !== null; )
          (t.alternate !== null && (l = t), (t = t.sibling));
        l === null ? (e.tail = null) : (l.sibling = null);
        break;
      case "collapsed":
        l = e.tail;
        for (var a = null; l !== null; )
          (l.alternate !== null && (a = l), (l = l.sibling));
        a === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (a.sibling = null);
    }
}
function le(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    l = 0,
    a = 0;
  if (t)
    for (var n = e.child; n !== null; )
      ((l |= n.lanes | n.childLanes),
        (a |= n.subtreeFlags & 65011712),
        (a |= n.flags & 65011712),
        (n.return = e),
        (n = n.sibling));
  else
    for (n = e.child; n !== null; )
      ((l |= n.lanes | n.childLanes),
        (a |= n.subtreeFlags),
        (a |= n.flags),
        (n.return = e),
        (n = n.sibling));
  return ((e.subtreeFlags |= a), (e.childLanes = l), t);
}
function Tp(e, t, l) {
  var a = t.pendingProps;
  switch ((ls(t), t.tag)) {
    case 31:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return (le(t), null);
    case 1:
      return (le(t), null);
    case 3:
      return (
        (l = t.stateNode),
        (a = null),
        e !== null && (a = e.memoizedState.cache),
        t.memoizedState.cache !== a && (t.flags |= 2048),
        Nt(oe),
        aa(),
        l.pendingContext &&
          ((l.context = l.pendingContext), (l.pendingContext = null)),
        (e === null || e.child === null) &&
          (Ta(t)
            ? ht(t)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), yr())),
        le(t),
        null
      );
    case 26:
      return (
        (l = t.memoizedState),
        e === null
          ? (ht(t),
            l !== null ? (le(t), Yr(t, l)) : (le(t), (t.flags &= -16777217)))
          : l
            ? l !== e.memoizedState
              ? (ht(t), le(t), Yr(t, l))
              : (le(t), (t.flags &= -16777217))
            : (e.memoizedProps !== a && ht(t), le(t), (t.flags &= -16777217)),
        null
      );
    case 27:
      (ru(t), (l = Xt.current));
      var n = t.type;
      if (e !== null && t.stateNode != null) e.memoizedProps !== a && ht(t);
      else {
        if (!a) {
          if (t.stateNode === null) throw Error(x(166));
          return (le(t), null);
        }
        ((e = ut.current),
          Ta(t) ? pr(t) : ((e = ch(n, a, l)), (t.stateNode = e), ht(t)));
      }
      return (le(t), null);
    case 5:
      if ((ru(t), (l = t.type), e !== null && t.stateNode != null))
        e.memoizedProps !== a && ht(t);
      else {
        if (!a) {
          if (t.stateNode === null) throw Error(x(166));
          return (le(t), null);
        }
        if (((e = ut.current), Ta(t))) pr(t);
        else {
          switch (((n = Ou(Xt.current)), e)) {
            case 1:
              e = n.createElementNS("http://www.w3.org/2000/svg", l);
              break;
            case 2:
              e = n.createElementNS("http://www.w3.org/1998/Math/MathML", l);
              break;
            default:
              switch (l) {
                case "svg":
                  e = n.createElementNS("http://www.w3.org/2000/svg", l);
                  break;
                case "math":
                  e = n.createElementNS(
                    "http://www.w3.org/1998/Math/MathML",
                    l,
                  );
                  break;
                case "script":
                  ((e = n.createElement("div")),
                    (e.innerHTML = "<script><\/script>"),
                    (e = e.removeChild(e.firstChild)));
                  break;
                case "select":
                  ((e =
                    typeof a.is == "string"
                      ? n.createElement("select", { is: a.is })
                      : n.createElement("select")),
                    a.multiple
                      ? (e.multiple = !0)
                      : a.size && (e.size = a.size));
                  break;
                default:
                  e =
                    typeof a.is == "string"
                      ? n.createElement(l, { is: a.is })
                      : n.createElement(l);
              }
          }
          ((e[Se] = t), (e[Me] = a));
          e: for (n = t.child; n !== null; ) {
            if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
            else if (n.tag !== 4 && n.tag !== 27 && n.child !== null) {
              ((n.child.return = n), (n = n.child));
              continue;
            }
            if (n === t) break e;
            for (; n.sibling === null; ) {
              if (n.return === null || n.return === t) break e;
              n = n.return;
            }
            ((n.sibling.return = n.return), (n = n.sibling));
          }
          t.stateNode = e;
          e: switch ((ve(e, l, a), l)) {
            case "button":
            case "input":
            case "select":
            case "textarea":
              e = !!a.autoFocus;
              break e;
            case "img":
              e = !0;
              break e;
            default:
              e = !1;
          }
          e && ht(t);
        }
      }
      return (le(t), (t.flags &= -16777217), null);
    case 6:
      if (e && t.stateNode != null) e.memoizedProps !== a && ht(t);
      else {
        if (typeof a != "string" && t.stateNode === null) throw Error(x(166));
        if (((e = Xt.current), Ta(t))) {
          if (
            ((e = t.stateNode),
            (l = t.memoizedProps),
            (a = null),
            (n = ke),
            n !== null)
          )
            switch (n.tag) {
              case 27:
              case 5:
                a = n.memoizedProps;
            }
          ((e[Se] = t),
            (e = !!(
              e.nodeValue === l ||
              (a !== null && a.suppressHydrationWarning === !0) ||
              ah(e.nodeValue, l)
            )),
            e || bl(t));
        } else ((e = Ou(e).createTextNode(a)), (e[Se] = t), (t.stateNode = e));
      }
      return (le(t), null);
    case 13:
      if (
        ((a = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (((n = Ta(t)), a !== null && a.dehydrated !== null)) {
          if (e === null) {
            if (!n) throw Error(x(318));
            if (
              ((n = t.memoizedState),
              (n = n !== null ? n.dehydrated : null),
              !n)
            )
              throw Error(x(317));
            n[Se] = t;
          } else
            (xn(),
              !(t.flags & 128) && (t.memoizedState = null),
              (t.flags |= 4));
          (le(t), (n = !1));
        } else
          ((n = yr()),
            e !== null &&
              e.memoizedState !== null &&
              (e.memoizedState.hydrationErrors = n),
            (n = !0));
        if (!n) return t.flags & 256 ? (vt(t), t) : (vt(t), null);
      }
      if ((vt(t), t.flags & 128)) return ((t.lanes = l), t);
      if (((l = a !== null), (e = e !== null && e.memoizedState !== null), l)) {
        ((a = t.child),
          (n = null),
          a.alternate !== null &&
            a.alternate.memoizedState !== null &&
            a.alternate.memoizedState.cachePool !== null &&
            (n = a.alternate.memoizedState.cachePool.pool));
        var u = null;
        (a.memoizedState !== null &&
          a.memoizedState.cachePool !== null &&
          (u = a.memoizedState.cachePool.pool),
          u !== n && (a.flags |= 2048));
      }
      return (
        l !== e && l && (t.child.flags |= 8192),
        Qn(t, t.updateQueue),
        le(t),
        null
      );
    case 4:
      return (aa(), e === null && Es(t.stateNode.containerInfo), le(t), null);
    case 10:
      return (Nt(t.type), le(t), null);
    case 19:
      if ((ye(de), (n = t.memoizedState), n === null)) return (le(t), null);
      if (((a = (t.flags & 128) !== 0), (u = n.rendering), u === null))
        if (a) za(n, !1);
        else {
          if (ne !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((u = Su(e)), u !== null)) {
                for (
                  t.flags |= 128,
                    za(n, !1),
                    e = u.updateQueue,
                    t.updateQueue = e,
                    Qn(t, e),
                    t.subtreeFlags = 0,
                    e = l,
                    l = t.child;
                  l !== null;
                )
                  (So(l, e), (l = l.sibling));
                return (I(de, (de.current & 1) | 2), t.child);
              }
              e = e.sibling;
            }
          n.tail !== null &&
            ct() > Tu &&
            ((t.flags |= 128), (a = !0), za(n, !1), (t.lanes = 4194304));
        }
      else {
        if (!a)
          if (((e = Su(u)), e !== null)) {
            if (
              ((t.flags |= 128),
              (a = !0),
              (e = e.updateQueue),
              (t.updateQueue = e),
              Qn(t, e),
              za(n, !0),
              n.tail === null && n.tailMode === "hidden" && !u.alternate && !Y)
            )
              return (le(t), null);
          } else
            2 * ct() - n.renderingStartTime > Tu &&
              l !== 536870912 &&
              ((t.flags |= 128), (a = !0), za(n, !1), (t.lanes = 4194304));
        n.isBackwards
          ? ((u.sibling = t.child), (t.child = u))
          : ((e = n.last),
            e !== null ? (e.sibling = u) : (t.child = u),
            (n.last = u));
      }
      return n.tail !== null
        ? ((t = n.tail),
          (n.rendering = t),
          (n.tail = t.sibling),
          (n.renderingStartTime = ct()),
          (t.sibling = null),
          (e = de.current),
          I(de, a ? (e & 1) | 2 : e & 1),
          t)
        : (le(t), null);
    case 22:
    case 23:
      return (
        vt(t),
        cs(),
        (a = t.memoizedState !== null),
        e !== null
          ? (e.memoizedState !== null) !== a && (t.flags |= 8192)
          : a && (t.flags |= 8192),
        a
          ? l & 536870912 &&
            !(t.flags & 128) &&
            (le(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : le(t),
        (l = t.updateQueue),
        l !== null && Qn(t, l.retryQueue),
        (l = null),
        e !== null &&
          e.memoizedState !== null &&
          e.memoizedState.cachePool !== null &&
          (l = e.memoizedState.cachePool.pool),
        (a = null),
        t.memoizedState !== null &&
          t.memoizedState.cachePool !== null &&
          (a = t.memoizedState.cachePool.pool),
        a !== l && (t.flags |= 2048),
        e !== null && ye(hl),
        null
      );
    case 24:
      return (
        (l = null),
        e !== null && (l = e.memoizedState.cache),
        t.memoizedState.cache !== l && (t.flags |= 2048),
        Nt(oe),
        le(t),
        null
      );
    case 25:
      return null;
    case 30:
      return null;
  }
  throw Error(x(156, t.tag));
}
function Ep(e, t) {
  switch ((ls(t), t.tag)) {
    case 1:
      return (
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        Nt(oe),
        aa(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 26:
    case 27:
    case 5:
      return (ru(t), null);
    case 13:
      if ((vt(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(x(340));
        xn();
      }
      return (
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return (ye(de), null);
    case 4:
      return (aa(), null);
    case 10:
      return (Nt(t.type), null);
    case 22:
    case 23:
      return (
        vt(t),
        cs(),
        e !== null && ye(hl),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 24:
      return (Nt(oe), null);
    case 25:
      return null;
    default:
      return null;
  }
}
function Sd(e, t) {
  switch ((ls(t), t.tag)) {
    case 3:
      (Nt(oe), aa());
      break;
    case 26:
    case 27:
    case 5:
      ru(t);
      break;
    case 4:
      aa();
      break;
    case 13:
      vt(t);
      break;
    case 19:
      ye(de);
      break;
    case 10:
      Nt(t.type);
      break;
    case 22:
    case 23:
      (vt(t), cs(), e !== null && ye(hl));
      break;
    case 24:
      Nt(oe);
  }
}
function An(e, t) {
  try {
    var l = t.updateQueue,
      a = l !== null ? l.lastEffect : null;
    if (a !== null) {
      var n = a.next;
      l = n;
      do {
        if ((l.tag & e) === e) {
          a = void 0;
          var u = l.create,
            c = l.inst;
          ((a = u()), (c.destroy = a));
        }
        l = l.next;
      } while (l !== n);
    }
  } catch (s) {
    V(t, t.return, s);
  }
}
function Pt(e, t, l) {
  try {
    var a = t.updateQueue,
      n = a !== null ? a.lastEffect : null;
    if (n !== null) {
      var u = n.next;
      a = u;
      do {
        if ((a.tag & e) === e) {
          var c = a.inst,
            s = c.destroy;
          if (s !== void 0) {
            ((c.destroy = void 0), (n = t));
            var r = l,
              o = s;
            try {
              o();
            } catch (b) {
              V(n, r, b);
            }
          }
        }
        a = a.next;
      } while (a !== u);
    }
  } catch (b) {
    V(t, t.return, b);
  }
}
function jd(e) {
  var t = e.updateQueue;
  if (t !== null) {
    var l = e.stateNode;
    try {
      zo(t, l);
    } catch (a) {
      V(e, e.return, a);
    }
  }
}
function Nd(e, t, l) {
  ((l.props = xl(e.type, e.memoizedProps)), (l.state = e.memoizedState));
  try {
    l.componentWillUnmount();
  } catch (a) {
    V(e, t, a);
  }
}
function La(e, t) {
  try {
    var l = e.ref;
    if (l !== null) {
      switch (e.tag) {
        case 26:
        case 27:
        case 5:
          var a = e.stateNode;
          break;
        case 30:
          a = e.stateNode;
          break;
        default:
          a = e.stateNode;
      }
      typeof l == "function" ? (e.refCleanup = l(a)) : (l.current = a);
    }
  } catch (n) {
    V(e, t, n);
  }
}
function nt(e, t) {
  var l = e.ref,
    a = e.refCleanup;
  if (l !== null)
    if (typeof a == "function")
      try {
        a();
      } catch (n) {
        V(e, t, n);
      } finally {
        ((e.refCleanup = null),
          (e = e.alternate),
          e != null && (e.refCleanup = null));
      }
    else if (typeof l == "function")
      try {
        l(null);
      } catch (n) {
        V(e, t, n);
      }
    else l.current = null;
}
function kd(e) {
  var t = e.type,
    l = e.memoizedProps,
    a = e.stateNode;
  try {
    e: switch (t) {
      case "button":
      case "input":
      case "select":
      case "textarea":
        l.autoFocus && a.focus();
        break e;
      case "img":
        l.src ? (a.src = l.src) : l.srcSet && (a.srcset = l.srcSet);
    }
  } catch (n) {
    V(e, e.return, n);
  }
}
function zc(e, t, l) {
  try {
    var a = e.stateNode;
    (Jp(a, e.type, l, t), (a[Me] = t));
  } catch (n) {
    V(e, e.return, n);
  }
}
function Ad(e) {
  return (
    e.tag === 5 ||
    e.tag === 3 ||
    e.tag === 26 ||
    (e.tag === 27 && ll(e.type)) ||
    e.tag === 4
  );
}
function wc(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || Ad(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
    ) {
      if (
        (e.tag === 27 && ll(e.type)) ||
        e.flags & 2 ||
        e.child === null ||
        e.tag === 4
      )
        continue e;
      ((e.child.return = e), (e = e.child));
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function gi(e, t, l) {
  var a = e.tag;
  if (a === 5 || a === 6)
    ((e = e.stateNode),
      t
        ? (l.nodeType === 9
            ? l.body
            : l.nodeName === "HTML"
              ? l.ownerDocument.body
              : l
          ).insertBefore(e, t)
        : ((t =
            l.nodeType === 9
              ? l.body
              : l.nodeName === "HTML"
                ? l.ownerDocument.body
                : l),
          t.appendChild(e),
          (l = l._reactRootContainer),
          l != null || t.onclick !== null || (t.onclick = Iu)));
  else if (
    a !== 4 &&
    (a === 27 && ll(e.type) && ((l = e.stateNode), (t = null)),
    (e = e.child),
    e !== null)
  )
    for (gi(e, t, l), e = e.sibling; e !== null; )
      (gi(e, t, l), (e = e.sibling));
}
function Au(e, t, l) {
  var a = e.tag;
  if (a === 5 || a === 6)
    ((e = e.stateNode), t ? l.insertBefore(e, t) : l.appendChild(e));
  else if (
    a !== 4 &&
    (a === 27 && ll(e.type) && (l = e.stateNode), (e = e.child), e !== null)
  )
    for (Au(e, t, l), e = e.sibling; e !== null; )
      (Au(e, t, l), (e = e.sibling));
}
function Td(e) {
  var t = e.stateNode,
    l = e.memoizedProps;
  try {
    for (var a = e.type, n = t.attributes; n.length; )
      t.removeAttributeNode(n[0]);
    (ve(t, a, l), (t[Se] = e), (t[Me] = l));
  } catch (u) {
    V(e, e.return, u);
  }
}
var pt = !1,
  ie = !1,
  Mc = !1,
  Qr = typeof WeakSet == "function" ? WeakSet : Set,
  me = null;
function zp(e, t) {
  if (((e = e.containerInfo), (Ti = Cu), (e = ho(e)), Wi(e))) {
    if ("selectionStart" in e)
      var l = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        l = ((l = e.ownerDocument) && l.defaultView) || window;
        var a = l.getSelection && l.getSelection();
        if (a && a.rangeCount !== 0) {
          l = a.anchorNode;
          var n = a.anchorOffset,
            u = a.focusNode;
          a = a.focusOffset;
          try {
            (l.nodeType, u.nodeType);
          } catch {
            l = null;
            break e;
          }
          var c = 0,
            s = -1,
            r = -1,
            o = 0,
            b = 0,
            y = e,
            d = null;
          t: for (;;) {
            for (
              var p;
              y !== l || (n !== 0 && y.nodeType !== 3) || (s = c + n),
                y !== u || (a !== 0 && y.nodeType !== 3) || (r = c + a),
                y.nodeType === 3 && (c += y.nodeValue.length),
                (p = y.firstChild) !== null;
            )
              ((d = y), (y = p));
            for (;;) {
              if (y === e) break t;
              if (
                (d === l && ++o === n && (s = c),
                d === u && ++b === a && (r = c),
                (p = y.nextSibling) !== null)
              )
                break;
              ((y = d), (d = y.parentNode));
            }
            y = p;
          }
          l = s === -1 || r === -1 ? null : { start: s, end: r };
        } else l = null;
      }
    l = l || { start: 0, end: 0 };
  } else l = null;
  for (
    Ei = { focusedElem: e, selectionRange: l }, Cu = !1, me = t;
    me !== null;
  )
    if (((t = me), (e = t.child), (t.subtreeFlags & 1024) !== 0 && e !== null))
      ((e.return = t), (me = e));
    else
      for (; me !== null; ) {
        switch (((t = me), (u = t.alternate), (e = t.flags), t.tag)) {
          case 0:
            break;
          case 11:
          case 15:
            break;
          case 1:
            if (e & 1024 && u !== null) {
              ((e = void 0),
                (l = t),
                (n = u.memoizedProps),
                (u = u.memoizedState),
                (a = l.stateNode));
              try {
                var N = xl(l.type, n, l.elementType === l.type);
                ((e = a.getSnapshotBeforeUpdate(N, u)),
                  (a.__reactInternalSnapshotBeforeUpdate = e));
              } catch (A) {
                V(l, l.return, A);
              }
            }
            break;
          case 3:
            if (e & 1024) {
              if (((e = t.stateNode.containerInfo), (l = e.nodeType), l === 9))
                wi(e);
              else if (l === 1)
                switch (e.nodeName) {
                  case "HEAD":
                  case "HTML":
                  case "BODY":
                    wi(e);
                    break;
                  default:
                    e.textContent = "";
                }
            }
            break;
          case 5:
          case 26:
          case 27:
          case 6:
          case 4:
          case 17:
            break;
          default:
            if (e & 1024) throw Error(x(163));
        }
        if (((e = t.sibling), e !== null)) {
          ((e.return = t.return), (me = e));
          break;
        }
        me = t.return;
      }
}
function Ed(e, t, l) {
  var a = l.flags;
  switch (l.tag) {
    case 0:
    case 11:
    case 15:
      (Mt(e, l), a & 4 && An(5, l));
      break;
    case 1:
      if ((Mt(e, l), a & 4))
        if (((e = l.stateNode), t === null))
          try {
            e.componentDidMount();
          } catch (c) {
            V(l, l.return, c);
          }
        else {
          var n = xl(l.type, t.memoizedProps);
          t = t.memoizedState;
          try {
            e.componentDidUpdate(n, t, e.__reactInternalSnapshotBeforeUpdate);
          } catch (c) {
            V(l, l.return, c);
          }
        }
      (a & 64 && jd(l), a & 512 && La(l, l.return));
      break;
    case 3:
      if ((Mt(e, l), a & 64 && ((e = l.updateQueue), e !== null))) {
        if (((t = null), l.child !== null))
          switch (l.child.tag) {
            case 27:
            case 5:
              t = l.child.stateNode;
              break;
            case 1:
              t = l.child.stateNode;
          }
        try {
          zo(e, t);
        } catch (c) {
          V(l, l.return, c);
        }
      }
      break;
    case 27:
      t === null && a & 4 && Td(l);
    case 26:
    case 5:
      (Mt(e, l), t === null && a & 4 && kd(l), a & 512 && La(l, l.return));
      break;
    case 12:
      Mt(e, l);
      break;
    case 13:
      (Mt(e, l),
        a & 4 && Md(e, l),
        a & 64 &&
          ((e = l.memoizedState),
          e !== null &&
            ((e = e.dehydrated),
            e !== null && ((l = Hp.bind(null, l)), t0(e, l)))));
      break;
    case 22:
      if (((a = l.memoizedState !== null || pt), !a)) {
        ((t = (t !== null && t.memoizedState !== null) || ie), (n = pt));
        var u = ie;
        ((pt = a),
          (ie = t) && !u ? Ot(e, l, (l.subtreeFlags & 8772) !== 0) : Mt(e, l),
          (pt = n),
          (ie = u));
      }
      break;
    case 30:
      break;
    default:
      Mt(e, l);
  }
}
function zd(e) {
  var t = e.alternate;
  (t !== null && ((e.alternate = null), zd(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 && ((t = e.stateNode), t !== null && Zi(t)),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null));
}
var W = null,
  ze = !1;
function mt(e, t, l) {
  for (l = l.child; l !== null; ) (wd(e, t, l), (l = l.sibling));
}
function wd(e, t, l) {
  if (He && typeof He.onCommitFiberUnmount == "function")
    try {
      He.onCommitFiberUnmount(mn, l);
    } catch {}
  switch (l.tag) {
    case 26:
      (ie || nt(l, t),
        mt(e, t, l),
        l.memoizedState
          ? l.memoizedState.count--
          : l.stateNode && ((l = l.stateNode), l.parentNode.removeChild(l)));
      break;
    case 27:
      ie || nt(l, t);
      var a = W,
        n = ze;
      (ll(l.type) && ((W = l.stateNode), (ze = !1)),
        mt(e, t, l),
        Fa(l.stateNode),
        (W = a),
        (ze = n));
      break;
    case 5:
      ie || nt(l, t);
    case 6:
      if (
        ((a = W),
        (n = ze),
        (W = null),
        mt(e, t, l),
        (W = a),
        (ze = n),
        W !== null)
      )
        if (ze)
          try {
            (W.nodeType === 9
              ? W.body
              : W.nodeName === "HTML"
                ? W.ownerDocument.body
                : W
            ).removeChild(l.stateNode);
          } catch (u) {
            V(l, t, u);
          }
        else
          try {
            W.removeChild(l.stateNode);
          } catch (u) {
            V(l, t, u);
          }
      break;
    case 18:
      W !== null &&
        (ze
          ? ((e = W),
            ef(
              e.nodeType === 9
                ? e.body
                : e.nodeName === "HTML"
                  ? e.ownerDocument.body
                  : e,
              l.stateNode,
            ),
            on(e))
          : ef(W, l.stateNode));
      break;
    case 4:
      ((a = W),
        (n = ze),
        (W = l.stateNode.containerInfo),
        (ze = !0),
        mt(e, t, l),
        (W = a),
        (ze = n));
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      (ie || Pt(2, l, t), ie || Pt(4, l, t), mt(e, t, l));
      break;
    case 1:
      (ie ||
        (nt(l, t),
        (a = l.stateNode),
        typeof a.componentWillUnmount == "function" && Nd(l, t, a)),
        mt(e, t, l));
      break;
    case 21:
      mt(e, t, l);
      break;
    case 22:
      ((ie = (a = ie) || l.memoizedState !== null), mt(e, t, l), (ie = a));
      break;
    default:
      mt(e, t, l);
  }
}
function Md(e, t) {
  if (
    t.memoizedState === null &&
    ((e = t.alternate),
    e !== null &&
      ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
  )
    try {
      on(e);
    } catch (l) {
      V(t, t.return, l);
    }
}
function wp(e) {
  switch (e.tag) {
    case 13:
    case 19:
      var t = e.stateNode;
      return (t === null && (t = e.stateNode = new Qr()), t);
    case 22:
      return (
        (e = e.stateNode),
        (t = e._retryCache),
        t === null && (t = e._retryCache = new Qr()),
        t
      );
    default:
      throw Error(x(435, e.tag));
  }
}
function Oc(e, t) {
  var l = wp(e);
  t.forEach(function (a) {
    var n = qp.bind(null, e, a);
    l.has(a) || (l.add(a), a.then(n, n));
  });
}
function _e(e, t) {
  var l = t.deletions;
  if (l !== null)
    for (var a = 0; a < l.length; a++) {
      var n = l[a],
        u = e,
        c = t,
        s = c;
      e: for (; s !== null; ) {
        switch (s.tag) {
          case 27:
            if (ll(s.type)) {
              ((W = s.stateNode), (ze = !1));
              break e;
            }
            break;
          case 5:
            ((W = s.stateNode), (ze = !1));
            break e;
          case 3:
          case 4:
            ((W = s.stateNode.containerInfo), (ze = !0));
            break e;
        }
        s = s.return;
      }
      if (W === null) throw Error(x(160));
      (wd(u, c, n),
        (W = null),
        (ze = !1),
        (u = n.alternate),
        u !== null && (u.return = null),
        (n.return = null));
    }
  if (t.subtreeFlags & 13878)
    for (t = t.child; t !== null; ) (Od(t, e), (t = t.sibling));
}
var Ie = null;
function Od(e, t) {
  var l = e.alternate,
    a = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      (_e(t, e),
        Re(e),
        a & 4 && (Pt(3, e, e.return), An(3, e), Pt(5, e, e.return)));
      break;
    case 1:
      (_e(t, e),
        Re(e),
        a & 512 && (ie || l === null || nt(l, l.return)),
        a & 64 &&
          pt &&
          ((e = e.updateQueue),
          e !== null &&
            ((a = e.callbacks),
            a !== null &&
              ((l = e.shared.hiddenCallbacks),
              (e.shared.hiddenCallbacks = l === null ? a : l.concat(a))))));
      break;
    case 26:
      var n = Ie;
      if (
        (_e(t, e),
        Re(e),
        a & 512 && (ie || l === null || nt(l, l.return)),
        a & 4)
      ) {
        var u = l !== null ? l.memoizedState : null;
        if (((a = e.memoizedState), l === null))
          if (a === null)
            if (e.stateNode === null) {
              e: {
                ((a = e.type),
                  (l = e.memoizedProps),
                  (n = n.ownerDocument || n));
                t: switch (a) {
                  case "title":
                    ((u = n.getElementsByTagName("title")[0]),
                      (!u ||
                        u[yn] ||
                        u[Se] ||
                        u.namespaceURI === "http://www.w3.org/2000/svg" ||
                        u.hasAttribute("itemprop")) &&
                        ((u = n.createElement(a)),
                        n.head.insertBefore(
                          u,
                          n.querySelector("head > title"),
                        )),
                      ve(u, a, l),
                      (u[Se] = e),
                      pe(u),
                      (a = u));
                    break e;
                  case "link":
                    var c = uf("link", "href", n).get(a + (l.href || ""));
                    if (c) {
                      for (var s = 0; s < c.length; s++)
                        if (
                          ((u = c[s]),
                          u.getAttribute("href") ===
                            (l.href == null || l.href === "" ? null : l.href) &&
                            u.getAttribute("rel") ===
                              (l.rel == null ? null : l.rel) &&
                            u.getAttribute("title") ===
                              (l.title == null ? null : l.title) &&
                            u.getAttribute("crossorigin") ===
                              (l.crossOrigin == null ? null : l.crossOrigin))
                        ) {
                          c.splice(s, 1);
                          break t;
                        }
                    }
                    ((u = n.createElement(a)),
                      ve(u, a, l),
                      n.head.appendChild(u));
                    break;
                  case "meta":
                    if (
                      (c = uf("meta", "content", n).get(a + (l.content || "")))
                    ) {
                      for (s = 0; s < c.length; s++)
                        if (
                          ((u = c[s]),
                          u.getAttribute("content") ===
                            (l.content == null ? null : "" + l.content) &&
                            u.getAttribute("name") ===
                              (l.name == null ? null : l.name) &&
                            u.getAttribute("property") ===
                              (l.property == null ? null : l.property) &&
                            u.getAttribute("http-equiv") ===
                              (l.httpEquiv == null ? null : l.httpEquiv) &&
                            u.getAttribute("charset") ===
                              (l.charSet == null ? null : l.charSet))
                        ) {
                          c.splice(s, 1);
                          break t;
                        }
                    }
                    ((u = n.createElement(a)),
                      ve(u, a, l),
                      n.head.appendChild(u));
                    break;
                  default:
                    throw Error(x(468, a));
                }
                ((u[Se] = e), pe(u), (a = u));
              }
              e.stateNode = a;
            } else cf(n, e.type, e.stateNode);
          else e.stateNode = nf(n, a, e.memoizedProps);
        else
          u !== a
            ? (u === null
                ? l.stateNode !== null &&
                  ((l = l.stateNode), l.parentNode.removeChild(l))
                : u.count--,
              a === null
                ? cf(n, e.type, e.stateNode)
                : nf(n, a, e.memoizedProps))
            : a === null &&
              e.stateNode !== null &&
              zc(e, e.memoizedProps, l.memoizedProps);
      }
      break;
    case 27:
      (_e(t, e),
        Re(e),
        a & 512 && (ie || l === null || nt(l, l.return)),
        l !== null && a & 4 && zc(e, e.memoizedProps, l.memoizedProps));
      break;
    case 5:
      if (
        (_e(t, e),
        Re(e),
        a & 512 && (ie || l === null || nt(l, l.return)),
        e.flags & 32)
      ) {
        n = e.stateNode;
        try {
          ua(n, "");
        } catch (p) {
          V(e, e.return, p);
        }
      }
      (a & 4 &&
        e.stateNode != null &&
        ((n = e.memoizedProps), zc(e, n, l !== null ? l.memoizedProps : n)),
        a & 1024 && (Mc = !0));
      break;
    case 6:
      if ((_e(t, e), Re(e), a & 4)) {
        if (e.stateNode === null) throw Error(x(162));
        ((a = e.memoizedProps), (l = e.stateNode));
        try {
          l.nodeValue = a;
        } catch (p) {
          V(e, e.return, p);
        }
      }
      break;
    case 3:
      if (
        ((uu = null),
        (n = Ie),
        (Ie = Du(t.containerInfo)),
        _e(t, e),
        (Ie = n),
        Re(e),
        a & 4 && l !== null && l.memoizedState.isDehydrated)
      )
        try {
          on(t.containerInfo);
        } catch (p) {
          V(e, e.return, p);
        }
      Mc && ((Mc = !1), Dd(e));
      break;
    case 4:
      ((a = Ie),
        (Ie = Du(e.stateNode.containerInfo)),
        _e(t, e),
        Re(e),
        (Ie = a));
      break;
    case 12:
      (_e(t, e), Re(e));
      break;
    case 13:
      (_e(t, e),
        Re(e),
        e.child.flags & 8192 &&
          (e.memoizedState !== null) !=
            (l !== null && l.memoizedState !== null) &&
          (ks = ct()),
        a & 4 &&
          ((a = e.updateQueue),
          a !== null && ((e.updateQueue = null), Oc(e, a))));
      break;
    case 22:
      n = e.memoizedState !== null;
      var r = l !== null && l.memoizedState !== null,
        o = pt,
        b = ie;
      if (
        ((pt = o || n),
        (ie = b || r),
        _e(t, e),
        (ie = b),
        (pt = o),
        Re(e),
        a & 8192)
      )
        e: for (
          t = e.stateNode,
            t._visibility = n ? t._visibility & -2 : t._visibility | 1,
            n && (l === null || r || pt || ie || cl(e)),
            l = null,
            t = e;
          ;
        ) {
          if (t.tag === 5 || t.tag === 26) {
            if (l === null) {
              r = l = t;
              try {
                if (((u = r.stateNode), n))
                  ((c = u.style),
                    typeof c.setProperty == "function"
                      ? c.setProperty("display", "none", "important")
                      : (c.display = "none"));
                else {
                  s = r.stateNode;
                  var y = r.memoizedProps.style,
                    d =
                      y != null && y.hasOwnProperty("display")
                        ? y.display
                        : null;
                  s.style.display =
                    d == null || typeof d == "boolean" ? "" : ("" + d).trim();
                }
              } catch (p) {
                V(r, r.return, p);
              }
            }
          } else if (t.tag === 6) {
            if (l === null) {
              r = t;
              try {
                r.stateNode.nodeValue = n ? "" : r.memoizedProps;
              } catch (p) {
                V(r, r.return, p);
              }
            }
          } else if (
            ((t.tag !== 22 && t.tag !== 23) ||
              t.memoizedState === null ||
              t === e) &&
            t.child !== null
          ) {
            ((t.child.return = t), (t = t.child));
            continue;
          }
          if (t === e) break e;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === e) break e;
            (l === t && (l = null), (t = t.return));
          }
          (l === t && (l = null),
            (t.sibling.return = t.return),
            (t = t.sibling));
        }
      a & 4 &&
        ((a = e.updateQueue),
        a !== null &&
          ((l = a.retryQueue),
          l !== null && ((a.retryQueue = null), Oc(e, l))));
      break;
    case 19:
      (_e(t, e),
        Re(e),
        a & 4 &&
          ((a = e.updateQueue),
          a !== null && ((e.updateQueue = null), Oc(e, a))));
      break;
    case 30:
      break;
    case 21:
      break;
    default:
      (_e(t, e), Re(e));
  }
}
function Re(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      for (var l, a = e.return; a !== null; ) {
        if (Ad(a)) {
          l = a;
          break;
        }
        a = a.return;
      }
      if (l == null) throw Error(x(160));
      switch (l.tag) {
        case 27:
          var n = l.stateNode,
            u = wc(e);
          Au(e, u, n);
          break;
        case 5:
          var c = l.stateNode;
          l.flags & 32 && (ua(c, ""), (l.flags &= -33));
          var s = wc(e);
          Au(e, s, c);
          break;
        case 3:
        case 4:
          var r = l.stateNode.containerInfo,
            o = wc(e);
          gi(e, o, r);
          break;
        default:
          throw Error(x(161));
      }
    } catch (b) {
      V(e, e.return, b);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Dd(e) {
  if (e.subtreeFlags & 1024)
    for (e = e.child; e !== null; ) {
      var t = e;
      (Dd(t),
        t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
        (e = e.sibling));
    }
}
function Mt(e, t) {
  if (t.subtreeFlags & 8772)
    for (t = t.child; t !== null; ) (Ed(e, t.alternate, t), (t = t.sibling));
}
function cl(e) {
  for (e = e.child; e !== null; ) {
    var t = e;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (Pt(4, t, t.return), cl(t));
        break;
      case 1:
        nt(t, t.return);
        var l = t.stateNode;
        (typeof l.componentWillUnmount == "function" && Nd(t, t.return, l),
          cl(t));
        break;
      case 27:
        Fa(t.stateNode);
      case 26:
      case 5:
        (nt(t, t.return), cl(t));
        break;
      case 22:
        t.memoizedState === null && cl(t);
        break;
      case 30:
        cl(t);
        break;
      default:
        cl(t);
    }
    e = e.sibling;
  }
}
function Ot(e, t, l) {
  for (l = l && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
    var a = t.alternate,
      n = e,
      u = t,
      c = u.flags;
    switch (u.tag) {
      case 0:
      case 11:
      case 15:
        (Ot(n, u, l), An(4, u));
        break;
      case 1:
        if (
          (Ot(n, u, l),
          (a = u),
          (n = a.stateNode),
          typeof n.componentDidMount == "function")
        )
          try {
            n.componentDidMount();
          } catch (o) {
            V(a, a.return, o);
          }
        if (((a = u), (n = a.updateQueue), n !== null)) {
          var s = a.stateNode;
          try {
            var r = n.shared.hiddenCallbacks;
            if (r !== null)
              for (n.shared.hiddenCallbacks = null, n = 0; n < r.length; n++)
                Eo(r[n], s);
          } catch (o) {
            V(a, a.return, o);
          }
        }
        (l && c & 64 && jd(u), La(u, u.return));
        break;
      case 27:
        Td(u);
      case 26:
      case 5:
        (Ot(n, u, l), l && a === null && c & 4 && kd(u), La(u, u.return));
        break;
      case 12:
        Ot(n, u, l);
        break;
      case 13:
        (Ot(n, u, l), l && c & 4 && Md(n, u));
        break;
      case 22:
        (u.memoizedState === null && Ot(n, u, l), La(u, u.return));
        break;
      case 30:
        break;
      default:
        Ot(n, u, l);
    }
    t = t.sibling;
  }
}
function vs(e, t) {
  var l = null;
  (e !== null &&
    e.memoizedState !== null &&
    e.memoizedState.cachePool !== null &&
    (l = e.memoizedState.cachePool.pool),
    (e = null),
    t.memoizedState !== null &&
      t.memoizedState.cachePool !== null &&
      (e = t.memoizedState.cachePool.pool),
    e !== l && (e != null && e.refCount++, l != null && Sn(l)));
}
function Ss(e, t) {
  ((e = null),
    t.alternate !== null && (e = t.alternate.memoizedState.cache),
    (t = t.memoizedState.cache),
    t !== e && (t.refCount++, e != null && Sn(e)));
}
function lt(e, t, l, a) {
  if (t.subtreeFlags & 10256)
    for (t = t.child; t !== null; ) (_d(e, t, l, a), (t = t.sibling));
}
function _d(e, t, l, a) {
  var n = t.flags;
  switch (t.tag) {
    case 0:
    case 11:
    case 15:
      (lt(e, t, l, a), n & 2048 && An(9, t));
      break;
    case 1:
      lt(e, t, l, a);
      break;
    case 3:
      (lt(e, t, l, a),
        n & 2048 &&
          ((e = null),
          t.alternate !== null && (e = t.alternate.memoizedState.cache),
          (t = t.memoizedState.cache),
          t !== e && (t.refCount++, e != null && Sn(e))));
      break;
    case 12:
      if (n & 2048) {
        (lt(e, t, l, a), (e = t.stateNode));
        try {
          var u = t.memoizedProps,
            c = u.id,
            s = u.onPostCommit;
          typeof s == "function" &&
            s(
              c,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0,
            );
        } catch (r) {
          V(t, t.return, r);
        }
      } else lt(e, t, l, a);
      break;
    case 13:
      lt(e, t, l, a);
      break;
    case 23:
      break;
    case 22:
      ((u = t.stateNode),
        (c = t.alternate),
        t.memoizedState !== null
          ? u._visibility & 2
            ? lt(e, t, l, a)
            : Va(e, t)
          : u._visibility & 2
            ? lt(e, t, l, a)
            : ((u._visibility |= 2),
              Cl(e, t, l, a, (t.subtreeFlags & 10256) !== 0)),
        n & 2048 && vs(c, t));
      break;
    case 24:
      (lt(e, t, l, a), n & 2048 && Ss(t.alternate, t));
      break;
    default:
      lt(e, t, l, a);
  }
}
function Cl(e, t, l, a, n) {
  for (n = n && (t.subtreeFlags & 10256) !== 0, t = t.child; t !== null; ) {
    var u = e,
      c = t,
      s = l,
      r = a,
      o = c.flags;
    switch (c.tag) {
      case 0:
      case 11:
      case 15:
        (Cl(u, c, s, r, n), An(8, c));
        break;
      case 23:
        break;
      case 22:
        var b = c.stateNode;
        (c.memoizedState !== null
          ? b._visibility & 2
            ? Cl(u, c, s, r, n)
            : Va(u, c)
          : ((b._visibility |= 2), Cl(u, c, s, r, n)),
          n && o & 2048 && vs(c.alternate, c));
        break;
      case 24:
        (Cl(u, c, s, r, n), n && o & 2048 && Ss(c.alternate, c));
        break;
      default:
        Cl(u, c, s, r, n);
    }
    t = t.sibling;
  }
}
function Va(e, t) {
  if (t.subtreeFlags & 10256)
    for (t = t.child; t !== null; ) {
      var l = e,
        a = t,
        n = a.flags;
      switch (a.tag) {
        case 22:
          (Va(l, a), n & 2048 && vs(a.alternate, a));
          break;
        case 24:
          (Va(l, a), n & 2048 && Ss(a.alternate, a));
          break;
        default:
          Va(l, a);
      }
      t = t.sibling;
    }
}
var Ca = 8192;
function Ml(e) {
  if (e.subtreeFlags & Ca)
    for (e = e.child; e !== null; ) (Rd(e), (e = e.sibling));
}
function Rd(e) {
  switch (e.tag) {
    case 26:
      (Ml(e),
        e.flags & Ca &&
          e.memoizedState !== null &&
          m0(Ie, e.memoizedState, e.memoizedProps));
      break;
    case 5:
      Ml(e);
      break;
    case 3:
    case 4:
      var t = Ie;
      ((Ie = Du(e.stateNode.containerInfo)), Ml(e), (Ie = t));
      break;
    case 22:
      e.memoizedState === null &&
        ((t = e.alternate),
        t !== null && t.memoizedState !== null
          ? ((t = Ca), (Ca = 16777216), Ml(e), (Ca = t))
          : Ml(e));
      break;
    default:
      Ml(e);
  }
}
function Cd(e) {
  var t = e.alternate;
  if (t !== null && ((e = t.child), e !== null)) {
    t.child = null;
    do ((t = e.sibling), (e.sibling = null), (e = t));
    while (e !== null);
  }
}
function wa(e) {
  var t = e.deletions;
  if (e.flags & 16) {
    if (t !== null)
      for (var l = 0; l < t.length; l++) {
        var a = t[l];
        ((me = a), Hd(a, e));
      }
    Cd(e);
  }
  if (e.subtreeFlags & 10256)
    for (e = e.child; e !== null; ) (Ud(e), (e = e.sibling));
}
function Ud(e) {
  switch (e.tag) {
    case 0:
    case 11:
    case 15:
      (wa(e), e.flags & 2048 && Pt(9, e, e.return));
      break;
    case 3:
      wa(e);
      break;
    case 12:
      wa(e);
      break;
    case 22:
      var t = e.stateNode;
      e.memoizedState !== null &&
      t._visibility & 2 &&
      (e.return === null || e.return.tag !== 13)
        ? ((t._visibility &= -3), au(e))
        : wa(e);
      break;
    default:
      wa(e);
  }
}
function au(e) {
  var t = e.deletions;
  if (e.flags & 16) {
    if (t !== null)
      for (var l = 0; l < t.length; l++) {
        var a = t[l];
        ((me = a), Hd(a, e));
      }
    Cd(e);
  }
  for (e = e.child; e !== null; ) {
    switch (((t = e), t.tag)) {
      case 0:
      case 11:
      case 15:
        (Pt(8, t, t.return), au(t));
        break;
      case 22:
        ((l = t.stateNode),
          l._visibility & 2 && ((l._visibility &= -3), au(t)));
        break;
      default:
        au(t);
    }
    e = e.sibling;
  }
}
function Hd(e, t) {
  for (; me !== null; ) {
    var l = me;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Pt(8, l, t);
        break;
      case 23:
      case 22:
        if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
          var a = l.memoizedState.cachePool.pool;
          a != null && a.refCount++;
        }
        break;
      case 24:
        Sn(l.memoizedState.cache);
    }
    if (((a = l.child), a !== null)) ((a.return = l), (me = a));
    else
      e: for (l = e; me !== null; ) {
        a = me;
        var n = a.sibling,
          u = a.return;
        if ((zd(a), a === l)) {
          me = null;
          break e;
        }
        if (n !== null) {
          ((n.return = u), (me = n));
          break e;
        }
        me = u;
      }
  }
}
var Mp = {
    getCacheForType: function (e) {
      var t = je(oe),
        l = t.data.get(e);
      return (l === void 0 && ((l = e()), t.data.set(e, l)), l);
    },
  },
  Op = typeof WeakMap == "function" ? WeakMap : Map,
  K = 0,
  $ = null,
  U = null,
  q = 0,
  X = 0,
  Ce = null,
  Yt = !1,
  ga = !1,
  js = !1,
  Et = 0,
  ne = 0,
  It = 0,
  ml = 0,
  Ns = 0,
  Je = 0,
  fa = 0,
  Ja = null,
  we = null,
  xi = !1,
  ks = 0,
  Tu = 1 / 0,
  Eu = null,
  Lt = null,
  xe = 0,
  Vt = null,
  oa = null,
  la = 0,
  vi = 0,
  Si = null,
  qd = null,
  $a = 0,
  ji = null;
function Be() {
  if (K & 2 && q !== 0) return q & -q;
  if (w.T !== null) {
    var e = ca;
    return e !== 0 ? e : Ts();
  }
  return Jf();
}
function Bd() {
  Je === 0 && (Je = !(q & 536870912) || Y ? Kf() : 536870912);
  var e = $e.current;
  return (e !== null && (e.flags |= 32), Je);
}
function Ge(e, t, l) {
  (((e === $ && (X === 2 || X === 9)) || e.cancelPendingCommit !== null) &&
    (da(e, 0), Qt(e, q, Je, !1)),
    bn(e, l),
    (!(K & 2) || e !== $) &&
      (e === $ && (!(K & 2) && (ml |= l), ne === 4 && Qt(e, q, Je, !1)),
      ft(e)));
}
function Gd(e, t, l) {
  if (K & 6) throw Error(x(327));
  var a = (!l && (t & 124) === 0 && (t & e.expiredLanes) === 0) || pn(e, t),
    n = a ? Rp(e, t) : Dc(e, t, !0),
    u = a;
  do {
    if (n === 0) {
      ga && !a && Qt(e, t, 0, !1);
      break;
    } else {
      if (((l = e.current.alternate), u && !Dp(l))) {
        ((n = Dc(e, t, !1)), (u = !1));
        continue;
      }
      if (n === 2) {
        if (((u = t), e.errorRecoveryDisabledLanes & u)) var c = 0;
        else
          ((c = e.pendingLanes & -536870913),
            (c = c !== 0 ? c : c & 536870912 ? 536870912 : 0));
        if (c !== 0) {
          t = c;
          e: {
            var s = e;
            n = Ja;
            var r = s.current.memoizedState.isDehydrated;
            if ((r && (da(s, c).flags |= 256), (c = Dc(s, c, !1)), c !== 2)) {
              if (js && !r) {
                ((s.errorRecoveryDisabledLanes |= u), (ml |= u), (n = 4));
                break e;
              }
              ((u = we),
                (we = n),
                u !== null && (we === null ? (we = u) : we.push.apply(we, u)));
            }
            n = c;
          }
          if (((u = !1), n !== 2)) continue;
        }
      }
      if (n === 1) {
        (da(e, 0), Qt(e, t, 0, !0));
        break;
      }
      e: {
        switch (((a = e), (u = n), u)) {
          case 0:
          case 1:
            throw Error(x(345));
          case 4:
            if ((t & 4194048) !== t) break;
          case 6:
            Qt(a, t, Je, !Yt);
            break e;
          case 2:
            we = null;
            break;
          case 3:
          case 5:
            break;
          default:
            throw Error(x(329));
        }
        if ((t & 62914560) === t && ((n = ks + 300 - ct()), 10 < n)) {
          if ((Qt(a, t, Je, !Yt), Gu(a, 0, !0) !== 0)) break e;
          a.timeoutHandle = uh(
            Xr.bind(null, a, l, we, Eu, xi, t, Je, ml, fa, Yt, u, 2, -0, 0),
            n,
          );
          break e;
        }
        Xr(a, l, we, Eu, xi, t, Je, ml, fa, Yt, u, 0, -0, 0);
      }
    }
    break;
  } while (!0);
  ft(e);
}
function Xr(e, t, l, a, n, u, c, s, r, o, b, y, d, p) {
  if (
    ((e.timeoutHandle = -1),
    (y = t.subtreeFlags),
    (y & 8192 || (y & 16785408) === 16785408) &&
      ((cn = { stylesheets: null, count: 0, unsuspend: h0 }),
      Rd(t),
      (y = p0()),
      y !== null))
  ) {
    ((e.cancelPendingCommit = y(
      Zr.bind(null, e, t, u, l, a, n, c, s, r, b, 1, d, p),
    )),
      Qt(e, u, c, !o));
    return;
  }
  Zr(e, t, u, l, a, n, c, s, r);
}
function Dp(e) {
  for (var t = e; ; ) {
    var l = t.tag;
    if (
      (l === 0 || l === 11 || l === 15) &&
      t.flags & 16384 &&
      ((l = t.updateQueue), l !== null && ((l = l.stores), l !== null))
    )
      for (var a = 0; a < l.length; a++) {
        var n = l[a],
          u = n.getSnapshot;
        n = n.value;
        try {
          if (!Ye(u(), n)) return !1;
        } catch {
          return !1;
        }
      }
    if (((l = t.child), t.subtreeFlags & 16384 && l !== null))
      ((l.return = t), (t = l));
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
  }
  return !0;
}
function Qt(e, t, l, a) {
  ((t &= ~Ns),
    (t &= ~ml),
    (e.suspendedLanes |= t),
    (e.pingedLanes &= ~t),
    a && (e.warmLanes |= t),
    (a = e.expirationTimes));
  for (var n = t; 0 < n; ) {
    var u = 31 - qe(n),
      c = 1 << u;
    ((a[u] = -1), (n &= ~c));
  }
  l !== 0 && Lf(e, l, t);
}
function Fu() {
  return K & 6 ? !0 : (Tn(0), !1);
}
function As() {
  if (U !== null) {
    if (X === 0) var e = U.return;
    else ((e = U), (xt = Nl = null), os(e), (ta = null), (an = 0), (e = U));
    for (; e !== null; ) (Sd(e.alternate, e), (e = e.return));
    U = null;
  }
}
function da(e, t) {
  var l = e.timeoutHandle;
  (l !== -1 && ((e.timeoutHandle = -1), Fp(l)),
    (l = e.cancelPendingCommit),
    l !== null && ((e.cancelPendingCommit = null), l()),
    As(),
    ($ = e),
    (U = l = jt(e.current, null)),
    (q = t),
    (X = 0),
    (Ce = null),
    (Yt = !1),
    (ga = pn(e, t)),
    (js = !1),
    (fa = Je = Ns = ml = It = ne = 0),
    (we = Ja = null),
    (xi = !1),
    t & 8 && (t |= t & 32));
  var a = e.entangledLanes;
  if (a !== 0)
    for (e = e.entanglements, a &= t; 0 < a; ) {
      var n = 31 - qe(a),
        u = 1 << n;
      ((t |= e[n]), (a &= ~u));
    }
  return ((Et = t), Ku(), l);
}
function Yd(e, t) {
  ((_ = null),
    (w.H = vu),
    t === jn || t === Lu
      ? ((t = Sr()), (X = 3))
      : t === Ao
        ? ((t = Sr()), (X = 4))
        : (X =
            t === pd
              ? 8
              : t !== null &&
                  typeof t == "object" &&
                  typeof t.then == "function"
                ? 6
                : 1),
    (Ce = t),
    U === null && ((ne = 1), Nu(e, Ve(t, e.current))));
}
function Qd() {
  var e = w.H;
  return ((w.H = vu), e === null ? vu : e);
}
function Xd() {
  var e = w.A;
  return ((w.A = Mp), e);
}
function Ni() {
  ((ne = 4),
    Yt || ((q & 4194048) !== q && $e.current !== null) || (ga = !0),
    (!(It & 134217727) && !(ml & 134217727)) || $ === null || Qt($, q, Je, !1));
}
function Dc(e, t, l) {
  var a = K;
  K |= 2;
  var n = Qd(),
    u = Xd();
  (($ !== e || q !== t) && ((Eu = null), da(e, t)), (t = !1));
  var c = ne;
  e: do
    try {
      if (X !== 0 && U !== null) {
        var s = U,
          r = Ce;
        switch (X) {
          case 8:
            (As(), (c = 6));
            break e;
          case 3:
          case 2:
          case 9:
          case 6:
            $e.current === null && (t = !0);
            var o = X;
            if (((X = 0), (Ce = null), Jl(e, s, r, o), l && ga)) {
              c = 0;
              break e;
            }
            break;
          default:
            ((o = X), (X = 0), (Ce = null), Jl(e, s, r, o));
        }
      }
      (_p(), (c = ne));
      break;
    } catch (b) {
      Yd(e, b);
    }
  while (!0);
  return (
    t && e.shellSuspendCounter++,
    (xt = Nl = null),
    (K = a),
    (w.H = n),
    (w.A = u),
    U === null && (($ = null), (q = 0), Ku()),
    c
  );
}
function _p() {
  for (; U !== null; ) Kd(U);
}
function Rp(e, t) {
  var l = K;
  K |= 2;
  var a = Qd(),
    n = Xd();
  $ !== e || q !== t
    ? ((Eu = null), (Tu = ct() + 500), da(e, t))
    : (ga = pn(e, t));
  e: do
    try {
      if (X !== 0 && U !== null) {
        t = U;
        var u = Ce;
        t: switch (X) {
          case 1:
            ((X = 0), (Ce = null), Jl(e, t, u, 1));
            break;
          case 2:
          case 9:
            if (vr(u)) {
              ((X = 0), (Ce = null), Kr(t));
              break;
            }
            ((t = function () {
              ((X !== 2 && X !== 9) || $ !== e || (X = 7), ft(e));
            }),
              u.then(t, t));
            break e;
          case 3:
            X = 7;
            break e;
          case 4:
            X = 5;
            break e;
          case 7:
            vr(u)
              ? ((X = 0), (Ce = null), Kr(t))
              : ((X = 0), (Ce = null), Jl(e, t, u, 7));
            break;
          case 5:
            var c = null;
            switch (U.tag) {
              case 26:
                c = U.memoizedState;
              case 5:
              case 27:
                var s = U;
                if (!c || rh(c)) {
                  ((X = 0), (Ce = null));
                  var r = s.sibling;
                  if (r !== null) U = r;
                  else {
                    var o = s.return;
                    o !== null ? ((U = o), Wu(o)) : (U = null);
                  }
                  break t;
                }
            }
            ((X = 0), (Ce = null), Jl(e, t, u, 5));
            break;
          case 6:
            ((X = 0), (Ce = null), Jl(e, t, u, 6));
            break;
          case 8:
            (As(), (ne = 6));
            break e;
          default:
            throw Error(x(462));
        }
      }
      Cp();
      break;
    } catch (b) {
      Yd(e, b);
    }
  while (!0);
  return (
    (xt = Nl = null),
    (w.H = a),
    (w.A = n),
    (K = l),
    U !== null ? 0 : (($ = null), (q = 0), Ku(), ne)
  );
}
function Cp() {
  for (; U !== null && !am(); ) Kd(U);
}
function Kd(e) {
  var t = vd(e.alternate, e, Et);
  ((e.memoizedProps = e.pendingProps), t === null ? Wu(e) : (U = t));
}
function Kr(e) {
  var t = e,
    l = t.alternate;
  switch (t.tag) {
    case 15:
    case 0:
      t = Hr(l, t, t.pendingProps, t.type, void 0, q);
      break;
    case 11:
      t = Hr(l, t, t.pendingProps, t.type.render, t.ref, q);
      break;
    case 5:
      os(t);
    default:
      (Sd(l, t), (t = U = So(t, Et)), (t = vd(l, t, Et)));
  }
  ((e.memoizedProps = e.pendingProps), t === null ? Wu(e) : (U = t));
}
function Jl(e, t, l, a) {
  ((xt = Nl = null), os(t), (ta = null), (an = 0));
  var n = t.return;
  try {
    if (kp(e, n, t, l, q)) {
      ((ne = 1), Nu(e, Ve(l, e.current)), (U = null));
      return;
    }
  } catch (u) {
    if (n !== null) throw ((U = n), u);
    ((ne = 1), Nu(e, Ve(l, e.current)), (U = null));
    return;
  }
  t.flags & 32768
    ? (Y || a === 1
        ? (e = !0)
        : ga || q & 536870912
          ? (e = !1)
          : ((Yt = e = !0),
            (a === 2 || a === 9 || a === 3 || a === 6) &&
              ((a = $e.current),
              a !== null && a.tag === 13 && (a.flags |= 16384))),
      Zd(t, e))
    : Wu(t);
}
function Wu(e) {
  var t = e;
  do {
    if (t.flags & 32768) {
      Zd(t, Yt);
      return;
    }
    e = t.return;
    var l = Tp(t.alternate, t, Et);
    if (l !== null) {
      U = l;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      U = t;
      return;
    }
    U = t = e;
  } while (t !== null);
  ne === 0 && (ne = 5);
}
function Zd(e, t) {
  do {
    var l = Ep(e.alternate, e);
    if (l !== null) {
      ((l.flags &= 32767), (U = l));
      return;
    }
    if (
      ((l = e.return),
      l !== null &&
        ((l.flags |= 32768), (l.subtreeFlags = 0), (l.deletions = null)),
      !t && ((e = e.sibling), e !== null))
    ) {
      U = e;
      return;
    }
    U = e = l;
  } while (e !== null);
  ((ne = 6), (U = null));
}
function Zr(e, t, l, a, n, u, c, s, r) {
  e.cancelPendingCommit = null;
  do Pu();
  while (xe !== 0);
  if (K & 6) throw Error(x(327));
  if (t !== null) {
    if (t === e.current) throw Error(x(177));
    if (
      ((u = t.lanes | t.childLanes),
      (u |= Pi),
      hm(e, l, u, c, s, r),
      e === $ && ((U = $ = null), (q = 0)),
      (oa = t),
      (Vt = e),
      (la = l),
      (vi = u),
      (Si = n),
      (qd = a),
      t.subtreeFlags & 10256 || t.flags & 10256
        ? ((e.callbackNode = null),
          (e.callbackPriority = 0),
          Bp(fu, function () {
            return (Fd(), null);
          }))
        : ((e.callbackNode = null), (e.callbackPriority = 0)),
      (a = (t.flags & 13878) !== 0),
      t.subtreeFlags & 13878 || a)
    ) {
      ((a = w.T), (w.T = null), (n = Q.p), (Q.p = 2), (c = K), (K |= 4));
      try {
        zp(e, t, l);
      } finally {
        ((K = c), (Q.p = n), (w.T = a));
      }
    }
    ((xe = 1), Ld(), Vd(), Jd());
  }
}
function Ld() {
  if (xe === 1) {
    xe = 0;
    var e = Vt,
      t = oa,
      l = (t.flags & 13878) !== 0;
    if (t.subtreeFlags & 13878 || l) {
      ((l = w.T), (w.T = null));
      var a = Q.p;
      Q.p = 2;
      var n = K;
      K |= 4;
      try {
        Od(t, e);
        var u = Ei,
          c = ho(e.containerInfo),
          s = u.focusedElem,
          r = u.selectionRange;
        if (
          c !== s &&
          s &&
          s.ownerDocument &&
          oo(s.ownerDocument.documentElement, s)
        ) {
          if (r !== null && Wi(s)) {
            var o = r.start,
              b = r.end;
            if ((b === void 0 && (b = o), "selectionStart" in s))
              ((s.selectionStart = o),
                (s.selectionEnd = Math.min(b, s.value.length)));
            else {
              var y = s.ownerDocument || document,
                d = (y && y.defaultView) || window;
              if (d.getSelection) {
                var p = d.getSelection(),
                  N = s.textContent.length,
                  A = Math.min(r.start, N),
                  H = r.end === void 0 ? A : Math.min(r.end, N);
                !p.extend && A > H && ((c = H), (H = A), (A = c));
                var h = dr(s, A),
                  f = dr(s, H);
                if (
                  h &&
                  f &&
                  (p.rangeCount !== 1 ||
                    p.anchorNode !== h.node ||
                    p.anchorOffset !== h.offset ||
                    p.focusNode !== f.node ||
                    p.focusOffset !== f.offset)
                ) {
                  var m = y.createRange();
                  (m.setStart(h.node, h.offset),
                    p.removeAllRanges(),
                    A > H
                      ? (p.addRange(m), p.extend(f.node, f.offset))
                      : (m.setEnd(f.node, f.offset), p.addRange(m)));
                }
              }
            }
          }
          for (y = [], p = s; (p = p.parentNode); )
            p.nodeType === 1 &&
              y.push({ element: p, left: p.scrollLeft, top: p.scrollTop });
          for (
            typeof s.focus == "function" && s.focus(), s = 0;
            s < y.length;
            s++
          ) {
            var g = y[s];
            ((g.element.scrollLeft = g.left), (g.element.scrollTop = g.top));
          }
        }
        ((Cu = !!Ti), (Ei = Ti = null));
      } finally {
        ((K = n), (Q.p = a), (w.T = l));
      }
    }
    ((e.current = t), (xe = 2));
  }
}
function Vd() {
  if (xe === 2) {
    xe = 0;
    var e = Vt,
      t = oa,
      l = (t.flags & 8772) !== 0;
    if (t.subtreeFlags & 8772 || l) {
      ((l = w.T), (w.T = null));
      var a = Q.p;
      Q.p = 2;
      var n = K;
      K |= 4;
      try {
        Ed(e, t.alternate, t);
      } finally {
        ((K = n), (Q.p = a), (w.T = l));
      }
    }
    xe = 3;
  }
}
function Jd() {
  if (xe === 4 || xe === 3) {
    ((xe = 0), nm());
    var e = Vt,
      t = oa,
      l = la,
      a = qd;
    t.subtreeFlags & 10256 || t.flags & 10256
      ? (xe = 5)
      : ((xe = 0), (oa = Vt = null), $d(e, e.pendingLanes));
    var n = e.pendingLanes;
    if (
      (n === 0 && (Lt = null),
      Ki(l),
      (t = t.stateNode),
      He && typeof He.onCommitFiberRoot == "function")
    )
      try {
        He.onCommitFiberRoot(mn, t, void 0, (t.current.flags & 128) === 128);
      } catch {}
    if (a !== null) {
      ((t = w.T), (n = Q.p), (Q.p = 2), (w.T = null));
      try {
        for (var u = e.onRecoverableError, c = 0; c < a.length; c++) {
          var s = a[c];
          u(s.value, { componentStack: s.stack });
        }
      } finally {
        ((w.T = t), (Q.p = n));
      }
    }
    (la & 3 && Pu(),
      ft(e),
      (n = e.pendingLanes),
      l & 4194090 && n & 42
        ? e === ji
          ? $a++
          : (($a = 0), (ji = e))
        : ($a = 0),
      Tn(0));
  }
}
function $d(e, t) {
  (e.pooledCacheLanes &= t) === 0 &&
    ((t = e.pooledCache), t != null && ((e.pooledCache = null), Sn(t)));
}
function Pu(e) {
  return (Ld(), Vd(), Jd(), Fd());
}
function Fd() {
  if (xe !== 5) return !1;
  var e = Vt,
    t = vi;
  vi = 0;
  var l = Ki(la),
    a = w.T,
    n = Q.p;
  try {
    ((Q.p = 32 > l ? 32 : l), (w.T = null), (l = Si), (Si = null));
    var u = Vt,
      c = la;
    if (((xe = 0), (oa = Vt = null), (la = 0), K & 6)) throw Error(x(331));
    var s = K;
    if (
      ((K |= 4),
      Ud(u.current),
      _d(u, u.current, c, l),
      (K = s),
      Tn(0, !1),
      He && typeof He.onPostCommitFiberRoot == "function")
    )
      try {
        He.onPostCommitFiberRoot(mn, u);
      } catch {}
    return !0;
  } finally {
    ((Q.p = n), (w.T = a), $d(e, t));
  }
}
function Lr(e, t, l) {
  ((t = Ve(l, t)),
    (t = pi(e.stateNode, t, 2)),
    (e = Zt(e, t, 2)),
    e !== null && (bn(e, 2), ft(e)));
}
function V(e, t, l) {
  if (e.tag === 3) Lr(e, e, l);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        Lr(t, e, l);
        break;
      } else if (t.tag === 1) {
        var a = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof a.componentDidCatch == "function" &&
            (Lt === null || !Lt.has(a)))
        ) {
          ((e = Ve(l, e)),
            (l = hd(2)),
            (a = Zt(t, l, 2)),
            a !== null && (md(l, a, t, e), bn(a, 2), ft(a)));
          break;
        }
      }
      t = t.return;
    }
}
function _c(e, t, l) {
  var a = e.pingCache;
  if (a === null) {
    a = e.pingCache = new Op();
    var n = new Set();
    a.set(t, n);
  } else ((n = a.get(t)), n === void 0 && ((n = new Set()), a.set(t, n)));
  n.has(l) || ((js = !0), n.add(l), (e = Up.bind(null, e, t, l)), t.then(e, e));
}
function Up(e, t, l) {
  var a = e.pingCache;
  (a !== null && a.delete(t),
    (e.pingedLanes |= e.suspendedLanes & l),
    (e.warmLanes &= ~l),
    $ === e &&
      (q & l) === l &&
      (ne === 4 || (ne === 3 && (q & 62914560) === q && 300 > ct() - ks)
        ? !(K & 2) && da(e, 0)
        : (Ns |= l),
      fa === q && (fa = 0)),
    ft(e));
}
function Wd(e, t) {
  (t === 0 && (t = Zf()), (e = ya(e, t)), e !== null && (bn(e, t), ft(e)));
}
function Hp(e) {
  var t = e.memoizedState,
    l = 0;
  (t !== null && (l = t.retryLane), Wd(e, l));
}
function qp(e, t) {
  var l = 0;
  switch (e.tag) {
    case 13:
      var a = e.stateNode,
        n = e.memoizedState;
      n !== null && (l = n.retryLane);
      break;
    case 19:
      a = e.stateNode;
      break;
    case 22:
      a = e.stateNode._retryCache;
      break;
    default:
      throw Error(x(314));
  }
  (a !== null && a.delete(t), Wd(e, l));
}
function Bp(e, t) {
  return Qi(e, t);
}
var zu = null,
  Ul = null,
  ki = !1,
  wu = !1,
  Rc = !1,
  pl = 0;
function ft(e) {
  (e !== Ul &&
    e.next === null &&
    (Ul === null ? (zu = Ul = e) : (Ul = Ul.next = e)),
    (wu = !0),
    ki || ((ki = !0), Yp()));
}
function Tn(e, t) {
  if (!Rc && wu) {
    Rc = !0;
    do
      for (var l = !1, a = zu; a !== null; ) {
        if (e !== 0) {
          var n = a.pendingLanes;
          if (n === 0) var u = 0;
          else {
            var c = a.suspendedLanes,
              s = a.pingedLanes;
            ((u = (1 << (31 - qe(42 | e) + 1)) - 1),
              (u &= n & ~(c & ~s)),
              (u = u & 201326741 ? (u & 201326741) | 1 : u ? u | 2 : 0));
          }
          u !== 0 && ((l = !0), Vr(a, u));
        } else
          ((u = q),
            (u = Gu(
              a,
              a === $ ? u : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1,
            )),
            !(u & 3) || pn(a, u) || ((l = !0), Vr(a, u)));
        a = a.next;
      }
    while (l);
    Rc = !1;
  }
}
function Gp() {
  Pd();
}
function Pd() {
  wu = ki = !1;
  var e = 0;
  pl !== 0 && ($p() && (e = pl), (pl = 0));
  for (var t = ct(), l = null, a = zu; a !== null; ) {
    var n = a.next,
      u = Id(a, t);
    (u === 0
      ? ((a.next = null),
        l === null ? (zu = n) : (l.next = n),
        n === null && (Ul = l))
      : ((l = a), (e !== 0 || u & 3) && (wu = !0)),
      (a = n));
  }
  Tn(e);
}
function Id(e, t) {
  for (
    var l = e.suspendedLanes,
      a = e.pingedLanes,
      n = e.expirationTimes,
      u = e.pendingLanes & -62914561;
    0 < u;
  ) {
    var c = 31 - qe(u),
      s = 1 << c,
      r = n[c];
    (r === -1
      ? (!(s & l) || s & a) && (n[c] = dm(s, t))
      : r <= t && (e.expiredLanes |= s),
      (u &= ~s));
  }
  if (
    ((t = $),
    (l = q),
    (l = Gu(
      e,
      e === t ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1,
    )),
    (a = e.callbackNode),
    l === 0 ||
      (e === t && (X === 2 || X === 9)) ||
      e.cancelPendingCommit !== null)
  )
    return (
      a !== null && a !== null && cc(a),
      (e.callbackNode = null),
      (e.callbackPriority = 0)
    );
  if (!(l & 3) || pn(e, l)) {
    if (((t = l & -l), t === e.callbackPriority)) return t;
    switch ((a !== null && cc(a), Ki(l))) {
      case 2:
      case 8:
        l = Qf;
        break;
      case 32:
        l = fu;
        break;
      case 268435456:
        l = Xf;
        break;
      default:
        l = fu;
    }
    return (
      (a = eh.bind(null, e)),
      (l = Qi(l, a)),
      (e.callbackPriority = t),
      (e.callbackNode = l),
      t
    );
  }
  return (
    a !== null && a !== null && cc(a),
    (e.callbackPriority = 2),
    (e.callbackNode = null),
    2
  );
}
function eh(e, t) {
  if (xe !== 0 && xe !== 5)
    return ((e.callbackNode = null), (e.callbackPriority = 0), null);
  var l = e.callbackNode;
  if (Pu() && e.callbackNode !== l) return null;
  var a = q;
  return (
    (a = Gu(
      e,
      e === $ ? a : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1,
    )),
    a === 0
      ? null
      : (Gd(e, a, t),
        Id(e, ct()),
        e.callbackNode != null && e.callbackNode === l
          ? eh.bind(null, e)
          : null)
  );
}
function Vr(e, t) {
  if (Pu()) return null;
  Gd(e, t, !0);
}
function Yp() {
  Wp(function () {
    K & 6 ? Qi(Yf, Gp) : Pd();
  });
}
function Ts() {
  return (pl === 0 && (pl = Kf()), pl);
}
function Jr(e) {
  return e == null || typeof e == "symbol" || typeof e == "boolean"
    ? null
    : typeof e == "function"
      ? e
      : $n("" + e);
}
function $r(e, t) {
  var l = t.ownerDocument.createElement("input");
  return (
    (l.name = t.name),
    (l.value = t.value),
    e.id && l.setAttribute("form", e.id),
    t.parentNode.insertBefore(l, t),
    (e = new FormData(e)),
    l.parentNode.removeChild(l),
    e
  );
}
function Qp(e, t, l, a, n) {
  if (t === "submit" && l && l.stateNode === n) {
    var u = Jr((n[Me] || null).action),
      c = a.submitter;
    c &&
      ((t = (t = c[Me] || null)
        ? Jr(t.formAction)
        : c.getAttribute("formAction")),
      t !== null && ((u = t), (c = null)));
    var s = new Yu("action", "action", null, a, n);
    e.push({
      event: s,
      listeners: [
        {
          instance: null,
          listener: function () {
            if (a.defaultPrevented) {
              if (pl !== 0) {
                var r = c ? $r(n, c) : new FormData(n);
                hi(
                  l,
                  { pending: !0, data: r, method: n.method, action: u },
                  null,
                  r,
                );
              }
            } else
              typeof u == "function" &&
                (s.preventDefault(),
                (r = c ? $r(n, c) : new FormData(n)),
                hi(
                  l,
                  { pending: !0, data: r, method: n.method, action: u },
                  u,
                  r,
                ));
          },
          currentTarget: n,
        },
      ],
    });
  }
}
for (var Cc = 0; Cc < ti.length; Cc++) {
  var Uc = ti[Cc],
    Xp = Uc.toLowerCase(),
    Kp = Uc[0].toUpperCase() + Uc.slice(1);
  tt(Xp, "on" + Kp);
}
tt(po, "onAnimationEnd");
tt(bo, "onAnimationIteration");
tt(yo, "onAnimationStart");
tt("dblclick", "onDoubleClick");
tt("focusin", "onFocus");
tt("focusout", "onBlur");
tt(ip, "onTransitionRun");
tt(sp, "onTransitionStart");
tt(rp, "onTransitionCancel");
tt(go, "onTransitionEnd");
na("onMouseEnter", ["mouseout", "mouseover"]);
na("onMouseLeave", ["mouseout", "mouseover"]);
na("onPointerEnter", ["pointerout", "pointerover"]);
na("onPointerLeave", ["pointerout", "pointerover"]);
vl(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(
    " ",
  ),
);
vl(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " ",
  ),
);
vl("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
vl(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" "),
);
vl(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" "),
);
vl(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
);
var nn =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " ",
    ),
  Zp = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle"
      .split(" ")
      .concat(nn),
  );
function th(e, t) {
  t = (t & 4) !== 0;
  for (var l = 0; l < e.length; l++) {
    var a = e[l],
      n = a.event;
    a = a.listeners;
    e: {
      var u = void 0;
      if (t)
        for (var c = a.length - 1; 0 <= c; c--) {
          var s = a[c],
            r = s.instance,
            o = s.currentTarget;
          if (((s = s.listener), r !== u && n.isPropagationStopped())) break e;
          ((u = s), (n.currentTarget = o));
          try {
            u(n);
          } catch (b) {
            ju(b);
          }
          ((n.currentTarget = null), (u = r));
        }
      else
        for (c = 0; c < a.length; c++) {
          if (
            ((s = a[c]),
            (r = s.instance),
            (o = s.currentTarget),
            (s = s.listener),
            r !== u && n.isPropagationStopped())
          )
            break e;
          ((u = s), (n.currentTarget = o));
          try {
            u(n);
          } catch (b) {
            ju(b);
          }
          ((n.currentTarget = null), (u = r));
        }
    }
  }
}
function C(e, t) {
  var l = t[Jc];
  l === void 0 && (l = t[Jc] = new Set());
  var a = e + "__bubble";
  l.has(a) || (lh(t, e, 2, !1), l.add(a));
}
function Hc(e, t, l) {
  var a = 0;
  (t && (a |= 4), lh(l, e, a, t));
}
var Xn = "_reactListening" + Math.random().toString(36).slice(2);
function Es(e) {
  if (!e[Xn]) {
    ((e[Xn] = !0),
      $f.forEach(function (l) {
        l !== "selectionchange" && (Zp.has(l) || Hc(l, !1, e), Hc(l, !0, e));
      }));
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Xn] || ((t[Xn] = !0), Hc("selectionchange", !1, t));
  }
}
function lh(e, t, l, a) {
  switch (mh(t)) {
    case 2:
      var n = g0;
      break;
    case 8:
      n = x0;
      break;
    default:
      n = Os;
  }
  ((l = n.bind(null, t, l, e)),
    (n = void 0),
    !Pc ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (n = !0),
    a
      ? n !== void 0
        ? e.addEventListener(t, l, { capture: !0, passive: n })
        : e.addEventListener(t, l, !0)
      : n !== void 0
        ? e.addEventListener(t, l, { passive: n })
        : e.addEventListener(t, l, !1));
}
function qc(e, t, l, a, n) {
  var u = a;
  if (!(t & 1) && !(t & 2) && a !== null)
    e: for (;;) {
      if (a === null) return;
      var c = a.tag;
      if (c === 3 || c === 4) {
        var s = a.stateNode.containerInfo;
        if (s === n) break;
        if (c === 4)
          for (c = a.return; c !== null; ) {
            var r = c.tag;
            if ((r === 3 || r === 4) && c.stateNode.containerInfo === n) return;
            c = c.return;
          }
        for (; s !== null; ) {
          if (((c = Bl(s)), c === null)) return;
          if (((r = c.tag), r === 5 || r === 6 || r === 26 || r === 27)) {
            a = u = c;
            continue e;
          }
          s = s.parentNode;
        }
      }
      a = a.return;
    }
  ao(function () {
    var o = u,
      b = Vi(l),
      y = [];
    e: {
      var d = xo.get(e);
      if (d !== void 0) {
        var p = Yu,
          N = e;
        switch (e) {
          case "keypress":
            if (Wn(l) === 0) break e;
          case "keydown":
          case "keyup":
            p = Bm;
            break;
          case "focusin":
            ((N = "focus"), (p = mc));
            break;
          case "focusout":
            ((N = "blur"), (p = mc));
            break;
          case "beforeblur":
          case "afterblur":
            p = mc;
            break;
          case "click":
            if (l.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            p = lr;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            p = Em;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            p = Qm;
            break;
          case po:
          case bo:
          case yo:
            p = Mm;
            break;
          case go:
            p = Km;
            break;
          case "scroll":
          case "scrollend":
            p = Am;
            break;
          case "wheel":
            p = Lm;
            break;
          case "copy":
          case "cut":
          case "paste":
            p = Dm;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            p = nr;
            break;
          case "toggle":
          case "beforetoggle":
            p = Jm;
        }
        var A = (t & 4) !== 0,
          H = !A && (e === "scroll" || e === "scrollend"),
          h = A ? (d !== null ? d + "Capture" : null) : d;
        A = [];
        for (var f = o, m; f !== null; ) {
          var g = f;
          if (
            ((m = g.stateNode),
            (g = g.tag),
            (g !== 5 && g !== 26 && g !== 27) ||
              m === null ||
              h === null ||
              ((g = Pa(f, h)), g != null && A.push(un(f, g, m))),
            H)
          )
            break;
          f = f.return;
        }
        0 < A.length &&
          ((d = new p(d, N, null, l, b)), y.push({ event: d, listeners: A }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((d = e === "mouseover" || e === "pointerover"),
          (p = e === "mouseout" || e === "pointerout"),
          d &&
            l !== Wc &&
            (N = l.relatedTarget || l.fromElement) &&
            (Bl(N) || N[pa]))
        )
          break e;
        if (
          (p || d) &&
          ((d =
            b.window === b
              ? b
              : (d = b.ownerDocument)
                ? d.defaultView || d.parentWindow
                : window),
          p
            ? ((N = l.relatedTarget || l.toElement),
              (p = o),
              (N = N ? Bl(N) : null),
              N !== null &&
                ((H = hn(N)),
                (A = N.tag),
                N !== H || (A !== 5 && A !== 27 && A !== 6)) &&
                (N = null))
            : ((p = null), (N = o)),
          p !== N)
        ) {
          if (
            ((A = lr),
            (g = "onMouseLeave"),
            (h = "onMouseEnter"),
            (f = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((A = nr),
              (g = "onPointerLeave"),
              (h = "onPointerEnter"),
              (f = "pointer")),
            (H = p == null ? d : Ra(p)),
            (m = N == null ? d : Ra(N)),
            (d = new A(g, f + "leave", p, l, b)),
            (d.target = H),
            (d.relatedTarget = m),
            (g = null),
            Bl(b) === o &&
              ((A = new A(h, f + "enter", N, l, b)),
              (A.target = m),
              (A.relatedTarget = H),
              (g = A)),
            (H = g),
            p && N)
          )
            t: {
              for (A = p, h = N, f = 0, m = A; m; m = Ol(m)) f++;
              for (m = 0, g = h; g; g = Ol(g)) m++;
              for (; 0 < f - m; ) ((A = Ol(A)), f--);
              for (; 0 < m - f; ) ((h = Ol(h)), m--);
              for (; f--; ) {
                if (A === h || (h !== null && A === h.alternate)) break t;
                ((A = Ol(A)), (h = Ol(h)));
              }
              A = null;
            }
          else A = null;
          (p !== null && Fr(y, d, p, A, !1),
            N !== null && H !== null && Fr(y, H, N, A, !0));
        }
      }
      e: {
        if (
          ((d = o ? Ra(o) : window),
          (p = d.nodeName && d.nodeName.toLowerCase()),
          p === "select" || (p === "input" && d.type === "file"))
        )
          var v = sr;
        else if (ir(d))
          if (ro) v = np;
          else {
            v = lp;
            var E = tp;
          }
        else
          ((p = d.nodeName),
            !p ||
            p.toLowerCase() !== "input" ||
            (d.type !== "checkbox" && d.type !== "radio")
              ? o && Li(o.elementType) && (v = sr)
              : (v = ap));
        if (v && (v = v(e, o))) {
          so(y, v, l, b);
          break e;
        }
        (E && E(e, d, o),
          e === "focusout" &&
            o &&
            d.type === "number" &&
            o.memoizedProps.value != null &&
            Fc(d, "number", d.value));
      }
      switch (((E = o ? Ra(o) : window), e)) {
        case "focusin":
          (ir(E) || E.contentEditable === "true") &&
            ((Ql = E), (Ic = o), (Ba = null));
          break;
        case "focusout":
          Ba = Ic = Ql = null;
          break;
        case "mousedown":
          ei = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          ((ei = !1), hr(y, l, b));
          break;
        case "selectionchange":
          if (cp) break;
        case "keydown":
        case "keyup":
          hr(y, l, b);
      }
      var S;
      if (Fi)
        e: {
          switch (e) {
            case "compositionstart":
              var T = "onCompositionStart";
              break e;
            case "compositionend":
              T = "onCompositionEnd";
              break e;
            case "compositionupdate":
              T = "onCompositionUpdate";
              break e;
          }
          T = void 0;
        }
      else
        Yl
          ? co(e, l) && (T = "onCompositionEnd")
          : e === "keydown" && l.keyCode === 229 && (T = "onCompositionStart");
      (T &&
        (uo &&
          l.locale !== "ko" &&
          (Yl || T !== "onCompositionStart"
            ? T === "onCompositionEnd" && Yl && (S = no())
            : ((Gt = b),
              (Ji = "value" in Gt ? Gt.value : Gt.textContent),
              (Yl = !0))),
        (E = Mu(o, T)),
        0 < E.length &&
          ((T = new ar(T, e, null, l, b)),
          y.push({ event: T, listeners: E }),
          S ? (T.data = S) : ((S = io(l)), S !== null && (T.data = S)))),
        (S = Fm ? Wm(e, l) : Pm(e, l)) &&
          ((T = Mu(o, "onBeforeInput")),
          0 < T.length &&
            ((E = new ar("onBeforeInput", "beforeinput", null, l, b)),
            y.push({ event: E, listeners: T }),
            (E.data = S))),
        Qp(y, e, o, l, b));
    }
    th(y, t);
  });
}
function un(e, t, l) {
  return { instance: e, listener: t, currentTarget: l };
}
function Mu(e, t) {
  for (var l = t + "Capture", a = []; e !== null; ) {
    var n = e,
      u = n.stateNode;
    if (
      ((n = n.tag),
      (n !== 5 && n !== 26 && n !== 27) ||
        u === null ||
        ((n = Pa(e, l)),
        n != null && a.unshift(un(e, n, u)),
        (n = Pa(e, t)),
        n != null && a.push(un(e, n, u))),
      e.tag === 3)
    )
      return a;
    e = e.return;
  }
  return [];
}
function Ol(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5 && e.tag !== 27);
  return e || null;
}
function Fr(e, t, l, a, n) {
  for (var u = t._reactName, c = []; l !== null && l !== a; ) {
    var s = l,
      r = s.alternate,
      o = s.stateNode;
    if (((s = s.tag), r !== null && r === a)) break;
    ((s !== 5 && s !== 26 && s !== 27) ||
      o === null ||
      ((r = o),
      n
        ? ((o = Pa(l, u)), o != null && c.unshift(un(l, o, r)))
        : n || ((o = Pa(l, u)), o != null && c.push(un(l, o, r)))),
      (l = l.return));
  }
  c.length !== 0 && e.push({ event: t, listeners: c });
}
var Lp = /\r\n?/g,
  Vp = /\u0000|\uFFFD/g;
function Wr(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      Lp,
      `
`,
    )
    .replace(Vp, "");
}
function ah(e, t) {
  return ((t = Wr(t)), Wr(e) === t);
}
function Iu() {}
function Z(e, t, l, a, n, u) {
  switch (l) {
    case "children":
      typeof a == "string"
        ? t === "body" || (t === "textarea" && a === "") || ua(e, a)
        : (typeof a == "number" || typeof a == "bigint") &&
          t !== "body" &&
          ua(e, "" + a);
      break;
    case "className":
      Un(e, "class", a);
      break;
    case "tabIndex":
      Un(e, "tabindex", a);
      break;
    case "dir":
    case "role":
    case "viewBox":
    case "width":
    case "height":
      Un(e, l, a);
      break;
    case "style":
      lo(e, a, u);
      break;
    case "data":
      if (t !== "object") {
        Un(e, "data", a);
        break;
      }
    case "src":
    case "href":
      if (a === "" && (t !== "a" || l !== "href")) {
        e.removeAttribute(l);
        break;
      }
      if (
        a == null ||
        typeof a == "function" ||
        typeof a == "symbol" ||
        typeof a == "boolean"
      ) {
        e.removeAttribute(l);
        break;
      }
      ((a = $n("" + a)), e.setAttribute(l, a));
      break;
    case "action":
    case "formAction":
      if (typeof a == "function") {
        e.setAttribute(
          l,
          "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
        );
        break;
      } else
        typeof u == "function" &&
          (l === "formAction"
            ? (t !== "input" && Z(e, t, "name", n.name, n, null),
              Z(e, t, "formEncType", n.formEncType, n, null),
              Z(e, t, "formMethod", n.formMethod, n, null),
              Z(e, t, "formTarget", n.formTarget, n, null))
            : (Z(e, t, "encType", n.encType, n, null),
              Z(e, t, "method", n.method, n, null),
              Z(e, t, "target", n.target, n, null)));
      if (a == null || typeof a == "symbol" || typeof a == "boolean") {
        e.removeAttribute(l);
        break;
      }
      ((a = $n("" + a)), e.setAttribute(l, a));
      break;
    case "onClick":
      a != null && (e.onclick = Iu);
      break;
    case "onScroll":
      a != null && C("scroll", e);
      break;
    case "onScrollEnd":
      a != null && C("scrollend", e);
      break;
    case "dangerouslySetInnerHTML":
      if (a != null) {
        if (typeof a != "object" || !("__html" in a)) throw Error(x(61));
        if (((l = a.__html), l != null)) {
          if (n.children != null) throw Error(x(60));
          e.innerHTML = l;
        }
      }
      break;
    case "multiple":
      e.multiple = a && typeof a != "function" && typeof a != "symbol";
      break;
    case "muted":
      e.muted = a && typeof a != "function" && typeof a != "symbol";
      break;
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "defaultValue":
    case "defaultChecked":
    case "innerHTML":
    case "ref":
      break;
    case "autoFocus":
      break;
    case "xlinkHref":
      if (
        a == null ||
        typeof a == "function" ||
        typeof a == "boolean" ||
        typeof a == "symbol"
      ) {
        e.removeAttribute("xlink:href");
        break;
      }
      ((l = $n("" + a)),
        e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", l));
      break;
    case "contentEditable":
    case "spellCheck":
    case "draggable":
    case "value":
    case "autoReverse":
    case "externalResourcesRequired":
    case "focusable":
    case "preserveAlpha":
      a != null && typeof a != "function" && typeof a != "symbol"
        ? e.setAttribute(l, "" + a)
        : e.removeAttribute(l);
      break;
    case "inert":
    case "allowFullScreen":
    case "async":
    case "autoPlay":
    case "controls":
    case "default":
    case "defer":
    case "disabled":
    case "disablePictureInPicture":
    case "disableRemotePlayback":
    case "formNoValidate":
    case "hidden":
    case "loop":
    case "noModule":
    case "noValidate":
    case "open":
    case "playsInline":
    case "readOnly":
    case "required":
    case "reversed":
    case "scoped":
    case "seamless":
    case "itemScope":
      a && typeof a != "function" && typeof a != "symbol"
        ? e.setAttribute(l, "")
        : e.removeAttribute(l);
      break;
    case "capture":
    case "download":
      a === !0
        ? e.setAttribute(l, "")
        : a !== !1 &&
            a != null &&
            typeof a != "function" &&
            typeof a != "symbol"
          ? e.setAttribute(l, a)
          : e.removeAttribute(l);
      break;
    case "cols":
    case "rows":
    case "size":
    case "span":
      a != null &&
      typeof a != "function" &&
      typeof a != "symbol" &&
      !isNaN(a) &&
      1 <= a
        ? e.setAttribute(l, a)
        : e.removeAttribute(l);
      break;
    case "rowSpan":
    case "start":
      a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a)
        ? e.removeAttribute(l)
        : e.setAttribute(l, a);
      break;
    case "popover":
      (C("beforetoggle", e), C("toggle", e), Jn(e, "popover", a));
      break;
    case "xlinkActuate":
      dt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", a);
      break;
    case "xlinkArcrole":
      dt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", a);
      break;
    case "xlinkRole":
      dt(e, "http://www.w3.org/1999/xlink", "xlink:role", a);
      break;
    case "xlinkShow":
      dt(e, "http://www.w3.org/1999/xlink", "xlink:show", a);
      break;
    case "xlinkTitle":
      dt(e, "http://www.w3.org/1999/xlink", "xlink:title", a);
      break;
    case "xlinkType":
      dt(e, "http://www.w3.org/1999/xlink", "xlink:type", a);
      break;
    case "xmlBase":
      dt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", a);
      break;
    case "xmlLang":
      dt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", a);
      break;
    case "xmlSpace":
      dt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", a);
      break;
    case "is":
      Jn(e, "is", a);
      break;
    case "innerText":
    case "textContent":
      break;
    default:
      (!(2 < l.length) ||
        (l[0] !== "o" && l[0] !== "O") ||
        (l[1] !== "n" && l[1] !== "N")) &&
        ((l = Nm.get(l) || l), Jn(e, l, a));
  }
}
function Ai(e, t, l, a, n, u) {
  switch (l) {
    case "style":
      lo(e, a, u);
      break;
    case "dangerouslySetInnerHTML":
      if (a != null) {
        if (typeof a != "object" || !("__html" in a)) throw Error(x(61));
        if (((l = a.__html), l != null)) {
          if (n.children != null) throw Error(x(60));
          e.innerHTML = l;
        }
      }
      break;
    case "children":
      typeof a == "string"
        ? ua(e, a)
        : (typeof a == "number" || typeof a == "bigint") && ua(e, "" + a);
      break;
    case "onScroll":
      a != null && C("scroll", e);
      break;
    case "onScrollEnd":
      a != null && C("scrollend", e);
      break;
    case "onClick":
      a != null && (e.onclick = Iu);
      break;
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "innerHTML":
    case "ref":
      break;
    case "innerText":
    case "textContent":
      break;
    default:
      if (!Ff.hasOwnProperty(l))
        e: {
          if (
            l[0] === "o" &&
            l[1] === "n" &&
            ((n = l.endsWith("Capture")),
            (t = l.slice(2, n ? l.length - 7 : void 0)),
            (u = e[Me] || null),
            (u = u != null ? u[l] : null),
            typeof u == "function" && e.removeEventListener(t, u, n),
            typeof a == "function")
          ) {
            (typeof u != "function" &&
              u !== null &&
              (l in e
                ? (e[l] = null)
                : e.hasAttribute(l) && e.removeAttribute(l)),
              e.addEventListener(t, a, n));
            break e;
          }
          l in e ? (e[l] = a) : a === !0 ? e.setAttribute(l, "") : Jn(e, l, a);
        }
  }
}
function ve(e, t, l) {
  switch (t) {
    case "div":
    case "span":
    case "svg":
    case "path":
    case "a":
    case "g":
    case "p":
    case "li":
      break;
    case "img":
      (C("error", e), C("load", e));
      var a = !1,
        n = !1,
        u;
      for (u in l)
        if (l.hasOwnProperty(u)) {
          var c = l[u];
          if (c != null)
            switch (u) {
              case "src":
                a = !0;
                break;
              case "srcSet":
                n = !0;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(x(137, t));
              default:
                Z(e, t, u, c, l, null);
            }
        }
      (n && Z(e, t, "srcSet", l.srcSet, l, null),
        a && Z(e, t, "src", l.src, l, null));
      return;
    case "input":
      C("invalid", e);
      var s = (u = c = n = null),
        r = null,
        o = null;
      for (a in l)
        if (l.hasOwnProperty(a)) {
          var b = l[a];
          if (b != null)
            switch (a) {
              case "name":
                n = b;
                break;
              case "type":
                c = b;
                break;
              case "checked":
                r = b;
                break;
              case "defaultChecked":
                o = b;
                break;
              case "value":
                u = b;
                break;
              case "defaultValue":
                s = b;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (b != null) throw Error(x(137, t));
                break;
              default:
                Z(e, t, a, b, l, null);
            }
        }
      (If(e, u, s, r, o, c, n, !1), ou(e));
      return;
    case "select":
      (C("invalid", e), (a = c = u = null));
      for (n in l)
        if (l.hasOwnProperty(n) && ((s = l[n]), s != null))
          switch (n) {
            case "value":
              u = s;
              break;
            case "defaultValue":
              c = s;
              break;
            case "multiple":
              a = s;
            default:
              Z(e, t, n, s, l, null);
          }
      ((t = u),
        (l = c),
        (e.multiple = !!a),
        t != null ? Fl(e, !!a, t, !1) : l != null && Fl(e, !!a, l, !0));
      return;
    case "textarea":
      (C("invalid", e), (u = n = a = null));
      for (c in l)
        if (l.hasOwnProperty(c) && ((s = l[c]), s != null))
          switch (c) {
            case "value":
              a = s;
              break;
            case "defaultValue":
              n = s;
              break;
            case "children":
              u = s;
              break;
            case "dangerouslySetInnerHTML":
              if (s != null) throw Error(x(91));
              break;
            default:
              Z(e, t, c, s, l, null);
          }
      (to(e, a, n, u), ou(e));
      return;
    case "option":
      for (r in l)
        if (l.hasOwnProperty(r) && ((a = l[r]), a != null))
          switch (r) {
            case "selected":
              e.selected = a && typeof a != "function" && typeof a != "symbol";
              break;
            default:
              Z(e, t, r, a, l, null);
          }
      return;
    case "dialog":
      (C("beforetoggle", e), C("toggle", e), C("cancel", e), C("close", e));
      break;
    case "iframe":
    case "object":
      C("load", e);
      break;
    case "video":
    case "audio":
      for (a = 0; a < nn.length; a++) C(nn[a], e);
      break;
    case "image":
      (C("error", e), C("load", e));
      break;
    case "details":
      C("toggle", e);
      break;
    case "embed":
    case "source":
    case "link":
      (C("error", e), C("load", e));
    case "area":
    case "base":
    case "br":
    case "col":
    case "hr":
    case "keygen":
    case "meta":
    case "param":
    case "track":
    case "wbr":
    case "menuitem":
      for (o in l)
        if (l.hasOwnProperty(o) && ((a = l[o]), a != null))
          switch (o) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(x(137, t));
            default:
              Z(e, t, o, a, l, null);
          }
      return;
    default:
      if (Li(t)) {
        for (b in l)
          l.hasOwnProperty(b) &&
            ((a = l[b]), a !== void 0 && Ai(e, t, b, a, l, void 0));
        return;
      }
  }
  for (s in l)
    l.hasOwnProperty(s) && ((a = l[s]), a != null && Z(e, t, s, a, l, null));
}
function Jp(e, t, l, a) {
  switch (t) {
    case "div":
    case "span":
    case "svg":
    case "path":
    case "a":
    case "g":
    case "p":
    case "li":
      break;
    case "input":
      var n = null,
        u = null,
        c = null,
        s = null,
        r = null,
        o = null,
        b = null;
      for (p in l) {
        var y = l[p];
        if (l.hasOwnProperty(p) && y != null)
          switch (p) {
            case "checked":
              break;
            case "value":
              break;
            case "defaultValue":
              r = y;
            default:
              a.hasOwnProperty(p) || Z(e, t, p, null, a, y);
          }
      }
      for (var d in a) {
        var p = a[d];
        if (((y = l[d]), a.hasOwnProperty(d) && (p != null || y != null)))
          switch (d) {
            case "type":
              u = p;
              break;
            case "name":
              n = p;
              break;
            case "checked":
              o = p;
              break;
            case "defaultChecked":
              b = p;
              break;
            case "value":
              c = p;
              break;
            case "defaultValue":
              s = p;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              if (p != null) throw Error(x(137, t));
              break;
            default:
              p !== y && Z(e, t, d, p, a, y);
          }
      }
      $c(e, c, s, r, o, b, u, n);
      return;
    case "select":
      p = c = s = d = null;
      for (u in l)
        if (((r = l[u]), l.hasOwnProperty(u) && r != null))
          switch (u) {
            case "value":
              break;
            case "multiple":
              p = r;
            default:
              a.hasOwnProperty(u) || Z(e, t, u, null, a, r);
          }
      for (n in a)
        if (
          ((u = a[n]),
          (r = l[n]),
          a.hasOwnProperty(n) && (u != null || r != null))
        )
          switch (n) {
            case "value":
              d = u;
              break;
            case "defaultValue":
              s = u;
              break;
            case "multiple":
              c = u;
            default:
              u !== r && Z(e, t, n, u, a, r);
          }
      ((t = s),
        (l = c),
        (a = p),
        d != null
          ? Fl(e, !!l, d, !1)
          : !!a != !!l &&
            (t != null ? Fl(e, !!l, t, !0) : Fl(e, !!l, l ? [] : "", !1)));
      return;
    case "textarea":
      p = d = null;
      for (s in l)
        if (
          ((n = l[s]), l.hasOwnProperty(s) && n != null && !a.hasOwnProperty(s))
        )
          switch (s) {
            case "value":
              break;
            case "children":
              break;
            default:
              Z(e, t, s, null, a, n);
          }
      for (c in a)
        if (
          ((n = a[c]),
          (u = l[c]),
          a.hasOwnProperty(c) && (n != null || u != null))
        )
          switch (c) {
            case "value":
              d = n;
              break;
            case "defaultValue":
              p = n;
              break;
            case "children":
              break;
            case "dangerouslySetInnerHTML":
              if (n != null) throw Error(x(91));
              break;
            default:
              n !== u && Z(e, t, c, n, a, u);
          }
      eo(e, d, p);
      return;
    case "option":
      for (var N in l)
        if (
          ((d = l[N]), l.hasOwnProperty(N) && d != null && !a.hasOwnProperty(N))
        )
          switch (N) {
            case "selected":
              e.selected = !1;
              break;
            default:
              Z(e, t, N, null, a, d);
          }
      for (r in a)
        if (
          ((d = a[r]),
          (p = l[r]),
          a.hasOwnProperty(r) && d !== p && (d != null || p != null))
        )
          switch (r) {
            case "selected":
              e.selected = d && typeof d != "function" && typeof d != "symbol";
              break;
            default:
              Z(e, t, r, d, a, p);
          }
      return;
    case "img":
    case "link":
    case "area":
    case "base":
    case "br":
    case "col":
    case "embed":
    case "hr":
    case "keygen":
    case "meta":
    case "param":
    case "source":
    case "track":
    case "wbr":
    case "menuitem":
      for (var A in l)
        ((d = l[A]),
          l.hasOwnProperty(A) &&
            d != null &&
            !a.hasOwnProperty(A) &&
            Z(e, t, A, null, a, d));
      for (o in a)
        if (
          ((d = a[o]),
          (p = l[o]),
          a.hasOwnProperty(o) && d !== p && (d != null || p != null))
        )
          switch (o) {
            case "children":
            case "dangerouslySetInnerHTML":
              if (d != null) throw Error(x(137, t));
              break;
            default:
              Z(e, t, o, d, a, p);
          }
      return;
    default:
      if (Li(t)) {
        for (var H in l)
          ((d = l[H]),
            l.hasOwnProperty(H) &&
              d !== void 0 &&
              !a.hasOwnProperty(H) &&
              Ai(e, t, H, void 0, a, d));
        for (b in a)
          ((d = a[b]),
            (p = l[b]),
            !a.hasOwnProperty(b) ||
              d === p ||
              (d === void 0 && p === void 0) ||
              Ai(e, t, b, d, a, p));
        return;
      }
  }
  for (var h in l)
    ((d = l[h]),
      l.hasOwnProperty(h) &&
        d != null &&
        !a.hasOwnProperty(h) &&
        Z(e, t, h, null, a, d));
  for (y in a)
    ((d = a[y]),
      (p = l[y]),
      !a.hasOwnProperty(y) ||
        d === p ||
        (d == null && p == null) ||
        Z(e, t, y, d, a, p));
}
var Ti = null,
  Ei = null;
function Ou(e) {
  return e.nodeType === 9 ? e : e.ownerDocument;
}
function Pr(e) {
  switch (e) {
    case "http://www.w3.org/2000/svg":
      return 1;
    case "http://www.w3.org/1998/Math/MathML":
      return 2;
    default:
      return 0;
  }
}
function nh(e, t) {
  if (e === 0)
    switch (t) {
      case "svg":
        return 1;
      case "math":
        return 2;
      default:
        return 0;
    }
  return e === 1 && t === "foreignObject" ? 0 : e;
}
function zi(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    typeof t.children == "bigint" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var Bc = null;
function $p() {
  var e = window.event;
  return e && e.type === "popstate"
    ? e === Bc
      ? !1
      : ((Bc = e), !0)
    : ((Bc = null), !1);
}
var uh = typeof setTimeout == "function" ? setTimeout : void 0,
  Fp = typeof clearTimeout == "function" ? clearTimeout : void 0,
  Ir = typeof Promise == "function" ? Promise : void 0,
  Wp =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof Ir < "u"
        ? function (e) {
            return Ir.resolve(null).then(e).catch(Pp);
          }
        : uh;
function Pp(e) {
  setTimeout(function () {
    throw e;
  });
}
function ll(e) {
  return e === "head";
}
function ef(e, t) {
  var l = t,
    a = 0,
    n = 0;
  do {
    var u = l.nextSibling;
    if ((e.removeChild(l), u && u.nodeType === 8))
      if (((l = u.data), l === "/$")) {
        if (0 < a && 8 > a) {
          l = a;
          var c = e.ownerDocument;
          if ((l & 1 && Fa(c.documentElement), l & 2 && Fa(c.body), l & 4))
            for (l = c.head, Fa(l), c = l.firstChild; c; ) {
              var s = c.nextSibling,
                r = c.nodeName;
              (c[yn] ||
                r === "SCRIPT" ||
                r === "STYLE" ||
                (r === "LINK" && c.rel.toLowerCase() === "stylesheet") ||
                l.removeChild(c),
                (c = s));
            }
        }
        if (n === 0) {
          (e.removeChild(u), on(t));
          return;
        }
        n--;
      } else
        l === "$" || l === "$?" || l === "$!"
          ? n++
          : (a = l.charCodeAt(0) - 48);
    else a = 0;
    l = u;
  } while (l);
  on(t);
}
function wi(e) {
  var t = e.firstChild;
  for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
    var l = t;
    switch (((t = t.nextSibling), l.nodeName)) {
      case "HTML":
      case "HEAD":
      case "BODY":
        (wi(l), Zi(l));
        continue;
      case "SCRIPT":
      case "STYLE":
        continue;
      case "LINK":
        if (l.rel.toLowerCase() === "stylesheet") continue;
    }
    e.removeChild(l);
  }
}
function Ip(e, t, l, a) {
  for (; e.nodeType === 1; ) {
    var n = l;
    if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
      if (!a && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
    } else if (a) {
      if (!e[yn])
        switch (t) {
          case "meta":
            if (!e.hasAttribute("itemprop")) break;
            return e;
          case "link":
            if (
              ((u = e.getAttribute("rel")),
              u === "stylesheet" && e.hasAttribute("data-precedence"))
            )
              break;
            if (
              u !== n.rel ||
              e.getAttribute("href") !==
                (n.href == null || n.href === "" ? null : n.href) ||
              e.getAttribute("crossorigin") !==
                (n.crossOrigin == null ? null : n.crossOrigin) ||
              e.getAttribute("title") !== (n.title == null ? null : n.title)
            )
              break;
            return e;
          case "style":
            if (e.hasAttribute("data-precedence")) break;
            return e;
          case "script":
            if (
              ((u = e.getAttribute("src")),
              (u !== (n.src == null ? null : n.src) ||
                e.getAttribute("type") !== (n.type == null ? null : n.type) ||
                e.getAttribute("crossorigin") !==
                  (n.crossOrigin == null ? null : n.crossOrigin)) &&
                u &&
                e.hasAttribute("async") &&
                !e.hasAttribute("itemprop"))
            )
              break;
            return e;
          default:
            return e;
        }
    } else if (t === "input" && e.type === "hidden") {
      var u = n.name == null ? null : "" + n.name;
      if (n.type === "hidden" && e.getAttribute("name") === u) return e;
    } else return e;
    if (((e = et(e.nextSibling)), e === null)) break;
  }
  return null;
}
function e0(e, t, l) {
  if (t === "") return null;
  for (; e.nodeType !== 3; )
    if (
      ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
        !l) ||
      ((e = et(e.nextSibling)), e === null)
    )
      return null;
  return e;
}
function Mi(e) {
  return (
    e.data === "$!" ||
    (e.data === "$?" && e.ownerDocument.readyState === "complete")
  );
}
function t0(e, t) {
  var l = e.ownerDocument;
  if (e.data !== "$?" || l.readyState === "complete") t();
  else {
    var a = function () {
      (t(), l.removeEventListener("DOMContentLoaded", a));
    };
    (l.addEventListener("DOMContentLoaded", a), (e._reactRetry = a));
  }
}
function et(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (
        ((t = e.data),
        t === "$" || t === "$!" || t === "$?" || t === "F!" || t === "F")
      )
        break;
      if (t === "/$") return null;
    }
  }
  return e;
}
var Oi = null;
function tf(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var l = e.data;
      if (l === "$" || l === "$!" || l === "$?") {
        if (t === 0) return e;
        t--;
      } else l === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
function ch(e, t, l) {
  switch (((t = Ou(l)), e)) {
    case "html":
      if (((e = t.documentElement), !e)) throw Error(x(452));
      return e;
    case "head":
      if (((e = t.head), !e)) throw Error(x(453));
      return e;
    case "body":
      if (((e = t.body), !e)) throw Error(x(454));
      return e;
    default:
      throw Error(x(451));
  }
}
function Fa(e) {
  for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
  Zi(e);
}
var Fe = new Map(),
  lf = new Set();
function Du(e) {
  return typeof e.getRootNode == "function"
    ? e.getRootNode()
    : e.nodeType === 9
      ? e
      : e.ownerDocument;
}
var zt = Q.d;
Q.d = { f: l0, r: a0, D: n0, C: u0, L: c0, m: i0, X: r0, S: s0, M: f0 };
function l0() {
  var e = zt.f(),
    t = Fu();
  return e || t;
}
function a0(e) {
  var t = ba(e);
  t !== null && t.tag === 5 && t.type === "form" ? Io(t) : zt.r(e);
}
var xa = typeof document > "u" ? null : document;
function ih(e, t, l) {
  var a = xa;
  if (a && typeof t == "string" && t) {
    var n = Le(t);
    ((n = 'link[rel="' + e + '"][href="' + n + '"]'),
      typeof l == "string" && (n += '[crossorigin="' + l + '"]'),
      lf.has(n) ||
        (lf.add(n),
        (e = { rel: e, crossOrigin: l, href: t }),
        a.querySelector(n) === null &&
          ((t = a.createElement("link")),
          ve(t, "link", e),
          pe(t),
          a.head.appendChild(t))));
  }
}
function n0(e) {
  (zt.D(e), ih("dns-prefetch", e, null));
}
function u0(e, t) {
  (zt.C(e, t), ih("preconnect", e, t));
}
function c0(e, t, l) {
  zt.L(e, t, l);
  var a = xa;
  if (a && e && t) {
    var n = 'link[rel="preload"][as="' + Le(t) + '"]';
    t === "image" && l && l.imageSrcSet
      ? ((n += '[imagesrcset="' + Le(l.imageSrcSet) + '"]'),
        typeof l.imageSizes == "string" &&
          (n += '[imagesizes="' + Le(l.imageSizes) + '"]'))
      : (n += '[href="' + Le(e) + '"]');
    var u = n;
    switch (t) {
      case "style":
        u = ha(e);
        break;
      case "script":
        u = va(e);
    }
    Fe.has(u) ||
      ((e = F(
        {
          rel: "preload",
          href: t === "image" && l && l.imageSrcSet ? void 0 : e,
          as: t,
        },
        l,
      )),
      Fe.set(u, e),
      a.querySelector(n) !== null ||
        (t === "style" && a.querySelector(En(u))) ||
        (t === "script" && a.querySelector(zn(u))) ||
        ((t = a.createElement("link")),
        ve(t, "link", e),
        pe(t),
        a.head.appendChild(t)));
  }
}
function i0(e, t) {
  zt.m(e, t);
  var l = xa;
  if (l && e) {
    var a = t && typeof t.as == "string" ? t.as : "script",
      n = 'link[rel="modulepreload"][as="' + Le(a) + '"][href="' + Le(e) + '"]',
      u = n;
    switch (a) {
      case "audioworklet":
      case "paintworklet":
      case "serviceworker":
      case "sharedworker":
      case "worker":
      case "script":
        u = va(e);
    }
    if (
      !Fe.has(u) &&
      ((e = F({ rel: "modulepreload", href: e }, t)),
      Fe.set(u, e),
      l.querySelector(n) === null)
    ) {
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          if (l.querySelector(zn(u))) return;
      }
      ((a = l.createElement("link")),
        ve(a, "link", e),
        pe(a),
        l.head.appendChild(a));
    }
  }
}
function s0(e, t, l) {
  zt.S(e, t, l);
  var a = xa;
  if (a && e) {
    var n = $l(a).hoistableStyles,
      u = ha(e);
    t = t || "default";
    var c = n.get(u);
    if (!c) {
      var s = { loading: 0, preload: null };
      if ((c = a.querySelector(En(u)))) s.loading = 5;
      else {
        ((e = F({ rel: "stylesheet", href: e, "data-precedence": t }, l)),
          (l = Fe.get(u)) && zs(e, l));
        var r = (c = a.createElement("link"));
        (pe(r),
          ve(r, "link", e),
          (r._p = new Promise(function (o, b) {
            ((r.onload = o), (r.onerror = b));
          })),
          r.addEventListener("load", function () {
            s.loading |= 1;
          }),
          r.addEventListener("error", function () {
            s.loading |= 2;
          }),
          (s.loading |= 4),
          nu(c, t, a));
      }
      ((c = { type: "stylesheet", instance: c, count: 1, state: s }),
        n.set(u, c));
    }
  }
}
function r0(e, t) {
  zt.X(e, t);
  var l = xa;
  if (l && e) {
    var a = $l(l).hoistableScripts,
      n = va(e),
      u = a.get(n);
    u ||
      ((u = l.querySelector(zn(n))),
      u ||
        ((e = F({ src: e, async: !0 }, t)),
        (t = Fe.get(n)) && ws(e, t),
        (u = l.createElement("script")),
        pe(u),
        ve(u, "link", e),
        l.head.appendChild(u)),
      (u = { type: "script", instance: u, count: 1, state: null }),
      a.set(n, u));
  }
}
function f0(e, t) {
  zt.M(e, t);
  var l = xa;
  if (l && e) {
    var a = $l(l).hoistableScripts,
      n = va(e),
      u = a.get(n);
    u ||
      ((u = l.querySelector(zn(n))),
      u ||
        ((e = F({ src: e, async: !0, type: "module" }, t)),
        (t = Fe.get(n)) && ws(e, t),
        (u = l.createElement("script")),
        pe(u),
        ve(u, "link", e),
        l.head.appendChild(u)),
      (u = { type: "script", instance: u, count: 1, state: null }),
      a.set(n, u));
  }
}
function af(e, t, l, a) {
  var n = (n = Xt.current) ? Du(n) : null;
  if (!n) throw Error(x(446));
  switch (e) {
    case "meta":
    case "title":
      return null;
    case "style":
      return typeof l.precedence == "string" && typeof l.href == "string"
        ? ((t = ha(l.href)),
          (l = $l(n).hoistableStyles),
          (a = l.get(t)),
          a ||
            ((a = { type: "style", instance: null, count: 0, state: null }),
            l.set(t, a)),
          a)
        : { type: "void", instance: null, count: 0, state: null };
    case "link":
      if (
        l.rel === "stylesheet" &&
        typeof l.href == "string" &&
        typeof l.precedence == "string"
      ) {
        e = ha(l.href);
        var u = $l(n).hoistableStyles,
          c = u.get(e);
        if (
          (c ||
            ((n = n.ownerDocument || n),
            (c = {
              type: "stylesheet",
              instance: null,
              count: 0,
              state: { loading: 0, preload: null },
            }),
            u.set(e, c),
            (u = n.querySelector(En(e))) &&
              !u._p &&
              ((c.instance = u), (c.state.loading = 5)),
            Fe.has(e) ||
              ((l = {
                rel: "preload",
                as: "style",
                href: l.href,
                crossOrigin: l.crossOrigin,
                integrity: l.integrity,
                media: l.media,
                hrefLang: l.hrefLang,
                referrerPolicy: l.referrerPolicy,
              }),
              Fe.set(e, l),
              u || o0(n, e, l, c.state))),
          t && a === null)
        )
          throw Error(x(528, ""));
        return c;
      }
      if (t && a !== null) throw Error(x(529, ""));
      return null;
    case "script":
      return (
        (t = l.async),
        (l = l.src),
        typeof l == "string" &&
        t &&
        typeof t != "function" &&
        typeof t != "symbol"
          ? ((t = va(l)),
            (l = $l(n).hoistableScripts),
            (a = l.get(t)),
            a ||
              ((a = { type: "script", instance: null, count: 0, state: null }),
              l.set(t, a)),
            a)
          : { type: "void", instance: null, count: 0, state: null }
      );
    default:
      throw Error(x(444, e));
  }
}
function ha(e) {
  return 'href="' + Le(e) + '"';
}
function En(e) {
  return 'link[rel="stylesheet"][' + e + "]";
}
function sh(e) {
  return F({}, e, { "data-precedence": e.precedence, precedence: null });
}
function o0(e, t, l, a) {
  e.querySelector('link[rel="preload"][as="style"][' + t + "]")
    ? (a.loading = 1)
    : ((t = e.createElement("link")),
      (a.preload = t),
      t.addEventListener("load", function () {
        return (a.loading |= 1);
      }),
      t.addEventListener("error", function () {
        return (a.loading |= 2);
      }),
      ve(t, "link", l),
      pe(t),
      e.head.appendChild(t));
}
function va(e) {
  return '[src="' + Le(e) + '"]';
}
function zn(e) {
  return "script[async]" + e;
}
function nf(e, t, l) {
  if ((t.count++, t.instance === null))
    switch (t.type) {
      case "style":
        var a = e.querySelector('style[data-href~="' + Le(l.href) + '"]');
        if (a) return ((t.instance = a), pe(a), a);
        var n = F({}, l, {
          "data-href": l.href,
          "data-precedence": l.precedence,
          href: null,
          precedence: null,
        });
        return (
          (a = (e.ownerDocument || e).createElement("style")),
          pe(a),
          ve(a, "style", n),
          nu(a, l.precedence, e),
          (t.instance = a)
        );
      case "stylesheet":
        n = ha(l.href);
        var u = e.querySelector(En(n));
        if (u) return ((t.state.loading |= 4), (t.instance = u), pe(u), u);
        ((a = sh(l)),
          (n = Fe.get(n)) && zs(a, n),
          (u = (e.ownerDocument || e).createElement("link")),
          pe(u));
        var c = u;
        return (
          (c._p = new Promise(function (s, r) {
            ((c.onload = s), (c.onerror = r));
          })),
          ve(u, "link", a),
          (t.state.loading |= 4),
          nu(u, l.precedence, e),
          (t.instance = u)
        );
      case "script":
        return (
          (u = va(l.src)),
          (n = e.querySelector(zn(u)))
            ? ((t.instance = n), pe(n), n)
            : ((a = l),
              (n = Fe.get(u)) && ((a = F({}, l)), ws(a, n)),
              (e = e.ownerDocument || e),
              (n = e.createElement("script")),
              pe(n),
              ve(n, "link", a),
              e.head.appendChild(n),
              (t.instance = n))
        );
      case "void":
        return null;
      default:
        throw Error(x(443, t.type));
    }
  else
    t.type === "stylesheet" &&
      !(t.state.loading & 4) &&
      ((a = t.instance), (t.state.loading |= 4), nu(a, l.precedence, e));
  return t.instance;
}
function nu(e, t, l) {
  for (
    var a = l.querySelectorAll(
        'link[rel="stylesheet"][data-precedence],style[data-precedence]',
      ),
      n = a.length ? a[a.length - 1] : null,
      u = n,
      c = 0;
    c < a.length;
    c++
  ) {
    var s = a[c];
    if (s.dataset.precedence === t) u = s;
    else if (u !== n) break;
  }
  u
    ? u.parentNode.insertBefore(e, u.nextSibling)
    : ((t = l.nodeType === 9 ? l.head : l), t.insertBefore(e, t.firstChild));
}
function zs(e, t) {
  (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
    e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
    e.title == null && (e.title = t.title));
}
function ws(e, t) {
  (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
    e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
    e.integrity == null && (e.integrity = t.integrity));
}
var uu = null;
function uf(e, t, l) {
  if (uu === null) {
    var a = new Map(),
      n = (uu = new Map());
    n.set(l, a);
  } else ((n = uu), (a = n.get(l)), a || ((a = new Map()), n.set(l, a)));
  if (a.has(e)) return a;
  for (
    a.set(e, null), l = l.getElementsByTagName(e), n = 0;
    n < l.length;
    n++
  ) {
    var u = l[n];
    if (
      !(
        u[yn] ||
        u[Se] ||
        (e === "link" && u.getAttribute("rel") === "stylesheet")
      ) &&
      u.namespaceURI !== "http://www.w3.org/2000/svg"
    ) {
      var c = u.getAttribute(t) || "";
      c = e + c;
      var s = a.get(c);
      s ? s.push(u) : a.set(c, [u]);
    }
  }
  return a;
}
function cf(e, t, l) {
  ((e = e.ownerDocument || e),
    e.head.insertBefore(
      l,
      t === "title" ? e.querySelector("head > title") : null,
    ));
}
function d0(e, t, l) {
  if (l === 1 || t.itemProp != null) return !1;
  switch (e) {
    case "meta":
    case "title":
      return !0;
    case "style":
      if (
        typeof t.precedence != "string" ||
        typeof t.href != "string" ||
        t.href === ""
      )
        break;
      return !0;
    case "link":
      if (
        typeof t.rel != "string" ||
        typeof t.href != "string" ||
        t.href === "" ||
        t.onLoad ||
        t.onError
      )
        break;
      switch (t.rel) {
        case "stylesheet":
          return (
            (e = t.disabled),
            typeof t.precedence == "string" && e == null
          );
        default:
          return !0;
      }
    case "script":
      if (
        t.async &&
        typeof t.async != "function" &&
        typeof t.async != "symbol" &&
        !t.onLoad &&
        !t.onError &&
        t.src &&
        typeof t.src == "string"
      )
        return !0;
  }
  return !1;
}
function rh(e) {
  return !(e.type === "stylesheet" && !(e.state.loading & 3));
}
var cn = null;
function h0() {}
function m0(e, t, l) {
  if (cn === null) throw Error(x(475));
  var a = cn;
  if (
    t.type === "stylesheet" &&
    (typeof l.media != "string" || matchMedia(l.media).matches !== !1) &&
    !(t.state.loading & 4)
  ) {
    if (t.instance === null) {
      var n = ha(l.href),
        u = e.querySelector(En(n));
      if (u) {
        ((e = u._p),
          e !== null &&
            typeof e == "object" &&
            typeof e.then == "function" &&
            (a.count++, (a = _u.bind(a)), e.then(a, a)),
          (t.state.loading |= 4),
          (t.instance = u),
          pe(u));
        return;
      }
      ((u = e.ownerDocument || e),
        (l = sh(l)),
        (n = Fe.get(n)) && zs(l, n),
        (u = u.createElement("link")),
        pe(u));
      var c = u;
      ((c._p = new Promise(function (s, r) {
        ((c.onload = s), (c.onerror = r));
      })),
        ve(u, "link", l),
        (t.instance = u));
    }
    (a.stylesheets === null && (a.stylesheets = new Map()),
      a.stylesheets.set(t, e),
      (e = t.state.preload) &&
        !(t.state.loading & 3) &&
        (a.count++,
        (t = _u.bind(a)),
        e.addEventListener("load", t),
        e.addEventListener("error", t)));
  }
}
function p0() {
  if (cn === null) throw Error(x(475));
  var e = cn;
  return (
    e.stylesheets && e.count === 0 && Di(e, e.stylesheets),
    0 < e.count
      ? function (t) {
          var l = setTimeout(function () {
            if ((e.stylesheets && Di(e, e.stylesheets), e.unsuspend)) {
              var a = e.unsuspend;
              ((e.unsuspend = null), a());
            }
          }, 6e4);
          return (
            (e.unsuspend = t),
            function () {
              ((e.unsuspend = null), clearTimeout(l));
            }
          );
        }
      : null
  );
}
function _u() {
  if ((this.count--, this.count === 0)) {
    if (this.stylesheets) Di(this, this.stylesheets);
    else if (this.unsuspend) {
      var e = this.unsuspend;
      ((this.unsuspend = null), e());
    }
  }
}
var Ru = null;
function Di(e, t) {
  ((e.stylesheets = null),
    e.unsuspend !== null &&
      (e.count++, (Ru = new Map()), t.forEach(b0, e), (Ru = null), _u.call(e)));
}
function b0(e, t) {
  if (!(t.state.loading & 4)) {
    var l = Ru.get(e);
    if (l) var a = l.get(null);
    else {
      ((l = new Map()), Ru.set(e, l));
      for (
        var n = e.querySelectorAll(
            "link[data-precedence],style[data-precedence]",
          ),
          u = 0;
        u < n.length;
        u++
      ) {
        var c = n[u];
        (c.nodeName === "LINK" || c.getAttribute("media") !== "not all") &&
          (l.set(c.dataset.precedence, c), (a = c));
      }
      a && l.set(null, a);
    }
    ((n = t.instance),
      (c = n.getAttribute("data-precedence")),
      (u = l.get(c) || a),
      u === a && l.set(null, n),
      l.set(c, n),
      this.count++,
      (a = _u.bind(this)),
      n.addEventListener("load", a),
      n.addEventListener("error", a),
      u
        ? u.parentNode.insertBefore(n, u.nextSibling)
        : ((e = e.nodeType === 9 ? e.head : e),
          e.insertBefore(n, e.firstChild)),
      (t.state.loading |= 4));
  }
}
var sn = {
  $$typeof: bt,
  Provider: null,
  Consumer: null,
  _currentValue: rl,
  _currentValue2: rl,
  _threadCount: 0,
};
function y0(e, t, l, a, n, u, c, s) {
  ((this.tag = 1),
    (this.containerInfo = e),
    (this.pingCache = this.current = this.pendingChildren = null),
    (this.timeoutHandle = -1),
    (this.callbackNode =
      this.next =
      this.pendingContext =
      this.context =
      this.cancelPendingCommit =
        null),
    (this.callbackPriority = 0),
    (this.expirationTimes = ic(-1)),
    (this.entangledLanes =
      this.shellSuspendCounter =
      this.errorRecoveryDisabledLanes =
      this.expiredLanes =
      this.warmLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = ic(0)),
    (this.hiddenUpdates = ic(null)),
    (this.identifierPrefix = a),
    (this.onUncaughtError = n),
    (this.onCaughtError = u),
    (this.onRecoverableError = c),
    (this.pooledCache = null),
    (this.pooledCacheLanes = 0),
    (this.formState = s),
    (this.incompleteTransitions = new Map()));
}
function fh(e, t, l, a, n, u, c, s, r, o, b, y) {
  return (
    (e = new y0(e, t, l, c, s, r, o, y)),
    (t = 1),
    u === !0 && (t |= 24),
    (u = Ue(3, null, null, t)),
    (e.current = u),
    (u.stateNode = e),
    (t = as()),
    t.refCount++,
    (e.pooledCache = t),
    t.refCount++,
    (u.memoizedState = { element: a, isDehydrated: l, cache: t }),
    us(u),
    e
  );
}
function oh(e) {
  return e ? ((e = Zl), e) : Zl;
}
function dh(e, t, l, a, n, u) {
  ((n = oh(n)),
    a.context === null ? (a.context = n) : (a.pendingContext = n),
    (a = Kt(t)),
    (a.payload = { element: l }),
    (u = u === void 0 ? null : u),
    u !== null && (a.callback = u),
    (l = Zt(e, a, t)),
    l !== null && (Ge(l, e, t), Qa(l, e, t)));
}
function sf(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var l = e.retryLane;
    e.retryLane = l !== 0 && l < t ? l : t;
  }
}
function Ms(e, t) {
  (sf(e, t), (e = e.alternate) && sf(e, t));
}
function hh(e) {
  if (e.tag === 13) {
    var t = ya(e, 67108864);
    (t !== null && Ge(t, e, 67108864), Ms(e, 67108864));
  }
}
var Cu = !0;
function g0(e, t, l, a) {
  var n = w.T;
  w.T = null;
  var u = Q.p;
  try {
    ((Q.p = 2), Os(e, t, l, a));
  } finally {
    ((Q.p = u), (w.T = n));
  }
}
function x0(e, t, l, a) {
  var n = w.T;
  w.T = null;
  var u = Q.p;
  try {
    ((Q.p = 8), Os(e, t, l, a));
  } finally {
    ((Q.p = u), (w.T = n));
  }
}
function Os(e, t, l, a) {
  if (Cu) {
    var n = _i(a);
    if (n === null) (qc(e, t, a, Uu, l), rf(e, a));
    else if (S0(n, e, t, l, a)) a.stopPropagation();
    else if ((rf(e, a), t & 4 && -1 < v0.indexOf(e))) {
      for (; n !== null; ) {
        var u = ba(n);
        if (u !== null)
          switch (u.tag) {
            case 3:
              if (((u = u.stateNode), u.current.memoizedState.isDehydrated)) {
                var c = nl(u.pendingLanes);
                if (c !== 0) {
                  var s = u;
                  for (s.pendingLanes |= 2, s.entangledLanes |= 2; c; ) {
                    var r = 1 << (31 - qe(c));
                    ((s.entanglements[1] |= r), (c &= ~r));
                  }
                  (ft(u), !(K & 6) && ((Tu = ct() + 500), Tn(0)));
                }
              }
              break;
            case 13:
              ((s = ya(u, 2)), s !== null && Ge(s, u, 2), Fu(), Ms(u, 2));
          }
        if (((u = _i(a)), u === null && qc(e, t, a, Uu, l), u === n)) break;
        n = u;
      }
      n !== null && a.stopPropagation();
    } else qc(e, t, a, null, l);
  }
}
function _i(e) {
  return ((e = Vi(e)), Ds(e));
}
var Uu = null;
function Ds(e) {
  if (((Uu = null), (e = Bl(e)), e !== null)) {
    var t = hn(e);
    if (t === null) e = null;
    else {
      var l = t.tag;
      if (l === 13) {
        if (((e = Hf(t)), e !== null)) return e;
        e = null;
      } else if (l === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated)
          return t.tag === 3 ? t.stateNode.containerInfo : null;
        e = null;
      } else t !== e && (e = null);
    }
  }
  return ((Uu = e), null);
}
function mh(e) {
  switch (e) {
    case "beforetoggle":
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "toggle":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 2;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 8;
    case "message":
      switch (um()) {
        case Yf:
          return 2;
        case Qf:
          return 8;
        case fu:
        case cm:
          return 32;
        case Xf:
          return 268435456;
        default:
          return 32;
      }
    default:
      return 32;
  }
}
var Ri = !1,
  Jt = null,
  $t = null,
  Ft = null,
  rn = new Map(),
  fn = new Map(),
  qt = [],
  v0 =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
      " ",
    );
function rf(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Jt = null;
      break;
    case "dragenter":
    case "dragleave":
      $t = null;
      break;
    case "mouseover":
    case "mouseout":
      Ft = null;
      break;
    case "pointerover":
    case "pointerout":
      rn.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      fn.delete(t.pointerId);
  }
}
function Ma(e, t, l, a, n, u) {
  return e === null || e.nativeEvent !== u
    ? ((e = {
        blockedOn: t,
        domEventName: l,
        eventSystemFlags: a,
        nativeEvent: u,
        targetContainers: [n],
      }),
      t !== null && ((t = ba(t)), t !== null && hh(t)),
      e)
    : ((e.eventSystemFlags |= a),
      (t = e.targetContainers),
      n !== null && t.indexOf(n) === -1 && t.push(n),
      e);
}
function S0(e, t, l, a, n) {
  switch (t) {
    case "focusin":
      return ((Jt = Ma(Jt, e, t, l, a, n)), !0);
    case "dragenter":
      return (($t = Ma($t, e, t, l, a, n)), !0);
    case "mouseover":
      return ((Ft = Ma(Ft, e, t, l, a, n)), !0);
    case "pointerover":
      var u = n.pointerId;
      return (rn.set(u, Ma(rn.get(u) || null, e, t, l, a, n)), !0);
    case "gotpointercapture":
      return (
        (u = n.pointerId),
        fn.set(u, Ma(fn.get(u) || null, e, t, l, a, n)),
        !0
      );
  }
  return !1;
}
function ph(e) {
  var t = Bl(e.target);
  if (t !== null) {
    var l = hn(t);
    if (l !== null) {
      if (((t = l.tag), t === 13)) {
        if (((t = Hf(l)), t !== null)) {
          ((e.blockedOn = t),
            mm(e.priority, function () {
              if (l.tag === 13) {
                var a = Be();
                a = Xi(a);
                var n = ya(l, a);
                (n !== null && Ge(n, l, a), Ms(l, a));
              }
            }));
          return;
        }
      } else if (t === 3 && l.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function cu(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var l = _i(e.nativeEvent);
    if (l === null) {
      l = e.nativeEvent;
      var a = new l.constructor(l.type, l);
      ((Wc = a), l.target.dispatchEvent(a), (Wc = null));
    } else return ((t = ba(l)), t !== null && hh(t), (e.blockedOn = l), !1);
    t.shift();
  }
  return !0;
}
function ff(e, t, l) {
  cu(e) && l.delete(t);
}
function j0() {
  ((Ri = !1),
    Jt !== null && cu(Jt) && (Jt = null),
    $t !== null && cu($t) && ($t = null),
    Ft !== null && cu(Ft) && (Ft = null),
    rn.forEach(ff),
    fn.forEach(ff));
}
function Kn(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    Ri ||
      ((Ri = !0),
      he.unstable_scheduleCallback(he.unstable_NormalPriority, j0)));
}
var Zn = null;
function of(e) {
  Zn !== e &&
    ((Zn = e),
    he.unstable_scheduleCallback(he.unstable_NormalPriority, function () {
      Zn === e && (Zn = null);
      for (var t = 0; t < e.length; t += 3) {
        var l = e[t],
          a = e[t + 1],
          n = e[t + 2];
        if (typeof a != "function") {
          if (Ds(a || l) === null) continue;
          break;
        }
        var u = ba(l);
        u !== null &&
          (e.splice(t, 3),
          (t -= 3),
          hi(u, { pending: !0, data: n, method: l.method, action: a }, a, n));
      }
    }));
}
function on(e) {
  function t(r) {
    return Kn(r, e);
  }
  (Jt !== null && Kn(Jt, e),
    $t !== null && Kn($t, e),
    Ft !== null && Kn(Ft, e),
    rn.forEach(t),
    fn.forEach(t));
  for (var l = 0; l < qt.length; l++) {
    var a = qt[l];
    a.blockedOn === e && (a.blockedOn = null);
  }
  for (; 0 < qt.length && ((l = qt[0]), l.blockedOn === null); )
    (ph(l), l.blockedOn === null && qt.shift());
  if (((l = (e.ownerDocument || e).$$reactFormReplay), l != null))
    for (a = 0; a < l.length; a += 3) {
      var n = l[a],
        u = l[a + 1],
        c = n[Me] || null;
      if (typeof u == "function") c || of(l);
      else if (c) {
        var s = null;
        if (u && u.hasAttribute("formAction")) {
          if (((n = u), (c = u[Me] || null))) s = c.formAction;
          else if (Ds(n) !== null) continue;
        } else s = c.action;
        (typeof s == "function" ? (l[a + 1] = s) : (l.splice(a, 3), (a -= 3)),
          of(l));
      }
    }
}
function _s(e) {
  this._internalRoot = e;
}
ec.prototype.render = _s.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(x(409));
  var l = t.current,
    a = Be();
  dh(l, a, e, t, null, null);
};
ec.prototype.unmount = _s.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    (dh(e.current, 2, null, e, null, null), Fu(), (t[pa] = null));
  }
};
function ec(e) {
  this._internalRoot = e;
}
ec.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = Jf();
    e = { blockedOn: null, target: e, priority: t };
    for (var l = 0; l < qt.length && t !== 0 && t < qt[l].priority; l++);
    (qt.splice(l, 0, e), l === 0 && ph(e));
  }
};
var df = Cf.version;
if (df !== "19.1.0") throw Error(x(527, df, "19.1.0"));
Q.findDOMNode = function (e) {
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(x(188))
      : ((e = Object.keys(e).join(",")), Error(x(268, e)));
  return (
    (e = Ph(t)),
    (e = e !== null ? qf(e) : null),
    (e = e === null ? null : e.stateNode),
    e
  );
};
var N0 = {
  bundleType: 0,
  version: "19.1.0",
  rendererPackageName: "react-dom",
  currentDispatcherRef: w,
  reconcilerVersion: "19.1.0",
};
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Ln = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Ln.isDisabled && Ln.supportsFiber)
    try {
      ((mn = Ln.inject(N0)), (He = Ln));
    } catch {}
}
qu.createRoot = function (e, t) {
  if (!Uf(e)) throw Error(x(299));
  var l = !1,
    a = "",
    n = fd,
    u = od,
    c = dd,
    s = null;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (l = !0),
      t.identifierPrefix !== void 0 && (a = t.identifierPrefix),
      t.onUncaughtError !== void 0 && (n = t.onUncaughtError),
      t.onCaughtError !== void 0 && (u = t.onCaughtError),
      t.onRecoverableError !== void 0 && (c = t.onRecoverableError),
      t.unstable_transitionCallbacks !== void 0 &&
        (s = t.unstable_transitionCallbacks)),
    (t = fh(e, 1, !1, null, null, l, a, n, u, c, s, null)),
    (e[pa] = t.current),
    Es(e),
    new _s(t)
  );
};
qu.hydrateRoot = function (e, t, l) {
  if (!Uf(e)) throw Error(x(299));
  var a = !1,
    n = "",
    u = fd,
    c = od,
    s = dd,
    r = null,
    o = null;
  return (
    l != null &&
      (l.unstable_strictMode === !0 && (a = !0),
      l.identifierPrefix !== void 0 && (n = l.identifierPrefix),
      l.onUncaughtError !== void 0 && (u = l.onUncaughtError),
      l.onCaughtError !== void 0 && (c = l.onCaughtError),
      l.onRecoverableError !== void 0 && (s = l.onRecoverableError),
      l.unstable_transitionCallbacks !== void 0 &&
        (r = l.unstable_transitionCallbacks),
      l.formState !== void 0 && (o = l.formState)),
    (t = fh(e, 1, !0, t, l ?? null, a, n, u, c, s, r, o)),
    (t.context = oh(null)),
    (l = t.current),
    (a = Be()),
    (a = Xi(a)),
    (n = Kt(a)),
    (n.callback = null),
    Zt(l, n, a),
    (l = a),
    (t.current.lanes = l),
    bn(t, l),
    ft(t),
    (e[pa] = t.current),
    Es(e),
    new ec(t)
  );
};
qu.version = "19.1.0";
function bh() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(bh);
    } catch (e) {
      console.error(e);
    }
}
(bh(), (jf.exports = qu));
var k0 = jf.exports;
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const A0 = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  yh = (...e) =>
    e
      .filter((t, l, a) => !!t && t.trim() !== "" && a.indexOf(t) === l)
      .join(" ")
      .trim();
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var T0 = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const E0 = z.forwardRef(
  (
    {
      color: e = "currentColor",
      size: t = 24,
      strokeWidth: l = 2,
      absoluteStrokeWidth: a,
      className: n = "",
      children: u,
      iconNode: c,
      ...s
    },
    r,
  ) =>
    z.createElement(
      "svg",
      {
        ref: r,
        ...T0,
        width: t,
        height: t,
        stroke: e,
        strokeWidth: a ? (Number(l) * 24) / Number(t) : l,
        className: yh("lucide", n),
        ...s,
      },
      [
        ...c.map(([o, b]) => z.createElement(o, b)),
        ...(Array.isArray(u) ? u : [u]),
      ],
    ),
);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ee = (e, t) => {
  const l = z.forwardRef(({ className: a, ...n }, u) =>
    z.createElement(E0, {
      ref: u,
      iconNode: t,
      className: yh(`lucide-${A0(e)}`, a),
      ...n,
    }),
  );
  return ((l.displayName = `${e}`), l);
};
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const wn = ee("ArrowRight", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const z0 = ee("BadgeCheck", [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336",
    },
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const w0 = ee("BadgeIndianRupee", [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336",
    },
  ],
  ["path", { d: "M8 8h8", key: "1bis0t" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "m13 17-5-1h1a4 4 0 0 0 0-8", key: "nu2bwa" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const gh = ee("CalendarCheck", [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  [
    "rect",
    { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" },
  ],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "m9 16 2 2 4-4", key: "19s6y9" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const M0 = ee("CalendarDays", [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  [
    "rect",
    { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" },
  ],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Rs = ee("ChevronRight", [
  ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const dn = ee("CircleCheck", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const O0 = ee("Clock", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const D0 = ee("FileText", [
  [
    "path",
    {
      d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
      key: "1rqfz7",
    },
  ],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const _0 = ee("MapPin", [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z",
    },
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const R0 = ee("MapPinned", [
  [
    "path",
    {
      d: "M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0",
      key: "11u0oz",
    },
  ],
  ["circle", { cx: "12", cy: "8", r: "2", key: "1822b1" }],
  [
    "path",
    {
      d: "M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712",
      key: "q8zwxj",
    },
  ],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const C0 = ee("Menu", [
  ["line", { x1: "4", x2: "20", y1: "12", y2: "12", key: "1e0a9i" }],
  ["line", { x1: "4", x2: "20", y1: "6", y2: "6", key: "1owob3" }],
  ["line", { x1: "4", x2: "20", y1: "18", y2: "18", key: "yk5zj1" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const U0 = ee("PackageCheck", [
  ["path", { d: "m16 16 2 2 4-4", key: "gfu2re" }],
  [
    "path",
    {
      d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
      key: "e7tb2h",
    },
  ],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["line", { x1: "12", x2: "12", y1: "22", y2: "12", key: "a4e8g8" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const H0 = ee("Phone", [
  [
    "path",
    {
      d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
      key: "foiqr5",
    },
  ],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const q0 = ee("Plus", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const B0 = ee("QrCode", [
  ["rect", { width: "5", height: "5", x: "3", y: "3", rx: "1", key: "1tu5fj" }],
  [
    "rect",
    { width: "5", height: "5", x: "16", y: "3", rx: "1", key: "1v8r4q" },
  ],
  [
    "rect",
    { width: "5", height: "5", x: "3", y: "16", rx: "1", key: "1x03jg" },
  ],
  ["path", { d: "M21 16h-3a2 2 0 0 0-2 2v3", key: "177gqh" }],
  ["path", { d: "M21 21v.01", key: "ents32" }],
  ["path", { d: "M12 7v3a2 2 0 0 1-2 2H7", key: "8crl2c" }],
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M12 3h.01", key: "n36tog" }],
  ["path", { d: "M12 16v.01", key: "133mhm" }],
  ["path", { d: "M16 12h1", key: "1slzba" }],
  ["path", { d: "M21 12v.01", key: "1lwtk9" }],
  ["path", { d: "M12 21v-1", key: "1880an" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const xh = ee("Recycle", [
  [
    "path",
    {
      d: "M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5",
      key: "x6z5xu",
    },
  ],
  [
    "path",
    {
      d: "M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12",
      key: "1x4zh5",
    },
  ],
  ["path", { d: "m14 16-3 3 3 3", key: "f6jyew" }],
  ["path", { d: "M8.293 13.596 7.196 9.5 3.1 10.598", key: "wf1obh" }],
  [
    "path",
    {
      d: "m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843",
      key: "9tzpgr",
    },
  ],
  ["path", { d: "m13.378 9.633 4.096 1.098 1.097-4.096", key: "1oe83g" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const G0 = ee("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const vh = ee("ShieldCheck", [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y",
    },
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Mn = ee("Smartphone", [
  [
    "rect",
    {
      width: "14",
      height: "20",
      x: "5",
      y: "2",
      rx: "2",
      ry: "2",
      key: "1yt0o3",
    },
  ],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const tc = ee("Truck", [
  [
    "path",
    {
      d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2",
      key: "wrbu53",
    },
  ],
  ["path", { d: "M15 18H9", key: "1lyqi6" }],
  [
    "path",
    {
      d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
      key: "lysw3i",
    },
  ],
  ["circle", { cx: "17", cy: "18", r: "2", key: "332jqn" }],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Y0 = ee("WalletCards", [
  [
    "rect",
    { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" },
  ],
  ["path", { d: "M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2", key: "4125el" }],
  [
    "path",
    {
      d: "M3 11h3c.8 0 1.6.3 2.1.9l1.1.9c1.6 1.6 4.1 1.6 5.7 0l1.1-.9c.5-.5 1.3-.9 2.1-.9H21",
      key: "1dpki6",
    },
  ],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Q0 = ee("Wallet", [
  [
    "path",
    {
      d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
      key: "18etb6",
    },
  ],
  ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4", key: "xoc0q4" }],
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const X0 = ee("X", [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
  ]),
  B = {
    domain: "https://www.kabadfactory.com",
    apiBaseUrl: "https://api.kabadfactory.com/api",
    phone: "+91 8319060820",
    phonePlain: "918319060820",
    email: "contact@kabadfactory.com",
    address: "Thatipur, Gwalior, Madhya Pradesh, India",
    city: "Gwalior",
    region: "Madhya Pradesh",
    hours: "Mon-Sat: 9:00 AM - 8:00 PM",
    appDownloadUrl:
      "https://play.google.com/store/apps/details?id=com.kabadfactory.app",
    assets: {
      heroBanner: "/assets/kabad-hero-banner.png",
      appMockup: "/assets/kabad-app-mockup.png",
      logo: "/assets/kabad-factory-logo.png",
    },
  };
async function St(e, t = {}) {
  const l = new Headers(t.headers);
  (l.set("Content-Type", "application/json"),
    t.token && l.set("Authorization", `Bearer ${t.token}`));
  const a = await fetch(`${B.apiBaseUrl}${e}`, { ...t, headers: l }),
    u = (a.headers.get("content-type") || "").includes("application/json")
      ? await a.json()
      : await a.text();
  if (!a.ok) {
    const c =
      typeof u == "object" && u && "message" in u
        ? String(u.message)
        : "Something went wrong. Please try again.";
    throw new Error(c);
  }
  return u;
}
const Sh = z.createContext({
  session: null,
  loading: !0,
  setSession: () => {},
  logout: () => {},
});
function K0({ children: e }) {
  const [t, l] = z.useState(null),
    [a, n] = z.useState(!0);
  z.useEffect(() => {
    const s = localStorage.getItem("kabadFactorySession");
    if (!s) {
      n(!1);
      return;
    }
    const r = JSON.parse(s);
    St("/auth/me", { token: r.token })
      .then((o) => l({ ...r, user: o.user }))
      .catch(() => localStorage.removeItem("kabadFactorySession"))
      .finally(() => n(!1));
  }, []);
  function u(s) {
    (l(s),
      s
        ? localStorage.setItem("kabadFactorySession", JSON.stringify(s))
        : localStorage.removeItem("kabadFactorySession"));
  }
  const c = z.useMemo(
    () => ({ session: t, loading: a, setSession: u, logout: () => u(null) }),
    [a, t],
  );
  return i.jsx(Sh.Provider, { value: c, children: e });
}
function lc() {
  return z.useContext(Sh);
}
const hf = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/scrap-rates", label: "Scrap Rates" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/contact", label: "Contact" },
  ],
  Z0 = [
    {
      icon: _0,
      title: "Check Your PIN",
      body: "Confirm pickup availability for your area before scheduling.",
    },
    {
      icon: xh,
      title: "Select Your Scrap",
      body: "Choose paper, metal, plastic, appliances, or e-waste.",
    },
    {
      icon: gh,
      title: "Schedule Pickup",
      body: "Pick your saved address, date, and convenient time slot.",
    },
    {
      icon: U0,
      title: "Weigh & Verify",
      body: "Scrap is checked and weighed during pickup.",
    },
    {
      icon: Q0,
      title: "Get Paid",
      body: "Final amount is calculated after verified pickup details.",
    },
  ],
  jh = [
    [
      "iron",
      "Iron",
      "Sell Iron Scrap in Gwalior",
      "iron rods, grills, mixed loha, machinery parts, and household metal scrap",
    ],
    [
      "copper",
      "Copper",
      "Sell Copper Scrap in Gwalior",
      "copper wire, pipes, motors, coils, and clean copper material",
    ],
    [
      "aluminium",
      "Aluminium",
      "Sell Aluminium Scrap in Gwalior",
      "aluminium utensils, profiles, sections, frames, and sheets",
    ],
    [
      "newspaper",
      "Newspaper",
      "Sell Newspaper Scrap in Gwalior",
      "old newspapers, raddi paper, magazines, and paper bundles",
    ],
    [
      "cardboard",
      "Cardboard",
      "Sell Cardboard Scrap in Gwalior",
      "cartons, packaging boxes, brown cardboard, and clean dry paperboard",
    ],
    [
      "plastic",
      "Plastic",
      "Sell Plastic Scrap in Gwalior",
      "plastic bottles, containers, mixed plastic, and reusable household plastic",
    ],
    [
      "e-waste",
      "E-Waste",
      "Sell E-Waste in Gwalior",
      "laptops, CPUs, wires, phones, batteries, and electronic scrap",
    ],
    [
      "ac",
      "AC",
      "Sell AC Scrap in Gwalior",
      "window AC, split AC, copper coils, compressors, and AC bodies",
    ],
    [
      "refrigerator",
      "Refrigerator",
      "Sell Refrigerator Scrap in Gwalior",
      "single-door fridges, double-door fridges, compressors, and appliance scrap",
    ],
  ],
  L0 = [
    [
      "doorstep-scrap-pickup",
      "Doorstep Scrap Pickup",
      "Doorstep Scrap Pickup in Gwalior",
      "Schedule pickup from home and let a verified executive collect recyclable scrap from your address.",
    ],
    [
      "household-scrap-pickup",
      "Household Scrap Pickup",
      "Household Scrap Pickup in Gwalior",
      "Clear common home scrap with a simple online booking and verified doorstep collection.",
    ],
    [
      "bulk-scrap-pickup",
      "Bulk Scrap Pickup",
      "Bulk Scrap Pickup in Gwalior",
      "Plan large scrap pickups for homes, societies, shops, schools, and local businesses.",
    ],
    [
      "office-scrap-pickup",
      "Office Scrap Pickup",
      "Office Scrap Pickup in Gwalior",
      "Dispose of paper, e-waste, packaging, and office junk with a documented pickup flow.",
    ],
    [
      "commercial-scrap-pickup",
      "Commercial Scrap Pickup",
      "Commercial Scrap Pickup in Gwalior",
      "Coordinate recurring or one-time commercial scrap collection with transparent rates and billing.",
    ],
    [
      "e-waste-pickup",
      "E-Waste Pickup",
      "E-Waste Pickup in Gwalior",
      "Schedule responsible pickup for wires, small electronics, computers, and other accepted e-waste.",
    ],
  ],
  il = [
    {
      question: "How do I sell scrap online in Gwalior?",
      answer:
        "Check your PIN code, select scrap items, choose a pickup date and time, then schedule the request. Kabad Factory confirms the pickup and an executive visits your address.",
    },
    {
      question: "Are scrap rates fixed?",
      answer:
        "Rates are managed from the Kabad Factory backend and may change with market conditions, scrap quality, and quantity. The website reads current rates from the same database used by the app.",
    },
    {
      question: "How is pickup charge calculated?",
      answer:
        "The backend checks the customer's pickup PIN code against active store PIN codes, applies the configured distance slabs and the 5 km buffer rule, then stores the charge snapshot on the order.",
    },
    {
      question: "When do I receive payment?",
      answer:
        "After the executive weighs and confirms collected scrap, the final payable amount is calculated and payment is completed according to the order workflow.",
    },
  ],
  kl = [
    {
      path: "/",
      label: "Home",
      kind: "home",
      seo: {
        title:
          "Sell Scrap Online in Gwalior | Doorstep Scrap Pickup | Kabad Factory",
        description:
          "Sell scrap online in Gwalior with Kabad Factory. Check pickup availability, view today's scrap rates, schedule doorstep scrap pickup, and track orders online.",
        canonical: "/",
      },
      h1: "Sell Scrap Online in Gwalior",
      faqs: il,
    },
    {
      path: "/about",
      label: "About",
      kind: "content",
      seo: {
        title:
          "About Kabad Factory | Online Scrap Pickup & Recycling in Gwalior",
        description:
          "Learn how Kabad Factory makes online scrap pickup and recycling in Gwalior simple with doorstep pickup, transparent scrap rates, saved addresses, and app-based order tracking.",
        canonical: "/about",
      },
      h1: "About Kabad Factory",
      intro:
        "A cleaner, simpler way for Gwalior homes and businesses to sell recyclables from the doorstep.",
      sections: [
        {
          title: "Effortless Doorstep Pickup",
          body: "Schedule pickup from your home without carrying paper, metal, plastic, electronics, or household scrap to a local dealer.",
        },
        {
          title: "Transparent Scrap Rates",
          body: "View current prices and understand how your scrap value is calculated before the executive confirms final weight.",
        },
        {
          title: "Digital Convenience",
          body: "Manage pickups, saved addresses, order history, and account details through the website or Kabad Factory mobile app.",
        },
        {
          title: "Responsible Recycling",
          body: "Help keep recyclable material out of waste streams and put useful scrap back into productive circulation.",
        },
      ],
    },
    {
      path: "/pickup-services",
      label: "Pickup Services",
      kind: "servicesIndex",
      seo: {
        title:
          "Pickup Services in Gwalior | Doorstep Scrap Pickup | Kabad Factory",
        description:
          "Explore Kabad Factory pickup services for household scrap, bulk scrap, office scrap, commercial scrap, e-waste and serviceable PIN areas in Gwalior.",
        canonical: "/pickup-services",
      },
      h1: "Pickup Services",
      intro:
        "Understand what Kabad Factory collects, where pickup is currently available, and how to check serviceability before booking.",
      faqs: il,
    },
    {
      path: "/contact",
      label: "Contact",
      kind: "content",
      seo: {
        title: "Contact Kabad Factory Gwalior | Scrap Pickup Support",
        description:
          "Contact Kabad Factory for doorstep scrap pickup, bulk scrap collection, rates, orders, and customer support in Gwalior.",
        canonical: "/contact",
      },
      h1: "Contact Kabad Factory",
      intro: `${B.phone} | ${B.email} | ${B.address}`,
      sections: [
        {
          title: "Call or WhatsApp",
          body: `For pickup help, call ${B.phone} or use WhatsApp support during business hours.`,
        },
        {
          title: "Service Area",
          body: "Kabad Factory currently focuses on Gwalior and nearby serviceable PIN codes configured in the backend.",
        },
      ],
    },
    {
      path: "/how-it-works",
      label: "How It Works",
      kind: "content",
      seo: {
        title: "How Scrap Pickup Works | Kabad Factory Gwalior",
        description:
          "See how to check your PIN code, select scrap items, choose a pickup slot, and receive transparent payment with Kabad Factory.",
        canonical: "/how-it-works",
      },
      h1: "How Doorstep Scrap Pickup Works",
      sections: [
        {
          title: "1. Check Pickup Availability",
          body: "Enter your PIN code so the backend can verify serviceability and pickup charge using configured stores and charge slabs.",
        },
        {
          title: "2. Select Scrap Items",
          body: "Choose paper, metal, plastic, appliance, or e-waste categories and add an estimated weight.",
        },
        {
          title: "3. Schedule a Slot",
          body: "Login or register, select address, date and time, then create the pickup request.",
        },
        {
          title: "4. Weigh, Pay, and Bill",
          body: "The executive records actual weights, final payable amount, payment status, and bill details.",
        },
      ],
    },
    {
      path: "/scrap-rates",
      label: "Scrap Rates",
      kind: "rates",
      seo: {
        title: "Today's Scrap Rates in Gwalior | Kabad Factory",
        description:
          "Check current scrap rates in Gwalior for newspaper, iron, copper, aluminium, plastic, cardboard, e-waste, AC and more.",
        canonical: "/scrap-rates",
      },
      h1: "Today's Scrap Rates in Gwalior",
      faqs: il,
    },
    {
      path: "/schedule-pickup",
      label: "Schedule Pickup",
      kind: "schedule",
      seo: {
        title: "Schedule Scrap Pickup Online in Gwalior | Kabad Factory",
        description:
          "Book a doorstep scrap pickup online with Kabad Factory using the same secure backend as the mobile app.",
        canonical: "/schedule-pickup",
      },
      h1: "Schedule Scrap Pickup",
    },
    {
      path: "/gwalior",
      label: "Gwalior",
      kind: "city",
      seo: {
        title:
          "Online Kabadiwala in Gwalior | Sell Kabad Online | Kabad Factory",
        description:
          "Kabad Factory helps Gwalior customers sell scrap online, check rates, verify PIN serviceability, and book doorstep pickup.",
        canonical: "/gwalior",
      },
      h1: "Online Kabadiwala in Gwalior",
      intro:
        "A local-first page for customers searching kabadiwala near me, raddi wala near me, or doorstep scrap pickup in Gwalior.",
      faqs: il,
    },
    {
      path: "/gwalior/scrap-rates",
      label: "Gwalior Scrap Rates",
      kind: "rates",
      seo: {
        title: "Scrap Rates Gwalior | Live Kabad Rates | Kabad Factory",
        description:
          "View current Gwalior scrap rates from the Kabad Factory backend and schedule a pickup from serviceable PIN codes.",
        canonical: "/gwalior/scrap-rates",
      },
      h1: "Scrap Rates Gwalior",
    },
    {
      path: "/blog",
      label: "Blog",
      kind: "blog",
      seo: {
        title: "Scrap Selling Guides | Kabad Factory Blog",
        description:
          "Helpful guides about selling scrap, preparing recyclable material, checking rates, and booking pickup in Gwalior.",
        canonical: "/blog",
      },
      h1: "Scrap Selling Guides",
    },
    {
      path: "/faq",
      label: "FAQ",
      kind: "faq",
      seo: {
        title: "Kabad Factory FAQ | Scrap Pickup Questions",
        description:
          "Answers about Kabad Factory scrap pickup, rates, pickup charges, orders, payment, and support.",
        canonical: "/faq",
      },
      h1: "Frequently Asked Questions",
      faqs: il,
    },
    {
      path: "/login",
      label: "Login",
      kind: "auth",
      noSitemap: !0,
      seo: {
        title: "Login | Kabad Factory",
        description: "Login to your Kabad Factory account.",
        canonical: "/login",
        noindex: !0,
      },
    },
    {
      path: "/register",
      label: "Register",
      kind: "auth",
      noSitemap: !0,
      seo: {
        title: "Register | Kabad Factory",
        description: "Create a Kabad Factory account.",
        canonical: "/register",
        noindex: !0,
      },
    },
    {
      path: "/account",
      label: "Account",
      kind: "account",
      noSitemap: !0,
      seo: {
        title: "Account | Kabad Factory",
        description: "Manage your Kabad Factory account.",
        canonical: "/account",
        noindex: !0,
      },
    },
    {
      path: "/orders",
      label: "Orders",
      kind: "account",
      noSitemap: !0,
      seo: {
        title: "Orders | Kabad Factory",
        description: "View your Kabad Factory pickup orders.",
        canonical: "/orders",
        noindex: !0,
      },
    },
    {
      path: "/privacy-policy",
      label: "Privacy Policy",
      kind: "legal",
      seo: {
        title: "Privacy Policy | Kabad Factory",
        description:
          "Read Kabad Factory privacy practices for customer data, pickup orders, support requests, and account information.",
        canonical: "/privacy-policy",
      },
      h1: "Privacy Policy",
    },
    {
      path: "/terms",
      label: "Terms",
      kind: "legal",
      seo: {
        title: "Terms and Conditions | Kabad Factory",
        description:
          "Read Kabad Factory service terms for scrap pickup, rates, payment, pickup charges, and account usage.",
        canonical: "/terms",
      },
      h1: "Terms and Conditions",
    },
  ];
jh.forEach(([e, t, l, a]) => {
  kl.push({
    path: `/sell-scrap/${e}`,
    label: t,
    kind: "scrap",
    category: t,
    seo: {
      title: `${l} | Today's Rates & Doorstep Pickup | Kabad Factory`,
      description: `${l} with Kabad Factory. Check current ${t.toLowerCase()} scrap rate, pickup availability, charges, accepted material and online scheduling.`,
      canonical: `/sell-scrap/${e}`,
    },
    h1: l,
    intro: `Book doorstep pickup for ${a} in Gwalior with current database-backed rates.`,
    sections: [
      { title: `What ${t} Scrap We Accept`, body: a },
      {
        title: "How Pricing Works",
        body: "Current rates come from the Kabad Factory backend. Final payment uses executive-confirmed actual weight and saved rate snapshots.",
      },
      {
        title: "Pickup Charges",
        body: "Pickup charge is calculated by the backend from your pickup PIN code and nearest active store, including the 5 km buffer rule.",
      },
    ],
    faqs: il,
  });
});
L0.forEach(([e, t, l, a]) => {
  kl.push({
    path: `/services/${e}`,
    label: t,
    kind: "service",
    seo: {
      title: `${l} | Kabad Factory`,
      description: `${a} Check PIN availability, rates, and schedule online with Kabad Factory.`,
      canonical: `/services/${e}`,
    },
    h1: l,
    intro: a,
    sections: [
      {
        title: "Who It Is For",
        body: "Homes, shops, offices, societies, and businesses that want organized pickup and transparent settlement.",
      },
      {
        title: "What You Can Track",
        body: "Pickup status, selected items, pickup charge, final payable amount, and downloadable bill after completion.",
      },
      {
        title: "Start Online",
        body: "Use the PIN checker and schedule form to create a pickup request directly on the website.",
      },
    ],
    faqs: il,
  });
});
kl.filter((e) => !e.noSitemap && e.kind !== "notFound");
const V0 = [
  {
    href: "/pickup-services",
    title: "Doorstep Pickup",
    body: "Household, office and bulk collection",
    icon: tc,
  },
  {
    href: "/scrap-rates",
    title: "Transparent Rates",
    body: "Check latest scrap prices",
    icon: w0,
  },
  {
    href: "/schedule-pickup",
    title: "Easy Scheduling",
    body: "Book a date and time online",
    icon: gh,
  },
  {
    href: "/orders",
    title: "Order Tracking",
    body: "Track pickup status and charges",
    icon: D0,
  },
];
function J0(e = "/") {
  return `${B.domain}${e === "/" ? "" : e}`;
}
const mf = {
    fullName: "",
    mobile: "",
    label: "home",
    line1: "",
    line2: "",
    landmark: "",
    city: B.city,
    state: B.region,
    pincode: "",
    isDefault: !0,
  },
  $0 = ["0-10 kg", "10-30 kg", "30-50 kg", "50-200 kg", "More than 200 kg"],
  F0 = [
    "9:00 AM - 11:00 AM",
    "11:00 AM - 2:00 PM",
    "2:00 PM - 5:00 PM",
    "5:00 PM - 8:00 PM",
  ];
function W0({ initialPath: e }) {
  const [t, l] = z.useState(e || bf());
  z.useEffect(() => {
    if (typeof window > "u") return;
    const c = () => l(bf());
    return (
      window.addEventListener("popstate", c),
      () => window.removeEventListener("popstate", c)
    );
  }, []);
  function a(c) {
    (typeof window < "u" &&
      (window.history.pushState({}, "", c),
      window.scrollTo({ top: 0, behavior: "smooth" })),
      l(c));
  }
  const n = Th(t),
    u = kl.find((c) => c.path === n) || Ub;
  return i.jsx(K0, {
    children: i.jsx(P0, {
      route: u,
      navigate: a,
      children: i.jsx(I0, { route: u, navigate: a, currentPath: t }),
    }),
  });
}
function P0({ route: e, navigate: t, children: l }) {
  const [a, n] = z.useState(!1),
    { session: u, logout: c } = lc();
  return i.jsxs("div", {
    children: [
      i.jsx("a", {
        className:
          "sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2",
        href: "#main",
        children: "Skip to content",
      }),
      i.jsxs("header", {
        className:
          "sticky top-0 z-40 border-b border-line bg-white/[0.92] backdrop-blur-xl",
        children: [
          i.jsxs("div", {
            className:
              "container-page flex min-h-[76px] items-center justify-between gap-5",
            children: [
              i.jsxs("a", {
                href: "/",
                onClick: (s) => Dt(s, "/", t),
                className: "flex items-center gap-3",
                children: [
                  i.jsx("span", {
                    className:
                      "flex h-14 w-40 items-center justify-center xl:w-44",
                    children: i.jsx("img", {
                      src: B.assets.logo,
                      alt: "Kabad Factory",
                      className: "h-full w-full object-contain",
                    }),
                  }),
                  i.jsxs("span", {
                    className: "sr-only",
                    children: [
                      i.jsx("strong", {
                        className: "block text-lg leading-5 text-ink",
                        children: "Kabad Factory",
                      }),
                      i.jsx("span", {
                        className:
                          "text-xs font-semibold uppercase tracking-wide text-brand-700",
                        children: "Innovators of Recycling",
                      }),
                    ],
                  }),
                ],
              }),
              i.jsx("nav", {
                className:
                  "hidden items-center gap-5 text-[0.92rem] font-bold text-muted xl:flex",
                children: hf.map((s) =>
                  i.jsx(
                    "a",
                    {
                      href: s.href,
                      onClick: (r) => Dt(r, s.href, t),
                      className: `nav-link hover:text-ink ${e.path === s.href ? "text-ink" : ""}`,
                      children: s.label,
                    },
                    s.href,
                  ),
                ),
              }),
              i.jsxs("div", {
                className: "hidden items-center gap-2 lg:flex",
                children: [
                  i.jsxs("a", {
                    href: B.appDownloadUrl,
                    className:
                      "inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 text-sm font-extrabold text-brand-700 hover:border-brand-200 hover:bg-brand-50",
                    children: [
                      i.jsx(Mn, { size: 16 }),
                      " ",
                      i.jsx("span", {
                        className: "hidden 2xl:inline",
                        children: "Get the App",
                      }),
                      i.jsx("span", {
                        className: "2xl:hidden",
                        children: "App",
                      }),
                    ],
                  }),
                  u
                    ? i.jsxs(i.Fragment, {
                        children: [
                          i.jsx("a", {
                            href: "/account",
                            onClick: (s) => Dt(s, "/account", t),
                            className:
                              "rounded-full border border-line bg-white px-4 py-2 text-sm font-extrabold text-ink hover:border-brand-200 hover:bg-brand-50",
                            children: "Account",
                          }),
                          i.jsx("button", {
                            onClick: c,
                            className:
                              "rounded-full px-3 py-2 text-sm font-extrabold text-muted hover:text-ink",
                            children: "Logout",
                          }),
                        ],
                      })
                    : i.jsx(i.Fragment, {
                        children: i.jsx("a", {
                          href: "/login",
                          onClick: (s) => Dt(s, "/login", t),
                          className:
                            "rounded-full px-3 py-2 text-sm font-extrabold text-muted hover:text-ink",
                          children: "Login",
                        }),
                      }),
                  i.jsx("a", {
                    href: "/schedule-pickup",
                    onClick: (s) => Dt(s, "/schedule-pickup", t),
                    className:
                      "rounded-full bg-brand-600 px-5 py-2.5 text-sm font-extrabold text-white shadow-soft hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-lift",
                    children: "Schedule Pickup",
                  }),
                ],
              }),
              i.jsx("button", {
                className:
                  "rounded-xl border border-line bg-white p-2 text-ink lg:hidden",
                onClick: () => n(!0),
                "aria-label": "Open menu",
                children: i.jsx(C0, {}),
              }),
            ],
          }),
          a &&
            i.jsx("div", {
              className:
                "fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm lg:hidden",
              children: i.jsxs("div", {
                className:
                  "ml-auto flex h-full w-80 max-w-[88vw] flex-col gap-2 bg-white p-5 shadow-lift",
                children: [
                  i.jsxs("div", {
                    className: "mb-3 flex items-center justify-between",
                    children: [
                      i.jsx("img", {
                        src: B.assets.logo,
                        alt: "Kabad Factory",
                        className: "h-12 w-36 object-contain",
                      }),
                      i.jsx("button", {
                        className: "rounded-xl border border-line p-2 text-ink",
                        onClick: () => n(!1),
                        "aria-label": "Close menu",
                        children: i.jsx(X0, {}),
                      }),
                    ],
                  }),
                  [
                    ...hf,
                    { href: B.appDownloadUrl, label: "Get the App" },
                    {
                      href: u ? "/account" : "/login",
                      label: u ? "Account" : "Login",
                    },
                  ].map((s) =>
                    i.jsx(
                      "a",
                      {
                        href: s.href,
                        onClick: (r) => {
                          (Dt(r, s.href, t), n(!1));
                        },
                        className:
                          "rounded-xl px-3 py-3 font-extrabold text-ink hover:bg-brand-50",
                        children: s.label,
                      },
                      s.href,
                    ),
                  ),
                  i.jsx("a", {
                    href: "/schedule-pickup",
                    onClick: (s) => {
                      (Dt(s, "/schedule-pickup", t), n(!1));
                    },
                    className:
                      "mt-3 rounded-full bg-brand-600 px-5 py-3 text-center font-extrabold text-white shadow-soft",
                    children: "Schedule Pickup",
                  }),
                ],
              }),
            }),
        ],
      }),
      i.jsx("main", { id: "main", children: l }),
      i.jsx(Sb, { navigate: t, current: e.path }),
    ],
  });
}
function I0({ route: e, navigate: t, currentPath: l }) {
  return e.kind === "home"
    ? i.jsx(eb, { navigate: t })
    : e.kind === "rates"
      ? i.jsx(lb, { route: e, navigate: t })
      : e.kind === "schedule"
        ? i.jsx(ab, { navigate: t })
        : e.kind === "auth"
          ? i.jsx(nb, {
              mode: e.path === "/register" ? "register" : "login",
              navigate: t,
              currentPath: l,
            })
          : e.kind === "account"
            ? i.jsx(ub, { route: e, navigate: t })
            : e.kind === "scrap"
              ? i.jsx(cb, { route: e, navigate: t })
              : e.kind === "servicesIndex"
                ? i.jsx(sb, { route: e, navigate: t })
                : e.kind === "service"
                  ? i.jsx(pf, { route: e, navigate: t })
                  : e.kind === "city"
                    ? i.jsx(rb, { route: e, navigate: t })
                    : e.kind === "blog"
                      ? i.jsx(fb, { navigate: t })
                      : e.kind === "faq"
                        ? i.jsx(ob, { route: e })
                        : e.kind === "legal"
                          ? i.jsx(db, { route: e })
                          : e.kind === "content"
                            ? i.jsx(pf, { route: e, navigate: t })
                            : i.jsx(jb, { navigate: t });
}
function eb({ navigate: e }) {
  return i.jsxs(i.Fragment, {
    children: [
      i.jsxs("section", {
        className: "relative isolate overflow-hidden bg-ink text-white",
        children: [
          i.jsx("picture", {
            children: i.jsx("img", {
              src: B.assets.heroBanner,
              alt: "",
              className: "absolute inset-0 -z-20 h-full w-full object-cover",
              loading: "eager",
              fetchPriority: "high",
            }),
          }),
          i.jsx("div", {
            className:
              "absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/86 to-ink/36",
          }),
          i.jsx("div", {
            className:
              "absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink to-transparent",
          }),
          i.jsxs("div", {
            className:
              "container-page grid min-h-[690px] items-center gap-10 py-16 lg:grid-cols-[1.02fr_0.86fr]",
            children: [
              i.jsxs("div", {
                className: "reveal-up",
                children: [
                  i.jsxs("span", {
                    className:
                      "inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-extrabold text-brand-100 backdrop-blur",
                    children: [
                      i.jsx(Cb, {}),
                      " Doorstep scrap pickup in Gwalior",
                    ],
                  }),
                  i.jsx("h1", {
                    className:
                      "mt-6 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl",
                    children:
                      "Sell Your Scrap the Smarter Way with Kabad Factory",
                  }),
                  i.jsx("p", {
                    className:
                      "mt-5 max-w-2xl text-xl font-extrabold leading-8 text-brand-100",
                    children:
                      "Kabad hai? Raddi hai? Fenkna nahi — Kabad Factory ko bechna hai!",
                  }),
                  i.jsx("p", {
                    className: "mt-4 max-w-2xl text-lg leading-8 text-white/84",
                    children:
                      "Check the latest scrap rates, schedule doorstep pickup and manage your pickups easily — all from one convenient platform.",
                  }),
                  i.jsxs("div", {
                    className: "mt-8 flex flex-col gap-3 sm:flex-row",
                    children: [
                      i.jsx("a", {
                        href: "#pin-checker",
                        className:
                          "focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white px-6 py-3 font-black text-brand-700",
                        children: "Check Pickup Availability",
                      }),
                      i.jsxs("button", {
                        onClick: () => e("/schedule-pickup"),
                        className:
                          "focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3 font-black text-white shadow-soft hover:-translate-y-0.5 hover:bg-brand-700",
                        children: ["Schedule Pickup ", i.jsx(wn, { size: 18 })],
                      }),
                      i.jsx("a", {
                        href: B.appDownloadUrl,
                        className:
                          "focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-3 font-black text-white backdrop-blur",
                        children: "Get the App",
                      }),
                    ],
                  }),
                  i.jsx("div", {
                    className:
                      "mt-9 grid max-w-2xl grid-cols-3 gap-3 text-sm text-white/74",
                    children: [
                      "Transparent rates",
                      "Digital weighing",
                      "Order tracking",
                    ].map((t) =>
                      i.jsx(
                        "span",
                        {
                          className:
                            "rounded-full border border-white/15 bg-white/10 px-3 py-2 text-center font-bold backdrop-blur",
                          children: t,
                        },
                        t,
                      ),
                    ),
                  }),
                ],
              }),
              i.jsx("div", {
                className:
                  "glass-panel reveal-up reveal-delay rounded-card border border-white/20 p-5 text-ink shadow-lift sm:p-7 lg:justify-self-end",
                children: i.jsx(Nh, {
                  onSchedule: () => e("/schedule-pickup"),
                }),
              }),
            ],
          }),
        ],
      }),
      i.jsx(tb, { navigate: e }),
      i.jsx(Cs, { navigate: e }),
      i.jsx(pb, { navigate: e }),
      i.jsx(hb, {}),
      i.jsx(bb, { navigate: e }),
      i.jsx(mb, {}),
      i.jsx(Us, { navigate: e }),
      i.jsx(yb, { navigate: e }),
      i.jsx(gb, { navigate: e }),
      i.jsx(On, {}),
      i.jsx(xb, { navigate: e }),
    ],
  });
}
function Nh({ onSchedule: e }) {
  var b, y;
  const [t, l] = z.useState(""),
    [a, n] = z.useState(!1),
    [u, c] = z.useState(null),
    [s, r] = z.useState("");
  async function o() {
    const d = t.replace(/\D/g, "").slice(0, 6);
    if ((l(d), !/^\d{6}$/.test(d))) {
      (r("Enter a valid 6 digit PIN code."), c(null));
      return;
    }
    (n(!0), r(""));
    try {
      const p = await St(`/serviceability/pincode?pincode=${d}`);
      c(p);
    } catch (p) {
      (c(null),
        r(
          p instanceof Error
            ? p.message
            : "Unable to check pickup availability right now.",
        ));
    } finally {
      n(!1);
    }
  }
  return i.jsxs("section", {
    id: "pin-checker",
    "aria-labelledby": "pin-heading",
    children: [
      i.jsxs("div", {
        className: "flex items-center gap-3",
        children: [
          i.jsx("span", {
            className:
              "flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-700",
            children: i.jsx(G0, {}),
          }),
          i.jsxs("div", {
            children: [
              i.jsx("h2", {
                id: "pin-heading",
                className: "text-xl font-black text-ink",
                children: "Pickup Availability Checker",
              }),
              i.jsx("p", {
                className: "text-sm text-muted",
                children: "Enter your PIN to check local pickup availability.",
              }),
            ],
          }),
        ],
      }),
      i.jsxs("div", {
        className: "mt-5 flex flex-col gap-3 sm:flex-row",
        children: [
          i.jsx("input", {
            value: t,
            onChange: (d) => l(d.target.value.replace(/\D/g, "").slice(0, 6)),
            inputMode: "numeric",
            maxLength: 6,
            placeholder: "Enter PIN code",
            className:
              "focus-ring min-h-12 flex-1 rounded-2xl border border-brand-100 bg-brand-50 px-4 font-bold text-ink",
          }),
          i.jsx("button", {
            onClick: o,
            disabled: a,
            className:
              "focus-ring rounded-2xl bg-ink px-5 py-3 font-black text-white disabled:opacity-60",
            children: a ? "Checking..." : "Check",
          }),
        ],
      }),
      s &&
        i.jsx("p", {
          className:
            "mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700",
          children: s,
        }),
      (u == null ? void 0 : u.serviceable) &&
        i.jsxs("div", {
          className: "mt-5 rounded-2xl border border-brand-200 bg-brand-50 p-4",
          children: [
            i.jsxs("p", {
              className: "flex items-center gap-2 font-black text-brand-700",
              children: [i.jsx(dn, { size: 19 }), " Pickup available"],
            }),
            i.jsx("p", {
              className: "mt-2 text-sm text-muted",
              children:
                Number(((b = u.data) == null ? void 0 : b.pickupCharge) || 0) >
                0
                  ? i.jsxs(i.Fragment, {
                      children: [
                        "Pickup Charge: ",
                        i.jsxs("strong", {
                          className: "text-ink",
                          children: [
                            "₹",
                            Number(
                              (y = u.data) == null ? void 0 : y.pickupCharge,
                            ).toFixed(0),
                          ],
                        }),
                      ],
                    })
                  : i.jsx("strong", {
                      className: "text-ink",
                      children: "Free Pickup",
                    }),
            }),
            i.jsxs("button", {
              onClick: e,
              className:
                "mt-4 inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-black text-white",
              children: ["Schedule Pickup ", i.jsx(wn, { size: 16 })],
            }),
          ],
        }),
    ],
  });
}
function Cs({ navigate: e }) {
  const { categories: t, loading: l } = qs(),
    a = t.slice(0, 6);
  return i.jsxs("section", {
    className: "container-page py-16",
    children: [
      i.jsxs("div", {
        className:
          "flex flex-col justify-between gap-5 md:flex-row md:items-end",
        children: [
          i.jsx(el, {
            eyebrow: "Latest rates",
            title: "Today's Scrap Rates in Gwalior",
            body: "See current prices before you schedule. Rates are loaded from the Kabad Factory backend.",
          }),
          i.jsxs("button", {
            onClick: () => e("/scrap-rates"),
            className:
              "inline-flex w-fit items-center gap-2 rounded-full border border-line bg-white px-5 py-3 font-extrabold text-brand-700 hover:border-brand-200 hover:bg-brand-50",
            children: ["View All Rates ", i.jsx(Rs, { size: 17 })],
          }),
        ],
      }),
      i.jsx("div", {
        className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
        children: (l ? Array.from({ length: 6 }) : a).map((n, u) =>
          i.jsxs(
            "div",
            {
              className:
                "card group flex items-center justify-between gap-4 p-5 transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift",
              children: [
                i.jsxs("div", {
                  children: [
                    i.jsx("h3", {
                      className: "font-black text-ink",
                      children: sl(n) ? n.name : "Loading rate",
                    }),
                    i.jsx("p", {
                      className: "text-sm text-muted",
                      children: "Current listed rate",
                    }),
                  ],
                }),
                i.jsx("p", {
                  className: "text-xl font-black text-brand-700",
                  children: sl(n) ? Bs(n) : "--",
                }),
              ],
            },
            u,
          ),
        ),
      }),
    ],
  });
}
function tb({ navigate: e }) {
  return i.jsx("section", {
    className: "container-page -mt-12 relative z-10",
    children: i.jsx("div", {
      className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
      children: V0.map(({ href: t, title: l, body: a, icon: n }) =>
        i.jsxs(
          "button",
          {
            onClick: () => e(t),
            className:
              "card group flex min-h-32 items-center gap-4 p-5 text-left transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift",
            children: [
              i.jsx("span", {
                className:
                  "flex h-14 w-14 shrink-0 items-center justify-center rounded-card bg-brand-50 text-brand-700 transition group-hover:bg-brand-600 group-hover:text-white",
                children: i.jsx(n, {}),
              }),
              i.jsxs("span", {
                children: [
                  i.jsx("strong", {
                    className: "block text-base text-ink",
                    children: l,
                  }),
                  i.jsx("span", {
                    className: "mt-1 block text-sm text-muted",
                    children: a,
                  }),
                ],
              }),
            ],
          },
          t,
        ),
      ),
    }),
  });
}
function lb({ route: e, navigate: t }) {
  const { categories: l, loading: a, error: n, reload: u } = qs();
  return i.jsxs(i.Fragment, {
    children: [
      i.jsx(ac, {
        route: e,
        action: () => t("/schedule-pickup"),
        actionLabel: "Schedule Pickup",
      }),
      i.jsxs("section", {
        className: "container-page pb-16",
        children: [
          n && i.jsx(Ah, { message: n, onRetry: u }),
          i.jsxs("div", {
            className: "card overflow-hidden",
            children: [
              i.jsxs("div", {
                className:
                  "grid grid-cols-[1fr_120px] gap-4 border-b border-brand-100 bg-brand-50 px-5 py-4 text-sm font-black uppercase text-brand-900",
                children: [
                  i.jsx("span", { children: "Scrap Item" }),
                  i.jsx("span", { className: "text-right", children: "Rate" }),
                ],
              }),
              (a ? Array.from({ length: 8 }) : l).map((c, s) =>
                i.jsxs(
                  "div",
                  {
                    className:
                      "grid grid-cols-[1fr_120px] items-center gap-4 border-b border-brand-50 px-5 py-4 last:border-b-0",
                    children: [
                      i.jsxs("div", {
                        children: [
                          i.jsx("h2", {
                            className: "font-black text-ink",
                            children: sl(c) ? c.name : "Loading item",
                          }),
                          i.jsx("p", {
                            className: "mt-1 text-sm text-muted",
                            children: sl(c)
                              ? c.description ||
                                "Doorstep pickup available where serviceable."
                              : "Fetching current rate...",
                          }),
                        ],
                      }),
                      i.jsx("span", {
                        className:
                          "text-right text-lg font-black text-brand-700",
                        children: sl(c) ? Bs(c) : "--",
                      }),
                    ],
                  },
                  sl(c) ? c.id : s,
                ),
              ),
            ],
          }),
        ],
      }),
    ],
  });
}
function ab({ navigate: e }) {
  const { session: t } = lc(),
    { categories: l, loading: a } = qs(),
    [n, u] = z.useState([]),
    [c, s] = z.useState([]),
    [r, o] = z.useState(""),
    [b, y] = z.useState(""),
    [d, p] = z.useState(""),
    [N, A] = z.useState(null),
    [H, h] = z.useState(!1),
    [f, m] = z.useState(mf),
    [g, v] = z.useState({}),
    [E, S] = z.useState({}),
    [T, J] = z.useState(null),
    [R, Ne] = z.useState(!1),
    [We, Sa] = z.useState(!1),
    [ja, Al] = z.useState(!1),
    [j, O] = z.useState(null),
    M = z.useMemo(
      () => l.filter((k) => k.isActive !== !1 && k.status !== "Hidden"),
      [l],
    ),
    G = n.find((k) => k.id === N) || null,
    se = z.useMemo(
      () => c.map((k) => ({ categoryId: k, estimatedQuantity: Tb(r) })),
      [c, r],
    ),
    Tl = z.useMemo(() => Ob(14), []),
    El = !!(c.length && r && b && d && N);
  (z.useEffect(() => {
    t && zl();
  }, [t]),
    z.useEffect(() => {
      if (!t || !(G != null && G.pincode)) {
        J(null);
        return;
      }
      let k = !1;
      return (
        St(`/serviceability/pincode?pincode=${encodeURIComponent(G.pincode)}`)
          .then((ue) => {
            var te;
            k ||
              J(
                ue.serviceable
                  ? Number(
                      ((te = ue.data) == null ? void 0 : te.pickupCharge) || 0,
                    )
                  : null,
              );
          })
          .catch(() => {
            k || J(null);
          }),
        () => {
          k = !0;
        }
      );
    }, [G == null ? void 0 : G.pincode, t]));
  async function zl(k) {
    if (t) {
      Ne(!0);
      try {
        const te = (await St("/addresses", { token: t.token })).data || [];
        u(te);
        const De = te.find((nc) => nc.isDefault) || te[0],
          Gs = k || N || (De == null ? void 0 : De.id) || null;
        (A(
          te.some((nc) => nc.id === Gs)
            ? Gs
            : (De == null ? void 0 : De.id) || null,
        ),
          h(te.length === 0));
      } catch (ue) {
        S((te) => ({
          ...te,
          address:
            ue instanceof Error
              ? ue.message
              : "Could not load saved addresses.",
        }));
      } finally {
        Ne(!1);
      }
    }
  }
  async function ot() {
    if (!t || We) return;
    const k = zb(f);
    if ((v(k), !Object.keys(k).length)) {
      Sa(!0);
      try {
        const ue = await St("/addresses", {
          method: "POST",
          token: t.token,
          body: JSON.stringify(wb(f)),
        });
        (await zl(ue.id),
          m(mf),
          v({}),
          S((te) => ({ ...te, address: void 0 })),
          h(!1));
      } catch (ue) {
        (v(gf(ue)),
          Object.keys(gf(ue)).length ||
            S((te) => ({
              ...te,
              address:
                ue instanceof Error ? ue.message : "Could not save address.",
            })));
      } finally {
        Sa(!1);
      }
    }
  }
  function wl() {
    (s([]), o(""), y(""), p(""), S({}));
  }
  async function zh() {
    var ue;
    if (!t) {
      e("/login?next=/schedule-pickup");
      return;
    }
    if (ja) return;
    const k = Eb({
      selected: c,
      weightRange: r,
      pickupDate: b,
      timeSlot: d,
      selectedAddressId: N,
    });
    if ((S(k), !Object.keys(k).length)) {
      Al(!0);
      try {
        const te = await St("/bookings", {
            method: "POST",
            token: t.token,
            body: JSON.stringify({
              addressId: N,
              estimatedWeightRange: r,
              pickupDate: b,
              timeSlot: d,
              instructions: "",
              items: se,
            }),
          }),
          De = Number(
            ((ue = te.pickup) == null ? void 0 : ue.pickupCharge) || 0,
          );
        (J(De), O(De), wl());
      } catch (te) {
        S((De) => ({
          ...De,
          submit:
            te instanceof Error
              ? te.message
              : "Could not schedule pickup. Please try again.",
        }));
      } finally {
        Al(!1);
      }
    }
  }
  return t
    ? i.jsxs(st, {
        title: "Schedule Scrap Pickup",
        subtitle:
          "Select items, estimated weight, saved address, pickup charge, date, and slot. The same backend creates your pickup as the mobile app.",
        children: [
          i.jsx("div", {
            className: "mb-7 grid gap-3 md:grid-cols-6",
            children: [
              "Select Items",
              "Weight",
              "Pickup Address",
              "Pickup Charge",
              "Date / Time",
              "Review",
            ].map((k, ue) =>
              i.jsxs(
                "div",
                {
                  className: `rounded-2xl border px-4 py-3 text-sm font-black transition ${Mb(ue, { selected: c, weightRange: r, selectedAddressId: N, pickupCharge: T, pickupDate: b, timeSlot: d }) ? "border-brand-500 bg-brand-50 text-brand-700" : "border-brand-100 bg-white text-muted"}`,
                  children: [
                    i.jsx("span", {
                      className:
                        "mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs",
                      children: ue + 1,
                    }),
                    k,
                  ],
                },
                k,
              ),
            ),
          }),
          i.jsxs("div", {
            className: "grid gap-6 lg:grid-cols-[1fr_390px]",
            children: [
              i.jsxs("div", {
                className: "space-y-6",
                children: [
                  i.jsxs("section", {
                    className: "card reveal-up p-5",
                    children: [
                      i.jsx(Vn, {
                        icon: i.jsx(tc, {}),
                        title: "Select Items",
                        error: E.items,
                      }),
                      i.jsx("p", {
                        className: "mt-2 text-sm text-muted",
                        children:
                          "Raddi ho ya loha, plastic ho ya purana samaan - Kabad Factory sab le jayega.",
                      }),
                      i.jsx("div", {
                        className:
                          "mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3",
                        children: (a && !M.length
                          ? Array.from({ length: 6 })
                          : M
                        ).map((k, ue) =>
                          sl(k)
                            ? i.jsxs(
                                "button",
                                {
                                  onClick: () =>
                                    s((te) =>
                                      te.includes(k.id)
                                        ? te.filter((De) => De !== k.id)
                                        : [...te, k.id],
                                    ),
                                  className: `group flex min-h-24 items-center justify-between rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 ${c.includes(k.id) ? "border-brand-500 bg-brand-50 shadow-soft" : "border-brand-100 bg-white hover:border-brand-200"}`,
                                  "aria-pressed": c.includes(k.id),
                                  children: [
                                    i.jsxs("span", {
                                      children: [
                                        i.jsx("strong", {
                                          className: "block text-ink",
                                          children: k.name,
                                        }),
                                        i.jsx("span", {
                                          className: "text-sm text-muted",
                                          children: Bs(k),
                                        }),
                                      ],
                                    }),
                                    c.includes(k.id) &&
                                      i.jsx(dn, {
                                        className: "text-brand-600",
                                      }),
                                  ],
                                },
                                k.id,
                              )
                            : i.jsx(
                                "div",
                                {
                                  className:
                                    "h-24 animate-pulse rounded-2xl bg-brand-50",
                                },
                                ue,
                              ),
                        ),
                      }),
                    ],
                  }),
                  i.jsxs("section", {
                    className: "card reveal-up p-5",
                    children: [
                      i.jsx(Vn, {
                        icon: i.jsx(Y0, {}),
                        title: "Estimated Weight / Quantity",
                        error: E.weightRange,
                      }),
                      i.jsx("div", {
                        className: "mt-4 flex flex-wrap gap-2",
                        children: $0.map((k) =>
                          i.jsx(
                            "button",
                            {
                              onClick: () => o(k),
                              className: `rounded-full border px-4 py-2 text-sm font-black transition ${r === k ? "border-brand-600 bg-brand-600 text-white" : "border-brand-100 bg-white text-muted hover:border-brand-200"}`,
                              children: k,
                            },
                            k,
                          ),
                        ),
                      }),
                    ],
                  }),
                  i.jsxs("section", {
                    className: "card reveal-up p-5",
                    children: [
                      i.jsxs("div", {
                        className:
                          "flex flex-wrap items-center justify-between gap-3",
                        children: [
                          i.jsx(Vn, {
                            icon: i.jsx(R0, {}),
                            title: "Saved Address",
                            error: E.address,
                          }),
                          i.jsxs("button", {
                            onClick: () => h(!0),
                            className:
                              "inline-flex items-center gap-2 rounded-full border border-brand-100 px-4 py-2 text-sm font-black text-brand-700",
                            children: [i.jsx(q0, { size: 16 }), " Add Address"],
                          }),
                        ],
                      }),
                      R
                        ? i.jsx("div", {
                            className:
                              "mt-4 h-28 animate-pulse rounded-2xl bg-brand-50",
                          })
                        : n.length > 0
                          ? i.jsx("div", {
                              className: "mt-4 grid gap-3",
                              children: n.map((k) =>
                                i.jsxs(
                                  "button",
                                  {
                                    onClick: () => A(k.id),
                                    className: `flex items-start justify-between gap-4 rounded-2xl border p-4 text-left transition ${N === k.id ? "border-brand-500 bg-brand-50 shadow-soft" : "border-brand-100 bg-white hover:border-brand-200"}`,
                                    "aria-pressed": N === k.id,
                                    children: [
                                      i.jsxs("span", {
                                        children: [
                                          i.jsx("strong", {
                                            className: "block text-ink",
                                            children: Eh(k.label),
                                          }),
                                          i.jsx("span", {
                                            className:
                                              "mt-1 block text-sm leading-6 text-muted",
                                            children: Rb(k),
                                          }),
                                          i.jsxs("span", {
                                            className:
                                              "mt-2 block text-sm font-black text-ink",
                                            children: [
                                              k.fullName,
                                              " | ",
                                              k.mobile,
                                            ],
                                          }),
                                        ],
                                      }),
                                      i.jsx("span", {
                                        className: `shrink-0 rounded-full px-3 py-1 text-xs font-black ${k.isDefault || N === k.id ? "bg-brand-600 text-white" : "bg-brand-50 text-brand-700"}`,
                                        children:
                                          N === k.id
                                            ? "Selected"
                                            : k.isDefault
                                              ? "Default"
                                              : "Use",
                                      }),
                                    ],
                                  },
                                  k.id,
                                ),
                              ),
                            })
                          : i.jsxs("div", {
                              className:
                                "mt-4 rounded-2xl border border-dashed border-brand-200 bg-brand-50 p-4",
                              children: [
                                i.jsx("p", {
                                  className: "font-black text-ink",
                                  children: "No saved address found",
                                }),
                                i.jsx("p", {
                                  className: "mt-1 text-sm text-muted",
                                  children:
                                    "Add your pickup address once, then use it for faster repeat bookings.",
                                }),
                              ],
                            }),
                      H &&
                        i.jsx(vb, {
                          draft: f,
                          setDraft: m,
                          errors: g,
                          saving: We,
                          onSave: ot,
                          onCancel: () => (n.length ? h(!1) : void 0),
                        }),
                    ],
                  }),
                  i.jsxs("section", {
                    className: "card reveal-up p-5",
                    children: [
                      i.jsx(Vn, {
                        icon: i.jsx(M0, {}),
                        title: "Pickup Date / Time",
                        error: E.pickupDate || E.timeSlot,
                      }),
                      i.jsx("div", {
                        className: "mt-4 flex gap-3 overflow-x-auto pb-2",
                        children: Tl.map((k) =>
                          i.jsxs(
                            "button",
                            {
                              onClick: () => y(k.value),
                              className: `min-w-[88px] rounded-2xl border px-3 py-3 text-center transition ${b === k.value ? "border-brand-600 bg-brand-600 text-white" : "border-brand-100 bg-white text-ink"}`,
                              children: [
                                i.jsx("span", {
                                  className:
                                    "block text-xs font-black uppercase",
                                  children: k.isToday ? "Today" : k.day,
                                }),
                                i.jsx("span", {
                                  className: "mt-1 block text-xl font-black",
                                  children: k.date,
                                }),
                                i.jsx("span", {
                                  className: "block text-xs font-bold",
                                  children: k.month,
                                }),
                              ],
                            },
                            k.value,
                          ),
                        ),
                      }),
                      i.jsx("div", {
                        className: "mt-4 grid gap-3 sm:grid-cols-2",
                        children: F0.map((k) =>
                          i.jsxs(
                            "button",
                            {
                              onClick: () => p(k),
                              className: `rounded-2xl border px-4 py-3 text-sm font-black transition ${d === k ? "border-brand-600 bg-brand-50 text-brand-700" : "border-brand-100 bg-white text-muted"}`,
                              children: [
                                i.jsx(O0, {
                                  className: "mr-2 inline",
                                  size: 16,
                                }),
                                k,
                              ],
                            },
                            k,
                          ),
                        ),
                      }),
                    ],
                  }),
                ],
              }),
              i.jsx("aside", {
                className: "lg:sticky lg:top-24 lg:self-start",
                children: i.jsxs("div", {
                  className: "card p-5",
                  children: [
                    i.jsx("h2", {
                      className: "text-xl font-black text-ink",
                      children: "Review Pickup",
                    }),
                    i.jsxs("div", {
                      className: "mt-4 space-y-4 text-sm",
                      children: [
                        i.jsx(Oa, {
                          label: "Items",
                          value: c.length
                            ? `${c.length} selected`
                            : "Select scrap items",
                        }),
                        i.jsx(Oa, {
                          label: "Estimated weight",
                          value: r || "Choose range",
                        }),
                        i.jsx(Oa, {
                          label: "Pickup address",
                          value: G
                            ? `${G.line1}, ${G.pincode}`
                            : "Select saved address",
                        }),
                        i.jsx(Oa, {
                          label: "Pickup charge",
                          value:
                            T === null
                              ? "Calculated by backend"
                              : T > 0
                                ? `₹${T.toFixed(0)}`
                                : "Free Pickup",
                          strong: !0,
                        }),
                        i.jsx(Oa, {
                          label: "Slot",
                          value:
                            b && d ? `${_b(b)} | ${d}` : "Choose date and time",
                        }),
                      ],
                    }),
                    E.submit &&
                      i.jsx("p", {
                        className:
                          "mt-4 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700",
                        children: E.submit,
                      }),
                    i.jsx("button", {
                      onClick: zh,
                      disabled: ja || !El,
                      className:
                        "mt-5 w-full rounded-2xl bg-brand-600 px-5 py-3 font-black text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60",
                      children: ja ? "Scheduling..." : "Schedule Pickup",
                    }),
                    i.jsxs("a", {
                      href: B.appDownloadUrl,
                      className:
                        "mt-3 flex items-center justify-center gap-2 rounded-2xl border border-brand-100 px-5 py-3 text-sm font-black text-brand-700",
                      children: [
                        i.jsx(Mn, { size: 17 }),
                        " Schedule Faster with the App",
                      ],
                    }),
                  ],
                }),
              }),
            ],
          }),
          j !== null &&
            i.jsx("div", {
              className:
                "fixed inset-0 z-50 grid place-items-center bg-ink/50 p-4 backdrop-blur-sm",
              role: "dialog",
              "aria-modal": "true",
              "aria-labelledby": "success-title",
              children: i.jsxs("div", {
                className: "success-pop max-w-md card p-7 text-center",
                children: [
                  i.jsx("div", {
                    className:
                      "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-700",
                    children: i.jsx(dn, { size: 34 }),
                  }),
                  i.jsx("h2", {
                    id: "success-title",
                    className: "mt-5 text-2xl font-black text-ink",
                    children: "Pickup scheduled successfully",
                  }),
                  i.jsxs("p", {
                    className: "mt-2 font-bold text-muted",
                    children: [
                      "Pickup Charge: ",
                      j > 0 ? `₹${j.toFixed(0)}` : "Free",
                    ],
                  }),
                  i.jsx("button", {
                    onClick: () => {
                      (O(null), e("/"));
                    },
                    className:
                      "mt-6 w-full rounded-2xl bg-brand-600 px-5 py-3 font-black text-white",
                    children: "OK",
                  }),
                ],
              }),
            }),
        ],
      })
    : i.jsx(st, {
        title: "Schedule Scrap Pickup",
        subtitle:
          "Login or register first, then continue booking your doorstep scrap pickup online.",
        children: i.jsxs("div", {
          className: "mx-auto max-w-xl card p-6",
          children: [
            i.jsx("h2", {
              className: "text-2xl font-black text-ink",
              children: "Continue to schedule pickup",
            }),
            i.jsx("p", {
              className: "mt-3 text-muted",
              children:
                "The website uses the same authenticated booking API as the mobile app, so your pickup, address, charge, and order history stay connected.",
            }),
            i.jsxs("div", {
              className: "mt-6 flex flex-col gap-3 sm:flex-row",
              children: [
                i.jsx("button", {
                  onClick: () => e("/login?next=/schedule-pickup"),
                  className:
                    "rounded-full bg-brand-600 px-6 py-3 font-black text-white",
                  children: "Login",
                }),
                i.jsx("button", {
                  onClick: () => e("/register?next=/schedule-pickup"),
                  className:
                    "rounded-full border border-brand-100 px-6 py-3 font-black text-brand-700",
                  children: "New user? Register",
                }),
              ],
            }),
          ],
        }),
      });
}
function nb({ mode: e, navigate: t, currentPath: l }) {
  const { setSession: a } = lc(),
    [n, u] = z.useState({ name: "", mobile: "", password: "" }),
    [c, s] = z.useState(""),
    [r, o] = z.useState(!1),
    b = Nb(yf(l, "next") || yf(l, "redirect"));
  async function y() {
    s("");
    try {
      const d = n.mobile.replace(/\D/g, "");
      if (!/^\d{10}$/.test(d))
        return s("Please enter a 10 digit mobile number.");
      if (n.password.length < 6)
        return s("Password must be at least 6 characters.");
      const p =
          e === "register"
            ? { name: n.name.trim(), mobile: d, password: n.password }
            : { mobile: d, password: n.password },
        N = await St(`/auth/${e}`, { method: "POST", body: JSON.stringify(p) });
      (a(N), t(b || "/account"));
    } catch (d) {
      s(d instanceof Error ? d.message : "Authentication failed.");
    }
  }
  return i.jsxs(st, {
    title: e === "register" ? "Create Account" : "Login",
    subtitle:
      "Use the same secure mobile number and password flow as the mobile application.",
    children: [
      i.jsxs("div", {
        className: "mx-auto max-w-md card p-6",
        children: [
          e === "register" &&
            i.jsx(Pe, {
              label: "Name",
              value: n.name,
              onChange: (d) => u({ ...n, name: d }),
            }),
          i.jsx(Pe, {
            label: "Mobile Number",
            value: n.mobile,
            onChange: (d) =>
              u({ ...n, mobile: d.replace(/\D/g, "").slice(0, 10) }),
          }),
          i.jsx(Pe, {
            label: "Password",
            type: "password",
            value: n.password,
            onChange: (d) => u({ ...n, password: d.slice(0, 20) }),
          }),
          e === "login" &&
            i.jsx("button", {
              onClick: () => o(!0),
              className: "mt-2 text-sm font-bold text-brand-700",
              children: "Forgot Password?",
            }),
          c &&
            i.jsx("p", {
              className:
                "mt-4 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700",
              children: c,
            }),
          i.jsx("button", {
            onClick: y,
            className:
              "mt-5 w-full rounded-2xl bg-brand-600 px-5 py-3 font-black text-white",
            children: e === "register" ? "Register" : "Login",
          }),
          i.jsx("button", {
            onClick: () => t(kb(e, b)),
            className: "mt-4 w-full text-sm font-bold text-brand-700",
            children:
              e === "register"
                ? "Already registered? Login"
                : "New user? Register",
          }),
        ],
      }),
      r &&
        i.jsx("div", {
          className: "fixed inset-0 z-50 grid place-items-center bg-ink/40 p-4",
          children: i.jsxs("div", {
            className: "max-w-md card p-6",
            children: [
              i.jsx("h2", {
                className: "text-xl font-black text-ink",
                children: "Reset Password",
              }),
              i.jsxs("p", {
                className: "mt-3 text-muted",
                children: [
                  "To reset your password, please contact our support team on WhatsApp at ",
                  B.phone,
                  ". Our team will help you set a new password.",
                ],
              }),
              i.jsxs("div", {
                className: "mt-5 flex flex-col gap-3 sm:flex-row",
                children: [
                  i.jsx("a", {
                    className:
                      "rounded-2xl bg-brand-600 px-5 py-3 text-center font-black text-white",
                    href: `https://wa.me/${B.phonePlain}?text=${encodeURIComponent("Hi, I need help resetting my account password.")}`,
                    children: "Contact on WhatsApp",
                  }),
                  i.jsx("button", {
                    className:
                      "rounded-2xl border border-brand-100 px-5 py-3 font-black text-brand-700",
                    onClick: () => o(!1),
                    children: "Close",
                  }),
                ],
              }),
            ],
          }),
        }),
    ],
  });
}
function ub({ route: e, navigate: t }) {
  const { session: l, loading: a, logout: n } = lc(),
    [u, c] = z.useState([]),
    [s, r] = z.useState("");
  return (
    z.useEffect(() => {
      !l ||
        e.path !== "/orders" ||
        St("/bookings?page=1&limit=10&status=all", { token: l.token })
          .then((o) => c(o.data || []))
          .catch((o) =>
            r(o instanceof Error ? o.message : "Could not load orders."),
          );
    }, [e.path, l]),
    a
      ? i.jsx(st, { title: "Account", subtitle: "Restoring your session..." })
      : l
        ? i.jsx(st, {
            title: e.path === "/orders" ? "Orders" : "Account",
            subtitle: `Welcome, ${l.user.name || l.user.mobile}.`,
            children: i.jsxs("div", {
              className: "grid gap-5 lg:grid-cols-[300px_1fr]",
              children: [
                i.jsxs("aside", {
                  className: "card p-5",
                  children: [
                    i.jsx("p", {
                      className: "font-black text-ink",
                      children: l.user.name || "Kabad Factory User",
                    }),
                    i.jsx("p", {
                      className: "mt-1 text-sm text-muted",
                      children: l.user.mobile,
                    }),
                    i.jsx("button", {
                      onClick: () => t("/orders"),
                      className:
                        "mt-5 w-full rounded-2xl border border-brand-100 px-4 py-3 text-left font-bold text-brand-700",
                      children: "Orders",
                    }),
                    i.jsx("button", {
                      onClick: n,
                      className:
                        "mt-3 w-full rounded-2xl bg-ink px-4 py-3 font-bold text-white",
                      children: "Logout",
                    }),
                  ],
                }),
                i.jsx("section", {
                  className: "card p-5",
                  children:
                    e.path !== "/orders"
                      ? i.jsxs("div", {
                          children: [
                            i.jsx("h2", {
                              className: "text-xl font-black text-ink",
                              children: "Manage your pickup journey",
                            }),
                            i.jsx("p", {
                              className: "mt-2 text-muted",
                              children:
                                "Use Orders to view pickup status, item details, pickup charges, and bills.",
                            }),
                          ],
                        })
                      : s
                        ? i.jsx(Ah, { message: s, onRetry: () => t("/orders") })
                        : i.jsxs("div", {
                            className: "space-y-4",
                            children: [
                              u.map((o) =>
                                i.jsxs(
                                  "article",
                                  {
                                    className:
                                      "rounded-2xl border border-brand-100 p-4",
                                    children: [
                                      i.jsxs("div", {
                                        className:
                                          "flex items-start justify-between gap-3",
                                        children: [
                                          i.jsxs("div", {
                                            children: [
                                              i.jsxs("h2", {
                                                className:
                                                  "font-black text-ink",
                                                children: ["#KF", o.id],
                                              }),
                                              i.jsxs("p", {
                                                className: "text-sm text-muted",
                                                children: [
                                                  o.pickupDate,
                                                  " | ",
                                                  o.timeSlot,
                                                ],
                                              }),
                                            ],
                                          }),
                                          i.jsx("span", {
                                            className:
                                              "rounded-full bg-brand-50 px-3 py-1 text-xs font-black text-brand-700",
                                            children: o.status,
                                          }),
                                        ],
                                      }),
                                      i.jsx("p", {
                                        className: "mt-3 text-sm text-muted",
                                        children: [o.line1, o.city, o.pincode]
                                          .filter(Boolean)
                                          .join(", "),
                                      }),
                                      i.jsxs("div", {
                                        className:
                                          "mt-4 flex flex-wrap gap-3 text-sm font-bold text-ink",
                                        children: [
                                          i.jsxs("span", {
                                            children: [
                                              o.itemCount || 0,
                                              " items",
                                            ],
                                          }),
                                          i.jsxs("span", {
                                            children: [
                                              "Pickup ₹",
                                              Number(
                                                o.pickupCharge || 0,
                                              ).toFixed(0),
                                            ],
                                          }),
                                          i.jsx("span", {
                                            children:
                                              o.status === "completed"
                                                ? `Total ₹${Number(o.totalAmount || 0).toFixed(0)}`
                                                : "Total Pending",
                                          }),
                                        ],
                                      }),
                                    ],
                                  },
                                  o.id,
                                ),
                              ),
                              !u.length &&
                                i.jsx("p", {
                                  className: "text-muted",
                                  children: "No orders found.",
                                }),
                            ],
                          }),
                }),
              ],
            }),
          })
        : i.jsx(st, {
            title: "Login Required",
            subtitle: "Please login to view account pages.",
            children: i.jsx("button", {
              onClick: () => t("/login"),
              className:
                "rounded-full bg-brand-600 px-5 py-3 font-black text-white",
              children: "Login",
            }),
          })
  );
}
function cb({ route: e, navigate: t }) {
  return i.jsxs(i.Fragment, {
    children: [
      i.jsx(ac, {
        route: e,
        action: () => t("/schedule-pickup"),
        actionLabel: "Schedule Pickup",
      }),
      i.jsx(kh, { route: e }),
      i.jsx(Cs, { navigate: t }),
      i.jsx(On, {}),
    ],
  });
}
function pf({ route: e, navigate: t }) {
  return e.path === "/about"
    ? i.jsx(ib, { route: e, navigate: t })
    : i.jsxs(i.Fragment, {
        children: [
          i.jsx(ac, {
            route: e,
            action: () => t("/schedule-pickup"),
            actionLabel: "Schedule Pickup",
          }),
          i.jsx(kh, { route: e }),
          i.jsx("section", {
            className: "container-page pb-16",
            children: i.jsxs("div", {
              className:
                "card flex flex-col items-start justify-between gap-5 bg-brand-900 p-7 text-white md:flex-row md:items-center",
              children: [
                i.jsxs("div", {
                  children: [
                    i.jsx("h2", {
                      className: "text-2xl font-black",
                      children: "Ready to sell scrap?",
                    }),
                    i.jsx("p", {
                      className: "mt-2 text-brand-100",
                      children:
                        "Check your PIN code and schedule a pickup online.",
                    }),
                  ],
                }),
                i.jsx("button", {
                  onClick: () => t("/schedule-pickup"),
                  className:
                    "rounded-full bg-white px-6 py-3 font-black text-brand-700",
                  children: "Schedule Pickup",
                }),
              ],
            }),
          }),
        ],
      });
}
function ib({ route: e, navigate: t }) {
  return i.jsxs(i.Fragment, {
    children: [
      i.jsxs("section", {
        className: "relative isolate overflow-hidden bg-ink py-20 text-white",
        children: [
          i.jsx("img", {
            src: B.assets.heroBanner,
            alt: "",
            className: "absolute inset-0 -z-20 h-full w-full object-cover",
            loading: "lazy",
          }),
          i.jsx("div", {
            className:
              "absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/84 to-ink/35",
          }),
          i.jsxs("div", {
            className: "container-page reveal-up",
            children: [
              i.jsx(Hs, { path: e.path }),
              i.jsx("h1", {
                className: "mt-5 max-w-4xl text-4xl font-black sm:text-6xl",
                children: "About Kabad Factory",
              }),
              i.jsx("p", {
                className:
                  "mt-5 max-w-3xl text-xl font-bold leading-9 text-brand-100",
                children:
                  "A cleaner, simpler way to sell recyclables from home.",
              }),
              i.jsx("p", {
                className: "mt-4 max-w-3xl text-lg leading-8 text-white/84",
                children:
                  "Kabad Factory brings current scrap rates, doorstep pickup, saved addresses and order tracking into one easy digital experience for Gwalior customers.",
              }),
              i.jsxs("div", {
                className: "mt-8 flex flex-col gap-3 sm:flex-row",
                children: [
                  i.jsx("button", {
                    onClick: () => t("/pickup-services"),
                    className:
                      "rounded-full bg-white px-6 py-3 text-center font-black text-brand-700",
                    children: "Explore Services",
                  }),
                  i.jsx("button", {
                    onClick: () => t("/schedule-pickup"),
                    className:
                      "rounded-full bg-brand-600 px-6 py-3 font-black text-white",
                    children: "Schedule Pickup",
                  }),
                  i.jsx("a", {
                    href: B.appDownloadUrl,
                    className:
                      "rounded-full border border-white/25 px-6 py-3 text-center font-black text-white",
                    children: "Download App",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      i.jsxs("section", {
        className: "container-page py-14",
        children: [
          i.jsx(el, {
            eyebrow: "Our Mission",
            title: "Easy, transparent recycling — one doorstep at a time",
            body: "Whether it is paper, metal, plastic, electronics, or household scrap, our goal is to help customers recycle responsibly without carrying scrap to a local dealer.",
          }),
          i.jsx("div", {
            className: "mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4",
            children: (e.sections || []).map((l, a) => {
              const n = [tc, z0, Mn, xh][a] || vh;
              return i.jsxs(
                "article",
                {
                  className:
                    "card reveal-up p-5 transition hover:-translate-y-1 hover:border-brand-200",
                  children: [
                    i.jsx("div", {
                      className:
                        "flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700",
                      children: i.jsx(n, {}),
                    }),
                    i.jsx("h2", {
                      className: "mt-5 text-xl font-black text-ink",
                      children: l.title,
                    }),
                    i.jsx("p", {
                      className: "mt-3 text-sm leading-6 text-muted",
                      children: l.body,
                    }),
                  ],
                },
                l.title,
              );
            }),
          }),
        ],
      }),
      i.jsx("section", {
        className: "bg-white py-14",
        children: i.jsxs("div", {
          className:
            "container-page grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center",
          children: [
            i.jsxs("div", {
              children: [
                i.jsx("p", {
                  className:
                    "text-sm font-black uppercase tracking-wide text-brand-700",
                  children: "Our Vision",
                }),
                i.jsx("h2", {
                  className: "mt-2 text-3xl font-black text-ink sm:text-4xl",
                  children:
                    "A cleaner city where selling scrap is as simple as ordering a service online.",
                }),
              ],
            }),
            i.jsx("div", {
              className: "grid gap-4 sm:grid-cols-2",
              children: [
                "Doorstep pickup from saved addresses",
                "Current scrap rates from backend",
                "Pickup charge before confirmation",
                "Orders and bills in one account",
              ].map((l) =>
                i.jsxs(
                  "div",
                  {
                    className:
                      "rounded-2xl border border-brand-100 bg-brand-50 p-4 font-bold text-ink",
                    children: [
                      i.jsx(dn, { className: "mb-3 text-brand-700" }),
                      l,
                    ],
                  },
                  l,
                ),
              ),
            }),
          ],
        }),
      }),
      i.jsx(Us, { navigate: t }),
    ],
  });
}
function sb({ route: e, navigate: t }) {
  const l = [
    [
      "Doorstep Scrap Pickup",
      "Book collection from home for paper, metal, plastic, appliances and mixed recyclable scrap.",
    ],
    [
      "Household Scrap Pickup",
      "Clear everyday home scrap without visiting a local dealer or weighing shop.",
    ],
    [
      "Bulk Scrap Pickup",
      "Plan larger pickups for homes, societies, shops and local businesses.",
    ],
    [
      "Office Scrap Pickup",
      "Dispose of office paper, packaging, old electronics and workspace scrap with documented status.",
    ],
    [
      "Commercial Scrap Pickup",
      "Coordinate one-time or repeat scrap collection for business material.",
    ],
    [
      "E-Waste Pickup",
      "Schedule responsible pickup for accepted wires, devices, computer parts and small electronics.",
    ],
  ];
  return i.jsxs(i.Fragment, {
    children: [
      i.jsxs("section", {
        className:
          "relative isolate overflow-hidden bg-brand-900 py-20 text-white",
        children: [
          i.jsx("img", {
            src: B.assets.heroBanner,
            alt: "",
            className: "absolute inset-0 -z-20 h-full w-full object-cover",
            loading: "lazy",
          }),
          i.jsx("div", {
            className:
              "absolute inset-0 -z-10 bg-gradient-to-r from-brand-900 via-brand-900/88 to-brand-900/42",
          }),
          i.jsxs("div", {
            className: "container-page",
            children: [
              i.jsx(Hs, { path: e.path }),
              i.jsx("h1", {
                className: "mt-5 max-w-4xl text-4xl font-black sm:text-6xl",
                children: e.h1,
              }),
              i.jsx("p", {
                className: "mt-5 max-w-3xl text-lg leading-8 text-brand-100",
                children: e.intro,
              }),
              i.jsx("button", {
                onClick: () => t("/schedule-pickup"),
                className:
                  "mt-8 rounded-full bg-white px-6 py-3 font-black text-brand-700",
                children: "Schedule Pickup",
              }),
            ],
          }),
        ],
      }),
      i.jsxs("section", {
        className: "container-page py-16",
        children: [
          i.jsx(el, {
            eyebrow: "Our Pickup Services",
            title: "What Kabad Factory Collects",
            body: "Doorstep pickup is designed for homes, offices and local businesses that want a clean, transparent way to sell scrap.",
          }),
          i.jsx("div", {
            className: "mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3",
            children: l.map(([a, n]) =>
              i.jsxs(
                "article",
                {
                  className:
                    "card p-5 transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift",
                  children: [
                    i.jsx(tc, { className: "text-brand-700" }),
                    i.jsx("h2", {
                      className: "mt-4 text-xl font-black text-ink",
                      children: a,
                    }),
                    i.jsx("p", {
                      className: "mt-3 text-sm leading-6 text-muted",
                      children: n,
                    }),
                  ],
                },
                a,
              ),
            ),
          }),
        ],
      }),
      i.jsx("section", {
        className: "bg-white py-16",
        children: i.jsxs("div", {
          className:
            "container-page grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start",
          children: [
            i.jsxs("div", {
              children: [
                i.jsx(el, {
                  eyebrow: "Where We Serve",
                  title: "Currently focused on Gwalior serviceable PIN codes",
                  body: "Availability and pickup charges are checked from the backend using the customer's PIN code and configured pickup-charge rules.",
                }),
                i.jsxs("div", {
                  className:
                    "mt-6 flex flex-wrap gap-3 text-sm font-bold text-muted",
                  children: [
                    i.jsx("span", {
                      className:
                        "rounded-full border border-line bg-brand-50 px-4 py-2",
                      children: "Gwalior",
                    }),
                    i.jsx("span", {
                      className:
                        "rounded-full border border-line bg-brand-50 px-4 py-2",
                      children: "PIN-based serviceability",
                    }),
                    i.jsx("span", {
                      className:
                        "rounded-full border border-line bg-brand-50 px-4 py-2",
                      children: "Transparent pickup charge",
                    }),
                  ],
                }),
              ],
            }),
            i.jsx("div", {
              className: "card p-5 sm:p-7",
              children: i.jsx(Nh, { onSchedule: () => t("/schedule-pickup") }),
            }),
          ],
        }),
      }),
      i.jsx(Us, { navigate: t }),
      i.jsx(On, {}),
    ],
  });
}
function rb({ route: e, navigate: t }) {
  return i.jsxs(i.Fragment, {
    children: [
      i.jsx(ac, {
        route: e,
        action: () => t("/schedule-pickup"),
        actionLabel: "Book Pickup",
      }),
      i.jsx("section", {
        className: "container-page grid gap-5 pb-16 md:grid-cols-3",
        children: [
          "Online Kabadiwala Gwalior",
          "Scrap Pickup Gwalior",
          "Raddi Wala Near Me",
        ].map((l) =>
          i.jsxs(
            "div",
            {
              className: "card p-5",
              children: [
                i.jsx("h2", {
                  className: "text-xl font-black text-ink",
                  children: l,
                }),
                i.jsx("p", {
                  className: "mt-2 text-muted",
                  children:
                    "Kabad Factory connects local pickup availability, current scrap rates, and digital order tracking for Gwalior customers.",
                }),
              ],
            },
            l,
          ),
        ),
      }),
      i.jsx(Cs, { navigate: t }),
      i.jsx(On, {}),
    ],
  });
}
function fb({ navigate: e }) {
  const t = [
    [
      "How to Prepare Scrap Before Pickup",
      "Sort paper, metal, plastic and e-waste separately for faster weighing and clearer settlement.",
    ],
    [
      "Why Scrap Rates Change",
      "Scrap values move with commodity prices, material quality, and quantity.",
    ],
    [
      "How Pickup Charges Work",
      "Kabad Factory calculates pickup charges using backend store PIN, customer PIN, active slabs, and distance buffer.",
    ],
  ];
  return i.jsxs(st, {
    title: "Scrap Selling Guides",
    subtitle:
      "Useful, local-first guides for customers selling scrap online in Gwalior.",
    children: [
      i.jsx("div", {
        className: "grid gap-5 md:grid-cols-3",
        children: t.map(([l, a]) =>
          i.jsxs(
            "article",
            {
              className: "card p-5",
              children: [
                i.jsx("h2", {
                  className: "text-xl font-black text-ink",
                  children: l,
                }),
                i.jsx("p", { className: "mt-3 text-muted", children: a }),
              ],
            },
            l,
          ),
        ),
      }),
      i.jsx("button", {
        onClick: () => e("/schedule-pickup"),
        className:
          "mt-8 rounded-full bg-brand-600 px-6 py-3 font-black text-white",
        children: "Schedule Pickup",
      }),
    ],
  });
}
function ob({ route: e }) {
  return i.jsx(st, {
    title: e.h1 || "FAQ",
    subtitle: e.seo.description,
    children: i.jsx(On, { plain: !0 }),
  });
}
function db({ route: e }) {
  return i.jsx(st, {
    title: e.h1 || e.label,
    subtitle: e.seo.description,
    children: i.jsxs("div", {
      className: "card max-w-none p-6",
      children: [
        i.jsx("h2", { children: "Service Information" }),
        i.jsx("p", {
          children:
            "Kabad Factory uses customer account data, pickup addresses, selected scrap items, pricing data, and order status information to provide doorstep scrap pickup and support.",
        }),
        i.jsx("h2", { children: "Customer Responsibility" }),
        i.jsx("p", {
          children:
            "Customers should provide accurate mobile numbers, pickup addresses, PIN codes, selected items, and scheduling details.",
        }),
        i.jsx("h2", { children: "Contact" }),
        i.jsxs("p", {
          children: ["For questions, contact ", B.email, " or ", B.phone, "."],
        }),
      ],
    }),
  });
}
function hb() {
  return i.jsx("section", {
    className: "bg-white py-16",
    children: i.jsxs("div", {
      className: "container-page",
      children: [
        i.jsx(el, {
          eyebrow: "Simple flow",
          title: "How It Works",
          body: "From PIN check to verified pickup, the process stays simple and transparent.",
        }),
        i.jsx("div", {
          className: "mt-8 grid gap-4 md:grid-cols-5",
          children: Z0.map(({ icon: e, title: t, body: l }, a) =>
            i.jsxs(
              "div",
              {
                className:
                  "card group p-5 transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift",
                children: [
                  i.jsx("div", {
                    className:
                      "flex h-12 w-12 items-center justify-center rounded-card bg-brand-50 text-brand-700 transition group-hover:bg-brand-600 group-hover:text-white",
                    children: i.jsx(e, {}),
                  }),
                  i.jsxs("p", {
                    className: "mt-5 text-sm font-black text-amber",
                    children: ["Step ", a + 1],
                  }),
                  i.jsx("h3", {
                    className: "mt-1 text-base font-black text-ink",
                    children: t,
                  }),
                  i.jsx("p", {
                    className: "mt-2 text-sm leading-6 text-muted",
                    children: l,
                  }),
                ],
              },
              t,
            ),
          ),
        }),
      ],
    }),
  });
}
function mb() {
  return i.jsx("section", {
    className: "py-16",
    children: i.jsxs("div", {
      className: "container-page grid gap-8 lg:grid-cols-2",
      children: [
        i.jsx("div", {
          children: i.jsx(el, {
            eyebrow: "Why Kabad Factory",
            title: "Doorstep Pickup. Transparent Rates. Easy Recycling.",
            body: "Sell scrap online with clearer pricing, saved addresses, pickup tracking, and a cleaner service experience.",
          }),
        }),
        i.jsx("div", {
          className: "grid gap-4 sm:grid-cols-2",
          children: [
            "Current rates from backend",
            "PIN-based serviceability",
            "Pickup charge before booking",
            "Orders and bills in one account",
          ].map((e) =>
            i.jsxs(
              "div",
              {
                className:
                  "rounded-card border border-line bg-white p-5 font-bold text-ink shadow-soft",
                children: [i.jsx(vh, { className: "mb-3 text-brand-700" }), e],
              },
              e,
            ),
          ),
        }),
      ],
    }),
  });
}
function Us({ navigate: e }) {
  return i.jsx("section", {
    className: "container-page py-16",
    children: i.jsxs("div", {
      className:
        "grid overflow-hidden rounded-card border border-line bg-white shadow-soft lg:grid-cols-[1fr_0.82fr]",
      children: [
        i.jsxs("div", {
          className: "p-7 md:p-10",
          children: [
            i.jsx("p", {
              className:
                "text-sm font-black uppercase tracking-wide text-brand-700",
              children: "Get the App",
            }),
            i.jsx("h2", {
              className:
                "mt-3 max-w-2xl text-3xl font-black text-ink sm:text-4xl",
              children: "Take Kabad Factory with You",
            }),
            i.jsx("p", {
              className: "mt-4 max-w-2xl text-lg leading-8 text-muted",
              children:
                "Schedule pickups, manage addresses and track your orders faster with the Kabad Factory app.",
            }),
            i.jsx("p", {
              className: "mt-4 font-black text-brand-700",
              children:
                "Ghar ka kabad ab tension nahi — pickup schedule karo aur becho aasani se.",
            }),
            i.jsxs("div", {
              className: "mt-7 flex flex-col gap-3 sm:flex-row",
              children: [
                i.jsxs("a", {
                  href: B.appDownloadUrl,
                  className:
                    "inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 font-black text-white",
                  children: [i.jsx(Mn, { size: 18 }), " Get the App"],
                }),
                i.jsxs("button", {
                  onClick: () => e("/schedule-pickup"),
                  className:
                    "inline-flex items-center justify-center gap-2 rounded-full border border-brand-100 px-6 py-3 font-black text-brand-700",
                  children: ["Schedule on Website ", i.jsx(wn, { size: 18 })],
                }),
              ],
            }),
            i.jsxs("div", {
              className:
                "mt-7 flex max-w-sm items-center gap-4 rounded-2xl border border-brand-100 bg-brand-50 p-4",
              children: [
                i.jsx("div", {
                  className:
                    "grid h-20 w-20 shrink-0 place-items-center rounded-xl bg-white text-brand-700",
                  children: i.jsx(B0, { size: 46 }),
                }),
                i.jsx("p", {
                  className: "text-sm font-bold text-muted",
                  children:
                    "Scan from desktop or tap the button to open the configured Google Play download page.",
                }),
              ],
            }),
          ],
        }),
        i.jsx("div", {
          className: "relative min-h-[360px] bg-brand-50",
          children: i.jsx("img", {
            src: B.assets.appMockup,
            alt: "Kabad Factory mobile app mockup showing schedule, saved addresses, rates and orders",
            className: "h-full w-full object-cover",
            loading: "lazy",
          }),
        }),
      ],
    }),
  });
}
function pb({ navigate: e }) {
  return i.jsxs("section", {
    className: "container-page py-16",
    children: [
      i.jsx(el, {
        eyebrow: "What can you sell?",
        title: "Sell Your Recyclables with Kabad Factory",
        body: "Choose from common household, office, appliance, paper, metal, plastic and e-waste categories.",
      }),
      i.jsx("div", {
        className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
        children: jh.map(([t, l]) =>
          i.jsxs(
            "button",
            {
              onClick: () => e(`/sell-scrap/${t}`),
              className:
                "card group flex items-center justify-between p-5 text-left transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift",
              children: [
                i.jsxs("span", {
                  children: [
                    i.jsx("strong", {
                      className: "block text-ink",
                      children: l,
                    }),
                    i.jsx("span", {
                      className: "text-sm text-muted",
                      children: "Rates, pickup, FAQ",
                    }),
                  ],
                }),
                i.jsx(Rs, { className: "text-brand-700" }),
              ],
            },
            t,
          ),
        ),
      }),
    ],
  });
}
function bb({ navigate: e }) {
  return i.jsx("section", {
    className: "container-page py-16",
    children: i.jsxs("div", {
      className:
        "grid gap-8 rounded-card border border-line bg-brand-50 p-7 md:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center",
      children: [
        i.jsxs("div", {
          children: [
            i.jsx("p", {
              className:
                "text-sm font-black uppercase tracking-wide text-brand-700",
              children: "Pickup Services",
            }),
            i.jsx("h2", {
              className: "mt-3 text-3xl font-black text-ink sm:text-4xl",
              children:
                "Household, bulk, office and e-waste pickup in one place.",
            }),
            i.jsx("p", {
              className: "mt-4 leading-7 text-muted",
              children:
                "See what Kabad Factory collects, where service is available, and check your PIN before scheduling.",
            }),
            i.jsxs("button", {
              onClick: () => e("/pickup-services"),
              className:
                "mt-6 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 font-black text-white shadow-soft hover:-translate-y-0.5 hover:bg-brand-700",
              children: ["Explore Pickup Services ", i.jsx(wn, { size: 18 })],
            }),
          ],
        }),
        i.jsx("div", {
          className: "grid gap-3 sm:grid-cols-2",
          children: [
            "Doorstep Scrap Pickup",
            "Household Scrap Pickup",
            "Bulk Scrap Pickup",
            "Office Scrap Pickup",
            "Commercial Scrap Pickup",
            "E-Waste Pickup",
          ].map((t) =>
            i.jsxs(
              "div",
              {
                className:
                  "rounded-card border border-line bg-white p-4 font-extrabold text-ink shadow-soft",
                children: [i.jsx(dn, { className: "mb-3 text-brand-700" }), t],
              },
              t,
            ),
          ),
        }),
      ],
    }),
  });
}
function yb({ navigate: e }) {
  return i.jsx("section", {
    className: "bg-white py-16",
    children: i.jsxs("div", {
      className:
        "container-page grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center",
      children: [
        i.jsxs("div", {
          children: [
            i.jsx("p", {
              className:
                "text-sm font-black uppercase tracking-wide text-brand-700",
              children: "About Kabad Factory",
            }),
            i.jsx("h2", {
              className: "mt-3 text-3xl font-black text-ink sm:text-4xl",
              children: "Your Scrap Has Value. Sell It from Home.",
            }),
          ],
        }),
        i.jsxs("div", {
          children: [
            i.jsx("p", {
              className: "text-lg leading-8 text-muted",
              children:
                "Kabad Factory helps customers sell scrap online with current rates, doorstep pickup, saved addresses and order tracking. It is built for a cleaner city and a more convenient recycling experience.",
            }),
            i.jsxs("button", {
              onClick: () => e("/about"),
              className:
                "mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-white px-6 py-3 font-black text-brand-700 hover:border-brand-200 hover:bg-brand-50",
              children: ["Learn More ", i.jsx(Rs, { size: 17 })],
            }),
          ],
        }),
      ],
    }),
  });
}
function gb({ navigate: e }) {
  return i.jsx("section", {
    className: "container-page py-16",
    children: i.jsxs("div", {
      className:
        "relative isolate overflow-hidden rounded-card bg-brand-900 p-7 text-white shadow-soft md:p-10",
      children: [
        i.jsx("img", {
          src: B.assets.heroBanner,
          alt: "",
          className: "absolute inset-0 -z-20 h-full w-full object-cover",
          loading: "lazy",
        }),
        i.jsx("div", {
          className:
            "absolute inset-0 -z-10 bg-gradient-to-r from-brand-900 via-brand-900/92 to-brand-900/45",
        }),
        i.jsxs("div", {
          className: "max-w-3xl reveal-up",
          children: [
            i.jsx("p", {
              className:
                "text-sm font-black uppercase tracking-wide text-brand-100",
              children: "Bulk and business pickup",
            }),
            i.jsx("h2", {
              className: "mt-3 text-3xl font-black",
              children: "Office, commercial, and large scrap collection",
            }),
            i.jsx("p", {
              className: "mt-4 text-brand-100",
              children:
                "Plan bigger pickups with item-wise collection details, pickup charge visibility, and completion billing.",
            }),
            i.jsx("button", {
              onClick: () => e("/pickup-services"),
              className:
                "mt-6 rounded-full bg-white px-6 py-3 font-black text-brand-700",
              children: "Explore Services",
            }),
          ],
        }),
      ],
    }),
  });
}
function xb({ navigate: e }) {
  return i.jsx("section", {
    className: "container-page pb-16",
    children: i.jsxs("div", {
      className:
        "rounded-card border border-line bg-white p-7 text-center shadow-soft md:p-10",
      children: [
        i.jsx("h2", {
          className: "text-3xl font-black text-ink sm:text-4xl",
          children: "Ready to sell your scrap?",
        }),
        i.jsx("p", {
          className: "mx-auto mt-3 max-w-2xl text-muted",
          children:
            "Check pickup availability, compare current rates and schedule a convenient doorstep pickup.",
        }),
        i.jsxs("div", {
          className: "mt-7 flex flex-col justify-center gap-3 sm:flex-row",
          children: [
            i.jsx("button", {
              onClick: () => e("/schedule-pickup"),
              className:
                "rounded-full bg-brand-600 px-6 py-3 font-black text-white shadow-soft hover:bg-brand-700",
              children: "Schedule Pickup",
            }),
            i.jsx("button", {
              onClick: () => e("/scrap-rates"),
              className:
                "rounded-full border border-line bg-white px-6 py-3 font-black text-brand-700 hover:bg-brand-50",
              children: "Check Scrap Rates",
            }),
          ],
        }),
      ],
    }),
  });
}
function On({ plain: e = !1 }) {
  var l;
  const t =
    ((l = kl.find((a) => a.path === "/")) == null ? void 0 : l.faqs) || [];
  return i.jsxs("section", {
    className: e ? "" : "container-page py-14",
    children: [
      !e &&
        i.jsx(el, {
          eyebrow: "FAQ",
          title: "Questions customers ask before selling scrap",
          body: "Clear answers help search visibility and reduce support calls.",
        }),
      i.jsx("div", {
        className: "mt-8 grid gap-4 md:grid-cols-2",
        children: t.map((a) =>
          i.jsxs(
            "details",
            {
              className: "card p-5",
              children: [
                i.jsx("summary", {
                  className: "cursor-pointer text-base font-black text-ink",
                  children: a.question,
                }),
                i.jsx("p", {
                  className: "mt-3 text-sm leading-6 text-muted",
                  children: a.answer,
                }),
              ],
            },
            a.question,
          ),
        ),
      }),
    ],
  });
}
function kh({ route: e }) {
  return i.jsx("section", {
    className: "container-page grid gap-5 py-12 md:grid-cols-3",
    children: (e.sections || []).map((t) =>
      i.jsxs(
        "article",
        {
          className: "card p-5",
          children: [
            i.jsx("h2", {
              className: "text-xl font-black text-ink",
              children: t.title,
            }),
            i.jsx("p", {
              className: "mt-3 leading-7 text-muted",
              children: t.body,
            }),
          ],
        },
        t.title,
      ),
    ),
  });
}
function ac({ route: e, action: t, actionLabel: l }) {
  return i.jsx("section", {
    className: "bg-brand-50 py-16",
    children: i.jsxs("div", {
      className: "container-page",
      children: [
        i.jsx(Hs, { path: e.path }),
        i.jsx("h1", {
          className: "mt-5 max-w-4xl text-4xl font-black text-ink sm:text-5xl",
          children: e.h1 || e.label,
        }),
        i.jsx("p", {
          className: "mt-4 max-w-3xl text-lg leading-8 text-muted",
          children: e.intro || e.seo.description,
        }),
        t &&
          i.jsxs("button", {
            onClick: t,
            className:
              "mt-7 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 font-black text-white",
            children: [l || "Continue", " ", i.jsx(wn, { size: 18 })],
          }),
      ],
    }),
  });
}
function st({ title: e, subtitle: t, children: l }) {
  return i.jsxs(i.Fragment, {
    children: [
      i.jsx("section", {
        className: "bg-brand-50 py-14",
        children: i.jsxs("div", {
          className: "container-page",
          children: [
            i.jsx("h1", {
              className: "text-4xl font-black text-ink sm:text-5xl",
              children: e,
            }),
            i.jsx("p", {
              className: "mt-4 max-w-3xl text-lg leading-8 text-muted",
              children: t,
            }),
          ],
        }),
      }),
      i.jsx("section", { className: "container-page py-12", children: l }),
    ],
  });
}
function el({ eyebrow: e, title: t, body: l }) {
  return i.jsxs("div", {
    children: [
      i.jsx("p", {
        className: "text-sm font-black uppercase tracking-wide text-brand-700",
        children: e,
      }),
      i.jsx("h2", {
        className: "mt-2 text-3xl font-black text-ink sm:text-4xl",
        children: t,
      }),
      i.jsx("p", {
        className: "mt-3 max-w-3xl leading-7 text-muted",
        children: l,
      }),
    ],
  });
}
function Pe({ label: e, value: t, onChange: l, type: a = "text", error: n }) {
  return i.jsxs("label", {
    className: "mt-4 block",
    children: [
      i.jsx("span", { className: "text-sm font-bold text-ink", children: e }),
      i.jsx("input", {
        className: `focus-ring mt-2 min-h-12 w-full rounded-2xl border bg-white px-4 text-ink ${n ? "border-red-300" : "border-brand-100"}`,
        type: a,
        value: t,
        onChange: (u) => l(u.target.value),
      }),
      n &&
        i.jsx("span", {
          className: "mt-2 block text-sm font-bold text-red-700",
          children: n,
        }),
    ],
  });
}
function vb({
  draft: e,
  setDraft: t,
  errors: l,
  saving: a,
  onSave: n,
  onCancel: u,
}) {
  return i.jsxs("div", {
    className: "mt-5 rounded-2xl border border-brand-100 bg-brand-50 p-4",
    children: [
      i.jsxs("div", {
        className: "grid gap-x-4 sm:grid-cols-2",
        children: [
          i.jsx(Pe, {
            label: "Full Name",
            value: e.fullName,
            onChange: (c) => t((s) => ({ ...s, fullName: c })),
            error: l.fullName,
          }),
          i.jsx(Pe, {
            label: "Mobile",
            value: e.mobile,
            onChange: (c) =>
              t((s) => ({ ...s, mobile: c.replace(/\D/g, "").slice(0, 15) })),
            error: l.mobile,
          }),
          i.jsx(Pe, {
            label: "Address Line",
            value: e.line1,
            onChange: (c) => t((s) => ({ ...s, line1: c })),
            error: l.line1,
          }),
          i.jsx(Pe, {
            label: "Street / Locality",
            value: e.line2,
            onChange: (c) => t((s) => ({ ...s, line2: c })),
            error: l.line2,
          }),
          i.jsx(Pe, {
            label: "Landmark",
            value: e.landmark || "",
            onChange: (c) => t((s) => ({ ...s, landmark: c })),
            error: l.landmark,
          }),
          i.jsx(Pe, {
            label: "City",
            value: e.city,
            onChange: (c) => t((s) => ({ ...s, city: c })),
            error: l.city,
          }),
          i.jsx(Pe, {
            label: "State",
            value: e.state,
            onChange: (c) => t((s) => ({ ...s, state: c })),
            error: l.state,
          }),
          i.jsx(Pe, {
            label: "PIN Code",
            value: e.pincode,
            onChange: (c) =>
              t((s) => ({ ...s, pincode: c.replace(/\D/g, "").slice(0, 6) })),
            error: l.pincode,
          }),
        ],
      }),
      i.jsxs("div", {
        className: "mt-4",
        children: [
          i.jsx("span", {
            className: "text-sm font-bold text-ink",
            children: "Address Type",
          }),
          i.jsx("div", {
            className: "mt-2 flex flex-wrap gap-2",
            children: ["home", "office", "other"].map((c) =>
              i.jsx(
                "button",
                {
                  onClick: () => t((s) => ({ ...s, label: c })),
                  className: `rounded-full border px-4 py-2 text-sm font-black ${e.label === c ? "border-brand-600 bg-brand-600 text-white" : "border-brand-100 bg-white text-muted"}`,
                  children: Eh(c),
                },
                c,
              ),
            ),
          }),
        ],
      }),
      i.jsxs("label", {
        className: "mt-4 flex items-center gap-3 text-sm font-bold text-ink",
        children: [
          i.jsx("input", {
            type: "checkbox",
            checked: !!e.isDefault,
            onChange: (c) => t((s) => ({ ...s, isDefault: c.target.checked })),
            className: "h-5 w-5 accent-brand-600",
          }),
          "Set as Default",
        ],
      }),
      i.jsxs("div", {
        className: "mt-5 flex flex-col gap-3 sm:flex-row",
        children: [
          i.jsx("button", {
            onClick: n,
            disabled: a,
            className:
              "rounded-2xl bg-brand-600 px-5 py-3 font-black text-white disabled:opacity-60",
            children: a ? "Saving..." : "Save Address",
          }),
          i.jsx("button", {
            onClick: u,
            type: "button",
            className:
              "rounded-2xl border border-brand-100 bg-white px-5 py-3 font-black text-brand-700",
            children: "Cancel",
          }),
        ],
      }),
    ],
  });
}
function Vn({ icon: e, title: t, error: l }) {
  return i.jsxs("div", {
    children: [
      i.jsxs("div", {
        className: "flex items-center gap-3",
        children: [
          i.jsx("span", {
            className:
              "flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700",
            children: e,
          }),
          i.jsx("h2", {
            className: "text-xl font-black text-ink",
            children: t,
          }),
        ],
      }),
      l &&
        i.jsx("p", {
          className:
            "mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700",
          children: l,
        }),
    ],
  });
}
function Oa({ label: e, value: t, strong: l = !1 }) {
  return i.jsxs("div", {
    className:
      "flex items-start justify-between gap-4 border-b border-brand-50 pb-3 last:border-b-0",
    children: [
      i.jsx("span", { className: "text-muted", children: e }),
      i.jsx("span", {
        className: `max-w-[58%] text-right ${l ? "text-lg font-black text-brand-700" : "font-bold text-ink"}`,
        children: t,
      }),
    ],
  });
}
function Hs({ path: e }) {
  const t = e.split("/").filter(Boolean);
  return i.jsxs("nav", {
    className: "flex flex-wrap gap-2 text-sm font-bold text-muted",
    "aria-label": "Breadcrumb",
    children: [
      i.jsx("a", { href: "/", className: "text-brand-700", children: "Home" }),
      t.map((l, a) =>
        i.jsxs("span", { children: ["/ ", l.replace(/-/g, " ")] }, a),
      ),
    ],
  });
}
function Sb({ navigate: e }) {
  const t = [
    "/about",
    "/pickup-services",
    "/scrap-rates",
    "/how-it-works",
    "/contact",
    "/blog",
    "/gwalior",
    "/privacy-policy",
    "/terms",
  ];
  return i.jsx("footer", {
    className: "border-t border-line bg-white py-12",
    children: i.jsxs("div", {
      className: "container-page grid gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]",
      children: [
        i.jsxs("div", {
          children: [
            i.jsx("img", {
              src: B.assets.logo,
              alt: "Kabad Factory",
              className: "h-16 w-48 object-contain object-left",
            }),
            i.jsx("p", {
              className: "mt-4 max-w-md text-muted",
              children:
                "Sell scrap online from home with doorstep pickup, transparent rates, saved addresses and order tracking.",
            }),
            i.jsx("p", {
              className: "mt-4 text-sm font-bold text-ink",
              children: B.address,
            }),
            i.jsx("p", { className: "text-sm text-muted", children: B.hours }),
          ],
        }),
        i.jsxs("div", {
          children: [
            i.jsx("h3", {
              className: "font-black text-ink",
              children: "Quick Links",
            }),
            i.jsx("div", {
              className: "mt-3 grid gap-2",
              children: t.map((l) =>
                i.jsx(
                  "a",
                  {
                    href: l,
                    onClick: (a) => Dt(a, l, e),
                    className:
                      "text-sm font-semibold text-muted hover:text-brand-700",
                    children: Ab(l),
                  },
                  l,
                ),
              ),
            }),
          ],
        }),
        i.jsxs("div", {
          children: [
            i.jsx("h3", {
              className: "font-black text-ink",
              children: "Contact",
            }),
            i.jsxs("a", {
              className:
                "mt-3 flex items-center gap-2 text-sm font-bold text-brand-700",
              href: `tel:${B.phonePlain}`,
              children: [i.jsx(H0, { size: 16 }), " ", B.phone],
            }),
            i.jsx("a", {
              className: "mt-2 block text-sm font-semibold text-muted",
              href: `mailto:${B.email}`,
              children: B.email,
            }),
            i.jsxs("a", {
              className:
                "mt-4 inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-black text-white",
              href: B.appDownloadUrl,
              children: [i.jsx(Mn, { size: 16 }), " Download App"],
            }),
          ],
        }),
      ],
    }),
  });
}
function jb({ navigate: e }) {
  return i.jsx(st, {
    title: "Page not found",
    subtitle: "The page you opened does not exist.",
    children: i.jsx("button", {
      className: "rounded-full bg-brand-600 px-5 py-3 font-black text-white",
      onClick: () => e("/"),
      children: "Go Home",
    }),
  });
}
function Ah({ message: e, onRetry: t }) {
  return i.jsxs("div", {
    className:
      "mb-5 rounded-2xl border border-red-100 bg-red-50 p-4 text-red-700",
    children: [
      i.jsx("p", { className: "font-bold", children: e }),
      i.jsx("button", {
        onClick: t,
        className:
          "mt-3 rounded-full bg-red-700 px-4 py-2 text-sm font-bold text-white",
        children: "Retry",
      }),
    ],
  });
}
function qs() {
  const [e, t] = z.useState([]),
    [l, a] = z.useState(!1),
    [n, u] = z.useState("");
  function c() {
    (a(!0),
      u(""),
      St("/categories")
        .then((s) => t(s.data || []))
        .catch((s) =>
          u(s instanceof Error ? s.message : "Could not load scrap rates."),
        )
        .finally(() => a(!1)));
  }
  return (
    z.useEffect(() => {
      c();
    }, []),
    { categories: e, loading: l, error: n, reload: c }
  );
}
function Dt(e, t, l) {
  t.startsWith("http") || (e.preventDefault(), l(t));
}
function bf() {
  return typeof window > "u"
    ? "/"
    : `${window.location.pathname}${window.location.search}`;
}
function Th(e) {
  return e.split("?")[0] || "/";
}
function yf(e, t) {
  const l = e.split("?")[1] || "";
  return new URLSearchParams(l).get(t);
}
function Nb(e) {
  if (!e) return "";
  try {
    const t = decodeURIComponent(e);
    return !t.startsWith("/") || t.startsWith("//")
      ? ""
      : kl.some((l) => l.path === Th(t))
        ? t
        : "";
  } catch {
    return "";
  }
}
function kb(e, t) {
  const l = e === "register" ? "/login" : "/register";
  return t ? `${l}?next=${encodeURIComponent(t)}` : l;
}
function sl(e) {
  return !!(e && typeof e == "object" && "name" in e);
}
function Bs(e) {
  return `₹${Number(e.price || 0).toFixed(0)}/${e.unit || "kg"}`;
}
function Ab(e) {
  return e === "/"
    ? "Home"
    : e
        .split("/")
        .filter(Boolean)
        .pop()
        .replace(/-/g, " ")
        .replace(/\b\w/g, (t) => t.toUpperCase());
}
function Tb(e) {
  return e === "0-10 kg"
    ? 10
    : e === "10-30 kg"
      ? 30
      : e === "30-50 kg"
        ? 50
        : e === "50-200 kg"
          ? 200
          : 250;
}
function Eb(e) {
  const t = {};
  return (
    e.selected.length || (t.items = "Please select at least one scrap item."),
    e.weightRange || (t.weightRange = "Please select the estimated weight."),
    e.selectedAddressId ||
      (t.address = "Please select a saved pickup address."),
    e.pickupDate || (t.pickupDate = "Please select a pickup date."),
    e.timeSlot || (t.timeSlot = "Please select a time slot."),
    t
  );
}
function zb(e) {
  const t = {};
  return (
    e.fullName.trim() || (t.fullName = "Full name is required."),
    e.mobile.trim()
      ? /^\d{10,15}$/.test(e.mobile.replace(/\D/g, "")) ||
        (t.mobile = "Please enter a valid mobile number.")
      : (t.mobile = "Mobile number is required."),
    e.line1.trim() || (t.line1 = "House, flat, or building is required."),
    e.line2.trim() || (t.line2 = "Street or locality is required."),
    e.city.trim() || (t.city = "City is required."),
    e.state.trim() || (t.state = "State is required."),
    e.pincode.trim()
      ? /^[0-9A-Za-z -]{4,12}$/.test(e.pincode.trim()) ||
        (t.pincode = "Please enter a valid PIN code.")
      : (t.pincode = "PIN code is required."),
    e.label || (t.label = "Address type is required."),
    t
  );
}
function wb(e) {
  return {
    fullName: Dl(e.fullName),
    mobile: e.mobile.replace(/\D/g, ""),
    label: e.label,
    line1: Dl(e.line1),
    line2: Dl(e.line2),
    landmark: Dl(e.landmark || ""),
    city: Dl(e.city),
    state: Dl(e.state),
    pincode: String(e.pincode || "")
      .replace(/\s+/g, "")
      .toUpperCase(),
    isDefault: !!e.isDefault,
  };
}
function gf(e) {
  var a;
  const t =
      ((a = e == null ? void 0 : e.details) == null ? void 0 : a.fieldErrors) ||
      {},
    l = {};
  return (
    Object.entries(t).forEach(([n, u]) => {
      l[n] = Array.isArray(u) ? String(u[0]) : String(u);
    }),
    l
  );
}
function Mb(e, t) {
  return e === 0
    ? t.selected.length > 0
    : e === 1
      ? !!t.weightRange
      : e === 2
        ? !!t.selectedAddressId
        : e === 3
          ? t.pickupCharge !== null || !!t.selectedAddressId
          : e === 4
            ? !!(t.pickupDate && t.timeSlot)
            : !!(
                t.selected.length &&
                t.weightRange &&
                t.selectedAddressId &&
                t.pickupDate &&
                t.timeSlot
              );
}
function Ob(e) {
  const t = new Intl.DateTimeFormat("en-IN", { weekday: "short" }),
    l = new Intl.DateTimeFormat("en-IN", { month: "short" });
  return Array.from({ length: e }, (a, n) => {
    const u = new Date();
    return (
      u.setDate(u.getDate() + n),
      {
        value: Db(u),
        day: t.format(u),
        date: String(u.getDate()),
        month: l.format(u),
        isToday: n === 0,
      }
    );
  });
}
function Db(e) {
  const t = e.getFullYear(),
    l = String(e.getMonth() + 1).padStart(2, "0"),
    a = String(e.getDate()).padStart(2, "0");
  return `${t}-${l}-${a}`;
}
function _b(e) {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(new Date(`${e}T00:00:00`));
}
function Rb(e) {
  return [e.line1, e.line2, e.landmark, e.city, e.state, `PIN: ${e.pincode}`]
    .filter(Boolean)
    .join(", ");
}
function Eh(e = "") {
  return String(e)
    .split("_")
    .map((t) => t.charAt(0).toUpperCase() + t.slice(1))
    .join(" ");
}
function Dl(e) {
  return String(e || "")
    .trim()
    .replace(/\s+/g, " ");
}
function Cb() {
  return i.jsx("span", {
    className: "h-2 w-2 rounded-full bg-brand-600",
    "aria-hidden": !0,
  });
}
const Ub = {
  path: "/404",
  label: "404",
  kind: "notFound",
  seo: {
    title: "Page Not Found | Kabad Factory",
    description: "This Kabad Factory page was not found.",
    canonical: "/404",
    noindex: !0,
  },
};
var xf;
if (typeof window < "u") {
  const e = kl.find((t) => t.path === window.location.pathname);
  e &&
    ((document.title = e.seo.title),
    (xf = document.querySelector("link[rel='canonical']")) == null ||
      xf.setAttribute("href", J0(e.seo.canonical)));
}
k0.hydrateRoot(document.getElementById("root"), i.jsx(W0, {}));
