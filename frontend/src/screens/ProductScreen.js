import React, {useEffect} from 'react'
import {Row, Col} from "react-bootstrap"
import Product from '../components/Product'
// import { products } from '../data'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Product2 from '../components/Product2'
import {listProducts} from '../actions/productActions'

const ProductScreen = () => {

  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const {loading, errors, products} = productList

  useEffect(() => {
    dispatch(listProducts())
  }, [])

  return (
    <div>
        {loading && <Loader/>}
        {errors && <Message variant='danger' >{errors}</Message>}
      
      <Row>
    {products && products.map((product) => (
      <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
        <Product2 product={product} />
      </Col>
    ))}
</Row></div>
  )
}

export default ProductScreen