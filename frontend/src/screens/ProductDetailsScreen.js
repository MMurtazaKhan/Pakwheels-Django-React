import React, {useEffect, useState} from 'react'
import {Row, Col, Button, ListGroup, Image, Card, Form} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import FormContainer from '../components/FormContainer'
import {Link, useNavigate, useParams} from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getProductDetails } from '../actions/productActions'
import { addToCart } from '../actions/cartActions'

const ProductDetailsScreen = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const productDetails = useSelector(state => state.productDetails)
    const {loading:loadingDetails, errors: errorsDetails, product} = productDetails

    const {id} = useParams()

    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    useEffect(() => {
        dispatch(getProductDetails(id))
    }, [])

    const addToCartHandler = () => {
        // dispatch(addToCart(id, qty))
        navigate(`/cart/${id}/?qty=${qty}`)
    }

  return (
    <div>
        <Link to="/" className='btn btn-light my-3'>Go Back</Link>
        {
            loadingDetails ? <Loader/> 
            : errorsDetails ? <Message variant='danger'>{errorsDetails}</Message>
            : (
            <div>
                <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>
    
                <Col md={3} >
                    <ListGroup variant='flush' >
    
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
    
                        <ListGroup.Item>
                            Brand: {product.brand}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Category: {product.category}
                        </ListGroup.Item>
    
                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                        
                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Stock: {product.countInStock}
                        </ListGroup.Item>
    
    
                    </ListGroup>
                </Col>

                <Col md={3} >
                    <Card>
                        <ListGroup variant="flush" >
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>{product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
    
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col className='my-1' xs='auto'>
                                            <Form.Control 
                                                as='select'
                                                value={qty} 
                                                onChange={e=>setQty(e.target.value)}>
                                                {[...Array(product.countInStock).keys()].map((x)=>(
                                                    <option key={x+1} value={x+1} >
                                                        {x+1}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}
    
                            <ListGroup.Item>
                                <Button className='btn-block' type='button' disabled={product.countInStock==0} 
                                    onClick={addToCartHandler}
                                >Add to Cart </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
    
            </Row>
            
            </div> )}
            </div> 
  )
}

export default ProductDetailsScreen