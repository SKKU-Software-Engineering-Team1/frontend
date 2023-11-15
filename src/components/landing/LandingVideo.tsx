import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CanvasSectionBlock = styled.section`
  width: 100vw;
  height: calc(100vh - 100px);
  overflow: hidden;
`;

const CanvasContainer = styled.div`
  position: fixed;
  top: 100;
  left: 0;
  width: 100vw;
  height: 100vh;

  canvas {
    position: absolute;
    top: 50%;
    left: 50%;
  }
`;

const CanvasOpacity = styled.div`
  position: fixed;
  top: 100;
  left: 0;
  width: 100vw;
  height: calc(100vh - 100px);
  background-color: #000;
  z-index: 5;
`;

const CanvasText = styled.div`
  position: fixed;
  top: 40vh;
  left: 0;
  width: 100vw;

  color: #fff;
  font-size: 8rem;
  text-transform: uppercase;
  text-align: center;

  z-index: 10;

  transition: all 0.3s ease-in-out;
`;

const LandingVideo = () => {
  /**
   * client의 브라우저 실제 노출 사이즈 계산하는 state
   */
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  /**
   * clident의 브라우저 사이즈 state 설정
   */
  const handleResize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // /브라우저 사이즈 state 설정

  const [heightRatio, setHeightRatio] = useState(0);
  const [carouselOpacity, setCarouselOpacity] = useState(1);

  const [testOpacity, setTextOpacity] = useState(1);
  const [textTransform, setTextTransform] = useState(20);

  const [secondTextOpacity, setSecondTextOpacity] = useState(0);
  const [secondTextTransform, setSecondTextTransform] = useState(20);
  const [secondTextZindex, setSecondTextZindex] = useState(0);

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  let videoImageCopy: any = [];

  /**
   * videoImages array state에 canvas로 컨트롤할 images 할당하는 함수
   */
  const setCanvasImages = () => {
    const videoImageCount = 388 - 196; //인터렉션에 사용되는 images 개수
    for (let i = 0; i < videoImageCount; i++) {
      const imgElement = new Image();
      imgElement.src = `./videos/${196 + i}.jpg`;
      videoImageCopy.push(imgElement);
    }
  };

  setCanvasImages();

  useEffect(() => {
    setHeightRatio(window.innerHeight / 2160);
  }, [windowSize]);
  // /Canvas Scene 레이아웃(height) 설정

  /**
   * Second Scene의 Interection 처리를 위하여 스크롤 양을 %로 계산
   * 성능상 이유로 percentSetter는 여기서 state가 관여하지 않도록 세팅.(state화 하면 계산속도 현저히 떨어짐)
   */

  const scrollHandler = useCallback(() => {
    let clientYOffset = (window.pageYOffset / (5 * window.innerHeight - window.innerHeight)) * 100;

    let percentSetter = Math.round(clientYOffset);

    let sequence = Math.round((180 / 100) * percentSetter);

    // Canvas에 Image 할당
    if (videoImageCopy[sequence]) {
      canvasRef.current?.getContext("2d")?.drawImage(videoImageCopy[sequence], 0, 0);
    }

    // carousel interaction
    if (percentSetter <= 30) {
      setCarouselOpacity(1 - percentSetter / 90);
    } else if (percentSetter >= 80) {
      setCarouselOpacity(0.66 + ((percentSetter - 80) / 20) * 0.33);
    } else setCarouselOpacity(0.66);

    // text interaction
    if (percentSetter <= 20) {
      setTextTransform(20);
      setTextOpacity(1);
    } else {
      setTextTransform(0);
      setTextOpacity(-20);
    }

    // text interaction
    if (percentSetter >= 80) {
      setSecondTextTransform(20);
      setSecondTextOpacity(1);
      setSecondTextZindex(11);
    } else {
      setSecondTextTransform(0);
      setSecondTextOpacity(-20);
      setSecondTextZindex(-1);
    }
  }, [canvasRef]);

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <CanvasSectionBlock style={{ height: `${5 * window.innerHeight}px` }}>
      <CanvasContainer>
        <canvas
          ref={canvasRef}
          width={3840}
          height={2160}
          style={{
            transform: `translate3d(-50%, -50%, 0) scale(${heightRatio})`,
          }}
        />
      </CanvasContainer>
      <CanvasOpacity style={{ opacity: `${carouselOpacity}` }} />
      <CanvasText
        style={{
          opacity: `${testOpacity}`,
          top: `calc(45vh + ${textTransform}px)`,
        }}
      >
        get your union
      </CanvasText>

      <CanvasText
        style={{
          opacity: `${secondTextOpacity}`,
          top: `calc(45vh + ${secondTextTransform}px)`,
          cursor: "pointer",
          zIndex: `${secondTextZindex}`,
        }}
      >
        <Link to="/profile" style={{ textDecoration: "none", color: "#fff" }}>
          get start
        </Link>
      </CanvasText>
    </CanvasSectionBlock>
  );
};

export default LandingVideo;
