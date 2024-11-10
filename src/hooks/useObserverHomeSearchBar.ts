import { useEffect, useState } from 'react';

const useObserverHomeSearchBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const searchBar = document.getElementById('home-search-bar');
    if (!searchBar) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: '-100px 0px 0px 0px' },
    );

    observer.observe(searchBar);

    return () => {
      observer.unobserve(searchBar);
    };
  }, []);

  return { isVisible };
};

export { useObserverHomeSearchBar };
