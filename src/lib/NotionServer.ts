import { ResponseData } from './../entity/Response.d';
import { Client } from '@notionhq/client';

const auth = process.env.NOTION_ACCESS_TOKEN;
const database = process.env.NOTION_DATABASE_USER_ID ?? '';

/**
 * 创建部分响应数据
 * @template T
 * @param {number | string} code - 状态码
 * @param {T} [data] - 数据（可选）
 * @param {string} [ret_msg] - 返回消息（可选）
 * @returns {{ code: number, ret_msg: string, data: T }} 部分响应数据对象
 */
export const createResposeData = <T>(code: number | string, data?: Partial<T>, ret_msg?: string): ResponseData<T> => {
  switch (code) {
    case 200:
      return { code: 200, ret_msg: ret_msg ?? '查询成功!', data: data ?? {} };
    case 400:
      return { code: 400, ret_msg: ret_msg ?? '缺少必要参数，请检查接口调用！', data: {} };
    default:
      return { code: 500, ret_msg: ret_msg ?? '查询数据不存在！', data: {} };
  }
};

export default class NotionService {
  client: Client;

  constructor() {
    this.client = new Client({ auth });
  }

  /**
   * 全量查询
   * @returns
   */
  async query<T>(): Promise<T[]> {
    const response = await this.client.databases.query({
      database_id: database,
    });

    // return response.results;
    return response.results.map((item) => NotionService._transformer(item));
  }

  /**
   * 查询详情
   * @param {string} id
   * @returns {Promise<T>}
   */
  async detail<T>(id: string): Promise<T> {
    const response = await this.client.pages.retrieve({
      page_id: id,
    });

    return NotionService._transformer(response);
  }

  private _createRichText = (content: string): any => {
    return {
      type: 'rich_text',
      rich_text: [
        {
          type: 'text',
          text: {
            content: content,
          },
        },
      ],
    };
  };

  private _createTitle = (content: string): any => {
    return {
      type: 'title',
      title: [
        {
          type: 'text',
          text: {
            content: content,
          },
        },
      ],
    };
  };

  private createMap: any = new Map([
    ['title', this._createTitle],
    ['rich_text', this._createRichText],
  ]);

  private _createProperties = (obj: any): any => {
    let newObj = {};
    console.info('新增数据：', obj);
    for (const [key, value] of Object.entries(obj)) {
      const { type, content } = value as any;
      const createFn = this.createMap.get(type) || this._createRichText;

      newObj = { [key]: createFn(content), ...newObj };
    }

    console.info('新增数据：', newObj);
    return newObj;
  };

  /**
   * 添加
   * @param obj
   * @returns
   */
  async create<T>(obj: T): Promise<any> {
    const response = await this.client.pages.create({
      parent: {
        database_id: database,
      },
      properties: this._createProperties(obj),
    });
    return response;
  }

  /**
   * 根据block_id删除
   * @template T
   * @param {T} obj
   * @returns
   */
  async update<T>(page_id: string, obj: T): Promise<any> {
    return await this.client.pages.update({
      page_id: page_id,
      properties: this._createProperties(obj),
    });
  }

  /**
   * 根据block_id删除
   * @param {string} block_id
   * @returns
   */
  async remove(block_id: string) {
    return await this.client.blocks.delete({ block_id: block_id });
  }

  private static _transformer<T>(page: any): T {
    let data: any = {};

    for (const key in page.properties) {
      switch (page.properties[key].type) {
        case 'relation':
          data[key] = page.properties[key].relation[0].id;
          break;

        case 'title':
        case 'rich_text':
          const attr = page.properties[key];
          const type = attr.type;
          const contentArr = attr[type];
          const [contentObj] = contentArr;

          data[key] = contentObj?.text?.content ?? '';
          break;

        default:
          data[key] = page.properties[key];
          break;
      }
    }

    return data;
  }
}
