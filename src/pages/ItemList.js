import React, {Component} from 'react';
import {Modal, Header} from 'semantic-ui-react'

class ItemList extends Component{

    onClick(){

    }
    render(){
        return(
            <div>  
                {
                  this.props.furnitures.map(item =>(
                  this.props.category === item.category&&
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
}
export default ItemList;