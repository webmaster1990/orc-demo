import React,{Component} from 'react';
import {Button, Card, CardBody, Col, Row,} from "reactstrap";
import { DatePicker, Table, Tag, Input } from 'antd';
import moment from 'moment';
import { CSVLink } from "react-csv";
import {ApiService} from "../../Services/ApiService";
import { PropagateLoader } from 'react-spinners';

 const headers = [
  { label: "Audit ID", key: "AuditID" },
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
  
  state = {
    selectDate: [],
    startDate: null,
    endDate: null,
    auditDashboardData: [],
    auditDashboardDataBack: [],
    selectDateRange: false,
    auditLoading: false,
    filterUserId: ''
  };

  onChange = (date, dateString) =>{
    this.setState({
      selectDate: dateString
    })
  }
  
  onFilterInputChange = (e) => {
    this.setState({
      filterUserId: e.target.value
    });
  }
  
  onFilter = () => {
    const {auditDashboardDataBack, filterUserId} = this.state;
    const auditDashboardData = auditDashboardDataBack.filter(record => {
      return (record.Message && record.Message.accountID && record.Message.accountID.toLowerCase().includes(filterUserId));
    })
    this.setState({
      auditDashboardData,
    });
    
  }

  onSubmit = async() =>{
    const { selectDate } = this.state
    this.setState({
      selectDateRange: true
    })
    if(selectDate && selectDate.length > 0){
      this.setState({
        auditLoading: true,
      });
      
      let auditData = await this._dataContext.getAuditDataUserTermination();
      let auditData2 = await this._dataContext.getAuditDataRetryFailed();
      let finalData = [];
      if (auditData && auditData.Message) {
        finalData = auditData.Message || []
      }
      if (auditData2 && auditData2.Message) {
        finalData = finalData.concat(auditData2.Message || [])
      }
      debugger;
      if (finalData.length) {
        finalData = finalData.sort((x, y) => {
          if (x.Message && y.Message && x.Message.Time && y.Message.Time) {
            return moment.utc(y.Message.Time.substr(0,19), 'DD/MM/YYYY hh:mm:ss').diff(moment.utc(x.Message.Time.substr(0,19), 'DD/MM/YYYY hh:mm:ss'))
          }
          return -1;
        });
      }
      this.setState({
        auditLoading: false,
        auditDashboardData: finalData || [],
        auditDashboardDataBack: finalData || [],
        filterUserId: ''
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
        AuditID: item.AuditID,
        Application: item.Message && item.Message.App,
        CreateTimeStamp: item.Message && item.Message.Time.substr(0,19),
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
    const columns = [{
      title: 'Date',
      render: (record) =>{
        return <span>{record.Message && record.Message.Time.substr(0,19)}</span>
      },
      width: 200
    }, {
      title: 'Audit ID',
      render: (record) => {
        return <span>{record.AuditID}</span>
      },
      width: 150
    },{
      title: 'User Id',
      render: (record) => {
        return <span>{(record.Message && record.Message.accountID) || '-' }</span>
      },
      width: 150,
      filterDropdown: (
        <div>
          <Input
            placeholder='User ID'
            value={this.state.filterUserId}
            onChange={this.onFilterInputChange}
            style={{width: 130}}
          />
          <Button type="primary" size="sm" className="ml-1" onClick={this.onFilter}>Search</Button>
        </div>
      ),
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
                          selectDateRange ?
                            <div>
                              <div className="text-right mb-3">
                                <Button type="button" color="primary" className="btn-sm" onClick={this.onSubmit}>Refresh   <i className="fa fa-refresh"/></Button>
                                <CSVLink data={this.getCSVData()} headers={headers} filename={"audit.csv"}>
                                  <Button type="button" color="primary" className="btn-sm ml-2">Download CSV <i className="fa fa-refresh"/></Button>
                                </CSVLink>
                              </div>
                              <Table columns={columns} size={"small"} dataSource={auditDashboardData}/>
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
