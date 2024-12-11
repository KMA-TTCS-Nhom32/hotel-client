import { configResponsive, useResponsive } from 'ahooks';

configResponsive({
  small: 0,
  middle: 768,
  large: 1240,
});

export function useScreen() {
  //   const { small = true, middle = false, large = false } = useResponsive();
  const responsive = useResponsive();

  let small = Object(responsive).small as boolean;
  let middle = Object(responsive).middle as boolean;
  let large = Object(responsive).large as boolean;

  const isMobile = small && !middle && !large;
  const isTablet = middle && small && !large;
  const isDesktop = large && middle && small;

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
}
