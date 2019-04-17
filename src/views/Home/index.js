import React,{Component} from 'react';
import {Link} from "react-router-dom";
import {Button, Card, CardBody, Col, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import CardHeader from "reactstrap/es/CardHeader";

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
               className='modal-primary modal-dialog-centered' >
          <ModalHeader toggle={this.auditDashboardModalOpen} className="modal-title">Audit Dashboard
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col md="6" sm="12" xs="12" className="mt-2">
                <Button type="button" color="primary" className="btn-sm" onClick={this.auditDashboard}>Audit Dashboard</Button>
                <Button type="button" color="primary" className="btn-sm ml-2" onClick={this.failures}>Failures</Button>
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
                    <Card className="shadow-lg">
                      <CardHeader className="bg-info">
                        <i className="icon-user icons d-block text-center"  style={{fontSize:100}}/>
                      </CardHeader>
                      <CardBody>
                        <Link to="/home" onClick={this.auditDashboardModalOpen}><h4>Terminations</h4></Link>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col xs="12" sm="12" lg="3">
                    <Card className="shadow-lg">
                      <CardHeader className="bg-info">
                        <i className="icon-user icons d-block text-center"  style={{fontSize:100}}/>
                      </CardHeader>
                      <CardBody>
                        <Link to="/home" onClick={this.auditDashboardModalOpen}><h4>Out of Band</h4></Link>
                      </CardBody>
                    </Card>
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
