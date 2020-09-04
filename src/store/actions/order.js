import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  }
}

export const purchaseBurgerFailed = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error: error
  }
}

export const purchaseBurgerStart = (orderData) => {
  return dispatch => {
    axios.post('/orders.json', orderData).then(res => {
      // this.props.history.push('/')
      dispatch(purchaseBurgerSuccess(res.data, orderData))
    }
    ).catch(err => {
      dispatch(purchaseBurgerFailed(err))
    })
  }
}