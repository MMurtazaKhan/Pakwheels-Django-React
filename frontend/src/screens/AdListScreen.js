import React, {useEffect} from 'react'
import {Table, Button, Row, Col} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { deleteProduct, listProducts } from '../actions/productActions'
import { useNavigate, useLocation } from 'react-router-dom'
import { deleteAd, listAds } from '../actions/adActions'

function AdListScreen() {

    

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const adList = useSelector(state => state.adList)
    const {loading, errors, ads} = adList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const adDelete = useSelector(state => state.adDelete)
    const { success } = adDelete

    useEffect(() => {
        // if( userInfo && userInfo.isAdmin){

        //     dispatch(listProducts())
        // }else{
        //     navigate('/login')
        // }

        if(!userInfo.isAdmin){
            navigate('/login')
        }else{
            dispatch(listAds())
        }

    }, [dispatch, success])

    const deleteHandler = (id) => {
            if(window.confirm('Are you sure you want to delete this product?')){
                dispatch(deleteAd(id))
            }
        
    }


  return (
    <div>
        <Row className='align-items-center' >
            <Col>
                <h1>Products</h1>
            </Col>
        </Row>
        
        {loading ? <Loader/> : 
         errors ? <Message variant='danger' >{errors}</Message> : 
         (
            <Table striped responsive bordered hover className='table-sm' >
                <thead>
                    <th>ID</th>
                    <th>USER ID</th>
                    <th>TITLE</th>
                    <th>DATE</th>
                    <th>CATEGORY</th>
                    <th>PRICE</th>
                    <th>DETAILS</th>
                    <th></th>
                </thead>

                <tbody>
                    {ads.map(ad => (
                        <tr key={ad._id} >
                            <td>{ad._id}</td>
                            <td>{ad.user}</td>
                            <td>{ad.name}</td>
                            <td>{ad.createdAt.substring(1,10)}</td>
                            <td>{ad.category}</td>
                            <td>{ad.price}</td>
                            <td><Button className='btn-sm' onClick={() => navigate(`/ad/${ad._id}`)} >Details</Button> </td>

                            <td>

                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(ad._id)} >
                                        <i className='fas fa-trash' ></i>
                                </Button>
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
         )}
    </div>
  )
}

export default AdListScreen