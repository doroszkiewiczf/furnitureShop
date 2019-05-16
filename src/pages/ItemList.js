import React, {Component} from 'react';
import {Modal, Header, Card, Icon, Image} from 'semantic-ui-react'
import pic from '../images/chlieb.jpg'

class ItemList extends Component{

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

  addToFavorite (e){
    e.stopPropagation();
    console.log('nie triggeruje modala');

  };

    onClick(){

    }
    render(){
        return(
          <div><Card.Group>
              {
                this.props.furnitures.map(item =>(
                this.props.category === item.category&&
                (


                  <Modal trigger={
                   <Card style={{ width: '30%'}}>
                      <Image src={pic} size='large'/>
                       <Card.Content>
                         <Card.Header>{item.name}</Card.Header>

                         </Card.Content>
                           <Card.Content extra>
                             <a>
                               <Icon style={{color:this.state.iconColor}} onClick={this.addToFavorite} name='favorite' size='large'/>
                             </a>
                           </Card.Content>
                    </Card>

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
          </Card.Group>  </div>
          )
          }
          }
export default ItemList;
