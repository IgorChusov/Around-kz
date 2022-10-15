import React, { useEffect, useState } from 'react';
import { Map, Placemark } from 'react-yandex-maps'
import { usePosition } from '../../../hooks/usePosition';
import yourLocation from '../../../assets/images/my-business.svg';

import styles from './minimap.css';

interface Is {
  latitude?: string
  longitude?: string
  error: any
}

export function MiniMap() {
  const { latitude, longitude, error }: Is = usePosition()
  const [touchedCoords, setTouchedCoords] = useState(false)
  const [coords, setCoords] = useState<number[]>([51.16681515500828, 71.41997509314217])
  
  useEffect(() => {
    if (touchedCoords || !latitude || !longitude) return
    setCoords([Number(latitude), Number(longitude)])
  }, [latitude, longitude])

  return (
    <div className={styles.container}>
      <Map
        width={'100%'}
        height={'100%'}
        // defaultState={{ center: [Number(latitude || 51.16681515500828), Number(longitude || 71.41997509314217)], zoom: 17 }}
         state={{ center: coords, zoom: 16}}
        // instanceRef={(ref) => setMapRef(ref)}
        // onLoad={(ymaps: any) => onLoad(ymaps)}
        modules={['geolocation', 'geocode', 'templateLayoutFactory', 'layout.ImageWithContent']}
        // onBoundsChange={(ymaps: any) => getGeoLocation(ymaps)}
      >
        <Placemark
          geometry={coords}
          options={{
            draggable: true,
            cursor: 'pointer',
            iconCaption: 'Вы здесь',
            iconLayout: 'default#imageWithContent',
            // iconImageSize: [64, 64],
            // iconImageOffset: [-22, -35],
            iconImageHref: yourLocation,
          }}
        />
      </Map>
    </div>
  );
}
