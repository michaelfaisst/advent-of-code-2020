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

const traverseColor = (color: string): number => {
  if (rules[color].length === 0) return 0;

  return rules[color].reduce((acc, bag) => {
    return acc + bag.count + bag.count * traverseColor(bag.color);
  }, 0);
};

const rules: IRuleSet = {};
ruleStrings.forEach((ruleString) => transformRuleString(ruleString, rules));

const result = traverseColor("shiny gold");

export { result };
