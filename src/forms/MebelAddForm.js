import React from 'react';
import { Form, Button, Divider, Select} from 'semantic-ui-react';
import PropTypes from 'prop-types';

const categoryOptions = [
  'sralnia','dupa','chuj'
]

const sizes = ['small']
//['mini', 'tiny', 'small', 'large', 'big', 'huge', 'massive']

class MebelAddForm extends React.Component {
  state = {
    data: {
      name: '',
      icon: '',
      category: '',
      description:'',
      x:'',
      y:'',
      z:''
    },
    loading: false,
    //errors:{}
    on:false
  };

onChange = e => this.setState({
  data: { ...this.state.data, [e.target.name]: e.target.value}});

onSubmit = () => {
  this.props.submit(this.state.data);
}

// constructor(){
//     super();
//
//     this.state={
//       on:false
//     };
//   }

  togglePodaj = () => {
    this.setState({
      on: true
    })
  }

  toggleWybierz = () => {
    this.setState({
      on: false
    })
  }

/*onSubmit = () => {
  const errors = this.validate(this.state.data);
  this.setState({errors});
  //sprawdzanie czy errors jest puste
  if (Object.keys(errors).length === 0) {
    this.props.submit(this.state.data);
  }
};
/*
validate = (data) => {
  const errors = {};
  var letters = /^[A-Za-z]+$/;
  var signs = /[+-,]/;

  if (data.name){
    if(!data.name.match(letters)){
      errors.name = "Mordo, tylko LITERY"
    }
  }
  if (!data.name) errors.name = "Nie może być puste mordo";

  if (!data.icon) errors.icon = "Nie może być puste mordo";

  if (!data.category) errors.category = "Nie może być puste mordo";

  if (!data.description) errors.description = "Nie może być puste mordo";

  if (!data.x) errors.x = "Nie może być puste mordo";
//  if (data.x){
  //  if(!data.x.match(signs)){
    //  errors.x = "nie świruj, użyj KROPKI jak chcesz decimal";
  //  }

  if (!data.y) errors.y = "Nie może być puste mordo";
  //if (data.y){
    //if(!data.y.match(signs)){
      //errors.y = "nie świruj, użyj KROPKI jak chcesz decimal";
    //}
  //}

  if (!data.z) errors.z = "Nie może być puste mordo";
  //if (data.z){
    //if(!data.z.match(signs)){
    //  errors.z = "nie świruj, użyj KROPKI jak chcesz decimal";
    //}
  //}

  return errors;

}
*/



componentDidMount(){
    var name = document.getElementById("name");
    var select = document.getElementById("selekt")
    var alal = this.props.category
    for (var i=0; i<alal.length; i++){
      var opt = alal[i];
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
    }

   name.addEventListener("input", function (event) {
    if (name.validity.patternMismatch) {
      name.setCustomValidity("Używaj tylko liter.");
    } else {
      name.setCustomValidity("");
    }
    })
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
     pattern="[a-zA-Z]+"
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
     <Button type="button" active={!this.state.on} onClick={this.toggleWybierz}>Wybierz</Button>
     <Button type="button" active={this.state.on} onClick={this.togglePodaj}>Podaj własną</Button>
     <div className='pusty'></div>
     {!this.state.on && <select id="selekt" style = {{width: "100%"}} placeholder='WYBIERZ RYJU'>
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


     <div className='formaAddMebel'></div>
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
   <Button type='submit'>ESSA</Button>
         <Divider hidden />
       </Form>
     ))

  );
}
}

MebelAddForm.propTypes = {
  submit: PropTypes.func.isRequired
};


export default MebelAddForm;
