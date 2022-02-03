import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../styles/AddModal.module.css";

const AddModal = ({ setClose }) => {
  const [img, setImg] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [prices, setPrices] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [extra, setExtra] = useState(null);
  const router = useRouter();

  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  const handleExtra = (e) => {
    setExtraOptions((prev) => [...prev, extra]);
  };

  const handleCreate = async () => {
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "uploads");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/iadelndf/image/upload",
        data
      );
      const { url } = uploadRes.data;
      const newProduct = {
        title: title,
        imgUrl: url,
        prices: prices,
        description: desc,
        extraOpts: extraOptions,
      };
      axios.post("http://localhost:3000/api/products", newProduct);
      setClose(true);
      router.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setClose(true)} className={styles.close}>
          X
        </span>
        <h2 className={styles.title}>Create a new pizza</h2>
        <div className={styles.item}>
          <lable htmlFor="file" className={styles.label}>
            Choose an image
          </lable>
          <input
            className={`${styles.input} ${styles.inputImg}`}
            type="file"
            name="file"
            onChange={(e) => setImg(e.target.files[0])}
            required
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Title</label>
          <input
            className={styles.input}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Desc</label>
          <textarea
            className={styles.textarea}
            rows={4}
            type="text"
            onChange={(e) => setDesc(e.target.value)}
            required
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Prices</label>
          <div className={styles.priceContainer}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Small"
              onChange={(e) => changePrice(e, 0)}
              required
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Medium"
              onChange={(e) => changePrice(e, 1)}
              required
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Large"
              onChange={(e) => changePrice(e, 2)}
              required
            />
          </div>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Extra</label>
          <div className={styles.extra}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="text"
              name="text"
              placeholder="Extras?"
              onChange={(e) => handleExtraInput(e)}
              required
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              name="price"
              placeholder="Price"
              onChange={(e) => handleExtraInput(e)}
              required
            />
            <button className={styles.extraBtn} onClick={handleExtra}>
              add
            </button>
          </div>
          <div className={styles.extraItems}>
            {extraOptions?.map((opt) => (
              <span key={opt.text} className={styles.extraItem}>
                {opt.text}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.create}>
          <button className={styles.createBtn} onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
