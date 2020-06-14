import React, { Component } from 'react';
import {Breadcrumb, BreadcrumbItem, InputGroup,FormControl,Form,Card, CardDeck} from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Input} from 'reactstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import HeaderClient from './Header_Client';
import DefaultImg from '../assets/default-img.jpg'; 
import moment from 'moment';
import StarRatingComponent from 'react-star-rating-component';

class DetailCentreComponent extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);

        this.state = {
            centree:this.props.centre ? this.props.centre:JSON.parse(localStorage.getItem('object')),
 
            Formation:[],
            themes:[],
            NomTheme:"",
            search: '',
            rating: 0,
            Eval: []
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
        if(this.props.centre!==undefined){
        localStorage.setItem("object", JSON.stringify(this.props.centre));

        const {centree} = this.state;
        let ID_Centre = centree ? centree._id : "";
        let i = 1;
        let Rating = 0;
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
          //recuperer ratings
          /* axios.get('http://localhost:5000/Evaluation_Formation/Rating_Centre/'+ this.state.centree.NomCentre)
          .then(Eval => {
            this.setState({ Eval: Eval.data.filter(eval=> eval.Id_Formation != null) })  
            }
          )
          .catch((error) => {
            console.log(error);
          })*/
         // console.log(this.state.Eval)
        }   
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
      const formabycentre = formabyname.filter(formation => formation.NomCentre === NomCentre);
      const formabythem = formabycentre.filter(formation => formation.NomTheme === this.state.NomTheme );


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

    const formationList = ( this.state.NomTheme === "") ?
        formabycentre.map((formation) =>
        <div className="col-md-4 col-5 col-sm-6 " key={formation._id}>                    
          <RenderFormations formation={formation}  key={formation._id}/> 
        </div>
        )
        :
        formabythem.map((formation) =>
        <div className="col-md-4 col-5 col-sm-6 " key={formation._id}>                    
        <RenderFormations formation={formation}  key={formation._id}/> 
    </div>
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
                      <div className="col-4 col-md-4 " >
                        <img src={imageCentre} alt="photo_du_centre" width="260px" height="290px"/>      
                      </div> 
                      
                      <div  >
                        <br/>
                          {/* showing details  begin*/} 
                          <StarRatingComponent 
                            name={NomCentre} 
                            starCount={5} 
                            value={this.state.rating} 
                            editing={false}
                   />    
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
                    
                    <div className= "row"> 
                     {formationList}
                    </div>
            
                  </div>
          

            </div>
            <br/>
              <Footer/>
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