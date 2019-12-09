import React from 'react'

class EditPassword extends React.Component{

    state = {
        password: "",
        }
    

    editPassword = async (newPassword) => {
        await fetch(`https://rock-shop-api.herokuapp.com/users/${localStorage.userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.token
            },
            body: JSON.stringify({user:{
            password: newPassword}
            })
            })
            this.setState({
                password: ""
            })
            alert("Your password has been updated.")
    }

    onChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        })
      }

    handleChangePassword = event => {
        event.preventDefault()
        this.editPassword(this.state.password)
    }
    render(){
        return(
            <form onSubmit={this.handleChangePassword}>
         <label style={{margin: "20px"}}>Password:</label>      
        <input
          type="password"
          value={this.state.password}
          onChange={this.onChange}
          name="password"
          autoComplete="new-password"
        />
        <input type="submit" style={{fontSize: "18px", border: "solid", borderWidth: "1px", borderColor: "#929ca7", margin: "20px", padding: "5px"}} />
      </form>
        )
    }
}

export default EditPassword