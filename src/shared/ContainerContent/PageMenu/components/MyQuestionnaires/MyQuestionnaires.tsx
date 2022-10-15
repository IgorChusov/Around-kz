import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { MeGetState } from '../../../../../store/me/get/reduser'
import { RootState } from '../../../../../store/reducer'
import { Menu } from '../../../../components/Menu'
import { ButtonBack } from '../../../../components/ButtonBack'
import { EColor, Text } from '../../../../components/Text'

import styles from './myquestionnaires.css'

export function MyQuestionnaires () {
  const me = useSelector<RootState, MeGetState>((state) => state.me)

  return (
    <div className={styles.container}>
      <ButtonBack addressLink="/menu/account/business/" />
      <Text className={styles.title} As="h2" color={EColor.greenDark} size={24}>
        Мои анкеты
      </Text>
      <ul className={styles.list}>
        {me.data.businessman.map((elem) => (
          <li key={`${elem.title}${elem.id}`} className={styles.item}>
          <Text color={EColor.greenMiddle} As="p" className={styles.text} size={16}>
            {elem.title}
          </Text>
          <Link className={styles.link} to={`/menu/account/business/myQuestionnaires/${elem.questionnaire_type.toLowerCase()}/${elem.id}`}></Link>
          </li>
        )) }
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
          <Link className={styles.link} to={'/menu/account/business/createServices/selection'} />
        </li>
      </ul>
      <Menu />
    </div>
  )
}
