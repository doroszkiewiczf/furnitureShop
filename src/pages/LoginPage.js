import React, {Component} from 'react';
import {Link, NavLink, Redirect} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import axios from 'axios';



class LoginPage extends Component{

  constructor(){
    super();

    this.state = {
      login: '',
      password: '',
      logged: false,
      wrongData: false,
      selectedFile: null
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

        var user;

        console.log("------=====TRYING TO LOGIN========---------")

        fetch('http://localhost:8080/user/login?login='+this.state.login+'&password='+this.state.password, {
          method: "GET",
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then(value => value.json())
         .then( json => {
        
        user = json
        console.log(user);
        this.props.history.push("/furnitures/info")
        this.props.logUser(user);
        }).catch((err) => {
          console.log(err);
          this.setState({
            wrongData: true
          })
      });
      // console.log("------=====TRYING TO LOGIN========---------")
      //     var data = {
      //       "login": this.state.login,
      //       "password": this.state.password,
      //     }
        
      //     fetch("http://localhost:8080/login", {
      //       method: "POST",
      //       headers: {
      //         'Accept': 'application/json',
      //         'Content-Type': 'application/json'
      //       },
      //       body:  JSON.stringify(data)
      //     })
      //     .then(function(response){ 
      //       return response.json();   
      //     })
      //     .then(function(data){
      //       console.log("WYSYŁANE TU COŚ BYŁO")
      //       console.log(data)

      //     })
      }
    }

    fileSelectedHandler = event => {
      console.log(event.target.files[0])
      this.setState({
        selectedFile: event.target.files[0]
      })
    }

    fileUploadHandler = () => {
      console.log("TRYING TO SEND THE FILE");
      const data = new FormData();
      data.append('file', this.state.selectedFile, this.state.selectedFile.name);
      axios.post('http://localhost:8080/uploadFile', data)
        .then(res => {
          console.log(res);
        });
    }

    render(){

      var {logged} = this.state;

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
                    <input type="password" id="password" className="FormField__Input"
                    placeholder="Podaj hasło twoje" name="password" value={this.state.password}
                    onChange={this.handleChange}/>
                  </div>
                  {this.state.wrongData && (
                    <span className="errorMessage">Błędny login lub hasło</span>
                  )}
                  {/*Przycisk do akceptacji*/}
                  <div className="FormField">
                    <button className="FormField__Button mr-20"> Zaloguj</button>
                    <Link to="/furnitures" className="FormField__Link">Stwórz nowe konto</Link>
                  </div>
                </form>
                <input
                  type="file"
                  id="icon"
                  // required
                  name="icon"
                  placeholder="Ikona"
                  onChange={this.fileSelectedHandler}
                />
                <img 
                  src="http://localhost:8080/downloadFile/cukrzyca.jpg"
                  alt="new"
                />
                <button onClick={this.fileUploadHandler}>
                uploadFile </button>
            </div>
        )
    }

}
export default withRouter(LoginPage);
