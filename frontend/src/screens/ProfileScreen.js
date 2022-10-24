import React, {useState, useEffect} from 'react'
import {Form, Row, Col, Button, Table} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useNavigate} from 'react-router-dom'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import { deleteAd, getMyAds } from '../actions/adActions'

    
function ProfileScreen() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userDetails = useSelector(state => state.userDetails)
    const {loading: loadingDetails, errors: errorsDetails, user} = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const {success} = userUpdate

    const myAds = useSelector(state => state.myAds)
    const {loading: loadingAds, errors: errorsAds, ads} = myAds

    const adDelete = useSelector(state => state.adDelete)
    const {success: successDelete} = deleteAd

    useEffect(() => {
        if(!user || !user.name || success || userInfo._id !== user._id || successDelete){
            dispatch({type: USER_UPDATE_RESET})
            dispatch(getUserDetails('profile'))
            dispatch(getMyAds())
        }else{
            setName(user.name)
            setEmail(user.email)
        }
    }, [user, dispatch, userInfo, success, successDelete])


    const submitHandler = (e) => {
        e.preventDefault()

        if(password !== confirmPassword){
            setMessage('Password and Confirm Password must match')
        }else{

            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password
            }))
        }

    }

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you want to delete this user')){

            dispatch(deleteAd(id))
            
        }
    }

  return (
    <Row>
        <Col md={3}>
            <h2>My Profile</h2>
            {loadingDetails && <Loader/>}
            {errorsDetails && <Message variant='danger' >{errorsDetails}</Message>}
    <Form onClick={submitHandler}>
        
        <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control 
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={e=>setName(e.target.value)}
            >
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control 
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={e=>setEmail(e.target.value)}
            >
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control 
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={e=>setPassword(e.target.value)}
            >
            </Form.Control>
        </Form.Group>


        <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control 
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={e=>setConfirmPassword(e.target.value)}
            >
            </Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' >Update</Button>
    </Form>
        </Col>
        <Col md={9}><h2>My Orders</h2>
            
                <Table striped responsive className='table-sm'>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Date</td>
                            <td>Category</td>
                            <td>Make</td>
                            <td>Model</td>
                            <td>Price</td>
                            <td>Details</td>
                            <td>Edit</td>
                        </tr>
                    </thead>

                    <tbody>
                        {loadingAds && <Loader/>}
                        {errorsAds && <Message variant='danger' >{errorsAds}</Message> }
                        {ads && ads.map(ad => (
                            <tr key={ad._id}>
                                <td>{ad._id}</td>
                                <td>{ad.createdAt.substring(0,10)}</td>
                                <td>{ad.category}</td>
                                <td>{ad.make}</td>
                                <td>{ad.model}</td>
                                <td>{ad.price}</td>
                                
                                <td>
                                    <LinkContainer to={`/ad/${ad._id}`} >
                                    <Button className='btn-sm' >Details</Button>

                                    </LinkContainer>
                                    
                                </td>
                                
                                <td>
                                    <LinkContainer to={`/ad/edit/${ad._id}`} >
                                    <Button variant='light' className='btn-sm' >
                                        <i className='fas fa-edit' ></i>
                                    </Button>

                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(ad._id)} >
                                        <i className='fas fa-trash' ></i>
                                </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
             
         </Col>

    </Row>
  )
}

export default ProfileScreen