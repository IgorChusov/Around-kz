import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import api from '../../config/api'
import { accountMeRequestSuccess } from '../account/action'
import { RootState } from '../reducer'
import { IDataMyBusinessmen } from './reducer'

// запрос отправлен
export const GET_BUSINESSMEN_REQUEST = 'GET_BUSINESSMEN_REQUEST'
export type GetBusinessmenRequestAction = {
  type: typeof GET_BUSINESSMEN_REQUEST
}
export const getBusinessmenRequest: ActionCreator<GetBusinessmenRequestAction> = () => ({
  type: GET_BUSINESSMEN_REQUEST,
})

// запрос смс успешен
export const GET_BUSINESSMEN_SUCCESS = 'GET_BUSINESSMEN_SUCCESS'
export type GetBusinessmenRequestSuccessAction = {
  type: typeof GET_BUSINESSMEN_SUCCESS
  data: IDataMyBusinessmen
}

export const getBusinessmenSuccess: ActionCreator<GetBusinessmenRequestSuccessAction> = (data: IDataMyBusinessmen) => ({
  type: GET_BUSINESSMEN_SUCCESS,
  data
})


// добавление sevice
export const CHANGE_BUSINESSMEN_SUCCESS = 'CHANGE_BUSINESSMEN_SUCCESS'
export type ChangeBusinessmenSuccessAction = {
  type: typeof CHANGE_BUSINESSMEN_SUCCESS
  data: IDataMyBusinessmen
}

export const ChangeBusinessmenSuccess: ActionCreator<ChangeBusinessmenSuccessAction> = (data: IDataMyBusinessmen) => ({
  type: CHANGE_BUSINESSMEN_SUCCESS,
  data
})

// запрос с ошибкой
export const GET_BUSINESSMEN_ERROR = 'GET_BUSINESSMEN_ERROR'
export type GetBusinessmenRequestErrorAction = {
  type: typeof GET_BUSINESSMEN_ERROR
  error: string
}

export const getBusinessmenError: ActionCreator<GetBusinessmenRequestErrorAction> = (error: string) => ({
  type: GET_BUSINESSMEN_ERROR,
  error,
})

// запрос смс успешен
export const DELETE_BUSINESSMEN_SUCCESS = 'DELETE_BUSINESSMEN_SUCCESS'
export type DeleteBusinessmenRequestSuccessAction = {
  type: typeof DELETE_BUSINESSMEN_SUCCESS
  data: IDataMyBusinessmen
}

export const deleteBusinessmenSuccess: ActionCreator<DeleteBusinessmenRequestSuccessAction> = (data: IDataMyBusinessmen) => ({
  type: DELETE_BUSINESSMEN_SUCCESS,
  data
})

export const GetBusinessmenUserAsync = (id: string): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch, getState) => {
    dispatch(getBusinessmenRequest())

    try {
      const resp = await api.get(`/users/businessmen/${id}`)

      dispatch(getBusinessmenSuccess(resp.data))

      return resp.data
    } catch (error: any) {
      dispatch(getBusinessmenError(error.message))
    }
  }


export const DeleteBusinessmenUserAsync = (id: string): ThunkAction<void, RootState, unknown, Action<string>> =>
async (dispatch, getState) => {
  dispatch(getBusinessmenRequest())

  try {
    const resp = await api.delete(`/users/businessmen/${id}`, {
      headers: {
        'Authorization': `JWT ${getState().session.tokenText}`
      }
    })

    dispatch(getBusinessmenSuccess(null))
    const deletedElement = getState().account.user.data
    const data = deletedElement.businessman.filter((elem) => String(elem.id) !== id)
    deletedElement.businessman = data
    dispatch(accountMeRequestSuccess(deletedElement))
    
    return null
  } catch (error: any) {
    dispatch(getBusinessmenError(error.message))
  }
}

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
}

