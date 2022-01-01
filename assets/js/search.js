function x(e) {
    return Array.isArray ? Array.isArray(e) : q(e) === "[object Array]";
}
var mt = 1 / 0;
function _t(e) {
    if (typeof e == "string") return e;
    let t = e + "";
    return t == "0" && 1 / e == -mt ? "-0" : t;
}
function yt(e) {
    return e == null ? "" : _t(e);
}
function I(e) {
    return typeof e == "string";
}
function J(e) {
    return typeof e == "number";
}
function Et(e) {
    return e === !0 || e === !1 || xt(e) && q(e) == "[object Boolean]";
}
function Z(e) {
    return typeof e == "object";
}
function xt(e) {
    return Z(e) && e !== null;
}
function M(e) {
    return e != null;
}
function K(e) {
    return !e.trim().length;
}
function q(e) {
    return e == null ? e === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(e);
}
var It = "Incorrect 'index' type", At = (e)=>`Invalid value for key ${e}`
, St = (e)=>`Pattern length exceeds max of ${e}.`
, wt = (e)=>`Missing ${e} property in key`
, Lt = (e)=>`Property 'weight' in key '${e}' must be a positive integer`
, tt = Object.prototype.hasOwnProperty, et = class {
    constructor(t){
        this._keys = [], this._keyMap = {
        };
        let s = 0;
        t.forEach((n)=>{
            let r = st(n);
            s += r.weight, this._keys.push(r), this._keyMap[r.id] = r, s += r.weight;
        }), this._keys.forEach((n)=>{
            n.weight /= s;
        });
    }
    get(t) {
        return this._keyMap[t];
    }
    keys() {
        return this._keys;
    }
    toJSON() {
        return JSON.stringify(this._keys);
    }
};
function st(e) {
    let t = null, s = null, n = null, r = 1;
    if (I(e) || x(e)) n = e, t = nt(e), s = D(e);
    else {
        if (!tt.call(e, "name")) throw new Error(wt("name"));
        let i = e.name;
        if (n = i, tt.call(e, "weight") && (r = e.weight, r <= 0)) throw new Error(Lt(i));
        t = nt(i), s = D(i);
    }
    return {
        path: t,
        id: s,
        weight: r,
        src: n
    };
}
function nt(e) {
    return x(e) ? e : e.split(".");
}
function D(e) {
    return x(e) ? e.join(".") : e;
}
function Rt(e, t) {
    let s = [], n = !1, r = (i, c, o)=>{
        if (!!M(i)) if (!c[o]) s.push(i);
        else {
            let h = c[o], l = i[h];
            if (!M(l)) return;
            if (o === c.length - 1 && (I(l) || J(l) || Et(l))) s.push(yt(l));
            else if (x(l)) {
                n = !0;
                for(let a = 0, u = l.length; a < u; a += 1)r(l[a], c, o + 1);
            } else c.length && r(l, c, o + 1);
        }
    };
    return r(e, I(t) ? t.split(".") : t, 0), n ? s : s[0];
}
var bt = {
    includeMatches: !1,
    findAllMatches: !1,
    minMatchCharLength: 1
}, kt = {
    isCaseSensitive: !1,
    includeScore: !1,
    keys: [],
    shouldSort: !0,
    sortFn: (e, t)=>e.score === t.score ? e.idx < t.idx ? -1 : 1 : e.score < t.score ? -1 : 1
}, Ot = {
    location: 0,
    threshold: 0.6,
    distance: 100
}, $t = {
    useExtendedSearch: !1,
    getFn: Rt,
    ignoreLocation: !1,
    ignoreFieldNorm: !1
}, f = {
    ...kt,
    ...bt,
    ...Ot,
    ...$t
}, Nt = /[^ ]+/g;
function Ct(e = 3) {
    let t = new Map, s = Math.pow(10, e);
    return {
        get (n) {
            let r = n.match(Nt).length;
            if (t.has(r)) return t.get(r);
            let i = 1 / Math.sqrt(r), c = parseFloat(Math.round(i * s) / s);
            return t.set(r, c), c;
        },
        clear () {
            t.clear();
        }
    };
}
var v = class {
    constructor({ getFn: t = f.getFn  } = {
    }){
        this.norm = Ct(3), this.getFn = t, this.isCreated = !1, this.setIndexRecords();
    }
    setSources(t = []) {
        this.docs = t;
    }
    setIndexRecords(t = []) {
        this.records = t;
    }
    setKeys(t = []) {
        this.keys = t, this._keysMap = {
        }, t.forEach((s, n)=>{
            this._keysMap[s.id] = n;
        });
    }
    create() {
        this.isCreated || !this.docs.length || (this.isCreated = !0, I(this.docs[0]) ? this.docs.forEach((t, s)=>{
            this._addString(t, s);
        }) : this.docs.forEach((t, s)=>{
            this._addObject(t, s);
        }), this.norm.clear());
    }
    add(t) {
        let s = this.size();
        I(t) ? this._addString(t, s) : this._addObject(t, s);
    }
    removeAt(t) {
        this.records.splice(t, 1);
        for(let s = t, n = this.size(); s < n; s += 1)this.records[s].i -= 1;
    }
    getValueForItemAtKeyId(t, s) {
        return t[this._keysMap[s]];
    }
    size() {
        return this.records.length;
    }
    _addString(t, s) {
        if (!M(t) || K(t)) return;
        let n = {
            v: t,
            i: s,
            n: this.norm.get(t)
        };
        this.records.push(n);
    }
    _addObject(t, s) {
        let n = {
            i: s,
            $: {
            }
        };
        this.keys.forEach((r, i)=>{
            let c = this.getFn(t, r.path);
            if (!!M(c)) {
                if (x(c)) {
                    let o = [], h = [
                        {
                            nestedArrIndex: -1,
                            value: c
                        }
                    ];
                    for(; h.length;){
                        let { nestedArrIndex: l , value: a  } = h.pop();
                        if (!!M(a)) if (I(a) && !K(a)) {
                            let u = {
                                v: a,
                                i: l,
                                n: this.norm.get(a)
                            };
                            o.push(u);
                        } else x(a) && a.forEach((u, d)=>{
                            h.push({
                                nestedArrIndex: d,
                                value: u
                            });
                        });
                    }
                    n.$[i] = o;
                } else if (!K(c)) {
                    let o = {
                        v: c,
                        n: this.norm.get(c)
                    };
                    n.$[i] = o;
                }
            }
        }), this.records.push(n);
    }
    toJSON() {
        return {
            keys: this.keys,
            records: this.records
        };
    }
};
function rt(e, t, { getFn: s = f.getFn  } = {
}) {
    let n = new v({
        getFn: s
    });
    return n.setKeys(e.map(st)), n.setSources(t), n.create(), n;
}
function Tt(e, { getFn: t = f.getFn  } = {
}) {
    let { keys: s , records: n  } = e, r = new v({
        getFn: t
    });
    return r.setKeys(s), r.setIndexRecords(n), r;
}
function j(e, { errors: t = 0 , currentLocation: s = 0 , expectedLocation: n = 0 , distance: r = f.distance , ignoreLocation: i = f.ignoreLocation  } = {
}) {
    let c = t / e.length;
    if (i) return c;
    let o = Math.abs(n - s);
    return r ? c + o / r : o ? 1 : c;
}
function vt(e = [], t = f.minMatchCharLength) {
    let s = [], n = -1, r = -1, i = 0;
    for(let c = e.length; i < c; i += 1){
        let o = e[i];
        o && n === -1 ? n = i : !o && n !== -1 && (r = i - 1, r - n + 1 >= t && s.push([
            n,
            r
        ]), n = -1);
    }
    return e[i - 1] && i - n >= t && s.push([
        n,
        i - 1
    ]), s;
}
var b = 32;
function jt(e, t, s, { location: n = f.location , distance: r = f.distance , threshold: i = f.threshold , findAllMatches: c = f.findAllMatches , minMatchCharLength: o = f.minMatchCharLength , includeMatches: h = f.includeMatches , ignoreLocation: l = f.ignoreLocation  } = {
}) {
    if (t.length > b) throw new Error(St(b));
    let a = t.length, u = e.length, d = Math.max(0, Math.min(n, u)), p = i, g = d, m = o > 1 || h, L = m ? Array(u) : [], E;
    for(; (E = e.indexOf(t, g)) > -1;){
        let _ = j(t, {
            currentLocation: E,
            expectedLocation: d,
            distance: r,
            ignoreLocation: l
        });
        if (p = Math.min(_, p), g = E + a, m) {
            let S = 0;
            for(; S < a;)L[E + S] = 1, S += 1;
        }
    }
    g = -1;
    let O = [], R = 1, C = a + u, Mt = 1 << a - 1;
    for(let _ = 0; _ < a; _ += 1){
        let S = 0, w = C;
        for(; S < w;)j(t, {
            errors: _,
            currentLocation: d + w,
            expectedLocation: d,
            distance: r,
            ignoreLocation: l
        }) <= p ? S = w : C = w, w = Math.floor((C - S) / 2 + S);
        C = w;
        let Q = Math.max(1, d - w + 1), P = c ? u : Math.min(d + w, u) + a, $ = Array(P + 2);
        $[P + 1] = (1 << _) - 1;
        for(let y = P; y >= Q; y -= 1){
            let T = y - 1, X1 = s[e.charAt(T)];
            if (m && (L[T] = +!!X1), $[y] = ($[y + 1] << 1 | 1) & X1, _ && ($[y] |= (O[y + 1] | O[y]) << 1 | 1 | O[y + 1]), $[y] & Mt && (R = j(t, {
                errors: _,
                currentLocation: T,
                expectedLocation: d,
                distance: r,
                ignoreLocation: l
            }), R <= p)) {
                if (p = R, g = T, g <= d) break;
                Q = Math.max(1, 2 * d - g);
            }
        }
        if (j(t, {
            errors: _ + 1,
            currentLocation: d,
            expectedLocation: d,
            distance: r,
            ignoreLocation: l
        }) > p) break;
        O = $;
    }
    let F = {
        isMatch: g >= 0,
        score: Math.max(0.001, R)
    };
    if (m) {
        let _ = vt(L, o);
        _.length ? h && (F.indices = _) : F.isMatch = !1;
    }
    return F;
}
function Ft(e) {
    let t = {
    };
    for(let s = 0, n = e.length; s < n; s += 1){
        let r = e.charAt(s);
        t[r] = (t[r] || 0) | 1 << n - s - 1;
    }
    return t;
}
var B = class {
    constructor(t, { location: s = f.location , threshold: n = f.threshold , distance: r = f.distance , includeMatches: i = f.includeMatches , findAllMatches: c = f.findAllMatches , minMatchCharLength: o = f.minMatchCharLength , isCaseSensitive: h = f.isCaseSensitive , ignoreLocation: l = f.ignoreLocation  } = {
    }){
        if (this.options = {
            location: s,
            threshold: n,
            distance: r,
            includeMatches: i,
            findAllMatches: c,
            minMatchCharLength: o,
            isCaseSensitive: h,
            ignoreLocation: l
        }, this.pattern = h ? t : t.toLowerCase(), this.chunks = [], !this.pattern.length) return;
        let a = (d, p)=>{
            this.chunks.push({
                pattern: d,
                alphabet: Ft(d),
                startIndex: p
            });
        }, u = this.pattern.length;
        if (u > b) {
            let d = 0, p = u % b, g = u - p;
            for(; d < g;)a(this.pattern.substr(d, b), d), d += b;
            if (p) {
                let m = u - b;
                a(this.pattern.substr(m), m);
            }
        } else a(this.pattern, 0);
    }
    searchIn(t) {
        let { isCaseSensitive: s , includeMatches: n  } = this.options;
        if (s || (t = t.toLowerCase()), this.pattern === t) {
            let g = {
                isMatch: !0,
                score: 0
            };
            return n && (g.indices = [
                [
                    0,
                    t.length - 1
                ]
            ]), g;
        }
        let { location: r , distance: i , threshold: c , findAllMatches: o , minMatchCharLength: h , ignoreLocation: l  } = this.options, a = [], u = 0, d = !1;
        this.chunks.forEach(({ pattern: g , alphabet: m , startIndex: L  })=>{
            let { isMatch: E , score: O , indices: R  } = jt(t, g, m, {
                location: r + L,
                distance: i,
                threshold: c,
                findAllMatches: o,
                minMatchCharLength: h,
                includeMatches: n,
                ignoreLocation: l
            });
            E && (d = !0), u += O, E && R && (a = [
                ...a,
                ...R
            ]);
        });
        let p = {
            isMatch: d,
            score: d ? u / this.chunks.length : 1
        };
        return d && n && (p.indices = a), p;
    }
}, A = class {
    constructor(t){
        this.pattern = t;
    }
    static isMultiMatch(t) {
        return it(t, this.multiRegex);
    }
    static isSingleMatch(t) {
        return it(t, this.singleRegex);
    }
    search() {
    }
};
function it(e, t) {
    let s = e.match(t);
    return s ? s[1] : null;
}
var ct = class extends A {
    constructor(t){
        super(t);
    }
    static get type() {
        return "exact";
    }
    static get multiRegex() {
        return /^="(.*)"$/;
    }
    static get singleRegex() {
        return /^=(.*)$/;
    }
    search(t) {
        let s = t === this.pattern;
        return {
            isMatch: s,
            score: s ? 0 : 1,
            indices: [
                0,
                this.pattern.length - 1
            ]
        };
    }
}, ot = class extends A {
    constructor(t){
        super(t);
    }
    static get type() {
        return "inverse-exact";
    }
    static get multiRegex() {
        return /^!"(.*)"$/;
    }
    static get singleRegex() {
        return /^!(.*)$/;
    }
    search(t) {
        let n = t.indexOf(this.pattern) === -1;
        return {
            isMatch: n,
            score: n ? 0 : 1,
            indices: [
                0,
                t.length - 1
            ]
        };
    }
}, ht = class extends A {
    constructor(t){
        super(t);
    }
    static get type() {
        return "prefix-exact";
    }
    static get multiRegex() {
        return /^\^"(.*)"$/;
    }
    static get singleRegex() {
        return /^\^(.*)$/;
    }
    search(t) {
        let s = t.startsWith(this.pattern);
        return {
            isMatch: s,
            score: s ? 0 : 1,
            indices: [
                0,
                this.pattern.length - 1
            ]
        };
    }
}, at = class extends A {
    constructor(t){
        super(t);
    }
    static get type() {
        return "inverse-prefix-exact";
    }
    static get multiRegex() {
        return /^!\^"(.*)"$/;
    }
    static get singleRegex() {
        return /^!\^(.*)$/;
    }
    search(t) {
        let s = !t.startsWith(this.pattern);
        return {
            isMatch: s,
            score: s ? 0 : 1,
            indices: [
                0,
                t.length - 1
            ]
        };
    }
}, lt = class extends A {
    constructor(t){
        super(t);
    }
    static get type() {
        return "suffix-exact";
    }
    static get multiRegex() {
        return /^"(.*)"\$$/;
    }
    static get singleRegex() {
        return /^(.*)\$$/;
    }
    search(t) {
        let s = t.endsWith(this.pattern);
        return {
            isMatch: s,
            score: s ? 0 : 1,
            indices: [
                t.length - this.pattern.length,
                t.length - 1
            ]
        };
    }
}, ut = class extends A {
    constructor(t){
        super(t);
    }
    static get type() {
        return "inverse-suffix-exact";
    }
    static get multiRegex() {
        return /^!"(.*)"\$$/;
    }
    static get singleRegex() {
        return /^!(.*)\$$/;
    }
    search(t) {
        let s = !t.endsWith(this.pattern);
        return {
            isMatch: s,
            score: s ? 0 : 1,
            indices: [
                0,
                t.length - 1
            ]
        };
    }
}, H = class extends A {
    constructor(t, { location: s = f.location , threshold: n = f.threshold , distance: r = f.distance , includeMatches: i = f.includeMatches , findAllMatches: c = f.findAllMatches , minMatchCharLength: o = f.minMatchCharLength , isCaseSensitive: h = f.isCaseSensitive , ignoreLocation: l = f.ignoreLocation  } = {
    }){
        super(t);
        this._bitapSearch = new B(t, {
            location: s,
            threshold: n,
            distance: r,
            includeMatches: i,
            findAllMatches: c,
            minMatchCharLength: o,
            isCaseSensitive: h,
            ignoreLocation: l
        });
    }
    static get type() {
        return "fuzzy";
    }
    static get multiRegex() {
        return /^"(.*)"$/;
    }
    static get singleRegex() {
        return /^(.*)$/;
    }
    search(t) {
        return this._bitapSearch.searchIn(t);
    }
}, z = class extends A {
    constructor(t){
        super(t);
    }
    static get type() {
        return "include";
    }
    static get multiRegex() {
        return /^'"(.*)"$/;
    }
    static get singleRegex() {
        return /^'(.*)$/;
    }
    search(t) {
        let s = 0, n, r = [], i = this.pattern.length;
        for(; (n = t.indexOf(this.pattern, s)) > -1;)s = n + i, r.push([
            n,
            s - 1
        ]);
        let c = !!r.length;
        return {
            isMatch: c,
            score: c ? 0 : 1,
            indices: r
        };
    }
}, V = [
    ct,
    z,
    ht,
    at,
    ut,
    lt,
    ot,
    H
], ft = V.length, Pt = / +(?=([^\"]*\"[^\"]*\")*[^\"]*$)/, Kt = "|";
function Dt(e, t = {
}) {
    return e.split(Kt).map((s)=>{
        let n = s.trim().split(Pt).filter((i)=>i && !!i.trim()
        ), r = [];
        for(let i1 = 0, c = n.length; i1 < c; i1 += 1){
            let o = n[i1], h = !1, l = -1;
            for(; !h && ++l < ft;){
                let a = V[l], u = a.isMultiMatch(o);
                u && (r.push(new a(u, t)), h = !0);
            }
            if (!h) for(l = -1; ++l < ft;){
                let a = V[l], u = a.isSingleMatch(o);
                if (u) {
                    r.push(new a(u, t));
                    break;
                }
            }
        }
        return r;
    });
}
var Bt = new Set([
    H.type,
    z.type
]), dt = class {
    constructor(t, { isCaseSensitive: s = f.isCaseSensitive , includeMatches: n = f.includeMatches , minMatchCharLength: r = f.minMatchCharLength , ignoreLocation: i = f.ignoreLocation , findAllMatches: c = f.findAllMatches , location: o = f.location , threshold: h = f.threshold , distance: l = f.distance  } = {
    }){
        this.query = null, this.options = {
            isCaseSensitive: s,
            includeMatches: n,
            minMatchCharLength: r,
            findAllMatches: c,
            ignoreLocation: i,
            location: o,
            threshold: h,
            distance: l
        }, this.pattern = s ? t : t.toLowerCase(), this.query = Dt(this.pattern, this.options);
    }
    static condition(t, s) {
        return s.useExtendedSearch;
    }
    searchIn(t) {
        let s = this.query;
        if (!s) return {
            isMatch: !1,
            score: 1
        };
        let { includeMatches: n , isCaseSensitive: r  } = this.options;
        t = r ? t : t.toLowerCase();
        let i = 0, c = [], o = 0;
        for(let h = 0, l = s.length; h < l; h += 1){
            let a = s[h];
            c.length = 0, i = 0;
            for(let u = 0, d = a.length; u < d; u += 1){
                let p = a[u], { isMatch: g , indices: m , score: L  } = p.search(t);
                if (g) {
                    if (i += 1, o += L, n) {
                        let E = p.constructor.type;
                        Bt.has(E) ? c = [
                            ...c,
                            ...m
                        ] : c.push(m);
                    }
                } else {
                    o = 0, i = 0, c.length = 0;
                    break;
                }
            }
            if (i) {
                let u = {
                    isMatch: !0,
                    score: o / i
                };
                return n && (u.indices = c), u;
            }
        }
        return {
            isMatch: !1,
            score: 1
        };
    }
}, Y = [];
function Ht(...e) {
    Y.push(...e);
}
function G(e, t) {
    for(let s = 0, n = Y.length; s < n; s += 1){
        let r = Y[s];
        if (r.condition(e, t)) return new r(e, t);
    }
    return new B(e, t);
}
var N = {
    AND: "$and",
    OR: "$or"
}, W = {
    PATH: "$path",
    PATTERN: "$val"
}, U = (e)=>!!(e[N.AND] || e[N.OR])
, zt = (e)=>!!e[W.PATH]
, Vt = (e)=>!x(e) && Z(e) && !U(e)
, gt = (e)=>({
        [N.AND]: Object.keys(e).map((t)=>({
                [t]: e[t]
            })
        )
    })
;
function pt(e, t, { auto: s = !0  } = {
}) {
    let n = (r)=>{
        let i = Object.keys(r), c = zt(r);
        if (!c && i.length > 1 && !U(r)) return n(gt(r));
        if (Vt(r)) {
            let h = c ? r[W.PATH] : i[0], l = c ? r[W.PATTERN] : r[h];
            if (!I(l)) throw new Error(At(h));
            let a = {
                keyId: D(h),
                pattern: l
            };
            return s && (a.searcher = G(l, t)), a;
        }
        let o = {
            children: [],
            operator: i[0]
        };
        return i.forEach((h)=>{
            let l = r[h];
            x(l) && l.forEach((a)=>{
                o.children.push(n(a));
            });
        }), o;
    };
    return U(e) || (e = gt(e)), n(e);
}
function Yt(e, { ignoreFieldNorm: t = f.ignoreFieldNorm  }) {
    e.forEach((s)=>{
        let n = 1;
        s.matches.forEach(({ key: r , norm: i , score: c  })=>{
            let o = r ? r.weight : null;
            n *= Math.pow(c === 0 && o ? Number.EPSILON : c, (o || 1) * (t ? 1 : i));
        }), s.score = n;
    });
}
function Gt(e, t) {
    let s = e.matches;
    t.matches = [], !!M(s) && s.forEach((n)=>{
        if (!M(n.indices) || !n.indices.length) return;
        let { indices: r , value: i  } = n, c = {
            indices: r,
            value: i
        };
        n.key && (c.key = n.key.src), n.idx > -1 && (c.refIndex = n.idx), t.matches.push(c);
    });
}
function Wt(e, t) {
    t.score = e.score;
}
function Ut(e, t, { includeMatches: s = f.includeMatches , includeScore: n = f.includeScore  } = {
}) {
    let r = [];
    return s && r.push(Gt), n && r.push(Wt), e.map((i)=>{
        let { idx: c  } = i, o = {
            item: t[c],
            refIndex: c
        };
        return r.length && r.forEach((h)=>{
            h(i, o);
        }), o;
    });
}
var k = class {
    constructor(t, s = {
    }, n){
        this.options = {
            ...f,
            ...s
        }, this.options.useExtendedSearch, this._keyStore = new et(this.options.keys), this.setCollection(t, n);
    }
    setCollection(t, s) {
        if (this._docs = t, s && !(s instanceof v)) throw new Error(It);
        this._myIndex = s || rt(this.options.keys, this._docs, {
            getFn: this.options.getFn
        });
    }
    add(t) {
        !M(t) || (this._docs.push(t), this._myIndex.add(t));
    }
    remove(t = ()=>!1
    ) {
        let s = [];
        for(let n = 0, r = this._docs.length; n < r; n += 1){
            let i = this._docs[n];
            t(i, n) && (this.removeAt(n), n -= 1, r -= 1, s.push(i));
        }
        return s;
    }
    removeAt(t) {
        this._docs.splice(t, 1), this._myIndex.removeAt(t);
    }
    getIndex() {
        return this._myIndex;
    }
    search(t, { limit: s = -1  } = {
    }) {
        let { includeMatches: n , includeScore: r , shouldSort: i , sortFn: c , ignoreFieldNorm: o  } = this.options, h = I(t) ? I(this._docs[0]) ? this._searchStringList(t) : this._searchObjectList(t) : this._searchLogical(t);
        return Yt(h, {
            ignoreFieldNorm: o
        }), i && h.sort(c), J(s) && s > -1 && (h = h.slice(0, s)), Ut(h, this._docs, {
            includeMatches: n,
            includeScore: r
        });
    }
    _searchStringList(t) {
        let s = G(t, this.options), { records: n  } = this._myIndex, r = [];
        return n.forEach(({ v: i , i: c , n: o  })=>{
            if (!M(i)) return;
            let { isMatch: h , score: l , indices: a  } = s.searchIn(i);
            h && r.push({
                item: i,
                idx: c,
                matches: [
                    {
                        score: l,
                        value: i,
                        norm: o,
                        indices: a
                    }
                ]
            });
        }), r;
    }
    _searchLogical(t) {
        let s = pt(t, this.options), n = (o, h, l)=>{
            if (!o.children) {
                let { keyId: a , searcher: u  } = o, d = this._findMatches({
                    key: this._keyStore.get(a),
                    value: this._myIndex.getValueForItemAtKeyId(h, a),
                    searcher: u
                });
                return d && d.length ? [
                    {
                        idx: l,
                        item: h,
                        matches: d
                    }
                ] : [];
            }
            switch(o.operator){
                case N.AND:
                    {
                        let a = [];
                        for(let u = 0, d = o.children.length; u < d; u += 1){
                            let p = o.children[u], g = n(p, h, l);
                            if (g.length) a.push(...g);
                            else return [];
                        }
                        return a;
                    }
                case N.OR:
                    {
                        let a = [];
                        for(let u = 0, d = o.children.length; u < d; u += 1){
                            let p = o.children[u], g = n(p, h, l);
                            if (g.length) {
                                a.push(...g);
                                break;
                            }
                        }
                        return a;
                    }
            }
        }, r = this._myIndex.records, i = {
        }, c = [];
        return r.forEach(({ $: o , i: h  })=>{
            if (M(o)) {
                let l = n(s, o, h);
                l.length && (i[h] || (i[h] = {
                    idx: h,
                    item: o,
                    matches: []
                }, c.push(i[h])), l.forEach(({ matches: a  })=>{
                    i[h].matches.push(...a);
                }));
            }
        }), c;
    }
    _searchObjectList(t) {
        let s = G(t, this.options), { keys: n , records: r  } = this._myIndex, i = [];
        return r.forEach(({ $: c , i: o  })=>{
            if (!M(c)) return;
            let h = [];
            n.forEach((l, a)=>{
                h.push(...this._findMatches({
                    key: l,
                    value: c[a],
                    searcher: s
                }));
            }), h.length && i.push({
                idx: o,
                item: c,
                matches: h
            });
        }), i;
    }
    _findMatches({ key: t , value: s , searcher: n  }) {
        if (!M(s)) return [];
        let r = [];
        if (x(s)) s.forEach(({ v: i , i: c , n: o  })=>{
            if (!M(i)) return;
            let { isMatch: h , score: l , indices: a  } = n.searchIn(i);
            h && r.push({
                score: l,
                key: t,
                value: i,
                idx: c,
                norm: o,
                indices: a
            });
        });
        else {
            let { v: i , n: c  } = s, { isMatch: o , score: h , indices: l  } = n.searchIn(i);
            o && r.push({
                score: h,
                key: t,
                value: i,
                norm: c,
                indices: l
            });
        }
        return r;
    }
};
k.version = "6.4.6";
k.createIndex = rt;
k.parseIndex = Tt;
k.config = f;
k.parseQuery = pt;
Ht(dt);
var Xt = k;
var tt1 = Object.create;
var X = Object.defineProperty;
var et1 = Object.getOwnPropertyDescriptor;
var nt1 = Object.getOwnPropertyNames;
var rt1 = Object.getPrototypeOf, it1 = Object.prototype.hasOwnProperty;
var ot1 = (u)=>X(u, "__esModule", {
        value: !0
    })
;
var st1 = (u, f1)=>()=>(f1 || u((f1 = {
            exports: {
            }
        }).exports, f1), f1.exports)
;
var at1 = (u, f2, i, e)=>{
    if (f2 && typeof f2 == "object" || typeof f2 == "function") for (let o of nt1(f2))!it1.call(u, o) && (i || o !== "default") && X(u, o, {
        get: ()=>f2[o]
        ,
        enumerable: !(e = et1(f2, o)) || e.enumerable
    });
    return u;
}, ut1 = (u, f3)=>at1(ot1(X(u != null ? tt1(rt1(u)) : {
    }, "default", !f3 && u && u.__esModule ? {
        get: ()=>u.default
        ,
        enumerable: !0
    } : {
        value: u,
        enumerable: !0
    })), u)
;
var H1 = st1((M1, Y1)=>{
    (function(u, f4) {
        typeof M1 == "object" && typeof Y1 == "object" ? Y1.exports = f4() : typeof define == "function" && define.amd ? define([], f4) : typeof M1 == "object" ? M1.template = f4() : u.template = f4();
    })(typeof self != "undefined" ? self : M1, function() {
        return (function(u) {
            function f5(e) {
                if (i[e]) return i[e].exports;
                var o = i[e] = {
                    i: e,
                    l: !1,
                    exports: {
                    }
                };
                return u[e].call(o.exports, o, o.exports, f5), o.l = !0, o.exports;
            }
            var i = {
            };
            return f5.m = u, f5.c = i, f5.d = function(e, o, p) {
                f5.o(e, o) || Object.defineProperty(e, o, {
                    configurable: !1,
                    enumerable: !0,
                    get: p
                });
            }, f5.n = function(e) {
                var o = e && e.__esModule ? function() {
                    return e.default;
                } : function() {
                    return e;
                };
                return f5.d(o, "a", o), o;
            }, f5.o = function(e, o) {
                return Object.prototype.hasOwnProperty.call(e, o);
            }, f5.p = "", f5(f5.s = 4);
        })([
            function(u, f, i) {
                "use strict";
                var e = i(6), o = i(2), p = i(22), a = function(r, t) {
                    t.onerror(r, t);
                    var n = function() {
                        return "{Template Error}";
                    };
                    return n.mappings = [], n.sourcesContent = [], n;
                }, s = function r(t) {
                    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
                    };
                    typeof t != "string" ? n = t : n.source = t, n = o.$extend(n), t = n.source, n.debug === !0 && (n.cache = !1, n.minimize = !1, n.compileDebug = !0), n.compileDebug && (n.minimize = !1), n.filename && (n.filename = n.resolveFilename(n.filename, n));
                    var l = n.filename, w = n.cache, m = n.caches;
                    if (w && l) {
                        var x1 = m.get(l);
                        if (x1) return x1;
                    }
                    if (!t) try {
                        t = n.loader(l, n), n.source = t;
                    } catch (h2) {
                        var d = new p({
                            name: "CompileError",
                            path: l,
                            message: "template not found: " + h2.message,
                            stack: h2.stack
                        });
                        if (n.bail) throw d;
                        return a(d, n);
                    }
                    var b1 = void 0, k1 = new e(n);
                    try {
                        b1 = k1.build();
                    } catch (h1) {
                        if (h1 = new p(h1), n.bail) throw h1;
                        return a(h1, n);
                    }
                    var T = function(h, E) {
                        try {
                            return b1(h, E);
                        } catch (j1) {
                            if (!n.compileDebug) return n.cache = !1, n.compileDebug = !0, r(n)(h, E);
                            if (j1 = new p(j1), n.bail) throw j1;
                            return a(j1, n)();
                        }
                    };
                    return T.mappings = b1.mappings, T.sourcesContent = b1.sourcesContent, T.toString = function() {
                        return b1.toString();
                    }, w && l && m.set(l, T), T;
                };
                s.Compiler = e, u.exports = s;
            },
            function(u, f6) {
                Object.defineProperty(f6, "__esModule", {
                    value: !0
                }), f6.default = /((['"])(?:(?!\2|\\).|\\(?:\r\n|[\s\S]))*(\2)?|`(?:[^`\\$]|\\[\s\S]|\$(?!\{)|\$\{(?:[^{}]|\{[^}]*\}?)*\}?)*(`)?)|(\/\/.*)|(\/\*(?:[^*]|\*(?!\/))*(\*\/)?)|(\/(?!\*)(?:\[(?:(?![\]\\]).|\\.)*\]|(?![\/\]\\]).|\\.)+\/(?:(?!\s*(?:\b|[\u0080-\uFFFF$\\'"~({]|[+\-!](?!=)|\.?\d))|[gmiyu]{1,5}\b(?![\u0080-\uFFFF$\\]|\s*(?:[+\-*%&|^<>!=?({]|\/(?![\/*])))))|(0[xX][\da-fA-F]+|0[oO][0-7]+|0[bB][01]+|(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?)|((?!\d)(?:(?!\s)[$\w\u0080-\uFFFF]|\\u[\da-fA-F]{4}|\\u\{[\da-fA-F]+\})+)|(--|\+\+|&&|\|\||=>|\.{3}|(?:[+\-\/%&|^]|\*{1,2}|<{1,2}|>{1,3}|!=?|={1,2})=?|[?~.,:;[\](){}])|(\s+)|(^$|[\s\S])/g, f6.matchToToken = function(i) {
                    var e = {
                        type: "invalid",
                        value: i[0]
                    };
                    return i[1] ? (e.type = "string", e.closed = !(!i[3] && !i[4])) : i[5] ? e.type = "comment" : i[6] ? (e.type = "comment", e.closed = !!i[7]) : i[8] ? e.type = "regex" : i[9] ? e.type = "number" : i[10] ? e.type = "name" : i[11] ? e.type = "punctuator" : i[12] && (e.type = "whitespace"), e;
                };
            },
            function(u, f, i) {
                "use strict";
                function e() {
                    this.$extend = function(b2) {
                        return b2 = b2 || {
                        }, p(b2, b2 instanceof e ? b2 : this);
                    };
                }
                var o = i(10), p = i(12), a = i(13), s = i(14), r = i(15), t = i(16), n = i(17), l = i(18), w = i(19), m = i(21), x2 = typeof window == "undefined", d = {
                    source: null,
                    filename: null,
                    rules: [
                        l,
                        n
                    ],
                    escape: !0,
                    debug: !!x2 && !1,
                    bail: !0,
                    cache: !0,
                    minimize: !0,
                    compileDebug: !1,
                    resolveFilename: m,
                    include: a,
                    htmlMinifier: w,
                    htmlMinifierOptions: {
                        collapseWhitespace: !0,
                        minifyCSS: !0,
                        minifyJS: !0,
                        ignoreCustomFragments: []
                    },
                    onerror: s,
                    loader: t,
                    caches: r,
                    root: "/",
                    extname: ".art",
                    ignore: [],
                    imports: o
                };
                e.prototype = d, u.exports = new e;
            },
            function(u, f) {
            },
            function(u, f, i) {
                "use strict";
                var e = i(5), o = i(0), p = i(23), a = function(s, r) {
                    return r instanceof Object ? e({
                        filename: s
                    }, r) : o({
                        filename: s,
                        source: r
                    });
                };
                a.render = e, a.compile = o, a.defaults = p, u.exports = a;
            },
            function(u, f, i) {
                "use strict";
                var e = i(0), o = function(p, a, s) {
                    return e(p, s)(a);
                };
                u.exports = o;
            },
            function(u, f, i) {
                "use strict";
                function e(O, c, g) {
                    return c in O ? Object.defineProperty(O, c, {
                        value: g,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : O[c] = g, O;
                }
                function o(O) {
                    if (Array.isArray(O)) {
                        for(var c = 0, g = Array(O.length); c < O.length; c++)g[c] = O[c];
                        return g;
                    }
                    return Array.from(O);
                }
                function p(O, c) {
                    if (!(O instanceof c)) throw new TypeError("Cannot call a class as a function");
                }
                var a = function() {
                    function O(c, g) {
                        for(var v1 = 0; v1 < g.length; v1++){
                            var y = g[v1];
                            y.enumerable = y.enumerable || !1, y.configurable = !0, "value" in y && (y.writable = !0), Object.defineProperty(c, y.key, y);
                        }
                    }
                    return function(c, g, v2) {
                        return g && O(c.prototype, g), v2 && O(c, v2), c;
                    };
                }(), s = i(7), r = i(9), t = "$data", n = "$imports", l = "print", w = "include", m = "extend", x3 = "block", d = "$$out", b3 = "$$line", k2 = "$$blocks", T = "$$slice", h = "$$from", E = "$$options", j2 = function(O, c) {
                    return Object.hasOwnProperty.call(O, c);
                }, P = JSON.stringify, L = function() {
                    function O(c) {
                        var g, v3, y = this;
                        p(this, O);
                        var _ = c.source, A1 = c.minimize, C = c.htmlMinifier;
                        if (this.options = c, this.stacks = [], this.context = [], this.scripts = [], this.CONTEXT_MAP = {
                        }, this.ignore = [
                            t,
                            n,
                            E
                        ].concat(o(c.ignore)), this.internal = (g = {
                        }, e(g, d, "''"), e(g, b3, "[0,0]"), e(g, k2, "arguments[1]||{}"), e(g, h, "null"), e(g, l, "function(){var s=''.concat.apply('',arguments);" + d + "+=s;return s}"), e(g, w, "function(src,data){var s=" + E + ".include(src,data||" + t + ",arguments[2]||" + k2 + "," + E + ");" + d + "+=s;return s}"), e(g, m, "function(from){" + h + "=from}"), e(g, T, "function(c,p,s){p=" + d + ";" + d + "='';c();s=" + d + ";" + d + "=p+s;return s}"), e(g, x3, "function(){var a=arguments,s;if(typeof a[0]==='function'){return " + T + "(a[0])}else if(" + h + "){if(!" + k2 + "[a[0]]){" + k2 + "[a[0]]=" + T + "(a[1])}else{" + d + "+=" + k2 + "[a[0]]}}else{s=" + k2 + "[a[0]];if(typeof s==='string'){" + d + "+=s}else{s=" + T + "(a[1])}return s}}"), g), this.dependencies = (v3 = {
                        }, e(v3, l, [
                            d
                        ]), e(v3, w, [
                            d,
                            E,
                            t,
                            k2
                        ]), e(v3, m, [
                            h,
                            w
                        ]), e(v3, x3, [
                            T,
                            h,
                            d,
                            k2
                        ]), v3), this.importContext(d), c.compileDebug && this.importContext(b3), A1) try {
                            _ = C(_, c);
                        } catch  {
                        }
                        this.source = _, this.getTplTokens(_, c.rules, this).forEach(function(S) {
                            S.type === r.TYPE_STRING ? y.parseString(S) : y.parseExpression(S);
                        });
                    }
                    return a(O, [
                        {
                            key: "getTplTokens",
                            value: function() {
                                return r.apply(void 0, arguments);
                            }
                        },
                        {
                            key: "getEsTokens",
                            value: function(c) {
                                return s(c);
                            }
                        },
                        {
                            key: "getVariables",
                            value: function(c) {
                                var g = !1;
                                return c.filter(function(v4) {
                                    return v4.type !== "whitespace" && v4.type !== "comment";
                                }).filter(function(v5) {
                                    return v5.type === "name" && !g || (g = v5.type === "punctuator" && v5.value === ".", !1);
                                }).map(function(v6) {
                                    return v6.value;
                                });
                            }
                        },
                        {
                            key: "importContext",
                            value: function(c) {
                                var g = this, v7 = "", y = this.internal, _ = this.dependencies, A2 = this.ignore, C = this.context, S = this.options, F = S.imports, N1 = this.CONTEXT_MAP;
                                j2(N1, c) || A2.indexOf(c) !== -1 || (j2(y, c) ? (v7 = y[c], j2(_, c) && _[c].forEach(function(I1) {
                                    return g.importContext(I1);
                                })) : v7 = c === "$escape" || c === "$each" || j2(F, c) ? n + "." + c : t + "." + c, N1[c] = v7, C.push({
                                    name: c,
                                    value: v7
                                }));
                            }
                        },
                        {
                            key: "parseString",
                            value: function(c) {
                                var g = c.value;
                                if (g) {
                                    var v8 = d + "+=" + P(g);
                                    this.scripts.push({
                                        source: g,
                                        tplToken: c,
                                        code: v8
                                    });
                                }
                            }
                        },
                        {
                            key: "parseExpression",
                            value: function(c) {
                                var g = this, v9 = c.value, y = c.script, _ = y.output, A3 = this.options.escape, C = y.code;
                                _ && (C = A3 === !1 || _ === r.TYPE_RAW ? d + "+=" + y.code : d + "+=$escape(" + y.code + ")");
                                var S = this.getEsTokens(C);
                                this.getVariables(S).forEach(function(F) {
                                    return g.importContext(F);
                                }), this.scripts.push({
                                    source: v9,
                                    tplToken: c,
                                    code: C
                                });
                            }
                        },
                        {
                            key: "checkExpression",
                            value: function(c) {
                                for(var g = [
                                    [
                                        /^\s*}[\w\W]*?{?[\s;]*$/,
                                        ""
                                    ],
                                    [
                                        /(^[\w\W]*?\([\w\W]*?(?:=>|\([\w\W]*?\))\s*{[\s;]*$)/,
                                        "$1})"
                                    ],
                                    [
                                        /(^[\w\W]*?\([\w\W]*?\)\s*{[\s;]*$)/,
                                        "$1}"
                                    ]
                                ], v10 = 0; v10 < g.length;){
                                    if (g[v10][0].test(c)) {
                                        var y;
                                        c = (y = c).replace.apply(y, o(g[v10]));
                                        break;
                                    }
                                    v10++;
                                }
                                try {
                                    return new Function(c), !0;
                                } catch  {
                                    return !1;
                                }
                            }
                        },
                        {
                            key: "build",
                            value: function() {
                                var c = this.options, g = this.context, v11 = this.scripts, y = this.stacks, _ = this.source, A4 = c.filename, C = c.imports, S = [], F = j2(this.CONTEXT_MAP, m), N2 = 0, I2 = function($, G1) {
                                    var q1 = G1.line, Q = G1.start, Z1 = {
                                        generated: {
                                            line: y.length + N2 + 1,
                                            column: 1
                                        },
                                        original: {
                                            line: q1 + 1,
                                            column: Q + 1
                                        }
                                    };
                                    return N2 += $.split(/\n/).length - 1, Z1;
                                }, z1 = function($) {
                                    return $.replace(/^[\t ]+|[\t ]$/g, "");
                                };
                                y.push("function(" + t + "){"), y.push("'use strict'"), y.push(t + "=" + t + "||{}"), y.push("var " + g.map(function($) {
                                    return $.name + "=" + $.value;
                                }).join(",")), c.compileDebug ? (y.push("try{"), v11.forEach(function($) {
                                    $.tplToken.type === r.TYPE_EXPRESSION && y.push(b3 + "=[" + [
                                        $.tplToken.line,
                                        $.tplToken.start
                                    ].join(",") + "]"), S.push(I2($.code, $.tplToken)), y.push(z1($.code));
                                }), y.push("}catch(error){"), y.push("throw {" + [
                                    "name:'RuntimeError'",
                                    "path:" + P(A4),
                                    "message:error.message",
                                    "line:" + b3 + "[0]+1",
                                    "column:" + b3 + "[1]+1",
                                    "source:" + P(_),
                                    "stack:error.stack"
                                ].join(",") + "}"), y.push("}")) : v11.forEach(function($) {
                                    S.push(I2($.code, $.tplToken)), y.push(z1($.code));
                                }), F && (y.push(d + "=''"), y.push(w + "(" + h + "," + t + "," + k2 + ")")), y.push("return " + d), y.push("}");
                                var U1 = y.join(`
`);
                                try {
                                    var D1 = new Function(n, E, "return " + U1)(C, c);
                                    return D1.mappings = S, D1.sourcesContent = [
                                        _
                                    ], D1;
                                } catch ($) {
                                    for(var W1 = 0, B1 = 0, J1 = 0, V1 = void 0; W1 < v11.length;){
                                        var R = v11[W1];
                                        if (!this.checkExpression(R.code)) {
                                            B1 = R.tplToken.line, J1 = R.tplToken.start, V1 = R.code;
                                            break;
                                        }
                                        W1++;
                                    }
                                    throw {
                                        name: "CompileError",
                                        path: A4,
                                        message: $.message,
                                        line: B1 + 1,
                                        column: J1 + 1,
                                        source: _,
                                        generated: V1,
                                        stack: $.stack
                                    };
                                }
                            }
                        }
                    ]), O;
                }();
                L.CONSTS = {
                    DATA: t,
                    IMPORTS: n,
                    PRINT: l,
                    INCLUDE: w,
                    EXTEND: m,
                    BLOCK: x3,
                    OPTIONS: E,
                    OUT: d,
                    LINE: b3,
                    BLOCKS: k2,
                    SLICE: T,
                    FROM: h,
                    ESCAPE: "$escape",
                    EACH: "$each"
                }, u.exports = L;
            },
            function(u, f, i) {
                "use strict";
                var e = i(8), o = i(1).default, p = i(1).matchToToken, a = function(s) {
                    return s.match(o).map(function(r) {
                        return o.lastIndex = 0, p(o.exec(r));
                    }).map(function(r) {
                        return r.type === "name" && e(r.value) && (r.type = "keyword"), r;
                    });
                };
                u.exports = a;
            },
            function(u, f, i) {
                "use strict";
                var e = {
                    abstract: !0,
                    await: !0,
                    boolean: !0,
                    break: !0,
                    byte: !0,
                    case: !0,
                    catch: !0,
                    char: !0,
                    class: !0,
                    const: !0,
                    continue: !0,
                    debugger: !0,
                    default: !0,
                    delete: !0,
                    do: !0,
                    double: !0,
                    else: !0,
                    enum: !0,
                    export: !0,
                    extends: !0,
                    false: !0,
                    final: !0,
                    finally: !0,
                    float: !0,
                    for: !0,
                    function: !0,
                    goto: !0,
                    if: !0,
                    implements: !0,
                    import: !0,
                    in: !0,
                    instanceof: !0,
                    int: !0,
                    interface: !0,
                    let: !0,
                    long: !0,
                    native: !0,
                    new: !0,
                    null: !0,
                    package: !0,
                    private: !0,
                    protected: !0,
                    public: !0,
                    return: !0,
                    short: !0,
                    static: !0,
                    super: !0,
                    switch: !0,
                    synchronized: !0,
                    this: !0,
                    throw: !0,
                    transient: !0,
                    true: !0,
                    try: !0,
                    typeof: !0,
                    var: !0,
                    void: !0,
                    volatile: !0,
                    while: !0,
                    with: !0,
                    yield: !0
                };
                u.exports = function(o) {
                    return e.hasOwnProperty(o);
                };
            },
            function(u, f, i) {
                "use strict";
                function e(a) {
                    var s = new String(a.value);
                    return s.line = a.line, s.start = a.start, s.end = a.end, s;
                }
                function o(a, s, r) {
                    this.type = a, this.value = s, this.script = null, r ? (this.line = r.line + r.value.split(/\n/).length - 1, this.line === r.line ? this.start = r.end : this.start = r.value.length - r.value.lastIndexOf(`
`) - 1) : (this.line = 0, this.start = 0), this.end = this.start + this.value.length;
                }
                var p = function(a, s) {
                    for(var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
                    }, t = [
                        new o("string", a)
                    ], n = 0; n < s.length; n++)for(var l = s[n], w = l.test.ignoreCase ? "ig" : "g", m = new RegExp(l.test.source, w), x4 = 0; x4 < t.length; x4++){
                        var d = t[x4], b4 = t[x4 - 1];
                        if (d.type === "string") {
                            for(var k3 = void 0, T = 0, h = [], E = d.value; (k3 = m.exec(E)) !== null;)k3.index > T && (b4 = new o("string", E.slice(T, k3.index), b4), h.push(b4)), b4 = new o("expression", k3[0], b4), k3[0] = e(b4), b4.script = l.use.apply(r, k3), h.push(b4), T = k3.index + k3[0].length;
                            T < E.length && (b4 = new o("string", E.slice(T), b4), h.push(b4)), t.splice.apply(t, [
                                x4,
                                1
                            ].concat(h)), x4 += h.length - 1;
                        }
                    }
                    return t;
                };
                p.TYPE_STRING = "string", p.TYPE_EXPRESSION = "expression", p.TYPE_RAW = "raw", p.TYPE_ESCAPE = "escape", u.exports = p;
            },
            function(u, f7, i) {
                "use strict";
                (function(e) {
                    function o(t) {
                        return typeof t != "string" && (t = t == null ? "" : typeof t == "function" ? o(t.call(t)) : JSON.stringify(t)), t;
                    }
                    function p(t) {
                        var n = "" + t, l = r.exec(n);
                        if (!l) return t;
                        var w = "", m = void 0, x5 = void 0, d = void 0;
                        for(m = l.index, x5 = 0; m < n.length; m++){
                            switch(n.charCodeAt(m)){
                                case 34:
                                    d = "&#34;";
                                    break;
                                case 38:
                                    d = "&#38;";
                                    break;
                                case 39:
                                    d = "&#39;";
                                    break;
                                case 60:
                                    d = "&#60;";
                                    break;
                                case 62:
                                    d = "&#62;";
                                    break;
                                default:
                                    continue;
                            }
                            x5 !== m && (w += n.substring(x5, m)), x5 = m + 1, w += d;
                        }
                        return x5 !== m ? w + n.substring(x5, m) : w;
                    }
                    var a = typeof self != "undefined" ? self : typeof window != "undefined" ? window : e !== void 0 ? e : {
                    }, s = Object.create(a), r = /["&'<>]/;
                    s.$escape = function(t) {
                        return p(o(t));
                    }, s.$each = function(t, n) {
                        if (Array.isArray(t)) for(var l = 0, w = t.length; l < w; l++)n(t[l], l);
                        else for(var m in t)n(t[m], m);
                    }, u.exports = s;
                }).call(f7, i(11));
            },
            function(u, f) {
                var i;
                i = (function() {
                    return this;
                })();
                try {
                    i = i || Function("return this")() || (0, eval)("this");
                } catch  {
                    typeof window == "object" && (i = window);
                }
                u.exports = i;
            },
            function(u, f, i) {
                "use strict";
                var e = Object.prototype.toString, o = function(a) {
                    return a === null ? "Null" : e.call(a).slice(8, -1);
                }, p = function a(s, r) {
                    var t = void 0, n = o(s);
                    if (n === "Object" ? t = Object.create(r || {
                    }) : n === "Array" && (t = [].concat(r || [])), t) {
                        for(var l in s)Object.hasOwnProperty.call(s, l) && (t[l] = a(s[l], t[l]));
                        return t;
                    }
                    return s;
                };
                u.exports = p;
            },
            function(u, f, i) {
                "use strict";
                var e = function(o, p, a, s) {
                    var r = i(0);
                    return s = s.$extend({
                        filename: s.resolveFilename(o, s),
                        bail: !0,
                        source: null
                    }), r(s)(p, a);
                };
                u.exports = e;
            },
            function(u, f, i) {
                "use strict";
                var e = function(o) {
                    console.error(o.name, o.message);
                };
                u.exports = e;
            },
            function(u, f, i) {
                "use strict";
                var e = {
                    __data: Object.create(null),
                    set: function(o, p) {
                        this.__data[o] = p;
                    },
                    get: function(o) {
                        return this.__data[o];
                    },
                    reset: function() {
                        this.__data = {
                        };
                    }
                };
                u.exports = e;
            },
            function(u, f, i) {
                "use strict";
                var e = typeof window == "undefined", o = function(p) {
                    if (e) return i(3).readFileSync(p, "utf8");
                    var a = document.getElementById(p);
                    return a.value || a.innerHTML;
                };
                u.exports = o;
            },
            function(u, f, i) {
                "use strict";
                var e = {
                    test: /{{([@#]?)[ \t]*(\/?)([\w\W]*?)[ \t]*}}/,
                    use: function(o, p, a, s) {
                        var r = this, t = r.options, n = r.getEsTokens(s), l = n.map(function(h) {
                            return h.value;
                        }), w = {
                        }, m = void 0, x6 = !!p && "raw", d = a + l.shift(), b5 = function(h, E) {
                            console.warn((t.filename || "anonymous") + ":" + (o.line + 1) + ":" + (o.start + 1) + `
Template upgrade: {{` + h + "}} -> {{" + E + "}}");
                        };
                        switch(p === "#" && b5("#value", "@value"), d){
                            case "set":
                                s = "var " + l.join("").trim();
                                break;
                            case "if":
                                s = "if(" + l.join("").trim() + "){";
                                break;
                            case "else":
                                var k4 = l.indexOf("if");
                                ~k4 ? (l.splice(0, k4 + 1), s = "}else if(" + l.join("").trim() + "){") : s = "}else{";
                                break;
                            case "/if":
                                s = "}";
                                break;
                            case "each":
                                m = e._split(n), m.shift(), m[1] === "as" && (b5("each object as value index", "each object value index"), m.splice(1, 1)), s = "$each(" + (m[0] || "$data") + ",function(" + (m[1] || "$value") + "," + (m[2] || "$index") + "){";
                                break;
                            case "/each":
                                s = "})";
                                break;
                            case "block":
                                m = e._split(n), m.shift(), s = "block(" + m.join(",").trim() + ",function(){";
                                break;
                            case "/block":
                                s = "})";
                                break;
                            case "echo":
                                d = "print", b5("echo value", "value");
                            case "print":
                            case "include":
                            case "extend":
                                if (l.join("").trim().indexOf("(") !== 0) {
                                    m = e._split(n), m.shift(), s = d + "(" + m.join(",") + ")";
                                    break;
                                }
                            default:
                                if (~l.indexOf("|")) {
                                    var T = n.reduce(function(h, E) {
                                        var j3 = E.value, P = E.type;
                                        return j3 === "|" ? h.push([]) : P !== "whitespace" && P !== "comment" && (h.length || h.push([]), j3 === ":" && h[h.length - 1].length === 1 ? b5("value | filter: argv", "value | filter argv") : h[h.length - 1].push(E)), h;
                                    }, []).map(function(h) {
                                        return e._split(h);
                                    });
                                    s = T.reduce(function(h, E) {
                                        var j4 = E.shift();
                                        return E.unshift(h), "$imports." + j4 + "(" + E.join(",") + ")";
                                    }, T.shift().join(" ").trim());
                                }
                                x6 = x6 || "escape";
                        }
                        return w.code = s, w.output = x6, w;
                    },
                    _split: function(o) {
                        o = o.filter(function(n) {
                            var l = n.type;
                            return l !== "whitespace" && l !== "comment";
                        });
                        for(var p = 0, a = o.shift(), s = /\]|\)/, r = [
                            [
                                a
                            ]
                        ]; p < o.length;){
                            var t = o[p];
                            t.type === "punctuator" || a.type === "punctuator" && !s.test(a.value) ? r[r.length - 1].push(t) : r.push([
                                t
                            ]), a = t, p++;
                        }
                        return r.map(function(n) {
                            return n.map(function(l) {
                                return l.value;
                            }).join("");
                        });
                    }
                };
                u.exports = e;
            },
            function(u, f, i) {
                "use strict";
                var e = {
                    test: /<%(#?)((?:==|=#|[=-])?)[ \t]*([\w\W]*?)[ \t]*(-?)%>/,
                    use: function(o, p, a, s) {
                        return a = ({
                            "-": "raw",
                            "=": "escape",
                            "": !1,
                            "==": "raw",
                            "=#": "raw"
                        })[a], p && (s = "/*" + s + "*/", a = !1), {
                            code: s,
                            output: a
                        };
                    }
                };
                u.exports = e;
            },
            function(u, f, i) {
                "use strict";
                function e(a) {
                    if (Array.isArray(a)) {
                        for(var s = 0, r = Array(a.length); s < a.length; s++)r[s] = a[s];
                        return r;
                    }
                    return Array.from(a);
                }
                var o = typeof window == "undefined", p = function(a, s) {
                    if (o) {
                        var r, t = i(20).minify, n = s.htmlMinifierOptions, l = s.rules.map(function(w) {
                            return w.test;
                        });
                        (r = n.ignoreCustomFragments).push.apply(r, e(l)), a = t(a, n);
                    }
                    return a;
                };
                u.exports = p;
            },
            function(u, f) {
                (function(i) {
                    i.noop = function() {
                    };
                })(typeof u == "object" && typeof u.exports == "object" ? u.exports : window);
            },
            function(u, f, i) {
                "use strict";
                var e = typeof window == "undefined", o = /^\.+\//, p = function(a, s) {
                    if (e) {
                        var r = i(3), t = s.root, n = s.extname;
                        if (o.test(a)) {
                            var l = s.filename, w = !l || a === l, m = w ? t : r.dirname(l);
                            a = r.resolve(m, a);
                        } else a = r.resolve(t, a);
                        r.extname(a) || (a += n);
                    }
                    return a;
                };
                u.exports = p;
            },
            function(u, f, i) {
                "use strict";
                function e(r, t) {
                    if (!(r instanceof t)) throw new TypeError("Cannot call a class as a function");
                }
                function o(r, t) {
                    if (!r) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || typeof t != "object" && typeof t != "function" ? r : t;
                }
                function p(r, t) {
                    if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    r.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: r,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(r, t) : r.__proto__ = t);
                }
                function a(r) {
                    var t = r.name, n = r.source, l = r.path, w = r.line, m = r.column, x7 = r.generated, d = r.message;
                    if (!n) return d;
                    var b6 = n.split(/\n/), k5 = Math.max(w - 3, 0), T = Math.min(b6.length, w + 3), h = b6.slice(k5, T).map(function(E, j5) {
                        var P = j5 + k5 + 1;
                        return (P === w ? " >> " : "    ") + P + "| " + E;
                    }).join(`
`);
                    return (l || "anonymous") + ":" + w + ":" + m + `
` + h + `

` + t + ": " + d + (x7 ? `
   generated: ` + x7 : "");
                }
                var s = function(r) {
                    function t(n) {
                        e(this, t);
                        var l = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, n.message));
                        return l.name = "TemplateError", l.message = a(n), Error.captureStackTrace && Error.captureStackTrace(l, l.constructor), l;
                    }
                    return p(t, r), t;
                }(Error);
                u.exports = s;
            },
            function(u, f, i) {
                "use strict";
                u.exports = i(2);
            }
        ]);
    });
});
var K1 = ut1(H1()), ft1 = K1.default;
function searchAll(key, index, counter) {
    let fuse = new Xt(index, {
        shouldSort: true,
        distance: 10000,
        keys: [
            {
                name: 'title',
                weight: 2
            },
            {
                name: 'tags',
                weight: 1.5
            },
            {
                name: 'content',
                weight: 1
            }, 
        ]
    });
    let result = fuse.search(key);
    if (result.length > 0) {
        document.getElementById('search-result').innerHTML = ft1('search-result-template', result);
        return [
            new Date().getTime() - counter,
            result.length
        ];
    } else {
        return 'notFound';
    }
}
let urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('s')) {
    let counter = new Date().getTime();
    let infoElements = document.querySelectorAll('.search-result-info');
    let key = urlParams.get('s');
    document.querySelector('.search-input input').setAttribute('value', key);
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'index.json', true);
    xhr.responseType = 'json';
    xhr.onerror = function() {
        infoElements[2].removeAttribute('style');
    };
    xhr.ontimeout = function() {
        infoElements[2].removeAttribute('style');
    };
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const result = searchAll(key, xhr.response, counter);
                if (result === 'notFound') {
                    infoElements[1].removeAttribute('style');
                } else {
                    infoElements[0].innerHTML = infoElements[0].innerHTML.replace('[TIME]', result[0]);
                    infoElements[0].innerHTML = infoElements[0].innerHTML.replace('[NUM]', result[1]);
                    infoElements[0].removeAttribute('style');
                }
            } else {
                infoElements[2].removeAttribute('style');
            }
        }
    };
    xhr.send(null);
}
