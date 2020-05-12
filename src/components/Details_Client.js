import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment'
import DefaultImg from '../assets/default-img.jpg';

class DetailsClient extends Component {

    constructor(props) {
        super(props);

        this.state = {
            client: []
        };
                
    }

    componentDidMount() {
        //Request to get "client" details by its ID
        axios.get('http://localhost:5000/Client/'+this.props.Id_Client)
          .then(clt => {
            this.setState({ client: clt.data })
            console.log(this.props.clt);
          })
          .catch((error) => {
            console.log(error);
          })
      }
      

    render(){
        let image = DefaultImg;
       if (this.state.client.imageClient){
        image = "http://localhost:5000/"+this.state.client.imageClient
       }  
        return(
            <div>
            <div className="container">
    
                {/* showing details  begin*/}

                <div className="row offset-2 ">
                <img src= {image} alt="Photo_de_profile" className="process__image offset-2"
                            width="150" height="150" /> 
                </div>
                <div className="row ">
                    <p><b>Nom: </b>   {this.state.client.NomClient}</p>
                </div>
                <div className="row ">
                    <p><b>Prénom: </b> {this.state.client.PrenomClient}</p>
                </div> 
                <div className="row "> 
                    <p><b>Date de naissance: </b>   {moment(this.state.client.DatenaissClient).format('DD/MM/YYYY')}</p>
                </div> 
                <div className="row">
                    <p><b>Profession: </b>  {this.state.client.ProfessionClient}</p>
                </div>  
                <div className="row ">
                    <p><b>Niveau d'études: </b> {this.state.client.NiveauClient}</p>
                </div> 
                <div className="row ">
                    <p><b>Adresse: </b>{this.state.client.AdresseClient}</p>
                </div>
                <div className="row ">
                    <p><b>Email: </b>{this.state.client.emailClient}</p>
                </div>
                <div className="row ">
                    <p><b>Tel: </b>{this.state.client.TelClient}</p>
                </div>
                  
                {/* showing details  end*/}

                
                   
            </div>
            
            </div>
    );    

}
}
export default DetailsClient;