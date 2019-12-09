import React from 'react';

class DeleteUser extends React.Component{

    delete = async () => {
        await fetch(`https://rock-shop-api.herokuapp.com/users/${localStorage.userId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.token
            }
        })
    } 

    render(){
        return(
            <button style={{fontSize: "18px", borderBottom: "solid", borderWidth: "1px", borderColor: "#929ca7", margin: "20px", marginBottom: "50px"}}  onClick={this.delete}>Delete</button>
        )
    }
}

export default DeleteUser