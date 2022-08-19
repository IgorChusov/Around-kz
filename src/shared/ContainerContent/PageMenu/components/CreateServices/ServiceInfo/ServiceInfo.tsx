import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import { generateRandomString } from '../../../../../../utils/js/generateRandomIndex'
import { ModalComponentServices } from '../../../../../ModalComponentServices'
import { EColor, Text } from '../../../../../universalComponent/Text'
import { ButtonBack } from '../../../../../universalComponent/ButtonBack'
import styles from './serviceinfo.css'
import { ServicesInfoPageBasic } from './ServicesInfoPageBasic'
import { ServicesInfoComponents } from './ServicesInfoComponents'
import { useDispatch, useSelector } from 'react-redux'
import { CreateBusinessmenUserAsync } from '../../../../../../store/businessman/create/action'
import { Loading } from '../../../../../universalComponent/Loading'
import { ErrorPanel, IErrorPanel } from '../../../../../universalComponent/ErrorPanel'
import { RootState } from '../../../../../../store/reducer'
import { CreateBusinessmenState } from '../../../../../../store/businessman/create/reduser'

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
  const [services, setServices] = useState<TListComponentsServices>([])
  const [arrError, setArrError] = useState<IErrorPanel[]>(dateErrorBasic)
  
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
    const resp = await dispatch(CreateBusinessmenUserAsync(formData))
    if(!!resp) {
      history.push('/menu/account/business/createServices/selection/service/components')
    }
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
            handleClickSubmith={() => {}}
            handleOpenModal={() => {
              setOpenModal(true)
            }}
            changeElementService={changeElementService}
            servicesList={services}
          />
        </Route>
        <Route path={'/menu/account/business/createServices/selection/service'}>
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
      <Loading loading={businessmen.loading} />
      {businessmen.error && 
        <ErrorPanel list={[{name: '', text: businessmen.error, valid: false}]} />
      }
    </div>
  )
}
