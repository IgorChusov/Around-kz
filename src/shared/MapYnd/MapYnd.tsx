import React, { useEffect, useMemo, useState } from 'react'

import { Map, Placemark, YMaps, YMapsApi } from 'react-yandex-maps'

import { useHistory } from 'react-router'

import { useSelector } from 'react-redux'

import { usePosition } from '../../hooks/usePosition'
import img from '../../assets/images/yourLocation.png'

import { RootState } from '../../store/reducer'
import { IconCenterCoordinates } from '../Icons'

import styles from './mapynd.css'

interface Is {
  latitude?: string
  longitude?: string
  error: any
}

export function MapYnd () {
  const history = useHistory()
  const item = useSelector<RootState>((state) => state.item)
  const { latitude, longitude, error }: Is = usePosition()
  const [maps, setMaps] = useState<any>({})
  const [coords, setCoords] = useState<number[]>([])
  const [isGetCoords, setIsGetCoords] = useState(true)
  const [touchedCoords, setTouchedCoords] = useState(false)
  const [mapRef, setMapRef] = useState<any>({})

  const getGeoLocation = async (ymaps: any) => {
    setIsGetCoords(false)
    const geo = await ymaps.get('target').geoObjects.get(0)
    geo.events.add('dragend', function (e: any) {
      setTouchedCoords(true)
      const coordinates = geo.geometry.getCoordinates()
      setCoords(coordinates)
    })
    setIsGetCoords(true)
  }

  const onLoad = (ymaps: YMapsApi) => {
    setMaps(ymaps)
  }

  // const polygonLayout = useMemo(()=>{
  //   return maps.templateLayoutFactory.createClass('<div class="placemark_layout_container"><div class="polygon_layout">!</div></div>');
  // }, [maps])

  function handleCenterMyPosition () {
    mapRef.setCenter(coords, 17)
  }

  useEffect(() => {
    if (touchedCoords) return
    setCoords([Number(latitude), Number(longitude)])
  }, [latitude, longitude])

  return (
    <div className={styles.container}>
      <button onClick={handleCenterMyPosition} className={styles.centerBtn}>
        <IconCenterCoordinates />
      </button>
      <Map
        width={'100%'}
        height={'100%'}
        defaultState={{ center: [Number(latitude), Number(longitude)], zoom: 17 }}
        //  state={{ center: coords, zoom: 17}}
        instanceRef={(ref) => setMapRef(ref)}
        onLoad={(ymaps: YMapsApi) => onLoad(ymaps)}
        modules={['geolocation', 'geocode', 'templateLayoutFactory', 'layout.ImageWithContent']}
        onBoundsChange={(ymaps: any) => getGeoLocation(ymaps)}
      >
        <Placemark
          geometry={coords}
          options={{
            draggable: true,
            cursor: 'pointer',
            iconCaption: 'Вы здесь',
            iconLayout: 'default#imageWithContent',
            iconImageSize: [44, 44],
            iconImageOffset: [-22, -35],
            iconImageHref: img,
          }}
        />

        <Placemark
          onClick={() => {
            history.push(`/pageService/${123}`)
          }}
          defaultGeometry={[60.05695327479101, 30.439678014399785]}
        />

        <Placemark
          onClick={() => {
            history.push(`/pageProducts/${'bringing'}/${124}`)
          }}
          defaultGeometry={[60.05796327479101, 30.439678014399785]}
        />

        <Placemark
          onClick={() => {
            history.push(`/pageProducts/${'store'}/${124}`)
          }}
          defaultGeometry={[60.05897327479101, 30.439678014399785]}
        />
      </Map>
    </div>
  )
}
