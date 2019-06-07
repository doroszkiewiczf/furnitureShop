import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import { SideNav, Nav as NavSide} from 'react-sidenav'
import styled from "styled-components";
import ItemPage from './ItemPage';
import LoginPage from './LoginPage';
import ItemList from './ItemList';
import TestPage from './TestPage';
import InfoPage from './InfoPage';
import FavouritesPage from './FavouritesPage'
import AccountPage from './AccountPage';
import {Button, Popup, Modal, Header, Icon, Message} from 'semantic-ui-react';
import MebelAddForm from '../forms/MebelAddForm';
import { LinkContainer} from "react-router-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import {withRouter} from 'react-router-dom';
import localStorage from 'local-storage';
import sessionStorage from 'session-storage';
import axios from 'axios';
import logo from '../images/Logotyp.png';
import QRCode from '../images/QR_code.jpg'
import accountIcon from '../images/Account.png'
import googlePlay from '../images/googleplay.png'
import logoutIcon from '../images/logout.png'

const AppContainer = styled.div`\
  display: flex;
  height: 100%;
  width: 100%;
  height: calc(100vh - 40px);
`;

const theme = {
  selectionColor: "transparent",
  selectionBgColor: "transparent"
  //hoverBgColor: "#00BCD4",
  //padding: "1px, 1px, 1px, 1px"
};

class DataPage extends Component{

  constructor(){
    super();

    this.state = {
      furnitures: [],
      categories: [],
      testAttr: 'TESTOWOWOWO',
      isLoaded: false,
      isLogged: false,
      loggedUser: '',
      selectedPath: '',
      isFormOpened: false,
      modalOpen: false,
      infoModalOpened: false
    };

  }

  onItemSelection = (arg) => {
    this.setState({ selectedPath: arg.path });
    console.log('/furnitures/category/' + this.state.categories[arg.id])
    window.sessionStorage.setItem('currentCategory', arg.path);
    this.props.history.push('/furnitures/category/'+ this.state.categories[arg.id]);
  }

  handleClick = () => this.setState({ isFormOpened: !this.state.isFormOpened })

  handleClose = () => this.setState({ modalOpen: false })

  handleInfoModalClose = () => this.setState({ infoModalOpened: false})

  handleInfoModalClick = () => this.setState({ infoModalOpened: !this.state.infoModalOpened})

  handleChange = e =>{

  }
  handleSubmit = e => {
  }

  loginUser = (user) => {
    this.setState({ isLogged: true})
  }
  logMeOut = () => {

  }



  submitFurniture = (data) => {
    console.log(data)
    console.log("------=====TRYING TO SEND========---------")

    this.setState({
      modalOpen: true,
      isFormOpened: false
    })
    let fileNamePattern = data.data.name.replace(/\s/g, "").normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\u0142/g, "l");

