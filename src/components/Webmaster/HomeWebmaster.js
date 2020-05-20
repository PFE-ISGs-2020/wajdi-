import React from 'react';
import SideNavWebmaster from './sideNavWebmaster';

export default function HomeWebmaster() {
    return(
      <div className="row row-content">
        <nav  className="col-2">
          <SideNavWebmaster />
        </nav>     
        <section className="col-10 text-center">
          <div >
            <br/>
            <h2>Welcome Back to your dashboard!</h2>
          </div>
        </section>
      </div>     
     
     ) ;
  }