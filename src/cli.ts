import {
  defaultConfig,
  generateDotEnv,
  generateTempYaml
} from "./index";
import minismist from "minimist";
import Config from "./interfaces/Config";

const args = minismist(process.argv.slice(2));
const { _ } = args;

if (_.includes("prepare")) {
  const source = args.s;
  generateTempYaml(source);
} else {
  const encoding = args.encoding || defaultConfig.options.encoding;
  const config: Config = { options: { encoding } };
  generateDotEnv(config);
}
