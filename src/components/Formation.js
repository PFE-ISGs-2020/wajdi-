import React, { Component } from "react";
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import SearchBar from './SearchBarComponent';
import {FormGroup,Form,  Input, Col } from 'reactstrap';
import axios from 'axios';

class Formation extends Component {
  
    constructor() {
        super();
        this.state = {
            formation:[],
            Formation:null,
            themes:[],
            NomTheme:""
        };
        this.onChangeNomTheme = this.onChangeNomTheme.bind(this);

    }

    onChangeNomTheme(e) {
        this.setState({
            NomTheme: e.target.value
        });

               //Récupérer les formtaions de la base de données selon le type choisie 
               axios.get('http://localhost:5000/Formation/'+this.state.NomTheme)
               .then(formation => {
                 this.setState({ formation: formation.data })
                 console.log(formation);
               })
               .catch((error) => {
                 console.log(error);
             })
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
      } 


render() {  
  
  const formationList = this.state.formation.map((formation) =>
  <div key={formation._id}>
    <h3>{formation.LibelleFormation}</h3>
    <p>{formation.NomTheme}</p>
  </div>
);

    return (
        <div>
            <Header />
            <br/>
            <br/>
            <div className="container">
            <Form onSubmit={this.onSubmit}>
                <FormGroup row>
                    <Col md={3}>
                    <Input className="form-control"  required type="select"  id="NomTheme" name="NomTheme"
                        value={this.state.NomTheme} onChange={this.onChangeNomTheme} >
                        {
                            this.state.themes.map(function(themes) {
                            return <option 
                                    key={themes._id}
                                    value={themes}>{themes}0
                                    </option>;
                                    })
                                } 
                    </Input>                            
                    </Col>                        
                </FormGroup>             
                                
            </Form>
             { formationList }
            </div>


        </div>
        );
    }
}

export default Formation;
  
 


