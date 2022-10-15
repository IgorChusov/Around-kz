import React from 'react';
import { EColor, Text } from '../Text';
import cn from 'classnames';
import styles from './title.css';

type TSizes = 28 | 24 | 20 | 16 | 14 | 12 | 10

interface IProps {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  className?: string
  size?: TSizes
}

export function Title(
  {
    text,
    as = 'h2',
    className,
    size = 24,
  }: IProps) {

  return (
    <Text className={cn(styles.title, {
      className: className
    })} 
      size={size} 
      As={as}
      color={EColor.greenDark}
    >
      {text}
    </Text>
  );
}
