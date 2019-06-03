import React, {Component} from 'react';
import {Link, NavLink, Redirect} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import logo from '../images/Logo.png';



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
              
              <div style = {{ marginBottom: "50px"}}>
                <img className = ".logo" src={logo}/>
              </div>

              <div style = {{ marginBottom: "50px"}}>
                <label className = "App_MainTag">
                  Nice Furniture AR App
                </label>
              </div>
                <form className="FormFields">
                  {/*Pole tekstowe - login*/}
                  <div className="FormField">
                    <input type="text" id="login" className="FormField__Input"
                    placeholder="Login" name="login" value={this.state.login}
                    onChange={this.handleChange}/>
                  </div>

                  {/*Pole tekstowe - hasło*/}
                  <div className="FormField">
                    <input type="password" id="password" className="FormField__Input"
                    placeholder="Password" name="password" value={this.state.password}
                    onChange={this.handleChange}/>
                  </div>
                  {this.state.wrongData && (
                    <span className="errorMessage">Błędny login lub hasło</span>
                  )}
                  {/*Przycisk do akceptacji*/}
                  <div className="FormField FormField--MiddleAlign">
                    <button className="FormField__Button"> Zaloguj</button>
                  </div>

                  <div style = {{marginTop: "50px"}} >
                    <label className="FormField__Link">Stwórz nowe konto</label>
                  </div>

                  <div className="FormField FormField--MiddleAlign">
                    <Link to="/">
                    <button exact to="/" className="FormField__Button FormField__Button--Active">
                      Zarejestruj
                    </button>
                    </Link>
                  </div>
                  
                </form>
            </div>
        )
    }

}
export default withRouter(LoginPage);
