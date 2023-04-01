import React from 'react';
import { History } from './interface';
import State from '../../utils/structure/State';
import User from '../../utils/structure/User';
import File from '../../utils/structure/File';

export const useHistory = (defaultValue: Array<History>) => {
  const [history, setHistory] = React.useState<Array<History>>(defaultValue);
  const [command, setCommand] = React.useState<string>('');
  const [lastCommandIndex, setLastCommandIndex] = React.useState<number>(0);

  return {
    history,
    command,
    lastCommandIndex,
    setHistory: (
      value: string,
      user: User = State.instance.user,
      dir: File = State.instance.dir,
    ) =>
      setHistory([
        ...history,
        {
          id: history.length,
          date: new Date(),
          user: user,
          directory: dir,
          command,
          output: value,
        },
      ]),
    setCommand,
    setLastCommandIndex,
    clearHistory: () => setHistory([]),
  };
};
