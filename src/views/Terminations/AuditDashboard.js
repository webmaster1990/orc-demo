import React,{Component} from 'react';
import {Badge, Button, Card, CardBody, Col, Row,} from "reactstrap";
import { DatePicker } from 'antd';
import auditDashboardData from '../../mockData/AuditDashboardData'
import { Table,Tag } from 'antd';
import moment from "moment";

const columns = [{
  title: 'Date',
  dataIndex: 'CreateTimeStamp',
  render: CreateTimeStamp =><div>{moment(CreateTimeStamp).format('MMMM Do YYYY h:mm:ss a')}</div>,
}, {
  title: 'User Id',
  dataIndex: 'accountID'
}, {
  title: 'Application',
  dataIndex: 'Application'
}, {
  title: 'Event Description',
  dataIndex: 'eventDescription'
},{
  title: 'status',
  dataIndex: 'status',
  render: status =><div><Tag color={status === "Success" ? 'green' : 'volcano'}>{status}</Tag></div>
}, ];

const {  RangePicker } = DatePicker;

class AuditDashboard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      selectDate: [],
      auditDashboardData: [],
      selectDateRange: false,
    };
  }

   onChange = (date, dateString) =>{
    this.setState({
      selectDate:dateString
    })
  }

  onSubmit = () =>{
    const { selectDate } = this.state
    this.setState({
      selectDateRange: true
    })
    if(selectDate && selectDate.length > 0){
      this.setState({
        auditDashboardData: auditDashboardData.auditData
      })
    }
  }

  onClear = () =>{
    this.setState({
      selectDateRange:false,
      auditDashboardData: "",
    })
  }

  render() {
    const { auditDashboardData, selectDateRange } = this.state
    return(
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12" lg="12">
            <Card>
              <CardBody>
                <Row>
                  <Col sm="12" xs="12" md="6">
                    <h5>Select Date Range</h5>
                    <RangePicker onChange={this.onChange}/>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col  sm="12" xs="12" md="6" className="pull-right">
                    <Button type="button" color="primary" className="btn-sm " onClick={this.onSubmit}>Submit</Button>
                    <Button type="button" color="primary" className="btn-sm ml-2" onClick={this.onClear}>Clear</Button>
                  </Col>
                </Row>
                <hr className="hr"/>
                <Row>
                  <Col sm="12" xs="12" md="12">
                    {
                      selectDateRange && auditDashboardData.length > 0 ?
                        <div>
                          <Button type="button" color="primary" className="btn-sm pull-right">Refresh   <i className="fa fa-refresh"/></Button>
                          <Table columns={columns} dataSource={auditDashboardData}/>
                        </div> : null
                    }
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
export default AuditDashboard