    let locationName =fileNamePattern + "_model.obj";
    let textureName = fileNamePattern + "_text.mtl";
    let iconName = fileNamePattern + "_icon.jpg";
    console.log("drukuje imie")
    console.log(data.data.name)
    console.log("pokazuje state")
    console.log(data.data)
    var furnitureData = {
      "name": data.data.name,
      "location": locationName,
      "texture": textureName,
      "icon": iconName,
      "category": data.data.category,
      "description": data.data.description,
    }
    // ------=====wysyłanie mebla====--------
    fetch("http://localhost:8080/furniture/add", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': JSON.parse(window.sessionStorage.getItem('user')).authData
      },
      body:  JSON.stringify(furnitureData)
    })
    .then(function(response){
      return response.json();
    })
    .then(function(furnitureData){


      console.log("Mebel został wysłany")
      console.log(furnitureData)
      console.log(furnitureData.id)

      // ---===== Wysyłanie wymiarów ====-----
      var transform = {
        "furnitureId": furnitureData.id,
        "x": data.data.x,
        "y": data.data.y,
        "z": data.data.z
      }
      fetch("http://localhost:8080/transform/add", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': JSON.parse(window.sessionStorage.getItem('user')).authData
      },
      body:  JSON.stringify(transform)
    })
    .then(function(response){
      return response.json();
    })
    .then(function(transform){
      console.log("Wymiary zostały wysłane")
      console.log(transform)
      console.log(transform.id)
      });

      /// 
      console.log("Wysyłam pliki")

      var headers = {
        'Content-Type': 'application/json',
        'Authorization': JSON.parse(window.sessionStorage.getItem('user')).authData 
    }
      
      console.log("---===Wysyłanie obrazka===---")
      const iconForm = new FormData();
      iconForm.append('file', data.icon, iconName);
      axios.post('http://localhost:8080/uploadFile', iconForm, {headers: headers})
        .then(res => {
          console.log(res);
        });
      
      console.log("---===Wysyłanie modelu===---")
      const modelForm = new FormData();
      modelForm.append('file', data.model, locationName);
      axios.post('http://localhost:8080/uploadFile', modelForm, {headers: headers})
        .then(res => {
          console.log(res);
        });
        
      console.log("---===Wysyłanie tekstury===---")
      const textureForm = new FormData();
      textureForm.append('file', data.texture, textureName);
      axios.post('http://localhost:8080/uploadFile', textureForm, {headers: headers})
        .then(res => {
          console.log(res);
        });
    
      
    });
  }

  componentDidMount(){

    let furnit
    var categoriesList = [];
    console.log("Getting furnitures from database")
    fetch('http://localhost:8080/furniture/all',{
    method: 'GET',
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': JSON.parse(window.sessionStorage.getItem('user')).authData
    }}).then(value => value.json())
      .then( json => {

        furnit = json
        console.log(json);
        categoriesList.push("Favourites")
        furnit.map(item => {
          if (categoriesList.indexOf(item.category) < 0){
            categoriesList.push(item.category);
          }
        })
        this.setState({
          categories: categoriesList,
          furnitures: furnit,
          isLoaded: true
        })
        console.log("Z BAZZZZZZY DANYCH załasdowane:");
        console.log(this.state.furnitures)
        console.log(this.state.categories)
        //json response
      })

      let currentCategory = window.sessionStorage.getItem('currentCategory');
      if (currentCategory){
        this.setState({
          selectedPath: currentCategory
        })
      }
  }



    render(){
      var { isLoaded, selectedPath, furnitures, categories} = this.state;
      var user = JSON.parse(window.sessionStorage.getItem('user'));
      var isLogged = JSON.parse(window.sessionStorage.getItem('isLogged'))
      if (!isLoaded){
        return <div>Loading</div>;
      }
      else{
        return(

          <div>
            <div className="DataPage_TopContainer">
              <div className="DataPage_ButtonContainer">

                <Modal className="mebelform"
                  trigger={<button className="FormField__Button FormField__Button--Orange"> Add Furniture</button>}
                  on='click'
                  size='small'
                  centered={true}
                  dimmer='blurring'
                  style = {{width: "500px"}}
                >
                <Modal.Header>
                 <div className = "InfoModal_Title"> Add New Furniture</div>
                </Modal.Header>
                  <Modal.Content >
                  <MebelAddForm submit={this.submitFurniture} category={this.state.categories}/>
                  </Modal.Content>
                </Modal>
                <button className="FormField__Button FormField__Button--Blue" style = {{ marginLeft: "14px"}} onClick={this.handleInfoModalClick} > Mobile App</button>
              </div>
              <div className="DataPage_LogoContainer">
                <img className = "DataPage_logo" src={logo}/>
              </div>
              <div className="DataPage_AccountContainer">
                <div className = "DataPage__AccountText">
                  <p style = {{lineHeight: "17px"}}>Hello,
                  <b>{" " + JSON.parse(window.sessionStorage.getItem('user')).login}</b> 
                  </p>
                </div>
                <div className = "DataPage__AccountLogout">
                  <Link to="/" onClick={this.logMeOut}>
                    <img className = "DataPage__Logout" src={logoutIcon}/>
                  </Link>
                  </div>
              </div>
            </div>

            <AppContainer onSubmit={this.handleSubmit} className="FormCentesr">

              <div className="DataPage__SideMenuContainer">
                <SideNav
                  className="DataPage__SideMenu"
                  selectedPath={this.state.selectedPath}
                  onItemSelection={this.onItemSelection.bind(this)}
                  theme={theme}
                  >
                  {
                    categories.map((item, index) =>(
                      <NavSide className="DataPage_NavItem" id={index} key={index}>
                        <button className={"FormField__Button " + (this.state.selectedPath!=index ? 'FormField__Button--BlueBox' :'FormField__Button--Blue')} style = {{width : '100%'}}>{item}</button>
                      </NavSide>
                    )
                  )}
                </SideNav>
              </div>


              <body className="App__InfoContainer">
              
              <Modal
                open={this.state.modalOpen}
                onClose={this.handleClose}
                basic
                size='small'
                centered={true}
              >
                <Modal.Content>
                <Message success>
                <h1>Furniture added successfully.</h1>
                <Button color='green' onClick={this.handleClose}>
                  <Icon name='checkmark' size='big'/> Clsoe.
                </Button>
                  </Message>
                </Modal.Content>
              </Modal>
              

              <Modal
                open={this.state.infoModalOpened}
                onClose={this.handleInfoModalClose}
                size='small'
                centered={true}
                dimmer='blurring'
                style = {{textAlign: "center"}}
              >
                <Modal.Header>
                 <div className = "InfoModal_Title"> Get Mobile App!</div>
                </Modal.Header>
                  <Modal.Content>
                    <Modal.Description>
                      <h1 className = "InfoModal_Header">1. Download App from Google Play</h1>
                      <a href="https://hltv.org" target="_blank" rel="noopener noreferrer"> 
                        <img className = "InfoModal_Play" src={googlePlay}/>
                      </a>
                      <h1 className = "InfoModal_Header">2. Get QR code</h1>
                      <a href="http://localhost:8080/downloadFile/QR_code.jpg" target="_blank" rel="noopener noreferrer"> 
                        <img className = "InfoModal_QRCode" src={QRCode}/>
                      </a>
                      <h1 className = "InfoModal_Header">3. Enjoy your interior!</h1>
                    </Modal.Description>
                  </Modal.Content>
              </Modal>

              <Route exact path="/furnitures/category/Favourites" component={() =>
                (<FavouritesPage furnitures={user.furnitures} />)}/>
              <Route path="/furnitures/category/:category" component={() =>
                (<ItemList category={categories[selectedPath]} furnitures={furnitures} />)}
                />


              </body>
            </AppContainer>
          </div>
        )
      }
    }
}
export default withRouter(DataPage);
