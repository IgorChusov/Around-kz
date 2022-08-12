import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import { tokenRequestSuccess } from '../../../../../../../store/token/action'
import {
  IconArrowRight,
  IconCards,
  IconInfo,
  IconLink,
  IconMessageText,
  IconShieldTick,
  IconUserSquare,
} from '../../../../../../Icons'
import { ButtonBack } from '../../../../../../universalComponent/ButtonBack'
import { EColor, Text } from '../../../../../../universalComponent/Text'

import styles from './settingsmenu.css'

export function SettingsMenu () {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleClickOut = () => {
    localStorage.removeItem('token')
    dispatch(tokenRequestSuccess(''))
    history.push('/menu')
  }

  const handleClickChange = () => {
    localStorage.removeItem('token')
    dispatch(tokenRequestSuccess(''))
    history.push('/menu')
  }

  return (
    <div>
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
        <li className={styles.item}>
          <Link className={styles.link} to={''}>
            <IconShieldTick />
            <Text color={EColor.greenDark} size={16}>
              Безопасность
            </Text>
            <IconArrowRight />
          </Link>
        </li>
        <li className={styles.item}>
          <Link className={styles.link} to={''}>
            <IconInfo />
            <Text color={EColor.greenDark} size={16}>
              Информация
            </Text>
            <IconArrowRight />
          </Link>
        </li>
        <li className={styles.item}>
          <Link className={styles.link} to={''}>
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
    </div>
  )
}
