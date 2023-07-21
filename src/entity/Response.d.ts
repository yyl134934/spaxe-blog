export type ResponseData<T> = { code: number | string; ret_msg: string; data: Partial<T>; [key?: string]: any };
