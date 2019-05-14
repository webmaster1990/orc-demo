import React,{Component} from 'react';
import { Card, CardBody, Col, Row,} from "reactstrap";
import {ApiService} from "../../Services/ApiService";
import { PropagateLoader } from 'react-spinners';

class OutOfBounds extends Component{
  _dataContext = new ApiService();
  
  state = {
    outOfBounds: [],
    loading: false,
  }
  
  componentDidMount() {
    this.getFailures()
  }
  
  getFailures = async() =>{
    this.setState({
      loading: true,
    });
    await this._dataContext.getFailures();
    this.setState({
      loading: false
    })
   
  }
  
  onFilterInputChange = (e) => {
    this.setState({
      filterUserId: e.target.value
    });
  }
  
  render() {
    const { loading } = this.state;
    return(
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12" lg="12">
            <Card>
              <CardBody>
                {
                  loading ? <div className="loading">{' '}<PropagateLoader color={'#165d93'}/></div> :
                    <div>
                      <Row>
                        <Col sm="12" xs="12" md="12" className="mt-3">
                        
                        </Col>
                      </Row>
                    </div>
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
export default OutOfBounds
