import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import AddBtn from "../components/AddBtn";
import AddModal from "../components/AddModal";
import Hero from "../components/Hero";
import PizzaList from "../components/PizzaList";
import styles from "../styles/Home.module.css";

export default function Home({ pizzaList, isAdmin }) {
  const [close, setClose] = useState(true);

  return (
    <div className={styles.container}>
      <Head>
        <title>myPizza resto | Adel</title>
        <meta
          name="description"
          content="Best pizza in town, build & generated by create next.js app"
        />
        <link rel="icon" href="/images/pizza.png" />
      </Head>
      <Hero />
      {isAdmin && <AddBtn setClose={setClose} />}
      <PizzaList pizzaList={pizzaList} />
      {!close && <AddModal setClose={setClose} />}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let isAdmin = false;
  if (myCookie.token === process.env.TOKEN) {
    isAdmin = true;
  }

  const res = await axios.get("http://localhost:3000/api/products");

  return {
    props: {
      pizzaList: res.data,
      isAdmin,
    },
  };
};
