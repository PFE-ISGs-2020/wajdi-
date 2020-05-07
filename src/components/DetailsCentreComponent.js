import React, { Component } from 'react';
import {Breadcrumb, BreadcrumbItem} from 'react-bootstrap';
import axios from 'axios';
import Header from '../components/HeaderComponent';

class DetailCentreComponent extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);

        this.state = {
            centree:this.props.centre ? this.props.centre:JSON.parse(localStorage.getItem('object'))
        };                
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
      }       

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
        return(
            <div>
                <Header />
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
    );    

}
}
export default DetailCentreComponent;