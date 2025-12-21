import Link from 'next/link';

export const metadata = {
  title: 'Vĩnh biệt TTND. GS.TS.BS Hoàng Bảo Châu - Viện văn hóa và chăm sóc sức khỏe cộng đồng',
  description: 'Vĩnh biệt Thầy thuốc Nhân dân, Giáo sư, Bác sỹ Hoàng Bảo Châu - Cây đại thụ ngành Đông y Việt Nam',
};

export default function ArticlesPage() {
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
              Bài viết
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

      {/* Content */}
      <section className="bg0 p-b-140 p-t-10">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-8 p-b-30">
              <div className="p-r-10 p-r-0-sr991">
                {/* Blog Detail */}
                <div className="p-b-70">
                  <a href="#" className="f1-s-10 cl2 hov-cl10 trans-03 text-uppercase">
                    Y học cổ truyền
                  </a>

                  <h3 className="f1-l-3 cl2 p-b-16 p-t-33 respon2">
                    Vĩnh biệt Thầy thuốc Nhân dân, Giáo sư, Bác sỹ Hoàng Bảo Châu - Cây đại thụ ngành Đông y Việt Nam
                  </h3>
                  
                  <div className="flex-wr-s-s p-b-40">
                    <span className="f1-s-3 cl8 m-r-15">
                      <a href="#" className="f1-s-4 cl8 hov-cl10 trans-03">
                        bởi Viện Phát triển Văn hóa và Chăm sóc Sức khỏe Cộng đồng
                      </a>
                      <span className="m-rl-3">-</span>
                      <span>27 Tháng 11, 2025</span>
                    </span>

                    <span className="f1-s-3 cl8 m-r-15">
                      702.976 Lượt xem
                    </span>

                    <a href="#" className="f1-s-3 cl8 hov-cl10 trans-03 m-r-15">
                      0 Bình luận
                    </a>
                  </div>

                  <div className="wrap-pic-max-w p-b-30">
                    <img src="/images/post-01.jpg" alt="IMG" />
                  </div>

                  <p className="f1-s-11 cl6 p-b-25">
                    <strong>Vĩnh biệt TTND. GS.TS.BS Hoàng Bảo Châu – cây đại thụ của nền Y học cổ truyền Việt Nam</strong>
                  </p>

                  <p className="f1-s-11 cl6 p-b-25">
                    Gia đình và ngành Đông y Việt Nam vừa nhận tin buồn: TTND. GS.TS.BS Hoàng Bảo Châu – nguyên Giám đốc Bệnh viện Y học cổ truyền Trung ương, nguyên Phó Chủ tịch Trung ương Hội Đông y Việt Nam, nguyên Phó Chủ tịch Tổng hội Y học Việt Nam, nguyên Viện trưởng Viện Y học cổ truyền Việt Nam – đã từ trần.
                  </p>

                  <p className="f1-s-11 cl6 p-b-25">
                    Sự ra đi của Thầy để lại niềm tiếc thương sâu sắc đối với đồng nghiệp, học trò, Hội Đông y Việt Nam và nhiều thế hệ người bệnh – những người từng được Thầy khám chữa, chỉ dẫn, giảng dạy và truyền cảm hứng sống tử tế với nghề.
                  </p>

                  <p className="f1-s-11 cl6 p-b-25">
                    <strong>Một đời gắn với y học cổ truyền, một đời tận tụy với người bệnh</strong>
                  </p>

                  <p className="f1-s-11 cl6 p-b-25">
                    Theo các tư liệu giới thiệu về cuộc đời và sự nghiệp, TTND. GS.BS. Hoàng Bảo Châu sinh ngày 12/12/1929, trưởng thành trong thời kỳ kháng chiến; sớm chọn con đường y nghiệp và kiên định theo đuổi hướng đi kết hợp tinh hoa YHCT với tiến bộ của y học hiện đại.
                  </p>

                  <p className="f1-s-11 cl6 p-b-25">
                    Trong ký ức của nhiều người, Thầy là mẫu thầy thuốc &quot;nói ít – làm nhiều&quot;: đằm thắm, mực thước, nhưng luôn nghiêm cẩn trong chuyên môn và hết lòng với bệnh nhân. Những câu chuyện về &quot;y đức&quot; và lối sống giản dị của Thầy cũng từng được các bài viết chân dung ghi lại như một nét tiêu biểu của thế hệ thầy thuốc đi qua gian khó.
                  </p>

                  <p className="f1-s-11 cl6 p-b-25">
                    <strong>Dấu ấn chuyên môn: lãnh đạo, đào tạo và &quot;hiện đại hóa&quot; tri thức Đông y</strong>
                  </p>

                  <p className="f1-s-11 cl6 p-b-25">
                    Ở vai trò quản lý và chuyên môn, Thầy từng công tác và đảm trách nhiều vị trí quan trọng trong hệ thống YHCT, trong đó có dấu mốc được Bộ Y tế nhắc tới khi tri ân các nhà giáo lão thành: nguyên Giám đốc Bệnh viện Y học cổ truyền Trung ương.
                  </p>

                  <p className="f1-s-11 cl6 p-b-25">
                    Không chỉ làm lâm sàng và quản lý, Thầy còn dành nhiều tâm lực cho việc viết giáo trình, biên soạn sách, với mục tiêu đưa kiến thức YHCT đến gần hơn với người học bằng ngôn ngữ hiện đại, mạch lạc. Nhiều đầu sách của Thầy được nhắc tới như Lý luận cơ bản Y học cổ truyền, Phương thuốc cổ truyền, Thuốc cổ truyền và ứng dụng lâm sàng, Kim quỹ bệnh học, Nội dung cơ bản của Nội Kinh…
                  </p>

                  <p className="f1-s-11 cl6 p-b-25">
                    Đó là một đóng góp bền bỉ: làm cho y văn cổ không chỉ &quot;đúng&quot; mà còn &quot;dễ học – dễ dùng&quot;, để lớp sau có thể kế thừa một cách chuẩn mực.
                  </p>

                  <p className="f1-s-11 cl6 p-b-25">
                    Trân trọng ghi nhận những cống hiến được tôn vinh: Các tài liệu truyền thông từng ghi nhận TTND.GS Hoàng Bảo Châu đã được trao nhiều hình thức khen thưởng và tôn vinh chuyên môn, trong đó có Giải thưởng Hải Thượng Lãn Ông (Bộ Y tế) năm 2011 và Huân chương Lao động hạng Nhất (2012).
                  </p>

                  <p className="f1-s-11 cl6 p-b-25">
                    <strong>Lời tiễn biệt</strong>
                  </p>

                  <p className="f1-s-11 cl6 p-b-25">
                    Sự ra đi của TTND. GS.TS.BS Hoàng Bảo Châu khép lại một đời làm nghề mẫu mực, nhưng những gì ông để lại – từ bài giảng, trang sách đến y đức – sẽ còn ở lại với nền y học cổ truyền nước nhà.
                  </p>

                  <p className="f1-s-11 cl6 p-b-25">
                    Xin kính cẩn nghiêng mình tiễn biệt TTND.Giáo sư, Người Thầy của nhiều thế hệ học trò ngành Đông y Việt Nam.
                  </p>

                  <p className="f1-s-11 cl6 p-b-25">
                    Xin gửi lời chia buồn sâu sắc tới tang quyến, đồng nghiệp, học trò và những người bệnh từng được Thầy chữa trị và giảng dạy.
                  </p>

                  <p className="f1-s-11 cl6 p-b-25" style={{ textAlign: 'right', fontStyle: 'italic' }}>
                    <strong>TTND.PGS.TS Đậu Xuân Cảnh - Chủ tịch Hội Đông y Việt Nam</strong>
                  </p>

                  {/* Tag */}
                  <div className="flex-s-s p-t-12 p-b-15">
                    <span className="f1-s-12 cl5 m-r-8">Thẻ:</span>
                    <div className="flex-wr-s-s size-w-0">
                      <a href="#" className="f1-s-12 cl8 hov-link1 m-r-15">Y học cổ truyền</a>
                      <a href="#" className="f1-s-12 cl8 hov-link1 m-r-15">Chân dung nhân vật</a>
                      <a href="#" className="f1-s-12 cl8 hov-link1 m-r-15">Đông y Việt Nam</a>
                    </div>
                  </div>

                  {/* Share */}
                  <div className="flex-s-s">
                    <span className="f1-s-12 cl5 p-t-1 m-r-15">Chia sẻ:</span>
                    <div className="flex-wr-s-s size-w-0">
                      <a href="#" className="dis-block f1-s-13 cl0 bg-facebook borad-3 p-tb-4 p-rl-18 hov-btn1 m-r-3 m-b-3 trans-03">
                        <i className="fab fa-facebook-f m-r-7"></i>
                        Facebook
                      </a>
                      <a href="#" className="dis-block f1-s-13 cl0 bg-twitter borad-3 p-tb-4 p-rl-18 hov-btn1 m-r-3 m-b-3 trans-03">
                        <i className="fab fa-twitter m-r-7"></i>
                        Twitter
                      </a>
                      <a href="#" className="dis-block f1-s-13 cl0 bg-google borad-3 p-tb-4 p-rl-18 hov-btn1 m-r-3 m-b-3 trans-03">
                        <i className="fab fa-google-plus-g m-r-7"></i>
                        Google+
                      </a>
                      <a href="#" className="dis-block f1-s-13 cl0 bg-pinterest borad-3 p-tb-4 p-rl-18 hov-btn1 m-r-3 m-b-3 trans-03">
                        <i className="fab fa-pinterest-p m-r-7"></i>
                        Pinterest
                      </a>
                    </div>
                  </div>
                </div>

                {/* Leave a comment */}
                <div>
                  <h4 className="f1-l-4 cl3 p-b-12">Để lại bình luận</h4>
                  <p className="f1-s-13 cl8 p-b-40">
                    Địa chỉ email của bạn sẽ không được công bố. Các trường bắt buộc được đánh dấu *
                  </p>

                  <form>
                    <textarea className="bo-1-rad-3 bocl13 size-a-15 f1-s-13 cl5 plh6 p-rl-18 p-tb-14 m-b-20" name="msg" placeholder="Bình luận..."></textarea>
                    <input className="bo-1-rad-3 bocl13 size-a-16 f1-s-13 cl5 plh6 p-rl-18 m-b-20" type="text" name="name" placeholder="Tên*" />
                    <input className="bo-1-rad-3 bocl13 size-a-16 f1-s-13 cl5 plh6 p-rl-18 m-b-20" type="text" name="email" placeholder="Email*" />
                    <input className="bo-1-rad-3 bocl13 size-a-16 f1-s-13 cl5 plh6 p-rl-18 m-b-20" type="text" name="website" placeholder="Trang web" />
                    <button className="size-a-17 bg2 borad-3 f1-s-12 cl0 hov-btn1 trans-03 p-rl-15 m-t-10">
                      Gửi bình luận
                    </button>
                  </form>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="col-md-10 col-lg-4 p-b-30">
              <div className="p-l-10 p-rl-0-sr991 p-t-70">
                {/* Category */}
                <div className="p-b-60">
                  <div className="how2 how2-cl4 flex-s-c">
                    <h3 className="f1-m-2 cl3 tab01-title">Danh mục</h3>
                  </div>

                  <ul className="p-t-35">
                    {['Thời trang', 'Làm đẹp', 'Phong cách đường phố', 'Lối sống', 'Tự làm & Thủ công'].map((cat, index) => (
                      <li key={index} className="how-bor3 p-rl-4">
                        <a href="#" className="dis-block f1-s-10 text-uppercase cl2 hov-cl10 trans-03 p-tb-13">
                          {cat}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Popular Posts */}
                <div className="p-b-30">
                  <div className="how2 how2-cl4 flex-s-c">
                    <h3 className="f1-m-2 cl3 tab01-title">Bài viết phổ biến</h3>
                  </div>

                  <ul className="p-t-35">
                    {[1, 2, 3].map((_, index) => (
                      <li key={index} className="flex-wr-sb-s p-b-30">
                        <a href="#" className="size-w-10 wrap-pic-w hov1 trans-03">
                          <img src="/images/post-01.jpg" alt="IMG" />
                        </a>
                        <div className="size-w-11">
                          <h6 className="p-b-4">
                            <a href="#" className="f1-s-5 cl3 hov-cl10 trans-03">
                              Donec metus orci, malesuada et lectus vitae
                            </a>
                          </h6>
                          <span className="cl8 txt-center p-b-24">
                            <a href="#" className="f1-s-6 cl8 hov-cl10 trans-03">Âm nhạc</a>
                            <span className="f1-s-3 m-rl-3">-</span>
                            <span className="f1-s-3">18 Tháng 2</span>
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tag */}
                <div>
                  <div className="how2 how2-cl4 flex-s-c m-b-30">
                    <h3 className="f1-m-2 cl3 tab01-title">Thẻ</h3>
                  </div>

                  <div className="flex-wr-s-s m-rl--5">
                    {['Thời trang', 'Lối sống', 'Denim', 'Streetstyle', 'Thủ công', 'Tạp chí', 'Tin tức', 'Blog'].map((tag, index) => (
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
    </>
  );
}

