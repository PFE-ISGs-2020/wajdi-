import React, { Component } from 'react';
import axios from 'axios';
import {Button} from 'reactstrap';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import SideBar from "./sidebar";
 
const Formation = props => (  
  <tr>
    <td></td>
    <td>{props.formation.CodeFormation}</td>
    <td>{props.formation.LibelleFormation}</td>
    <td>{props.formation.DateDebutFormation}</td>
    <td>{props.formation.DateFinFormation}</td>
    <td>{props.formation.DescriptionFormation}</td>
    <td>{props.formation.CapaciteFormation}</td>   
    <td>{props.formation.NomTheme}</td>
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
          <span className="fa fa-times"></span></Button>
        </a> 
    </td>
  </tr>
)

class FormationList extends Component {
  constructor(props) {
    super(props);

    this.supprimerFormation = this.supprimerFormation.bind(this)

    this.state = {formation: [],
                  Formation :  null  };
    

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
 
  FormationList() {
    return this.state.formation.map(currentformation => {
      return <Formation  formation={currentformation} 
              supprimerFormation={this.supprimerFormation} 
              key={currentformation._id} />;

    });
  }

  render() {
    return (
    <div>
        <SideBar pageWrapId={"page-wrap"} 
        
        />
      <div id="page-wrap">
        <div className=" container ">
        <div className="row justify-content-md-center"> 
         <section className="col-12  text-center">   
        <br/>
        <br/>
        <h3> Liste Des Formations </h3>
        <br/>
        <br/>   
            
        <table className="table col-sm-6 col-6 ">
          <thead className="thead-light">
            <tr >
              <th>
                <a href="/ajoutformation">
                 <Button className="btn btn-success btn-sm" >
                  <span className="fa fa-plus"></span>
                  </Button>
                  </a> 
              </th>
              <th>Code</th>
              <th>Libelle</th>
              <th>Date Debut </th>
              <th>Date Fin </th>
              <th>Description </th>
              <th>Capacite </th>
              <th>Theme</th>
              <th>Formateur</th>
              <th>Modifier</th>
              <th>Supprimer</th>

            </tr>
          </thead>
          <tbody>
            { this.FormationList() }
          </tbody>
        </table>
        </section>
      </div>  
      </div>     
      </div>

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