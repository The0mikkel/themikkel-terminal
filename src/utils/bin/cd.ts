import File from '../structure/File';
import State from '../structure/State';

export const cd = async (args: string[]): Promise<string> => {
  let originalPath = '';

  // Retrieve change string
  if (args.length === 0 || args[0].trim().length === 0) {
    originalPath = '~';
  } else {
    originalPath = args[0].trim();
  }

  let changeTo = await getDirFromPath(originalPath);
  if (changeTo instanceof File) {
    State.instance.dir = changeTo;
    return '';
  } else {
    return `${originalPath}: No such file or directory`;
  }
};

/**
 * Get a directory from a path
 * 
 * @param inputPath The path to get the directory from
 * @returns The directory (File class) or undefined if it doesn't exist
 */
export const getDirFromPath = async (
  inputPath: string,
): Promise<File | undefined> => {
  let output = await getFileFromPath(inputPath);

  return output?.isDirectory() ? output : undefined;
};


export const getFileFromPath = async (
  inputPath: string,
): Promise<File | undefined> => {
  let originalPath = inputPath;
  let startRoot = false;
  let startUser = false;
  let path = [];

  // Check if change is starting at root dir level or user level
  if (originalPath === '/') {
    startRoot = true;
  } else if (
    !originalPath ||
    originalPath === '' ||
    originalPath.startsWith('~')
  ) {
    startUser = true;
    originalPath = originalPath.slice(1);
  }

  // Split path into array
  path = originalPath.split('/');

  // Set start file
  let startFile = State.instance.dir;
  if (startRoot) {
    startFile = State.instance.root;
  } else if (startUser) {
    startFile = State.instance.user.getHome();
  }

  // Get new file
  let changeTo = startFile;
  for (let i = 0; i < path.length; i++) {
    if (path[i] === '') {
      continue;
    }
    if (path[i] === '.') {
      continue;
    }
    if (path[i] === '..') {
      changeTo = changeTo.getParent();
      if (changeTo === undefined) {
        return undefined;
      }
      continue;
    }
    changeTo = changeTo.getChild(path[i]);
    if (changeTo === undefined) {
      return undefined;
    }
  }

  return changeTo;
};
