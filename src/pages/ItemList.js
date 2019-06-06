import React, {Component} from 'react';
import {Modal, Header, Card, Icon, Image} from 'semantic-ui-react'
import pic from '../images/chlieb.jpg'
import IconForm from '../forms/IconForm'
import { relative } from 'upath';
import categoryDot from '../images/categoryDot.png'

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
              <Modal size="small" key={item.id} trigger={
                <Card className="ItemList_CardStyle">
                  <div>
                    <IconForm furniture={item} furnitureId={item.id}/>
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

          )
            )}
      </Card.Group>  </div>
      )
      }



}
export default ItemList;