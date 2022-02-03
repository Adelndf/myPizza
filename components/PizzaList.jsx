import styles from "../styles/PizzaList.module.css";
import { PizzaCard } from "./PizzaCard";

const PizzaList = ({ pizzaList }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit arcu
        in pretium molestie. Interdum et malesuada fames acme. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit.
      </p>
      <div className={styles.wrapper}>
        {pizzaList.map((item) => (
          <PizzaCard
            key={item._id}
            id={item._id}
            title={item.title}
            price={item.prices[0]}
            description={item.description}
            imgUrl={item.imgUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default PizzaList;
