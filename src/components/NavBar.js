import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import logo from '../assets/mstile-150x150.png'

export class NavBar extends Component {

  logButton = () => {
    if(!this.props.token){
      return <Link to="/login" style={{color: "#343a40", textDecorationColor: "#929ca7", marginTop: "22px"}}>Log In</Link>
    } else {
      return <a href="/" onClick={this.handleLogOut} style={{color: "#343a40", textDecorationColor: "#929ca7", marginTop: "22px"}}>Log Out</a>
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
        <Link to="/" style={{color: "#343a40", textDecorationColor: "#929ca7"}}>Rock{<img src={logo} style={{width: "75px"}} alt="logo"/>}Shop</Link>
        <Link to="/rocks" style={{color: "#343a40", textDecorationColor: "#929ca7", marginTop: "22px"}}>{!!localStorage.userId ? "Browse Rocks" : ""}</Link>
        <Link to={`/account`} style={{color: "#343a40", textDecorationColor: "#929ca7", marginTop: "22px"}}>{!!localStorage.userId ? "My Account" : ""}</Link>
        <Link to="/cart" style={{color: "#343a40", textDecorationColor: "#929ca7", marginTop: "22px"}}>{!!localStorage.userId ? "Cart: " + this.props.cartNum : ""}</Link>
        {this.logButton()}
      </nav>
    )
  }
}

export default NavBar;
