import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

export class SideBar extends Component {

    state = {
        value: ''
    }
    
    handleChange = (event) => {
        this.setState({value: event.target.value})
        this.props.filterRocks(event.target.value)
    }
    
    render() {
        return (
            <div>
                <h4>Categories</h4>
                <NavLink to="/rocks">
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="All">All</option>
                        <option value="Metamorphic">Metamorphic</option>
                        <option value="Sedimentary">Sedimentary</option>
                        <option value="Special">Special</option>
                        <option value="Danger">Danger</option>
                        <option value="Boring">Boring</option>
                        <option value="Fancy">Fancy</option>
                        <option value="Igneoous">Igneoous</option>
                    </select>
                </NavLink>
            </div>
        )
    }
}

export default SideBar;