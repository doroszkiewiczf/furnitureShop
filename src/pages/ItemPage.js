import React, {Component} from 'react';

class ItemPage extends Component{

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
                Elo siemka
            </div>
        )
    }
}
export default ItemPage;