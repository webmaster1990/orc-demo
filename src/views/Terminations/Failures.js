import React,{Component} from 'react';
import { Button, Card, CardBody, Col, Row,} from "reactstrap";
import { Table } from 'antd';
import RetryTransnationalData from "../../mockData/RetryTransnationalData"
import moment from "moment";
import { CSVLink } from "react-csv";

const columns = [
  { title: 'Date',
    dataIndex: 'createOn',
    render: createOn =><span>{moment(createOn).format('MMMM Do YYYY h:mm:ss a')}</span>,
  },
  { title: 'User ID',
    render: (record) => {
      return <span>{record.userObject && record.userObject.UserID}</span>
    }
  },
  { title: 'Application ID',
    dataIndex: 'applicationID'
  },
  { title: 'Last retry',
    dataIndex: 'triggeredOn',
    render: triggeredOn =><span>{moment(triggeredOn).format('MMMM Do YYYY h:mm:ss a')}</span>,
  },
  { title: 'Retry',
    dataIndex: 'Retry',
    render: () =><span><i className="fa fa-refresh fa-lg"/></span>,
  },
];

const headers = [
  { label: "Date", key: "createOn" },
  { label: "User ID", key: "userId" },
  { label: "Application ID", key: "applicationID" }
];

class Failures extends Component{
  state = {
    retryTransnationalData: []
  }

  componentDidMount() {
    this.setState({
      retryTransnationalData: RetryTransnationalData.details || []
    })
  }

  getCSVData = () => {
    const { retryTransnationalData = [] } = this.state;
    return retryTransnationalData.map(item => {
      return {
        createOn: item.createOn,
        userId: item.userObject && item.userObject.UserID,
        applicationID: item.applicationID
      };
    });
  }

  render() {
    const { retryTransnationalData } = this.state
    return(
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12" lg="12">
            <Card>
              <CardBody>
                <Row>
                  <Col sm="12" xs="12" md="12">
                    <div className="text-right mb-3">
                      <Button type="button" color="primary" className="btn-sm">Refresh   <i className="fa fa-refresh"/></Button>
                      <CSVLink data={this.getCSVData()} headers={headers}>
                        <Button type="button" color="primary" className="btn-sm ml-2">Download CSV   <i className="fa fa-refresh"/></Button>
                      </CSVLink>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col sm="12" xs="12" md="12" className="mt-3">
                    <Table
                      columns={columns}
                      size="small"
                      scroll={{ x: 768 }}
                      expandedRowRender={record => {
                        return  record.updateOn.map((data) => {
                          return (
                            <div>
                              <p><b>Triggered On : </b>{data.triggeredOn}</p>
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
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
export default Failures
