import React from "react";
import { Rating } from "@material-ui/lab";
import style from "../styles/Product.module.css";
import Link from "next/link";

const ProductCard = ({ products }) => {
  const ratings_star = products.ratings;
  console.log(products);

  const options = {
    size: "large",
    value: ratings_star,
    readOnly: true,
    precision: 0.5,
  };
  // how much discount_percentage we want to give Admin define here
  let discount = (Number(products.price) * 40) / 100;
  let discount_price = discount + Number(products.price);

  return (
    <>
      <div className={style.productCard}>
        <img src={products.images[0].url} alt={products.name} />
        <Link href={`product/${products._id}`}>
          <p
            style={{ cursor: "pointer", fontWeight: "bold", fontSize: "20px" }}
          >
            {products.name}
          </p>
        </Link>
        <div>
          <Rating {...options} />
          <span className={style.productCardSpan}>
            ({products.numOfReviews}){" "}
          </span>
        </div>
        <span className={style.product_price}>
          ₹{products.price}{" "}
          <span className={style.discount_price}>₹{discount_price}</span>
        </span>
      </div>
    </>
  );
};

export default ProductCard;
