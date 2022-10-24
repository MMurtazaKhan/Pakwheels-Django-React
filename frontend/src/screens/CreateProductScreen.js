import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { createAd } from '../actions/adActions'
import { createProduct } from '../actions/productActions'


const CreateProductScreen = () => {

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')
    const [image, setImage] = useState()
    const [description, setDescription] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productCreate = useSelector(state => state.productCreate)
    const {loading, errors} = productCreate

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProduct(
            {   name,
                price,
                category,
                brand,
                image,
                description,
                countInStock
        }

        ))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        
        formData.append('image', file)
        // formData.append('product_id', id)

        setUploading(true)

        try{
            // const config = {
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // }
            // const {data} = await axios.post('/api/ads/create/', formData, config)

            setImage(file)
            setUploading(false)
            console.log(file.name)
        }
        catch(error){
            setUploading(false)
        }

    }


  return (
    <div>
        {loading && <Loader/>}
        {errors && <Message variant='danger' >{errors}</Message>}

        <Link to='/admin/products'>Go back</Link>

                     <FormContainer>
                        <h1>Create Product</h1>
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

                        <Form.Group controlId='brand'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control 
                                type='text'
                                placeholder='Enter Brand'
                                value={brand}
                                onChange={e=>setBrand(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control 
                                type='text'
                                placeholder='Enter category'
                                value={category}
                                onChange={e=>setCategory(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>


                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Upload File</Form.Label>
                            <Form.Control type='text' value={image} onChange={e=>setImage(e.target.value)} ></Form.Control>
                            <Form.Control type="file" placeholder='Enter Image' onChange={uploadFileHandler} />
                        </Form.Group>

                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                type='name'
                                placeholder='Enter description'
                                value={description}
                                onChange={e=>setDescription(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='price'>
                            <Form.Label>Enter Price</Form.Label>
                            <Form.Control 
                                type='number'
                                placeholder='Enter Price'
                                value={price}
                                onChange={e=>setPrice(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                        
                        <Form.Group controlId='countInStock'>
                            <Form.Label>Stock</Form.Label>
                            <Form.Control 
                                type='number'
                                placeholder='Enter Stock'
                                value={countInStock}
                                onChange={e=>setCountInStock(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary'>
                                 Create
                         </Button>

                        </Form>
                     </FormContainer>
    </div>
  )
}

export default CreateProductScreen