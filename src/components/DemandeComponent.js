import React, { Component } from 'react';
import axios from 'axios';
import Menu from './sideNavWebmaster'
const Demande = props => (  
  <tr>
    <td>{props.demande.NomCentre}</td>
    <td>{props.demande.Adresse}</td>
    <td>{props.demande.Region}</td>
    <td>{props.demande.Tel}</td>
    <td>{props.demande.Email}</td>
    <td>{props.demande.password}</td>    
    <td>
    <a href="/" onClick={() => { props.approveDemande(props.demande._id) }}>Approve</a> | <a href="/" onClick={() => { props.deleteDemande(props.demande._id) }}>delete</a>
    </td>
  </tr>
)

export default class DemandeList extends Component {
  constructor(props) {
    super(props);

    this.deleteDemande = this.deleteDemande.bind(this)
    this.approveDemande = this.approveDemande.bind(this)

    this.state = {demande: []};

  }

  componentDidMount() {
    axios.get('http://localhost:5000/Demande/')
      .then(demand => {
        this.setState({ demande: demand.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteDemande(id) {
    axios.delete('http://localhost:5000/Demande/'+id)
      .then(demand => { console.log(demand.data)});

    this.setState({
      demande: this.state.demande.filter(el => el._id !== id)
    })
  }

  approveDemande(id) {

   
    axios.post('http://localhost:5000/centres/add', this.state.demande.filter(centre => centre._id === id)[0])
      .then(demand => { console.log(demand.data)});
      
    axios.delete('http://localhost:5000/Demande/'+id)
      .then(demand => { console.log(demand.data)});
    this.setState({
      demande : this.state.demande.filter(el => el._id !== id)
    })
  }

  DemandeList() {
    return this.state.demande.map(currentdemande => {
      return <Demande  demande={currentdemande} deleteDemande={this.deleteDemande}  approveDemande={this.approveDemande} key={currentdemande._id} />;

    });
  }

  render() {
    return (
      <div>
       <div className="row row-content">
        <nav  className="col-2">
          <Menu/>
        </nav>  
         <section className="col-10 text-center">   
        <br/>
        <br/>
        <h3> Demande d'accés des responsables</h3>
        <br/>
        <br/> 
       
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Nom Centre</th>
              <th>Adresse</th>
              <th>Region</th>
              <th>Tel</th>
              <th>Email</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.DemandeList() }
          </tbody>
        </table>
        </section>
      </div>     
      </div>
      
    )
  }
}