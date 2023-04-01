import File from '../structure/File';
import State from '../structure/State';
import { getDirFromPath } from './cd';

export const ll = async (args: string[]): Promise<string> => {
  return await ls(['-l', ...args]);
};

export const ls = async (args: string[]): Promise<string> => {
  let paths = [];
  let flags = [];

  // Get dir
  for (let index = 0; index < args.length; index++) {
    let current = args[index].trim();
    if (current === '') {
      continue;
    } else if (current.startsWith('-')) {
      current.split('').forEach((flag) => {
        if (flag !== '-') {
          flags.push(flag);
        }
      });
      continue;
    } else {
      let dir = await getDirFromPath(current);
      if (dir instanceof File) {
        paths.push(dir);
      } else {
        return `${current}: No such file or directory`;
      }
    }
  }
  if (paths.length === 0) {
    paths.push(State.instance.dir);
  }

  // Generate lists
  if (flags.includes('l')) {
    return await generateLongListPrint(paths);
  }

  return await generateNormalListPrint(paths);
};

export const generateNormalListPrint = async (
  paths: File[],
): Promise<string> => {
  // Generate lists
  let lists = [];
  for (let index = 0; index < paths.length; index++) {
    let current = paths[index];
    lists.push(
      current
        .getChildren()
        .map((file) => file.name)
        .join(' '),
    );
  }

  // Return lists
  if (lists.length === 1) {
    return lists[0];
  }

  let returnString = '';
  for (let index = 0; index < lists.length; index++) {
    let current = lists[index];
    if (index !== 0) {
      returnString += '\n\n';
    }
    returnString += `${paths[index].name}:\n${current}`;
  }
  return returnString;
};

export const generateLongListPrint = async (paths: File[]): Promise<string> => {
  // Generate lists
  let lists = [];
  for (let index = 0; index < paths.length; index++) {
    let current = paths[index];

    let children = current.getChildren();
    let childList = `total ${children.length}\n<table>`;

    childList += `<tr><td>${current.metadata}</td><td>${current.size}</td><td>${
      current.owner?.username ?? '-'
    }</td><td>./</td></tr>`;
    let parent = current.getParent();
    if (parent) {
      childList += `<tr><td>${parent.metadata}</td><td>${parent.size}</td><td>${
        parent.owner?.username ?? '-'
      }</td><td>../</td></tr>`;
    }

    children.forEach((child) => {
      let metadata = child.metadata;
      let owner = child.owner?.username ?? '-';
      let size = child.size;
      let name = child.name;
      childList += `<tr><td>${metadata}</td><td>${size}</td><td>${owner}</td><td>${name}</td></tr>`;
    });
    childList += '</table>';

    lists.push(childList);
  }

  // Return lists
  if (lists.length === 1) {
    return lists[0];
  }

  let returnString = '';
  for (let index = 0; index < lists.length; index++) {
    let current = lists[index];
    if (index !== 0) {
      returnString += '\n\n';
    }
    returnString += `${paths[index].name}:\n${current}`;
  }

  return returnString;
};
