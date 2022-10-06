import React from "react";
import { Rating } from "@material-ui/lab";
import style from "../../styles/ProductDetails.module.css";
// import profilePng from "../../Images/Profile.png";
const ReviewCard = ({ review }) => {
  const options = {
    size: "large",
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <>
      <div className={style.reviewCard}>
        <img
          src={`https://www.w3schools.com/howto/img_avatar.png`}
          alt="User"
        />
        <p className={style.textCapitalize}>{review.name}</p>
        <Rating {...options} />
        <span className={style.reviewCardComment}>{review.comment}</span>
      </div>
    </>
  );
};

export default ReviewCard;
