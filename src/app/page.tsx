'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrendingNews from '@/components/TrendingNews';

export default function Home() {
  return (
    <>
      {/* Headline */}
      <div className="container search-container">
        <div className="bg0 flex-wr-sb-c p-rl-20 p-tb-8">
          {/* Phần Trending Now */}
          <div className="f2-s-1 p-r-30 size-w-0 m-tb-6 flex-wr-s-c trending-now-section">
            <span className="text-uppercase cl2 p-r-8">Tin nổi bật:</span>
            <TrendingNews />
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
        
      {/* Feature post */}
      <section className="bg0">
        <div className="container">
          <div className="row m-rl--1">
            <div className="col-md-6 p-rl-1 p-b-2">
              <div className="bg-img1 size-a-3 how1 pos-relative" style={{ backgroundImage: 'url(/images/post-01.jpg)' }}>
                <Link href="/articles" className="dis-block how1-child1 trans-03"></Link>
                <div className="flex-col-e-s s-full p-rl-25 p-tb-20">
                  <a href="#" className="dis-block how1-child2 f1-s-2 cl0 bo-all-1 bocl0 hov-btn1 trans-03 p-rl-5 p-t-2">
                    Sống khỏe
                  </a>
                  <h3 className="how1-child2 m-t-14 m-b-10">
                    <Link href="/articles" className="how-txt1 size-a-6 f1-l-1 cl0 hov-cl10 trans-03">
                      VĨNH BIỆT THẦY THUỐC NHÂN DÂN, GIÁO SƯ, BÁC SỸ HOÀNG BẢO CHÂU - CÂY ĐẠI THỤ NGÀNH ĐÔNG Y VIỆT NAM
                    </Link>
                  </h3>
                  <span className="how1-child2">
                    <span className="f1-s-3 cl11">27/11/2025</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="col-md-6 p-rl-1">
              <div className="row m-rl--1">
                <div className="col-12 p-rl-1 p-b-2">
                  <div className="bg-img1 size-a-4 how1 pos-relative" style={{ backgroundImage: 'url(/images/post-02.jpg)' }}>
                    <a href="#" className="dis-block how1-child1 trans-03"></a>
                    <div className="flex-col-e-s s-full p-rl-25 p-tb-24">
                      <a href="#" className="dis-block how1-child2 f1-s-2 cl0 bo-all-1 bocl0 hov-btn1 trans-03 p-rl-5 p-t-2">
                        Tư vấn
                      </a>
                      <h3 className="how1-child2 m-t-14">
                        <a href="#" className="how-txt1 size-a-7 f1-l-2 cl0 hov-cl10 trans-03">
                          Ấm lòng với 1000 phần quà hỗ trợ trao tặng cho bà con vùng lũ Thái Nguyên
                        </a>
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6 p-rl-1 p-b-2">
                  <div className="bg-img1 size-a-5 how1 pos-relative" style={{ backgroundImage: 'url(/images/post-03.jpg)' }}>
                    <a href="#" className="dis-block how1-child1 trans-03"></a>
                    <div className="flex-col-e-s s-full p-rl-25 p-tb-20">
                      <a href="#" className="dis-block how1-child2 f1-s-2 cl0 bo-all-1 bocl0 hov-btn1 trans-03 p-rl-5 p-t-2">
                        Doanh nghiệp và thương hiệu
                      </a>
                      <h3 className="how1-child2 m-t-14">
                        <a href="#" className="how-txt1 size-h-1 f1-m-1 cl0 hov-cl10 trans-03">
                          Doanh nhân thời kỳ mới: &quot;Tự hào - Yêu nước - Trí tuệ - Nhân văn - Đạo đức - Hội nhập - Phát triển - Đột phá&quot;
                        </a>
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6 p-rl-1 p-b-2">
                  <div className="bg-img1 size-a-5 how1 pos-relative" style={{ backgroundImage: 'url(/images/post-04.jpg)' }}>
                    <a href="#" className="dis-block how1-child1 trans-03"></a>
                    <div className="flex-col-e-s s-full p-rl-25 p-tb-20">
                      <a href="#" className="dis-block how1-child2 f1-s-2 cl0 bo-all-1 bocl0 hov-btn1 trans-03 p-rl-5 p-t-2">
                        Sống khỏe
                      </a>
                      <h3 className="how1-child2 m-t-14">
                        <a href="#" className="how-txt1 size-h-1 f1-m-1 cl0 hov-cl10 trans-03">
                          Bảo tồn và phát huy giá trị văn hóa, bản sắc của nền y học cổ truyền Việt Nam
                        </a>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Post sections */}
      <section className="bg0 p-t-70">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-8">
              <div className="p-b-20">
                {/* Tin tức Tab */}
                <NewsTab />

                {/* Kinh tế Tab */}
                <EconomyTab />

                {/* Văn hóa Tab */}
                <CultureTab />
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-md-10 col-lg-4">
              <Sidebar />
            </div>
          </div>
        </div>
      </section>

      {/* Banner */}
      <div className="container">
        <div className="flex-c-c">
          <a href="#">
            <img className="max-w-full" src="/images/banner-01.jpg" alt="IMG" />
          </a>
        </div>
      </div>

      {/* Latest Posts */}
      <LatestPosts />
    </>
  );
}

