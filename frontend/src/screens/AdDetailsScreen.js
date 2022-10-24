import React, {useEffect} from 'react'
import {Row, Col, Button, ListGroup, Image, Card} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import FormContainer from '../components/FormContainer'
import {Link, useNavigate, useParams} from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getAdDetails } from '../actions/adActions'

const AdDetailsScreen = () => {

    const dispatch = useDispatch()
    const adDetails = useSelector(state => state.adDetails)
    const {loading:loadingDetails, errors: errorsDetails, ad} = adDetails

    const {id} = useParams()

    useEffect(() => {
        dispatch(getAdDetails(id))
    }, [])

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
                    <Image src={ad.image} alt={ad.name} fluid/>
                </Col>
    
                <Col md={3} >
                    <ListGroup variant='flush' >
    
                        <ListGroup.Item>
                            <h3>{ad.name}</h3>
                        </ListGroup.Item>
    
                        <ListGroup.Item>
                            Make: {ad.make}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Model: {ad.model}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Category: {ad.category}
                        </ListGroup.Item>
    
                        <ListGroup.Item>
                            Price: ${ad.price}
                        </ListGroup.Item>
    
                        <ListGroup.Item>
                            Description: {ad.description}
                        </ListGroup.Item>
    
    
                    </ListGroup>
                </Col>
    
            </Row>
            
            </div> )}
            </div> 
  )
}

export default AdDetailsScreen