import React from 'react'
import { useParams } from 'react-router-dom'
import { SwiperContainer } from '../../components/SwiperContainer'
import { Text, EColor } from '../../components/Text'
import { PresentationLine } from '../../components/PresentationLine'
import { UserRatingIndicator } from '../../components/UserRatingIndicator'
import { generateRandomString } from '../../../utils/js/generateRandomIndex'
import styles from './infoservices.css'
import { RootState } from '../../../store/reducer'
import { TBusinessmenState } from '../../../store/businessman/reducer'
import { useSelector } from 'react-redux'

export function InfoServicesPage () {
  const { id } = useParams<{ id?: string }>();
  const { myBusinessmen } = useSelector<RootState, TBusinessmenState>((state) => state.businessmen)

  return (
    <div className={styles.container}>
      <Text As="h2" className={styles.title} color={EColor.greenDark} size={20}>
        {myBusinessmen.data.title}
      </Text>
      <Text As="p" className={styles.text} size={16} color={EColor.greenMiddle}>
        {myBusinessmen.data.description}
      </Text>
      <UserRatingIndicator
        amountComment="0"
        className={styles.rating}
        text="5.0"
        link={`/pageService/${id}/comments`}
      />
      {(myBusinessmen.data.images_service?.length > 0) && (
        <SwiperContainer images={myBusinessmen.data.images_service} />
      )}
      <PresentationLine />
      <ul className={styles.listServices}>
        {myBusinessmen.data.service.map((elem) => {
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
