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
    t((t.s = "uXl7"));
})({
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
          a,
          s = U;
        for (a = arguments.length; a-- > 2; ) A.push(arguments[a]);
        for (
          t &&
          null != t.children &&
          (A.length || A.push(t.children), delete t.children);
          A.length;

        )
          if ((o = A.pop()) && void 0 !== o.pop)
            for (a = o.length; a--; ) A.push(o[a]);
          else
            "boolean" == typeof o && (o = null),
              (i = "function" != typeof e) &&
                (null == o
                  ? (o = "")
                  : "number" == typeof o
                    ? (o += "")
                    : "string" != typeof o && (i = !1)),
              i && r ? (s[s.length - 1] += o) : s === U ? (s = [o]) : s.push(o),
              (r = i);
        var u = new n();
        return (
          (u.nodeName = e),
          (u.children = s),
          (u.attributes = null == t ? void 0 : t),
          (u.key = null == t ? void 0 : t.key),
          void 0 !== O.vnode && O.vnode(u),
          u
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
      function a(e) {
        !e.__d &&
          (e.__d = !0) &&
          1 == M.push(e) &&
          (O.debounceRendering || E)(s);
      }
      function s() {
        var e,
          t = M;
        for (M = []; (e = t.pop()); ) e.__d && S(e);
      }
      function u(e, t, n) {
        return "string" == typeof t || "number" == typeof t
          ? void 0 !== e.splitText
          : "string" == typeof t.nodeName
            ? !e._componentConstructor && l(e, t.nodeName)
            : n || e._componentConstructor === t.nodeName;
      }
      function l(e, t) {
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
                for (var a in r) a in o || (e.style[a] = "");
              for (var a in o)
                e.style[a] =
                  "number" == typeof o[a] && !1 === L.test(a)
                    ? o[a] + "px"
                    : o[a];
            }
          } else if ("dangerouslySetInnerHTML" === n)
            o && (e.innerHTML = o.__html || "");
          else if ("o" == n[0] && "n" == n[1]) {
            var s = n !== (n = n.replace(/Capture$/, ""));
            (n = n.toLowerCase().substring(2)),
              o
                ? r || e.addEventListener(n, _, s)
                : e.removeEventListener(n, _, s),
              ((e.__l || (e.__l = {}))[n] = o);
          } else if ("list" !== n && "type" !== n && !i && n in e)
            h(e, n, null == o ? "" : o),
              (null != o && !1 !== o) || e.removeAttribute(n);
          else {
            var u = i && n !== (n = n.replace(/^xlink:?/, ""));
            null == o || !1 === o
              ? u
                ? e.removeAttributeNS(
                    "http://www.w3.org/1999/xlink",
                    n.toLowerCase()
                  )
                : e.removeAttribute(n)
              : "function" != typeof o &&
                (u
                  ? e.setAttributeNS(
                      "http://www.w3.org/1999/xlink",
                      n.toLowerCase(),
                      o
                    )
                  : e.setAttribute(n, o));
          }
        else e.className = o || "";
      }
      function h(e, t, n) {
        try {
          e[t] = n;
        } catch (e) {}
      }
      function _(e) {
        return this.__l[e.type]((O.event && O.event(e)) || e);
      }
      function m() {
        for (var e; (e = G.pop()); )
          O.afterMount && O.afterMount(e),
            e.componentDidMount && e.componentDidMount();
      }
      function v(e, t, n, r, o, i) {
        B++ ||
          ((V = null != o && void 0 !== o.ownerSVGElement),
          (D = null != e && !("__preactattr_" in e)));
        var a = y(e, t, n, r, i);
        return (
          o && a.parentNode !== o && o.appendChild(a),
          --B || ((D = !1), i || m()),
          a
        );
      }
      function y(e, t, n, r, o) {
        var i = e,
          a = V;
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
        var s = t.nodeName;
        if ("function" == typeof s) return P(e, t, n, r);
        if (
          ((V = "svg" === s || ("foreignObject" !== s && V)),
          (s += ""),
          (!e || !l(e, s)) && ((i = p(s, V)), e))
        ) {
          for (; e.firstChild; ) i.appendChild(e.firstChild);
          e.parentNode && e.parentNode.replaceChild(i, e), g(e, !0);
        }
        var u = i.firstChild,
          c = i.__preactattr_,
          f = t.children;
        if (null == c) {
          c = i.__preactattr_ = {};
          for (var d = i.attributes, h = d.length; h--; )
            c[d[h].name] = d[h].value;
        }
        return (
          !D &&
          f &&
          1 === f.length &&
          "string" == typeof f[0] &&
          null != u &&
          void 0 !== u.splitText &&
          null == u.nextSibling
            ? u.nodeValue != f[0] && (u.nodeValue = f[0])
            : ((f && f.length) || null != u) &&
              b(i, f, n, r, D || null != c.dangerouslySetInnerHTML),
          w(i, t.attributes, c),
          (V = a),
          i
        );
      }
      function b(e, t, n, r, o) {
        var i,
          a,
          s,
          l,
          c,
          p = e.childNodes,
          d = [],
          h = {},
          _ = 0,
          m = 0,
          v = p.length,
          b = 0,
          k = t ? t.length : 0;
        if (0 !== v)
          for (var w = 0; w < v; w++) {
            var x = p[w],
              C = x.__preactattr_,
              T = k && C ? (x._component ? x._component.__k : C.key) : null;
            null != T
              ? (_++, (h[T] = x))
              : (C ||
                  (void 0 !== x.splitText ? !o || x.nodeValue.trim() : o)) &&
                (d[b++] = x);
          }
        if (0 !== k)
          for (var w = 0; w < k; w++) {
            (l = t[w]), (c = null);
            var T = l.key;
            if (null != T)
              _ && void 0 !== h[T] && ((c = h[T]), (h[T] = void 0), _--);
            else if (!c && m < b)
              for (i = m; i < b; i++)
                if (void 0 !== d[i] && u((a = d[i]), l, o)) {
                  (c = a), (d[i] = void 0), i === b - 1 && b--, i === m && m++;
                  break;
                }
            (c = y(c, l, n, r)),
              (s = p[w]),
              c &&
                c !== e &&
                c !== s &&
                (null == s
                  ? e.appendChild(c)
                  : c === s.nextSibling
                    ? f(s)
                    : e.insertBefore(c, s));
          }
        if (_) for (var w in h) void 0 !== h[w] && g(h[w], !1);
        for (; m <= b; ) void 0 !== (c = d[b--]) && g(c, !1);
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
            d(e, r, n[r], (n[r] = void 0), V);
        for (r in t)
          "children" === r ||
            "innerHTML" === r ||
            (r in n &&
              t[r] === ("value" === r || "checked" === r ? e[r] : n[r])) ||
            d(e, r, n[r], (n[r] = t[r]), V);
      }
      function x(e) {
        var t = e.constructor.name;
        (H[t] || (H[t] = [])).push(e);
      }
      function C(e, t, n) {
        var r,
          o = H[e.name];
        if (
          (e.prototype && e.prototype.render
            ? ((r = new e(t, n)), R.call(r, t, n))
            : ((r = new R(t, n)), (r.constructor = e), (r.render = T)),
          o)
        )
          for (var i = o.length; i--; )
            if (o[i].constructor === e) {
              (r.__b = o[i].__b), o.splice(i, 1);
              break;
            }
        return r;
      }
      function T(e, t, n) {
        return this.constructor(e, n);
      }
      function N(e, t, n, r, o) {
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
            (1 !== n && !1 === O.syncComponentUpdates && e.base
              ? a(e)
              : S(e, 1, o)),
          e.__r && e.__r(e));
      }
      function S(e, t, n, r) {
        if (!e.__x) {
          var i,
            a,
            s,
            u = e.props,
            l = e.state,
            p = e.context,
            f = e.__p || u,
            d = e.__s || l,
            h = e.__c || p,
            _ = e.base,
            y = e.__b,
            b = _ || y,
            k = e._component,
            w = !1;
          if (
            (_ &&
              ((e.props = f),
              (e.state = d),
              (e.context = h),
              2 !== t &&
              e.shouldComponentUpdate &&
              !1 === e.shouldComponentUpdate(u, l, p)
                ? (w = !0)
                : e.componentWillUpdate && e.componentWillUpdate(u, l, p),
              (e.props = u),
              (e.state = l),
              (e.context = p)),
            (e.__p = e.__s = e.__c = e.__b = null),
            (e.__d = !1),
            !w)
          ) {
            (i = e.render(u, l, p)),
              e.getChildContext && (p = o(o({}, p), e.getChildContext()));
            var x,
              T,
              P = i && i.nodeName;
            if ("function" == typeof P) {
              var R = c(i);
              (a = k),
                a && a.constructor === P && R.key == a.__k
                  ? N(a, R, 1, p, !1)
                  : ((x = a),
                    (e._component = a = C(P, R, p)),
                    (a.__b = a.__b || y),
                    (a.__u = e),
                    N(a, R, 0, p, !1),
                    S(a, 1, n, !0)),
                (T = a.base);
            } else
              (s = b),
                (x = k),
                x && (s = e._component = null),
                (b || 1 === t) &&
                  (s && (s._component = null),
                  (T = v(s, i, p, n || !_, b && b.parentNode, !0)));
            if (b && T !== b && a !== k) {
              var W = b.parentNode;
              W &&
                T !== W &&
                (W.replaceChild(T, b), x || ((b._component = null), g(b, !1)));
            }
            if ((x && j(x), (e.base = T), T && !r)) {
              for (var A = e, U = e; (U = U.__u); ) (A = U).base = T;
              (T._component = A), (T._componentConstructor = A.constructor);
            }
          }
          if (
            (!_ || n
              ? G.unshift(e)
              : w ||
                (e.componentDidUpdate && e.componentDidUpdate(f, d, h),
                O.afterUpdate && O.afterUpdate(e)),
            null != e.__h)
          )
            for (; e.__h.length; ) e.__h.pop().call(e);
          B || r || m();
        }
      }
      function P(e, t, n, r) {
        for (
          var o = e && e._component,
            i = o,
            a = e,
            s = o && e._componentConstructor === t.nodeName,
            u = s,
            l = c(t);
          o && !u && (o = o.__u);

        )
          u = o.constructor === t.nodeName;
        return (
          o && u && (!r || o._component)
            ? (N(o, l, 3, n, r), (e = o.base))
            : (i && !s && (j(i), (e = a = null)),
              (o = C(t.nodeName, l, n)),
              e && !o.__b && ((o.__b = e), (a = null)),
              N(o, l, 1, n, r),
              (e = o.base),
              a && e !== a && ((a._component = null), g(a, !1))),
          e
        );
      }
      function j(e) {
        O.beforeUnmount && O.beforeUnmount(e);
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
      function R(e, t) {
        (this.__d = !0),
          (this.context = t),
          (this.props = e),
          (this.state = this.state || {});
      }
      function W(e, t, n) {
        return v(n, e, {}, !1, t, !1);
      }
      var O = {},
        A = [],
        U = [],
        E =
          "function" == typeof Promise
            ? Promise.resolve().then.bind(Promise.resolve())
            : setTimeout,
        L = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
        M = [],
        G = [],
        B = 0,
        V = !1,
        D = !1,
        H = {};
      o(R.prototype, {
        setState: function(e, t) {
          var n = this.state;
          this.__s || (this.__s = o({}, n)),
            o(n, "function" == typeof e ? e(n, this.props) : e),
            t && (this.__h = this.__h || []).push(t),
            a(this);
        },
        forceUpdate: function(e) {
          e && (this.__h = this.__h || []).push(e), S(this, 2);
        },
        render: function() {}
      });
      var F = {
        h: r,
        createElement: r,
        cloneElement: i,
        Component: R,
        render: W,
        rerender: s,
        options: O
      };
      e.exports = F;
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
              var a = t[o](i),
                s = a.value;
            } catch (e) {
              return void n(e);
            }
            if (!a.done)
              return Promise.resolve(s).then(
                function(e) {
                  r("next", e);
                },
                function(e) {
                  r("throw", e);
                }
              );
            e(s);
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
    function a(e, t) {
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
    var s = (function() {
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
      u = n("EBst");
    n("FWi5");
    var l = (0, u.h)(
        "div",
        { class: "buttons" },
        (0, u.h)(
          "span",
          { class: "message" },
          "Waiting to your opponent to play"
        )
      ),
      c = (0, u.h)("h1", null, "GameRoom"),
      p = (0, u.h)("span", null, "Awaiting a worthy opponent...");
    t.default = (function(e) {
      function t() {
        for (
          var e, n, r, o, a = arguments.length, s = Array(a), u = 0;
          u < a;
          u++
        )
          s[u] = arguments[u];
        return (
          (n = r = i(
            this,
            (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(
              e,
              [this].concat(s)
            )
          )),
          (r.state = {
            tiles: [3, 5, 7],
            start: !1,
            turn: !1,
            played: !1,
            end: !1,
            result: null,
            forfeit: null,
            secondsToPlay: null,
            selectedColumn: -1,
            selectedTiles: []
          }),
          (o = n),
          i(r, o)
        );
      }
      return (
        a(t, e),
        s(t, [
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
                                  secondsToPlay: 15,
                                  turn: !0,
                                  played: !1
                                });
                              }),
                              this.socket.on("start", function(e) {
                                t.setState({
                                  turn: e.turn,
                                  tiles: e.tiles,
                                  secondsToPlay: e.turn ? 15 : -1,
                                  start: !0
                                });
                              }),
                              this.socket.on("end", function(e) {
                                t.setState({
                                  result: e.result,
                                  forfeit: e.forfeit,
                                  end: !0
                                }),
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
            key: "forfeitGame",
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
                              (e.next = 2),
                              fetch("/forfeit", {
                                method: "post",
                                headers: { accept: "application/json" },
                                credentials: "same-origin"
                              })
                            );
                          case 2:
                            return (t = e.sent), (e.next = 5), t.json();
                          case 5:
                            (n = e.sent), n.success && window.location.reload();
                          case 7:
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
              return (0, u.h)(
                "div",
                { className: "tileColumn " + (r === t ? "selected" : "") },
                Array.from(Array(e)).map(function(e, i) {
                  return (0, u.h)("span", {
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
                ? (0, u.h)(
                    "div",
                    { class: "buttons" },
                    (0, u.h)("input", {
                      type: "button",
                      value: "Submit",
                      disabled: !this.state.selectedTiles.length,
                      onClick: function(t) {
                        return e.turnPlayed(t);
                      }
                    }),
                    (0, u.h)("input", {
                      type: "button",
                      class: "secondary-button",
                      value: "Clear",
                      onClick: function() {
                        return e.turnReset();
                      }
                    }),
                    (0, u.h)(
                      "div",
                      { class: "forfeit-container" },
                      (0, u.h)(
                        "span",
                        null,
                        this.state.secondsToPlay,
                        " to play"
                      ),
                      (0, u.h)("input", {
                        type: "button",
                        class: "serious-button",
                        value: "Forfeit",
                        onClick: function() {
                          confirm(
                            "Are you sure you want to forfeit the game?"
                          ) && e.forfeitGame();
                        }
                      })
                    )
                  )
                : l;
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
                this.setState({
                  played: !0,
                  turn: !1,
                  tiles: n,
                  secondsToPlay: -1
                }),
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
            key: "handleTimers",
            value: function() {
              var e = this,
                t = this.state,
                n = t.turn,
                r = t.secondsToPlay;
              n
                ? r > 0
                  ? (this.timer = setTimeout(function() {
                      return e.setState({ secondsToPlay: r - 1 });
                    }, 1e3))
                  : this.forfeitGame()
                : this.timer && clearTimeout(this.timer);
            }
          },
          {
            key: "cancelGame",
            value: (function() {
              function e() {
                return t.apply(this, arguments);
              }
              var t = o(
                regeneratorRuntime.mark(function e() {
                  return regeneratorRuntime.wrap(
                    function(e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (this.state.start) {
                              e.next = 10;
                              break;
                            }
                            return (
                              (e.prev = 1),
                              (e.next = 4),
                              fetch("/cancel", {
                                method: "post",
                                headers: { accept: "application/json" },
                                credentials: "same-origin"
                              })
                            );
                          case 4:
                            window.location.reload(), (e.next = 10);
                            break;
                          case 7:
                            throw ((e.prev = 7), (e.t0 = e.catch(1)));
                          case 10:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    this,
                    [[1, 7]]
                  );
                })
              );
              return e;
            })()
          },
          {
            key: "render",
            value: function() {
              var e = this,
                t = this.state.tiles;
              return (
                this.handleTimers(),
                (0, u.h)(
                  "div",
                  { style: { height: "100%" } },
                  c,
                  (0, u.h)(
                    "div",
                    { className: "gamecontainer" },
                    !this.state.start || this.state.end
                      ? (0, u.h)(
                          "div",
                          { class: "overlay" },
                          this.state.end
                            ? this.state.result
                              ? this.state.forfeit
                                ? "Your opponent has forfeited the game. Congratulations!"
                                : "Congratulations! You WON!"
                              : "Oops... You lost. Please try again."
                            : (0, u.h)(
                                "div",
                                null,
                                p,
                                (0, u.h)("input", {
                                  type: "button",
                                  class: "secondary-button",
                                  value: "Cancel",
                                  onClick: function() {
                                    return e.cancelGame();
                                  }
                                })
                              )
                        )
                      : null,
                    t.map(function(t, n) {
                      return e.renderTiles(t, n);
                    }),
                    this.renderButtons()
                  )
                )
              );
            }
          }
        ]),
        t
      );
    })(u.Component);
  },
  uXl7: function(e, t, n) {
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
        a = function() {
          var e = o(n("JkW7"));
          i = (0, r.render)((0, r.h)(e), document.body, i);
        };
      a();
    }
  }
});
//# sourceMappingURL=bundle.307b5.js.map
