import React, { useLayoutEffect, useEffect, useRef } from 'react';
import styled from 'styled-components';

interface Props {
  id?: string;
  background: string;
  children: JSX.Element;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Page = ({ id, background, children, onClick }: Props) => {
  const style = {
    backgroundImage: `url("${background}")`,
  };

  const bgRef = useRef() as any;
  const centerRef = useRef() as any;
  const pageRef = useRef() as any;
  const staticRef = useRef() as any;

  // useLayoutEffect for post-render logic
  useLayoutEffect(() => {
    const { offsetTop, offsetHeight } = centerRef.current;
    const pageHeight = pageRef.current.offsetHeight;
    const style = bgRef.current.style;

    style.left = 0;
    style.right = 0;
    style.top = `-${offsetTop}px`;
    style.bottom = `${offsetTop + offsetHeight - pageHeight}px`;
  });

  // useEffect for subscriptions
  useEffect(() => {
    const handleScroll = () => {
        const { scrollTop } = scrollingElement as any;
        const offset = scrollTop - pageRef.current.offsetTop;
        staticRef.current.style.clipPath = `inset(${-offset}px 0 0)`;
      },
      { scrollingElement } = document;

    handleScroll();
    document.addEventListener('scroll', handleScroll);

    return () => document.removeEventListener('scroll', handleScroll);
    // Clean up scroll listener on unmount
  });

  return (
    <PageWrap id={id} ref={pageRef} style={style} onClick={onClick && onClick}>
      <Static ref={staticRef}>
        <Center ref={centerRef}>
          <Background style={style} ref={bgRef} />
          {children}
        </Center>
      </Static>
    </PageWrap>
  );
};

export default Page;

const PageWrap = styled.div`
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const Static = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Center = styled.div`
  background: black;
  padding: 50px 100px 70px;
  overflow: hidden;
  position: relative;
  width: 100%;
  box-shadow: 0 0 0 1px rgba(black, 0.4), 0 5px 10px rgba(black, 0.6);

  h1,
  h2 {
    text-transform: uppercase;
    position: relative;
  }
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  right: -50px;
  bottom: 0;
  left: -50px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 0;
`;
