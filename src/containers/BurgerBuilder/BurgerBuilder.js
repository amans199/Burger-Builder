import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.3,
  meat: 1.2
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
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
    this.setState({ purchaseable: sum > 0 })
  }
  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice + priceAddition
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice - priceAddition
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
    this.updatePurchaseState(updatedIngredients);
  }
  purchaseHandler = () => {
    this.setState({ purchasing: true })
  }
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }
  purchaseContinueHandler = () => {
    this.setState({ loading: true })
    //for future ref : you have to calc the price on the server to prevent the users from manipulating the prices
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'ahmed mansour',
        address: 'testing adddressssssss',
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order).then(res => console.log(res)).catch(err => {
      console.log(err)
      // this settimeout is just for showing the spinner and testing purposes 
      setTimeout(() => {
        this.setState({ loading: false, purchasing: false })
      }, 100);
    }).finally(() => {
      setTimeout(() => {
        this.setState({ loading: false, purchasing: false })
      }, 100);
    })
  }
  componentDidMount() {
    axios.get('https://burger-builder-amans199.firebaseio.com/ingredients.json').then(res => {
      this.setState({ ingredients: res.data })
    }).catch(err => {
      this.setState({ error: true })
      // console.log(err)
    })
  }
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {!this.state.loading && this.state.ingredients
            ? <OrderSummary ingredients={this.state.ingredients}
              purchaseCanceled={this.purchaseCancelHandler}
              purchaseContinued={this.purchaseContinueHandler}
              price={this.state.totalPrice} />
            : <Spinner error={this.state.error} />}
        </Modal>
        {this.state.ingredients
          ? <Burger ingredients={this.state.ingredients} />
          : <Spinner error={this.state.error} />}
        {this.state.ingredients
          ? <BuildControls ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchaseable={this.state.purchaseable}
            ordered={this.purchaseHandler} />
          : null}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios)