import React,{Component} from 'react';
import { Card, CardBody, Col, Row,} from "reactstrap";
import {ApiService} from "../../Services/ApiService";
import { PropagateLoader } from 'react-spinners';
import { Input, Table, Button } from 'antd'

class OutOfBounds extends Component{
  _dataContext = new ApiService();

  state = {
    outOfBounds: [],
    loading: false,
  }

  componentDidMount() {
    this.getOutOfBand()
  }

  getOutOfBand = async() =>{
    this.setState({
      loading: true,
    });
    let resData = await this._dataContext.getOutOfbands();
    const newState = {};
    if (resData || !resData.error) {
      debugger;
      const data = Object.keys(resData).filter(x => {
        return resData[x] === 'False'
      }).map(key => {
        return {
          approvalNO: key,
          empId: '',
          comments: ''
        }
      })
      newState.outOfBounds = data;
    }
    this.setState({
      loading: false,
      ...newState
    })
  }

  onChange = (event, index) => {
    const {outOfBounds} = this.state;
    outOfBounds[index][event.target.name] = event.target.value
    this.setState({
      outOfBounds
    })
  }

  onApprove = async (record) => {
   const Payload =  {
     appr_nbr: record.approvalNO,
     eid: record.empId,
     cmnt:record.comments,
   };
    await this._dataContext.apporveOutBound(Payload)
  }

  render() {
    const { loading, outOfBounds = [] } = this.state;
    const columns = [
      {
        title: 'Approval No',
        width: 100,
        render: (record) =>{
          return(
            <span>{record.approvalNO}</span>
          )
        }
      },
      {
        title: 'Approver Emp. Id',
        render: (record, item, index) => {
            return (
              <Input name="empId" value={record.empId} width={"50%"} size="small" onChange={(event) => this.onChange(event, index)}  />
            );
        },
      },
      {
        title: 'Comments/Remarks',
        render: (record, item, index) => {
          return (
            <Input name="comments" value={record.comments} size="small" onChange={(event) => this.onChange(event, index)} />
          );
        },
      },
      {
        title: 'Action',
        render: (record) => {
          return(
            <Button type={"primary"} size={"small"} onClick={() => this.onApprove(record)}>Approve</Button>
          )
        }
      }
      ];
    return(
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12" lg="12">
            <Card>
              <CardBody>
                {
                  loading ? <div className="loading">{' '}<PropagateLoader color={'#165d93'}/></div> :
                    <div>
                      <Row>
                        <Col sm="12" xs="12" md="12" className="mt-3">
                          <h5>Out Of Band Approval</h5>
                          {
                            !outOfBounds.length ?
                              <div>No more request to approve.</div> :
                              <Table columns={columns} dataSource={outOfBounds} pagination={false} size={"small"}/>
                          }
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
export default OutOfBounds
