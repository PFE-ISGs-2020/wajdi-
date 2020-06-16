import React, { Component } from 'react';
import axios from 'axios';
import SideNavWebmaster from './sideNavWebmaster'
import { ModalTitle} from 'react-bootstrap';
import {Button,  Modal,  ModalBody, ModalHeader } from 'reactstrap';
import ModifierTheme from './Modifier_Theme'
import AjouterTheme from './Ajouter_Theme'

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
        <span className="fa fa-trash" /> 
      </Button>  
      </a>
    </td>
  </tr>
)

export default class ThemeList extends Component {
  constructor(props) {
    super(props);
 
    this.deleteTheme = this.deleteTheme.bind(this)
    this.toggleModalModifierTheme = this.toggleModalModifierTheme.bind(this)
    this.toggleModalAjouterTheme = this.toggleModalAjouterTheme.bind(this)
    

    this.state = {theme: [],
                  Theme :  [],
                  isModalModifierThemeOpen: false,
                  isModalAjouterThemeOpen: false};
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



  toggleModalModifierTheme(Theme) {
    this.setState({
        isModalModifierThemeOpen: !this.state.isModalModifierThemeOpen,
        Theme: Theme
    });  
  }

  toggleModalAjouterTheme() {
    this.setState({
        isModalAjouterThemeOpen: !this.state.isModalAjouterThemeOpen,
        
    });  
  }

  

  ThemeList() {
    return this.state.theme.map(currentTheme => {
      return <Theme  theme={currentTheme} deleteTheme={this.deleteTheme}  
      modifierTheme={this.modifierTheme} key={currentTheme._id} 
      toggleModalModifierTheme={this.toggleModalModifierTheme}
      toggleModalAjouterTheme={this.toggleModalAjouterTheme}/>;

    });
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
                      <Button className="btn btn-success btn-sm" onClick={ () => { this.toggleModalAjouterTheme()}}>
                        <span className="fa fa-plus"></span>
                      </Button>
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
              <ModalTitle >
                <h3 >Modifier thème : {this.state.Theme.NomTheme}</h3>
              </ModalTitle>
              </ModalHeader>
              <ModalBody> 
                  <ModifierTheme Theme= {this.state.Theme} />
              </ModalBody>
            </Modal> 
            {/*modal Modifier Theme end */} 

             {/*modal Ajouter theme begin */}
             <Modal isOpen={this.state.isModalAjouterThemeOpen} toggle={this.toggleModalAjouterTheme}>   
              <ModalHeader className="justify-content-center">
                <ModalTitle>
                <h3 >Ajouter un nouveau thème</h3>
                </ModalTitle>
              </ModalHeader>
              <ModalBody> 
                <AjouterTheme/>
              </ModalBody>
            </Modal> 
            {/*modal Ajouter Theme end */} 
          </div>
        </div>     
      </div>
      
    )
  }
}