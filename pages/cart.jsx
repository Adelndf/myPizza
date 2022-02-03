import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/Cart.module.css";
import { useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/router";
import { resetCart } from "../redux/cartSlice";
import CashModel from "../components/CashModel";

const CLIENT_ID =
  "Ab6YDwnmK4kirsYwUo1U10ouOvRzS-ZwEDmfAt1ytB-DtkrRdoI-FkfrvzsuOBhTKntgkLkeIG2XhlVW";

const Cart = () => {
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  // This values are the props in the UI
  const cart = useSelector((state) => state.cart);
  const amount = cart.total;
  const currency = "USD";
  const style = { layout: "vertical" };
  //
  const dispatch = useDispatch();
  const products = cart.products;
  const router = useRouter();
  //
  const createOrder = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/orders", data);
      if (res.status === 201) {
        router.push("/orders/" + res.data._id);
        dispatch(resetCart());
      }
    } catch (err) {
      console.log(`ADEL THERE IS SOME WRONG !! => ${err}`);
    }
  };

  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const shipping = details.purchase_units[0].shipping;
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: cart.total,
                status: 0,
                payMethod: 1,
              });
            });
          }}
        />
      </>
    );
  };

  //
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody>
            <tr>
              <th>Product</th>
              <th>Name</th>
              <th className={styles.tableHide}>Extras</th>
              <th className={styles.tableHide}>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </tbody>
          <tbody>
            {products.map((item, i) => (
              <tr className={styles.tr} key={i}>
                <td>
                  <div className={styles.imgsContainer}>
                    <Image
                      src={item.imgUrl}
                      layout="fill"
                      objectFit="contain"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <div className={styles.name}>{item.title}</div>
                </td>
                <td className={styles.tableHide}>
                  {item.extra.map((e, i) => (
                    <div className={styles.extras} key={i}>
                      {e.text}
                    </div>
                  ))}
                </td>
                <td className={styles.tableHide}>
                  <div className={styles.price}>${item.price}</div>
                </td>
                <td>
                  <div className={styles.quantity}>{item.quantity}</div>
                </td>
                <td>
                  <div className={styles.total}>
                    ${item.price * item.quantity}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>${cart.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${cart.total}
          </div>
          {open ? (
            <div className={styles.payMethods}>
              <button className={styles.payCash} onClick={() => setCash(true)}>
                Cash On Delivered
              </button>
              {!PayPalScriptProvider && <span>Please Wait ...</span>}
              <PayPalScriptProvider
                options={{
                  "client-id": CLIENT_ID,
                  components: "buttons",
                  currency: "USD",
                  "disable-funding": "credit,card,p24",
                }}
              >
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button onClick={() => setOpen(true)} className={styles.button}>
              CHECKOUT NOW!
            </button>
          )}
        </div>
      </div>
      {cash && <CashModel createOrder={createOrder} total={cart.total} />}
    </div>
  );
};

export default Cart;
