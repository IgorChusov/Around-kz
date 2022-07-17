import React from 'react'
import { Link } from 'react-router-dom'

import { IconElementPlus } from '../../../../../../../Icons'
import { EColor, Text } from '../../../../../../../universalComponent/Text'

import styles from './listproducts.css'

interface IListProduct {
  linkAddNewProduct: string
}

export function ListProducts (props: IListProduct) {
  return (
    <div className={styles.container}>
      <Text className={styles.title} As="h2" color={EColor.greenDark} size={24}>
        {'Добавьте новый товар'}
      </Text>
      <ul className={styles.list}>
        <li className={styles.item}>
          <div className={styles.containerPlus}>
            <IconElementPlus />
            <IconElementPlus />
          </div>
          <Link className={styles.link} to={props.linkAddNewProduct}></Link>
        </li>
        <li className={styles.item}>
          <div className={styles.containerImg}>
            <img src="" alt="" />
          </div>
          <div className={styles.content}>
            <Text As="h3" className={styles.titleCard} size={16}>
              Лопатка говяжья
            </Text>
            <Text className={styles.text} size={16}>
              От 1 кг
            </Text>
            <Text className={styles.textPrice} size={16}>
              560 р/кг
            </Text>
          </div>
        </li>
        <li className={styles.item}>
          <div className={styles.containerImg}>
            <img src="" alt="" />
          </div>
          <div className={styles.content}>
            <Text As="h3" className={styles.titleCard} size={16}>
              Лопатка говяжья
            </Text>
            <Text className={styles.text} size={16}>
              От 1 кг
            </Text>
            <Text className={styles.textPrice} size={16}>
              560 р/кг
            </Text>
          </div>
        </li>
        <li className={styles.item}>
          <div className={styles.containerImg}>
            <img src="" alt="" />
          </div>
          <div className={styles.content}>
            <Text As="h3" className={styles.titleCard} size={16}>
              Лопатка говяжья
            </Text>
            <Text className={styles.text} size={16}>
              От 1 кг
            </Text>
            <Text className={styles.textPrice} size={16}>
              560 р/кг
            </Text>
          </div>
        </li>
      </ul>
      <Link className={styles.button} to={'/menu/account/business/createServices/selection/buy/selectionType'}>
        <Text color={EColor.white} size={20}>
          Далее
        </Text>
      </Link>
    </div>
  )
}
