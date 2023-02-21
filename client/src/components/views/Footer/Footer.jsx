import { InstagramOutlined, FacebookOutlined, TwitterOutlined, YoutubeOutlined, MailOutlined, WhatsAppOutlined, GithubOutlined } from '@ant-design/icons';
import React from 'react';

const Footer = () => {
	
	return (
		<footer className='footer'>
			<div className='footer_top'>
				<div>
					<a href='#'>
						<InstagramOutlined className='icon'/>
					</a>			
				</div>
				<div>
					<a href='#'>
						<FacebookOutlined className='icon'/>
					</a>
				</div>
				<div>
					<a href='#'>
						<TwitterOutlined className='icon'/>
					</a>
				</div>
				<div>
					<a href='#'>
						<YoutubeOutlined className='icon'/>
					</a>
				</div>
				<div>
					<a href='#'>
						<MailOutlined className='icon'/>
					</a>
				</div>
				<div>
					<a href='#'>
						<WhatsAppOutlined className='icon'/>
					</a>
				</div>
				<div>
					<a href='#'>
						<GithubOutlined className='icon'/>
					</a>
				</div>
			</div>
			<div className='footer_bottom'>
				<p>&copy;2023 Copyright All Right Reserved</p>
			</div>		
		</footer>
	);
};

export default Footer;