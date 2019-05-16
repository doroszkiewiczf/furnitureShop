import React, {Component} from 'react';
import {Modal, Header} from 'semantic-ui-react'
import { NavLink } from "react-router-dom";

class FavouritesPage extends Component{

    onClick(){

    }
    render(){
        if (this.props.furnitures){
            return(
                <div>  
                <div>
                    <h3> Twoje ulubione meble: </h3>
                </div>
                    {  
                    this.props.furnitures.map(item =>(
                    (
                        <Modal key={item.id} trigger={
                            <div className="App__ItemInfo">
                            <span>Numer: {item.name}<br/></span>
                            <span>Kategoria: {item.category}<br/></span>
                            <span>{item.name}<br/></span>
                            </div>
                            } closeIcon>
                            <Modal.Header>Witam</Modal.Header>
                            <Modal.Content image>
                                <Modal.Description>
                                <Header>{item.name}</Header>
                                <p>{item.category}</p>
                                <p>{item.description}</p>
                                </Modal.Description>
                            </Modal.Content>
                            </Modal>
                    )  
                    )
                    )}
                </div>
            )
        }
        else{
            return(
                <div>
                    <h3> Brak ulubionych mebli - niezalogowany </h3>
                    <NavLink className="NavBarItem" to="/login" >Zaloguj</NavLink>
                </div>
            )
        }
    }
}
export default FavouritesPage;