import File from './File';

export default abstract class User {
  public static readonly instance: User;
  /**
   * The username of the User.
   */
  public abstract username: string;
  /**
   * The password of the User.
   */
  public abstract password: string;
  /**
   * Get the home directory of the User.
   */
  public abstract getHome(): File;
}
