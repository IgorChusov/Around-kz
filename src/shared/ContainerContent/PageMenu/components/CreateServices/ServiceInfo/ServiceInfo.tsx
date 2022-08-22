import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import { generateRandomString } from '../../../../../../utils/js/generateRandomIndex'
import { ModalComponentServices } from '../../../../../ModalComponentServices'
import { EColor, Text } from '../../../../../universalComponent/Text'
import { ButtonBack } from '../../../../../universalComponent/ButtonBack'
import styles from './serviceinfo.css'
import { InfoPageBasic } from '../../InfoPageBasic'
import { ServicesInfoComponents } from './ServicesInfoComponents'
import { useDispatch, useSelector } from 'react-redux'
import { CreateAddInfoBusinessmenUserAsync, CreateBusinessmenUserAsync } from '../../../../../../store/businessman/create/action'
import { Loading } from '../../../../../universalComponent/Loading'
import { ErrorPanel, IErrorPanel } from '../../../../../universalComponent/ErrorPanel'
import { RootState } from '../../../../../../store/reducer'
import { CreateBusinessmenState } from '../../../../../../store/businessman/create/reduser'
import { CreateAdsUserAsync } from '../../../../../../store/ads/action'

export interface IListComponentsService {
  idFront: string
  id?: number
  title: string
  price: string
  description: string
}

const dateErrorBasic = [
  { name: 'activity', text: '', valid: true },
  { name: 'address', text: '', valid: true },
  { name: 'description', text: '', valid: true},
  { name: 'tags', text: '', valid: true},
  { name: 'photo', text: '', valid: true},
]


