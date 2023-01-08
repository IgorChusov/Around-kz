import React, { ChangeEvent, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import cn from 'classnames'
import { useForm, Controller} from 'react-hook-form';
import { Input } from '../../Inputs/Input';
import { UniversalSelect } from '../../Inputs/UniversalSelect';
import { CountdownHandle } from '../types';
import { EColor, Text } from '../../Text';
import styles from './detalproductform.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/reducer';
import { TBusinessmenState } from '../../../../store/businessman/reducer';
import { useParams } from 'react-router';
import { TMarketState } from '../../../../store/market/reduser';

const listOptionsUnitDefault = [
  { value: 'piece', label: 'шт' },
  { value: 'gram', label: `г` },
  { value: 'kilogram', label: 'кг' },
  { value: 'centimeter', label: 'см' },
  { value: 'meter', label: 'м' },
  { value: 'square meter', label: `м2` },
  { value: 'cubic meter', label: `м3` },
]

interface IProps {
  onSubmit: (data:IReturnDetailedProductForm) => void
}

export interface IReturnDetailedProductForm {
  title: string,
  price: string,
  description: string,
  available_quantity: string,
  min_quantity: string,
  image: File | string,
  unit: string
}

export const DetailedProductForm = forwardRef<CountdownHandle, IProps>(({ onSubmit }, ref) => {

  const { id, idProduct } = useParams<{ id?: string; idProduct?: string}>()
  const { myBusinessmen } = useSelector<RootState, TBusinessmenState>((state) => state.businessmen)
  const market = useSelector<RootState, TMarketState>((state) => state.market)

  const { control, handleSubmit, formState, watch, setValue, reset } = useForm<IReturnDetailedProductForm>({defaultValues: {
    title: '',
    price: '',
    description: '',
    available_quantity: '',
    min_quantity: '',
    image: '',
    unit: ''
  }});

  const [selected, setSelected] = useState(listOptionsUnitDefault[0])
  const imageWatch = watch('image')

  const changeSelect = (e: { value: string; label: string }) => {
    setSelected(e)
  }

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    if(e.target.files) {
      setValue('image', e.target?.files[0])
    }
  }

  const handleChangeAvailableQuantity = (e:ChangeEvent<HTMLInputElement>) => {
    if(/^\d+$/.test(e.target.value) || /^\s*$/.test(e.target.value)) {
      setValue('available_quantity', e.target.value)
    }
  }

  const handleChangeMinQuantity = (e:ChangeEvent<HTMLInputElement>) => {
    if(/^\d+$/.test(e.target.value) || /^\s*$/.test(e.target.value)) {
      setValue('min_quantity', e.target.value)
    }
  }

  const handleChangePrice = (e:ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if(/^\d+$/.test(value) || /^\s*$/.test(value)) {
      setValue('price', value)
    }
  }

  useEffect(() => {
    setValue('unit', selected.value)
  }, [selected])

  useEffect(() => {
    if(idProduct && String(market.data.id) === idProduct) {
      reset({
        title: market.data.title,
        price: market.data.price,
        description: market.data.description,
        available_quantity: String(market.data.available_quantity),
        min_quantity: String(market.data.min_quantity),
        unit: market.data.unit
      })
      const unit = listOptionsUnitDefault.find((elem) => elem.value === market.data.unit)
      if(unit) {
        setSelected(unit)
      }
    }
   
  }, [idProduct, market.data.id])

  useImperativeHandle(ref, () => ({
    handleSubmitForm: () => {
        handleSubmit(data => {
            onSubmit(data)
        })()
    }
  }))

  return (
    <form onSubmit={e => e.preventDefault()} className={styles.form}>
    <div className={styles.inputGroup}>
      <div className={styles.inputContainer}>
        <Controller
          name="title"
          control={control}
          rules={{
              required: true,
              maxLength: 50,
              minLength: 3
          }}
          render={({field}) => (
            <Input
              id="input-name"
              value={field.value}
              onChange={field.onChange} 
              labelText='Название товара'
              error={!!formState.errors.title && 'Заполните поле'}
          />
          )} 
        />
      </div>
      <div className={styles.inputChangeContainer}>
      <Controller
          name="price"
          control={control}
          rules={{
              required: true,
          }}
          render={({field}) => (
            <Input
              id="input-price" 
              value={field.value}
              onChange={handleChangePrice} 
              labelText='Стоимость'
              error={!!formState.errors.price && 'Заполните поле'}
              classNameContainer={styles.inputPriceContainer}
              classNameInput={styles.inputPrice}
          />
          )} 
        />
        <UniversalSelect
          listOptions={listOptionsUnitDefault}
          onChangeOption={changeSelect}
          selectedValue={selected}
          className=''
        />
      </div>
    </div>
    <Text color={EColor.greenDark} className={styles.textInfo} As="h3" size={16}>
      Описание вашего товара
    </Text>
    <div className={styles.textareaContainer}>
    <Controller
          name="description"
          control={control}
          rules={{
              required: true,
              maxLength: 500,
          }}
          render={({field}) => (
            <textarea
              onChange={field.onChange}
              value={field.value}
              id={'textareaInfoService'}
              className={cn(styles.textarea, {
                [styles.errorBorder]: !!formState.errors.description
              })}
              placeholder="Описание товара, его качества, свойства и тд."
            />
          )} 
        />
      <label className={styles.labelTag} htmlFor="textareaInfoService">
        Не более 500 знаков
      </label>
      {!!formState.errors.description && (
        <span className={styles.error}>
          Заполните поле
        </span>
      )}
    </div>
    <Text color={EColor.greenDark} className={styles.textInfo} As="h3" size={16}>
      Количество в наличии
    </Text>
    <div className={styles.inputCenterGroup}>
      <Controller
        name="available_quantity"
        control={control}
        rules={{
            required: true,
        }}
        render={({field}) => (
          <input
            value={field.value}
            onChange={handleChangeAvailableQuantity}
            className={cn(styles.inputGroupInput, {
              [styles.errorBorder]:  !!formState.errors.available_quantity
            })}
            type="text"
            placeholder='Кол-во'
          />
        )} 
      />
      <UniversalSelect
          listOptions={listOptionsUnitDefault}
          onChangeOption={changeSelect}
          selectedValue={selected}
          className=''
        />
    </div>
    <Text color={EColor.greenDark} className={styles.textInfo} As="h3" size={16}>
      Установите минимальный размер заказа
    </Text>
    <div className={styles.inputCenterGroup}>
      <Controller
        name="min_quantity"
        control={control}
        rules={{
            required: true,
        }}
        render={({field}) => (
          <input
            value={field.value}
            onChange={handleChangeMinQuantity}
            className={cn(styles.inputGroupInput, {
              [styles.errorBorder]:  !!formState.errors.min_quantity
            })}
            type="text"
            placeholder='Кол-во'
          />
        )} 
      />
      <UniversalSelect
        listOptions={listOptionsUnitDefault}
        onChangeOption={changeSelect}
        selectedValue={selected}
        className=''
      />
    </div>
    <div className={styles.inputFileContainer}>
      <Controller
        name="image"
        control={control}
        rules={{
            required: !idProduct,
        }}
        render={() => (
          <>
            <input 
              className={cn(styles.inputFile, {
                [styles.errorBorder]:  !!formState.errors.image
              })}
              name="file" 
              id={'inputFile'} 
              accept="image/*" 
              type="file" 
              onChange={handleChange}
            />
            <label
              htmlFor="inputFile"
              className={cn(styles.inputFileBtn, {
              [styles.errorBorder]:  !!formState.errors.image
            })}>
              <span>Загрузить фото</span>
            </label>
            <label className={styles.labelTag} htmlFor="inputFile">
              {imageWatch && typeof imageWatch !== 'string' && (
                imageWatch?.name
              )}
            </label>
          </>
        )} 
      />
    </div>
  </form>
  );
})
