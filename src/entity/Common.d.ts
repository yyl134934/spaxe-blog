export type HeaderLinkProps = {
  href: string;
  title: string;
};
export interface Post {
  id: string;
  date?: string;
  title?: string;
  tags?: string;
  description?: string;
  content: string;
  [key: string]: any;
}

export interface Tag {
  [key: string]: number;
}
