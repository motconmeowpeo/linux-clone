export interface FileEntry {
  /** The primary name of the file or directory. */
  name: string;

  /** The full, absolute path to the item on the file system. */
  path: string;

  /** A flag to distinguish between a folder (true) and a file (false). */
  isDirectory: boolean;

  /** The size of the file in bytes (optional for directories). */
  size?: number;

  /** The date and time the item was last modified. */
  modifiedAt: Date;

  /** The file type or MIME type (e.g., 'image/png', 'application/pdf'). */
  type: string;
}
