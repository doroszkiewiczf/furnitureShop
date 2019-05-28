import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Icon} from 'semantic-ui-react';

class IconForm extends Component{

  constructor(){
    super();

    this.state = {
        iconColor: 'gray',
        user: ''
    };
  }

  componentDidMount(){
    var sessionUser = JSON.parse(window.sessionStorage.getItem('user'));
    if (this.props.isFavourite == true){
      this.setState({
        iconColor: 'blue',
        user: sessionUser
      })
    }
  }

  addToFavorite = (e) =>{
    e.stopPropagation();
    let color;
    if (this.state.iconColor === 'gray'){
      color = 'blue'
    }else{
      color = 'gray'
    }
    this.setState({
      iconColor: color
    })
  }
   

    render(){
        return(
                <Icon style={{color:this.state.iconColor}} onClick={this.addToFavorite} name='favorite' size='large'/>
        )
    }
}
export default IconForm;