import React,{Component} from 'react';
import {Badge, Button, Card, CardBody, Col, Row,} from "reactstrap";
import { Table } from 'antd';
import RetryTransnationalData from "../../mockData/RetryTransnationalData"
import moment from "moment";
const columns = [
  { title: 'Date',
    dataIndex: 'createOn',
    render: createOn =><div>{moment(createOn).format('MMMM Do YYYY h:mm:ss a')}</div>,
  },
  { title: 'User ID',
    dataIndex: 'UserID',
  },
  { title: 'Application ID', dataIndex: 'applicationID' },
  { title: 'Last retry',
    dataIndex: 'triggeredOn',
    render: triggeredOn =><div>{moment(triggeredOn).format('MMMM Do YYYY h:mm:ss a')}</div>,
  },
];

const data = [
  {
    key: 1, name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park', description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 2, name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park', description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: 3, name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  },
];


class Failures extends Component{
  constructor(props) {
    super(props);
    this.state = {
      RetryTransnationalData: []
    };
  }
  componentDidMount() {
    this.setState({
      RetryTransnationalData: RetryTransnationalData
    })
  }

  render() {
    const { RetryTransnationalData } =this.state
    const expandedRowRender = () =>{
      return(
       <div>
         {
           RetryTransnationalData && RetryTransnationalData.details && RetryTransnationalData.details || [].map(item => (
             item.updateOn.map(data => (
                 <div >
                   <p>{data.reason}</p>
                 </div>
               ))
         ))}
       </div>
      )
    }
    console.log("=====RetryTransnationalData=======>", this.state.RetryTransnationalData)
    return(
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12" lg="12">
            <Card>
              <CardBody>
                <Row>
                  <Col sm="12" xs="12" md="12">
                    <div className="pull-right">
                    <Button type="button" color="primary" className="btn-sm">Refresh   <i className="fa fa-refresh"/></Button>
                    <Button type="button" color="primary" className="btn-sm ml-2" >Download Scsv <i className="fa fa-download"/></Button>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col sm="12" xs="12" md="12">
                    <Table
                      columns={columns}
                      expandedRowRender={expandedRowRender}
                      dataSource={RetryTransnationalData.details}
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
