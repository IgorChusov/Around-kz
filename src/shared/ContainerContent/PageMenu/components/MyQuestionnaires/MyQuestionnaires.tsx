import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { AllBusinessmenUserAsync } from '../../../../../store/businessman/all/action'

import { Menu } from '../../../../Menu'
import { ButtonBack } from '../../../../universalComponent/ButtonBack'
import { EColor, Text } from '../../../../universalComponent/Text'

import styles from './myquestionnaires.css'

export function MyQuestionnaires () {
  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch(AllBusinessmenUserAsync())
  }, [])
  return (
    <div className={styles.container}>
      <ButtonBack addressLink="/menu/account/business/" />
      <Text className={styles.title} As="h2" color={EColor.greenDark} size={24}>
        Мои анкеты
      </Text>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Text color={EColor.greenMiddle} As="p" className={styles.text} size={16}>
            Мастер маникюра
          </Text>
          <Link className={styles.link} to={'/menu/account/business/myQuestionnaires/service/123'}></Link>
        </li>
        <li className={styles.item}>
          <Text color={EColor.greenMiddle} As="p" className={styles.text} size={16}>
            Мебель
          </Text>
          <Link className={styles.link} to={'/menu/account/business/myQuestionnaires/products/store/124'}></Link>
        </li>
        <li className={styles.item}>
          <Text color={EColor.greenMiddle} As="p" className={styles.text} size={16}>
            Домашние продукты
          </Text>
          <Link className={styles.link} to={'/menu/account/business/myQuestionnaires/products/bringing/124'}></Link>
        </li>
        <li className={styles.item}>
          <Text color={EColor.greenMiddle} As="p" className={styles.text} size={16}>
            Новая страница
          </Text>
          <Link className={styles.link} to={'/menu/account/business/createServices/selection'}></Link>
        </li>
      </ul>
      <Menu />
    </div>
  )
}
