import { load as yamlLoad } from "js-yaml";
import { readFileSync, writeFileSync } from "fs";
import Config from "./interfaces/Config";

export const defaultConfig: Config = {
  path: "./env.yaml",
  options: {
    encoding: "utf8"
  }
};

export function parseWith(userConfig?: Config) {
  const { path, options } = Object.assign({ ...defaultConfig }, userConfig);
  const data: { [key: string]: any } = (() => {
    try {
      const data = yamlLoad(readFileSync(path, options));
      return data;
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }
  })();

  const keys = Object.keys(data);
  keys.forEach((key) => (data[key] = JSON.stringify(data[key])));
  return data || {};
}

// export function removeWrapper(str: string, wrappers: string[] = ['"', "'", "`"]) {
//   const charGroup = "(" + wrappers.join("|") + ")";
//   const exp = new RegExp(`^${charGroup}(?=.*)$1$`);
//   return str.replace(exp, "");
// }

export function generate(userConfig?: Config) {
  const data = parseWith(userConfig);
  const keys = Object.keys(data);
  const str = keys.reduce((acc, entry) => {
    const line = entry + "=" + data[entry] + "\n";
    return (acc += line);
  }, "");
  writeFileSync(".env", str);
}
