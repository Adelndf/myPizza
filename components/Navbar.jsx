import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const [style, setStyle] = useState({});
  const [toggle, setToggle] = useState(false);
  const quantity = useSelector((state) => state.cart.quantity);

  useEffect(() => {
    if (quantity >= 1) {
      setStyle({
        transform: `scale(1)`,
      });
    }
  }, [quantity]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.item}>
          <div className={styles.image}>
            <Image
              src="/images/telephone.png"
              width={32}
              height={32}
              alt="tele"
            />
          </div>
          <div className={styles.texts}>
            <h3>Order Now!</h3>
            <h1>012 345 678</h1>
          </div>
        </div>
        <div className={toggle ? `${styles.item} ${styles.show}` : styles.item}>
          <div className={styles.list}>
            <ul>
              <li>
                <Link href="/" passHref>
                  <a href="#">Homepage</a>
                </Link>
              </li>
              <li>
                <a href="#">Products</a>
              </li>
              <li>
                <a href="#">Menu</a>
              </li>
              <div className={styles.logo}>
                <Image
                  src="/images/logo.png"
                  layout="fill"
                  objectFit="contain"
                  alt="logo"
                />
              </div>
              <li>
                <a href="#">Events</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.item}>
          <div
            onClick={() => setToggle(!toggle)}
            className={toggle ? `${styles.munu} ${styles.show}` : styles.munu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <Link href="/cart" passHref>
            <div className={styles.cart}>
              <Image src="/images/cart.png" width={35} height={35} alt="cart" />
              <div className={styles.amount} style={style}>
                {quantity}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
