import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios' 
import { getAdDetails, updateAd } from '../actions/adActions'
import { AD_UPDATE_RESET } from '../constants/adConstants'


function AdEditScreen() {

    const {id} = useParams()
    const dispatch = useDispatch()

    const adDetails = useSelector(state => state.adDetails)
    const {loading:loadingDetails, errors: errorsDetails, ad} = adDetails

    const adUpdate = useSelector(state => state.adUpdate)
    const {success} = adUpdate

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState('')
    const [model, setModel] = useState(0)
    const [image, setImage] = useState()
    const [description, setDescription] = useState('')
    const [make, setMake] = useState('')
    const [uploading, setUploading] = useState(false)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateAd(
            {
                _id: id,
                name,
                price,
                image,
                category,
                description,
                model,
                make
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


    useEffect(() => {
        if(!ad || ad._id !== Number(id) || success){

            dispatch(getAdDetails(id))
            dispatch({type: AD_UPDATE_RESET})
        }else{
            setName(ad.name)
            setMake(ad.make)
            setModel(ad.model)
            setCategory(ad.category)
            setPrice(ad.price)
            setImage(ad.image)
            setDescription(ad.description)
        }
    }, [dispatch, ad, id, success])

  return (
    <div>
    <Link to='/profile'>Go back</Link>
    {
            <FormContainer>
                    <h1>Update Ad</h1>
                    {loadingDetails && <Loader/>}
                    {errorsDetails && <Message variant='danger' >{errorsDetails}</Message>}
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

                    <Form.Group controlId='make'>
                        <Form.Label>Make</Form.Label>
                        <Form.Control 
                            type='text'
                            placeholder='Enter Make'
                            value={make}
                            onChange={e=>setMake(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='model'>
                        <Form.Label>Model</Form.Label>
                        <Form.Control 
                            type='number'
                            placeholder='Enter Model'
                            value={model}
                            onChange={e=>setModel(e.target.value)}
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
                    <Button type='submit' variant='primary'>
                             Update
                     </Button>

                    </Form>
                 </FormContainer>
    }
                 
</div>
  )
}

export default AdEditScreen