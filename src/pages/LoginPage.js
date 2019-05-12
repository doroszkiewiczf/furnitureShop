import React, {Component} from 'react';
import {Link, NavLink, Redirect} from 'react-router-dom';



class LoginPage extends Component{

  constructor(){
    super();

    this.state = {
      users: [],
      login: '',
      password: '',
      logged: false
    };
  }
  handleChange = e =>{
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name] : value
    });
  }
  handleSubmit = e => {
      e.preventDefault();

      if (this.state.login&&this.state.password){
        //this.props.logUser(this.state.login);
        this.setState({
          logged: true
        })
        console.log('Zalogowano here danymi:')
        console.log(this.state);
      }
      else{
        console.error("Nie da rady zalogować")
      }

  }

    render(){

      var {logged} = this.state;
      if (!logged){
        return(

            <div onSubmit={this.handleSubmit} className="FormCenter">
              <div className="PageSwitch">
                <NavLink to="/login" activeClassName="PageSwitcher PageSwitcher--Active" className="PageSwitcher"> Zaloguj</NavLink>
                <NavLink exact to="/" activeClassName="PageSwitcher PageSwitcher--Active" className="PageSwitcher">Zarejestruj</NavLink>
              </div>
              
                <form className="FormFields">
                  {/*Pole tekstowe - login*/}
                  <div className="FormField">
                    <label className="FormField__Label" htmlFor="login" > Login: </label>
                    <input type="text" id="login" className="FormField__Input"
                    placeholder="Podaj login" name="login" value={this.state.login}
                    onChange={this.handleChange}/>
                  </div>

                  {/*Pole tekstowe - hasło*/}
                  <div className="FormField">
                    <label className="FormField__Label" htmlFor="password"> Hasło: </label>
                    <input type="text" id="password" className="FormField__Input"
                    placeholder="Podaj hasło twoje" name="password" value={this.state.password}
                    onChange={this.handleChange}/>
                  </div>
                  {/*Przycisk do akceptacji*/}
                  <div className="FormField">
                    <button className="FormField__Button mr-20"> Zaloguj</button>
                    <Link to="/furnitures" className="FormField__Link">Stwórz nowe konto</Link>
                  </div>
                </form>
            </div>
        )
    }
    else{
      this.props.logUser(this.state.login);
      return(

        <Redirect to='/furnitures/list' />
      )
    }
  }

}
export default LoginPage;
