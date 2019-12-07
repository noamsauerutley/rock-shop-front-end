import React from 'react';
import LongCard from '../../components/LongCard'
import { Redirect } from 'react-router-dom'


class CartContainer extends React.Component {

    state = {
        redirect: false
    }

    handleCheckout = () => {
        if (this.props.loggedInUserId) {
            this.checkout()
        } else {
            this.setState({
                redirect: true
            })
        }
    }

    checkout = () => {
        let completedOrder
        let newOrder
        fetch(`http://localhost:3000/orders/${localStorage.orderId}`, {
            method: "PATCH",
            headers: {
                "Authorization": this.props.token.toString(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({order:{
                checkedout: true}
            })
        })
        .then(r => r.json())
        .then(data => {
            this.props.clearCart()
            completedOrder = data
            fetch("http://localhost:3000/orders", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({order: 
                { user_id: localStorage.userId,
                    checkedout: false}    
                })
            })
            .then(res => res.json())
            .then(orderObj => {
                newOrder = orderObj
                console.log(newOrder)
                // newOrder gets sent to App.js to setState
                console.log(completedOrder)
                // completedOrder is used to render a 'Completed Order' component
            })
        })
    }

    // CHECKOUT FUNCTION TO CLEAR CART AND PATCH ORDER WITH 'TRUE' CHECKOUT VALUE
    // --------------------------------------------------------------------------
    // checkout = async () => {
    //     let rawCheckout = await fetch("http://localhost:3000/orders", {
    //         method: "POST",
    //         headers: {
    //             "Authorization": this.props.token.toString(),
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             user_id: this.props.loggedInUserId
    //         })
    //     })
    //     let order = await rawCheckout.json()
    //     this.props.currentCart.forEach(item => {
    //         this.addPurchasesToCheckout(order.id, item.id)
    //     })
    //     this.props.clearCart()
    // }

    // PREVIOUS 'CREATE PURCHASES' FUNCTION AFTER 'ORDER' IS CREATED
    // -------------------------------------------------------------
    // addPurchasesToCheckout = async (order_id, item_id) => {
    //     let rawPurchase = await fetch('http://localhost:3000/purchases', {
    //         method: "POST",
    //         headers: {
    //             "Authorization": this.props.token.toString(),
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             order_id: order_id,
    //             rock_id: item_id,
    //             quantity: 1
    //         })
    //     })
    //     let purchase = await rawPurchase.json()
    //     console.log(purchase)
    // }

    cartItems = () => {
        if(this.props.currentCart.length < 1){
            return <p style ={{
                marginTop: "20%",
                fontFamily: "Courier New, Monospace", 
                fontWeight: "100", 
                fontSize: "18px",
                color: "#343a40", 
                textAlign: "center",
                justifyContent: "space-around"
            }}>
                There are no items in your cart at this time.
                </p>
        } else{
            return   <div style={{textAlign: "Center", marginTop:"10%", fontFamily: "Courier New, Monospace", fontWeight: "100", color: "#343a40"}}>
            <li style={{   
                margin: "175px", 
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                fontFamily: "Courier New, Monospace", 
                fontWeight: "100", 
                fontSize: "18px",
                color: "#343a40", 
                textAlign: "left",
                justifyContent: "space-around",
                listStyle: "none"
                }}>
                {this.props.currentCart.map(item => <LongCard removeFromCart={this.props.removeFromCart} key={item.id} cartItem={item} />)}
            </li>
            <h2>Total: ${this.props.total}</h2>
            <button style={{fontSize: "18px", borderBottom: "solid", borderWidth: "1px", borderColor: "#929ca7", margin: "20px"}} onClick={this.handleCheckout}>Checkout</button> 
            </div>
        }  
    }

    render(){

        if (this.state.redirect) {
            return <Redirect to={'/login'} />
        }
        
        return (<>
          {this.cartItems()}
          </>
        )
    }
}

export default CartContainer;
