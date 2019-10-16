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
    retryTransnationalData: [
      {
        "uniqueID": 82,
        "accountID": "e11999999",
        "maxAutoRetry": 3,
        "maxManualRetry": 3,
        "autoRetryCount": 4,
        "manualRetryCount": 4,
        "applicationID": "017ZIIID",
        "applicationName": "RSA_MastercardDemo",
        "userObject": {
          "User_ID": "e100009",
          "First_Name": "John",
          "Middle_Initial": "C",
          "Last_Name": "Doe",
          "Job_Status": "T",
          "Supervisor": "Bob",
          "Title": "Consultant",
          "Division": "Corporate Security",
          "Flex_String": "qwerty1",
          "Flex_Company": "Mastercard",
          "Flex_Cost_Center": "e11",
          "Flex_Division2": "SL",
          "Flex_Geo": "abc",
          "Location": "Mastercard Blvd",
          "Address": "2200 Mastercard Blvd",
          "City": "Saint Louis",
          "State": "Missouri",
          "Zip": "63368",
          "Country": "USA",
          "Country_Code": "1",
          "Country_Number": "1",
          "Region": "North America",
          "HR_Business_partner": "Mahendra K",
          "Acquisition": "",
          "Network_Location_Id": "6516",
          "Flex_Division": "BU",
          "Position_ID": "645",
          "Termination_Date": "10-Sep-2019",
          "Department": "Corporate Security",
          "Employment_Status": "Terminated",
          "Is_Terminated": "Y",
          "Group_Executive": "",
          "Employee_ID": "e11999999",
          "Matrix_Manager": "",
          "Phone_Number": "732377397",
          "Fax_Number": "72772",
          "Extension": "21",
          "Mobile_Phone_Number": "4987654258",
          "Cube_Address": "xc45",
          "Career_Level_Description": "1",
          "Career_Level_Code": "xy1",
          "Hire_Date": "10-May-02",
          "PRIMARY_ID": "e11999999"
        },
        "auditConfig": {},
        "createOn": "16/10/2019 03:52:22:822EDT",
        "updateOn": [
          {
            "order": 1,
            "triggeredOn": "16/10/2019 03:53:00:602EDT",
            "reason": "ERROR: Unable to find user e11999999."
          },
          {
            "order": 2,
            "triggeredOn": "16/10/2019 03:53:17:70EDT",
            "reason": "ERROR: Unable to find user e11999999."
          },
          {
            "order": 3,
            "triggeredOn": "16/10/2019 04:00:25:167EDT",
            "reason": "ERROR: Unable to find user e11999999."
          },
          {
            "order": 4,
            "triggeredOn": "16/10/2019 06:00:00:447EDT",
            "reason": "ERROR: Unable to find user e11999999."
          },
          {
            "order": 5,
            "triggeredOn": "16/10/2019 16:29:10:674IST",
            "reason": "ERROR: Unable to find user e11999999."
          },
          {
            "order": 6,
            "triggeredOn": "16/10/2019 16:29:32:614IST",
            "reason": "ERROR: Unable to find user e11999999."
          },
          {
            "order": 7,
            "triggeredOn": "16/10/2019 16:30:49:711IST",
            "reason": "ERROR: Unable to find user e11999999."
          },
          {
            "order": 8,
            "triggeredOn": "16/10/2019 16:33:43:410IST",
            "reason": "ERROR: Unable to find user e11999999."
          }
        ]
      },
      {
        "uniqueID": 83,
        "accountID": "e11999999",
        "maxAutoRetry": 3,
        "maxManualRetry": 3,
        "autoRetryCount": 4,
        "manualRetryCount": 0,
        "applicationID": "017ZIIID",
        "applicationName": "RSA_MastercardDemo",
        "userObject": {
          "User_ID": "e100009",
          "First_Name": "John",
          "Middle_Initial": "C",
          "Last_Name": "Doe",
          "Job_Status": "T",
          "Supervisor": "Bob",
          "Title": "Consultant",
          "Division": "Corporate Security",
          "Flex_String": "qwerty1",
          "Flex_Company": "Mastercard",
          "Flex_Cost_Center": "e11",
          "Flex_Division2": "SL",
          "Flex_Geo": "abc",
          "Location": "Mastercard Blvd",
          "Address": "2200 Mastercard Blvd",
          "City": "Saint Louis",
          "State": "Missouri",
          "Zip": "63368",
          "Country": "USA",
          "Country_Code": "1",
          "Country_Number": "1",
          "Region": "North America",
          "HR_Business_partner": "Mahendra K",
          "Acquisition": "",
          "Network_Location_Id": "6516",
          "Flex_Division": "BU",
          "Position_ID": "645",
          "Termination_Date": "10-Sep-2019",
          "Department": "Corporate Security",
          "Employment_Status": "Terminated",
          "Is_Terminated": "Y",
          "Group_Executive": "",
          "Employee_ID": "e11999999",
          "Matrix_Manager": "",
          "Phone_Number": "732377397",
          "Fax_Number": "72772",
          "Extension": "21",
          "Mobile_Phone_Number": "4987654258",
          "Cube_Address": "xc45",
          "Career_Level_Description": "1",
          "Career_Level_Code": "xy1",
          "Hire_Date": "10-May-02",
          "PRIMARY_ID": "e11999999"
        },
        "auditConfig": {},
        "createOn": "16/10/2019 04:28:16:274EDT",
        "updateOn": [
          {
            "order": 1,
            "triggeredOn": "16/10/2019 04:30:00:448EDT",
            "reason": "ERROR: Unable to find user e11999999."
          },
          {
            "order": 2,
            "triggeredOn": "16/10/2019 04:35:00:450EDT",
            "reason": "ERROR: Unable to find user e11999999."
          },
          {
            "order": 3,
            "triggeredOn": "16/10/2019 04:40:00:466EDT",
            "reason": "ERROR: Unable to find user e11999999."
          },
          {
            "order": 4,
            "triggeredOn": "16/10/2019 06:00:00:803EDT",
            "reason": "ERROR: Unable to find user e11999999."
          }
        ]
      }
    ],
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
       // retryTransnationalData: (failuresData && failuresData.details) || [],
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

  onRetry = async (record) =>{
    const filePath = localStorage.getItem('filepath');
    const payload = {
      uniqueID: record.uniqueID,
      accountID: record.accountID,
      applicationName: record.applicationName,
      auditConfig: {
        filepath: filePath,
        auditTopic: record.auditConfig.auditTopic || '',
        auditID: record.auditConfig.auditID || '',
      }
    }
    const data = await this._dataContext.retry(payload)
    console.log(data)
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
          return <span>{record.userObject && record.userObject.User_ID}</span>
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
          return <span>{record.userObject && record.userObject.First_Name}</span>
        }
      },
      { title: 'Last Name',
        render: (record) => {
          return <span>{record.userObject && record.userObject.Last_Name}</span>
        }
      },
      { title: 'Application',
        dataIndex: 'applicationName'
      },
      { title: 'Last retry',
        render: record =><span>{(record.updateOn && (record.updateOn[record.updateOn.length - 1] || {}).triggeredOn.substr(0, 19)) || '-'}</span>,
      },
      { title: 'Retry',
        render: (record) =><span className='cursor-pointer' onClick={() => this.onRetry(record)}><i className="fa fa-refresh fa-lg"/></span>,
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
