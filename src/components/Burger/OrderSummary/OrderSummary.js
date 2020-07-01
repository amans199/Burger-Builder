import React from 'react';
import Aux from '../../../hoc/Auxiliary'
import Button from '../../UI/Button/Button'
const orderSummary = (props) => {
  const ingredientsSummary = Object.keys(props.ingredients).map(igkey => {
    return <li key={igkey}><span style={{ textTransform: 'capitalize' }}>{igkey}</span>:{props.ingredients[igkey]}</li>
  })
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A burger with the following ingredients</p>
      <ul>
        {ingredientsSummary}
      </ul>
      <p><strong>Total : </strong>{props.price.toFixed(2)}</p>
      <div>
        <Button clicked={props.purchaseCanceled} btnType="Danger" clicked={props.purchaseCanceled}>Cancel</Button>
        <Button clicked={props.purchaseCanceled} btnType="Success" clicked={props.purchaseContinued}>Continue</Button>
      </div>
    </Aux>
  )
}

export default orderSummary;