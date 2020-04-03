import React, { Component } from 'react';
import axios from 'axios';
import {Button,  Modal,  ModalBody} from 'reactstrap';
import CardFormation from '../CardFormation'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from 'moment'

const Formation = props => (  
  <tr> 
    <td></td>
    <td>{props.formation.CodeFormation}</td>
    <td>{props.formation.LibelleFormation}</td>
    <td>{moment(props.formation.DateDebutFormation).format('DD/MM/YYYY')} </td>
    <td>{props.formation.NomFormateur}</td>   
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
         onClick={() => { props.supprimerFormation(props.formation._id) }}>
         <span className="fa fa-times"></span>
        </Button>  
      </a>     
    </td>
    <td>
    <Button className="btn btn-secondary btn-sm" onClick={ () => { props.toggleModalFormation(props.formation._id)}}>
      <span className="fa fa-info "></span>
    </Button>
    </td>                    
  </tr>
)          
    
 

class FormationList extends Component {
  constructor(props) {
    super(props);

    this.supprimerFormation = this.supprimerFormation.bind(this)
    this.toggleModalFormation = this.toggleModalFormation.bind(this)

    this.state = {formation: [],
                  Formation :  null,
                  isModalFormationOpen: false, 
                  Id_Formation: null, };
    

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
  }
 
  supprimerFormation(id) {    
    axios.delete('http://localhost:5000/Formation/'+id)
      .then(formationn => { console.log(formationn.data)});

    this.setState({
      formation: this.state.formation.filter(el => el._id !== id)
    })
  }

  toggleModalFormation(id) {
    this.setState({
      isModalFormationOpen: !this.state.isModalFormationOpen,
     Id_Formation: id,
     
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
    return (
      <div className=" container ">
       <div className="row justify-content-md-center">  
         <section className="col-10 text-center">   
        <br/>
        <br/>
        <h3> Liste Des Formations </h3>
        <br/>
        <br/>   
            
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th><a href="/ajoutformation">
                 <Button className="btn btn-success btn-sm" >
                  <span className="fa fa-plus"></span>
                  </Button>
                  </a> 
              </th>
              <th>Code</th>
              <th>Libelle</th>
              <th>Date Debut </th>
              <th>Formateur</th>
              <th>Modifier</th>
              <th>Supprimer</th>
              <th>Voir plus</th>
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
   
   <ModalBody> 
   <CardFormation  Id_Formation={this.state.Id_Formation} />
   </ModalBody>

 </Modal> 
 {/*modal formation end */}     
      </div>
      
    )
  }
}
FormationList.propTypes = {
  auth: PropTypes.object.isRequired
};  

const mapStateToProps = state => ({
  auth: state.auth
});

export default   connect(mapStateToProps)(FormationList);