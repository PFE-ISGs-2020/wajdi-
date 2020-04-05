import React, { Component } from "react";
import SideBar from "./sidebar";

 
class ProfileCentre extends Component {
    constructor(props) {
        super(props);
      
        this.state = { };
    }

render() {     
return (
    <div>
        <SideBar pageWrapId={"page-wrap"} />
        <div id="page-wrap">
            <div className=" container ">
                <div className="row justify-content-md-center">
                    <div className="col-10 text-center">


                    </div>        
                </div>                            
            </div>
        </div>  
    </div>  
    );
  }
} 

export default ProfileCentre ;
