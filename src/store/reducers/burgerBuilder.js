import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utility'
const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
}

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.3,
  meat: 1.2
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      // this just another structured way to create the object 
      const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
      const updatedIngredients = updatedObject(state.ingredients, updatedIngredient)
      const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      }
      return updatedObject(state, updatedState)
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      }
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        // ingredients: action.ingredients,
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false
      }
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      }
    default:
      return state
  }
}

export default reducer