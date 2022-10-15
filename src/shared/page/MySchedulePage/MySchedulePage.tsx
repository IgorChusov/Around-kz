import React from 'react'
import { Calendar } from '../../components/Calendar'
import { ButtonBack } from '../../components/ButtonBack'
import { EColor, Text } from '../../components/Text'
import styles from './myschedulespage.css'

export function MySchedulePage () {
 
  return (
    <div className={styles.container}>
      <ButtonBack addressLink="/menu/account/personal" />
      <Text className={styles.title} color={EColor.greenDark} As="h2" size={24}>
        Расписание
      </Text>
      <Calendar handleClick={() => {}}/>
      <div className={styles.containerSchedules}>
        <ul className={styles.listDate}>
          <li className={styles.itemDate}>
            <Text className={styles.textDate} color={EColor.blackVar} size={16}>
              26.01.2022
            </Text>
            <ul className={styles.list}>
              <li className={styles.item}>
                <div className={styles.itemTimeContainer}>
                  <Text color={EColor.blackVar} className={styles.textTime} size={12}>
                    8:00
                  </Text>
                  <div className={styles.line}></div>
                </div>
                <Text className={styles.textName} size={16}>
                  Иванова Катя
                </Text>
                <button className={styles.itemButton}>
                  <Text className={styles.textInfo} color={EColor.greenLight} size={12}>
                    Подробнее
                  </Text>
                </button>
              </li>
              <li className={styles.item}>
                <div className={styles.itemTimeContainer}>
                  <Text color={EColor.blackVar} className={styles.textTime} size={12}>
                    9:00
                  </Text>
                  <div className={styles.line}></div>
                </div>
                <Text className={styles.textName} size={16}>
                  Иванова Катя
                </Text>
                <button className={styles.itemButton}>
                  <Text className={styles.textInfo} color={EColor.greenLight} size={12}>
                    Подробнее
                  </Text>
                </button>
              </li>
              <li className={styles.item}>
                <div className={styles.itemTimeContainer}>
                  <Text color={EColor.blackVar} className={styles.textTime} size={12}>
                    10:00
                  </Text>
                  <div className={styles.line}></div>
                </div>
                <Text className={styles.textName} size={16}>
                  Иванова Катя
                </Text>
                <button className={styles.itemButton}>
                  <Text className={styles.textInfo} color={EColor.greenLight} size={12}>
                    Подробнее
                  </Text>
                </button>
              </li>
            </ul>
          </li>
          <li className={styles.itemDate}>
            <Text className={styles.textDate} color={EColor.blackVar} size={16}>
              27.01.2022
            </Text>
            <ul className={styles.list}>
              <li className={styles.item}>
                <div className={styles.itemTimeContainer}>
                  <Text color={EColor.blackVar} className={styles.textTime} size={12}>
                    8:00
                  </Text>
                  <div className={styles.line}></div>
                </div>
                <Text className={styles.textName} size={16}>
                  Иванова Катя
                </Text>
                <button className={styles.itemButton}>
                  <Text className={styles.textInfo} color={EColor.greenLight} size={12}>
                    Подробнее
                  </Text>
                </button>
              </li>
              <li className={styles.item}>
                <div className={styles.itemTimeContainer}>
                  <Text color={EColor.blackVar} className={styles.textTime} size={12}>
                    9:00
                  </Text>
                  <div className={styles.line}></div>
                </div>
                <Text className={styles.textName} size={16}>
                  Иванова Катя
                </Text>
                <button className={styles.itemButton}>
                  <Text className={styles.textInfo} color={EColor.greenLight} size={12}>
                    Подробнее
                  </Text>
                </button>
              </li>
              <li className={styles.item}>
                <div className={styles.itemTimeContainer}>
                  <Text color={EColor.blackVar} className={styles.textTime} size={12}>
                    10:00
                  </Text>
                  <div className={styles.line}></div>
                </div>
                <Text className={styles.textName} size={16}>
                  Иванова Катя
                </Text>
                <button className={styles.itemButton}>
                  <Text className={styles.textInfo} color={EColor.greenLight} size={12}>
                    Подробнее
                  </Text>
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  )
}
