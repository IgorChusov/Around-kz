import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, useHistory, useLocation, useParams } from 'react-router'
import { ChangeAdsUserAsync, CreateAdsUserAsync, DeleteAdsUserAsync } from '../../../store/ads/action'
import { RootState } from '../../../store/reducer'
import { generateIdFront, generateRandomString } from '../../../utils/js/generateRandomIndex'

import { IReturnServiceBasicInfoForm, ServiceBasicInfoForm } from '../../components/Forms/ServiceBasicInfoForm'
import { ModalComponentServices } from '../../ModalComponentServices'
import { ButtonBack } from '../../components/Buttons/ButtonBack'
import { ErrorPanel, IErrorPanel } from '../../components/ErrorPanel'
import { Loading } from '../../components/Loading'
import { EColor, Text } from '../../components/Text'
import { ServiceSettingSchedulePage } from '../ServiceSettingSchedulePage'
import styles from './changeinfoservicepage.css'
import { TBusinessmenState } from '../../../store/businessman/reducer'
import { ChangeBusinessmenUserAsync } from '../../../store/businessman/action'
import { ServicesInfoComponents } from './components/ServicesInfoComponents'
import { CountdownHandle } from '../../components/Forms/types'
import { ButtonNextPage } from '../../components/Buttons/ButtonNextPage'

export interface IListComponentsServices {
  id?: number
  title: string
  price: string
  description: string
  idFront: string
}

export function AccountChangeServiceInfoPage () {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation().pathname
  const formRef = useRef<null | CountdownHandle>(null)
  const refPresentation = useRef<HTMLDivElement>(null)
  const { id } = useParams<{ id?: string; type?: string; typeService?: string }>()
  const { myBusinessmen } = useSelector<RootState, TBusinessmenState>((state) => state.businessmen)

  const [title, setTitle] = useState('Заполните информацию о себе')
  const [isOpenModal, setOpenModal] = useState(false)
  const [idChangeElement, setIdChangeElement] = useState('')

  // массив с списком услуг и цен
  const [services, setServices] = useState<IListComponentsServices []>([])
  
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

      await dispatch(CreateAdsUserAsync(valueName, valueComment, valuePrice, String(myBusinessmen.data.id) ))
      
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

  async function handleSubmit (data: IReturnServiceBasicInfoForm) {

    const formData = new FormData();

    const arrTags = data.tags.split(',').map((elem) => {
      return elem.trim()
    })
  
    for (let i = 0; i < arrTags.length; i++) {
      formData.append('tags', arrTags[i]);
    }

    formData.append('title', data.title.trim())
    formData.append('address', data.address.trim())
    formData.append('description', data.description.trim())
    formData.append('questionnaire_type', 'Service')

    for (let i = 0; i < 5; i++) {
      if(data.images_service[i]) {
        // @ts-ignore
        formData.append('images_service', data.images_service[i]);
      } else if (myBusinessmen.data?.images_service[i]) {
        formData.append('images_service', myBusinessmen.data?.images_service[i]);
      } 
    }

    const resp = await dispatch(ChangeBusinessmenUserAsync(formData))

    if(!!resp) {
      history.push(`/account/myQuestionnaires/service/${id}`)
    }
  }

  useEffect(() => {
    if (!refPresentation.current) return
    if (location === '/account/createServices/selection/service') {
      refPresentation.current.style.transform = 'translateX(0%)'
    } else {
      refPresentation.current.style.transform = 'translateX(121%)'
    }
  }, [location])
  
  useEffect(() => {
    setServices(myBusinessmen.data.service.map(generateIdFront))
  },[])


  const handleSubmitComponents = async  () => {
    const formData = new FormData()

    for (let i = 0; i < myBusinessmen.data.tags.length; i++) {
      formData.append('tags', myBusinessmen.data.tags[i]);
    }

    for (let i = 0; i < services.length; i++) {
      formData.append('service', JSON.stringify(services[i]));
    }

    dispatch(ChangeBusinessmenUserAsync(formData))

    history.push('/account/myQuestionnaires')
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

  const handleClickSubmit = () => {
    if(formRef.current) {
      formRef.current.handleSubmitForm()
    }
  }
  
  useEffect(()=> {
    if(myBusinessmen.data.id === -1) {
      history.push('/account/myQuestionnaires/')
    }
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
        addressLink={`/account/myQuestionnaires/service/${id}`}
        className={styles.btn}
      />
      <Switch>
        <Route path={'/account/myQuestionnaires/service/:id/changeInfo/components'}>
          <ServicesInfoComponents
            handleClickSubmith={handleSubmitComponents}
            handleOpenModal={() => {
              setOpenModal(true)
            }}
            changeElementService={changeElementService}
            servicesList={services}
          />
        </Route>
        <Route path={'/account/myQuestionnaires/service/:id/changeInfo'}>
          <ServiceBasicInfoForm 
            type='Service'
            ref={formRef}
            onSubmit={handleSubmit}
          />
          <ButtonNextPage classNameButton={styles.button} text='Далее' onClick={handleClickSubmit}/>
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
