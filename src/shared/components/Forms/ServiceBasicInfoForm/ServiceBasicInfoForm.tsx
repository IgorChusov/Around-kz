import React, { ChangeEvent, forwardRef, RefObject, useImperativeHandle, useRef } from 'react'
import { IconElementPlus } from '../../../Icons'
import { Input } from '../../Inputs/Input'
import { EColor, Text } from '../../Text'
import styles from './infopagebasic.css'
import cn from 'classnames'
import { Controller, useForm } from 'react-hook-form'
import { CountdownHandle } from '../types'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store/reducer'
import { TBusinessmenState } from '../../../../store/businessman/reducer'
import { useParams } from 'react-router'

interface IInfoPageBasic {
  type: 'Service' | 'Product'
  onSubmit: (data: IReturnServiceBasicInfoForm) => void 
  saveState?: IReturnServiceBasicInfoForm
}

export interface IReturnServiceBasicInfoForm {
  title: string
  address: string,
  tags: string,
  description: string
  images_service: (File | string)[]
}

export const ServiceBasicInfoForm = forwardRef<CountdownHandle, IInfoPageBasic>(({  
  type,
  onSubmit,
  saveState
}, ref) => {
    const { id } = useParams<{ id?: string;}>()
    const refImg1 = useRef<HTMLImageElement>(null)
    const refImg2 = useRef<HTMLImageElement>(null)
    const refImg3 = useRef<HTMLImageElement>(null)
    const refImg4 = useRef<HTMLImageElement>(null)
    const refImg5 = useRef<HTMLImageElement>(null)

    const { myBusinessmen } = useSelector<RootState, TBusinessmenState>((state) => state.businessmen)
    
    const { control, handleSubmit, formState, register, watch, setValue } = useForm<IReturnServiceBasicInfoForm>({ defaultValues: {
      title         : id ? myBusinessmen.data.title : saveState?.title || '',
      address       : id ? myBusinessmen.data.address : saveState?.address || '',
      tags          : id ? myBusinessmen.data.tags.join(',') : saveState?.tags || '',
      description   : id ? myBusinessmen.data.description : saveState?.description || '',
      images_service: []
    }});

    const imagesServiceWatch = watch('images_service')

    const viewImg = (refImg: RefObject<HTMLImageElement>, index: number) => (e:ChangeEvent<HTMLInputElement>) => {

    if (e.target.files && e.target.files[0]) {
      const newArr = [...imagesServiceWatch]
      newArr[index] = e.target.files[0]
      setValue('images_service', newArr)

      var reader = new FileReader();

      reader.onload = function(e) {
        if(!e.target?.result) return
        // @ts-ignore:next-line
        refImg?.current?.setAttribute('src', e.target.result)
      };

      if(e.target.files && refImg.current) {
        reader.readAsDataURL(e.target.files[0]);

        refImg.current.style.opacity = '1'
      }
    }
  }

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
        <Controller
          name="title"
          control={control}
          rules={{
              required: true,
          }}
          render={({field}) => (
            <Input 
              id="input-name"
              value={field.value}
              onChange={field.onChange}
              labelText='Вид деятельности'
              classNameContainer={styles.inputContainer}
              error={!!formState.errors.title && 'Заполните поле'}
            />
          )} 
        />
        <Controller
          name="address"
          control={control}
          rules={{
              required: true,
              minLength: 12
          }}
          render={({field}) => (
            <Input
              id="input-address"
              value={field.value}
              onChange={field.onChange}
              labelText='Адрес'
              classNameContainer={styles.inputContainer}
              error={!!formState.errors.address && 'Минимум 12 символов'}
            /> 
          )} 
        />
      </div>
      <Text As="p" className={styles.textInfo} color={EColor.greenDark} size={16}>
        По каким словам вас смогут найти в поиске?
      </Text>
      <div className={styles.inputTagContainer}>
        <Controller
          name="tags"
          control={control}
          rules={{
              required: true,
          }}
          render={({field}) => ( 
            <input
              value={field.value}
              onChange={field.onChange}
              placeholder="#тег"
              id={'inputTag'}
              className={cn(styles.inputTag, {
                [styles.errorTags]: !!formState.errors.tags
              })}
              type="text"
            />
          )} 
        />
        <label className={styles.labelTag} htmlFor="inputTag">
          Теги разделяйте запятой
        </label>
        {!!formState.errors.tags && (
          <span className={styles.error}>
            Заполните поле
          </span>
        )}
      </div>
      <Text color={EColor.greenDark} className={styles.textInfo} As="p" size={16}>
        Описание вашей анкеты
      </Text>
      <div className={styles.textareaContainer}>
        <Controller
          name="description"
          control={control}
          rules={{
              required: true,
              maxLength: 255
          }}
          render={({field}) => ( 
            <textarea
              value={field.value}
              onChange={field.onChange}
              id={'textareaInfoService'}
              className={cn(styles.textarea, {
                [styles.textareaError]: !!formState.errors.description
              })}
              placeholder="Опыт, особенности услуг и тд."
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
      {(type === 'Service') && (
        <>
          <Text color={EColor.greenDark} className={styles.textPhoto} size={16} As='p'>Загрузить фото</Text>
          <div className={styles.inputFileContainer}>
            <input 
              className={styles.inputFile} 
              name="file" id={'inputFile'} 
              accept="image/*" 
              type="file" 
              onChange={viewImg(refImg1, 0)}
            />
            <label className={styles.inputFileBtn} htmlFor="inputFile">
              <img
                src={id ? myBusinessmen.data.images_service[0] : undefined}
                ref={refImg1}
                className={cn(styles.img, {
                  [styles.imgShow]: myBusinessmen.data.images_service[0] && id
                })}
              />
              <IconElementPlus classNameSvg={styles.minus} />
              <IconElementPlus classNameSvg={styles.plus} />
            </label>
            <div className={styles.inputFileGroup}>
              <div className={styles.inputSmallContent}>
                <input  
                  className={styles.inputFile} 
                  name="file" id={'inputFile2'} 
                  accept="image/*" 
                  type="file" 
                  onChange={viewImg(refImg2, 1)}
                />
                <label className={styles.inputFileBtnSmall} htmlFor="inputFile2">
                  <img
                    src={id ? myBusinessmen.data.images_service[1] : undefined}
                    ref={refImg2}
                    className={cn(styles.img, {
                      [styles.imgShow]: myBusinessmen.data.images_service[1] && id
                    })}
                  />
                  <IconElementPlus classNameSvg={styles.minusSmall} />
                  <IconElementPlus classNameSvg={styles.plusSmall} />
                </label>
              </div>
              <div className={styles.inputSmallContent}>
                <input 
                  className={styles.inputFile} 
                  name="file" id={'inputFile3'} 
                  accept="image/*"
                  type="file" 
                  onChange={viewImg(refImg3, 2)}
                />
                <label className={styles.inputFileBtnSmall} htmlFor="inputFile3">
                  <img 
                    src={id ? myBusinessmen.data.images_service[2] : undefined}
                    ref={refImg3}
                    className={cn(styles.img, {
                      [styles.imgShow]: myBusinessmen.data.images_service[2] && id
                    })}
                  />
                  <IconElementPlus classNameSvg={styles.minusSmall} />
                  <IconElementPlus classNameSvg={styles.plusSmall} />
                </label>
              </div>
              <div className={styles.inputSmallContent}>
                <input 
                  className={styles.inputFile} 
                  name="file" 
                  id={'inputFile4'} 
                  accept="image/*" 
                  type="file" 
                  onChange={viewImg(refImg4, 3)}
                />
                <label className={styles.inputFileBtnSmall} htmlFor="inputFile4">
                  <img
                    src={id ? myBusinessmen.data.images_service[3] : undefined}
                    ref={refImg4}
                    className={cn(styles.img, {
                      [styles.imgShow]: myBusinessmen.data.images_service[3] && id
                    })} 
                  />
                  <IconElementPlus classNameSvg={styles.minusSmall} />
                  <IconElementPlus classNameSvg={styles.plusSmall} />
                </label>
              </div>
              <div className={styles.inputSmallContent}>
                <input 
                  className={styles.inputFile} 
                  name="file" 
                  id={'inputFile5'} 
                  accept="image/*" 
                  type="file" 
                  onChange={viewImg(refImg5, 4)}
                />
                <label className={styles.inputFileBtnSmall} htmlFor="inputFile5">
                  <img 
                    src={id ? myBusinessmen.data.images_service[4] : undefined} 
                    ref={refImg5} 
                    className={cn(styles.img, {
                      [styles.imgShow]: myBusinessmen.data.images_service[4] && id
                    })} 
                  />
                  <IconElementPlus classNameSvg={styles.minusSmall} />
                  <IconElementPlus classNameSvg={styles.plusSmall} />
                </label>
              </div>
            </div>
          </div>
        </>
      )}
    </form>
  )
})
