!(function(e) {
  function t(r) {
    if (n[r]) return n[r].exports;
    var o = (n[r] = { i: r, l: !1, exports: {} });
    return e[r].call(o.exports, o, o.exports, t), (o.l = !0), o.exports;
  }
  var n = {};
  (t.m = e),
    (t.c = n),
    (t.d = function(e, n, r) {
      t.o(e, n) ||
        Object.defineProperty(e, n, {
          configurable: !1,
          enumerable: !0,
          get: r
        });
    }),
    (t.n = function(e) {
      var n =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return t.d(n, "a", n), n;
    }),
    (t.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (t.p = "/"),
    t((t.s = "9ka1"));
})({
  "9ka1": function(e, t, n) {
    "use strict";
    var r = n("EBst");
    "serviceWorker" in navigator &&
      "https:" === location.protocol &&
      navigator.serviceWorker.register(n.p + "sw.js");
    var o = function(e) {
      return e && e.default ? e.default : e;
    };
    if ("function" == typeof o(n("JkW7"))) {
      var i = document.body.firstElementChild,
        s = function() {
          var e = o(n("JkW7"));
          i = (0, r.render)((0, r.h)(e), document.body, i);
        };
      s();
    }
  },
  EBst: function(e) {
    "use strict";
    var t =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function(e) {
            return typeof e;
          }
        : function(e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          };
    !(function() {
      function n() {}
      function r(e, t) {
        var r,
          o,
          i,
          s,
          a = A;
        for (s = arguments.length; s-- > 2; ) U.push(arguments[s]);
        for (
          t &&
          null != t.children &&
          (U.length || U.push(t.children), delete t.children);
          U.length;

        )
          if ((o = U.pop()) && void 0 !== o.pop)
            for (s = o.length; s--; ) U.push(o[s]);
          else
            "boolean" == typeof o && (o = null),
              (i = "function" != typeof e) &&
                (null == o
                  ? (o = "")
                  : "number" == typeof o
                    ? (o += "")
                    : "string" != typeof o && (i = !1)),
              i && r ? (a[a.length - 1] += o) : a === A ? (a = [o]) : a.push(o),
              (r = i);
        var l = new n();
        return (
          (l.nodeName = e),
          (l.children = a),
          (l.attributes = null == t ? void 0 : t),
          (l.key = null == t ? void 0 : t.key),
          void 0 !== R.vnode && R.vnode(l),
          l
        );
      }
      function o(e, t) {
        for (var n in t) e[n] = t[n];
        return e;
      }
      function i(e, t) {
        return r(
          e.nodeName,
          o(o({}, e.attributes), t),
          arguments.length > 2 ? [].slice.call(arguments, 2) : e.children
        );
      }
      function s(e) {
        !e.__d &&
          (e.__d = !0) &&
          1 == M.push(e) &&
          (R.debounceRendering || E)(a);
      }
      function a() {
        var e,
          t = M;
        for (M = []; (e = t.pop()); ) e.__d && T(e);
      }
      function l(e, t, n) {
        return "string" == typeof t || "number" == typeof t
          ? void 0 !== e.splitText
          : "string" == typeof t.nodeName
            ? !e._componentConstructor && u(e, t.nodeName)
            : n || e._componentConstructor === t.nodeName;
      }
      function u(e, t) {
        return e.__n === t || e.nodeName.toLowerCase() === t.toLowerCase();
      }
      function c(e) {
        var t = o({}, e.attributes);
        t.children = e.children;
        var n = e.nodeName.defaultProps;
        if (void 0 !== n) for (var r in n) void 0 === t[r] && (t[r] = n[r]);
        return t;
      }
      function p(e, t) {
        var n = t
          ? document.createElementNS("http://www.w3.org/2000/svg", e)
          : document.createElement(e);
        return (n.__n = e), n;
      }
      function f(e) {
        var t = e.parentNode;
        t && t.removeChild(e);
      }
      function d(e, n, r, o, i) {
        if (("className" === n && (n = "class"), "key" === n));
        else if ("ref" === n) r && r(null), o && o(e);
        else if ("class" !== n || i)
          if ("style" === n) {
            if (
              ((o && "string" != typeof o && "string" != typeof r) ||
                (e.style.cssText = o || ""),
              o && "object" == (void 0 === o ? "undefined" : t(o)))
            ) {
              if ("string" != typeof r)
                for (var s in r) s in o || (e.style[s] = "");
              for (var s in o)
                e.style[s] =
                  "number" == typeof o[s] && !1 === L.test(s)
                    ? o[s] + "px"
                    : o[s];
            }
          } else if ("dangerouslySetInnerHTML" === n)
            o && (e.innerHTML = o.__html || "");
          else if ("o" == n[0] && "n" == n[1]) {
            var a = n !== (n = n.replace(/Capture$/, ""));
            (n = n.toLowerCase().substring(2)),
              o
                ? r || e.addEventListener(n, h, a)
                : e.removeEventListener(n, h, a),
              ((e.__l || (e.__l = {}))[n] = o);
          } else if ("list" !== n && "type" !== n && !i && n in e)
            _(e, n, null == o ? "" : o),
              (null != o && !1 !== o) || e.removeAttribute(n);
          else {
            var l = i && n !== (n = n.replace(/^xlink:?/, ""));
            null == o || !1 === o
              ? l
                ? e.removeAttributeNS(
                    "http://www.w3.org/1999/xlink",
                    n.toLowerCase()
                  )
                : e.removeAttribute(n)
              : "function" != typeof o &&
                (l
                  ? e.setAttributeNS(
                      "http://www.w3.org/1999/xlink",
                      n.toLowerCase(),
                      o
                    )
                  : e.setAttribute(n, o));
          }
        else e.className = o || "";
      }
      function _(e, t, n) {
        try {
          e[t] = n;
        } catch (e) {}
      }
      function h(e) {
        return this.__l[e.type]((R.event && R.event(e)) || e);
      }
      function v() {
        for (var e; (e = B.pop()); )
          R.afterMount && R.afterMount(e),
            e.componentDidMount && e.componentDidMount();
      }
      function m(e, t, n, r, o, i) {
        V++ ||
          ((D = null != o && void 0 !== o.ownerSVGElement),
          (H = null != e && !("__preactattr_" in e)));
        var s = y(e, t, n, r, i);
        return (
          o && s.parentNode !== o && o.appendChild(s),
          --V || ((H = !1), i || v()),
          s
        );
      }
      function y(e, t, n, r, o) {
        var i = e,
          s = D;
        if (
          ((null != t && "boolean" != typeof t) || (t = ""),
          "string" == typeof t || "number" == typeof t)
        )
          return (
            e && void 0 !== e.splitText && e.parentNode && (!e._component || o)
              ? e.nodeValue != t && (e.nodeValue = t)
              : ((i = document.createTextNode(t)),
                e &&
                  (e.parentNode && e.parentNode.replaceChild(i, e), g(e, !0))),
            (i.__preactattr_ = !0),
            i
          );
        var a = t.nodeName;
        if ("function" == typeof a) return P(e, t, n, r);
        if (
          ((D = "svg" === a || ("foreignObject" !== a && D)),
          (a += ""),
          (!e || !u(e, a)) && ((i = p(a, D)), e))
        ) {
          for (; e.firstChild; ) i.appendChild(e.firstChild);
          e.parentNode && e.parentNode.replaceChild(i, e), g(e, !0);
        }
        var l = i.firstChild,
          c = i.__preactattr_,
          f = t.children;
        if (null == c) {
          c = i.__preactattr_ = {};
          for (var d = i.attributes, _ = d.length; _--; )
            c[d[_].name] = d[_].value;
        }
        return (
          !H &&
          f &&
          1 === f.length &&
          "string" == typeof f[0] &&
          null != l &&
          void 0 !== l.splitText &&
          null == l.nextSibling
            ? l.nodeValue != f[0] && (l.nodeValue = f[0])
            : ((f && f.length) || null != l) &&
              b(i, f, n, r, H || null != c.dangerouslySetInnerHTML),
          w(i, t.attributes, c),
          (D = s),
          i
        );
      }
      function b(e, t, n, r, o) {
        var i,
          s,
          a,
          u,
          c,
          p = e.childNodes,
          d = [],
          _ = {},
          h = 0,
          v = 0,
          m = p.length,
          b = 0,
          k = t ? t.length : 0;
        if (0 !== m)
          for (var w = 0; w < m; w++) {
            var x = p[w],
              C = x.__preactattr_,
              N = k && C ? (x._component ? x._component.__k : C.key) : null;
            null != N
              ? (h++, (_[N] = x))
              : (C ||
                  (void 0 !== x.splitText ? !o || x.nodeValue.trim() : o)) &&
                (d[b++] = x);
          }
        if (0 !== k)
          for (var w = 0; w < k; w++) {
            (u = t[w]), (c = null);
            var N = u.key;
            if (null != N)
              h && void 0 !== _[N] && ((c = _[N]), (_[N] = void 0), h--);
            else if (!c && v < b)
              for (i = v; i < b; i++)
                if (void 0 !== d[i] && l((s = d[i]), u, o)) {
                  (c = s), (d[i] = void 0), i === b - 1 && b--, i === v && v++;
                  break;
                }
            (c = y(c, u, n, r)),
              (a = p[w]),
              c &&
                c !== e &&
                c !== a &&
                (null == a
                  ? e.appendChild(c)
                  : c === a.nextSibling
                    ? f(a)
                    : e.insertBefore(c, a));
          }
        if (h) for (var w in _) void 0 !== _[w] && g(_[w], !1);
        for (; v <= b; ) void 0 !== (c = d[b--]) && g(c, !1);
      }
      function g(e, t) {
        var n = e._component;
        n
          ? j(n)
          : (null != e.__preactattr_ &&
              e.__preactattr_.ref &&
              e.__preactattr_.ref(null),
            (!1 !== t && null != e.__preactattr_) || f(e),
            k(e));
      }
      function k(e) {
        for (e = e.lastChild; e; ) {
          var t = e.previousSibling;
          g(e, !0), (e = t);
        }
      }
      function w(e, t, n) {
        var r;
        for (r in n)
          (t && null != t[r]) ||
            null == n[r] ||
            d(e, r, n[r], (n[r] = void 0), D);
        for (r in t)
          "children" === r ||
            "innerHTML" === r ||
            (r in n &&
              t[r] === ("value" === r || "checked" === r ? e[r] : n[r])) ||
            d(e, r, n[r], (n[r] = t[r]), D);
      }
      function x(e) {
        var t = e.constructor.name;
        (G[t] || (G[t] = [])).push(e);
      }
      function C(e, t, n) {
        var r,
          o = G[e.name];
        if (
          (e.prototype && e.prototype.render
            ? ((r = new e(t, n)), W.call(r, t, n))
            : ((r = new W(t, n)), (r.constructor = e), (r.render = N)),
          o)
        )
          for (var i = o.length; i--; )
            if (o[i].constructor === e) {
              (r.__b = o[i].__b), o.splice(i, 1);
              break;
            }
        return r;
      }
      function N(e, t, n) {
        return this.constructor(e, n);
      }
      function S(e, t, n, r, o) {
        e.__x ||
          ((e.__x = !0),
          (e.__r = t.ref) && delete t.ref,
          (e.__k = t.key) && delete t.key,
          !e.base || o
            ? e.componentWillMount && e.componentWillMount()
            : e.componentWillReceiveProps && e.componentWillReceiveProps(t, r),
          r &&
            r !== e.context &&
            (e.__c || (e.__c = e.context), (e.context = r)),
          e.__p || (e.__p = e.props),
          (e.props = t),
          (e.__x = !1),
          0 !== n &&
            (1 !== n && !1 === R.syncComponentUpdates && e.base
              ? s(e)
              : T(e, 1, o)),
          e.__r && e.__r(e));
      }
      function T(e, t, n, r) {
        if (!e.__x) {
          var i,
            s,
            a,
            l = e.props,
            u = e.state,
            p = e.context,
            f = e.__p || l,
            d = e.__s || u,
            _ = e.__c || p,
            h = e.base,
            y = e.__b,
            b = h || y,
            k = e._component,
            w = !1;
          if (
            (h &&
              ((e.props = f),
              (e.state = d),
              (e.context = _),
              2 !== t &&
              e.shouldComponentUpdate &&
              !1 === e.shouldComponentUpdate(l, u, p)
                ? (w = !0)
                : e.componentWillUpdate && e.componentWillUpdate(l, u, p),
              (e.props = l),
              (e.state = u),
              (e.context = p)),
            (e.__p = e.__s = e.__c = e.__b = null),
            (e.__d = !1),
            !w)
          ) {
            (i = e.render(l, u, p)),
              e.getChildContext && (p = o(o({}, p), e.getChildContext()));
            var x,
              N,
              P = i && i.nodeName;
            if ("function" == typeof P) {
              var W = c(i);
              (s = k),
                s && s.constructor === P && W.key == s.__k
                  ? S(s, W, 1, p, !1)
                  : ((x = s),
                    (e._component = s = C(P, W, p)),
                    (s.__b = s.__b || y),
                    (s.__u = e),
                    S(s, W, 0, p, !1),
                    T(s, 1, n, !0)),
                (N = s.base);
            } else
              (a = b),
                (x = k),
                x && (a = e._component = null),
                (b || 1 === t) &&
                  (a && (a._component = null),
                  (N = m(a, i, p, n || !h, b && b.parentNode, !0)));
            if (b && N !== b && s !== k) {
              var O = b.parentNode;
              O &&
                N !== O &&
                (O.replaceChild(N, b), x || ((b._component = null), g(b, !1)));
            }
            if ((x && j(x), (e.base = N), N && !r)) {
              for (var U = e, A = e; (A = A.__u); ) (U = A).base = N;
              (N._component = U), (N._componentConstructor = U.constructor);
            }
          }
          if (
            (!h || n
              ? B.unshift(e)
              : w ||
                (e.componentDidUpdate && e.componentDidUpdate(f, d, _),
                R.afterUpdate && R.afterUpdate(e)),
            null != e.__h)
          )
            for (; e.__h.length; ) e.__h.pop().call(e);
          V || r || v();
        }
      }
      function P(e, t, n, r) {
        for (
          var o = e && e._component,
            i = o,
            s = e,
            a = o && e._componentConstructor === t.nodeName,
            l = a,
            u = c(t);
          o && !l && (o = o.__u);

        )
          l = o.constructor === t.nodeName;
        return (
          o && l && (!r || o._component)
            ? (S(o, u, 3, n, r), (e = o.base))
            : (i && !a && (j(i), (e = s = null)),
              (o = C(t.nodeName, u, n)),
              e && !o.__b && ((o.__b = e), (s = null)),
              S(o, u, 1, n, r),
              (e = o.base),
              s && e !== s && ((s._component = null), g(s, !1))),
          e
        );
      }
      function j(e) {
        R.beforeUnmount && R.beforeUnmount(e);
        var t = e.base;
        (e.__x = !0),
          e.componentWillUnmount && e.componentWillUnmount(),
          (e.base = null);
        var n = e._component;
        n
          ? j(n)
          : t &&
            (t.__preactattr_ &&
              t.__preactattr_.ref &&
              t.__preactattr_.ref(null),
            (e.__b = t),
            f(t),
            x(e),
            k(t)),
          e.__r && e.__r(null);
      }
      function W(e, t) {
        (this.__d = !0),
          (this.context = t),
          (this.props = e),
          (this.state = this.state || {});
      }
      function O(e, t, n) {
        return m(n, e, {}, !1, t, !1);
      }
      var R = {},
        U = [],
        A = [],
        E =
          "function" == typeof Promise
            ? Promise.resolve().then.bind(Promise.resolve())
            : setTimeout,
        L = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
        M = [],
        B = [],
        V = 0,
        D = !1,
        H = !1,
        G = {};
      o(W.prototype, {
        setState: function(e, t) {
          var n = this.state;
          this.__s || (this.__s = o({}, n)),
            o(n, "function" == typeof e ? e(n, this.props) : e),
            t && (this.__h = this.__h || []).push(t),
            s(this);
        },
        forceUpdate: function(e) {
          e && (this.__h = this.__h || []).push(e), T(this, 2);
        },
        render: function() {}
      });
      var J = {
        h: r,
        createElement: r,
        cloneElement: i,
        Component: W,
        render: O,
        rerender: a,
        options: R
      };
      e.exports = J;
    })();
  },
  FWi5: function() {},
  JkW7: function(e, t, n) {
    "use strict";
    function r(e) {
      if (Array.isArray(e)) {
        for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
        return n;
      }
      return Array.from(e);
    }
    function o(e) {
      return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, n) {
          function r(o, i) {
            try {
              var s = t[o](i),
                a = s.value;
            } catch (e) {
              return void n(e);
            }
            if (!s.done)
              return Promise.resolve(a).then(
                function(e) {
                  r("next", e);
                },
                function(e) {
                  r("throw", e);
                }
              );
            e(a);
          }
          return r("next");
        });
      };
    }
    function i(e, t) {
      if (!e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
    }
    function s(e, t) {
      if ("function" != typeof t && null !== t)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof t
        );
      (e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      })),
        t &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(e, t)
            : (e.__proto__ = t));
    }
    Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
    var a = (function() {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              "value" in r && (r.writable = !0),
              Object.defineProperty(e, r.key, r);
          }
        }
        return function(t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t;
        };
      })(),
      l = n("EBst");
    n("FWi5");
    var u = (0, l.h)(
      "div",
      { class: "buttons" },
      (0, l.h)("span", { class: "message" }, "Waiting to your opponent to play")
    );
    t.default = (function(e) {
      function t() {
        for (
          var e, n, r, o, s = arguments.length, a = Array(s), l = 0;
          l < s;
          l++
        )
          a[l] = arguments[l];
        return (
          (n = r = i(
            this,
            (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(
              e,
              [this].concat(a)
            )
          )),
          (r.state = {
            tiles: [3, 5, 7],
            start: !1,
            turn: !1,
            played: !1,
            end: !1,
            result: null,
            selectedColumn: -1,
            selectedTiles: []
          }),
          (o = n),
          i(r, o)
        );
      }
      return (
        s(t, e),
        a(t, [
          {
            key: "componentDidMount",
            value: (function() {
              function e() {
                return t.apply(this, arguments);
              }
              var t = o(
                regeneratorRuntime.mark(function e() {
                  var t, n;
                  return regeneratorRuntime.wrap(
                    function(e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              (e.prev = 0),
                              (e.next = 3),
                              fetch("/validate", {
                                method: "post",
                                headers: {
                                  "content-type": "application/json",
                                  accept: "application/json"
                                },
                                credentials: "same-origin"
                              })
                            );
                          case 3:
                            return (t = e.sent), (e.next = 6), t.json();
                          case 6:
                            (n = e.sent),
                              n.allowConnection && this.establishGameLink(),
                              (e.next = 13);
                            break;
                          case 10:
                            throw ((e.prev = 10), (e.t0 = e.catch(0)));
                          case 13:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this,
                    [[0, 10]]
                  );
                })
              );
              return e;
            })()
          },
          {
            key: "establishGameLink",
            value: (function() {
              function e() {
                return t.apply(this, arguments);
              }
              var t = o(
                regeneratorRuntime.mark(function e() {
                  var t = this;
                  return regeneratorRuntime.wrap(
                    function(e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            (this.socket = io()),
                              this.socket.on("turn", function(e) {
                                t.setState({
                                  tiles: e.tiles,
                                  turn: !0,
                                  played: !1
                                });
                              }),
                              this.socket.on("start", function(e) {
                                t.setState({
                                  turn: e.turn,
                                  tiles: e.tiles,
                                  start: !0
                                });
                              }),
                              this.socket.on("end", function(e) {
                                t.setState({ result: e.result, end: !0 }),
                                  t.updatePlayerSession();
                              }),
                              this.socket.on(
                                "disconnect",
                                (function() {
                                  var e = o(
                                    regeneratorRuntime.mark(function e() {
                                      return regeneratorRuntime.wrap(
                                        function(e) {
                                          for (;;)
                                            switch ((e.prev = e.next)) {
                                              case 0:
                                                return (
                                                  (e.next = 2),
                                                  fetch("/sanitize", {
                                                    method: "post",
                                                    headers: {
                                                      "content-type":
                                                        "application/json",
                                                      accept: "application/json"
                                                    },
                                                    credentials: "same-origin"
                                                  })
                                                );
                                              case 2:
                                                window.location.reload();
                                              case 3:
                                              case "end":
                                                return e.stop();
                                            }
                                        },
                                        e,
                                        t
                                      );
                                    })
                                  );
                                  return function() {
                                    return e.apply(this, arguments);
                                  };
                                })()
                              );
                          case 5:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this
                  );
                })
              );
              return e;
            })()
          },
          {
            key: "renderTiles",
            value: function(e, t) {
              var n = this,
                r = this.state.selectedColumn,
                o = this.state.turn && (-1 === r || r === t);
              return (0, l.h)(
                "div",
                { className: "tileColumn " + (r === t ? "selected" : "") },
                Array.from(Array(e)).map(function(e, i) {
                  return (0, l.h)("span", {
                    className:
                      r === t && n.state.selectedTiles.includes(i)
                        ? "selected"
                        : "",
                    onClick: o
                      ? function(e) {
                          return n.tileSelected(i, t, e);
                        }
                      : null
                  });
                })
              );
            }
          },
          {
            key: "tileSelected",
            value: function(e, t) {
              if (
                t === this.state.selectedColumn &&
                this.state.selectedTiles.includes(e)
              ) {
                var n = this.state.selectedTiles.filter(function(t) {
                  return t !== e;
                });
                this.setState({ selectedTiles: n }),
                  n.length || this.setState({ selectedColumn: -1 });
              } else
                this.setState({
                  selectedColumn: t,
                  selectedTiles: [].concat(r(this.state.selectedTiles), [e])
                });
            }
          },
          {
            key: "renderButtons",
            value: function() {
              var e = this;
              return this.state.turn
                ? (0, l.h)(
                    "div",
                    { class: "buttons" },
                    (0, l.h)("input", {
                      type: "button",
                      value: "Submit",
                      disabled: !this.state.selectedTiles.length,
                      onClick: function(t) {
                        return e.turnPlayed(t);
                      }
                    }),
                    (0, l.h)("input", {
                      type: "button",
                      value: "Clear",
                      onClick: function() {
                        return e.turnReset();
                      }
                    })
                  )
                : u;
            }
          },
          {
            key: "updatePlayerSession",
            value: (function() {
              function e() {
                return t.apply(this, arguments);
              }
              var t = o(
                regeneratorRuntime.mark(function e() {
                  var t = this;
                  return regeneratorRuntime.wrap(
                    function(e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              (e.prev = 0),
                              (e.next = 3),
                              fetch("/complete", {
                                method: "post",
                                headers: {
                                  "content-type": "application/json",
                                  accept: "application/json"
                                },
                                credentials: "same-origin"
                              })
                            );
                          case 3:
                            setTimeout(function() {
                              return t.socket.disconnect();
                            }, 3e3),
                              (e.next = 9);
                            break;
                          case 6:
                            throw ((e.prev = 6), (e.t0 = e.catch(0)));
                          case 9:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this,
                    [[0, 6]]
                  );
                })
              );
              return e;
            })()
          },
          {
            key: "turnPlayed",
            value: function() {
              var e = this.state,
                t = e.tiles;
              t[e.selectedColumn] -= e.selectedTiles.length;
              var n = [].concat(r(t));
              this.socket.emit("play", { tiles: n }),
                this.setState({ played: !0, turn: !1, tiles: n }),
                this.turnReset();
            }
          },
          {
            key: "turnReset",
            value: function() {
              this.setState({
                played: !1,
                selectedColumn: -1,
                selectedTiles: []
              });
            }
          },
          {
            key: "render",
            value: function() {
              var e = this,
                t = this.state.tiles;
              return (0, l.h)(
                "div",
                { className: "gamecontainer" },
                !this.state.start || this.state.end
                  ? (0, l.h)(
                      "div",
                      { class: "overlay" },
                      this.state.end
                        ? this.state.result
                          ? "Congratulations! You WON!"
                          : "Oops... You lost. Please try again."
                        : "Awaiting a worthy opponent..."
                    )
                  : null,
                t.map(function(t, n) {
                  return e.renderTiles(t, n);
                }),
                this.renderButtons()
              );
            }
          }
        ]),
        t
      );
    })(l.Component);
  }
});
//# sourceMappingURL=bundle.76c53.js.map
