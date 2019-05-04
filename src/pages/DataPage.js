import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import { SideNav, Nav } from 'react-sidenav'
import styled from "styled-components";
import ItemPage from './ItemPage';
import LoginPage from './LoginPage';
import ItemList from './ItemList'



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
    this.setState({ selectedPath: arg.path })
}

  handleChange = e =>{

  }
  handleSubmit = e => {
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
                      <Nav id={index} key={index}>{item}</Nav>
                    )
                  )}
                </SideNav>
              </div>

              <body className="App__InfoContainer">
                <div>  
                {/*
                  furnitures.map(item =>(
                  categories[selectedPath] === item.category&&
                  (
                  <div className="App__ItemInfo" key={item.id}>
                    <span>Numer: {item.id}<br/></span>
                    <span>Kategoria: {item.category}<br/></span>
                    <span>{item.name}<br/></span>
                  </div>)
                  
                )
                )*/}
                <Route path="/furnitures/list" component={() => 
                  (<ItemList category={categories[selectedPath]} furnitures={furnitures} />)}
                  />
                <Route exact path="/furnitures/essa" component={ItemPage}/>
                <Route exact path="/furnitures/login" component={LoginPage}/>
                </div>
                
              </body>

            </AppContainer>
        )
      }
    }
}
export default DataPage;