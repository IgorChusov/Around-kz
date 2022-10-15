import React from 'react'
import { useParams } from 'react-router-dom'
import { SwiperContainer } from '../components/SwiperContainer'
import { Text, EColor } from '../../../components/Text'
import { generateRandomString } from '../../../../utils/js/generateRandomIndex'
import { PresentationLine } from '../PresentationLine'
import { UserRatingIndicator } from '../../../components/UserRatingIndicator'

import styles from './infoservices.css'
import { IDataBusinessmen } from '../../../../store/businessman/get/reduser'

interface IInfoServices {
  businessmen: IDataBusinessmen 
}

export function InfoServices ({ businessmen }: IInfoServices) {
  const { id } = useParams<{ id?: string }>()
  return (
    <div className={styles.container}>
      <Text As="h2" className={styles.title} color={EColor.greenDark} size={20}>
        {businessmen?.title}
      </Text>
      <Text As="p" className={styles.text} size={16} color={EColor.greenMiddle}>
        {businessmen?.description}
      </Text>
      <UserRatingIndicator
        amountComment="0"
        className={styles.rating}
        text="5.0"
        link={`/pageService/${id}/comments`}
      />
      {(businessmen?.images_service?.length > 0) && (
        <SwiperContainer images={businessmen?.images_service} />
      )}
      <PresentationLine />
      <ul className={styles.listServices}>
        {businessmen.service.map((elem) => {
          return (
            <li className={styles.itemListServices} key={generateRandomString()}>
              <Text className={styles.nameService} As="p" color={EColor.black} size={16}>
                {elem.title}
              </Text>
              <Text className={styles.price} As="p" color={EColor.black} size={16}>{`${elem.price}тг`}</Text>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
