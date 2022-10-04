import React from "react";
import { Rating } from "@material-ui/lab";
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
      <div className="productCard" href="home">
        <img src={products.images[0].url} alt={products.name} />
        <p>{products.name}</p>
        <div>
          <Rating {...options} />
          <span className="productCardSpan">({products.numOfReviews}) </span>
        </div>
        <span className="product_price">
          ₹{products.price}{" "}
          <span className="discount_price">₹{discount_price}</span>
        </span>
      </div>
    </>
  );
};

export default ProductCard;
