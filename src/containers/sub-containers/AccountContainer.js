import React from 'react';
import OrderCard from '../../components/OrderCard'
import EditUsername from '../../components/EditUsername'
import EditPassword from '../../components/EditPassword'
import DeleteUser from '../../components/DeleteUser'

class AccountContainer extends React.Component{
    state = {
        myOrders: []
    }
    componentDidMount = async () => {
        let rawUser = await fetch(`https://rock-shop-api.herokuapp.com/users/${localStorage.userId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.props.token
            }
            })
            let user = await rawUser.json()
            this.setState({
            myOrders: user.orders
            })
            console.log(this.state.myOrders)
        }
   
        pastOrders = () => {
            console.log(this.myOrders)
            return !!this.state.myOrders.length ? this.state.myOrders.filter(order => order.checkedout === true ) : false
        }

        myOrders = () => {
            return !!this.pastOrders() ? this.pastOrders().map(order => <OrderCard key={order.id} order={order} />) : "You have not placed any orders."
        }


    render(){
    return (
        <div style={{textAlign: "Center", marginTop:"3%", fontFamily: "Courier New, Monospace", fontWeight: "100", color: "#343a40"}}>
        <h3 style={{margin: "30px"}}>Edit Info</h3>
         <EditUsername />
         <EditPassword />
         <br></br>
         <h3>Past Orders</h3>
         {/* <div style={{margin: "30px"}}>{this.myOrders()}</div>  */}
         <p>{this.myOrders()}</p>
         <h3>Delete Account</h3>
         <DeleteUser />
        </div>
    )}
}

export default AccountContainer;
