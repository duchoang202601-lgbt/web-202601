import { getNotionPageWithContent } from '@/lib/notion-to-md';
import './notion-content.css';

// Page ID từ URL Notion
const NOTION_PAGE_ID = '2cf028be02d2802f8986da556544c2c2';

export const metadata = {
  title: 'Bài viết - Viện văn hóa và chăm sóc sức khỏe cộng đồng',
  description: 'Nội dung từ Notion',
};

// Revalidate mỗi 60 giây
export const revalidate = 60;

export default async function NotionPageDisplay() {
  const pageData = await getNotionPageWithContent(NOTION_PAGE_ID);

  if (!pageData) {
    return (
      <div className="container p-t-70 p-b-70">
        <div className="text-center">
          <h3>Không thể tải nội dung</h3>
          <p>Vui lòng kiểm tra NOTION_API_KEY và quyền truy cập page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container p-t-30 p-b-70">
      {/* Page Header */}
      <div className="notion-page-header p-b-30">
        {/* Cover Image */}
        {pageData.cover && (
          <div className="notion-cover m-b-20">
            <img 
              src={pageData.cover} 
              alt={pageData.title} 
              style={{ 
                width: '100%', 
                height: '200px', 
                objectFit: 'cover',
                borderRadius: '8px'
              }} 
            />
          </div>
        )}
        
        {/* Title với Icon */}
        <h1 className="f1-l-1 cl2" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          {pageData.icon && (
            <span style={{ marginRight: '12px' }}>
              {pageData.icon.startsWith('http') ? (
                <img 
                  src={pageData.icon} 
                  alt="icon" 
                  style={{ width: '40px', height: '40px', verticalAlign: 'middle' }} 
                />
              ) : (
                pageData.icon
              )}
            </span>
          )}
          {pageData.title}
        </h1>
        
        {/* Thời gian */}
        <p className="f1-s-1 cl6">
          Cập nhật: {new Date(pageData.lastEditedTime).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>

      {/* Nội dung từ Notion */}
      <div className="notion-content" dangerouslySetInnerHTML={{ __html: pageData.html }} />
    </div>
  );
}
