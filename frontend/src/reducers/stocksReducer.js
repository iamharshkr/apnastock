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

export const stockList = (state = { stocks: {} }, action) => {
  switch (action.type) {
    case GET_STOCKS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_STOCKS_SUCCESS:
      return {
        loading: false,
        stocks: action.payload,
      };
    case GET_STOCKS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const stockDetails = (state = { stock: {} }, action) => {
  switch (action.type) {
    case GET_STOCK_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_STOCK_DETAILS_SUCCESS:
      return {
        loading: false,
        stock: action.payload.data,
      };
    case GET_STOCK_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const topStocks = (state = { gainer: {}, loser: {} }, action) => {
  switch (action.type) {
    case GET_TOP_STOCKS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_TOP_STOCKS_SUCCESS:
      return {
        loading: false,
        gainers: action.payload.data.gainers,
        losers: action.payload.data.losers,
      };
    case GET_TOP_STOCKS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const searchStocks = (state = { result: {} }, action) => {
  switch (action.type) {
    case SEARCH_STOCKS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_STOCKS_SUCCESS:
      return {
        loading: false,
        results: action.payload,
      };
    case SEARCH_STOCKS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
