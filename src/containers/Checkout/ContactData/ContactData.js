import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import './ContactData.css'
import axios from '../../../axios-orders'
import InputElement from '../../../components/UI/Input/Input'
class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        }
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Street'
        }
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Zip Code'
        }
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country'
        }
      },
      address: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Address'
        }
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [{ value: 'fastest', displayValue: 'Fastest' },
          { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        }
      },
      loading: false
    }
  }
  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true })
    //for future ref : you have to calc the price on the server to prevent the users from manipulating the prices
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,

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
          : <form className="w-100">
            <InputElement elementType="..." elementConfig="..." value="..." />
            <InputElement label="Your Email" inputype="input" type="email" name="email" placeholder="Your Email" />
            <InputElement label="Your street" inputype="input" type="text" name="street" placeholder="Your street" />
            <InputElement label="Your postal code" inputype="input" type="text" name="postal" placeholder="Your postal code" />
            <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
          </form>
        }
      </div>
    )
  }
}

export default ContactData