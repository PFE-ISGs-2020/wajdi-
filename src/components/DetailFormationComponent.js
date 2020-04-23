import React, { Component } from 'react';
import {Breadcrumb, BreadcrumbItem,Button} from 'react-bootstrap';
import axios from 'axios';
import CardFormation from './CardFormation'
import Header from '../components/HeaderComponent';

class DetailFormationComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            formationn: []
        };          
    }

    componentDidMount() {
        //Request to get "formation" details by its ID
        axios.get('http://localhost:5000/Formation/'+this.props.formation._id)
          .then(formation => {
            this.setState({ formationn: formation.data })
            console.log(this.props.formation);
          })
          .catch((error) => {
            console.log(error);
          })
          
      } 
      

    render(){
        return(
            <div>
                <Header />
                <div className="container">
                    {/*BreadCrumb begin */}
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem href="/">Accueil</BreadcrumbItem>
                            <BreadcrumbItem active>{this.state.formationn.LibelleFormation}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                        <h3>{this.state.formationn.LibelleFormation}</h3>
                            <hr />
                        </div>                
                    </div>
                    {/*BreadCrumb end */}
                
                    {/* showing details  begin*/}
                    
                    <CardFormation  Id_Formation={this.props.formation._id} />
                
                        <p><b>  Nom du centre:</b>   {this.state.formationn.NomCentre}</p>
                    
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
    );    

}
}
export default DetailFormationComponent;