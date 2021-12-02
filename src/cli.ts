import { defaultConfig, generate } from "./index";
import minismist from "minimist";
import Config from "./interfaces/Config";

const args = minismist(process.argv.slice(2));

const path = args.path || defaultConfig.path;
const encoding = args.encoding || defaultConfig.options.encoding;

const config: Config = { options: { encoding }, path };
generate(config);
