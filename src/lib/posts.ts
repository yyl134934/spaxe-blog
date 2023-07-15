import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { Post } from '@/entity/Common';

const postsDirectory = path.join(process.cwd(), 'posts');
console.log('🚀🐍 ~ file: posts.ts:7 ~ postsDirectory:', postsDirectory);

export function getSortedPostsData(): Post[] {
  //TODO Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostData = fileNames.map((fileName) => {
    //TODO Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');
    return getPostDataById(id);
  });

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

interface PostId {
  params: {
    id: string;
  };
}

export function getAllPostIds(): PostId[] {
  const fileNames = fs.readdirSync(postsDirectory);
  console.info('fileNames:', fileNames);
  return fileNames.map((fileName) => {
    return {
      params: { id: fileName.replace(/\.md$/, '') },
    };
  });
}

export function getPostDataById(id: string): Post {
  //TODO Get file names under /posts
  const fullPath = path.join(postsDirectory, `${id}.md`);
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
