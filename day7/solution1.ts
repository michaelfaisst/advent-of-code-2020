import { readFileSync } from "fs";
import { join } from "path";

interface IRuleSet {
  [key: string]: {
    color: string;
    count: number;
  }[];
}

const ruleStrings = readFileSync(join(__dirname, "input.txt"), "utf-8").split(
  "\r\n"
);

const colorRegex = /^(\w* \w*) .*$/;
const containsRegex = /(\d{1,2}) (\w* \w*)/g;

const transformRuleString = (ruleString: string, rules: IRuleSet) => {
  const color = colorRegex.exec(ruleString);

  if (!color) return;

  rules[color[1]] = [];

  const bags = [...ruleString.matchAll(containsRegex)];

  if (!bags) return;

  for (const bag of bags) {
    rules[color[1]].push({
      color: bag[2],
      count: +bag[1],
    });
  }
};

const traverseColor = (color: string): boolean => {
  if (color === "shiny gold") {
    return true;
  }

  return rules[color].some((bag) => traverseColor(bag.color));
};

const rules: IRuleSet = {};
ruleStrings.forEach((ruleString) => transformRuleString(ruleString, rules));

const result = Object.keys(rules).reduce((acc, color) => {
  const valid = color === "shiny gold" ? false : traverseColor(color);
  return valid ? acc + 1 : acc;
}, 0);

export { result };
