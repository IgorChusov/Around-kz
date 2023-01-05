import React, { useEffect } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'

import { useDispatch, useSelector } from 'react-redux'

import { generateRandomString } from '../../../utils/js/generateRandomIndex'
import { Text } from '../Text'
import { RootState } from '../../../store/reducer'

import styles from './swiperdate.css'

// // install Swiper modules
SwiperCore.use([Navigation])

interface ISwiperDate {
  handleClickOnDate?: (st: string) => string
  list: {
    date: string
    choiceTime: {
      time: string
      freedom: boolean
    }[]
  }[]
}
export function SwiperDate ({ list, handleClickOnDate }: ISwiperDate) {
  // const date = useSelector<RootState, string>((state) => state.dateReserve)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({ type: 'DATE_CHOICE_RESERVE', date: list[0].date })
  }, [])

  return (
    <div className={styles.container}>
      <Swiper
        freeMode={true}
        spaceBetween={15}
        slidesPerView={5}
        // onBeforeInit={(swiper) => {
        //   // @ts-ignore
        //   swiper.params.navigation.prevEl = navigationPrevRef.current;
        //   // @ts-ignore
        //   swiper.params.navigation.nextEl = navigationNextRef.current;
        // }}
        className={styles.swiper}
        breakpoints={{
          375: {
            slidesPerView: 5,
          },
        }}
      >
        {list.map((elem) => {
          return (
            <SwiperSlide key={generateRandomString()} className={styles.slide}>
              <button
                onClick={() => {
                  dispatch({ type: 'DATE_CHOICE_RESERVE', date: elem.date })
                }}
              >
                {/* <Text As="p" className={`${styles.text} ${date === elem.date && styles.active}`} size={16}>
                  {elem.date}
                </Text> */}
              </button>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}
