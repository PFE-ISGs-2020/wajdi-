import React, { Component } from "react";
import {  Form } from 'reactstrap';
import axios from 'axios';
import {FormGroup, Label,  Input, Col } from 'reactstrap';

export default class ModifierTheme extends Component {
  
    
    constructor(props) {
    super(props);
    this.onChangeNomTheme = this.onChangeNomTheme.bind(this)
    this.onSubmit = this.onSubmit.bind(this); 

    this.state = {
        NomTheme: this.props.Theme.NomTheme,
        
    };
  }

  onChangeNomTheme(e) {
    this.setState({
        NomTheme: e.target.value
    });
}

  
onSubmit(e) {
    e.preventDefault();
    const theme = {
        NomTheme: this.state.NomTheme
    }

    console.log(theme);

    axios.post('http://localhost:5000/Theme/update/' + this.props.Theme._id, theme)
      .then(res => console.log(res.data));
      window.location = '/ThemeList';
  }
  
render() {
    
return (
      <div className="row row-content justify-content-center">
        <div  className="col-12">
            
        <Form  onSubmit={this.onSubmit}>
                <FormGroup row>
                    <Label htmlFor="NomTheme" md={5}>Nom Thème:</Label>
                        <Col md={7}>

                            <Input  type="text" id="NomTheme" name="NomTheme" required
                             placeholder="Nom Thème" value={this.state.NomTheme}
                             onChange={this.onChangeNomTheme} />

                        </Col>
                </FormGroup>
                <FormGroup row>
                  <Label md={5}></Label>
                    <Col md={7}> 
                      <br/>                       
                      <input type="submit" value="Modifier " className="btn btn-primary " />                         
                      <a className="offset-1 btn btn-secondary" href="/ThemeList">
                          Annuler
                      </a>
                    </Col>        
                </FormGroup> 
              </Form>
            
        </div>
      </div>
    );
  }
}
