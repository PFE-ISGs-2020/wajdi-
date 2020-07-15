import React, { Component } from 'react';
import axios from 'axios';
import {Button,  Modal,  ModalBody, ModalHeader} from 'reactstrap';
import CardFormation from '../CardFormation'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SideBar from "./sidebar";
import moment from 'moment';
import StarRatingComponent from 'react-star-rating-component';

const Formation = props => (  
  <tr> 
    <td></td>
    <td>{props.formation.CodeFormation}</td>
    <td>{props.formation.LibelleFormation}</td>
    <td>{moment(props.formation.DateDebutFormation).format('DD/MM/YYYY')} </td>
    <td>{moment(props.formation.DateFinFormation).format('DD/MM/YYYY')} </td> 
    <td>
    <Button className="btn btn-secondary btn-sm" onClick={ () => { props.toggleModalFormation(props.formation._id, props.formation.LibelleFormation)}}>
      <span className="fa fa-info "></span>
    </Button>
    </td>
    <td>
      <a href={"/ModiferFormation/"+props.formation._id}>
        <Button className="btn btn-warning btn-sm" >
        <span className="fa fa-edit"></span>
        </Button>
      </a>
    </td>
    <td>
    
      <a href="/FormationList">
        <Button className="btn btn-danger btn-sm"
           onClick={() => { if (window.confirm('Voulez-vous vraiment supprimer cette formation?'))
           props.supprimerFormation(props.formation._id) } }   >
            <span className="fa fa-times"></span>
        </Button>  
      </a>     
    </td>
      
    <td>
    <a href={"/DemandeInscriptionList/"+props.formation._id}>
    <button type="button" className="btn btn-success btn-sm">
      <span className="fa fa-user-plus "></span>
    </button>  
    </a>
    </td>   
    <td>
    <a href={"/InscriptionList/"+props.formation._id}>
          <Button className="btn btn-info btn-sm" >
          <span className="fa fa-list "></span>
          </Button>
        </a>
    </td>                
  </tr>
)          
    
 

class FormationList extends Component {
  constructor(props) {
    super(props);

    this.supprimerFormation = this.supprimerFormation.bind(this)
    this.toggleModalFormation = this.toggleModalFormation.bind(this)

    this.state = {formation: [],
                  //For Modal Formation
                  Formation :  null, 
                  isModalFormationOpen: false, 
                  Id_Formation: null, 
                  rating: [],
                Ratings:[]};
    

  }

  componentDidMount() {
    const {centre} = this.props.auth;
      axios.get('http://localhost:5000/Formation/listbynamecentre/'+centre.NomCentre)
    .then(forma => {
      this.setState({ formation: forma.data })
    })
    .catch((error) => {
      console.log(error);
    })

    axios.get('http://localhost:5000/Evaluation_Formation/Rates')
    .then(rate => {
      this.setState({ Ratings: rate.data })
    })
    .catch((error) => {
      console.log(error);
    })
  }
 
  supprimerFormation(id) {    
    axios.delete('http://localhost:5000/Formation/'+id)
      .then(formationn => { console.log(formationn.data)});

    this.setState({
      formation: this.state.formation.filter(el => el._id !== id)
    })
  }

  toggleModalFormation(id, Formation) {
    this.setState({
      isModalFormationOpen: !this.state.isModalFormationOpen,
     Id_Formation: id,
     Formation: Formation,
     rating: this.state.Ratings.filter(rate => rate._id === id)[0]
    });  
  }
 
  FormationList() {
    return this.state.formation.map(currentformation => {
      return <Formation  formation={currentformation} 
      supprimerFormation={this.supprimerFormation} key={currentformation._id}
      toggleModalFormation={this.toggleModalFormation}/>;

    });
  }

  render() {

    if (!this.state.formation[0]){
      return(
        <div>
      <SideBar pageWrapId={"page-wrap"} />
      <div id="page-wrap">
        <div className=" container ">
        <div className="row justify-content-md-center">  
        <section className="col-10 text-center">   
        
            <div className="col-12">
              <br/>
              <br/>
              
              <br/>
              <br/>
              <br/>
              <h4 >
                Il n'y a aucune formation enregistrée!
              </h4>
              <br/>
              <br/>
              <br/>
              <a href="/ajoutformation">
                <Button className="btn btn-success btn-sm" >
                  <span className="fas fa-plus"/> Ajouter une formation 
                </Button>
              </a> 
            </div>   
        </section>
      </div>
      </div>
      </div>
      </div>
      )
    }
    else{
      let rate;
      if(this.state.rating){
        rate= <StarRatingComponent 
          name= "rate"
          starCount={5} 
          value={this.state.rating.avgRating} 
          editing={false}
        />  
      }
      else(rate= null)
    return (
      <div>
        <SideBar pageWrapId={"page-wrap"} />
        <div id="page-wrap">
            <div className=" container ">
              <div className="row justify-content-md-center">  
                <section className="col-10 text-center">   
            
              <h3> Liste Des Formations </h3>
              <br/>
              <br/>                     
              <table className="table">
                <thead className="thead-light">
                  <tr >
                    <th>
                      <a href="/ajoutformation">
                      <Button className="btn btn-success btn-sm" >
                        <span className="fas fa-plus" />
                        </Button>
                        </a> 
                    </th>
                    <th>Code</th>
                    <th>Libelle</th>
                    <th>Date Debut</th>
                    <th>Date Fin</th> 
                    <th>Voir plus</th>
                    <th>Modifier</th>
                    <th>Supprimer</th>
                   
                    <th>Demandes</th>
                    <th>Inscriptions</th>
                  </tr>
                </thead>
                <tbody>
                  { this.FormationList() }
                </tbody>
              </table>
              </section>
            </div> 
            {/*modal formation begin */}
            <Modal isOpen={this.state.isModalFormationOpen} toggle={this.toggleModalFormation}>   
              <ModalHeader>
                <div>
                {this.state.Formation} <br/><h4>{rate}</h4></div>         
              </ModalHeader>
              <ModalBody> 
              <CardFormation  Id_Formation={this.state.Id_Formation} />
              
              </ModalBody>
            </Modal>
            {/*modal formation end */}     
          </div>

      </div>
    </div> 
    );}
  }
}
FormationList.propTypes = {
  auth: PropTypes.object.isRequired
};  

const mapStateToProps = state => ({
  auth: state.auth
});

export default   connect(mapStateToProps)(FormationList);