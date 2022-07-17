import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination } from 'swiper'

import { Link, useParams, useRouteMatch } from 'react-router-dom'

import { Text } from '../../../universalComponent/Text'
import { UserRatingIndicator } from '../../../universalComponent/UserRatingIndicator'
import { TDataProducts } from '../../../../store/products/reduces'

import styles from './pageallproduct.css'

interface IPageAllProduct {
  productList: TDataProducts
  clickOnProduct: () => void
  id: string
  type: string
  listImg?: string[]
}

SwiperCore.use([Pagination])

export function PageAllProduct (props: IPageAllProduct) {
  const { path, url } = useRouteMatch()
  const { id, idProduct, type } = useParams<{ id?: string; idProduct?: string; type?: string }>()
  return (
    <div className={styles.container}>
      <Text className={styles.title} As="h2" size={24}>
        {props.productList.name}
      </Text>
      <Text className={styles.description} As="p" size={16}>
        {props.productList.description}
      </Text>
      <UserRatingIndicator
        className={styles.rating}
        amountComment="5"
        link={`/pageProducts/${type}/${id}/comments`}
        text="3.5"
      />
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        slidesPerColumn={2}
        slidesPerColumnFill="row"
        pagination={{
          clickable: true,
        }}
        className={styles.swiper}
      >
        {props.productList.list.map((elem, index) => {
          return (
            <SwiperSlide className={styles.slide} key={elem.id}>
              <div className={styles.slideContainer}>
                <div className={styles.containerImg}>
                  <img className={styles.img} src={elem.img} alt="Товар" />
                </div>
                <div className={styles.slideContent}>
                  <Text className={styles.cardTitle} size={16} As="h3">
                    {elem.nameProduct}
                  </Text>
                  <div className={styles.containerInfo}>
                    <Text className={styles.cardInfo} size={16} As="p">{`от ${elem.min}${elem.unit}`}</Text>
                    <Text className={styles.cardPrice} size={16} As="p">{`${elem.price} тнг`}</Text>
                  </div>
                </div>
              </div>
              <Link
                onClick={props.clickOnProduct}
                className={styles.link}
                to={`/pageProducts/${props.type}/${props.id}/product/${elem.id}`}
              ></Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}
