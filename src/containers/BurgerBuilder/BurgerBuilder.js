import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const ingredientPrices = {
  lettuce: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

// handle state of burger
class BurgerBuilder extends Component {
  state = {
      ingredients: {
        lettuce: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4,
    readyToPurchase: false,
    purchasing: false
  }

  // method to update the readyToPurchase state. ingredient state is passed into this function
  updatePurchaseState = ( ingredients ) => {
    // turn ingredients object into an array of values
    const sum = Object.keys(ingredients).map(igKey => {
      // return value of given key (accessing a certain property on the ingredients object, and getting its numeric value)
      return ingredients[igKey]
    })
    // use reduce to turn array into a single sum of values
      .reduce((sum, element) => {
        return sum + element
      }, 0)
    this.setState({ readyToPurchase: sum > 0 })
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    const updatedCount = oldCount + 1
    // update ingredients
    const updatedIngredients = {
      ...this.state.ingredients
    }
    // access the type that needs updating in the new updatedIngredients object and set value (amount of ingredients) equal to updatedCount
    updatedIngredients[type] = updatedCount

    // updating price for individual ingredients
    const priceAddition = ingredientPrices[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice + priceAddition

    // setting the state:
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
    // to be sure we are passing in the most updated state of ingredients, we must pass in updatedIngredients
    this.updatePurchaseState(updatedIngredients)

  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    // check if we have ingredients to remove (aka no negative values)
    if (oldCount <= 0) {
      return
    }

    const updatedCount = oldCount - 1
    const updatedIngredients = {
      ...this.state.ingredients
    }

    updatedIngredients[type] = updatedCount

    // updating price for individual ingredients
    const priceDeduction = ingredientPrices[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice - priceDeduction

    // setting the state:
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
    this.updatePurchaseState(updatedIngredients)
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true })
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    alert('You Continued!')
  }

  render() {
    // rendering buttons disabled
    const disabledInfo = {
      ...this.state.ingredients
    }
    // loop over each key in the disabledInfo object
    for (let key in disabledInfo) {
      // check returns true or false; if true, disable the user's ability to remove further ingredients of that type
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    // { lettuce: true, meat: true, ...}
    // pass ingredients state to burger
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClose={this.purchaseCancelHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchase={this.state.readyToPurchase}
          ordered={this.purchaseHandler}
          />
     </Aux>
    )
  }
}

export default BurgerBuilder
