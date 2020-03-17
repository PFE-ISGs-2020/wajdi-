import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Breadcrumb, BreadcrumbItem,Button} from 'react-bootstrap';
import axios from 'axios';
import SearchBar from './SearchBarComponent';
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
            <div className="container">
                {/*BreadCrumb begin */}
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem href="/home">Home</BreadcrumbItem>
                        <BreadcrumbItem active>{this.state.formationn.LibelleFormation}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                    <h3>{this.state.formationn.LibelleFormation}</h3>
                        <hr />
                    </div>                
                </div>
                 {/*BreadCrumb end */}
            
                {/* showing details  begin*/}
                <div className="row ">
                    <p>Nom formation:   {this.state.formationn.LibelleFormation}</p>
                </div>
                <div className="row ">
                    <p>Date debut:  {this.state.formationn.DateDebutFormation}</p>
                </div> 
                <div className="row ">
                    <p>Date fin:    {this.state.formationn.DateFinFormation}</p>
                </div> 
                <div className="row ">
                    <p>Nom du centre:   {this.state.formationn.nomcentre}</p>
                </div>  
                <div className="row ">
                    <p>Description: {this.state.formationn.DescriptionFormation}</p>
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
            {/* searching bar and botton begin*/}
            <div className="container">
            <br/>
                <SearchBar />
            </div>
                
            {/* searching bar and botton  end*/}
            </div>
    );    

}
}
export default DetailFormationComponent;