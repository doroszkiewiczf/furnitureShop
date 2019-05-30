import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom';

const formValid = formErrors => {
  let valid = true;

  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });
  return valid;
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

class SignUpPage extends Component{

  constructor(){
    super();

    this.state = {
      login: '',
      firstName: '',
      lastName: '',
      password: '',
      email: '',
      isAccepted: false,
      formErrors: {
        login: '-',
        firstName: '-',
        lastName: '-',
        password: '-',
        email: '-' ,
        accept: ''
      }
    };
  }
  handleChecked = e =>  {
    
    this.setState({
      isAccepted: !this.state.isAccepted
    });
    this.state.formErrors.accept = this.state.isAccepted === false ? "" : "Musisz dać akcept";
    
  }

  handleChange = e => {
    e.preventDefault();
    const target = e.target;
    let value = target.value;
    let name = target.name;
    let formErrors = this.state.formErrors;

    switch(name){
      case "login":
        formErrors.login = value.length < 3  ? "zła długość loginu" : "";
        break;
      case "password":
        formErrors.password = value.length < 6 ? "za krótkie hasło here" : "";
        break;
      case "email":
        formErrors.email = validateEmail(value) ? "" : "zły mail";
        break;
      case "firstName":
      formErrors.firstName = value.length < 3 ? "zbyt krótkie imię": "";
        break;
      case "lastName":
        formErrors.lastName = value.length < 3 ? "zbyt krótkie nazwisko": "";
        break;
      default:
        break;
    }
    this.setState({formErrors, [name]: value});
  }
  handleSubmit = e => {
      e.preventDefault();
      this.setState({
        buttonClicked: true
      });
      if (this.state.isAccepted){
        this.state.formErrors.accept = "";
        if (formValid(this.state.formErrors)){
          console.log('Zalogowano here danymi:');
          console.log(this.state);
          //////////////////////////// TEST HERE
          console.log("------=====TRYING TO SEND========---------")
          var data = {
            "login": this.state.login,
            "name": this.state.firstName,
            "vorname": this.state.lastName,
            "password": this.state.password,
            "email": this.state.email
          }
        
          fetch("http://localhost:8080/add", {
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
        else{
          console.error("SOMETHING IS WRONG");
          console.error(this.state.formErrors);
        }
      } else{
        console.error("NIE DAŁEŚ AKCEPTA :/")
        console.error(this.state);
      }
  }
  handleSend() {
    
  }

    render(){
      const {formErrors, isAccepted} = this.state;
        return(
            <div onSubmit={this.handleSubmit} className="FormCenter">
              <div className="PageSwitch">
                <NavLink to="/login" activeClassName="PageSwitcher PageSwitcher--Active" className="PageSwitcher"> Zaloguj</NavLink>
                <NavLink exact to="/" activeClassName="PageSwitcher PageSwitcher--Active" className="PageSwitcher">Zarejestruj</NavLink>
              </div>
                <form className="FormFields">
                  {/*Pole tekstowe - login*/}
                  <div className="FormField">
                    <label className="FormField__Label" htmlFor="login"> Login: </label>
                    <input type="text" id="login" className="FormField__Input"
                    placeholder="Podaj login" name="login" value={this.state.login} 
                    onChange={this.handleChange}/>
                    {formErrors.login.length > 1 && (
                    <span className="errorMessage">{formErrors.login}</span>
                  )}

                  </div>
                  
                  {/*Pole tekstowe - hasło*/}
                  <div className="FormField">
                    <label className="FormField__Label" htmlFor="password"> Hasło: </label>
                    <input type="password" id="password" className="FormField__Input"
                    placeholder="Podaj hasło twoje" name="password" value={this.state.password}
                    onChange={this.handleChange}/>
                    {formErrors.password.length > 1 && (
                    <span className="errorMessage">{formErrors.password}</span>
                  )}
                  </div>

                  {/*Pole tekstowe - imie*/}
                  <div className="FormField">
                    <label className="FormField__Label" htmlFor="firstName"> Imię: </label>
                    <input type="text" id="firstName" className="FormField__Input"
                    placeholder="Podaj imię twoje" name="firstName" value={this.state.firstName}
                    onChange={this.handleChange}/>
                    {formErrors.firstName.length > 1 && (
                    <span className="errorMessage">{formErrors.firstName}</span>
                  )}
                  </div>

                  {/*Pole tekstowe - nazwisko*/}
                  <div className="FormField">
                    <label className="FormField__Label" htmlFor="lastName"> Nazwisko: </label>
                    <input type="text" id="lastName" className="FormField__Input"
                    placeholder="Podaj swoje nazwisko" name="lastName" value={this.state.lastName}
                    onChange={this.handleChange}/>
                    {formErrors.lastName.length > 1 && (
                    <span className="errorMessage">{formErrors.lastName}</span>
                  )}
                  </div>

                  {/*Pole tekstowe - email*/}
                  <div className="FormField">
                    <label className="FormField__Label" htmlFor="email"> E-mail: </label>
                    <input type="text" id="email" className="FormField__Input"
                    placeholder="Podaj swego mejla" name="email" value={this.state.email}
                    onChange={this.handleChange}/>
                    {formErrors.email.length > 1 && (
                    <span className="errorMessage">{formErrors.email}</span>
                  )}
                  </div>

                  {/*Check box do akceptacji*/}
                    <div className="FormField">
                      <label className="FormField__CheckboxLabel">
                        <input className="FormField__Checkbox" type="checkbox" name="isAccepted"
                        value={isAccepted} onChange={this.handleChecked}/>
                        Akceptuje regulamin - 
                        <a href="https://hltv.org" target="_blank" rel="noopener noreferrer" className="FormField__TermsLink"> regulamin</a>
                      </label>
                      {formErrors.accept.length > 0 && (
                        <span className="errorMessage">{formErrors.accept}</span>
                      )}
                    </div>
                  {/*Przycisk do akceptacji*/}
                  <div className="FormField">
                    <button className="FormField__Button mr-20"> Zarejestruj</button>
                    <Link to="/login" className="FormField__Link">Mam już konto mordo</Link>
                  </div>
                </form> 
              </div>
        );
    }
}

export default SignUpPage;