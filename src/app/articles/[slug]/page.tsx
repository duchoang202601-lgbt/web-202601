import { getArticleBySlug } from '@/lib/notion'
import { getNotionPageWithContent } from '@/lib/notion-to-md'
import { getCategoryName } from '@/lib/categoryUtils'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ArticleSidebar from '@/components/ArticleSidebar'
import CommentForm from '@/components/CommentForm'
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
    <>
      {/* Breadcrumb + Search */}
      <div className="container search-container">
        <div className="bg0 flex-wr-sb-c p-rl-20 p-tb-8">
          {/* Breadcrumb */}
          <div className="f2-s-1 p-r-30 m-tb-6 flex-wr-s-c" style={{ fontSize: '13px' }}>
            <Link 
              href="/" 
              className="hov-cl10 trans-03"
              style={{ color: '#999' }}
            >
              Trang chủ
            </Link>
            <span style={{ color: '#ccc', margin: '0 12px' }}>&gt;</span>
            {article.category && (
              <>
                <Link 
                  href={`/category/${article.category}`}
                  className="hov-cl10 trans-03"
                  style={{ color: '#999' }}
                >
                  {categoryName}
                </Link>
                <span style={{ color: '#ccc', margin: '0 12px' }}>&gt;</span>
              </>
            )}
            {article.subCategory && (
              <>
                <Link 
                  href={`/category/${article.category}/${article.subCategory}`}
                  className="hov-cl10 trans-03"
                  style={{ color: '#999' }}
                >
                  {subCategoryName}
                </Link>
                <span style={{ color: '#ccc', margin: '0 12px' }}>&gt;</span>
              </>
            )}
            <span style={{ color: '#999' }}>Bài viết</span>
          </div>

          {/* Phần Tìm kiếm */}
          <div className="pos-relative size-a-2 bo-1-rad-22 of-hidden bocl11 m-tb-6 search-section">
            <input className="f1-s-1 cl6 plh9 s-full p-l-25 p-r-45" type="text" name="search" placeholder="Tìm kiếm" />
            <button className="flex-c-c size-a-1 ab-t-r fs-20 cl2 hov-cl10 trans-03">
              <i className="zmdi zmdi-search"></i>
            </button>
          </div>
        </div>
      </div>

      <section className="bg0 p-b-55">
        <div className="container">
          <div className="row justify-content-center">
            {/* Main Content */}
            <div className="col-md-10 col-lg-8 p-b-30">
              {/* Category + Article Info */}
              <div className="p-b-20 bo-b-1 bocl11 m-b-20">
                <div className="how2 how2-cl2 flex-s-c">
                  <h3 className="f1-m-2 cl3 tab01-title">
                    {article.subCategory ? (
                      <Link href={`/category/${article.category}/${article.subCategory}`} className="cl3 hov-cl10">
                        {subCategoryName || 'Danh mục'}
                      </Link>
                    ) : article.category ? (
                      <Link href={`/category/${article.category}`} className="cl3 hov-cl10">
                        {categoryName || 'Chuyên mục'}
                      </Link>
                    ) : 'Bài viết'}
                  </h3>
                </div>
                <div className="p-t-15">
                  {article.category && (
                    <>
                      <span className="f1-s-3 cl6">Chuyên mục: </span>
                      <Link href={`/category/${article.category}`} className="f1-s-3 cl10 hov-cl10">
                        {categoryName}
                      </Link>
                    </>
                  )}
                  {article.subCategory && (
                    <>
                      <span className="f1-s-3 cl6 m-l-20">Danh mục: </span>
                      <Link href={`/category/${article.category}/${article.subCategory}`} className="f1-s-3 cl10 hov-cl10">
                        {subCategoryName}
                      </Link>
                    </>
                  )}
                  <span className="f1-s-3 cl6 m-l-20">Ngày đăng: </span>
                  <span className="f1-s-3 cl3">{formatDate(article.createdAt)}</span>
                </div>
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

            {/* Author */}
            <div className="p-b-20">
              <span className="f1-s-3 cl8">
                <i className="fa fa-user m-r-5"></i>
                Viện Phát triển Văn hóa và Chăm sóc Sức khỏe Cộng đồng
              </span>
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

            {/* Comment Section */}
            <CommentForm articleSlug={article.slug} />

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
            <div className="p-t-30-sr991">
              {/* Article Sidebar - Popular, Subscribe, Documents */}
              <ArticleSidebar />
            </div>
          </div>
        </div>
        </div>
      </section>
    </>
  )
}

