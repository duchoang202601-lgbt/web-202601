'use client';

import AdminLayout from '@/components/AdminLayout';

export default function AdminTemplatesPage() {
  return (
    <AdminLayout title="Quản lý template">
      <div className="row">
        {/* Template Cards */}
        {[
          { id: 1, name: 'Trang chủ mặc định', image: '/images/post-01.jpg', status: 'Đang sử dụng' },
          { id: 2, name: 'Trang danh mục', image: '/images/post-02.jpg', status: 'Đang sử dụng' },
          { id: 3, name: 'Trang bài viết chi tiết', image: '/images/post-03.jpg', status: 'Đang sử dụng' },
          { id: 4, name: 'Trang liên hệ', image: '/images/post-04.jpg', status: 'Chưa sử dụng' },
          { id: 5, name: 'Trang giới thiệu', image: '/images/post-05.jpg', status: 'Chưa sử dụng' },
          { id: 6, name: 'Template Blog Grid', image: '/images/post-06.jpg', status: 'Chưa sử dụng' },
        ].map((template) => (
          <div key={template.id} className="col-md-6 col-lg-4 p-b-30">
            <div className="bg0 bo-1-rad-22 bocl11 of-hidden">
              <div className="pos-relative">
                <img 
                  src={template.image} 
                  alt={template.name}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <span 
                  className={`f1-s-3 p-tb-5 p-rl-15 borad-3 pos-absolute ${
                    template.status === 'Đang sử dụng' ? 'bg10 cl0' : 'bg8 cl0'
                  }`}
                  style={{ top: '10px', right: '10px' }}
                >
                  {template.status}
                </span>
              </div>
              
              <div className="p-rl-20 p-tb-20">
                <h5 className="f1-m-3 cl2 p-b-10">{template.name}</h5>
                <p className="f1-s-1 cl6 p-b-15">
                  Template cho trang {template.name.toLowerCase()}. Responsive trên tất cả thiết bị.
                </p>
                
                <div className="flex-wr-sb-c">
                  <a href="#" className="f1-s-3 cl10 hov-cl2 trans-03">
                    <i className="fas fa-eye m-r-5"></i>
                    Xem trước
                  </a>
                  <a href="#" className="f1-s-3 cl2 hov-cl10 trans-03">
                    <i className="fas fa-edit m-r-5"></i>
                    Chỉnh sửa
                  </a>
                  {template.status !== 'Đang sử dụng' && (
                    <a href="#" className="f1-s-3 bg10 cl0 p-tb-5 p-rl-15 borad-3 hov-btn1 trans-03">
                      Kích hoạt
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload new template */}
      <div className="p-t-30 bo-1-top bocl11">
        <h4 className="f1-m-5 cl2 p-b-20 p-t-30">Tải lên template mới</h4>
        
        <div className="row">
          <div className="col-md-6">
            <div 
              className="bg0 bo-1-rad-22 bocl11 p-rl-30 p-tb-50 text-center"
              style={{ border: '2px dashed #ccc' }}
            >
              <i className="fas fa-cloud-upload-alt fs-60 cl9 p-b-20" style={{ fontSize: '60px' }}></i>
              <p className="f1-s-1 cl6 p-b-15">
                Kéo thả file template vào đây hoặc click để chọn file
              </p>
              <p className="f1-s-3 cl9">
                Hỗ trợ định dạng: .zip, .html, .css
              </p>
              <input 
                type="file" 
                className="d-none" 
                accept=".zip,.html,.css"
              />
              <button 
                className="size-a-2 bg10 bo-rad-23 hov-btn1 trans-03 p-rl-30 f1-s-2 cl0 m-t-20"
                style={{ border: 'none', cursor: 'pointer' }}
              >
                <i className="fas fa-upload m-r-10"></i>
                Chọn file
              </button>
            </div>
          </div>
          
          <div className="col-md-6">
            <div className="bg3 p-rl-25 p-tb-25" style={{ borderRadius: '10px' }}>
              <h5 className="f1-m-3 cl0 p-b-15">Hướng dẫn</h5>
              <ul className="f1-s-1 cl11" style={{ lineHeight: 2, paddingLeft: '20px' }}>
                <li>File template phải được nén thành file .zip</li>
                <li>Bao gồm các file HTML, CSS, JS cần thiết</li>
                <li>Kích thước tối đa: 10MB</li>
                <li>Đảm bảo template responsive</li>
                <li>Kiểm tra kỹ trước khi upload</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

