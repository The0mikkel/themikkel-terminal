import File from '../utils/structure/File';
import User from '../utils/structure/User';
import Home from './home/Home';

export default class Root extends File {
  public static readonly instance = new Root();

  public name: string = '/';
  public metadata = 'dr--';
  public owner: User = undefined;

  public constructor() {
    super();
    Home.instance.setParent(this);
  }
}
