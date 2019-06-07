import React, {Component} from 'react';
import {Modal, Header, Card, Icon, Image} from 'semantic-ui-react'
import { NavLink } from "react-router-dom";
import pic from '../images/chlieb.jpg';
import IconForm from '../forms/IconForm'
import categoryDot from '../images/categoryDot.png'


class FavouritesPage extends Component{

    constructor (x) {
        super (x);
        this.state={
          iconColor: 'blue'
        }
      }
    


    render(){
      var furnitures = JSON.parse(window.sessionStorage.getItem('user')).furnitures;
        if (furnitures !== 'undefined' && furnitures.length > 0){
          return(
            <div><Card.Group>
                {
                  JSON.parse(window.sessionStorage.getItem('user')).furnitures.map(item =>(
                    <Modal size="small" key={item.id} dimmer='blurring' trigger={
                      <Card className="ItemList_CardStyle">
                        <div className = "IconFormClass">
                          <IconForm furniture={item} furnitureId={item.id} favPage={true} size={"large"}/>
                        </div>
                        
                          <img className = "imageHere"
                            src={"http://localhost:8080/downloadFile/"+ item.icon} 
                            />
                          <Card.Content>
                            <Card.Header>{item.name}</Card.Header>
      
                            </Card.Content>
                      </Card>
      
                          } closeIcon>
                          <Modal.Header className = "ItemList_ModalHeader">
                          <div className = "ItemList_ModalHeaderIcon">
                          </div>
                          <div className = "ItemList_ModalHeaderText">
                          {item.name}
                          </div>
                          <div className = "DataPage_AccountContainer">
                          
                          </div>
                              
                          {/*
                            <div className = "ItemList_ModalHeaderText">
                            <IconForm style = {{width: "50px"}}furniture={item} furnitureId={item.id} favPage={false}/>
                              {item.name}
                            </div>*/}
                            
                          </Modal.Header>
                            <Modal.Content image>
                              <Modal.Description className="ItemList_ModalDesc">
                                <Header>
                                  {/*<div className = "ItemList_CategoryText">
                                    <img className = "ItemList_CategoryIcon"
                                      src={categoryDot} 
                                    />
                                      {" " + item.category}
                                  </div>*/}
                                </Header>
                                <div className = "ItemList__DescText">
                                  <p className = "ItemList_ModalDescText" style={{marginLeft: "20px", lineHeight: "17px"}}>{item.description}</p>
                                </div>
                                <p className = "ItemList_ModalDescText ItemList_ModalDescText--Bottom"><strong>Dimensions: </strong>{item.transform.x}x{item.transform.y}x{item.transform.z}cm</p>
                              </Modal.Description>
      
                              <Image verticalAlign='middle' className="ItemList_ModalImage" wrapped size='medium' src={"http://localhost:8080/downloadFile/"+ item.icon} />
      
                          </Modal.Content>
                          </Modal>
                )
                  )}
            </Card.Group>  </div>
            )
        }
        else{
            return(
                <div >
                    <h3 className = "ItemList_ModalHeaderText"> Brak ulubionych mebli</h3>
                </div>
            )
        }
    }
}
export default FavouritesPage;