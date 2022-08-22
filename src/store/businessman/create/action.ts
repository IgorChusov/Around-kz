import { AxiosResponse } from 'axios'
import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import api from '../../../config/api'
import { SwiperDate } from '../../../shared/ContainerContent/PageService/ChoiceOfDate/SwiperDate'
import { meRequestSuccess } from '../../me/get/action'
import { RootState } from '../../reducer'
import { IDataBusinessmen } from '../get/reduser'


// запрос отправлен
export const CREATE_BUSINESSMEN_REQUEST = 'CREATE_BUSINESSMEN_REQUEST'
export type CreateBusinessmenRequestAction = {
  type: typeof CREATE_BUSINESSMEN_REQUEST
}
export const createBusinessmenRequest: ActionCreator<CreateBusinessmenRequestAction> = () => ({
  type: CREATE_BUSINESSMEN_REQUEST,
})

// запрос смс успешен
export const CREATE_BUSINESSMEN_SUCCESS = 'CREATE_BUSINESSMEN_SUCCESS'
export type CreateBusinessmenRequestSuccessAction = {
  type: typeof CREATE_BUSINESSMEN_SUCCESS
  data: any
}

export const createBusinessmenSuccess: ActionCreator<CreateBusinessmenRequestSuccessAction> = (data: any) => ({
  type: CREATE_BUSINESSMEN_SUCCESS,
  data
})


// запрос с ошибкой
export const CREATE_BUSINESSMEN_ERROR = 'CREATE_BUSINESSMEN_ERROR'
export type CreateBusinessmenRequestErrorAction = {
  type: typeof CREATE_BUSINESSMEN_ERROR
  error: string
}

export const createBusinessmenError: ActionCreator<CreateBusinessmenRequestErrorAction> = (error: string) => ({
  type: CREATE_BUSINESSMEN_ERROR,
  error,
})

export const CreateBusinessmenUserAsync = (
  formData: FormData
): ThunkAction<void, RootState, unknown, Action<string>> => 
  async (dispatch, getState) => {
    dispatch(createBusinessmenRequest())
    let returnData
    try {
      const {data}: {data: IDataBusinessmen}  = await api.post(`/users/businessmen/create`,
      formData
     , { 
        headers: {
        'Authorization': `JWT ${getState().token.tokenText}`,
      }})

      dispatch(createBusinessmenSuccess(data))
      dispatch(meRequestSuccess({
        ...getState().me.data,
        businessman: [...getState().me.data.businessman, {
          id: data.id,
          title: data.title,
          questionnaire_type: data.questionnaire_type,
        }]
      }))
    
      return  data
  
    } catch (error: any) {
      dispatch(createBusinessmenError(error.message))
    }

  }
  
  export const ChangeBusinessmenUserAsync = (
    formData: FormData,
    id?: string
  ): ThunkAction<void, RootState, unknown, Action<string>> =>
    async (dispatch, getState) => {
      dispatch(createBusinessmenRequest())
  
      try {
        const resp = await api.patch(`/users/businessmen/${id || getState().businessmen.data?.id}`,
          // title,
          // address,
          // tags,
          // description,
          // images_service: images,
          // questionnaire_type: questionnaireType,
          formData
       , { 
          headers: {
          'Authorization': `JWT ${getState().token.tokenText}`
        }})
  
        dispatch(createBusinessmenSuccess(resp.data))
  
        return resp.data
      } catch (error: any) {
        dispatch(createBusinessmenError(error.message))
      }
    }

  export const CreateAddInfoBusinessmenUserAsync = (
    formData: FormData,
  ): ThunkAction<void, RootState, unknown, Action<string>> =>
    async (dispatch, getState) => {
      dispatch(createBusinessmenRequest())
  
      try {
        const resp = await api.put(`/users/businessmen/${getState().businessman.data?.id}`,
          formData,
           { 
          headers: {
          'Authorization': `JWT ${getState().token.tokenText}`,
    

        }})
  
        dispatch(createBusinessmenSuccess(resp.data))
  
        return resp.data
      } catch (error: any) {
        dispatch(createBusinessmenError(error.message))
      }
    }
