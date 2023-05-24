import axios from "axios";
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  CLEAR_ERROR,
} from "../constants/productConstants";

export const getProduct =
  (keyword = "", currentPage = 1, price = [0, 25000], category, rating = 0) =>
  async (dispatch) => {
    let PATH = `/api/v1/products?page=${currentPage}&keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${rating}`;

    if (category) {
      PATH = `/api/v1/products?page=${currentPage}&keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`;
    }

    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });
      const { data } = await axios.get(PATH);
      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//clearing errors
export const clearError = () => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
