import React, {  useState } from 'react';
import { Typography, Button, Form, message, Input, Select } from 'antd';
import FileUpload from './sections/FileUpload';
import axios from 'axios';
import { BOOK } from '../../Config';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useGetBookTypes from '../../utils/customHook/useGetBookTypes';

const { Title } = Typography;
const { TextArea } = Input;

const initialUserInfo = {
    title: '',
    description: '',
    price: 0,
    type: 'Health'
};

const UploadProductPage = () => {

    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const [userInfos, setUserInfos] = useState(initialUserInfo);
    const { title, description, price, type } = userInfos;
    const [images, setImages] = useState([]);
    const types = useGetBookTypes();

    const updateImages = (newImage) => {
        setImages(newImage);
    };

    const updateInputs = (e) => {
        setUserInfos(state => {
            if(e.target){
                return {
                    ...state,
                    [e.target.name]: e.target.value
                };
            }
            
            return {
                ...state,
                'type': e
            };
        });
    };

    const submitBookInfos = (e) => {
        e.preventDefault();
        
        if(!title ||!description || !price || !type || !images){
            message.warning('Please enter all book information');
            return;
        }     

        if(price > 10000000){
            message.warning('You can register up to 10 million won');
            return;
        }
        
        const bookInfoVariable = {
            writer: user.userData._id,
            title: title,
            description: description,
            price: price,
            type: type,
            images: images
        };

        (async () => {
            try {
                const response = await axios.post(`${BOOK}/uploadBook`, bookInfoVariable);
                const { saveBookSuccess } = response.data;
                if(saveBookSuccess){
                    message.success('Book upload was successful!');  
                    navigate('/');             
                } else {
                    message.err('Book upload was failed...');
                    navigate('/');
                }
            } catch (error) {
                message.success('ERROR - Book upload was failed... error');
                console.error(error);
            } 
        })();
    };

    return (
        <div className='upload_product_page'>         
            <div className='form_wrapper'>
                <Form onFinish={submitBookInfos}>
                    <FileUpload refresh={updateImages} />
                    <br />
                    <br />
                    <label className='w-100'>
                        Title<br/>
                        <Input type='text' name='title' placeholder='write book title..' max={60} min={1} value={title} onChange={updateInputs} required/>
                    </label>
                    <br />
                    <br />
                    <label className='w-100'>
                        Description<br/>
                        <TextArea type='text' name='description' placeholder="write infos.." max={300} min={5} value={description} onChange={updateInputs} required/>
                    </label>
                    <br />
                    <br />
                    <div className='d-flex justify-content-between'>
                        <label style={{ width: '45%' }}>
                            Price($)<br/>
                            <Input type='number' style={{ width: '100%' }}  name='price' value={price} onChange={updateInputs} required min={0}/>
                        </label>
                        <label style={{ width: '50%' }}>
                            Type <br/>
                            <Select className='types' value={type} onChange={updateInputs} style={{ width: '100%' }}>
                                {
                                    types.map(({ name, index }) => <Select.Option key={index} value={name} >{name}</Select.Option>)
                                }
                            </Select>
                        </label>             
                    </div>
                    <div className='d-flex justify-content-center justify-content-md-end mt-4'>
                        <Button className='me-2' onClick={submitBookInfos}>Submit</Button>
                        <Button danger>Reset</Button>
                    </div>                    
                </Form>
            </div>
        </div>
    );
};

export default UploadProductPage;