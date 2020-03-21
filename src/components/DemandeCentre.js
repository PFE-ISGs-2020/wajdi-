import React, { Component } from 'react';
import axios from 'axios';
import Menu from './sideNavWebmaster'


const Demande = props => (  
  <tr>
    <td>{props.centre.NomCentre}</td>
    <td>{props.centre.Adresse}</td>
    <td>{props.centre.Region}</td>
    <td>{props.centre.Tel}</td>
    <td>{props.centre.Email}</td>
    <td>{props.centre.password}</td>    
    <td>
    <a href="/" onClick={() => { props.approveDemande(props.centre) }}>Approve</a> | <a href="/" onClick={() => { props.deleteDemande(props.centre._id) }}>delete</a>
    </td>
  </tr>
)

export default class DemandeList extends Component {
  constructor(props) {
    super(props);

    this.deleteDemande = this.deleteDemande.bind(this)
    this.approveDemande = this.approveDemande.bind(this)

    this.state = {centre: [],
                  Centre :  null};

  }

  componentDidMount() {
    axios.get('http://localhost:5000/Centre/Acces')
      .then(centr => {
        this.setState({ centre: centr.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteDemande(id) {
    
    axios.delete('http://localhost:5000/Centre/'+id)
      .then(demand => { console.log(demand.data)});

    this.setState({
      centre: this.state.centre.filter(el => el._id !== id && el.Acces === 0)
    })
  }

  approveDemande(Centre) {

   const CentreUpdated = {
      NomCentre: Centre.NomCentre,
      Adresse : Centre.Adresse,
       Description: Centre.Description,
       Region: Centre.Region,
       Tel: Centre.Tel,
       Email: Centre.Email,
       password: Centre.password,
       Acces: "1"}
       
    axios.post('http://localhost:5000/Centre/update/'+ Centre._id , CentreUpdated )
      .then(demand => { console.log(demand.data)});
      
     this.setState({
      centre : this.state.centre.filter(el => el._id !== Centre._id  && el.Acces === 0)
    })
  }
  DemandeList() {
    return this.state.centre.map(currentdemande => {
      return <Demande  centre={currentdemande} deleteDemande={this.deleteDemande}  
      approveDemande={this.approveDemande} key={currentdemande._id} />;

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