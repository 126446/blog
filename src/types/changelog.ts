export interface ChangelogItem {
  date: string;
  version: string;
  changes: string[];
  type: 'feature' | 'fix' | 'update';
}

export interface FileUpdateItem {
  date: string;
  filename: string;
  description: string;
  type: 'add' | 'modify' | 'delete';
} 