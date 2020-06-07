import React, { Component } from 'react';
import axios from 'axios';
import SideNavWebmaster from './sideNavWebmaster'
import {Form} from 'react-bootstrap';
import {FormGroup, Label,  Input, Col } from 'reactstrap';
import {Button,  Modal,  ModalBody, ModalHeader} from 'reactstrap';

const Theme = props => (  
  <tr>
      <td></td>
    <td>{props.theme.NomTheme}</td>    
    <td>
    <Button className="btn btn-warning btn-sm" onClick={ () => { props.toggleModalModifierTheme( props.theme)}}>
      <span className="fa fa-edit "></span>
    </Button>
    </td>   
    <td> 
      <a href="/ThemeList"> 
      <Button className="btn btn-danger btn-sm" 
       onClick={() => { if (window.confirm('Voulez-vous vraiment supprimer ce thème?'))
         props.deleteTheme(props.theme._id) }}  >
        <span className="fa fa-user-times" /> 
      </Button>  
      </a>
    </td>
  </tr>
)

export default class ThemeList extends Component {
  constructor(props) {
    super(props);
 
    this.deleteTheme = this.deleteTheme.bind(this)
    this.onChangeNomTheme = this.onChangeNomTheme.bind(this)
    this.toggleModalModifierTheme = this.toggleModalModifierTheme.bind(this)

    this.state = {theme: [],
                  Theme :  [],
                  NomTheme: "",
                  isModalModifierThemeOpen: false};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/Theme/')
      .then(them => {
        this.setState({ theme: them.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteTheme(id) {
    
    axios.delete('http://localhost:5000/Theme/'+id)
      .then(themee => { console.log(themee.data)});

    this.setState({
      theme: this.state.theme.filter(el => el._id !== id )
    })
  }

 /*  modifierTheme(Theme) {

    const ThemeUpdated = {
      NomTheme: Theme.NomTheme}
       
    axios.post('http://localhost:5000/Theme/update/'+ Theme._id , ThemeUpdated )
      .then(demand => { console.log(demand.data)});
      
     this.setState({
      theme : this.state.theme.filter(el => el._id !== Theme._id)
    })
  } */

  toggleModalModifierTheme(Theme) {
    this.setState({
        isModalModifierThemeOpen: !this.state.isModalModifierThemeOpen,
        Theme: Theme
    });  
  }

  onChangeNomTheme(e) {
    this.setState({
        NomTheme: e.target.value
    });
}

  ThemeList() {
    return this.state.theme.map(currentTheme => {
      return <Theme  theme={currentTheme} deleteTheme={this.deleteTheme}  
      modifierTheme={this.modifierTheme} key={currentTheme._id} 
      toggleModalModifierTheme={this.toggleModalModifierTheme}/>;

    });
  }

  onSubmitModifier(e) {
    e.preventDefault();
    const theme = {
        NomTheme: e.target.value,
    }

    console.log(theme);

    axios.post('http://localhost:5000/Theme/update/' + this.state.Theme._id, theme)
      .then(res => console.log(res.data));
      window.location = '/ThemeList';
  }

  render() {
   
    return (
      <div>
        <SideNavWebmaster pageWrapId={"page-wrap"}/>
        <div id="page-wrap" className="container">
          <div className="container">
          <div className="row justify-content-md-center"> 
              <section className="col-10 text-center">   
              <br/>
              <br/>
              <h3> Liste Des Thèmes</h3>
              <br/>
              <br/> 
            
              <table className="table">
                <thead className="thead-light">
                  <tr>
                  <th>
                      <a href="#">
                      <Button className="btn btn-success btn-sm" >
                        <span className="fa fa-plus"></span>
                        </Button>
                        </a> 
                    </th>
                    <th>Thème</th>
                    <th>Modifier</th>
                    <th>Supprimer</th>
                  </tr>
                </thead>
                <tbody>
                  { this.ThemeList() }
                </tbody>
              </table>
              </section>
            </div>
            {/*modal modifier theme begin */}
             <Modal isOpen={this.state.isModalModifierThemeOpen} toggle={this.toggleModalModifierTheme}>   
              <ModalHeader className="justify-content-center">
                <h3 >{this.state.Theme.NomTheme}</h3>
              </ModalHeader>
              <ModalBody> 
              <Form  onSubmit={this.onSubmitModifier}>
                <FormGroup row>
                    <Label htmlFor="NomTheme" md={5}>Nom Thème:</Label>
                        <Col md={7}>

                            <Input  type="text" id="NomTheme" name="NomTheme" required
                             placeholder="Nom Thème" value={this.state.NomTheme}
                             onChange={this.onChangeNomTheme} />

                        </Col>
                </FormGroup>
                <FormGroup row>
                                <Label md={5}></Label>
                                <Col md={7}> 
                                <br/>                       
                                    <input type="submit" value="Modifier " className="btn btn-primary " />                         
                                    <a className="offset-1 btn btn-secondary" href="/ThemeList">
                                        Annuler
                                    </a>
                                </Col>        
                            </FormGroup> 
                </Form>
              </ModalBody>
            </Modal> 
            {/*modal Theme end */} 
          </div>
        </div>     
      </div>
      
    )
  }
}