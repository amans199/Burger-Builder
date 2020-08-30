import React, { Component } from 'react';
import { connect } from 'react-redux'

import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
// import * as actionTypes from '../../store/actions'
import * as burgerBuilderActions from '../../store/actions/index'



class BurgerBuilder extends Component {
  state = {
    // ingredients: null,
    // totalPrice: 4,
    // purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  }
  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients).map(igkey => {
      return ingredients[igkey];
    }).reduce((sum, el) => {
      return sum + el;
    }, 0)
    return sum > 0
  }
  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type]
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   }
  //   updatedIngredients[type] = updatedCount
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice
  //   const newPrice = oldPrice + priceAddition
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
  //   this.updatePurchaseState(updatedIngredients);
  // }

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type]
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   }
  //   updatedIngredients[type] = updatedCount
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice
  //   const newPrice = oldPrice - priceAddition
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
  //   this.updatePurchaseState(updatedIngredients);
  // }
  purchaseHandler = () => {
    this.setState({ purchasing: true })
  }
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }
  purchaseContinueHandler = () => {
    this.props.history.push('/checkout')
  }
  componentDidMount() {
    console.log(this.props)
    // axios.get('https://burger-builder-amans199.firebaseio.com/ingredients.json').then(res => {
    //   this.setState({ ingredients: res.data })
    // }).catch(err => {
    //   this.setState({ error: true })
    // })
  }
  render() {
    const disabledInfo = {
      ...this.props.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {!this.state.loading && this.props.ingredients
            ? <OrderSummary ingredients={this.props.ingredients}
              purchaseCanceled={this.purchaseCancelHandler}
              purchaseContinued={this.purchaseContinueHandler}
              price={this.props.price} />
            : <Spinner error={this.state.error} />}
        </Modal>
        {this.props.ingredients
          ? <Burger ingredients={this.props.ingredients} />
          : <Spinner error={this.state.error} />}
        {this.props.ingredients
          ? <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchaseable={this.updatePurchaseState(this.props.ingredients)}
            ordered={this.purchaseHandler} />
          : null}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    price: state.totalPrice,

  }
}
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredientName) => dispatch(
      burgerBuilderActions.addIngredient(ingredientName)
    ),
    onIngredientRemoved: (ingredientName) => dispatch(
      burgerBuilderActions.removeIngredient(ingredientName)
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))