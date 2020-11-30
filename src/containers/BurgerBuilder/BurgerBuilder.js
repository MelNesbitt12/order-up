import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const ingredientPrices = {
  lettuce: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

// handle state of burger
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    readyToPurchase: false,
    purchasing: false,
    loading: false,
    error: false
  }

  // dynamically setting our ingredients object from the back-end
  componentDidMount() {
    axios.get('https://order-up-10c9a.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ ingredients: response.data })
      })
      .catch(error => {
        this.setState({ error: true })
      })
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
    // alert('You Continued!')
    this.setState({ loading: true })
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Mel Nesbitt',
        address: {
          street: '1 Test Street',
          country: 'United States'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    }
    // pass order object as a second argument to post request
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false, purchasing: false })
      })
      .catch(error => {
        this.setState({ loading: false, purchasing: false })
      })
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

    let orderSummary = null
    let burger = this.state.error ? <p>Ingredients cannot be loaded</p> : <Spinner />

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchase={this.state.readyToPurchase}
          ordered={this.purchaseHandler}/>
        </Aux>
      )
      orderSummary = <OrderSummary
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          />
    }

    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClose={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
     </Aux>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios)
