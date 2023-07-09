import type { NextApiRequest, NextApiResponse } from 'next';
import NotionServer, { createResposeData } from '../../lib/NotionServer';
import { User, UserType } from '@/entity/User';
import { APIResponseError } from '@notionhq/client';

type Data = any;

const notionServer = new NotionServer();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  console.info('/api/delete');

  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }

  if (!req.body.block_id) {
    res.status(400).json(createResposeData(400, {}, '缺少必要参数[block_id]'));
  }

  try {
    const data = await notionServer.remove(req.body.block_id);

    res.status(200).json(createResposeData(200, data));
  } catch (error) {
    const { status } = error as APIResponseError;
    res.status(status).json(createResposeData(status, error));
  }
}
