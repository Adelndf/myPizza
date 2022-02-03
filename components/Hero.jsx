import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Hero.module.css";

const pizzArr = [
  "/images/pizz-1.png",
  "/images/pizz-2.jpg",
  "/images/pizz-3.jpg",
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  const handleSlide = (type) => {
    if (type === "left") {
      setIndex(index !== 0 ? index - 1 : 2);
    } else if (type === "right") {
      setIndex(index !== 2 ? index + 1 : 0);
    }
  };

  return (
    <div className={styles.container}>
      <div
        onClick={() => handleSlide("left")}
        className={styles.arrow}
        style={{ left: "20px" }}
      >
        <Image
          src="/images/arrowl.png"
          alt=""
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div
        className={styles.imgsContainer}
        style={{ transform: `translateX(${-100 * index}vw)` }}
      >
        {pizzArr.map((img, index) => (
          <div className={styles.imgWrapper} key={index}>
            <Image src={img} alt="" layout="fill" objectFit="cover" />
          </div>
        ))}
      </div>
      <div
        onClick={() => handleSlide("right")}
        className={styles.arrow}
        style={{ right: "20px" }}
      >
        <Image
          src="/images/arrowr.png"
          alt=""
          layout="fill"
          objectFit="contain"
        />
      </div>
    </div>
  );
};

export default Hero;
