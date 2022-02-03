import { useState } from "react";
import styles from "../styles/CashModel.module.css";

const CashModel = ({ total, createOrder }) => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");

  const handleClick = () => {
    createOrder({
      customer: customer,
      address: address,
      total: total,
      payMethod: 0,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>
          Your total is: <b>${total}</b>
        </h1>
        <div className={styles.item}>
          <label htmlFor="name" className={styles.lable}>
            Your Name<span>*</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="John Deo"
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label htmlFor="name" className={styles.lable}>
            Phone Number
          </label>
          <input
            type="text"
            name="name"
            placeholder="+966 55 555 555"
            className={styles.input}
            onChange={() => {}}
          />
        </div>
        <div className={styles.item}>
          <label htmlFor="name" className={styles.lable}>
            Address<span>*</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="KSA, Riyadh 355"
            className={styles.input}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className={styles.item}>
          <button className={styles.btn} onClick={handleClick}>
            Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CashModel;
