'use client';

import { useState, useEffect } from 'react';
import { DOM_IDS } from '@/constants/dom.constant';

const useObserverHomeSearchBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const searchBar = document.getElementById(DOM_IDS.HOME_SEARCH_BAR);
    if (!searchBar) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: '-65px 0px 0px 0px', threshold: 0.1 }
    );

    observer.observe(searchBar);
    return () => observer.disconnect();
  }, []);

  return { isVisible };
};

export { useObserverHomeSearchBar };