// News Tab Component
function NewsTab() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('tab1-1');

  const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, tabId: string) => {
    e.preventDefault();
    setActiveTab(tabId);
  };

  return (
    <div className="tab01 p-b-20">
      <div className="tab01-head how2 how2-cl1 bocl12 flex-s-c m-r-10 m-r-0-sr991 tab-section-news">
        <h3 className="f1-m-2 cl12 tab01-title">Tin tức</h3>
        <div className="tab-nav-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
              <a 
                className={`nav-link ${activeTab === 'tab1-1' ? 'active' : ''}`} 
                data-toggle="tab" 
                href="#tab1-1" 
                role="tab"
                onClick={(e) => handleTabClick(e, 'tab1-1')}
              >
                Tất cả
              </a>
            </li>
            <li className="nav-item mobile-hidden">
              <a 
                className={`nav-link ${activeTab === 'tab1-2' ? 'active' : ''}`} 
                data-toggle="tab" 
                href="#tab1-2" 
                role="tab"
                onClick={(e) => handleTabClick(e, 'tab1-2')}
              >
                Chính trị
              </a>
            </li>
            <li className="nav-item mobile-hidden">
              <a 
                className={`nav-link ${activeTab === 'tab1-3' ? 'active' : ''}`} 
                data-toggle="tab" 
                href="#tab1-3" 
                role="tab"
                onClick={(e) => handleTabClick(e, 'tab1-3')}
              >
                Kinh tế
              </a>
            </li>
          </ul>
          {/* Dropdown button cho mobile */}
          <button
            className="mobile-dropdown-btn"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              display: 'none',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              padding: '5px 8px',
              fontSize: '12px',
              color: '#666'
            }}
          >
            <i className="fa fa-ellipsis-h"></i>
          </button>
          {/* Dropdown menu */}
          {dropdownOpen && (
            <div
              className="mobile-dropdown-menu"
              style={{
                position: 'absolute',
                top: '100%',
                left: '0',
                background: '#fff',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                zIndex: 1000,
                minWidth: '120px',
                marginTop: '5px'
              }}
            >
              <a
                className="dropdown-item"
                href="#tab1-2"
                data-toggle="tab"
                role="tab"
                onClick={(e) => {
                  e.preventDefault();
                  setDropdownOpen(false);
                  setActiveTab('tab1-2');
                }}
                style={{
                  display: 'block',
                  padding: '10px 15px',
                  color: '#333',
                  textDecoration: 'none',
                  borderBottom: '1px solid #eee'
                }}
              >
                Chính trị
              </a>
              <a
                className="dropdown-item"
                href="#tab1-3"
                data-toggle="tab"
                role="tab"
                onClick={(e) => {
                  e.preventDefault();
                  setDropdownOpen(false);
                  setActiveTab('tab1-3');
                }}
                style={{
                  display: 'block',
                  padding: '10px 15px',
                  color: '#333',
                  textDecoration: 'none'
                }}
              >
                Kinh tế
              </a>
            </div>
          )}
        </div>
        <a href="#" className="tab01-link f1-s-1 cl9 hov-cl10 trans-03">
          Xem tất cả
          <i className="fs-12 m-l-5 fa fa-caret-right"></i>
        </a>
      </div>

      <div className="tab-content p-t-35">
        <div className={`tab-pane fade ${activeTab === 'tab1-1' ? 'show active' : ''}`} id="tab1-1" role="tabpanel">
          <div className="row">
            <div className="col-sm-6 p-r-25 p-r-15-sr991">
              <PostItem 
                image="/images/post-05.jpg"
                title="Khai mạc trọng thể Hội nghị lần thứ 10 Ban Chấp hành Trung ương Đảng khóa III"
                category="Chính trị"
                date="18/09/2024"
                large
              />
            </div>
            <div className="col-sm-6 p-r-25 p-r-15-sr991">
              <PostItemSmall 
                image="/images/post-06.jpg"
                title="Tân Đại sứ Trung Quốc trình Quốc thư lên Tổng Bí thư, Chủ tịch nước Tô Lâm"
                category="Chính trị"
                date="17/09/2024"
              />
              <PostItemSmall 
                image="/images/post-07.jpg"
                title="Năm 2025, xúc tiến thương mại tập trung thị trường tiềm năng, ngành hàng chủ lực"
                category="Kinh tế"
                date="15/08/2024"
              />
              <PostItemSmall 
                image="/images/post-08.jpg"
                title="4 ngân hàng nhà nước sẽ bán vàng trực tiếp cho người dân"
                category="Kinh tế"
                date="29/05/2024"
              />
            </div>
          </div>
        </div>
        <div className={`tab-pane fade ${activeTab === 'tab1-2' ? 'show active' : ''}`} id="tab1-2" role="tabpanel">
          <div className="row">
            <div className="col-sm-6 p-r-25 p-r-15-sr991">
              <PostItem 
                image="/images/post-05.jpg"
                title="Khai mạc trọng thể Hội nghị lần thứ 10 Ban Chấp hành Trung ương Đảng khóa III"
                category="Chính trị"
                date="18/09/2024"
                large
              />
            </div>
            <div className="col-sm-6 p-r-25 p-r-15-sr991">
              <PostItemSmall 
                image="/images/post-06.jpg"
                title="Tân Đại sứ Trung Quốc trình Quốc thư lên Tổng Bí thư, Chủ tịch nước Tô Lâm"
                category="Chính trị"
                date="17/09/2024"
              />
            </div>
          </div>
        </div>
        <div className={`tab-pane fade ${activeTab === 'tab1-3' ? 'show active' : ''}`} id="tab1-3" role="tabpanel">
          <div className="row">
            <div className="col-sm-6 p-r-25 p-r-15-sr991">
              <PostItem 
                image="/images/post-07.jpg"
                title="Năm 2025, xúc tiến thương mại tập trung thị trường tiềm năng, ngành hàng chủ lực"
                category="Kinh tế"
                date="15/08/2024"
                large
              />
            </div>
            <div className="col-sm-6 p-r-25 p-r-15-sr991">
              <PostItemSmall 
                image="/images/post-08.jpg"
                title="4 ngân hàng nhà nước sẽ bán vàng trực tiếp cho người dân"
                category="Kinh tế"
                date="29/05/2024"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Economy Tab Component
