import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Formation = props => (  
  <tr>
    <td>{props.formation.CodeFormation}</td>
    <td>{props.formation.LibelleFormation}</td>
    <td>{props.formation.DateDebutFormation}</td>
    <td>{props.formation.DateFinFormation}</td>
    <td>{props.formation.DescriptionFormation}</td>
    <td>{props.formation.CapaciteFormation}</td>   
    <td>{props.formation.NomTheme}</td>
    <td>{props.formation.NomFormateur}</td>   
    <td>{props.formation.NomCentre}</td>
    <td>
    <Link to={"/ModiferFormation/"+props.formation._id}>Modifer</Link>| 
    <a href="/" onClick={() => { props.supprimerFormation(props.formation._id) }}>Supprimer</a>
    </td>
  </tr>
)

export default class FormationList extends Component {
  constructor(props) {
    super(props);

    this.supprimerFormation = this.supprimerFormation.bind(this)

    this.state = {formation: [],
                  Formation :  null};

  }

  componentDidMount() {
    axios.get('http://localhost:5000/Formation')
      .then(format => {
        this.setState({ formation: format.data })
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
      return <Formation  formation={currentformation} supprimerFormation={this.supprimerFormation} key={currentformation._id} />;

    });
  }

  render() {
    return (
      <div>
       <div className="row row-content">  
         <section className="col-10 text-center">   
        <br/>
        <br/>
        <h3> Demande d'accés des responsables</h3>
        <br/>
        <br/>        
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Code Formation</th>
              <th>Libelle Formation</th>
              <th>Date Debut Formation</th>
              <th>Date Fin Formation</th>
              <th>Description Formation</th>
              <th>Capacite Formation</th>
              <th>Nom Theme</th>
              <th>Nom Formateur</th>
              <th>Nom Centre</th>
              <th>Décision</th>
            </tr>
          </thead>
          <tbody>
            { this.FormationList() }
          </tbody>
        </table>
        </section>
      </div>     
      </div>
      
    )
  }
}