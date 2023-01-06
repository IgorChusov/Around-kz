import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, useHistory, useLocation, useParams } from 'react-router'
import { ChangeAdsUserAsync, CreateAdsUserAsync, DeleteAdsUserAsync } from '../../../store/ads/action'
import { RootState } from '../../../store/reducer'
import { generateIdFront, generateRandomString } from '../../../utils/js/generateRandomIndex'
import { ServicesInfoComponents } from '../../ContainerContent/PageMenu/components/CreateServices/ServiceInfo/ServicesInfoComponents'
import { InfoPageBasic } from '../../ContainerContent/PageMenu/components/InfoPageBasic'
import { ModalComponentServices } from '../../ModalComponentServices'
import { ButtonBack } from '../../components/Buttons/ButtonBack'
import { ErrorPanel, IErrorPanel } from '../../components/ErrorPanel'
import { Loading } from '../../components/Loading'
import { EColor, Text } from '../../components/Text'
import { ServiceSettingSchedulePage } from '../ServiceSettingSchedulePage'
import styles from './changeinfoservicepage.css'

export interface IListComponentsServices {
  id?: number
  title: string
  price: string
  description: string
  idFront: string
}

const dateErrorBasic = [
  { name: 'activity', text: '', valid: true },
  { name: 'address', text: '', valid: true },
  { name: 'description', text: '', valid: true},
  { name: 'tags', text: '', valid: true},
  { name: 'photo', text: '', valid: true}
]

