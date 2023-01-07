import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { generateRandomString } from '../../../../../utils/js/generateRandomIndex'
import { IconElementPlus, IconLink } from '../../../../Icons'
import { EColor, Text } from '../../../../components/Text'
import { CreateComponentServices } from '../CreateComponentServices'
import styles from './servicesinfocomponents.css'

interface IList {
  id?: number
  idFront: string
  title: string
  price: string
  description: string
}

interface IServicesInfoComponents {
  servicesList: IList []
  changeElementService: (element: IList, idElement: string, id: number | undefined) => void
  handleOpenModal: () => void
  handleClickSubmith: () => void
}

export function ServicesInfoComponents (props: IServicesInfoComponents) {
  const { id } = useParams<{ id?: string; type?: string; typeService?: string }>()
  
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
                id={element.id}
                componentId={element.idFront}
                handleClickOnChange={(idElement: string) => {
                  props.changeElementService(element, idElement, element.id)
                }}
                key={generateRandomString()}
                nameServices={element.title}
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
        <Link className={styles.basikInfo} 
          to={
            location.pathname === `/menu/account/business/myQuestionnaires/service/${id}/changeInfo/components` 
              ? `/menu/account/business/myQuestionnaires/service/${id}/changeInfo` :
              '/menu/account/business/createServices/service'
              } >
          <Text className={styles.linkReturn} color={EColor.greenLight} size={16}>
            Основная информация
          </Text>
          <IconLink />
        </Link>
      </div>
      <button className={styles.btnServicesNextPage} onClick={props.handleClickSubmith}>
        Сохранить и опубликовать
      </button>
    </div>
  )
}
