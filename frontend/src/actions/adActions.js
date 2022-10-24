import { AD_CREATE_FAIL, AD_CREATE_REQUEST, AD_CREATE_SUCCESS, AD_DELETE_FAIL, AD_DELETE_REQUEST, AD_DELETE_SUCCESS, AD_DETAILS_FAIL, AD_DETAILS_REQUEST, AD_DETAILS_SUCCESS, AD_LIST_FAIL, AD_LIST_REQUEST, AD_LIST_SUCCESS, AD_UPDATE_FAIL, AD_UPDATE_REQUEST, AD_UPDATE_SUCCESS, MY_AD_CREATE_REQUEST, MY_AD_LIST_FAIL, MY_AD_LIST_REQUEST, MY_AD_LIST_SUCCESS } from "../constants/adConstants"
import axios from 'axios'



export const listAds = () => async (dispatch) => {
    try{
        dispatch({
            type: AD_LIST_REQUEST
        })


        const config = {
            headers : {
                'Content-type': 'application/json',

            }
        }

        const {data} = await axios.get(
            `/api/ads/`,
            config
            )

        
        dispatch({
            type: AD_LIST_SUCCESS,
            payload: data
        })
    
    }
    catch(error){
        dispatch({
            type: AD_LIST_FAIL,
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail 
            : error.message
        })
    }
}


export const getAdDetails = (id) => async (dispatch) => {
    try{
        dispatch({
            type: AD_DETAILS_REQUEST
        })


        const config = {
            headers : {
                'Content-type': 'application/json',

            }
        }

        const {data} = await axios.get(
            `/api/ads/${id}/`,
            config
            )

        
        dispatch({
            type: AD_DETAILS_SUCCESS,
            payload: data
        })
    
    }
    catch(error){
        dispatch({
            type: AD_DETAILS_FAIL,
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail 
            : error.message
        })
    }
}


export const createAd = (ad) => async (dispatch, getState) => {
    try{
        dispatch({
            type: AD_CREATE_REQUEST
        })

        const {
            userLogin: {userInfo}
        } = getState()

        const config = {
            headers : {
                'Content-type': 'multipart/form-data',
                Authorization: `Bearer ${userInfo.token}`

            }
        }

        const {data} = await axios.post(
            `/api/ads/create/`,
            ad,
            config
            )

        
        dispatch({
            type: AD_CREATE_SUCCESS,
            payload: data
        })
        
    
    }
    catch(error){
        dispatch({
            type: AD_CREATE_FAIL,
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail 
            : error.message
        })
    }
}


export const getMyAds = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: MY_AD_LIST_REQUEST
        })

        const {
            userLogin: {userInfo}
        } = getState()

        const config = {
            headers : {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`

            }
        }

        const {data} = await axios.get(
            `/api/ads/user/`,
            config
            )

        
        dispatch({
            type: MY_AD_LIST_SUCCESS,
            payload: data
        })
        
    
    }
    catch(error){
        dispatch({
            type: MY_AD_LIST_FAIL,
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail 
            : error.message
        })
    }
}


export const updateAd = (ad) => async (dispatch, getState) => {
    try{
        dispatch({
            type: AD_UPDATE_REQUEST
        })

        const {
            userLogin: {userInfo}
        } = getState()

        const config = {
            headers : {
                'Content-type': 'multipart/form-data',
                Authorization: `Bearer ${userInfo.token}`

            }
        }

        const {data} = await axios.put(
            `/api/ads/update/${ad._id}/`,
            ad,
            config
            )

        
        dispatch({
            type: AD_UPDATE_SUCCESS,
            payload: data
        })
        
    
    }
    catch(error){
        dispatch({
            type: AD_UPDATE_FAIL,
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail 
            : error.message
        })
    }
}


export const deleteAd = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type: AD_DELETE_REQUEST
        })

        const {
            userLogin: {userInfo}
        } = getState()

        const config = {
            headers : {
                'Content-type': 'Application/json',
                Authorization: `Bearer ${userInfo.token}`

            }
        }

        const {data} = await axios.delete(
            `/api/ads/delete/${id}/`,
            config
            )

        
        dispatch({
            type: AD_DELETE_SUCCESS,
            payload: data
        })
        
    
    }
    catch(error){
        dispatch({
            type: AD_DELETE_FAIL,
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail 
            : error.message
        })
    }
}
