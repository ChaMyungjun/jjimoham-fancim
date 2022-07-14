import React, { useState } from 'react';
import styled, { css } from 'styled-components';

//components
import { Title } from 'components/Typography';

//styles
import { Bounce, FadeIn, FadeOut, sizeUp } from 'styles/animation';

interface Props {
  progress: string;
}

const SecondStep = ({ progress }: Props) => {
  const [isClick, setIsClick] = useState(false);

  // randomize create
  // const getRandomIntInclusive = () => {
  //   const min = 0;
  //   const max = 15;
  //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // };

  const HOVER_BACKGROUND_IMG = [
    '/images/Main/mainHoverBackground.png',
    '/images/Main/mainHoverBackground2.png',
    '/images/Main/mainHoverBackground3.png',
    '/images/Main/mainHoverBackground4.png',
  ] as const;

  console.log(parseFloat(progress) / 25)

  return (
    <>
      <SecondTitle isClick={isClick} onClick={() => setIsClick(true)}>
        JJIMO HAM
      </SecondTitle>
      <ImageContainer
        style={{
          backgroundImage: `url(${
            HOVER_BACKGROUND_IMG[Math.floor(parseFloat(progress) / 25)]
          })`,
        }}
      />
    </>
  );
};

export default SecondStep;

interface SecondTitleStyleProps {
  isClick: boolean;
}

interface CircleImagStyleProps {
  source: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 80px;
    white-space: pre;
  }
`;

const SecondTitle = styled(Title)<SecondTitleStyleProps>`
  transform: translate(-1%, 40%);
  cursor: pointer;

  ${(props) =>
    props.isClick &&
    css`
      animation: ${FadeOut} 580ms linear 0s forwards;
      cursor: default;
    `}

  ${(props) =>
    !props.isClick &&
    css`
      width: max-content;
      animation: ${Bounce} 380ms linear 0s infinite alternate;
    `}
`;

const ImageContainer = styled.div`
  position: absolute;
  width: 350px;
  height: 350px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background-color: #1a1a1a;
  z-index: 9;
  animation: ${FadeIn} 580ms linear 0s forwards;
  animation: ${sizeUp} 480ms linear 0s forwards;
  cursor: default;
`;

const CircleImage = styled.div<CircleImagStyleProps>`
  width: 100px;
  height: 100px;

  background-image: url(${(props) => props.source});
  background-position: center center;
  background-size: cover;

  border-radius: 50%;

  transition: transform 200ms linear;

  cursor: pointer;

  :hover {
    transform: scale(1.1) !important;
  }
`;
