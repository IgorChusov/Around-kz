import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styles from './serviceinfopage.css'
import { RootState } from '../../../store/reducer'
import { ErrorPanel, IErrorPanel } from '../../components/ErrorPanel'
import { generateRandomString } from '../../../utils/js/generateRandomIndex'
import { EColor, Text } from '../../components/Text'
import { ButtonBack } from '../../components/Buttons/ButtonBack'

import { IReturnServiceBasicInfoForm, ServiceBasicInfoForm } from '../../components/Forms/ServiceBasicInfoForm'
import { ModalComponentServices } from '../../ModalComponentServices'
import { Loading } from '../../components/Loading'
import { TBusinessmenState } from '../../../store/businessman/reducer'
import { CreateBusinessmenUserAsync } from '../../../store/businessman/action'
import { ServicesInfoComponents } from '../AccountChangeServiceInfoPage/components/ServicesInfoComponents'
import { CountdownHandle } from '../../components/Forms/types'
import { ButtonNextPage } from '../../components/Buttons/ButtonNextPage'

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


export function AccountServiceInfoPage () {
  const businessmen = useSelector<RootState, TBusinessmenState>((state) => state.businessmen)
  const refPresentation = useRef<HTMLDivElement>(null)
  const history = useHistory()
  const location = useLocation().pathname
  const dispatch = useDispatch()
  const formRef = useRef<null | CountdownHandle>(null)
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

  const[arrFormData, setArrFormData] = useState<IReturnServiceBasicInfoForm | null>(null)

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

  async function handleSubmit (data: IReturnServiceBasicInfoForm) {
    setArrFormData(data)
    history.push('/account/createServices/service/components')
  }

  const handleSave = async () => {
    if(!arrFormData) {
      history.push('/account/createServices/service')
      return
    }

    const formData = new FormData();

    const arrTags = arrFormData.tags.split(',').map((elem) => {
      return elem.trim()
    })
  
    for (let i = 0; i < arrTags.length; i++) {
      formData.append('tags', arrTags[i]);
    }

    formData.append('title', arrFormData.title.trim())
    formData.append('address', arrFormData.address.trim())
    formData.append('description', arrFormData.description.trim())
    formData.append('questionnaire_type', 'Service')
    formData.append('rule_payment', 'Prepayment 10%')

    for (let i = 0; i <= 4; i++) {
      if(arrFormData.images_service[i]) {
        formData.append('images_service', arrFormData.images_service[i]);
      }
    }
    
    for (let i = 0; i < services.length; i++) {
      formData.append('service', JSON.stringify(services[i]));
    }

    const resp = await dispatch(CreateBusinessmenUserAsync(formData))

    if(!!!resp) { 
      history.push('/account/createServices/selection/service')
      return
    }
  
    history.push('/account/myQuestionnaires')
  } 

  const handleClickSubmit = () => {
    if(formRef.current) {
      formRef.current.handleSubmitForm()
    }
  }

  useEffect(() => {
    const errs = []
    if(businessmen.myBusinessmen.error.length > 0) {
      errs.push({ name: 'server', text: businessmen.myBusinessmen.error, valid: false})
    }
    if(!arrError[4].valid) {
      errs.push({ name: 'phone', text: arrError[4].text, valid: false})
    }
    setServerErrors(errs)
  }, 
  [businessmen.myBusinessmen.error, arrError[4].valid])

  useEffect(() => {
    if (!refPresentation.current) return
    if (location === '/account/createServices/service') {
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
          location === '/account/createServices/service'
            ? '/account/createServices/selection'
            : '/account/createServices/service'
        }
        className={styles.btn}
      />
      <Switch>
        <Route path={'/account/createServices/service/components'}>
          <ServicesInfoComponents
            handleClickSubmith={handleSave}
            handleOpenModal={() => {
              setOpenModal(true)
            }}
            changeElementService={changeElementService}
            servicesList={services}
          />
        </Route>
        <Route path={'/account/createServices/service'}>
          <ServiceBasicInfoForm 
            type='Service'
            ref={formRef}
            onSubmit={handleSubmit}
            saveState={arrFormData || undefined}
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
          onDelete={() => {}}
        />
      )}
      <Loading loading={businessmen.myBusinessmen.loading} />
      {serverErrors.length > 0 && 
        <ErrorPanel list={serverErrors} />
      }
    </div>
  )
}
