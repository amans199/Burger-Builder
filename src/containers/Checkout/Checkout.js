import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      bacon: 1,
      cheese: 1
    }
  }
  checkoutContinuedHandler = () => {
    console.log("checkoutContinuedHandler")
    this.props.history.goBack()
  }
  checkoutCanceledHandler = () => {
    console.log("checkoutCanceledHandler")
    this.props.history.replace('/checkout/contact-data')

  }
  render() {
    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients} onCheckoutContinued={this.checkoutContinuedHandler} onCheckoutCanceled={this.checkoutCanceledHandler} />
      </div>
    )
  }
}

export default Checkout