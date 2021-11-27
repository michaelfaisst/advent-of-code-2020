import { readFileSync } from "fs";
import { join } from "path";

const input = readFileSync(join(__dirname, "input.txt"), "utf-8");
const passports = input.split("\n\n");
const requiredProps = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

let validPassports = 0;

interface IValidators {
  [key: string]: (value: string) => boolean;
}

const validators: IValidators = {
  byr: (value: string) => +value >= 1920 && +value <= 2002,
  iyr: (value: string) => +value >= 2010 && +value <= 2020,
  eyr: (value: string) => +value >= 2020 && +value <= 2030,
  hcl: (value: string) => /#(?:[0-9]|[a-f]){6}/.test(value),
  ecl: (value: string) => /amb|blu|brn|gry|grn|hzl|oth/.test(value),
  pid: (value: string) => /^\d{9}$/.test(value),
  cid: (_: string) => true,
  hgt: (value: string) => {
    const match = /(\d*)(cm|in)/.exec(value);

    if (!match) return false;
    const height = +match[1];

    return match[2] === "cm"
      ? height >= 150 && height <= 193
      : height >= 59 && height <= 76;
  },
};

for (let passport of passports) {
  const passportLines = passport.split(/[ \n]/).map((line) => line.split(":"));
  const passportProps = passportLines.map((x) => x[0]);

  if (
    !requiredProps.every((requiredProp) => passportProps.includes(requiredProp))
  ) {
    continue;
  }

  let valid = true;

  for (let passportLine of passportLines) {
    const [key, value] = passportLine;
    valid = valid && validators[key](value);
  }

  if (valid) {
    validPassports++;
  }
}

export const result = validPassports;
