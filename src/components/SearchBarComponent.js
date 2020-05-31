  
import React, { Component } from 'react';
import {InputGroup,FormControl,Form, Card,CardDeck} from 'react-bootstrap';
import axios from 'axios';
import { Input, CardSubtitle} from 'reactstrap';
import { Link } from 'react-router-dom';
import DefaultImg from '../assets/default-img.jpg'; 
import moment from 'moment';
//fonction qui permet d'afficher une formation dans une "Card"
function RenderFormations ({formation}) {  
      let image = DefaultImg;
      if (formation.imageFormation){
      image = "http://localhost:5000/"+formation.imageFormation;
      }
    return (    
    <CardDeck  >
        <Card key={formation._id} style={{width:"160px",height:"500px" }}>
            <Link to= {"/DetailFormation/"+ formation._id}  style={{color:"black",textDecorationLine:"none" }} > 
            <Card.Img variant="top" src={image} alt=""   style={{width:"100%",height:"222px" }}/>
            <Card.Body>
            <Card.Title>{formation.LibelleFormation}</Card.Title>
                    <Card.Subtitle >
                    Date Debut Formation:                     
                    </Card.Subtitle>
                    <Card.Text>
                    {moment(formation.DateDebutFormation).format('DD/MM/YYYY')}                     
                    </Card.Text>

                    <Card.Subtitle >
                    Date Fin Formation:                     
                    </Card.Subtitle>
                    <Card.Text>
                    {moment(formation.DateFinFormation).format('DD/MM/YYYY')}
                    </Card.Text>

                    <Card.Subtitle >
                    Theme:                     
                    </Card.Subtitle>
                    <Card.Text>
                    {formation.NomTheme}
                    </Card.Text> 
 
                    <Card.Subtitle >
                    Prix Formation:                     
                    </Card.Subtitle>
                    <Card.Text>
                    {formation.Prix}
                    </Card.Text>
                    
                    
            </Card.Body>

            </Link>
        </Card>
    </CardDeck>
    );
}   

//fonction qui permet d'afficher un centre dans une "Card"
function RenderCentres ({centre}) {   
    let image = DefaultImg;
    if (centre.image){
      image = "http://localhost:5000/"+centre.image;
    }
    return (
        <CardDeck> 
            <Card key={centre._id} style={{width:"160px",height:"500px" }}>
                <Link to= {"/DetailCentre/"+ centre._id} style={{color:"black",textDecorationLine:"none" }} > 
                <Card.Img variant="top" src={image} alt=""   style={{width:"100%",height:"222px" }}/>
                <Card.Body>
                <Card.Title>{centre.NomCentre}</Card.Title>

                    <Card.Subtitle >
                    Region Centre:                     
                    </Card.Subtitle>
                    <Card.Text>
                    {centre.RegionCentre}
                    </Card.Text>
                    <Card.Subtitle >
                    Tel Centre:                     
                    </Card.Subtitle>
                    <Card.Text>
                    {centre.TelCentre}
                    </Card.Text>
                    <Card.Subtitle >
                    Email Centre:                     
                    </Card.Subtitle>
                    <Card.Text>
                    {centre.EmailCentre}
                    </Card.Text>                

                </Card.Body>

                </Link>
            </Card> 
        </CardDeck>        
         
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
                    <div className="col-md-4 col-5 col-sm-6 " key={formation._id}>                    
                        <RenderFormations formation={formation}  key={formation._id}/> 
                    </div>    
                    )
                    })
                :
                filteredCentres.map(centre => { 
                    return  (
                    <div  className="col-md-4 col-5 col-sm-6 "  key={centre._id} >
                        <RenderCentres centre={centre}  key={centre._id}/>                    
                    </div>                   
                    )
                    })

        return( 
        <div className="container">   
            <div className=" ">
                <div className="row-12  justify-content-center">
                <Form>
                    <InputGroup  className="mb-3 searchbar">            
                        <Input className=" col-2  form-control critere"  
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
            </div>

            <div className= "row">                     
                {list} 
            </div>
                            
        </div>       
        
);
}

}

export default SearchBar;