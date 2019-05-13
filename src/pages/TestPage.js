import React, {Component} from 'react';
import {Modal, Header} from 'semantic-ui-react'

class TestPage extends Component{
    
    render(){
        return(
          <Modal trigger={
            <div className="App__ItemInfo">
              <span>Numer: {"asd"}<br/></span>
              <span>Kategoria: {"item.category"}<br/></span>
              <span>{"item.name"}<br/></span>
            </div>
            } closeIcon>
              <Modal.Header>Witam</Modal.Header>
              <Modal.Content image>

                <Modal.Description>
                  <Header>Witam2</Header>
                  <p></p>
                  <p>opis</p>
                </Modal.Description>
              </Modal.Content>
            </Modal>
                    

        )
    }
}
export default TestPage;