import React, { Component } from 'react';
import {  Form, FormGroup, Input, Label, Col  } from 'reactstrap';
import axios from 'axios';
import moment from 'moment';
import HeaderClient from '../Header_Client';

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
        imageClient: '',
        selectedImage:'',

    };
    

    this.onChangeNomClient = this.onChangeNomClient.bind(this);
    this.onChangePrenomClient = this.onChangePrenomClient.bind(this);
    this.onChangeDatenaissClient = this.onChangeDatenaissClient.bind(this);
    this.onChangeProfessionClient = this.onChangeProfessionClient.bind(this);
    this.onChangeNiveauClient = this.onChangeNiveauClient.bind(this);
    this.onChangeemailClient =this.onChangeemailClient.bind(this);
    this.onChangeTelClient = this.onChangeTelClient.bind(this);
    this.onChangeAdresseClient =this.onChangeAdresseClient.bind(this);
    this.onChangeimageClient = this.onChangeimageClient.bind(this);

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
            imageClient: response.data.imageClient,
            selectedImage: response.data.imageClient,
            AdresseClient : response.data.AdresseClient,  
           
        })   
      })
      .catch((error) => {
        console.log(error);
      })

    }
    //didmount end

    onChangeimageClient(e){

        this.setState({
       imageClient: e.target.files[0],
       selectedImage:URL.createObjectURL(e.target.files[0])
     });
    } 
    
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
   

    //récupération des donnees du l'Input
    onSubmit(e) {
    e.preventDefault();
    const client = {
   
    NomClient: this.state.NomClient,
    PrenomClient: this.state.PrenomClient,
    DatenaissClient: this.state.DatenaissClient,
    ProfessionClient: this.state.ProfessionClient,
    NiveauClient: this.state.NiveauClient,
    emailClient: this.state.emailClient,
    TelClient: this.state.TelClient,
   
    AdresseClient: this.state.AdresseClient,

   }
    
    console.log(client);

     axios.post('http://localhost:5000/Client/update/' + this.props.match.params.id, client)
      .then(res => console.log(res.data) );

      if (this.state.selectedImage ){
        let ImageClient = new FormData();
    
    ImageClient.append("imageClient", this.state.imageClient)
    console.log(this.state.imageClient) 
     axios.post('http://localhost:5000/Client/updateImageClient/' + this.props.match.params.id, ImageClient)
      .then(res => console.log(res.data));}
      window.location = '/ProfileClient'
  } 

  render() {

    let image;
    if (this.state.imageClient === this.state.selectedImage && this.state.imageClient){
        
        image = "http://localhost:5000/"+this.state.imageClient}
    else {
        image = this.state.selectedImage
    }


    return (
        
            <div id="page-wrap">
                <HeaderClient /> 
                <div className=" container ">
                    <div className="row justify-content-md-center">
                        <div className="col-10 text-center">
                            <br/>
                            <br/>
                            <h3> Modifier les informations de votre profile </h3>
                            <hr/>
                            <br/>
                            <br/>
                            <Form onSubmit={this.onSubmit}>
                            
                            <FormGroup row>
                            <Label htmlFor="imageClient" md={5}> <b>Photo de profile</b></Label>
                            <Col md={7}>
   
                            <Input  type="file" id="imageClient" name="imageClient" 
                            
                            className="process__upload-btn"
                            onChange={this.onChangeimageClient} />
                            </Col>
                            </FormGroup>
                            <img src= {image} alt="" className="process__image offset-2"
                            width="200" height="200" /> 

                            <FormGroup row>
                                
                             <Label htmlFor="NomClient" md={5}> <br/> <b>Nom: </b></Label>
                             <Col md={7}>
                             <br/>
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
                        <FormGroup row >
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
                                <Label htmlFor="AdresseClient" md={5}><b>Adresse:</b></Label>
                                <Col md={7}>
                                    <Input  required type="text" id="AdresseClient" name="AdresseClient"
                                    placeholder="Adresse" value={this.state.AdresseClient}
                                  
                                    className="form-control"
                                    onChange={this.onChangeAdresseClient} />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col>                        
                                    <input type="submit" value="Modifier" className="btn btn-primary offset-2" />                         
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