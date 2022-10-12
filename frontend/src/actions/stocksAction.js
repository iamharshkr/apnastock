import axios from "axios";
import {
  CLEAR_ERRORS,
  GET_STOCKS_FAIL,
  GET_STOCKS_REQUEST,
  GET_STOCKS_SUCCESS,
  GET_STOCK_DETAILS_FAIL,
  GET_STOCK_DETAILS_REQUEST,
  GET_STOCK_DETAILS_SUCCESS,
  GET_TOP_STOCKS_FAIL,
  GET_TOP_STOCKS_REQUEST,
  GET_TOP_STOCKS_SUCCESS,
  SEARCH_STOCKS_FAIL,
  SEARCH_STOCKS_REQUEST,
  SEARCH_STOCKS_SUCCESS,
} from "../contsants/stocksConstant";

export const getStockList = () => async (dispatch) => {
  try {
    dispatch({ type: GET_STOCKS_REQUEST });

    const { data } = await axios.get("/api/stocks-list");
    dispatch({
      type: GET_STOCKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_STOCKS_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const getStockDetails = (symbol, opt) => async (dispatch) => {
  try {
    dispatch({ type: GET_STOCK_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/stock/${symbol}?opt=${opt}`);

    dispatch({
      type: GET_STOCK_DETAILS_SUCCESS,
      payload: data[0],
    });
  } catch (error) {
    dispatch({
      type: GET_STOCK_DETAILS_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const getTopStocks = () => async (dispatch) => {
  try {
    dispatch({ type: GET_TOP_STOCKS_REQUEST });

    const { data } = await axios.get(`/api/top-gainer`);

    dispatch({
      type: GET_TOP_STOCKS_SUCCESS,
      payload: data[0],
    });
  } catch (error) {
    dispatch({
      type: GET_TOP_STOCKS_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const getSearchStocks = (key) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_STOCKS_REQUEST });

    const { data } = await axios.get(`/api/search/${key}`);

    dispatch({
      type: SEARCH_STOCKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SEARCH_STOCKS_FAIL,
      payload: error.response.data[0].error,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_ERRORS });
  } catch (error) {
    console.log(error);
  }
};