export const createBusinessmenSuccess: ActionCreator<CreateBusinessmenRequestSuccessAction> = () => ({
  type: CREATE_BUSINESSMEN_SUCCESS,
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
   
    try {
      const {data}: {data: IDataMyBusinessmen}  = await api.post(`/users/businessmen/create`,
      formData
     , { 
        headers: {
        'Authorization': `JWT ${getState().session.tokenText}`,
      }})

      dispatch(createBusinessmenSuccess())
      dispatch(accountMeRequestSuccess({
        ...getState().account.user.data,
        businessman: [...getState().account.user.data.businessman, {
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
        const resp = await api.patch(`/users/businessmen/${id || getState().businessmen.myBusinessmen.data?.id}`,
          // title,
          // address,
          // tags,
          // description,
          // images_service: images,
          // questionnaire_type: questionnaireType,
          formData
       , { 
          headers: {
          'Authorization': `JWT ${getState().session.tokenText}`
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
        const resp = await api.put(`/users/businessmen/${getState().businessmen.myBusinessmen.data?.id}`,
          formData,
           { 
          headers: {
          'Authorization': `JWT ${getState().session.tokenText}`,
    

        }})
  
        dispatch(createBusinessmenSuccess(resp.data))
  
        return resp.data
      } catch (error: any) {
        dispatch(createBusinessmenError(error.message))
      }
    }

// запрос отправлен
export const GET_ALL_BUSINESSMEN_REQUEST = 'GET_ALL_BUSINESSMEN_REQUEST'
export type GetAllBusinessmenRequestAction = {
  type: typeof GET_ALL_BUSINESSMEN_REQUEST
}
export const getAllBusinessmenRequest: ActionCreator<GetAllBusinessmenRequestAction> = () => ({
  type: GET_ALL_BUSINESSMEN_REQUEST,
})

// запрос смс успешен
export const GET_ALL_BUSINESSMEN_SUCCESS = 'GET_ALL_BUSINESSMEN_SUCCESS'
export type GetAllBusinessmenRequestSuccessAction = {
  type: typeof GET_ALL_BUSINESSMEN_SUCCESS
  data: any
}

export const getAllBusinessmenRequestSuccess: ActionCreator<GetAllBusinessmenRequestSuccessAction> = (data: any) => ({
  type: GET_ALL_BUSINESSMEN_SUCCESS,
  data
})

// запрос с ошибкой
export const GET_ALL_BUSINESSMEN_ERROR = 'GET_ALL_BUSINESSMEN_ERROR'
export type GetAllBusinessmenRequestErrorAction = {
  type: typeof GET_ALL_BUSINESSMEN_ERROR
  error: string
}

export const getAllBusinessmenRequestError: ActionCreator<GetAllBusinessmenRequestErrorAction> = (error: string) => ({
  type: GET_ALL_BUSINESSMEN_ERROR,
  error,
})

// интервалы для расписания
// запрос отправлен создание интервала
export const CREATE_INTERVALS_REQUEST = 'CREATE_INTERVALS_REQUEST'
export type CreateIntervalsRequestAction = {
  type: typeof CREATE_INTERVALS_REQUEST
}
export const createIntervalsRequest: ActionCreator<CreateIntervalsRequestAction> = () => ({
  type: CREATE_INTERVALS_REQUEST,
})

// запрос успешен 
export const CREATE_INTERVALS_SUCCESS = 'CREATE_INTERVALS_SUCCESS'
export type CreateIntervalsSuccessAction = {
  type: typeof CREATE_INTERVALS_SUCCESS
  data: any
}

export const createIntervalsSuccess: ActionCreator<CreateIntervalsSuccessAction> = (data: any) => ({
  type: CREATE_INTERVALS_SUCCESS,
  data
})

// запрос с ошибкой
export const CREATE_INTERVALS_ERROR = 'CREATE_INTERVALS_ERROR'
export type CreateIntervalsErrorAction = {
  type: typeof CREATE_INTERVALS_ERROR
  error: string
}

export const CreateIntervalAsync = (title: any, intervalTimeService: any, intervalTimeMarket: any): ThunkAction<void, RootState, unknown, Action<string>> =>
   async (dispatch, getState) => {
      dispatch(createIntervalsRequest())
    
      try {
        const resp = await api.post(`/users/businessmen/${getState().businessmen.myBusinessmen.data.id}/schedule/intervals/create`, 
          { 
            title: title,
            businessman: 319, 
            interval_time_service: intervalTimeService ? intervalTimeService : undefined, 
            interval_time_market: intervalTimeMarket ? intervalTimeMarket : undefined,
          }, 
          {headers: {
              'Authorization': `JWT ${getState().session.tokenText}`
            }
          }
        )

        dispatch(getAllBusinessmenRequestSuccess(resp.data))

        return resp.data
      } catch (error: any) {
        dispatch(getAllBusinessmenRequestError(error.message))
      }
    }



export const GetAllBusinessmenUserAsync = (tags: string , coordinates: [[number, number], [number, number]]): ThunkAction<void, RootState, unknown, Action<string>> =>
   async (dispatch, getState) => {
      dispatch(getAllBusinessmenRequest())
      const str = tags.trim().split(' ').filter(entry => /\S/.test(entry)).join('&')
      try {
        const paramsResp = new URLSearchParams();
        paramsResp.append("tags", str);
        paramsResp.append("left", String(coordinates[0][0]))
        paramsResp.append("left", String(coordinates[0][1]))
        paramsResp.append("right", String(coordinates[1][0]))
        paramsResp.append("right", String(coordinates[1][1]))

        const resp = await api.get(`/users/businessmen/`, {
          params: paramsResp,
          headers: {
          'Authorization': `JWT ${getState().session.tokenText}`
        }
        })

        dispatch(getAllBusinessmenRequestSuccess(resp.data))

        return resp
      } catch (error: any) {
        dispatch(getAllBusinessmenRequestError(error.message))
      }
    }