function EconomyTab() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="tab01 p-b-20">
      <div className="tab01-head how2 how2-cl3 bocl12 flex-s-c m-r-10 m-r-0-sr991 tab-section-economy">
        <h3 className="f1-m-2 cl14 tab01-title">Kinh tế</h3>
        <div className="tab-nav-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" data-toggle="tab" href="#tab2-1" role="tab">Tất cả</a>
            </li>
            <li className="nav-item mobile-hidden">
              <a className="nav-link" data-toggle="tab" href="#tab2-2" role="tab">Tài chính</a>
            </li>
            <li className="nav-item mobile-hidden">
              <a className="nav-link" data-toggle="tab" href="#tab2-3" role="tab">Tiền tệ & Thị trường</a>
            </li>
            <li className="nav-item mobile-hidden">
              <a className="nav-link" data-toggle="tab" href="#tab2-4" role="tab">Doanh nghiệp</a>
            </li>
          </ul>
          {/* Dropdown button cho mobile */}
          <button
            className="mobile-dropdown-btn"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              display: 'none',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              padding: '5px 8px',
              fontSize: '12px',
              color: '#666'
            }}
          >
            <i className="fa fa-ellipsis-h"></i>
          </button>
          {/* Dropdown menu */}
          {dropdownOpen && (
            <div
              className="mobile-dropdown-menu"
              style={{
                position: 'absolute',
                top: '100%',
                left: '0',
                background: '#fff',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                zIndex: 1000,
                minWidth: '150px',
                marginTop: '5px'
              }}
            >
              <a
                className="dropdown-item"
                href="#tab2-2"
                data-toggle="tab"
                role="tab"
                onClick={() => {
                  setDropdownOpen(false);
                  const event = new Event('click');
                  document.querySelector('[href="#tab2-2"]')?.dispatchEvent(event);
                }}
                style={{
                  display: 'block',
                  padding: '10px 15px',
                  color: '#333',
                  textDecoration: 'none',
                  borderBottom: '1px solid #eee'
                }}
              >
                Tài chính
              </a>
              <a
                className="dropdown-item"
                href="#tab2-3"
                data-toggle="tab"
                role="tab"
                onClick={() => {
                  setDropdownOpen(false);
                  const event = new Event('click');
                  document.querySelector('[href="#tab2-3"]')?.dispatchEvent(event);
                }}
                style={{
                  display: 'block',
                  padding: '10px 15px',
                  color: '#333',
                  textDecoration: 'none',
                  borderBottom: '1px solid #eee'
                }}
              >
                Tiền tệ & Thị trường
              </a>
              <a
                className="dropdown-item"
                href="#tab2-4"
                data-toggle="tab"
                role="tab"
                onClick={() => {
                  setDropdownOpen(false);
                  const event = new Event('click');
                  document.querySelector('[href="#tab2-4"]')?.dispatchEvent(event);
                }}
                style={{
                  display: 'block',
                  padding: '10px 15px',
                  color: '#333',
                  textDecoration: 'none'
                }}
              >
                Doanh nghiệp
              </a>
            </div>
          )}
        </div>
        <a href="#" className="tab01-link f1-s-1 cl9 hov-cl10 trans-03">
          Xem tất cả
          <i className="fs-12 m-l-5 fa fa-caret-right"></i>
        </a>
      </div>

      <div className="tab-content p-t-35">
        <div className="tab-pane fade show active" id="tab2-1" role="tabpanel">
          <div className="row">
            <div className="col-sm-6 p-r-25 p-r-15-sr991">
              <PostItem 
                image="/images/post-10.jpg"
                title="Năm 2025, xúc tiến thương mại tập trung thị trường tiềm năng, ngành hàng chủ lực"
                category="Tài chính"
                date="18 Tháng 2"
                large
              />
            </div>
            <div className="col-sm-6 p-r-25 p-r-15-sr991">
              <PostItemSmall 
                image="/images/post-11.jpg"
                title="Trắng đêm cấp cứu nạn nhân bão YAGI"
                category="Small Business"
                date="17 Tháng 2"
              />
              <PostItemSmall 
                image="/images/post-12.jpg"
                title="Trắng đêm cấp cứu nạn nhân bão YAGI"
                category="Kinh tế"
                date="16 Tháng 2"
              />
              <PostItemSmall 
                image="/images/post-13.jpg"
                title="Trắng đêm cấp cứu nạn nhân bão YAGI"
                category="Tiền tệ & Thị trường"
                date="12 Tháng 2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Culture Tab Component
