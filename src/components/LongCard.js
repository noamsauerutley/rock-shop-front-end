import React, { Component } from 'react';

export class LongCard extends Component {

    handleClick = () => {
        this.props.removeFromCart(this.props.cartItem)
    }

    render() {
        console.log(this.props.cartItem)
        return (<>
            <li style={{justifyContent: "space-around", margin: "20px"}} >
                {<img src={this.props.cartItem.rock.image_url} alt={this.props.cartItem.rock.name} width="75px"/>}
                <span style={{margin: "20px"}}>{this.props.cartItem.rock.name}</span>
                <span style={{margin: "20px"}}>${this.props.cartItem.rock.price}</span>
                <span style={{margin: "20px"}}>Quantity: 1</span>
                <button style={{ fontSize: "18px", borderBottom: "solid", borderWidth: "1px", borderColor: "#929ca7", margin: "20px"}} onClick={this.handleClick}>Remove</button>
            </li>
            
            </>
        )
    }
}
// testing
export default LongCard;
