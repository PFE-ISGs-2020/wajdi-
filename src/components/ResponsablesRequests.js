import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Responsable = props => (
  <tr>
    <td>{props.responsable.username}</td>
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
        <h3> Responsables Requests</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
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