import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Responsable = props => (
  
  <tr>
    <td>{props.responsable.NomCentre}</td>
    <td>{props.responsable.Adresse}</td>
    <td>{props.responsable.Region}</td>
    <td>{props.responsable.Tel}</td>
    <td>{props.responsable.Email}</td>
    <td>{props.responsable.password}</td>
    
    <td>
      <Link to={"/edit/"+props.responsable._id}>Approve</Link> | <a href="#" onClick={() => { props.deleteResponsable(props.responsable._id) }}>delete</a>
    </td>
  </tr>
)

export default class ResponsablesList extends Component {
  constructor(props) {
    super(props);

    this.deleteResponsable = this.deleteResponsable.bind(this)

    this.state = {responsables: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/responsables/')
      .then(response => {
        this.setState({ responsables: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteResponsable(id) {
    axios.delete('http://localhost:5000/responsables/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
        responsables: this.state.responsables.filter(el => el._id !== id)
    })
  }

  responsableList() {
    return this.state.responsables.map(currentresponsable => {
      return <Responsable responsable={currentresponsable} deleteResponsable={this.deleteResponsable} key={currentresponsable._id}/>;
    })
  }

  render() {
    return (
      <div>
        <br/>
        <br/>
        <h3> Responsables Requests</h3>
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
            { this.responsableList() }
          </tbody>
        </table>
      </div>
    )
  }
}