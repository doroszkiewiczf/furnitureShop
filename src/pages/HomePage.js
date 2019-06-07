import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import shape from '../images/Shape.png'
 
 
class HomePage extends Component{
 
    render(){
        return(
          <body>
            <div className="homepage">
           <Link to ="/register">
           <button className='FormField__Button FormField__Button-SignUp'>
            <div class="ui animated button" tabindex="0">
            <div class="visible content">
            Zarejestruj
            </div>
            <div class="hidden content">
              <i class="user circle outline icon"></i>
            </div>
            </div>
          </button>
           </Link>
 
            <Link to="/login">
            <button className='FormField__Button FormField__Button-SignIn'>
            <div class="ui animated button signin" tabindex="0">
            <div class="visible content">
            Zaloguj
            </div>
            <div class="hidden content signin">
              <i class="angle double right icon"></i>
            </div>
            </div>
            </button> </Link>
            <div className='Homepage_shape_box'>
              <img src={shape} className='Homepage_shape'></img>
            </div>
            <div className='textblock'>
            HOME DECO AR
            </div>
 
            </div>
          </body>
        )
    }
}
export default HomePage;