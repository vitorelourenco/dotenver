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
exports.clean = exports.generateTempYaml = exports.generateDotEnv = exports.parseWith = exports.defaultConfig = void 0;
var js_yaml_1 = require("js-yaml");
var fs_1 = require("fs");
var tempFile = "./dotenver.yaml";
exports.defaultConfig = {
    options: {
        encoding: "utf8"
    }
};
function parseWith(userConfig) {
    var options = Object.assign(__assign({}, exports.defaultConfig), userConfig).options;
    var data = {};
    try {
        data = (0, js_yaml_1.load)((0, fs_1.readFileSync)(tempFile, options));
    }
    catch (err) {
        throw new Error(err);
    }
    return data;
}
exports.parseWith = parseWith;
function generateDotEnv(userConfig) {
    var data = parseWith(userConfig);
    var keys = Object.keys(data);
    var str = keys.reduce(function (acc, entry) {
        var line = entry + "=" + data[entry] + "\n";
        return (acc += line);
    }, "");
    (0, fs_1.writeFileSync)(".env", str);
}
exports.generateDotEnv = generateDotEnv;
function generateTempYaml(source) {
    if (!source)
        throw new Error("You must provide a source");
    (0, fs_1.copyFileSync)(source, tempFile);
    console.log("Copied " + source + " into temp file " + tempFile);
}
exports.generateTempYaml = generateTempYaml;
function clean() {
    (0, fs_1.rmSync)(tempFile);
}
exports.clean = clean;
//# sourceMappingURL=index.js.map