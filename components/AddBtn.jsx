import styles from "../styles/AddBtn.module.css";

const AddBtn = ({ setClose }) => {
  return (
    <button onClick={() => setClose(false)} className={styles.btn}>
      Add new pizza
    </button>
  );
};

export default AddBtn;
