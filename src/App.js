import React from 'react';
// import './App.css';
import HeaderContainer from "./containers/HeaderContainer";
import MainContainer from "./containers/MainContainer";
import { Redirect } from 'react-router-dom'


class App extends React.Component {
  state = {
    token:  localStorage.token,
    loggedInUserId: null,
    cart: [],
    allRocks: [],
    displayRocks: [],
    orderId: null,
    total: 0,
    redirect: false
  }

  componentDidMount = async() => {
    let rawRocks = await fetch('http://localhost:3000/rocks')
    let rocks = await rawRocks.json() 
      this.setState({
        token: localStorage.token,
        loggedInUserId: localStorage.userId,
        allRocks: rocks,
        displayRocks: rocks
      })
  }

  setToken = ({ token, user_id, order_id, purchases, total }) => {
    // console.log(token)
    // console.log(user_id)
    // console.log(order_id)
    console.log(purchases)

    localStorage.token = token
    localStorage.userId = user_id
    localStorage.orderId = order_id

    this.setState({
      token: token,
      loggedInUserId: user_id,
      orderId: order_id,
      cart: !!purchases ? purchases : [],
      total: total
    })
  }

  logOutClick = () => {
    localStorage.userId = ""
    localStorage.token = ""

    this.setState({
      loggedInUserId: null,
      token: null
    })
    
  }

  filterRocksByCategory = (value) => {
    if (value === 'All') {
      this.setState({
        displayRocks: this.state.allRocks
      })
    } else {
      this.setState({
        displayRocks: this.state.allRocks.filter(rock => rock.category === value)
      })
    }
  }

  sortRocks = (sortedRocks) => {
    this.setState({
      displayRocks: sortedRocks
    })
  }

  addToCart = (rock) => {
    // console.log(rock)
    // this.setState({
    //   cart: [...this.state.cart, rock],
    //   total: this.state.total + rock.price
    // })
    localStorage.cart = this.state.cart.map(item => item.id )
    if (this.state.loggedInUserId) {
      fetch('http://localhost:3000/purchases', {
        method: "POST",
        headers: {
          "Authorization": this.state.token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({purchase: {
          rock_id: rock.id,
          order_id: localStorage.orderId,
          quantity: 1
        }})
      })
      .then(r => r.json())
      .then(purchase => {
        this.setState({
          cart: [...this.state.cart, purchase],
          total: this.state.total + purchase.rock.price
        })
      })
    }
  }

  clearCart = () => {
    this.setState({
      cart: [],
      total: 0
    })
  }

  removeFromCart = (purchase) => {
    fetch(`http://localhost:3000/purchases/${purchase.id}`, {
        method: 'DELETE'
    })
    .then(() => {
      this.setState({
        cart: this.state.cart.filter(item => item.id !== purchase.id),
        total: this.state.total - purchase.rock.price
      })
    })
  }

  render() {
    return (
      <React.Fragment >
        <HeaderContainer handleLogOut={this.logOutClick} token={this.state.token} cartNum={this.state.cart.length}/>
        <MainContainer removeFromCart={this.removeFromCart} sortRocks={this.sortRocks} filterRocksByCategory={this.filterRocksByCategory} clearCart={this.clearCart} addToCart={this.addToCart} setToken={this.setToken} token={this.state.token} loggedInUserId={this.state.loggedInUserId} displayRocks={this.state.displayRocks} total={this.state.total} currentCart={this.state.cart}/>
      </React.Fragment>
    )
  }
  
}

export default App;
 