import { getNotionPageWithContent } from '@/lib/notion-to-md';
import { notFound } from 'next/navigation';
import '../notion-content.css';

// Revalidate mỗi 60 giây
export const revalidate = 60;

// Generate metadata động
export async function generateMetadata({ params }: { params: { id: string } }) {
  const pageData = await getNotionPageWithContent(params.id);
  if (!pageData) {
    return { title: 'Không tìm thấy trang' };
  }
  return {
    title: `${pageData.title} - Viện văn hóa và chăm sóc sức khỏe cộng đồng`,
    description: `Nội dung: ${pageData.title}`,
  };
}

export default async function DynamicNotionPage({ params }: { params: { id: string } }) {
  const pageData = await getNotionPageWithContent(params.id);

  if (!pageData) {
    notFound();
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
