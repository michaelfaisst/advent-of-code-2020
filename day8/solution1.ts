import { readFileSync } from "fs";
import { join } from "path";

enum Command {
  nop = "nop",
  acc = "acc",
  jmp = "jmp",
}

interface ICommand {
  command: Command;
  value: number;
}

const executedCommands = new Set();
let commandIndex = 0;
let acc = 0;

const createCommandObjects = (commandString: string): ICommand => {
  const [_, command, value] = /(nop|acc|jmp) ((?:\+|-)\d*)/.exec(commandString);

  return {
    command: Command[command],
    value: +value,
  };
};

const executeCommand = (command: ICommand) => {
  switch (command.command) {
    case Command.nop:
      commandIndex++;
      break;
    case Command.jmp:
      commandIndex += command.value;
      break;
    case Command.acc:
      acc += command.value;
      commandIndex++;
      break;
  }
};

const commands = readFileSync(join(__dirname, "input.txt"), "utf-8")
  .split("\r\n")
  .map(createCommandObjects);

while (true) {
  if (commands[commandIndex] == null) {
    break;
  }

  if (!executedCommands.has(commandIndex)) {
    executedCommands.add(commandIndex);
  } else {
    break;
  }

  executeCommand(commands[commandIndex]);
}

export const result = acc;
