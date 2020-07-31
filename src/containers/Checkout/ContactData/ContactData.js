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
        value: "",
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        }
      },
      street: {
        elementType: 'input',
        value: "",
        elementConfig: {
          type: 'text',
          placeholder: 'Your Street'
        }
      },
      zipCode: {
        elementType: 'input',
        value: "",
        elementConfig: {
          type: 'text',
          placeholder: 'Your Zip Code'
        }
      },
      country: {
        elementType: 'input',
        value: "",
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country'
        }
      },
      address: {
        elementType: 'input',
        value: "",
        elementConfig: {
          type: 'text',
          placeholder: 'Your Address'
        }
      },
      email: {
        elementType: 'input',
        value: "",
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
      },
      deliveryMethod: {
        elementType: 'select',
        value: "",
        elementConfig: {
          options: [{ value: 'fastest', displayValue: 'Fastest' },
          { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        }
      }
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

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm }
    const updatedFormEl = { ...updatedOrderForm[inputIdentifier] }
    updatedFormEl.value = event.target.value
    updatedOrderForm[inputIdentifier] = updatedFormEl
    this.setState({ orderForm: updatedOrderForm })
  }


  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }
    return (
      <div className="ContactData">
        <h4>Enter your contact data</h4>
        {this.state.loading
          ? <Spinner />
          : <form className="w-100">
            {/* <InputElement elementType="..." elementConfig="..." value="..." /> */}
            {formElementsArray.map(formElement => (
              <InputElement
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
            ))}
            <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
          </form>
        }
      </div>
    )
  }
}

export default ContactData