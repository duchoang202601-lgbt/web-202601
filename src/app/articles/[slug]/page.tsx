import { getArticleBySlug } from '@/lib/notion'
import { getNotionPageWithContent } from '@/lib/notion-to-md'
import { getCategoryName } from '@/lib/categoryUtils'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import '../../notion-page/notion-content.css'

// Revalidate mỗi 60 giây
export const revalidate = 60

// Generate metadata động
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug)
  if (!article) {
    return { title: 'Không tìm thấy bài viết' }
  }
  return {
    title: `${article.title} - Viện văn hóa và chăm sóc sức khỏe cộng đồng`,
    description: article.summary || `Đọc bài viết: ${article.title}`,
    openGraph: {
      title: article.title,
      description: article.summary,
      images: article.cover ? [article.cover] : [],
    },
  }
}

export default async function ArticleDetailPage({ params }: { params: { slug: string } }) {
  // Lấy thông tin bài viết từ database
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  // Lấy nội dung chi tiết từ Notion page
  const pageContent = await getNotionPageWithContent(article.id)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const categoryName = getCategoryName(article.category)
  const subCategoryName = getCategoryName(article.subCategory)

  return (
    <div className="bg0 p-t-70 p-b-55">
      <div className="container">
        <div className="row justify-content-center">
          {/* Main Content */}
          <div className="col-md-10 col-lg-8">
            {/* Breadcrumb */}
            <div className="p-b-20">
              <Link href="/" className="f1-s-3 cl8 hov-cl10 trans-03">
                Trang chủ
              </Link>
              <span className="f1-s-3 cl8 m-lr-5">/</span>
              {article.category && (
                <>
                  <Link 
                    href={`/category/${article.category}`} 
                    className="f1-s-3 cl8 hov-cl10 trans-03"
                  >
                    {categoryName}
                  </Link>
                  <span className="f1-s-3 cl8 m-lr-5">/</span>
                </>
              )}
              {article.subCategory && (
                <>
                  <Link 
                    href={`/category/${article.category}/${article.subCategory}`} 
                    className="f1-s-3 cl8 hov-cl10 trans-03"
                  >
                    {subCategoryName}
                  </Link>
                  <span className="f1-s-3 cl8 m-lr-5">/</span>
                </>
              )}
              <span className="f1-s-3 cl6">{article.title}</span>
            </div>

            {/* Article Header */}
            <div className="p-b-30">
              {/* Category Badge */}
              <div className="p-b-15">
                {article.subCategory ? (
                  <Link 
                    href={`/category/${article.category}/${article.subCategory}`}
                    className="f1-s-2 cl0 bg-main p-lr-15 p-tb-5 bor-rad-3"
                    style={{ backgroundColor: '#17b978', display: 'inline-block' }}
                  >
                    {subCategoryName}
                  </Link>
                ) : article.category ? (
                  <Link 
                    href={`/category/${article.category}`}
                    className="f1-s-2 cl0 bg-main p-lr-15 p-tb-5 bor-rad-3"
                    style={{ backgroundColor: '#17b978', display: 'inline-block' }}
                  >
                    {categoryName}
                  </Link>
                ) : null}
              </div>

              {/* Title */}
              <h1 className="f1-l-1 cl2 p-b-15" style={{ fontSize: '2rem', lineHeight: '1.4' }}>
                {article.title}
              </h1>

              {/* Meta Info */}
              <div className="flex-wr-s-c p-b-20">
                <span className="f1-s-3 cl8 m-r-15">
                  <i className="fa fa-calendar-o m-r-5"></i>
                  {formatDate(article.createdAt)}
                </span>
                <span className="f1-s-3 cl8">
                  <i className="fa fa-user m-r-5"></i>
                  Viện Phát triển Văn hóa và Chăm sóc Sức khỏe Cộng đồng
                </span>
              </div>

              {/* Summary */}
              {article.summary && (
                <p className="f1-s-1 cl6 p-b-20" style={{ fontStyle: 'italic', borderLeft: '3px solid #17b978', paddingLeft: '15px' }}>
                  {article.summary}
                </p>
              )}

              {/* Cover Image */}
              {article.cover && (
                <div className="wrap-pic-w p-b-30">
                  <img 
                    src={article.cover} 
                    alt={article.title}
                    style={{ width: '100%', borderRadius: '8px' }}
                  />
                </div>
              )}
            </div>

            {/* Article Content */}
            <div className="p-b-40">
              {pageContent?.html ? (
                <div 
                  className="notion-content" 
                  dangerouslySetInnerHTML={{ __html: pageContent.html }} 
                />
              ) : (
                <p className="f1-s-1 cl6">Nội dung đang được cập nhật...</p>
              )}
            </div>

            {/* Share Buttons */}
            <div className="p-t-30 p-b-30 bo-t-1 bo-b-1 bocl11">
              <div className="flex-wr-s-c">
                <span className="f1-s-1 cl2 m-r-15">Chia sẻ:</span>
                <a href="#" className="size-a-8 flex-c-c borad-3 fs-16 cl0 hov-cl0 m-r-10" style={{ backgroundColor: '#3b5998', width: '36px', height: '36px' }}>
                  <span className="fab fa-facebook-f"></span>
                </a>
                <a href="#" className="size-a-8 flex-c-c borad-3 fs-16 cl0 hov-cl0 m-r-10" style={{ backgroundColor: '#1da1f2', width: '36px', height: '36px' }}>
                  <span className="fab fa-twitter"></span>
                </a>
                <a href="#" className="size-a-8 flex-c-c borad-3 fs-16 cl0 hov-cl0" style={{ backgroundColor: '#bd081c', width: '36px', height: '36px' }}>
                  <span className="fab fa-pinterest-p"></span>
                </a>
              </div>
            </div>

            {/* Back Link */}
            <div className="p-t-30">
              <Link href="/" className="f1-s-1 cl10 hov-cl10 trans-03">
                <i className="fa fa-arrow-left m-r-10"></i>
                Quay lại trang chủ
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-md-10 col-lg-4">
            <div className="p-l-10 p-rl-0-sr991 p-t-70 p-t-30-sr991">
              {/* Related Info */}
              <div className="p-b-30">
                <div className="how2 how2-cl4 flex-s-c m-b-20">
                  <h3 className="f1-m-2 cl3 tab01-title">Thông tin bài viết</h3>
                </div>
                <ul className="p-t-10">
                  {article.category && (
                    <li className="p-b-10">
                      <span className="f1-s-3 cl6">Chuyên mục: </span>
                      <Link href={`/category/${article.category}`} className="f1-s-3 cl10 hov-cl10">
                        {categoryName}
                      </Link>
                    </li>
                  )}
                  {article.subCategory && (
                    <li className="p-b-10">
                      <span className="f1-s-3 cl6">Danh mục: </span>
                      <Link href={`/category/${article.category}/${article.subCategory}`} className="f1-s-3 cl10 hov-cl10">
                        {subCategoryName}
                      </Link>
                    </li>
                  )}
                  <li className="p-b-10">
                    <span className="f1-s-3 cl6">Ngày đăng: </span>
                    <span className="f1-s-3 cl3">{formatDate(article.createdAt)}</span>
                  </li>
                </ul>
              </div>

              {/* Banner */}
              <div className="flex-c-s p-b-30">
                <a href="#">
                  <img className="max-w-full" src="/images/banner-02.png" alt="IMG" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

