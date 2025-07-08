import { useEffect, useRef, useState } from 'react';

// Hook para detectar cuando un elemento entra en la vista
export const useInView = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsInView(true);
          setHasAnimated(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated, options]);

  return [ref, isInView];
};

// Hook para animaciones de scroll staggered (secuenciales)
export const useStaggeredAnimation = (delay = 0) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay]);

  return [ref, isVisible];
};

// Hook para parallax effect sutil
export const useParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const scrolled = window.pageYOffset;
        const rect = ref.current.getBoundingClientRect();
        const elementTop = rect.top + scrolled;
        const windowHeight = window.innerHeight;
        
        if (scrolled + windowHeight > elementTop && scrolled < elementTop + rect.height) {
          setOffset((scrolled - elementTop) * speed);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return [ref, offset];
};
