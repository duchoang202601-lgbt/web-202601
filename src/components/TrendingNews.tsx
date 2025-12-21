'use client';

import { useState, useEffect } from 'react';

const trendingItems = [
  'VĨNH BIỆT THẦY THUỐC NHÂN DÂN, GIÁO SƯ, BÁC SỸ HOÀNG BẢO CHÂU',
  'Bảo tồn và phát huy giá trị văn hóa, bản sắc của nền y học cổ truyền Việt Nam',
  'TS danh dự, cử nhân Đông y, thầy thuốc tiêu biểu toàn quốc Nguyễn Phúc Hưng'
];

export default function TrendingNews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Start fade out và slide up
      setIsVisible(false);
      
      // After fade out, change text and fade in với slide down
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % trendingItems.length);
        setIsVisible(true);
      }, 400); // Wait for fade out animation
      
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <span 
      className="dis-inline-block cl6 pos-relative size-w-0 trending-text"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(-15px)',
        transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {trendingItems[currentIndex]}
    </span>
  );
}
