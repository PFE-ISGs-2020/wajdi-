import React, { Component } from 'react';
import {Breadcrumb, BreadcrumbItem,Button} from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from './HeaderComponent';
import HeaderClient from './Header_Client';
import DefaultImg from '../assets/default-img.jpg';
import Footer from './FooterComponent';

class DetailFormationComponent extends Component {  
    _isMounted = false;
    constructor(props) {
        super(props);

        this.state = {
            formationn:this.props.formation ? this.props.formation:JSON.parse(localStorage.getItem('object')),
            Inscription: "",
            message: "",
            centre:""
        };          
    }
    
    componentDidMount() {
        this._isMounted = true;
        //if we refresh and id get lost from the state we store it locally
        if(this.props.formation!==undefined){
        localStorage.setItem("object", JSON.stringify(this.props.formation));

        const {formationn} = this.state;
        let ID_Formation = formationn ? formationn._id : "";
        
        //Request to get "formation" details by its ID
        axios.get('http://localhost:5000/Formation/'+ID_Formation)
          .then( formation => {
            if (this._isMounted) {
            this.setState({ formationn: formation.data })
            }
        })

        axios.get('http://localhost:5000/Centre/FindByName/'+formationn.NomCentre)
          .then( centre => {
            if (this._isMounted) {
            this.setState({ centre: centre.data })
            }
        })
        }


      }

      componentWillUnmount() {
        this._isMounted = false;
      } 

    render(){
        const {formationn} = this.state;
        const centre = this.state.centre;
        let LibelleFormation = formationn ? formationn.LibelleFormation : "";
        let DateDebutFormation = formationn ? formationn.DateDebutFormation : "";
        let DateFinFormation = formationn ? formationn.DateFinFormation : "";
        let DescriptionFormation = formationn ? formationn.DescriptionFormation : "";
        let NomTheme = formationn ? formationn.NomTheme : "";
        let NomFormateur = formationn ? formationn.NomFormateur : "";
        let CapaciteFormation = formationn ? formationn.CapaciteFormation : "";
        let NomCentre = formationn ? formationn.NomCentre : "";
        let image = formationn ? formationn.imageFormation : "";
        
        let imageFormation = DefaultImg;
        if (image){
            imageFormation = "http://localhost:5000/"+image ;
        }
        const {client} = this.props.authClient;
        const header = (client === null) ? <Header /> :  <HeaderClient /> ;

        return(
            <div>
                 {header}
                <div className="container">
                    <br/>
                    {/*BreadCrumb begin */}
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem href="/">Accueil</BreadcrumbItem>
                            <BreadcrumbItem active>{LibelleFormation}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                        <h3>{LibelleFormation}</h3>
                            <hr />
                        </div>                
                    </div>
                    {/*BreadCrumb end */}
                
                    <div className="container ">    
                        {/* showing details  begin*/}
                        <div className="row">                 
                            <img src={imageFormation} alt="photo_de_la_formation" width="600px" height="300px"/>                      
                        </div>
                        <br/>
                        <div>
                        <div className="row"> 
                            <p><b><span className="fa fa-university"></span> Nom du centre:</b> <a href= { "/DetailCentre/" + centre} > {NomCentre} </a> </p>
                        </div>
                        <div className="row">
                            <p><b><span className="fa fa-calendar"></span> Date debut: </b>  
                            {moment(DateDebutFormation).format('DD/MM/YYYY')}</p> 
                        </div> 
                        <div className="row">                        
                            <p><b><span className="fa fa-calendar"></span> Date fin:</b>  
                            {moment(DateFinFormation).format('DD/MM/YYYY')}</p>                        
                        </div>             
                        <div className="row ">
                            <p><b><span className="fa fa-tag"></span> Theme:</b> {NomTheme}</p>
                        </div>
                        <div className="row ">
                            <p><b> <span className="fa fa-user"></span> Formateur:</b> {NomFormateur}</p>
                        </div> 
                        <div className="row ">
                            <p><span className="fa fa-users"></span><b> Capacité:</b> {CapaciteFormation}</p>
                        </div> 
                        <div className="row">
                            <p><span className="fa fa-align-justify"></span><b> Description:</b> {DescriptionFormation}</p>
                        </div> 
                        </div>
                        {/* showing details  end*/}

                        {/* s'inscrire Button  begin*/}
                        <div className="form-group row" onClick={()=>

                            {
                                if(client){                                    
                                    if(moment().isBefore(DateDebutFormation ) ){
                                        const inscription = {
                                            Id_Client:client.id,
                                            EtatInscription:false,
                                            Id_Formation: this.state.formationn._id
                                            }
                                        //console.log(inscription);
                                        axios.post('http://localhost:5000/Details_Inscription/add', inscription)
                                        .then(res => {
                                        alert(res.data );})  
                                    }else{
                                        alert("Vous ne pouvez pas s'inscrire à cette formation car elle est dépassée ");
                                    }                                    

                                }else{
                                    alert("Il faut être authentifié");
                                }

                            } 

                        
                        }>  
                            <Button type="submit" color="primary">
                                S'inscrire
                            </Button>
                            <br/>
                        </div>   

                        {/* s'inscrire Button  end*/}
                        </div>
                    
                    
               
                <br/>
                
            </div>
            <Footer/>
            </div> 
    );    

}
}


DetailFormationComponent.propTypes = {
    authClient: PropTypes.object.isRequired
  };  
  
  const mapStateToProps = state => ({
    authClient: state.authClient
  });
  
export default connect(mapStateToProps)(DetailFormationComponent);