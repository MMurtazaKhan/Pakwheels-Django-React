import React, {useEffect} from 'react'
import {Row, Col} from "react-bootstrap"
import Product from '../components/Product'
import { products } from '../data'
import { useDispatch, useSelector } from 'react-redux'
import { listAds } from '../actions/adActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const HomeScreen = () => {

  const dispatch = useDispatch()
  const adList = useSelector(state => state.adList)
  const {loading:loadingAds, errors: errorsAds, ads} = adList

  useEffect(() => {
    dispatch(listAds())
  }, [])

  return (
    <div>
      {loadingAds && <Loader/>}
      {errorsAds && <Message variant='danger' >{errorsAds}</Message>}
      
      <Row>
    {ads && ads.map((ad) => (
      <Col sm={12} md={6} lg={4} xl={3} key={ad._id}>
        <Product product={ad} />
      </Col>
    ))}
</Row></div>
  )
}

export default HomeScreen