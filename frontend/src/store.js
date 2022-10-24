import {createStore, applyMiddleware, combineReducers} from 'redux'
import  thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {adminUserDetailsReducer, userDeleteReducer, userDetailsReducer, userListReducer, userLoginReducer, userRegisterReducer, userUpdateAdminReducer, userUpdateProfileReducer} from './reducers/userReducer'
import {productCreateReducer, productDeleteReducer, productDetailsReducer, productListReducer, productUpdateReducer} from './reducers/productReducers'
import { adCreateReducer, adDeleteReducer, adDetailsReducer, adListReducer, adUpdateReducer, myAdsListReducer } from './reducers/adReducers'
import { cartReducer } from './reducers/cartReducers'
import { orderCreateReducer } from './reducers/orderReducers'


const reducer = combineReducers({
    cart: cartReducer,
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    adminUserDetails: adminUserDetailsReducer,
    userUpdateAdmin: userUpdateAdminReducer,

    adList: adListReducer,
    adDetails: adDetailsReducer,
    adCreate: adCreateReducer,
    myAds: myAdsListReducer,
    adUpdate: adUpdateReducer,
    adDelete: adDeleteReducer,

    productList: productListReducer,
    productDetails: productDetailsReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,

    orderCreate: orderCreateReducer,
    
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')): null
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')): []
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')): {}
const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')): 'paypal'

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage
    },
    userLogin : {userInfo : userInfoFromStorage},

}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store