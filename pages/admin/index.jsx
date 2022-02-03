import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/Admin.module.css";

const Index = ({ products, orders }) => {
  const [pizzaList, setPizzaList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const status = ["preparing", "on the way", "delivered"];

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`);
      setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
    } catch (err) {
      console.log(`Adel this =>> ${err}`);
    }
  };
  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;
    try {
      const res = await axios.put(`http://localhost:3000/api/orders/${id}`, {
        status: currentStatus + 1,
      });
      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.warpper}>
      <div className={styles.container}>
        <div className={styles.item}>
          <h1 className={styles.title}>Products</h1>
          <table className={styles.table}>
            <tbody>
              <tr className={styles.trTitle}>
                <th>Image</th>
                <th>Id</th>
                <th>Title</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </tbody>
            {pizzaList.map((item) => (
              <tbody key={item._id}>
                <tr className={styles.trTitle}>
                  <td>
                    <Image
                      src={item.imgUrl}
                      width={50}
                      height={50}
                      objectFit="cover"
                      alt=""
                    />
                  </td>
                  <td>{item._id.slice(0, 7)}...</td>
                  <td>{item.title}</td>
                  <td>${item.prices[0]}</td>
                  <td>
                    <button className={styles.btn}>Edit</button>
                    <button
                      className={styles.btn}
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        <div className={styles.item}>
          <h1 className={styles.title}>Orders</h1>
          <table className={styles.table}>
            <tbody>
              <tr className={styles.trTitle}>
                <th>Id</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </tbody>
            {orderList.map((item) => (
              <tbody key={item._id}>
                <tr className={styles.trTitle}>
                  <td>{item._id.slice(0, 7)}...</td>
                  <td>{item.customer}</td>
                  <td>${item.total}</td>
                  <td>{item.payMethod === 0 ? `cash` : `paid`}</td>
                  <td>{status[item.status]}</td>
                  <td>
                    <button
                      className={styles.orderBtn}
                      onClick={() => handleStatus(item._id)}
                    >
                      Next Stage
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  const productRes = await axios.get("http://localhost:3000/api/products");
  const orderRes = await axios.get("http://localhost:3000/api/orders");

  return {
    props: {
      products: productRes.data,
      orders: orderRes.data,
    },
  };
};

export default Index;
