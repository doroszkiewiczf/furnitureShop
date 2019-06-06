import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Icon} from 'semantic-ui-react';
import {Button, Modal, Message} from 'semantic-ui-react';

class IconForm extends Component{

  constructor(){
    super();

    this.state = {
        iconColor: 'gray',
        currentFurniture: ''
    };
  }

  componentDidMount(){
    console.log("Loggin furniture prop");
    let furniture = this.props.furniture;
    console.log(furniture);
    console.log(this.props.furnitureId + "furniture id")
    this.setState({
      currentFurniture: furniture
    })
    if (this.props.furniture.favourite || this.props.favPage){
      this.setState({
        iconColor: 'blue'
      })
    }
    console.log("current furniture");
    console.log(this.state.currentFurniture);
  }

  addToFavorite = (e) =>{
    e.stopPropagation();
    let color;
    let user = JSON.parse(window.sessionStorage.getItem('user'));
    let furniture = this.state.currentFurniture;
    if (this.state.iconColor === 'gray'){
      color = 'blue';

      console.log("Dane mebla do wysłania:");
      console.log(user.id);
      console.log(this.props.furniture.id);

      var favData = {
        "userId": user.id,
        "furnitureId": this.props.furniture.id
      }
      fetch("http://localhost:8080/userFurniture/add", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': JSON.parse(window.sessionStorage.getItem('user')).authData
      },
      body:  JSON.stringify(favData)
      })
      .then(function(response){
        return response.json();
      })
      .then(function(favData){
        console.log("Dodano nowy ulubiony mebel")
        console.log(favData)
        user.furnitures.push(furniture);
        window.sessionStorage.setItem('user', JSON.stringify(user));
        console.log(user);
        
        });
    }else{
      color = "gray";
      console.log("Dane mebla do usunięcia:");
      console.log(user.id);
      console.log(this.props.furniture.id);

      var favData = {
        "userId": user.id,
        "furnitureId": this.props.furniture.id
      }
      fetch("http://localhost:8080/userFurniture/delete", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': JSON.parse(window.sessionStorage.getItem('user')).authData
      },
      body:  JSON.stringify(favData)
      })
      .then(function(response){
        return response;
      })
      .then(function(favData){
        console.log("Usunięeto ulubiony mebel")
        console.log(favData)
        var index = user.furnitures.findIndex(x => x.id === furniture.id);
        console.log("Usuwany indeks mebla");
        console.log(index);
        if (index > -1) {
          user.furnitures.splice(index, 1);
        }
        window.sessionStorage.setItem('user', JSON.stringify(user));
        console.log(user);
        
        });
    }
    this.setState({
      iconColor: color
    })
  }

   

    render(){
        return(
            <Icon style={{color:this.state.iconColor}} onClick={this.addToFavorite} name='favorite' size='large'/>
        )
    }
}
export default IconForm;