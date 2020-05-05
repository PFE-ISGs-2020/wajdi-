import React, { Component } from 'react';
import {  Form, FormGroup, Input, Label, Col  } from 'reactstrap';
import axios from 'axios';
import SideBar from "./sidebar";

export default class ModifierImageCentre extends Component {
  constructor(props) {
    super(props);

    this.state = {
        
        image: '',
        selectedImage:'',

    };
    

    
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onSubmit = this.onSubmit.bind(this); 
  }

  
   //didmount begin
  componentDidMount() {
    axios.get('http://localhost:5000/Centre/'+this.props.match.params.id)
      .then(response => {
        this.setState({
            NomCentre: response.data.NomCentre,
            
            selectedImage: response.data.image
       
        })
        console.log(this.state.image);   
      })
      .catch((error) => {
        console.log(error);
      })

    }
    //didmount end
 

    onChangeImage (e) {
        this.setState({
            image: e.target.files[0],
            selectedImage:URL.createObjectURL(e.target.files[0])
        });
      };

    

    //récupération des donnees du l'Input
    onSubmit(e) {
    e.preventDefault();
   
    let ImageCentre = new FormData();
    
    ImageCentre.append("image", this.state.image)
    console.log(this.state.image) 
     axios.post('http://localhost:5000/Centre/updateImageCentre/' + this.props.match.params.id, ImageCentre)
      .then(res => console.log(res.data) ,window.location = '/ProfileCentre');
  } 
  
  render() {
    let image = this.state.selectedImage;
  if (!this.state.image){
      image = "http://localhost:5000/"+this.state.selectedImage
  }
    return (
        <div>
            <SideBar pageWrapId={"page-wrap"} />
            <div id="page-wrap">
                <div className=" container ">
                    <div className="row justify-content-md-center">
                        <div className="col-10 text-center">
                            
                            <h3> Modifier l'image du Centre </h3>
                            <br/>
                            <br/>

                            <Form onSubmit={this.onSubmit}>
                           
                            <FormGroup row>
                            <Label htmlFor="image" md={5}> <b>Image du Centre</b></Label>
                            <Col md={7}>
   
                            <Input  type="file" id="image" name="image" 
                            
                            className="process__upload-btn"
                            onChange={this.onChangeImage} />
                            </Col>
                            </FormGroup>
                            <img src= {image} alt="" className="process__image offset-2"
                            width="200" height="200" /> 
                            
                            <FormGroup row>
                                <Col> 
                                <br/>                       
                                    <input type="submit" value="Modifier" className="btn btn-primary offset-2" />                         
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
    );}}