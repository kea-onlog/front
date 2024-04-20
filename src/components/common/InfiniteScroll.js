
export const observeIntersection = (target, callback) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback();
        }
      });
    });
    observer.observe(target);
  }