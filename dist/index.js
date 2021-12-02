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
exports.clean = exports.generateTempYaml = exports.generateDotEnv = exports.stripWrapper = exports.parseWith = exports.defaultConfig = exports.tempFile = void 0;
var js_yaml_1 = require("js-yaml");
var fs_1 = require("fs");
exports.tempFile = "./dotenver.yaml";
exports.defaultConfig = {
    options: {
        encoding: "utf8"
    }
};
function parseWith(userConfig) {
    var options = Object.assign(__assign({}, exports.defaultConfig), userConfig).options;
    var data = (function () {
        try {
            var data_1 = (0, js_yaml_1.load)((0, fs_1.readFileSync)(exports.tempFile, options));
            return data_1;
        }
        catch (err) {
            throw new Error(err.message);
        }
    })();
    var keys = Object.keys(data);
    keys.forEach(function (key) { return (data[key] = JSON.stringify(data[key])); });
    return data || {};
}
exports.parseWith = parseWith;
function stripWrapper(str) {
    var newStr = str.replace(/^"?(.+?)"?$/, "$1");
    if (newStr === str) {
        newStr = str.replace(/^'?(.+?)'?$/, "$1");
    }
    if (newStr === str) {
        newStr = str.replace(/^`?(.+?)`?$/, "$1");
    }
    return newStr;
}
exports.stripWrapper = stripWrapper;
function generateDotEnv(userConfig) {
    var data = parseWith(userConfig);
    var keys = Object.keys(data);
    var str = keys.reduce(function (acc, entry) {
        var line = entry + "=" + stripWrapper(data[entry]) + "\n";
        return (acc += line);
    }, "");
    (0, fs_1.writeFileSync)(".env", str);
}
exports.generateDotEnv = generateDotEnv;
function generateTempYaml(source) {
    if (!source)
        throw new Error("You must provide a source");
    (0, fs_1.copyFileSync)(source, exports.tempFile);
    console.log("Copied " + source + " into temp file " + exports.tempFile);
}
exports.generateTempYaml = generateTempYaml;
function clean() {
    (0, fs_1.rmSync)(exports.tempFile);
}
exports.clean = clean;
//# sourceMappingURL=index.js.map