import Visitor from '../../../filesystem/home/Visitor/Visitor';
import User from '../User';

export default class VisitorUser extends User {
  public static readonly instance = new VisitorUser();

  public username = 'visitor';
  public password = 'visitor';

  public getHome() {
    return Visitor.instance;
  }

  public constructor() {
    super();
  }
}
