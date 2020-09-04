import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import './ContactData.css'
import axios from '../../../axios-orders'
import InputElement from '../../../components/UI/Input/Input'
import { connect } from 'react-redux'
import withErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler'
import * as actions from '../../../store/actions/index'
class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        value: "",
        valid: false,
        touched: false,
        validation: {
          required: true
        },
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
      },
      street: {
        elementType: 'input',
        value: "",
        valid: false,
        touched: false,
        validation: {
          required: true
        },
        elementConfig: {
          type: 'text',
          placeholder: 'Your Street'
        }
      },
      zipCode: {
        elementType: 'input',
        value: "",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        elementConfig: {
          type: 'text',
          placeholder: 'Your Zip Code'
        }
      },
      country: {
        elementType: 'input',
        value: "",
        valid: false,
        touched: false,
        validation: {
          required: true
        },
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country'
        }
      },
      address: {
        elementType: 'input',
        value: "",
        valid: false,
        touched: false,
        validation: {
          required: true
        },
        elementConfig: {
          type: 'text',
          placeholder: 'Your Address'
        }
      },
      email: {
        elementType: 'input',
        value: "",
        valid: false,
        touched: false,
        validation: {
          required: true
        },
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
      },
      deliveryMethod: {
        elementType: 'select',
        value: "cheapest",
        valid: true,
        elementConfig: {
          options: [{ value: 'fastest', displayValue: 'Fastest' },
          { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        }
      }
    },
    formIsValid: false,
  }
  orderHandler = (event) => {
    event.preventDefault();
    // this.setState({ loading: true })
    const formData = {}
    for (let formElId in this.state.orderForm) {
      formData[formElId] = this.state.orderForm[formElId].value
    }
    //for future ref : you have to calc the price on the server to prevent the users from manipulating the prices
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    }
    this.props.onOrderBurger(order)
    // this.setState({ loading: false })

  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm }
    const updatedFormEl = { ...updatedOrderForm[inputIdentifier] }
    updatedFormEl.value = event.target.value
    updatedFormEl.valid = this.checkValidatiy(updatedFormEl.value, updatedFormEl.validation)
    updatedFormEl.touched = true
    updatedOrderForm[inputIdentifier] = updatedFormEl
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid })
  }


  checkValidatiy = (value, rules) => {
    let isValid = true;
    if (rules) {
      if (rules.required) {
        isValid = value.trim() !== '' && isValid
      }

      if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
      }

      if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
      }
    }
    return isValid
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
        {this.props.loading
          ? <Spinner />
          : <form className="w-100" onSubmit={this.orderHandler}>
            {/* <InputElement elementType="..." elementConfig="..." value="..." /> */}
            {formElementsArray.map(formElement => (
              <InputElement
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched} />
            ))}
            <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
          </form>
        }
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    price: state.totalPrice,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))