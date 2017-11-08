import React, { Component, PropTypes } from 'react';
import DataGrid from 'react-datagrid';
import { Button } from 'react-bootstrap';
import 'react-datagrid/index.css';

import { CALCULATE_DISCOUNT, SORT_CHANGE, CHANGE_SELECTION, DISCOUNT_CHANGE } from './actions';

const columns = [
  { name: 'name' },
  { name: 'description' },
  { name: 'price' },
  { name: 'discountValue', title: 'Discount value'}
];

export default class Home extends Component {

  changeDiscount(event) {
    const { dispatch } = this.props;
    const value = event.target.value;

    dispatch({ value, type: DISCOUNT_CHANGE });
  }

  render() {
    const { state, dispatch } = this.props;
    const { products, selectedProduct, sortInfo, discount } = state;

    return (
      <div>
        <DataGrid
          idProperty="id"
          columns={columns}
          dataSource={products}
          sortInfo={sortInfo}
          selected={selectedProduct ? selectedProduct.id : null}
          onSelectionChange={(id) => dispatch({ type: CHANGE_SELECTION, id })}
          onSortChange={(sort) => dispatch({ type: SORT_CHANGE, sortInfo: sort })}
        />
        <label>Select value of discount in %</label> <t />
        <input type="number" min="0" value={discount} onChange={this.changeDiscount.bind(this)} />
        <br />
        <Button bsStyle="primary" onClick={() => dispatch({ type: CALCULATE_DISCOUNT })}> Calculate discount </Button>
      </div>
    );
  }
}

Home.propTypes = {
  state: PropTypes.object,
  dispatch: PropTypes.func
};
