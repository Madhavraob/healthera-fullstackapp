import * as types from "./actionTypes";
import * as quoteApi from "../../api/quoteApi";

export function createQuoteSuccess(payload) {
  return { type: types.CREATE_QUOTE_SUCCESS, payload };
}

export function loadQuotesSuccess(payload) {
  return { type: types.LOAD_QUOTES_SUCCESS, payload };
}

export function create(quote) {
  return function (dispatch) {
    return quoteApi
      .create(quote)
      .then(newQuote => {
        dispatch(createQuoteSuccess(newQuote));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function getByPatientId(id) {
  return function (dispatch) {
    return quoteApi
      .getByPatientId(id)
      .then(quote => {
        if (quote) {
          dispatch(loadQuotesSuccess(quote));
        }
      })
      .catch(error => {
        throw error;
      });
  };
}
