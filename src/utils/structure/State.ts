import Root from '../../filesystem/Root';
import Visitor from '../../filesystem/home/Visitor/Visitor';
import File from './File';
import User from './User';
import VisitorUser from './Users/VisitorUser';

export default class State {
  public static readonly instance = new State();

  public dir: File = Visitor.instance;
  public user: User = VisitorUser.instance;
  public root: File = Root.instance;
  private nextDir: File | undefined = undefined;

  public queueDirChange(dir: File): void {
    this.nextDir = dir;
  }

  public changeDir(): void {
    if (this.nextDir) {
      this.dir = this.nextDir;
      this.nextDir = undefined;
    }
  }
}
