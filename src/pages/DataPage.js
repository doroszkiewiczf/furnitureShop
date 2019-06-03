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
import { NavLink } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import {withRouter} from 'react-router-dom';
import localStorage from 'local-storage';
import sessionStorage from 'session-storage';
import axios from 'axios';




const AppContainer = styled.div`\
  display: flex;
  height: 100%;
  width: 100%;
  height: calc(100vh - 40px);
`;

const theme = {
  selectionColor: "#00645c",
  selectionBgColor: "#00BCD4",
  hoverBgColor: "#00BCD4"
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
      selectedPath: '0',
      isFormOpened: false,
      modalOpen: false
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

  handleChange = e =>{

  }
  handleSubmit = e => {
  }

  loginUser = (user) => {
    this.setState({ isLogged: true})
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
        'Content-Type': 'application/json'
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
        'Content-Type': 'application/json'
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

      console.log("---===Wysyłanie obrazka===---")
      const iconForm = new FormData();
      iconForm.append('file', data.icon, iconName);
      axios.post('http://localhost:8080/uploadFile', iconForm)
        .then(res => {
          console.log(res);
        });
      
      console.log("---===Wysyłanie modelu===---")
      const modelForm = new FormData();
      modelForm.append('file', data.model, locationName);
      axios.post('http://localhost:8080/uploadFile', modelForm)
        .then(res => {
          console.log(res);
        });
        
      console.log("---===Wysyłanie tekstury===---")
      const textureForm = new FormData();
      textureForm.append('file', data.texture, textureName);
      axios.post('http://localhost:8080/uploadFile', textureForm)
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
    }}).then(value => value.json())
      .then( json => {

        furnit = json
        console.log(json);
        categoriesList.push(furnit[0].category)
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
            <div className="NavBar">
              <div>
                <NavLink className="NavBarItem" to="/furnitures/info">Info</NavLink>
                <NavLink className="NavBarItem" to="/furnitures/account">Account</NavLink>
                <NavLink className="NavBarItem" to="/furnitures/download">Aplikacja mobilna</NavLink>
                <NavLink className="NavBarItem" to="/furnitures/favourite">Moje meble</NavLink>

              </div>

              <div>
                {isLogged&&(
                  <label className="NavBarItem">Zalogowany: {user.login}</label>
                )}
                {!isLogged&&(
                  <NavLink className="NavBarItem" to="/login" >Zaloguj</NavLink>
                )}
              </div>

            </div>
            <AppContainer onSubmit={this.handleSubmit} className="FormCentesr">

              <div className="App__SideMenu">
                <SideNav
                  className="App__SideMeny_Item"
                  selectedPath={this.state.selectedPath}
                  onItemSelection={this.onItemSelection.bind(this)}
                  theme={theme}
                  >
                  {
                    categories.map((item, index) =>(
                      <NavSide id={index} key={index}>{item}</NavSide>
                    )
                  )}
                </SideNav>
              </div>


              <body className="App__InfoContainer">
              <Popup className="mebelform"
                  trigger={<Button onClick={this.handleClick} positive>Dodaj mebel</Button>}
                  content={<MebelAddForm submit={this.submitFurniture} category={this.state.categories} />}
                  on='click'
                  open={this.state.isFormOpened}
                  hideOnScroll
                  wide
                />
                <Modal
                open={this.state.modalOpen}
                onClose={this.handleClose}
                basic
                size='small'
                centered={true}
              >
                <Modal.Content>
                <Message success>
                <h1>Mebel został poprawnie dodany.</h1>
                <p>Teraz możesz dodać go do ulubionych.</p>
                <Button color='green' onClick={this.handleClose}>
                  <Icon name='checkmark' size='big'/> Zamknij to okno.
                </Button>
                  </Message>

                </Modal.Content>
              </Modal>
              <Route exact path="/furnitures/favourite" component={() =>
                (<FavouritesPage furnitures={user.furnitures} />)}/>
              <Route exact path="/furnitures/login" component={LoginPage}/>
              <Route exact path="/furnitures/info" component={InfoPage}/>
              <Route exact path="/furnitures/account" component={AccountPage}/>
              <Route exact path="/furnitures/test" component={TestPage}/>
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
