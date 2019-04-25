import React,{Component} from 'react';
import { Card, CardBody, Col, Row, Input, Button} from "reactstrap";
import { message } from 'antd';

class Settings extends Component{
  
  state = {
    urlParam: localStorage.getItem('topic') || 'User_Termination_processV1'
  }
  
  onChange = (e) => {
    this.setState({
      urlParam: e.target.value
    });
  }
  
  setPath = () => {
    localStorage.setItem('topic', this.state.urlParam);
    message.config({
      top: 100,
      duration: 2,
    });
    message.success('Topic saved successfully!')
  }
  
  render() {
    return(
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12" lg="12">
            <Card>
              <CardBody>
                <Row>
                <Col md="4">
                  <Input onChange={this.onChange} value={this.state.urlParam}/>
                </Col>
                <Col md="4">
                  <Button type="primary" onClick={this.setPath}>Submit</Button>
                </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
export default Settings
