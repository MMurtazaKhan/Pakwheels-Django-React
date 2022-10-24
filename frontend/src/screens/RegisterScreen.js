import React, {useState, useEffect} from 'react'
import {Form, Row, Col, Button} from 'react-bootstrap'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'


const RegisterScreen = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const {loading, errors, userInfo } = userRegister

    const submitHandler = (e) => {
        e.preventDefault()

        if(password !== confirmPassword ){
            setMessage('Password and Confirm Password must match')
        } else{
            dispatch(register(name, email, password))
        }
        
    }

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    }, [navigate, dispatch, userInfo])

  return (
    <FormContainer>
        
        <h1>Register</h1>
        {loading && <Loader/>}
        {message && <Message variant='danger' >{message}</Message> }
        {errors && <Message variant='danger' >{errors}</Message> }

        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' >
                <Form.Label>Name</Form.Label>
                <Form.Control
                    required
                    type='name'
                    placeholder='Enter Name'
                    value={name}
                    onChange = {e => setName(e.target.value)}
                >

                </Form.Control>
            </Form.Group>
            
            <Form.Group controlId='email' >
                <Form.Label>Email</Form.Label>
                <Form.Control
                    required
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange = {e => setEmail(e.target.value)}
                >

                </Form.Control>
            </Form.Group>
            <Form.Group controlId='password' >
                <Form.Label>Password</Form.Label>
                <Form.Control
                    required
                    type='password'
                    placeholder='Enter Password'
                    value={password}
                    onChange = {e => setPassword(e.target.value)}
                >

                </Form.Control>
            </Form.Group>
            <Form.Group controlId='confirmPassword' >
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    required
                    type='password'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange = {e => setConfirmPassword(e.target.value)}
                >

                </Form.Control>
            </Form.Group>

            <Button type='submit' className='my-3'  variant='primary'>Register</Button>

        </Form>

        <Row className='py-3'>
        <Col>
            Have an account ? <Link
                to={redirect ? `/login?redirect=${redirect}`: '/login'}>Sign In</Link>
        </Col>

    </Row>
    
    </FormContainer>
  )
}

export default RegisterScreen