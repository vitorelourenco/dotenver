"use strict";

import { load as yamlLoad } from "js-yaml";
import { readFileSync, writeFileSync, copyFileSync, rmSync } from "fs";
import Config from "./interfaces/Config";

export const tempFile = "./dotenver.yaml";

export const defaultConfig: Config = {
  options: {
    encoding: "utf8"
  }
};

export function parseWith(userConfig?: Config) {
  const { options } = Object.assign({ ...defaultConfig }, userConfig);
  const data: { [key: string]: any } = (() => {
    try {
      const data = yamlLoad(readFileSync(tempFile, options));
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  })();

  const keys = Object.keys(data);
  keys.forEach((key) => (data[key] = JSON.stringify(data[key])));
  return data || {};
}

export function stripWrapper(str: string) {
  let newStr = str.replace(/^"?(.+?)"?$/, "$1");
  if (newStr === str) {
    newStr = str.replace(/^'?(.+?)'?$/, "$1");
  }
  if (newStr === str) {
    newStr = str.replace(/^`?(.+?)`?$/, "$1");
  }
  return newStr;
}

export function generateDotEnv(userConfig?: Config) {
  const data = parseWith(userConfig);
  const keys = Object.keys(data);
  const str = keys.reduce((acc, entry) => {
    const line = entry + "=" + stripWrapper(data[entry]) + "\n";
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
