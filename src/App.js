import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import DataPage from './pages/DataPage'

class App extends Component {

  constructor(){
    super();

    this.state = {
      loggedUser: '',
      isLogged: false,
      furnitures: [],
      currentItem: '1'
    };
  }

  onItemSelection = (arg) => {
    this.setState({ selectedPath: arg.path })
  }
  async componentWillMount(){

  let furnit,usr
  var categoriesList = [];
  console.log("DATABASE TESTINGGGG")

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
      // categoriesList.push(furnit[0].category)
      // furnit.map(item => {
      //   if (categoriesList.indexOf(item.category) < 0){
      //     categoriesList.push(item.category);
      //   }
      // })
      this.setState({
        categories: categoriesList,
        furnitures: furnit
      })
      console.log("Z BAZZZZZZY DANYCH załasdowane:");
      console.log(this.state.users);
      console.log(this.state.furnitures)
      console.log(this.state.categories)
      //json response
    })
  // const response = await fetch('http://localhost:8080/furniture/all',{
  // });
  // const body = await response.json();
  // this.setState({ furnitures: body});
  
  // console.log(body);
}

  logUser = (value) => {
    this.setState({ 
      isLogged: true,
      loggedUser: value 
    })
  }



  render() {

    var {isLogged} = this.state;

    return (
      <Router exact path='/'>
      <div className="App">

          
          <div className="App__Aside">
            <a
              className="App-link"
              href="https://hltv.org"
              target="_blank"
              rel="noopener noreferrer"
              >
              hltv
            </a>
            
            {<Route path="/furnitures" component={() => (<DataPage logged={this.state.loggedUser} history={this.props.history}/>)}>
            </Route>}
            {/*<Route path="/furnitures" component={DataPage}/>*/}
            <div className="App__Form">
              <Route exact path="/" component={SignUpPage}>
              </Route>
              <Route exact path="/login" component={() => (<LoginPage logUser={this.logUser} />)}>
              </Route>
            </div>
          

          </div>

          

      </div>
      </Router>
      
    );
  }
}

export default App;
