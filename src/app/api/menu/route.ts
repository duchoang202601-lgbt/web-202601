import { NextRequest, NextResponse } from 'next/server';
import { getAllMenuItems, buildMenuTree } from '@/lib/notion';

/**
 * GET /api/menu
 * 
 * Lấy menu items
 * 
 * Query params:
 * - tree: 'true' | 'false' - Trả về dạng cây hoặc flat list (default: 'true')
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const asTree = searchParams.get('tree') !== 'false';

    const menuItems = await getAllMenuItems();

    // Lọc chỉ lấy menu active
    const activeItems = menuItems.filter(item => item.isActive);

    // Trả về dạng tree hoặc flat
    const data = asTree ? buildMenuTree(activeItems) : activeItems;

    return NextResponse.json({
      success: true,
      count: activeItems.length,
      data,
    });
  } catch (error) {
    console.error('Error fetching menu:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch menu',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

