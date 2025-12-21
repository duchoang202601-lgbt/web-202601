import Link from 'next/link';

export default function CategoryPage() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="container search-container">
        <div className="headline bg0 flex-wr-sb-c p-rl-20 p-tb-8">
          <div className="f2-s-1 p-r-30 m-tb-6">
            <Link href="/" className="breadcrumb-item f1-s-3 cl9">
              Trang chủ
            </Link>
            <span className="breadcrumb-item f1-s-3 cl9">
              Văn hóa
            </span>
          </div>

          <div className="pos-relative size-a-2 bo-1-rad-22 of-hidden bocl11 m-tb-6 search-section">
            <input className="f1-s-1 cl6 plh9 s-full p-l-25 p-r-45" type="text" name="search" placeholder="Tìm kiếm" />
            <button className="flex-c-c size-a-1 ab-t-r fs-20 cl2 hov-cl10 trans-03">
              <i className="zmdi zmdi-search"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Category Content */}
      <section className="bg0 p-b-55">
        <div className="container">
          <div className="row justify-content-center">
            {/* Main content */}
            <div className="col-md-10 col-lg-8 p-b-30">
              <div className="p-r-10 p-r-0-sr991">
                {/* Category title */}
                <div className="how1 how1-cl2 flex-s-c m-b-30">
                  <h3 className="f1-m-2 cl2 tab01-title">
                    Văn hóa
                  </h3>
                </div>

                {/* Featured article */}
                <div className="row m-b-30">
                  <div className="col-12">
                    <div className="wrap-pic-w hov1 trans-03 m-b-15">
                      <Link href="/articles">
                        <img src="/images/post-38.jpg" alt="IMG" />
                      </Link>
                    </div>
                    <h3 className="p-b-10">
                      <Link href="/articles" className="f1-l-1 cl2 hov-cl10 trans-03">
                        Bảo tồn và phát huy giá trị văn hóa, bản sắc của nền y học cổ truyền Việt Nam
                      </Link>
                    </h3>
                    <span className="cl8">
                      <span className="f1-s-3">27 Tháng 11</span>
                      <span className="f1-s-3 m-rl-3">-</span>
                      <span className="f1-s-3">702.976 lượt xem</span>
                    </span>
                    <p className="f1-s-1 cl6 p-t-15">
                      Trong những năm qua, việc bảo tồn và phát huy giá trị văn hóa truyền thống 
                      luôn là một trong những nhiệm vụ trọng tâm của ngành y tế và các cơ quan 
                      quản lý văn hóa...
                    </p>
                  </div>
                </div>

                {/* Article list */}
                {[
                  { id: 1, image: '/images/post-39.jpg', title: 'Khám phá nét đẹp văn hóa vùng cao Tây Bắc', date: '25 Tháng 11', views: '45.231' },
                  { id: 2, image: '/images/post-40.jpg', title: 'Lễ hội truyền thống - Di sản văn hóa phi vật thể', date: '24 Tháng 11', views: '38.567' },
                  { id: 3, image: '/images/post-41.jpg', title: 'Nghệ thuật dân gian trong đời sống hiện đại', date: '23 Tháng 11', views: '29.123' },
                  { id: 4, image: '/images/post-42.jpg', title: 'Bảo tồn làng nghề truyền thống Việt Nam', date: '22 Tháng 11', views: '52.890' },
                  { id: 5, image: '/images/post-43.jpg', title: 'Ẩm thực Việt - Hương vị quê hương', date: '21 Tháng 11', views: '41.234' },
                  { id: 6, image: '/images/post-44.jpg', title: 'Di tích lịch sử và văn hóa cần được bảo vệ', date: '20 Tháng 11', views: '33.678' },
                ].map((article) => (
                  <div key={article.id} className="flex-wr-sb-s p-b-30 m-b-30 bo-b-1 bocl11">
                    <Link href="/articles" className="size-w-8 wrap-pic-w hov1 trans-03">
                      <img src={article.image} alt="IMG" />
                    </Link>
                    <div className="size-w-9 p-l-25 p-l-0-sr991 p-t-10-sr991">
                      <h5 className="p-b-10">
                        <Link href="/articles" className="f1-m-3 cl2 hov-cl10 trans-03">
                          {article.title}
                        </Link>
                      </h5>
                      <span className="cl8">
                        <span className="f1-s-3">{article.date}</span>
                        <span className="f1-s-3 m-rl-3">-</span>
                        <span className="f1-s-3">{article.views} lượt xem</span>
                      </span>
                      <p className="f1-s-1 cl6 p-t-10 how-txt4">
                        Nội dung tóm tắt bài viết sẽ được hiển thị ở đây. Đây là phần mô tả ngắn 
                        giúp người đọc hiểu được nội dung chính của bài viết...
                      </p>
                    </div>
                  </div>
                ))}

                {/* Pagination */}
                <div className="flex-wr-c-c p-t-15">
                  <a href="#" className="pagi-item flex-c-c m-all-5 trans-03">
                    <i className="fas fa-chevron-left"></i>
                  </a>
                  <a href="#" className="pagi-item pagi-active flex-c-c m-all-5 trans-03">1</a>
                  <a href="#" className="pagi-item flex-c-c m-all-5 trans-03">2</a>
                  <a href="#" className="pagi-item flex-c-c m-all-5 trans-03">3</a>
                  <span className="pagi-item flex-c-c m-all-5">...</span>
                  <a href="#" className="pagi-item flex-c-c m-all-5 trans-03">10</a>
                  <a href="#" className="pagi-item flex-c-c m-all-5 trans-03">
                    <i className="fas fa-chevron-right"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-md-10 col-lg-4 p-b-30">
              <div className="p-l-10 p-rl-0-sr991 p-b-20">
                {/* Popular Posts */}
                <div className="p-b-30">
                  <div className="how1 how1-cl6 flex-s-c m-b-25">
                    <h3 className="f1-m-2 cl6 tab01-title">
                      Bài viết phổ biến
                    </h3>
                  </div>

                  {[
                    { id: 1, image: '/images/popular-post-01.jpg', title: 'Vĩnh biệt TTND. GS.TS.BS Hoàng Bảo Châu', date: '27 Tháng 11' },
                    { id: 2, image: '/images/popular-post-02.jpg', title: 'Ấm lòng với 1000 phần quà hỗ trợ', date: '26 Tháng 11' },
                    { id: 3, image: '/images/popular-post-03.jpg', title: 'Doanh nhân thời kỳ mới: Tự hào', date: '25 Tháng 11' },
                    { id: 4, image: '/images/popular-post-04.jpg', title: 'Chăm sóc sức khỏe người cao tuổi', date: '24 Tháng 11' },
                  ].map((post) => (
                    <div key={post.id} className="flex-wr-sb-s m-b-20">
                      <Link href="/articles" className="size-w-10 wrap-pic-w hov1 trans-03">
                        <img src={post.image} alt="IMG" />
                      </Link>
                      <div className="size-w-11 p-l-15">
                        <h5 className="p-b-5">
                          <Link href="/articles" className="f1-s-5 cl3 hov-cl10 trans-03">
                            {post.title}
                          </Link>
                        </h5>
                        <span className="f1-s-6 cl6">{post.date}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="p-b-30">
                  <div className="how1 how1-cl4 flex-s-c m-b-25">
                    <h3 className="f1-m-2 cl4 tab01-title">
                      Tags
                    </h3>
                  </div>

                  <div className="flex-wr-s-s m-rl--5">
                    {['Văn hóa', 'Truyền thống', 'Di sản', 'Lễ hội', 'Nghệ thuật', 'Ẩm thực', 'Du lịch', 'Làng nghề'].map((tag, index) => (
                      <a 
                        key={index} 
                        href="#" 
                        className="flex-c-c size-h-2 bo-1-rad-20 bocl12 f1-s-1 cl8 hov-btn2 trans-03 p-rl-20 p-tb-5 m-all-5"
                      >
                        {tag}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

