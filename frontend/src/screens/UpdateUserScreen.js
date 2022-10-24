import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Row, Col, Button} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { adminGetUser, adminUpdateUser, adminUserDetails} from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import {useParams, useNavigate} from 'react-router-dom'
import { USER_ADMIN_UPDATE_RESET, USER_UPDATE_RESET } from '../constants/userConstants'

function UpdateUserScreen() {

    const adminUserDetails = useSelector(state => state.adminUserDetails)
    const {errors, loading, user} = adminUserDetails

    const userUpdateAdmin = useSelector(state => state.userUpdateAdmin)
    const {errors: errorsUpdate, loading: loadingUpdate, success: successUpdate} = userUpdateAdmin

    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
        if(!user || !user.name || Number(id) !== user._id){
            dispatch({type: USER_UPDATE_RESET})
            dispatch(adminGetUser(id))
        }else{
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }, [user, dispatch, id, successUpdate])



    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(adminUpdateUser({
            _id: user._id, name, email, isAdmin
        }))
    }

  return (
    <div>
    {loadingUpdate && <Loader/>}
    {errorsUpdate && <Message variant='danger' >{errorsUpdate}</Message>}
    <Link to={'/admin/users'} >Go Back</Link>
    {loading ? <Loader /> : errors ? <Message variant='danger' >{errors}</Message> : (
         <FormContainer>
         <h1>Edit User</h1>
         
         <Form onSubmit={submitHandler}>
             
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
     
             <Form.Group controlId='isadmin'>
                 <Form.Check 
                     type='checkbox'
                     label='Is Admin'
                     checked={isAdmin}
                     onChange={e=>setIsAdmin(e.target.checked)}
                 >
                 </Form.Check>
             </Form.Group>
     
     
             <Button type='submit' variant='primary' >Update</Button>
         </Form>
     
     </FormContainer>
    ) }
   
</div>
  )
}

export default UpdateUserScreen