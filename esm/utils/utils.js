import { isNumber, isString, isUndef, lazyFun, selectCached, } from "@wormery/utils";
import path from "path";
import { toRefs, ref, isVNode, Fragment, } from "vue";
import { computed } from "vue";
import { PE, rgb } from "@wormery/wtsc";
export function toPX(width) {
    if (isNumber(width)) {
        return width + "px";
    }
    if (isString(width)) {
        return width;
    }
    return "";
}
export function toNumber(num) {
    return parseInt(num);
}
export const getUnit = lazyFun(selectCached, (() => {
    const unit = /[a-zA-Z]+/;
    return (str, isCached = true) => {
        return str.slice(str.search(unit));
    };
})());
export function getUrlPre() {
    return window.location.href;
}
export function filterUrl(url) {
    if (url.startsWith("./")) {
        url = path.normalize(url);
        console.log(url);
        return `${getUrlPre()}${url.slice(2)}`;
    }
    return url;
}
export function getDOMCor(x) {
    return window.getComputedStyle(x, null)["color"];
}
export function defaults(obj, defaults) {
    var _a;
    const _obj = obj;
    for (const key in defaults) {
        defaults[key] = (_a = _obj[key]) !== null && _a !== void 0 ? _a : defaults[key];
    }
    return defaults;
}
export function withDefaultsOfToRefs(obj, defaults) {
    const refObj = toRefs(obj);
    for (const key in defaults) {
        const k = key;
        if (isUndef(refObj[k])) {
            refObj[k] = ref(defaults[k]);
            continue;
        }
        if (isUndef(refObj[k].value)) {
            refObj[k] = computed(() => {
                if (isUndef(refObj[k].value)) {
                    return defaults[k];
                }
                return refObj[k].value;
            });
        }
    }
    return refObj;
}
export function defaul(p, defaul) {
    return p !== null && p !== void 0 ? p : defaul;
}
export function condStyle(boolean, style) {
    return boolean ? style : {};
}
export function condStyleByRef(boolean, style) {
    return condStyle(boolean.value, style);
}
/**
 * Resolve slot with wrapper if content exists, no fallback
 */
export function resolveWrappedSlot(slot, wrapper) {
    const children = slot && ensureValidVNode(slot());
    return wrapper(children || null);
}
function ensureValidVNode(vnodes) {
    return vnodes.some((child) => {
        if (!isVNode(child)) {
            return true;
        }
        if (child.type === Comment) {
            return false;
        }
        if (child.type === Fragment &&
            !ensureValidVNode(child.children)) {
            return false;
        }
        return true;
    })
        ? vnodes
        : null;
}
export function ifReturn(condition, vlaue) {
    return condition ? vlaue : undefined;
}
const reg = /^rgba?\((?<r> ?[0-9]{0,3}),(?<g> ?[0-9]{0,3}),(?<b> ?[0-9]{0,3})(,(?<a> ?0?\.?[0-9]{0,3})|)\)$/;
export function rgbStrToRGB(c) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const ret = reg.exec(c);
    const obj = {
        r: (_b = (_a = ret === null || ret === void 0 ? void 0 : ret.groups) === null || _a === void 0 ? void 0 : _a.r) !== null && _b !== void 0 ? _b : "0",
        g: (_d = (_c = ret === null || ret === void 0 ? void 0 : ret.groups) === null || _c === void 0 ? void 0 : _c.g) !== null && _d !== void 0 ? _d : "0",
        b: (_f = (_e = ret === null || ret === void 0 ? void 0 : ret.groups) === null || _e === void 0 ? void 0 : _e.b) !== null && _f !== void 0 ? _f : "0",
        a: (_h = (_g = ret === null || ret === void 0 ? void 0 : ret.groups) === null || _g === void 0 ? void 0 : _g.a) !== null && _h !== void 0 ? _h : "1",
    };
    Object.keys(obj).forEach((key) => {
        const value = obj[key];
        if (obj[key].endsWith("%")) {
            const n = parseInt(value.slice(0, value.length - 1), 10);
            obj[key] = PE(isNaN(n) ? 0 : n);
        }
        else {
            const n = parseInt(value, 10);
            obj[key] = PE(isNaN(n) ? 0 : n);
        }
    });
    return rgb(obj.r, obj.g, obj.b, obj.a);
}
export function defEmitUpdate(emit, props) {
    return (valueName, value) => {
        emit("update:" + valueName, value);
    };
}
//# sourceMappingURL=utils.js.map