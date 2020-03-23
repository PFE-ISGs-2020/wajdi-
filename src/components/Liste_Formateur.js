import React, { Component } from 'react';
import {Button} from 'reactstrap';
import axios from 'axios';

const Formateur = props => (  
  <tr>
    <td></td>
    <td>{props.formateur.NomFormateur}</td>
    <td>{props.formateur.PrenomFormateur}</td>
    <td>{props.formateur.SpecialiteFormateur}</td>

    <td>
        <a href={"/ModiferFormateur/"+props.formateur._id}>
          <Button className="btn btn-warning btn-sm" >
          <span className="fa fa-edit"></span>
          </Button>
        </a>
    </td>
    <td>
      <a href="/">
          <Button className="btn btn-danger btn-sm"
            onClick={() => { props.supprimerFormateur(props.formateur._id) }}>
            <span className="fa fa-times"></span>
          </Button>
      </a>
    </td>   
  </tr>
)

export default class FormateurList extends Component {
  constructor(props) {
    super(props);

    this.supprimerFormateur = this.supprimerFormateur.bind(this)

    this.state = {formateur: [],
                  Formateur : null};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/Formateur')
      .then(formateu => {
        this.setState({ formateur: formateu.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  supprimerFormateur(id) {    
    axios.delete('http://localhost:5000/Formateur/'+id)
      .then(formateurr => { console.log(formateurr.data)});

    this.setState({
        formateur: this.state.formateur.filter(el => el._id !== id)
    })
  }
 
  FormateurList() {
    return this.state.formateur.map(currentformateur => {
    return <Formateur   formateur={currentformateur} 
    supprimerFormateur={this.supprimerFormateur} 
    key={currentformateur._id} />;

    });
  }

  render() {
    return (
      <div className=" container ">
       <div className="row justify-content-md-center">  
        <section className="col-10 text-center">   
        <br/>
        <br/>
        <h3> Liste Des Formateurs </h3>
        <br/>
        <br/>        
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th><a href="/ajoutformateur">
                 <Button className="btn btn-success btn-sm" >
                  <span className="fa fa-plus"></span>
                  </Button>
                  </a>
              </th>
              <th>Nom Formateur</th>
              <th>Prenom Formateur</th>
              <th>Specialite Formateur</th>
              <th>Modifier</th>
              <th>Supprimer</th>
            </tr>
          </thead>
          <tbody>
            { this.FormateurList() }
          </tbody>
        </table>
        </section>
      </div>     
      </div>
      
    )
  }
}