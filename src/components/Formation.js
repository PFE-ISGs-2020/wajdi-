import React, { Component } from "react";
import Header from './HeaderComponent';
import {InputGroup,FormControl,Form,Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {Input} from 'reactstrap';
import axios from 'axios';
 
class Formation extends Component {
  
    constructor() {
        super();
        this.state = {
            formation:[],
            Formation:[],
            themes:[],
            NomTheme:"",
            search: ''
        };
        this.onChangeNomTheme = this.onChangeNomTheme.bind(this);
        this.onchange = this.onchange.bind(this);
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
                themes: themes.data.map(theme => theme.NomTheme) })
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

      //on change for the search bar
      onchange = e => {
        this.setState({ search: e.target.value });
      };

render() { 
  const  {search} = this.state;
  const formabyname = this.state.Formation.filter( formation => formation.LibelleFormation.toLowerCase().indexOf(search.toLowerCase()) !== -1 ); 
  const formabythem = formabyname.filter(formation => formation.NomTheme === this.state.NomTheme );
  
  //fonction qui permet d'afficher une formation dans une "Card"
function RenderFormations ({formation}) {    
  return (     
      <Card  className="card ">            
          <Link to= {"/DetailFormation/"+ formation._id}  style={{color:"black",textDecorationLine:"none" }} > 
          <Card.Header className="cardhead" as="h5"  >{formation.LibelleFormation}</Card.Header>
          <Card.Body className="cardbody">
              <Card.Title>Description:</Card.Title>                
              <Card.Text>{formation.DescriptionFormation}</Card.Text>
          </Card.Body>
          </Link>            
      </Card> 
   
  );
}
const formationList = ( this.state.NomTheme === "") ?

   formabyname.map((formation) =>
    <div>
      <RenderFormations formation={formation}  key={formation._id}/>
      <br/>
    </div>
  )
  :
  formabythem.map((formation) =>
  <div>
    <RenderFormations formation={formation}  key={formation._id}/>
    <br/>
  </div>
);

    return (
        <div>
            <Header />
            <br/>
            <br/>
            <div className="container">
            <Form>
            
              <InputGroup  className="mb-3 searchbar">
              <Input className=" col-2 form-control"  required type="select"  
              id="NomTheme" name="NomTheme"
              style={{
                backgroundColor: "#FCCA92",
                borderRightStyle: "solid",
                borderRightWidth: "1px",
                borderRightColor:"#0A3642",
                color:"#0A3642"}}
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
                  style={{borderLeftStyleStyle: "solid",
                  borderLeftWidthWidth: "1px",
                  borderLeftColor:"#0A3642" }} 
                  value={this.state.search}
                  onChange={this.onchange} />                         
               </InputGroup>                   
            </Form>
              
                {formationList}
                  
              
            
            
            </div>
          

        </div>
        );
    }
}

export default Formation;
  
 


