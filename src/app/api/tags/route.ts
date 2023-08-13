import { getTagsInfo } from '@/lib/posts';
import { NextRequest, NextResponse } from 'next/server';
import { ResponseCodes, createResposeData } from '../../../common';

export async function GET(request: NextRequest) {
  const data = getTagsInfo();

  const body = createResposeData({ code: ResponseCodes.OK, data: [data] });
  return NextResponse.json(body);
}
