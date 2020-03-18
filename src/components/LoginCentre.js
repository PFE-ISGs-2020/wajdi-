import React, { useState } from 'react';
import {  Button, Form,  FormFeedback, InputGroup, InputGroupAddon, InputGroupText, Input, Col } from 'reactstrap';
import axios from 'axios';

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);
   
    const handleChange = e => {
      setValue(e.target.value);
    }
    return {
      value,
      onChange: handleChange
    }
  }

function Login(props) {
    
    const username = useFormInput('');
    const password = useFormInput('');
    
    return(
        <div className="row row-content">
            
            <div className="col-12 col-md-9">
            <Form onSubmit={this.handleLogin}>
                        
                <InputGroup>
                    {/* Logo de User*/ }
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText ><span className="fa fa-user fa-lg"></span></InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="username" type="text" {...username} autoComplete="new-password" />
                </InputGroup>
                <br/>
                <InputGroup>
                    {/* Logo pour le password*/ }
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText ><span className="fa fa-lock fa-lg"></span></InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" placeholder="Password" {...password} autoComplete="new-password" />
                </InputGroup>
                 <br/>
                <Col md={{size: 10, offset: 9}}>
                    <Button type="submit" value="submit" color="primary" ></Button>
                </Col> 
                        {/* <FormFeedback>{error}</FormFeedback>    */}
            </Form>
            </div>
        </div>
    );
 }   


export default Login;