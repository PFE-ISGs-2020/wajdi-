import React, { Component } from "react"; 
import SideNavWebmaster from './sideNavWebmaster';

class DashboardWebmaster extends Component {
 
render() {

return (
      <div>
        <SideNavWebmaster pageWrapId={"page-wrap"} />
        
        <div id="page-wrap" className="container">
          <h4>          </h4>              
        </div>
      </div>
    );
  }
}
 
export default DashboardWebmaster ;