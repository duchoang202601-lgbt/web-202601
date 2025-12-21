import { Client } from '@notionhq/client';
import type {
  PageObjectResponse,
  PartialPageObjectResponse,
  DatabaseObjectResponse,
  PartialDatabaseObjectResponse,
  GetPageResponse,
  GetDatabaseResponse,
  BlockObjectResponse,
  PartialBlockObjectResponse,
  ListBlockChildrenResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints';

// ============================================
// CONFIGURATION
// ============================================

// Khởi tạo Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// Extended client type với database query
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const notionClient = notion as any;

// Type for query response
interface QueryDatabaseResponse {
  results: (PageObjectResponse | PartialPageObjectResponse)[];
  has_more: boolean;
  next_cursor: string | null;
}

// Database IDs - Cấu hình trong .env
const DATABASES = {
  articles: process.env.NOTION_DATABASE_ARTICLES_ID || '',
  categories: process.env.NOTION_DATABASE_CATEGORIES_ID || '',
  menu: process.env.NOTION_DATABASE_MENU_ID || '',
};

// ============================================
// TYPE DEFINITIONS
// ============================================

// Kiểu dữ liệu cho bài viết
export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  category: string;
  categoryId: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  status: 'published' | 'draft';
  views: number;
  tags: string[];
  featured: boolean;
}

// Kiểu dữ liệu cho danh mục
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  parentId: string | null;
  order: number;
  color: string;
}

// Kiểu dữ liệu cho menu item
export interface MenuItem {
  id: string;
  name: string;
  link: string;
  parentId: string | null;
  order: number;
  isActive: boolean;
}

