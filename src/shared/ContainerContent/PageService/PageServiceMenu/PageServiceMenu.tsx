import React from 'react'

import { useLocation } from 'react-router'

import { IconCalendar, IconChat, IconContacts } from '../../../Icons'

import styles from './pageservicemenu.css'

interface IPageServiceMenu {
  handleClickOnInfo: () => void
  handleClickOnChat: () => void
  handleClickOnCalendar: () => void
  activeBtn: string
}

export function PageServiceMenu ({
  handleClickOnInfo,
  handleClickOnChat,
  handleClickOnCalendar,
  activeBtn,
}: IPageServiceMenu) {
  const location = useLocation().pathname
  return (
    <ul className={styles.buttonList}>
      <li>
        <button
          onClick={handleClickOnInfo}
          className={`${styles.buttonInfo} ${activeBtn === 'info' && styles.buttonActive}`}
        >
          <IconContacts />
        </button>
      </li>
      <li>
        <button
          onClick={handleClickOnChat}
          className={`${styles.buttonChat} ${activeBtn === 'chat' && styles.buttonActive}`}
        >
          <IconChat />
        </button>
      </li>
      <li>
        <button
          disabled={location === '/pageProducts/id=124/chat' || location === '/pageProducts'}
          onClick={handleClickOnCalendar}
          className={`${styles.buttonCalendar} ${activeBtn === 'ChoiceOfServices' && styles.buttonActive} ${
            activeBtn === 'ChoiceOfDate' && styles.buttonActive
          }`}
        >
          <IconCalendar />
        </button>
      </li>
    </ul>
  )
}
