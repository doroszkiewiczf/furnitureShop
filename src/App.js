import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
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
  componentWillMount(){

  // let furnit,usr
  // var categoriesList = [];
  // Promise.all([
  //   fetch('http://localhost:3000/users').then(value => value.json()),
  //   fetch('http://localhost:3000/furnitures').then(value => value.json())
  // ]).then( json => {
       
     
  //     usr = json[0]
  //     furnit = json[1]

  //     categoriesList.push(furnit[0].category)
  //     furnit.map(item => {
  //       if (categoriesList.indexOf(item.category) < 0){
  //         categoriesList.push(item.category);
  //       }
  //     })
  //     this.setState({
  //       categories: categoriesList,
  //       users: usr,
  //       furnitures: furnit
  //     })
  //     console.log("Elo siemka załadowane:");
  //     console.log(this.state.users);
  //     console.log(this.state.furnitures)
  //     console.log(this.state.categories)
  //     //json response
  //   })
  //   .catch((err) => {
  //       console.log(err);
  //   });
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
            <div>
              {isLogged&&(
                <div className="App__LoggedInfo">Siemka {this.state.loggedUser}</div>
              )}
            </div>
            
            <Route path="/furnitures" component={DataPage}/>
          </div>
          <div className="App__Form">
            
            <Route exact path="/" component={SignUpPage}>
            </Route>

            <Route exact path="/login" component={() => (<LoginPage logUser={this.logUser} />)}>
            </Route>

            
 
          </div>
      </div>
      </Router>
      
    );
  }
}

export default App;
