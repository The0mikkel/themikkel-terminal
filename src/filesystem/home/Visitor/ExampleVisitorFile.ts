import File from '../../../utils/structure/File';
import VisitorUser from '../../../utils/structure/Users/VisitorUser';

export default class ExampleVisitorFile extends File {
  public static readonly instance = new ExampleVisitorFile();

  public name: string = 'exampleVisitorFile';
  public metadata = '-r--';
  public owner = VisitorUser.instance;

  protected content = 'This is an example visitor file.';
  public size = this.content.length;

  public constructor() {
    super();
  }
}
