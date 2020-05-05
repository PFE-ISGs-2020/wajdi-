import React, { Component } from 'react';
import {  Form, FormGroup, Input, Label, Col  } from 'reactstrap';
import axios from 'axios';

export default class ModifierImageClient extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
          
          imageClient: '',
          selectedImage:'',
          NomClient: '',
  
      };
      this.onChangeimageClient = this.onChangeimageClient.bind(this);
      this.onSubmit = this.onSubmit.bind(this); 
    }

    //didmount begin
  componentDidMount() {
    axios.get('http://localhost:5000/Client/'+this.props.match.params.id)
      .then(response => {
        this.setState({
            NomClient: response.data.NomClient,
            
            selectedImage: response.data.imageClient
       
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

//récupération des donnees du l'Input
onSubmit(e) {
    e.preventDefault();
   
    let ImageClient = new FormData();
    
    ImageClient.append("imageClient", this.state.imageClient)
    console.log(this.state.imageClient) 
     axios.post('http://localhost:5000/Client/updateImageClient/' + this.props.match.params.id, ImageClient)
      .then(res => console.log(res.data) ,window.location = '/ProfileClient');
  } 
  render() {
   let image = this.state.selectedImage;
 if (!this.state.imageClient){
     image = "http://localhost:5000/"+this.state.selectedImage
 }
   return (
      <div className="container">
      <div className= "row justify-content-md-center">
         <div className="col-10 text-center">
         <br/>
                            <h3> Modifier la photo de votre profile </h3>
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
            <Col> 
               <br/>                       
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
   );
}}