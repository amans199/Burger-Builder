import React from 'react';
// import classes from './Burger.css'
import './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';
const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
    return [...Array(props.ingredients[igKey])].map((_, i) => {
      return <BurgerIngredient key={igKey + i} type={igKey} />
    })
  }).reduce((arr, el) => {
    return arr.concat(el)
  }, [])
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients</p>
  }
  return (
    <div className="Burger">
      <BurgerIngredient type="bread-top" />
      {/* <BurgerIngredient type="meat" /> */}
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  )
}
export default burger;