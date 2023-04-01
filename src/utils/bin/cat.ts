import File from '../structure/File';
import { getFileFromPath } from './cd';

export const cat = async (args: string[]): Promise<string> => {
  let output = '';
  let cats: File[] = [];
  for (let index = 0; index < args.length; index++) {
    let catPath = args[index].trim();
    if (args[index].trim().length === 0) {
      continue;
    }
    if (args[index].trim() == '') {
      catPath = '.';
    }

    let file = await getFileFromPath(catPath);
    if (file instanceof File) {
      cats.push(file);
    } else {
      output += `${catPath}: No such file - Maybe the file is a directory or unreadable\n`;
    }
  }

  if (cats.length === 0) {
    return output + 'No files to cat';
  }

  for (let index = 0; index < cats.length; index++) {
    if (index > 0) {
      output += '\n';
    }

    let current = cats[index];
    if (current.isDirectory()) {
      output += 'cat: ' + current.getFullPath() + ': Is a directory';
    } else if (current.isReadable()) {
      output += await current.read();
    } else {
      output += 'cat: ' + current.name + ': Is not readable';
    }
  }

  return output;
};
