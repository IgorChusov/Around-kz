import React from 'react'
import { Link } from 'react-router-dom'

import { generateRandomString } from '../../../../../../../utils/js/generateRandomIndex'
import { IconElementPlus, IconLink } from '../../../../../../Icons'
import { EColor, Text } from '../../../../../../universalComponent/Text'
import { CreateComponentServices } from '../CreateComponentServices'
import { TListComponentsServices } from '../ServiceInfo'

import styles from './servicesinfocomponents.css'

interface IList {
  id: string
  name: string
  price: number
  quantity: boolean
  comment: string
}

interface IServicesInfoComponents {
  servicesList: TListComponentsServices
  changeElementService: (element: IList, idElement: string) => void
  handleOpenModal: () => void
  handleClickSubmith: () => void
}

export function ServicesInfoComponents (props: IServicesInfoComponents) {
  return (
    <div id="create-services-container" className={styles.pageServices}>
      <div className={styles.pageServicesContent}>
        <Text color={EColor.greenDark} className={styles.textInfo} As="h3" size={16}>
          Укажите услуги, которые вы оказываете
        </Text>
        <ul className={styles.listResult}>
          {props.servicesList.map((element) => {
            return (
              <CreateComponentServices
                componentId={element.id}
                handleClickOnChange={(idElement: string) => {
                  props.changeElementService(element, idElement)
                }}
                key={generateRandomString()}
                nameServices={element.name}
              />
            )
          })}
        </ul>
        <button onClick={props.handleOpenModal} className={styles.btnAdd}>
          <Text color={EColor.greenMiddle} size={16}>
            Добавить
          </Text>
          <IconElementPlus classNameSvg={styles.horizontalPlus} />
          <IconElementPlus classNameSvg={styles.verticalPlus} />
        </button>
        <Link className={styles.basikInfo} to={'/menu/account/business/createServices/selection/service'}>
          <Text className={styles.linkReturn} color={EColor.greenLight} size={16}>
            Основная информация
          </Text>
          <IconLink />
        </Link>
      </div>
      <Link to={''} className={styles.btnServicesNextPage} onClick={props.handleClickSubmith}>
        Сохранить и опубликовать
      </Link>
    </div>
  )
}
