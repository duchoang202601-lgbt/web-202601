'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface WeatherData {
  location: string;
  weather: string;
  iconSrc: string;
  iconAlt: string;
}

export default function Header() {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    location: 'Đang tải vị trí...',
    weather: 'Đang tải thời tiết...',
    iconSrc: '/images/icons/icon-day.svg',
    iconAlt: 'Day'
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastCoordsRef = useRef<{ lat: number; lon: number } | null>(null);

  // Weather logic
  useEffect(() => {
    const CACHE_KEY = 'weather_cache_v1';
    const abortController = new AbortController();
    let cancelled = false;
    let requestId = 0;

    const safeUpdate = (updater: (prev: WeatherData) => WeatherData) => {
      if (cancelled || abortController.signal.aborted) return;
      setWeatherData((prev) => {
        const next = updater(prev);
        try {
          const coords = lastCoordsRef.current;
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ ts: Date.now(), data: next, coords: coords || undefined })
          );
        } catch {
          // ignore cache errors
        }
        return next;
      });
    };

    const setLocation = (location: string) => {
      if (!location) return;
      safeUpdate((prev) => ({ ...prev, location }));
    };

    const setWeather = (temp: number, isDay: boolean) => {
      safeUpdate((prev) => ({
        ...prev,
        weather: `HI ${temp}° LO ${temp - 3}°`,
        iconSrc: isDay ? '/images/icons/icon-day.svg' : '/images/icons/icon-night.png',
        iconAlt: isDay ? 'Day' : 'Night',
      }));
    };

    const loadCache = () => {
      try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as {
          ts?: number;
          data?: WeatherData;
          coords?: { lat: number; lon: number };
        };
        if (parsed?.data) return parsed;
      } catch {
        // ignore cache parse errors
      }
      return null;
    };

    const updateFromCoords = async (lat: number, lon: number, locationHint?: string) => {
      lastCoordsRef.current = { lat, lon };
      const myRequestId = ++requestId;

      if (locationHint) setLocation(locationHint);

      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=celsius`;
      const geoUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

      // Fetch weather first (fast), then location (can be slower)
      const weatherPromise = fetch(weatherUrl, { signal: abortController.signal })
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null);

      const geoPromise = fetch(geoUrl, { signal: abortController.signal })
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null);

      const weatherResult = await weatherPromise;
      if (cancelled || abortController.signal.aborted || myRequestId !== requestId) return;

      if (weatherResult?.current_weather) {
        const temp = Math.round(weatherResult.current_weather.temperature);
        const isDay = weatherResult.current_weather.is_day === 1;
        setWeather(temp, isDay);
      }

      // Update location without blocking weather rendering
      geoPromise.then((geoData) => {
        if (cancelled || abortController.signal.aborted || myRequestId !== requestId) return;

        const address = geoData?.address;
        if (address) {
          const city = address.city || address.town || address.village || address.state || 'Unknown';
          const country = String(address.country_code || '').toUpperCase();
          const locationText = country ? `${city}, ${country}` : city;
          if (locationText && locationText !== 'Unknown') setLocation(locationText);
        }
      });
    };

    const fetchIpLocation = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/', { signal: abortController.signal });
        if (!res.ok) return null;
        const data = (await res.json()) as {
          latitude?: number;
          longitude?: number;
          city?: string;
          country_code?: string;
        };
        if (typeof data.latitude === 'number' && typeof data.longitude === 'number') {
          const city = (data.city || '').trim();
          const country = String(data.country_code || '').toUpperCase();
          const hint = city && country ? `${city}, ${country}` : city || undefined;
          return { lat: data.latitude, lon: data.longitude, hint };
        }
      } catch {
        // ignore
      }
      return null;
    };

    // 1) Instant render from cache (if any)
    const cached = loadCache();
    if (cached?.data) {
      setWeatherData(cached.data);
      if (cached.coords) lastCoordsRef.current = cached.coords;
    }

    // 2) Refresh using cached coords (no permission prompt)
    if (cached?.coords) {
      updateFromCoords(cached.coords.lat, cached.coords.lon, cached.data?.location);
    }

    // 3) Fast fallback via IP-based location (no permission prompt)
    fetchIpLocation().then((ip) => {
      if (!ip || cancelled || abortController.signal.aborted) return;
      updateFromCoords(ip.lat, ip.lon, ip.hint);
    });

    // 4) Try geolocation (may be slower due to permission prompt)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          updateFromCoords(position.coords.latitude, position.coords.longitude);
        },
        () => {
          // ignore (IP/cached fallback will handle)
        },
        {
          enableHighAccuracy: false,
          maximumAge: 10 * 60 * 1000, // allow cached position for faster result
          timeout: 2500, // quick timeout so UI doesn't wait too long
        }
      );
    }

    // 5) Final fallback: Hanoi (only if we still have nothing shortly after mount)
    const hanoiTimeout = window.setTimeout(() => {
      if (!lastCoordsRef.current) {
        updateFromCoords(21.0285, 105.8542, 'Hà Nội, VN');
      }
    }, 1200);

    // Refresh periodically (reuse last coords if available)
    const interval = window.setInterval(() => {
      const coords = lastCoordsRef.current;
      if (coords) {
        updateFromCoords(coords.lat, coords.lon);
      } else {
        fetchIpLocation().then((ip) => {
          if (!ip || cancelled || abortController.signal.aborted) return;
          updateFromCoords(ip.lat, ip.lon, ip.hint);
        });
      }
    }, 30 * 60 * 1000);

    return () => {
      cancelled = true;
      abortController.abort();
      window.clearTimeout(hanoiTimeout);
      window.clearInterval(interval);
    };
  }, []);

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
                <img className="m-b-1" src={weatherData.iconSrc} alt={weatherData.iconAlt} id="weather-icon" style={{ width: '12px', height: '12px', marginLeft: '4px', marginRight: '4px', marginBottom: '4px' }} />
                <span id="weather">
                  <span>{weatherData.weather}</span>
                </span>
              </span>

                  <a href="#" className="left-topbar-item">Về chúng tôi</a>
                  <Link href="/contact" className="left-topbar-item">Liên hệ</Link>
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
                <img className="m-b-1" src={weatherData.iconSrc} alt={weatherData.iconAlt} id="weather-icon-mobile" style={{ width: '12px', height: '12px', marginLeft: '4px', marginRight: '4px', marginBottom: '4px' }} />
                <span id="weather-mobile">
                  <span>{weatherData.weather}</span>
                </span>
              </span>
            </li>

            <li className="left-topbar">
                  <a href="#" className="left-topbar-item">Về chúng tôi</a>
                  <Link href="/contact" className="left-topbar-item">Liên hệ</Link>
            </li>

            <li className="right-topbar">
              <a href="#"><span className="fab fa-facebook-f"></span></a>
              <a href="#"><span className="fab fa-twitter"></span></a>
              <a href="#"><span className="fab fa-youtube"></span></a>
            </li>
          </ul>

          <ul className="main-menu-m">
            <MobileMenuItem title="Tin tức" href="/category/tin-tuc" subItems={[
              { title: 'Chính trị', href: '/category/tin-tuc/chinh-tri' },
              { title: 'Kinh tế', href: '/category/tin-tuc/kinh-te' }
            ]} onLinkClick={() => setMobileMenuOpen(false)} />
            <MobileMenuItem title="Sức khỏe cộng đồng" href="/category/suc-khoe-cong-dong" subItems={[
              { title: 'Tư vấn', href: '/category/suc-khoe-cong-dong/tu-van' },
              { title: 'Sống khỏe', href: '/category/suc-khoe-cong-dong/song-khoe' }
            ]} onLinkClick={() => setMobileMenuOpen(false)} />
            <MobileMenuItem title="Văn hóa" href="/category/van-hoa" onLinkClick={() => setMobileMenuOpen(false)} />
            <MobileMenuItem title="Xã hội" href="/category/xa-hoi" subItems={[
              { title: 'Pháp luật', href: '/category/xa-hoi/phap-luat' },
              { title: 'An ninh xã hội', href: '/category/xa-hoi/an-ninh-xa-hoi' }
            ]} onLinkClick={() => setMobileMenuOpen(false)} />
            <MobileMenuItem title="Y học cổ truyền" href="/category/y-hoc-co-truyen" subItems={[
              { title: 'Các bài thuốc', href: '/category/y-hoc-co-truyen/cac-bai-thuoc' },
              { title: 'Chân dung nhân vật', href: '/category/y-hoc-co-truyen/chan-dung-nhan-vat' }
            ]} onLinkClick={() => setMobileMenuOpen(false)} />
            <MobileMenuItem title="Khoa học công nghệ" href="/category/khoa-hoc-cong-nghe" onLinkClick={() => setMobileMenuOpen(false)} />
            <MobileMenuItem title="Hợp tác liên kết" href="/category/hop-tac-lien-ket" subItems={[
              { title: 'Hợp tác liên kết', href: '/category/hop-tac-lien-ket' },
              { title: 'Đào tạo', href: '/category/hop-tac-lien-ket/dao-tao' }
            ]} onLinkClick={() => setMobileMenuOpen(false)} />
            <MobileMenuItem title="Trao đổi" href="/category/trao-doi" subItems={[
              { title: 'Ý kiến hội viên', href: '/category/trao-doi/y-kien-hoi-vien' },
              { title: 'Giới thiệu', href: '/category/trao-doi/gioi-thieu' }
            ]} onLinkClick={() => setMobileMenuOpen(false)} />
            <MobileMenuItem title="Thư viện" href="/category/thu-vien" subItems={[
              { title: 'Thư viện ảnh', href: '/category/thu-vien/thu-vien-anh' },
              { title: 'Thư viện Video', href: '/category/thu-vien/thu-vien-video' },
              { title: 'E-magazine', href: '/category/thu-vien/e-magazine' },
              { title: 'Báo in', href: '/category/thu-vien/bao-in' }
            ]} onLinkClick={() => setMobileMenuOpen(false)} />
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

        {/* Main Nav */}
          <div className="wrap-main-nav">
            <div className="main-nav">
              <nav className="menu-desktop">
                <Link className="logo-stick" href="/">
                  <img src="/images/icons/logo.png" alt="LOGO" />
                </Link>

                <ul className="main-menu">
                  <DesktopMenuItem title="Tin tức" href="/category/tin-tuc" subItems={[
                    { title: 'Chính trị', href: '/category/tin-tuc/chinh-tri' },
                    { title: 'Kinh tế', href: '/category/tin-tuc/kinh-te' }
                  ]} />
                  <DesktopMenuItem title="Sức khỏe cộng đồng" href="/category/suc-khoe-cong-dong" subItems={[
                    { title: 'Tư vấn', href: '/category/suc-khoe-cong-dong/tu-van' },
                    { title: 'Sống khỏe', href: '/category/suc-khoe-cong-dong/song-khoe' }
                  ]} />
                  <li className="no-dropdown">
                    <Link className="nowarp-text" href="/category/van-hoa">Văn hóa</Link>
                  </li>
                  <DesktopMenuItem title="Xã hội" href="/category/xa-hoi" subItems={[
                    { title: 'Pháp luật', href: '/category/xa-hoi/phap-luat' },
                    { title: 'An ninh xã hội', href: '/category/xa-hoi/an-ninh-xa-hoi' }
                  ]} />
                  <DesktopMenuItem title="Y học cổ truyền" href="/category/y-hoc-co-truyen" subItems={[
                    { title: 'Các bài thuốc', href: '/category/y-hoc-co-truyen/cac-bai-thuoc' },
                    { title: 'Chân dung nhân vật', href: '/category/y-hoc-co-truyen/chan-dung-nhan-vat' }
                  ]} />
                  <li className="no-dropdown">
                    <Link className="nowarp-text" href="/category/khoa-hoc-cong-nghe">Khoa học công nghệ</Link>
                  </li>
                  <DesktopMenuItem title="Hợp tác liên kết" href="/category/hop-tac-lien-ket" subItems={[
                    { title: 'Hợp tác liên kết', href: '/category/hop-tac-lien-ket' },
                    { title: 'Đào tạo', href: '/category/hop-tac-lien-ket/dao-tao' }
                  ]} />
                  <DesktopMenuItem title="Trao đổi" href="/category/trao-doi" subItems={[
                    { title: 'Ý kiến hội viên', href: '/category/trao-doi/y-kien-hoi-vien' },
                    { title: 'Giới thiệu', href: '/category/trao-doi/gioi-thieu' }
                  ]} />
                  <DesktopMenuItem title="Thư viện" href="/category/thu-vien" subItems={[
                    { title: 'Thư viện ảnh', href: '/category/thu-vien/thu-vien-anh' },
                    { title: 'Thư viện Video', href: '/category/thu-vien/thu-vien-video' },
                    { title: 'E-magazine', href: '/category/thu-vien/e-magazine' },
                    { title: 'Báo in', href: '/category/thu-vien/bao-in' }
                  ]} />
                </ul>
              </nav>
            </div>
          </div>
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

// Mobile Menu Item Component
function MobileMenuItem({ title, href, subItems, onLinkClick }: { 
  title: string; 
  href: string; 
  subItems?: { title: string; href: string }[];
  onLinkClick?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    if (onLinkClick) {
      onLinkClick();
    }
  };

  return (
    <li>
      <Link href={href} onClick={handleLinkClick}>{title}</Link>
      {subItems && subItems.length > 0 && (
        <>
          <ul className="sub-menu-m" style={{ display: isOpen ? 'block' : 'none' }}>
            {subItems.map((item, index) => (
              <li key={index}>
                <Link href={item.href} onClick={handleLinkClick}>{item.title}</Link>
              </li>
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

