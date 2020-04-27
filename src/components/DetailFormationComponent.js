import React, { Component } from 'react';
import {Breadcrumb, BreadcrumbItem,Button} from 'react-bootstrap';
import axios from 'axios';
import Header from '../components/HeaderComponent';
import Moment from 'react-moment';

class DetailFormationComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            formationn:this.props.formation ? this.props.formation:JSON.parse(localStorage.getItem('object'))
        };          
    }
    
    componentDidMount() {
        //if we refresh and id get lost from the state we store it locally
        if(this.props.formation!==undefined)
        localStorage.setItem("object", JSON.stringify(this.props.formation));

        const {formationn} = this.state;
        let ID_Formation = formationn ? formationn._id : "";
        //Request to get "formation" details by its ID
        axios.get('http://localhost:5000/Formation/'+ID_Formation)
          .then(formation => {
            this.setState({ formationn: formation.data })
            console.log(this.props.formation);
          })
          .catch((error) => {
            console.log(error);
          })
      } 
      
    render(){
        const {formationn} = this.state;
        let LibelleFormation = formationn ? formationn.LibelleFormation : "";
        let DateDebutFormation = formationn ? formationn.DateDebutFormation : "";
        let DateFinFormation = formationn ? formationn.DateFinFormation : "";
        let DescriptionFormation = formationn ? formationn.DescriptionFormation : "";
        let NomTheme = formationn ? formationn.NomTheme : "";
        let NomFormateur = formationn ? formationn.NomFormateur : "";
        let CapaciteFormation = formationn ? formationn.CapaciteFormation : "";
        let NomCentre = formationn ? formationn.NomCentre : "";

        return(
            <div>
                <Header />
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
                
                    <div className="container">            
                        {/* showing details  begin*/}
                        
                        <div className="row ">
                            <p><b>Date debut: </b>    
                            <Moment format="DD/MM/YYYY">{DateDebutFormation}</Moment></p> 
                        </div> 

                        <div className="row">                        
                            <p><b>Date fin:</b>  
                            <Moment format="DD/MM/YYYY">{DateFinFormation}</Moment> </p>                        
                        </div>             
                        
                        <div className="row">
                            <p><b>Description:</b> {DescriptionFormation}</p>
                        </div> 

                        <div className="row ">
                            <p><b>Theme:</b> {NomTheme}</p>
                        </div>

                        <div className="row ">
                            <p><b>Formateur:</b> {NomFormateur}</p>
                        </div> 
                        
                        <div className="row ">
                            <p><b>Capacité:</b> {CapaciteFormation}</p>
                        </div> 

                        <div className="row ">
                            <p><b>  Nom du centre:</b>   {NomCentre}</p>
                        </div>
                            
                        {/* showing details  end*/}

                        {/* s'inscrire Button  begin*/}
                        <div className="row ">  
                            <Button type="submit" color="primary">
                                S'inscrire
                            </Button>
                        </div>   
                        {/* s'inscrire Button  end*/}
                    
                    </div>
                </div>
            </div>
    );    

}
}
export default DetailFormationComponent;