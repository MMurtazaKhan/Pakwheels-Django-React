import React, {useEffect} from 'react'
import {Table, Button, Row, Col} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { deleteProduct, listProducts } from '../actions/productActions'
import { useNavigate, useLocation } from 'react-router-dom'

function ProductListScreen() {

    

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    
    const productList = useSelector(state => state.productList)
    const {loading, errors, products} = productList
    
    const productDelete = useSelector(state => state.productDelete)
    const {success} = productDelete

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        // if( userInfo && userInfo.isAdmin){

        //     dispatch(listProducts())
        // }else{
        //     navigate('/login')
        // }

        if(!userInfo.isAdmin){
            navigate('/login')
        }else{
            dispatch(listProducts())
        }

    }, [dispatch, success])

    const deleteHandler = (id) => {
            if(window.confirm('Are you sure you want to delete this product?')){
                dispatch(deleteProduct(id))
            }
        
    }

    const createProductHandler = () => {
        navigate('/admin/product/create')
    }

  return (
    <div>
        <Row className='align-items-center' >
            <Col>
                <h1>Products</h1>
            </Col>
            <Col>
                <Button className='my-3' onClick={createProductHandler} ><i className='fas fa-plus' > </i>Create Product</Button>
            </Col>
        </Row>
        {/* {loadingDelete && <Loader/>}
        {errorDelete && <Message variant='danger' >{errorDelete}</Message>}

        {loadingCreate && <Loader/>}
        {errorCreate && <Message variant='danger' >{errorCreate}</Message>} */}

        {loading ? <Loader/> : 
         errors ? <Message variant='danger' >{errors}</Message> : 
         (
            <Table striped responsive bordered hover className='table-sm' >
                <thead>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>BRAND</th>
                    <th>CATEGORY</th>
                    <th>PRICE</th>
                    <th>STOCK</th>
                    <th></th>
                </thead>

                <tbody>
                    {products.map(product => (
                        <tr key={product._id} >
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.brand}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.countInStock}</td>

                            <td>
                                <LinkContainer to={`/admin/product/edit/${product._id}`} >
                                    <Button variant='light' className='btn-sm' >
                                        <i className='fas fa-edit' ></i>
                                    </Button>
                                </LinkContainer>

                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)} >
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

export default ProductListScreen