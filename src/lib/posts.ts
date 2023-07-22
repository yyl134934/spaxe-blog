import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { Post, Tag } from '@/entity/Common';
import { ResponseData } from '@/entity/Response';

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

export function getPostDataOfPagination(page: number = 1, offset: number = 5): Post[] {
  const sortedPostData = getSortedPostsData();
  const total = sortedPostData.length;
  const start = (page - 1) * offset;
  const isEnd = page * offset > total;
  const end = isEnd ? total : page * offset;
  // Pages
  return sortedPostData.slice(start, end);
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

export const getPostDataByKeyword = (keyword: string, page?: number, offset?: number): Post[] => {
  const data = getPostDataOfPagination(page, offset);
  return data.filter((post) => {
    const { title, description, tags } = post;
    const hasInclude = title?.includes(keyword) || description?.includes(keyword) || tags?.includes(keyword);
    return hasInclude;
  });
};

const ignoreCase = (text?: string, keyword: string = ''): boolean => {
  return text?.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) ?? false;
};

export const getPostDataByKeywordAndTag = (
  tag: string = '',
  keyword: string = '',
  page?: number,
  offset?: number,
): Post[] => {
  const data = getPostDataOfPagination(page, offset);

  if (!tag && !keyword) {
    return data;
  }

  return data.filter((post) => {
    const { title, description, tags } = post;
    const hasInclude =
      ignoreCase(tags, tag) &&
      (ignoreCase(title, keyword) || ignoreCase(description, keyword) || ignoreCase(tags, keyword));
    return hasInclude;
  });
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
