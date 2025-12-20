'use client';

import { useEffect } from 'react';

export default function ClientInit() {
  useEffect(() => {
    // Back to top functionality
    const initBackToTop = () => {
      const btnTop = document.getElementById('myBtn');
      if (!btnTop) return;

      const handleScroll = () => {
        if (window.scrollY > 600) {
          btnTop.style.display = 'flex';
        } else {
          btnTop.style.display = 'none';
        }
      };

      window.addEventListener('scroll', handleScroll);
      
      btnTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      return () => window.removeEventListener('scroll', handleScroll);
    };

    // Initialize animsition
    const initAnimsition = () => {
      if (typeof window !== 'undefined' && (window as typeof window & { jQuery: unknown }).jQuery) {
        const $ = (window as typeof window & { jQuery: typeof jQuery }).jQuery;
        if (typeof $ === 'function') {
          try {
            $('.animsition').animsition({
              inClass: 'fade-in',
              outClass: 'fade-out',
              inDuration: 1500,
              outDuration: 800,
              linkElement: '.animsition-link',
              loading: true,
              loadingParentElement: 'body',
              loadingClass: 'animsition-loading-1',
              loadingInner: '<div class="loader05"></div>',
              timeout: false,
              timeoutCountdown: 5000,
              onLoadEvent: true,
              browser: ['animation-duration', '-webkit-animation-duration'],
              overlay: false,
              overlayClass: 'animsition-overlay-slide',
              overlayParentElement: 'body',
              transition: function (url: string) {
                window.location.href = url;
              }
            });
          } catch {
            // Animsition not available
          }
        }
      }
    };

    // Delay initialization to ensure jQuery is loaded
    const timeout = setTimeout(() => {
      initBackToTop();
      initAnimsition();
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return null;
}

// Extend window type for jQuery
declare global {
  interface Window {
    jQuery: typeof jQuery;
  }
}

interface JQuery {
  animsition: (options: unknown) => void;
}

