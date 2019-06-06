import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import shape from '../images/Shape.png'

class HomePage extends Component{

    render(){
        return(
          <body>
            <div className="homepage">

           <Link to ="/register"><button className='FormField__Button FormField__Button-SignUp'>
            Zarejestruj
          </button> </Link>

            <Link to="/login"><button className='FormField__Button FormField__Button-SignIn'>
              Zaloguj
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
