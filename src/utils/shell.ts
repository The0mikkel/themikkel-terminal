import React from 'react';
import * as bin from './bin';
import State from './structure/State';
import File from './structure/File';
import User from './structure/User';

export const shell = async (
  command: string,
  setHistory: (
    value: string,
    user: User | undefined,
    dir: File | undefined,
  ) => void,
  clearHistory: () => void,
  setCommand: React.Dispatch<React.SetStateAction<string>>,
) => {
  const args = command.split(' ');
  args[0] = args[0].toLowerCase();

  if (args[0] === 'clear') {
    clearHistory();
  } else if (command === '') {
    setHistory('', undefined, undefined);
  } else if (Object.keys(bin).indexOf(args[0]) === -1) {
    setHistory(
      `shell: command not found: ${args[0]}. Try 'help' to get started.`,
      undefined,
      undefined,
    );
  } else {
    let user = State.instance.user;
    let dir = State.instance.dir;
    const output = await bin[args[0]](args.slice(1));
    setHistory(output, user, dir);
  }

  setCommand('');
};
