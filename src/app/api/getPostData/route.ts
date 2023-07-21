import { createResposeData, getPostDataByKeyword, getPostDataOfPagination } from '@/lib/posts';
import { NextRequest, NextResponse } from 'next/server';

type SearchParams = {
  search?: string;
  page?: number;
  offset?: number;
};
type SearchParamsKeys = keyof SearchParams;

const keys: SearchParamsKeys[] = ['search', 'page', 'offset'];

const getSearchParams = (searchParams: URLSearchParams) => {
  const params = keys.reduce((initial: SearchParams, currentKey, index) => {
    const value = searchParams.get(currentKey);
    if (value === null || value === undefined) {
      return initial;
    }
    return { [currentKey]: value, ...initial };
  }, {});

  return params;
};

type Vaild = {
  vaild: boolean;
  field: string | null;
};

function checkParamsType<T, K extends keyof T>(
  expectedTypes: T,
  searchParams: T extends Record<string, any> ? Record<string, any> : Record<string, any>,
): Vaild {
  try {
    for (const [key, value] of Object.entries(searchParams)) {
      const valueType = typeof expectedTypes[key as K];
      switch (valueType) {
        case 'string':
          {
            const type = typeof value === 'string';
            if (!type) {
              return { vaild: false, field: key };
            }
          }
          break;
        case 'number':
          {
            const type =
              typeof value === 'string' || typeof value === 'number'
                ? parseInt(value as string, 10) && typeof parseInt(value as string, 10) === 'number'
                : false;
            if (!type) {
              return { vaild: false, field: key };
            }
          }
          break;
      }
    }
  } catch (error) {
    return { vaild: true, field: 'error' };
  }

  return { vaild: true, field: null };
}

// function requiredVaild<T extends Record<string, any>, K extends keyof T>(expectedTypes: T, searchParams: T): Vaild {
//   for (const [key, value] of Object.entries(expectedTypes)) {
//     type P=(T)[key]
//     if (value === undefined) {
//       return { vaild: false, field: key };
//     }
//   }

//   return typeVaild(expectedTypes, searchParams);
// }

const baseVaild = <T extends Record<string, any>, K extends keyof T>(expectedTypes: T, searchParams: T): Vaild => {
  return checkParamsType(expectedTypes, searchParams);
};

function postVaild(searchParams: SearchParams) {
  const expectedTypes: SearchParams = {
    search: '',
    page: 0,
    offset: 0,
  };

  return baseVaild(expectedTypes, searchParams);
}

export async function GET(request: NextRequest) {
  const searchParams = getSearchParams(request.nextUrl.searchParams);
  const { vaild, field } = postVaild(searchParams);
  if (!vaild) {
    return NextResponse.json(createResposeData({ code: 400, ret_msg: `字段[${field}]类型错误，请检查接口调用！` }));
  }

  const { search, page, offset } = searchParams;
  const { data, isEnd } = search ? getPostDataByKeyword(search, page, offset) : getPostDataOfPagination(page, offset);

  return NextResponse.json(createResposeData({ code: 200, data, isEnd }));
}
