import { useRef, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useHeroSlides } from "@/hooks/useHeroSlides";
import { ChevronDown } from "lucide-react";
import SchemaOrg from "@/components/SchemaOrg";

const Home = () => {
  const navigate = useNavigate();
  const { data: slides, isLoading } = useHeroSlides();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const activeSlide = slides?.find(slide => slide.is_active);
  const desktopUrl = activeSlide?.image_url || "";
  const tabletUrl = activeSlide?.image_url_tablet || desktopUrl;
  const mobileUrl = activeSlide?.image_url_mobile || tabletUrl;

  // Scroll hijacking с ручной анимацией через requestAnimationFrame
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let hasNavigated = false;
    let isAnimating = false;
    let animationId: number | null = null;

    // Ручная анимация скролла - гарантированно доходит до конца
    const animateScroll = () => {
      const startTime = performance.now();
      const startScroll = container.scrollTop;
      // Всегда вычисляем target в момент старта анимации
      const targetScroll = container.scrollHeight - container.clientHeight;
      const duration = 800; // мс

      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutCubic(progress);

        const currentScroll = startScroll + (targetScroll - startScroll) * eased;
        container.scrollTop = currentScroll;

        // Обновляем визуальный прогресс
        const visualProgress = targetScroll > 0 ? currentScroll / targetScroll : 0;
        setScrollProgress(visualProgress);

        // Навигация на 50%
        if (visualProgress >= 0.5 && !hasNavigated) {
          hasNavigated = true;
          navigate('/catalog');
        }

        if (progress < 1 && !hasNavigated) {
          animationId = requestAnimationFrame(animate);
        }
      };

      animationId = requestAnimationFrame(animate);
    };

    // Запуск анимации
    const triggerAnimation = () => {
      if (isAnimating || hasNavigated) return;
      isAnimating = true;
      animateScroll();
    };

    // Перехват колеса мыши
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        e.preventDefault();
        triggerAnimation();
      }
    };

    // Перехват touch для мобильных
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (deltaY > 30) {
        e.preventDefault();
        triggerAnimation();
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchstart', handleTouchStart);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [navigate]);

  // Кнопка стрелки тоже запускает анимацию (но нужен ref на triggerAnimation)
  // Пока используем простой вариант
  const scrollToContent = () => {
    const container = containerRef.current;
    if (!container) return;
    const target = container.scrollHeight - container.clientHeight;
    container.scrollTo({ top: target, behavior: 'smooth' });
  };

  if (isLoading || !desktopUrl) {
    return (
      <div className="relative h-full overflow-hidden">
        <div className="absolute inset-0 bg-muted animate-pulse" />
      </div>
    );
  }

  return (
    <>
      <SchemaOrg type="organization" />

      <div
        ref={containerRef}
        className="h-full overflow-y-auto"
      >
        {/* Hero Section - анимируется при скролле */}
        <main
          className="relative h-full overflow-hidden"
          style={{
            opacity: 1 - scrollProgress * 0.7,
            transform: `scale(${1 + scrollProgress * 0.05})`,
          }}
          role="main"
        >
          {/* Mobile background */}
          <div
            className="absolute inset-0 bg-cover bg-center md:hidden transition-transform duration-300"
            style={{
              backgroundImage: `url('${mobileUrl}')`,
              filter: `blur(${scrollProgress * 8}px)`,
            }}
            role="img"
            aria-label="Главное изображение"
          />

          {/* Tablet background */}
          <div
            className="absolute inset-0 bg-cover bg-center hidden md:block lg:hidden transition-transform duration-300"
            style={{
              backgroundImage: `url('${tabletUrl}')`,
              filter: `blur(${scrollProgress * 8}px)`,
            }}
            role="img"
            aria-label="Главное изображение"
          />

          {/* Desktop background */}
          <div
            className="absolute inset-0 bg-cover bg-center hidden lg:block transition-transform duration-300"
            style={{
              backgroundImage: `url('${desktopUrl}')`,
              filter: `blur(${scrollProgress * 8}px)`,
            }}
            role="img"
            aria-label="Главное изображение"
          />

          <div className="absolute inset-0 bg-black/20" />

          <div className="relative h-full flex flex-col items-center justify-center text-white px-4 lg:px-8">
            <h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light mb-3 sm:mb-4 lg:mb-6 tracking-[0.3em] uppercase text-center max-w-4xl transition-all duration-300"
              style={{
                transform: `translateY(${-scrollProgress * 30}px)`,
                opacity: 1 - scrollProgress,
              }}
            >
              {activeSlide?.title || "FEEL THE MOMENT"}
            </h1>
          </div>

          {/* Scroll indicator */}
          <button
            onClick={scrollToContent}
            className="absolute bottom-[3%] left-1/2 -translate-x-1/2 text-white animate-bounce hover:opacity-60 transition-opacity min-w-[44px] min-h-[44px] flex items-center justify-center"
            style={{ opacity: 1 - scrollProgress * 2 }}
            aria-label="Прокрутить вниз"
          >
            <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
        </main>

        {/* Spacer section для активации скролла */}
        <section className="h-screen bg-background" />
      </div>
    </>
  );
};

export default Home;
