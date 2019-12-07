import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'

export class NavBar extends Component {

  logButton = () => {
    if(!this.props.token){
      return <Link to="/login" style={{color: "#343a40", textDecorationColor: "#929ca7"}}>Log In</Link>
    } else {
      return <a href="/" onClick={this.handleLogOut} style={{color: "#343a40", textDecorationColor: "#929ca7"}}>Log Out</a>
    }
  }
  handleLogOut = (e) => {
    e.preventDefault()
    this.props.handleLogOut()
  }

  render() {

    return (
      <nav style={{ 
        backgroundColor: "white", 
        position: "-webkit-sticky", 
        position: "sticky",
        top: "0", 
        borderBottom: "solid", 
        borderWidth: "1px", 
        borderColor: "#929ca7", 
        paddingBottom: "25px", 
        textAlign: "Center", 
        fontSize: "20px", 
        marginTop:"3%", 
        fontFamily: "Courier New, Monospace", 
        fontWeight: "100", 
        color: "#343a40", 
        display: "flex", 
        justifyContent: "space-around"}}>
        <Link to="/" style={{color: "#343a40", textDecorationColor: "#929ca7"}}>Rock {<img style={{width: "50px"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzUBT0EORU4YFpG7YJr8Vm3Pn6WqAYurrIN4Qy4KzBTEMR-_c3&s" alt="logo"/>} Shop</Link>
        <Link to="/rocks" style={{color: "#343a40", textDecorationColor: "#929ca7"}}>{!!localStorage.userId ? "Browse Rocks" : ""}</Link>
        <Link to={`/account`} style={{color: "#343a40", textDecorationColor: "#929ca7"}}>{!!localStorage.userId ? "My Account" : ""}</Link>
        <Link to="/cart" style={{color: "#343a40", textDecorationColor: "#929ca7"}}>{!!localStorage.userId ? "Cart: " + this.props.cartNum : ""}</Link>
        {this.logButton()}
      </nav>
    )
  }
}

export default NavBar;
