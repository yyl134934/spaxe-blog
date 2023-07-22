import { Post } from '@/entity/Common';
import { ResponseData } from '@/entity/Response';
import { getPostDataByKeywordAndTag } from '@/lib/posts';
import { NextRequest, NextResponse } from 'next/server';

type SearchParams = {
  tag?: string;
  search?: string;
  page?: number;
  offset?: number;
};

const enum ResponseCodes {
  'OK' = 200,
  'CLIENT_ERROR' = 400,
  'SERVER_ERROR' = 500,
}

const getDefaultRetMsg = (code: number | string): string => {
  switch (code) {
    case ResponseCodes.OK:
      return '查询成功!';
    case ResponseCodes.CLIENT_ERROR:
      return '缺少必要参数，请检查接口调用！';
    case ResponseCodes.SERVER_ERROR:
      return '查询数据不存在！';
    default:
      return '查询成功!';
  }
};

/**
 * 创建部分响应数据
 * @template T
 * @param {number | string} code - 状态码
 * @param {T} [data] - 数据（可选）
 * @param {string} [ret_msg] - 返回消息（可选）
 * @returns {ResponseData<T>} 部分响应数据对象
 */
export const createResposeData = <T>({
  code = ResponseCodes.OK,
  data = [],
  ret_msg,
  ...rest
}: Partial<ResponseData<T>>): ResponseData<T> => {
  const defaultMsg = getDefaultRetMsg(code);
  return { code, ret_msg: ret_msg ?? defaultMsg, data: data ?? [], ...rest };
};

const getSearchParams = <T extends Record<string, any>>(expectedTypes: T, searchParams: URLSearchParams): T => {
  const params = Object.keys(expectedTypes).reduce((initial: T, currentKey, index) => {
    const value = searchParams.get(currentKey);
    if (value === null || value === undefined) {
      return initial;
    }
    return { [currentKey]: value, ...initial };
  }, {} as T);

  return params;
};

interface Vaild {
  vaild: boolean;
  field: string | null;
}

function checkPropertyType<T, K extends keyof T>(
  expectedTypes: T,
  searchParams: T extends Record<string, any> ? Record<string, any> : Record<string, any>,
) {
  for (const [key, value] of Object.entries(searchParams)) {
    const expectedType = typeof expectedTypes[key as K];
    switch (expectedType) {
      case 'string':
        {
          const isOk = typeof value === 'string';
          if (!isOk) {
            throw { vaild: false, field: key };
          }
        }
        break;
      case 'number':
        {
          const reg = new RegExp(/^\d+$/g);
          const isOk = typeof value === 'string' || typeof value === 'number' ? reg.test(value as string) : false;
          if (!isOk) {
            throw { vaild: false, field: key };
          }
        }
        break;
    }
  }
}

function checkPropertyRequired<T extends Record<string, any>, K extends keyof T>(expectedTypes: T, searchParams: T) {}

const baseVaild = <T extends Record<string, any>>(expectedTypes: T, searchParams: T): Vaild => {
  const defaultVaild: Vaild = { vaild: true, field: null };

  try {
    // checkPropertyRequired(expectedTypes, searchParams);
    checkPropertyType(expectedTypes, searchParams);
  } catch (error) {
    return error as Vaild;
  }

  return defaultVaild;
};

function postVaild(expectedTypes: SearchParams, valuableParams: SearchParams) {
  return baseVaild(expectedTypes, valuableParams);
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const expectedTypes: SearchParams = {
    tag: '',
    search: '',
    page: 0,
    offset: 0,
  };
  const valuableParams = getSearchParams<SearchParams>(expectedTypes, searchParams);

  const { vaild, field } = postVaild(expectedTypes, valuableParams);
  if (!vaild) {
    return NextResponse.json(
      createResposeData({
        code: ResponseCodes.CLIENT_ERROR,
        ret_msg: `字段[${field}]缺失或类型错误，请检查接口调用！`,
      }),
    );
  }

  const { search, tag, page, offset } = valuableParams;
  const data = getPostDataByKeywordAndTag(tag, search, page, offset);

  const body = createResposeData<Post>({ code: ResponseCodes.OK, data });
  return NextResponse.json(body);
}
