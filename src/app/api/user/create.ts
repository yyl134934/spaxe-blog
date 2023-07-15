import type { NextApiRequest, NextApiResponse } from 'next';
import NotionServer, { createResposeData } from '../../../lib/NotionServer';
import { User, UserType } from '@/entity/User';

type Data = any;

const notionServer = new NotionServer();

const UserType: UserType = {
  name: 'rich_text',
  username: 'rich_text',
  password: 'rich_text',
  email: 'rich_text',
  profile_picture: 'rich_text',
  biography: 'rich_text',
  blog_posts: 'rich_text',
  user_id: 'title',
};

type ObjectType = { [key: string]: any };

const autoAddType = <T extends Object, U extends ObjectType>(body: T, objectType: U) => {
  const newBody: any = {};

  if (typeof body !== 'object') {
    return body;
  }

  for (const [key, value] of Object.entries(body)) {
    const content = value;
    const type = objectType.hasOwnProperty(key) ? objectType[key] : '';
    newBody[key] = { content, type };
  }

  return newBody;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  console.info('/api/create');

  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }

  console.info('create user request body:', req.body);

  const data = await notionServer.create(autoAddType<User, UserType>(req.body, UserType));

  res.status(200).json(data);
}
