import File from '../../../utils/structure/File';
import Visitor from './Visitor';

export default class ExampleVisitorFile extends File {
  public static readonly instance = new ExampleVisitorFile();

  public name: string = 'exampleVisitorFile';
  public metadata = '-rw-';
  public owner = undefined;

  protected content = 'This is an example visitor file.';
  public size = this.content.length;

  public constructor() {
    super();
  }
}
