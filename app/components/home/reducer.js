import sorty from 'sorty';

import {
  CALCULATE_DISCOUNT,
  DISCOUNT_CHANGE,
  DATA_FAILED,
  DATA_RECEIVED,
  CHANGE_SELECTION,
  REFRESH_DATASET,
  SORT_CHANGE
} from './actions';

import { sideEffect } from 'redux-side-effects';
import { service } from './service'

import {
  Product,
  Status,
  products
} from './model';

const initialState = {
  selectedProduct: null,
  discount: 10,
  products: products,
  status: '',
  sortInfo: null
};

function sort(sortInfo, arr) {
  return sorty(sortInfo, arr);
}

export function* init() {
  return {
    ...initialState,
    status: 'pending'
  };
}

function* reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SORT_CHANGE: {
      return {
        ...state,
        sortInfo: action.sortInfo,
        data: sort(action.sortInfo, state.products)
      };
    }
    case CHANGE_SELECTION: {
      const selected = state.products.find(x => x.id === action.id);
      return {
        ...state,
        selectedProduct: selected
      };
    }
    case CALCULATE_DISCOUNT: {
      let products = state.products;

      products.forEach(x => {
        if (state.selectedProduct && x.id == state.selectedProduct.id) {
          // state.selectedProduct.price = (state.selectedProduct.price * (100 - state.discount)) / 100;
          x.discountValue = x.price * state.discount / 100; 
          x.price = (x.price * (100 - state.discount)) / 100;
          
        }
      });

      return {
        ...state,
        products
      }
    }
    case DISCOUNT_CHANGE: {
      return {
        ...state,
        discount: action.value
      };
    }
  };
}

export default reducer;
