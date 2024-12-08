import { configResponsive, useResponsive } from 'ahooks';

configResponsive({
  small: 0,
  middle: 768,
  large: 1240,
});

export function useScreen() {
  const { small, middle, large } = useResponsive();

  const isMobile = small && !middle && !large;
  const isTablet = middle && small && !large;
  const isDesktop = large && middle && small;

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
}
