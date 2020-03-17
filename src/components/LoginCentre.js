import React, { Component } from 'react';
import {  Button, Form, InputGroup, InputGroupAddon, InputGroupText, Input, Col } from 'reactstrap';

class Login extends Component {
    
    render(){

    return(
        <div className="row row-content">
            
            <div className="col-12 col-md-9">
            <Form onSubmit={this.handleLogin}>
                        
                <InputGroup>
                    {/* Logo de User*/ }
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText ><span className="fa fa-user fa-lg"></span></InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="username" />
                </InputGroup>
                <br/>
                <InputGroup>
                    {/* Logo pour le password*/ }
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText ><span className="fa fa-lock fa-lg"></span></InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" placeholder="Password" />
                </InputGroup>
                <br/>
                <Col md={{size: 10, offset: 9}}>
                    <Button type="submit" value="submit" color="primary">Login</Button>
                </Col> 
                        {/* <FormFeedback>{error}</FormFeedback>    */}
            </Form>
            </div>
        </div>
    );
    }

}
export default Login;