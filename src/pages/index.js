import Product from "./product-cart";
import React from "react";
import styles from "../styles/Product.module.css";
import { clearErrors, getProduct } from "../redux/Actions/ProductAction";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const Home = ({ products, loading }) => {
  // const { loading, error, products } = useSelector(
  //   (state) => state.products || {}
  // );

  // const dispatch = useDispatch();
  // React.useEffect(() => {
  //   if (error) {
  //     dispatch(clearErrors());
  //   }
  //   dispatch(getProduct());
  // }, [dispatch]);
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className={styles.banner}>
            <p>Welcome to ecommerce!</p>
            <h1>FIND AMAZING PRODUCT BELOW</h1>
            <a href="#container">
              <button>Scroll</button>
            </a>
          </div>
          <div suppressHydrationWarning>
            {process.browser ? "browser" : "server"}
          </div>

          <h2 className={styles.homeHeading}>Featured Product</h2>
          <div className={styles.container} id="container">
            {products &&
              products.map((products) => (
                <Product key={products._id} products={products} />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;

export async function getServerSideProps(context) {
  // Pass data to the page via props
  let link = `http://localhost:5000/api/v1/product`;
  const { data } = await axios.get(link);
  console.log(
    "🚀 ~ file: index.js ~ line 53 ~ getServerSideProps ~ data",
    data
  );
  return { props: { products: data.product } };
}
