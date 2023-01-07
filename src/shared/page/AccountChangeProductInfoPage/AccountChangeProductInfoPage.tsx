import React, { ChangeEvent, FormEvent, ForwardedRef, RefObject, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, useHistory, useLocation, useParams } from 'react-router'
import { RootState } from '../../../store/reducer'
import { InformationBuyPage } from './components/InformationBuyPage'
import { ListProducts } from './components/ListProducts'
import { IReturnServiceBasicInfoForm, ServiceBasicInfoForm } from '../../components/Forms/ServiceBasicInfoForm'
import { ButtonBack } from '../../components/Buttons/ButtonBack'
import { IErrorPanel } from '../../components/ErrorPanel'
import { Loading } from '../../components/Loading'
import { EColor, Text } from '../../components/Text'
import { ChangeBusinessmenUserAsync } from '../../../store/businessman/action'
import { TBusinessmenState } from '../../../store/businessman/reducer'
import { CountdownHandle } from '../../components/Forms/types'
import { ButtonNextPage } from '../../components/Buttons/ButtonNextPage'
import styles from './changeinfoproductpage.css'

const dateErrorBasic = [
  { name: 'activity', text: '', valid: true },
  { name: 'address', text: '', valid: true },
  { name: 'description', text: '', valid: true},
  { name: 'tags', text: '', valid: true},
  { name: 'photo', text: '', valid: true},
]

export function AccountChangeProductInfoPage () {
  const dispatch = useDispatch()
  const { id, type } = useParams<{ id?: string; type?: string;}>()
  const refPresentation = useRef<HTMLDivElement>(null)
  const location = useLocation().pathname
  const history = useHistory()
  const formRef = useRef<CountdownHandle | null>(null)
  
  const { myBusinessmen } = useSelector<RootState, TBusinessmenState>((state) => state.businessmen)
  // const businessman = useSelector<RootState, any>((state) => state.businessmen)
  
  const [title, setTitle] = useState('Заполните информацию о себе')
  const [arrError, setArrError] = useState<IErrorPanel[]>(dateErrorBasic)



  const [valueActivity, setValueActivity] = useState(myBusinessmen.data?.title || '')
  const [valueAddress, setValueAddress] = useState(myBusinessmen.data?.address || '')
  const [valueDescription, setValueDescription] = useState(myBusinessmen.data?.description || '')
  const [valueTags, setValueTags] = useState(myBusinessmen.data?.tags.join() || '')

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
  // функции измененй состояний полей на второй странице
  function handleSubmitForm (e: FormEvent) {
    e.preventDefault()
    console.log('отправлено')
  }

  const handleSubmit = async (data: IReturnServiceBasicInfoForm) => {

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

    const arrTags = valueTags.split(',').map((elem: any) => {
      return elem.trim()
    })
  
    for (let i = 0; i < arrTags.length; i++) {
      formData.append('tags', arrTags[i]);
    }

    formData.append('title', valueActivity.trim())
    formData.append('address', valueAddress)
    formData.append('description', valueDescription)
    formData.append('questionnaire_type', 'Product')
 
    const resp = await dispatch(ChangeBusinessmenUserAsync(formData))

    if(!!resp) {
      history.push(`/account/myQuestionnaires/product/${id}`)
    }
  }


  const handleClickSubmit = () => {
    if(formRef.current) {
      formRef.current.handleSubmitForm();
    }
  }

  useEffect(() => {
    if (location === `/account/myQuestionnaires/products/${type}/${id}/changeInfo`) {
      if (refPresentation.current) {
        refPresentation.current.style.transform = 'translateX(0)'
      }
    } else {
      if (refPresentation.current) {
        refPresentation.current.style.transform = 'translateX(122%)'
      }
    }
  }, [location])

  useEffect(()=> {
    if(myBusinessmen.data.id === 0) {
      history.push('/account/myQuestionnaires/')
    }
  }, [])

  return (
    <div className={styles.container}>
      {(location === `/account/myQuestionnaires/products/${type}/${id}/changeInfo` ||
        location === `/account/myQuestionnaires/products/${type}/${id}/changeInfo/components`) && (
        <div className={styles.presentation}>
          <div ref={refPresentation} className={styles.presentationChecked}></div>
        </div>
      )}
      <Switch>
        <Route path={'/account/myQuestionnaires/products/:id/changeInfo/components/:idProduct'}>
          <ButtonBack
            addressLink={`/account/myQuestionnaires/products/${id}/changeInfo/listProduct`}
            className={styles.btn}
          />
          <InformationBuyPage />
        </Route>
        <Route path={'/account/myQuestionnaires/products/:id/changeInfo/components'}>
          <ButtonBack
            addressLink={`/account/myQuestionnaires/products/${id}/changeInfo/listProduct`}
            className={styles.btn}
          />
          <InformationBuyPage />
        </Route>
        <Route path={'/account/myQuestionnaires/products/:id/changeInfo/listProduct'}>
          <ButtonBack
            addressLink={`/account/myQuestionnaires/products/${id}`}
            className={styles.btn}
          />
          <ListProducts />
        </Route>
        <Route path={'/account/myQuestionnaires/products/:id/changeInfo/'}>
          <ButtonBack
            addressLink={`/account/myQuestionnaires/products/${id}`}
            className={styles.btn}
          />
          <Text className={styles.title} As="h2" color={EColor.greenDark} size={24}>
             Заполните информацию о себе
          </Text>
          <ServiceBasicInfoForm 
            type='Product'
            ref={formRef}
            onSubmit={handleSubmit}
          />
          <ButtonNextPage 
            text='Далее'
            classNameButton=''
            onClick={handleClickSubmit}
          />
           {/* <button onClick={handleClickSubmit} className={styles.btnNextPage}>
            Далее
      </button> */}
        </Route>
      </Switch>
      <Loading loading={myBusinessmen.loading} />
    </div>
  )
}
