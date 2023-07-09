import type { NextApiRequest, NextApiResponse } from 'next';
import NotionServer, { createResposeData } from '../../lib/NotionServer';
import { User, UserType } from '@/entity/User';
import { APIResponseError } from '@notionhq/client';

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
  console.info('/api/delete');

  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }
  // 校验
  //   if (!req.body.block_id) {
  //     res.status(400).json(createResposeData(400, {}, '缺少必要参数[block_id]'));
  //   }

  const { page_id, ...rest } = req.body;

  try {
    const data = await notionServer.update<User>(page_id, autoAddType(rest, UserType));

    res.status(200).json(createResposeData(200, data));
  } catch (error) {
    const { status } = error as APIResponseError;
    res.status(status).json(createResposeData(status, error));
  }
}
