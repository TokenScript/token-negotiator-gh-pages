/*! For license information please see main.bundle.js.LICENSE.txt */
(() => {
  var t = {
    "./node_modules/@ethersproject/address/lib.esm/_version.js": (t, e, r) => {
      "use strict";
      r.r(e), r.d(e, {
        version: () => n
      });
      const n = "address/5.5.0";
    },
    "./node_modules/@ethersproject/address/lib.esm/index.js": (t, e, r) => {
      "use strict";
      r.r(e), r.d(e, {
        getAddress: () => v,
        isAddress: () => g,
        getIcapAddress: () => m,
        getContractAddress: () => p,
        getCreate2Address: () => y
      });
      var n = r("./node_modules/@ethersproject/bytes/lib.esm/index.js");
      var i = r("./node_modules/@ethersproject/bignumber/lib.esm/bignumber.js");
      var o = r("./node_modules/@ethersproject/keccak256/lib.esm/index.js");
      var s = r("./node_modules/@ethersproject/rlp/lib.esm/index.js");
      var a = r("./node_modules/@ethersproject/logger/lib.esm/index.js");
      var u = r("./node_modules/@ethersproject/address/lib.esm/_version.js");
      const h = new a.Logger(u.version);
      function l(t) {
        (0, n.isHexString)(t, 20) || h.throwArgumentError("invalid address", "address", t);
        const e = (t = t.toLowerCase()).substring(2).split("");
        const r = new Uint8Array(40);
        for (let n = 0; n < 40; n++) r[n] = e[n].charCodeAt(0);
        const i = (0, n.arrayify)((0, o.keccak256)(r));
        for (let n = 0; n < 40; n += 2) i[n >> 1] >> 4 >= 8 && (e[n] = e[n].toUpperCase()), (15 & i[n >> 1]) >= 8 && (e[n + 1] = e[n + 1].toUpperCase());
        return "0x" + e.join("");
      }
      const f = {};
      for (let b = 0; b < 10; b++) f[String(b)] = String(b);
      for (let b = 0; b < 26; b++) f[String.fromCharCode(65 + b)] = String(10 + b);
      const c = Math.floor(function(t) {
        return Math.log10 ? Math.log10(t) : Math.log(t) / Math.LN10;
      }(9007199254740991));
      function d(t) {
        let e = (t = (t = t.toUpperCase()).substring(4) + t.substring(0, 2) + "00").split("").map((t => f[t])).join("");
        for (;e.length >= c; ) {
          let t = e.substring(0, c);
          e = parseInt(t, 10) % 97 + e.substring(t.length);
        }
        let r = String(98 - parseInt(e, 10) % 97);
        for (;r.length < 2; ) r = "0" + r;
        return r;
      }
      function v(t) {
        let e = null;
        if ("string" != typeof t && h.throwArgumentError("invalid address", "address", t), t.match(/^(0x)?[0-9a-fA-F]{40}$/)) "0x" !== t.substring(0, 2) && (t = "0x" + t), 
        e = l(t), t.match(/([A-F].*[a-f])|([a-f].*[A-F])/) && e !== t && h.throwArgumentError("bad address checksum", "address", t); else if (t.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
          for (t.substring(2, 4) !== d(t) && h.throwArgumentError("bad icap checksum", "address", t), e = (0, i._base36To16)(t.substring(4)); e.length < 40; ) e = "0" + e;
          e = l("0x" + e);
        } else h.throwArgumentError("invalid address", "address", t);
        return e;
      }
      function g(t) {
        try {
          return v(t), !0;
        } catch (e) {}
        return !1;
      }
      function m(t) {
        let e = (0, i._base16To36)(v(t).substring(2)).toUpperCase();
        for (;e.length < 30; ) e = "0" + e;
        return "XE" + d("XE00" + e) + e;
      }
      function p(t) {
        let e = null;
        try {
          e = v(t.from);
        } catch (a) {
          h.throwArgumentError("missing from address", "transaction", t);
        }
        const r = (0, n.stripZeros)((0, n.arrayify)(i.BigNumber.from(t.nonce).toHexString()));
        return v((0, n.hexDataSlice)((0, o.keccak256)((0, s.encode)([ e, r ])), 12));
      }
      function y(t, e, r) {
        return 32 !== (0, n.hexDataLength)(e) && h.throwArgumentError("salt must be 32 bytes", "salt", e), 32 !== (0, n.hexDataLength)(r) && h.throwArgumentError("initCodeHash must be 32 bytes", "initCodeHash", r), 
        v((0, n.hexDataSlice)((0, o.keccak256)((0, n.concat)([ "0xff", v(t), e, r ])), 12));
      }
    },
    "./node_modules/@ethersproject/bignumber/lib.esm/_version.js": (t, e, r) => {
      "use strict";
      r.r(e), r.d(e, {
        version: () => n
      });
      const n = "bignumber/5.5.0";
    },
    "./node_modules/@ethersproject/bignumber/lib.esm/bignumber.js": (t, e, r) => {
      "use strict";
      r.r(e), r.d(e, {
        isBigNumberish: () => c,
        BigNumber: () => v,
        _base36To16: () => b,
        _base16To36: () => w
      });
      var n = r("./node_modules/bn.js/lib/bn.js");
      var i = r.n(n);
      var o = r("./node_modules/@ethersproject/bytes/lib.esm/index.js");
      var s = r("./node_modules/@ethersproject/logger/lib.esm/index.js");
      var a = r("./node_modules/@ethersproject/bignumber/lib.esm/_version.js");
      var u = i().BN;
      const h = new s.Logger(a.version);
      const l = {};
      const f = 9007199254740991;
      function c(t) {
        return null != t && (v.isBigNumber(t) || "number" == typeof t && t % 1 == 0 || "string" == typeof t && !!t.match(/^-?[0-9]+$/) || (0, 
        o.isHexString)(t) || "bigint" == typeof t || (0, o.isBytes)(t));
      }
      let d = !1;
      class v {
        constructor(t, e) {
          h.checkNew(new.target, v), t !== l && h.throwError("cannot call constructor directly; use BigNumber.from", s.Logger.errors.UNSUPPORTED_OPERATION, {
            operation: "new (BigNumber)"
          }), this._hex = e, this._isBigNumber = !0, Object.freeze(this);
        }
        fromTwos(t) {
          return m(p(this).fromTwos(t));
        }
        toTwos(t) {
          return m(p(this).toTwos(t));
        }
        abs() {
          return "-" === this._hex[0] ? v.from(this._hex.substring(1)) : this;
        }
        add(t) {
          return m(p(this).add(p(t)));
        }
        sub(t) {
          return m(p(this).sub(p(t)));
        }
        div(t) {
          return v.from(t).isZero() && y("division by zero", "div"), m(p(this).div(p(t)));
        }
        mul(t) {
          return m(p(this).mul(p(t)));
        }
        mod(t) {
          const e = p(t);
          return e.isNeg() && y("cannot modulo negative values", "mod"), m(p(this).umod(e));
        }
        pow(t) {
          const e = p(t);
          return e.isNeg() && y("cannot raise to negative values", "pow"), m(p(this).pow(e));
        }
        and(t) {
          const e = p(t);
          return (this.isNegative() || e.isNeg()) && y("cannot 'and' negative values", "and"), m(p(this).and(e));
        }
        or(t) {
          const e = p(t);
          return (this.isNegative() || e.isNeg()) && y("cannot 'or' negative values", "or"), m(p(this).or(e));
        }
        xor(t) {
          const e = p(t);
          return (this.isNegative() || e.isNeg()) && y("cannot 'xor' negative values", "xor"), m(p(this).xor(e));
        }
        mask(t) {
          return (this.isNegative() || t < 0) && y("cannot mask negative values", "mask"), m(p(this).maskn(t));
        }
        shl(t) {
          return (this.isNegative() || t < 0) && y("cannot shift negative values", "shl"), m(p(this).shln(t));
        }
        shr(t) {
          return (this.isNegative() || t < 0) && y("cannot shift negative values", "shr"), m(p(this).shrn(t));
        }
        eq(t) {
          return p(this).eq(p(t));
        }
        lt(t) {
          return p(this).lt(p(t));
        }
        lte(t) {
          return p(this).lte(p(t));
        }
        gt(t) {
          return p(this).gt(p(t));
        }
        gte(t) {
          return p(this).gte(p(t));
        }
        isNegative() {
          return "-" === this._hex[0];
        }
        isZero() {
          return p(this).isZero();
        }
        toNumber() {
          try {
            return p(this).toNumber();
          } catch (t) {
            y("overflow", "toNumber", this.toString());
          }
          return null;
        }
        toBigInt() {
          try {
            return BigInt(this.toString());
          } catch (t) {}
          return h.throwError("this platform does not support BigInt", s.Logger.errors.UNSUPPORTED_OPERATION, {
            value: this.toString()
          });
        }
        toString() {
          return arguments.length > 0 && (10 === arguments[0] ? d || (d = !0, h.warn("BigNumber.toString does not accept any parameters; base-10 is assumed")) : 16 === arguments[0] ? h.throwError("BigNumber.toString does not accept any parameters; use bigNumber.toHexString()", s.Logger.errors.UNEXPECTED_ARGUMENT, {}) : h.throwError("BigNumber.toString does not accept parameters", s.Logger.errors.UNEXPECTED_ARGUMENT, {})), 
          p(this).toString(10);
        }
        toHexString() {
          return this._hex;
        }
        toJSON(t) {
          return {
            type: "BigNumber",
            hex: this.toHexString()
          };
        }
        static from(t) {
          if (t instanceof v) return t;
          if ("string" == typeof t) return t.match(/^-?0x[0-9a-f]+$/i) ? new v(l, g(t)) : t.match(/^-?[0-9]+$/) ? new v(l, g(new u(t))) : h.throwArgumentError("invalid BigNumber string", "value", t);
          if ("number" == typeof t) return t % 1 && y("underflow", "BigNumber.from", t), (t >= f || t <= -f) && y("overflow", "BigNumber.from", t), 
          v.from(String(t));
          const e = t;
          if ("bigint" == typeof e) return v.from(e.toString());
          if ((0, o.isBytes)(e)) return v.from((0, o.hexlify)(e));
          if (e) if (e.toHexString) {
            const t = e.toHexString();
            if ("string" == typeof t) return v.from(t);
          } else {
            let t = e._hex;
            if (null == t && "BigNumber" === e.type && (t = e.hex), "string" == typeof t && ((0, o.isHexString)(t) || "-" === t[0] && (0, 
            o.isHexString)(t.substring(1)))) return v.from(t);
          }
          return h.throwArgumentError("invalid BigNumber value", "value", t);
        }
        static isBigNumber(t) {
          return !(!t || !t._isBigNumber);
        }
      }
      function g(t) {
        if ("string" != typeof t) return g(t.toString(16));
        if ("-" === t[0]) return "-" === (t = t.substring(1))[0] && h.throwArgumentError("invalid hex", "value", t), "0x00" === (t = g(t)) ? t : "-" + t;
        if ("0x" !== t.substring(0, 2) && (t = "0x" + t), "0x" === t) return "0x00";
        for (t.length % 2 && (t = "0x0" + t.substring(2)); t.length > 4 && "0x00" === t.substring(0, 4); ) t = "0x" + t.substring(4);
        return t;
      }
      function m(t) {
        return v.from(g(t));
      }
      function p(t) {
        const e = v.from(t).toHexString();
        return "-" === e[0] ? new u("-" + e.substring(3), 16) : new u(e.substring(2), 16);
      }
      function y(t, e, r) {
        const n = {
          fault: t,
          operation: e
        };
        return null != r && (n.value = r), h.throwError(t, s.Logger.errors.NUMERIC_FAULT, n);
      }
      function b(t) {
        return new u(t, 36).toString(16);
      }
      function w(t) {
        return new u(t, 16).toString(36);
      }
    },
    "./node_modules/@ethersproject/bytes/lib.esm/_version.js": (t, e, r) => {
      "use strict";
      r.r(e), r.d(e, {
        version: () => n
      });
      const n = "bytes/5.5.0";
    },
    "./node_modules/@ethersproject/bytes/lib.esm/index.js": (t, e, r) => {
      "use strict";
      r.r(e), r.d(e, {
        isBytesLike: () => u,
        isBytes: () => l,
        arrayify: () => f,
        concat: () => c,
        stripZeros: () => d,
        zeroPad: () => v,
        isHexString: () => g,
        hexlify: () => p,
        hexDataLength: () => y,
        hexDataSlice: () => b,
        hexConcat: () => w,
        hexValue: () => A,
        hexStripZeros: () => k,
        hexZeroPad: () => B,
        splitSignature: () => x,
        joinSignature: () => S
      });
      var n = r("./node_modules/@ethersproject/logger/lib.esm/index.js");
      var i = r("./node_modules/@ethersproject/bytes/lib.esm/_version.js");
      const o = new n.Logger(i.version);
      function s(t) {
        return !!t.toHexString;
      }
      function a(t) {
        return t.slice || (t.slice = function() {
          const e = Array.prototype.slice.call(arguments);
          return a(new Uint8Array(Array.prototype.slice.apply(t, e)));
        }), t;
      }
      function u(t) {
        return g(t) && !(t.length % 2) || l(t);
      }
      function h(t) {
        return "number" == typeof t && t == t && t % 1 == 0;
      }
      function l(t) {
        if (null == t) return !1;
        if (t.constructor === Uint8Array) return !0;
        if ("string" == typeof t) return !1;
        if (!h(t.length) || t.length < 0) return !1;
        for (let e = 0; e < t.length; e++) {
          const r = t[e];
          if (!h(r) || r < 0 || r >= 256) return !1;
        }
        return !0;
      }
      function f(t, e) {
        if (e || (e = {}), "number" == typeof t) {
          o.checkSafeUint53(t, "invalid arrayify value");
          const e = [];
          for (;t; ) e.unshift(255 & t), t = parseInt(String(t / 256));
          return 0 === e.length && e.push(0), a(new Uint8Array(e));
        }
        if (e.allowMissingPrefix && "string" == typeof t && "0x" !== t.substring(0, 2) && (t = "0x" + t), s(t) && (t = t.toHexString()), 
        g(t)) {
          let r = t.substring(2);
          r.length % 2 && ("left" === e.hexPad ? r = "0x0" + r.substring(2) : "right" === e.hexPad ? r += "0" : o.throwArgumentError("hex data is odd-length", "value", t));
          const n = [];
          for (let t = 0; t < r.length; t += 2) n.push(parseInt(r.substring(t, t + 2), 16));
          return a(new Uint8Array(n));
        }
        return l(t) ? a(new Uint8Array(t)) : o.throwArgumentError("invalid arrayify value", "value", t);
      }
      function c(t) {
        const e = t.map((t => f(t)));
        const r = e.reduce(((t, e) => t + e.length), 0);
        const n = new Uint8Array(r);
        return e.reduce(((t, e) => (n.set(e, t), t + e.length)), 0), a(n);
      }
      function d(t) {
        let e = f(t);
        if (0 === e.length) return e;
        let r = 0;
        for (;r < e.length && 0 === e[r]; ) r++;
        return r && (e = e.slice(r)), e;
      }
      function v(t, e) {
        (t = f(t)).length > e && o.throwArgumentError("value out of range", "value", arguments[0]);
        const r = new Uint8Array(e);
        return r.set(t, e - t.length), a(r);
      }
      function g(t, e) {
        return !("string" != typeof t || !t.match(/^0x[0-9A-Fa-f]*$/)) && (!e || t.length === 2 + 2 * e);
      }
      const m = "0123456789abcdef";
      function p(t, e) {
        if (e || (e = {}), "number" == typeof t) {
          o.checkSafeUint53(t, "invalid hexlify value");
          let e = "";
          for (;t; ) e = m[15 & t] + e, t = Math.floor(t / 16);
          return e.length ? (e.length % 2 && (e = "0" + e), "0x" + e) : "0x00";
        }
        if ("bigint" == typeof t) return (t = t.toString(16)).length % 2 ? "0x0" + t : "0x" + t;
        if (e.allowMissingPrefix && "string" == typeof t && "0x" !== t.substring(0, 2) && (t = "0x" + t), s(t)) return t.toHexString();
        if (g(t)) return t.length % 2 && ("left" === e.hexPad ? t = "0x0" + t.substring(2) : "right" === e.hexPad ? t += "0" : o.throwArgumentError("hex data is odd-length", "value", t)), 
        t.toLowerCase();
        if (l(t)) {
          let e = "0x";
          for (let r = 0; r < t.length; r++) {
            let n = t[r];
            e += m[(240 & n) >> 4] + m[15 & n];
          }
          return e;
        }
        return o.throwArgumentError("invalid hexlify value", "value", t);
      }
      function y(t) {
        if ("string" != typeof t) t = p(t); else if (!g(t) || t.length % 2) return null;
        return (t.length - 2) / 2;
      }
      function b(t, e, r) {
        return "string" != typeof t ? t = p(t) : (!g(t) || t.length % 2) && o.throwArgumentError("invalid hexData", "value", t), 
        e = 2 + 2 * e, null != r ? "0x" + t.substring(e, 2 + 2 * r) : "0x" + t.substring(e);
      }
      function w(t) {
        let e = "0x";
        return t.forEach((t => {
          e += p(t).substring(2);
        })), e;
      }
      function A(t) {
        const e = k(p(t, {
          hexPad: "left"
        }));
        return "0x" === e ? "0x0" : e;
      }
      function k(t) {
        "string" != typeof t && (t = p(t)), g(t) || o.throwArgumentError("invalid hex string", "value", t), t = t.substring(2);
        let e = 0;
        for (;e < t.length && "0" === t[e]; ) e++;
        return "0x" + t.substring(e);
      }
      function B(t, e) {
        for ("string" != typeof t ? t = p(t) : g(t) || o.throwArgumentError("invalid hex string", "value", t), t.length > 2 * e + 2 && o.throwArgumentError("value out of range", "value", e); t.length < 2 * e + 2; ) t = "0x0" + t.substring(2);
        return t;
      }
      function x(t) {
        const e = {
          r: "0x",
          s: "0x",
          _vs: "0x",
          recoveryParam: 0,
          v: 0
        };
        if (u(t)) {
          const r = f(t);
          65 !== r.length && o.throwArgumentError("invalid signature string; must be 65 bytes", "signature", t), e.r = p(r.slice(0, 32)), 
          e.s = p(r.slice(32, 64)), e.v = r[64], e.v < 27 && (0 === e.v || 1 === e.v ? e.v += 27 : o.throwArgumentError("signature invalid v byte", "signature", t)), 
          e.recoveryParam = 1 - e.v % 2, e.recoveryParam && (r[32] |= 128), e._vs = p(r.slice(32, 64));
        } else {
          if (e.r = t.r, e.s = t.s, e.v = t.v, e.recoveryParam = t.recoveryParam, e._vs = t._vs, null != e._vs) {
            const r = v(f(e._vs), 32);
            e._vs = p(r);
            const n = r[0] >= 128 ? 1 : 0;
            null == e.recoveryParam ? e.recoveryParam = n : e.recoveryParam !== n && o.throwArgumentError("signature recoveryParam mismatch _vs", "signature", t), 
            r[0] &= 127;
            const i = p(r);
            null == e.s ? e.s = i : e.s !== i && o.throwArgumentError("signature v mismatch _vs", "signature", t);
          }
          if (null == e.recoveryParam) null == e.v ? o.throwArgumentError("signature missing v and recoveryParam", "signature", t) : 0 === e.v || 1 === e.v ? e.recoveryParam = e.v : e.recoveryParam = 1 - e.v % 2; else if (null == e.v) e.v = 27 + e.recoveryParam; else {
            const r = 0 === e.v || 1 === e.v ? e.v : 1 - e.v % 2;
            e.recoveryParam !== r && o.throwArgumentError("signature recoveryParam mismatch v", "signature", t);
          }
          null != e.r && g(e.r) ? e.r = B(e.r, 32) : o.throwArgumentError("signature missing or invalid r", "signature", t), null != e.s && g(e.s) ? e.s = B(e.s, 32) : o.throwArgumentError("signature missing or invalid s", "signature", t);
          const r = f(e.s);
          r[0] >= 128 && o.throwArgumentError("signature s out of range", "signature", t), e.recoveryParam && (r[0] |= 128);
          const n = p(r);
          e._vs && (g(e._vs) || o.throwArgumentError("signature invalid _vs", "signature", t), e._vs = B(e._vs, 32)), null == e._vs ? e._vs = n : e._vs !== n && o.throwArgumentError("signature _vs mismatch v and s", "signature", t);
        }
        return e;
      }
      function S(t) {
        return p(c([ (t = x(t)).r, t.s, t.recoveryParam ? "0x1c" : "0x1b" ]));
      }
    },
    "./node_modules/@ethersproject/constants/lib.esm/bignumbers.js": (t, e, r) => {
      "use strict";
      r.r(e), r.d(e, {
        NegativeOne: () => i,
        Zero: () => o,
        One: () => s,
        Two: () => a,
        WeiPerEther: () => u,
        MaxUint256: () => h,
        MinInt256: () => l,
        MaxInt256: () => f
      });
      var n = r("./node_modules/@ethersproject/bignumber/lib.esm/bignumber.js");
      const i = n.BigNumber.from(-1);
      const o = n.BigNumber.from(0);
      const s = n.BigNumber.from(1);
      const a = n.BigNumber.from(2);
      const u = n.BigNumber.from("1000000000000000000");
      const h = n.BigNumber.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
      const l = n.BigNumber.from("-0x8000000000000000000000000000000000000000000000000000000000000000");
      const f = n.BigNumber.from("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
    },
    "./node_modules/@ethersproject/hash/lib.esm/message.js": (t, e, r) => {
      "use strict";
      r.r(e), r.d(e, {
        messagePrefix: () => s,
        hashMessage: () => a
      });
      var n = r("./node_modules/@ethersproject/bytes/lib.esm/index.js");
      var i = r("./node_modules/@ethersproject/keccak256/lib.esm/index.js");
      var o = r("./node_modules/@ethersproject/strings/lib.esm/utf8.js");
      const s = "Ethereum Signed Message:\n";
      function a(t) {
        return "string" == typeof t && (t = (0, o.toUtf8Bytes)(t)), (0, i.keccak256)((0, n.concat)([ (0, o.toUtf8Bytes)(s), (0, 
        o.toUtf8Bytes)(String(t.length)), t ]));
      }
    },
    "./node_modules/@ethersproject/keccak256/lib.esm/index.js": (t, e, r) => {
      "use strict";
      r.r(e), r.d(e, {
        keccak256: () => s
      });
      var n = r("./node_modules/js-sha3/src/sha3.js");
      var i = r.n(n);
      var o = r("./node_modules/@ethersproject/bytes/lib.esm/index.js");
      function s(t) {
        return '0x' + i().keccak_256((0, o.arrayify)(t));
      }
    },
    "./node_modules/@ethersproject/logger/lib.esm/_version.js": (t, e, r) => {
      "use strict";
      r.r(e), r.d(e, {
        version: () => n
      });
      const n = "logger/5.5.0";
    },
    "./node_modules/@ethersproject/logger/lib.esm/index.js": (t, e, r) => {
      "use strict";
      r.r(e), r.d(e, {
        LogLevel: () => l,
        ErrorCode: () => f,
        Logger: () => d
      });
      var n = r("./node_modules/@ethersproject/logger/lib.esm/_version.js");
      let i = !1;
      let o = !1;
      const s = {
        debug: 1,
        default: 2,
        info: 2,
        warning: 3,
        error: 4,
        off: 5
      };
      let a = s.default;
      let u = null;
      const h = function() {
        try {
          const t = [];
          if ([ "NFD", "NFC", "NFKD", "NFKC" ].forEach((e => {
            try {
              if ("test" !== "test".normalize(e)) throw new Error("bad normalize");
            } catch (r) {
              t.push(e);
            }
          })), t.length) throw new Error("missing " + t.join(", "));
          if (String.fromCharCode(233).normalize("NFD") !== String.fromCharCode(101, 769)) throw new Error("broken implementation");
        } catch (t) {
          return t.message;
        }
        return null;
      }();
      var l;
      var f;
      !function(t) {
        t.DEBUG = "DEBUG", t.INFO = "INFO", t.WARNING = "WARNING", t.ERROR = "ERROR", t.OFF = "OFF";
      }(l || (l = {})), function(t) {
        t.UNKNOWN_ERROR = "UNKNOWN_ERROR", t.NOT_IMPLEMENTED = "NOT_IMPLEMENTED", t.UNSUPPORTED_OPERATION = "UNSUPPORTED_OPERATION", 
        t.NETWORK_ERROR = "NETWORK_ERROR", t.SERVER_ERROR = "SERVER_ERROR", t.TIMEOUT = "TIMEOUT", t.BUFFER_OVERRUN = "BUFFER_OVERRUN", 
        t.NUMERIC_FAULT = "NUMERIC_FAULT", t.MISSING_NEW = "MISSING_NEW", t.INVALID_ARGUMENT = "INVALID_ARGUMENT", t.MISSING_ARGUMENT = "MISSING_ARGUMENT", 
        t.UNEXPECTED_ARGUMENT = "UNEXPECTED_ARGUMENT", t.CALL_EXCEPTION = "CALL_EXCEPTION", t.INSUFFICIENT_FUNDS = "INSUFFICIENT_FUNDS", 
        t.NONCE_EXPIRED = "NONCE_EXPIRED", t.REPLACEMENT_UNDERPRICED = "REPLACEMENT_UNDERPRICED", t.UNPREDICTABLE_GAS_LIMIT = "UNPREDICTABLE_GAS_LIMIT", 
        t.TRANSACTION_REPLACED = "TRANSACTION_REPLACED";
      }(f || (f = {}));
      const c = "0123456789abcdef";
      class d {
        constructor(t) {
          Object.defineProperty(this, "version", {
            enumerable: !0,
            value: t,
            writable: !1
          });
        }
        _log(t, e) {
          const r = t.toLowerCase();
          null == s[r] && this.throwArgumentError("invalid log level name", "logLevel", t), a > s[r] || console.log.apply(console, e);
        }
        debug(...t) {
          this._log(d.levels.DEBUG, t);
        }
        info(...t) {
          this._log(d.levels.INFO, t);
        }
        warn(...t) {
          this._log(d.levels.WARNING, t);
        }
        makeError(t, e, r) {
          if (o) return this.makeError("censored error", e, {});
          e || (e = d.errors.UNKNOWN_ERROR), r || (r = {});
          const n = [];
          Object.keys(r).forEach((t => {
            const e = r[t];
            try {
              if (e instanceof Uint8Array) {
                let r = "";
                for (let t = 0; t < e.length; t++) r += c[e[t] >> 4], r += c[15 & e[t]];
                n.push(t + "=Uint8Array(0x" + r + ")");
              } else n.push(t + "=" + JSON.stringify(e));
            } catch (s) {
              n.push(t + "=" + JSON.stringify(r[t].toString()));
            }
          })), n.push(`code=${e}`), n.push(`version=${this.version}`);
          const i = t;
          n.length && (t += " (" + n.join(", ") + ")");
          const s = new Error(t);
          return s.reason = i, s.code = e, Object.keys(r).forEach((function(t) {
            s[t] = r[t];
          })), s;
        }
        throwError(t, e, r) {
          throw this.makeError(t, e, r);
        }
        throwArgumentError(t, e, r) {
          return this.throwError(t, d.errors.INVALID_ARGUMENT, {
            argument: e,
            value: r
          });
        }
        assert(t, e, r, n) {
          t || this.throwError(e, r, n);
        }
        assertArgument(t, e, r, n) {
          t || this.throwArgumentError(e, r, n);
        }
        checkNormalize(t) {
          null == t && (t = "platform missing String.prototype.normalize"), h && this.throwError("platform missing String.prototype.normalize", d.errors.UNSUPPORTED_OPERATION, {
            operation: "String.prototype.normalize",
            form: h
          });
        }
        checkSafeUint53(t, e) {
          "number" == typeof t && (null == e && (e = "value not safe"), (t < 0 || t >= 9007199254740991) && this.throwError(e, d.errors.NUMERIC_FAULT, {
            operation: "checkSafeInteger",
            fault: "out-of-safe-range",
            value: t
          }), t % 1 && this.throwError(e, d.errors.NUMERIC_FAULT, {
            operation: "checkSafeInteger",
            fault: "non-integer",
            value: t
          }));
        }
        checkArgumentCount(t, e, r) {
          r = r ? ": " + r : "", t < e && this.throwError("missing argument" + r, d.errors.MISSING_ARGUMENT, {
            count: t,
            expectedCount: e
          }), t > e && this.throwError("too many arguments" + r, d.errors.UNEXPECTED_ARGUMENT, {
            count: t,
            expectedCount: e
          });
        }
        checkNew(t, e) {
          t !== Object && null != t || this.throwError("missing new", d.errors.MISSING_NEW, {
            name: e.name
          });
        }
        checkAbstract(t, e) {
          t === e ? this.throwError("cannot instantiate abstract class " + JSON.stringify(e.name) + " directly; use a sub-class", d.errors.UNSUPPORTED_OPERATION, {
            name: t.name,
            operation: "new"
          }) : t !== Object && null != t || this.throwError("missing new", d.errors.MISSING_NEW, {
            name: e.name
          });
        }
        static globalLogger() {
          return u || (u = new d(n.version)), u;
        }
        static setCensorship(t, e) {
          if (!t && e && this.globalLogger().throwError("cannot permanently disable censorship", d.errors.UNSUPPORTED_OPERATION, {
            operation: "setCensorship"
          }), i) {
            if (!t) return;
            this.globalLogger().throwError("error censorship permanent", d.errors.UNSUPPORTED_OPERATION, {
              operation: "setCensorship"
            });
          }
          o = !!t, i = !!e;
        }
        static setLogLevel(t) {
          const e = s[t.toLowerCase()];
          null != e ? a = e : d.globalLogger().warn("invalid log level - " + t);
        }
        static from(t) {
          return new d(t);
        }
      }
      d.errors = f, d.levels = l;
    },
    "./node_modules/@ethersproject/properties/lib.esm/_version.js": (t, e, r) => {
      "use strict";
      r.r(e), r.d(e, {
        version: () => n
      });
      const n = "properties/5.5.0";
    },
    "./node_modules/@ethersproject/properties/lib.esm/index.js": (t, e, r) => {
      "use strict";
      r.r(e), r.d(e, {
        defineReadOnly: () => a,
        getStatic: () => u,
        resolveProperties: () => h,
        checkProperties: () => l,
        shallowCopy: () => f,
        deepCopy: () => g,
        Description: () => m
      });
      var n = r("./node_modules/@ethersproject/logger/lib.esm/index.js");
      var i = r("./node_modules/@ethersproject/properties/lib.esm/_version.js");
      var o = function(t, e, r, n) {
        return new (r || (r = Promise))((function(i, o) {
          function s(t) {
            try {
              u(n.next(t));
            } catch (e) {
              o(e);
            }
          }
          function a(t) {
            try {
              u(n.throw(t));
            } catch (e) {
              o(e);
            }
          }
          function u(t) {
            t.done ? i(t.value) : function(t) {
              return t instanceof r ? t : new r((function(e) {
                e(t);
              }));
            }(t.value).then(s, a);
          }
          u((n = n.apply(t, e || [])).next());
        }));
      };
      const s = new n.Logger(i.version);
      function a(t, e, r) {
        Object.defineProperty(t, e, {
          enumerable: !0,
          value: r,
          writable: !1
        });
      }
      function u(t, e) {
        for (let r = 0; r < 32; r++) {
          if (t[e]) return t[e];
          if (!t.prototype || "object" != typeof t.prototype) break;
          t = Object.getPrototypeOf(t.prototype).constructor;
        }
        return null;
      }
      function h(t) {
        return o(this, void 0, void 0, (function*() {
          const e = Object.keys(t).map((e => {
            const r = t[e];
            return Promise.resolve(r).then((t => ({
              key: e,
              value: t
            })));
          }));
          return (yield Promise.all(e)).reduce(((t, e) => (t[e.key] = e.value, t)), {});
        }));
      }
      function l(t, e) {
        t && "object" == typeof t || s.throwArgumentError("invalid object", "object", t), Object.keys(t).forEach((r => {
          e[r] || s.throwArgumentError("invalid object key - " + r, "transaction:" + r, t);
        }));
      }
      function f(t) {
        const e = {};
        for (const r in t) e[r] = t[r];
        return e;
      }
      const c = {
        bigint: !0,
        boolean: !0,
        function: !0,
        number: !0,
        string: !0
      };
      function d(t) {
        if (null == t || c[typeof t]) return !0;
        if (Array.isArray(t) || "object" == typeof t) {
          if (!Object.isFrozen(t)) return !1;
          const r = Object.keys(t);
          for (let n = 0; n < r.length; n++) {
            let i = null;
            try {
              i = t[r[n]];
            } catch (e) {
              continue;
            }
            if (!d(i)) return !1;
          }
          return !0;
        }
        return s.throwArgumentError("Cannot deepCopy " + typeof t, "object", t);
      }
      function v(t) {
        if (d(t)) return t;
        if (Array.isArray(t)) return Object.freeze(t.map((t => g(t))));
        if ("object" == typeof t) {
          const e = {};
          for (const r in t) {
            const n = t[r];
            void 0 !== n && a(e, r, g(n));
          }
          return e;
        }
        return s.throwArgumentError("Cannot deepCopy " + typeof t, "object", t);
      }
      function g(t) {
        return v(t);
      }
      class m {
        constructor(t) {
          for (const e in t) this[e] = g(t[e]);
        }
      }
    },
    "./node_modules/@ethersproject/rlp/lib.esm/_version.js": (t, e, r) => {
      "use strict";
      r.r(e), r.d(e, {
        version: () => n
      });
      const n = "rlp/5.5.0";
    },
    "./node_modules/@ethersproject/rlp/lib.esm/index.js": (t, e, r) => {
      "use strict";
      r.r(e), r.d(e, {
        encode: () => l,
        decode: () => d
      });
      var n = r("./node_modules/@ethersproject/bytes/lib.esm/index.js");
      var i = r("./node_modules/@ethersproject/logger/lib.esm/index.js");
      var o = r("./node_modules/@ethersproject/rlp/lib.esm/_version.js");
      const s = new i.Logger(o.version);
      function a(t) {
        const e = [];
        for (;t; ) e.unshift(255 & t), t >>= 8;
        return e;
      }
      function u(t, e, r) {
        let n = 0;
        for (let i = 0; i < r; i++) n = 256 * n + t[e + i];
        return n;
      }
      function h(t) {
        if (Array.isArray(t)) {
          let e = [];
          if (t.forEach((function(t) {
            e = e.concat(h(t));
          })), e.length <= 55) return e.unshift(192 + e.length), e;
          const r = a(e.length);
          return r.unshift(247 + r.length), r.concat(e);
        }
        (0, n.isBytesLike)(t) || s.throwArgumentError("RLP object must be BytesLike", "object", t);
        const e = Array.prototype.slice.call((0, n.arrayify)(t));
        if (1 === e.length && e[0] <= 127) return e;
        if (e.length <= 55) return e.unshift(128 + e.length), e;
        const r = a(e.length);
        return r.unshift(183 + r.length), r.concat(e);
      }
      function l(t) {
        return (0, n.hexlify)(h(t));
      }
      function f(t, e, r, n) {
        const o = [];
        for (;r < e + 1 + n; ) {
          const a = c(t, r);
          o.push(a.result), (r += a.consumed) > e + 1 + n && s.throwError("child data too short", i.Logger.errors.BUFFER_OVERRUN, {});
        }
        return {
          consumed: 1 + n,
          result: o
        };
      }
      function c(t, e) {
        if (0 === t.length && s.throwError("data too short", i.Logger.errors.BUFFER_OVERRUN, {}), t[e] >= 248) {
          const r = t[e] - 247;
          e + 1 + r > t.length && s.throwError("data short segment too short", i.Logger.errors.BUFFER_OVERRUN, {});
          const n = u(t, e + 1, r);
          return e + 1 + r + n > t.length && s.throwError("data long segment too short", i.Logger.errors.BUFFER_OVERRUN, {}), f(t, e, e + 1 + r, r + n);
        }
        if (t[e] >= 192) {
          const r = t[e] - 192;
          return e + 1 + r > t.length && s.throwError("data array too short", i.Logger.errors.BUFFER_OVERRUN, {}), f(t, e, e + 1, r);
        }
        if (t[e] >= 184) {
          const r = t[e] - 183;
          e + 1 + r > t.length && s.throwError("data array too short", i.Logger.errors.BUFFER_OVERRUN, {});
          const o = u(t, e + 1, r);
          e + 1 + r + o > t.length && s.throwError("data array too short", i.Logger.errors.BUFFER_OVERRUN, {});
          return {
            consumed: 1 + r + o,
            result: (0, n.hexlify)(t.slice(e + 1 + r, e + 1 + r + o))
          };
        }
        if (t[e] >= 128) {
          const r = t[e] - 128;
          e + 1 + r > t.length && s.throwError("data too short", i.Logger.errors.BUFFER_OVERRUN, {});
          return {
            consumed: 1 + r,
            result: (0, n.hexlify)(t.slice(e + 1, e + 1 + r))
          };
        }
        return {
          consumed: 1,
          result: (0, n.hexlify)(t[e])
        };
      }
      function d(t) {
        const e = (0, n.arrayify)(t);
        const r = c(e, 0);
        return r.consumed !== e.length && s.throwArgumentError("invalid rlp data", "data", t), r.result;
      }
    },
    "./node_modules/@ethersproject/signing-key/lib.esm/_version.js": (t, e, r) => {
      "use strict";
      r.r(e), r.d(e, {
        version: () => n
      });
      const n = "signing-key/5.5.0";
    },
    "./node_modules/@ethersproject/signing-key/lib.esm/elliptic.js": (t, e, r) => {
      "use strict";
      r.r(e), r.d(e, {
        EC: () => z
      });
      var n = r("./node_modules/bn.js/lib/bn.js");
      var i = r.n(n);
      var o = r("./node_modules/hash.js/lib/hash.js");
      var s = r.n(o);
      'undefined' != typeof globalThis ? globalThis : 'undefined' != typeof window ? window : void 0 !== r.g ? r.g : 'undefined' != typeof self && self;
      function a(t, e, r) {
        return r = {
          path: e,
          exports: {},
          require: function(t, e) {
            return function() {
              throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
            }(null == e && r.path);
          }
        }, t(r, r.exports), r.exports;
      }
      var u = h;
      function h(t, e) {
        if (!t) throw new Error(e || 'Assertion failed');
      }
      h.equal = function(t, e, r) {
        if (t != e) throw new Error(r || 'Assertion failed: ' + t + ' != ' + e);
      };
      var l = a((function(t, e) {
        var r = e;
        function n(t) {
          return 1 === t.length ? '0' + t : t;
        }
        function i(t) {
          var e = '';
          for (var r = 0; r < t.length; r++) e += n(t[r].toString(16));
          return e;
        }
        r.toArray = function(t, e) {
          if (Array.isArray(t)) return t.slice();
          if (!t) return [];
          var r = [];
          if ('string' != typeof t) {
            for (var n = 0; n < t.length; n++) r[n] = 0 | t[n];
            return r;
          }
          if ('hex' === e) {
            (t = t.replace(/[^a-z0-9]+/gi, '')).length % 2 != 0 && (t = '0' + t);
            for (n = 0; n < t.length; n += 2) r.push(parseInt(t[n] + t[n + 1], 16));
          } else for (n = 0; n < t.length; n++) {
            var i = t.charCodeAt(n);
            var o = i >> 8;
            var s = 255 & i;
            o ? r.push(o, s) : r.push(s);
          }
          return r;
        }, r.zero2 = n, r.toHex = i, r.encode = function(t, e) {
          return 'hex' === e ? i(t) : t;
        };
      }));
      var f = a((function(t, e) {
        var r = e;
        r.assert = u, r.toArray = l.toArray, r.zero2 = l.zero2, r.toHex = l.toHex, r.encode = l.encode, r.getNAF = function(t, e, r) {
          var n = new Array(Math.max(t.bitLength(), r) + 1);
          n.fill(0);
          var i = 1 << e + 1;
          var o = t.clone();
          for (var s = 0; s < n.length; s++) {
            var a;
            var u = o.andln(i - 1);
            o.isOdd() ? (a = u > (i >> 1) - 1 ? (i >> 1) - u : u, o.isubn(a)) : a = 0, n[s] = a, o.iushrn(1);
          }
          return n;
        }, r.getJSF = function(t, e) {
          var r = [ [], [] ];
          t = t.clone(), e = e.clone();
          var n = 0;
          var i = 0;
          var o;
          for (;t.cmpn(-n) > 0 || e.cmpn(-i) > 0; ) {
            var s = t.andln(3) + n & 3;
            var a = e.andln(3) + i & 3;
            var u;
            var h;
            3 === s && (s = -1), 3 === a && (a = -1), u = 0 == (1 & s) ? 0 : 3 !== (o = t.andln(7) + n & 7) && 5 !== o || 2 !== a ? s : -s, 
            r[0].push(u), h = 0 == (1 & a) ? 0 : 3 !== (o = e.andln(7) + i & 7) && 5 !== o || 2 !== s ? a : -a, r[1].push(h), 2 * n === u + 1 && (n = 1 - n), 
            2 * i === h + 1 && (i = 1 - i), t.iushrn(1), e.iushrn(1);
          }
          return r;
        }, r.cachedProperty = function(t, e, r) {
          var n = '_' + e;
          t.prototype[e] = function() {
            return void 0 !== this[n] ? this[n] : this[n] = r.call(this);
          };
        }, r.parseBytes = function(t) {
          return 'string' == typeof t ? r.toArray(t, 'hex') : t;
        }, r.intFromLE = function(t) {
          return new (i())(t, 'hex', 'le');
        };
      }));
      var c = f.getNAF;
      var d = f.getJSF;
      var v = f.assert;
      function g(t, e) {
        this.type = t, this.p = new (i())(e.p, 16), this.red = e.prime ? i().red(e.prime) : i().mont(this.p), this.zero = new (i())(0).toRed(this.red), 
        this.one = new (i())(1).toRed(this.red), this.two = new (i())(2).toRed(this.red), this.n = e.n && new (i())(e.n, 16), this.g = e.g && this.pointFromJSON(e.g, e.gRed), 
        this._wnafT1 = new Array(4), this._wnafT2 = new Array(4), this._wnafT3 = new Array(4), this._wnafT4 = new Array(4), this._bitLength = this.n ? this.n.bitLength() : 0;
        var r = this.n && this.p.div(this.n);
        !r || r.cmpn(100) > 0 ? this.redN = null : (this._maxwellTrick = !0, this.redN = this.n.toRed(this.red));
      }
      var m = g;
      function p(t, e) {
        this.curve = t, this.type = e, this.precomputed = null;
      }
      g.prototype.point = function() {
        throw new Error('Not implemented');
      }, g.prototype.validate = function() {
        throw new Error('Not implemented');
      }, g.prototype._fixedNafMul = function(t, e) {
        v(t.precomputed);
        var r = t._getDoubles();
        var n = c(e, 1, this._bitLength);
        var i = (1 << r.step + 1) - (r.step % 2 == 0 ? 2 : 1);
        i /= 3;
        var o = [];
        var s;
        var a;
        for (s = 0; s < n.length; s += r.step) {
          a = 0;
          for (var u = s + r.step - 1; u >= s; u--) a = (a << 1) + n[u];
          o.push(a);
        }
        var h = this.jpoint(null, null, null);
        var l = this.jpoint(null, null, null);
        for (var f = i; f > 0; f--) {
          for (s = 0; s < o.length; s++) (a = o[s]) === f ? l = l.mixedAdd(r.points[s]) : a === -f && (l = l.mixedAdd(r.points[s].neg()));
          h = h.add(l);
        }
        return h.toP();
      }, g.prototype._wnafMul = function(t, e) {
        var r = 4;
        var n = t._getNAFPoints(r);
        r = n.wnd;
        var i = n.points;
        var o = c(e, r, this._bitLength);
        var s = this.jpoint(null, null, null);
        for (var a = o.length - 1; a >= 0; a--) {
          for (var u = 0; a >= 0 && 0 === o[a]; a--) u++;
          if (a >= 0 && u++, s = s.dblp(u), a < 0) break;
          var h = o[a];
          v(0 !== h), s = 'affine' === t.type ? h > 0 ? s.mixedAdd(i[h - 1 >> 1]) : s.mixedAdd(i[-h - 1 >> 1].neg()) : h > 0 ? s.add(i[h - 1 >> 1]) : s.add(i[-h - 1 >> 1].neg());
        }
        return 'affine' === t.type ? s.toP() : s;
      }, g.prototype._wnafMulAdd = function(t, e, r, n, i) {
        var o = this._wnafT1;
        var s = this._wnafT2;
        var a = this._wnafT3;
        var u = 0;
        var h;
        var l;
        var f;
        for (h = 0; h < n; h++) {
          var v = (f = e[h])._getNAFPoints(t);
          o[h] = v.wnd, s[h] = v.points;
        }
        for (h = n - 1; h >= 1; h -= 2) {
          var g = h - 1;
          var m = h;
          if (1 === o[g] && 1 === o[m]) {
            var p = [ e[g], null, null, e[m] ];
            0 === e[g].y.cmp(e[m].y) ? (p[1] = e[g].add(e[m]), p[2] = e[g].toJ().mixedAdd(e[m].neg())) : 0 === e[g].y.cmp(e[m].y.redNeg()) ? (p[1] = e[g].toJ().mixedAdd(e[m]), 
            p[2] = e[g].add(e[m].neg())) : (p[1] = e[g].toJ().mixedAdd(e[m]), p[2] = e[g].toJ().mixedAdd(e[m].neg()));
            var y = [ -3, -1, -5, -7, 0, 7, 5, 1, 3 ];
            var b = d(r[g], r[m]);
            for (u = Math.max(b[0].length, u), a[g] = new Array(u), a[m] = new Array(u), l = 0; l < u; l++) {
              var w = 0 | b[0][l];
              var A = 0 | b[1][l];
              a[g][l] = y[3 * (w + 1) + (A + 1)], a[m][l] = 0, s[g] = p;
            }
          } else a[g] = c(r[g], o[g], this._bitLength), a[m] = c(r[m], o[m], this._bitLength), u = Math.max(a[g].length, u), u = Math.max(a[m].length, u);
        }
        var k = this.jpoint(null, null, null);
        var B = this._wnafT4;
        for (h = u; h >= 0; h--) {
          var x = 0;
          for (;h >= 0; ) {
            var S = !0;
            for (l = 0; l < n; l++) B[l] = 0 | a[l][h], 0 !== B[l] && (S = !1);
            if (!S) break;
            x++, h--;
          }
          if (h >= 0 && x++, k = k.dblp(x), h < 0) break;
          for (l = 0; l < n; l++) {
            var E = B[l];
            0 !== E && (E > 0 ? f = s[l][E - 1 >> 1] : E < 0 && (f = s[l][-E - 1 >> 1].neg()), k = 'affine' === f.type ? k.mixedAdd(f) : k.add(f));
          }
        }
        for (h = 0; h < n; h++) s[h] = null;
        return i ? k : k.toP();
      }, g.BasePoint = p, p.prototype.eq = function() {
        throw new Error('Not implemented');
      }, p.prototype.validate = function() {
        return this.curve.validate(this);
      }, g.prototype.decodePoint = function(t, e) {
        t = f.toArray(t, e);
        var r = this.p.byteLength();
        if ((4 === t[0] || 6 === t[0] || 7 === t[0]) && t.length - 1 == 2 * r) return 6 === t[0] ? v(t[t.length - 1] % 2 == 0) : 7 === t[0] && v(t[t.length - 1] % 2 == 1), 
        this.point(t.slice(1, 1 + r), t.slice(1 + r, 1 + 2 * r));
        if ((2 === t[0] || 3 === t[0]) && t.length - 1 === r) return this.pointFromX(t.slice(1, 1 + r), 3 === t[0]);
        throw new Error('Unknown point format');
      }, p.prototype.encodeCompressed = function(t) {
        return this.encode(t, !0);
      }, p.prototype._encode = function(t) {
        var e = this.curve.p.byteLength();
        var r = this.getX().toArray('be', e);
        return t ? [ this.getY().isEven() ? 2 : 3 ].concat(r) : [ 4 ].concat(r, this.getY().toArray('be', e));
      }, p.prototype.encode = function(t, e) {
        return f.encode(this._encode(e), t);
      }, p.prototype.precompute = function(t) {
        if (this.precomputed) return this;
        var e = {
          doubles: null,
          naf: null,
          beta: null
        };
        return e.naf = this._getNAFPoints(8), e.doubles = this._getDoubles(4, t), e.beta = this._getBeta(), this.precomputed = e, 
        this;
      }, p.prototype._hasDoubles = function(t) {
        if (!this.precomputed) return !1;
        var e = this.precomputed.doubles;
        return !!e && e.points.length >= Math.ceil((t.bitLength() + 1) / e.step);
      }, p.prototype._getDoubles = function(t, e) {
        if (this.precomputed && this.precomputed.doubles) return this.precomputed.doubles;
        var r = [ this ];
        var n = this;
        for (var i = 0; i < e; i += t) {
          for (var o = 0; o < t; o++) n = n.dbl();
          r.push(n);
        }
        return {
          step: t,
          points: r
        };
      }, p.prototype._getNAFPoints = function(t) {
        if (this.precomputed && this.precomputed.naf) return this.precomputed.naf;
        var e = [ this ];
        var r = (1 << t) - 1;
        var n = 1 === r ? null : this.dbl();
        for (var i = 1; i < r; i++) e[i] = e[i - 1].add(n);
        return {
          wnd: t,
          points: e
        };
      }, p.prototype._getBeta = function() {
        return null;
      }, p.prototype.dblp = function(t) {
        var e = this;
        for (var r = 0; r < t; r++) e = e.dbl();
        return e;
      };
      var y = a((function(t) {
        'function' == typeof Object.create ? t.exports = function(t, e) {
          e && (t.super_ = e, t.prototype = Object.create(e.prototype, {
            constructor: {
              value: t,
              enumerable: !1,
              writable: !0,
              configurable: !0
            }
          }));
        } : t.exports = function(t, e) {
          if (e) {
            t.super_ = e;
            var r = function() {};
            r.prototype = e.prototype, t.prototype = new r, t.prototype.constructor = t;
          }
        };
      }));
      var b = f.assert;
      function w(t) {
        m.call(this, 'short', t), this.a = new (i())(t.a, 16).toRed(this.red), this.b = new (i())(t.b, 16).toRed(this.red), this.tinv = this.two.redInvm(), 
        this.zeroA = 0 === this.a.fromRed().cmpn(0), this.threeA = 0 === this.a.fromRed().sub(this.p).cmpn(-3), this.endo = this._getEndomorphism(t), 
        this._endoWnafT1 = new Array(4), this._endoWnafT2 = new Array(4);
      }
      y(w, m);
      var A = w;
      function k(t, e, r, n) {
        m.BasePoint.call(this, t, 'affine'), null === e && null === r ? (this.x = null, this.y = null, this.inf = !0) : (this.x = new (i())(e, 16), 
        this.y = new (i())(r, 16), n && (this.x.forceRed(this.curve.red), this.y.forceRed(this.curve.red)), this.x.red || (this.x = this.x.toRed(this.curve.red)), 
        this.y.red || (this.y = this.y.toRed(this.curve.red)), this.inf = !1);
      }
      function B(t, e, r, n) {
        m.BasePoint.call(this, t, 'jacobian'), null === e && null === r && null === n ? (this.x = this.curve.one, this.y = this.curve.one, 
        this.z = new (i())(0)) : (this.x = new (i())(e, 16), this.y = new (i())(r, 16), this.z = new (i())(n, 16)), this.x.red || (this.x = this.x.toRed(this.curve.red)), 
        this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.zOne = this.z === this.curve.one;
      }
      w.prototype._getEndomorphism = function(t) {
        if (this.zeroA && this.g && this.n && 1 === this.p.modn(3)) {
          var e;
          var r;
          if (t.beta) e = new (i())(t.beta, 16).toRed(this.red); else {
            var n = this._getEndoRoots(this.p);
            e = (e = n[0].cmp(n[1]) < 0 ? n[0] : n[1]).toRed(this.red);
          }
          if (t.lambda) r = new (i())(t.lambda, 16); else {
            var o = this._getEndoRoots(this.n);
            0 === this.g.mul(o[0]).x.cmp(this.g.x.redMul(e)) ? r = o[0] : (r = o[1], b(0 === this.g.mul(r).x.cmp(this.g.x.redMul(e))));
          }
          return {
            beta: e,
            lambda: r,
            basis: t.basis ? t.basis.map((function(t) {
              return {
                a: new (i())(t.a, 16),
                b: new (i())(t.b, 16)
              };
            })) : this._getEndoBasis(r)
          };
        }
      }, w.prototype._getEndoRoots = function(t) {
        var e = t === this.p ? this.red : i().mont(t);
        var r = new (i())(2).toRed(e).redInvm();
        var n = r.redNeg();
        var o = new (i())(3).toRed(e).redNeg().redSqrt().redMul(r);
        return [ n.redAdd(o).fromRed(), n.redSub(o).fromRed() ];
      }, w.prototype._getEndoBasis = function(t) {
        var e = this.n.ushrn(Math.floor(this.n.bitLength() / 2));
        var r = t;
        var n = this.n.clone();
        var o = new (i())(1);
        var s = new (i())(0);
        var a = new (i())(0);
        var u = new (i())(1);
        var h;
        var l;
        var f;
        var c;
        var d;
        var v;
        var g;
        var m = 0;
        var p;
        var y;
        for (;0 !== r.cmpn(0); ) {
          var b = n.div(r);
          p = n.sub(b.mul(r)), y = a.sub(b.mul(o));
          var w = u.sub(b.mul(s));
          if (!f && p.cmp(e) < 0) h = g.neg(), l = o, f = p.neg(), c = y; else if (f && 2 == ++m) break;
          g = p, n = r, r = p, a = o, o = y, u = s, s = w;
        }
        d = p.neg(), v = y;
        var A = f.sqr().add(c.sqr());
        return d.sqr().add(v.sqr()).cmp(A) >= 0 && (d = h, v = l), f.negative && (f = f.neg(), c = c.neg()), d.negative && (d = d.neg(), 
        v = v.neg()), [ {
          a: f,
          b: c
        }, {
          a: d,
          b: v
        } ];
      }, w.prototype._endoSplit = function(t) {
        var e = this.endo.basis;
        var r = e[0];
        var n = e[1];
        var i = n.b.mul(t).divRound(this.n);
        var o = r.b.neg().mul(t).divRound(this.n);
        var s = i.mul(r.a);
        var a = o.mul(n.a);
        var u = i.mul(r.b);
        var h = o.mul(n.b);
        return {
          k1: t.sub(s).sub(a),
          k2: u.add(h).neg()
        };
      }, w.prototype.pointFromX = function(t, e) {
        (t = new (i())(t, 16)).red || (t = t.toRed(this.red));
        var r = t.redSqr().redMul(t).redIAdd(t.redMul(this.a)).redIAdd(this.b);
        var n = r.redSqrt();
        if (0 !== n.redSqr().redSub(r).cmp(this.zero)) throw new Error('invalid point');
        var o = n.fromRed().isOdd();
        return (e && !o || !e && o) && (n = n.redNeg()), this.point(t, n);
      }, w.prototype.validate = function(t) {
        if (t.inf) return !0;
        var e = t.x;
        var r = t.y;
        var n = this.a.redMul(e);
        var i = e.redSqr().redMul(e).redIAdd(n).redIAdd(this.b);
        return 0 === r.redSqr().redISub(i).cmpn(0);
      }, w.prototype._endoWnafMulAdd = function(t, e, r) {
        var n = this._endoWnafT1;
        var i = this._endoWnafT2;
        for (var o = 0; o < t.length; o++) {
          var s = this._endoSplit(e[o]);
          var a = t[o];
          var u = a._getBeta();
          s.k1.negative && (s.k1.ineg(), a = a.neg(!0)), s.k2.negative && (s.k2.ineg(), u = u.neg(!0)), n[2 * o] = a, n[2 * o + 1] = u, 
          i[2 * o] = s.k1, i[2 * o + 1] = s.k2;
        }
        var h = this._wnafMulAdd(1, n, i, 2 * o, r);
        for (var l = 0; l < 2 * o; l++) n[l] = null, i[l] = null;
        return h;
      }, y(k, m.BasePoint), w.prototype.point = function(t, e, r) {
        return new k(this, t, e, r);
      }, w.prototype.pointFromJSON = function(t, e) {
        return k.fromJSON(this, t, e);
      }, k.prototype._getBeta = function() {
        if (this.curve.endo) {
          var t = this.precomputed;
          if (t && t.beta) return t.beta;
          var e = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
          if (t) {
            var r = this.curve;
            var n = function(t) {
              return r.point(t.x.redMul(r.endo.beta), t.y);
            };
            t.beta = e, e.precomputed = {
              beta: null,
              naf: t.naf && {
                wnd: t.naf.wnd,
                points: t.naf.points.map(n)
              },
              doubles: t.doubles && {
                step: t.doubles.step,
                points: t.doubles.points.map(n)
              }
            };
          }
          return e;
        }
      }, k.prototype.toJSON = function() {
        return this.precomputed ? [ this.x, this.y, this.precomputed && {
          doubles: this.precomputed.doubles && {
            step: this.precomputed.doubles.step,
            points: this.precomputed.doubles.points.slice(1)
          },
          naf: this.precomputed.naf && {
            wnd: this.precomputed.naf.wnd,
            points: this.precomputed.naf.points.slice(1)
          }
        } ] : [ this.x, this.y ];
      }, k.fromJSON = function(t, e, r) {
        'string' == typeof e && (e = JSON.parse(e));
        var n = t.point(e[0], e[1], r);
        if (!e[2]) return n;
        function i(e) {
          return t.point(e[0], e[1], r);
        }
        var o = e[2];
        return n.precomputed = {
          beta: null,
          doubles: o.doubles && {
            step: o.doubles.step,
            points: [ n ].concat(o.doubles.points.map(i))
          },
          naf: o.naf && {
            wnd: o.naf.wnd,
            points: [ n ].concat(o.naf.points.map(i))
          }
        }, n;
      }, k.prototype.inspect = function() {
        return this.isInfinity() ? '<EC Point Infinity>' : '<EC Point x: ' + this.x.fromRed().toString(16, 2) + ' y: ' + this.y.fromRed().toString(16, 2) + '>';
      }, k.prototype.isInfinity = function() {
        return this.inf;
      }, k.prototype.add = function(t) {
        if (this.inf) return t;
        if (t.inf) return this;
        if (this.eq(t)) return this.dbl();
        if (this.neg().eq(t)) return this.curve.point(null, null);
        if (0 === this.x.cmp(t.x)) return this.curve.point(null, null);
        var e = this.y.redSub(t.y);
        0 !== e.cmpn(0) && (e = e.redMul(this.x.redSub(t.x).redInvm()));
        var r = e.redSqr().redISub(this.x).redISub(t.x);
        var n = e.redMul(this.x.redSub(r)).redISub(this.y);
        return this.curve.point(r, n);
      }, k.prototype.dbl = function() {
        if (this.inf) return this;
        var t = this.y.redAdd(this.y);
        if (0 === t.cmpn(0)) return this.curve.point(null, null);
        var e = this.curve.a;
        var r = this.x.redSqr();
        var n = t.redInvm();
        var i = r.redAdd(r).redIAdd(r).redIAdd(e).redMul(n);
        var o = i.redSqr().redISub(this.x.redAdd(this.x));
        var s = i.redMul(this.x.redSub(o)).redISub(this.y);
        return this.curve.point(o, s);
      }, k.prototype.getX = function() {
        return this.x.fromRed();
      }, k.prototype.getY = function() {
        return this.y.fromRed();
      }, k.prototype.mul = function(t) {
        return t = new (i())(t, 16), this.isInfinity() ? this : this._hasDoubles(t) ? this.curve._fixedNafMul(this, t) : this.curve.endo ? this.curve._endoWnafMulAdd([ this ], [ t ]) : this.curve._wnafMul(this, t);
      }, k.prototype.mulAdd = function(t, e, r) {
        var n = [ this, e ];
        var i = [ t, r ];
        return this.curve.endo ? this.curve._endoWnafMulAdd(n, i) : this.curve._wnafMulAdd(1, n, i, 2);
      }, k.prototype.jmulAdd = function(t, e, r) {
        var n = [ this, e ];
        var i = [ t, r ];
        return this.curve.endo ? this.curve._endoWnafMulAdd(n, i, !0) : this.curve._wnafMulAdd(1, n, i, 2, !0);
      }, k.prototype.eq = function(t) {
        return this === t || this.inf === t.inf && (this.inf || 0 === this.x.cmp(t.x) && 0 === this.y.cmp(t.y));
      }, k.prototype.neg = function(t) {
        if (this.inf) return this;
        var e = this.curve.point(this.x, this.y.redNeg());
        if (t && this.precomputed) {
          var r = this.precomputed;
          var n = function(t) {
            return t.neg();
          };
          e.precomputed = {
            naf: r.naf && {
              wnd: r.naf.wnd,
              points: r.naf.points.map(n)
            },
            doubles: r.doubles && {
              step: r.doubles.step,
              points: r.doubles.points.map(n)
            }
          };
        }
        return e;
      }, k.prototype.toJ = function() {
        return this.inf ? this.curve.jpoint(null, null, null) : this.curve.jpoint(this.x, this.y, this.curve.one);
      }, y(B, m.BasePoint), w.prototype.jpoint = function(t, e, r) {
        return new B(this, t, e, r);
      }, B.prototype.toP = function() {
        if (this.isInfinity()) return this.curve.point(null, null);
        var t = this.z.redInvm();
        var e = t.redSqr();
        var r = this.x.redMul(e);
        var n = this.y.redMul(e).redMul(t);
        return this.curve.point(r, n);
      }, B.prototype.neg = function() {
        return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
      }, B.prototype.add = function(t) {
        if (this.isInfinity()) return t;
        if (t.isInfinity()) return this;
        var e = t.z.redSqr();
        var r = this.z.redSqr();
        var n = this.x.redMul(e);
        var i = t.x.redMul(r);
        var o = this.y.redMul(e.redMul(t.z));
        var s = t.y.redMul(r.redMul(this.z));
        var a = n.redSub(i);
        var u = o.redSub(s);
        if (0 === a.cmpn(0)) return 0 !== u.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl();
        var h = a.redSqr();
        var l = h.redMul(a);
        var f = n.redMul(h);
        var c = u.redSqr().redIAdd(l).redISub(f).redISub(f);
        var d = u.redMul(f.redISub(c)).redISub(o.redMul(l));
        var v = this.z.redMul(t.z).redMul(a);
        return this.curve.jpoint(c, d, v);
      }, B.prototype.mixedAdd = function(t) {
        if (this.isInfinity()) return t.toJ();
        if (t.isInfinity()) return this;
        var e = this.z.redSqr();
        var r = this.x;
        var n = t.x.redMul(e);
        var i = this.y;
        var o = t.y.redMul(e).redMul(this.z);
        var s = r.redSub(n);
        var a = i.redSub(o);
        if (0 === s.cmpn(0)) return 0 !== a.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl();
        var u = s.redSqr();
        var h = u.redMul(s);
        var l = r.redMul(u);
        var f = a.redSqr().redIAdd(h).redISub(l).redISub(l);
        var c = a.redMul(l.redISub(f)).redISub(i.redMul(h));
        var d = this.z.redMul(s);
        return this.curve.jpoint(f, c, d);
      }, B.prototype.dblp = function(t) {
        if (0 === t) return this;
        if (this.isInfinity()) return this;
        if (!t) return this.dbl();
        var e;
        if (this.curve.zeroA || this.curve.threeA) {
          var r = this;
          for (e = 0; e < t; e++) r = r.dbl();
          return r;
        }
        var n = this.curve.a;
        var i = this.curve.tinv;
        var o = this.x;
        var s = this.y;
        var a = this.z;
        var u = a.redSqr().redSqr();
        var h = s.redAdd(s);
        for (e = 0; e < t; e++) {
          var l = o.redSqr();
          var f = h.redSqr();
          var c = f.redSqr();
          var d = l.redAdd(l).redIAdd(l).redIAdd(n.redMul(u));
          var v = o.redMul(f);
          var g = d.redSqr().redISub(v.redAdd(v));
          var m = v.redISub(g);
          var p = d.redMul(m);
          p = p.redIAdd(p).redISub(c);
          var y = h.redMul(a);
          e + 1 < t && (u = u.redMul(c)), o = g, a = y, h = p;
        }
        return this.curve.jpoint(o, h.redMul(i), a);
      }, B.prototype.dbl = function() {
        return this.isInfinity() ? this : this.curve.zeroA ? this._zeroDbl() : this.curve.threeA ? this._threeDbl() : this._dbl();
      }, B.prototype._zeroDbl = function() {
        var t;
        var e;
        var r;
        if (this.zOne) {
          var n = this.x.redSqr();
          var i = this.y.redSqr();
          var o = i.redSqr();
          var s = this.x.redAdd(i).redSqr().redISub(n).redISub(o);
          s = s.redIAdd(s);
          var a = n.redAdd(n).redIAdd(n);
          var u = a.redSqr().redISub(s).redISub(s);
          var h = o.redIAdd(o);
          h = (h = h.redIAdd(h)).redIAdd(h), t = u, e = a.redMul(s.redISub(u)).redISub(h), r = this.y.redAdd(this.y);
        } else {
          var l = this.x.redSqr();
          var f = this.y.redSqr();
          var c = f.redSqr();
          var d = this.x.redAdd(f).redSqr().redISub(l).redISub(c);
          d = d.redIAdd(d);
          var v = l.redAdd(l).redIAdd(l);
          var g = v.redSqr();
          var m = c.redIAdd(c);
          m = (m = m.redIAdd(m)).redIAdd(m), t = g.redISub(d).redISub(d), e = v.redMul(d.redISub(t)).redISub(m), r = (r = this.y.redMul(this.z)).redIAdd(r);
        }
        return this.curve.jpoint(t, e, r);
      }, B.prototype._threeDbl = function() {
        var t;
        var e;
        var r;
        if (this.zOne) {
          var n = this.x.redSqr();
          var i = this.y.redSqr();
          var o = i.redSqr();
          var s = this.x.redAdd(i).redSqr().redISub(n).redISub(o);
          s = s.redIAdd(s);
          var a = n.redAdd(n).redIAdd(n).redIAdd(this.curve.a);
          var u = a.redSqr().redISub(s).redISub(s);
          t = u;
          var h = o.redIAdd(o);
          h = (h = h.redIAdd(h)).redIAdd(h), e = a.redMul(s.redISub(u)).redISub(h), r = this.y.redAdd(this.y);
        } else {
          var l = this.z.redSqr();
          var f = this.y.redSqr();
          var c = this.x.redMul(f);
          var d = this.x.redSub(l).redMul(this.x.redAdd(l));
          d = d.redAdd(d).redIAdd(d);
          var v = c.redIAdd(c);
          var g = (v = v.redIAdd(v)).redAdd(v);
          t = d.redSqr().redISub(g), r = this.y.redAdd(this.z).redSqr().redISub(f).redISub(l);
          var m = f.redSqr();
          m = (m = (m = m.redIAdd(m)).redIAdd(m)).redIAdd(m), e = d.redMul(v.redISub(t)).redISub(m);
        }
        return this.curve.jpoint(t, e, r);
      }, B.prototype._dbl = function() {
        var t = this.curve.a;
        var e = this.x;
        var r = this.y;
        var n = this.z;
        var i = n.redSqr().redSqr();
        var o = e.redSqr();
        var s = r.redSqr();
        var a = o.redAdd(o).redIAdd(o).redIAdd(t.redMul(i));
        var u = e.redAdd(e);
        var h = (u = u.redIAdd(u)).redMul(s);
        var l = a.redSqr().redISub(h.redAdd(h));
        var f = h.redISub(l);
        var c = s.redSqr();
        c = (c = (c = c.redIAdd(c)).redIAdd(c)).redIAdd(c);
        var d = a.redMul(f).redISub(c);
        var v = r.redAdd(r).redMul(n);
        return this.curve.jpoint(l, d, v);
      }, B.prototype.trpl = function() {
        if (!this.curve.zeroA) return this.dbl().add(this);
        var t = this.x.redSqr();
        var e = this.y.redSqr();
        var r = this.z.redSqr();
        var n = e.redSqr();
        var i = t.redAdd(t).redIAdd(t);
        var o = i.redSqr();
        var s = this.x.redAdd(e).redSqr().redISub(t).redISub(n);
        var a = (s = (s = (s = s.redIAdd(s)).redAdd(s).redIAdd(s)).redISub(o)).redSqr();
        var u = n.redIAdd(n);
        u = (u = (u = u.redIAdd(u)).redIAdd(u)).redIAdd(u);
        var h = i.redIAdd(s).redSqr().redISub(o).redISub(a).redISub(u);
        var l = e.redMul(h);
        l = (l = l.redIAdd(l)).redIAdd(l);
        var f = this.x.redMul(a).redISub(l);
        f = (f = f.redIAdd(f)).redIAdd(f);
        var c = this.y.redMul(h.redMul(u.redISub(h)).redISub(s.redMul(a)));
        c = (c = (c = c.redIAdd(c)).redIAdd(c)).redIAdd(c);
        var d = this.z.redAdd(s).redSqr().redISub(r).redISub(a);
        return this.curve.jpoint(f, c, d);
      }, B.prototype.mul = function(t, e) {
        return t = new (i())(t, e), this.curve._wnafMul(this, t);
      }, B.prototype.eq = function(t) {
        if ('affine' === t.type) return this.eq(t.toJ());
        if (this === t) return !0;
        var e = this.z.redSqr();
        var r = t.z.redSqr();
        if (0 !== this.x.redMul(r).redISub(t.x.redMul(e)).cmpn(0)) return !1;
        var n = e.redMul(this.z);
        var i = r.redMul(t.z);
        return 0 === this.y.redMul(i).redISub(t.y.redMul(n)).cmpn(0);
      }, B.prototype.eqXToP = function(t) {
        var e = this.z.redSqr();
        var r = t.toRed(this.curve.red).redMul(e);
        if (0 === this.x.cmp(r)) return !0;
        var n = t.clone();
        var i = this.curve.redN.redMul(e);
        for (;;) {
          if (n.iadd(this.curve.n), n.cmp(this.curve.p) >= 0) return !1;
          if (r.redIAdd(i), 0 === this.x.cmp(r)) return !0;
        }
      }, B.prototype.inspect = function() {
        return this.isInfinity() ? '<EC JPoint Infinity>' : '<EC JPoint x: ' + this.x.toString(16, 2) + ' y: ' + this.y.toString(16, 2) + ' z: ' + this.z.toString(16, 2) + '>';
      }, B.prototype.isInfinity = function() {
        return 0 === this.z.cmpn(0);
      };
      var x = a((function(t, e) {
        var r = e;
        r.base = m, r.short = A, r.mont = null, r.edwards = null;
      }));
      var S = a((function(t, e) {
        var r = e;
        var n = f.assert;
        function i(t) {
          'short' === t.type ? this.curve = new x.short(t) : 'edwards' === t.type ? this.curve = new x.edwards(t) : this.curve = new x.mont(t), 
          this.g = this.curve.g, this.n = this.curve.n, this.hash = t.hash, n(this.g.validate(), 'Invalid curve'), n(this.g.mul(this.n).isInfinity(), 'Invalid curve, G*N != O');
        }
        function o(t, e) {
          Object.defineProperty(r, t, {
            configurable: !0,
            enumerable: !0,
            get: function() {
              var n = new i(e);
              return Object.defineProperty(r, t, {
                configurable: !0,
                enumerable: !0,
                value: n
              }), n;
            }
          });
        }
        var a;
        r.PresetCurve = i, o('p192', {
          type: 'short',
          prime: 'p192',
          p: 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff',
          a: 'ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc',
          b: '64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1',
          n: 'ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831',
          hash: s().sha256,
          gRed: !1,
          g: [ '188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012', '07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811' ]
        }), o('p224', {
          type: 'short',
          prime: 'p224',
          p: 'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001',
          a: 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe',
          b: 'b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4',
          n: 'ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d',
          hash: s().sha256,
          gRed: !1,
          g: [ 'b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21', 'bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34' ]
        }), o('p256', {
          type: 'short',
          prime: null,
          p: 'ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff',
          a: 'ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc',
          b: '5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b',
          n: 'ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551',
          hash: s().sha256,
          gRed: !1,
          g: [ '6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296', '4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5' ]
        }), o('p384', {
          type: 'short',
          prime: null,
          p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
          a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
          b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
          n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
          hash: s().sha384,
          gRed: !1,
          g: [ "aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7", "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f" ]
        }), o('p521', {
          type: 'short',
          prime: null,
          p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
          a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
          b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
          n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
          hash: s().sha512,
          gRed: !1,
          g: [ "000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66", "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650" ]
        }), o('curve25519', {
          type: 'mont',
          prime: 'p25519',
          p: '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',
          a: '76d06',
          b: '1',
          n: '1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed',
          hash: s().sha256,
          gRed: !1,
          g: [ '9' ]
        }), o('ed25519', {
          type: 'edwards',
          prime: 'p25519',
          p: '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',
          a: '-1',
          c: '1',
          d: '52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3',
          n: '1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed',
          hash: s().sha256,
          gRed: !1,
          g: [ '216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a', '6666666666666666666666666666666666666666666666666666666666666658' ]
        });
        try {
          a = null.crash();
        } catch (u) {
          a = void 0;
        }
        o('secp256k1', {
          type: 'short',
          prime: 'k256',
          p: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f',
          a: '0',
          b: '7',
          n: 'ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141',
          h: '1',
          hash: s().sha256,
          beta: '7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee',
          lambda: '5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72',
          basis: [ {
            a: '3086d221a7d46bcde86c90e49284eb15',
            b: '-e4437ed6010e88286f547fa90abfe4c3'
          }, {
            a: '114ca50f7a8e2f3f657c1108d9d44cfd8',
            b: '3086d221a7d46bcde86c90e49284eb15'
          } ],
          gRed: !1,
          g: [ '79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798', '483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8', a ]
        });
      }));
      function E(t) {
        if (!(this instanceof E)) return new E(t);
        this.hash = t.hash, this.predResist = !!t.predResist, this.outLen = this.hash.outSize, this.minEntropy = t.minEntropy || this.hash.hmacStrength, 
        this._reseed = null, this.reseedInterval = null, this.K = null, this.V = null;
        var e = l.toArray(t.entropy, t.entropyEnc || 'hex');
        var r = l.toArray(t.nonce, t.nonceEnc || 'hex');
        var n = l.toArray(t.pers, t.persEnc || 'hex');
        u(e.length >= this.minEntropy / 8, 'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits'), this._init(e, r, n);
      }
      var M = E;
      E.prototype._init = function(t, e, r) {
        var n = t.concat(e).concat(r);
        this.K = new Array(this.outLen / 8), this.V = new Array(this.outLen / 8);
        for (var i = 0; i < this.V.length; i++) this.K[i] = 0, this.V[i] = 1;
        this._update(n), this._reseed = 1, this.reseedInterval = 281474976710656;
      }, E.prototype._hmac = function() {
        return new (s().hmac)(this.hash, this.K);
      }, E.prototype._update = function(t) {
        var e = this._hmac().update(this.V).update([ 0 ]);
        t && (e = e.update(t)), this.K = e.digest(), this.V = this._hmac().update(this.V).digest(), t && (this.K = this._hmac().update(this.V).update([ 1 ]).update(t).digest(), 
        this.V = this._hmac().update(this.V).digest());
      }, E.prototype.reseed = function(t, e, r, n) {
        'string' != typeof e && (n = r, r = e, e = null), t = l.toArray(t, e), r = l.toArray(r, n), u(t.length >= this.minEntropy / 8, 'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits'), 
        this._update(t.concat(r || [])), this._reseed = 1;
      }, E.prototype.generate = function(t, e, r, n) {
        if (this._reseed > this.reseedInterval) throw new Error('Reseed is required');
        'string' != typeof e && (n = r, r = e, e = null), r && (r = l.toArray(r, n || 'hex'), this._update(r));
        var i = [];
        for (;i.length < t; ) this.V = this._hmac().update(this.V).digest(), i = i.concat(this.V);
        var o = i.slice(0, t);
        return this._update(r), this._reseed++, l.encode(o, e);
      };
      var N = f.assert;
      function _(t, e) {
        this.ec = t, this.priv = null, this.pub = null, e.priv && this._importPrivate(e.priv, e.privEnc), e.pub && this._importPublic(e.pub, e.pubEnc);
      }
      var I = _;
      _.fromPublic = function(t, e, r) {
        return e instanceof _ ? e : new _(t, {
          pub: e,
          pubEnc: r
        });
      }, _.fromPrivate = function(t, e, r) {
        return e instanceof _ ? e : new _(t, {
          priv: e,
          privEnc: r
        });
      }, _.prototype.validate = function() {
        var t = this.getPublic();
        return t.isInfinity() ? {
          result: !1,
          reason: 'Invalid public key'
        } : t.validate() ? t.mul(this.ec.curve.n).isInfinity() ? {
          result: !0,
          reason: null
        } : {
          result: !1,
          reason: 'Public key * N != O'
        } : {
          result: !1,
          reason: 'Public key is not a point'
        };
      }, _.prototype.getPublic = function(t, e) {
        return 'string' == typeof t && (e = t, t = null), this.pub || (this.pub = this.ec.g.mul(this.priv)), e ? this.pub.encode(e, t) : this.pub;
      }, _.prototype.getPrivate = function(t) {
        return 'hex' === t ? this.priv.toString(16, 2) : this.priv;
      }, _.prototype._importPrivate = function(t, e) {
        this.priv = new (i())(t, e || 16), this.priv = this.priv.umod(this.ec.curve.n);
      }, _.prototype._importPublic = function(t, e) {
        if (t.x || t.y) return 'mont' === this.ec.curve.type ? N(t.x, 'Need x coordinate') : 'short' !== this.ec.curve.type && 'edwards' !== this.ec.curve.type || N(t.x && t.y, 'Need both x and y coordinate'), 
        void (this.pub = this.ec.curve.point(t.x, t.y));
        this.pub = this.ec.curve.decodePoint(t, e);
      }, _.prototype.derive = function(t) {
        return t.validate() || N(t.validate(), 'public point not validated'), t.mul(this.priv).getX();
      }, _.prototype.sign = function(t, e, r) {
        return this.ec.sign(t, this, e, r);
      }, _.prototype.verify = function(t, e) {
        return this.ec.verify(t, e, this);
      }, _.prototype.inspect = function() {
        return '<Key priv: ' + (this.priv && this.priv.toString(16, 2)) + ' pub: ' + (this.pub && this.pub.inspect()) + ' >';
      };
      var O = f.assert;
      function C(t, e) {
        if (t instanceof C) return t;
        this._importDER(t, e) || (O(t.r && t.s, 'Signature without r or s'), this.r = new (i())(t.r, 16), this.s = new (i())(t.s, 16), 
        void 0 === t.recoveryParam ? this.recoveryParam = null : this.recoveryParam = t.recoveryParam);
      }
      var L = C;
      function P() {
        this.place = 0;
      }
      function j(t, e) {
        var r = t[e.place++];
        if (!(128 & r)) return r;
        var n = 15 & r;
        if (0 === n || n > 4) return !1;
        var i = 0;
        for (var o = 0, s = e.place; o < n; o++, s++) i <<= 8, i |= t[s], i >>>= 0;
        return !(i <= 127) && (e.place = s, i);
      }
      function U(t) {
        var e = 0;
        var r = t.length - 1;
        for (;!t[e] && !(128 & t[e + 1]) && e < r; ) e++;
        return 0 === e ? t : t.slice(e);
      }
      function R(t, e) {
        if (e < 128) t.push(e); else {
          var r = 1 + (Math.log(e) / Math.LN2 >>> 3);
          for (t.push(128 | r); --r; ) t.push(e >>> (r << 3) & 255);
          t.push(e);
        }
      }
      C.prototype._importDER = function(t, e) {
        t = f.toArray(t, e);
        var r = new P;
        if (48 !== t[r.place++]) return !1;
        var n = j(t, r);
        if (!1 === n) return !1;
        if (n + r.place !== t.length) return !1;
        if (2 !== t[r.place++]) return !1;
        var o = j(t, r);
        if (!1 === o) return !1;
        var s = t.slice(r.place, o + r.place);
        if (r.place += o, 2 !== t[r.place++]) return !1;
        var a = j(t, r);
        if (!1 === a) return !1;
        if (t.length !== a + r.place) return !1;
        var u = t.slice(r.place, a + r.place);
        if (0 === s[0]) {
          if (!(128 & s[1])) return !1;
          s = s.slice(1);
        }
        if (0 === u[0]) {
          if (!(128 & u[1])) return !1;
          u = u.slice(1);
        }
        return this.r = new (i())(s), this.s = new (i())(u), this.recoveryParam = null, !0;
      }, C.prototype.toDER = function(t) {
        var e = this.r.toArray();
        var r = this.s.toArray();
        for (128 & e[0] && (e = [ 0 ].concat(e)), 128 & r[0] && (r = [ 0 ].concat(r)), e = U(e), r = U(r); !(r[0] || 128 & r[1]); ) r = r.slice(1);
        var n = [ 2 ];
        R(n, e.length), (n = n.concat(e)).push(2), R(n, r.length);
        var i = n.concat(r);
        var o = [ 48 ];
        return R(o, i.length), o = o.concat(i), f.encode(o, t);
      };
      var T = function() {
        throw new Error('unsupported');
      };
      var H = f.assert;
      function D(t) {
        if (!(this instanceof D)) return new D(t);
        'string' == typeof t && (H(Object.prototype.hasOwnProperty.call(S, t), 'Unknown curve ' + t), t = S[t]), t instanceof S.PresetCurve && (t = {
          curve: t
        }), this.curve = t.curve.curve, this.n = this.curve.n, this.nh = this.n.ushrn(1), this.g = this.curve.g, this.g = t.curve.g, 
        this.g.precompute(t.curve.n.bitLength() + 1), this.hash = t.hash || t.curve.hash;
      }
      var F = D;
      D.prototype.keyPair = function(t) {
        return new I(this, t);
      }, D.prototype.keyFromPrivate = function(t, e) {
        return I.fromPrivate(this, t, e);
      }, D.prototype.keyFromPublic = function(t, e) {
        return I.fromPublic(this, t, e);
      }, D.prototype.genKeyPair = function(t) {
        t || (t = {});
        var e = new M({
          hash: this.hash,
          pers: t.pers,
          persEnc: t.persEnc || 'utf8',
          entropy: t.entropy || T(this.hash.hmacStrength),
          entropyEnc: t.entropy && t.entropyEnc || 'utf8',
          nonce: this.n.toArray()
        });
        var r = this.n.byteLength();
        var n = this.n.sub(new (i())(2));
        for (;;) {
          var o = new (i())(e.generate(r));
          if (!(o.cmp(n) > 0)) return o.iaddn(1), this.keyFromPrivate(o);
        }
      }, D.prototype._truncateToN = function(t, e) {
        var r = 8 * t.byteLength() - this.n.bitLength();
        return r > 0 && (t = t.ushrn(r)), !e && t.cmp(this.n) >= 0 ? t.sub(this.n) : t;
      }, D.prototype.sign = function(t, e, r, n) {
        'object' == typeof r && (n = r, r = null), n || (n = {}), e = this.keyFromPrivate(e, r), t = this._truncateToN(new (i())(t, 16));
        var o = this.n.byteLength();
        var s = e.getPrivate().toArray('be', o);
        var a = t.toArray('be', o);
        var u = new M({
          hash: this.hash,
          entropy: s,
          nonce: a,
          pers: n.pers,
          persEnc: n.persEnc || 'utf8'
        });
        var h = this.n.sub(new (i())(1));
        for (var l = 0; ;l++) {
          var f = n.k ? n.k(l) : new (i())(u.generate(this.n.byteLength()));
          if (!((f = this._truncateToN(f, !0)).cmpn(1) <= 0 || f.cmp(h) >= 0)) {
            var c = this.g.mul(f);
            if (!c.isInfinity()) {
              var d = c.getX();
              var v = d.umod(this.n);
              if (0 !== v.cmpn(0)) {
                var g = f.invm(this.n).mul(v.mul(e.getPrivate()).iadd(t));
                if (0 !== (g = g.umod(this.n)).cmpn(0)) {
                  var m = (c.getY().isOdd() ? 1 : 0) | (0 !== d.cmp(v) ? 2 : 0);
                  return n.canonical && g.cmp(this.nh) > 0 && (g = this.n.sub(g), m ^= 1), new L({
                    r: v,
                    s: g,
                    recoveryParam: m
                  });
                }
              }
            }
          }
        }
      }, D.prototype.verify = function(t, e, r, n) {
        t = this._truncateToN(new (i())(t, 16)), r = this.keyFromPublic(r, n);
        var o = (e = new L(e, 'hex')).r;
        var s = e.s;
        if (o.cmpn(1) < 0 || o.cmp(this.n) >= 0) return !1;
        if (s.cmpn(1) < 0 || s.cmp(this.n) >= 0) return !1;
        var a = s.invm(this.n);
        var u = a.mul(t).umod(this.n);
        var h = a.mul(o).umod(this.n);
        var l;
        return this.curve._maxwellTrick ? !(l = this.g.jmulAdd(u, r.getPublic(), h)).isInfinity() && l.eqXToP(o) : !(l = this.g.mulAdd(u, r.getPublic(), h)).isInfinity() && 0 === l.getX().umod(this.n).cmp(o);
      }, D.prototype.recoverPubKey = function(t, e, r, n) {
        H((3 & r) === r, 'The recovery param is more than two bits'), e = new L(e, n);
        var o = this.n;
        var s = new (i())(t);
        var a = e.r;
        var u = e.s;
        var h = 1 & r;
        var l = r >> 1;
        if (a.cmp(this.curve.p.umod(this.curve.n)) >= 0 && l) throw new Error('Unable to find sencond key candinate');
        a = l ? this.curve.pointFromX(a.add(this.curve.n), h) : this.curve.pointFromX(a, h);
        var f = e.r.invm(o);
        var c = o.sub(s).mul(f).umod(o);
        var d = u.mul(f).umod(o);
        return this.g.mulAdd(c, a, d);
      }, D.prototype.getKeyRecoveryParam = function(t, e, r, n) {
        if (null !== (e = new L(e, n)).recoveryParam) return e.recoveryParam;
        for (var i = 0; i < 4; i++) {
          var o;
          try {
            o = this.recoverPubKey(t, e, i);
          } catch (t) {
            continue;
          }
          if (o.eq(r)) return i;
        }
        throw new Error('Unable to find valid recovery factor');
      };
      var z = a((function(t, e) {
        var r = e;
        r.version = "6.5.4", r.utils = f, r.rand = function() {
          throw new Error('unsupported');
        }, r.curve = x, r.curves = S, r.ec = F, r.eddsa = null;
      })).ec;
    },
    "./node_modules/@ethersproject/signing-key/lib.esm/index.js": (t, e, r) => {
      "use strict";
      r.r(e), r.d(e, {
        SigningKey: () => f,
        recoverPublicKey: () => c,
        computePublicKey: () => d
      });
      var n = r("./node_modules/@ethersproject/signing-key/lib.esm/elliptic.js");
      var i = r("./node_modules/@ethersproject/bytes/lib.esm/index.js");
      var o = r("./node_modules/@ethersproject/properties/lib.esm/index.js");
      var s = r("./node_modules/@ethersproject/logger/lib.esm/index.js");
      var a = r("./node_modules/@ethersproject/signing-key/lib.esm/_version.js");
      const u = new s.Logger(a.version);
      let h = null;
      function l() {
        return h || (h = new n.EC("secp256k1")), h;
      }
      class f {
        constructor(t) {
          (0, o.defineReadOnly)(this, "curve", "secp256k1"), (0, o.defineReadOnly)(this, "privateKey", (0, i.hexlify)(t));
          const e = l().keyFromPrivate((0, i.arrayify)(this.privateKey));
          (0, o.defineReadOnly)(this, "publicKey", "0x" + e.getPublic(!1, "hex")), (0, o.defineReadOnly)(this, "compressedPublicKey", "0x" + e.getPublic(!0, "hex")), 
          (0, o.defineReadOnly)(this, "_isSigningKey", !0);
        }
        _addPoint(t) {
          const e = l().keyFromPublic((0, i.arrayify)(this.publicKey));
          const r = l().keyFromPublic((0, i.arrayify)(t));
          return "0x" + e.pub.add(r.pub).encodeCompressed("hex");
        }
        signDigest(t) {
          const e = l().keyFromPrivate((0, i.arrayify)(this.privateKey));
          const r = (0, i.arrayify)(t);
          32 !== r.length && u.throwArgumentError("bad digest length", "digest", t);
          const n = e.sign(r, {
            canonical: !0
          });
          return (0, i.splitSignature)({
            recoveryParam: n.recoveryParam,
            r: (0, i.hexZeroPad)("0x" + n.r.toString(16), 32),
            s: (0, i.hexZeroPad)("0x" + n.s.toString(16), 32)
          });
        }
        computeSharedSecret(t) {
          const e = l().keyFromPrivate((0, i.arrayify)(this.privateKey));
          const r = l().keyFromPublic((0, i.arrayify)(d(t)));
          return (0, i.hexZeroPad)("0x" + e.derive(r.getPublic()).toString(16), 32);
        }
        static isSigningKey(t) {
          return !(!t || !t._isSigningKey);
        }
      }
      function c(t, e) {
        const r = (0, i.splitSignature)(e);
        const n = {
          r: (0, i.arrayify)(r.r),
          s: (0, i.arrayify)(r.s)
        };
        return "0x" + l().recoverPubKey((0, i.arrayify)(t), n, r.recoveryParam).encode("hex", !1);
      }
      function d(t, e) {
        const r = (0, i.arrayify)(t);
        if (32 === r.length) {
          const t = new f(r);
          return e ? "0x" + l().keyFromPrivate(r).getPublic(!0, "hex") : t.publicKey;
        }
        return 33 === r.length ? e ? (0, i.hexlify)(r) : "0x" + l().keyFromPublic(r).getPublic(!1, "hex") : 65 === r.length ? e ? "0x" + l().keyFromPublic(r).getPublic(!0, "hex") : (0, 
        i.hexlify)(r) : u.throwArgumentError("invalid public or private key", "key", "[REDACTED]");
      }
    },
    "./node_modules/@ethersproject/strings/lib.esm/_version.js": (t, e, r) => {
      "use strict";
      r.r(e), r.d(e, {
        version: () => n
      });
      const n = "strings/5.5.0";
    },
    "./node_modules/@ethersproject/strings/lib.esm/utf8.js": (t, e, r) => {
      "use strict";
      r.r(e), r.d(e, {
        UnicodeNormalizationForm: () => a,
        Utf8ErrorReason: () => u,
        Utf8ErrorFuncs: () => l,
        toUtf8Bytes: () => c,
        _toEscapedUtf8String: () => v,
        _toUtf8String: () => g,
        toUtf8String: () => m,
        toUtf8CodePoints: () => p
      });
      var n = r("./node_modules/@ethersproject/bytes/lib.esm/index.js");
      var i = r("./node_modules/@ethersproject/logger/lib.esm/index.js");
      var o = r("./node_modules/@ethersproject/strings/lib.esm/_version.js");
      const s = new i.Logger(o.version);
      var a;
      var u;
      function h(t, e, r, n, i) {
        if (t === u.BAD_PREFIX || t === u.UNEXPECTED_CONTINUE) {
          let t = 0;
          for (let n = e + 1; n < r.length && r[n] >> 6 == 2; n++) t++;
          return t;
        }
        return t === u.OVERRUN ? r.length - e - 1 : 0;
      }
      !function(t) {
        t.current = "", t.NFC = "NFC", t.NFD = "NFD", t.NFKC = "NFKC", t.NFKD = "NFKD";
      }(a || (a = {})), function(t) {
        t.UNEXPECTED_CONTINUE = "unexpected continuation byte", t.BAD_PREFIX = "bad codepoint prefix", t.OVERRUN = "string overrun", 
        t.MISSING_CONTINUE = "missing continuation byte", t.OUT_OF_RANGE = "out of UTF-8 range", t.UTF16_SURROGATE = "UTF-16 surrogate", 
        t.OVERLONG = "overlong representation";
      }(u || (u = {}));
      const l = Object.freeze({
        error: function(t, e, r, n, i) {
          return s.throwArgumentError(`invalid codepoint at offset ${e}; ${t}`, "bytes", r);
        },
        ignore: h,
        replace: function(t, e, r, n, i) {
          return t === u.OVERLONG ? (n.push(i), 0) : (n.push(65533), h(t, e, r));
        }
      });
      function f(t, e) {
        null == e && (e = l.error), t = (0, n.arrayify)(t);
        const r = [];
        let i = 0;
        for (;i < t.length; ) {
          const n = t[i++];
          if (n >> 7 == 0) {
            r.push(n);
            continue;
          }
          let o = null;
          let s = null;
          if (192 == (224 & n)) o = 1, s = 127; else if (224 == (240 & n)) o = 2, s = 2047; else {
            if (240 != (248 & n)) {
              i += e(128 == (192 & n) ? u.UNEXPECTED_CONTINUE : u.BAD_PREFIX, i - 1, t, r);
              continue;
            }
            o = 3, s = 65535;
          }
          if (i - 1 + o >= t.length) {
            i += e(u.OVERRUN, i - 1, t, r);
            continue;
          }
          let a = n & (1 << 8 - o - 1) - 1;
          for (let h = 0; h < o; h++) {
            let n = t[i];
            if (128 != (192 & n)) {
              i += e(u.MISSING_CONTINUE, i, t, r), a = null;
              break;
            }
            a = a << 6 | 63 & n, i++;
          }
          null !== a && (a > 1114111 ? i += e(u.OUT_OF_RANGE, i - 1 - o, t, r, a) : a >= 55296 && a <= 57343 ? i += e(u.UTF16_SURROGATE, i - 1 - o, t, r, a) : a <= s ? i += e(u.OVERLONG, i - 1 - o, t, r, a) : r.push(a));
        }
        return r;
      }
      function c(t, e = a.current) {
        e != a.current && (s.checkNormalize(), t = t.normalize(e));
        let r = [];
        for (let n = 0; n < t.length; n++) {
          const e = t.charCodeAt(n);
          if (e < 128) r.push(e); else if (e < 2048) r.push(e >> 6 | 192), r.push(63 & e | 128); else if (55296 == (64512 & e)) {
            n++;
            const i = t.charCodeAt(n);
            if (n >= t.length || 56320 != (64512 & i)) throw new Error("invalid utf-8 string");
            const o = 65536 + ((1023 & e) << 10) + (1023 & i);
            r.push(o >> 18 | 240), r.push(o >> 12 & 63 | 128), r.push(o >> 6 & 63 | 128), r.push(63 & o | 128);
          } else r.push(e >> 12 | 224), r.push(e >> 6 & 63 | 128), r.push(63 & e | 128);
        }
        return (0, n.arrayify)(r);
      }
      function d(t) {
        const e = "0000" + t.toString(16);
        return "\\u" + e.substring(e.length - 4);
      }
      function v(t, e) {
        return '"' + f(t, e).map((t => {
          if (t < 256) {
            switch (t) {
             case 8:
              return "\\b";

             case 9:
              return "\\t";

             case 10:
              return "\\n";

             case 13:
              return "\\r";

             case 34:
              return "\\\"";

             case 92:
              return "\\\\";
            }
            if (t >= 32 && t < 127) return String.fromCharCode(t);
          }
          return t <= 65535 ? d(t) : d(55296 + ((t -= 65536) >> 10 & 1023)) + d(56320 + (1023 & t));
        })).join("") + '"';
      }
      function g(t) {
        return t.map((t => t <= 65535 ? String.fromCharCode(t) : (t -= 65536, String.fromCharCode(55296 + (t >> 10 & 1023), 56320 + (1023 & t))))).join("");
      }
      function m(t, e) {
        return g(f(t, e));
      }
      function p(t, e = a.current) {
        return f(c(t, e));
      }
    },
    "./node_modules/@ethersproject/transactions/lib.esm/_version.js": (t, e, r) => {
      "use strict";
      r.r(e), r.d(e, {
        version: () => n
      });
      const n = "transactions/5.5.0";
    },
    "./node_modules/@ethersproject/transactions/lib.esm/index.js": (t, e, r) => {
      "use strict";
      r.r(e), r.d(e, {
        TransactionTypes: () => v,
        computeAddress: () => b,
        recoverAddress: () => w,
        accessListify: () => B,
        serialize: () => M,
        parse: () => _
      });
      var n = r("./node_modules/@ethersproject/address/lib.esm/index.js");
      var i = r("./node_modules/@ethersproject/bignumber/lib.esm/bignumber.js");
      var o = r("./node_modules/@ethersproject/bytes/lib.esm/index.js");
      var s = r("./node_modules/@ethersproject/constants/lib.esm/bignumbers.js");
      var a = r("./node_modules/@ethersproject/keccak256/lib.esm/index.js");
      var u = r("./node_modules/@ethersproject/properties/lib.esm/index.js");
      var h = r("./node_modules/@ethersproject/rlp/lib.esm/index.js");
      var l = r("./node_modules/@ethersproject/signing-key/lib.esm/index.js");
      var f = r("./node_modules/@ethersproject/logger/lib.esm/index.js");
      var c = r("./node_modules/@ethersproject/transactions/lib.esm/_version.js");
      const d = new f.Logger(c.version);
      var v;
      function g(t) {
        return "0x" === t ? null : (0, n.getAddress)(t);
      }
      function m(t) {
        return "0x" === t ? s.Zero : i.BigNumber.from(t);
      }
      !function(t) {
        t[t.legacy = 0] = "legacy", t[t.eip2930 = 1] = "eip2930", t[t.eip1559 = 2] = "eip1559";
      }(v || (v = {}));
      const p = [ {
        name: "nonce",
        maxLength: 32,
        numeric: !0
      }, {
        name: "gasPrice",
        maxLength: 32,
        numeric: !0
      }, {
        name: "gasLimit",
        maxLength: 32,
        numeric: !0
      }, {
        name: "to",
        length: 20
      }, {
        name: "value",
        maxLength: 32,
        numeric: !0
      }, {
        name: "data"
      } ];
      const y = {
        chainId: !0,
        data: !0,
        gasLimit: !0,
        gasPrice: !0,
        nonce: !0,
        to: !0,
        type: !0,
        value: !0
      };
      function b(t) {
        const e = (0, l.computePublicKey)(t);
        return (0, n.getAddress)((0, o.hexDataSlice)((0, a.keccak256)((0, o.hexDataSlice)(e, 1)), 12));
      }
      function w(t, e) {
        return b((0, l.recoverPublicKey)((0, o.arrayify)(t), e));
      }
      function A(t, e) {
        const r = (0, o.stripZeros)(i.BigNumber.from(t).toHexString());
        return r.length > 32 && d.throwArgumentError("invalid length for " + e, "transaction:" + e, t), r;
      }
      function k(t, e) {
        return {
          address: (0, n.getAddress)(t),
          storageKeys: (e || []).map(((e, r) => (32 !== (0, o.hexDataLength)(e) && d.throwArgumentError("invalid access list storageKey", `accessList[${t}:${r}]`, e), 
          e.toLowerCase())))
        };
      }
      function B(t) {
        if (Array.isArray(t)) return t.map(((t, e) => Array.isArray(t) ? (t.length > 2 && d.throwArgumentError("access list expected to be [ address, storageKeys[] ]", `value[${e}]`, t), 
        k(t[0], t[1])) : k(t.address, t.storageKeys)));
        const e = Object.keys(t).map((e => {
          const r = t[e].reduce(((t, e) => (t[e] = !0, t)), {});
          return k(e, Object.keys(r).sort());
        }));
        return e.sort(((t, e) => t.address.localeCompare(e.address))), e;
      }
      function x(t) {
        return B(t).map((t => [ t.address, t.storageKeys ]));
      }
      function S(t, e) {
        if (null != t.gasPrice) {
          const e = i.BigNumber.from(t.gasPrice);
          const r = i.BigNumber.from(t.maxFeePerGas || 0);
          e.eq(r) || d.throwArgumentError("mismatch EIP-1559 gasPrice != maxFeePerGas", "tx", {
            gasPrice: e,
            maxFeePerGas: r
          });
        }
        const r = [ A(t.chainId || 0, "chainId"), A(t.nonce || 0, "nonce"), A(t.maxPriorityFeePerGas || 0, "maxPriorityFeePerGas"), A(t.maxFeePerGas || 0, "maxFeePerGas"), A(t.gasLimit || 0, "gasLimit"), null != t.to ? (0, 
        n.getAddress)(t.to) : "0x", A(t.value || 0, "value"), t.data || "0x", x(t.accessList || []) ];
        if (e) {
          const t = (0, o.splitSignature)(e);
          r.push(A(t.recoveryParam, "recoveryParam")), r.push((0, o.stripZeros)(t.r)), r.push((0, o.stripZeros)(t.s));
        }
        return (0, o.hexConcat)([ "0x02", h.encode(r) ]);
      }
      function E(t, e) {
        const r = [ A(t.chainId || 0, "chainId"), A(t.nonce || 0, "nonce"), A(t.gasPrice || 0, "gasPrice"), A(t.gasLimit || 0, "gasLimit"), null != t.to ? (0, 
        n.getAddress)(t.to) : "0x", A(t.value || 0, "value"), t.data || "0x", x(t.accessList || []) ];
        if (e) {
          const t = (0, o.splitSignature)(e);
          r.push(A(t.recoveryParam, "recoveryParam")), r.push((0, o.stripZeros)(t.r)), r.push((0, o.stripZeros)(t.s));
        }
        return (0, o.hexConcat)([ "0x01", h.encode(r) ]);
      }
      function M(t, e) {
        if (null == t.type || 0 === t.type) return null != t.accessList && d.throwArgumentError("untyped transactions do not support accessList; include type: 1", "transaction", t), 
        function(t, e) {
          (0, u.checkProperties)(t, y);
          const r = [];
          p.forEach((function(e) {
            let n = t[e.name] || [];
            const i = {};
            e.numeric && (i.hexPad = "left"), n = (0, o.arrayify)((0, o.hexlify)(n, i)), e.length && n.length !== e.length && n.length > 0 && d.throwArgumentError("invalid length for " + e.name, "transaction:" + e.name, n), 
            e.maxLength && (n = (0, o.stripZeros)(n), n.length > e.maxLength && d.throwArgumentError("invalid length for " + e.name, "transaction:" + e.name, n)), 
            r.push((0, o.hexlify)(n));
          }));
          let n = 0;
          if (null != t.chainId ? (n = t.chainId, "number" != typeof n && d.throwArgumentError("invalid transaction.chainId", "transaction", t)) : e && !(0, 
          o.isBytesLike)(e) && e.v > 28 && (n = Math.floor((e.v - 35) / 2)), 0 !== n && (r.push((0, o.hexlify)(n)), r.push("0x"), 
          r.push("0x")), !e) return h.encode(r);
          const i = (0, o.splitSignature)(e);
          let s = 27 + i.recoveryParam;
          return 0 !== n ? (r.pop(), r.pop(), r.pop(), s += 2 * n + 8, i.v > 28 && i.v !== s && d.throwArgumentError("transaction.chainId/signature.v mismatch", "signature", e)) : i.v !== s && d.throwArgumentError("transaction.chainId/signature.v mismatch", "signature", e), 
          r.push((0, o.hexlify)(s)), r.push((0, o.stripZeros)((0, o.arrayify)(i.r))), r.push((0, o.stripZeros)((0, o.arrayify)(i.s))), 
          h.encode(r);
        }(t, e);
        switch (t.type) {
         case 1:
          return E(t, e);

         case 2:
          return S(t, e);
        }
        return d.throwError(`unsupported transaction type: ${t.type}`, f.Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "serializeTransaction",
          transactionType: t.type
        });
      }
      function N(t, e, r) {
        try {
          const r = m(e[0]).toNumber();
          if (0 !== r && 1 !== r) throw new Error("bad recid");
          t.v = r;
        } catch (n) {
          d.throwArgumentError("invalid v for transaction type: 1", "v", e[0]);
        }
        t.r = (0, o.hexZeroPad)(e[1], 32), t.s = (0, o.hexZeroPad)(e[2], 32);
        try {
          const e = (0, a.keccak256)(r(t));
          t.from = w(e, {
            r: t.r,
            s: t.s,
            recoveryParam: t.v
          });
        } catch (n) {
          console.log(n);
        }
      }
      function _(t) {
        const e = (0, o.arrayify)(t);
        if (e[0] > 127) return function(t) {
          const e = h.decode(t);
          9 !== e.length && 6 !== e.length && d.throwArgumentError("invalid raw transaction", "rawTransaction", t);
          const r = {
            nonce: m(e[0]).toNumber(),
            gasPrice: m(e[1]),
            gasLimit: m(e[2]),
            to: g(e[3]),
            value: m(e[4]),
            data: e[5],
            chainId: 0
          };
          if (6 === e.length) return r;
          try {
            r.v = i.BigNumber.from(e[6]).toNumber();
          } catch (n) {
            return console.log(n), r;
          }
          if (r.r = (0, o.hexZeroPad)(e[7], 32), r.s = (0, o.hexZeroPad)(e[8], 32), i.BigNumber.from(r.r).isZero() && i.BigNumber.from(r.s).isZero()) r.chainId = r.v, 
          r.v = 0; else {
            r.chainId = Math.floor((r.v - 35) / 2), r.chainId < 0 && (r.chainId = 0);
            let i = r.v - 27;
            const s = e.slice(0, 6);
            0 !== r.chainId && (s.push((0, o.hexlify)(r.chainId)), s.push("0x"), s.push("0x"), i -= 2 * r.chainId + 8);
            const u = (0, a.keccak256)(h.encode(s));
            try {
              r.from = w(u, {
                r: (0, o.hexlify)(r.r),
                s: (0, o.hexlify)(r.s),
                recoveryParam: i
              });
            } catch (n) {
              console.log(n);
            }
            r.hash = (0, a.keccak256)(t);
          }
          return r.type = null, r;
        }(e);
        switch (e[0]) {
         case 1:
          return function(t) {
            const e = h.decode(t.slice(1));
            8 !== e.length && 11 !== e.length && d.throwArgumentError("invalid component count for transaction type: 1", "payload", (0, 
            o.hexlify)(t));
            const r = {
              type: 1,
              chainId: m(e[0]).toNumber(),
              nonce: m(e[1]).toNumber(),
              gasPrice: m(e[2]),
              gasLimit: m(e[3]),
              to: g(e[4]),
              value: m(e[5]),
              data: e[6],
              accessList: B(e[7])
            };
            return 8 === e.length || (r.hash = (0, a.keccak256)(t), N(r, e.slice(8), E)), r;
          }(e);

         case 2:
          return function(t) {
            const e = h.decode(t.slice(1));
            9 !== e.length && 12 !== e.length && d.throwArgumentError("invalid component count for transaction type: 2", "payload", (0, 
            o.hexlify)(t));
            const r = m(e[2]);
            const n = m(e[3]);
            const i = {
              type: 2,
              chainId: m(e[0]).toNumber(),
              nonce: m(e[1]).toNumber(),
              maxPriorityFeePerGas: r,
              maxFeePerGas: n,
              gasPrice: null,
              gasLimit: m(e[4]),
              to: g(e[5]),
              value: m(e[6]),
              data: e[7],
              accessList: B(e[8])
            };
            return 9 === e.length || (i.hash = (0, a.keccak256)(t), N(i, e.slice(9), S)), i;
          }(e);
        }
        return d.throwError(`unsupported transaction type: ${e[0]}`, f.Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "parseTransaction",
          transactionType: e[0]
        });
      }
    },
    "./node_modules/@tokenscript/token-negotiator/dist/Attestation/AlgorithmIdentifier.js": (t, e, r) => {
      "use strict";
      r.r(e), r.d(e, {
        default: () => o
      });
      var n = r("./node_modules/asn1js/src/asn1.js");
      var i = r("./node_modules/pvutils/src/utils.js");
      const o = function() {
        function t(e) {
          if (void 0 === e && (e = {}), "string" == typeof e) throw new TypeError("Unimplemented: Not accepting string yet.");
          if (e instanceof ArrayBuffer) {
            var r = fromBER(e);
            this.fromSchema(r.result);
          } else this.algorithmId = (0, i.getParametersValue)(e, "algorithmId"), "algorithmParams" in e && (this.algorithmParams = (0, 
          i.getParametersValue)(e, "algorithmParams", t.defaultValues("algorithmParams")));
        }
        return t.defaultValues = function(t) {
          if ("algorithmParams" === t) return new n.Any;
          throw new Error("Invalid member name for AlgorithmIdentifier class: " + t);
        }, t.compareWithDefault = function(t, e) {
          switch (t) {
           case "algorithmId":
            return "" === e;

           case "algorithmParams":
            return e instanceof asn1js.Any;

           default:
            throw new Error("Invalid member name for AlgorithmIdentifier class: " + t);
          }
        }, t.schema = function(t) {
          void 0 === t && (t = {});
          var e = (0, i.getParametersValue)(t, "names", {});
          return new n.Sequence({
            name: e.blockName || "",
            optional: e.optional || !1,
            value: [ new n.ObjectIdentifier({
              name: e.algorithmIdentifier || "algorithm"
            }), new n.Any({
              name: e.algorithmParams || "parameters",
              optional: !0
            }) ]
          });
        }, t.prototype.fromSchema = function(e) {
          (0, i.clearProps)(e, [ "algorithm", "params" ]);
          var r = (0, n.compareSchema)(e, e, t.schema({
            names: {
              algorithmIdentifier: "algorithm",
              algorithmParams: "params"
            }
          }));
          if (!1 === r.verified) throw new Error("Object's schema was not verified against input data for AlgorithmIdentifier");
          this.algorithmId = r.result.algorithm.valueBlock.toString(), "params" in r.result && (this.algorithmParams = r.result.params);
        }, t.prototype.toSchema = function() {
          var t = [];
          return t.push(new n.ObjectIdentifier({
            value: this.algorithmId
          })), "algorithmParams" in this && this.algorithmParams instanceof asn1js.Any == !1 && t.push(this.algorithmParams), new n.Sequence({
            value: t
          });
        }, t.prototype.toJSON = function() {
          var t = {
            algorithmId: this.algorithmId
          };
          return "algorithmParams" in this && this.algorithmParams instanceof asn1js.Any == !1 && (t.algorithmParams = this.algorithmParams.toJSON()), 
          t;
        }, t.prototype.isEqual = function(e) {
          return e instanceof t != !1 && (this.algorithmId === e.algorithmId && ("algorithmParams" in this ? "algorithmParams" in e && JSON.stringify(this.algorithmParams) === JSON.stringify(e.algorithmParams) : !("algorithmParams" in e)));
        }, t;
      }();
    },
    "./node_modules/@tokenscript/token-negotiator/dist/Attestation/PublicKeyInfo.js": (t, e, r) => {
      "use strict";
      r.r(e), r.d(e, {
        default: () => s
      });
      var n = r("./node_modules/asn1js/src/asn1.js");
      var i = r("./node_modules/pvutils/src/utils.js");
      var o = r("./node_modules/@tokenscript/token-negotiator/dist/Attestation/AlgorithmIdentifier.js");
      const s = function() {
        function t(t) {
          if (void 0 === t && (t = {}), "string" == typeof t) throw new TypeError("Not accepting string. For base64, convert to ArrayBuffer.");
          if (t instanceof ArrayBuffer) {
            var e = (0, n.fromBER)(t);
            this.fromSchema(e.result);
          } else this.signatureAlgorithm = (0, i.getParametersValue)(t, "signatureAlgorithm"), this.publicKey = (0, i.getParametersValue)(t, "publicKey");
        }
        return t.schema = function(t) {
          void 0 === t && (t = {});
          var e = (0, i.getParametersValue)(t, "names", {});
          return new n.Sequence({
            name: e.blockName || "",
            optional: !0,
            value: [ o.default.schema(e.signatureAlgorithm || {
              names: {
                blockName: "signatureAlgorithm"
              }
            }), new n.BitString({
              name: "publicKey"
            }) ]
          });
        }, t.prototype.fromSchema = function(e) {
          if ((0, i.clearProps)(e, [ "signatureAlgorithm", "publicKey" ]), !1 === (0, n.compareSchema)(e, e, t.schema({
            names: {
              signatureAlgorithm: "signatureAlgorithm",
              publicKey: "publicKey"
            }
          })).verified) throw new Error("Object's schema was not verified against input data for AlgorithmIdentifier");
        }, t;
      }();
    },
    "./node_modules/@tokenscript/token-negotiator/dist/Attestation/SignedDevonTicket.js": (t, e, r) => {
      "use strict";
      r.r(e), r.d(e, {
        DevconTicket: () => s,
        SignedDevconTicket: () => a
      });
      var n = r("./node_modules/asn1js/src/asn1.js");
      var i = r("./node_modules/pvutils/src/utils.js");
      var o = r("./node_modules/@tokenscript/token-negotiator/dist/Attestation/PublicKeyInfo.js");
      var s = function() {
        function t(t) {
          if (void 0 === t && (t = {}), "string" == typeof t) throw new TypeError("Unimplemented: Not accepting string yet.");
          if (t instanceof ArrayBuffer) {
            var e = (0, n.fromBER)(t);
            this.fromSchema(e.result);
          } else this.devconId = (0, i.getParametersValue)(t, "devconId"), this.ticketId = (0, i.getParametersValue)(t, "ticketId"), 
          this.ticketClass = (0, i.getParametersValue)(t, "ticketClass");
        }
        return t.schema = function(t) {
          void 0 === t && (t = {});
          var e = (0, i.getParametersValue)(t, "names", {});
          return new n.Sequence({
            name: e.blockName || "ticket",
            value: [ new n.Utf8String({
              name: e.devconId || "devconId"
            }), new n.Integer({
              name: e.ticketId || "ticketId"
            }), new n.Integer({
              name: e.ticketClass || "ticketClass"
            }) ]
          });
        }, t.prototype.fromSchema = function(e) {
          (0, i.clearProps)(e, [ "devconId", "ticketId", "ticketClass" ]);
          var r = (0, n.compareSchema)(e, e, t.schema());
          if (!1 === r.verified) throw new Error("Object's schema was not verified against input data for DevconTicket");
          if ("devconId" in r.result && (this.devconId = r.result.devconId.valueBlock.value), "ticketId" in r.result) {
            var o = r.result.ticketId.valueBlock._valueHex;
            this.ticketId = parseInt("0x" + (0, i.bufferToHexCodes)(o), 16);
          }
          if ("ticketClass" in r.result) {
            var s = r.result.ticketClass.valueBlock._valueHex;
            this.ticketClass = parseInt("0x" + (0, i.bufferToHexCodes)(s), 16);
          }
        }, t;
      }();
      var a = function() {
        function t(t) {
          if (void 0 === t && (t = {}), "string" == typeof t) {
            var e = (t.startsWith("https://") ? new URL(t).searchParams.get('ticket') : t).split('_').join('/').split('-').join('+').split('.').join('=');
            t = 'undefined' != typeof Buffer ? Uint8Array.from(Buffer.from(e, 'base64')).buffer : Uint8Array.from(atob(e), (function(t) {
              return t.charCodeAt(0);
            })).buffer;
          }
          if (t instanceof ArrayBuffer) {
            var r = (0, n.fromBER)(t);
            this.fromSchema(r.result);
          } else this.ticket = new s(t.ticket), this.commitment = (0, i.getParametersValue)(t, "commitment"), this.publicKeyInfo = new o.default(t.publicKeyInfo), 
          this.signatureValue = (0, i.getParametersValue)(t, "signatureValue");
        }
        return t.schema = function(t) {
          void 0 === t && (t = {});
          var e = (0, i.getParametersValue)(t, "names", {});
          return new n.Sequence({
            name: e.blockName || "SignedDevconTicket",
            value: [ s.schema(t), new n.OctetString({
              name: "commitment"
            }), new n.BitString({
              name: "signatureValue"
            }) ]
          });
        }, t.prototype.fromSchema = function(e) {
          (0, i.clearProps)(e, [ "ticket", "commitment", "publicKeyInfo", "signatureValue" ]);
          var r = (0, n.compareSchema)(e, e, t.schema());
          if (!1 === r.verified) throw new Error("Object's schema was not verified against input data for SignedDevconTicket");
          this.ticket = new s(r.result.ticket.valueBeforeDecode), "commitment" in r.result && (this.commitment = r.result.commitment.valueBlock.valueHex), 
          this.publicKeyInfo = new o.default({
            schema: r.result.publicKeyInfo
          });
          var a = r.result.signatureValue;
          this.signatureValue = a.valueBlock.valueHex;
        }, t;
      }();
    },
    "./node_modules/@tokenscript/token-negotiator/dist/client/messaging.js": (t, e, r) => {
      "use strict";
      r.r(e), r.d(e, {
        MessageAction: () => s,
        MessageResponseAction: () => a,
        Messaging: () => u
      });
      var n = r("./node_modules/@tokenscript/token-negotiator/dist/utils/index.js");
      var i = function(t, e, r, n) {
        return new (r || (r = Promise))((function(i, o) {
          function s(t) {
            try {
              u(n.next(t));
            } catch (e) {
              o(e);
            }
          }
          function a(t) {
            try {
              u(n.throw(t));
            } catch (e) {
              o(e);
            }
          }
          function u(t) {
            t.done ? i(t.value) : function(t) {
              return t instanceof r ? t : new r((function(e) {
                e(t);
              }));
            }(t.value).then(s, a);
          }
          u((n = n.apply(t, e || [])).next());
        }));
      };
      var o = function(t, e) {
        var r, n, i, o, s = {
          label: 0,
          sent: function() {
            if (1 & i[0]) throw i[1];
            return i[1];
          },
          trys: [],
          ops: []
        };
        return o = {
          next: a(0),
          throw: a(1),
          return: a(2)
        }, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
          return this;
        }), o;
        function a(o) {
          return function(a) {
            return function(o) {
              if (r) throw new TypeError("Generator is already executing.");
              for (;s; ) try {
                if (r = 1, n && (i = 2 & o[0] ? n.return : o[0] ? n.throw || ((i = n.return) && i.call(n), 0) : n.next) && !(i = i.call(n, o[1])).done) return i;
                switch (n = 0, i && (o = [ 2 & o[0], i.value ]), o[0]) {
                 case 0:
                 case 1:
                  i = o;
                  break;

                 case 4:
                  return s.label++, {
                    value: o[1],
                    done: !1
                  };

                 case 5:
                  s.label++, n = o[1], o = [ 0 ];
                  continue;

                 case 7:
                  o = s.ops.pop(), s.trys.pop();
                  continue;

                 default:
                  if (!(i = s.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                    s = 0;
                    continue;
                  }
                  if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                    s.label = o[1];
                    break;
                  }
                  if (6 === o[0] && s.label < i[1]) {
                    s.label = i[1], i = o;
                    break;
                  }
                  if (i && s.label < i[2]) {
                    s.label = i[2], s.ops.push(o);
                    break;
                  }
                  i[2] && s.ops.pop(), s.trys.pop();
                  continue;
                }
                o = e.call(t, s);
              } catch (a) {
                o = [ 6, a ], n = 0;
              } finally {
                r = i = 0;
              }
              if (5 & o[0]) throw o[1];
              return {
                value: o[0] ? o[1] : void 0,
                done: !0
              };
            }([ o, a ]);
          };
        }
      };
      var s;
      var a;
      !function(t) {
        t.COOKIE_CHECK = "cookie-check", t.GET_ISSUER_TOKENS = "get-issuer-tokens", t.GET_PROOF = "get-proof";
      }(s || (s = {})), function(t) {
        t.COOKIE_CHECK = "cookie-check", t.ISSUER_TOKENS = "issuer-tokens", t.PROOF = "proof", t.ERROR = "error", t.SHOW_FRAME = "show-frame";
      }(a || (a = {}));
      var u = function() {
        function t() {
          this.iframeStorageSupport = null, this.requestQueue = {};
        }
        return t.prototype.sendMessage = function(t) {
          return i(this, void 0, void 0, (function() {
            var e;
            return o(this, (function(r) {
              switch (r.label) {
               case 0:
                return null !== this.iframeStorageSupport ? [ 3, 2 ] : (e = this, [ 4, this.thirdPartyCookieSupportCheck(t.origin) ]);

               case 1:
                e.iframeStorageSupport = r.sent(), r.label = 2;

               case 2:
                return console.log("Send request: "), console.log(t), this.iframeStorageSupport ? [ 2, this.sendIframe(t) ] : [ 2, this.sendPopup(t) ];
              }
            }));
          }));
        }, t.prototype.sendIframe = function(e) {
          var r = this;
          return new Promise((function(n, i) {
            var o = t.getUniqueEventId();
            var s = r.constructUrl(o, e);
            var a = r.createIframe();
            r.setResponseListener(o, e.origin, e.timeout, n, i, (function() {
              (null == a ? void 0 : a.parentNode) && a.parentNode.removeChild(a);
              var t = r.getModal();
              t && (t.style.display = "none");
            }), a), a.src = s;
          }));
        }, t.prototype.sendPopup = function(e) {
          var r = this;
          return new Promise((function(n, i) {
            var o = t.getUniqueEventId();
            var s = null;
            r.setResponseListener(o, e.origin, e.timeout, n, i, (function() {
              s && s.close();
            })), s = r.openTab(r.constructUrl(o, e));
          }));
        }, t.prototype.setResponseListener = function(t, e, r, i, o, s, u) {
          var h = this;
          void 0 === u && (u = null);
          var l = !1;
          var f = null;
          var c = function(r) {
            var n = r.data;
            var s = new URL(e);
            if (n.evtid == t) if (s.origin == r.origin) {
              if (console.log("event response received"), console.log(r.data), l = !0, n.evt == a.ERROR) o(n.errors); else {
                if (n.evt == a.SHOW_FRAME) {
                  if (u) h.getModal().style.display = "block";
                  return;
                }
                i(r.data);
              }
              f && clearTimeout(f), d();
            } else console.log("Does not match origin " + r.origin);
          };
          var d = function() {
            (0, n.removePostMessageListener)(c), s();
          };
          (0, n.attachPostMessageListener)(c), null == r && (r = 5e3), r > 0 && (f = setTimeout((function() {
            l || o("Failed to receive response from window/iframe"), d();
          }), r));
        }, t.prototype.getModal = function() {
          var t = document.getElementById("modal-tn");
          return t || ((t = document.createElement('div')).id = "modal-tn", t.className = "modal-tn", t.style.display = "none", t.innerHTML = "\n            <div class=\"modal-content-tn\">\n                <div class=\"modal-header-tn\">\n                    <span class=\"modal-close-tn\">&times;</span>\n                </div>\n                <div class=\"modal-body-tn\"></div>\n            </div>\n        ", 
          document.body.appendChild(t), t.getElementsByClassName('modal-close-tn')[0].addEventListener('click', (function() {
            t && (t.style.display = "none");
          })), t);
        }, t.prototype.getCookieSupport = function(t) {
          return i(this, void 0, void 0, (function() {
            var e;
            return o(this, (function(r) {
              switch (r.label) {
               case 0:
                return null !== this.iframeStorageSupport ? [ 3, 2 ] : (e = this, [ 4, this.thirdPartyCookieSupportCheck(t) ]);

               case 1:
                e.iframeStorageSupport = r.sent(), r.label = 2;

               case 2:
                return [ 2, this.iframeStorageSupport ];
              }
            }));
          }));
        }, t.prototype.thirdPartyCookieSupportCheck = function(e) {
          var r = this;
          return new Promise((function(n, i) {
            var o = t.getUniqueEventId();
            var a = e + '?action=' + s.COOKIE_CHECK + '&evtid=' + o;
            var u = r.createIframe();
            r.setResponseListener(o, e, 5e3, (function(t) {
              n(!!t.thirdPartyCookies);
            }), i, (function() {
              (null == u ? void 0 : u.parentNode) && u.parentNode.removeChild(u);
            })), console.log("listener set"), u.src = a;
          }));
        }, t.prototype.constructUrl = function(t, e) {
          var r = e.origin + "?evtid=" + t + "&action=" + e.action;
          return e.filter && (r += "&filter=" + JSON.stringify(e.filter)), e.token && (r += "&token=" + JSON.stringify(e.token)), 
          r;
        }, t.prototype.openTab = function(t) {
          return window.open(t, "win1", "left=0,top=0,width=320,height=320");
        }, t.prototype.createIframe = function(t) {
          var e = document.createElement('iframe');
          return this.getModal().getElementsByClassName('modal-body-tn')[0].appendChild(e), t && (e.src = t), e;
        }, t.getUniqueEventId = function() {
          return (new Date).getTime();
        }, t;
      }();
    },
    "./node_modules/@tokenscript/token-negotiator/dist/core/index.js": (t, e, r) => {
      "use strict";
      r.r(e), r.d(e, {
        filterTokens: () => h,
        readTokens: () => l,
        decodeTokens: () => f,
        storeMagicURL: () => c,
        readMagicUrl: () => d,
        ethKeyIsValid: () => v,
        validateUseEthKey: () => g,
        getUnpredictableNumber: () => m,
        getChallengeSigned: () => p,
        connectMetamaskAndGetAddress: () => y,
        signNewChallenge: () => b,
        signMessageWithBrowserWallet: () => w,
        rawTokenCheck: () => A,
        getRawToken: () => k
      });
      var n = r("./node_modules/@tokenscript/token-negotiator/dist/utils/index.js");
      var i = r("./node_modules/@ethersproject/hash/lib.esm/message.js");
      var o = r("./node_modules/@ethersproject/bytes/lib.esm/index.js");
      var s = r("./node_modules/@ethersproject/transactions/lib.esm/index.js");
      var a = function(t, e, r, n) {
        return new (r || (r = Promise))((function(i, o) {
          function s(t) {
            try {
              u(n.next(t));
            } catch (e) {
              o(e);
            }
          }
          function a(t) {
            try {
              u(n.throw(t));
            } catch (e) {
              o(e);
            }
          }
          function u(t) {
            t.done ? i(t.value) : function(t) {
              return t instanceof r ? t : new r((function(e) {
                e(t);
              }));
            }(t.value).then(s, a);
          }
          u((n = n.apply(t, e || [])).next());
        }));
      };
      var u = function(t, e) {
        var r, n, i, o, s = {
          label: 0,
          sent: function() {
            if (1 & i[0]) throw i[1];
            return i[1];
          },
          trys: [],
          ops: []
        };
        return o = {
          next: a(0),
          throw: a(1),
          return: a(2)
        }, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
          return this;
        }), o;
        function a(o) {
          return function(a) {
            return function(o) {
              if (r) throw new TypeError("Generator is already executing.");
              for (;s; ) try {
                if (r = 1, n && (i = 2 & o[0] ? n.return : o[0] ? n.throw || ((i = n.return) && i.call(n), 0) : n.next) && !(i = i.call(n, o[1])).done) return i;
                switch (n = 0, i && (o = [ 2 & o[0], i.value ]), o[0]) {
                 case 0:
                 case 1:
                  i = o;
                  break;

                 case 4:
                  return s.label++, {
                    value: o[1],
                    done: !1
                  };

                 case 5:
                  s.label++, n = o[1], o = [ 0 ];
                  continue;

                 case 7:
                  o = s.ops.pop(), s.trys.pop();
                  continue;

                 default:
                  if (!(i = s.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                    s = 0;
                    continue;
                  }
                  if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                    s.label = o[1];
                    break;
                  }
                  if (6 === o[0] && s.label < i[1]) {
                    s.label = i[1], i = o;
                    break;
                  }
                  if (i && s.label < i[2]) {
                    s.label = i[2], s.ops.push(o);
                    break;
                  }
                  i[2] && s.ops.pop(), s.trys.pop();
                  continue;
                }
                o = e.call(t, s);
              } catch (a) {
                o = [ 6, a ], n = 0;
              } finally {
                r = i = 0;
              }
              if (5 & o[0]) throw o[1];
              return {
                value: o[0] ? o[1] : void 0,
                done: !0
              };
            }([ o, a ]);
          };
        }
      };
      var h = function(t, e) {
        0 === Object.keys(e).length && (e = e);
        var r = [];
        if (t.length && "object" == typeof e && Object.keys(e).length) {
          var n = Object.keys(e);
          return t.forEach((function(t) {
            var i = 1;
            n.forEach((function(r) {
              t[r] && t[r].toString() !== e[r].toString() && (i = 0);
            })), i && r.push(t);
          })), r;
        }
        return t;
      };
      var l = function(t) {
        var e = localStorage.getItem(t);
        var r = [];
        var n = {
          tokens: [],
          noTokens: !0,
          success: !0
        };
        try {
          e && e.length && (0 !== (r = JSON.parse(e)).length && r.forEach((function(t) {
            t.token && t.secret && n.tokens.push(t);
          })), n.tokens.length && (n.noTokens = !1));
        } catch (i) {
          n.success = !1;
        }
        return n;
      };
      var f = function(t, e, r) {
        var i = JSON.parse(t);
        return i.length ? i.map((function(t) {
          if (t.token) {
            var i = new e((0, n.base64ToUint8array)(t.token).buffer);
            if (i && i[r]) return i[r];
          }
        })) : [];
      };
      var c = function(t, e) {
        t && localStorage.setItem(e, JSON.stringify(t));
      };
      var d = function(t, e, r, n) {
        var i = new URLSearchParams(window.location.search);
        var o = i.get(t);
        var s = i.get(e);
        var a = i.get(r);
        if (o && s) {
          var u = l(n);
          var h = !0;
          var f = u.tokens.map((function(t) {
            return t.token === o && (h = !1), t;
          }));
          return h ? (f.push({
            token: o,
            secret: s,
            id: a,
            magic_link: window.location.href
          }), f) : [];
        }
      };
      var v = function(t) {
        return t.expiry >= Date.now();
      };
      var g = function(t, e) {
        return a(void 0, void 0, void 0, (function() {
          return u(this, (function(r) {
            switch (r.label) {
             case 0:
              return r.trys.push([ 0, 3, , 4 ]), [ 4, fetch(t, {
                method: 'POST',
                cache: 'no-cache',
                headers: {
                  'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(e)
              }) ];

             case 1:
              return [ 4, r.sent().json() ];

             case 2:
              return [ 2, r.sent().address ];

             case 3:
              return r.sent(), [ 2, {
                success: !1,
                message: "validate ethkey request failed"
              } ];

             case 4:
              return [ 2 ];
            }
          }));
        }));
      };
      var m = function(t) {
        return a(void 0, void 0, void 0, (function() {
          var e;
          return u(this, (function(r) {
            switch (r.label) {
             case 0:
              return r.trys.push([ 0, 3, , 4 ]), [ 4, fetch(t) ];

             case 1:
              return [ 4, r.sent().json() ];

             case 2:
              return (e = r.sent()).success = !0, [ 2, e ];

             case 3:
              return r.sent(), [ 2, {
                success: !1,
                message: "UN request failed"
              } ];

             case 4:
              return [ 2 ];
            }
          }));
        }));
      };
      var p = function(t, e) {
        return a(void 0, void 0, void 0, (function() {
          var r, n, i, o, s;
          return u(this, (function(a) {
            switch (a.label) {
             case 0:
              r = localStorage.getItem(t.ethKeyitemStorageKey), n = r && r.length ? JSON.parse(r) : {}, a.label = 1;

             case 1:
              return a.trys.push([ 1, 7, , 8 ]), (i = e.getConnectedWalletData()[0].address) ? [ 3, 3 ] : [ 4, e.connect("MetaMask") ];

             case 2:
              a.sent(), i = e.getConnectedWalletData()[0].address, a.label = 3;

             case 3:
              return i = i.toLowerCase(), o = void 0, n && n[i] && !v(n[i]) && delete n[i], n && n[i] ? (o = n[i], [ 3, 6 ]) : [ 3, 4 ];

             case 4:
              return [ 4, b(t.unEndPoint, e) ];

             case 5:
              (o = a.sent()) && (n[o.address.toLowerCase()] = o, localStorage.setItem(t.ethKeyitemStorageKey, JSON.stringify(n))), a.label = 6;

             case 6:
              return [ 2, o ];

             case 7:
              throw s = a.sent(), new Error(s);

             case 8:
              return [ 2 ];
            }
          }));
        }));
      };
      var y = function() {
        return a(void 0, void 0, void 0, (function() {
          var t;
          return u(this, (function(e) {
            switch (e.label) {
             case 0:
              return (0, n.requiredParams)(window.ethereum, 'Please install metamask to continue.'), [ 4, window.ethereum.request({
                method: 'eth_requestAccounts'
              }) ];

             case 1:
              if (!(t = e.sent()) || !t.length) throw new Error("Active Wallet required");
              return [ 2, t[0] ];
            }
          }));
        }));
      };
      var b = function(t, e) {
        return a(void 0, void 0, void 0, (function() {
          var r, n, a, h, l, f, c, d, v;
          return u(this, (function(u) {
            switch (u.label) {
             case 0:
              return console.log('sign new challenge'), [ 4, m(t) ];

             case 1:
              return r = u.sent(), n = r.number, a = r.randomness, h = r.domain, l = r.expiration, f = r.messageToSign, [ 4, w(f, e) ];

             case 2:
              return c = u.sent(), d = i.hashMessage(f), v = o.arrayify(d), [ 2, {
                address: s.recoverAddress(v, c),
                expiry: l,
                domain: h,
                randomness: a,
                signature: c,
                UN: n
              } ];
            }
          }));
        }));
      };
      var w = function(t, e) {
        return a(void 0, void 0, void 0, (function() {
          return u(this, (function(r) {
            switch (r.label) {
             case 0:
              return [ 4, e.signWith(t, e.getConnectedWalletData()[0]) ];

             case 1:
              return [ 2, r.sent() ];
            }
          }));
        }));
      };
      var A = function(t, e) {
        return a(void 0, void 0, void 0, (function() {
          var r, i, o, s;
          return u(this, (function(a) {
            return (0, n.requiredParams)(window.ethereum, 'Please install metamask to continue.'), (r = k(t, e)) ? (i = r.token, o = r.secret, 
            s = {
              ticketBlob: i,
              ticketSecret: o,
              attestationOrigin: e.attestationOrigin
            }, r && r.id && (s.email = r.id), r && r.magic_link && (s.magicLink = r.magic_link), [ 2, s ]) : [ 2, null ];
          }));
        }));
      };
      var k = function(t, e) {
        if (t && Object.keys(t).length) {
          var r = l(e.itemStorageKey);
          if (r.success && !r.noTokens) {
            var i = r.tokens;
            var o = {};
            return i.length && i.forEach((function(r) {
              if (r.token) {
                var i = new (0, e.tokenParser)((0, n.base64ToUint8array)(r.token).buffer);
                if (i && i[e.unsignedTokenDataName]) {
                  var s = i[e.unsignedTokenDataName];
                  (0, n.compareObjects)(s, t) && (o = r);
                }
              }
            })), o;
          }
          return null;
        }
      };
    },
    "./node_modules/@tokenscript/token-negotiator/dist/outlet/auth-handler.js": (t, e, r) => {
      "use strict";
      r.r(e), r.d(e, {
        AuthHandler: () => i
      });
      var n = r("./node_modules/@tokenscript/token-negotiator/dist/client/messaging.js");
      var i = function() {
        function t(t, e, r, n) {
          this.iframe = null, this.iframeWrap = null, this.attestationBlob = null, this.attestationSecret = null, this.outlet = t, 
          this.evtid = e, this.base64senderPublicKey = r.base64senderPublicKey, this.base64attestorPubKey = r.base64attestorPubKey, 
          this.signedTokenBlob = n.ticketBlob, this.magicLink = n.magicLink, this.email = n.email, this.signedTokenSecret = n.ticketSecret, 
          this.attestationOrigin = n.attestationOrigin;
        }
        return t.prototype.authenticate = function() {
          var t = this;
          return new Promise((function(e, r) {
            if (!t.attestationOrigin) return r("Attestation origin is null");
            window.addEventListener("message", (function(n) {
              if (t.attestationOrigin) {
                var i = new URL(t.attestationOrigin);
                n.origin === i.origin && t.iframe && t.iframeWrap && t.iframe.contentWindow && t.postMessageAttestationListener(n, e, r);
              }
            })), t.createIframe();
          }));
        }, t.prototype.createIframe = function() {
          var t;
          var e = document.createElement('iframe');
          this.iframe = e, e.src = null !== (t = this.attestationOrigin) && void 0 !== t ? t : "", e.style.width = '800px', e.style.height = '700px', 
          e.style.maxWidth = '100%', e.style.background = '#fff';
          var r = document.createElement('div');
          this.iframeWrap = r, r.setAttribute('style', 'width:100%;min-height: 100vh; position: fixed; align-items: center; justify-content: center;display: none;top: 0; left: 0; background: #fffa'), 
          r.appendChild(e), document.body.appendChild(r);
        }, t.prototype.postMessageAttestationListener = function(t, e, r) {
          if (console.log('postMessageAttestationListener event (Authenticator)', t), void 0 !== t.data.ready && !0 === t.data.ready) {
            var i = {
              force: !1
            };
            return this.magicLink && (i.magicLink = this.magicLink), this.email && (i.email = this.email), void this.iframe.contentWindow.postMessage(i, this.attestationOrigin);
          }
          if (void 0 !== t.data.display && (!0 === t.data.display ? (this.iframeWrap.style.display = 'flex', this.outlet.sendMessageResponse({
            evtid: this.evtid,
            evt: n.MessageResponseAction.SHOW_FRAME
          })) : (t.data.error && (console.log("Error received from the iframe: " + t.data.error), r(t.data.error)), this.iframeWrap.style.display = 'none')), 
          t.data.hasOwnProperty('attestation') && t.data.hasOwnProperty('requestSecret')) {
            this.iframeWrap.remove(), this.attestationBlob = t.data.attestation, this.attestationSecret = t.data.requestSecret, console.log('attestation data received.'), 
            console.log(this.attestationBlob), console.log(this.attestationSecret), console.log(this.base64attestorPubKey);
            try {
              window.authenticator.getUseTicket(this.signedTokenSecret, this.attestationSecret, this.signedTokenBlob, this.attestationBlob, this.base64attestorPubKey, this.base64senderPublicKey).then((function(t) {
                t ? (console.log('this.authResultCallback( useToken ): '), e(t)) : (console.log('this.authResultCallback( empty ): '), r(t));
              }));
            } catch (o) {
              console.log("UseDevconTicket. Something went wrong. " + o), r(o);
            }
          }
        }, t;
      }();
    },
    "./node_modules/@tokenscript/token-negotiator/dist/outlet/index.js": (t, e, r) => {
      "use strict";
      r.r(e), r.d(e, {
        Outlet: () => l
      });
      var n = r("./node_modules/@tokenscript/token-negotiator/dist/core/index.js");
      var i = r("./node_modules/@tokenscript/token-negotiator/dist/utils/index.js");
      var o = r("./node_modules/@tokenscript/token-negotiator/dist/tokenLookup.js");
      var s = r("./node_modules/@tokenscript/token-negotiator/dist/client/messaging.js");
      var a = r("./node_modules/@tokenscript/token-negotiator/dist/outlet/auth-handler.js");
      var u = function(t, e, r, n) {
        return new (r || (r = Promise))((function(i, o) {
          function s(t) {
            try {
              u(n.next(t));
            } catch (e) {
              o(e);
            }
          }
          function a(t) {
            try {
              u(n.throw(t));
            } catch (e) {
              o(e);
            }
          }
          function u(t) {
            t.done ? i(t.value) : function(t) {
              return t instanceof r ? t : new r((function(e) {
                e(t);
              }));
            }(t.value).then(s, a);
          }
          u((n = n.apply(t, e || [])).next());
        }));
      };
      var h = function(t, e) {
        var r, n, i, o, s = {
          label: 0,
          sent: function() {
            if (1 & i[0]) throw i[1];
            return i[1];
          },
          trys: [],
          ops: []
        };
        return o = {
          next: a(0),
          throw: a(1),
          return: a(2)
        }, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
          return this;
        }), o;
        function a(o) {
          return function(a) {
            return function(o) {
              if (r) throw new TypeError("Generator is already executing.");
              for (;s; ) try {
                if (r = 1, n && (i = 2 & o[0] ? n.return : o[0] ? n.throw || ((i = n.return) && i.call(n), 0) : n.next) && !(i = i.call(n, o[1])).done) return i;
                switch (n = 0, i && (o = [ 2 & o[0], i.value ]), o[0]) {
                 case 0:
                 case 1:
                  i = o;
                  break;

                 case 4:
                  return s.label++, {
                    value: o[1],
                    done: !1
                  };

                 case 5:
                  s.label++, n = o[1], o = [ 0 ];
                  continue;

                 case 7:
                  o = s.ops.pop(), s.trys.pop();
                  continue;

                 default:
                  if (!(i = s.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                    s = 0;
                    continue;
                  }
                  if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                    s.label = o[1];
                    break;
                  }
                  if (6 === o[0] && s.label < i[1]) {
                    s.label = i[1], i = o;
                    break;
                  }
                  if (i && s.label < i[2]) {
                    s.label = i[2], s.ops.push(o);
                    break;
                  }
                  i[2] && s.ops.pop(), s.trys.pop();
                  continue;
                }
                o = e.call(t, s);
              } catch (a) {
                o = [ 6, a ], n = 0;
              } finally {
                r = i = 0;
              }
              if (5 & o[0]) throw o[1];
              return {
                value: o[0] ? o[1] : void 0,
                done: !0
              };
            }([ o, a ]);
          };
        }
      };
      var l = function() {
        function t(t) {
          var e = t.tokenName;
          this.tokenName = e, this.tokenIssuer = o.tokenLookup[e], (0, i.requiredParams)(o.tokenLookup[e], "Please provide the token name when installing token outlet"), 
          this.pageOnLoadEventHandler();
        }
        return t.prototype.getDataFromQuery = function(t) {
          var e = new URLSearchParams(window.location.search).get(t);
          return e || void 0;
        }, t.prototype.getFilter = function() {
          var t = this.getDataFromQuery('filter');
          return t ? JSON.parse(t) : {};
        }, t.prototype.pageOnLoadEventHandler = function() {
          var t = this.getDataFromQuery('evtid');
          var e = this.getDataFromQuery('action');
          if (document.referrer) switch (console.log("Outlet received event ID " + t + " action " + e), e) {
           case s.MessageAction.GET_ISSUER_TOKENS:
            this.sendTokens(t);
            break;

           case s.MessageAction.GET_PROOF:
            var r = this.getDataFromQuery('token');
            (0, i.requiredParams)(r, "unsigned token is missing"), this.sendTokenProof(t, r);
            break;

           case s.MessageAction.COOKIE_CHECK:
            this.sendMessageResponse({
              evtid: t,
              evt: s.MessageResponseAction.COOKIE_CHECK,
              thirdPartyCookies: localStorage.getItem('cookie-support-check')
            });
            break;

           default:
            localStorage.setItem('cookie-support-check', 'test');
            var o = this.tokenIssuer, a = o.tokenUrlName, u = o.tokenSecretName, h = o.tokenIdName, l = o.itemStorageKey;
            var f = (0, n.readMagicUrl)(a, u, h, l);
            f && f.length && (0, n.storeMagicURL)(f, l), this.sendTokens(t);
          }
        }, t.prototype.prepareTokenOutput = function(t, e) {
          var r = localStorage.getItem(o.tokenLookup[t].itemStorageKey);
          if (!r) return [];
          var i = (0, n.decodeTokens)(r, o.tokenLookup[t].tokenParser, o.tokenLookup[t].unsignedTokenDataName);
          return (0, n.filterTokens)(i, e);
        }, t.prototype.sendTokenProof = function(t, e) {
          return u(this, void 0, void 0, (function() {
            var r, i, o, u;
            return h(this, (function(h) {
              switch (h.label) {
               case 0:
                if (!e) return [ 2, 'error' ];
                r = JSON.parse(e), h.label = 1;

               case 1:
                return h.trys.push([ 1, 4, , 5 ]), [ 4, (0, n.rawTokenCheck)(r, this.tokenIssuer) ];

               case 2:
                return i = h.sent(), [ 4, new a.AuthHandler(this, t, this.tokenIssuer, i).authenticate() ];

               case 3:
                return o = h.sent(), this.sendMessageResponse({
                  evtid: t,
                  evt: s.MessageResponseAction.PROOF,
                  issuer: this.tokenName,
                  proof: JSON.stringify(o)
                }), [ 3, 5 ];

               case 4:
                return u = h.sent(), this.sendMessageResponse({
                  evtid: t,
                  evt: s.MessageResponseAction.ERROR,
                  errors: [ u ]
                }), [ 3, 5 ];

               case 5:
                return [ 2 ];
              }
            }));
          }));
        }, t.prototype.sendTokens = function(t) {
          var e = this.prepareTokenOutput(this.tokenName, this.getFilter());
          this.sendMessageResponse({
            evtid: t,
            evt: s.MessageResponseAction.ISSUER_TOKENS,
            issuer: this.tokenName,
            tokens: e
          });
        }, t.prototype.sendMessageResponse = function(t) {
          var e, r;
          e = window.opener ? window.opener : window.parent, r = new URL(document.referrer).origin, e && e.postMessage(t, r);
        }, t;
      }();
    },
    "./node_modules/@tokenscript/token-negotiator/dist/tokenLookup.js": (t, e, r) => {
      "use strict";
      r.r(e), r.d(e, {
        tokenLookup: () => i
      });
      var n = r("./node_modules/@tokenscript/token-negotiator/dist/Attestation/SignedDevonTicket.js");
      var i = {
        devcon: {
          onChain: !1,
          tokenIssuerPublicKey: "",
          title: 'Devcon',
          tokenName: 'devcon-ticket-local-3002',
          attestationOrigin: "https://stage.attestation.id/",
          tokenOrigin: "http://localhost:3002/",
          tokenUrlName: 'ticket',
          unEndPoint: 'https://crypto-verify.herokuapp.com/use-devcon-ticket',
          tokenSecretName: 'secret',
          tokenIdName: 'id',
          unsignedTokenDataName: 'ticket',
          itemStorageKey: 'dcTokens',
          ethKeyitemStorageKey: 'dcEthKeys',
          emblem: 'https://raw.githubusercontent.com/TokenScript/token-negotiator/main/mock-images/devcon.svg',
          tokenParser: n.SignedDevconTicket,
          base64senderPublicKey: "-----BEGIN PUBLIC KEY-----\nMIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA////////////////\n/////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5m\nfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0\nSKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFB\nAgEBA0IABJUMfAvtI8PKxcwxu7mq2btVMjh4gmcKwrHN8HmasOvHZMJn9wTo/doH\nlquDl6TSEBAk0kxO//aVs6QX8u0OSM0=\n-----END PUBLIC KEY-----",
          base64attestorPubKey: "MIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBA0IABL+y43T1OJFScEep69/yTqpqnV/jzONz9Sp4TEHyAJ7IPN9+GHweCX1hT4OFxt152sBN3jJc1s0Ymzd8pNGZNoQ="
        },
        "devcon-remote": {
          onChain: !1,
          tokenIssuerPublicKey: "",
          title: 'Devcon',
          tokenName: 'devcon',
          attestationOrigin: "https://stage.attestation.id/",
          tokenOrigin: "https://tokenscript.github.io/token-negotiator-gh-pages/token-outlet-website/build/",
          tokenUrlName: 'ticket',
          unEndPoint: 'https://crypto-verify.herokuapp.com/use-devcon-ticket',
          tokenSecretName: 'secret',
          tokenIdName: 'id',
          unsignedTokenDataName: 'ticket',
          itemStorageKey: 'dcTokens',
          ethKeyitemStorageKey: 'dcEthKeys',
          emblem: 'https://raw.githubusercontent.com/TokenScript/token-negotiator/main/mock-images/devcon.svg',
          tokenParser: n.SignedDevconTicket,
          base64senderPublicKey: "-----BEGIN PUBLIC KEY-----\nMIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA////////////////\n/////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5m\nfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0\nSKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFB\nAgEBA0IABJUMfAvtI8PKxcwxu7mq2btVMjh4gmcKwrHN8HmasOvHZMJn9wTo/doH\nlquDl6TSEBAk0kxO//aVs6QX8u0OSM0=\n-----END PUBLIC KEY-----",
          base64attestorPubKey: "MIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBA0IABL+y43T1OJFScEep69/yTqpqnV/jzONz9Sp4TEHyAJ7IPN9+GHweCX1hT4OFxt152sBN3jJc1s0Ymzd8pNGZNoQ="
        }
      };
    },
    "./node_modules/@tokenscript/token-negotiator/dist/utils/index.js": (t, e, r) => {
      "use strict";
      r.r(e), r.d(e, {
        logger: () => a,
        requiredParams: () => u,
        compareObjects: () => h,
        base64ToUint8array: () => l,
        asyncHandle: () => f,
        attachPostMessageListener: () => c,
        removePostMessageListener: () => d,
        splitOnChainKey: () => v
      });
      var n = r("./node_modules/buffer/index.js");
      var i = function(t, e, r, n) {
        return new (r || (r = Promise))((function(i, o) {
          function s(t) {
            try {
              u(n.next(t));
            } catch (e) {
              o(e);
            }
          }
          function a(t) {
            try {
              u(n.throw(t));
            } catch (e) {
              o(e);
            }
          }
          function u(t) {
            t.done ? i(t.value) : function(t) {
              return t instanceof r ? t : new r((function(e) {
                e(t);
              }));
            }(t.value).then(s, a);
          }
          u((n = n.apply(t, e || [])).next());
        }));
      };
      var o = function(t, e) {
        var r, n, i, o, s = {
          label: 0,
          sent: function() {
            if (1 & i[0]) throw i[1];
            return i[1];
          },
          trys: [],
          ops: []
        };
        return o = {
          next: a(0),
          throw: a(1),
          return: a(2)
        }, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
          return this;
        }), o;
        function a(o) {
          return function(a) {
            return function(o) {
              if (r) throw new TypeError("Generator is already executing.");
              for (;s; ) try {
                if (r = 1, n && (i = 2 & o[0] ? n.return : o[0] ? n.throw || ((i = n.return) && i.call(n), 0) : n.next) && !(i = i.call(n, o[1])).done) return i;
                switch (n = 0, i && (o = [ 2 & o[0], i.value ]), o[0]) {
                 case 0:
                 case 1:
                  i = o;
                  break;

                 case 4:
                  return s.label++, {
                    value: o[1],
                    done: !1
                  };

                 case 5:
                  s.label++, n = o[1], o = [ 0 ];
                  continue;

                 case 7:
                  o = s.ops.pop(), s.trys.pop();
                  continue;

                 default:
                  if (!(i = s.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                    s = 0;
                    continue;
                  }
                  if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                    s.label = o[1];
                    break;
                  }
                  if (6 === o[0] && s.label < i[1]) {
                    s.label = i[1], i = o;
                    break;
                  }
                  if (i && s.label < i[2]) {
                    s.label = i[2], s.ops.push(o);
                    break;
                  }
                  i[2] && s.ops.pop(), s.trys.pop();
                  continue;
                }
                o = e.call(t, s);
              } catch (a) {
                o = [ 6, a ], n = 0;
              } finally {
                r = i = 0;
              }
              if (5 & o[0]) throw o[1];
              return {
                value: o[0] ? o[1] : void 0,
                done: !0
              };
            }([ o, a ]);
          };
        }
      };
      var s = function(t) {
        var e = "function" == typeof Symbol && Symbol.iterator, r = e && t[e], n = 0;
        if (r) return r.call(t);
        if (t && "number" == typeof t.length) return {
          next: function() {
            return t && n >= t.length && (t = void 0), {
              value: t && t[n++],
              done: !t
            };
          }
        };
        throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      var a = function(t) {
        console.log(t);
      };
      var u = function(t, e) {
        if (!t) throw new Error(e);
      };
      var h = function(t, e) {
        var r, n;
        var i = Object.keys(t);
        var o = Object.keys(e);
        if (i.length !== o.length) return !1;
        try {
          for (var a = s(i), u = a.next(); !u.done; u = a.next()) {
            var h = u.value;
            if (t[h] !== e[h]) return !1;
          }
        } catch (l) {
          r = {
            error: l
          };
        } finally {
          try {
            u && !u.done && (n = a.return) && n.call(a);
          } finally {
            if (r) throw r.error;
          }
        }
        return !0;
      };
      var l = function(t) {
        return t = t.split('-').join('+').split('_').join('/').split('.').join('='), Uint8Array.from(n.Buffer.from(t, 'base64'));
      };
      var f = function(t) {
        return i(void 0, void 0, void 0, (function() {
          return o(this, (function(e) {
            switch (e.label) {
             case 0:
              return e.trys.push([ 0, 2, , 3 ]), [ 4, t ];

             case 1:
              return [ 2, [ e.sent(), void 0 ] ];

             case 2:
              return [ 2, [ void 0, e.sent() ] ];

             case 3:
              return [ 2 ];
            }
          }));
        }));
      };
      var c = function(t) {
        window.addEventListener ? window.addEventListener("message", t, !1) : window.attachEvent("onmessage", t);
      };
      var d = function(t) {
        window.removeEventListener ? window.removeEventListener("message", t) : window.detachEvent("onmessage", t);
      };
      var v = function(t) {
        var e = t.split('.');
        return {
          address: e[0],
          chain: e[1],
          openSeaSlug: e[2]
        };
      };
    },
    "./node_modules/asn1js/node_modules/pvutils/src/utils.js": (t, e, r) => {
      "use strict";
      function n(t) {
        return new Date(t.getTime() + 6e4 * t.getTimezoneOffset());
      }
      function i(t, e, r) {
        return t instanceof Object == !1 ? r : e in t ? t[e] : r;
      }
      function o(t, e = 0, r = t.byteLength - e, n = !1) {
        let i = "";
        for (const o of new Uint8Array(t, e, r)) {
          const t = o.toString(16).toUpperCase();
          1 === t.length && (i += "0"), i += t, n && (i += " ");
        }
        return i.trim();
      }
      function s(t, e, r, n) {
        return e instanceof ArrayBuffer == !1 ? (t.error = "Wrong parameter: inputBuffer must be \"ArrayBuffer\"", !1) : 0 === e.byteLength ? (t.error = "Wrong parameter: inputBuffer has zero length", 
        !1) : r < 0 ? (t.error = "Wrong parameter: inputOffset less than zero", !1) : n < 0 ? (t.error = "Wrong parameter: inputLength less than zero", 
        !1) : !(e.byteLength - r - n < 0) || (t.error = "End of input reached before message was fully decoded (inconsistent offset and length values)", 
        !1);
      }
      function a(t, e) {
        let r = 0;
        if (1 === t.length) return t[0];
        for (let n = t.length - 1; n >= 0; n--) r += t[t.length - 1 - n] * Math.pow(2, e * n);
        return r;
      }
      function u(t, e, r = -1) {
        const n = r;
        let i = t;
        let o = 0;
        let s = Math.pow(2, e);
        for (let a = 1; a < 8; a++) {
          if (t < s) {
            let t;
            if (n < 0) t = new ArrayBuffer(a), o = a; else {
              if (n < a) return new ArrayBuffer(0);
              t = new ArrayBuffer(n), o = n;
            }
            const r = new Uint8Array(t);
            for (let n = a - 1; n >= 0; n--) {
              const t = Math.pow(2, n * e);
              r[o - n - 1] = Math.floor(i / t), i -= r[o - n - 1] * t;
            }
            return t;
          }
          s *= Math.pow(2, e);
        }
        return new ArrayBuffer(0);
      }
      function h(...t) {
        let e = 0;
        let r = 0;
        for (const o of t) e += o.byteLength;
        const n = new ArrayBuffer(e);
        const i = new Uint8Array(n);
        for (const o of t) i.set(new Uint8Array(o), r), r += o.byteLength;
        return n;
      }
      function l(...t) {
        let e = 0;
        let r = 0;
        for (const o of t) e += o.length;
        const n = new ArrayBuffer(e);
        const i = new Uint8Array(n);
        for (const o of t) i.set(o, r), r += o.length;
        return i;
      }
      function f() {
        const t = new Uint8Array(this.valueHex);
        if (this.valueHex.byteLength >= 2) {
          const e = 255 === t[0] && 128 & t[1];
          const r = 0 === t[0] && 0 == (128 & t[1]);
          (e || r) && this.warnings.push("Needlessly long format");
        }
        const e = new ArrayBuffer(this.valueHex.byteLength);
        const r = new Uint8Array(e);
        for (let s = 0; s < this.valueHex.byteLength; s++) r[s] = 0;
        r[0] = 128 & t[0];
        const n = a(r, 8);
        const i = new ArrayBuffer(this.valueHex.byteLength);
        const o = new Uint8Array(i);
        for (let s = 0; s < this.valueHex.byteLength; s++) o[s] = t[s];
        o[0] &= 127;
        return a(o, 8) - n;
      }
      function c(t) {
        const e = t < 0 ? -1 * t : t;
        let r = 128;
        for (let n = 1; n < 8; n++) {
          if (e <= r) {
            if (t < 0) {
              const t = u(r - e, 8, n);
              return new Uint8Array(t)[0] |= 128, t;
            }
            let i = u(e, 8, n);
            let o = new Uint8Array(i);
            if (128 & o[0]) {
              const t = i.slice(0);
              const e = new Uint8Array(t);
              i = new ArrayBuffer(i.byteLength + 1), o = new Uint8Array(i);
              for (let r = 0; r < t.byteLength; r++) o[r + 1] = e[r];
              o[0] = 0;
            }
            return i;
          }
          r *= Math.pow(2, 8);
        }
        return new ArrayBuffer(0);
      }
      function d(t, e) {
        if (t.byteLength !== e.byteLength) return !1;
        const r = new Uint8Array(t);
        const n = new Uint8Array(e);
        for (let i = 0; i < r.length; i++) if (r[i] !== n[i]) return !1;
        return !0;
      }
      function v(t, e) {
        const r = t.toString(10);
        if (e < r.length) return "";
        const n = e - r.length;
        const i = new Array(n);
        for (let o = 0; o < n; o++) i[o] = "0";
        return i.join("").concat(r);
      }
      r.r(e), r.d(e, {
        getUTCDate: () => n,
        getParametersValue: () => i,
        bufferToHexCodes: () => o,
        checkBufferParams: () => s,
        utilFromBase: () => a,
        utilToBase: () => u,
        utilConcatBuf: () => h,
        utilConcatView: () => l,
        utilDecodeTC: () => f,
        utilEncodeTC: () => c,
        isEqualBuffer: () => d,
        padNumber: () => v,
        toBase64: () => p,
        fromBase64: () => y,
        arrayBufferToString: () => b,
        stringToArrayBuffer: () => w,
        nearestPowerOf2: () => k,
        clearProps: () => B
      });
      const g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      const m = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=";
      function p(t, e = !1, r = !1, n = !1) {
        let i = 0;
        let o = 0;
        let s = 0;
        let a = "";
        const u = e ? m : g;
        if (n) {
          let e = 0;
          for (let r = 0; r < t.length; r++) if (0 !== t.charCodeAt(r)) {
            e = r;
            break;
          }
          t = t.slice(e);
        }
        for (;i < t.length; ) {
          const e = t.charCodeAt(i++);
          i >= t.length && (o = 1);
          const n = t.charCodeAt(i++);
          i >= t.length && (s = 1);
          const h = t.charCodeAt(i++);
          const l = e >> 2;
          const f = (3 & e) << 4 | n >> 4;
          let c = (15 & n) << 2 | h >> 6;
          let d = 63 & h;
          1 === o ? c = d = 64 : 1 === s && (d = 64), a += r ? 64 === c ? `${u.charAt(l)}${u.charAt(f)}` : 64 === d ? `${u.charAt(l)}${u.charAt(f)}${u.charAt(c)}` : `${u.charAt(l)}${u.charAt(f)}${u.charAt(c)}${u.charAt(d)}` : `${u.charAt(l)}${u.charAt(f)}${u.charAt(c)}${u.charAt(d)}`;
        }
        return a;
      }
      function y(t, e = !1, r = !1) {
        const n = e ? m : g;
        function i(t) {
          for (let e = 0; e < 64; e++) if (n.charAt(e) === t) return e;
          return 64;
        }
        function o(t) {
          return 64 === t ? 0 : t;
        }
        let s = 0;
        let a = "";
        for (;s < t.length; ) {
          const e = i(t.charAt(s++));
          const r = s >= t.length ? 0 : i(t.charAt(s++));
          const n = s >= t.length ? 0 : i(t.charAt(s++));
          const u = s >= t.length ? 0 : i(t.charAt(s++));
          const h = o(e) << 2 | o(r) >> 4;
          const l = (15 & o(r)) << 4 | o(n) >> 2;
          const f = (3 & o(n)) << 6 | o(u);
          a += String.fromCharCode(h), 64 !== n && (a += String.fromCharCode(l)), 64 !== u && (a += String.fromCharCode(f));
        }
        if (r) {
          let t = -1;
          for (let e = a.length - 1; e >= 0; e--) if (0 !== a.charCodeAt(e)) {
            t = e;
            break;
          }
          a = -1 !== t ? a.slice(0, t + 1) : "";
        }
        return a;
      }
      function b(t) {
        let e = "";
        const r = new Uint8Array(t);
        for (const n of r) e += String.fromCharCode(n);
        return e;
      }
      function w(t) {
        const e = t.length;
        const r = new ArrayBuffer(e);
        const n = new Uint8Array(r);
        for (let i = 0; i < e; i++) n[i] = t.charCodeAt(i);
        return r;
      }
      const A = Math.log(2);
      function k(t) {
        const e = Math.log(t) / A;
        const r = Math.floor(e);
        const n = Math.round(e);
        return r === n ? r : n;
      }
      function B(t, e) {
        for (const r of e) delete t[r];
      }
    },
    "./node_modules/asn1js/src/asn1.js": (t, e, r) => {
      "use strict";
      r.r(e), r.d(e, {
        HexBlock: () => a,
        ValueBlock: () => l,
        BaseBlock: () => f,
        Primitive: () => d,
        Constructed: () => g,
        EndOfContent: () => p,
        Boolean: () => b,
        Sequence: () => w,
        Set: () => A,
        Null: () => k,
        OctetString: () => x,
        BitString: () => E,
        Integer: () => N,
        Enumerated: () => _,
        ObjectIdentifier: () => C,
        Utf8String: () => P,
        RelativeObjectIdentifier: () => R,
        BmpString: () => H,
        UniversalString: () => F,
        NumericString: () => V,
        PrintableString: () => K,
        TeletexString: () => J,
        VideotexString: () => W,
        IA5String: () => G,
        GraphicString: () => Z,
        VisibleString: () => $,
        GeneralString: () => X,
        CharacterString: () => Q,
        UTCTime: () => Y,
        GeneralizedTime: () => tt,
        DATE: () => et,
        TimeOfDay: () => rt,
        DateTime: () => nt,
        Duration: () => it,
        TIME: () => ot,
        Choice: () => st,
        Any: () => at,
        Repeated: () => ut,
        RawData: () => ht,
        fromBER: () => ft,
        compareSchema: () => ct,
        verifySchema: () => dt,
        fromJSON: () => vt
      });
      var n = r("./node_modules/asn1js/node_modules/pvutils/src/utils.js");
      const i = [ new Uint8Array([ 1 ]) ];
      const o = "0123456789";
      class s {
        constructor(t = {}) {
          this.blockLength = (0, n.getParametersValue)(t, "blockLength", 0), this.error = (0, n.getParametersValue)(t, "error", ""), 
          this.warnings = (0, n.getParametersValue)(t, "warnings", []), this.valueBeforeDecode = "valueBeforeDecode" in t ? t.valueBeforeDecode.slice(0) : new ArrayBuffer(0);
        }
        static blockName() {
          return "baseBlock";
        }
        toJSON() {
          return {
            blockName: this.constructor.blockName(),
            blockLength: this.blockLength,
            error: this.error,
            warnings: this.warnings,
            valueBeforeDecode: (0, n.bufferToHexCodes)(this.valueBeforeDecode, 0, this.valueBeforeDecode.byteLength)
          };
        }
      }
      const a = t => class extends t {
        constructor(t = {}) {
          super(t), this.isHexOnly = (0, n.getParametersValue)(t, "isHexOnly", !1), this.valueHex = "valueHex" in t ? t.valueHex.slice(0) : new ArrayBuffer(0);
        }
        static blockName() {
          return "hexBlock";
        }
        fromBER(t, e, r) {
          if (!1 === (0, n.checkBufferParams)(this, t, e, r)) return -1;
          return 0 === new Uint8Array(t, e, r).length ? (this.warnings.push("Zero buffer length"), e) : (this.valueHex = t.slice(e, e + r), 
          this.blockLength = r, e + r);
        }
        toBER(t = !1) {
          return !0 !== this.isHexOnly ? (this.error = "Flag \"isHexOnly\" is not set, abort", new ArrayBuffer(0)) : !0 === t ? new ArrayBuffer(this.valueHex.byteLength) : this.valueHex.slice(0);
        }
        toJSON() {
          let t = {};
          try {
            t = super.toJSON();
          } catch (e) {}
          return t.blockName = this.constructor.blockName(), t.isHexOnly = this.isHexOnly, t.valueHex = (0, n.bufferToHexCodes)(this.valueHex, 0, this.valueHex.byteLength), 
          t;
        }
      };
      class u extends(a(s)){
        constructor(t = {}) {
          super(), "idBlock" in t ? (this.isHexOnly = (0, n.getParametersValue)(t.idBlock, "isHexOnly", !1), this.valueHex = (0, n.getParametersValue)(t.idBlock, "valueHex", new ArrayBuffer(0)), 
          this.tagClass = (0, n.getParametersValue)(t.idBlock, "tagClass", -1), this.tagNumber = (0, n.getParametersValue)(t.idBlock, "tagNumber", -1), 
          this.isConstructed = (0, n.getParametersValue)(t.idBlock, "isConstructed", !1)) : (this.tagClass = -1, this.tagNumber = -1, 
          this.isConstructed = !1);
        }
        static blockName() {
          return "identificationBlock";
        }
        toBER(t = !1) {
          let e = 0;
          let r;
          let i;
          switch (this.tagClass) {
           case 1:
            e |= 0;
            break;

           case 2:
            e |= 64;
            break;

           case 3:
            e |= 128;
            break;

           case 4:
            e |= 192;
            break;

           default:
            return this.error = "Unknown tag class", new ArrayBuffer(0);
          }
          if (this.isConstructed && (e |= 32), this.tagNumber < 31 && !this.isHexOnly) {
            if (r = new ArrayBuffer(1), i = new Uint8Array(r), !t) {
              let t = this.tagNumber;
              t &= 31, e |= t, i[0] = e;
            }
            return r;
          }
          if (!1 === this.isHexOnly) {
            const o = (0, n.utilToBase)(this.tagNumber, 7);
            const s = new Uint8Array(o);
            const a = o.byteLength;
            if (r = new ArrayBuffer(a + 1), i = new Uint8Array(r), i[0] = 31 | e, !t) {
              for (let t = 0; t < a - 1; t++) i[t + 1] = 128 | s[t];
              i[a] = s[a - 1];
            }
            return r;
          }
          if (r = new ArrayBuffer(this.valueHex.byteLength + 1), i = new Uint8Array(r), i[0] = 31 | e, !1 === t) {
            const t = new Uint8Array(this.valueHex);
            for (let e = 0; e < t.length - 1; e++) i[e + 1] = 128 | t[e];
            i[this.valueHex.byteLength] = t[t.length - 1];
          }
          return r;
        }
        fromBER(t, e, r) {
          if (!1 === (0, n.checkBufferParams)(this, t, e, r)) return -1;
          const i = new Uint8Array(t, e, r);
          if (0 === i.length) return this.error = "Zero buffer length", -1;
          switch (192 & i[0]) {
           case 0:
            this.tagClass = 1;
            break;

           case 64:
            this.tagClass = 2;
            break;

           case 128:
            this.tagClass = 3;
            break;

           case 192:
            this.tagClass = 4;
            break;

           default:
            return this.error = "Unknown tag class", -1;
          }
          this.isConstructed = 32 == (32 & i[0]), this.isHexOnly = !1;
          const o = 31 & i[0];
          if (31 !== o) this.tagNumber = o, this.blockLength = 1; else {
            let t = 1;
            this.valueHex = new ArrayBuffer(255);
            let e = 255;
            let r = new Uint8Array(this.valueHex);
            for (;128 & i[t]; ) {
              if (r[t - 1] = 127 & i[t], t++, t >= i.length) return this.error = "End of input reached before message was fully decoded", 
              -1;
              if (t === e) {
                e += 255;
                const t = new ArrayBuffer(e);
                const n = new Uint8Array(t);
                for (let e = 0; e < r.length; e++) n[e] = r[e];
                this.valueHex = new ArrayBuffer(e), r = new Uint8Array(this.valueHex);
              }
            }
            this.blockLength = t + 1, r[t - 1] = 127 & i[t];
            const o = new ArrayBuffer(t);
            const s = new Uint8Array(o);
            for (let n = 0; n < t; n++) s[n] = r[n];
            this.valueHex = new ArrayBuffer(t), r = new Uint8Array(this.valueHex), r.set(s), this.blockLength <= 9 ? this.tagNumber = (0, 
            n.utilFromBase)(r, 7) : (this.isHexOnly = !0, this.warnings.push("Tag too long, represented as hex-coded"));
          }
          if (1 === this.tagClass && this.isConstructed) switch (this.tagNumber) {
           case 1:
           case 2:
           case 5:
           case 6:
           case 9:
           case 13:
           case 14:
           case 23:
           case 24:
           case 31:
           case 32:
           case 33:
           case 34:
            return this.error = "Constructed encoding used for primitive type", -1;
          }
          return e + this.blockLength;
        }
        toJSON() {
          let t = {};
          try {
            t = super.toJSON();
          } catch (e) {}
          return t.blockName = this.constructor.blockName(), t.tagClass = this.tagClass, t.tagNumber = this.tagNumber, t.isConstructed = this.isConstructed, 
          t;
        }
      }
      class h extends s {
        constructor(t = {}) {
          super(), "lenBlock" in t ? (this.isIndefiniteForm = (0, n.getParametersValue)(t.lenBlock, "isIndefiniteForm", !1), this.longFormUsed = (0, 
          n.getParametersValue)(t.lenBlock, "longFormUsed", !1), this.length = (0, n.getParametersValue)(t.lenBlock, "length", 0)) : (this.isIndefiniteForm = !1, 
          this.longFormUsed = !1, this.length = 0);
        }
        static blockName() {
          return "lengthBlock";
        }
        fromBER(t, e, r) {
          if (!1 === (0, n.checkBufferParams)(this, t, e, r)) return -1;
          const i = new Uint8Array(t, e, r);
          if (0 === i.length) return this.error = "Zero buffer length", -1;
          if (255 === i[0]) return this.error = "Length block 0xFF is reserved by standard", -1;
          if (this.isIndefiniteForm = 128 === i[0], !0 === this.isIndefiniteForm) return this.blockLength = 1, e + this.blockLength;
          if (this.longFormUsed = !!(128 & i[0]), !1 === this.longFormUsed) return this.length = i[0], this.blockLength = 1, e + this.blockLength;
          const o = 127 & i[0];
          if (o > 8) return this.error = "Too big integer", -1;
          if (o + 1 > i.length) return this.error = "End of input reached before message was fully decoded", -1;
          const s = new Uint8Array(o);
          for (let n = 0; n < o; n++) s[n] = i[n + 1];
          return 0 === s[o - 1] && this.warnings.push("Needlessly long encoded length"), this.length = (0, n.utilFromBase)(s, 8), 
          this.longFormUsed && this.length <= 127 && this.warnings.push("Unnecessary usage of long length form"), this.blockLength = o + 1, 
          e + this.blockLength;
        }
        toBER(t = !1) {
          let e;
          let r;
          if (this.length > 127 && (this.longFormUsed = !0), this.isIndefiniteForm) return e = new ArrayBuffer(1), !1 === t && (r = new Uint8Array(e), 
          r[0] = 128), e;
          if (!0 === this.longFormUsed) {
            const i = (0, n.utilToBase)(this.length, 8);
            if (i.byteLength > 127) return this.error = "Too big length", new ArrayBuffer(0);
            if (e = new ArrayBuffer(i.byteLength + 1), !0 === t) return e;
            const o = new Uint8Array(i);
            r = new Uint8Array(e), r[0] = 128 | i.byteLength;
            for (let t = 0; t < i.byteLength; t++) r[t + 1] = o[t];
            return e;
          }
          return e = new ArrayBuffer(1), !1 === t && (r = new Uint8Array(e), r[0] = this.length), e;
        }
        toJSON() {
          let t = {};
          try {
            t = super.toJSON();
          } catch (e) {}
          return t.blockName = this.constructor.blockName(), t.isIndefiniteForm = this.isIndefiniteForm, t.longFormUsed = this.longFormUsed, 
          t.length = this.length, t;
        }
      }
      class l extends s {
        constructor(t = {}) {
          super(t);
        }
        static blockName() {
          return "valueBlock";
        }
        fromBER(t, e, r) {
          throw TypeError("User need to make a specific function in a class which extends \"ValueBlock\"");
        }
        toBER(t = !1) {
          throw TypeError("User need to make a specific function in a class which extends \"ValueBlock\"");
        }
      }
      class f extends s {
        constructor(t = {}, e = l) {
          super(t), "name" in t && (this.name = t.name), "optional" in t && (this.optional = t.optional), "primitiveSchema" in t && (this.primitiveSchema = t.primitiveSchema), 
          this.idBlock = new u(t), this.lenBlock = new h(t), this.valueBlock = new e(t);
        }
        static blockName() {
          return "BaseBlock";
        }
        fromBER(t, e, r) {
          const n = this.valueBlock.fromBER(t, e, !0 === this.lenBlock.isIndefiniteForm ? r : this.lenBlock.length);
          return -1 === n ? (this.error = this.valueBlock.error, n) : (0 === this.idBlock.error.length && (this.blockLength += this.idBlock.blockLength), 
          0 === this.lenBlock.error.length && (this.blockLength += this.lenBlock.blockLength), 0 === this.valueBlock.error.length && (this.blockLength += this.valueBlock.blockLength), 
          n);
        }
        toBER(t = !1) {
          let e;
          const r = this.idBlock.toBER(t);
          const i = this.valueBlock.toBER(!0);
          this.lenBlock.length = i.byteLength;
          const o = this.lenBlock.toBER(t);
          let s;
          if (e = (0, n.utilConcatBuf)(r, o), s = !1 === t ? this.valueBlock.toBER(t) : new ArrayBuffer(this.lenBlock.length), e = (0, 
          n.utilConcatBuf)(e, s), !0 === this.lenBlock.isIndefiniteForm) {
            const r = new ArrayBuffer(2);
            if (!1 === t) {
              const t = new Uint8Array(r);
              t[0] = 0, t[1] = 0;
            }
            e = (0, n.utilConcatBuf)(e, r);
          }
          return e;
        }
        toJSON() {
          let t = {};
          try {
            t = super.toJSON();
          } catch (e) {}
          return t.idBlock = this.idBlock.toJSON(), t.lenBlock = this.lenBlock.toJSON(), t.valueBlock = this.valueBlock.toJSON(), 
          "name" in this && (t.name = this.name), "optional" in this && (t.optional = this.optional), "primitiveSchema" in this && (t.primitiveSchema = this.primitiveSchema.toJSON()), 
          t;
        }
        toString() {
          return `${this.constructor.blockName()} : ${(0, n.bufferToHexCodes)(this.valueBlock.valueHex)}`;
        }
      }
      class c extends l {
        constructor(t = {}) {
          super(t), this.valueHex = "valueHex" in t ? t.valueHex.slice(0) : new ArrayBuffer(0), this.isHexOnly = (0, n.getParametersValue)(t, "isHexOnly", !0);
        }
        fromBER(t, e, r) {
          if (!1 === (0, n.checkBufferParams)(this, t, e, r)) return -1;
          const i = new Uint8Array(t, e, r);
          if (0 === i.length) return this.warnings.push("Zero buffer length"), e;
          this.valueHex = new ArrayBuffer(i.length);
          const o = new Uint8Array(this.valueHex);
          for (let n = 0; n < i.length; n++) o[n] = i[n];
          return this.blockLength = r, e + r;
        }
        toBER(t = !1) {
          return this.valueHex.slice(0);
        }
        static blockName() {
          return "PrimitiveValueBlock";
        }
        toJSON() {
          let t = {};
          try {
            t = super.toJSON();
          } catch (e) {}
          return t.valueHex = (0, n.bufferToHexCodes)(this.valueHex, 0, this.valueHex.byteLength), t.isHexOnly = this.isHexOnly, t;
        }
      }
      class d extends f {
        constructor(t = {}) {
          super(t, c), this.idBlock.isConstructed = !1;
        }
        static blockName() {
          return "PRIMITIVE";
        }
      }
      class v extends l {
        constructor(t = {}) {
          super(t), this.value = (0, n.getParametersValue)(t, "value", []), this.isIndefiniteForm = (0, n.getParametersValue)(t, "isIndefiniteForm", !1);
        }
        fromBER(t, e, r) {
          const i = e;
          const o = r;
          if (!1 === (0, n.checkBufferParams)(this, t, e, r)) return -1;
          if (0 === new Uint8Array(t, e, r).length) return this.warnings.push("Zero buffer length"), e;
          function s(t, e) {
            return !0 === t ? 1 : e;
          }
          let a = e;
          for (;s(this.isIndefiniteForm, r) > 0; ) {
            const e = lt(t, a, r);
            if (-1 === e.offset) return this.error = e.result.error, this.warnings.concat(e.result.warnings), -1;
            if (a = e.offset, this.blockLength += e.result.blockLength, r -= e.result.blockLength, this.value.push(e.result), !0 === this.isIndefiniteForm && e.result.constructor.blockName() === p.blockName()) break;
          }
          return !0 === this.isIndefiniteForm && (this.value[this.value.length - 1].constructor.blockName() === p.blockName() ? this.value.pop() : this.warnings.push("No EndOfContent block encoded")), 
          this.valueBeforeDecode = t.slice(i, i + o), a;
        }
        toBER(t = !1) {
          let e = new ArrayBuffer(0);
          for (let r = 0; r < this.value.length; r++) {
            const i = this.value[r].toBER(t);
            e = (0, n.utilConcatBuf)(e, i);
          }
          return e;
        }
        static blockName() {
          return "ConstructedValueBlock";
        }
        toJSON() {
          let t = {};
          try {
            t = super.toJSON();
          } catch (e) {}
          t.isIndefiniteForm = this.isIndefiniteForm, t.value = [];
          for (let r = 0; r < this.value.length; r++) t.value.push(this.value[r].toJSON());
          return t;
        }
      }
      class g extends f {
        constructor(t = {}) {
          super(t, v), this.idBlock.isConstructed = !0;
        }
        static blockName() {
          return "CONSTRUCTED";
        }
        fromBER(t, e, r) {
          this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm;
          const n = this.valueBlock.fromBER(t, e, !0 === this.lenBlock.isIndefiniteForm ? r : this.lenBlock.length);
          return -1 === n ? (this.error = this.valueBlock.error, n) : (0 === this.idBlock.error.length && (this.blockLength += this.idBlock.blockLength), 
          0 === this.lenBlock.error.length && (this.blockLength += this.lenBlock.blockLength), 0 === this.valueBlock.error.length && (this.blockLength += this.valueBlock.blockLength), 
          n);
        }
        toString() {
          const t = [];
          for (const r of this.valueBlock.value) t.push(r.toString().split("\n").map((t => `  ${t}`)).join("\n"));
          const e = 3 === this.idBlock.tagClass ? `[${this.idBlock.tagNumber}]` : this.constructor.blockName();
          return t.length ? `${e} :\n${t.join("\n")}` : `${e} :`;
        }
      }
      class m extends l {
        constructor(t = {}) {
          super(t);
        }
        fromBER(t, e, r) {
          return e;
        }
        toBER(t = !1) {
          return new ArrayBuffer(0);
        }
        static blockName() {
          return "EndOfContentValueBlock";
        }
      }
      class p extends f {
        constructor(t = {}) {
          super(t, m), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 0;
        }
        static blockName() {
          return "EndOfContent";
        }
      }
      class y extends l {
        constructor(t = {}) {
          if (super(t), this.value = (0, n.getParametersValue)(t, "value", !1), this.isHexOnly = (0, n.getParametersValue)(t, "isHexOnly", !1), 
          "valueHex" in t) this.valueHex = t.valueHex.slice(0); else if (this.valueHex = new ArrayBuffer(1), !0 === this.value) {
            new Uint8Array(this.valueHex)[0] = 255;
          }
        }
        fromBER(t, e, r) {
          if (!1 === (0, n.checkBufferParams)(this, t, e, r)) return -1;
          const i = new Uint8Array(t, e, r);
          r > 1 && this.warnings.push("Boolean value encoded in more then 1 octet"), this.isHexOnly = !0, this.valueHex = new ArrayBuffer(i.length);
          const o = new Uint8Array(this.valueHex);
          for (let n = 0; n < i.length; n++) o[n] = i[n];
          return 0 !== n.utilDecodeTC.call(this) ? this.value = !0 : this.value = !1, this.blockLength = r, e + r;
        }
        toBER(t = !1) {
          return this.valueHex;
        }
        static blockName() {
          return "BooleanValueBlock";
        }
        toJSON() {
          let t = {};
          try {
            t = super.toJSON();
          } catch (e) {}
          return t.value = this.value, t.isHexOnly = this.isHexOnly, t.valueHex = (0, n.bufferToHexCodes)(this.valueHex, 0, this.valueHex.byteLength), 
          t;
        }
      }
      class b extends f {
        constructor(t = {}) {
          super(t, y), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 1;
        }
        static blockName() {
          return "BOOLEAN";
        }
        toString() {
          return `${this.constructor.blockName()} : ${this.valueBlock.value}`;
        }
      }
      class w extends g {
        constructor(t = {}) {
          super(t), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 16;
        }
        static blockName() {
          return "SEQUENCE";
        }
      }
      class A extends g {
        constructor(t = {}) {
          super(t), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 17;
        }
        static blockName() {
          return "SET";
        }
      }
      class k extends f {
        constructor(t = {}) {
          super(t, s), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 5;
        }
        static blockName() {
          return "NULL";
        }
        fromBER(t, e, r) {
          return this.lenBlock.length > 0 && this.warnings.push("Non-zero length of value block for Null type"), 0 === this.idBlock.error.length && (this.blockLength += this.idBlock.blockLength), 
          0 === this.lenBlock.error.length && (this.blockLength += this.lenBlock.blockLength), this.blockLength += r, e + r > t.byteLength ? (this.error = "End of input reached before message was fully decoded (inconsistent offset and length values)", 
          -1) : e + r;
        }
        toBER(t = !1) {
          const e = new ArrayBuffer(2);
          if (!0 === t) return e;
          const r = new Uint8Array(e);
          return r[0] = 5, r[1] = 0, e;
        }
        toString() {
          return `${this.constructor.blockName()}`;
        }
      }
      class B extends(a(v)){
        constructor(t = {}) {
          super(t), this.isConstructed = (0, n.getParametersValue)(t, "isConstructed", !1);
        }
        fromBER(t, e, r) {
          let n = 0;
          if (!0 === this.isConstructed) {
            if (this.isHexOnly = !1, n = v.prototype.fromBER.call(this, t, e, r), -1 === n) return n;
            for (let t = 0; t < this.value.length; t++) {
              const e = this.value[t].constructor.blockName();
              if (e === p.blockName()) {
                if (!0 === this.isIndefiniteForm) break;
                return this.error = "EndOfContent is unexpected, OCTET STRING may consists of OCTET STRINGs only", -1;
              }
              if (e !== x.blockName()) return this.error = "OCTET STRING may consists of OCTET STRINGs only", -1;
            }
          } else this.isHexOnly = !0, n = super.fromBER(t, e, r), this.blockLength = r;
          return n;
        }
        toBER(t = !1) {
          if (!0 === this.isConstructed) return v.prototype.toBER.call(this, t);
          let e = new ArrayBuffer(this.valueHex.byteLength);
          return !0 === t || 0 === this.valueHex.byteLength || (e = this.valueHex.slice(0)), e;
        }
        static blockName() {
          return "OctetStringValueBlock";
        }
        toJSON() {
          let t = {};
          try {
            t = super.toJSON();
          } catch (e) {}
          return t.isConstructed = this.isConstructed, t.isHexOnly = this.isHexOnly, t.valueHex = (0, n.bufferToHexCodes)(this.valueHex, 0, this.valueHex.byteLength), 
          t;
        }
      }
      class x extends f {
        constructor(t = {}) {
          super(t, B), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 4;
        }
        fromBER(t, e, r) {
          if (this.valueBlock.isConstructed = this.idBlock.isConstructed, this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm, 
          0 === r) return 0 === this.idBlock.error.length && (this.blockLength += this.idBlock.blockLength), 0 === this.lenBlock.error.length && (this.blockLength += this.lenBlock.blockLength), 
          e;
          if (!this.valueBlock.isConstructed) {
            const i = t.slice(e, e + r);
            try {
              const t = ft(i);
              -1 !== t.offset && t.offset === r && (this.valueBlock.value = [ t.result ]);
            } catch (n) {}
          }
          return super.fromBER(t, e, r);
        }
        static blockName() {
          return "OCTET STRING";
        }
        isEqual(t) {
          return t instanceof x != !1 && JSON.stringify(this) === JSON.stringify(t);
        }
        toString() {
          return this.valueBlock.isConstructed || this.valueBlock.value && this.valueBlock.value.length ? g.prototype.toString.call(this) : `${this.constructor.blockName()} : ${(0, 
          n.bufferToHexCodes)(this.valueBlock.valueHex)}`;
        }
      }
      class S extends(a(v)){
        constructor(t = {}) {
          super(t), this.unusedBits = (0, n.getParametersValue)(t, "unusedBits", 0), this.isConstructed = (0, n.getParametersValue)(t, "isConstructed", !1), 
          this.blockLength = this.valueHex.byteLength;
        }
        fromBER(t, e, r) {
          if (0 === r) return e;
          let i = -1;
          if (!0 === this.isConstructed) {
            if (i = v.prototype.fromBER.call(this, t, e, r), -1 === i) return i;
            for (let t = 0; t < this.value.length; t++) {
              const e = this.value[t].constructor.blockName();
              if (e === p.blockName()) {
                if (!0 === this.isIndefiniteForm) break;
                return this.error = "EndOfContent is unexpected, BIT STRING may consists of BIT STRINGs only", -1;
              }
              if (e !== E.blockName()) return this.error = "BIT STRING may consists of BIT STRINGs only", -1;
              if (this.unusedBits > 0 && this.value[t].valueBlock.unusedBits > 0) return this.error = "Using of \"unused bits\" inside constructive BIT STRING allowed for least one only", 
              -1;
              if (this.unusedBits = this.value[t].valueBlock.unusedBits, this.unusedBits > 7) return this.error = "Unused bits for BitString must be in range 0-7", 
              -1;
            }
            return i;
          }
          if (!1 === (0, n.checkBufferParams)(this, t, e, r)) return -1;
          const o = new Uint8Array(t, e, r);
          if (this.unusedBits = o[0], this.unusedBits > 7) return this.error = "Unused bits for BitString must be in range 0-7", -1;
          if (!this.unusedBits) {
            const n = t.slice(e + 1, e + r);
            try {
              const t = ft(n);
              -1 !== t.offset && t.offset === r - 1 && (this.value = [ t.result ]);
            } catch (a) {}
          }
          this.valueHex = new ArrayBuffer(o.length - 1);
          const s = new Uint8Array(this.valueHex);
          for (let n = 0; n < r - 1; n++) s[n] = o[n + 1];
          return this.blockLength = o.length, e + r;
        }
        toBER(t = !1) {
          if (!0 === this.isConstructed) return v.prototype.toBER.call(this, t);
          if (!0 === t) return new ArrayBuffer(this.valueHex.byteLength + 1);
          if (0 === this.valueHex.byteLength) return new ArrayBuffer(0);
          const e = new Uint8Array(this.valueHex);
          const r = new ArrayBuffer(this.valueHex.byteLength + 1);
          const n = new Uint8Array(r);
          n[0] = this.unusedBits;
          for (let i = 0; i < this.valueHex.byteLength; i++) n[i + 1] = e[i];
          return r;
        }
        static blockName() {
          return "BitStringValueBlock";
        }
        toJSON() {
          let t = {};
          try {
            t = super.toJSON();
          } catch (e) {}
          return t.unusedBits = this.unusedBits, t.isConstructed = this.isConstructed, t.isHexOnly = this.isHexOnly, t.valueHex = (0, 
          n.bufferToHexCodes)(this.valueHex, 0, this.valueHex.byteLength), t;
        }
      }
      class E extends f {
        constructor(t = {}) {
          super(t, S), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 3;
        }
        static blockName() {
          return "BIT STRING";
        }
        fromBER(t, e, r) {
          return 0 === r ? e : (this.valueBlock.isConstructed = this.idBlock.isConstructed, this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm, 
          super.fromBER(t, e, r));
        }
        isEqual(t) {
          return t instanceof E != !1 && JSON.stringify(this) === JSON.stringify(t);
        }
        toString() {
          if (this.valueBlock.isConstructed || this.valueBlock.value && this.valueBlock.value.length) return g.prototype.toString.call(this);
          {
            const t = [];
            const e = new Uint8Array(this.valueBlock.valueHex);
            for (const r of e) t.push(r.toString(2).padStart(8, "0"));
            return `${this.constructor.blockName()} : ${t.join("")}`;
          }
        }
      }
      class M extends(a(l)){
        constructor(t = {}) {
          super(t), "value" in t && (this.valueDec = t.value);
        }
        set valueHex(t) {
          this._valueHex = t.slice(0), t.byteLength >= 4 ? (this.warnings.push("Too big Integer for decoding, hex only"), this.isHexOnly = !0, 
          this._valueDec = 0) : (this.isHexOnly = !1, t.byteLength > 0 && (this._valueDec = n.utilDecodeTC.call(this)));
        }
        get valueHex() {
          return this._valueHex;
        }
        set valueDec(t) {
          this._valueDec = t, this.isHexOnly = !1, this._valueHex = (0, n.utilEncodeTC)(t);
        }
        get valueDec() {
          return this._valueDec;
        }
        fromDER(t, e, r, n = 0) {
          const i = this.fromBER(t, e, r);
          if (-1 === i) return i;
          const o = new Uint8Array(this._valueHex);
          if (0 === o[0] && 0 != (128 & o[1])) {
            const t = new ArrayBuffer(this._valueHex.byteLength - 1);
            new Uint8Array(t).set(new Uint8Array(this._valueHex, 1, this._valueHex.byteLength - 1)), this._valueHex = t.slice(0);
          } else if (0 !== n && this._valueHex.byteLength < n) {
            n - this._valueHex.byteLength > 1 && (n = this._valueHex.byteLength + 1);
            const t = new ArrayBuffer(n);
            new Uint8Array(t).set(o, n - this._valueHex.byteLength), this._valueHex = t.slice(0);
          }
          return i;
        }
        toDER(t = !1) {
          const e = new Uint8Array(this._valueHex);
          switch (!0) {
           case 0 != (128 & e[0]):
            {
              const t = new ArrayBuffer(this._valueHex.byteLength + 1);
              const r = new Uint8Array(t);
              r[0] = 0, r.set(e, 1), this._valueHex = t.slice(0);
            }
            break;

           case 0 === e[0] && 0 == (128 & e[1]):
            {
              const t = new ArrayBuffer(this._valueHex.byteLength - 1);
              new Uint8Array(t).set(new Uint8Array(this._valueHex, 1, this._valueHex.byteLength - 1)), this._valueHex = t.slice(0);
            }
          }
          return this.toBER(t);
        }
        fromBER(t, e, r) {
          const n = super.fromBER(t, e, r);
          return -1 === n ? n : (this.blockLength = r, e + r);
        }
        toBER(t = !1) {
          return this.valueHex.slice(0);
        }
        static blockName() {
          return "IntegerValueBlock";
        }
        toJSON() {
          let t = {};
          try {
            t = super.toJSON();
          } catch (e) {}
          return t.valueDec = this.valueDec, t;
        }
        toString() {
          function t(t, e) {
            const r = new Uint8Array([ 0 ]);
            let i = new Uint8Array(t);
            let o = new Uint8Array(e);
            let s = i.slice(0);
            const a = s.length - 1;
            let u = o.slice(0);
            const h = u.length - 1;
            let l = 0;
            let f = 0;
            for (let c = h < a ? a : h; c >= 0; c--, f++) {
              if (!0 == f < u.length) l = s[a - f] + u[h - f] + r[0]; else l = s[a - f] + r[0];
              if (r[0] = l / 10, !0 == f >= s.length) s = (0, n.utilConcatView)(new Uint8Array([ l % 10 ]), s); else s[a - f] = l % 10;
            }
            return r[0] > 0 && (s = (0, n.utilConcatView)(r, s)), s.slice(0);
          }
          function e(t) {
            if (t >= i.length) for (let e = i.length; e <= t; e++) {
              const t = new Uint8Array([ 0 ]);
              let r = i[e - 1].slice(0);
              for (let e = r.length - 1; e >= 0; e--) {
                const n = new Uint8Array([ (r[e] << 1) + t[0] ]);
                t[0] = n[0] / 10, r[e] = n[0] % 10;
              }
              t[0] > 0 && (r = (0, n.utilConcatView)(t, r)), i.push(r);
            }
            return i[t];
          }
          function r(t, e) {
            let r = 0;
            let n = new Uint8Array(t);
            let i = new Uint8Array(e);
            let o = n.slice(0);
            const s = o.length - 1;
            let a = i.slice(0);
            const u = a.length - 1;
            let h;
            let l = 0;
            for (let f = u; f >= 0; f--, l++) if (h = o[s - l] - a[u - l] - r, !0 == h < 0) r = 1, o[s - l] = h + 10; else r = 0, o[s - l] = h;
            if (r > 0) for (let f = s - u + 1; f >= 0; f--, l++) {
              if (h = o[s - l] - r, !(h < 0)) {
                r = 0, o[s - l] = h;
                break;
              }
              r = 1, o[s - l] = h + 10;
            }
            return o.slice();
          }
          const s = 8 * this._valueHex.byteLength - 1;
          let a = new Uint8Array(8 * this._valueHex.byteLength / 3);
          let u = 0;
          let h;
          const l = new Uint8Array(this._valueHex);
          let f = "";
          let c = !1;
          for (let n = this._valueHex.byteLength - 1; n >= 0; n--) {
            h = l[n];
            for (let n = 0; n < 8; n++) {
              if (1 == (1 & h)) if (u === s) a = r(e(u), a), f = "-"; else a = t(a, e(u));
              u++, h >>= 1;
            }
          }
          for (let n = 0; n < a.length; n++) a[n] && (c = !0), c && (f += o.charAt(a[n]));
          return !1 === c && (f += o.charAt(0)), f;
        }
      }
      class N extends f {
        constructor(t = {}) {
          super(t, M), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 2;
        }
        static blockName() {
          return "INTEGER";
        }
        isEqual(t) {
          return t instanceof N ? this.valueBlock.isHexOnly && t.valueBlock.isHexOnly ? (0, n.isEqualBuffer)(this.valueBlock.valueHex, t.valueBlock.valueHex) : this.valueBlock.isHexOnly === t.valueBlock.isHexOnly && this.valueBlock.valueDec === t.valueBlock.valueDec : t instanceof ArrayBuffer && (0, 
          n.isEqualBuffer)(this.valueBlock.valueHex, t);
        }
        convertToDER() {
          const t = new N({
            valueHex: this.valueBlock.valueHex
          });
          return t.valueBlock.toDER(), t;
        }
        convertFromDER() {
          const t = this.valueBlock.valueHex.byteLength % 2 ? this.valueBlock.valueHex.byteLength + 1 : this.valueBlock.valueHex.byteLength;
          const e = new N({
            valueHex: this.valueBlock.valueHex
          });
          return e.valueBlock.fromDER(e.valueBlock.valueHex, 0, e.valueBlock.valueHex.byteLength, t), e;
        }
        toString() {
          const t = (0, n.bufferToHexCodes)(this.valueBlock.valueHex);
          const e = BigInt(`0x${t}`);
          return `${this.constructor.blockName()} : ${e.toString()}`;
        }
      }
      class _ extends N {
        constructor(t = {}) {
          super(t), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 10;
        }
        static blockName() {
          return "ENUMERATED";
        }
      }
      class I extends(a(s)){
        constructor(t = {}) {
          super(t), this.valueDec = (0, n.getParametersValue)(t, "valueDec", -1), this.isFirstSid = (0, n.getParametersValue)(t, "isFirstSid", !1);
        }
        static blockName() {
          return "sidBlock";
        }
        fromBER(t, e, r) {
          if (0 === r) return e;
          if (!1 === (0, n.checkBufferParams)(this, t, e, r)) return -1;
          const i = new Uint8Array(t, e, r);
          this.valueHex = new ArrayBuffer(r);
          let o = new Uint8Array(this.valueHex);
          for (let n = 0; n < r && (o[n] = 127 & i[n], this.blockLength++, 0 != (128 & i[n])); n++) ;
          const s = new ArrayBuffer(this.blockLength);
          const a = new Uint8Array(s);
          for (let n = 0; n < this.blockLength; n++) a[n] = o[n];
          return this.valueHex = s.slice(0), o = new Uint8Array(this.valueHex), 0 != (128 & i[this.blockLength - 1]) ? (this.error = "End of input reached before message was fully decoded", 
          -1) : (0 === o[0] && this.warnings.push("Needlessly long format of SID encoding"), this.blockLength <= 8 ? this.valueDec = (0, 
          n.utilFromBase)(o, 7) : (this.isHexOnly = !0, this.warnings.push("Too big SID for decoding, hex only")), e + this.blockLength);
        }
        toBER(t = !1) {
          let e;
          let r;
          if (this.isHexOnly) {
            if (!0 === t) return new ArrayBuffer(this.valueHex.byteLength);
            const n = new Uint8Array(this.valueHex);
            e = new ArrayBuffer(this.blockLength), r = new Uint8Array(e);
            for (let t = 0; t < this.blockLength - 1; t++) r[t] = 128 | n[t];
            return r[this.blockLength - 1] = n[this.blockLength - 1], e;
          }
          const i = (0, n.utilToBase)(this.valueDec, 7);
          if (0 === i.byteLength) return this.error = "Error during encoding SID value", new ArrayBuffer(0);
          if (e = new ArrayBuffer(i.byteLength), !1 === t) {
            const t = new Uint8Array(i);
            r = new Uint8Array(e);
            for (let e = 0; e < i.byteLength - 1; e++) r[e] = 128 | t[e];
            r[i.byteLength - 1] = t[i.byteLength - 1];
          }
          return e;
        }
        toString() {
          let t = "";
          if (!0 === this.isHexOnly) t = (0, n.bufferToHexCodes)(this.valueHex, 0, this.valueHex.byteLength); else if (this.isFirstSid) {
            let e = this.valueDec;
            this.valueDec <= 39 ? t = "0." : this.valueDec <= 79 ? (t = "1.", e -= 40) : (t = "2.", e -= 80), t += e.toString();
          } else t = this.valueDec.toString();
          return t;
        }
        toJSON() {
          let t = {};
          try {
            t = super.toJSON();
          } catch (e) {}
          return t.valueDec = this.valueDec, t.isFirstSid = this.isFirstSid, t;
        }
      }
      class O extends l {
        constructor(t = {}) {
          super(t), this.fromString((0, n.getParametersValue)(t, "value", ""));
        }
        fromBER(t, e, r) {
          let n = e;
          for (;r > 0; ) {
            const e = new I;
            if (n = e.fromBER(t, n, r), -1 === n) return this.blockLength = 0, this.error = e.error, n;
            0 === this.value.length && (e.isFirstSid = !0), this.blockLength += e.blockLength, r -= e.blockLength, this.value.push(e);
          }
          return n;
        }
        toBER(t = !1) {
          let e = new ArrayBuffer(0);
          for (let r = 0; r < this.value.length; r++) {
            const i = this.value[r].toBER(t);
            if (0 === i.byteLength) return this.error = this.value[r].error, new ArrayBuffer(0);
            e = (0, n.utilConcatBuf)(e, i);
          }
          return e;
        }
        fromString(t) {
          this.value = [];
          let e = 0;
          let r = 0;
          let n = "";
          let i = !1;
          do {
            if (r = t.indexOf(".", e), n = -1 === r ? t.substr(e) : t.substr(e, r - e), e = r + 1, i) {
              const t = this.value[0];
              let e = 0;
              switch (t.valueDec) {
               case 0:
                break;

               case 1:
                e = 40;
                break;

               case 2:
                e = 80;
                break;

               default:
                return this.value = [], !1;
              }
              const r = parseInt(n, 10);
              if (isNaN(r)) return !0;
              t.valueDec = r + e, i = !1;
            } else {
              const t = new I;
              if (t.valueDec = parseInt(n, 10), isNaN(t.valueDec)) return !0;
              0 === this.value.length && (t.isFirstSid = !0, i = !0), this.value.push(t);
            }
          } while (-1 !== r);
          return !0;
        }
        toString() {
          let t = "";
          let e = !1;
          for (let r = 0; r < this.value.length; r++) {
            e = this.value[r].isHexOnly;
            let n = this.value[r].toString();
            0 !== r && (t = `${t}.`), e ? (n = `{${n}}`, this.value[r].isFirstSid ? t = `2.{${n} - 80}` : t += n) : t += n;
          }
          return t;
        }
        static blockName() {
          return "ObjectIdentifierValueBlock";
        }
        toJSON() {
          let t = {};
          try {
            t = super.toJSON();
          } catch (e) {}
          t.value = this.toString(), t.sidArray = [];
          for (let r = 0; r < this.value.length; r++) t.sidArray.push(this.value[r].toJSON());
          return t;
        }
      }
      class C extends f {
        constructor(t = {}) {
          super(t, O), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 6;
        }
        static blockName() {
          return "OBJECT IDENTIFIER";
        }
        toString() {
          return `${this.constructor.blockName()} : ${this.valueBlock.toString()}`;
        }
      }
      class L extends(a(s)){
        constructor(t = {}) {
          super(t), this.isHexOnly = !0, this.value = "";
        }
        static blockName() {
          return "Utf8StringValueBlock";
        }
        toJSON() {
          let t = {};
          try {
            t = super.toJSON();
          } catch (e) {}
          return t.value = this.value, t;
        }
      }
      class P extends f {
        constructor(t = {}) {
          super(t, L), "value" in t && this.fromString(t.value), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 12;
        }
        static blockName() {
          return "UTF8String";
        }
        fromBER(t, e, r) {
          const n = this.valueBlock.fromBER(t, e, !0 === this.lenBlock.isIndefiniteForm ? r : this.lenBlock.length);
          return -1 === n ? (this.error = this.valueBlock.error, n) : (this.fromBuffer(this.valueBlock.valueHex), 0 === this.idBlock.error.length && (this.blockLength += this.idBlock.blockLength), 
          0 === this.lenBlock.error.length && (this.blockLength += this.lenBlock.blockLength), 0 === this.valueBlock.error.length && (this.blockLength += this.valueBlock.blockLength), 
          n);
        }
        fromBuffer(t) {
          this.valueBlock.value = String.fromCharCode.apply(null, new Uint8Array(t));
          try {
            this.valueBlock.value = decodeURIComponent(escape(this.valueBlock.value));
          } catch (e) {
            this.warnings.push(`Error during "decodeURIComponent": ${e}, using raw string`);
          }
        }
        fromString(t) {
          const e = unescape(encodeURIComponent(t));
          const r = e.length;
          this.valueBlock.valueHex = new ArrayBuffer(r);
          const n = new Uint8Array(this.valueBlock.valueHex);
          for (let i = 0; i < r; i++) n[i] = e.charCodeAt(i);
          this.valueBlock.value = t;
        }
        toString() {
          return `${this.constructor.blockName()} : ${this.valueBlock.value}`;
        }
      }
      class j extends(a(s)){
        constructor(t = {}) {
          super(t), this.valueDec = (0, n.getParametersValue)(t, "valueDec", -1);
        }
        static blockName() {
          return "relativeSidBlock";
        }
        fromBER(t, e, r) {
          if (0 === r) return e;
          if (!1 === (0, n.checkBufferParams)(this, t, e, r)) return -1;
          const i = new Uint8Array(t, e, r);
          this.valueHex = new ArrayBuffer(r);
          let o = new Uint8Array(this.valueHex);
          for (let n = 0; n < r && (o[n] = 127 & i[n], this.blockLength++, 0 != (128 & i[n])); n++) ;
          const s = new ArrayBuffer(this.blockLength);
          const a = new Uint8Array(s);
          for (let n = 0; n < this.blockLength; n++) a[n] = o[n];
          return this.valueHex = s.slice(0), o = new Uint8Array(this.valueHex), 0 != (128 & i[this.blockLength - 1]) ? (this.error = "End of input reached before message was fully decoded", 
          -1) : (0 === o[0] && this.warnings.push("Needlessly long format of SID encoding"), this.blockLength <= 8 ? this.valueDec = (0, 
          n.utilFromBase)(o, 7) : (this.isHexOnly = !0, this.warnings.push("Too big SID for decoding, hex only")), e + this.blockLength);
        }
        toBER(t = !1) {
          let e;
          let r;
          if (this.isHexOnly) {
            if (!0 === t) return new ArrayBuffer(this.valueHex.byteLength);
            const n = new Uint8Array(this.valueHex);
            e = new ArrayBuffer(this.blockLength), r = new Uint8Array(e);
            for (let t = 0; t < this.blockLength - 1; t++) r[t] = 128 | n[t];
            return r[this.blockLength - 1] = n[this.blockLength - 1], e;
          }
          const i = (0, n.utilToBase)(this.valueDec, 7);
          if (0 === i.byteLength) return this.error = "Error during encoding SID value", new ArrayBuffer(0);
          if (e = new ArrayBuffer(i.byteLength), !1 === t) {
            const t = new Uint8Array(i);
            r = new Uint8Array(e);
            for (let e = 0; e < i.byteLength - 1; e++) r[e] = 128 | t[e];
            r[i.byteLength - 1] = t[i.byteLength - 1];
          }
          return e;
        }
        toString() {
          let t = "";
          return t = !0 === this.isHexOnly ? (0, n.bufferToHexCodes)(this.valueHex, 0, this.valueHex.byteLength) : this.valueDec.toString(), 
          t;
        }
        toJSON() {
          let t = {};
          try {
            t = super.toJSON();
          } catch (e) {}
          return t.valueDec = this.valueDec, t;
        }
      }
      class U extends l {
        constructor(t = {}) {
          super(t), this.fromString((0, n.getParametersValue)(t, "value", ""));
        }
        fromBER(t, e, r) {
          let n = e;
          for (;r > 0; ) {
            const e = new j;
            if (n = e.fromBER(t, n, r), -1 === n) return this.blockLength = 0, this.error = e.error, n;
            this.blockLength += e.blockLength, r -= e.blockLength, this.value.push(e);
          }
          return n;
        }
        toBER(t = !1) {
          let e = new ArrayBuffer(0);
          for (let r = 0; r < this.value.length; r++) {
            const i = this.value[r].toBER(t);
            if (0 === i.byteLength) return this.error = this.value[r].error, new ArrayBuffer(0);
            e = (0, n.utilConcatBuf)(e, i);
          }
          return e;
        }
        fromString(t) {
          this.value = [];
          let e = 0;
          let r = 0;
          let n = "";
          do {
            r = t.indexOf(".", e), n = -1 === r ? t.substr(e) : t.substr(e, r - e), e = r + 1;
            const i = new j;
            if (i.valueDec = parseInt(n, 10), isNaN(i.valueDec)) return !0;
            this.value.push(i);
          } while (-1 !== r);
          return !0;
        }
        toString() {
          let t = "";
          let e = !1;
          for (let r = 0; r < this.value.length; r++) {
            e = this.value[r].isHexOnly;
            let n = this.value[r].toString();
            0 !== r && (t = `${t}.`), e ? (n = `{${n}}`, t += n) : t += n;
          }
          return t;
        }
        static blockName() {
          return "RelativeObjectIdentifierValueBlock";
        }
        toJSON() {
          let t = {};
          try {
            t = super.toJSON();
          } catch (e) {}
          t.value = this.toString(), t.sidArray = [];
          for (let r = 0; r < this.value.length; r++) t.sidArray.push(this.value[r].toJSON());
          return t;
        }
      }
      class R extends f {
        constructor(t = {}) {
          super(t, U), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 13;
        }
        static blockName() {
          return "RelativeObjectIdentifier";
        }
      }
      class T extends(a(s)){
        constructor(t = {}) {
          super(t), this.isHexOnly = !0, this.value = "";
        }
        static blockName() {
          return "BmpStringValueBlock";
        }
        toJSON() {
          let t = {};
          try {
            t = super.toJSON();
          } catch (e) {}
          return t.value = this.value, t;
        }
      }
      class H extends f {
        constructor(t = {}) {
          super(t, T), "value" in t && this.fromString(t.value), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 30;
        }
        static blockName() {
          return "BMPString";
        }
        fromBER(t, e, r) {
          const n = this.valueBlock.fromBER(t, e, !0 === this.lenBlock.isIndefiniteForm ? r : this.lenBlock.length);
          return -1 === n ? (this.error = this.valueBlock.error, n) : (this.fromBuffer(this.valueBlock.valueHex), 0 === this.idBlock.error.length && (this.blockLength += this.idBlock.blockLength), 
          0 === this.lenBlock.error.length && (this.blockLength += this.lenBlock.blockLength), 0 === this.valueBlock.error.length && (this.blockLength += this.valueBlock.blockLength), 
          n);
        }
        fromBuffer(t) {
          const e = t.slice(0);
          const r = new Uint8Array(e);
          for (let n = 0; n < r.length; n += 2) {
            const t = r[n];
            r[n] = r[n + 1], r[n + 1] = t;
          }
          this.valueBlock.value = String.fromCharCode.apply(null, new Uint16Array(e));
        }
        fromString(t) {
          const e = t.length;
          this.valueBlock.valueHex = new ArrayBuffer(2 * e);
          const r = new Uint8Array(this.valueBlock.valueHex);
          for (let i = 0; i < e; i++) {
            const e = (0, n.utilToBase)(t.charCodeAt(i), 8);
            const o = new Uint8Array(e);
            if (o.length > 2) continue;
            const s = 2 - o.length;
            for (let t = o.length - 1; t >= 0; t--) r[2 * i + t + s] = o[t];
          }
          this.valueBlock.value = t;
        }
        toString() {
          return `${this.constructor.blockName()} : ${this.valueBlock.value}`;
        }
      }
      class D extends(a(s)){
        constructor(t = {}) {
          super(t), this.isHexOnly = !0, this.value = "";
        }
        static blockName() {
          return "UniversalStringValueBlock";
        }
        toJSON() {
          let t = {};
          try {
            t = super.toJSON();
          } catch (e) {}
          return t.value = this.value, t;
        }
      }
      class F extends f {
        constructor(t = {}) {
          super(t, D), "value" in t && this.fromString(t.value), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 28;
        }
        static blockName() {
          return "UniversalString";
        }
        fromBER(t, e, r) {
          const n = this.valueBlock.fromBER(t, e, !0 === this.lenBlock.isIndefiniteForm ? r : this.lenBlock.length);
          return -1 === n ? (this.error = this.valueBlock.error, n) : (this.fromBuffer(this.valueBlock.valueHex), 0 === this.idBlock.error.length && (this.blockLength += this.idBlock.blockLength), 
          0 === this.lenBlock.error.length && (this.blockLength += this.lenBlock.blockLength), 0 === this.valueBlock.error.length && (this.blockLength += this.valueBlock.blockLength), 
          n);
        }
        fromBuffer(t) {
          const e = t.slice(0);
          const r = new Uint8Array(e);
          for (let n = 0; n < r.length; n += 4) r[n] = r[n + 3], r[n + 1] = r[n + 2], r[n + 2] = 0, r[n + 3] = 0;
          this.valueBlock.value = String.fromCharCode.apply(null, new Uint32Array(e));
        }
        fromString(t) {
          const e = t.length;
          this.valueBlock.valueHex = new ArrayBuffer(4 * e);
          const r = new Uint8Array(this.valueBlock.valueHex);
          for (let i = 0; i < e; i++) {
            const e = (0, n.utilToBase)(t.charCodeAt(i), 8);
            const o = new Uint8Array(e);
            if (o.length > 4) continue;
            const s = 4 - o.length;
            for (let t = o.length - 1; t >= 0; t--) r[4 * i + t + s] = o[t];
          }
          this.valueBlock.value = t;
        }
        toString() {
          return `${this.constructor.blockName()} : ${this.valueBlock.value}`;
        }
      }
      class z extends(a(s)){
        constructor(t = {}) {
          super(t), this.value = "", this.isHexOnly = !0;
        }
        static blockName() {
          return "SimpleStringValueBlock";
        }
        toJSON() {
          let t = {};
          try {
            t = super.toJSON();
          } catch (e) {}
          return t.value = this.value, t;
        }
      }
      class q extends f {
        constructor(t = {}) {
          super(t, z), "value" in t && this.fromString(t.value);
        }
        static blockName() {
          return "SIMPLESTRING";
        }
        fromBER(t, e, r) {
          const n = this.valueBlock.fromBER(t, e, !0 === this.lenBlock.isIndefiniteForm ? r : this.lenBlock.length);
          return -1 === n ? (this.error = this.valueBlock.error, n) : (this.fromBuffer(this.valueBlock.valueHex), 0 === this.idBlock.error.length && (this.blockLength += this.idBlock.blockLength), 
          0 === this.lenBlock.error.length && (this.blockLength += this.lenBlock.blockLength), 0 === this.valueBlock.error.length && (this.blockLength += this.valueBlock.blockLength), 
          n);
        }
        fromBuffer(t) {
          this.valueBlock.value = String.fromCharCode.apply(null, new Uint8Array(t));
        }
        fromString(t) {
          const e = t.length;
          this.valueBlock.valueHex = new ArrayBuffer(e);
          const r = new Uint8Array(this.valueBlock.valueHex);
          for (let n = 0; n < e; n++) r[n] = t.charCodeAt(n);
          this.valueBlock.value = t;
        }
        toString() {
          return `${this.constructor.blockName()} : ${this.valueBlock.value}`;
        }
      }
      class V extends q {
        constructor(t = {}) {
          super(t), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 18;
        }
        static blockName() {
          return "NumericString";
        }
      }
      class K extends q {
        constructor(t = {}) {
          super(t), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 19;
        }
        static blockName() {
          return "PrintableString";
        }
      }
      class J extends q {
        constructor(t = {}) {
          super(t), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 20;
        }
        static blockName() {
          return "TeletexString";
        }
      }
      class W extends q {
        constructor(t = {}) {
          super(t), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 21;
        }
        static blockName() {
          return "VideotexString";
        }
      }
      class G extends q {
        constructor(t = {}) {
          super(t), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 22;
        }
        static blockName() {
          return "IA5String";
        }
      }
      class Z extends q {
        constructor(t = {}) {
          super(t), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 25;
        }
        static blockName() {
          return "GraphicString";
        }
      }
      class $ extends q {
        constructor(t = {}) {
          super(t), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 26;
        }
        static blockName() {
          return "VisibleString";
        }
      }
      class X extends q {
        constructor(t = {}) {
          super(t), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 27;
        }
        static blockName() {
          return "GeneralString";
        }
      }
      class Q extends q {
        constructor(t = {}) {
          super(t), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 29;
        }
        static blockName() {
          return "CharacterString";
        }
      }
      class Y extends $ {
        constructor(t = {}) {
          if (super(t), this.year = 0, this.month = 0, this.day = 0, this.hour = 0, this.minute = 0, this.second = 0, "value" in t) {
            this.fromString(t.value), this.valueBlock.valueHex = new ArrayBuffer(t.value.length);
            const e = new Uint8Array(this.valueBlock.valueHex);
            for (let r = 0; r < t.value.length; r++) e[r] = t.value.charCodeAt(r);
          }
          "valueDate" in t && (this.fromDate(t.valueDate), this.valueBlock.valueHex = this.toBuffer()), this.idBlock.tagClass = 1, 
          this.idBlock.tagNumber = 23;
        }
        fromBER(t, e, r) {
          const n = this.valueBlock.fromBER(t, e, !0 === this.lenBlock.isIndefiniteForm ? r : this.lenBlock.length);
          return -1 === n ? (this.error = this.valueBlock.error, n) : (this.fromBuffer(this.valueBlock.valueHex), 0 === this.idBlock.error.length && (this.blockLength += this.idBlock.blockLength), 
          0 === this.lenBlock.error.length && (this.blockLength += this.lenBlock.blockLength), 0 === this.valueBlock.error.length && (this.blockLength += this.valueBlock.blockLength), 
          n);
        }
        fromBuffer(t) {
          this.fromString(String.fromCharCode.apply(null, new Uint8Array(t)));
        }
        toBuffer() {
          const t = this.toString();
          const e = new ArrayBuffer(t.length);
          const r = new Uint8Array(e);
          for (let n = 0; n < t.length; n++) r[n] = t.charCodeAt(n);
          return e;
        }
        fromDate(t) {
          this.year = t.getUTCFullYear(), this.month = t.getUTCMonth() + 1, this.day = t.getUTCDate(), this.hour = t.getUTCHours(), 
          this.minute = t.getUTCMinutes(), this.second = t.getUTCSeconds();
        }
        toDate() {
          return new Date(Date.UTC(this.year, this.month - 1, this.day, this.hour, this.minute, this.second));
        }
        fromString(t) {
          const e = /(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})Z/gi.exec(t);
          if (null === e) return void (this.error = "Wrong input string for convertion");
          const r = parseInt(e[1], 10);
          this.year = r >= 50 ? 1900 + r : 2e3 + r, this.month = parseInt(e[2], 10), this.day = parseInt(e[3], 10), this.hour = parseInt(e[4], 10), 
          this.minute = parseInt(e[5], 10), this.second = parseInt(e[6], 10);
        }
        toString() {
          const t = new Array(7);
          return t[0] = (0, n.padNumber)(this.year < 2e3 ? this.year - 1900 : this.year - 2e3, 2), t[1] = (0, n.padNumber)(this.month, 2), 
          t[2] = (0, n.padNumber)(this.day, 2), t[3] = (0, n.padNumber)(this.hour, 2), t[4] = (0, n.padNumber)(this.minute, 2), t[5] = (0, 
          n.padNumber)(this.second, 2), t[6] = "Z", t.join("");
        }
        static blockName() {
          return "UTCTime";
        }
        toJSON() {
          let t = {};
          try {
            t = super.toJSON();
          } catch (e) {}
          return t.year = this.year, t.month = this.month, t.day = this.day, t.hour = this.hour, t.minute = this.minute, t.second = this.second, 
          t;
        }
      }
      class tt extends $ {
        constructor(t = {}) {
          if (super(t), this.year = 0, this.month = 0, this.day = 0, this.hour = 0, this.minute = 0, this.second = 0, this.millisecond = 0, 
          "value" in t) {
            this.fromString(t.value), this.valueBlock.valueHex = new ArrayBuffer(t.value.length);
            const e = new Uint8Array(this.valueBlock.valueHex);
            for (let r = 0; r < t.value.length; r++) e[r] = t.value.charCodeAt(r);
          }
          "valueDate" in t && (this.fromDate(t.valueDate), this.valueBlock.valueHex = this.toBuffer()), this.idBlock.tagClass = 1, 
          this.idBlock.tagNumber = 24;
        }
        fromBER(t, e, r) {
          const n = this.valueBlock.fromBER(t, e, !0 === this.lenBlock.isIndefiniteForm ? r : this.lenBlock.length);
          return -1 === n ? (this.error = this.valueBlock.error, n) : (this.fromBuffer(this.valueBlock.valueHex), 0 === this.idBlock.error.length && (this.blockLength += this.idBlock.blockLength), 
          0 === this.lenBlock.error.length && (this.blockLength += this.lenBlock.blockLength), 0 === this.valueBlock.error.length && (this.blockLength += this.valueBlock.blockLength), 
          n);
        }
        fromBuffer(t) {
          this.fromString(String.fromCharCode.apply(null, new Uint8Array(t)));
        }
        toBuffer() {
          const t = this.toString();
          const e = new ArrayBuffer(t.length);
          const r = new Uint8Array(e);
          for (let n = 0; n < t.length; n++) r[n] = t.charCodeAt(n);
          return e;
        }
        fromDate(t) {
          this.year = t.getUTCFullYear(), this.month = t.getUTCMonth() + 1, this.day = t.getUTCDate(), this.hour = t.getUTCHours(), 
          this.minute = t.getUTCMinutes(), this.second = t.getUTCSeconds(), this.millisecond = t.getUTCMilliseconds();
        }
        toDate() {
          return new Date(Date.UTC(this.year, this.month - 1, this.day, this.hour, this.minute, this.second, this.millisecond));
        }
        fromString(t) {
          let e = !1;
          let r = "";
          let n = "";
          let i = 0;
          let o;
          let s = 0;
          let a = 0;
          if ("Z" === t[t.length - 1]) r = t.substr(0, t.length - 1), e = !0; else {
            const e = new Number(t[t.length - 1]);
            if (isNaN(e.valueOf())) throw new Error("Wrong input string for convertion");
            r = t;
          }
          if (e) {
            if (-1 !== r.indexOf("+")) throw new Error("Wrong input string for convertion");
            if (-1 !== r.indexOf("-")) throw new Error("Wrong input string for convertion");
          } else {
            let t = 1;
            let e = r.indexOf("+");
            let n = "";
            if (-1 === e && (e = r.indexOf("-"), t = -1), -1 !== e) {
              if (n = r.substr(e + 1), r = r.substr(0, e), 2 !== n.length && 4 !== n.length) throw new Error("Wrong input string for convertion");
              let i = new Number(n.substr(0, 2));
              if (isNaN(i.valueOf())) throw new Error("Wrong input string for convertion");
              if (s = t * i, 4 === n.length) {
                if (i = new Number(n.substr(2, 2)), isNaN(i.valueOf())) throw new Error("Wrong input string for convertion");
                a = t * i;
              }
            }
          }
          let u = r.indexOf(".");
          if (-1 === u && (u = r.indexOf(",")), -1 !== u) {
            const t = new Number(`0${r.substr(u)}`);
            if (isNaN(t.valueOf())) throw new Error("Wrong input string for convertion");
            i = t.valueOf(), n = r.substr(0, u);
          } else n = r;
          switch (!0) {
           case 8 === n.length:
            if (o = /(\d{4})(\d{2})(\d{2})/gi, -1 !== u) throw new Error("Wrong input string for convertion");
            break;

           case 10 === n.length:
            if (o = /(\d{4})(\d{2})(\d{2})(\d{2})/gi, -1 !== u) {
              let t = 60 * i;
              this.minute = Math.floor(t), t = 60 * (t - this.minute), this.second = Math.floor(t), t = 1e3 * (t - this.second), this.millisecond = Math.floor(t);
            }
            break;

           case 12 === n.length:
            if (o = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/gi, -1 !== u) {
              let t = 60 * i;
              this.second = Math.floor(t), t = 1e3 * (t - this.second), this.millisecond = Math.floor(t);
            }
            break;

           case 14 === n.length:
            if (o = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/gi, -1 !== u) {
              const t = 1e3 * i;
              this.millisecond = Math.floor(t);
            }
            break;

           default:
            throw new Error("Wrong input string for convertion");
          }
          const h = o.exec(n);
          if (null === h) throw new Error("Wrong input string for convertion");
          for (let l = 1; l < h.length; l++) switch (l) {
           case 1:
            this.year = parseInt(h[l], 10);
            break;

           case 2:
            this.month = parseInt(h[l], 10);
            break;

           case 3:
            this.day = parseInt(h[l], 10);
            break;

           case 4:
            this.hour = parseInt(h[l], 10) + s;
            break;

           case 5:
            this.minute = parseInt(h[l], 10) + a;
            break;

           case 6:
            this.second = parseInt(h[l], 10);
            break;

           default:
            throw new Error("Wrong input string for convertion");
          }
          if (!1 === e) {
            const t = new Date(this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);
            this.year = t.getUTCFullYear(), this.month = t.getUTCMonth(), this.day = t.getUTCDay(), this.hour = t.getUTCHours(), this.minute = t.getUTCMinutes(), 
            this.second = t.getUTCSeconds(), this.millisecond = t.getUTCMilliseconds();
          }
        }
        toString() {
          const t = [];
          return t.push((0, n.padNumber)(this.year, 4)), t.push((0, n.padNumber)(this.month, 2)), t.push((0, n.padNumber)(this.day, 2)), 
          t.push((0, n.padNumber)(this.hour, 2)), t.push((0, n.padNumber)(this.minute, 2)), t.push((0, n.padNumber)(this.second, 2)), 
          0 !== this.millisecond && (t.push("."), t.push((0, n.padNumber)(this.millisecond, 3))), t.push("Z"), t.join("");
        }
        static blockName() {
          return "GeneralizedTime";
        }
        toJSON() {
          let t = {};
          try {
            t = super.toJSON();
          } catch (e) {}
          return t.year = this.year, t.month = this.month, t.day = this.day, t.hour = this.hour, t.minute = this.minute, t.second = this.second, 
          t.millisecond = this.millisecond, t;
        }
      }
      class et extends P {
        constructor(t = {}) {
          super(t), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 31;
        }
        static blockName() {
          return "DATE";
        }
      }
      class rt extends P {
        constructor(t = {}) {
          super(t), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 32;
        }
        static blockName() {
          return "TimeOfDay";
        }
      }
      class nt extends P {
        constructor(t = {}) {
          super(t), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 33;
        }
        static blockName() {
          return "DateTime";
        }
      }
      class it extends P {
        constructor(t = {}) {
          super(t), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 34;
        }
        static blockName() {
          return "Duration";
        }
      }
      class ot extends P {
        constructor(t = {}) {
          super(t), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 14;
        }
        static blockName() {
          return "TIME";
        }
      }
      class st {
        constructor(t = {}) {
          this.value = (0, n.getParametersValue)(t, "value", []), this.optional = (0, n.getParametersValue)(t, "optional", !1);
        }
      }
      class at {
        constructor(t = {}) {
          this.name = (0, n.getParametersValue)(t, "name", ""), this.optional = (0, n.getParametersValue)(t, "optional", !1);
        }
      }
      class ut {
        constructor(t = {}) {
          this.name = (0, n.getParametersValue)(t, "name", ""), this.optional = (0, n.getParametersValue)(t, "optional", !1), this.value = (0, 
          n.getParametersValue)(t, "value", new at), this.local = (0, n.getParametersValue)(t, "local", !1);
        }
      }
      class ht {
        constructor(t = {}) {
          this.data = (0, n.getParametersValue)(t, "data", new ArrayBuffer(0));
        }
        fromBER(t, e, r) {
          return this.data = t.slice(e, r), e + r;
        }
        toBER(t = !1) {
          return this.data;
        }
      }
      function lt(t, e, r) {
        const i = e;
        let o = new f({}, Object);
        const a = new s;
        if (!1 === (0, n.checkBufferParams)(a, t, e, r)) return o.error = a.error, {
          offset: -1,
          result: o
        };
        if (0 === new Uint8Array(t, e, r).length) return o.error = "Zero buffer length", {
          offset: -1,
          result: o
        };
        let u = o.idBlock.fromBER(t, e, r);
        if (o.warnings.concat(o.idBlock.warnings), -1 === u) return o.error = o.idBlock.error, {
          offset: -1,
          result: o
        };
        if (e = u, r -= o.idBlock.blockLength, u = o.lenBlock.fromBER(t, e, r), o.warnings.concat(o.lenBlock.warnings), -1 === u) return o.error = o.lenBlock.error, 
        {
          offset: -1,
          result: o
        };
        if (e = u, r -= o.lenBlock.blockLength, !1 === o.idBlock.isConstructed && !0 === o.lenBlock.isIndefiniteForm) return o.error = "Indefinite length form used for primitive encoding form", 
        {
          offset: -1,
          result: o
        };
        let h = f;
        if (1 === o.idBlock.tagClass) {
          if (o.idBlock.tagNumber >= 37 && !1 === o.idBlock.isHexOnly) return o.error = "UNIVERSAL 37 and upper tags are reserved by ASN.1 standard", 
          {
            offset: -1,
            result: o
          };
          switch (o.idBlock.tagNumber) {
           case 0:
            if (!0 === o.idBlock.isConstructed && o.lenBlock.length > 0) return o.error = "Type [UNIVERSAL 0] is reserved", {
              offset: -1,
              result: o
            };
            h = p;
            break;

           case 1:
            h = b;
            break;

           case 2:
            h = N;
            break;

           case 3:
            h = E;
            break;

           case 4:
            h = x;
            break;

           case 5:
            h = k;
            break;

           case 6:
            h = C;
            break;

           case 10:
            h = _;
            break;

           case 12:
            h = P;
            break;

           case 13:
            h = R;
            break;

           case 14:
            h = ot;
            break;

           case 15:
            return o.error = "[UNIVERSAL 15] is reserved by ASN.1 standard", {
              offset: -1,
              result: o
            };

           case 16:
            h = w;
            break;

           case 17:
            h = A;
            break;

           case 18:
            h = V;
            break;

           case 19:
            h = K;
            break;

           case 20:
            h = J;
            break;

           case 21:
            h = W;
            break;

           case 22:
            h = G;
            break;

           case 23:
            h = Y;
            break;

           case 24:
            h = tt;
            break;

           case 25:
            h = Z;
            break;

           case 26:
            h = $;
            break;

           case 27:
            h = X;
            break;

           case 28:
            h = F;
            break;

           case 29:
            h = Q;
            break;

           case 30:
            h = H;
            break;

           case 31:
            h = et;
            break;

           case 32:
            h = rt;
            break;

           case 33:
            h = nt;
            break;

           case 34:
            h = it;
            break;

           default:
            {
              let t;
              t = !0 === o.idBlock.isConstructed ? new g : new d, t.idBlock = o.idBlock, t.lenBlock = o.lenBlock, t.warnings = o.warnings, 
              o = t;
            }
          }
        } else h = !0 === o.idBlock.isConstructed ? g : d;
        return o = function(t, e) {
          if (t instanceof e) return t;
          const r = new e;
          return r.idBlock = t.idBlock, r.lenBlock = t.lenBlock, r.warnings = t.warnings, r.valueBeforeDecode = t.valueBeforeDecode.slice(0), 
          r;
        }(o, h), u = o.fromBER(t, e, !0 === o.lenBlock.isIndefiniteForm ? r : o.lenBlock.length), o.valueBeforeDecode = t.slice(i, i + o.blockLength), 
        {
          offset: u,
          result: o
        };
      }
      function ft(t) {
        if (0 === t.byteLength) {
          const t = new f({}, Object);
          return t.error = "Input buffer has zero length", {
            offset: -1,
            result: t
          };
        }
        return lt(t, 0, t.byteLength);
      }
      function ct(t, e, r) {
        if (r instanceof st) {
          const n = !1;
          for (let i = 0; i < r.value.length; i++) {
            if (!0 === ct(t, e, r.value[i]).verified) return {
              verified: !0,
              result: t
            };
          }
          if (!1 === n) {
            const t = {
              verified: !1,
              result: {
                error: "Wrong values for Choice type"
              }
            };
            return r.hasOwnProperty("name") && (t.name = r.name), t;
          }
        }
        if (r instanceof at) return r.hasOwnProperty("name") && (t[r.name] = e), {
          verified: !0,
          result: t
        };
        if (t instanceof Object == !1) return {
          verified: !1,
          result: {
            error: "Wrong root object"
          }
        };
        if (e instanceof Object == !1) return {
          verified: !1,
          result: {
            error: "Wrong ASN.1 data"
          }
        };
        if (r instanceof Object == !1) return {
          verified: !1,
          result: {
            error: "Wrong ASN.1 schema"
          }
        };
        if ("idBlock" in r == !1) return {
          verified: !1,
          result: {
            error: "Wrong ASN.1 schema"
          }
        };
        if ("fromBER" in r.idBlock == !1) return {
          verified: !1,
          result: {
            error: "Wrong ASN.1 schema"
          }
        };
        if ("toBER" in r.idBlock == !1) return {
          verified: !1,
          result: {
            error: "Wrong ASN.1 schema"
          }
        };
        const n = r.idBlock.toBER(!1);
        if (0 === n.byteLength) return {
          verified: !1,
          result: {
            error: "Error encoding idBlock for ASN.1 schema"
          }
        };
        if (-1 === r.idBlock.fromBER(n, 0, n.byteLength)) return {
          verified: !1,
          result: {
            error: "Error decoding idBlock for ASN.1 schema"
          }
        };
        if (!1 === r.idBlock.hasOwnProperty("tagClass")) return {
          verified: !1,
          result: {
            error: "Wrong ASN.1 schema"
          }
        };
        if (r.idBlock.tagClass !== e.idBlock.tagClass) return {
          verified: !1,
          result: t
        };
        if (!1 === r.idBlock.hasOwnProperty("tagNumber")) return {
          verified: !1,
          result: {
            error: "Wrong ASN.1 schema"
          }
        };
        if (r.idBlock.tagNumber !== e.idBlock.tagNumber) return {
          verified: !1,
          result: t
        };
        if (!1 === r.idBlock.hasOwnProperty("isConstructed")) return {
          verified: !1,
          result: {
            error: "Wrong ASN.1 schema"
          }
        };
        if (r.idBlock.isConstructed !== e.idBlock.isConstructed) return {
          verified: !1,
          result: t
        };
        if ("isHexOnly" in r.idBlock == !1) return {
          verified: !1,
          result: {
            error: "Wrong ASN.1 schema"
          }
        };
        if (r.idBlock.isHexOnly !== e.idBlock.isHexOnly) return {
          verified: !1,
          result: t
        };
        if (!0 === r.idBlock.isHexOnly) {
          if ("valueHex" in r.idBlock == !1) return {
            verified: !1,
            result: {
              error: "Wrong ASN.1 schema"
            }
          };
          const n = new Uint8Array(r.idBlock.valueHex);
          const i = new Uint8Array(e.idBlock.valueHex);
          if (n.length !== i.length) return {
            verified: !1,
            result: t
          };
          for (let e = 0; e < n.length; e++) if (n[e] !== i[1]) return {
            verified: !1,
            result: t
          };
        }
        if (r.hasOwnProperty("name") && (r.name = r.name.replace(/^\s+|\s+$/g, ""), "" !== r.name && (t[r.name] = e)), !0 === r.idBlock.isConstructed) {
          let n = 0;
          let i = {
            verified: !1
          };
          let o = r.valueBlock.value.length;
          if (o > 0 && r.valueBlock.value[0] instanceof ut && (o = e.valueBlock.value.length), 0 === o) return {
            verified: !0,
            result: t
          };
          if (0 === e.valueBlock.value.length && 0 !== r.valueBlock.value.length) {
            let e = !0;
            for (let t = 0; t < r.valueBlock.value.length; t++) e = e && (r.valueBlock.value[t].optional || !1);
            return !0 === e ? {
              verified: !0,
              result: t
            } : (r.hasOwnProperty("name") && (r.name = r.name.replace(/^\s+|\s+$/g, ""), "" !== r.name && delete t[r.name]), t.error = "Inconsistent object length", 
            {
              verified: !1,
              result: t
            });
          }
          for (let s = 0; s < o; s++) if (s - n >= e.valueBlock.value.length) {
            if (!1 === r.valueBlock.value[s].optional) {
              const e = {
                verified: !1,
                result: t
              };
              return t.error = "Inconsistent length between ASN.1 data and schema", r.hasOwnProperty("name") && (r.name = r.name.replace(/^\s+|\s+$/g, ""), 
              "" !== r.name && (delete t[r.name], e.name = r.name)), e;
            }
          } else if (r.valueBlock.value[0] instanceof ut) {
            if (i = ct(t, e.valueBlock.value[s], r.valueBlock.value[0].value), !1 === i.verified) {
              if (!0 !== r.valueBlock.value[0].optional) return r.hasOwnProperty("name") && (r.name = r.name.replace(/^\s+|\s+$/g, ""), 
              "" !== r.name && delete t[r.name]), i;
              n++;
            }
            if ("name" in r.valueBlock.value[0] && r.valueBlock.value[0].name.length > 0) {
              let n = {};
              n = "local" in r.valueBlock.value[0] && !0 === r.valueBlock.value[0].local ? e : t, void 0 === n[r.valueBlock.value[0].name] && (n[r.valueBlock.value[0].name] = []), 
              n[r.valueBlock.value[0].name].push(e.valueBlock.value[s]);
            }
          } else if (i = ct(t, e.valueBlock.value[s - n], r.valueBlock.value[s]), !1 === i.verified) {
            if (!0 !== r.valueBlock.value[s].optional) return r.hasOwnProperty("name") && (r.name = r.name.replace(/^\s+|\s+$/g, ""), 
            "" !== r.name && delete t[r.name]), i;
            n++;
          }
          if (!1 === i.verified) {
            const e = {
              verified: !1,
              result: t
            };
            return r.hasOwnProperty("name") && (r.name = r.name.replace(/^\s+|\s+$/g, ""), "" !== r.name && (delete t[r.name], e.name = r.name)), 
            e;
          }
          return {
            verified: !0,
            result: t
          };
        }
        if ("primitiveSchema" in r && "valueHex" in e.valueBlock) {
          const n = ft(e.valueBlock.valueHex);
          if (-1 === n.offset) {
            const e = {
              verified: !1,
              result: n.result
            };
            return r.hasOwnProperty("name") && (r.name = r.name.replace(/^\s+|\s+$/g, ""), "" !== r.name && (delete t[r.name], e.name = r.name)), 
            e;
          }
          return ct(t, n.result, r.primitiveSchema);
        }
        return {
          verified: !0,
          result: t
        };
      }
      function dt(t, e) {
        if (e instanceof Object == !1) return {
          verified: !1,
          result: {
            error: "Wrong ASN.1 schema type"
          }
        };
        const r = ft(t);
        return -1 === r.offset ? {
          verified: !1,
          result: r.result
        } : ct(r.result, r.result, e);
      }
      function vt(t) {}
    },
    "./node_modules/base64-js/index.js": (t, e) => {
      "use strict";
      e.byteLength = function(t) {
        var e = u(t);
        var r = e[0];
        var n = e[1];
        return 3 * (r + n) / 4 - n;
      }, e.toByteArray = function(t) {
        var e;
        var r = u(t);
        var o = r[0];
        var s = r[1];
        var a = new i(function(t, e, r) {
          return 3 * (e + r) / 4 - r;
        }(0, o, s));
        var h = 0;
        var l = s > 0 ? o - 4 : o;
        var f;
        for (f = 0; f < l; f += 4) e = n[t.charCodeAt(f)] << 18 | n[t.charCodeAt(f + 1)] << 12 | n[t.charCodeAt(f + 2)] << 6 | n[t.charCodeAt(f + 3)], 
        a[h++] = e >> 16 & 255, a[h++] = e >> 8 & 255, a[h++] = 255 & e;
        2 === s && (e = n[t.charCodeAt(f)] << 2 | n[t.charCodeAt(f + 1)] >> 4, a[h++] = 255 & e);
        1 === s && (e = n[t.charCodeAt(f)] << 10 | n[t.charCodeAt(f + 1)] << 4 | n[t.charCodeAt(f + 2)] >> 2, a[h++] = e >> 8 & 255, 
        a[h++] = 255 & e);
        return a;
      }, e.fromByteArray = function(t) {
        var e;
        var n = t.length;
        var i = n % 3;
        var o = [];
        var s = 16383;
        for (var a = 0, u = n - i; a < u; a += s) o.push(l(t, a, a + s > u ? u : a + s));
        1 === i ? (e = t[n - 1], o.push(r[e >> 2] + r[e << 4 & 63] + '==')) : 2 === i && (e = (t[n - 2] << 8) + t[n - 1], o.push(r[e >> 10] + r[e >> 4 & 63] + r[e << 2 & 63] + '='));
        return o.join('');
      };
      var r = [];
      var n = [];
      var i = 'undefined' != typeof Uint8Array ? Uint8Array : Array;
      var o = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
      for (var s = 0, a = o.length; s < a; ++s) r[s] = o[s], n[o.charCodeAt(s)] = s;
      function u(t) {
        var e = t.length;
        if (e % 4 > 0) throw new Error('Invalid string. Length must be a multiple of 4');
        var r = t.indexOf('=');
        return -1 === r && (r = e), [ r, r === e ? 0 : 4 - r % 4 ];
      }
      function h(t) {
        return r[t >> 18 & 63] + r[t >> 12 & 63] + r[t >> 6 & 63] + r[63 & t];
      }
      function l(t, e, r) {
        var n;
        var i = [];
        for (var o = e; o < r; o += 3) n = (t[o] << 16 & 16711680) + (t[o + 1] << 8 & 65280) + (255 & t[o + 2]), i.push(h(n));
        return i.join('');
      }
      n['-'.charCodeAt(0)] = 62, n['_'.charCodeAt(0)] = 63;
    },
    "./node_modules/bn.js/lib/bn.js": function(t, e, r) {
      !function(t, e) {
        'use strict';
        function n(t, e) {
          if (!t) throw new Error(e || 'Assertion failed');
        }
        function i(t, e) {
          t.super_ = e;
          var r = function() {};
          r.prototype = e.prototype, t.prototype = new r, t.prototype.constructor = t;
        }
        function o(t, e, r) {
          if (o.isBN(t)) return t;
          this.negative = 0, this.words = null, this.length = 0, this.red = null, null !== t && ('le' !== e && 'be' !== e || (r = e, 
          e = 10), this._init(t || 0, e || 10, r || 'be'));
        }
        var s;
        'object' == typeof t ? t.exports = o : e.BN = o, o.BN = o, o.wordSize = 26;
        try {
          s = 'undefined' != typeof window && void 0 !== window.Buffer ? window.Buffer : r("?8131").Buffer;
        } catch (S) {}
        function a(t, e) {
          var r = t.charCodeAt(e);
          return r >= 65 && r <= 70 ? r - 55 : r >= 97 && r <= 102 ? r - 87 : r - 48 & 15;
        }
        function u(t, e, r) {
          var n = a(t, r);
          return r - 1 >= e && (n |= a(t, r - 1) << 4), n;
        }
        function h(t, e, r, n) {
          var i = 0;
          var o = Math.min(t.length, r);
          for (var s = e; s < o; s++) {
            var a = t.charCodeAt(s) - 48;
            i *= n, i += a >= 49 ? a - 49 + 10 : a >= 17 ? a - 17 + 10 : a;
          }
          return i;
        }
        o.isBN = function(t) {
          return t instanceof o || null !== t && 'object' == typeof t && t.constructor.wordSize === o.wordSize && Array.isArray(t.words);
        }, o.max = function(t, e) {
          return t.cmp(e) > 0 ? t : e;
        }, o.min = function(t, e) {
          return t.cmp(e) < 0 ? t : e;
        }, o.prototype._init = function(t, e, r) {
          if ('number' == typeof t) return this._initNumber(t, e, r);
          if ('object' == typeof t) return this._initArray(t, e, r);
          'hex' === e && (e = 16), n(e === (0 | e) && e >= 2 && e <= 36);
          var i = 0;
          '-' === (t = t.toString().replace(/\s+/g, ''))[0] && (i++, this.negative = 1), i < t.length && (16 === e ? this._parseHex(t, i, r) : (this._parseBase(t, e, i), 
          'le' === r && this._initArray(this.toArray(), e, r)));
        }, o.prototype._initNumber = function(t, e, r) {
          t < 0 && (this.negative = 1, t = -t), t < 67108864 ? (this.words = [ 67108863 & t ], this.length = 1) : t < 4503599627370496 ? (this.words = [ 67108863 & t, t / 67108864 & 67108863 ], 
          this.length = 2) : (n(t < 9007199254740992), this.words = [ 67108863 & t, t / 67108864 & 67108863, 1 ], this.length = 3), 
          'le' === r && this._initArray(this.toArray(), e, r);
        }, o.prototype._initArray = function(t, e, r) {
          if (n('number' == typeof t.length), t.length <= 0) return this.words = [ 0 ], this.length = 1, this;
          this.length = Math.ceil(t.length / 3), this.words = new Array(this.length);
          for (var i = 0; i < this.length; i++) this.words[i] = 0;
          var o, s;
          var a = 0;
          if ('be' === r) for (i = t.length - 1, o = 0; i >= 0; i -= 3) s = t[i] | t[i - 1] << 8 | t[i - 2] << 16, this.words[o] |= s << a & 67108863, 
          this.words[o + 1] = s >>> 26 - a & 67108863, (a += 24) >= 26 && (a -= 26, o++); else if ('le' === r) for (i = 0, o = 0; i < t.length; i += 3) s = t[i] | t[i + 1] << 8 | t[i + 2] << 16, 
          this.words[o] |= s << a & 67108863, this.words[o + 1] = s >>> 26 - a & 67108863, (a += 24) >= 26 && (a -= 26, o++);
          return this.strip();
        }, o.prototype._parseHex = function(t, e, r) {
          this.length = Math.ceil((t.length - e) / 6), this.words = new Array(this.length);
          for (var n = 0; n < this.length; n++) this.words[n] = 0;
          var i = 0;
          var o = 0;
          var s;
          if ('be' === r) for (n = t.length - 1; n >= e; n -= 2) s = u(t, e, n) << i, this.words[o] |= 67108863 & s, i >= 18 ? (i -= 18, 
          o += 1, this.words[o] |= s >>> 26) : i += 8; else for (n = (t.length - e) % 2 == 0 ? e + 1 : e; n < t.length; n += 2) s = u(t, e, n) << i, 
          this.words[o] |= 67108863 & s, i >= 18 ? (i -= 18, o += 1, this.words[o] |= s >>> 26) : i += 8;
          this.strip();
        }, o.prototype._parseBase = function(t, e, r) {
          this.words = [ 0 ], this.length = 1;
          for (var n = 0, i = 1; i <= 67108863; i *= e) n++;
          n--, i = i / e | 0;
          var o = t.length - r;
          var s = o % n;
          var a = Math.min(o, o - s) + r;
          var u = 0;
          for (var l = r; l < a; l += n) u = h(t, l, l + n, e), this.imuln(i), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u);
          if (0 !== s) {
            var f = 1;
            for (u = h(t, l, t.length, e), l = 0; l < s; l++) f *= e;
            this.imuln(f), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u);
          }
          this.strip();
        }, o.prototype.copy = function(t) {
          t.words = new Array(this.length);
          for (var e = 0; e < this.length; e++) t.words[e] = this.words[e];
          t.length = this.length, t.negative = this.negative, t.red = this.red;
        }, o.prototype.clone = function() {
          var t = new o(null);
          return this.copy(t), t;
        }, o.prototype._expand = function(t) {
          for (;this.length < t; ) this.words[this.length++] = 0;
          return this;
        }, o.prototype.strip = function() {
          for (;this.length > 1 && 0 === this.words[this.length - 1]; ) this.length--;
          return this._normSign();
        }, o.prototype._normSign = function() {
          return 1 === this.length && 0 === this.words[0] && (this.negative = 0), this;
        }, o.prototype.inspect = function() {
          return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>';
        };
        var l = [ '', '0', '00', '000', '0000', '00000', '000000', '0000000', '00000000', '000000000', '0000000000', '00000000000', '000000000000', '0000000000000', '00000000000000', '000000000000000', '0000000000000000', '00000000000000000', '000000000000000000', '0000000000000000000', '00000000000000000000', '000000000000000000000', '0000000000000000000000', '00000000000000000000000', '000000000000000000000000', '0000000000000000000000000' ];
        var f = [ 0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5 ];
        var c = [ 0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176 ];
        function d(t, e, r) {
          r.negative = e.negative ^ t.negative;
          var n = t.length + e.length | 0;
          r.length = n, n = n - 1 | 0;
          var i = 0 | t.words[0];
          var o = 0 | e.words[0];
          var s = i * o;
          var a = 67108863 & s;
          var u = s / 67108864 | 0;
          r.words[0] = a;
          for (var h = 1; h < n; h++) {
            var l = u >>> 26;
            var f = 67108863 & u;
            var c = Math.min(h, e.length - 1);
            for (var d = Math.max(0, h - t.length + 1); d <= c; d++) {
              var v = h - d | 0;
              l += (s = (i = 0 | t.words[v]) * (o = 0 | e.words[d]) + f) / 67108864 | 0, f = 67108863 & s;
            }
            r.words[h] = 0 | f, u = 0 | l;
          }
          return 0 !== u ? r.words[h] = 0 | u : r.length--, r.strip();
        }
        o.prototype.toString = function(t, e) {
          var r;
          if (e = 0 | e || 1, 16 === (t = t || 10) || 'hex' === t) {
            r = '';
            var i = 0;
            var o = 0;
            for (var s = 0; s < this.length; s++) {
              var a = this.words[s];
              var u = (16777215 & (a << i | o)).toString(16);
              r = 0 !== (o = a >>> 24 - i & 16777215) || s !== this.length - 1 ? l[6 - u.length] + u + r : u + r, (i += 2) >= 26 && (i -= 26, 
              s--);
            }
            for (0 !== o && (r = o.toString(16) + r); r.length % e != 0; ) r = '0' + r;
            return 0 !== this.negative && (r = '-' + r), r;
          }
          if (t === (0 | t) && t >= 2 && t <= 36) {
            var h = f[t];
            var d = c[t];
            r = '';
            var v = this.clone();
            for (v.negative = 0; !v.isZero(); ) {
              var g = v.modn(d).toString(t);
              r = (v = v.idivn(d)).isZero() ? g + r : l[h - g.length] + g + r;
            }
            for (this.isZero() && (r = '0' + r); r.length % e != 0; ) r = '0' + r;
            return 0 !== this.negative && (r = '-' + r), r;
          }
          n(!1, 'Base should be between 2 and 36');
        }, o.prototype.toNumber = function() {
          var t = this.words[0];
          return 2 === this.length ? t += 67108864 * this.words[1] : 3 === this.length && 1 === this.words[2] ? t += 4503599627370496 + 67108864 * this.words[1] : this.length > 2 && n(!1, 'Number can only safely store up to 53 bits'), 
          0 !== this.negative ? -t : t;
        }, o.prototype.toJSON = function() {
          return this.toString(16);
        }, o.prototype.toBuffer = function(t, e) {
          return n(void 0 !== s), this.toArrayLike(s, t, e);
        }, o.prototype.toArray = function(t, e) {
          return this.toArrayLike(Array, t, e);
        }, o.prototype.toArrayLike = function(t, e, r) {
          var i = this.byteLength();
          var o = r || Math.max(1, i);
          n(i <= o, 'byte array longer than desired length'), n(o > 0, 'Requested array length <= 0'), this.strip();
          var s = 'le' === e;
          var a = new t(o);
          var u, h;
          var l = this.clone();
          if (s) {
            for (h = 0; !l.isZero(); h++) u = l.andln(255), l.iushrn(8), a[h] = u;
            for (;h < o; h++) a[h] = 0;
          } else {
            for (h = 0; h < o - i; h++) a[h] = 0;
            for (h = 0; !l.isZero(); h++) u = l.andln(255), l.iushrn(8), a[o - h - 1] = u;
          }
          return a;
        }, Math.clz32 ? o.prototype._countBits = function(t) {
          return 32 - Math.clz32(t);
        } : o.prototype._countBits = function(t) {
          var e = t;
          var r = 0;
          return e >= 4096 && (r += 13, e >>>= 13), e >= 64 && (r += 7, e >>>= 7), e >= 8 && (r += 4, e >>>= 4), e >= 2 && (r += 2, 
          e >>>= 2), r + e;
        }, o.prototype._zeroBits = function(t) {
          if (0 === t) return 26;
          var e = t;
          var r = 0;
          return 0 == (8191 & e) && (r += 13, e >>>= 13), 0 == (127 & e) && (r += 7, e >>>= 7), 0 == (15 & e) && (r += 4, e >>>= 4), 
          0 == (3 & e) && (r += 2, e >>>= 2), 0 == (1 & e) && r++, r;
        }, o.prototype.bitLength = function() {
          var t = this.words[this.length - 1];
          var e = this._countBits(t);
          return 26 * (this.length - 1) + e;
        }, o.prototype.zeroBits = function() {
          if (this.isZero()) return 0;
          var t = 0;
          for (var e = 0; e < this.length; e++) {
            var r = this._zeroBits(this.words[e]);
            if (t += r, 26 !== r) break;
          }
          return t;
        }, o.prototype.byteLength = function() {
          return Math.ceil(this.bitLength() / 8);
        }, o.prototype.toTwos = function(t) {
          return 0 !== this.negative ? this.abs().inotn(t).iaddn(1) : this.clone();
        }, o.prototype.fromTwos = function(t) {
          return this.testn(t - 1) ? this.notn(t).iaddn(1).ineg() : this.clone();
        }, o.prototype.isNeg = function() {
          return 0 !== this.negative;
        }, o.prototype.neg = function() {
          return this.clone().ineg();
        }, o.prototype.ineg = function() {
          return this.isZero() || (this.negative ^= 1), this;
        }, o.prototype.iuor = function(t) {
          for (;this.length < t.length; ) this.words[this.length++] = 0;
          for (var e = 0; e < t.length; e++) this.words[e] = this.words[e] | t.words[e];
          return this.strip();
        }, o.prototype.ior = function(t) {
          return n(0 == (this.negative | t.negative)), this.iuor(t);
        }, o.prototype.or = function(t) {
          return this.length > t.length ? this.clone().ior(t) : t.clone().ior(this);
        }, o.prototype.uor = function(t) {
          return this.length > t.length ? this.clone().iuor(t) : t.clone().iuor(this);
        }, o.prototype.iuand = function(t) {
          var e;
          e = this.length > t.length ? t : this;
          for (var r = 0; r < e.length; r++) this.words[r] = this.words[r] & t.words[r];
          return this.length = e.length, this.strip();
        }, o.prototype.iand = function(t) {
          return n(0 == (this.negative | t.negative)), this.iuand(t);
        }, o.prototype.and = function(t) {
          return this.length > t.length ? this.clone().iand(t) : t.clone().iand(this);
        }, o.prototype.uand = function(t) {
          return this.length > t.length ? this.clone().iuand(t) : t.clone().iuand(this);
        }, o.prototype.iuxor = function(t) {
          var e;
          var r;
          this.length > t.length ? (e = this, r = t) : (e = t, r = this);
          for (var n = 0; n < r.length; n++) this.words[n] = e.words[n] ^ r.words[n];
          if (this !== e) for (;n < e.length; n++) this.words[n] = e.words[n];
          return this.length = e.length, this.strip();
        }, o.prototype.ixor = function(t) {
          return n(0 == (this.negative | t.negative)), this.iuxor(t);
        }, o.prototype.xor = function(t) {
          return this.length > t.length ? this.clone().ixor(t) : t.clone().ixor(this);
        }, o.prototype.uxor = function(t) {
          return this.length > t.length ? this.clone().iuxor(t) : t.clone().iuxor(this);
        }, o.prototype.inotn = function(t) {
          n('number' == typeof t && t >= 0);
          var e = 0 | Math.ceil(t / 26);
          var r = t % 26;
          this._expand(e), r > 0 && e--;
          for (var i = 0; i < e; i++) this.words[i] = 67108863 & ~this.words[i];
          return r > 0 && (this.words[i] = ~this.words[i] & 67108863 >> 26 - r), this.strip();
        }, o.prototype.notn = function(t) {
          return this.clone().inotn(t);
        }, o.prototype.setn = function(t, e) {
          n('number' == typeof t && t >= 0);
          var r = t / 26 | 0;
          var i = t % 26;
          return this._expand(r + 1), this.words[r] = e ? this.words[r] | 1 << i : this.words[r] & ~(1 << i), this.strip();
        }, o.prototype.iadd = function(t) {
          var e;
          if (0 !== this.negative && 0 === t.negative) return this.negative = 0, e = this.isub(t), this.negative ^= 1, this._normSign();
          if (0 === this.negative && 0 !== t.negative) return t.negative = 0, e = this.isub(t), t.negative = 1, e._normSign();
          var r, n;
          this.length > t.length ? (r = this, n = t) : (r = t, n = this);
          var i = 0;
          for (var o = 0; o < n.length; o++) e = (0 | r.words[o]) + (0 | n.words[o]) + i, this.words[o] = 67108863 & e, i = e >>> 26;
          for (;0 !== i && o < r.length; o++) e = (0 | r.words[o]) + i, this.words[o] = 67108863 & e, i = e >>> 26;
          if (this.length = r.length, 0 !== i) this.words[this.length] = i, this.length++; else if (r !== this) for (;o < r.length; o++) this.words[o] = r.words[o];
          return this;
        }, o.prototype.add = function(t) {
          var e;
          return 0 !== t.negative && 0 === this.negative ? (t.negative = 0, e = this.sub(t), t.negative ^= 1, e) : 0 === t.negative && 0 !== this.negative ? (this.negative = 0, 
          e = t.sub(this), this.negative = 1, e) : this.length > t.length ? this.clone().iadd(t) : t.clone().iadd(this);
        }, o.prototype.isub = function(t) {
          if (0 !== t.negative) {
            t.negative = 0;
            var e = this.iadd(t);
            return t.negative = 1, e._normSign();
          }
          if (0 !== this.negative) return this.negative = 0, this.iadd(t), this.negative = 1, this._normSign();
          var r = this.cmp(t);
          if (0 === r) return this.negative = 0, this.length = 1, this.words[0] = 0, this;
          var n, i;
          r > 0 ? (n = this, i = t) : (n = t, i = this);
          var o = 0;
          for (var s = 0; s < i.length; s++) o = (e = (0 | n.words[s]) - (0 | i.words[s]) + o) >> 26, this.words[s] = 67108863 & e;
          for (;0 !== o && s < n.length; s++) o = (e = (0 | n.words[s]) + o) >> 26, this.words[s] = 67108863 & e;
          if (0 === o && s < n.length && n !== this) for (;s < n.length; s++) this.words[s] = n.words[s];
          return this.length = Math.max(this.length, s), n !== this && (this.negative = 1), this.strip();
        }, o.prototype.sub = function(t) {
          return this.clone().isub(t);
        };
        var v = function(t, e, r) {
          var n = t.words;
          var i = e.words;
          var o = r.words;
          var s = 0;
          var a;
          var u;
          var h;
          var l = 0 | n[0];
          var f = 8191 & l;
          var c = l >>> 13;
          var d = 0 | n[1];
          var v = 8191 & d;
          var g = d >>> 13;
          var m = 0 | n[2];
          var p = 8191 & m;
          var y = m >>> 13;
          var b = 0 | n[3];
          var w = 8191 & b;
          var A = b >>> 13;
          var k = 0 | n[4];
          var B = 8191 & k;
          var x = k >>> 13;
          var S = 0 | n[5];
          var E = 8191 & S;
          var M = S >>> 13;
          var N = 0 | n[6];
          var _ = 8191 & N;
          var I = N >>> 13;
          var O = 0 | n[7];
          var C = 8191 & O;
          var L = O >>> 13;
          var P = 0 | n[8];
          var j = 8191 & P;
          var U = P >>> 13;
          var R = 0 | n[9];
          var T = 8191 & R;
          var H = R >>> 13;
          var D = 0 | i[0];
          var F = 8191 & D;
          var z = D >>> 13;
          var q = 0 | i[1];
          var V = 8191 & q;
          var K = q >>> 13;
          var J = 0 | i[2];
          var W = 8191 & J;
          var G = J >>> 13;
          var Z = 0 | i[3];
          var $ = 8191 & Z;
          var X = Z >>> 13;
          var Q = 0 | i[4];
          var Y = 8191 & Q;
          var tt = Q >>> 13;
          var et = 0 | i[5];
          var rt = 8191 & et;
          var nt = et >>> 13;
          var it = 0 | i[6];
          var ot = 8191 & it;
          var st = it >>> 13;
          var at = 0 | i[7];
          var ut = 8191 & at;
          var ht = at >>> 13;
          var lt = 0 | i[8];
          var ft = 8191 & lt;
          var ct = lt >>> 13;
          var dt = 0 | i[9];
          var vt = 8191 & dt;
          var gt = dt >>> 13;
          r.negative = t.negative ^ e.negative, r.length = 19;
          var mt = (s + (a = Math.imul(f, F)) | 0) + ((8191 & (u = (u = Math.imul(f, z)) + Math.imul(c, F) | 0)) << 13) | 0;
          s = ((h = Math.imul(c, z)) + (u >>> 13) | 0) + (mt >>> 26) | 0, mt &= 67108863, a = Math.imul(v, F), u = (u = Math.imul(v, z)) + Math.imul(g, F) | 0, 
          h = Math.imul(g, z);
          var pt = (s + (a = a + Math.imul(f, V) | 0) | 0) + ((8191 & (u = (u = u + Math.imul(f, K) | 0) + Math.imul(c, V) | 0)) << 13) | 0;
          s = ((h = h + Math.imul(c, K) | 0) + (u >>> 13) | 0) + (pt >>> 26) | 0, pt &= 67108863, a = Math.imul(p, F), u = (u = Math.imul(p, z)) + Math.imul(y, F) | 0, 
          h = Math.imul(y, z), a = a + Math.imul(v, V) | 0, u = (u = u + Math.imul(v, K) | 0) + Math.imul(g, V) | 0, h = h + Math.imul(g, K) | 0;
          var yt = (s + (a = a + Math.imul(f, W) | 0) | 0) + ((8191 & (u = (u = u + Math.imul(f, G) | 0) + Math.imul(c, W) | 0)) << 13) | 0;
          s = ((h = h + Math.imul(c, G) | 0) + (u >>> 13) | 0) + (yt >>> 26) | 0, yt &= 67108863, a = Math.imul(w, F), u = (u = Math.imul(w, z)) + Math.imul(A, F) | 0, 
          h = Math.imul(A, z), a = a + Math.imul(p, V) | 0, u = (u = u + Math.imul(p, K) | 0) + Math.imul(y, V) | 0, h = h + Math.imul(y, K) | 0, 
          a = a + Math.imul(v, W) | 0, u = (u = u + Math.imul(v, G) | 0) + Math.imul(g, W) | 0, h = h + Math.imul(g, G) | 0;
          var bt = (s + (a = a + Math.imul(f, $) | 0) | 0) + ((8191 & (u = (u = u + Math.imul(f, X) | 0) + Math.imul(c, $) | 0)) << 13) | 0;
          s = ((h = h + Math.imul(c, X) | 0) + (u >>> 13) | 0) + (bt >>> 26) | 0, bt &= 67108863, a = Math.imul(B, F), u = (u = Math.imul(B, z)) + Math.imul(x, F) | 0, 
          h = Math.imul(x, z), a = a + Math.imul(w, V) | 0, u = (u = u + Math.imul(w, K) | 0) + Math.imul(A, V) | 0, h = h + Math.imul(A, K) | 0, 
          a = a + Math.imul(p, W) | 0, u = (u = u + Math.imul(p, G) | 0) + Math.imul(y, W) | 0, h = h + Math.imul(y, G) | 0, a = a + Math.imul(v, $) | 0, 
          u = (u = u + Math.imul(v, X) | 0) + Math.imul(g, $) | 0, h = h + Math.imul(g, X) | 0;
          var wt = (s + (a = a + Math.imul(f, Y) | 0) | 0) + ((8191 & (u = (u = u + Math.imul(f, tt) | 0) + Math.imul(c, Y) | 0)) << 13) | 0;
          s = ((h = h + Math.imul(c, tt) | 0) + (u >>> 13) | 0) + (wt >>> 26) | 0, wt &= 67108863, a = Math.imul(E, F), u = (u = Math.imul(E, z)) + Math.imul(M, F) | 0, 
          h = Math.imul(M, z), a = a + Math.imul(B, V) | 0, u = (u = u + Math.imul(B, K) | 0) + Math.imul(x, V) | 0, h = h + Math.imul(x, K) | 0, 
          a = a + Math.imul(w, W) | 0, u = (u = u + Math.imul(w, G) | 0) + Math.imul(A, W) | 0, h = h + Math.imul(A, G) | 0, a = a + Math.imul(p, $) | 0, 
          u = (u = u + Math.imul(p, X) | 0) + Math.imul(y, $) | 0, h = h + Math.imul(y, X) | 0, a = a + Math.imul(v, Y) | 0, u = (u = u + Math.imul(v, tt) | 0) + Math.imul(g, Y) | 0, 
          h = h + Math.imul(g, tt) | 0;
          var At = (s + (a = a + Math.imul(f, rt) | 0) | 0) + ((8191 & (u = (u = u + Math.imul(f, nt) | 0) + Math.imul(c, rt) | 0)) << 13) | 0;
          s = ((h = h + Math.imul(c, nt) | 0) + (u >>> 13) | 0) + (At >>> 26) | 0, At &= 67108863, a = Math.imul(_, F), u = (u = Math.imul(_, z)) + Math.imul(I, F) | 0, 
          h = Math.imul(I, z), a = a + Math.imul(E, V) | 0, u = (u = u + Math.imul(E, K) | 0) + Math.imul(M, V) | 0, h = h + Math.imul(M, K) | 0, 
          a = a + Math.imul(B, W) | 0, u = (u = u + Math.imul(B, G) | 0) + Math.imul(x, W) | 0, h = h + Math.imul(x, G) | 0, a = a + Math.imul(w, $) | 0, 
          u = (u = u + Math.imul(w, X) | 0) + Math.imul(A, $) | 0, h = h + Math.imul(A, X) | 0, a = a + Math.imul(p, Y) | 0, u = (u = u + Math.imul(p, tt) | 0) + Math.imul(y, Y) | 0, 
          h = h + Math.imul(y, tt) | 0, a = a + Math.imul(v, rt) | 0, u = (u = u + Math.imul(v, nt) | 0) + Math.imul(g, rt) | 0, h = h + Math.imul(g, nt) | 0;
          var kt = (s + (a = a + Math.imul(f, ot) | 0) | 0) + ((8191 & (u = (u = u + Math.imul(f, st) | 0) + Math.imul(c, ot) | 0)) << 13) | 0;
          s = ((h = h + Math.imul(c, st) | 0) + (u >>> 13) | 0) + (kt >>> 26) | 0, kt &= 67108863, a = Math.imul(C, F), u = (u = Math.imul(C, z)) + Math.imul(L, F) | 0, 
          h = Math.imul(L, z), a = a + Math.imul(_, V) | 0, u = (u = u + Math.imul(_, K) | 0) + Math.imul(I, V) | 0, h = h + Math.imul(I, K) | 0, 
          a = a + Math.imul(E, W) | 0, u = (u = u + Math.imul(E, G) | 0) + Math.imul(M, W) | 0, h = h + Math.imul(M, G) | 0, a = a + Math.imul(B, $) | 0, 
          u = (u = u + Math.imul(B, X) | 0) + Math.imul(x, $) | 0, h = h + Math.imul(x, X) | 0, a = a + Math.imul(w, Y) | 0, u = (u = u + Math.imul(w, tt) | 0) + Math.imul(A, Y) | 0, 
          h = h + Math.imul(A, tt) | 0, a = a + Math.imul(p, rt) | 0, u = (u = u + Math.imul(p, nt) | 0) + Math.imul(y, rt) | 0, h = h + Math.imul(y, nt) | 0, 
          a = a + Math.imul(v, ot) | 0, u = (u = u + Math.imul(v, st) | 0) + Math.imul(g, ot) | 0, h = h + Math.imul(g, st) | 0;
          var Bt = (s + (a = a + Math.imul(f, ut) | 0) | 0) + ((8191 & (u = (u = u + Math.imul(f, ht) | 0) + Math.imul(c, ut) | 0)) << 13) | 0;
          s = ((h = h + Math.imul(c, ht) | 0) + (u >>> 13) | 0) + (Bt >>> 26) | 0, Bt &= 67108863, a = Math.imul(j, F), u = (u = Math.imul(j, z)) + Math.imul(U, F) | 0, 
          h = Math.imul(U, z), a = a + Math.imul(C, V) | 0, u = (u = u + Math.imul(C, K) | 0) + Math.imul(L, V) | 0, h = h + Math.imul(L, K) | 0, 
          a = a + Math.imul(_, W) | 0, u = (u = u + Math.imul(_, G) | 0) + Math.imul(I, W) | 0, h = h + Math.imul(I, G) | 0, a = a + Math.imul(E, $) | 0, 
          u = (u = u + Math.imul(E, X) | 0) + Math.imul(M, $) | 0, h = h + Math.imul(M, X) | 0, a = a + Math.imul(B, Y) | 0, u = (u = u + Math.imul(B, tt) | 0) + Math.imul(x, Y) | 0, 
          h = h + Math.imul(x, tt) | 0, a = a + Math.imul(w, rt) | 0, u = (u = u + Math.imul(w, nt) | 0) + Math.imul(A, rt) | 0, h = h + Math.imul(A, nt) | 0, 
          a = a + Math.imul(p, ot) | 0, u = (u = u + Math.imul(p, st) | 0) + Math.imul(y, ot) | 0, h = h + Math.imul(y, st) | 0, a = a + Math.imul(v, ut) | 0, 
          u = (u = u + Math.imul(v, ht) | 0) + Math.imul(g, ut) | 0, h = h + Math.imul(g, ht) | 0;
          var xt = (s + (a = a + Math.imul(f, ft) | 0) | 0) + ((8191 & (u = (u = u + Math.imul(f, ct) | 0) + Math.imul(c, ft) | 0)) << 13) | 0;
          s = ((h = h + Math.imul(c, ct) | 0) + (u >>> 13) | 0) + (xt >>> 26) | 0, xt &= 67108863, a = Math.imul(T, F), u = (u = Math.imul(T, z)) + Math.imul(H, F) | 0, 
          h = Math.imul(H, z), a = a + Math.imul(j, V) | 0, u = (u = u + Math.imul(j, K) | 0) + Math.imul(U, V) | 0, h = h + Math.imul(U, K) | 0, 
          a = a + Math.imul(C, W) | 0, u = (u = u + Math.imul(C, G) | 0) + Math.imul(L, W) | 0, h = h + Math.imul(L, G) | 0, a = a + Math.imul(_, $) | 0, 
          u = (u = u + Math.imul(_, X) | 0) + Math.imul(I, $) | 0, h = h + Math.imul(I, X) | 0, a = a + Math.imul(E, Y) | 0, u = (u = u + Math.imul(E, tt) | 0) + Math.imul(M, Y) | 0, 
          h = h + Math.imul(M, tt) | 0, a = a + Math.imul(B, rt) | 0, u = (u = u + Math.imul(B, nt) | 0) + Math.imul(x, rt) | 0, h = h + Math.imul(x, nt) | 0, 
          a = a + Math.imul(w, ot) | 0, u = (u = u + Math.imul(w, st) | 0) + Math.imul(A, ot) | 0, h = h + Math.imul(A, st) | 0, a = a + Math.imul(p, ut) | 0, 
          u = (u = u + Math.imul(p, ht) | 0) + Math.imul(y, ut) | 0, h = h + Math.imul(y, ht) | 0, a = a + Math.imul(v, ft) | 0, u = (u = u + Math.imul(v, ct) | 0) + Math.imul(g, ft) | 0, 
          h = h + Math.imul(g, ct) | 0;
          var St = (s + (a = a + Math.imul(f, vt) | 0) | 0) + ((8191 & (u = (u = u + Math.imul(f, gt) | 0) + Math.imul(c, vt) | 0)) << 13) | 0;
          s = ((h = h + Math.imul(c, gt) | 0) + (u >>> 13) | 0) + (St >>> 26) | 0, St &= 67108863, a = Math.imul(T, V), u = (u = Math.imul(T, K)) + Math.imul(H, V) | 0, 
          h = Math.imul(H, K), a = a + Math.imul(j, W) | 0, u = (u = u + Math.imul(j, G) | 0) + Math.imul(U, W) | 0, h = h + Math.imul(U, G) | 0, 
          a = a + Math.imul(C, $) | 0, u = (u = u + Math.imul(C, X) | 0) + Math.imul(L, $) | 0, h = h + Math.imul(L, X) | 0, a = a + Math.imul(_, Y) | 0, 
          u = (u = u + Math.imul(_, tt) | 0) + Math.imul(I, Y) | 0, h = h + Math.imul(I, tt) | 0, a = a + Math.imul(E, rt) | 0, u = (u = u + Math.imul(E, nt) | 0) + Math.imul(M, rt) | 0, 
          h = h + Math.imul(M, nt) | 0, a = a + Math.imul(B, ot) | 0, u = (u = u + Math.imul(B, st) | 0) + Math.imul(x, ot) | 0, h = h + Math.imul(x, st) | 0, 
          a = a + Math.imul(w, ut) | 0, u = (u = u + Math.imul(w, ht) | 0) + Math.imul(A, ut) | 0, h = h + Math.imul(A, ht) | 0, a = a + Math.imul(p, ft) | 0, 
          u = (u = u + Math.imul(p, ct) | 0) + Math.imul(y, ft) | 0, h = h + Math.imul(y, ct) | 0;
          var Et = (s + (a = a + Math.imul(v, vt) | 0) | 0) + ((8191 & (u = (u = u + Math.imul(v, gt) | 0) + Math.imul(g, vt) | 0)) << 13) | 0;
          s = ((h = h + Math.imul(g, gt) | 0) + (u >>> 13) | 0) + (Et >>> 26) | 0, Et &= 67108863, a = Math.imul(T, W), u = (u = Math.imul(T, G)) + Math.imul(H, W) | 0, 
          h = Math.imul(H, G), a = a + Math.imul(j, $) | 0, u = (u = u + Math.imul(j, X) | 0) + Math.imul(U, $) | 0, h = h + Math.imul(U, X) | 0, 
          a = a + Math.imul(C, Y) | 0, u = (u = u + Math.imul(C, tt) | 0) + Math.imul(L, Y) | 0, h = h + Math.imul(L, tt) | 0, a = a + Math.imul(_, rt) | 0, 
          u = (u = u + Math.imul(_, nt) | 0) + Math.imul(I, rt) | 0, h = h + Math.imul(I, nt) | 0, a = a + Math.imul(E, ot) | 0, u = (u = u + Math.imul(E, st) | 0) + Math.imul(M, ot) | 0, 
          h = h + Math.imul(M, st) | 0, a = a + Math.imul(B, ut) | 0, u = (u = u + Math.imul(B, ht) | 0) + Math.imul(x, ut) | 0, h = h + Math.imul(x, ht) | 0, 
          a = a + Math.imul(w, ft) | 0, u = (u = u + Math.imul(w, ct) | 0) + Math.imul(A, ft) | 0, h = h + Math.imul(A, ct) | 0;
          var Mt = (s + (a = a + Math.imul(p, vt) | 0) | 0) + ((8191 & (u = (u = u + Math.imul(p, gt) | 0) + Math.imul(y, vt) | 0)) << 13) | 0;
          s = ((h = h + Math.imul(y, gt) | 0) + (u >>> 13) | 0) + (Mt >>> 26) | 0, Mt &= 67108863, a = Math.imul(T, $), u = (u = Math.imul(T, X)) + Math.imul(H, $) | 0, 
          h = Math.imul(H, X), a = a + Math.imul(j, Y) | 0, u = (u = u + Math.imul(j, tt) | 0) + Math.imul(U, Y) | 0, h = h + Math.imul(U, tt) | 0, 
          a = a + Math.imul(C, rt) | 0, u = (u = u + Math.imul(C, nt) | 0) + Math.imul(L, rt) | 0, h = h + Math.imul(L, nt) | 0, a = a + Math.imul(_, ot) | 0, 
          u = (u = u + Math.imul(_, st) | 0) + Math.imul(I, ot) | 0, h = h + Math.imul(I, st) | 0, a = a + Math.imul(E, ut) | 0, u = (u = u + Math.imul(E, ht) | 0) + Math.imul(M, ut) | 0, 
          h = h + Math.imul(M, ht) | 0, a = a + Math.imul(B, ft) | 0, u = (u = u + Math.imul(B, ct) | 0) + Math.imul(x, ft) | 0, h = h + Math.imul(x, ct) | 0;
          var Nt = (s + (a = a + Math.imul(w, vt) | 0) | 0) + ((8191 & (u = (u = u + Math.imul(w, gt) | 0) + Math.imul(A, vt) | 0)) << 13) | 0;
          s = ((h = h + Math.imul(A, gt) | 0) + (u >>> 13) | 0) + (Nt >>> 26) | 0, Nt &= 67108863, a = Math.imul(T, Y), u = (u = Math.imul(T, tt)) + Math.imul(H, Y) | 0, 
          h = Math.imul(H, tt), a = a + Math.imul(j, rt) | 0, u = (u = u + Math.imul(j, nt) | 0) + Math.imul(U, rt) | 0, h = h + Math.imul(U, nt) | 0, 
          a = a + Math.imul(C, ot) | 0, u = (u = u + Math.imul(C, st) | 0) + Math.imul(L, ot) | 0, h = h + Math.imul(L, st) | 0, a = a + Math.imul(_, ut) | 0, 
          u = (u = u + Math.imul(_, ht) | 0) + Math.imul(I, ut) | 0, h = h + Math.imul(I, ht) | 0, a = a + Math.imul(E, ft) | 0, u = (u = u + Math.imul(E, ct) | 0) + Math.imul(M, ft) | 0, 
          h = h + Math.imul(M, ct) | 0;
          var _t = (s + (a = a + Math.imul(B, vt) | 0) | 0) + ((8191 & (u = (u = u + Math.imul(B, gt) | 0) + Math.imul(x, vt) | 0)) << 13) | 0;
          s = ((h = h + Math.imul(x, gt) | 0) + (u >>> 13) | 0) + (_t >>> 26) | 0, _t &= 67108863, a = Math.imul(T, rt), u = (u = Math.imul(T, nt)) + Math.imul(H, rt) | 0, 
          h = Math.imul(H, nt), a = a + Math.imul(j, ot) | 0, u = (u = u + Math.imul(j, st) | 0) + Math.imul(U, ot) | 0, h = h + Math.imul(U, st) | 0, 
          a = a + Math.imul(C, ut) | 0, u = (u = u + Math.imul(C, ht) | 0) + Math.imul(L, ut) | 0, h = h + Math.imul(L, ht) | 0, a = a + Math.imul(_, ft) | 0, 
          u = (u = u + Math.imul(_, ct) | 0) + Math.imul(I, ft) | 0, h = h + Math.imul(I, ct) | 0;
          var It = (s + (a = a + Math.imul(E, vt) | 0) | 0) + ((8191 & (u = (u = u + Math.imul(E, gt) | 0) + Math.imul(M, vt) | 0)) << 13) | 0;
          s = ((h = h + Math.imul(M, gt) | 0) + (u >>> 13) | 0) + (It >>> 26) | 0, It &= 67108863, a = Math.imul(T, ot), u = (u = Math.imul(T, st)) + Math.imul(H, ot) | 0, 
          h = Math.imul(H, st), a = a + Math.imul(j, ut) | 0, u = (u = u + Math.imul(j, ht) | 0) + Math.imul(U, ut) | 0, h = h + Math.imul(U, ht) | 0, 
          a = a + Math.imul(C, ft) | 0, u = (u = u + Math.imul(C, ct) | 0) + Math.imul(L, ft) | 0, h = h + Math.imul(L, ct) | 0;
          var Ot = (s + (a = a + Math.imul(_, vt) | 0) | 0) + ((8191 & (u = (u = u + Math.imul(_, gt) | 0) + Math.imul(I, vt) | 0)) << 13) | 0;
          s = ((h = h + Math.imul(I, gt) | 0) + (u >>> 13) | 0) + (Ot >>> 26) | 0, Ot &= 67108863, a = Math.imul(T, ut), u = (u = Math.imul(T, ht)) + Math.imul(H, ut) | 0, 
          h = Math.imul(H, ht), a = a + Math.imul(j, ft) | 0, u = (u = u + Math.imul(j, ct) | 0) + Math.imul(U, ft) | 0, h = h + Math.imul(U, ct) | 0;
          var Ct = (s + (a = a + Math.imul(C, vt) | 0) | 0) + ((8191 & (u = (u = u + Math.imul(C, gt) | 0) + Math.imul(L, vt) | 0)) << 13) | 0;
          s = ((h = h + Math.imul(L, gt) | 0) + (u >>> 13) | 0) + (Ct >>> 26) | 0, Ct &= 67108863, a = Math.imul(T, ft), u = (u = Math.imul(T, ct)) + Math.imul(H, ft) | 0, 
          h = Math.imul(H, ct);
          var Lt = (s + (a = a + Math.imul(j, vt) | 0) | 0) + ((8191 & (u = (u = u + Math.imul(j, gt) | 0) + Math.imul(U, vt) | 0)) << 13) | 0;
          s = ((h = h + Math.imul(U, gt) | 0) + (u >>> 13) | 0) + (Lt >>> 26) | 0, Lt &= 67108863;
          var Pt = (s + (a = Math.imul(T, vt)) | 0) + ((8191 & (u = (u = Math.imul(T, gt)) + Math.imul(H, vt) | 0)) << 13) | 0;
          return s = ((h = Math.imul(H, gt)) + (u >>> 13) | 0) + (Pt >>> 26) | 0, Pt &= 67108863, o[0] = mt, o[1] = pt, o[2] = yt, 
          o[3] = bt, o[4] = wt, o[5] = At, o[6] = kt, o[7] = Bt, o[8] = xt, o[9] = St, o[10] = Et, o[11] = Mt, o[12] = Nt, o[13] = _t, 
          o[14] = It, o[15] = Ot, o[16] = Ct, o[17] = Lt, o[18] = Pt, 0 !== s && (o[19] = s, r.length++), r;
        };
        function g(t, e, r) {
          return (new m).mulp(t, e, r);
        }
        function m(t, e) {
          this.x = t, this.y = e;
        }
        Math.imul || (v = d), o.prototype.mulTo = function(t, e) {
          var r;
          var n = this.length + t.length;
          return r = 10 === this.length && 10 === t.length ? v(this, t, e) : n < 63 ? d(this, t, e) : n < 1024 ? function(t, e, r) {
            r.negative = e.negative ^ t.negative, r.length = t.length + e.length;
            var n = 0;
            var i = 0;
            for (var o = 0; o < r.length - 1; o++) {
              var s = i;
              i = 0;
              var a = 67108863 & n;
              var u = Math.min(o, e.length - 1);
              for (var h = Math.max(0, o - t.length + 1); h <= u; h++) {
                var l = o - h;
                var f = (0 | t.words[l]) * (0 | e.words[h]);
                var c = 67108863 & f;
                a = 67108863 & (c = c + a | 0), i += (s = (s = s + (f / 67108864 | 0) | 0) + (c >>> 26) | 0) >>> 26, s &= 67108863;
              }
              r.words[o] = a, n = s, s = i;
            }
            return 0 !== n ? r.words[o] = n : r.length--, r.strip();
          }(this, t, e) : g(this, t, e), r;
        }, m.prototype.makeRBT = function(t) {
          var e = new Array(t);
          var r = o.prototype._countBits(t) - 1;
          for (var n = 0; n < t; n++) e[n] = this.revBin(n, r, t);
          return e;
        }, m.prototype.revBin = function(t, e, r) {
          if (0 === t || t === r - 1) return t;
          var n = 0;
          for (var i = 0; i < e; i++) n |= (1 & t) << e - i - 1, t >>= 1;
          return n;
        }, m.prototype.permute = function(t, e, r, n, i, o) {
          for (var s = 0; s < o; s++) n[s] = e[t[s]], i[s] = r[t[s]];
        }, m.prototype.transform = function(t, e, r, n, i, o) {
          this.permute(o, t, e, r, n, i);
          for (var s = 1; s < i; s <<= 1) {
            var a = s << 1;
            var u = Math.cos(2 * Math.PI / a);
            var h = Math.sin(2 * Math.PI / a);
            for (var l = 0; l < i; l += a) {
              var f = u;
              var c = h;
              for (var d = 0; d < s; d++) {
                var v = r[l + d];
                var g = n[l + d];
                var m = r[l + d + s];
                var p = n[l + d + s];
                var y = f * m - c * p;
                p = f * p + c * m, m = y, r[l + d] = v + m, n[l + d] = g + p, r[l + d + s] = v - m, n[l + d + s] = g - p, d !== a && (y = u * f - h * c, 
                c = u * c + h * f, f = y);
              }
            }
          }
        }, m.prototype.guessLen13b = function(t, e) {
          var r = 1 | Math.max(e, t);
          var n = 1 & r;
          var i = 0;
          for (r = r / 2 | 0; r; r >>>= 1) i++;
          return 1 << i + 1 + n;
        }, m.prototype.conjugate = function(t, e, r) {
          if (!(r <= 1)) for (var n = 0; n < r / 2; n++) {
            var i = t[n];
            t[n] = t[r - n - 1], t[r - n - 1] = i, i = e[n], e[n] = -e[r - n - 1], e[r - n - 1] = -i;
          }
        }, m.prototype.normalize13b = function(t, e) {
          var r = 0;
          for (var n = 0; n < e / 2; n++) {
            var i = 8192 * Math.round(t[2 * n + 1] / e) + Math.round(t[2 * n] / e) + r;
            t[n] = 67108863 & i, r = i < 67108864 ? 0 : i / 67108864 | 0;
          }
          return t;
        }, m.prototype.convert13b = function(t, e, r, i) {
          var o = 0;
          for (var s = 0; s < e; s++) o += 0 | t[s], r[2 * s] = 8191 & o, o >>>= 13, r[2 * s + 1] = 8191 & o, o >>>= 13;
          for (s = 2 * e; s < i; ++s) r[s] = 0;
          n(0 === o), n(0 == (-8192 & o));
        }, m.prototype.stub = function(t) {
          var e = new Array(t);
          for (var r = 0; r < t; r++) e[r] = 0;
          return e;
        }, m.prototype.mulp = function(t, e, r) {
          var n = 2 * this.guessLen13b(t.length, e.length);
          var i = this.makeRBT(n);
          var o = this.stub(n);
          var s = new Array(n);
          var a = new Array(n);
          var u = new Array(n);
          var h = new Array(n);
          var l = new Array(n);
          var f = new Array(n);
          var c = r.words;
          c.length = n, this.convert13b(t.words, t.length, s, n), this.convert13b(e.words, e.length, h, n), this.transform(s, o, a, u, n, i), 
          this.transform(h, o, l, f, n, i);
          for (var d = 0; d < n; d++) {
            var v = a[d] * l[d] - u[d] * f[d];
            u[d] = a[d] * f[d] + u[d] * l[d], a[d] = v;
          }
          return this.conjugate(a, u, n), this.transform(a, u, c, o, n, i), this.conjugate(c, o, n), this.normalize13b(c, n), r.negative = t.negative ^ e.negative, 
          r.length = t.length + e.length, r.strip();
        }, o.prototype.mul = function(t) {
          var e = new o(null);
          return e.words = new Array(this.length + t.length), this.mulTo(t, e);
        }, o.prototype.mulf = function(t) {
          var e = new o(null);
          return e.words = new Array(this.length + t.length), g(this, t, e);
        }, o.prototype.imul = function(t) {
          return this.clone().mulTo(t, this);
        }, o.prototype.imuln = function(t) {
          n('number' == typeof t), n(t < 67108864);
          var e = 0;
          for (var r = 0; r < this.length; r++) {
            var i = (0 | this.words[r]) * t;
            var o = (67108863 & i) + (67108863 & e);
            e >>= 26, e += i / 67108864 | 0, e += o >>> 26, this.words[r] = 67108863 & o;
          }
          return 0 !== e && (this.words[r] = e, this.length++), this;
        }, o.prototype.muln = function(t) {
          return this.clone().imuln(t);
        }, o.prototype.sqr = function() {
          return this.mul(this);
        }, o.prototype.isqr = function() {
          return this.imul(this.clone());
        }, o.prototype.pow = function(t) {
          var e = function(t) {
            var e = new Array(t.bitLength());
            for (var r = 0; r < e.length; r++) {
              var n = r / 26 | 0;
              var i = r % 26;
              e[r] = (t.words[n] & 1 << i) >>> i;
            }
            return e;
          }(t);
          if (0 === e.length) return new o(1);
          var r = this;
          for (var n = 0; n < e.length && 0 === e[n]; n++, r = r.sqr()) ;
          if (++n < e.length) for (var i = r.sqr(); n < e.length; n++, i = i.sqr()) 0 !== e[n] && (r = r.mul(i));
          return r;
        }, o.prototype.iushln = function(t) {
          n('number' == typeof t && t >= 0);
          var e = t % 26;
          var r = (t - e) / 26;
          var i = 67108863 >>> 26 - e << 26 - e;
          var o;
          if (0 !== e) {
            var s = 0;
            for (o = 0; o < this.length; o++) {
              var a = this.words[o] & i;
              var u = (0 | this.words[o]) - a << e;
              this.words[o] = u | s, s = a >>> 26 - e;
            }
            s && (this.words[o] = s, this.length++);
          }
          if (0 !== r) {
            for (o = this.length - 1; o >= 0; o--) this.words[o + r] = this.words[o];
            for (o = 0; o < r; o++) this.words[o] = 0;
            this.length += r;
          }
          return this.strip();
        }, o.prototype.ishln = function(t) {
          return n(0 === this.negative), this.iushln(t);
        }, o.prototype.iushrn = function(t, e, r) {
          var i;
          n('number' == typeof t && t >= 0), i = e ? (e - e % 26) / 26 : 0;
          var o = t % 26;
          var s = Math.min((t - o) / 26, this.length);
          var a = 67108863 ^ 67108863 >>> o << o;
          var u = r;
          if (i -= s, i = Math.max(0, i), u) {
            for (var h = 0; h < s; h++) u.words[h] = this.words[h];
            u.length = s;
          }
          if (0 === s) ; else if (this.length > s) for (this.length -= s, h = 0; h < this.length; h++) this.words[h] = this.words[h + s]; else this.words[0] = 0, 
          this.length = 1;
          var l = 0;
          for (h = this.length - 1; h >= 0 && (0 !== l || h >= i); h--) {
            var f = 0 | this.words[h];
            this.words[h] = l << 26 - o | f >>> o, l = f & a;
          }
          return u && 0 !== l && (u.words[u.length++] = l), 0 === this.length && (this.words[0] = 0, this.length = 1), this.strip();
        }, o.prototype.ishrn = function(t, e, r) {
          return n(0 === this.negative), this.iushrn(t, e, r);
        }, o.prototype.shln = function(t) {
          return this.clone().ishln(t);
        }, o.prototype.ushln = function(t) {
          return this.clone().iushln(t);
        }, o.prototype.shrn = function(t) {
          return this.clone().ishrn(t);
        }, o.prototype.ushrn = function(t) {
          return this.clone().iushrn(t);
        }, o.prototype.testn = function(t) {
          n('number' == typeof t && t >= 0);
          var e = t % 26;
          var r = (t - e) / 26;
          var i = 1 << e;
          return !(this.length <= r) && !!(this.words[r] & i);
        }, o.prototype.imaskn = function(t) {
          n('number' == typeof t && t >= 0);
          var e = t % 26;
          var r = (t - e) / 26;
          if (n(0 === this.negative, 'imaskn works only with positive numbers'), this.length <= r) return this;
          if (0 !== e && r++, this.length = Math.min(r, this.length), 0 !== e) {
            var i = 67108863 ^ 67108863 >>> e << e;
            this.words[this.length - 1] &= i;
          }
          return this.strip();
        }, o.prototype.maskn = function(t) {
          return this.clone().imaskn(t);
        }, o.prototype.iaddn = function(t) {
          return n('number' == typeof t), n(t < 67108864), t < 0 ? this.isubn(-t) : 0 !== this.negative ? 1 === this.length && (0 | this.words[0]) < t ? (this.words[0] = t - (0 | this.words[0]), 
          this.negative = 0, this) : (this.negative = 0, this.isubn(t), this.negative = 1, this) : this._iaddn(t);
        }, o.prototype._iaddn = function(t) {
          this.words[0] += t;
          for (var e = 0; e < this.length && this.words[e] >= 67108864; e++) this.words[e] -= 67108864, e === this.length - 1 ? this.words[e + 1] = 1 : this.words[e + 1]++;
          return this.length = Math.max(this.length, e + 1), this;
        }, o.prototype.isubn = function(t) {
          if (n('number' == typeof t), n(t < 67108864), t < 0) return this.iaddn(-t);
          if (0 !== this.negative) return this.negative = 0, this.iaddn(t), this.negative = 1, this;
          if (this.words[0] -= t, 1 === this.length && this.words[0] < 0) this.words[0] = -this.words[0], this.negative = 1; else for (var e = 0; e < this.length && this.words[e] < 0; e++) this.words[e] += 67108864, 
          this.words[e + 1] -= 1;
          return this.strip();
        }, o.prototype.addn = function(t) {
          return this.clone().iaddn(t);
        }, o.prototype.subn = function(t) {
          return this.clone().isubn(t);
        }, o.prototype.iabs = function() {
          return this.negative = 0, this;
        }, o.prototype.abs = function() {
          return this.clone().iabs();
        }, o.prototype._ishlnsubmul = function(t, e, r) {
          var i = t.length + r;
          var o;
          var s;
          this._expand(i);
          var a = 0;
          for (o = 0; o < t.length; o++) {
            s = (0 | this.words[o + r]) + a;
            var u = (0 | t.words[o]) * e;
            a = ((s -= 67108863 & u) >> 26) - (u / 67108864 | 0), this.words[o + r] = 67108863 & s;
          }
          for (;o < this.length - r; o++) a = (s = (0 | this.words[o + r]) + a) >> 26, this.words[o + r] = 67108863 & s;
          if (0 === a) return this.strip();
          for (n(-1 === a), a = 0, o = 0; o < this.length; o++) a = (s = -(0 | this.words[o]) + a) >> 26, this.words[o] = 67108863 & s;
          return this.negative = 1, this.strip();
        }, o.prototype._wordDiv = function(t, e) {
          var r = (this.length, t.length);
          var n = this.clone();
          var i = t;
          var s = 0 | i.words[i.length - 1];
          0 !== (r = 26 - this._countBits(s)) && (i = i.ushln(r), n.iushln(r), s = 0 | i.words[i.length - 1]);
          var a = n.length - i.length;
          var u;
          if ('mod' !== e) {
            (u = new o(null)).length = a + 1, u.words = new Array(u.length);
            for (var h = 0; h < u.length; h++) u.words[h] = 0;
          }
          var l = n.clone()._ishlnsubmul(i, 1, a);
          0 === l.negative && (n = l, u && (u.words[a] = 1));
          for (var f = a - 1; f >= 0; f--) {
            var c = 67108864 * (0 | n.words[i.length + f]) + (0 | n.words[i.length + f - 1]);
            for (c = Math.min(c / s | 0, 67108863), n._ishlnsubmul(i, c, f); 0 !== n.negative; ) c--, n.negative = 0, n._ishlnsubmul(i, 1, f), 
            n.isZero() || (n.negative ^= 1);
            u && (u.words[f] = c);
          }
          return u && u.strip(), n.strip(), 'div' !== e && 0 !== r && n.iushrn(r), {
            div: u || null,
            mod: n
          };
        }, o.prototype.divmod = function(t, e, r) {
          return n(!t.isZero()), this.isZero() ? {
            div: new o(0),
            mod: new o(0)
          } : 0 !== this.negative && 0 === t.negative ? (a = this.neg().divmod(t, e), 'mod' !== e && (i = a.div.neg()), 'div' !== e && (s = a.mod.neg(), 
          r && 0 !== s.negative && s.iadd(t)), {
            div: i,
            mod: s
          }) : 0 === this.negative && 0 !== t.negative ? (a = this.divmod(t.neg(), e), 'mod' !== e && (i = a.div.neg()), {
            div: i,
            mod: a.mod
          }) : 0 != (this.negative & t.negative) ? (a = this.neg().divmod(t.neg(), e), 'div' !== e && (s = a.mod.neg(), r && 0 !== s.negative && s.isub(t)), 
          {
            div: a.div,
            mod: s
          }) : t.length > this.length || this.cmp(t) < 0 ? {
            div: new o(0),
            mod: this
          } : 1 === t.length ? 'div' === e ? {
            div: this.divn(t.words[0]),
            mod: null
          } : 'mod' === e ? {
            div: null,
            mod: new o(this.modn(t.words[0]))
          } : {
            div: this.divn(t.words[0]),
            mod: new o(this.modn(t.words[0]))
          } : this._wordDiv(t, e);
          var i, s, a;
        }, o.prototype.div = function(t) {
          return this.divmod(t, 'div', !1).div;
        }, o.prototype.mod = function(t) {
          return this.divmod(t, 'mod', !1).mod;
        }, o.prototype.umod = function(t) {
          return this.divmod(t, 'mod', !0).mod;
        }, o.prototype.divRound = function(t) {
          var e = this.divmod(t);
          if (e.mod.isZero()) return e.div;
          var r = 0 !== e.div.negative ? e.mod.isub(t) : e.mod;
          var n = t.ushrn(1);
          var i = t.andln(1);
          var o = r.cmp(n);
          return o < 0 || 1 === i && 0 === o ? e.div : 0 !== e.div.negative ? e.div.isubn(1) : e.div.iaddn(1);
        }, o.prototype.modn = function(t) {
          n(t <= 67108863);
          var e = (1 << 26) % t;
          var r = 0;
          for (var i = this.length - 1; i >= 0; i--) r = (e * r + (0 | this.words[i])) % t;
          return r;
        }, o.prototype.idivn = function(t) {
          n(t <= 67108863);
          var e = 0;
          for (var r = this.length - 1; r >= 0; r--) {
            var i = (0 | this.words[r]) + 67108864 * e;
            this.words[r] = i / t | 0, e = i % t;
          }
          return this.strip();
        }, o.prototype.divn = function(t) {
          return this.clone().idivn(t);
        }, o.prototype.egcd = function(t) {
          n(0 === t.negative), n(!t.isZero());
          var e = this;
          var r = t.clone();
          e = 0 !== e.negative ? e.umod(t) : e.clone();
          var i = new o(1);
          var s = new o(0);
          var a = new o(0);
          var u = new o(1);
          var h = 0;
          for (;e.isEven() && r.isEven(); ) e.iushrn(1), r.iushrn(1), ++h;
          var l = r.clone();
          var f = e.clone();
          for (;!e.isZero(); ) {
            for (var c = 0, d = 1; 0 == (e.words[0] & d) && c < 26; ++c, d <<= 1) ;
            if (c > 0) for (e.iushrn(c); c-- > 0; ) (i.isOdd() || s.isOdd()) && (i.iadd(l), s.isub(f)), i.iushrn(1), s.iushrn(1);
            for (var v = 0, g = 1; 0 == (r.words[0] & g) && v < 26; ++v, g <<= 1) ;
            if (v > 0) for (r.iushrn(v); v-- > 0; ) (a.isOdd() || u.isOdd()) && (a.iadd(l), u.isub(f)), a.iushrn(1), u.iushrn(1);
            e.cmp(r) >= 0 ? (e.isub(r), i.isub(a), s.isub(u)) : (r.isub(e), a.isub(i), u.isub(s));
          }
          return {
            a: a,
            b: u,
            gcd: r.iushln(h)
          };
        }, o.prototype._invmp = function(t) {
          n(0 === t.negative), n(!t.isZero());
          var e = this;
          var r = t.clone();
          e = 0 !== e.negative ? e.umod(t) : e.clone();
          var i = new o(1);
          var s = new o(0);
          var a = r.clone();
          for (;e.cmpn(1) > 0 && r.cmpn(1) > 0; ) {
            for (var u = 0, h = 1; 0 == (e.words[0] & h) && u < 26; ++u, h <<= 1) ;
            if (u > 0) for (e.iushrn(u); u-- > 0; ) i.isOdd() && i.iadd(a), i.iushrn(1);
            for (var l = 0, f = 1; 0 == (r.words[0] & f) && l < 26; ++l, f <<= 1) ;
            if (l > 0) for (r.iushrn(l); l-- > 0; ) s.isOdd() && s.iadd(a), s.iushrn(1);
            e.cmp(r) >= 0 ? (e.isub(r), i.isub(s)) : (r.isub(e), s.isub(i));
          }
          var c;
          return (c = 0 === e.cmpn(1) ? i : s).cmpn(0) < 0 && c.iadd(t), c;
        }, o.prototype.gcd = function(t) {
          if (this.isZero()) return t.abs();
          if (t.isZero()) return this.abs();
          var e = this.clone();
          var r = t.clone();
          e.negative = 0, r.negative = 0;
          for (var n = 0; e.isEven() && r.isEven(); n++) e.iushrn(1), r.iushrn(1);
          for (;;) {
            for (;e.isEven(); ) e.iushrn(1);
            for (;r.isEven(); ) r.iushrn(1);
            var i = e.cmp(r);
            if (i < 0) {
              var o = e;
              e = r, r = o;
            } else if (0 === i || 0 === r.cmpn(1)) break;
            e.isub(r);
          }
          return r.iushln(n);
        }, o.prototype.invm = function(t) {
          return this.egcd(t).a.umod(t);
        }, o.prototype.isEven = function() {
          return 0 == (1 & this.words[0]);
        }, o.prototype.isOdd = function() {
          return 1 == (1 & this.words[0]);
        }, o.prototype.andln = function(t) {
          return this.words[0] & t;
        }, o.prototype.bincn = function(t) {
          n('number' == typeof t);
          var e = t % 26;
          var r = (t - e) / 26;
          var i = 1 << e;
          if (this.length <= r) return this._expand(r + 1), this.words[r] |= i, this;
          var o = i;
          for (var s = r; 0 !== o && s < this.length; s++) {
            var a = 0 | this.words[s];
            o = (a += o) >>> 26, a &= 67108863, this.words[s] = a;
          }
          return 0 !== o && (this.words[s] = o, this.length++), this;
        }, o.prototype.isZero = function() {
          return 1 === this.length && 0 === this.words[0];
        }, o.prototype.cmpn = function(t) {
          var e = t < 0;
          if (0 !== this.negative && !e) return -1;
          if (0 === this.negative && e) return 1;
          var r;
          if (this.strip(), this.length > 1) r = 1; else {
            e && (t = -t), n(t <= 67108863, 'Number is too big');
            var i = 0 | this.words[0];
            r = i === t ? 0 : i < t ? -1 : 1;
          }
          return 0 !== this.negative ? 0 | -r : r;
        }, o.prototype.cmp = function(t) {
          if (0 !== this.negative && 0 === t.negative) return -1;
          if (0 === this.negative && 0 !== t.negative) return 1;
          var e = this.ucmp(t);
          return 0 !== this.negative ? 0 | -e : e;
        }, o.prototype.ucmp = function(t) {
          if (this.length > t.length) return 1;
          if (this.length < t.length) return -1;
          var e = 0;
          for (var r = this.length - 1; r >= 0; r--) {
            var n = 0 | this.words[r];
            var i = 0 | t.words[r];
            if (n !== i) {
              n < i ? e = -1 : n > i && (e = 1);
              break;
            }
          }
          return e;
        }, o.prototype.gtn = function(t) {
          return 1 === this.cmpn(t);
        }, o.prototype.gt = function(t) {
          return 1 === this.cmp(t);
        }, o.prototype.gten = function(t) {
          return this.cmpn(t) >= 0;
        }, o.prototype.gte = function(t) {
          return this.cmp(t) >= 0;
        }, o.prototype.ltn = function(t) {
          return -1 === this.cmpn(t);
        }, o.prototype.lt = function(t) {
          return -1 === this.cmp(t);
        }, o.prototype.lten = function(t) {
          return this.cmpn(t) <= 0;
        }, o.prototype.lte = function(t) {
          return this.cmp(t) <= 0;
        }, o.prototype.eqn = function(t) {
          return 0 === this.cmpn(t);
        }, o.prototype.eq = function(t) {
          return 0 === this.cmp(t);
        }, o.red = function(t) {
          return new B(t);
        }, o.prototype.toRed = function(t) {
          return n(!this.red, 'Already a number in reduction context'), n(0 === this.negative, 'red works only with positives'), t.convertTo(this)._forceRed(t);
        }, o.prototype.fromRed = function() {
          return n(this.red, 'fromRed works only with numbers in reduction context'), this.red.convertFrom(this);
        }, o.prototype._forceRed = function(t) {
          return this.red = t, this;
        }, o.prototype.forceRed = function(t) {
          return n(!this.red, 'Already a number in reduction context'), this._forceRed(t);
        }, o.prototype.redAdd = function(t) {
          return n(this.red, 'redAdd works only with red numbers'), this.red.add(this, t);
        }, o.prototype.redIAdd = function(t) {
          return n(this.red, 'redIAdd works only with red numbers'), this.red.iadd(this, t);
        }, o.prototype.redSub = function(t) {
          return n(this.red, 'redSub works only with red numbers'), this.red.sub(this, t);
        }, o.prototype.redISub = function(t) {
          return n(this.red, 'redISub works only with red numbers'), this.red.isub(this, t);
        }, o.prototype.redShl = function(t) {
          return n(this.red, 'redShl works only with red numbers'), this.red.shl(this, t);
        }, o.prototype.redMul = function(t) {
          return n(this.red, 'redMul works only with red numbers'), this.red._verify2(this, t), this.red.mul(this, t);
        }, o.prototype.redIMul = function(t) {
          return n(this.red, 'redMul works only with red numbers'), this.red._verify2(this, t), this.red.imul(this, t);
        }, o.prototype.redSqr = function() {
          return n(this.red, 'redSqr works only with red numbers'), this.red._verify1(this), this.red.sqr(this);
        }, o.prototype.redISqr = function() {
          return n(this.red, 'redISqr works only with red numbers'), this.red._verify1(this), this.red.isqr(this);
        }, o.prototype.redSqrt = function() {
          return n(this.red, 'redSqrt works only with red numbers'), this.red._verify1(this), this.red.sqrt(this);
        }, o.prototype.redInvm = function() {
          return n(this.red, 'redInvm works only with red numbers'), this.red._verify1(this), this.red.invm(this);
        }, o.prototype.redNeg = function() {
          return n(this.red, 'redNeg works only with red numbers'), this.red._verify1(this), this.red.neg(this);
        }, o.prototype.redPow = function(t) {
          return n(this.red && !t.red, 'redPow(normalNum)'), this.red._verify1(this), this.red.pow(this, t);
        };
        var p = {
          k256: null,
          p224: null,
          p192: null,
          p25519: null
        };
        function y(t, e) {
          this.name = t, this.p = new o(e, 16), this.n = this.p.bitLength(), this.k = new o(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
        }
        function b() {
          y.call(this, 'k256', 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f');
        }
        function w() {
          y.call(this, 'p224', 'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001');
        }
        function A() {
          y.call(this, 'p192', 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff');
        }
        function k() {
          y.call(this, '25519', '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed');
        }
        function B(t) {
          if ('string' == typeof t) {
            var e = o._prime(t);
            this.m = e.p, this.prime = e;
          } else n(t.gtn(1), 'modulus must be greater than 1'), this.m = t, this.prime = null;
        }
        function x(t) {
          B.call(this, t), this.shift = this.m.bitLength(), this.shift % 26 != 0 && (this.shift += 26 - this.shift % 26), this.r = new o(1).iushln(this.shift), 
          this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), 
          this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
        }
        y.prototype._tmp = function() {
          var t = new o(null);
          return t.words = new Array(Math.ceil(this.n / 13)), t;
        }, y.prototype.ireduce = function(t) {
          var e = t;
          var r;
          do {
            this.split(e, this.tmp), r = (e = (e = this.imulK(e)).iadd(this.tmp)).bitLength();
          } while (r > this.n);
          var n = r < this.n ? -1 : e.ucmp(this.p);
          return 0 === n ? (e.words[0] = 0, e.length = 1) : n > 0 ? e.isub(this.p) : void 0 !== e.strip ? e.strip() : e._strip(), 
          e;
        }, y.prototype.split = function(t, e) {
          t.iushrn(this.n, 0, e);
        }, y.prototype.imulK = function(t) {
          return t.imul(this.k);
        }, i(b, y), b.prototype.split = function(t, e) {
          var r = 4194303;
          var n = Math.min(t.length, 9);
          for (var i = 0; i < n; i++) e.words[i] = t.words[i];
          if (e.length = n, t.length <= 9) return t.words[0] = 0, void (t.length = 1);
          var o = t.words[9];
          for (e.words[e.length++] = o & r, i = 10; i < t.length; i++) {
            var s = 0 | t.words[i];
            t.words[i - 10] = (s & r) << 4 | o >>> 22, o = s;
          }
          o >>>= 22, t.words[i - 10] = o, 0 === o && t.length > 10 ? t.length -= 10 : t.length -= 9;
        }, b.prototype.imulK = function(t) {
          t.words[t.length] = 0, t.words[t.length + 1] = 0, t.length += 2;
          var e = 0;
          for (var r = 0; r < t.length; r++) {
            var n = 0 | t.words[r];
            e += 977 * n, t.words[r] = 67108863 & e, e = 64 * n + (e / 67108864 | 0);
          }
          return 0 === t.words[t.length - 1] && (t.length--, 0 === t.words[t.length - 1] && t.length--), t;
        }, i(w, y), i(A, y), i(k, y), k.prototype.imulK = function(t) {
          var e = 0;
          for (var r = 0; r < t.length; r++) {
            var n = 19 * (0 | t.words[r]) + e;
            var i = 67108863 & n;
            n >>>= 26, t.words[r] = i, e = n;
          }
          return 0 !== e && (t.words[t.length++] = e), t;
        }, o._prime = function(t) {
          if (p[t]) return p[t];
          var e;
          if ('k256' === t) e = new b; else if ('p224' === t) e = new w; else if ('p192' === t) e = new A; else {
            if ('p25519' !== t) throw new Error('Unknown prime ' + t);
            e = new k;
          }
          return p[t] = e, e;
        }, B.prototype._verify1 = function(t) {
          n(0 === t.negative, 'red works only with positives'), n(t.red, 'red works only with red numbers');
        }, B.prototype._verify2 = function(t, e) {
          n(0 == (t.negative | e.negative), 'red works only with positives'), n(t.red && t.red === e.red, 'red works only with red numbers');
        }, B.prototype.imod = function(t) {
          return this.prime ? this.prime.ireduce(t)._forceRed(this) : t.umod(this.m)._forceRed(this);
        }, B.prototype.neg = function(t) {
          return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this);
        }, B.prototype.add = function(t, e) {
          this._verify2(t, e);
          var r = t.add(e);
          return r.cmp(this.m) >= 0 && r.isub(this.m), r._forceRed(this);
        }, B.prototype.iadd = function(t, e) {
          this._verify2(t, e);
          var r = t.iadd(e);
          return r.cmp(this.m) >= 0 && r.isub(this.m), r;
        }, B.prototype.sub = function(t, e) {
          this._verify2(t, e);
          var r = t.sub(e);
          return r.cmpn(0) < 0 && r.iadd(this.m), r._forceRed(this);
        }, B.prototype.isub = function(t, e) {
          this._verify2(t, e);
          var r = t.isub(e);
          return r.cmpn(0) < 0 && r.iadd(this.m), r;
        }, B.prototype.shl = function(t, e) {
          return this._verify1(t), this.imod(t.ushln(e));
        }, B.prototype.imul = function(t, e) {
          return this._verify2(t, e), this.imod(t.imul(e));
        }, B.prototype.mul = function(t, e) {
          return this._verify2(t, e), this.imod(t.mul(e));
        }, B.prototype.isqr = function(t) {
          return this.imul(t, t.clone());
        }, B.prototype.sqr = function(t) {
          return this.mul(t, t);
        }, B.prototype.sqrt = function(t) {
          if (t.isZero()) return t.clone();
          var e = this.m.andln(3);
          if (n(e % 2 == 1), 3 === e) {
            var r = this.m.add(new o(1)).iushrn(2);
            return this.pow(t, r);
          }
          var i = this.m.subn(1);
          var s = 0;
          for (;!i.isZero() && 0 === i.andln(1); ) s++, i.iushrn(1);
          n(!i.isZero());
          var a = new o(1).toRed(this);
          var u = a.redNeg();
          var h = this.m.subn(1).iushrn(1);
          var l = this.m.bitLength();
          for (l = new o(2 * l * l).toRed(this); 0 !== this.pow(l, h).cmp(u); ) l.redIAdd(u);
          var f = this.pow(l, i);
          var c = this.pow(t, i.addn(1).iushrn(1));
          var d = this.pow(t, i);
          var v = s;
          for (;0 !== d.cmp(a); ) {
            var g = d;
            for (var m = 0; 0 !== g.cmp(a); m++) g = g.redSqr();
            n(m < v);
            var p = this.pow(f, new o(1).iushln(v - m - 1));
            c = c.redMul(p), f = p.redSqr(), d = d.redMul(f), v = m;
          }
          return c;
        }, B.prototype.invm = function(t) {
          var e = t._invmp(this.m);
          return 0 !== e.negative ? (e.negative = 0, this.imod(e).redNeg()) : this.imod(e);
        }, B.prototype.pow = function(t, e) {
          if (e.isZero()) return new o(1).toRed(this);
          if (0 === e.cmpn(1)) return t.clone();
          var r = new Array(16);
          r[0] = new o(1).toRed(this), r[1] = t;
          for (var n = 2; n < r.length; n++) r[n] = this.mul(r[n - 1], t);
          var i = r[0];
          var s = 0;
          var a = 0;
          var u = e.bitLength() % 26;
          for (0 === u && (u = 26), n = e.length - 1; n >= 0; n--) {
            var h = e.words[n];
            for (var l = u - 1; l >= 0; l--) {
              var f = h >> l & 1;
              i !== r[0] && (i = this.sqr(i)), 0 !== f || 0 !== s ? (s <<= 1, s |= f, (4 === ++a || 0 === n && 0 === l) && (i = this.mul(i, r[s]), 
              a = 0, s = 0)) : a = 0;
            }
            u = 26;
          }
          return i;
        }, B.prototype.convertTo = function(t) {
          var e = t.umod(this.m);
          return e === t ? e.clone() : e;
        }, B.prototype.convertFrom = function(t) {
          var e = t.clone();
          return e.red = null, e;
        }, o.mont = function(t) {
          return new x(t);
        }, i(x, B), x.prototype.convertTo = function(t) {
          return this.imod(t.ushln(this.shift));
        }, x.prototype.convertFrom = function(t) {
          var e = this.imod(t.mul(this.rinv));
          return e.red = null, e;
        }, x.prototype.imul = function(t, e) {
          if (t.isZero() || e.isZero()) return t.words[0] = 0, t.length = 1, t;
          var r = t.imul(e);
          var n = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
          var i = r.isub(n).iushrn(this.shift);
          var o = i;
          return i.cmp(this.m) >= 0 ? o = i.isub(this.m) : i.cmpn(0) < 0 && (o = i.iadd(this.m)), o._forceRed(this);
        }, x.prototype.mul = function(t, e) {
          if (t.isZero() || e.isZero()) return new o(0)._forceRed(this);
          var r = t.mul(e);
          var n = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
          var i = r.isub(n).iushrn(this.shift);
          var s = i;
          return i.cmp(this.m) >= 0 ? s = i.isub(this.m) : i.cmpn(0) < 0 && (s = i.iadd(this.m)), s._forceRed(this);
        }, x.prototype.invm = function(t) {
          return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this);
        };
      }(t = r.nmd(t), this);
    },
    "./node_modules/buffer/index.js": (t, e, r) => {
      "use strict";
      var n = r("./node_modules/base64-js/index.js");
      var i = r("./node_modules/ieee754/index.js");
      var o = 'function' == typeof Symbol && 'function' == typeof Symbol.for ? Symbol.for('nodejs.util.inspect.custom') : null;
      e.Buffer = u, e.SlowBuffer = function(t) {
        +t != t && (t = 0);
        return u.alloc(+t);
      }, e.INSPECT_MAX_BYTES = 50;
      var s = 2147483647;
      function a(t) {
        if (t > s) throw new RangeError('The value "' + t + '" is invalid for option "size"');
        var e = new Uint8Array(t);
        return Object.setPrototypeOf(e, u.prototype), e;
      }
      function u(t, e, r) {
        if ('number' == typeof t) {
          if ('string' == typeof e) throw new TypeError('The "string" argument must be of type string. Received type number');
          return f(t);
        }
        return h(t, e, r);
      }
      function h(t, e, r) {
        if ('string' == typeof t) return function(t, e) {
          'string' == typeof e && '' !== e || (e = 'utf8');
          if (!u.isEncoding(e)) throw new TypeError('Unknown encoding: ' + e);
          var r = 0 | g(t, e);
          var n = a(r);
          var i = n.write(t, e);
          i !== r && (n = n.slice(0, i));
          return n;
        }(t, e);
        if (ArrayBuffer.isView(t)) return function(t) {
          if (F(t, Uint8Array)) {
            var e = new Uint8Array(t);
            return d(e.buffer, e.byteOffset, e.byteLength);
          }
          return c(t);
        }(t);
        if (null == t) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t);
        if (F(t, ArrayBuffer) || t && F(t.buffer, ArrayBuffer)) return d(t, e, r);
        if ('undefined' != typeof SharedArrayBuffer && (F(t, SharedArrayBuffer) || t && F(t.buffer, SharedArrayBuffer))) return d(t, e, r);
        if ('number' == typeof t) throw new TypeError('The "value" argument must not be of type number. Received type number');
        var n = t.valueOf && t.valueOf();
        if (null != n && n !== t) return u.from(n, e, r);
        var i = function(t) {
          if (u.isBuffer(t)) {
            var e = 0 | v(t.length);
            var r = a(e);
            return 0 === r.length || t.copy(r, 0, 0, e), r;
          }
          if (void 0 !== t.length) return 'number' != typeof t.length || z(t.length) ? a(0) : c(t);
          if ('Buffer' === t.type && Array.isArray(t.data)) return c(t.data);
        }(t);
        if (i) return i;
        if ('undefined' != typeof Symbol && null != Symbol.toPrimitive && 'function' == typeof t[Symbol.toPrimitive]) return u.from(t[Symbol.toPrimitive]('string'), e, r);
        throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t);
      }
      function l(t) {
        if ('number' != typeof t) throw new TypeError('"size" argument must be of type number');
        if (t < 0) throw new RangeError('The value "' + t + '" is invalid for option "size"');
      }
      function f(t) {
        return l(t), a(t < 0 ? 0 : 0 | v(t));
      }
      function c(t) {
        var e = t.length < 0 ? 0 : 0 | v(t.length);
        var r = a(e);
        for (var n = 0; n < e; n += 1) r[n] = 255 & t[n];
        return r;
      }
      function d(t, e, r) {
        if (e < 0 || t.byteLength < e) throw new RangeError('"offset" is outside of buffer bounds');
        if (t.byteLength < e + (r || 0)) throw new RangeError('"length" is outside of buffer bounds');
        var n;
        return n = void 0 === e && void 0 === r ? new Uint8Array(t) : void 0 === r ? new Uint8Array(t, e) : new Uint8Array(t, e, r), 
        Object.setPrototypeOf(n, u.prototype), n;
      }
      function v(t) {
        if (t >= s) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s.toString(16) + ' bytes');
        return 0 | t;
      }
      function g(t, e) {
        if (u.isBuffer(t)) return t.length;
        if (ArrayBuffer.isView(t) || F(t, ArrayBuffer)) return t.byteLength;
        if ('string' != typeof t) throw new TypeError("The \"string\" argument must be one of type string, Buffer, or ArrayBuffer. Received type " + typeof t);
        var r = t.length;
        var n = arguments.length > 2 && !0 === arguments[2];
        if (!n && 0 === r) return 0;
        var i = !1;
        for (;;) switch (e) {
         case 'ascii':
         case 'latin1':
         case 'binary':
          return r;

         case 'utf8':
         case 'utf-8':
          return T(t).length;

         case 'ucs2':
         case 'ucs-2':
         case 'utf16le':
         case 'utf-16le':
          return 2 * r;

         case 'hex':
          return r >>> 1;

         case 'base64':
          return H(t).length;

         default:
          if (i) return n ? -1 : T(t).length;
          e = ('' + e).toLowerCase(), i = !0;
        }
      }
      function m(t, e, r) {
        var n = !1;
        if ((void 0 === e || e < 0) && (e = 0), e > this.length) return '';
        if ((void 0 === r || r > this.length) && (r = this.length), r <= 0) return '';
        if ((r >>>= 0) <= (e >>>= 0)) return '';
        for (t || (t = 'utf8'); ;) switch (t) {
         case 'hex':
          return I(this, e, r);

         case 'utf8':
         case 'utf-8':
          return E(this, e, r);

         case 'ascii':
          return N(this, e, r);

         case 'latin1':
         case 'binary':
          return _(this, e, r);

         case 'base64':
          return S(this, e, r);

         case 'ucs2':
         case 'ucs-2':
         case 'utf16le':
         case 'utf-16le':
          return O(this, e, r);

         default:
          if (n) throw new TypeError('Unknown encoding: ' + t);
          t = (t + '').toLowerCase(), n = !0;
        }
      }
      function p(t, e, r) {
        var n = t[e];
        t[e] = t[r], t[r] = n;
      }
      function y(t, e, r, n, i) {
        if (0 === t.length) return -1;
        if ('string' == typeof r ? (n = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), z(r = +r) && (r = i ? 0 : t.length - 1), 
        r < 0 && (r = t.length + r), r >= t.length) {
          if (i) return -1;
          r = t.length - 1;
        } else if (r < 0) {
          if (!i) return -1;
          r = 0;
        }
        if ('string' == typeof e && (e = u.from(e, n)), u.isBuffer(e)) return 0 === e.length ? -1 : b(t, e, r, n, i);
        if ('number' == typeof e) return e &= 255, 'function' == typeof Uint8Array.prototype.indexOf ? i ? Uint8Array.prototype.indexOf.call(t, e, r) : Uint8Array.prototype.lastIndexOf.call(t, e, r) : b(t, [ e ], r, n, i);
        throw new TypeError('val must be string, number or Buffer');
      }
      function b(t, e, r, n, i) {
        var o = 1;
        var s = t.length;
        var a = e.length;
        if (void 0 !== n && ('ucs2' === (n = String(n).toLowerCase()) || 'ucs-2' === n || 'utf16le' === n || 'utf-16le' === n)) {
          if (t.length < 2 || e.length < 2) return -1;
          o = 2, s /= 2, a /= 2, r /= 2;
        }
        function u(t, e) {
          return 1 === o ? t[e] : t.readUInt16BE(e * o);
        }
        var h;
        if (i) {
          var l = -1;
          for (h = r; h < s; h++) if (u(t, h) === u(e, -1 === l ? 0 : h - l)) {
            if (-1 === l && (l = h), h - l + 1 === a) return l * o;
          } else -1 !== l && (h -= h - l), l = -1;
        } else for (r + a > s && (r = s - a), h = r; h >= 0; h--) {
          var f = !0;
          for (var c = 0; c < a; c++) if (u(t, h + c) !== u(e, c)) {
            f = !1;
            break;
          }
          if (f) return h;
        }
        return -1;
      }
      function w(t, e, r, n) {
        r = Number(r) || 0;
        var i = t.length - r;
        n ? (n = Number(n)) > i && (n = i) : n = i;
        var o = e.length;
        n > o / 2 && (n = o / 2);
        for (var s = 0; s < n; ++s) {
          var a = parseInt(e.substr(2 * s, 2), 16);
          if (z(a)) return s;
          t[r + s] = a;
        }
        return s;
      }
      function A(t, e, r, n) {
        return D(T(e, t.length - r), t, r, n);
      }
      function k(t, e, r, n) {
        return D(function(t) {
          var e = [];
          for (var r = 0; r < t.length; ++r) e.push(255 & t.charCodeAt(r));
          return e;
        }(e), t, r, n);
      }
      function B(t, e, r, n) {
        return D(H(e), t, r, n);
      }
      function x(t, e, r, n) {
        return D(function(t, e) {
          var r, n, i;
          var o = [];
          for (var s = 0; s < t.length && !((e -= 2) < 0); ++s) n = (r = t.charCodeAt(s)) >> 8, i = r % 256, o.push(i), o.push(n);
          return o;
        }(e, t.length - r), t, r, n);
      }
      function S(t, e, r) {
        return 0 === e && r === t.length ? n.fromByteArray(t) : n.fromByteArray(t.slice(e, r));
      }
      function E(t, e, r) {
        r = Math.min(t.length, r);
        var n = [];
        var i = e;
        for (;i < r; ) {
          var o = t[i];
          var s = null;
          var a = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;
          var u, h, l, f;
          if (i + a <= r) switch (a) {
           case 1:
            o < 128 && (s = o);
            break;

           case 2:
            128 == (192 & (u = t[i + 1])) && (f = (31 & o) << 6 | 63 & u) > 127 && (s = f);
            break;

           case 3:
            u = t[i + 1], h = t[i + 2], 128 == (192 & u) && 128 == (192 & h) && (f = (15 & o) << 12 | (63 & u) << 6 | 63 & h) > 2047 && (f < 55296 || f > 57343) && (s = f);
            break;

           case 4:
            u = t[i + 1], h = t[i + 2], l = t[i + 3], 128 == (192 & u) && 128 == (192 & h) && 128 == (192 & l) && (f = (15 & o) << 18 | (63 & u) << 12 | (63 & h) << 6 | 63 & l) > 65535 && f < 1114112 && (s = f);
          }
          null === s ? (s = 65533, a = 1) : s > 65535 && (s -= 65536, n.push(s >>> 10 & 1023 | 55296), s = 56320 | 1023 & s), n.push(s), 
          i += a;
        }
        return function(t) {
          var e = t.length;
          if (e <= M) return String.fromCharCode.apply(String, t);
          var r = '';
          var n = 0;
          for (;n < e; ) r += String.fromCharCode.apply(String, t.slice(n, n += M));
          return r;
        }(n);
      }
      e.kMaxLength = s, u.TYPED_ARRAY_SUPPORT = function() {
        try {
          var t = new Uint8Array(1);
          var e = {
            foo: function() {
              return 42;
            }
          };
          return Object.setPrototypeOf(e, Uint8Array.prototype), Object.setPrototypeOf(t, e), 42 === t.foo();
        } catch (r) {
          return !1;
        }
      }(), u.TYPED_ARRAY_SUPPORT || 'undefined' == typeof console || 'function' != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), 
      Object.defineProperty(u.prototype, 'parent', {
        enumerable: !0,
        get: function() {
          if (u.isBuffer(this)) return this.buffer;
        }
      }), Object.defineProperty(u.prototype, 'offset', {
        enumerable: !0,
        get: function() {
          if (u.isBuffer(this)) return this.byteOffset;
        }
      }), u.poolSize = 8192, u.from = function(t, e, r) {
        return h(t, e, r);
      }, Object.setPrototypeOf(u.prototype, Uint8Array.prototype), Object.setPrototypeOf(u, Uint8Array), u.alloc = function(t, e, r) {
        return function(t, e, r) {
          return l(t), t <= 0 ? a(t) : void 0 !== e ? 'string' == typeof r ? a(t).fill(e, r) : a(t).fill(e) : a(t);
        }(t, e, r);
      }, u.allocUnsafe = function(t) {
        return f(t);
      }, u.allocUnsafeSlow = function(t) {
        return f(t);
      }, u.isBuffer = function(t) {
        return null != t && !0 === t._isBuffer && t !== u.prototype;
      }, u.compare = function(t, e) {
        if (F(t, Uint8Array) && (t = u.from(t, t.offset, t.byteLength)), F(e, Uint8Array) && (e = u.from(e, e.offset, e.byteLength)), 
        !u.isBuffer(t) || !u.isBuffer(e)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
        if (t === e) return 0;
        var r = t.length;
        var n = e.length;
        for (var i = 0, o = Math.min(r, n); i < o; ++i) if (t[i] !== e[i]) {
          r = t[i], n = e[i];
          break;
        }
        return r < n ? -1 : n < r ? 1 : 0;
      }, u.isEncoding = function(t) {
        switch (String(t).toLowerCase()) {
         case 'hex':
         case 'utf8':
         case 'utf-8':
         case 'ascii':
         case 'latin1':
         case 'binary':
         case 'base64':
         case 'ucs2':
         case 'ucs-2':
         case 'utf16le':
         case 'utf-16le':
          return !0;

         default:
          return !1;
        }
      }, u.concat = function(t, e) {
        if (!Array.isArray(t)) throw new TypeError('"list" argument must be an Array of Buffers');
        if (0 === t.length) return u.alloc(0);
        var r;
        if (void 0 === e) for (e = 0, r = 0; r < t.length; ++r) e += t[r].length;
        var n = u.allocUnsafe(e);
        var i = 0;
        for (r = 0; r < t.length; ++r) {
          var o = t[r];
          if (F(o, Uint8Array)) i + o.length > n.length ? u.from(o).copy(n, i) : Uint8Array.prototype.set.call(n, o, i); else {
            if (!u.isBuffer(o)) throw new TypeError('"list" argument must be an Array of Buffers');
            o.copy(n, i);
          }
          i += o.length;
        }
        return n;
      }, u.byteLength = g, u.prototype._isBuffer = !0, u.prototype.swap16 = function() {
        var t = this.length;
        if (t % 2 != 0) throw new RangeError('Buffer size must be a multiple of 16-bits');
        for (var e = 0; e < t; e += 2) p(this, e, e + 1);
        return this;
      }, u.prototype.swap32 = function() {
        var t = this.length;
        if (t % 4 != 0) throw new RangeError('Buffer size must be a multiple of 32-bits');
        for (var e = 0; e < t; e += 4) p(this, e, e + 3), p(this, e + 1, e + 2);
        return this;
      }, u.prototype.swap64 = function() {
        var t = this.length;
        if (t % 8 != 0) throw new RangeError('Buffer size must be a multiple of 64-bits');
        for (var e = 0; e < t; e += 8) p(this, e, e + 7), p(this, e + 1, e + 6), p(this, e + 2, e + 5), p(this, e + 3, e + 4);
        return this;
      }, u.prototype.toString = function() {
        var t = this.length;
        return 0 === t ? '' : 0 === arguments.length ? E(this, 0, t) : m.apply(this, arguments);
      }, u.prototype.toLocaleString = u.prototype.toString, u.prototype.equals = function(t) {
        if (!u.isBuffer(t)) throw new TypeError('Argument must be a Buffer');
        return this === t || 0 === u.compare(this, t);
      }, u.prototype.inspect = function() {
        var t = '';
        var r = e.INSPECT_MAX_BYTES;
        return t = this.toString('hex', 0, r).replace(/(.{2})/g, '$1 ').trim(), this.length > r && (t += ' ... '), '<Buffer ' + t + '>';
      }, o && (u.prototype[o] = u.prototype.inspect), u.prototype.compare = function(t, e, r, n, i) {
        if (F(t, Uint8Array) && (t = u.from(t, t.offset, t.byteLength)), !u.isBuffer(t)) throw new TypeError("The \"target\" argument must be one of type Buffer or Uint8Array. Received type " + typeof t);
        if (void 0 === e && (e = 0), void 0 === r && (r = t ? t.length : 0), void 0 === n && (n = 0), void 0 === i && (i = this.length), 
        e < 0 || r > t.length || n < 0 || i > this.length) throw new RangeError('out of range index');
        if (n >= i && e >= r) return 0;
        if (n >= i) return -1;
        if (e >= r) return 1;
        if (this === t) return 0;
        var o = (i >>>= 0) - (n >>>= 0);
        var s = (r >>>= 0) - (e >>>= 0);
        var a = Math.min(o, s);
        var h = this.slice(n, i);
        var l = t.slice(e, r);
        for (var f = 0; f < a; ++f) if (h[f] !== l[f]) {
          o = h[f], s = l[f];
          break;
        }
        return o < s ? -1 : s < o ? 1 : 0;
      }, u.prototype.includes = function(t, e, r) {
        return -1 !== this.indexOf(t, e, r);
      }, u.prototype.indexOf = function(t, e, r) {
        return y(this, t, e, r, !0);
      }, u.prototype.lastIndexOf = function(t, e, r) {
        return y(this, t, e, r, !1);
      }, u.prototype.write = function(t, e, r, n) {
        if (void 0 === e) n = 'utf8', r = this.length, e = 0; else if (void 0 === r && 'string' == typeof e) n = e, r = this.length, 
        e = 0; else {
          if (!isFinite(e)) throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
          e >>>= 0, isFinite(r) ? (r >>>= 0, void 0 === n && (n = 'utf8')) : (n = r, r = void 0);
        }
        var i = this.length - e;
        if ((void 0 === r || r > i) && (r = i), t.length > 0 && (r < 0 || e < 0) || e > this.length) throw new RangeError('Attempt to write outside buffer bounds');
        n || (n = 'utf8');
        var o = !1;
        for (;;) switch (n) {
         case 'hex':
          return w(this, t, e, r);

         case 'utf8':
         case 'utf-8':
          return A(this, t, e, r);

         case 'ascii':
         case 'latin1':
         case 'binary':
          return k(this, t, e, r);

         case 'base64':
          return B(this, t, e, r);

         case 'ucs2':
         case 'ucs-2':
         case 'utf16le':
         case 'utf-16le':
          return x(this, t, e, r);

         default:
          if (o) throw new TypeError('Unknown encoding: ' + n);
          n = ('' + n).toLowerCase(), o = !0;
        }
      }, u.prototype.toJSON = function() {
        return {
          type: 'Buffer',
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      var M = 4096;
      function N(t, e, r) {
        var n = '';
        r = Math.min(t.length, r);
        for (var i = e; i < r; ++i) n += String.fromCharCode(127 & t[i]);
        return n;
      }
      function _(t, e, r) {
        var n = '';
        r = Math.min(t.length, r);
        for (var i = e; i < r; ++i) n += String.fromCharCode(t[i]);
        return n;
      }
      function I(t, e, r) {
        var n = t.length;
        (!e || e < 0) && (e = 0), (!r || r < 0 || r > n) && (r = n);
        var i = '';
        for (var o = e; o < r; ++o) i += q[t[o]];
        return i;
      }
      function O(t, e, r) {
        var n = t.slice(e, r);
        var i = '';
        for (var o = 0; o < n.length - 1; o += 2) i += String.fromCharCode(n[o] + 256 * n[o + 1]);
        return i;
      }
      function C(t, e, r) {
        if (t % 1 != 0 || t < 0) throw new RangeError('offset is not uint');
        if (t + e > r) throw new RangeError('Trying to access beyond buffer length');
      }
      function L(t, e, r, n, i, o) {
        if (!u.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (e > i || e < o) throw new RangeError('"value" argument is out of bounds');
        if (r + n > t.length) throw new RangeError('Index out of range');
      }
      function P(t, e, r, n, i, o) {
        if (r + n > t.length) throw new RangeError('Index out of range');
        if (r < 0) throw new RangeError('Index out of range');
      }
      function j(t, e, r, n, o) {
        return e = +e, r >>>= 0, o || P(t, 0, r, 4), i.write(t, e, r, n, 23, 4), r + 4;
      }
      function U(t, e, r, n, o) {
        return e = +e, r >>>= 0, o || P(t, 0, r, 8), i.write(t, e, r, n, 52, 8), r + 8;
      }
      u.prototype.slice = function(t, e) {
        var r = this.length;
        (t = ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), (e = void 0 === e ? r : ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), 
        e < t && (e = t);
        var n = this.subarray(t, e);
        return Object.setPrototypeOf(n, u.prototype), n;
      }, u.prototype.readUintLE = u.prototype.readUIntLE = function(t, e, r) {
        t >>>= 0, e >>>= 0, r || C(t, e, this.length);
        var n = this[t];
        var i = 1;
        var o = 0;
        for (;++o < e && (i *= 256); ) n += this[t + o] * i;
        return n;
      }, u.prototype.readUintBE = u.prototype.readUIntBE = function(t, e, r) {
        t >>>= 0, e >>>= 0, r || C(t, e, this.length);
        var n = this[t + --e];
        var i = 1;
        for (;e > 0 && (i *= 256); ) n += this[t + --e] * i;
        return n;
      }, u.prototype.readUint8 = u.prototype.readUInt8 = function(t, e) {
        return t >>>= 0, e || C(t, 1, this.length), this[t];
      }, u.prototype.readUint16LE = u.prototype.readUInt16LE = function(t, e) {
        return t >>>= 0, e || C(t, 2, this.length), this[t] | this[t + 1] << 8;
      }, u.prototype.readUint16BE = u.prototype.readUInt16BE = function(t, e) {
        return t >>>= 0, e || C(t, 2, this.length), this[t] << 8 | this[t + 1];
      }, u.prototype.readUint32LE = u.prototype.readUInt32LE = function(t, e) {
        return t >>>= 0, e || C(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3];
      }, u.prototype.readUint32BE = u.prototype.readUInt32BE = function(t, e) {
        return t >>>= 0, e || C(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]);
      }, u.prototype.readIntLE = function(t, e, r) {
        t >>>= 0, e >>>= 0, r || C(t, e, this.length);
        var n = this[t];
        var i = 1;
        var o = 0;
        for (;++o < e && (i *= 256); ) n += this[t + o] * i;
        return n >= (i *= 128) && (n -= Math.pow(2, 8 * e)), n;
      }, u.prototype.readIntBE = function(t, e, r) {
        t >>>= 0, e >>>= 0, r || C(t, e, this.length);
        var n = e;
        var i = 1;
        var o = this[t + --n];
        for (;n > 0 && (i *= 256); ) o += this[t + --n] * i;
        return o >= (i *= 128) && (o -= Math.pow(2, 8 * e)), o;
      }, u.prototype.readInt8 = function(t, e) {
        return t >>>= 0, e || C(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t];
      }, u.prototype.readInt16LE = function(t, e) {
        t >>>= 0, e || C(t, 2, this.length);
        var r = this[t] | this[t + 1] << 8;
        return 32768 & r ? 4294901760 | r : r;
      }, u.prototype.readInt16BE = function(t, e) {
        t >>>= 0, e || C(t, 2, this.length);
        var r = this[t + 1] | this[t] << 8;
        return 32768 & r ? 4294901760 | r : r;
      }, u.prototype.readInt32LE = function(t, e) {
        return t >>>= 0, e || C(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24;
      }, u.prototype.readInt32BE = function(t, e) {
        return t >>>= 0, e || C(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3];
      }, u.prototype.readFloatLE = function(t, e) {
        return t >>>= 0, e || C(t, 4, this.length), i.read(this, t, !0, 23, 4);
      }, u.prototype.readFloatBE = function(t, e) {
        return t >>>= 0, e || C(t, 4, this.length), i.read(this, t, !1, 23, 4);
      }, u.prototype.readDoubleLE = function(t, e) {
        return t >>>= 0, e || C(t, 8, this.length), i.read(this, t, !0, 52, 8);
      }, u.prototype.readDoubleBE = function(t, e) {
        return t >>>= 0, e || C(t, 8, this.length), i.read(this, t, !1, 52, 8);
      }, u.prototype.writeUintLE = u.prototype.writeUIntLE = function(t, e, r, n) {
        (t = +t, e >>>= 0, r >>>= 0, n) || L(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
        var i = 1;
        var o = 0;
        for (this[e] = 255 & t; ++o < r && (i *= 256); ) this[e + o] = t / i & 255;
        return e + r;
      }, u.prototype.writeUintBE = u.prototype.writeUIntBE = function(t, e, r, n) {
        (t = +t, e >>>= 0, r >>>= 0, n) || L(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
        var i = r - 1;
        var o = 1;
        for (this[e + i] = 255 & t; --i >= 0 && (o *= 256); ) this[e + i] = t / o & 255;
        return e + r;
      }, u.prototype.writeUint8 = u.prototype.writeUInt8 = function(t, e, r) {
        return t = +t, e >>>= 0, r || L(this, t, e, 1, 255, 0), this[e] = 255 & t, e + 1;
      }, u.prototype.writeUint16LE = u.prototype.writeUInt16LE = function(t, e, r) {
        return t = +t, e >>>= 0, r || L(this, t, e, 2, 65535, 0), this[e] = 255 & t, this[e + 1] = t >>> 8, e + 2;
      }, u.prototype.writeUint16BE = u.prototype.writeUInt16BE = function(t, e, r) {
        return t = +t, e >>>= 0, r || L(this, t, e, 2, 65535, 0), this[e] = t >>> 8, this[e + 1] = 255 & t, e + 2;
      }, u.prototype.writeUint32LE = u.prototype.writeUInt32LE = function(t, e, r) {
        return t = +t, e >>>= 0, r || L(this, t, e, 4, 4294967295, 0), this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, 
        this[e] = 255 & t, e + 4;
      }, u.prototype.writeUint32BE = u.prototype.writeUInt32BE = function(t, e, r) {
        return t = +t, e >>>= 0, r || L(this, t, e, 4, 4294967295, 0), this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, 
        this[e + 3] = 255 & t, e + 4;
      }, u.prototype.writeIntLE = function(t, e, r, n) {
        if (t = +t, e >>>= 0, !n) {
          var i = Math.pow(2, 8 * r - 1);
          L(this, t, e, r, i - 1, -i);
        }
        var o = 0;
        var s = 1;
        var a = 0;
        for (this[e] = 255 & t; ++o < r && (s *= 256); ) t < 0 && 0 === a && 0 !== this[e + o - 1] && (a = 1), this[e + o] = (t / s >> 0) - a & 255;
        return e + r;
      }, u.prototype.writeIntBE = function(t, e, r, n) {
        if (t = +t, e >>>= 0, !n) {
          var i = Math.pow(2, 8 * r - 1);
          L(this, t, e, r, i - 1, -i);
        }
        var o = r - 1;
        var s = 1;
        var a = 0;
        for (this[e + o] = 255 & t; --o >= 0 && (s *= 256); ) t < 0 && 0 === a && 0 !== this[e + o + 1] && (a = 1), this[e + o] = (t / s >> 0) - a & 255;
        return e + r;
      }, u.prototype.writeInt8 = function(t, e, r) {
        return t = +t, e >>>= 0, r || L(this, t, e, 1, 127, -128), t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1;
      }, u.prototype.writeInt16LE = function(t, e, r) {
        return t = +t, e >>>= 0, r || L(this, t, e, 2, 32767, -32768), this[e] = 255 & t, this[e + 1] = t >>> 8, e + 2;
      }, u.prototype.writeInt16BE = function(t, e, r) {
        return t = +t, e >>>= 0, r || L(this, t, e, 2, 32767, -32768), this[e] = t >>> 8, this[e + 1] = 255 & t, e + 2;
      }, u.prototype.writeInt32LE = function(t, e, r) {
        return t = +t, e >>>= 0, r || L(this, t, e, 4, 2147483647, -2147483648), this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, 
        this[e + 3] = t >>> 24, e + 4;
      }, u.prototype.writeInt32BE = function(t, e, r) {
        return t = +t, e >>>= 0, r || L(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), this[e] = t >>> 24, 
        this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t, e + 4;
      }, u.prototype.writeFloatLE = function(t, e, r) {
        return j(this, t, e, !0, r);
      }, u.prototype.writeFloatBE = function(t, e, r) {
        return j(this, t, e, !1, r);
      }, u.prototype.writeDoubleLE = function(t, e, r) {
        return U(this, t, e, !0, r);
      }, u.prototype.writeDoubleBE = function(t, e, r) {
        return U(this, t, e, !1, r);
      }, u.prototype.copy = function(t, e, r, n) {
        if (!u.isBuffer(t)) throw new TypeError('argument should be a Buffer');
        if (r || (r = 0), n || 0 === n || (n = this.length), e >= t.length && (e = t.length), e || (e = 0), n > 0 && n < r && (n = r), 
        n === r) return 0;
        if (0 === t.length || 0 === this.length) return 0;
        if (e < 0) throw new RangeError('targetStart out of bounds');
        if (r < 0 || r >= this.length) throw new RangeError('Index out of range');
        if (n < 0) throw new RangeError('sourceEnd out of bounds');
        n > this.length && (n = this.length), t.length - e < n - r && (n = t.length - e + r);
        var i = n - r;
        return this === t && 'function' == typeof Uint8Array.prototype.copyWithin ? this.copyWithin(e, r, n) : Uint8Array.prototype.set.call(t, this.subarray(r, n), e), 
        i;
      }, u.prototype.fill = function(t, e, r, n) {
        if ('string' == typeof t) {
          if ('string' == typeof e ? (n = e, e = 0, r = this.length) : 'string' == typeof r && (n = r, r = this.length), void 0 !== n && 'string' != typeof n) throw new TypeError('encoding must be a string');
          if ('string' == typeof n && !u.isEncoding(n)) throw new TypeError('Unknown encoding: ' + n);
          if (1 === t.length) {
            var i = t.charCodeAt(0);
            ('utf8' === n && i < 128 || 'latin1' === n) && (t = i);
          }
        } else 'number' == typeof t ? t &= 255 : 'boolean' == typeof t && (t = Number(t));
        if (e < 0 || this.length < e || this.length < r) throw new RangeError('Out of range index');
        if (r <= e) return this;
        var o;
        if (e >>>= 0, r = void 0 === r ? this.length : r >>> 0, t || (t = 0), 'number' == typeof t) for (o = e; o < r; ++o) this[o] = t; else {
          var s = u.isBuffer(t) ? t : u.from(t, n);
          var a = s.length;
          if (0 === a) throw new TypeError('The value "' + t + '" is invalid for argument "value"');
          for (o = 0; o < r - e; ++o) this[o + e] = s[o % a];
        }
        return this;
      };
      var R = /[^+/0-9A-Za-z-_]/g;
      function T(t, e) {
        var r;
        e = e || Infinity;
        var n = t.length;
        var i = null;
        var o = [];
        for (var s = 0; s < n; ++s) {
          if ((r = t.charCodeAt(s)) > 55295 && r < 57344) {
            if (!i) {
              if (r > 56319) {
                (e -= 3) > -1 && o.push(239, 191, 189);
                continue;
              }
              if (s + 1 === n) {
                (e -= 3) > -1 && o.push(239, 191, 189);
                continue;
              }
              i = r;
              continue;
            }
            if (r < 56320) {
              (e -= 3) > -1 && o.push(239, 191, 189), i = r;
              continue;
            }
            r = 65536 + (i - 55296 << 10 | r - 56320);
          } else i && (e -= 3) > -1 && o.push(239, 191, 189);
          if (i = null, r < 128) {
            if ((e -= 1) < 0) break;
            o.push(r);
          } else if (r < 2048) {
            if ((e -= 2) < 0) break;
            o.push(r >> 6 | 192, 63 & r | 128);
          } else if (r < 65536) {
            if ((e -= 3) < 0) break;
            o.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128);
          } else {
            if (!(r < 1114112)) throw new Error('Invalid code point');
            if ((e -= 4) < 0) break;
            o.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128);
          }
        }
        return o;
      }
      function H(t) {
        return n.toByteArray(function(t) {
          if ((t = (t = t.split('=')[0]).trim().replace(R, '')).length < 2) return '';
          for (;t.length % 4 != 0; ) t += '=';
          return t;
        }(t));
      }
      function D(t, e, r, n) {
        for (var i = 0; i < n && !(i + r >= e.length || i >= t.length); ++i) e[i + r] = t[i];
        return i;
      }
      function F(t, e) {
        return t instanceof e || null != t && null != t.constructor && null != t.constructor.name && t.constructor.name === e.name;
      }
      function z(t) {
        return t != t;
      }
      var q = function() {
        var t = '0123456789abcdef';
        var e = new Array(256);
        for (var r = 0; r < 16; ++r) {
          var n = 16 * r;
          for (var i = 0; i < 16; ++i) e[n + i] = t[r] + t[i];
        }
        return e;
      }();
    },
    "./node_modules/hash.js/lib/hash.js": (t, e, r) => {
      var n = e;
      n.utils = r("./node_modules/hash.js/lib/hash/utils.js"), n.common = r("./node_modules/hash.js/lib/hash/common.js"), n.sha = r("./node_modules/hash.js/lib/hash/sha.js"), 
      n.ripemd = r("./node_modules/hash.js/lib/hash/ripemd.js"), n.hmac = r("./node_modules/hash.js/lib/hash/hmac.js"), n.sha1 = n.sha.sha1, 
      n.sha256 = n.sha.sha256, n.sha224 = n.sha.sha224, n.sha384 = n.sha.sha384, n.sha512 = n.sha.sha512, n.ripemd160 = n.ripemd.ripemd160;
    },
    "./node_modules/hash.js/lib/hash/common.js": (t, e, r) => {
      "use strict";
      var n = r("./node_modules/hash.js/lib/hash/utils.js");
      var i = r("./node_modules/minimalistic-assert/index.js");
      function o() {
        this.pending = null, this.pendingTotal = 0, this.blockSize = this.constructor.blockSize, this.outSize = this.constructor.outSize, 
        this.hmacStrength = this.constructor.hmacStrength, this.padLength = this.constructor.padLength / 8, this.endian = 'big', 
        this._delta8 = this.blockSize / 8, this._delta32 = this.blockSize / 32;
      }
      e.BlockHash = o, o.prototype.update = function(t, e) {
        if (t = n.toArray(t, e), this.pending ? this.pending = this.pending.concat(t) : this.pending = t, this.pendingTotal += t.length, 
        this.pending.length >= this._delta8) {
          var r = (t = this.pending).length % this._delta8;
          this.pending = t.slice(t.length - r, t.length), 0 === this.pending.length && (this.pending = null), t = n.join32(t, 0, t.length - r, this.endian);
          for (var i = 0; i < t.length; i += this._delta32) this._update(t, i, i + this._delta32);
        }
        return this;
      }, o.prototype.digest = function(t) {
        return this.update(this._pad()), i(null === this.pending), this._digest(t);
      }, o.prototype._pad = function() {
        var t = this.pendingTotal;
        var e = this._delta8;
        var r = e - (t + this.padLength) % e;
        var n = new Array(r + this.padLength);
        n[0] = 128;
        for (var i = 1; i < r; i++) n[i] = 0;
        if (t <<= 3, 'big' === this.endian) {
          for (var o = 8; o < this.padLength; o++) n[i++] = 0;
          n[i++] = 0, n[i++] = 0, n[i++] = 0, n[i++] = 0, n[i++] = t >>> 24 & 255, n[i++] = t >>> 16 & 255, n[i++] = t >>> 8 & 255, 
          n[i++] = 255 & t;
        } else for (n[i++] = 255 & t, n[i++] = t >>> 8 & 255, n[i++] = t >>> 16 & 255, n[i++] = t >>> 24 & 255, n[i++] = 0, n[i++] = 0, 
        n[i++] = 0, n[i++] = 0, o = 8; o < this.padLength; o++) n[i++] = 0;
        return n;
      };
    },
    "./node_modules/hash.js/lib/hash/hmac.js": (t, e, r) => {
      "use strict";
      var n = r("./node_modules/hash.js/lib/hash/utils.js");
      var i = r("./node_modules/minimalistic-assert/index.js");
      function o(t, e, r) {
        if (!(this instanceof o)) return new o(t, e, r);
        this.Hash = t, this.blockSize = t.blockSize / 8, this.outSize = t.outSize / 8, this.inner = null, this.outer = null, this._init(n.toArray(e, r));
      }
      t.exports = o, o.prototype._init = function(t) {
        t.length > this.blockSize && (t = (new this.Hash).update(t).digest()), i(t.length <= this.blockSize);
        for (var e = t.length; e < this.blockSize; e++) t.push(0);
        for (e = 0; e < t.length; e++) t[e] ^= 54;
        for (this.inner = (new this.Hash).update(t), e = 0; e < t.length; e++) t[e] ^= 106;
        this.outer = (new this.Hash).update(t);
      }, o.prototype.update = function(t, e) {
        return this.inner.update(t, e), this;
      }, o.prototype.digest = function(t) {
        return this.outer.update(this.inner.digest()), this.outer.digest(t);
      };
    },
    "./node_modules/hash.js/lib/hash/ripemd.js": (t, e, r) => {
      "use strict";
      var n = r("./node_modules/hash.js/lib/hash/utils.js");
      var i = r("./node_modules/hash.js/lib/hash/common.js");
      var o = n.rotl32;
      var s = n.sum32;
      var a = n.sum32_3;
      var u = n.sum32_4;
      var h = i.BlockHash;
      function l() {
        if (!(this instanceof l)) return new l;
        h.call(this), this.h = [ 1732584193, 4023233417, 2562383102, 271733878, 3285377520 ], this.endian = 'little';
      }
      function f(t, e, r, n) {
        return t <= 15 ? e ^ r ^ n : t <= 31 ? e & r | ~e & n : t <= 47 ? (e | ~r) ^ n : t <= 63 ? e & n | r & ~n : e ^ (r | ~n);
      }
      function c(t) {
        return t <= 15 ? 0 : t <= 31 ? 1518500249 : t <= 47 ? 1859775393 : t <= 63 ? 2400959708 : 2840853838;
      }
      function d(t) {
        return t <= 15 ? 1352829926 : t <= 31 ? 1548603684 : t <= 47 ? 1836072691 : t <= 63 ? 2053994217 : 0;
      }
      n.inherits(l, h), e.ripemd160 = l, l.blockSize = 512, l.outSize = 160, l.hmacStrength = 192, l.padLength = 64, l.prototype._update = function(t, e) {
        var r = this.h[0];
        var n = this.h[1];
        var i = this.h[2];
        var h = this.h[3];
        var l = this.h[4];
        var y = r;
        var b = n;
        var w = i;
        var A = h;
        var k = l;
        for (var B = 0; B < 80; B++) {
          var x = s(o(u(r, f(B, n, i, h), t[v[B] + e], c(B)), m[B]), l);
          r = l, l = h, h = o(i, 10), i = n, n = x, x = s(o(u(y, f(79 - B, b, w, A), t[g[B] + e], d(B)), p[B]), k), y = k, k = A, 
          A = o(w, 10), w = b, b = x;
        }
        x = a(this.h[1], i, A), this.h[1] = a(this.h[2], h, k), this.h[2] = a(this.h[3], l, y), this.h[3] = a(this.h[4], r, b), 
        this.h[4] = a(this.h[0], n, w), this.h[0] = x;
      }, l.prototype._digest = function(t) {
        return 'hex' === t ? n.toHex32(this.h, 'little') : n.split32(this.h, 'little');
      };
      var v = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13 ];
      var g = [ 5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11 ];
      var m = [ 11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6 ];
      var p = [ 8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11 ];
    },
    "./node_modules/hash.js/lib/hash/sha.js": (t, e, r) => {
      "use strict";
      e.sha1 = r("./node_modules/hash.js/lib/hash/sha/1.js"), e.sha224 = r("./node_modules/hash.js/lib/hash/sha/224.js"), e.sha256 = r("./node_modules/hash.js/lib/hash/sha/256.js"), 
      e.sha384 = r("./node_modules/hash.js/lib/hash/sha/384.js"), e.sha512 = r("./node_modules/hash.js/lib/hash/sha/512.js");
    },
    "./node_modules/hash.js/lib/hash/sha/1.js": (t, e, r) => {
      "use strict";
      var n = r("./node_modules/hash.js/lib/hash/utils.js");
      var i = r("./node_modules/hash.js/lib/hash/common.js");
      var o = r("./node_modules/hash.js/lib/hash/sha/common.js");
      var s = n.rotl32;
      var a = n.sum32;
      var u = n.sum32_5;
      var h = o.ft_1;
      var l = i.BlockHash;
      var f = [ 1518500249, 1859775393, 2400959708, 3395469782 ];
      function c() {
        if (!(this instanceof c)) return new c;
        l.call(this), this.h = [ 1732584193, 4023233417, 2562383102, 271733878, 3285377520 ], this.W = new Array(80);
      }
      n.inherits(c, l), t.exports = c, c.blockSize = 512, c.outSize = 160, c.hmacStrength = 80, c.padLength = 64, c.prototype._update = function(t, e) {
        var r = this.W;
        for (var n = 0; n < 16; n++) r[n] = t[e + n];
        for (;n < r.length; n++) r[n] = s(r[n - 3] ^ r[n - 8] ^ r[n - 14] ^ r[n - 16], 1);
        var i = this.h[0];
        var o = this.h[1];
        var l = this.h[2];
        var c = this.h[3];
        var d = this.h[4];
        for (n = 0; n < r.length; n++) {
          var v = ~~(n / 20);
          var g = u(s(i, 5), h(v, o, l, c), d, r[n], f[v]);
          d = c, c = l, l = s(o, 30), o = i, i = g;
        }
        this.h[0] = a(this.h[0], i), this.h[1] = a(this.h[1], o), this.h[2] = a(this.h[2], l), this.h[3] = a(this.h[3], c), this.h[4] = a(this.h[4], d);
      }, c.prototype._digest = function(t) {
        return 'hex' === t ? n.toHex32(this.h, 'big') : n.split32(this.h, 'big');
      };
    },
    "./node_modules/hash.js/lib/hash/sha/224.js": (t, e, r) => {
      "use strict";
      var n = r("./node_modules/hash.js/lib/hash/utils.js");
      var i = r("./node_modules/hash.js/lib/hash/sha/256.js");
      function o() {
        if (!(this instanceof o)) return new o;
        i.call(this), this.h = [ 3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428 ];
      }
      n.inherits(o, i), t.exports = o, o.blockSize = 512, o.outSize = 224, o.hmacStrength = 192, o.padLength = 64, o.prototype._digest = function(t) {
        return 'hex' === t ? n.toHex32(this.h.slice(0, 7), 'big') : n.split32(this.h.slice(0, 7), 'big');
      };
    },
    "./node_modules/hash.js/lib/hash/sha/256.js": (t, e, r) => {
      "use strict";
      var n = r("./node_modules/hash.js/lib/hash/utils.js");
      var i = r("./node_modules/hash.js/lib/hash/common.js");
      var o = r("./node_modules/hash.js/lib/hash/sha/common.js");
      var s = r("./node_modules/minimalistic-assert/index.js");
      var a = n.sum32;
      var u = n.sum32_4;
      var h = n.sum32_5;
      var l = o.ch32;
      var f = o.maj32;
      var c = o.s0_256;
      var d = o.s1_256;
      var v = o.g0_256;
      var g = o.g1_256;
      var m = i.BlockHash;
      var p = [ 1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298 ];
      function y() {
        if (!(this instanceof y)) return new y;
        m.call(this), this.h = [ 1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225 ], 
        this.k = p, this.W = new Array(64);
      }
      n.inherits(y, m), t.exports = y, y.blockSize = 512, y.outSize = 256, y.hmacStrength = 192, y.padLength = 64, y.prototype._update = function(t, e) {
        var r = this.W;
        for (var n = 0; n < 16; n++) r[n] = t[e + n];
        for (;n < r.length; n++) r[n] = u(g(r[n - 2]), r[n - 7], v(r[n - 15]), r[n - 16]);
        var i = this.h[0];
        var o = this.h[1];
        var m = this.h[2];
        var p = this.h[3];
        var y = this.h[4];
        var b = this.h[5];
        var w = this.h[6];
        var A = this.h[7];
        for (s(this.k.length === r.length), n = 0; n < r.length; n++) {
          var k = h(A, d(y), l(y, b, w), this.k[n], r[n]);
          var B = a(c(i), f(i, o, m));
          A = w, w = b, b = y, y = a(p, k), p = m, m = o, o = i, i = a(k, B);
        }
        this.h[0] = a(this.h[0], i), this.h[1] = a(this.h[1], o), this.h[2] = a(this.h[2], m), this.h[3] = a(this.h[3], p), this.h[4] = a(this.h[4], y), 
        this.h[5] = a(this.h[5], b), this.h[6] = a(this.h[6], w), this.h[7] = a(this.h[7], A);
      }, y.prototype._digest = function(t) {
        return 'hex' === t ? n.toHex32(this.h, 'big') : n.split32(this.h, 'big');
      };
    },
    "./node_modules/hash.js/lib/hash/sha/384.js": (t, e, r) => {
      "use strict";
      var n = r("./node_modules/hash.js/lib/hash/utils.js");
      var i = r("./node_modules/hash.js/lib/hash/sha/512.js");
      function o() {
        if (!(this instanceof o)) return new o;
        i.call(this), this.h = [ 3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999, 355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025, 3675008525, 1694076839, 1203062813, 3204075428 ];
      }
      n.inherits(o, i), t.exports = o, o.blockSize = 1024, o.outSize = 384, o.hmacStrength = 192, o.padLength = 128, o.prototype._digest = function(t) {
        return 'hex' === t ? n.toHex32(this.h.slice(0, 12), 'big') : n.split32(this.h.slice(0, 12), 'big');
      };
    },
    "./node_modules/hash.js/lib/hash/sha/512.js": (t, e, r) => {
      "use strict";
      var n = r("./node_modules/hash.js/lib/hash/utils.js");
      var i = r("./node_modules/hash.js/lib/hash/common.js");
      var o = r("./node_modules/minimalistic-assert/index.js");
      var s = n.rotr64_hi;
      var a = n.rotr64_lo;
      var u = n.shr64_hi;
      var h = n.shr64_lo;
      var l = n.sum64;
      var f = n.sum64_hi;
      var c = n.sum64_lo;
      var d = n.sum64_4_hi;
      var v = n.sum64_4_lo;
      var g = n.sum64_5_hi;
      var m = n.sum64_5_lo;
      var p = i.BlockHash;
      var y = [ 1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591 ];
      function b() {
        if (!(this instanceof b)) return new b;
        p.call(this), this.h = [ 1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723, 2773480762, 1595750129, 1359893119, 2917565137, 2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209 ], 
        this.k = y, this.W = new Array(160);
      }
      function w(t, e, r, n, i) {
        var o = t & r ^ ~t & i;
        return o < 0 && (o += 4294967296), o;
      }
      function A(t, e, r, n, i, o) {
        var s = e & n ^ ~e & o;
        return s < 0 && (s += 4294967296), s;
      }
      function k(t, e, r, n, i) {
        var o = t & r ^ t & i ^ r & i;
        return o < 0 && (o += 4294967296), o;
      }
      function B(t, e, r, n, i, o) {
        var s = e & n ^ e & o ^ n & o;
        return s < 0 && (s += 4294967296), s;
      }
      function x(t, e) {
        var r = s(t, e, 28) ^ s(e, t, 2) ^ s(e, t, 7);
        return r < 0 && (r += 4294967296), r;
      }
      function S(t, e) {
        var r = a(t, e, 28) ^ a(e, t, 2) ^ a(e, t, 7);
        return r < 0 && (r += 4294967296), r;
      }
      function E(t, e) {
        var r = s(t, e, 14) ^ s(t, e, 18) ^ s(e, t, 9);
        return r < 0 && (r += 4294967296), r;
      }
      function M(t, e) {
        var r = a(t, e, 14) ^ a(t, e, 18) ^ a(e, t, 9);
        return r < 0 && (r += 4294967296), r;
      }
      function N(t, e) {
        var r = s(t, e, 1) ^ s(t, e, 8) ^ u(t, e, 7);
        return r < 0 && (r += 4294967296), r;
      }
      function _(t, e) {
        var r = a(t, e, 1) ^ a(t, e, 8) ^ h(t, e, 7);
        return r < 0 && (r += 4294967296), r;
      }
      function I(t, e) {
        var r = s(t, e, 19) ^ s(e, t, 29) ^ u(t, e, 6);
        return r < 0 && (r += 4294967296), r;
      }
      function O(t, e) {
        var r = a(t, e, 19) ^ a(e, t, 29) ^ h(t, e, 6);
        return r < 0 && (r += 4294967296), r;
      }
      n.inherits(b, p), t.exports = b, b.blockSize = 1024, b.outSize = 512, b.hmacStrength = 192, b.padLength = 128, b.prototype._prepareBlock = function(t, e) {
        var r = this.W;
        for (var n = 0; n < 32; n++) r[n] = t[e + n];
        for (;n < r.length; n += 2) {
          var i = I(r[n - 4], r[n - 3]);
          var o = O(r[n - 4], r[n - 3]);
          var s = r[n - 14];
          var a = r[n - 13];
          var u = N(r[n - 30], r[n - 29]);
          var h = _(r[n - 30], r[n - 29]);
          var l = r[n - 32];
          var f = r[n - 31];
          r[n] = d(i, o, s, a, u, h, l, f), r[n + 1] = v(i, o, s, a, u, h, l, f);
        }
      }, b.prototype._update = function(t, e) {
        this._prepareBlock(t, e);
        var r = this.W;
        var n = this.h[0];
        var i = this.h[1];
        var s = this.h[2];
        var a = this.h[3];
        var u = this.h[4];
        var h = this.h[5];
        var d = this.h[6];
        var v = this.h[7];
        var p = this.h[8];
        var y = this.h[9];
        var b = this.h[10];
        var N = this.h[11];
        var _ = this.h[12];
        var I = this.h[13];
        var O = this.h[14];
        var C = this.h[15];
        o(this.k.length === r.length);
        for (var L = 0; L < r.length; L += 2) {
          var P = O;
          var j = C;
          var U = E(p, y);
          var R = M(p, y);
          var T = w(p, y, b, N, _);
          var H = A(p, y, b, N, _, I);
          var D = this.k[L];
          var F = this.k[L + 1];
          var z = r[L];
          var q = r[L + 1];
          var V = g(P, j, U, R, T, H, D, F, z, q);
          var K = m(P, j, U, R, T, H, D, F, z, q);
          P = x(n, i), j = S(n, i), U = k(n, i, s, a, u), R = B(n, i, s, a, u, h);
          var J = f(P, j, U, R);
          var W = c(P, j, U, R);
          O = _, C = I, _ = b, I = N, b = p, N = y, p = f(d, v, V, K), y = c(v, v, V, K), d = u, v = h, u = s, h = a, s = n, a = i, 
          n = f(V, K, J, W), i = c(V, K, J, W);
        }
        l(this.h, 0, n, i), l(this.h, 2, s, a), l(this.h, 4, u, h), l(this.h, 6, d, v), l(this.h, 8, p, y), l(this.h, 10, b, N), 
        l(this.h, 12, _, I), l(this.h, 14, O, C);
      }, b.prototype._digest = function(t) {
        return 'hex' === t ? n.toHex32(this.h, 'big') : n.split32(this.h, 'big');
      };
    },
    "./node_modules/hash.js/lib/hash/sha/common.js": (t, e, r) => {
      "use strict";
      var n = r("./node_modules/hash.js/lib/hash/utils.js").rotr32;
      function i(t, e, r) {
        return t & e ^ ~t & r;
      }
      function o(t, e, r) {
        return t & e ^ t & r ^ e & r;
      }
      function s(t, e, r) {
        return t ^ e ^ r;
      }
      e.ft_1 = function(t, e, r, n) {
        return 0 === t ? i(e, r, n) : 1 === t || 3 === t ? s(e, r, n) : 2 === t ? o(e, r, n) : void 0;
      }, e.ch32 = i, e.maj32 = o, e.p32 = s, e.s0_256 = function(t) {
        return n(t, 2) ^ n(t, 13) ^ n(t, 22);
      }, e.s1_256 = function(t) {
        return n(t, 6) ^ n(t, 11) ^ n(t, 25);
      }, e.g0_256 = function(t) {
        return n(t, 7) ^ n(t, 18) ^ t >>> 3;
      }, e.g1_256 = function(t) {
        return n(t, 17) ^ n(t, 19) ^ t >>> 10;
      };
    },
    "./node_modules/hash.js/lib/hash/utils.js": (t, e, r) => {
      "use strict";
      var n = r("./node_modules/minimalistic-assert/index.js");
      var i = r("./node_modules/inherits/inherits_browser.js");
      function o(t, e) {
        return 55296 == (64512 & t.charCodeAt(e)) && (!(e < 0 || e + 1 >= t.length) && 56320 == (64512 & t.charCodeAt(e + 1)));
      }
      function s(t) {
        return (t >>> 24 | t >>> 8 & 65280 | t << 8 & 16711680 | (255 & t) << 24) >>> 0;
      }
      function a(t) {
        return 1 === t.length ? '0' + t : t;
      }
      function u(t) {
        return 7 === t.length ? '0' + t : 6 === t.length ? '00' + t : 5 === t.length ? '000' + t : 4 === t.length ? '0000' + t : 3 === t.length ? '00000' + t : 2 === t.length ? '000000' + t : 1 === t.length ? '0000000' + t : t;
      }
      e.inherits = i, e.toArray = function(t, e) {
        if (Array.isArray(t)) return t.slice();
        if (!t) return [];
        var r = [];
        if ('string' == typeof t) if (e) {
          if ('hex' === e) for ((t = t.replace(/[^a-z0-9]+/gi, '')).length % 2 != 0 && (t = '0' + t), i = 0; i < t.length; i += 2) r.push(parseInt(t[i] + t[i + 1], 16));
        } else {
          var n = 0;
          for (var i = 0; i < t.length; i++) {
            var s = t.charCodeAt(i);
            s < 128 ? r[n++] = s : s < 2048 ? (r[n++] = s >> 6 | 192, r[n++] = 63 & s | 128) : o(t, i) ? (s = 65536 + ((1023 & s) << 10) + (1023 & t.charCodeAt(++i)), 
            r[n++] = s >> 18 | 240, r[n++] = s >> 12 & 63 | 128, r[n++] = s >> 6 & 63 | 128, r[n++] = 63 & s | 128) : (r[n++] = s >> 12 | 224, 
            r[n++] = s >> 6 & 63 | 128, r[n++] = 63 & s | 128);
          }
        } else for (i = 0; i < t.length; i++) r[i] = 0 | t[i];
        return r;
      }, e.toHex = function(t) {
        var e = '';
        for (var r = 0; r < t.length; r++) e += a(t[r].toString(16));
        return e;
      }, e.htonl = s, e.toHex32 = function(t, e) {
        var r = '';
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          'little' === e && (i = s(i)), r += u(i.toString(16));
        }
        return r;
      }, e.zero2 = a, e.zero8 = u, e.join32 = function(t, e, r, i) {
        var o = r - e;
        n(o % 4 == 0);
        var s = new Array(o / 4);
        for (var a = 0, u = e; a < s.length; a++, u += 4) {
          var h;
          h = 'big' === i ? t[u] << 24 | t[u + 1] << 16 | t[u + 2] << 8 | t[u + 3] : t[u + 3] << 24 | t[u + 2] << 16 | t[u + 1] << 8 | t[u], 
          s[a] = h >>> 0;
        }
        return s;
      }, e.split32 = function(t, e) {
        var r = new Array(4 * t.length);
        for (var n = 0, i = 0; n < t.length; n++, i += 4) {
          var o = t[n];
          'big' === e ? (r[i] = o >>> 24, r[i + 1] = o >>> 16 & 255, r[i + 2] = o >>> 8 & 255, r[i + 3] = 255 & o) : (r[i + 3] = o >>> 24, 
          r[i + 2] = o >>> 16 & 255, r[i + 1] = o >>> 8 & 255, r[i] = 255 & o);
        }
        return r;
      }, e.rotr32 = function(t, e) {
        return t >>> e | t << 32 - e;
      }, e.rotl32 = function(t, e) {
        return t << e | t >>> 32 - e;
      }, e.sum32 = function(t, e) {
        return t + e >>> 0;
      }, e.sum32_3 = function(t, e, r) {
        return t + e + r >>> 0;
      }, e.sum32_4 = function(t, e, r, n) {
        return t + e + r + n >>> 0;
      }, e.sum32_5 = function(t, e, r, n, i) {
        return t + e + r + n + i >>> 0;
      }, e.sum64 = function(t, e, r, n) {
        var i = t[e];
        var o = n + t[e + 1] >>> 0;
        var s = (o < n ? 1 : 0) + r + i;
        t[e] = s >>> 0, t[e + 1] = o;
      }, e.sum64_hi = function(t, e, r, n) {
        return (e + n >>> 0 < e ? 1 : 0) + t + r >>> 0;
      }, e.sum64_lo = function(t, e, r, n) {
        return e + n >>> 0;
      }, e.sum64_4_hi = function(t, e, r, n, i, o, s, a) {
        var u = 0;
        var h = e;
        return u += (h = h + n >>> 0) < e ? 1 : 0, u += (h = h + o >>> 0) < o ? 1 : 0, t + r + i + s + (u += (h = h + a >>> 0) < a ? 1 : 0) >>> 0;
      }, e.sum64_4_lo = function(t, e, r, n, i, o, s, a) {
        return e + n + o + a >>> 0;
      }, e.sum64_5_hi = function(t, e, r, n, i, o, s, a, u, h) {
        var l = 0;
        var f = e;
        return l += (f = f + n >>> 0) < e ? 1 : 0, l += (f = f + o >>> 0) < o ? 1 : 0, l += (f = f + a >>> 0) < a ? 1 : 0, t + r + i + s + u + (l += (f = f + h >>> 0) < h ? 1 : 0) >>> 0;
      }, e.sum64_5_lo = function(t, e, r, n, i, o, s, a, u, h) {
        return e + n + o + a + h >>> 0;
      }, e.rotr64_hi = function(t, e, r) {
        return (e << 32 - r | t >>> r) >>> 0;
      }, e.rotr64_lo = function(t, e, r) {
        return (t << 32 - r | e >>> r) >>> 0;
      }, e.shr64_hi = function(t, e, r) {
        return t >>> r;
      }, e.shr64_lo = function(t, e, r) {
        return (t << 32 - r | e >>> r) >>> 0;
      };
    },
    "./node_modules/ieee754/index.js": (t, e) => {
      e.read = function(t, e, r, n, i) {
        var o, s;
        var a = 8 * i - n - 1;
        var u = (1 << a) - 1;
        var h = u >> 1;
        var l = -7;
        var f = r ? i - 1 : 0;
        var c = r ? -1 : 1;
        var d = t[e + f];
        for (f += c, o = d & (1 << -l) - 1, d >>= -l, l += a; l > 0; o = 256 * o + t[e + f], f += c, l -= 8) ;
        for (s = o & (1 << -l) - 1, o >>= -l, l += n; l > 0; s = 256 * s + t[e + f], f += c, l -= 8) ;
        if (0 === o) o = 1 - h; else {
          if (o === u) return s ? NaN : Infinity * (d ? -1 : 1);
          s += Math.pow(2, n), o -= h;
        }
        return (d ? -1 : 1) * s * Math.pow(2, o - n);
      }, e.write = function(t, e, r, n, i, o) {
        var s, a, u;
        var h = 8 * o - i - 1;
        var l = (1 << h) - 1;
        var f = l >> 1;
        var c = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var d = n ? 0 : o - 1;
        var v = n ? 1 : -1;
        var g = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
        for (e = Math.abs(e), isNaN(e) || Infinity === e ? (a = isNaN(e) ? 1 : 0, s = l) : (s = Math.floor(Math.log(e) / Math.LN2), 
        e * (u = Math.pow(2, -s)) < 1 && (s--, u *= 2), (e += s + f >= 1 ? c / u : c * Math.pow(2, 1 - f)) * u >= 2 && (s++, u /= 2), 
        s + f >= l ? (a = 0, s = l) : s + f >= 1 ? (a = (e * u - 1) * Math.pow(2, i), s += f) : (a = e * Math.pow(2, f - 1) * Math.pow(2, i), 
        s = 0)); i >= 8; t[r + d] = 255 & a, d += v, a /= 256, i -= 8) ;
        for (s = s << i | a, h += i; h > 0; t[r + d] = 255 & s, d += v, s /= 256, h -= 8) ;
        t[r + d - v] |= 128 * g;
      };
    },
    "./node_modules/inherits/inherits_browser.js": t => {
      'function' == typeof Object.create ? t.exports = function(t, e) {
        e && (t.super_ = e, t.prototype = Object.create(e.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }));
      } : t.exports = function(t, e) {
        if (e) {
          t.super_ = e;
          var r = function() {};
          r.prototype = e.prototype, t.prototype = new r, t.prototype.constructor = t;
        }
      };
    },
    "./node_modules/js-sha3/src/sha3.js": (t, e, r) => {
      var n;
      !function() {
        'use strict';
        var i = 'input is invalid type';
        var o = 'object' == typeof window;
        var s = o ? window : {};
        s.JS_SHA3_NO_WINDOW && (o = !1);
        var a = !o && 'object' == typeof self;
        !s.JS_SHA3_NO_NODE_JS && 'object' == typeof process && process.versions && process.versions.node ? s = r.g : a && (s = self);
        var u = !s.JS_SHA3_NO_COMMON_JS && t.exports;
        var h = r.amdO;
        var l = !s.JS_SHA3_NO_ARRAY_BUFFER && 'undefined' != typeof ArrayBuffer;
        var f = '0123456789abcdef'.split('');
        var c = [ 4, 1024, 262144, 67108864 ];
        var d = [ 0, 8, 16, 24 ];
        var v = [ 1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648, 2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648 ];
        var g = [ 224, 256, 384, 512 ];
        var m = [ 128, 256 ];
        var p = [ 'hex', 'buffer', 'arrayBuffer', 'array', 'digest' ];
        var y = {
          128: 168,
          256: 136
        };
        !s.JS_SHA3_NO_NODE_JS && Array.isArray || (Array.isArray = function(t) {
          return '[object Array]' === Object.prototype.toString.call(t);
        }), !l || !s.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW && ArrayBuffer.isView || (ArrayBuffer.isView = function(t) {
          return 'object' == typeof t && t.buffer && t.buffer.constructor === ArrayBuffer;
        });
        var b = function(t, e, r) {
          return function(n) {
            return new P(t, e, t).update(n)[r]();
          };
        };
        var w = function(t, e, r) {
          return function(n, i) {
            return new P(t, e, i).update(n)[r]();
          };
        };
        var A = function(t, e, r) {
          return function(e, n, i, o) {
            return E['cshake' + t].update(e, n, i, o)[r]();
          };
        };
        var k = function(t, e, r) {
          return function(e, n, i, o) {
            return E['kmac' + t].update(e, n, i, o)[r]();
          };
        };
        var B = function(t, e, r, n) {
          for (var i = 0; i < p.length; ++i) {
            var o = p[i];
            t[o] = e(r, n, o);
          }
          return t;
        };
        var x = function(t, e) {
          var r = b(t, e, 'hex');
          return r.create = function() {
            return new P(t, e, t);
          }, r.update = function(t) {
            return r.create().update(t);
          }, B(r, b, t, e);
        };
        var S = [ {
          name: 'keccak',
          padding: [ 1, 256, 65536, 16777216 ],
          bits: g,
          createMethod: x
        }, {
          name: 'sha3',
          padding: [ 6, 1536, 393216, 100663296 ],
          bits: g,
          createMethod: x
        }, {
          name: 'shake',
          padding: [ 31, 7936, 2031616, 520093696 ],
          bits: m,
          createMethod: function(t, e) {
            var r = w(t, e, 'hex');
            return r.create = function(r) {
              return new P(t, e, r);
            }, r.update = function(t, e) {
              return r.create(e).update(t);
            }, B(r, w, t, e);
          }
        }, {
          name: 'cshake',
          padding: c,
          bits: m,
          createMethod: function(t, e) {
            var r = y[t];
            var n = A(t, 0, 'hex');
            return n.create = function(n, i, o) {
              return i || o ? new P(t, e, n).bytepad([ i, o ], r) : E['shake' + t].create(n);
            }, n.update = function(t, e, r, i) {
              return n.create(e, r, i).update(t);
            }, B(n, A, t, e);
          }
        }, {
          name: 'kmac',
          padding: c,
          bits: m,
          createMethod: function(t, e) {
            var r = y[t];
            var n = k(t, 0, 'hex');
            return n.create = function(n, i, o) {
              return new j(t, e, i).bytepad([ 'KMAC', o ], r).bytepad([ n ], r);
            }, n.update = function(t, e, r, i) {
              return n.create(t, r, i).update(e);
            }, B(n, k, t, e);
          }
        } ];
        var E = {}, M = [];
        for (var N = 0; N < S.length; ++N) {
          var _ = S[N];
          var I = _.bits;
          for (var O = 0; O < I.length; ++O) {
            var C = _.name + '_' + I[O];
            if (M.push(C), E[C] = _.createMethod(I[O], _.padding), 'sha3' !== _.name) {
              var L = _.name + I[O];
              M.push(L), E[L] = E[C];
            }
          }
        }
        function P(t, e, r) {
          this.blocks = [], this.s = [], this.padding = e, this.outputBits = r, this.reset = !0, this.finalized = !1, this.block = 0, 
          this.start = 0, this.blockCount = 1600 - (t << 1) >> 5, this.byteCount = this.blockCount << 2, this.outputBlocks = r >> 5, 
          this.extraBytes = (31 & r) >> 3;
          for (var n = 0; n < 50; ++n) this.s[n] = 0;
        }
        function j(t, e, r) {
          P.call(this, t, e, r);
        }
        P.prototype.update = function(t) {
          if (this.finalized) throw new Error("finalize already called");
          var e, r = typeof t;
          if ('string' !== r) {
            if ('object' !== r) throw new Error(i);
            if (null === t) throw new Error(i);
            if (l && t.constructor === ArrayBuffer) t = new Uint8Array(t); else if (!(Array.isArray(t) || l && ArrayBuffer.isView(t))) throw new Error(i);
            e = !0;
          }
          var n, o, s = this.blocks, a = this.byteCount, u = t.length, h = this.blockCount, f = 0, c = this.s;
          for (;f < u; ) {
            if (this.reset) for (this.reset = !1, s[0] = this.block, n = 1; n < h + 1; ++n) s[n] = 0;
            if (e) for (n = this.start; f < u && n < a; ++f) s[n >> 2] |= t[f] << d[3 & n++]; else for (n = this.start; f < u && n < a; ++f) (o = t.charCodeAt(f)) < 128 ? s[n >> 2] |= o << d[3 & n++] : o < 2048 ? (s[n >> 2] |= (192 | o >> 6) << d[3 & n++], 
            s[n >> 2] |= (128 | 63 & o) << d[3 & n++]) : o < 55296 || o >= 57344 ? (s[n >> 2] |= (224 | o >> 12) << d[3 & n++], s[n >> 2] |= (128 | o >> 6 & 63) << d[3 & n++], 
            s[n >> 2] |= (128 | 63 & o) << d[3 & n++]) : (o = 65536 + ((1023 & o) << 10 | 1023 & t.charCodeAt(++f)), s[n >> 2] |= (240 | o >> 18) << d[3 & n++], 
            s[n >> 2] |= (128 | o >> 12 & 63) << d[3 & n++], s[n >> 2] |= (128 | o >> 6 & 63) << d[3 & n++], s[n >> 2] |= (128 | 63 & o) << d[3 & n++]);
            if (this.lastByteIndex = n, n >= a) {
              for (this.start = n - a, this.block = s[h], n = 0; n < h; ++n) c[n] ^= s[n];
              U(c), this.reset = !0;
            } else this.start = n;
          }
          return this;
        }, P.prototype.encode = function(t, e) {
          var r = 255 & t, n = 1;
          var i = [ r ];
          for (r = 255 & (t >>= 8); r > 0; ) i.unshift(r), r = 255 & (t >>= 8), ++n;
          return e ? i.push(n) : i.unshift(n), this.update(i), i.length;
        }, P.prototype.encodeString = function(t) {
          var e, r = typeof t;
          if ('string' !== r) {
            if ('object' !== r) throw new Error(i);
            if (null === t) throw new Error(i);
            if (l && t.constructor === ArrayBuffer) t = new Uint8Array(t); else if (!(Array.isArray(t) || l && ArrayBuffer.isView(t))) throw new Error(i);
            e = !0;
          }
          var n = 0, o = t.length;
          if (e) n = o; else for (var s = 0; s < t.length; ++s) {
            var a = t.charCodeAt(s);
            a < 128 ? n += 1 : a < 2048 ? n += 2 : a < 55296 || a >= 57344 ? n += 3 : (a = 65536 + ((1023 & a) << 10 | 1023 & t.charCodeAt(++s)), 
            n += 4);
          }
          return n += this.encode(8 * n), this.update(t), n;
        }, P.prototype.bytepad = function(t, e) {
          var r = this.encode(e);
          for (var n = 0; n < t.length; ++n) r += this.encodeString(t[n]);
          var i = e - r % e;
          var o = [];
          return o.length = i, this.update(o), this;
        }, P.prototype.finalize = function() {
          if (!this.finalized) {
            this.finalized = !0;
            var t = this.blocks, e = this.lastByteIndex, r = this.blockCount, n = this.s;
            if (t[e >> 2] |= this.padding[3 & e], this.lastByteIndex === this.byteCount) for (t[0] = t[r], e = 1; e < r + 1; ++e) t[e] = 0;
            for (t[r - 1] |= 2147483648, e = 0; e < r; ++e) n[e] ^= t[e];
            U(n);
          }
        }, P.prototype.toString = P.prototype.hex = function() {
          this.finalize();
          var t = this.blockCount, e = this.s, r = this.outputBlocks, n = this.extraBytes, i = 0, o = 0;
          var s, a = '';
          for (;o < r; ) {
            for (i = 0; i < t && o < r; ++i, ++o) s = e[i], a += f[s >> 4 & 15] + f[15 & s] + f[s >> 12 & 15] + f[s >> 8 & 15] + f[s >> 20 & 15] + f[s >> 16 & 15] + f[s >> 28 & 15] + f[s >> 24 & 15];
            o % t == 0 && (U(e), i = 0);
          }
          return n && (s = e[i], a += f[s >> 4 & 15] + f[15 & s], n > 1 && (a += f[s >> 12 & 15] + f[s >> 8 & 15]), n > 2 && (a += f[s >> 20 & 15] + f[s >> 16 & 15])), 
          a;
        }, P.prototype.arrayBuffer = function() {
          this.finalize();
          var t = this.blockCount, e = this.s, r = this.outputBlocks, n = this.extraBytes, i = 0, o = 0;
          var s = this.outputBits >> 3;
          var a;
          a = n ? new ArrayBuffer(r + 1 << 2) : new ArrayBuffer(s);
          var u = new Uint32Array(a);
          for (;o < r; ) {
            for (i = 0; i < t && o < r; ++i, ++o) u[o] = e[i];
            o % t == 0 && U(e);
          }
          return n && (u[i] = e[i], a = a.slice(0, s)), a;
        }, P.prototype.buffer = P.prototype.arrayBuffer, P.prototype.digest = P.prototype.array = function() {
          this.finalize();
          var t = this.blockCount, e = this.s, r = this.outputBlocks, n = this.extraBytes, i = 0, o = 0;
          var s, a, u = [];
          for (;o < r; ) {
            for (i = 0; i < t && o < r; ++i, ++o) s = o << 2, a = e[i], u[s] = 255 & a, u[s + 1] = a >> 8 & 255, u[s + 2] = a >> 16 & 255, 
            u[s + 3] = a >> 24 & 255;
            o % t == 0 && U(e);
          }
          return n && (s = o << 2, a = e[i], u[s] = 255 & a, n > 1 && (u[s + 1] = a >> 8 & 255), n > 2 && (u[s + 2] = a >> 16 & 255)), 
          u;
        }, j.prototype = new P, j.prototype.finalize = function() {
          return this.encode(this.outputBits, !0), P.prototype.finalize.call(this);
        };
        var U = function(t) {
          var e, r, n, i, o, s, a, u, h, l, f, c, d, g, m, p, y, b, w, A, k, B, x, S, E, M, N, _, I, O, C, L, P, j, U, R, T, H, D, F, z, q, V, K, J, W, G, Z, $, X, Q, Y, tt, et, rt, nt, it, ot, st, at, ut, ht, lt;
          for (n = 0; n < 48; n += 2) i = t[0] ^ t[10] ^ t[20] ^ t[30] ^ t[40], o = t[1] ^ t[11] ^ t[21] ^ t[31] ^ t[41], s = t[2] ^ t[12] ^ t[22] ^ t[32] ^ t[42], 
          a = t[3] ^ t[13] ^ t[23] ^ t[33] ^ t[43], u = t[4] ^ t[14] ^ t[24] ^ t[34] ^ t[44], h = t[5] ^ t[15] ^ t[25] ^ t[35] ^ t[45], 
          l = t[6] ^ t[16] ^ t[26] ^ t[36] ^ t[46], f = t[7] ^ t[17] ^ t[27] ^ t[37] ^ t[47], e = (c = t[8] ^ t[18] ^ t[28] ^ t[38] ^ t[48]) ^ (s << 1 | a >>> 31), 
          r = (d = t[9] ^ t[19] ^ t[29] ^ t[39] ^ t[49]) ^ (a << 1 | s >>> 31), t[0] ^= e, t[1] ^= r, t[10] ^= e, t[11] ^= r, t[20] ^= e, 
          t[21] ^= r, t[30] ^= e, t[31] ^= r, t[40] ^= e, t[41] ^= r, e = i ^ (u << 1 | h >>> 31), r = o ^ (h << 1 | u >>> 31), t[2] ^= e, 
          t[3] ^= r, t[12] ^= e, t[13] ^= r, t[22] ^= e, t[23] ^= r, t[32] ^= e, t[33] ^= r, t[42] ^= e, t[43] ^= r, e = s ^ (l << 1 | f >>> 31), 
          r = a ^ (f << 1 | l >>> 31), t[4] ^= e, t[5] ^= r, t[14] ^= e, t[15] ^= r, t[24] ^= e, t[25] ^= r, t[34] ^= e, t[35] ^= r, 
          t[44] ^= e, t[45] ^= r, e = u ^ (c << 1 | d >>> 31), r = h ^ (d << 1 | c >>> 31), t[6] ^= e, t[7] ^= r, t[16] ^= e, t[17] ^= r, 
          t[26] ^= e, t[27] ^= r, t[36] ^= e, t[37] ^= r, t[46] ^= e, t[47] ^= r, e = l ^ (i << 1 | o >>> 31), r = f ^ (o << 1 | i >>> 31), 
          t[8] ^= e, t[9] ^= r, t[18] ^= e, t[19] ^= r, t[28] ^= e, t[29] ^= r, t[38] ^= e, t[39] ^= r, t[48] ^= e, t[49] ^= r, g = t[0], 
          m = t[1], W = t[11] << 4 | t[10] >>> 28, G = t[10] << 4 | t[11] >>> 28, _ = t[20] << 3 | t[21] >>> 29, I = t[21] << 3 | t[20] >>> 29, 
          at = t[31] << 9 | t[30] >>> 23, ut = t[30] << 9 | t[31] >>> 23, q = t[40] << 18 | t[41] >>> 14, V = t[41] << 18 | t[40] >>> 14, 
          j = t[2] << 1 | t[3] >>> 31, U = t[3] << 1 | t[2] >>> 31, p = t[13] << 12 | t[12] >>> 20, y = t[12] << 12 | t[13] >>> 20, 
          Z = t[22] << 10 | t[23] >>> 22, $ = t[23] << 10 | t[22] >>> 22, O = t[33] << 13 | t[32] >>> 19, C = t[32] << 13 | t[33] >>> 19, 
          ht = t[42] << 2 | t[43] >>> 30, lt = t[43] << 2 | t[42] >>> 30, et = t[5] << 30 | t[4] >>> 2, rt = t[4] << 30 | t[5] >>> 2, 
          R = t[14] << 6 | t[15] >>> 26, T = t[15] << 6 | t[14] >>> 26, b = t[25] << 11 | t[24] >>> 21, w = t[24] << 11 | t[25] >>> 21, 
          X = t[34] << 15 | t[35] >>> 17, Q = t[35] << 15 | t[34] >>> 17, L = t[45] << 29 | t[44] >>> 3, P = t[44] << 29 | t[45] >>> 3, 
          S = t[6] << 28 | t[7] >>> 4, E = t[7] << 28 | t[6] >>> 4, nt = t[17] << 23 | t[16] >>> 9, it = t[16] << 23 | t[17] >>> 9, 
          H = t[26] << 25 | t[27] >>> 7, D = t[27] << 25 | t[26] >>> 7, A = t[36] << 21 | t[37] >>> 11, k = t[37] << 21 | t[36] >>> 11, 
          Y = t[47] << 24 | t[46] >>> 8, tt = t[46] << 24 | t[47] >>> 8, K = t[8] << 27 | t[9] >>> 5, J = t[9] << 27 | t[8] >>> 5, 
          M = t[18] << 20 | t[19] >>> 12, N = t[19] << 20 | t[18] >>> 12, ot = t[29] << 7 | t[28] >>> 25, st = t[28] << 7 | t[29] >>> 25, 
          F = t[38] << 8 | t[39] >>> 24, z = t[39] << 8 | t[38] >>> 24, B = t[48] << 14 | t[49] >>> 18, x = t[49] << 14 | t[48] >>> 18, 
          t[0] = g ^ ~p & b, t[1] = m ^ ~y & w, t[10] = S ^ ~M & _, t[11] = E ^ ~N & I, t[20] = j ^ ~R & H, t[21] = U ^ ~T & D, t[30] = K ^ ~W & Z, 
          t[31] = J ^ ~G & $, t[40] = et ^ ~nt & ot, t[41] = rt ^ ~it & st, t[2] = p ^ ~b & A, t[3] = y ^ ~w & k, t[12] = M ^ ~_ & O, 
          t[13] = N ^ ~I & C, t[22] = R ^ ~H & F, t[23] = T ^ ~D & z, t[32] = W ^ ~Z & X, t[33] = G ^ ~$ & Q, t[42] = nt ^ ~ot & at, 
          t[43] = it ^ ~st & ut, t[4] = b ^ ~A & B, t[5] = w ^ ~k & x, t[14] = _ ^ ~O & L, t[15] = I ^ ~C & P, t[24] = H ^ ~F & q, 
          t[25] = D ^ ~z & V, t[34] = Z ^ ~X & Y, t[35] = $ ^ ~Q & tt, t[44] = ot ^ ~at & ht, t[45] = st ^ ~ut & lt, t[6] = A ^ ~B & g, 
          t[7] = k ^ ~x & m, t[16] = O ^ ~L & S, t[17] = C ^ ~P & E, t[26] = F ^ ~q & j, t[27] = z ^ ~V & U, t[36] = X ^ ~Y & K, t[37] = Q ^ ~tt & J, 
          t[46] = at ^ ~ht & et, t[47] = ut ^ ~lt & rt, t[8] = B ^ ~g & p, t[9] = x ^ ~m & y, t[18] = L ^ ~S & M, t[19] = P ^ ~E & N, 
          t[28] = q ^ ~j & R, t[29] = V ^ ~U & T, t[38] = Y ^ ~K & W, t[39] = tt ^ ~J & G, t[48] = ht ^ ~et & nt, t[49] = lt ^ ~rt & it, 
          t[0] ^= v[n], t[1] ^= v[n + 1];
        };
        if (u) t.exports = E; else {
          for (N = 0; N < M.length; ++N) s[M[N]] = E[M[N]];
          h && (void 0 === (n = function() {
            return E;
          }.call(e, r, e, t)) || (t.exports = n));
        }
      }();
    },
    "./node_modules/minimalistic-assert/index.js": t => {
      function e(t, e) {
        if (!t) throw new Error(e || 'Assertion failed');
      }
      t.exports = e, e.equal = function(t, e, r) {
        if (t != e) throw new Error(r || 'Assertion failed: ' + t + ' != ' + e);
      };
    },
    "./node_modules/pvutils/src/utils.js": (t, e, r) => {
      "use strict";
      function n(t) {
        return new Date(t.getTime() + 6e4 * t.getTimezoneOffset());
      }
      function i(t, e, r) {
        return t instanceof Object == !1 ? r : e in t ? t[e] : r;
      }
      function o(t, e = 0, r = t.byteLength - e, n = !1) {
        let i = "";
        for (const o of new Uint8Array(t, e, r)) {
          const t = o.toString(16).toUpperCase();
          1 === t.length && (i += "0"), i += t, n && (i += " ");
        }
        return i.trim();
      }
      function s(t, e, r, n) {
        return e instanceof ArrayBuffer == !1 ? (t.error = "Wrong parameter: inputBuffer must be \"ArrayBuffer\"", !1) : 0 === e.byteLength ? (t.error = "Wrong parameter: inputBuffer has zero length", 
        !1) : r < 0 ? (t.error = "Wrong parameter: inputOffset less than zero", !1) : n < 0 ? (t.error = "Wrong parameter: inputLength less than zero", 
        !1) : !(e.byteLength - r - n < 0) || (t.error = "End of input reached before message was fully decoded (inconsistent offset and length values)", 
        !1);
      }
      function a(t, e) {
        let r = 0;
        if (1 === t.length) return t[0];
        for (let n = t.length - 1; n >= 0; n--) r += t[t.length - 1 - n] * Math.pow(2, e * n);
        return r;
      }
      function u(t, e, r = -1) {
        const n = r;
        let i = t;
        let o = 0;
        let s = Math.pow(2, e);
        for (let a = 1; a < 8; a++) {
          if (t < s) {
            let t;
            if (n < 0) t = new ArrayBuffer(a), o = a; else {
              if (n < a) return new ArrayBuffer(0);
              t = new ArrayBuffer(n), o = n;
            }
            const r = new Uint8Array(t);
            for (let n = a - 1; n >= 0; n--) {
              const t = Math.pow(2, n * e);
              r[o - n - 1] = Math.floor(i / t), i -= r[o - n - 1] * t;
            }
            return t;
          }
          s *= Math.pow(2, e);
        }
        return new ArrayBuffer(0);
      }
      function h(...t) {
        let e = 0;
        let r = 0;
        for (const o of t) e += o.byteLength;
        const n = new ArrayBuffer(e);
        const i = new Uint8Array(n);
        for (const o of t) i.set(new Uint8Array(o), r), r += o.byteLength;
        return n;
      }
      function l(...t) {
        let e = 0;
        let r = 0;
        for (const o of t) e += o.length;
        const n = new ArrayBuffer(e);
        const i = new Uint8Array(n);
        for (const o of t) i.set(o, r), r += o.length;
        return i;
      }
      function f() {
        const t = new Uint8Array(this.valueHex);
        if (this.valueHex.byteLength >= 2) {
          const e = 255 === t[0] && 128 & t[1];
          const r = 0 === t[0] && 0 == (128 & t[1]);
          (e || r) && this.warnings.push("Needlessly long format");
        }
        const e = new ArrayBuffer(this.valueHex.byteLength);
        const r = new Uint8Array(e);
        for (let s = 0; s < this.valueHex.byteLength; s++) r[s] = 0;
        r[0] = 128 & t[0];
        const n = a(r, 8);
        const i = new ArrayBuffer(this.valueHex.byteLength);
        const o = new Uint8Array(i);
        for (let s = 0; s < this.valueHex.byteLength; s++) o[s] = t[s];
        o[0] &= 127;
        return a(o, 8) - n;
      }
      function c(t) {
        const e = t < 0 ? -1 * t : t;
        let r = 128;
        for (let n = 1; n < 8; n++) {
          if (e <= r) {
            if (t < 0) {
              const t = u(r - e, 8, n);
              return new Uint8Array(t)[0] |= 128, t;
            }
            let i = u(e, 8, n);
            let o = new Uint8Array(i);
            if (128 & o[0]) {
              const t = i.slice(0);
              const e = new Uint8Array(t);
              i = new ArrayBuffer(i.byteLength + 1), o = new Uint8Array(i);
              for (let r = 0; r < t.byteLength; r++) o[r + 1] = e[r];
              o[0] = 0;
            }
            return i;
          }
          r *= Math.pow(2, 8);
        }
        return new ArrayBuffer(0);
      }
      function d(t, e) {
        if (t.byteLength !== e.byteLength) return !1;
        const r = new Uint8Array(t);
        const n = new Uint8Array(e);
        for (let i = 0; i < r.length; i++) if (r[i] !== n[i]) return !1;
        return !0;
      }
      function v(t, e) {
        const r = t.toString(10);
        if (e < r.length) return "";
        const n = e - r.length;
        const i = new Array(n);
        for (let o = 0; o < n; o++) i[o] = "0";
        return i.join("").concat(r);
      }
      r.r(e), r.d(e, {
        getUTCDate: () => n,
        getParametersValue: () => i,
        bufferToHexCodes: () => o,
        checkBufferParams: () => s,
        utilFromBase: () => a,
        utilToBase: () => u,
        utilConcatBuf: () => h,
        utilConcatView: () => l,
        utilDecodeTC: () => f,
        utilEncodeTC: () => c,
        isEqualBuffer: () => d,
        padNumber: () => v,
        toBase64: () => p,
        fromBase64: () => y,
        arrayBufferToString: () => b,
        stringToArrayBuffer: () => w,
        nearestPowerOf2: () => k,
        clearProps: () => B
      });
      const g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      const m = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=";
      function p(t, e = !1, r = !1, n = !1) {
        let i = 0;
        let o = 0;
        let s = 0;
        let a = "";
        const u = e ? m : g;
        if (n) {
          let e = 0;
          for (let r = 0; r < t.length; r++) if (0 !== t.charCodeAt(r)) {
            e = r;
            break;
          }
          t = t.slice(e);
        }
        for (;i < t.length; ) {
          const e = t.charCodeAt(i++);
          i >= t.length && (o = 1);
          const n = t.charCodeAt(i++);
          i >= t.length && (s = 1);
          const h = t.charCodeAt(i++);
          const l = e >> 2;
          const f = (3 & e) << 4 | n >> 4;
          let c = (15 & n) << 2 | h >> 6;
          let d = 63 & h;
          1 === o ? c = d = 64 : 1 === s && (d = 64), a += r ? 64 === c ? `${u.charAt(l)}${u.charAt(f)}` : 64 === d ? `${u.charAt(l)}${u.charAt(f)}${u.charAt(c)}` : `${u.charAt(l)}${u.charAt(f)}${u.charAt(c)}${u.charAt(d)}` : `${u.charAt(l)}${u.charAt(f)}${u.charAt(c)}${u.charAt(d)}`;
        }
        return a;
      }
      function y(t, e = !1, r = !1) {
        const n = e ? m : g;
        function i(t) {
          for (let e = 0; e < 64; e++) if (n.charAt(e) === t) return e;
          return 64;
        }
        function o(t) {
          return 64 === t ? 0 : t;
        }
        let s = 0;
        let a = "";
        for (;s < t.length; ) {
          const e = i(t.charAt(s++));
          const r = s >= t.length ? 0 : i(t.charAt(s++));
          const n = s >= t.length ? 0 : i(t.charAt(s++));
          const u = s >= t.length ? 0 : i(t.charAt(s++));
          const h = o(e) << 2 | o(r) >> 4;
          const l = (15 & o(r)) << 4 | o(n) >> 2;
          const f = (3 & o(n)) << 6 | o(u);
          a += String.fromCharCode(h), 64 !== n && (a += String.fromCharCode(l)), 64 !== u && (a += String.fromCharCode(f));
        }
        if (r) {
          let t = -1;
          for (let e = a.length - 1; e >= 0; e--) if (0 !== a.charCodeAt(e)) {
            t = e;
            break;
          }
          a = -1 !== t ? a.slice(0, t + 1) : "";
        }
        return a;
      }
      function b(t) {
        let e = "";
        const r = new Uint8Array(t);
        for (const n of r) e += String.fromCharCode(n);
        return e;
      }
      function w(t) {
        const e = t.length;
        const r = new ArrayBuffer(e);
        const n = new Uint8Array(r);
        for (let i = 0; i < e; i++) n[i] = t.charCodeAt(i);
        return r;
      }
      const A = Math.log(2);
      function k(t) {
        const e = Math.log(t) / A;
        const r = Math.floor(e);
        const n = Math.round(e);
        return r === n ? r : n;
      }
      function B(t, e) {
        for (const r of e) delete t[r];
      }
    },
    "?8131": () => {}
  };
  var e = {};
  function r(n) {
    var i = e[n];
    if (void 0 !== i) return i.exports;
    var o = e[n] = {
      id: n,
      loaded: !1,
      exports: {}
    };
    return t[n].call(o.exports, o, o.exports, r), o.loaded = !0, o.exports;
  }
  (() => {
    r.amdO = {};
  })(), (() => {
    r.n = t => {
      var e = t && t.__esModule ? () => t.default : () => t;
      return r.d(e, {
        a: e
      }), e;
    };
  })(), (() => {
    r.d = (t, e) => {
      for (var n in e) r.o(e, n) && !r.o(t, n) && Object.defineProperty(t, n, {
        enumerable: !0,
        get: e[n]
      });
    };
  })(), (() => {
    r.g = function() {
      if ('object' == typeof globalThis) return globalThis;
      try {
        return this || new Function('return this')();
      } catch (t) {
        if ('object' == typeof window) return window;
      }
    }();
  })(), (() => {
    r.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e);
  })(), (() => {
    r.r = t => {
      'undefined' != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
        value: 'Module'
      }), Object.defineProperty(t, '__esModule', {
        value: !0
      });
    };
  })(), (() => {
    r.nmd = t => (t.paths = [], t.children || (t.children = []), t);
  })();
  var n = {};
  (() => {
    "use strict";
    r.r(n), new (r("./node_modules/@tokenscript/token-negotiator/dist/outlet/index.js").Outlet)({
      tokenName: 'devcon-remote'
    });
  })();
})();