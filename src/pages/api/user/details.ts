import { User } from './../../entity/User.d';
import { NextApiRequest, NextApiResponse } from 'next';
import NotionServer, { createResposeData } from '../../lib/NotionServer';
import { APIResponseError } from '@notionhq/client';

const notionServer = new NotionServer();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page_id } = req.query;

  console.info('/api/detauils');

  if (!page_id) {
    res.status(400).json(createResposeData(400, {}, `请求失败, 缺少参数[page_id]!`));
    return;
  }

  try {
    const data = await notionServer.detail<User>(page_id as string);
    res.status(200).json(createResposeData(200, data));
  } catch (error) {
    const { status } = error as APIResponseError;
    res.status(status).json(createResposeData(status));
  }
}
