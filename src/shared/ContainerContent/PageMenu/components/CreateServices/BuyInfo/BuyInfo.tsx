import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, useHistory, useLocation } from 'react-router'
import { CreateBusinessmenUserAsync } from '../../../../../../store/businessman/create/action'
import { CreateBusinessmenState } from '../../../../../../store/businessman/create/reduser'
import { RootState } from '../../../../../../store/reducer'
import { ButtonBack } from '../../../../../universalComponent/ButtonBack'
import { IErrorPanel } from '../../../../../universalComponent/ErrorPanel'
import { Loading } from '../../../../../universalComponent/Loading'
import { EColor, Text} from '../../../../../universalComponent/Text'
import { InfoPageBasic } from '../../InfoPageBasic'
import { PageSelectProduct } from './components/PageSelectedProduct'
import { PageSettingScheduleBringing } from './components/PageSettingScheduleBringing'
import { PageSettingScheduleStore } from './components/PageSettingScheduleStore'
import styles from './buyinfo.css'

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

export function BuyInfo () {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation().pathname

  const refPresentation = useRef<HTMLDivElement>(null)

  const businessmen = useSelector<RootState, CreateBusinessmenState>((state) => state.businessman)

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
    if (location === '/menu/account/business/createServices/selection/buy') {
      if (refPresentation.current) {
        refPresentation.current.style.transform = 'translateX(0)'
      }
    } else if (location === '/menu/account/business/createServices/selection/buy/selectionType') {
    } else {
      if (refPresentation.current) {
        refPresentation.current.style.transform = 'translateX(122%)'
      }
    }
  }, [location])

  const handleSubmit = async (e: FormEvent) => {
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

    const newArrError = arrError.concat()
    setArrError(newArrError)

    if (arrError.find((elem) => !elem.valid)) return

    const formData = new FormData()

    const arrTags = valueTags.split(',').map((elem) => {
      return elem.trim()
    })
  
    for (let i = 0; i < arrTags.length; i++) {
      formData.append('tags', arrTags[i]);
    }

    formData.append('title', valueActivity.trim())
    formData.append('address', valueAddress)
    formData.append('description', valueDescription)
    formData.append('questionnaire_type', 'Product')
    formData.append('rule_payment', 'Prepayment 10%')
    
    const resp = await dispatch(CreateBusinessmenUserAsync(formData))

    if(!!resp) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      history.push(`/menu/account/business/myQuestionnaires/product/${resp?.id}`)
    }

  }

  return (
    <div className={styles.container}>
      {location === '/menu/account/business/createServices/selection/buy' && (
        <div className={styles.presentation}>
          <div ref={refPresentation} className={styles.presentationChecked}></div>
        </div>
      )}
      <Switch>
        <Route path={'/menu/account/business/createServices/selection/buy/store'}>
          <PageSettingScheduleStore
            listValueCheckboxLocation={listValueLocation}
            changeValueCheckboxLocation={changeValueLocation}
            selectedValueTransportUnit=""
            selectedValueTransportCapacity={3}
            addressLinkBack="/menu/account/business/createServices/selection/buy/selectionType"
          />
        </Route>
        <Route path={'/menu/account/business/createServices/selection/buy/bringing'}>
          <PageSettingScheduleBringing
            listValueCheckboxLocation={listValueLocation}
            changeValueCheckboxLocation={changeValueLocation}
            selectedValueTransportUnit=""
            selectedValueTransportCapacity={3}
            addressLinkBack="/menu/account/business/createServices/selection/buy/selectionType"
          />
        </Route>
        <Route path={'/menu/account/business/createServices/selection/buy/selectionType'}>
          <PageSelectProduct />
        </Route>
        <Route path={'/menu/account/business/createServices/selection/buy'}>
          <Text 
            className={styles.title} 
            As="h2" 
            color={EColor.greenDark} 
            size={24}
          >
             Заполните информацию о себе
          </Text>
          <ButtonBack
            addressLink="/menu/account/business/createServices/selection"
            className={styles.btn}
          />
          <InfoPageBasic 
            type='Product'
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
          />
        </Route>
      </Switch>
      <Loading loading={businessmen.loading}/>
    </div>
  )
}
