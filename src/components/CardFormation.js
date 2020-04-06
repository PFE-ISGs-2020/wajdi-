import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'react-moment';

class CardFormation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            formation: []
        };
                
    }

    componentDidMount() {
        //Request to get "formation" details by its ID
        axios.get('http://localhost:5000/Formation/'+this.props.Id_Formation)
          .then(frm => {
            this.setState({ formation: frm.data })
            console.log(this.props.frm);
          })
          .catch((error) => {
            console.log(error);
          })
      }
      

    render(){
       // const dateToFormat = this.state.formation.DateDebutFormation;var datedeb = moment(this.state.formation.DateDebutFormation, 'DD-MM-YYYY');
            
        return(
        <div>
            <div className="container">            
                {/* showing details  begin*/}
                <div className="row ">
                    <p><b>Nom formation:</b>   {this.state.formation.LibelleFormation}</p>
                </div>
                 <div className="row ">
                    <p><b>Date debut: </b>    
                    <Moment format="DD/MM/YYYY">{this.state.formation.DateDebutFormation}</Moment></p> 
                </div> 
                
                <div className="row">
                   
                    <p><b>Date fin:</b>  <Moment format="DD/MM/YYYY">{this.state.formation.DateFinFormation}</Moment> </p>
                
                </div>  
                
                <div className="row">
                    <p><b>Description:</b> {this.state.formation.DescriptionFormation}</p>
                </div> 

                <div className="row ">
                    <p><b>Theme:</b> {this.state.formation.NomTheme}</p>
                </div>
                <div className="row ">
                    <p><b>Formateur:</b> {this.state.formation.NomFormateur}</p>
                </div> 
                <div className="row ">
                    <p><b>Capacité:</b> {this.state.formation.CapaciteFormation}</p>
                </div> 
                  
                {/* showing details  end*/}                
                   
            </div>            
        </div>
    );    

}
}
export default CardFormation;