import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import Button from '../../UI/Button/Button'
class OrderSummary extends Component {
  render() {
    const ingredientsSummary = Object.keys(this.props.ingredients).map(igkey => {
      return <li key={igkey}><span style={{ textTransform: 'capitalize' }}>{igkey}</span>:{this.props.ingredients[igkey]}</li>
    })
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A burger with the following ingredients</p>
        <ul>
          {ingredientsSummary}
        </ul>
        <p><strong>Total : </strong>{this.props.price.toFixed(2)}</p>
        <div>
          <Button clicked={this.props.purchaseCanceled} btnType="Danger">Cancel</Button>
          <Button clicked={this.props.purchaseCanceled} btnType="Success">Continue</Button>
        </div>
      </Aux >
    )
  }
}

export default OrderSummary;