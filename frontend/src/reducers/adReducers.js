import { AD_CREATE_FAIL, AD_CREATE_REQUEST, AD_CREATE_RESET, AD_CREATE_SUCCESS, AD_DELETE_FAIL, AD_DELETE_REQUEST, AD_DELETE_SUCCESS, AD_DETAILS_FAIL, AD_DETAILS_REQUEST, AD_DETAILS_RESET, AD_DETAILS_SUCCESS, AD_LIST_FAIL, AD_LIST_REQUEST, AD_LIST_SUCCESS, AD_UPDATE_FAIL, AD_UPDATE_REQUEST, AD_UPDATE_RESET, AD_UPDATE_SUCCESS, MY_AD_CREATE_FAIL, MY_AD_CREATE_REQUEST, MY_AD_CREATE_RESET, MY_AD_CREATE_SUCCESS, MY_AD_LIST_FAIL, MY_AD_LIST_REQUEST, MY_AD_LIST_RESET, MY_AD_LIST_SUCCESS } from "../constants/adConstants"



export const adListReducer = (state = {ads: []}, action) => {

    switch(action.type){
        case AD_LIST_REQUEST:
            return {
                loading: true
            }

        case AD_LIST_SUCCESS:
            return {
                loading: false,
                ads: action.payload
            }
        
        case AD_LIST_FAIL:
            return {
                loading: false,
                errors: action.payload
            }
        
        default:
            return state
    }
}


export const adDetailsReducer = (state = {ad: {}}, action) => {

    switch(action.type){
        case AD_DETAILS_REQUEST:
            return {
                loading: true
            }

        case AD_DETAILS_SUCCESS:
            return {
                loading: false,
                ad: action.payload
            }
        
        case AD_DETAILS_FAIL:
            return {
                loading: false,
                errors: action.payload
            }
        
        case AD_DETAILS_RESET:
            return {
                ad: {}
            }
        
        default:
            return state
    }
}


export const adCreateReducer = (state = {}, action) => {

    switch(action.type){
        case AD_CREATE_REQUEST:
            return {
                loading: true
            }

        case AD_CREATE_SUCCESS:
            return {
                loading: false,
                ad: action.payload
            }
        
        case AD_CREATE_FAIL:
            return {
                loading: false,
                errors: action.payload
            }
        
        case AD_CREATE_RESET:
            return {
            }
        
        default:
            return state
    }
}




export const myAdsListReducer = (state = {ads : []}, action) => {

    switch(action.type){
        case MY_AD_LIST_REQUEST:
            return {
                loading: true
            }

        case MY_AD_LIST_SUCCESS:
            return {
                loading: false,
                ads: action.payload
            }
        
        case MY_AD_LIST_FAIL:
            return {
                loading: false,
                errors: action.payload
            }
        
        case MY_AD_LIST_RESET:
            return {
                ads: []
            }
        
        default:
            return state
    }
}



export const adUpdateReducer = (state = {}, action) => {

    switch(action.type){
        case AD_UPDATE_REQUEST:
            return {
                loading: true
            }

        case AD_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true,
                ads: action.payload
            }
        
        case AD_UPDATE_FAIL:
            return {
                loading: false,
                errors: action.payload
            }
        
        case AD_UPDATE_RESET:
            return {}
        
        default:
            return state
    }
}



export const adDeleteReducer = (state = {}, action) => {

    switch(action.type){
        case AD_DELETE_REQUEST:
            return {
                loading: true
            }

        case AD_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        
        case AD_DELETE_FAIL:
            return {
                loading: false,
                errors: action.payload
            }
        
        default:
            return state
    }
}