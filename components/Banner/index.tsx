import React from 'react';
import styles from './Banner.module.scss';
import Image from 'next/image';

interface Position {
  x: number;
  y: number;
}

export const Banner: React.FC = () => {
  const parallaxRef = React.useRef<HTMLDivElement>(null);
  const firstRef = React.useRef<HTMLDivElement>(null);
  const secondRef = React.useRef<HTMLDivElement>(null);
  const thirdRef = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState<Position>({ x: 0, y: 0 });
  const [coords, setCoords] = React.useState<Position>({ x: 0, y: 0 });

  const forFirst = 40;
  const forSecond = 20;
  const forThird = 10;

  const speed = 0.05;

  React.useEffect(() => {
    const setMouseParallaxStyle = () => {
      const distX = coords.x - position.x;
      const distY = coords.y - position.y;

      setPosition((prevPosition) => ({
        x: prevPosition.x + distX * speed,
        y: prevPosition.y + distY * speed,
      }));
    };

    const animationFrameId = requestAnimationFrame(setMouseParallaxStyle);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [coords, position.x, position.y, speed]);

  React.useEffect(() => {
    if (!firstRef.current || !secondRef.current || !thirdRef.current) {
      return;
    }

    firstRef.current.style.transform = `translate(${position.x / forFirst}%, ${
      position.y / forFirst
    }%)`;
    secondRef.current.style.transform = `translate(${
      position.x / forSecond
    }%, ${position.y / forSecond}%)`;
    thirdRef.current.style.transform = `translate(${position.x / forThird}%, ${
      position.y / forThird
    }%)`;
  }, [forFirst, forSecond, forThird, position.x, position.y]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { offsetWidth: parallaxWidth, offsetHeight: parallaxHeight } =
      parallaxRef.current as HTMLDivElement;

    const coordX = event.pageX - parallaxWidth / 2;
    const coordY = event.pageY - parallaxHeight / 2;

    setCoords({
      x: (coordX / parallaxWidth) * 100,
      y: (coordY / parallaxHeight) * 100,
    });
  };
  return (
    <div
      className={styles.banner}
      ref={parallaxRef}
      onMouseMove={handleMouseMove}
    >
      <Image
        className={styles.firstLayer}
        src='/img/banner/background_main.jpg'
        alt='first'
        width={1200}
        height={600}
        ref={firstRef as React.RefObject<HTMLImageElement>}
      />
      <Image
        className={styles.secondLayer}
        src='/img/banner/secondLayer.png'
        alt='second'
        width={1200}
        height={600}
        ref={secondRef as React.RefObject<HTMLImageElement>}
      />
      <Image
        className={styles.thirdLayer}
        src='/img/banner/thirdLayer.png'
        alt='third'
        width={1200}
        height={600}
        ref={thirdRef as React.RefObject<HTMLImageElement>}
      />
    </div>
  );
};