export function ServiceInfo () {
  const businessmen = useSelector<RootState, CreateBusinessmenState>((state) => state.businessman)
  const refPresentation = useRef<HTMLDivElement>(null)
  const history = useHistory()
  const location = useLocation().pathname
  const dispatch = useDispatch()

  const [title, setTitle] = useState('Заполните информацию о себе')
  const [isOpenModal, setOpenModal] = useState(false)
  const [idChangeElement, setIdChangeElement] = useState('')

  // массив с списком услуг и цен
  const [services, setServices] = useState<IListComponentsService []>([])
  const [arrError, setArrError] = useState<IErrorPanel[]>(dateErrorBasic)
  const [serverErrors, setServerErrors] = useState<IErrorPanel []>([])

  // управляемые компоненты интутов
  const [valueName, setValueName] = useState('')
  const [valuePrice, setValuePrice] = useState('')
  const [valueComment, setValueComment] = useState('')
  const [valueValidation, setValueValidation] = useState('')
  const [isValidationName, setValidationName] = useState(false)
  const [isValidationPrice, setValidationPrice] = useState(false)

  // импуты базовой страницы
  const [valueActivity, setValueActivity] = useState('')
  const [valueAddress, setValueAddress] = useState('')
  const [valueDescription, setValueDescription] = useState('')
  const [valueTags, setValueTags] = useState('')

  const refFile1 = useRef<HTMLInputElement>(null)
  const refFile2 = useRef<HTMLInputElement>(null)
  const refFile3 = useRef<HTMLInputElement>(null)
  const refFile4 = useRef<HTMLInputElement>(null)
  const refFile5 = useRef<HTMLInputElement>(null)
  const[arrImg, setArrImg] = useState<File[]>([])

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
  function changeElementService (element: IListComponentsService, idElement: string) {
    setOpenModal(true)
    setValueName(element.title)
    setValuePrice(`${element.price}`)
    setValueComment(element.description)
    setIdChangeElement(idElement)
  }

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
        if (elem.idFront === idChangeElement) {
          elem.title = valueName
          elem.price = valuePrice
          elem.description = valueComment
        }
      })
      setServices(services)
    } else {
      setServices([
        ...services,
        {
          idFront: generateRandomString(),
          title: valueName,
          price: valuePrice,
          description: valueComment,
        },
      ])
    }

    setOpenModal(false)
    setIdChangeElement('')
    setValueName('')
    setValuePrice('')
    setValueComment('')
  }

  useEffect(() => {
    if (!refPresentation.current) return
    if (location === '/menu/account/business/createServices/selection/service') {
      refPresentation.current.style.transform = 'translateX(0%)'
    } else {
      refPresentation.current.style.transform = 'translateX(121%)'
    }
  }, [location])

  async function handleSubmit (e: FormEvent) {
    e.preventDefault()

    const newArr = arrError.concat().map((elem) => {
      elem.valid = true
      return elem
    })
    setArrError(newArr)

    if(valueActivity.length === 0) {
      arrError[0].text='Заполните поле'
      arrError[0].valid= false
    }

    if(valueAddress.length < 12) {
      arrError[1].text='Минимум 12 символов'
      arrError[1].valid= false
    }

    if(valueTags.length === 0) {
      arrError[2].text='Заполните поле'
      arrError[2].valid= false
    }

    if(valueDescription.length === 0) {
      arrError[3].text='Заполните поле'
      arrError[3].valid= false
    }

    if(
      refFile1?.current?.files?.length === 0 &&
      refFile2?.current?.files?.length === 0 &&
      refFile3?.current?.files?.length === 0 &&
      refFile4?.current?.files?.length === 0 &&
      refFile5?.current?.files?.length === 0
      ) {
      arrError[4].text='Пожалуйста, добавьте минимум одно фото'
      arrError[4].valid= false
    }

    const newArrError = arrError.concat()
    setArrError(newArrError)

    if (arrError.find((elem) => !elem.valid)) return

    const arrImgFunc: File [] = []

    if(refFile1?.current?.files?.[0]) {
      arrImgFunc.push(refFile1.current?.files[0])
    }
    if(refFile2?.current?.files?.[0]) {
      arrImgFunc.push(refFile2.current?.files[0])
    }
    if(refFile3?.current?.files?.[0]) {
      arrImgFunc.push(refFile3.current?.files[0])
    }
    if(refFile4?.current?.files?.[0]) {
      arrImgFunc.push(refFile4.current?.files[0])
    }
    if(refFile5?.current?.files?.[0]) {
      arrImgFunc.push(refFile5.current?.files[0])
    }

    setArrImg(arrImgFunc)

    history.push('/menu/account/business/createServices/selection/service/components')
  }

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

  useEffect(() => {
    const errs = []
    if(businessmen.error.length > 0) {
      errs.push({ name: 'server', text: businessmen.error, valid: false})
    }
    if(!arrError[4].valid) {
      errs.push({ name: 'phone', text: arrError[4].text, valid: false})
    }
    setServerErrors(errs)
  }, 
  [businessmen.error, arrError[4].valid])

  const handleSave = async () => {
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

    for (let i = 0; i <= 4; i++) {
      if(arrImg[i]) {
        formData.append('images_service', arrImg[i]);
      } else if (businessmen.data?.images_service[i]) {
        formData.append('images_service', businessmen.data?.images_service[i]);
      }
    }
    
    formData.append('questionnaire_type', 'Service')
    formData.append('rule_payment', 'Prepayment 10%')
    for (let i = 0; i < services.length; i++) {
        formData.append('service', JSON.stringify(services[i]));
    
    }

    const resp = await dispatch(CreateBusinessmenUserAsync(formData))

    if(!!!resp) { 
      history.push('/menu/account/business/createServices/selection/service')
      return
    }

      // formData.append('service', JSON.stringify(services))

      // await Promise.all(services.map((elem) => {
      //   return dispatch(CreateAdsUserAsync(
      //     elem.title,
      //     elem.description,
      //     String(elem.price),
      //     // @ts-ignore
      //     resp.id
      //   ))
      // }))
      
      history.push('/menu/account/business/myQuestionnaires')
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
          location === '/menu/account/business/createServices/selection/service'
            ? '/menu/account/business/createServices/selection'
            : '/menu/account/business/createServices/selection/service'
        }
        className={styles.btn}
      />
      <Switch>
        <Route path={'/menu/account/business/createServices/selection/service/components'}>
          <ServicesInfoComponents
            handleClickSubmith={handleSave}
            handleOpenModal={() => {
              setOpenModal(true)
            }}
            changeElementService={changeElementService}
            servicesList={services}
          />
        </Route>
        <Route path={'/menu/account/business/createServices/selection/service'}>
          <InfoPageBasic 
            type='Service'
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
          onDelete={() => {}}
        />
      )}
      <Loading loading={businessmen.loading} />
      {serverErrors.length > 0 && 
        <ErrorPanel list={serverErrors} />
      }
    </div>
  )
}
