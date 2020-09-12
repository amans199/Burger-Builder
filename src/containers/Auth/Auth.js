import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import './Auth.css'
class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        value: "",
        valid: false,
        touched: false,
        validation: {
          required: true,
          isEmail: true
        },
        elementConfig: {
          type: 'email',
          placeholder: 'email address'
        },
      },
      password: {
        elementType: 'input',
        value: "",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        },
        elementConfig: {
          type: 'password',
          placeholder: 'password'
        },
      },
    }
  }


  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidatiy(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    }
    this.setState({ controls: updatedControls })
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
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      })
    }

    const form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched} />
    ))
    return (
      <div className="Auth">
        <form>
          {form}
          <Button btnType="Success">Submit</Button>
        </form>
      </div>
    )
  }
}

export default Auth