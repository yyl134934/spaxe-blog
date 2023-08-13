import { getPostDataById } from '@/lib/posts';
import { NextRequest, NextResponse } from 'next/server';
import { ResponseCodes, createResposeData, getSearchParams, valid } from '../common';

type SearchParams = {
  slug: string;
};

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const expectedTypes: SearchParams = {
    slug: '',
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

  const { slug } = valuableParams;
  const post = getPostDataById(slug);

  const body = createResposeData({ code: ResponseCodes.OK, data: [post] });
  return NextResponse.json(body);
}