function CultureTab() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="tab01 p-b-20">
      <div className="tab01-head how2 how2-cl5 bocl12 flex-s-c m-r-10 m-r-0-sr991 tab-section-culture">
        <h3 className="f1-m-2 cl17 tab01-title">Văn hóa</h3>
        <div className="tab-nav-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" data-toggle="tab" href="#tab3-1" role="tab">Tất cả</a>
            </li>
            <li className="nav-item mobile-hidden">
              <a className="nav-link" data-toggle="tab" href="#tab3-2" role="tab">Di sản</a>
            </li>
            <li className="nav-item mobile-hidden">
              <a className="nav-link" data-toggle="tab" href="#tab3-3" role="tab">Lễ hội</a>
            </li>
            <li className="nav-item mobile-hidden">
              <a className="nav-link" data-toggle="tab" href="#tab3-4" role="tab">Nghệ thuật</a>
            </li>
            <li className="nav-item mobile-hidden">
              <a className="nav-link" data-toggle="tab" href="#tab3-5" role="tab">Truyền thống</a>
            </li>
          </ul>
          {/* Dropdown button cho mobile */}
          <button
            className="mobile-dropdown-btn"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              display: 'none',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              padding: '5px 8px',
              fontSize: '12px',
              color: '#666'
            }}
          >
            <i className="fa fa-ellipsis-h"></i>
          </button>
          {/* Dropdown menu */}
          {dropdownOpen && (
            <div
              className="mobile-dropdown-menu"
              style={{
                position: 'absolute',
                top: '100%',
                left: '0',
                background: '#fff',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                zIndex: 1000,
                minWidth: '120px',
                marginTop: '5px'
              }}
            >
              <a
                className="dropdown-item"
                href="#tab3-2"
                data-toggle="tab"
                role="tab"
                onClick={() => {
                  setDropdownOpen(false);
                  const event = new Event('click');
                  document.querySelector('[href="#tab3-2"]')?.dispatchEvent(event);
                }}
                style={{
                  display: 'block',
                  padding: '10px 15px',
                  color: '#333',
                  textDecoration: 'none',
                  borderBottom: '1px solid #eee'
                }}
              >
                Di sản
              </a>
              <a
                className="dropdown-item"
                href="#tab3-3"
                data-toggle="tab"
                role="tab"
                onClick={() => {
                  setDropdownOpen(false);
                  const event = new Event('click');
                  document.querySelector('[href="#tab3-3"]')?.dispatchEvent(event);
                }}
                style={{
                  display: 'block',
                  padding: '10px 15px',
                  color: '#333',
                  textDecoration: 'none',
                  borderBottom: '1px solid #eee'
                }}
              >
                Lễ hội
              </a>
              <a
                className="dropdown-item"
                href="#tab3-4"
                data-toggle="tab"
                role="tab"
                onClick={() => {
                  setDropdownOpen(false);
                  const event = new Event('click');
                  document.querySelector('[href="#tab3-4"]')?.dispatchEvent(event);
                }}
                style={{
                  display: 'block',
                  padding: '10px 15px',
                  color: '#333',
                  textDecoration: 'none',
                  borderBottom: '1px solid #eee'
                }}
              >
                Nghệ thuật
              </a>
              <a
                className="dropdown-item"
                href="#tab3-5"
                data-toggle="tab"
                role="tab"
                onClick={() => {
                  setDropdownOpen(false);
                  const event = new Event('click');
                  document.querySelector('[href="#tab3-5"]')?.dispatchEvent(event);
                }}
                style={{
                  display: 'block',
                  padding: '10px 15px',
                  color: '#333',
                  textDecoration: 'none'
                }}
              >
                Truyền thống
              </a>
            </div>
          )}
        </div>
        <a href="#" className="tab01-link f1-s-1 cl9 hov-cl10 trans-03">
          Xem tất cả
          <i className="fs-12 m-l-5 fa fa-caret-right"></i>
        </a>
      </div>

      <div className="tab-content p-t-35">
        <div className="tab-pane fade show active" id="tab3-1" role="tabpanel">
          <div className="row">
            <div className="col-sm-6 p-r-25 p-r-15-sr991">
              <PostItem 
                image="/images/post-14.jpg"
                title="Hai ca bệnh ghép tủy đồng loại đầu tiên tại miền Trung - Tây Nguyên xuất viện"
                category="Di sản"
                date="18 Tháng 2"
                large
              />
            </div>
            <div className="col-sm-6 p-r-25 p-r-15-sr991">
              <PostItemSmall 
                image="/images/post-15.jpg"
                title="Trắng đêm cấp cứu nạn nhân bão YAGI"
                category="Nghệ thuật"
                date="17 Tháng 2"
              />
              <PostItemSmall 
                image="/images/post-16.jpg"
                title="Trắng đêm cấp cứu nạn nhân bão YAGI"
                category="Lễ hội"
                date="16 Tháng 2"
              />
              <PostItemSmall 
                image="/images/post-17.jpg"
                title="Trắng đêm cấp cứu nạn nhân bão YAGI"
                category="Truyền thống"
                date="12 Tháng 2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sidebar Component
