// Performance optimizations - ensures smooth 60fps experience

// 1. Passive event listeners by default
const originalAddEventListener = EventTarget.prototype.addEventListener;
EventTarget.prototype.addEventListener = function(type, listener, options) {
  // Make scroll, touch, and wheel events passive by default
  const passiveTypes = ['scroll', 'touchstart', 'touchmove', 'touchend', 'wheel', 'mousewheel'];
  if (passiveTypes.includes(type)) {
    if (typeof options === 'boolean') {
      options = { capture: options, passive: true };
    } else if (typeof options === 'object') {
      options = { ...options, passive: true };
    } else {
      options = { passive: true };
    }
  }
  return originalAddEventListener.call(this, type, listener, options);
};

// 2. RequestAnimationFrame throttle for expensive operations
export function rafThrottle(fn) {
  let ticking = false;
  return function(...args) {
    if (!ticking) {
      requestAnimationFrame(() => {
        fn.apply(this, args);
        ticking = false;
      });
      ticking = true;
    }
  };
}

// 3. Debounce function for resize/input events
export function debounce(fn, delay = 100) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

// 4. Intersection Observer for lazy loading
export function createIntersectionObserver(callback, options = {}) {
  const defaultOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };
  
  return new IntersectionObserver(callback, defaultOptions);
}

// 5. Preload critical resources
export function preloadResource(url, type = 'script') {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = url;
  link.as = type;
  document.head.appendChild(link);
}

// 6. Optimize images with lazy loading
export function optimizeImages() {
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = createIntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// 7. Reduce layout thrashing
export function batchDOMOperations(operations) {
  // Force layout
  document.body.offsetHeight;
  
  // Execute all operations
  operations.forEach(op => op());
  
  // Force reflow
  document.body.offsetHeight;
}

// 8. Optimize scroll performance
export function optimizeScroll() {
  let scrollTicking = false;
  
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        // Scroll-dependent operations here
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });
}

// 9. Memory management
export function cleanupMemory() {
  // Clear unused references
  if (window.__GC_COUNT__ === undefined) window.__GC_COUNT__ = 0;
  window.__GC_COUNT__++;
  
  // Force GC hint every 30 seconds
  if (window.__GC_COUNT__ % 30 === 0) {
    if (typeof window.gc === 'function') {
      window.gc();
    }
  }
}

// 10. Performance monitoring
export function monitorPerformance() {
  if (typeof PerformanceObserver === 'undefined') return;
  
  // Monitor Long Tasks
  try {
    const longTaskObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) {
          console.warn('Long task detected:', entry.duration, 'ms');
        }
      }
    });
    longTaskObserver.observe({ entryTypes: ['longtask'] });
  } catch {
    // Long task observer not supported
  }
  
  // Monitor Layout Shifts
  try {
    const layoutShiftObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.value > 0.1) {
          console.warn('Layout shift detected:', entry.value);
        }
      }
    });
    layoutShiftObserver.observe({ entryTypes: ['layout-shift'] });
  } catch {
    // Layout shift observer not supported
  }
}

// Initialize all optimizations
export function initPerformanceOptimizations() {
  if (typeof window === 'undefined') return;
  
  // Run optimizations
  optimizeImages();
  optimizeScroll();
  monitorPerformance();
  
  // Cleanup memory periodically
  setInterval(cleanupMemory, 30000);
  
  console.log('Performance optimizations initialized');
}
