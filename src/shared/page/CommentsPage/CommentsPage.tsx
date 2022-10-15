import React from 'react'
import { useParams } from 'react-router'

import { IconStar } from '../../Icons'
import { ButtonBack } from '../../components/ButtonBack'
import { EColor, Text } from '../../components/Text'

import styles from './pagecomments.css'

export function CommentsPage () {
  const { id, idProduct, type } = useParams<{ id?: string; idProduct?: string; type?: string }>()
  return (
    <div className={styles.container}>
      <ButtonBack addressLink={type ? `/pageProducts/${type}/${id}` : `/pageService/${id}`} />
      <Text color={EColor.greenDark} className={styles.title} As="h2" size={24}>
        ИП Печенькина
      </Text>
      <Text color={EColor.greenDark} className={styles.subtitle} As="h3" size={20}>
        Пользователи оценили меня на
      </Text>
      <div className={styles.ratingContainer}>
        <IconStar />
        <Text color={EColor.greenLight} size={24}>
          {'5.0'}
        </Text>
      </div>
      <Text className={styles.subtitleSecond} color={EColor.greenDark} As="h3" size={20}>
        Последние отзывы
      </Text>
      <ul className={styles.list}>
        <li className={styles.item}>
          <div className={styles.contentInfo}>
            <Text className={styles.textName} color={EColor.greenDark} size={16}>
              Антонина Н.
            </Text>
            <div className={styles.ratingComment}>
              <IconStar />
              <Text color={EColor.greenDark} size={16}>
                5
              </Text>
            </div>
          </div>
          <div className={styles.textContainer}>
            <Text size={16}>Все супер, все отлично, пушка!</Text>
          </div>
        </li>
        <li className={styles.item}>
          <div className={styles.contentInfo}>
            <Text className={styles.textName} color={EColor.greenDark} size={16}>
              Антонина Н.
            </Text>
            <div className={styles.ratingComment}>
              <IconStar />
              <Text color={EColor.greenDark} size={16}>
                5
              </Text>
            </div>
          </div>
          <div className={styles.textContainer}>
            <Text size={16}>Все супер, все отлично, пушка!</Text>
          </div>
        </li>
        <li className={styles.item}>
          <div className={styles.contentInfo}>
            <Text className={styles.textName} color={EColor.greenDark} size={16}>
              Антонина Н.
            </Text>
            <div className={styles.ratingComment}>
              <IconStar />
              <Text color={EColor.greenDark} size={16}>
                5
              </Text>
            </div>
          </div>
          <div className={styles.textContainer}>
            <Text size={16}>Все супер, все отлично, пушка!</Text>
          </div>
        </li>
        <li className={styles.item}>
          <div className={styles.contentInfo}>
            <Text className={styles.textName} color={EColor.greenDark} size={16}>
              Антонина Н.
            </Text>
            <div className={styles.ratingComment}>
              <IconStar />
              <Text color={EColor.greenDark} size={16}>
                5
              </Text>
            </div>
          </div>
          <div className={styles.textContainer}>
            <Text size={16}>Все супер, все отлично, пушка!</Text>
          </div>
        </li>
        <li className={styles.item}>
          <div className={styles.contentInfo}>
            <Text className={styles.textName} color={EColor.greenDark} size={16}>
              Антонина Н.
            </Text>
            <div className={styles.ratingComment}>
              <IconStar />
              <Text color={EColor.greenDark} size={16}>
                5
              </Text>
            </div>
          </div>
          <div className={styles.textContainer}>
            <Text size={16}>Все супер, все отлично, пушка!</Text>
          </div>
        </li>
      </ul>
    </div>
  )
}
