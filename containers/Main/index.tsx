import React, { useEffect } from 'react';
import styled from 'styled-components';

//components
import Page from './_fragments/Page';
import FirstStep from './_fragments/FirstStep';
import SecondStep from './_fragments/SecondStep';
import ThirdStep from './_fragments/ThirdStep';
import Alam from './_fragments/Alam';

const MainContainer = () => {
  const onClickFirstStep = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const image = document.createElement('img');
    const imageWrap = document.getElementById('create-image-wrap');
    image.id = 'pot-image';
    image.src = '/images/Main/JJIMO.png';
    image.style.width = '50px';
    image.style.height = '50px';
    image.style.position = 'absolute';
    image.style.left = e.clientX + 'px';
    image.style.top = e.clientY + 'px';
    image.style.transform = 'translate(-50%, -50%)';
    imageWrap?.appendChild(image);
  };

  useEffect(() => {
    document.addEventListener('scroll', () => {
      // 스크롤 현재 값 확인
      console.log('current', document.documentElement.scrollTop);

      // 브라우저에서 실제로 사용할 수 있는 전체 높이
      console.log('inner height', window.innerHeight);

      // TODO: 스크롤 위치 확인 후 해당 section으로 넘겨줌

      // const currnetPosY = document.documentElement.scrollTop;
      // const innerHeight = window.innerHeight;

      // if (currnetPosY <= innerHeight) {

      // } else if (currnetPosY <= innerHeight && currnetPosY <= innerHeight * 2) {
      //   window.location.href = '#section2';
      // } else if (
      //   currnetPosY <= innerHeight * 2 &&
      //   currnetPosY <= innerHeight * 3
      // ) {
      //   window.location.href = '#section3';
      // }
    });
  }, []);

  return (
    <Container>
      <Page
        id="section1"
        background="https://image.freepik.com/free-vector/colorful-memphis-design-background-vector_53876-81744.jpg"
        onClick={onClickFirstStep}
      >
        <Wrap>
          <FirstStep />
        </Wrap>
      </Page>

      <Page id="section2" background="/images/Main/MainTop.png">
        <Wrap>
          <SecondStep />
        </Wrap>
      </Page>
      <Page id="section3" background="">
        <Wrap>
          <ThirdStep />
        </Wrap>
      </Page>
      <Alam />
    </Container>
  );
};

export default MainContainer;

const Container = styled.div`
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.color.GRAY3};
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.color.GRAY1};
    border-radius: 10px;
  }
`;

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 80px;
    white-space: pre;
  }
`;
