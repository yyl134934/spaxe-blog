import { getPostListByKeywordAndTag } from '@/lib/posts';
import { NextRequest, NextResponse } from 'next/server';
import { ResponseCodes, createResposeData, getSearchParams, valid } from '../../../common';

type SearchParams = {
  tag?: string;
  search?: string;
  page?: number;
  offset?: number;
};

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const expectedTypes: SearchParams = {
    tag: '',
    search: '',
    page: 0,
    offset: 0,
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

  const { search, tag, page, offset } = valuableParams;
  const data = getPostListByKeywordAndTag(tag, search, page, offset);

  const body = createResposeData({ code: ResponseCodes.OK, data });
  return NextResponse.json(body);
}
