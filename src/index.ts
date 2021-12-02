import { load as yamlLoad } from "js-yaml";
import { readFileSync, writeFileSync, copyFileSync, rmSync } from "fs";
import Config from "./interfaces/Config";

const tempFile = "./dotenver.yaml";

export const defaultConfig: Config = {
  options: {
    encoding: "utf8"
  }
};

export function parseWith(userConfig?: Config) {
  const { options } = Object.assign({ ...defaultConfig }, userConfig);

  let data: { [key: string]: any } = {};
  try {
    data = yamlLoad(readFileSync(tempFile, options)) as { [key: string]: any };
  } catch (err: any) {
    throw new Error(err);
  }
  return data;
}

export function generateDotEnv(userConfig?: Config) {
  const data = parseWith(userConfig);
  const keys = Object.keys(data);
  const str = keys.reduce((acc, entry) => {
    const line = entry + "=" + data[entry] + "\n";
    return (acc += line);
  }, "");
  writeFileSync(".env", str);
}

export function generateTempYaml(source: string) {
  if (!source) throw new Error("You must provide a source");
  copyFileSync(source, tempFile);
  console.log("Copied " + source + " into temp file " + tempFile);
}

export function clean() {
  rmSync(tempFile);
}
