import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { Post, Tag } from '@/entity/Common';
import { ResponseData } from '@/entity/Response';

type QueryResult = {
  data: Post[];
  isEnd: boolean;
};

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData(): Post[] {
  //TODO Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostData = fileNames.map((fileName) => {
    //TODO Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');
    return getPostDataById(id);
  }) as Post[];

  //TODO Sort posts by date
  return allPostData.sort((a: Post, b: Post) => {
    const { date: prevDate = 0 } = a;
    const { date: curDate = 0 } = b;

    if (prevDate < curDate) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getPostDataOfPagination(page: number = 1, offset: number = 5): QueryResult {
  const sortedPostData = getSortedPostsData();
  const total = sortedPostData.length;
  const start = (page - 1) * offset;
  const isEnd = page * offset > total;
  const end = isEnd ? total : page * offset;
  //TODO Pages
  return { data: sortedPostData.slice(start, end), isEnd };
}

interface PostId {
  params: {
    id: string;
  };
}

export function getAllPostIds(): PostId[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: { id: fileName.replace(/\.md$/, '') },
    };
  });
}

export function getPostDataById(id: string): Post | null {
  //TODO Get file names under /posts
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const isExist = fs.existsSync(fullPath);
  if (!isExist) {
    return null;
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  //TODO Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  //TODO Combine the data with the id
  return {
    id,
    content: matterResult.content,
    ...matterResult.data,
  };
}

/**
 * 获取相邻文章数据
 * @param curPost
 * @returns [prev, next]
 */
export function getAdjacentPostData(curPost: Post): (Post | null)[] {
  const allPostData = getSortedPostsData();

  const index = allPostData.findIndex((post) => curPost.id === post.id);

  const prev = index !== 0 ? allPostData[index - 1] : null;
  const next = index + 1 < allPostData.length ? allPostData[index + 1] : null;

  return [prev, next];
}

export const getPostDataByKeyword = (keyword: string, page?: number, offset?: number): QueryResult => {
  const { data } = getPostDataOfPagination(page, offset);
  const keyData = data.filter((post) => {
    const { title, description, tags } = post;
    const hasInclude = title?.includes(keyword) || description?.includes(keyword) || tags?.includes(keyword);
    return hasInclude;
  });
  const isEnd = keyData.length <= (page ?? 0) * (offset ?? 0);

  return { data: keyData, isEnd };
};

export const getTagsData = (): Tag => {
  const allPostData = getSortedPostsData();
  return allPostData.reduce((tagObj, { tags }) => {
    const tagArray = tags?.split(',') || [];
    for (const tagStr of tagArray) {
      tagObj[tagStr] = tagObj[tagStr] ? tagObj[tagStr] + 1 : 1;
    }
    return tagObj;
  }, {} as any);
};

type createProps<T> = {
  code: number | string;
  data?: Partial<T>;
  ret_msg?: string;
  [key: string]: any;
};

/**
 * 创建部分响应数据
 * @template T
 * @param {number | string} code - 状态码
 * @param {T} [data] - 数据（可选）
 * @param {string} [ret_msg] - 返回消息（可选）
 * @returns {ResponseData<T>} 部分响应数据对象
 */
export const createResposeData = <T>({ code = 200, data = {}, ret_msg, ...rest }: createProps<T>): ResponseData<T> => {
  switch (code) {
    case 200:
      return { code: 200, ret_msg: ret_msg ?? '查询成功!', data: data ?? {}, ...rest };
    case 400:
      return { code: 400, ret_msg: ret_msg ?? '缺少必要参数，请检查接口调用！', data: {}, ...rest };
    default:
      return { code: 500, ret_msg: ret_msg ?? '查询数据不存在！', data: {}, ...rest };
  }
};
