import React, {Component} from 'react';
import { Form, Button, Divider, Select, Message, Modal, Header, Icon} from 'semantic-ui-react';
import PropTypes from 'prop-types';

const sizes = ['small']
//['mini', 'tiny', 'small', 'large', 'big', 'huge', 'massive']

class MebelAddForm extends React.Component {

onChange = e => this.setState({
  data: { ...this.state.data, [e.target.name]: e.target.value}});


onSubmit = () => {
  this.props.submit(this.state.data);
  console.log("witam");

  this.setState({
    modalOpen: true
  })
}

handleClose = () => this.setState({ modalOpen: false })

  constructor(){
    super();

    this.state = {
      data: {
        name: '',
        icon: '',
        model:'',
        texture:'',
        category: '',
        description:'',
        x:'',
        y:'',
        z:''
      },
      loading: false,
      on:false,
      modalOpen: false
    };
  }

  insertCategorySelected = () => {
    let newState = Object.assign({}, this.state);
    newState.data.category = "";
    newState.on = true;
    this.setState(newState);
  }

  dropDownSelected = () => {
    let newState = Object.assign({}, this.state);
    newState.data.category = this.props.category[0];
    newState.on = false;
    this.setState(newState);

}

state = {
  visible: true
}

toggle(){
  this.setState({
    visible: !this.state.visible
  });
}

componentDidMount(){

  var name = document.getElementById("name");
  name.addEventListener("input", function (event) {
    if (name.validity.patternMismatch) {
      name.setCustomValidity("Używaj tylko liter.");
    } else {
      name.setCustomValidity("");
    }
    })
    var newState =  Object.assign({}, this.state);
    newState.data.category = this.props.category[0]
    this.setState(newState);
}

render (){
  const { data } = this.state;

  return (
        sizes.map(size => (
  // <Form onSubmit={this.onSubmit} size={size} key={size}>
   <Form onSubmit={this.onSubmit} size={size} key={size}>
   {/* <Form.Field error={!!errors.name}> */}
      <Form.Field>
     <input
     type="text"
     required minLength="2" maxLength="50"
     pattern="([A-zÀ-ž\s]){2,}"
     id="name"
     name="name"
     placeholder="Nazwa"
     value={data.name}
     onChange={this.onChange}
     />
    {/* {errors.name && <InlineError text={errors.name} />} */}
     </Form.Field>

     <Form.Field>
     <input type="text"
      id="description"
      name="description"
      required
      placeholder="Opis"
      value={data.description}
      onChange={this.onChange}
     />
     </Form.Field>

     <div className='formaAddMebel'><b>Kategoria</b></div>
     <Button type="button" active={!this.state.on} onClick={this.dropDownSelected}>Wybierz</Button>
     <Button type="button" active={this.state.on} onClick={this.insertCategorySelected}>Podaj własną</Button>
     <div className='emptyDivider'/>
     {!this.state.on && <select id="selekt" style = {{width: "100%"}} placeholder='wybierz kategorię' onChange={this.onChange} name="category">

        {this.props.category.map((category, index) =>
          <option key={index} value={category}>{category}</option>
        )};


     </select>}
     {this.state.on && <Form.Field>
              <input type="text"
              id="category"
              required
              name="category"
              placeholder="Podaj nazwę kategorii"
              value={data.category}
              onChange={this.onChange}
              />
              </Form.Field>}



{/*}     <Form.Field error={!!errors.category}>
           <input
             type="text"
             required
             id="category"
             name="category"
             placeholder="Kategoria"
             value={data.category}
             onChange={this.onChange}
            />
             {errors.category && <InlineError text={errors.category} />}
          </Form.Field>
*/}
{/*
    <Form.Field error={!!errors.category}>
       <input
         type="text"
         required
         id="category"
         name="category"
         placeholder="Kategoria"
         value={data.category}
         onChange={this.onChange}
        />
         {errors.category && <InlineError text={errors.category} />}
      </Form.Field>
*/}


           <div className='formaAddMebel'><b>Ikona</b></div>

        {/* <Form.Field error={!!errors.icon}> */}
        <Form.Field>
             <input
             type="file"
             id="icon"
            // required
             name="icon"
             placeholder="Ikona"
             value={data.icon}
             onChange={this.onChange}
             />
            {/*   {errors.icon && <InlineError text={errors.icon} />} */}
       </Form.Field>

        <div className='formaAddMebel'><b>Model</b></div>

       <Form.Field>
            <input
            type="file"
            id="model"
           // required
            name="model"
            placeholder="Ikona"
            value={data.model}
            onChange={this.onChange}
            />
           {/*   {errors.icon && <InlineError text={errors.icon} />} */}
      </Form.Field>

      <div className='formaAddMebel'><b>Tekstura</b></div>

      <Form.Field>
           <input
           type="file"
           id="texture"
          // required
           name="texture"
           placeholder="Ikona"
           value={data.texture}
           onChange={this.onChange}
           />
          {/*   {errors.icon && <InlineError text={errors.icon} />} */}
     </Form.Field>

      <div className='formaAddMebel'><b>Wymiary</b></div>

      <Form.Group widths='equal'>
    {/*<Form.Field error={!!errors.x}>  */}
        <Form.Field>
          <input
          type="number"
          min="0" max="5" step="0.01"
        //  required
          id="x"
          name="x"
          placeholder="X"
          value={data.x}
          onChange={this.onChange}
          />
        {/*  {errors.x && <InlineError text={errors.x} />} */}
          </Form.Field>

          {/*<Form.Field error={!!errors.y}>*/}
            <Form.Field>
            <input
            type="number"
            min="0" max="5" step="0.01"
          //  required
            id="y"
            name="y"
            placeholder="Y"
            value={data.y}
            onChange={this.onChange}
            />
          {/*  {errors.y && <InlineError text={errors.y} />} */}
            </Form.Field>

            {/*<Form.Field error={!!errors.z}>*/}
              <Form.Field>
              <input
              min="0" max="5" step="0.01"
            //  required
              type="number"
              id="z"
              name="z"
              placeholder="Z"
              value={data.z}
              onChange={this.onChange}
              />
            {/*  {errors.z && <InlineError text={errors.z} />} */}
              </Form.Field>

      </Form.Group>
  {/* <Button type='submit'>ESSA</Button>*/}
  <Button positive>Dodaj</Button>
       </Form>
     ))

  );
}
}


export default MebelAddForm;
