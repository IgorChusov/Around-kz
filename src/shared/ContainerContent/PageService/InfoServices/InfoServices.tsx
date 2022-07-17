import React from 'react'

import { useParams } from 'react-router-dom'

import { SwiperContainer } from '../components/SwiperContainer'
import { Text, EColor } from '../../../universalComponent/Text'
import { generateRandomString } from '../../../../utils/js/generateRandomIndex'
import { PresentationLine } from '../PresentationLine'
import { UserRatingIndicator } from '../../../universalComponent/UserRatingIndicator'

import styles from './infoservices.css'

interface IInfoServices {
  listImages: string[]
  listServices: {
    id: string
    nameService: string
    price: number
  }[]
}

export function InfoServices ({ listImages, listServices }: IInfoServices) {
  const { id } = useParams<{ id?: string }>()
  return (
    <div className={styles.container}>
      <Text As="h2" className={styles.title} color={EColor.greenDark} size={20}>
        {'Мастер маникюра Быстрова Катя'}
      </Text>
      <Text As="p" className={styles.text} size={16} color={EColor.greenMiddle}>
        Cпециалист с 4 летним стажем, люблю применять новое. Владею всеми современными технологиями наращивания и
        покрытия. Имеются сертификаты об образовании. Гарантия качества. Все инструменты индивидуальны и проходят
        необходимые этапы обработки и дезинфекции.
      </Text>
      <UserRatingIndicator
        amountComment="5"
        className={styles.rating}
        text="3.5"
        link={`/pageService/${id}/comments`}
      />
      <SwiperContainer images={listImages} />
      <PresentationLine />
      <ul className={styles.listServices}>
        {listServices.map((elem) => {
          return (
            <li className={styles.itemListServices} key={generateRandomString()}>
              <Text className={styles.nameService} As="p" color={EColor.black} size={16}>
                {elem.nameService}
              </Text>
              <Text className={styles.price} As="p" color={EColor.black} size={16}>{`${elem.price}тг`}</Text>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
