import React, { ChangeEvent } from 'react'

import { ButtonBack } from '../../components/ButtonBack'
import { EColor, Text } from '../../components/Text'

import applePay from '../../../assets/images/applePay.png'
import creditCard from '../../../assets/images/creditCard.png'
import { IListCard } from '../../../store/reducer'
import { generateRandomString } from '../../../utils/js/generateRandomIndex'

import styles from './paymentmethods.css'

interface IPaymentMethods {
  list: IListCard
  addNewCard: () => void
  clickPay: () => void
  addressBack: string
}

export function PaymentMethodsPage (props: IPaymentMethods) {
  const [value, setValue] = React.useState('10')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }
  return (
    <div className={styles.container}>
      <ButtonBack addressLink={props.addressBack} className={styles.btnBack} />
      <Text className={styles.title} color={EColor.greenDark} As="h2" size={24}>
        Забронировать
      </Text>
      <form className={styles.form} action="">
        <div className={styles.group}>
          <div>
            <input
              className={styles.radioInput}
              onChange={handleChange}
              checked={value === '10'}
              value="10"
              id="radioPayFirst"
              type="radio"
            />
            <label className={styles.label} htmlFor="radioPayFirst">{`${10}% от стоимости`}</label>
          </div>
          <Text className={styles.text} color={EColor.greenDark} size={16}>{`${207} р`}</Text>
        </div>
        <div className={styles.group}>
          <div>
            <input
              className={styles.radioInput}
              onChange={handleChange}
              checked={value === '100'}
              value="100"
              id="radioPaySecond"
              type="radio"
            />
            <label className={styles.label} htmlFor="radioPaySecond">{`${100}% от стоимости`}</label>
          </div>
          <Text className={styles.text} color={EColor.greenDark} size={16}>{`${2070} р`}</Text>
        </div>
      </form>
      <ul className={styles.list}>
        <li className={styles.item}>
          <button className={styles.listButton}>
            <Text size={20} mobileSize={16}>
              Apple Pay
            </Text>
            <img src={applePay} alt="платежная система Apple Pay" />
          </button>
        </li>
        {props.list.map((elem) => {
          return (
            <li key={generateRandomString()} className={styles.item}>
              <button className={styles.listButton}>
                <Text size={20} mobileSize={16}>{`***${elem.number.substr(-3, 3)}`}</Text>
                <img src={creditCard} alt="банковская карта" />
              </button>
            </li>
          )
        })}
        <li className={styles.item}>
          <button onClick={props.addNewCard} className={styles.listButton}>
            <Text size={20} mobileSize={16}>
              Новая карта
            </Text>
            <img src={creditCard} alt="банковская карта" />
          </button>
        </li>
      </ul>
      <button onClick={props.clickPay} className={styles.button}>
        <Text color={EColor.white} size={20}>
          Оплатить
        </Text>
      </button>
    </div>
  )
}
