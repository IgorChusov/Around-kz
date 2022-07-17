import React from 'react'
import { Link } from 'react-router-dom'

import { IconStar } from '../../Icons'
import { EColor, Text } from '../Text'

import styles from './userratingindicator.css'

interface IUserRatingIndicator {
  className?: string
  text: string
  link: string
  amountComment: string
}

export function UserRatingIndicator (props: IUserRatingIndicator) {
  return (
    <div className={`${styles.ratingContainer} ${props.className}`}>
      <IconStar />
      <Text className={styles.text} color={EColor.greenLight} size={24}>
        {props.text}
      </Text>
      <Link className={styles.link} to={props.link}>
        <Text
          className={styles.buttonText}
          color={EColor.greenLight}
          size={16}
        >{`${props.amountComment} отзывов`}</Text>
      </Link>
    </div>
  )
}
