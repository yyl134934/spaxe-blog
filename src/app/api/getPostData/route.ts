import { getSortedPostsData, createResposeData, getPostDataByKeyword } from '@/lib/posts';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get('search');
  const postData = search ? getPostDataByKeyword(search) : getSortedPostsData();
  return NextResponse.json(createResposeData(200, postData));
}
