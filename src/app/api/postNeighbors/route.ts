import { getNeighbors } from '@/lib/posts';
import { NextRequest, NextResponse } from 'next/server';
import { ResponseCodes, createResposeData, getSearchParams, valid } from '../common';

type SearchParams = {
  cur_id: string;
};

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const expectedTypes: SearchParams = {
    cur_id: '',
  };
  const valuableParams = getSearchParams<SearchParams>(expectedTypes, searchParams);

  const { isOk, field } = valid(expectedTypes, valuableParams);
  if (!isOk) {
    return NextResponse.json(
      createResposeData({
        code: ResponseCodes.CLIENT_ERROR,
        ret_msg: `字段[${field}]缺失或类型错误，请检查接口调用！`,
      }),
    );
  }

  const { cur_id } = valuableParams;
  const data = getNeighbors(cur_id);

  const body = createResposeData({ code: ResponseCodes.OK, data });
  return NextResponse.json(body);
}