// Kiểu dữ liệu cho block content
export interface NotionBlock {
  id: string;
  type: string;
  content: string;
  children?: NotionBlock[];
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Lấy plain text từ rich text array
 */
function getRichTextContent(richText: RichTextItemResponse[]): string {
  return richText.map((text) => text.plain_text).join('');
}

/**
 * Chuyển rich text thành HTML với đầy đủ formatting
 */
function getRichTextHtml(richText: RichTextItemResponse[]): string {
  return richText.map((text) => {
    let content = escapeHtml(text.plain_text);
    
    // Xử lý annotations (bold, italic, strikethrough, underline, code)
    const annotations = text.annotations;
    
    if (annotations.code) {
      content = `<code class="inline-code">${content}</code>`;
    }
    if (annotations.bold) {
      content = `<strong>${content}</strong>`;
    }
    if (annotations.italic) {
      content = `<em>${content}</em>`;
    }
    if (annotations.strikethrough) {
      content = `<del>${content}</del>`;
    }
    if (annotations.underline) {
      content = `<u>${content}</u>`;
    }
    
    // Xử lý màu sắc
    if (annotations.color && annotations.color !== 'default') {
      const colorClass = `notion-color-${annotations.color}`;
      content = `<span class="${colorClass}">${content}</span>`;
    }
    
    // Xử lý link
    if (text.href) {
      content = `<a href="${text.href}" target="_blank" rel="noopener noreferrer">${content}</a>`;
    }
    
    return content;
  }).join('');
}

/**
 * Escape HTML entities
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Lấy URL của file/image từ Notion
 */
function getFileUrl(file: { type: 'external'; external: { url: string } } | { type: 'file'; file: { url: string } } | null): string | null {
  if (!file) return null;
  if (file.type === 'external') {
    return file.external.url;
  }
  if (file.type === 'file') {
    return file.file.url;
  }
  return null;
}

/**
 * Kiểm tra xem response có phải là full page response
 */
function isFullPage(page: PageObjectResponse | PartialPageObjectResponse): page is PageObjectResponse {
  return 'properties' in page;
}

/**
 * Kiểm tra xem response có phải là full database response
 */
function isFullDatabase(db: DatabaseObjectResponse | PartialDatabaseObjectResponse): db is DatabaseObjectResponse {
  return 'properties' in db;
}

/**
 * Kiểm tra xem block có phải là full block response
 */
function isFullBlock(block: BlockObjectResponse | PartialBlockObjectResponse): block is BlockObjectResponse {
  return 'type' in block;
}

// ============================================
// DATABASE FUNCTIONS
// ============================================

/**
 * Lấy thông tin database
 */
export async function getDatabase(databaseId: string): Promise<GetDatabaseResponse> {
  try {
    const response = await notion.databases.retrieve({
      database_id: databaseId,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

/**
 * Query database với filter và sort
 */
export async function queryDatabase(
  databaseId: string,
  options?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filter?: any;
    sorts?: Array<{
      property: string;
      direction: 'ascending' | 'descending';
    } | {
      timestamp: 'created_time' | 'last_edited_time';
      direction: 'ascending' | 'descending';
    }>;
    pageSize?: number;
    startCursor?: string;
  }
): Promise<QueryDatabaseResponse> {
  try {
    const response = await notionClient.databases.query({
      database_id: databaseId,
      filter: options?.filter,
      sorts: options?.sorts,
      page_size: options?.pageSize || 100,
      start_cursor: options?.startCursor,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

/**
 * Lấy tất cả records từ database (phân trang tự động)
 */
export async function getAllFromDatabase(
  databaseId: string,
  filter?: unknown
): Promise<(PageObjectResponse | PartialPageObjectResponse)[]> {
  const results: (PageObjectResponse | PartialPageObjectResponse)[] = [];
  let hasMore = true;
  let startCursor: string | undefined;

  while (hasMore) {
    const response = await notionClient.databases.query({
      database_id: databaseId,
      filter,
      start_cursor: startCursor,
      page_size: 100,
    });

    results.push(...response.results);
    hasMore = response.has_more;
    startCursor = response.next_cursor ?? undefined;
  }

  return results;
}

// ============================================
// PAGE FUNCTIONS
// ============================================

/**
 * Lấy thông tin page
 */
export async function getPage(pageId: string): Promise<GetPageResponse> {
  try {
    const response = await notion.pages.retrieve({
      page_id: pageId,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

/**
 * Lấy nội dung blocks của page
 */
export async function getPageBlocks(pageId: string): Promise<(BlockObjectResponse | PartialBlockObjectResponse)[]> {
  const blocks: (BlockObjectResponse | PartialBlockObjectResponse)[] = [];
  let hasMore = true;
  let startCursor: string | undefined;

  while (hasMore) {
    const response: ListBlockChildrenResponse = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: startCursor,
      page_size: 100,
    });

    blocks.push(...response.results);
    hasMore = response.has_more;
    startCursor = response.next_cursor ?? undefined;
  }

  return blocks;
}

/**
 * Lấy blocks đệ quy (bao gồm children)
 */
export async function getPageBlocksRecursive(pageId: string): Promise<NotionBlock[]> {
  const blocks = await getPageBlocks(pageId);
  const result: NotionBlock[] = [];

  for (const block of blocks) {
    if (!isFullBlock(block)) continue;

    const notionBlock: NotionBlock = {
      id: block.id,
      type: block.type,
      content: extractBlockContent(block),
    };

    // Nếu block có children, lấy đệ quy
    if (block.has_children) {
      notionBlock.children = await getPageBlocksRecursive(block.id);
    }

    result.push(notionBlock);
  }

  return result;
}

/**
 * Trích xuất nội dung text từ block (với HTML formatting)
 */
function extractBlockContent(block: BlockObjectResponse): string {
  const blockType = block.type;
  const blockData = block[blockType as keyof typeof block];

  if (!blockData || typeof blockData !== 'object') return '';

  // Xử lý các loại block có rich_text - dùng getRichTextHtml để giữ formatting
  if ('rich_text' in blockData && Array.isArray(blockData.rich_text)) {
    return getRichTextHtml(blockData.rich_text as RichTextItemResponse[]);
  }

  // Xử lý các loại block đặc biệt
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = blockData as any;
  
  switch (blockType) {
    case 'image': {
      const url = data.type === 'external' 
        ? data.external?.url || '' 
        : data.file?.url || '';
      const caption = data.caption ? getRichTextHtml(data.caption) : '';
      return JSON.stringify({ url, caption });
    }
    case 'video': {
      const url = data.type === 'external' 
        ? data.external?.url || '' 
        : data.file?.url || '';
      const caption = data.caption ? getRichTextHtml(data.caption) : '';
      return JSON.stringify({ url, caption });
    }
    case 'embed': {
      const caption = data.caption ? getRichTextHtml(data.caption) : '';
      return JSON.stringify({ url: data.url || '', caption });
    }
    case 'bookmark': {
      const caption = data.caption ? getRichTextHtml(data.caption) : '';
      return JSON.stringify({ url: data.url || '', caption });
    }
    case 'code': {
      const code = data.rich_text ? getRichTextContent(data.rich_text) : '';
      const language = data.language || 'plaintext';
      const caption = data.caption ? getRichTextHtml(data.caption) : '';
      return JSON.stringify({ code, language, caption });
    }
    case 'callout': {
      const text = data.rich_text ? getRichTextHtml(data.rich_text) : '';
      const icon = data.icon?.emoji || '💡';
      const color = data.color || 'default';
      return JSON.stringify({ text, icon, color });
    }
    case 'table_row': {
      if (data.cells && Array.isArray(data.cells)) {
        const cells = data.cells.map((cell: RichTextItemResponse[]) => getRichTextHtml(cell));
        return JSON.stringify({ cells });
      }
      return JSON.stringify({ cells: [] });
    }
    default:
      return '';
  }
}

/**
 * Chuyển blocks thành HTML với xử lý list grouping
 */
export function blocksToHtml(blocks: NotionBlock[]): string {
  const result: string[] = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];

    // Gom nhóm bulleted_list_item
    if (block.type === 'bulleted_list_item') {
      const listItems: string[] = [];
      while (i < blocks.length && blocks[i].type === 'bulleted_list_item') {
        listItems.push(blockToHtml(blocks[i]));
        i++;
      }
      result.push(`<ul>${listItems.join('\n')}</ul>`);
      continue;
    }

    // Gom nhóm numbered_list_item
    if (block.type === 'numbered_list_item') {
      const listItems: string[] = [];
      while (i < blocks.length && blocks[i].type === 'numbered_list_item') {
        listItems.push(blockToHtml(blocks[i]));
        i++;
      }
      result.push(`<ol>${listItems.join('\n')}</ol>`);
      continue;
    }

    // Gom nhóm to_do
    if (block.type === 'to_do') {
      const todoItems: string[] = [];
      while (i < blocks.length && blocks[i].type === 'to_do') {
        todoItems.push(blockToHtml(blocks[i]));
        i++;
      }
      result.push(`<ul class="todo-list">${todoItems.join('\n')}</ul>`);
      continue;
    }

    result.push(blockToHtml(block));
    i++;
  }

  return result.join('\n');
}

function blockToHtml(block: NotionBlock): string {
  const childrenHtml = block.children ? blocksToHtml(block.children) : '';

  switch (block.type) {
    case 'paragraph':
      // Paragraph rỗng = line break
      if (!block.content) return '<p><br /></p>';
      return `<p>${block.content}</p>`;
      
    case 'heading_1':
      return `<h1>${block.content}</h1>`;
      
    case 'heading_2':
      return `<h2>${block.content}</h2>`;
      
    case 'heading_3':
      return `<h3>${block.content}</h3>`;
      
    case 'bulleted_list_item':
      return `<li>${block.content}${childrenHtml ? `<ul>${childrenHtml}</ul>` : ''}</li>`;
      
    case 'numbered_list_item':
      return `<li>${block.content}${childrenHtml ? `<ol>${childrenHtml}</ol>` : ''}</li>`;
      
    case 'to_do': {
      // Parse checked state from content if available
      const checked = block.content.includes('checked:true');
      const text = block.content.replace(/checked:(true|false)/g, '').trim();
      return `<li class="todo-item ${checked ? 'checked' : ''}">
        <input type="checkbox" ${checked ? 'checked' : ''} disabled />
        <span>${text}</span>
        ${childrenHtml}
      </li>`;
    }
      
    case 'quote':
      return `<blockquote>${block.content}${childrenHtml}</blockquote>`;
      
    case 'code': {
      try {
        const data = JSON.parse(block.content);
        return `<pre class="code-block" data-language="${data.language}"><code class="language-${data.language}">${escapeHtml(data.code)}</code></pre>${data.caption ? `<figcaption>${data.caption}</figcaption>` : ''}`;
      } catch {
        return `<pre><code>${block.content}</code></pre>`;
      }
    }
      
    case 'divider':
      return '<hr class="divider" />';
      
    case 'image': {
      try {
        const data = JSON.parse(block.content);
        return `<figure class="image-block">
          <img src="${data.url}" alt="${data.caption || 'Image'}" loading="lazy" />
          ${data.caption ? `<figcaption>${data.caption}</figcaption>` : ''}
        </figure>`;
      } catch {
        return `<img src="${block.content}" alt="Image" loading="lazy" />`;
      }
    }
      
    case 'video': {
      try {
        const data = JSON.parse(block.content);
        // Check if it's a YouTube/Vimeo link
        if (data.url.includes('youtube.com') || data.url.includes('youtu.be')) {
          const videoId = extractYouTubeId(data.url);
          return `<figure class="video-block">
            <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
            ${data.caption ? `<figcaption>${data.caption}</figcaption>` : ''}
          </figure>`;
        }
        return `<figure class="video-block">
          <video src="${data.url}" controls></video>
          ${data.caption ? `<figcaption>${data.caption}</figcaption>` : ''}
        </figure>`;
      } catch {
        return `<video src="${block.content}" controls></video>`;
      }
    }
      
    case 'embed': {
      try {
        const data = JSON.parse(block.content);
        return `<figure class="embed-block">
          <iframe src="${data.url}" frameborder="0" allowfullscreen></iframe>
          ${data.caption ? `<figcaption>${data.caption}</figcaption>` : ''}
        </figure>`;
      } catch {
        return `<iframe src="${block.content}" frameborder="0"></iframe>`;
      }
    }
      
    case 'bookmark': {
      try {
        const data = JSON.parse(block.content);
        return `<div class="bookmark-block">
          <a href="${data.url}" target="_blank" rel="noopener noreferrer">
            <span class="bookmark-url">${data.url}</span>
          </a>
          ${data.caption ? `<p class="bookmark-caption">${data.caption}</p>` : ''}
        </div>`;
      } catch {
        return `<a href="${block.content}" target="_blank" rel="noopener noreferrer">${block.content}</a>`;
      }
    }
      
    case 'callout': {
      try {
        const data = JSON.parse(block.content);
        return `<div class="callout callout-${data.color}">
          <span class="callout-icon">${data.icon}</span>
          <div class="callout-content">${data.text}${childrenHtml}</div>
        </div>`;
      } catch {
        return `<div class="callout"><div class="callout-content">${block.content}${childrenHtml}</div></div>`;
      }
    }
      
    case 'toggle':
      return `<details class="toggle-block">
        <summary>${block.content}</summary>
        <div class="toggle-content">${childrenHtml}</div>
      </details>`;
      
    case 'table':
      return `<div class="table-wrapper"><table>${childrenHtml}</table></div>`;
      
    case 'table_row': {
      try {
        const data = JSON.parse(block.content);
        const cells = data.cells.map((cell: string) => `<td>${cell}</td>`).join('');
        return `<tr>${cells}</tr>`;
      } catch {
        return `<tr><td>${block.content}</td></tr>`;
      }
    }
      
    case 'column_list':
      return `<div class="column-list">${childrenHtml}</div>`;
      
    case 'column':
      return `<div class="column">${childrenHtml}</div>`;
      
    case 'synced_block':
      return childrenHtml;
      
    case 'template':
      return childrenHtml;
      
    case 'link_to_page':
      return `<a href="#" class="link-to-page">${block.content || 'Link to page'}</a>`;
      
    case 'table_of_contents':
      return '<nav class="table-of-contents"><p><em>Table of Contents</em></p></nav>';
      
    case 'breadcrumb':
      return '<nav class="breadcrumb"></nav>';
      
    case 'equation':
      return `<div class="equation">${block.content}</div>`;
      
    default:
      return block.content ? `<div>${block.content}</div>` : '';
  }
}

/**
 * Extract YouTube video ID from URL
 */
function extractYouTubeId(url: string): string {
  const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  return match ? match[1] : '';
}

// ============================================
// ARTICLE FUNCTIONS
// ============================================

/**
 * Parse page thành Article object
 */
function parseArticle(page: PageObjectResponse): Article {
  const props = page.properties;

  // Helper để lấy giá trị property an toàn
  const getTitle = (prop: unknown): string => {
    if (prop && typeof prop === 'object' && 'title' in prop) {
      const titleProp = prop as { title: RichTextItemResponse[] };
      return getRichTextContent(titleProp.title);
    }
    return '';
  };

  const getRichText = (prop: unknown): string => {
    if (prop && typeof prop === 'object' && 'rich_text' in prop) {
      const rtProp = prop as { rich_text: RichTextItemResponse[] };
      return getRichTextContent(rtProp.rich_text);
    }
    return '';
  };

  const getSelect = (prop: unknown): string => {
    if (prop && typeof prop === 'object' && 'select' in prop) {
      const selectProp = prop as { select: { name: string } | null };
      return selectProp.select?.name || '';
    }
    return '';
  };

  const getMultiSelect = (prop: unknown): string[] => {
    if (prop && typeof prop === 'object' && 'multi_select' in prop) {
      const msProp = prop as { multi_select: Array<{ name: string }> };
      return msProp.multi_select.map((s) => s.name);
    }
    return [];
  };

  const getNumber = (prop: unknown): number => {
    if (prop && typeof prop === 'object' && 'number' in prop) {
      const numProp = prop as { number: number | null };
      return numProp.number || 0;
    }
    return 0;
  };

  const getCheckbox = (prop: unknown): boolean => {
    if (prop && typeof prop === 'object' && 'checkbox' in prop) {
      const cbProp = prop as { checkbox: boolean };
      return cbProp.checkbox;
    }
    return false;
  };

  const getDate = (prop: unknown): string => {
    if (prop && typeof prop === 'object' && 'date' in prop) {
      const dateProp = prop as { date: { start: string } | null };
      return dateProp.date?.start || '';
    }
    return '';
  };

  const getRelation = (prop: unknown): string => {
    if (prop && typeof prop === 'object' && 'relation' in prop) {
      const relProp = prop as { relation: Array<{ id: string }> };
      return relProp.relation[0]?.id || '';
    }
    return '';
  };

  // Lấy cover image
  let coverImage: string | null = null;
  if (page.cover) {
    coverImage = getFileUrl(page.cover as { type: 'external'; external: { url: string } } | { type: 'file'; file: { url: string } });
  }

  return {
    id: page.id,
    title: getTitle(props.Title) || getTitle(props.Name) || getTitle(props['Tiêu đề']),
    slug: getRichText(props.Slug) || getRichText(props.slug) || page.id,
    excerpt: getRichText(props.Excerpt) || getRichText(props['Mô tả']) || getRichText(props.Description),
    content: '', // Sẽ được lấy riêng qua getPageBlocks
    coverImage,
    category: getSelect(props.Category) || getSelect(props['Danh mục']),
    categoryId: getRelation(props.Category) || getRelation(props['Danh mục']),
    author: getRichText(props.Author) || getRichText(props['Tác giả']) || 'Admin',
    publishedAt: getDate(props.PublishedAt) || getDate(props['Ngày đăng']) || page.created_time,
    updatedAt: page.last_edited_time,
    status: getSelect(props.Status) === 'Published' || getSelect(props['Trạng thái']) === 'Đã xuất bản' ? 'published' : 'draft',
    views: getNumber(props.Views) || getNumber(props['Lượt xem']),
    tags: getMultiSelect(props.Tags) || getMultiSelect(props['Thẻ']),
    featured: getCheckbox(props.Featured) || getCheckbox(props['Nổi bật']),
  };
}

/**
 * Lấy tất cả bài viết
 */
export async function getAllArticles(options?: {
  status?: 'published' | 'draft' | 'all';
  category?: string;
  limit?: number;
  featured?: boolean;
}): Promise<Article[]> {
  if (!DATABASES.articles) {
    return [];
  }

  // Xây dựng filter
  const filters: Array<{
    property: string;
    select?: { equals: string };
    checkbox?: { equals: boolean };
  }> = [];

  if (options?.status && options.status !== 'all') {
    filters.push({
      property: 'Status',
      select: { equals: options.status === 'published' ? 'Published' : 'Draft' },
    });
  }

  if (options?.category) {
    filters.push({
      property: 'Category',
      select: { equals: options.category },
    });
  }

  if (options?.featured !== undefined) {
    filters.push({
      property: 'Featured',
      checkbox: { equals: options.featured },
    });
  }

  const filter = filters.length > 0
    ? { and: filters }
    : undefined;

  const response = await queryDatabase(DATABASES.articles, {
    filter,
    sorts: [{ timestamp: 'created_time', direction: 'descending' }],
    pageSize: options?.limit || 100,
  });

  const articles: Article[] = [];
  for (const page of response.results) {
    if (isFullPage(page)) {
      articles.push(parseArticle(page));
    }
  }

  return articles;
}

/**
 * Lấy bài viết theo ID
 */
export async function getArticleById(pageId: string): Promise<Article | null> {
  try {
    const page = await getPage(pageId);
    if (!isFullPage(page as PageObjectResponse | PartialPageObjectResponse)) {
      return null;
    }
    const article = parseArticle(page as PageObjectResponse);
    
    // Lấy nội dung
    const blocks = await getPageBlocksRecursive(pageId);
    article.content = blocksToHtml(blocks);
    
    return article;
  } catch (error) {
    return null;
  }
}

/**
 * Lấy bài viết theo slug
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (!DATABASES.articles) return null;

  const response = await queryDatabase(DATABASES.articles, {
    filter: {
      or: [
        { property: 'Slug', rich_text: { equals: slug } },
        { property: 'slug', rich_text: { equals: slug } },
      ],
    },
    pageSize: 1,
  });

  if (response.results.length === 0) return null;

  const page = response.results[0];
  if (!isFullPage(page)) return null;

  const article = parseArticle(page);
  
  // Lấy nội dung
  const blocks = await getPageBlocksRecursive(page.id);
  article.content = blocksToHtml(blocks);

  return article;
}

/**
 * Lấy bài viết nổi bật
 */
export async function getFeaturedArticles(limit: number = 4): Promise<Article[]> {
  return getAllArticles({ status: 'published', featured: true, limit });
}

/**
 * Lấy bài viết mới nhất
 */
export async function getLatestArticles(limit: number = 6): Promise<Article[]> {
  return getAllArticles({ status: 'published', limit });
}

/**
 * Lấy bài viết theo danh mục
 */
export async function getArticlesByCategory(category: string, limit?: number): Promise<Article[]> {
  return getAllArticles({ status: 'published', category, limit });
}

// ============================================
// CATEGORY FUNCTIONS
// ============================================

/**
 * Lấy tất cả danh mục
 */
export async function getAllCategories(): Promise<Category[]> {
  if (!DATABASES.categories) {
    return [];
  }

  const pages = await getAllFromDatabase(DATABASES.categories);
  const categories: Category[] = [];

  for (const page of pages) {
    if (!isFullPage(page)) continue;

    const props = page.properties;

    // Helper functions
    const getTitle = (prop: unknown): string => {
      if (prop && typeof prop === 'object' && 'title' in prop) {
        return getRichTextContent((prop as { title: RichTextItemResponse[] }).title);
      }
      return '';
    };

    const getRichText = (prop: unknown): string => {
      if (prop && typeof prop === 'object' && 'rich_text' in prop) {
        return getRichTextContent((prop as { rich_text: RichTextItemResponse[] }).rich_text);
      }
      return '';
    };

    const getNumber = (prop: unknown): number => {
      if (prop && typeof prop === 'object' && 'number' in prop) {
        return (prop as { number: number | null }).number || 0;
      }
      return 0;
    };

    const getSelect = (prop: unknown): string => {
      if (prop && typeof prop === 'object' && 'select' in prop) {
        return (prop as { select: { name: string } | null }).select?.name || '';
      }
      return '';
    };

    const getRelation = (prop: unknown): string | null => {
      if (prop && typeof prop === 'object' && 'relation' in prop) {
        const rel = (prop as { relation: Array<{ id: string }> }).relation;
        return rel[0]?.id || null;
      }
      return null;
    };

    categories.push({
      id: page.id,
      name: getTitle(props.Name) || getTitle(props['Tên']),
      slug: getRichText(props.Slug) || getRichText(props.slug),
      description: getRichText(props.Description) || getRichText(props['Mô tả']),
      parentId: getRelation(props.Parent) || getRelation(props['Danh mục cha']),
      order: getNumber(props.Order) || getNumber(props['Thứ tự']),
      color: getSelect(props.Color) || getSelect(props['Màu']) || '#17b978',
    });
  }

  // Sắp xếp theo order
  return categories.sort((a, b) => a.order - b.order);
}

// ============================================
// MENU FUNCTIONS
// ============================================

/**
 * Lấy tất cả menu items
 */
export async function getAllMenuItems(): Promise<MenuItem[]> {
  if (!DATABASES.menu) {
    return [];
  }

  const pages = await getAllFromDatabase(DATABASES.menu);
  const menuItems: MenuItem[] = [];

  for (const page of pages) {
    if (!isFullPage(page)) continue;

    const props = page.properties;

    // Helper functions
    const getTitle = (prop: unknown): string => {
      if (prop && typeof prop === 'object' && 'title' in prop) {
        return getRichTextContent((prop as { title: RichTextItemResponse[] }).title);
      }
      return '';
    };

    const getRichText = (prop: unknown): string => {
      if (prop && typeof prop === 'object' && 'rich_text' in prop) {
        return getRichTextContent((prop as { rich_text: RichTextItemResponse[] }).rich_text);
      }
      return '';
    };

    const getNumber = (prop: unknown): number => {
      if (prop && typeof prop === 'object' && 'number' in prop) {
        return (prop as { number: number | null }).number || 0;
      }
      return 0;
    };

    const getCheckbox = (prop: unknown): boolean => {
      if (prop && typeof prop === 'object' && 'checkbox' in prop) {
        return (prop as { checkbox: boolean }).checkbox;
      }
      return true;
    };

    const getRelation = (prop: unknown): string | null => {
      if (prop && typeof prop === 'object' && 'relation' in prop) {
        const rel = (prop as { relation: Array<{ id: string }> }).relation;
        return rel[0]?.id || null;
      }
      return null;
    };

    const getUrl = (prop: unknown): string => {
      if (prop && typeof prop === 'object' && 'url' in prop) {
        return (prop as { url: string | null }).url || '#';
      }
      return '#';
    };

    menuItems.push({
      id: page.id,
      name: getTitle(props.Name) || getTitle(props['Tên']),
      link: getUrl(props.Link) || getRichText(props.Link) || getRichText(props['Đường dẫn']) || '#',
      parentId: getRelation(props.Parent) || getRelation(props['Menu cha']),
      order: getNumber(props.Order) || getNumber(props['Thứ tự']),
      isActive: getCheckbox(props.Active) ?? getCheckbox(props['Hiển thị']) ?? true,
    });
  }

  // Sắp xếp theo order
  return menuItems.sort((a, b) => a.order - b.order);
}

/**
 * Xây dựng cây menu từ flat list
 */
export function buildMenuTree(menuItems: MenuItem[]): (MenuItem & { children: MenuItem[] })[] {
  const itemMap = new Map<string, MenuItem & { children: MenuItem[] }>();
  const roots: (MenuItem & { children: MenuItem[] })[] = [];

  // Tạo map với children array
  menuItems.forEach((item) => {
    itemMap.set(item.id, { ...item, children: [] });
  });

  // Xây dựng cây
  menuItems.forEach((item) => {
    const current = itemMap.get(item.id)!;
    if (item.parentId && itemMap.has(item.parentId)) {
      itemMap.get(item.parentId)!.children.push(current);
    } else {
      roots.push(current);
    }
  });

  return roots;
}

// ============================================
// EXPORT NOTION CLIENT (cho advanced use cases)
// ============================================

export { notion };
export type { PageObjectResponse, DatabaseObjectResponse, BlockObjectResponse };

