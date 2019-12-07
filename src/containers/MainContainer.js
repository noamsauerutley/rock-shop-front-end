import React, { Component } from 'react';
import { CartContainer, DetailContainer, IndexContainer,  AccountContainer } from "./sub-containers";
import LogIn from '../components/LogIn';
import { Route, Switch, Redirect } from 'react-router-dom'


export class MainContainer extends Component {

    loginRender = () => {if (!!this.props.token) {return <Redirect to="/rocks" />} else return <Redirect to="/login"/>}
    
    render() {
        // console.log(this.props)
        return (
            <>
                {this.loginRender()}

                <Switch>
                    <Route exact path="/rocks" >
                        <IndexContainer sortRocks={this.props.sortRocks} displayRocks={this.props.displayRocks} filterRocksByCategory={this.props.filterRocksByCategory} />
                    </Route>

                    <Route path="/rocks/:id">
                        { this.renderRock } 
                    </Route> 

                    <Route path="/cart" >
                        <CartContainer removeFromCart={this.props.removeFromCart} clearCart={this.props.clearCart} token={this.props.token} loggedInUserId={this.props.loggedInUserId} total={this.props.total} currentCart={this.props.currentCart}/>
                    </Route>

                    <Route path="/login" >
                        {!!this.props.token ? <Redirect to="/rocks"/> : <LogIn setToken={this.props.setToken} />}
                    </Route>

                    <Route exact path="/account">
                        <AccountContainer token={this.props.token} loggedInUserId={this.props.loggedInUserId}/>    
                    </Route> 

                    <Route exact path='/'> 
                    {!!this.props.token ? <Redirect to="/rocks"/> : <LogIn setToken={this.props.setToken} />}
                    </Route>
                </Switch>
            </>
        )
    }

    renderRock = (renderParams) => {
        // console.log(renderParams)
        const id = parseInt(renderParams.match.params.id)
        // this will render a rock
        const theRock = this.props.displayRocks.find(rock => rock.id === id)
        return <DetailContainer addToCart={this.props.addToCart} rock={ theRock } />
    }
}

export default MainContainer;
