import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import { SideNav, Nav as NavSide} from 'react-sidenav'
import styled from "styled-components";
import ItemPage from './ItemPage';
import LoginPage from './LoginPage';
import ItemList from './ItemList';
import TestPage from './TestPage';
import InfoPage from './InfoPage';
import AccountPage from './AccountPage';
import {Button, Popup} from 'semantic-ui-react';
import MebelAddForm from '../forms/MebelAddForm';
import { LinkContainer} from "react-router-bootstrap";
import { NavLink } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";




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
      users: [],
      furnitures: [],
      categories: [],
      testAttr: 'TESTOWOWOWO',
      isLoaded: true,
      selectedPath: '0'
    };
  }

  onItemSelection = (arg) => {
    this.setState({ selectedPath: arg.path });
    this.props.history.push('/furnitures/category/'+ this.state.categories[arg.id]);
  }

  handleChange = e =>{

  }
  handleSubmit = e => {
  }

  submitFurniture = (data) => {
    console.log(data)
    console.log("------=====TRYING TO SEND========---------")
    var furnitureData = {
      "id": "6",
      "name": data.name,
      "location": "test/location",
      "texture": "test/texture",
      "icon": "text/icon",
      "category": data.category,
      "description": data.description
    }
  
    fetch("http://localhost:3000/furnitures", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify(data)
    })
    .then(function(response){ 
      return response.json();   
    })
    .then(function(data){
      console.log("WYSYŁANE TU COŚ BYŁO")
      console.log(data)
    });
  }

  componentDidMount(){
    let furnit,usr
    var categoriesList = [];
    Promise.all([
      fetch('http://localhost:3000/users').then(value => value.json()),
      fetch('http://localhost:3000/furnitures').then(value => value.json())
    ]).then( json => {


      usr = json[0]
      furnit = json[1]

      categoriesList.push(furnit[0].category)
      furnit.map(item => {
        if (categoriesList.indexOf(item.category) < 0){
          categoriesList.push(item.category);
        }
      })
      this.setState({
        categories: categoriesList,
        users: usr,
        furnitures: furnit,
        isLoaded: true
      })
      console.log("Elo siemka załadowane:");
      console.log(this.state.users);
      console.log(this.state.furnitures)
      console.log(this.state.categories)
      //json response
    })
    .catch((err) => {
        console.log(err);
    });
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
              <NavLink className="NavBarItem" to="/furnitures/info">Info</NavLink>
              <NavLink className="NavBarItem" to="/furnitures/account">Account</NavLink>
            </div>
            <AppContainer onSubmit={this.handleSubmit} className="FormCenter">

              <div className="App__SideMenu">
                <SideNav
                  className="App__SideMeny_Item"
                  selectedPath={this.state.selectedPath}
                  onItemSelection={this.onItemSelection}
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
                trigger={<Button positive>Dodaj mebla kumpel</Button>}
                content={<MebelAddForm submit={this.submitFurniture} category={this.state.categories} />}
                on='click'
                hideOnScroll
                wide
              />
              <Route exact path="/furnitures/essa" component={ItemPage}/>
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
export default DataPage;
