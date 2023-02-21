import React, { memo, useCallback, useState } from 'react'

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { Form, Container } from '../../styled/Styled';

const LoginPage = () => {
  
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [inputEmail, setInputEmail] = useState('');
	const [inputPassword, setInputPassword] = useState('');

	const emailHandler = useCallback((e) => {
		setInputEmail(e.target.value);
	});

	const passwordHandler = useCallback((e) => {
		setInputPassword(e.target.value);
	});

	const submitHandler = useCallback(async (e) => {
		e.preventDefault(); 

		let body = {
			email: inputEmail,
			password: inputPassword,
		};
		
		// dispatch를 통해 loginUser액션을 취한다
		try {
			const result = await dispatch(loginUser(body));
			if(result.payload.loginSuccess){
				navigate('/')
			} else {
				alert('Login Failed');
			}
		} catch (error) {
			console.log(error);
		}
	}, [inputEmail, inputPassword]);

	return (
		<Container>
			<Form onSubmit={submitHandler}>
			<label>
				Email
			</label>
				<input type='email' placeholder='your email' onChange={emailHandler} value={inputEmail} />    
			<label>
				Password     
			</label>
				<input type='password' placeholder='your password' onChange={passwordHandler} value={inputPassword}  />  
			<br />
			<button type='submit'>
				Login
			</button>
			</Form>
		</Container>
	);
};

export default LoginPage;