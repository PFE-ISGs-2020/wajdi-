import React, { Component } from "react";
import {InputGroup,FormControl,Form,Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {Input} from 'reactstrap';
import axios from 'axios';
 
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from './HeaderComponent';
import HeaderClient from './Header_Client';
class CentreFormation extends Component {
  
    constructor() {
        super();
        this.state = {
            Centre:[],
            region:[],
            Region:"",
            search: ''
        };
        this.onChangeRegion = this.onChangeRegion.bind(this);
        this.onchange = this.onchange.bind(this);
    }

    onChangeRegion(e) {
        this.setState({
            Region: e.target.value
        });
    }


    componentDidMount() {

            //Récupérer les centres de la base de données
            axios.get('http://localhost:5000/Centre/')
            .then(centre => {
            this.setState({ Centre: centre.data })
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
  const region = [...new Set(this.state.Centre.map(region => region.RegionCentre    ))];

  const  {search} = this.state;
  const centrebyname = this.state.Centre.filter( centre => centre.NomCentre.toLowerCase().indexOf(search.toLowerCase()) !== -1 ); 
  const centrebyregion = centrebyname.filter(centre => centre.RegionCentre === this.state.Region );
  
 //fonction qui permet d'afficher un centre dans une "Card"
function RenderCentres ({centre}) {   
    return (        
        <Card className="card" key={centre._id}>            
            <Link to= {"/DetailCentre/"+ centre._id} style={{color:"black",textDecorationLine:"none" }} > 
                <Card.Header className="cardhead" as="h5">{centre.NomCentre}</Card.Header>
                <Card.Body>
                    <Card.Title>Description:</Card.Title>
                    <Card.Text>{centre.DescriptionCentre}</Card.Text>
                </Card.Body>
            </Link>
         </Card>        
    );
} 

const centreList = ( this.state.Region === "") ?

    centrebyname.map((centre) =>
    <li key={centre._id} style={{listStyleType:"none"}}>
      <RenderCentres centre={centre}  key={centre._id}/>
      <br/>
    </li>
  )
  :
  centrebyregion.map((centre) =>
  <li key={centre._id} style={{listStyleType:"none"}}>
    <RenderCentres centre={centre}  key={centre._id}/>
    <br/>
  </li>
);


const {client} = this.props.authClient;
const header = (client === null) ?
  <Header /> 
:       
  <HeaderClient />

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
                value={this.state.Region} onChange={this.onChangeRegion} >
                <option value="" > Région ... </option>
                  {
                    region.map(function(Region) {
                    return (                               
                      <option key={Region} value={Region}> {Region} </option>                            
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
              
                {centreList}

            </div>
          

        </div>
        );
    }
}

CentreFormation.propTypes = {
  authClient: PropTypes.object.isRequired
};  

const mapStateToProps = state => ({
  authClient: state.authClient
});
export default  connect(mapStateToProps)(CentreFormation);
  
 


