import { ArrowUpOutlined } from '@ant-design/icons';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';

const FixedBox = styled.div`
    position: fixed;
    bottom: 50px;
    right: 50px;
    height: 50px;
    width: 50px;
    z-index: 10000;
`;

const ArrowButton = styled.button`
    border: none;
    font-size: 25px;
    padding: 7px 10px;
    padding-top: 0;
    border-radius: 30px;
    background-color: #fff;
    border: 3px solid #DFF6FF;
    transition: 0.2s ease-in-out;

    &:hover {
        color: #DFF6FF;
        background-color: #06283D;
    }
`;

const TopButton = () => {

    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const scrollDown = () => {
            if (window.scrollY > 100) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', scrollDown);

        return () => {
            window.removeEventListener('scroll', scrollDown);
        };
    }, []);

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        showButton && 
        (<FixedBox>
             <ArrowButton onClick={scrollUp}>                
                <ArrowUpOutlined/>
            </ArrowButton>
        </FixedBox>)
    );
};

export default TopButton;