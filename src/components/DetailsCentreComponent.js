import React, { Component } from 'react';
import {Breadcrumb, BreadcrumbItem, InputGroup,FormControl,Form,Card} from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Input} from 'reactstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from './HeaderComponent';
import HeaderClient from './Header_Client';
import DefaultImg from '../assets/default-img.jpg'; 
import {Image} from 'react-bootstrap';
class DetailCentreComponent extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);

        this.state = {
            centree:this.props.centre ? this.props.centre:JSON.parse(localStorage.getItem('object')),
 
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
        this._isMounted = true;
        //if we refresh and id get lost from the state we store it locally
        if(this.props.centre!==undefined)
        localStorage.setItem("object", JSON.stringify(this.props.centre));

        const {centree} = this.state;
        let ID_Centre = centree ? centree._id : "";

        //Request to get "centre" details by its ID
        axios.get('http://localhost:5000/Centre/'+ID_Centre)
          .then(centre => {
            if (this._isMounted) {
            this.setState({ centree: centre.data })
            console.log(this.props.centre);
          }})
          .catch((error) => {
            console.log(error);
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

      componentWillUnmount() {
        this._isMounted = false;
      }

      
    render(){
     
        const {centree} = this.state;
        let NomCentre = centree ? centree.NomCentre : "";
        let RegionCentre = centree ? centree.RegionCentre : "";
        let AdresseCentre = centree ? centree.AdresseCentre : "";
        let TelCentre = centree ? centree.TelCentre : "";
        let EmailCentre = centree ? centree.EmailCentre : "";
        let DescriptionCentre = centree ? centree.DescriptionCentre : "";
        let image = centree ? centree.image : "";
        
        let imageCentre = DefaultImg;
        if (image){
        imageCentre = "http://localhost:5000/"+image
        }  
    
      const themes = [...new Set(this.state.Formation.map(themes => themes.NomTheme    ))];

      const  {search} = this.state;
      const formabyname = this.state.Formation.filter( formation => formation.LibelleFormation.toLowerCase().indexOf(search.toLowerCase()) !== -1 ); 
      const formabycentre_withouttheme = formabyname.filter(formation => formation.NomCentre === NomCentre);
      
      const formabythem = formabyname.filter(formation => formation.NomTheme === this.state.NomTheme );
      const formabycentre_withtheme = formabythem.filter(formation => formation.NomCentre === NomCentre);

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

    const formationList = ( this.state.NomTheme === "") ?
        formabycentre_withouttheme.map((formation) =>
          <li key={formation._id} style={{listStyleType:"none"}}>
            <RenderFormations formation={formation}  key={formation._id}/>
            <br/>
          </li>
        )
        :
        formabycentre_withtheme.map((formation) =>
      <li key={formation._id} style={{listStyleType:"none"}}>
        <RenderFormations formation={formation}  key={formation._id}/>
        <br/>
      </li>
    );

        const {client} = this.props.authClient;
        const header = (client === null)  ?  <Header />  :   <HeaderClient />;
            
        return(
            <div>
                {header}
                 <div className="container">
                    {/*BreadCrumb begin */}
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem href="/">Accueil</BreadcrumbItem>
                            <BreadcrumbItem active>{NomCentre}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                        <h3>{NomCentre}</h3>
                            <hr />
                        </div>                
                    </div>
                    {/*BreadCrumb end */}
                    <div className="row ">
                <div className="col-4 col-md-4 ">
                 
                  <img src={imageCentre} alt="photo_du_centre" width="260px" height="290px"/>               
                   
                        
                        
                </div> 
                <div >
                  <br/>
                    {/* showing details  begin*/}                    
                    <p><b> <span className="fa fa-university"></span> Nom du centre:</b>   {NomCentre}</p>
                    <p><b> <span className="fa fa-map"></span> Region Centre:</b>   {RegionCentre}</p>
                    <p><b> <span className="fa fa-map-marker"></span> Adresse Centre:</b>   {AdresseCentre}</p>
                    <p><b> <span className="fa fa-phone"></span> Tel Centre:</b>   {TelCentre}</p>
                    <p><b> <span className="fa fa-envelope"></span> Email Centre:</b>   {EmailCentre}</p>
                    <p><b> <span className="fa fa-align-justify"></span> Description Centre:</b>  {DescriptionCentre}</p>                
                    {/* showing details  end*/}               
                   </div>
                   </div>
                   <br/>
                   <br/>
                   <h5>Formations proposées par ce centre: </h5>
                   <hr/>
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
            </div>
    );    

}
}

DetailCentreComponent.propTypes = {
    authClient: PropTypes.object.isRequired
  };  
  
  const mapStateToProps = state => ({
    authClient: state.authClient
  });
export default connect(mapStateToProps)(DetailCentreComponent);