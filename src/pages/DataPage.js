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
import {Button, Popup, Divider} from 'semantic-ui-react';
import MebelAddForm from '../forms/MebelAddForm';
import { LinkContainer} from "react-router-bootstrap";
import { NavLink } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import {withRouter} from 'react-router-dom';



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
      selectedPath: '0'
    };

  }

  onItemSelection = (arg) => {
    this.setState({ selectedPath: arg.path });
    console.log('/furnitures/category/' + this.state.categories[arg.id])
    this.props.history.push('/furnitures/category/'+ this.state.categories[arg.id]);
  }

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

    var furnitureData = {
      "name": data.name,
      "location": "test/location",
      "texture": "test/texture",
      "icon": "text/icon",
      "category": data.category,
      "description": data.description,
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
      var furnit = response.json()

    })
    .then(function(furnitureData){


      console.log("Mebel został wysłany")
      console.log(furnitureData)
      console.log(furnitureData.id)

      // ---===== Wysyłanie wymiarów ====-----
      var transform = {
        "furnitureId": furnitureData.id,
        "x": data.x,
        "y": data.y,
        "z": data.z
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
  }



    render(){
      var { isLoaded, selectedPath, furnitures, categories} = this.state;
      console.log("SPRAWDZAM")
      console.log(this.props)
      console.log(this.state)
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
                {this.props.logged&&(
                  <label className="NavBarItem">Zalogowany: {this.props.logged.login}</label>
                )}
                {!this.props.logged&&(
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
              <Divider hidden/><Popup className="mebelform"
                trigger={<Button positive>Dodaj mebla kumpel</Button>}
                content={<MebelAddForm submit={this.submitFurniture} category={this.state.categories} />}
                on='click'
                hideOnScroll
                wide
              />
              <Divider hidden/>
              <Route exact path="/furnitures/favourite" component={() =>
                (<FavouritesPage furnitures={this.props.logged.furnitures} />)}/>
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
