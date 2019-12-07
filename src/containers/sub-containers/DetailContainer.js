import React from 'react';
import {Redirect} from 'react-router-dom'

class DetailContainer extends React.Component {
    
    state = {
        redirect: false,
        value: 0
    }
    
    handleClick = () => {
        this.props.addToCart(this.props.rock)
        this.setState({
            redirect: true
        })
    }

    handleChange = (event) => {
        this.setState({value: event.target.value})
    }

    // showRock = () => {
    //     for (let i = 1; i < count+1; i++) {
    //         return <option>i</option> 
    //     }
    // }

    renderButton = () => {
        if (this.props.rock.quantity - this.props.rock.purchases.length === 0) {
            return <h1>SOLD OUT</h1>
        } else {
            return <button style={{fontSize: "18px", borderBottom: "solid", borderWidth: "1px", borderColor: "#929ca7", margin: "30px"}} onClick={this.handleClick} variant="primary">Add to Cart</button>
        }
    }
    
    render(){

        if (this.state.redirect) {
            return <Redirect to={'/cart'} />
        }

        let rock = this.props.rock;
        console.log(rock.purchases.length)

        return (
            <div style={{textAlign: "Center", fontFamily: "Courier New, Monospace", fontWeight: "100", color: "#343a40"}}>
                <h2 style={{margin: "25px"}}>{rock.name}</h2>
                <img width="700px" src={rock.image_url} alt={rock.name}/>
                <div>
                    <p style={{margin: "20px"}}>{rock.description}</p>
                    <h4>Type: {rock.category}</h4>
                    <h4>Color: {rock.color}</h4>
                    <h4>${rock.price}</h4>
                    <h4>Rating: {rock.rating}</h4>
                    <h4>Quantity: {rock.quantity - rock.purchases.length}</h4>

                    {/* <select value={this.state.value} onChange={this.handleChange}>
                        {this.showRock}
                    </select> */}

                    {this.renderButton()}
                </div>
            </div>
        )
    }
}

export default DetailContainer;
