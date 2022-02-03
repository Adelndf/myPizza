import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/Product.module.css";
import { addProduct } from "../../redux/cartSlice";

const Product = ({ pizzaItem }) => {
  const [price, setPrice] = useState(pizzaItem.prices[0]);
  const [size, setSize] = useState(0);
  const [extra, setExtra] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addProduct({ ...pizzaItem, extra, quantity, price }));
  };

  console.log(cart);

  const changePrice = (number) => {
    setPrice(price + number);
  };
  const hanleSize = (sizeIndex) => {
    const diff = pizzaItem.prices[sizeIndex] - pizzaItem.prices[size];
    setSize(sizeIndex);
    changePrice(diff);
  };
  const hanleChange = (e, opt) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(opt.price);
      setExtra((prev) => [...prev, opt]);
    } else {
      changePrice(-opt.price);
      setExtra(extra.filter((extra) => extra._id !== opt._id));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgsContainer}>
          <Image
            src={pizzaItem.imgUrl}
            layout="fill"
            objectFit="contain"
            alt=""
          />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizzaItem.title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{pizzaItem.description}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => hanleSize(0)}>
            <Image src="/images/size.png" layout="fill" alt="" />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => hanleSize(1)}>
            <Image src="/images/size.png" layout="fill" alt="" />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => hanleSize(2)}>
            <Image src="/images/size.png" layout="fill" alt="" />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        {/*  */}
        <div className={styles.ingredients}>
          {pizzaItem.extraOpts.map((opt) => (
            <div className={styles.option} key={opt._id}>
              <input
                type="checkbox"
                id={opt.text}
                name={opt.text}
                className={styles.checkbox}
                onChange={(e) => hanleChange(e, opt)}
              />
              <label htmlFor={opt.text}>{opt.text}</label>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <input
            type="number"
            min={1}
            max={99}
            defaultValue={quantity}
            className={styles.quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button onClick={handleClick} className={styles.button}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `http://localhost:3000/api/products/${params.id}`
  );

  return {
    props: {
      pizzaItem: res.data,
    },
  };
};

export default Product;
