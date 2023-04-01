import Root from '../../../filesystem/Root';
import User from '../User';

export default class rootUser extends User {
  public static readonly instance = new rootUser();

  public username: string = 'root';
  public password: string = 'root';

  public getHome() {
    return Root.instance;
  }

  public constructor() {
    super();
  }
}
