export interface User {
  name: string;
  username: string;
  password: string;
  email: string;
  profile_picture: string;
  biography: string;
  blog_posts: string;
  user_id: string;
}

type Types = 'rich_text' | 'title';
export type UserType = {
  [P in keyof User]?: Types;
};
