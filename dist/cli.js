"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var index_1 = require("./index");
var minimist_1 = __importDefault(require("minimist"));
var args = (0, minimist_1["default"])(process.argv.slice(2));
var path = args.path || index_1.defaultConfig.path;
var encoding = args.encoding || index_1.defaultConfig.options.encoding;
var config = { options: { encoding: encoding }, path: path };
(0, index_1.generate)(config);
//# sourceMappingURL=cli.js.map