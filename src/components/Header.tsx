'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/useAuth';
import { useEffect, useState } from 'react';

interface WeatherData {
  location: string;
  weather: string;
  iconSrc: string;
  iconAlt: string;
}

export default function Header() {
  const { isLoggedIn, username, logout, loading } = useAuth();
  const [weatherData, setWeatherData] = useState<WeatherData>({
    location: 'Đang tải vị trí...',
    weather: 'Đang tải thời tiết...',
    iconSrc: '/images/icons/icon-day.svg',
    iconAlt: 'Day'
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Weather logic
  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            getWeatherData(position.coords.latitude, position.coords.longitude);
          },
          () => {
            // Fallback: Hanoi
            getWeatherData(21.0285, 105.8542);
          }
        );
      } else {
        getWeatherData(21.0285, 105.8542);
      }
    };

    const getWeatherData = async (lat: number, lon: number) => {
      try {
        // Get location name
        const geoResponse = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
          { headers: { 'User-Agent': 'WeatherApp/1.0' } }
        );
        const geoData = await geoResponse.json();
        
        let locationText = 'Unknown';
        if (geoData.address) {
          const city = geoData.address.city || geoData.address.town || geoData.address.village || 'Unknown';
          const country = geoData.address.country_code?.toUpperCase() || '';
          locationText = `${city}, ${country}`;
        }

        // Get weather
        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=celsius`
        );
        const weatherResult = await weatherResponse.json();

        if (weatherResult.current_weather) {
          const temp = Math.round(weatherResult.current_weather.temperature);
          const isDay = weatherResult.current_weather.is_day === 1;
          
          setWeatherData({
            location: locationText,
            weather: `HI ${temp}° LO ${temp - 3}°`,
            iconSrc: isDay ? '/images/icons/icon-day.svg' : '/images/icons/icon-night.png',
            iconAlt: isDay ? 'Day' : 'Night'
          });
        }
      } catch {
        // Set fallback based on time
        const hour = new Date().getHours();
        const isDay = hour >= 6 && hour < 18;
        setWeatherData({
          location: 'Không thể tải vị trí',
          weather: 'N/A',
          iconSrc: isDay ? '/images/icons/icon-day.svg' : '/images/icons/icon-night.png',
          iconAlt: isDay ? 'Day' : 'Night'
        });
      }
    };

    getLocation();
    const interval = setInterval(getLocation, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header>
      {/* Header desktop */}
      <div className="container-menu-desktop">
        <div className="topbar">
          <div className="content-topbar container h-100">
            <div className="left-topbar">
              <span className="left-topbar-item flex-wr-s-c">
                <span className="left-topbar-item" id="location">
                  <span>{weatherData.location}</span>
                </span>
                <img className="m-b-1 m-rl-8" src={weatherData.iconSrc} alt={weatherData.iconAlt} id="weather-icon" style={{ width: '20px', height: '20px' }} />
                <span id="weather">
                  <span>{weatherData.weather}</span>
                </span>
              </span>

              {/* Show/hide based on login state */}
              {!loading && !isLoggedIn && (
                <>
                  <a href="#" className="left-topbar-item">Về chúng tôi</a>
                  <a href="#" className="left-topbar-item">Liên hệ</a>
                </>
              )}
              
              {!loading && isLoggedIn && (
                <>
                  <span className="left-topbar-item">
                    Xin chào, <strong>{username}</strong>
                  </span>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }} className="left-topbar-item">
                    Đăng xuất
                  </a>
                </>
              )}
              {!loading && !isLoggedIn && (
                <Link href="/login" className="left-topbar-item">Đăng nhập</Link>
              )}
            </div>

            <div className="right-topbar">
              <a href="https://www.facebook.com/"><span className="fab fa-facebook-f"></span></a>
              <a href="https://twitter.com/"><span className="fab fa-twitter"></span></a>
              <a href="https://www.youtube.com/"><span className="fab fa-youtube"></span></a>
            </div>
          </div>
        </div>

        {/* Header Mobile */}
        <div className="wrap-header-mobile">
          <div className="logo-mobile-container">
            <div className="logo-mobile">
              <Link href="/" style={{width:'100%',height:'100%'}}>
                <img src="/images/icons/logo.png" alt="IMG-LOGO" />
              </Link>
            </div>
            
            <div className="banner-header-mobile">
              <div className="banner-text-container-mobile">
                <div className="banner-title-mobile">TRANG THÔNG TIN ĐIỆN TỬ</div>
                <div className="banner-main-mobile">
                  <span className="green-text">Nhân tài nhân lực văn hóa sức khỏe cộng đồng</span>
                </div>
                <div className="banner-subtitle-mobile">
                  Chuyên trang ngôn luận của Viện Phát triển Văn hóa và Chăm sóc Sức khỏe Cộng đồng
                </div>
              </div>
            </div>
          </div>

          <div 
            className={`btn-show-menu-mobile hamburger hamburger--squeeze m-r--8 ${mobileMenuOpen ? 'is-active' : ''}`}
            onClick={toggleMobileMenu}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </div>
        </div>

        {/* Menu Mobile */}
        <div className="menu-mobile" style={{ display: mobileMenuOpen ? 'block' : 'none' }}>
          <ul className="topbar-mobile">
            <li className="left-topbar">
              <span className="left-topbar-item flex-wr-s-c">
                <span className="left-topbar-item" id="location-mobile">
                  <span>{weatherData.location}</span>
                </span>
                <img className="m-b-1 m-rl-8" src={weatherData.iconSrc} alt={weatherData.iconAlt} id="weather-icon-mobile" style={{ width: '20px', height: '20px' }} />
                <span id="weather-mobile">
                  <span>{weatherData.weather}</span>
                </span>
              </span>
            </li>

            <li className="left-topbar">
              {!loading && !isLoggedIn && (
                <>
                  <a href="#" className="left-topbar-item">Về chúng tôi</a>
                  <a href="#" className="left-topbar-item">Liên hệ</a>
                </>
              )}
              
              {!loading && isLoggedIn && (
                <>
                  <span className="left-topbar-item">
                    Xin chào, <strong>{username}</strong>
                  </span>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }} className="left-topbar-item">
                    Đăng xuất
                  </a>
                </>
              )}
              {!loading && !isLoggedIn && (
                <Link href="/login" className="left-topbar-item">Đăng nhập</Link>
              )}
            </li>

            <li className="right-topbar">
              <a href="#"><span className="fab fa-facebook-f"></span></a>
              <a href="#"><span className="fab fa-twitter"></span></a>
              <a href="#"><span className="fab fa-youtube"></span></a>
            </li>
          </ul>

          <ul className="main-menu-m">
            <MobileMenuItem title="Tin tức" href="/" subItems={[
              { title: 'Chính trị', href: '/' },
              { title: 'Kinh tế', href: '/' }
            ]} />
            <MobileMenuItem title="Sức khỏe cộng đồng" href="#" subItems={[
              { title: 'Tư vấn', href: '#' },
              { title: 'Sống khỏe', href: '#' }
            ]} />
            <MobileMenuItem title="Văn hóa" href="/category" />
            <MobileMenuItem title="Xã hội" href="#" subItems={[
              { title: 'Tất cả', href: '#' },
              { title: 'Kinh tế', href: '#' }
            ]} />
            <MobileMenuItem title="Y học cổ truyền" href="#" subItems={[
              { title: 'Tất cả', href: '#' },
              { title: 'Các bài thuốc', href: '#' }
            ]} />
            <MobileMenuItem title="Khoa học công nghệ" href="#" subItems={[
              { title: 'Tất cả', href: '#' }
            ]} />
            <MobileMenuItem title="Hợp tác liên kết" href="#" subItems={[
              { title: 'Tất cả', href: '#' }
            ]} />
            <MobileMenuItem title="Trao đổi" href="#" subItems={[
              { title: 'Ý kiến hội viên', href: '#' },
              { title: 'Giới thiệu', href: '#' }
            ]} />
            <MobileMenuItem title="Thư viện" href="#" subItems={[
              { title: 'Thư viện ảnh', href: '#' },
              { title: 'Thư viện Video', href: '#' },
              { title: 'E-magazine', href: '#' },
              { title: 'Báo in', href: '#' }
            ]} />
          </ul>
        </div>
        
        {/* Logo and Banner */}
        <div className="wrap-logo container">
          <div className="logo">
            <Link href="/" style={{width:'100%',height:'100%'}}>
              <img src="/images/icons/logo.png" alt="LOGO" />
            </Link>
          </div>
          
          <div className="banner-header">
            <div className="banner-text-container">
              <div className="banner-title">TRANG THÔNG TIN ĐIỆN TỬ</div>
              <div className="banner-main">
                <span className="green-text">Nhân tài nhân lực văn hóa sức khỏe cộng đồng</span>
              </div>
              <div className="banner-subtitle">
                Chuyên trang ngôn luận của Viện Phát triển Văn hóa và Chăm sóc Sức khỏe Cộng đồng
              </div>
            </div>
          </div>
        </div>

        {/* Main Nav - Hide when logged in */}
        {!loading && !isLoggedIn && (
          <div className="wrap-main-nav">
            <div className="main-nav">
              <nav className="menu-desktop">
                <Link className="logo-stick" href="/">
                  <img src="/images/icons/logo.png" alt="LOGO" />
                </Link>

                <ul className="main-menu">
                  <DesktopMenuItem title="Tin tức" href="/" subItems={[
                    { title: 'Chính trị', href: '/' },
                    { title: 'Kinh tế', href: '/' }
                  ]} />
                  <DesktopMegaMenuItem title="Sức khỏe cộng đồng" />
                  <li className="mega-menu-item">
                    <Link className="nowarp-text" href="/category">Văn hóa</Link>
                  </li>
                  <DesktopMegaMenuItem title="Xã hội" />
                  <DesktopMegaMenuItem title="Y học cổ truyền" />
                  <DesktopMegaMenuItem title="Khoa học công nghệ" />
                  <DesktopMegaMenuItem title="Hợp tác liên kết" />
                  <DesktopMenuItem title="Trao đổi" href="#" subItems={[
                    { title: 'Ý kiến hội viên', href: '#' },
                    { title: 'Giới thiệu', href: '#' }
                  ]} />
                  <DesktopMenuItem title="Thư viện" href="#" subItems={[
                    { title: 'Thư viện ảnh', href: '#' },
                    { title: 'Thư viện Video', href: '#' },
                    { title: 'E-magazine', href: '#' },
                    { title: 'Báo in', href: '#' }
                  ]} />
                </ul>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

// Desktop Menu Item Component
function DesktopMenuItem({ title, href, subItems }: { 
  title: string; 
  href: string; 
  subItems?: { title: string; href: string }[] 
}) {
  return (
    <li>
      <Link className="nowarp-text" href={href}>{title}</Link>
      {subItems && subItems.length > 0 && (
        <ul className="sub-menu">
          {subItems.map((item, index) => (
            <li key={index}><Link href={item.href}>{item.title}</Link></li>
          ))}
        </ul>
      )}
    </li>
  );
}

// Desktop Mega Menu Item Component (simplified)
function DesktopMegaMenuItem({ title }: { title: string }) {
  return (
    <li className="mega-menu-item">
      <a className="nowarp-text" href="#">{title}</a>
      <div className="sub-mega-menu">
        <div className="nav flex-column nav-pills" role="tablist">
          <a className="nav-link active" data-toggle="pill" href="#" role="tab">Tất cả</a>
        </div>
        <div className="tab-content">
          <div className="tab-pane show active" role="tabpanel">
            <div className="row">
              <div className="col-3">
                <div>
                  <Link href="/articles" className="wrap-pic-w hov1 trans-03">
                    <img src="/images/post-05.jpg" alt="IMG" />
                  </Link>
                  <div className="p-t-10">
                    <h5 className="p-b-5">
                      <Link href="/articles" className="f1-s-5 cl3 hov-cl10 trans-03">
                        Trắng đêm cấp cứu nạn nhân bão YAGI
                      </Link>
                    </h5>
                    <span className="cl8">
                      <a href="#" className="f1-s-6 cl8 hov-cl10 trans-03">Kinh tế</a>
                      <span className="f1-s-3 m-rl-3">-</span>
                      <span className="f1-s-3">18 Tháng 2</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

// Mobile Menu Item Component
function MobileMenuItem({ title, href, subItems }: { 
  title: string; 
  href: string; 
  subItems?: { title: string; href: string }[] 
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <Link href={href}>{title}</Link>
      {subItems && subItems.length > 0 && (
        <>
          <ul className="sub-menu-m" style={{ display: isOpen ? 'block' : 'none' }}>
            {subItems.map((item, index) => (
              <li key={index}><Link href={item.href}>{item.title}</Link></li>
            ))}
          </ul>
          <span 
            className={`arrow-main-menu-m ${isOpen ? 'turn-arrow-main-menu-m' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <i className="fa fa-angle-right" aria-hidden="true"></i>
          </span>
        </>
      )}
    </li>
  );
}

