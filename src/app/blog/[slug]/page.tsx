import { getAllPostIds } from '@/lib/posts';
import React from 'react';

export function generateStaticParams() {
  const allPostIds = getAllPostIds();

  return allPostIds.map((id) => ({ params: { slug: id } }));
}

export default function PostDetails({ params }: { params: { slug: string } }) {
  console.log('🚀🐍 ~ file: page.tsx:4 ~ PostDetails ~ params:', params);
  return <div className=''>{params.slug}</div>;
}
