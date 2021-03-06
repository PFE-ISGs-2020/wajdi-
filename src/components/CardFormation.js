import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import DefaultImg from '../assets/default-img.jpg';

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
          })
          .catch((error) => {
            console.log(error);
          })
      }
      
    render(){
       // const dateToFormat = this.state.formation.DateDebutFormation;var datedeb = moment(this.state.formation.DateDebutFormation, 'DD-MM-YYYY');
       let image = DefaultImg;
       if (this.state.formation.imageFormation){
        image = "http://localhost:5000/"+this.state.formation.imageFormation
       }  
        return(
        <div>
            <div className="container">            
                {/* showing details  begin*/}
                <div className="row">
                <img src= {image} alt="image_formation"  
                            width="220" height="150" /> 
                </div>
                <br/>
                 <div className="row ">
                     
                    <p><b>Date debut: </b>    
                    <Moment format="DD/MM/YYYY">{this.state.formation.DateDebutFormation}</Moment></p> 
                </div> 
                
                <div className="row">
                   
                    <p><b>Date fin:</b>  <Moment format="DD/MM/YYYY">{this.state.formation.DateFinFormation}</Moment> </p>
                
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
                <div className="row ">
                    <p><b>Prix en Dinar Tunisien:</b> {this.state.formation.Prix}</p>
                </div>
                <div className="row">
                    <p><b>Description:</b> {this.state.formation.DescriptionFormation}</p>
                </div> 
                
                {/* showing details  end*/}                
                   
            </div>            
        </div>
    );    

}
}
export default CardFormation;