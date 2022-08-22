import React, { useRef } from 'react'

import styles from './swipercontainer.css'

import { Swiper, SwiperSlide } from 'swiper/react'
import '../../../../../../node_modules/swiper/swiper-bundle.css'
import '../../../../../../node_modules/swiper/swiper.min.css'
import SwiperCore, { EffectCoverflow, Navigation } from 'swiper'

import { generateRandomString } from '../../../../../utils/js/generateRandomIndex'
import { IconArrow } from '../../../../Icons'
interface ISwiperContainer {
  images: string[]
}

SwiperCore.use([EffectCoverflow, Navigation])

export function SwiperContainer ({ images }: ISwiperContainer) {
  const navigationPrevRef = useRef(null)
  const navigationNextRef = useRef(null)

  return (
    <Swiper
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={'auto'}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 500,
        modifier: 1,
        slideShadows: true,
      }}
      navigation={{
        prevEl: navigationPrevRef.current,
        nextEl: navigationNextRef.current,
      }}
      onBeforeInit={(swiper) => {
        // @ts-ignore
        swiper.params.navigation.prevEl = navigationPrevRef.current
        // @ts-ignore
        swiper.params.navigation.nextEl = navigationNextRef.current
      }}
      className={styles.swiperContainer}
      loop={true}
    >
      {images.map((elem: string) => {
        return (
          <SwiperSlide key={generateRandomString()} className={styles.slide}>
            <img className={styles.img} src={elem ? elem : 'null'} alt="Календарь" />
          </SwiperSlide>
        )
      })}
      <div className={styles.buttonGroup}>
        <button className={styles.button} ref={navigationPrevRef}>
          <IconArrow />
        </button>
        <button className={`${styles.button} ${styles.buttonNext}`} ref={navigationNextRef}>
          <IconArrow />
        </button>
      </div>
    </Swiper>
  )
}
