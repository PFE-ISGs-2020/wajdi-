  
import React, { Component } from 'react';
import {InputGroup,FormControl,Card,Form} from 'react-bootstrap';
import axios from 'axios';
import { Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import DefaultImg from '../assets/default-img.jpg'; 
import {Image} from 'react-bootstrap';

//fonction qui permet d'afficher une formation dans une "Card"
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

//fonction qui permet d'afficher un centre dans une "Card"
function RenderCentres ({centre}) {   
    let image = DefaultImg;
    if (centre.image){
      image = "http://localhost:5000/"+centre.image;
    }
    return (        
        <Card className="card" key={centre._id}>            
            <Link to= {"/DetailCentre/"+ centre._id} style={{color:"black",textDecorationLine:"none" }} > 
                <Card.Header className="cardhead" as="h5">{centre.NomCentre}</Card.Header>
                <Card.Body>
                <div className="row">
                    <div className="col-12 col-lg-5">
                        <Image src={image} style={{backgroundColor:"white"}} height="200px" width="380px" rounded /></div>
                    <div className="col-12 col-sm-7">
                    <Card.Title>Description:</Card.Title>
                    <Card.Text>{centre.DescriptionCentre}</Card.Text>
                    </div>
                </div>
                </Card.Body>
            </Link>
         </Card>        
    );
} 

class SearchBar extends Component {
  
    constructor(props) {
        super(props);
        this.onChangeCritere = this.onChangeCritere.bind(this);
        this.onchange = this.onchange.bind(this);

        this.state = {Formation: [],
                      Centre:[],
                      selectedFormation : null,
                      Critere:"Formation",
                      search: ''}    
      }      

      //on change for the search bar
      onchange = e => {
        this.setState({ search: e.target.value });
      };

      onChangeCritere = e => {
        this.setState({
            Critere: e.target.value
        });
    }
    
      componentDidMount() {
        //Récupérer les formtaions de la base de données
        axios.get('http://localhost:5000/Formation/')
          .then(formation => {
            this.setState({ Formation: formation.data })

          })
          .catch((error) => {
            console.log(error);
        })
        //Récupérer les centres de la base de données
        axios.get('http://localhost:5000/Centre/')
          .then(centre => {
            this.setState({ Centre: centre.data })
          })
          .catch((error) => {
            console.log(error);
        })

      }   
  
     
      render() { 
        const  {search} = this.state;
            
        const filteredFormations = this.state.Formation.filter(formation => {
            return formation.LibelleFormation.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        }); 
        
        const filteredCentres = this.state.Centre.filter(centre => {
            return centre.NomCentre.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });

        let list=(this.state.Critere === "Formation") ?
                filteredFormations.map(formation => { 
                    return (
                    <li key={formation._id} style={{listStyleType:"none"}}>
                    <RenderFormations formation={formation}  key={formation._id}/>
                    <br/>
                    </li>                    
                    )
                    })
                :
                filteredCentres.map(centre => { 
                    return  (
                    <li key={centre._id} style={{listStyleType:"none"}}>
                    <RenderCentres centre={centre}  key={centre._id}/> 
                    <br/>
                    </li>                   
                    )
                    })

        return(        
        <div className="container">
            <div className="row-12 justify-content-center">
                <Form>
                    <InputGroup  className="mb-3 searchbar">            
                        <Input className=" col-2 form-control critere"  
                        required type="select"    
                        style={{
                        backgroundColor: "#FCCA92",
                        borderRightStyle: "solid",
                        borderRightWidth: "1px",
                        borderRightColor:"#0A3642",
                        color:"#0A3642"}}
                        value={this.state.Critere} 
                        onChange={this.onChangeCritere} 
                        name="Critere">
                            <option>Formation</option>
                            <option>Centre</option>
                        </Input>   
                        
                        <FormControl aria-describedby="basic-addon1" 
                        style={{borderLeftStyleStyle: "solid",
                                borderLeftWidthWidth: "1px",
                                borderLeftColor:"#0A3642" }}
                        onChange={this.onchange} />

                    </InputGroup>
                </Form> 

            </div>
            {list}                               
           
        </div>
);
}

}

export default SearchBar;