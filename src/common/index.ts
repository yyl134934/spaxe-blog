import { ResponseData } from '@/entity/Response';

export const enum ResponseCodes {
  'OK' = 200,
  'CLIENT_ERROR' = 400,
  'SERVER_ERROR' = 500,
}

const getDefaultRetMsg = (code: number | string): string => {
  switch (code) {
    case ResponseCodes.OK:
      return '查询成功！';
    case ResponseCodes.CLIENT_ERROR:
      return '缺少必要参数，请检查接口调用！';
    case ResponseCodes.SERVER_ERROR:
      return '查询数据不存在！';
    default:
      return '查询成功！';
  }
};

interface createProps {
  code: number;
  data?: any[];
  ret_msg?: string;
}

export const createResposeData = ({ code, data = [], ret_msg }: createProps): ResponseData<any> => {
  const defaultMsg = getDefaultRetMsg(code);
  return { code, ret_msg: ret_msg ?? defaultMsg, data: data ?? [] };
};

export const getSearchParams = <T extends Record<string, any>>(expectedTypes: T, searchParams: URLSearchParams): T => {
  const params = Object.keys(expectedTypes).reduce((initial: T, currentKey, index) => {
    const value = searchParams.get(currentKey);
    if (value === null || value === undefined) {
      return initial;
    }
    return { [currentKey]: value, ...initial };
  }, {} as T);

  return params;
};

interface Valid {
  isOk: boolean;
  field: string | null;
}

export function checkPropertyType<T, K extends keyof T>(
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
            throw { isOK: false, field: key };
          }
        }
        break;
      case 'number':
        {
          const reg = new RegExp(/^\d+$/g);
          const isOk = typeof value === 'string' || typeof value === 'number' ? reg.test(value as string) : false;
          if (!isOk) {
            throw { isOK: false, field: key };
          }
        }
        break;
    }
  }
}

export function checkPropertyRequired<T extends Record<string, any>, K extends keyof T>(
  expectedTypes: T,
  searchParams: T,
) {}

export const valid = <T extends Record<string, any>>(expectedTypes: T, searchParams: T): Valid => {
  const defaultValid: Valid = { isOk: true, field: null };

  try {
    // checkPropertyRequired(expectedTypes, searchParams);
    checkPropertyType(expectedTypes, searchParams);
  } catch (error) {
    return error as Valid;
  }

  return defaultValid;
};
