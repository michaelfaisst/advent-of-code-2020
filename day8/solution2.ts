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

const initVariables = () => {
  executedCommands.clear();
  commandIndex = 0;
  acc = 0;
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

const runProgram = (commands: ICommand[]) => {
  initVariables();

  while (true) {
    if (commands[commandIndex] == undefined) {
      return true;
    }

    if (!executedCommands.has(commandIndex)) {
      executedCommands.add(commandIndex);
    } else {
      return false;
    }

    executeCommand(commands[commandIndex]);
  }
};

const flipCommandAtIndex = (commands: ICommand[], changeIndex: number) => {
  for (let i = changeIndex; i < commands.length; i++) {
    flipCommand(commands[i]);
    return i;
  }
};

const flipCommand = (command: ICommand) => {
  if (command.command === Command.acc) {
    return command;
  }

  command.command = command.command === Command.nop ? Command.jmp : Command.nop;

  return command;
};

const commands = readFileSync(join(__dirname, "input.txt"), "utf-8")
  .split("\r\n")
  .map(createCommandObjects);

let changeIndex = 0;

while (true) {
  changeIndex = flipCommandAtIndex(commands, changeIndex);
  const terminated = runProgram(commands);

  if (terminated) {
    break;
  }

  flipCommand(commands[changeIndex]);
  changeIndex++;
}

export const result = acc;
