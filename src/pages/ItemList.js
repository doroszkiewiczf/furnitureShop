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
  setFurnitureFav = (furniture) => {
    
    
    var furnitList = this.state.furnituresList;
    console.log("Setting furniture favourite");
    console.log(furniture.favourite)
    console.log(this.state.furnituresList)
    furnitList.map(function (item){
      if (furniture.id == item.id){
        furniture.name = "THE BEST PRACTICE DESCR" ;
      }
    });
    console.log("Setting furniture favourite");
    console.log(furnitList)
    this.setState({
      furnituresList: furnitList
    })
  }
  reload = () => {
    console.log("CLOSING")
    //window.location.reload();
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
              <Modal size="small" 
              key={item.id} 
              dimmer='blurring' 
              onClose = {this.reload}
              trigger={
                <Card className="ItemList_CardStyle">
                  <div className = "IconFormClass">
                    <IconForm furniture={item} furnitureId={item.id} favPage={false} size={"large"}/>
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
                          <p className = "ItemList_ModalDescText ItemList_ModalDescText--NoPadding" style={{marginLeft: "5px"}}><strong>Dimensions: </strong>{item.transform.x}x{item.transform.y}x{item.transform.z}cm</p>
                        </Modal.Description>

                        <Image verticalAlign='middle' className="ItemList_ModalImage" wrapped size='medium' src={"http://localhost:8080/downloadFile/"+ item.icon} />

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