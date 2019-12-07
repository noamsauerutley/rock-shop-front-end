import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

const style = {
    margin: "10px",
    position: "fixed",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    fontFamily: "Courier New, Monospace", 
    fontWeight: "100", 
    color: "#343a40", 
    textAlign: "center"
    // justifyContent: "space-around"
  }

export class SideBar extends Component {

    state = {
        value: '',
        sortedRocks: []
    }
    
    handleCategoryChange = (event) => {
        this.setState({value: event.target.value})
        this.props.filterRocksByCategory(event.target.value)
    }

    alphabetSort = async () =>{
        await this.setState({
            sortedRocks: [...this.props.displayRocks].sort((a, b) => {
                if(a.name < b.name) { return -1; }
                if(a.name > b.name) { return 1; }
                return 0;
            })
        })
        this.props.sortRocks(this.state.sortedRocks)
    }
   lowPriceSort = async () =>{
        await this.setState({
            sortedRocks: [...this.props.displayRocks].sort((a, b) => {
                if(a.price < b.price) { return -1; }
                if(a.price > b.price) { return 1; }
                return 0;
            })
        })
        this.props.sortRocks(this.state.sortedRocks)
    }
    highPriceSort = async () =>{
        await this.setState({
            sortedRocks: [...this.props.displayRocks].sort((a, b) => {
                if(a.price > b.price) { return -1; }
                if(a.price < b.price) { return 1; }
                return 0;
            })
        })
        this.props.sortRocks(this.state.sortedRocks)
    }

    ratingSort = async () =>{
        await this.setState({
            sortedRocks: [...this.props.displayRocks].sort((a, b) => {
                if(a.rating > b.rating) { return -1; }
                if(a.rating < b.rating) { return 1; }
                return 0;
            })
        })
        this.props.sortRocks(this.state.sortedRocks)
    }
    rareSort = async () =>{
        await this.setState({
            sortedRocks: [...this.props.displayRocks].sort((a, b) => {
                if(a.quantity < b.quantity) { return -1; }
                if(a.quantity > b.quantity) { return 1; }
                return 0;
            })
        })
        this.props.sortRocks(this.state.sortedRocks)
    }
    
    render() {
        return (
            <div style={style}>
                <h4 style={{marginTop: "50px", marginBottom: "30px"}}>Categories:</h4>
                <label>Filter:</label>
                <NavLink to="/rocks" style={{marginBottom: "20px"}}>
                    <select value={this.state.value} onChange={this.handleCategoryChange}>
                        <option value="All">All</option>
                        <option value="Metamorphic">Metamorphic</option>
                        <option value="Sedimentary">Sedimentary</option>
                        <option value="Special">Special</option>
                        <option value="Dangerous">Dangerous</option>
                        <option value="Boring">Boring</option>
                        <option value="Fancy">Fancy</option>
                        <option value="Igneous">Igneous</option>
                    </select>
                </NavLink>
                <label>Sort By:</label>
                <button style={{fontSize: "18px", borderBottom: "solid", borderWidth: "1px", borderColor: "#929ca7", margin: "20px"}}  onClick={this.alphabetSort}>Name</button>
                <button style={{fontSize: "18px", borderBottom: "solid", borderWidth: "1px", borderColor: "#929ca7", margin: "20px"}}  onClick={this.lowPriceSort}>Low Price</button>
                <button style={{fontSize: "18px", borderBottom: "solid", borderWidth: "1px", borderColor: "#929ca7", margin: "20px"}}  onClick={this.highPriceSort}>High Price</button>
                <button style={{fontSize: "18px", borderBottom: "solid", borderWidth: "1px", borderColor: "#929ca7", margin: "20px"}}  onClick={this.ratingSort}>Rating</button>
                <button style={{fontSize: "18px", borderBottom: "solid", borderWidth: "1px", borderColor: "#929ca7", margin: "20px"}}  onClick={this.rareSort}>Rarity</button>

            </div>
        )
    }
}

export default SideBar;
