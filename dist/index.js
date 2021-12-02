"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.generate = exports.parseWith = exports.defaultConfig = void 0;
var js_yaml_1 = require("js-yaml");
var fs_1 = require("fs");
exports.defaultConfig = {
    path: "./env.yaml",
    options: {
        encoding: "utf8"
    }
};
function parseWith(userConfig) {
    var _a = Object.assign(__assign({}, exports.defaultConfig), userConfig), path = _a.path, options = _a.options;
    var data = (function () {
        try {
            var data_1 = (0, js_yaml_1.load)((0, fs_1.readFileSync)(path, options));
            return data_1;
        }
        catch (err) {
            console.error(err);
            throw new Error(err.message);
        }
    })();
    var keys = Object.keys(data);
    keys.forEach(function (key) { return (data[key] = JSON.stringify(data[key])); });
    return data || {};
}
exports.parseWith = parseWith;
function generate(userConfig) {
    var data = parseWith(userConfig);
    var keys = Object.keys(data);
    var str = keys.reduce(function (acc, entry) {
        var line = entry + "=" + data[entry] + "\n";
        return (acc += line);
    }, "");
    (0, fs_1.writeFileSync)(".env", str);
}
exports.generate = generate;
//# sourceMappingURL=index.js.map