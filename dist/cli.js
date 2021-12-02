"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var index_1 = require("./index");
var minimist_1 = __importDefault(require("minimist"));
var args = (0, minimist_1["default"])(process.argv.slice(2));
var _ = args._;
if (_.includes("prepare")) {
    var source = args.s;
    (0, index_1.generateTempYaml)(source);
}
else {
    var encoding = args.encoding || index_1.defaultConfig.options.encoding;
    var config = { options: { encoding: encoding } };
    (0, index_1.generateDotEnv)(config);
}
//# sourceMappingURL=cli.js.map