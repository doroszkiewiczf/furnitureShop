import React, {Component} from 'react';
import {Modal, Header, Card, Icon, Image} from 'semantic-ui-react'
import { NavLink } from "react-router-dom";
import pic from '../images/chlieb.jpg';

class FavouritesPage extends Component{

    constructor (x) {
        super (x);
        this.state={
          iconColor: 'grey'
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
                  Hello here
              {
                this.props.furnitures.map(item =>(
                (
                  <Modal size="tiny" trigger={
                   <Card style={{ width: '30%'}}>
                      <Image src={pic} size='large'/>
                       <Card.Content>
                         <Card.Header>{item.name}</Card.Header>

                         </Card.Content>

                    </Card>

                       } closeIcon>
                        <Modal.Header>{item.name}</Modal.Header>
                         <Modal.Content image>
                           <Modal.Description>
                             <Header>{item.category}</Header>
                             <p>{item.description}</p>
                             <p>Wymiary: {item.transform.x}x{item.transform.y}x{item.transform.z}</p>
                           </Modal.Description>
                        </Modal.Content>
                        </Modal>
              )
              )
                )}
          </Card.Group>  </div>
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