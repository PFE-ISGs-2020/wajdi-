import React, { Component } from "react"; 
import SideNavWebmaster from './sideNavWebmaster';
import {Card,CardColumns } from "react-bootstrap";
import axios from 'axios';
import Chart from './Chart';
import randomColor from 'randomcolor';

class DashboardWebmaster extends Component {
 
  constructor(props) {
    super(props);
    this.state = {nbrClient:0,nbrAcces:0,nbrList:0,      
                  ThemeFormation:[], 
                  ThemeLables:[],ThemeData:[] , ColorTab:[],
                  chartData:{}
                };
  }
    //didmount begin
   componentDidMount() {
    axios.get('http://localhost:5000/Client/count')
      .then(response => {
        this.setState({nbrClient:response.data })           
      })
      .catch((error) => {
        console.log(error);
      })

      axios.get('http://localhost:5000/Centre/Acces/count')
      .then(resp => {
        this.setState({ nbrAcces : resp.data}) ;     
      })
      .catch((error) => {
        console.log(error);
      })

      axios.get('http://localhost:5000/Centre/List/count')
      .then(res => {
        this.setState({ nbrList : res.data}) ;     
      })
      .catch((error) => {
        console.log(error);
      })


      axios.get('http://localhost:5000/Formation/count')
      .then(rep => {
        this.setState({ ThemeFormation: rep.data  });
      })
      .catch((error) => {
        console.log(error);
      })
    }
    //didmount end

    getdata(){
      
        this.state.ThemeFormation.forEach(
          (res,i) => {          
               this.state.ThemeLables[i]=res._id;
               this.state.ThemeData[i]=res.count;
               this.state.ColorTab[i]= randomColor( {luminosity:'light',format:'rgb',hue:'yellow,green,blue,red,gray'} );
               i++;
              });     
    }

    getchartdata(){
        this.state.chartData = {
          labels:this.state.ThemeLables,
          datasets:[{data:this.state.ThemeData,
              backgroundColor:/*this.state.ColorTab*/
               ['rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.6)'] 
                  }]
        }      
    }

render() {
  this.getdata()            
  this.getchartdata()

  let chart = null  ; 
  if(this.state.chartData.labels[0] ){
    chart = <Chart chartData={this.state.chartData} />
  }

  return (
      <div>
        <SideNavWebmaster pageWrapId={"page-wrap"} />        
        <div id="page-wrap" className="container">
        
        <CardColumns>
        <Card  className="text-center ">
          <Card.Body>
          <div className="row row-content ">
            <div className="col-12 col-sm-6">
            <i className="fas fa-user-graduate " style={{ fontSize: "100px"}}></i>
            </div>
            <div className="col-sm ">
              <h6>Clients</h6>
              <h2>{this.state.nbrClient}</h2>
            </div>
          </div>  
          </Card.Body>   
          <Card.Footer>
            <p className="card-text"><i className="fas fa-graduation-cap"></i>
            <small className="text-muted">Nombre des comptes des clients</small></p> 
          </Card.Footer>     
        </Card>
        <Card className="text-center " >
           <Card.Body>
            <div className="row row-content ">
              <div className="col-12 col-sm-6">
              <i className="fas fa-user-cog" style={{ fontSize: "100px"}}></i>
              </div>
              <div className="col-sm">
                <h6>Demandes</h6>
                <h2> {this.state.nbrAcces} </h2>
              </div>
            </div>  
            </Card.Body>   
            <Card.Footer>
              <p className="card-text"><i className="fas fa-user-lock"></i> 
              <small className="text-muted">Nombre des comptes des demande des centres</small></p> 
            </Card.Footer>     
        </Card>
        <Card className="text-center" >
          <Card.Body>
            <div className="row row-content ">
              <div className="col-12 col-sm-6">
                <i className="fas fa-user-tie" style={{ fontSize: "100px"}}></i>
              </div>
              <div className="col-sm">
                <h6>Accepted</h6>
                <h2> {this.state.nbrList} </h2>
              </div>
            </div>  
            </Card.Body>   
            <Card.Footer>
              <p className="card-text"><i className="fas fa-user-check"></i> 
              <small className="text-muted"> Nombre des comptes des centres active</small></p> 
            </Card.Footer>     
        </Card>
        </CardColumns>

        <Card className="text-center" >
          <Card.Body>              
            {chart}

          </Card.Body>   
          <Card.Footer>
              <p> <i className="fas fa-chart-pie" /> Nombre de formations par theme </p> 
          </Card.Footer>     
        </Card><br/>
         

        </div>
      </div>
    );
  }
}
 
export default DashboardWebmaster ;