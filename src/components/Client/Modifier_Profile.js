import React, { Component } from 'react';
import {  Form, FormGroup, Input, Label, Col  } from 'reactstrap';
import axios from 'axios';
import moment from 'moment'

export default class ModifierProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
        NomClient:'',
        PrenomClient: '',
        DatenaissClient: '',
        ProfessionClient: '',
        NiveauClient: '',
        emailClient:'',
        TelClient:'',
        AdresseClient:'',
        passwordClient:'',
        //image: '',

    };
    

    this.onChangeNomClient = this.onChangeNomClient.bind(this);
    this.onChangePrenomClient = this.onChangePrenomClient.bind(this);
    this.onChangeDatenaissClient = this.onChangeDatenaissClient.bind(this);
    this.onChangeProfessionClient = this.onChangeProfessionClient.bind(this);
    this.onChangeNiveauClient = this.onChangeNiveauClient.bind(this);
    this.onChangeemailClient =this.onChangeemailClient.bind(this);
    this.onChangeTelClient = this.onChangeTelClient.bind(this);
    this.onChangeAdresseClient =this.onChangeAdresseClient.bind(this);
  
   // this.onChangeImage = this.onChangeImage.bind(this);
    this.onSubmit = this.onSubmit.bind(this); 
  }

  
   //didmount begin
  componentDidMount() {
    axios.get('http://localhost:5000/Client/'+this.props.match.params.id)
      .then(response => {
        this.setState({
            NomClient : response.data.NomClient,
            PrenomClient : response.data.PrenomClient,
            DatenaissClient : response.data.DatenaissClient,
            ProfessionClient : response.data.ProfessionClient,
            NiveauClient : response.data.NiveauClient,
            emailClient : response.data.emailClient,
            TelClient : response.data.TelClient,
            passwordClient : response.data.passwordClient,
            AdresseClient : response.data.AdresseClient
            
        })   
      })
      .catch((error) => {
        console.log(error);
      })

    }
    //didmount end
    
    onChangeNomClient(e) {
        this.setState({
            NomClient: e.target.value
        });
    }

    onChangePrenomClient(e) {
        this.setState({
            PrenomClient: e.target.value
        });
    }

    onChangeDatenaissClient(e) {
        this.setState({
            DatenaissClient: e.target.value
        });
    }

    onChangeProfessionClient(e) {
        this.setState({
            ProfessionClient: e.target.value
        });
    }
    onChangeNiveauClient(e) {
        this.setState({
            NiveauClient: e.target.value
        });
    }
    onChangeemailClient(e) {
        this.setState({
            emailClient: e.target.value
        });
    }

    onChangeTelClient(e) {
        this.setState({
            TelClient: e.target.value
        });
    }
    onChangeAdresseClient(e) {
        this.setState({
            AdresseClient: e.target.value
        });
    }
   /*  onChangeImage(e){
        let imageFormObj = new FormData();

     // imageFormObj.append("imageName", "multer-image-" + Date.now());
      imageFormObj.append("image", e.target.files[0]);

      // stores a readable instance of 
      // the image being uploaded using multer
      this.setState({
        image: URL.createObjectURL(e.target.files[0])
      });
    } */

    fileChangedHandler = event => {
        this.setState({ image: event.target.files[0] })
      }
      

    //récupération des donnees du l'Input
    onSubmit(e) {
    e.preventDefault();
    /* const formData = new FormData()
    formData.append('myFile',this.state.image, this.state.image.name)
 */
    const client = {
        
        //image : this.state.formData
        NomClient : this.state.NomClient,
        PrenomClient : this.state.PrenomClient,
        DatenaissClient : this.state.DatenaissClient,
        ProfessionClient : this.state.ProfessionClient,
        NiveauClient : this.state.NiveauClient,
        emailClient : this.state.emailClient,
        TelClient : this.state.TelClient,
        passwordClient : this.state.passwordClient,
        AdresseClient : this.state.AdresseClient

    }
    
    console.log(client);

     axios.post('http://localhost:5000/Client/update/' + this.props.match.params.id, client)
      .then(res => console.log(res.data),
      window.location = '/ProfileClient');
  } 

  render() {
    
    return (
        
            <div id="page-wrap">
                <div className=" container ">
                    <div className="row justify-content-md-center">
                        <div className="col-10 text-center">
                            
                            <h3> Modifier les informations de votre profile </h3>
                            <br/>
                            <br/>
                            <Form onSubmit={this.onSubmit}>
                            <FormGroup row>
                             <Label htmlFor="image" md={5}> <b>Photo de profile</b></Label>
                             <Col md={7}>
                                
                                <Input  type="file" id="image" name="image" 
                                
                                className="process__upload-btn"
                                onChange={this.fileChangedHandler} />
                                <img src={this.state.image} alt="" className="process__image" />
                             </Col>
                            </FormGroup>
                            {/* <input type="file" className="process__upload-btn" onChange={(e) => this.uploadImage(e, "multer")} />
                                <img src={this.state.multerImage} alt="upload-image" className="process__image" /> */} 
         
                            <FormGroup row>
                             <Label htmlFor="NomClient" md={5}> <b>Nom: </b></Label>
                             <Col md={7}>
                                
                                <Input  type="text" id="NomClient" name="NomClient" required
                                placeholder="Nom " value={this.state.NomClient}
                                className="form-control"
                                onChange={this.onChangeNomClient} />
                             </Col>
                            </FormGroup>

                            <FormGroup row>
                             <Label htmlFor="PrenomClient" md={5}><b>Prénom: </b></Label>
                             <Col md={7}>
                             
                             <Input type="text" id="PrenomClient" name="PrenomClient"
                                placeholder="Prénom" required value={this.state.PrenomClient}
                                
                                className="form-control"
                                onChange={this.onChangePrenomClient} />
                             </Col>                        
                            </FormGroup>

                            <FormGroup row>
                    <Label htmlFor="DatenaissClient" md={5}><b> Date de Naissance: </b></Label>
                        <Col md={7}>
                            <Input type="Date" id="DatenaissClient" name="DatenaissClient"
                                  required
                                 className="form-control"
                                value= {moment(this.state.DatenaissClient).format('YYYY-MM-DD')}
                                onChange={this.onChangeDatenaissClient} />
                        </Col>
                </FormGroup> 
                        <FormGroup row controlId="NiveauClient">
                        <Label htmlFor="NiveauClient" md={5}> <b>Niveau:</b> </Label>
                        <Col md = {7}>

                            
                            <Input type="select"   value={this.state.NiveauClient} onChange={this.onChangeNiveauClient} name="NiveauClient">
                                
                         
                            
                            <option>Bac</option>
                            <option>Moin</option>
                            <option>Bac +1</option>
                            <option>Bac +2</option>
                            <option>Bac +3</option>
                            <option>Plus</option>
                                        
                            </Input>
                        </Col>
                    </FormGroup>

                            <FormGroup row>
                             <Label htmlFor="TelClient" md={5}><b>Téléphone: </b></Label>
                             <Col md={7}>
                             <Input type="tel" id="TelClient" name="TelClient"
                                placeholder="Téléphne" required value={this.state.TelClient}
                               
                                className="form-control"
                                onChange={this.onChangeTelClient} />
                             </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label htmlFor="emailClient" md={5}><b>Email:</b></Label>
                                <Col md={7}>
                                    <Input  required type="email" id="emailClient" name="emailClient"
                                    placeholder="Email" value={this.state.emailClient}
                                  
                                    className="form-control"
                                    onChange={this.onChangeemailClient} />
                                </Col>
                            </FormGroup>
                            
                            <FormGroup row>
                                <Label htmlFor="ProfessionClient" md={5}><b>Profession:</b></Label>
                                <Col md={7}>
                                    <Input  required type="text" id="ProfessionClient" name="ProfessionClient"
                                    placeholder="Email" value={this.state.ProfessionClient}
                                  
                                    className="form-control"
                                    onChange={this.onChangeProfessionClient} />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label htmlFor="AdresseClient" md={5}><b>Adresse</b></Label>
                                <Col md={7}>
                                    <Input  required type="text" id="AdresseClient" name="AdresseClient"
                                    placeholder="Adresse" value={this.state.AdresseClient}
                                  
                                    className="form-control"
                                    onChange={this.onChangeAdresseClient} />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col>                        
                                    <input type="submit" value="Modifer" className="btn btn-primary offset-2" />                         
                                    <a className="offset-1 btn btn-secondary" href="/ProfileClient">
                                        Annuler
                                    </a>
                                </Col>        
                            </FormGroup>  
                                        
                            </Form>  
                        </div>            
                    </div>
                </div>  
            </div>
       
    );
  }
}