import React from 'react';

import { cn } from '@/lib/utils';

import { TColor } from '@/styles/color/color.variables';

interface TextProps {
  children: React.ReactNode;
  type?:
    | 'heading1-extra-bold'
    | 'heading2-bold'
    | 'heading3-bold'
    | 'heading3-semi-bold'
    | 'heading4-bold'
    | 'heading4-semi-bold'
    | 'heading5-medium'
    | 'heading5-bold'
    | 'heading6-bold'
    | 'title1-semi-bold'
    | 'title2-semi-bold'
    | 'body1'
    | 'body2'
    | 'caption1-semi-bold'
    | 'caption2'
    | 'specific-link';
  color?: TColor;
  disabled?: boolean;
  state?: null | 'disable';
  className?: string;
//   onClick?: () => void;
  element?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  style?: React.CSSProperties;
}

export const Text = ({
  type = 'body2',
  color = 'text-primary',
  disabled = false,
  className = '',
//   onClick = () => {},
  children,
  element = 'p',
  style,
}: TextProps) => {
  const classes = cn(type, color, { 'text-disable': disabled }, className);

  return React.createElement(
    element,
    {
      className: classes,
    //   onClick,
      style,
    },
    React.createElement(React.Fragment, undefined, children),
  );
};
