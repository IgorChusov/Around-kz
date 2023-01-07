import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch, useHistory, useLocation } from 'react-router'
import { PageSelectProduct } from '../AccountChangeProductInfoPage/components/PageSelectedProduct'
import { IReturnServiceBasicInfoForm, ServiceBasicInfoForm } from '../../components/Forms/ServiceBasicInfoForm'
import { ButtonBack } from '../../components/Buttons/ButtonBack'
import { IErrorPanel } from '../../components/ErrorPanel'
import { Loading } from '../../components/Loading'
import { EColor, Text } from '../../components/Text'
import styles from './buyinfopage.css'
import { CreateBusinessmenUserAsync } from '../../../store/businessman/action'
import { PageSettingScheduleStore } from '../AccountChangeProductInfoPage/components/PageSettingScheduleStore'
import { PageSettingScheduleBringing } from '../AccountChangeProductInfoPage/components/PageSettingScheduleBringing'
import { CountdownHandle } from '../../components/Forms/types'
import { ButtonNextPage } from '../../components/Buttons/ButtonNextPage'

const listValueLocationDefault = [
  {
    value: 'me',
    textLabel: 'У себя',
    checked: false,
  },
  {
    value: 'client',
    textLabel: 'С выездом',
    checked: false,
  },
]

const dateErrorBasic = [
  { name: 'activity', text: '', valid: true },
  { name: 'address', text: '', valid: true },
  { name: 'description', text: '', valid: true},
  { name: 'tags', text: '', valid: true},
  { name: 'photo', text: '', valid: true},
]

export function AccountProductInfoPage () {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation().pathname
  const refPresentation = useRef<HTMLDivElement>(null)
  const formRef = useRef<null | CountdownHandle>(null)

  // const businessmen = useSelector<RootState, CreateBusinessmenState>((state) => state.businessman)

  // состояния чекбоксов выбора места предоставления услуг
  const [listValueLocation, setListValueLocation] = useState(listValueLocationDefault)

  function changeValueLocation (position: number) {
    const newListValue = listValueLocation.map((elem, index) =>
      position === index ? { value: elem.value, textLabel: elem.textLabel, checked: !elem.checked } : elem,
    )
    setListValueLocation(newListValue)
  }

  const [arrError, setArrError] = useState<IErrorPanel[]>(dateErrorBasic)
  const [valueActivity, setValueActivity] = useState('')
  const [valueAddress, setValueAddress] = useState('')
  const [valueDescription, setValueDescription] = useState('')
  const [valueTags, setValueTags] = useState('')

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
    if (location === '/account/createServices/product') {
      if (refPresentation.current) {
        refPresentation.current.style.transform = 'translateX(0)'
      }
    } else if (location === '/account/createServices/product/selectionType') {
    } else {
      if (refPresentation.current) {
        refPresentation.current.style.transform = 'translateX(122%)'
      }
    }
  }, [location])

  const handleSubmit = async (data: IReturnServiceBasicInfoForm) => {
    const formData = new FormData()

    const arrTags = data.tags.split(',').map((elem) => {
      return elem.trim()
    })
  
    for (let i = 0; i < arrTags.length; i++) {
      formData.append('tags', arrTags[i]);
    }

    formData.append('title', data.title.trim())
    formData.append('address', data.address.trim())
    formData.append('description', data.description.trim())
    formData.append('questionnaire_type', 'Product')
    formData.append('rule_payment', 'Prepayment 10%')
    
    const resp = await dispatch(CreateBusinessmenUserAsync(formData))

    if(!!resp) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      history.push(`/account/myQuestionnaires/product/${resp?.id}`)
    }
  }

  const handleClickSubmit = () => {
    if(formRef.current) {
      formRef.current.handleSubmitForm()
    }
  }

  return (
    <div className={styles.container}>
      {location === '/account/createServices/product' && (
        <div className={styles.presentation}>
          <div ref={refPresentation} className={styles.presentationChecked}></div>
        </div>
      )}
      <Switch>
        <Route path={'/account/createServices/product/store'}>
          <PageSettingScheduleStore
            listValueCheckboxLocation={listValueLocation}
            changeValueCheckboxLocation={changeValueLocation}
            selectedValueTransportUnit=""
            selectedValueTransportCapacity={3}
            addressLinkBack="/account/createServices/product/selectionType"
          />
        </Route>
        <Route path={'/account/createServices/product/bringing'}>
          <PageSettingScheduleBringing
            listValueCheckboxLocation={listValueLocation}
            changeValueCheckboxLocation={changeValueLocation}
            selectedValueTransportUnit=""
            selectedValueTransportCapacity={3}
            addressLinkBack="/account/createServices/product/selectionType"
          />
        </Route>
        <Route path={'/account/createServices/product/selectionType'}>
          <PageSelectProduct />
        </Route>
        <Route path={'/account/createServices/product'}>
          <ButtonBack
            addressLink="/account/createServices/selection"
            className={styles.btn}
          />
          <Text 
            className={styles.title} 
            As="h2" 
            color={EColor.greenDark} 
            size={24}
          >
             Заполните информацию о себе
          </Text>
          <ServiceBasicInfoForm 
            type='Product'
            onSubmit={handleSubmit}
            ref={formRef}
          />
          <ButtonNextPage classNameButton={styles.button} text='Далее' onClick={handleClickSubmit}/>
        </Route>
      </Switch>
      {/* <Loading loading={businessmen.loading}/> */}
    </div>
  )
}
