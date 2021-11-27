import { readFileSync } from "fs";
import { join } from "path";

const input = readFileSync(join(__dirname, "input.txt"), "utf-8");
const passports = input.split("\n\n");
const requiredProps = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

let validPassports = 0;

for (let passport of passports) {
  const passPortProps = passport
    .split(/[ \n]/)
    .map((line) => line.split(":")[0]);

  if (
    requiredProps.every((requiredProp) => passPortProps.includes(requiredProp))
  ) {
    validPassports++;
  }
}

export const result = validPassports;
