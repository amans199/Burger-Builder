import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import './ContactData.css'
import axios from '../../../axios-orders'

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }
  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true })
    //for future ref : you have to calc the price on the server to prevent the users from manipulating the prices
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'ahmed mansour',
        address: 'testing adddressssssss',
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    }
    this.setState({ loading: false })
    axios.post('/orders.json', order).then(res => {
      this.setState({ loading: false })
      this.props.history.push('/')
    }
    ).catch(err => {
      console.log(err)
    })
  }
  render() {
    return (
      <div className="ContactData">
        <h4>Enter your contact data</h4>
        {this.state.loading
          ? <Spinner />
          : <form>
            <input type="text" name="name" placeholder="Your email" />
            <input type="email" name="email" placeholder="Your Email" />
            <input type="text" name="street" placeholder="Your street" />
            <input type="text" name="postal" placeholder="Your postal code" />
            <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
          </form>
        }
      </div>
    )
  }
}

export default ContactData