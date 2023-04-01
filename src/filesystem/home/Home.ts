import File from '../../utils/structure/File';
import Root from './Root/Root';
import Visitor from './Visitor/Visitor';

export default class Home extends File {
  public static readonly instance = new Home();

  public name = 'home';
  public metadata = 'dr--';
  public owner = undefined;

  public constructor() {
    super();
    Root.instance.setParent(this);
    Visitor.instance.setParent(this);
  }
}
