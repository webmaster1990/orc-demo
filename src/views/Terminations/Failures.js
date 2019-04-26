import React,{Component} from 'react';
import { Button, Card, CardBody, Col, Row,} from "reactstrap";
import { Table, Input } from 'antd';
import { CSVLink } from "react-csv";
import {ApiService} from "../../Services/ApiService";
import { PropagateLoader } from 'react-spinners';

const headers = [
  { label: 'Date', key: 'createOn' },
  { label: 'User ID', key: 'userId' },
  { label: 'First Name', key: 'firstName' },
  { label: 'Last Name', key: 'lastName' },
  { label: 'Application ID', key: 'application' },
  { label: 'Last Retry', key: 'lastRetry'},
];

class Failures extends Component{
  _dataContext = new ApiService();
  state = {
    retryTransnationalData: [],
    retryTransnationalDataBack: [],
    failuresLoading: false,
    filterUserId: ''
  }

  componentDidMount() {
    this.getFailures()
  }

  getFailures = async() =>{
      this.setState({
        failuresLoading: true,
      });
      const failuresData = await this._dataContext.getFailures();
      this.setState({
        failuresLoading: false,
        retryTransnationalData: (failuresData && failuresData.details) || [],
        retryTransnationalDataBack: (failuresData && failuresData.details) || [],
        filterUserId: ''
      })

  }
  
  onFilterInputChange = (e) => {
    this.setState({
      filterUserId: e.target.value
    });
  }
  
  onFilter = () => {
    const {retryTransnationalDataBack, filterUserId} = this.state;
    const retryTransnationalData = retryTransnationalDataBack.filter(record => {
      return (record.userObject && record.userObject.EmployeeID && record.userObject.EmployeeID.toLowerCase().includes(filterUserId));
    })
    this.setState({
      retryTransnationalData,
    });
    
  }

  getCSVData = () => {
    const { retryTransnationalData = [] } = this.state;
    return retryTransnationalData.map(item => {
      return {
        createOn: item.createOn,
        userId: item.userObject && item.userObject.EmployeeID,
        application: item.applicationName,
        firstName: item.userObject && item.userObject.Firstname,
        lastName: item.userObject && item.userObject.Lastname,
        lastRetry: (item.updateOn && (item.updateOn[item.updateOn.length - 1] || {}).triggeredOn.substr(0, 19)) || '-'
      };
    });
  }

  render() {
    const { retryTransnationalData,failuresLoading } = this.state;
    const columns = [
      { title: 'Date',
        dataIndex: 'createOn',
        render: createOn =><span>{(createOn && createOn.substr(0, 19)) || '-'}</span>,
      },
      { title: 'User ID',
        render: (record) => {
          return <span>{record.userObject && record.userObject.EmployeeID}</span>
        },
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
      },
      { title: 'First Name',
        render: (record) => {
          return <span>{record.userObject && record.userObject.Firstname}</span>
        }
      },
      { title: 'Last Name',
        render: (record) => {
          return <span>{record.userObject && record.userObject.Lastname}</span>
        }
      },
      { title: 'Application',
        dataIndex: 'applicationName'
      },
      { title: 'Last retry',
        render: record =><span>{(record.updateOn && (record.updateOn[record.updateOn.length - 1] || {}).triggeredOn.substr(0, 19)) || '-'}</span>,
      },
      { title: 'Retry',
        dataIndex: 'Retry',
        render: () =><span><i className="fa fa-refresh fa-lg"/></span>,
      },
    ];
    return(
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12" lg="12">
            <Card>
              <CardBody>
                {
                  failuresLoading ? <div className="loading">{' '}<PropagateLoader color={'#165d93'}/></div> :
                    <div>
                      <Row>
                        <Col sm="12" xs="12" md="12">
                          <div className="text-right mb-3">
                            <Button type="button" color="primary" className="btn-sm" onClick={this.getFailures}>Refresh <i
                              className="fa fa-refresh"/></Button>
                            <CSVLink data={this.getCSVData()} headers={headers} filename={"failures.csv"}>
                              <Button type="button" color="primary" className="btn-sm ml-2">Download CSV <i
                                className="fa fa-refresh"/></Button>
                            </CSVLink>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm="12" xs="12" md="12" className="mt-3">
                          <Table
                            columns={columns}
                            size="small"
                            expandedRowRender={record => {
                              return record.updateOn.map((data) => {
                                return (
                                  <div>
                                    <p><b>Triggered On : </b>{data.triggeredOn.substr(0, 19)}</p>
                                    <p><b>Reason : </b>{data.reason}</p>
                                    <hr className="hr"/>
                                  </div>
                                )
                              })
                            }}
                            dataSource={retryTransnationalData}
                          />
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
export default Failures
