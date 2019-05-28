import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import DataPage from './pages/DataPage'
import localStorage from 'local-storage'
import sessionStorage from 'session-storage'


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
  

  logUser = (value) => {
    this.setState({ 
      isLogged: true,
      loggedUser: value 
    })
    localStorage.set('isLogged', true);
    localStorage.set('user', this.state.loggedUser);
    window.sessionStorage.setItem('isLogged', true);
    window.sessionStorage.setItem('user', JSON.stringify(this.state.loggedUser));
    console.log(JSON.parse(window.sessionStorage.getItem('isLogged')));
    console.log(JSON.parse(window.sessionStorage.getItem('user')).login);
  }



  render() {

    var {isLogged} = this.state;

    return (
      <Router exact path='/'>
      <div className="App">

          
          <div className="App__Aside">
            
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
