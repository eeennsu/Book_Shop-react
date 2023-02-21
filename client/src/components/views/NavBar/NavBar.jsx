import { Button, Drawer } from 'antd';
import React, { useCallback, useState } from 'react';
import LeftMenu from './sections/LeftMenu';
import RightMenu from './sections/RightMenu';
import { AlignRightOutlined } from '@ant-design/icons';
import './sections/navbar.css';

const NavBar = () => {

	const [isOpen, setIsOpen] = useState(false);
	
	const showDrawer = () => {
		setIsOpen(true);
	};

	const onClose = () => {
		setIsOpen(false);
	};

	return (
		<nav className='menu'>
			<div className='menu__logo'>
				<a href='/'>Logo</a>
			</div>
			<div className='menu__container'>
				<div className='menu_left'>
					<LeftMenu mode='horizontal'/>
				</div>
				<div className='menu_right'>
					<RightMenu mode='horizontal'/>
				</div>
				<Button className='menu__mobile-button' type='primary' onClick={showDrawer}>
					<AlignRightOutlined />
				</Button>
				<Drawer title='Basic Drawer' placement='right' className='menu_drawer' onClose={onClose} open={isOpen}>
					<LeftMenu mode='inline'/>
					<RightMenu mode='inline'/>
				</Drawer>
			</div>
		</nav>
	);
};

export default NavBar;