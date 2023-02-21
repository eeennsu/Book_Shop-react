import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const pulseKeyframe = keyframes`
    0% {
        opacity: 0.8;
    }  

    50% {
        opacity: 0.3;
    }

    100% {
        opacity: 0.8;
    }
`;

const pulseAnimation = css`
    animation: ${pulseKeyframe} 1.5s ease-in-out infinite;
`;

const Base = styled.span`
    ${({ color }) => color && `background-color: ${color}`};
    ${({ animation }) => animation && pulseAnimation };
    ${({ rounded }) => rounded && 'border-radius: 8px'};
    ${({ marginY }) => marginY && 'margin: 13px 0'};
    width: ${({ width, unit }) => (width && unit) && `${width}${unit}`};
    height: ${({ height, unit }) => (height && unit) && `${height}${unit}`};    
`;

const Content = styled.span`
    opacity: 0.1;
`;

const Skeleton = ({ style, animation=true, rounded, marginY, width, height, unit='px', color='#9bd3f8', text }) => {

    return (
        <Base
            style={style}
            animation={animation}
            width={width}
            height={height}            
            unit={unit}
            rounded={rounded}
            color={color}
            marginY={marginY}>
            <Content>
                {text}
            </Content>
        </Base>
    );
};

export default Skeleton;