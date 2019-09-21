import React,{Component} from 'react';
import { Card, CardBody, Col, Row, Input, Button} from "reactstrap";
import { message } from 'antd';

class Settings extends Component{

  state = {
    topic1: localStorage.getItem('topic1') || 'User_Termination_processV1',
    topic2: localStorage.getItem('topic2') || 'Retry_failed_transaction_processV1',
    apiHost: localStorage.getItem('apiHost') || 'http://132.145.170.253:8080'
  }
  
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  
  setPath = () => {
    localStorage.setItem('topic1', this.state.topic1);
    localStorage.setItem('topic2', this.state.topic2);
    localStorage.setItem('apiHost', this.state.apiHost);
    message.config({
      top: 100,
      duration: 2,
    });
    message.success('config data saved successfully!', 2)
  }
  
  render() {
    return(
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12" lg="12">
            <Card>
              <CardBody>
                <Row>
                  <Col md="12">
                    <b>User Termination Audit Topic:</b>
                    <Input onChange={this.onChange} value={this.state.topic1} name="topic1"/>
                  </Col>
                  <Col md="12" className="mt-10">
                    <b>Failure Transaction Audit Topic:</b>
                    <Input onChange={this.onChange} value={this.state.topic2} name="topic2"/>
                  </Col>
                  <Col md="12" className="mt-10">
                    <b>Api Host Url:</b>
                    <Input onChange={this.onChange} value={this.state.apiHost} name="apiHost"/>
                  </Col>
                  <Col md="12" className="mt-10">
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
