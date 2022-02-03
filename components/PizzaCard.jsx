import Image from "next/image";
import Link from "next/link";
import styles from "../styles/PizzaCard.module.css";

export const PizzaCard = ({ imgUrl, title, description, price, id }) => {
  return (
    <Link href={`/product/${id}`} passHref>
      <div className={styles.container}>
        <Image
          src={imgUrl}
          alt=""
          width="500"
          height="500"
          objectFit="contain"
        />
        <h1 className={styles.title}>{title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{description}</p>
      </div>
    </Link>
  );
};
