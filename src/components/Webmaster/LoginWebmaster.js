import React, { Component } from 'react';
import {  Button, Form,  InputGroup, InputGroupAddon, InputGroupText, Input, Col } from 'reactstrap';


class loginwebmaster extends Component {
    constructor(props) {
        super(props);

        this.onChangeLogin = this.onChangeLogin.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            login: '',
            password: '', 
            error: '',
            //isLoggedIn: false
        };
        
    } 
   
    onSubmit(e) {
        e.preventDefault();
        if(this.state.login === "admin" && this.state.password === "admin" )
        { window.location = '/DashboardWebmaster'}
        else {
            this.setState({
<<<<<<< HEAD
                error: 'login ou mot de passe incorrect!'
            });

            }
           
=======
                error: 'login ou mot de passe incorrect'
            })
        return(console.log(this.state.error));}
        
        else { 
            window.location = '/DashboardWebmaster'           
        }
>>>>>>> 90b5c616532a5dcb2e0f62fade57e6559c84a1de
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }
    onChangeLogin(e) {
        this.setState({
            login: e.target.value
        })
    }

    render() {

        return(
            
            <div className="row row-content">
               
                <div className="col-12 text-center">
                    <br/>
               
                <h2 >Login Webmaster</h2>
                <br/>
                <br/>
               
               </div>
               <div className=" col-12 d-flex justify-content-center">
               <Form onSubmit={this.onSubmit}> 
                           
                               <InputGroup >
                               <InputGroupAddon addonType="prepend">
                               <InputGroupText  ><span className="fa fa-user fa-lg"></span></InputGroupText>
                               </InputGroupAddon>
<<<<<<< HEAD
                               <Input placeholder="username" value={this.state.login}
                             onChange={this.onChangeLogin} required />
=======
                               <Input required placeholder="username" value={this.state.login}
                             onChange={this.onChangeLogin} />
>>>>>>> 90b5c616532a5dcb2e0f62fade57e6559c84a1de
                           </InputGroup>
                           <br/>
                           <InputGroup>
                               <InputGroupAddon addonType="prepend">
                               <InputGroupText ><span className="fa fa-lock fa-lg"></span></InputGroupText>
                               </InputGroupAddon>
<<<<<<< HEAD
                               <Input type="password" placeholder="Password" value={this.state.password}
                             onChange={this.onChangePassword} required />
                           </InputGroup>
                           <span style={ {color:'red'} }>{this.state.error}</span>
                           <br/> 
=======
                               <Input required type="password" placeholder="Password" value={this.state.password}
                             onChange={this.onChangePassword} />
                           </InputGroup>
                                <span style={{color:'red'}}>{this.state.error}</span>
                           <br/>
>>>>>>> 90b5c616532a5dcb2e0f62fade57e6559c84a1de
                           <Col md={{size: 10, offset: 8}}>
                               <Button type="submit" value="submit" color="primary">Login</Button>
                           </Col>    
                           </Form>
   
               </div>
              
            </div>
            
        );
}}
export default loginwebmaster; 