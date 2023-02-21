import React, { useCallback, useMemo } from 'react';
import { Menu, Badge }     from 'antd';
import axios           from 'axios';
import { USER_SERVER } from '../../../Config';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { HistoryOutlined, StarOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

const RightMenu = ({ mode }) => {
    
    const navigate = useNavigate();

    // useSelector 는 리덕스의 상태값을 조회하기 위한 hook 함수로 이전의 connect를 통해 
    // 상태값을 조회하는 것보다 훨씬 간결하게 작성하고 코드가독성이 상승되는 장점이 있는 함수이다
    const { userData } = useSelector(state => state.user);
    


    const logoutHandler = async () => {  
        try {
            const response = await axios.get(`${USER_SERVER}/logout`);
            if(response.status === 200){
                navigate('/loginPage');
            } else {
                alert('Logout Failed..');
            } 
        } catch (error) {
            console.log('logout failed..');
        }             
    };

    const menuItems_nonLogin = useMemo(() => [
        {
            key: 'mail',
            label: <a href='/loginPage'>SignIn</a>,
        },
        {
            key: 'app',
            label: <a href='/registerPage'>SingUp</a>,
        }   
    ], []);

    const menuItems_Login = useMemo(() => [
        {
            key: 'favorites',
            label: <Badge count={userData?.favorites?.length || null} color={'#1363DF'} style={{ marginRight: '11px' }}><a href='/user/favorites'><StarOutlined style={{ fontSize: '18px' }}/></a></Badge>
        },
        {
            key: 'record',
            label: <a href='/user/record'><HistoryOutlined /></a>
        },      
        {
            key: 'upload',
            label: <a href='/book/upload'>Upload</a>
        },
        {
            key: 'logout',
            label: <a onClick={logoutHandler}>Logout</a>
        }       
    ], [userData]);


    return (
        // 유저의 정보가 있으면서 로그인 상태가 아니면? 로그인이 어울리는 메뉴바로 변경     
        <Menu mode={mode} items={(userData && !userData.isAuth) ? menuItems_nonLogin : menuItems_Login}
            style={{width: '440px', marginTop: '10px'}}/>                           
    );
};

export default RightMenu;