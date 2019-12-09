import React from 'react'

class EditUsername extends React.Component{

    state = {
        username: "",
    }

    editUsername = async (newUsername) => {
        await fetch(`https://rock-shop-api.herokuapp.com/users/${localStorage.userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.token
            },
            body: JSON.stringify({user:{
              username: newUsername}
            })
        })
        alert("Your username has been updated.")
    }

    onChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        })
      }

      handleChangeUsername = event => {
        event.preventDefault()
        this.editUsername(this.state.username)
    }
    render(){
        return(
            <form onSubmit={this.handleChangeUsername}>
            <label style={{margin: "20px"}}>Username:</label>
            <input
              type="text"
              autoComplete="new-username"
              onChange={ this.onChange /* for controlled form input status */ } 
              name="username" 
              value={ this.state.username /* for controlled form input status */ } 
            />
            <input type="submit" style={{fontSize: "18px", border: "solid", borderWidth: "1px", borderColor: "#929ca7", margin: "20px", padding: "5px"}} />
          </form>  
        )
    }
}

export default EditUsername