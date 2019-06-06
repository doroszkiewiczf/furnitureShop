import React, {Component} from 'react';
import {Link, NavLink, Redirect} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import logo from '../images/Logotyp.png';


function handleResponse(response) {
  return response.text().then(text => {
      const data = text && JSON.parse(text);
      console.log("Respone status isss:" + data)
      if (!response.ok) {
        console.log("Respone status is:" + response.status)
          if (response.status === 401) {
              // auto logout if 401 response returned from api
              console.log("Respone status is:" + response.status)
          }

          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }

      return data;
  });
}

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

      //   fetch('http://localhost:8080/user/login?login='+this.state.login+'&password='+this.state.password, {
      //     method: "GET",
      //     credentials: 'same-origin',
      //     headers: {
      //       'Accept': 'application/json',
      //       'Content-Type': 'application/json'
      //     }
      //   })
      //   .then(value => value.json())
      //    .then( json => {

      //   user = json
      //   console.log(user);


      //   this.props.history.push("/furnitures/info")
      //   this.props.logUser(user);
      //   }).catch((err) => {
      //     console.log(err);
      //     this.setState({
      //       wrongData: true
      //     })
      // });
      console.log("------=====TRYING TO LOGIN========---------")
      let username = this.state.login;
      let password = this.state.password;
      let authKey = "Basic " + window.btoa(username + ':' + password);
      const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                       'Authorization': authKey },
            //body: JSON.stringify({ username, password })
         };

      fetch("http://localhost:8080/login", requestOptions)
      .then(value => value.json())
         .then( json => {

        user = json
        console.log(user);
        user.authData = authKey;
        this.props.logUser(user);
        this.props.history.push("/furnitures/category/favourite")
        }).catch((err) => {
          console.log(err);
          this.setState({
            wrongData: true
          })
      });
      //let username = this.state.login;
    //   let username = this.state.login;
    //   let password = this.state.password;
    //   let authKey = "Basic " + window.btoa(username + ':' + password);
    //   console.log(authKey);
    //   const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json',
    //                'Authorization': authKey },
    //     //body: JSON.stringify({ username, password })
    // };

    // return fetch(`http://localhost:8080/login`, requestOptions)
    //     .then(handleResponse)
    //     .then(user => {
    //         // login successful if there's a user in the response
    //         if (user) {
    //             // store user details and basic auth credentials in local storage
    //             // to keep user logged in between page refreshes
    //             this.props.history.push("/furnitures/info")
    //             this.props.logUser(user);
    //             console.log("Zalogowano pomyślnie");
    //             user.authdata = window.btoa(username + ':' + password);
    //             localStorage.setItem('user', JSON.stringify(user));
    //             console.log("Dane użytkownika");
    //             console.log(JSON.stringify(user));
    //         }
    //         this.setState({
    //                  wrongData: true
    //                })

    //         return user;
    //     });
       }
    }


    render(){

      var {logged} = this.state;

        return(
          <div>
          <div className="TopImage">
              <div className="TopImage_Logo">
                <img src={logo} alt="Logo" className="logo-register"/>
                  </div>
              <div className="TopImage_Text">HOME DECO AR</div>
          </div>
            <div onSubmit={this.handleSubmit} className="FormCenter">

            {/*  <div style = {{ marginBottom: "50px"}}>
                <img className = ".logo" src={logo}/>
              </div>*/}

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
                    <span className="errorMessage">You have entered incorrect login information</span>
                  )}
                  {/*Przycisk do akceptacji*/}
                  <div className="FormField FormField--MiddleAlign">
                    <button className="FormField__Button FormField__Button-SignUp-Register"> Sign In</button>
                  </div>

                  <div style = {{marginTop: "50px"}} >
                    <label className="FormField__Link">Don't have an account?</label>
                  </div>

                  <div className="FormField FormField--MiddleAlign">
                    <Link to="/register">
                    <button className="FormField__Button FormField__Buton-SignIn-Register">
                      Sign Up
                    </button>
                    </Link>
                  </div>

                </form>
            </div>
            </div>
        )
    }

}
export default withRouter(LoginPage);
