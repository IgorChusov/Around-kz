import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { TAccountState } from '../../../../../store/account/reducer'
import { RootState } from '../../../../../store/reducer'
import { Menu } from '../../../../components/Menu'
import { ButtonBack } from '../../../../components/ButtonBack'
import { EColor, Text } from '../../../../components/Text'
import styles from './myquestionnaires.css'

export function MyQuestionnaires () {
  const { user } = useSelector<RootState, TAccountState>((state) => state.account)

  return (
    <div className={styles.container}>
      <ButtonBack addressLink="/menu/account/business/" />
      <Text className={styles.title} As="h2" color={EColor.greenDark} size={24}>
        Мои анкеты
      </Text>
      <ul className={styles.list}>
        {user.data.businessman.map((elem) => (
          <li key={`${elem.title}${elem.id}`} className={styles.item}>
          <Text color={EColor.greenMiddle} As="p" className={styles.text} size={16}>
            {elem.title}
          </Text>
          <Link className={styles.link} to={`/menu/account/business/myQuestionnaires/${elem.questionnaire_type.toLowerCase()}/${elem.id}`}></Link>
          </li>
        )) }
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
