import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'react-bootstrap';

class DetailFormationComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nomformation:'',
            datedeb:'',
            datefin:'',
            nomcentre:'',
            description:''    
        };
                
    }

    render(){
        return(
            <div className="container">
                {/*BreadCrumb begin */}
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Contact Us</h3>
                        <hr />
                    </div>                
                </div>
                 {/*BreadCrumb end */}
            
                {/* searching bar and botton begin*/}
                <div className="row-12 justify-content-center">
                <InputGroup className="mb-3">
                    <DropdownButton
                    as={InputGroup.Prepend}
                    variant="outline-secondary"
                    title='Centre'
                    id="input-group-dropdown-1"
                    >
                    <Dropdown.Item href="#">Centre</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#">Formation</Dropdown.Item>                
                    </DropdownButton>
                    <FormControl aria-describedby="basic-addon1" />

                    <Button variant="outline-secondary">GO!!</Button>
                </InputGroup>
                </div>
                {/* searching bar and botton  end*/}
                {/* showing details  begin*/}
                <div className="row">
                    <p>Nom formation:{this.state.nomformation}</p>
                </div>
                <div className="row">
                    <p>Date debut:{this.state.datedeb}</p>
                </div> 
                <div className="row">
                    <p>Date fin:{this.state.datefin}</p>
                </div> 
                <div className="row">
                    <p>Nom du centre:{this.state.nomcentre}</p>
                </div>  
                <div className="row">
                    <p>Description:{this.state.description}</p>
                </div>   
                {/* showing details  end*/}

                {/* s'inscrire Button  begin*/}
                <div className="row">  
                    <Button type="submit" color="primary">
                        S'inscrire
                    </Button>
                </div>   
                {/* s'inscrire Button  end*/}

            </div>
    );    

}
}
export default DetailFormationComponent;