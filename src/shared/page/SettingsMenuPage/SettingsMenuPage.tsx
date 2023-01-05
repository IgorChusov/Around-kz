import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import { tokenRequestSuccess } from '../../../store/session/action'
import {
  IconArrowRight,
  IconCards,
  IconInfo,
  IconLink,
  IconMessageText,
  IconShieldTick,
  IconUserSquare,
} from '../../Icons'
import { ButtonBack } from '../../components/ButtonBack'
import { EColor, Text } from '../../components/Text'

import styles from './settingsmenupage.css'
import { PaddingContainer } from '../../components/PaddingContainer'

export function SettingsMenuPage () {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleClickOut = () => {
    localStorage.removeItem('token')
    dispatch(tokenRequestSuccess(''))
    history.push('/')
  }

  const handleClickChange = () => {
    localStorage.removeItem('token')
    dispatch(tokenRequestSuccess(''))
    history.push('/sign-in')
  }

  return (
    <PaddingContainer>
      <ButtonBack addressLink="/menu/account" />
      <Text className={styles.title} color={EColor.greenDark} As="h2" size={24}>
        Настройки
      </Text>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link className={styles.link} to={''}>
            <IconUserSquare />
            <Text color={EColor.greenDark} size={16}>
              Редактировать профиль
            </Text>
            <IconArrowRight />
          </Link>
        </li>
        <li className={styles.item}>
          <Link className={styles.link} to={''}>
            <IconCards />
            <Text color={EColor.greenDark} size={16}>
              Способы оплаты
            </Text>
            <IconArrowRight />
          </Link>
        </li>
        {/* <li className={styles.item}>
          <Link className={styles.link} to={''}>
            <IconShieldTick />
            <Text color={EColor.greenDark} size={16}>
              Безопасность
            </Text>
            <IconArrowRight />
          </Link>
        </li> */}
        <li className={styles.item}>
          <Link className={styles.link} to={'/menu/account/settings/information'}>
            <IconInfo />
            <Text color={EColor.greenDark} size={16}>
              Информация
            </Text>
            <IconArrowRight />
          </Link>
        </li>
        <li className={styles.item}>
          <Link className={styles.link} to={'/menu/account/settings/feedback'}>
            <IconMessageText />
            <Text color={EColor.greenDark} size={16}>
              Ваша обратная связь
            </Text>
            <IconArrowRight />
          </Link>
        </li>
      </ul>
      <div className={styles.btnGroup}>
        <button onClick={handleClickChange} className={styles.btn}>
          <Text className={styles.btnText} color={EColor.greenLight} size={16}>
            Сменить аккаунт
          </Text>
          <IconLink />
        </button>
        <button onClick={handleClickOut} className={styles.btn}>
          <Text className={styles.btnText} color={EColor.greenLight} size={16}>
            Выйти
          </Text>
          <IconLink />
        </button>
      </div>
    </PaddingContainer>
  )
}
