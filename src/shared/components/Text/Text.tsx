import React from 'react'
import classnames from 'classnames'
import styles from './text.css'

export enum EColor {
  black = 'black',
  blackVar = 'blackVar',
  orange = 'orange',
  greenDark = 'greenDark',
  greenMiddle = 'greenMiddle',
  greenLight = 'greenLight',
  white = 'white',
  grayF4 = 'grayF4',
  grayF3 = 'grayF3',
  grayD9 = 'grayD9',
  grayC4 = 'grayC4',
  gray99 = 'gray99',
  gray66 = 'gray66',
  grayEC = 'grayEC',
}

type TSizes = 28 | 24 | 20 | 16 | 14 | 12 | 10

interface ITextProps {
  As?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div'
  children?: React.ReactNode
  size: TSizes
  mobileSize?: TSizes
  tabledSize?: TSizes
  desktopSize?: TSizes
  color?: EColor
  bold?: boolean
  className?: string
}

export function Text (props: ITextProps) {
  const {
    As = 'span',
    children,
    size,
    mobileSize,
    tabledSize,
    desktopSize,
    color = EColor.black,
    bold = false,
    className,
  } = props
  const classes = classnames(
    styles[`s${size}`],
    styles[color],
    { [styles.bold]: bold },
    { [styles[`m${mobileSize}`]]: mobileSize },
    { [styles[`t${tabledSize}`]]: tabledSize },
    { [styles[`d${desktopSize}`]]: desktopSize },
    className,
  )
  return <As className={classes}>{children}</As>
}