function Sidebar() {
  return (
    <div className="p-l-10 p-rl-0-sr991 p-b-20">
      {/* Popular Posts */}
      <div>
        <div className="how2 how2-cl4 flex-s-c">
          <h3 className="f1-m-2 cl3 tab01-title">Bài viết phổ biến</h3>
        </div>

        <ul className="p-t-35">
          {[
            'Vĩnh biệt Thầy thuốc Nhân dân, Giáo sư, Bác sỹ Hoàng Bảo Châu - Cây đại thụ ngành Đông y Việt Nam',
            'Bảo tồn và phát huy giá trị văn hóa, bản sắc của nền y học cổ truyền Việt Nam',
            'TS danh dự, cử nhân Đông y, thầy thuốc tiêu biểu toàn quốc Nguyễn Phúc Hưng: Không ngừng rèn đức, luyện tài',
            'Chăm sóc sức khỏe cộng đồng: Nhiệm vụ không của riêng ai',
            'Bác sĩ cảnh báo, nguy cơ đột quỵ cao trong thời tiết nắng nóng cực đoan'
          ].map((title, index) => (
            <li key={index} className="flex-wr-sb-s p-b-22">
              <div className="size-a-8 flex-c-c borad-3 size-a-8 bg9 f1-m-4 cl0 m-b-6">
                {index + 1}
              </div>
              <a href="#" className="size-w-3 f1-s-7 cl3 hov-cl10 trans-03">
                {title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Banner */}
      <div className="flex-c-s p-t-8">
        <a href="#">
          <img className="max-w-full" src="/images/banner-02.jpg" alt="IMG" />
        </a>
      </div>

      {/* Social Follow */}
      <div className="p-t-50">
        <div className="how2 how2-cl4 flex-s-c">
          <h3 className="f1-m-2 cl3 tab01-title">Kết nối với chúng tôi</h3>
        </div>

        <ul className="p-t-35">
          <li className="flex-wr-sb-c p-b-20">
            <a href="#" className="size-a-8 flex-c-c borad-3 size-a-8 bg-facebook fs-16 cl0 hov-cl0">
              <span className="fab fa-facebook-f"></span>
            </a>
            <div className="size-w-3 flex-wr-sb-c">
              <span className="f1-s-8 cl3 p-r-20">6879 Người theo dõi</span>
              <a href="#" className="f1-s-9 text-uppercase cl3 hov-cl10 trans-03">Thích</a>
            </div>
          </li>
          <li className="flex-wr-sb-c p-b-20">
            <a href="#" className="size-a-8 flex-c-c borad-3 size-a-8 bg-twitter fs-16 cl0 hov-cl0">
              <span className="fab fa-twitter"></span>
            </a>
            <div className="size-w-3 flex-wr-sb-c">
              <span className="f1-s-8 cl3 p-r-20">568 Người theo dõi</span>
              <a href="#" className="f1-s-9 text-uppercase cl3 hov-cl10 trans-03">Theo dõi</a>
            </div>
          </li>
          <li className="flex-wr-sb-c p-b-20">
            <a href="#" className="size-a-8 flex-c-c borad-3 size-a-8 bg-youtube fs-16 cl0 hov-cl0">
              <span className="fab fa-youtube"></span>
            </a>
            <div className="size-w-3 flex-wr-sb-c">
              <span className="f1-s-8 cl3 p-r-20">5039 Người đăng ký</span>
              <a href="#" className="f1-s-9 text-uppercase cl3 hov-cl10 trans-03">Đăng ký</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

// Latest Posts Section
function LatestPosts() {
  const posts = [
    {
      image: '/images/latest-01.jpg',
      title: 'Thủ tướng: Mãi mãi tỏa sáng truyền thống vẻ vang, phẩm chất tốt đẹp của phụ nữ Việt Nam',
      date: '18 Tháng 2'
    },
    {
      image: '/images/latest-02.jpg',
      title: 'Bộ trưởng Đào Hồng Lan gửi thư chúc mừng thầy, cô giáo, người lao động trong cơ sở đào tạo nhân lực ngành y',
      date: '16 Tháng 2'
    },
    {
      image: '/images/latest-03.jpg',
      title: 'Hai ca bệnh ghép tủy đồng loại đầu tiên tại miền Trung - Tây Nguyên xuất viện',
      date: '15 Tháng 2'
    },
    {
      image: '/images/latest-04.jpg',
      title: 'Trắng đêm cấp cứu nạn nhân bão YAGI',
      date: '13 Tháng 2'
    },
    {
      image: '/images/latest-05.jpg',
      title: 'Chăm sóc sức khỏe cộng đồng: Nhiệm vụ không của riêng ai',
      date: '10 Tháng 2'
    },
    {
      image: '/images/latest-06.jpg',
      title: 'Bác sĩ cảnh báo, nguy cơ đột quỵ cao trong thời tiết nắng nóng cực đoan',
      date: '9 Tháng 2'
    }
  ];

  return (
    <section className="bg0 p-t-60 p-b-35">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8 p-b-20">
            <div className="how2 how2-cl4 flex-s-c m-r-10 m-r-0-sr991">
              <h3 className="f1-m-2 cl3 tab01-title">Bài viết mới nhất</h3>
            </div>

            <div className="row p-t-35">
              {posts.map((post, index) => (
                <div key={index} className="col-sm-6 p-r-25 p-r-15-sr991">
                  <div className="m-b-45">
                    <a href="#" className="wrap-pic-w hov1 trans-03">
                      <img src={post.image} alt="IMG" />
                    </a>
                    <div className="p-t-16">
                      <h5 className="p-b-5">
                        <a href="#" className="f1-m-3 cl2 hov-cl10 trans-03">{post.title}</a>
                      </h5>
                      <span className="cl8">
                        <a href="#" className="f1-s-4 cl8 hov-cl10 trans-03">
                          bởi Viện Phát triển Văn hóa và Chăm sóc Sức khỏe Cộng đồng
                        </a>
                        <span className="f1-s-3 m-rl-3">-</span>
                        <span className="f1-s-3">{post.date}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Video & Subscribe */}
          <div className="col-md-10 col-lg-4">
            <div className="p-l-10 p-rl-0-sr991 p-b-20">
              {/* Video */}
              <div className="p-b-55">
                <div className="how2 how2-cl4 flex-s-c m-b-35">
                  <h3 className="f1-m-2 cl3 tab01-title">Video nổi bật</h3>
                </div>

                <div>
                  <div className="wrap-pic-w pos-relative">
                    <img src="/images/video-01.jpg" alt="IMG" />
                    <button className="s-full ab-t-l flex-c-c fs-32 cl0 hov-cl10 trans-03" data-toggle="modal" data-target="#modal-video-01">
                      <span className="fab fa-youtube"></span>
                    </button>
                  </div>
                  <div className="p-tb-16 p-rl-25 bg3">
                    <h5 className="p-b-5">
                      <a href="#" className="f1-m-3 cl0 hov-cl10 trans-03">
                        7 thực phẩm giàu omega-3 tốt cho da và tóc
                      </a>
                    </h5>
                    <span className="cl15">
                      <a href="#" className="f1-s-4 cl8 hov-cl10 trans-03">
                        bởi Viện Phát triển Văn hóa và Chăm sóc Sức khỏe Cộng đồng
                      </a>
                      <span className="f1-s-3 m-rl-3">-</span>
                      <span className="f1-s-3">18 Tháng 2</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Subscribe */}
              <div className="bg10 p-rl-35 p-t-28 p-b-35 m-b-55">
                <h5 className="f1-m-5 cl0 p-b-10">Đăng ký nhận tin</h5>
                <p className="f1-s-1 cl0 p-b-25">
                  Nhận tất cả nội dung mới nhất được gửi đến email của bạn vài lần một tháng.
                </p>
                <form className="size-a-9 pos-relative">
                  <input className="s-full f1-m-6 cl6 plh9 p-l-20 p-r-55" type="text" name="email" placeholder="Nhập email của bạn" />
                  <button className="size-a-10 flex-c-c ab-t-r fs-16 cl9 hov-cl10 trans-03">
                    <i className="fa fa-arrow-right"></i>
                  </button>
                </form>
              </div>

              {/* Tags */}
              <div className="p-b-55">
                <div className="how2 how2-cl4 flex-s-c m-b-30">
                  <h3 className="f1-m-2 cl3 tab01-title">Thẻ</h3>
                </div>

                <div className="flex-wr-s-s m-rl--5">
                  {['Y học cổ truyền', 'Sức khỏe cộng đồng', 'Văn hóa', 'Chân dung nhân vật', 'Bài thuốc', 'Tin tức', 'Đông y', 'Di sản'].map((tag, index) => (
                    <a key={index} href="#" className="flex-c-c size-h-2 bo-1-rad-20 bocl12 f1-s-1 cl8 hov-btn2 trans-03 p-rl-20 p-tb-5 m-all-5">
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
  );
}

// Post Item Components
function PostItem({ image, title, category, date, large }: { 
  image: string; 
  title: string; 
  category: string; 
  date: string;
  large?: boolean;
}) {
  return (
    <div className="m-b-30">
      <Link href="/articles" className="wrap-pic-w hov1 trans-03">
        <img src={image} alt="IMG" />
      </Link>
      <div className="p-t-20">
        <h5 className="p-b-5">
          <Link href="/articles" className={`${large ? 'f1-m-3' : 'f1-s-5'} cl2 hov-cl10 trans-03`}>
            {title}
          </Link>
        </h5>
        <span className="cl8">
          <a href="#" className={`${large ? 'f1-s-4' : 'f1-s-6'} cl8 hov-cl10 trans-03`}>
            {category}
          </a>
          <span className="f1-s-3 m-rl-3">-</span>
          <span className="f1-s-3">{date}</span>
        </span>
      </div>
    </div>
  );
}

function PostItemSmall({ image, title, category, date }: { 
  image: string; 
  title: string; 
  category: string; 
  date: string;
}) {
  return (
    <div className="flex-wr-sb-s m-b-30">
      <Link href="/articles" className="size-w-1 wrap-pic-w hov1 trans-03">
        <img src={image} alt="IMG" />
      </Link>
      <div className="size-w-2">
        <h5 className="p-b-5">
          <Link href="/articles" className="f1-s-5 cl3 hov-cl10 trans-03">
            {title}
          </Link>
        </h5>
        <span className="cl8">
          <a href="#" className="f1-s-6 cl8 hov-cl10 trans-03">
            {category}
          </a>
          <span className="f1-s-3 m-rl-3">-</span>
          <span className="f1-s-3">{date}</span>
        </span>
      </div>
    </div>
  );
}

