import { User } from '@/entity/User.d';
import { NextApiRequest, NextApiResponse } from 'next';
import NotionServer, { createResposeData } from '@/lib/NotionServer';

const notionServer = new NotionServer();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.info('/api/user');

  const data = await notionServer.query<User>();

  res.status(200).json(createResposeData(200, data));
}
