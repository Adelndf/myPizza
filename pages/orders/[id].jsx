import axios from "axios";
import Image from "next/image";
import React from "react";
import styles from "../../styles/Orders.module.css";

const Orders = ({ order }) => {
  const status = order.status;
  const statusClass = (index) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.unDone;
  };

  console.log(order);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <div className={styles.row}>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Address</th>
                  <th>Total</th>
                </tr>
              </tbody>
              <tbody>
                <tr className={styles.tr}>
                  <td>
                    <div className={styles.id}>{order._id}</div>
                  </td>
                  <td>
                    <div className={styles.name}>{order.customer}</div>
                  </td>
                  <td>
                    <div className={styles.address}>{order.address}</div>
                  </td>
                  <td>
                    <div className={styles.total}>${order.total}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.row}>
            <div className={statusClass(0)}>
              <Image src="/images/paid.png" width={30} height={30} alt="" />
              <span>Payment</span>
              <div className={styles.checkedIcon}>
                <Image
                  src="/images/checked.png"
                  width={20}
                  height={20}
                  alt=""
                />
              </div>
            </div>
            <div className={statusClass(1)}>
              <Image src="/images/bake.png" width={30} height={30} alt="" />
              <span>Preparing...</span>
              <div className={styles.checkedIcon}>
                <Image
                  src="/images/checked.png"
                  width={20}
                  height={20}
                  alt=""
                />
              </div>
            </div>
            <div className={statusClass(2)}>
              <Image src="/images/bike.png" width={30} height={30} alt="" />
              <span>On the way</span>
              <div className={styles.checkedIcon}>
                <Image
                  src="/images/checked.png"
                  width={20}
                  height={20}
                  alt=""
                />
              </div>
            </div>
            <div className={statusClass(3)}>
              <Image
                src="/images/delivered.png"
                width={30}
                height={30}
                alt=""
              />
              <span>Delivered</span>
              <div className={styles.checkedIcon}>
                <Image
                  src="/images/checked.png"
                  width={20}
                  height={20}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.rightWrapper}>
            <h2 className={styles.title}>CART TOTAL</h2>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Subtotal:</b>${order.total}
            </div>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Discount:</b>$0.00
            </div>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Total:</b>${order.total}
            </div>
            <button disabled className={styles.button}>
              PAID!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`http://localhost:3000/api/orders/${params.id}`);
  return {
    props: {
      order: res.data,
    },
  };
};

export default Orders;
