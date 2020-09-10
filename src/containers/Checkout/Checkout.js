import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
class Checkout extends Component {
  // componentWillMount() {
  //   this.props.onInitPurchase()
  // }
  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data')
  }
  checkoutCanceledHandler = () => {
    this.props.history.goBack()
  }
  render() {
    let summary = <Redirect to="/" />
    if (this.props.ingredients) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary ingredients={this.props.ingredients} onCheckoutContinued={this.checkoutContinuedHandler} onCheckoutCanceled={this.checkoutCanceledHandler} />
          <Route path={this.props.match.path + "/contact-data"} component={ContactData} />
        </div>

      )
    }
    return summary
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
}
// const mapDispatchToProps = dispatch => {
//   return {
//     onInitPurchase: () => { dispatch(actions.purchaseInit()) }
//   }
// }

export default connect(mapStateToProps)(Checkout)