import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, useHistory, useLocation, useParams } from 'react-router'
import { ChangeBusinessmenUserAsync } from '../../../../../store/businessman/create/action'
import { CreateBusinessmenState } from '../../../../../store/businessman/create/reduser'
import { GetBusinessmenUserAsync } from '../../../../../store/businessman/get/action'
import { TGetBusinessmenState } from '../../../../../store/businessman/get/reduser'
import { RootState } from '../../../../../store/reducer'

import { generateRandomString } from '../../../../../utils/js/generateRandomIndex'
import { ModalComponentServices } from '../../../../ModalComponentServices'
import { ButtonBack } from '../../../../universalComponent/ButtonBack'
import { IErrorPanel } from '../../../../universalComponent/ErrorPanel'
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

const dateErrorBasic = [
  { name: 'activity', text: '', valid: true },
  { name: 'address', text: '', valid: true },
  { name: 'description', text: '', valid: true},
  { name: 'tags', text: '', valid: true},
  { name: 'photo', text: '', valid: true}
]

export function ChangeInfoService () {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation().pathname

  const refPresentation = useRef<HTMLDivElement>(null)

  const { id, type, typeService } = useParams<{ id?: string; type?: string; typeService?: string }>()
  const businessmen = useSelector<RootState, TGetBusinessmenState>((state) => state.businessmen)
 
  const [page, setPage] = useState(true)
  const [title, setTitle] = useState('Заполните информацию о себе')
  const [isOpenModal, setOpenModal] = useState(false)
  const [idChangeElement, setIdChangeElement] = useState('')
  const [arrError, setArrError] = useState<IErrorPanel[]>(dateErrorBasic)
  
  // массив с списком услуг и цен
  const [services, setServices] = useState<TListComponentsServices>([])
  
  // управляемые компоненты интутов
  const [valueName, setValueName] = useState('')
  const [valuePrice, setValuePrice] = useState('')
  const [valueComment, setValueComment] = useState('')
  const [valueValidation, setValueValidation] = useState('')
  const [isValidationName, setValidationName] = useState(false)
  const [isValidationPrice, setValidationPrice] = useState(false)

    // импуты базовой страницы
  const [valueActivity, setValueActivity] = useState(businessmen.data?.title || '')
  const [valueAddress, setValueAddress] = useState(businessmen.data?.address || '')
  const [valueDescription, setValueDescription] = useState(businessmen.data?.description || '')
  const [valueTags, setValueTags] = useState(businessmen.data?.tags.join() || '')

  const refFile1 = useRef<HTMLInputElement>(null)
  const refFile2 = useRef<HTMLInputElement>(null)
  const refFile3 = useRef<HTMLInputElement>(null)
  const refFile4 = useRef<HTMLInputElement>(null)
  const refFile5 = useRef<HTMLInputElement>(null)

  useEffect(()=> {
    if(!businessmen.data) {
      history.push(`/menu/account/business/myQuestionnaires/service/${id}`)
    }
  }, [businessmen.data])

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
console.log(businessmen.data)
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

  async function handleSubmit (e: FormEvent) {
    e.preventDefault()

    if(valueActivity.length === 0) {
      arrError[0].text='Заполните поле'
      arrError[0].valid= false
      const newArr = arrError.concat()
      setArrError(newArr)
    }

    if(valueAddress.length === 0) {
      arrError[1].text='Заполните поле'
      arrError[1].valid= false
      const newArr = arrError.concat()
      setArrError(newArr)
    }

    if(valueTags.length === 0) {
      arrError[2].text='Заполните поле'
      arrError[2].valid= false
      const newArr = arrError.concat()
      setArrError(newArr)
    }

    if(valueDescription.length === 0) {
      arrError[3].text='Заполните поле'
      arrError[3].valid= false
      const newArr = arrError.concat()
      setArrError(newArr)
    }

    const find = arrError.find((elem) => !elem.valid)
    if (find) return
    const arr = []
    if(refFile1?.current?.files?.[0]) {
      arr.push(refFile1.current?.files[0])
    }
    if(refFile2?.current?.files?.[0]) {
      arr.push(refFile2.current?.files[0])
    }
    if(refFile3?.current?.files?.[0]) {
      arr.push(refFile3.current?.files[0])
    }
    if(refFile4?.current?.files?.[0]) {
      arr.push(refFile4.current?.files[0])
    }
    if(refFile5?.current?.files?.[0]) {
      arr.push(refFile5.current?.files[0])
    }
    const formData = new FormData();

    const arrTags = valueTags.split(',').map((elem) => {
      return elem.trim()
    })
  
    for (let i = 0; i < arrTags.length; i++) {
      formData.append('tags', arrTags[i]);
    }

    
    formData.append('title', valueActivity.trim())
    formData.append('address', valueAddress)
    formData.append('description', valueDescription)
    for (let i = 0; i < arr.length; i++) {
      formData.append('images_service', arr[i]);
    }

    formData.append('questionnaire_type', 'Service')
    const resp = await dispatch(ChangeBusinessmenUserAsync(formData))
    if(!!resp) {
      history.push('/menu/account/business/createServices/selection/service/components')
    }
  }

  useEffect(() => {
    if (!refPresentation.current) return
    if (location === '/menu/account/business/createServices/selection/service') {
      refPresentation.current.style.transform = 'translateX(0%)'
    } else {
      refPresentation.current.style.transform = 'translateX(121%)'
    }
  }, [location])
  
  const changeValueActivity = (e: ChangeEvent<HTMLInputElement>) => {
    arrError[0].text=''
    arrError[0].valid=true
    setValueActivity(e.target.value)
  }

  const changeValueAddress = (e: ChangeEvent<HTMLInputElement>) => {
    arrError[1].text=''
    arrError[1].valid=true
    setValueAddress(e.target.value)
  }

  const changeValueTags = (e: ChangeEvent<HTMLInputElement>) => {
    arrError[2].text=''
    arrError[2].valid=true
    setValueTags(e.target.value)
  }

  const changeValueDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    arrError[3].text=''
    arrError[3].valid=true
    setValueDescription(e.target.value)
  }

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
          <ServicesInfoPageBasic 
            handleSubmit={handleSubmit}
            valueActivity={valueActivity}
            setValueActivity={(e) => changeValueActivity(e)}
            valueAddress={valueAddress}
            setValueAddress={(e) => changeValueAddress(e)}
            valueTags={valueTags}
            setValueTags={(e) => changeValueTags(e)}
            valueDescription={valueDescription}
            setValueDescription={(e) => changeValueDescription(e)}
            arrError={arrError}
            refFile1={refFile1}
            refFile2={refFile2}
            refFile3={refFile3}
            refFile4={refFile4}
            refFile5={refFile5}
            defaultPhoto1={businessmen.data?.images_service[0]?.file}
            defaultPhoto2={businessmen.data?.images_service[1]?.file}
            defaultPhoto3={businessmen.data?.images_service[2]?.file}
            defaultPhoto4={businessmen.data?.images_service[3]?.file}
            defaultPhoto5={businessmen.data?.images_service[4]?.file}
          />
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
