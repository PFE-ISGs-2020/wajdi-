import React, { Component } from 'react';
import {  Form, FormGroup, Input, Label, Col  } from 'reactstrap';
import axios from 'axios';
import SideBar from "./sidebar";

export default class ModifierCentre extends Component {
  constructor(props) {
    super(props);

    this.state = {
        NomCentre:'',
        AdresseCentre:'',
        TelCentre:'',
        RegionCentre:'',
        DescriptionCentre:'',
        EmailCentre:'',
        password:'',
        Acces:'',
        image: '',

    };
    

    this.onChangeNomCentre = this.onChangeNomCentre.bind(this);
    this.onChangeAdresseCentre =this.onChangeAdresseCentre.bind(this);
    this.onChangeTelCentre = this.onChangeTelCentre.bind(this);
    this.onChangeDescriptionCentre = this.onChangeDescriptionCentre.bind(this);
    this.onChangeEmailCentre =this.onChangeEmailCentre.bind(this);
    this.onChangeRegionCentre = this.onChangeRegionCentre.bind(this);
   // this.onChangeImage = this.onChangeImage.bind(this);
    this.onSubmit = this.onSubmit.bind(this); 
  }

  
   //didmount begin
  componentDidMount() {
    axios.get('http://localhost:5000/Centre/'+this.props.match.params.id)
      .then(response => {
        this.setState({
            NomCentre: response.data.NomCentre,
            AdresseCentre: response.data.AdresseCentre,
            TelCentre: response.data.TelCentre,
            RegionCentre: response.data.RegionCentre,
            DescriptionCentre: response.data.DescriptionCentre,
            EmailCentre: response.data.EmailCentre,
            password: response.data.passwordCentre,
            Acces: response.data.Acces,
            image: response.data.image
            
        })   
      })
      .catch((error) => {
        console.log(error);
      })

    }
    //didmount end

    onChangeNomCentre(e) {
        this.setState({
            NomCentre: e.target.value
        });
    }

    onChangeAdresseCentre(e) {
        this.setState({
            AdresseCentre: e.target.value
        });
    }

    onChangeTelCentre(e) {
        this.setState({
            TelCentre: e.target.value
        });
    }
    onChangeDescriptionCentre(e) {
        this.setState({
            DescriptionCentre: e.target.value
        });
    }
    onChangeEmailCentre(e) {
        this.setState({
            EmailCentre: e.target.value
        });
    }
    onChangeRegionCentre(e) {
        this.setState({
            RegionCentre: e.target.value
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
    const centre = {
        NomCentre: this.state.NomCentre,
        AdresseCentre: this.state.AdresseCentre,
        TelCentre: this.state.TelCentre,
        RegionCentre:this.state.RegionCentre,
        DescriptionCentre: this.state.DescriptionCentre,
        EmailCentre:this.state.EmailCentre,
        passwordCentre: this.state.password,
        Acces: this.state.Acces,
        //image : this.state.formData
    }
    
    console.log(centre);

     axios.post('http://localhost:5000/Centre/update/' + this.props.match.params.id, centre)
      .then(res => console.log(res.data),
      window.location = '/ProfileCentre');
  } 

  render() {
    
    return (
        <div>
            <SideBar pageWrapId={"page-wrap"} />
            <div id="page-wrap">
                <div className=" container ">
                    <div className="row justify-content-md-center">
                        <div className="col-10 text-center">
                            
                            <h3> Modifier les informations du Centre </h3>
                            <br/>
                            <br/>
                            <Form onSubmit={this.onSubmit}>
                            <FormGroup row>
                             <Label htmlFor="image" md={5}> <b>Image du Centre</b></Label>
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
                             <Label htmlFor="NomCentre" md={5}> <b>Nom du Centre</b></Label>
                             <Col md={7}>
                                
                                <Input  type="text" id="NomCentre" name="NomCentre" required
                                placeholder="Nom du centre" value={this.state.NomCentre}
                                className="form-control"
                                onChange={this.onChangeNomCentre} />
                             </Col>
                            </FormGroup>

                            <FormGroup row>
                             <Label htmlFor="AdresseCentre" md={5}><b>Adresse </b></Label>
                             <Col md={7}>
                             
                             <Input type="text" id="AdresseCentre" name="AdresseCentre"
                                placeholder="Adresse" required value={this.state.AdresseCentre}
                                
                                className="form-control"
                                onChange={this.onChangeAdresseCentre} />
                             </Col>                        
                            </FormGroup>

                            <FormGroup  row controlId="RegionCentre">
                             <Label htmlFor="RegionCentre" md={5}> <b>Région</b> </Label>
                             <Col md = {7}>
   
                             <Input className="form-control"  required type="select"   value={this.state.RegionCentre} onChange={this.onChangeRegionCentre} name="RegionCentre">
                        
                                <option>Ariana</option>
                                <option>Béja</option>
                                <option>Ben Arous</option>
                                <option>Bizerte</option>
                                <option>Gabès</option>
                                <option>Gafsa</option>
                                <option>Jendouba</option>
                                <option>Kairouan</option>
                                <option>Kasserine</option>
                                <option>Kébili</option>
                                <option>Le Kef</option>
                                <option>Mahdia</option>
                                <option>La Manouba</option>
                                <option>Médenine</option>
                                <option>Monastir</option>
                                <option>Nabeul</option>
                                <option>Sfax</option>
                                <option>Sidi Bouzid</option>
                                <option>Siliana</option>
                                <option>Sousse</option>
                                <option>Tataouine</option>
                                <option>Tozeur</option>
                                <option>Tunis</option>
                                <option>Zaghouan</option>
                        
                             </Input>
                             </Col>
                            </FormGroup>

                            <FormGroup row>
                             <Label htmlFor="TelCentre" md={5}><b>Téléphone </b></Label>
                             <Col md={7}>
                             <Input type="tel" id="TelCentre" name="TelCentre"
                                placeholder="Téléphne" required value={this.state.TelCentre}
                               
                                className="form-control"
                                onChange={this.onChangeTelCentre} />
                             </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label htmlFor="EmailCentre" md={5}><b>Email</b></Label>
                                <Col md={7}>
                                    <Input  required type="email" id="EmailCentre" name="EmailCentre"
                                    placeholder="Email" value={this.state.EmailCentre}
                                  
                                    className="form-control"
                                    onChange={this.onChangeEmailCentre} />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label htmlFor="DescriptionCentre" md={5}> <b>Déscription</b></Label>
                                    <Col md={7}>
                                        
                                        <Input   required type="textarea" id="DescriptionCentre" name="DescriptionCentre"
                                        rows="6" placeholder="Déscription"
                                        value={this.state.DescriptionCentre} onChange={this.onChangeDescriptionCentre}
                                       
                                        className="form-control"></Input>
                                    </Col>              
                            </FormGroup>

                            <FormGroup row>
                                <Col>                        
                                    <input type="submit" value="Modifer" className="btn btn-primary offset-2" />                         
                                    <a className="offset-1 btn btn-secondary" href="/ProfileCentre">
                                        Annuler
                                    </a>
                                </Col>        
                            </FormGroup>  
                                        
                            </Form>  
                        </div>            
                    </div>
                </div>  
            </div>
        </div>
    );
  }
}