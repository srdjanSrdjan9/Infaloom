export const getState = state => state;

export const getTotalCost = state => state.products.reduce((prev, curr) => { return  prev + curr.cost }, 0);

export const calculateDiscount = state => getTotalCost(state) * (100 - state.discount) / 100;