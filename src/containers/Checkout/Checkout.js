import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux'
class Checkout extends Component {

  checkoutContinuedHandler = () => {
    // console.log("checkoutContinuedHandler")
    this.props.history.replace('/checkout/contact-data')
  }
  checkoutCanceledHandler = () => {
    // console.log("checkoutCanceledHandler")
    this.props.history.goBack()
  }
  render() {
    return (
      <div>
        <CheckoutSummary ingredients={this.props.ingredients} onCheckoutContinued={this.checkoutContinuedHandler} onCheckoutCanceled={this.checkoutCanceledHandler} />
        <Route path={this.props.match.path + "/contact-data"} component={ContactData} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
  }
}

export default connect(mapStateToProps)(Checkout)