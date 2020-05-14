import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment'
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
        return(
            <div>
            <div className="container">
                
            
                {/* showing details  begin*/}
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