import React, { Component } from 'react';
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
import './Orders.css'
class orders extends Component {
  state = {
    orders: [],
    loading: true
  }
  componentDidMount() {
    axios.get('/orders.json').then(res => {
      const fetchedOrders = []
      for (let key in res.data) {
        fetchedOrders.push({
          ...res.data[key],
          id: key
        })
      }
      this.setState({ loading: false, orders: fetchedOrders })
      // console.log(fetchedOrders)
    }).catch(res => {
      this.setState({ loading: false })

    })
  }
  render() {
    return (
      <div className="Orders">
        {this.state.orders.map(order => (
          <Order key={order.id} ingredients={order.ingredients} price={+order.price} />
        ))}
      </div>
    )
  }
}


export default withErrorHandler(orders, axios)