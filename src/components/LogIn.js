import React from 'react';

class LogIn extends React.Component {
    
  state = {
    logIn: true,
    username: "",
    password: "",
    errors: []
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  logInSubmitted = (event) => {
    event.preventDefault()
    fetch("https://rock-shop-api.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    }).then(res => res.json())
      .then(data => {
        if (data.errors) {
          this.setState({
            errors: data.errors
          })
        } else {
          // debugger
          console.log(data)
          // this.props.setToken(data)
          fetch(`https://rock-shop-api.herokuapp.com/orders/${data.order_id}`)
          .then(r => r.json())
          .then(order => {
            let information = {
              token: data.token,
              user_id: data.user_id,
              order_id: data.order_id,
              purchases: order.purchases,
              total: data.total
            }
            this.props.setToken(information)
            // debugger
          })
        }
      })
  }

  signUpSubmitted = (event) => {
    event.preventDefault() 
    fetch("https://rock-shop-api.herokuapp.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({user:
        {username: this.state.username,
        password: this.state.password}
      })
    }).then(res => res.json())
      .then(data => {
        if (data.errors) {
          this.setState({
            errors: data.errors
          })
        } else {
          this.createEmptyOrder(data)
          // this.props.setToken(data)
        }
      })
  }

  createEmptyOrder = (data) => {
    fetch("https://rock-shop-api.herokuapp.com/orders", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({order: 
      { user_id: data.user_id,
        checkedout: false}    
      })
    }).then(res => res.json())
    .then(orderObj => {
      let stuff = {
        token: data.token,
        user_id: data.user_id,
        order_id: orderObj.id,
        token: data.token,
        total: 0
      }
      this.props.setToken(stuff)
    })
  }

  render(){
    return <div style={{textAlign: "Center", marginTop:"10%", fontFamily: "Courier New, Monospace", fontWeight: "100", color: "#343a40"}}>
      <ul>
        {
          this.state.errors.map(error => <li>{ error }</li>)
        }
      </ul>
      {
        this.state.logIn 
        ? 
        <section>
          <h2 >Log In</h2>
          <button style={{fontSize: "18px", borderBottom: "solid", borderWidth: "1px", borderColor: "#929ca7", margin: "20px"}} onClick={ () => this.setState({ logIn: false }) }>Switch to Sign Up</button>
          <br></br>
          <form onSubmit={ this.logInSubmitted }>
            <br></br>
            <label  htmlFor="log_in_username">Username</label>
            <br></br>
            <input  id="log_in_username" 
                    type="text" 
                    onChange={ this.onChange /* for controlled form input status */ } 
                    name="username" 
                    value={ this.state.username /* for controlled form input status */ } />
                    <br></br>
                    <br></br>
            <label  htmlFor="log_in_password">Password</label>
            <br></br>
            <input  id="log_in_password" 
                    type="password" 
                    onChange={ this.onChange } 
                    name="password" 
                    value={ this.state.password } />
                    <br></br><br></br>
            <input type="submit" />
          </form>
        </section>
        :
        <section>
          <h2>Sign Up</h2>
          <button style={{fontSize: "18px", borderBottom: "solid", borderWidth: "1px", borderColor: "#929ca7", margin: "20px"}} onClick={ () => this.setState({ logIn: true }) }>Switch to Log In</button>
          <br></br>
          <form onSubmit={ this.signUpSubmitted }>
          <br></br>
            <label  htmlFor="sign_up_username">Username</label>
            <br></br>
            <input  id="sign_up_username" 
                    type="text" 
                    onChange={ this.onChange } 
                    name="username" 
                    value={ this.state.username } />
                    <br></br><br></br>
            <label  htmlFor="sign_up_password">Password</label>
            <br></br>
            <input  id="sign_up_password" 
                    type="password" 
                    onChange={ this.onChange } 
                    name="password" 
                    value={ this.state.password } />
                    <br></br><br></br>
            <input type="submit" />
          </form>
        </section>
      }
    </div>
  }

}

export default LogIn;
