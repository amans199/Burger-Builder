import React, { Component } from 'react';
import { connect } from 'react-redux'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import './Auth.css'
import * as Actions from '../../store/actions/index'
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
    },
    isSignUp: true
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

  sumbitHandler = (event) => {
    event.preventDefault()
    this.props.onAuth(this.state.controls.email, this.state.controls.password, this.state.isSignUp)
  }


  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp }
    })
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
        <form onSubmit={this.sumbitHandler}>
          {form}
          <Button btnType="Success">{this.state.isSignUp ? 'Register' : 'Sign In'}</Button>
        </form>
        <Button clicked={this.switchAuthModeHandler} btnType="Danger">{this.state.isSignUp ? 'you have an account ? try Sign In' : 'you don\'t have an account ? try Registering'}</Button>

      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(Actions.auth(email, password, isSignUp))
  }
}


export default connect(null, mapDispatchToProps)(Auth)