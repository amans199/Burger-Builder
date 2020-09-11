import React, { Component } from 'react';
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
import './Orders.css'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'
class orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders()
  }
  render() {
    let orders = <Spinner />
    if (!this.props.loading) {
      orders = this.props.orders.map(order => (
        <Order key={order.id} ingredients={order.ingredients} price={order.price} />
      ))
    }
    return (
      <div className="Orders">
        {orders}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => { actions.fetchOrders() }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios))