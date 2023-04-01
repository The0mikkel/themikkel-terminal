import File from '../../../utils/structure/File';
import rootUser from '../../../utils/structure/Users/rootUser';
import Home from '../Home';

export default class Root extends File {
  public static readonly instance = new Root();

  public name: string = 'root';
  public metadata = 'dr--';
  public owner = rootUser.instance;

  public constructor() {
    super();
  }
}