export function ChangeInfoServicePage () {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation().pathname

  const refPresentation = useRef<HTMLDivElement>(null)

  const { id, type, typeService } = useParams<{ id?: string; type?: string; typeService?: string }>()
  // const businessmen = useSelector<RootState, TGetBusinessmenState>((state) => state.businessmen)
  // const businessman = useSelector<RootState, CreateBusinessmenState>((state) => state.businessman)

  const [page, setPage] = useState(true)
  const [title, setTitle] = useState('Заполните информацию о себе')
  const [isOpenModal, setOpenModal] = useState(false)
  const [idChangeElement, setIdChangeElement] = useState('')
  const [arrError, setArrError] = useState<IErrorPanel[]>(dateErrorBasic)
  
  // массив с списком услуг и цен
  const [services, setServices] = useState<IListComponentsServices []>([])
  
  // управляемые компоненты интутов
  const [valueName, setValueName] = useState('')
  const [valuePrice, setValuePrice] = useState('')
  const [valueComment, setValueComment] = useState('')
  const [valueValidation, setValueValidation] = useState('')
  const [isValidationName, setValidationName] = useState(false)
  const [isValidationPrice, setValidationPrice] = useState(false)

    // импуты базовой страницы
  // const [valueActivity, setValueActivity] = useState(businessmen.data?.title || '')
  // const [valueAddress, setValueAddress] = useState(businessmen.data?.address || '')
  // const [valueDescription, setValueDescription] = useState(businessmen.data?.description || '')
  // const [valueTags, setValueTags] = useState(businessmen.data?.tags.join() || '')

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
  function changeElementService (element: IListComponentsServices, idElement: string) {
    setOpenModal(true)
    setValueName(element.title)
    setValuePrice(`${element.price}`)
    setValueComment(element.description)
    setIdChangeElement(idElement)
  }

  async function handleAddService  (e: FormEvent<HTMLFormElement>) {
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

    if (idChangeElement.length > 0) {
      services.map(async (elem) => {
        if (elem.idFront === idChangeElement) {
          elem.title = valueName
          elem.price = valuePrice
          elem.description= valueComment
        }
        if(elem.idFront === idChangeElement && elem.id) {
          await dispatch(ChangeAdsUserAsync(valueName, valueComment, valuePrice, String(elem.id)))
        }
      })
      setServices(services)
     
    } else {
      // await dispatch(CreateAdsUserAsync(valueName, valueComment, valuePrice, String(businessmen.data.id) ))
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

  async function handleSubmit (e: FormEvent) {
    e.preventDefault()

    // if(valueActivity.length === 0) {
    //   arrError[0].text='Заполните поле'
    //   arrError[0].valid= false
    //   const newArr = arrError.concat()
    //   setArrError(newArr)
    // }

    // if(valueAddress.length === 0) {
    //   arrError[1].text='Заполните поле'
    //   arrError[1].valid= false
    //   const newArr = arrError.concat()
    //   setArrError(newArr)
    // }

    // if(valueTags.length === 0) {
    //   arrError[2].text='Заполните поле'
    //   arrError[2].valid= false
    //   const newArr = arrError.concat()
    //   setArrError(newArr)
    // }

    // if(valueDescription.length === 0) {
    //   arrError[3].text='Заполните поле'
    //   arrError[3].valid= false
    //   const newArr = arrError.concat()
    //   setArrError(newArr)
    // }

    const find = arrError.find((elem) => !elem.valid)
    if (find) return
    const arr = []
    if(refFile1?.current?.files?.[0]) {
      arr.push(refFile1.current?.files[0])
    } else {
      arr.push(undefined)
    }
    if(refFile2?.current?.files?.[0]) {
      arr.push(refFile2.current?.files[0])
    } else {
      arr.push(undefined)
    }
    if(refFile3?.current?.files?.[0]) {
      arr.push(refFile3.current?.files[0])
    } else {
      arr.push(undefined)
    }
    if(refFile4?.current?.files?.[0]) {
      arr.push(refFile4.current?.files[0])
    } else {
      arr.push(undefined)
    }
    if(refFile5?.current?.files?.[0]) {
      arr.push(refFile5.current?.files[0])
    } else {
      arr.push(undefined)
    }
    const formData = new FormData();

    // const arrTags = valueTags.split(',').map((elem) => {
    //   return elem.trim()
    // })
  
    // for (let i = 0; i < arrTags.length; i++) {
    //   formData.append('tags', arrTags[i]);
    // }

    // formData.append('title', valueActivity.trim())
    // formData.append('address', valueAddress)
    // formData.append('description', valueDescription)
    // for (let i = 0; i < arr.length; i++) {
    //   if(arr.length === 0) return
    //   formData.append('images_service', arr[i]);
    // }
    const arrI = []
    // for (let i = 0; i < 5; i++) {
    //   if(arr[i]) {
    //     console.log(arr)
    //     // @ts-ignore
    //     formData.append('images_service', arr[i]);
    //     arrI.push(JSON.stringify(arr[i]))
    //   } else if (businessmen.data?.images_service[i]) {
    //     formData.append('images_service', businessmen.data?.images_service[i]);
    //     arrI.push(businessmen.data?.images_service[i])
    //   } 
    // }

    // console.log(arrI)

    formData.append('questionnaire_type', 'Service')

    
    // const resp = await dispatch(ChangeBusinessmenUserAsync(formData))

    // if(!!resp) {
    //   history.push(`/menu/account/business/myQuestionnaires/service/${id}`)
    // }
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
    // setValueActivity(e.target.value)
  }

  const changeValueAddress = (e: ChangeEvent<HTMLInputElement>) => {
    arrError[1].text=''
    arrError[1].valid=true
    // setValueAddress(e.target.value)
  }

  const changeValueTags = (e: ChangeEvent<HTMLInputElement>) => {
    arrError[2].text=''
    arrError[2].valid=true
    // setValueTags(e.target.value)
  }

  const changeValueDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    arrError[3].text=''
    arrError[3].valid=true
    // setValueDescription(e.target.value)
  }

  useEffect(() => {
    // setServices(businessmen.data.service.map(generateIdFront))
  },[])


  const handleSubmitComponents = async  () => {
    const formData = new FormData()

    // for (let i = 0; i < businessmen.data.tags.length; i++) {
    //   formData.append('tags', businessmen.data.tags[i]);
    // }

    // for (let i = 0; i < services.length; i++) {
    //   formData.append('service', JSON.stringify(services[i]));
    // }

    // dispatch(ChangeBusinessmenUserAsync(formData))

    history.push('/menu/account/business/myQuestionnaires')
  }

  const handleDeleteComponent = () => {
    const el = services.find((elem) => elem.idFront === idChangeElement)

    if(!el || !el.id) return

    dispatch(DeleteAdsUserAsync(String(el.id)))
    setServices(services.filter((elem)=> elem.idFront !== el.idFront))
    setOpenModal(false)
    setIdChangeElement('')
    setValueName('')
    setValuePrice('')
    setValueComment('')
  }

  useEffect(()=> {
    // if(businessmen.data.id === 0) {
    //   history.push('/menu/account/business/myQuestionnaires/')
    // }
  }, [])

  return (
    <div className={styles.container}>
      <Text className={styles.title} As="h2" color={EColor.greenDark} size={24}>
        {title}
      </Text>
      <div className={styles.presentation}>
        <div ref={refPresentation} className={styles.presentationChecked}></div>
      </div>
      <ButtonBack
        addressLink={`/menu/account/business/myQuestionnaires/service/${id}`}
        className={styles.btn}
      />
      <Switch>
        <Route path={'/menu/account/business/myQuestionnaires/service/:id/changeInfo/components'}>
          <ServicesInfoComponents
            handleClickSubmith={handleSubmitComponents}
            handleOpenModal={() => {
              setOpenModal(true)
            }}
            changeElementService={changeElementService}
            servicesList={services}
          />
        </Route>
        <Route path={'/menu/account/business/myQuestionnaires/service/:id/changeInfo'}>
          {/* <InfoPageBasic 
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
            defaultPhoto1={businessmen.data?.images_service[0]}
            defaultPhoto2={businessmen.data?.images_service[1]}
            defaultPhoto3={businessmen.data?.images_service[2]}
            defaultPhoto4={businessmen.data?.images_service[3]}
            defaultPhoto5={businessmen.data?.images_service[4]}
          /> */}
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
          onDelete={handleDeleteComponent}
        />
      )}
      {/* <Loading loading={businessman.loading} />
      {businessman.error && 
        <ErrorPanel list={[{name: '', text: businessman.error, valid: false}]} />
      } */}
    </div>
  )
}
