import React, {Component} from 'react';

class ItemList extends Component{

    render(){
        return(
            <div>  
                {
                  this.props.furnitures.map(item =>(
                  this.props.category === item.category&&
                  (
                  <div className="App__ItemInfo" key={item.id}>
                    <span>Numer: {item.id}<br/></span>
                    <span>Kategoria: {item.category}<br/></span>
                    <span>{item.name}<br/></span>
                  </div>)
                  
                )
                  )}
            </div>
        )
    }
}
export default ItemList;