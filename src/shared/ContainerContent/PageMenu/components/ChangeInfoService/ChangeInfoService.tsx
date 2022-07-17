import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { Route, Switch, useHistory, useLocation, useParams } from 'react-router'

import { generateRandomString } from '../../../../../utils/js/generateRandomIndex'
import { ModalComponentServices } from '../../../../ModalComponentServices'
import { ButtonBack } from '../../../../universalComponent/ButtonBack'
import { EColor, Text } from '../../../../universalComponent/Text'
import { ServicesInfoComponents } from '../CreateServices/ServiceInfo/ServicesInfoComponents'
import { ServicesInfoPageBasic } from '../CreateServices/ServiceInfo/ServicesInfoPageBasic'

import styles from './changeinfoservice.css'

export type TListComponentsServices = {
  id: string
  name: string
  price: number
  quantity: boolean
  comment: string
}[]

interface IList {
  id: string
  name: string
  price: number
  quantity: boolean
  comment: string
}

export function ChangeInfoService () {
  const { id, type, typeService } = useParams<{ id?: string; type?: string; typeService?: string }>()
  const refPresentation = useRef<HTMLDivElement>(null)
  const history = useHistory()
  const location = useLocation().pathname
  const [page, setPage] = useState(true)
  const [title, setTitle] = useState('Заполните информацию о себе')
  const [isOpenModal, setOpenModal] = useState(false)
  const [idChangeElement, setIdChangeElement] = useState('')
  // массив с списком услуг и цен
  const [services, setServices] = useState<TListComponentsServices>([])
  // управляемые компоненты интутов
  const [valueName, setValueName] = useState('')
  const [valuePrice, setValuePrice] = useState('')
  const [valueComment, setValueComment] = useState('')
  const [valueValidation, setValueValidation] = useState('')
  const [isValidationName, setValidationName] = useState(false)
  const [isValidationPrice, setValidationPrice] = useState(false)

  // функции изменения состояний интутов
  function handleChangeInputName (e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    setValueName(`${e.target.value}`)
  }
  function handleChangeInputPrice (e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    if (/^[0-9]+$/.test(e.target.value) || /^\s*$/.test(e.target.value)) {
      setValuePrice(`${e.target.value}`)
    }
  }
  function handleChangeInputComment (e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    setValueComment(`${e.target.value}`)
  }
  // // функция добавления новой услуги
  function changeElementService (element: IList, idElement: string) {
    setOpenModal(true)
    setValueName(element.name)
    setValuePrice(`${element.price}`)
    setValueComment(element.comment)
    setIdChangeElement(idElement)
  }

  // function removeElementService (element:IList) {
  //  const newList = services.filter(function( obj ) {
  //     return obj.name !== element.name;
  // });
  //   setServices(newList)
  // }

  function handleAddService (e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (valueName.length < 3) {
      setValidationName(true)
      setValueValidation('Название должно состоять не менее чем из трех букв')
      return
    } else {
      setValidationName(false)
      setValueValidation('')
    }

    if (valuePrice.length === 0) {
      setValidationPrice(true)
      setValueValidation('Поле цены обязательно для заполнения')
      return
    } else {
      setValidationPrice(false)
      setValueValidation('')
    }
    // функции изменения элемента списков услуг

    if (idChangeElement.length > 1) {
      services.map((elem) => {
        if (elem.id === idChangeElement) {
          elem.name = valueName
          elem.price = Number(valuePrice)
          elem.comment = valueComment
        }
      })
      setServices(services)
    } else {
      setServices([
        ...services,
        {
          id: generateRandomString(),
          name: valueName,
          price: Number(valuePrice),
          quantity: false,
          comment: valueComment,
        },
      ])
    }

    setOpenModal(false)
    setIdChangeElement('')
    setValueName('')
    setValuePrice('')
    setValueComment('')
  }
  function handleSubmit (e: FormEvent) {
    e.preventDefault()
    history.push(`/menu/account/business/myQuestionnaires/${typeService}/${id}/changeInfo/components`)
  }
  useEffect(() => {
    if (!refPresentation.current) return
    if (location === '/menu/account/business/createServices/selection/service') {
      refPresentation.current.style.transform = 'translateX(0%)'
    } else {
      refPresentation.current.style.transform = 'translateX(121%)'
    }
  }, [location])
  return (
    <div className={styles.container}>
      <Text className={styles.title} As="h2" color={EColor.greenDark} size={24}>
        {title}
      </Text>
      <div className={styles.presentation}>
        <div ref={refPresentation} className={styles.presentationChecked}></div>
      </div>
      <ButtonBack
        addressLink={
          location === `/menu/account/business/myQuestionnaires/${typeService}/${id}/changeInfo`
            ? `/menu/account/business/myQuestionnaires/service/${id}`
            : `/menu/account/business/myQuestionnaires/${typeService}/${id}/changeInfo`
        }
        className={styles.btn}
      />
      <Switch>
        <Route path={'/menu/account/business/myQuestionnaires/service/:id/changeInfo/components'}>
          <ServicesInfoComponents
            handleClickSubmith={() => {}}
            handleOpenModal={() => {
              setOpenModal(true)
            }}
            changeElementService={changeElementService}
            servicesList={services}
          />
        </Route>
        <Route path={'/menu/account/business/myQuestionnaires/service/:id/changeInfo'}>
          <ServicesInfoPageBasic handleSubmit={handleSubmit} />
        </Route>
      </Switch>
      {isOpenModal && (
        <ModalComponentServices
          idContainer={'create-services-container'}
          inputNameValue={valueName}
          changeInputNameValue={handleChangeInputName}
          inputPriceValue={valuePrice}
          changeInputPriceValue={handleChangeInputPrice}
          inputCommentValue={valueComment}
          changeInputCommentValue={handleChangeInputComment}
          handleClickCancel={() => {
            setOpenModal(false), setIdChangeElement(''), setValueName(''), setValuePrice(''), setValueComment('')
          }}
          handleClickSave={handleAddService}
          validationText={valueValidation}
          unvalidationName={isValidationName}
          unvalidationPrice={isValidationPrice}
        />
      )}
    </div>
  )
}
