import User from './User';

/**
 * The File class.
 *
 * The File class is the base class for all files.
 * It contains the basic properties and methods for all files.
 */
export default abstract class File {
  public static readonly instance: File;

  /**
   * The name of the File.
   */
  public abstract name: string;
  /**
   * The parent of the File.
   */
  private parent: File | undefined = undefined;
  /**
   * The children of the File.
   */
  private children: File[] = [];
  /**
   * File content.
   */
  protected content: string = '';
  /**
   * The size of the File.
   */
  public size: number = 0;
  /**
   * The metadata of the File.
   *
   * The metadata is a string of 4 characters.
   * The first character is the type of the File.
   * The second character is the read permission.
   * The third character is the write permission.
   * The fourth character is the execute permission.
   *
   * The type of the File can be:
   * - d: directory
   * - -: file
   *
   * The permissions can be:
   * - r: read
   * - w: write
   * - x: execute
   * - -: no permission
   *
   * Example:
   * - drwx: directory with read, write and execute permissions.
   * - -rw-: file with read and write permissions.
   * - --wx: file with write and execute permissions.
   * - ---x: file with execute permission.
   * - ----: file with no permissions.
   */
  public abstract metadata: string;
  /**
   * The owner of the File.
   *
   * The owner is the User that created the File.
   * The owner can be undefined if the File is available to all Users.
   */
  public abstract owner: User | undefined;

  public constructor() {}

  /**
   * Reads the File.
   *
   * @returns returns the content of the File.
   */
  read(): string {
    return this.content;
  }

  /**
   * Executes the executable.
   *
   * @param params The parameters to execute the executable with.
   * @returns The result of the execution.
   */
  execute(params: {}): any {
    return;
  }

  /**
   * Check if the File is a directory.
   */
  public isDirectory(): boolean {
    return this.metadata[0] === 'd';
  }

  /**
   * Whether the File is readable or not.
   *
   * @returns Whether the File is readable or not.
   */
  public isReadable(): boolean {
    return this.metadata[1] === 'r';
  }

  /**
   * Whether the File is executable or not.
   *
   * @returns Whether the File is executable or not.
   */
  public isExecutable(): boolean {
    return this.metadata[3] === 'x';
  }

  /**
   * Gets the root path of the File.
   *
   * @returns The root path of the File.
   */
  public getRootPath(): string {
    if (!this.isRoot()) {
      return this.parent.getFullPath();
    }

    return `/${this.name}`;
  }

  /**
   * Gets the full path of the File.
   *
   * @returns The full path of the File.
   */
  public getFullPath(): string {
    if (this.isRoot()) {
      return `/`;
    }

    if (this.parent) {
      let path = this.parent.getFullPath();
      if (path !== '/') {
        path += '/';
      }
      return `${path}${this.name}`;
    }

    return `${this.name}`;
  }

  /**
   * Gets the children of the File.
   *
   * @returns The children of the File.
   */
  public getChildren(): File[] {
    return this.children;
  }

  /**
   * Gets the child of the File.
   *
   * @param name The name of the child.
   * @returns The child of the File.
   */
  public getChild(name: string): File | undefined {
    return this.children.find((child) => child.name === name);
  }

  /**
   * Adds a child to the File.
   *
   * @param child The child to add.
   */
  public addChild(child: File): void {
    child.setParent(this);
  }

  /**
   * Removes a child from the File.
   *
   * @param child The child to remove.
   */
  public removeChild(child: File): void {
    this.children = this.children.filter((c) => c !== child);
    child.parent = undefined;
  }

  /**
   * Removes a child from the File.
   *
   * @param name The name of the child to remove.
   */
  public removeChildByName(name: string): void {
    let child = this.getChild(name);
    if (child) {
      this.removeChild(child);
    }
  }

  /**
   * Checks if the File has a child.
   *
   * @param name The name of the child.
   * @returns Whether the File has a child or not.
   */
  public hasChild(name: string): boolean {
    return this.children.some((child) => child.name === name);
  }

  /**
   * Checks if the File has children.
   *
   * @returns Whether the File has children or not.
   */
  public hasChildren(): boolean {
    return this.children.length > 0;
  }

  /**
   * Checks if the File is the root.
   *
   * @returns Whether the File is the root or not.
   */
  public isRoot(): boolean {
    return this.parent === undefined;
  }

  /**
   * Checks if the File is a child of the parent.
   *
   * @param parent The parent to check.
   * @returns Whether the File is a child of the parent or not.
   */
  public isChildOf(parent: File): boolean {
    return this.parent === parent;
  }

  /**
   * Checks if the File is a parent of the child.
   *
   * @param child The child to check.
   * @returns Whether the File is a parent of the child or not.
   */
  public isParentOf(child: File): boolean {
    return child.parent === this;
  }

  /**
   * Gets the parent of the File.
   */
  public getParent(): File | undefined {
    return this.parent;
  }

  /**
   * Sets the parent of the File.
   */
  public setParent(parent: File): void {
    this.parent = parent;
    if (!parent.hasChild(this.name)) {
      parent.children.push(this);
    }
  }

  /**
   * Checks if the File is a descendant of the parent.
   *
   * @param parent The parent to check.
   * @returns Whether the File is a descendant of the parent or not.
   */
  public isDescendantOf(parent: File): boolean {
    if (this.parent) {
      return this.parent === parent || this.parent.isDescendantOf(parent);
    }

    return false;
  }

  /**
   * Checks if the File is an ancestor of the child.
   *
   * @param child The child to check.
   * @returns Whether the File is an ancestor of the child or not.
   */
  public isAncestorOf(child: File): boolean {
    return child.isDescendantOf(this);
  }

  /**
   * Gets the depth of the File.
   *
   * @returns The depth of the File.
   */
  public getDepth(): number {
    if (this.parent) {
      return this.parent.getDepth() + 1;
    }

    return 0;
  }

  /**
   * Gets the descendants of the File.
   *
   * @returns The descendants of the File.
   */
  public getDescendants(): File[] {
    return this.children.reduce((descendants: File[], child: File) => {
      return descendants.concat(child, child.getDescendants());
    }, []);
  }

  /**
   * Gets the ancestors of the File.
   *
   * @returns The ancestors of the File.
   */
  public getAncestors(): File[] {
    const ancestors: File[] = [];

    if (this.parent) {
      ancestors.push(this.parent);
      ancestors.push(...this.parent.getAncestors());
    }

    return ancestors;
  }

  /**
   * Gets all contained Files.
   *
   * @returns All contained Files.
   */
  public getFiles(): File[] {
    return this.getDescendants().filter((child) => !child.isDirectory);
  }

  /**
   * Gets all contained directories.
   *
   * @returns All contained directories.
   */
  public getDirectories(): File[] {
    return this.getDescendants().filter((child) => child.isDirectory);
  }

  /**
   * Gets the size of the File.
   *
   * @returns The size of the File.
   */
  public getSize(): number {
    return this.getFiles().reduce((size: number, File: File) => {
      return size + File.size;
    }, 0);
  }
}
