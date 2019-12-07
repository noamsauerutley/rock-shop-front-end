import React, { Component } from 'react';
import NavBar from '../components/NavBar'

export class HeaderContainer extends Component {
    render() {
        return (
            <>
                <NavBar handleLogOut={this.props.handleLogOut} token={this.props.token} cartNum={this.props.cartNum}/>
            </>
        )
    }
}

export default HeaderContainer;
