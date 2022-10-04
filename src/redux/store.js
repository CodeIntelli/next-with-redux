import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  adminProductEDReducer,
  AdminProductReducer,
  newProductReducer,
  newReviewReducer,
  productDetailReducer,
  productReducer,
} from "./Reducers/ProductReducer";
import {
  userReducer,
  profileReducer,
  forgotPasswordReducer,
  allUserReducer,
  userDetailsReducer,
} from "./Reducers/UserReducers";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailReducer,
  adminProduct: AdminProductReducer,
  newProduct: newProductReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  newReview: newReviewReducer,
  EditDelProduct: adminProductEDReducer,
  allUser: allUserReducer,
  userDetail: userDetailsReducer,
});

// if the value is in cart otherwise it will be blank and we can store cartitems in localstorage
let initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
