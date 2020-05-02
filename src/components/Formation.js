import React, { Component } from "react";
import Header from './HeaderComponent';

import {InputGroup,FormControl,Form} from 'react-bootstrap';

import {Input} from 'reactstrap';
import axios from 'axios';

class Formation extends Component {
  
    constructor() {
        super();
        this.state = {
            formation:[],
            Formation:[],
            themes:[],
            NomTheme:""
        };
        this.onChangeNomTheme = this.onChangeNomTheme.bind(this);
    }

    onChangeNomTheme(e) {
        this.setState({
            NomTheme: e.target.value
        });
    }


    componentDidMount() {
        //themes axios get 
        axios.get('http://localhost:5000/Theme/')
          .then(themes => {
            if (themes.data.length > 0) {
              this.setState({
                themes: themes.data.map(themes => themes.NomTheme),
              })
            }
          })

          //Récupérer les formtaions de la base de données
          axios.get('http://localhost:5000/Formation/')
          .then(Formation => {
            this.setState({ Formation: Formation.data })
          })
          .catch((error) => {
            console.log(error);
          })
      } 

      

render() {  
  const forma = this.state.Formation.filter(Formation => 
    Formation.NomTheme === this.state.NomTheme ).map((Formation) =>
  <div key={Formation._id}>
    <h3>{Formation.LibelleFormation}</h3>
    <p>{Formation.NomTheme}</p>

  </div>
);


  const formationList = this.state.Formation.map((Formation) =>
  <div key={Formation._id}>
    <h3>{Formation.LibelleFormation}</h3>
    <p>{Formation.NomTheme}</p>

  </div>
);

let  affichage ;
if (this.state.NomTheme === "") {
  
  affichage=formationList ;


 }else{
    affichage= forma; 
  }



    return (
        <div>
            <Header />
            <br/>
            <br/>
            <div className="container">
            <Form>
            
              <InputGroup  className="mb-3 searchbar">
              <Input className=" col-2 form-control"  required type="select"  id="NomTheme" name="NomTheme"
                value={this.state.NomTheme} onChange={this.onChangeNomTheme} >
                <option value="" > All </option>
                  {
                    this.state.themes.map(function(themes) {
                    return (                               
                      <option key={themes._id} value={themes}> {themes} </option>                                  
                        ) ;})
                  } 
              </Input>                            
              
              <FormControl aria-describedby="basic-addon1" 
                  onChange={this.onchange} />                         
               </InputGroup>                   
            </Form>
         
              {affichage}
            
            </div>
          

        </div>
        );
    }
}

export default Formation;
  
 


