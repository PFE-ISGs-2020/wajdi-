import React, { Component } from "react";
import {InputGroup,FormControl,Form,Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {Input} from 'reactstrap';
import axios from 'axios';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from './HeaderComponent';
import HeaderClient from './Header_Client';

import DefaultImg from '../assets/default-img.jpg'; 
import {Image} from 'react-bootstrap';

class Formation extends Component {
  
    constructor() {
        super();
        this.state = {
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
 
  function RenderFormations ({formation}) {  
    let image = DefaultImg;
    if (formation.imageFormation){
    image = "http://localhost:5000/"+formation.imageFormation;
    }
  return (   
      <Card  className="card " key={formation._id}>            
          <Link to= {"/DetailFormation/"+ formation._id}  style={{color:"black",textDecorationLine:"none" }} > 
          <Card.Header className="cardhead" as="h5"  >{formation.LibelleFormation}</Card.Header>
          <Card.Body className="cardbody">
              <div className="row">
                  <div className="col-12 col-lg-5">
                      <Image src={image} style={{backgroundColor:"white"}} height="250px" width="380px" rounded /></div>
                  <div className="col-12 col-sm-7">
                  <Card.Title>Description:</Card.Title>                
                  <Card.Text>{formation.DescriptionFormation}</Card.Text>
                  </div>
              </div>
          </Card.Body>
          </Link>            
      </Card> 
   
  );
} 
  
const themes = [...new Set(this.state.Formation.map(themes => themes.NomTheme    ))];

const  {search} = this.state;
const formabyname = this.state.Formation.filter( formation => formation.LibelleFormation.toLowerCase().indexOf(search.toLowerCase()) !== -1 ); 
const formabythem = formabyname.filter(formation => formation.NomTheme === this.state.NomTheme );

const formationList = ( this.state.NomTheme === "") ?

   formabyname.map((formation) =>
      <li key={formation._id} style={{listStyleType:"none"}}>
      <RenderFormations formation={formation}  key={formation._id}/>
      <br/>
      </li>
      
    )
    :
    formabythem.map((formation) =>
      <li key={formation._id} style={{listStyleType:"none"}}>
        <RenderFormations formation={formation}  key={formation._id}/>
        <br/>
      </li>
    );


    const {client} = this.props.authClient;
    const header = (client === null)  ?  <Header />  :   <HeaderClient />;
     
    return (
        <div>
            {header}
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
                <option value="" key={""}> Type ... </option>
                  {
                    themes.map(function(NomTheme) {
                    return (                          
                      <option key={NomTheme} value={NomTheme}> 
                      {NomTheme}
                      </option>                            
                        ) ;})
                  } 
              </Input>                            
              
              <FormControl aria-describedby="basic-addon1"
                  style={{borderLeftStyleStyle: "solid",
                  borderLeftWidthWidth: "1px",
                  borderLeftColor:"#0A3642" }} 
                  value={this.state.search}
                  onChange={this.onchange} placeholder="Search.." />                         
               </InputGroup>                   
            </Form>
              
                {formationList}
                  
              
            
            
            </div>
          

        </div>
        );
    }
}

Formation.propTypes = {
  authClient: PropTypes.object.isRequired
};  

const mapStateToProps = state => ({
  authClient: state.authClient
});

export default  connect(mapStateToProps)(Formation) ;
  