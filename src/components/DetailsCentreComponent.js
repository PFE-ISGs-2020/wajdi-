import React, { Component } from 'react';
import {Breadcrumb, BreadcrumbItem} from 'react-bootstrap';
import axios from 'axios';

class DetailCentreComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            centre: []
        };                
    }

    componentDidMount() {
        //Request to get "centre" details by its ID
        axios.get('http://localhost:5000/Centre/'+this.props.centre._id)
          .then(centree => {
            this.setState({ centre: centree.data })
            console.log(this.props.centre);
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
                            <BreadcrumbItem href="/">Accueil</BreadcrumbItem>
                            <BreadcrumbItem active>{this.state.centre.NomCentre}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                        <h3>{this.state.centre.NomCentre}</h3>
                            <hr />
                        </div>                
                    </div>
                    {/*BreadCrumb end */}
                
                    {/* showing details  begin*/}
                    
                    <p><b>  Nom du centre:</b>   {this.state.centre.NomCentre}</p>
                    <p><b>  Region Centre:</b>   {this.state.centre.RegionCentre}</p>
                    <p><b>  Adresse Centre:</b>   {this.state.centre.AdresseCentre}</p>
                    <p><b>  Tel Centre:</b>   {this.state.centre.TelCentre}</p>
                    <p><b>  Email Centre:</b>   {this.state.centre.EmailCentre}</p>
                    <p><b>  Description Centre:</b>   {this.state.centre.DescriptionCentre}</p>
                
                    
                    
                    {/* showing details  end*/}               
                   
                </div>
            </div>
    );    

}
}
export default DetailCentreComponent;