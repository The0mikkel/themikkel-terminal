import File from '../../../utils/structure/File';
import VisitorUser from '../../../utils/structure/Users/VisitorUser';
import ExampleVisitorFile from './ExampleVisitorFile';

export default class Visitor extends File {
  public static readonly instance = new Visitor();

  public name: string = 'visitor';
  public metadata = 'drw-';
  public owner = VisitorUser.instance;

  public constructor() {
    super();
    ExampleVisitorFile.instance.setParent(this);
  }
}
