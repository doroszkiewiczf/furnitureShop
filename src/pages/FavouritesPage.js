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
    
      handleClick (){
        this.setState({
          iconColor: 'blue'
        })
      }
    
      addToFavorite = (e) =>{
        e.stopPropagation();
        console.log('nie triggeruje modala');
        this.setState({
          iconColor: 'blue'
        })
    
      }

    render(){
        if (this.props.furnitures){
          return(
            <div><Card.Group>
                {
                  JSON.parse(window.sessionStorage.getItem('user')).furnitures.map(item =>(
                    <Modal size="tiny" key={item.id} trigger={
                      <Card className="ItemList_CardStyle">
                        <div>
                          <IconForm furniture={item} furnitureId={item.id} favPage={true}/>
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
                      <div className = "ItemList_ModalHeaderText">
                        {item.name}
                      </div> 
                        </Modal.Header>
                          <Modal.Content image>
                            <Modal.Description className="ItemList_ModalDesc">
                              <Header>
                                <div className = "ItemList_CategoryText">
                                  <img className = "ItemList_CategoryIcon"
                                    src={categoryDot} 
                                  />
                                    {" " + item.category}
                                </div>
                              </Header>
                              <div className = "ItemList_ModalDescText">
                                <p><strong>Wymiary:</strong>{item.transform.x}x{item.transform.y}x{item.transform.z}cm</p>
                                <span><strong>Opis:</strong></span>
                                <p style={{marginLeft: "20px", lineHeight: "17px"}}>{item.description}</p>
                              </div>
                            </Modal.Description>
                            <Image className="ItemList_ModalImage" wrapped size='medium' src={"http://localhost:8080/downloadFile/"+ item.icon} />
                        </Modal.Content>
                      </Modal>
                )
                  )}
            </Card.Group>  </div>
            )
        }
        else{
            return(
                <div>
                    <h3> Brak ulubionych mebli</h3>
                </div>
            )
        }
    }
}
export default FavouritesPage;