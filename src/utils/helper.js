

export const setItem = (key, value) => {
    localStorage.setItem(key, value);
};

export const getItem = (key) => {
    const item = localStorage.getItem(key);
    if (item) {
        return JSON.parse(item);
    }
    return null;
};

export const removeItem = (key) => {
    localStorage.removeItem(key);
};

export const clearStorage = () => {
    localStorage.clear();
};

export const browserDetect = (function () {
    var test = function (regexp) { return regexp.test(window.navigator.userAgent) }
    switch (true) {
        case test(/edg/i): return "Microsoft Edge";
        case test(/trident/i): return "Microsoft Internet Explorer";
        case test(/firefox|fxios/i): return "Mozilla Firefox";
        case test(/opr\//i): return "Opera";
        case test(/ucbrowser/i): return "UC Browser";
        case test(/samsungbrowser/i): return "Samsung Browser";
        case test(/chrome|chromium|crios/i): return "Google Chrome";
        case test(/safari/i): return "Apple Safari";
        default: return "Other";
    }
})();