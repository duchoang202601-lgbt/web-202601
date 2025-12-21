import { NextRequest, NextResponse } from 'next/server';
import { getPage, getPageBlocksRecursive, blocksToHtml } from '@/lib/notion';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

/**
 * GET /api/notion-page?id=xxx
 * 
 * Lấy nội dung Notion page theo ID
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageId = searchParams.get('id');

    if (!pageId) {
      return NextResponse.json(
        { success: false, error: 'Page ID is required' },
        { status: 400 }
      );
    }

    // Lấy thông tin page
    const page = await getPage(pageId);
    
    if (!page || !('properties' in page)) {
      return NextResponse.json(
        { success: false, error: 'Page not found' },
        { status: 404 }
      );
    }

    const fullPage = page as PageObjectResponse;

    // Lấy title
    let title = 'Untitled';
    const titleProp = Object.values(fullPage.properties).find(
      (prop) => prop.type === 'title'
    );
    if (titleProp && titleProp.type === 'title' && titleProp.title.length > 0) {
      title = titleProp.title.map((t) => t.plain_text).join('');
    }

    // Lấy cover image
    let coverImage: string | null = null;
    if (fullPage.cover) {
      if (fullPage.cover.type === 'external') {
        coverImage = fullPage.cover.external.url;
      } else if (fullPage.cover.type === 'file') {
        coverImage = fullPage.cover.file.url;
      }
    }

    // Lấy icon
    let icon: string | null = null;
    if (fullPage.icon) {
      if (fullPage.icon.type === 'emoji') {
        icon = fullPage.icon.emoji;
      } else if (fullPage.icon.type === 'external') {
        icon = fullPage.icon.external.url;
      } else if (fullPage.icon.type === 'file') {
        icon = fullPage.icon.file.url;
      }
    }

    // Lấy nội dung blocks
    const blocks = await getPageBlocksRecursive(pageId);
    const contentHtml = blocksToHtml(blocks);

    return NextResponse.json({
      success: true,
      data: {
        id: fullPage.id,
        title,
        coverImage,
        icon,
        createdTime: fullPage.created_time,
        lastEditedTime: fullPage.last_edited_time,
        contentHtml,
        blocks, // Raw blocks nếu cần custom render
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch page',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

