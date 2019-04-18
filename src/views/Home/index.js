import React,{Component} from 'react';
import {Button, Card, CardBody, Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import CardHeader from "reactstrap/es/CardHeader";
import './Home.scss'

class Home extends Component{
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      auditDashboardModal: false,
    };
  }

  auditDashboard = () =>{
    this.props.history.push("/audit-dashboard");
  }

  failures = () =>{
    this.props.history.push("/failures");
  }

  auditDashboardModalOpen = () => {
    this.setState({
      auditDashboardModal: !this.state.auditDashboardModal,
    });
  }

  auditDashboardModal =()=>{
    return(
      <div>
        <Modal isOpen={this.state.auditDashboardModal} toggle={this.auditDashboardModalOpen}
               className='modal-primary modal-dialog-centered home-modal' >
          <ModalHeader toggle={this.auditDashboardModalOpen} className="modal-title text-white">Terminations
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col md="12" className="mt-2 mb-2 text-center">
                <Button type="button" color="primary" className="btn-lg" onClick={this.auditDashboard}>Audit Dashboard</Button>
                <Button type="button" color="danger" className="btn-lg ml-2" onClick={this.failures}>Failures</Button>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </div>
    )
  }
  render() {
    return(
      <div className="animated fadeIn">
         {this.auditDashboardModal()}
        <Row>
          <Col xs="12" sm="12" lg="12">
            <Card>
              <CardBody>
                <Row>
                  <Col xs="12" sm="12" lg="3">
                    <Card className="shadow-lg cursor-pointer" onClick={this.auditDashboardModalOpen}>
                      <CardHeader className="bg-info">
                        <i className="icon-user icons d-block text-center"  style={{fontSize:100}}/>
                      </CardHeader>
                      <CardBody>
                        <h4>Terminations</h4>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col xs="12" sm="12" lg="3">
                    <Card className="shadow-lg cursor-pointer">
                      <CardHeader className="bg-info">
                        <i className="icon-user icons d-block text-center"  style={{fontSize:100}}/>
                      </CardHeader>
                      <CardBody>
                        <h4>Out of Band</h4>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col xs="12" sm="12" lg="3">
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
export default Home;
