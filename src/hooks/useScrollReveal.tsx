
import { useEffect, useRef } from 'react';

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
  duration?: number;
  easing?: string;
  classes?: {
    visible?: string;
    hidden?: string;
  };
}

const defaultOptions: ScrollRevealOptions = {
  threshold: 0.1,
  rootMargin: '0px',
  delay: 0,
  duration: 500,
  easing: 'cubic-bezier(0.5, 0, 0, 1)',
  classes: {
    visible: 'opacity-100 translate-y-0',
    hidden: 'opacity-0 translate-y-8',
  },
};

export function useScrollReveal<T extends HTMLElement>(options: ScrollRevealOptions = {}) {
  const elementRef = useRef<T | null>(null);
  const mergedOptions = { ...defaultOptions, ...options };

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Add initial hidden class
    if (mergedOptions.classes?.hidden) {
      element.classList.add(...mergedOptions.classes.hidden.split(' '));
    }

    // Set transition style
    element.style.transition = `transform ${mergedOptions.duration}ms ${mergedOptions.easing} ${mergedOptions.delay}ms, opacity ${mergedOptions.duration}ms ${mergedOptions.easing} ${mergedOptions.delay}ms`;
    element.style.willChange = 'transform, opacity';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add visible class and remove hidden class
            if (mergedOptions.classes?.visible) {
              element.classList.add(...mergedOptions.classes.visible.split(' '));
            }
            if (mergedOptions.classes?.hidden) {
              element.classList.remove(...mergedOptions.classes.hidden.split(' '));
            }
            
            // Unobserve after animation is done
            setTimeout(() => {
              observer.unobserve(element);
            }, mergedOptions.duration! + mergedOptions.delay!);
          }
        });
      },
      {
        threshold: mergedOptions.threshold,
        rootMargin: mergedOptions.rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [mergedOptions]);

  return elementRef;
}
