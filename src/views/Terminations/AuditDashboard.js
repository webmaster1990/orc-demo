import React,{Component} from 'react';
import {Button, Card, CardBody, Col, Row,} from "reactstrap";
import { DatePicker } from 'antd';
import { Table,Tag } from 'antd';
import { CSVLink } from "react-csv";
import {ApiService} from "../../Services/ApiService";
import { PropagateLoader } from 'react-spinners';


const columns = [{
  title: 'Date',
  render: (record) =>{
    return <span>{record.Message && record.Message.Time}</span>
  }
}, {
  title: 'User Id',
  dataIndex: 'AuditID'
}, {
  title: 'Application',
  render: (record) => {
    return <span>{record.Message && record.Message.App }</span>
  }
}, {
  title: 'Event Description',
  render: (record) => {
    return <span>{record.Message && record.Message.EventDesc }</span>
  }
},{
  title: 'status',
  render: status =><div><Tag color={status.Message && status.Message.Status === "success" ? 'green' : 'volcano'}>{status.Message && status.Message.Status}</Tag></div>
}, ];
 const headers = [
  { label: "Application", key: "Application" },
  { label: "Create Time Stamp", key: "CreateTimeStamp" },
  { label: "Account ID", key: "accountID" },
  { label: "Event Description", key: "eventDescription" },
  { label: "Event Message", key: "eventMessage" },
  { label: "Operation", key: "operation" },
  { label: "Status", key: "status" },
];
const {  RangePicker } = DatePicker;

class AuditDashboard extends Component{
  _dataContext = new ApiService();
  constructor(props) {
    super(props);
    this.state = {
      selectDate: [],
      startDate: null,
      endDate: null,
      auditDashboardData: [],
      selectDateRange: false,
      auditLoading: false,
    };
  }

   onChange = (date, dateString) =>{
    this.setState({
      selectDate:dateString
    })
  }

  onSubmit = async() =>{
    const { selectDate } = this.state
    this.setState({
      selectDateRange: true
    })
    if(selectDate && selectDate.length > 0){
      this.setState({
        auditLoading: true,
      })
      const auditData = await this._dataContext.getAuditData();
      this.setState({
        auditLoading: false,
        auditDashboardData: auditData && auditData.Message || [],
      })
    }
  }

  onClear = () =>{
    this.setState({
      selectDateRange: false,
      auditDashboardData: "",
    })
  }
  getCSVData = () => {
    const { auditDashboardData = [] } = this.state;
    return auditDashboardData.map(item => {
      return {
        Application: item.AuditID,
        CreateTimeStamp: item.Message && item.Message.Time,
        accountID: item.Message && item.Message.accountID,
        eventDescription: item.Message && item.Message.EventDesc,
        eventMessage: item.Message && item.Message.EventMessage,
        operation: item.Message && item.Message.Operation,
        status: item.Message && item.Message.Status,
      };
    });
  }

  render() {
    const { auditDashboardData, selectDateRange, auditLoading } = this.state
    return(
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12" lg="12">
            <Card>
              <CardBody>
                <Row>
                  <Col sm="12" xs="12" md="6">
                    <h5>Select Date Range</h5>
                    <RangePicker  onChange={this.onChange}/>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col  sm="12" xs="12" md="6" className="pull-right">
                    <Button type="button" color="primary" className="btn-sm " onClick={this.onSubmit}>Submit</Button>
                    <Button type="button" color="primary" className="btn-sm ml-2" onClick={this.onClear}>Clear</Button>
                  </Col>
                </Row>
                <hr className="hr"/>
                {
                  auditLoading ?  <div className="loading">{' '}<PropagateLoader color={'#165d93'} /></div> :
                    <Row>
                      <Col sm="12" xs="12" md="12">
                        {
                          selectDateRange && auditDashboardData.length > 0 ?
                            <div>
                              <div className="text-right mb-3">
                                <Button type="button" color="primary" className="btn-sm">Refresh   <i className="fa fa-refresh"/></Button>
                                <CSVLink data={this.getCSVData()} headers={headers} filename={"audit.csv"}>
                                  <Button type="button" color="primary" className="btn-sm ml-2">Download CSV <i className="fa fa-refresh"/></Button>
                                </CSVLink>
                              </div>
                              <Table columns={columns} size={"small"}  scroll={{ x: 768 }} dataSource={auditDashboardData}/>
                            </div> : null
                        }
                      </Col>
                    </Row>
                }

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }

}
export default AuditDashboard
