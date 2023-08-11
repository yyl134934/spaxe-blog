import { Summary } from './Common.d';
export interface HeaderLinkProps {
  href: string;
  title: string;
}

// export type Summary = Omit<typeof Post, 'content'>;
export interface Summary {
  id: string;
  date?: string;
  title?: string;
  tags?: string;
  description?: string;
  [key: string]: any;
}
export interface Post extends Summary {
  content: string;
}
export interface Tag {
  [key: string]: number;
}
