import React, {Component} from 'react';
import {Modal, Header, Card, Icon, Image} from 'semantic-ui-react'
import pic from '../images/chlieb.jpg'
import IconForm from '../forms/IconForm'

class ItemList extends Component{

  constructor () {
    super ();
    this.state={
      user: '',
      furnituresList: []
    }
  }

  componentDidMount(){
    var user = JSON.parse(window.sessionStorage.getItem('user'));

    var furnitures = this.props.furnitures;
      for (var i = 0; i < furnitures.length ; i++){
        furnitures[i].favourite = false;
        user.furnitures.map(function (favFurniture){
          if (furnitures[i].id === favFurniture.id){
            furnitures[i].favourite = true;
          }
        });
        furnitures[i].description = "test desc";
      }
    this.setState({
      furnituresList: furnitures
    })
  }

  render(){
    var user = this.state.user

    return(
      <div><Card.Group>
          {
            this.state.furnituresList.map(item =>(
            this.props.category === item.category&&
            (
              <Modal size="tiny" key={item.id} trigger={
                <Card style={{ width: '30%'}}>
                  <div>
                    <IconForm isFavourite={item.favourite}/>
                  </div>
                  
                    <img className = "imageHere"
                      src={"http://localhost:8080/downloadFile/"+ item.icon} 
                      />
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



}
export default ItemList;