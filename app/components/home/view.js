import React, { Component, PropTypes } from 'react';
import DataGrid from 'react-datagrid';
import { Button } from 'react-bootstrap';
import 'react-datagrid/index.css';

import { CALCULATE_DISCOUNT, SORT_CHANGE, CHANGE_SELECTION, DISCOUNT_CHANGE, QUANTITY_CHANGE } from './actions';
import { getTotalCost, calculateDiscount } from './selectors';

export default class Home extends Component {
  
  changeDiscount(event) {
    const { dispatch } = this.props;
    const value = event.target.value;

    dispatch({ value, type: DISCOUNT_CHANGE });
  }

  changeQuantity(cellProps, event) {
    const { dispatch } = this.props;
    const valueNumber = event.target.value;
    const element = cellProps;

    dispatch({ value: {id: element.id, quantity: valueNumber}, type: QUANTITY_CHANGE });
  }

  renderColumns(dispatch) {
    const columns = [
      { name: 'name' },
      { name: 'description' },
      { name: 'price' },
      { name: 'quantity', title: 'Quantity', 
      render: (value, data, cellProps) => {return  <input type="number" min="0" defaultValue={value} 
      onChange={this.changeQuantity.bind(this, data)} /> } },
      { name: 'cost', title: 'Cost' }
    ];

    return columns;
  }

  render() {
    const { state, dispatch } = this.props;
    const { products, selectedProduct, sortInfo, discount } = state;
    const total = getTotalCost(state);
    const totalWithDiscount = calculateDiscount(state);

    return (
      <div>
        <DataGrid
          idProperty="id"
          columns={this.renderColumns(dispatch)}
          dataSource={products}
          sortInfo={sortInfo}
          selected={selectedProduct ? selectedProduct.id : null}
          onSelectionChange={(id) => dispatch({ type: CHANGE_SELECTION, id })}
          onSortChange={(sort) => dispatch({ type: SORT_CHANGE, sortInfo: sort })}
        />
        <div style={{ textAlign: 'right', paddingRight: 20 }}>
          <div>
            <label>Total Cost</label> <t />
            <input type="number" readOnly disabled value={total} />
          </div>
          <div>
            <label>Select value of discount in %</label> <t />
            <input type="number" min="0" value={discount} onChange={this.changeDiscount.bind(this)} />
          </div>
          <div>
            <label>Cost after discount</label> <t />
            <input type="number" readOnly disabled value={totalWithDiscount} />
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  state: PropTypes.object,
  dispatch: PropTypes.func
};