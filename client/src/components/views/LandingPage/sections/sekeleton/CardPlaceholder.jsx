import React from 'react';
import styled from 'styled-components';
import Skeleton from './Skeleton';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 235px; 
    background-color: #DFF6FF;
    height: 318px;
`;

const BookType = styled.div`
    display: flex;
    justify-content: start;
`;

const ImageWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;

const Info = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 10px;
`;

const CardPlaceholder = () => {

    return (
        <Container className='book_card'>
            <BookType>
                <Skeleton width={250} height={22} rounded />
            </BookType>
            <ImageWrapper>
                <Skeleton width={250} height={190} marginY rounded />
            </ImageWrapper>
            <Info>
                <Skeleton width={250} height={65} rounded />
            </Info>
        </Container>
    );
};

export default CardPlaceholder;