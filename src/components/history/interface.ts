import File from '../../utils/structure/File';
import User from '../../utils/structure/User';

export interface History {
  id: number;
  date: Date;
  user: User;
  directory: File;
  command: string;
  output: string;
}
