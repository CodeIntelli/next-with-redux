import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import style from "../../styles/ProductDetails.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../redux/Actions/ProductAction";
import ReviewCard from "./ReviewCard";
// import { useAlert } from "react-alert";
// import { addItemToCart } from "../../Actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../redux/Constants/ProductConstant";

import { useRouter } from "next/router";
import axios from "axios";
const ProductDetails = ({ product, loading }) => {
  const router = useRouter();
  const { id } = router.query;
  const pid = id;
  const dispatch = useDispatch();
  // const alert = useAlert();

  //* here product details comes from store.js
  // const { product, loading, error } = useSelector(
  //   (state) => state.productDetails
  // );
  // const { success, error: reviewError } = useSelector(
  //   (state) => state.newReview
  // );

  const options = {
    size: "large",
    value: 3,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product?.Stock <= quantity) {
      return;
    }
    const qty = quantity + 1;
    setQuantity(qty);
  };
  const decreaseQuantity = () => {
    if (1 >= quantity) {
      return;
    }
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    // dispatch(addItemToCart(pid, quantity));
    // alert.success("Items Added To Cart");
  };
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };
  let reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", pid);
    dispatch(newReview(myForm));
    submitReviewToggle();
    // window.location.reload();
  };
  // React.useEffect(() => {
  //   if (error) {
  //     dispatch(clearErrors());
  //   }
  //   if (reviewError) {
  //     dispatch(clearErrors());
  //   }
  //   if (success) {
  //     dispatch({ type: NEW_REVIEW_RESET });
  //   }
  //   dispatch(getProductDetails(pid));
  // }, [dispatch, pid, error, reviewError, success]);

  return (
    <>
      {loading ? (
        <h1>Loading ....</h1>
      ) : (
        <>
          <div className={style.ProductDetails}>
            <div>
              <Carousel>
                {product?.images &&
                  product?.images.map((item, i) => (
                    <img
                      className={style.CarouselImage}
                      key={item.url}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div>
              <div className={style.detailsBlock_1}>
                <h2>{product?.name}</h2>
                <p>Product #{product?._id}</p>
              </div>
              <div className={style.detailsBlock_2}>
                <Rating {...options} />
                <span className={style.detailsBlock_2_span}>
                  {" "}
                  ({product?.numOfReviews} Reviews)
                </span>
              </div>
              <div className={style.detailsBlock_3}>
                <h1>{`₹${product?.price}`}</h1>
                <div className={style.detailsBlock_3_1}>
                  <div className={style.detailsBlock_3_1_1}>
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly value={quantity} type="number" />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    className={style.submitReview}
                    onClick={addToCartHandler}
                    disabled={product?.Stock < 1 ? true : false}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b
                    className={
                      product?.Stock < 1 ? style.redColor : style.greenColor
                    }
                  >
                    {product?.Stock < 1 ? "OutOfStock" : `InStock`}
                    <span>
                      {product?.Stock > 5
                        ? ""
                        : `  Hurry Up Only ${product?.Stock} left`}
                    </span>
                  </b>
                </p>
              </div>

              <div className={style.detailsBlock_4}>
                Description : <p>{product?.description}</p>
              </div>

              <button
                onClick={submitReviewToggle}
                className={style.submitReview}
              >
                Submit Review
              </button>
            </div>
          </div>

          <h3 className={style.reviewsHeading}>Reviews</h3>

          <Dialog
            aria-labelledby="Simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className={style.submitDialog}>
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />
              <textarea
                className={style.submitDialogTextArea}
                cols="30"
                rows="5"
                value={comment}
                placeholder="Add your Precious View On this product"
                onChange={(e) => setComment(e.target.value)}
              />
            </DialogContent>{" "}
            <DialogActions>
              <Button onClick={submitReviewToggle}>Cancel</Button>
              <Button onClick={reviewSubmitHandler}>Submit</Button>
            </DialogActions>
          </Dialog>

          {product?.reviews && product?.reviews[0] ? (
            <div className={style.reviews}>
              {product?.reviews &&
                product?.reviews.map((review) => (
                  <ReviewCard review={review} key={review._id} />
                ))}
            </div>
          ) : (
            <p className={style.noReviews}>No Reviews Yet</p>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;

export async function getServerSideProps(props) {
  const { id } = props.query;
  const pid = id;

  const { data } = await axios.get(
    `http://localhost:5000/api/v1/product/${pid}`
  );
  return { props: { product: data.product, loading: false } };
}
