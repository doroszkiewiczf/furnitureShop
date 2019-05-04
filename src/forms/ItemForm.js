import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class ItemForm extends Component{

  constructor(){
    super();

    this.state = {
      items: []
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

      console.log('Zalogowano here danymi:')
      console.log(this.state);
  }
   

    render(){
        return(
            <div onSubmit={this.handleSubmit} className="FormCenter">

                <form className="FormFields">
                  {/*Pole tekstowe - login*/}
                  <div className="FormField">
                    <label className="FormField__Label" htmlFor="name"> Login: </label>
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
                    <Link to="/" className="FormField__Link">Stwórz nowe konto</Link>

                  </div>
                </form>  
              </div>
        )
    }
}
export default ItemForm;