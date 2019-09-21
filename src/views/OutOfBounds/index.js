import React,{Component} from 'react';
import { Card, CardBody, Col, Row,} from "reactstrap";
import {ApiService} from "../../Services/ApiService";
import { PropagateLoader } from 'react-spinners';
import { Input, Table, Button, message } from 'antd'
const { TextArea } = Input;

class OutOfBounds extends Component{
  _dataContext = new ApiService();

  state = {
    outOfBounds: [],
    loading: false,
    batchId: ''
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
    if (resData && !resData.error) {
      const data = Object.keys(resData).filter(x => {
        if (x === 'ID') {
          newState.batchId = resData[x];
        }
        return resData[x] === 'false'
      }).map(key => {
        return {
          approvalNO: key,
          empId: '',
          comments: '',
        }
      });
      newState.outOfBounds = data;
    } else {
      message.config({
        top: 110,
      });
      message.error('Something went wrong. please try again later.', 2);
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
    message.config({
      top: 110,
      duration: 2
    });
   if (!record.empId.trim()) {
    return message.error('Please enter emp id.', 2)
   }
   if (!record.comments.trim()) {
    return message.error('Please enter comments/remarks', 2)
   }
   const Payload =  {
     appr_nbr: record.approvalNO,
     eid: record.empId,
     cmnt: record.comments,
     batchID: this.state.batchId ? this.state.batchId : null,
   };
    const data = await this._dataContext.apporveOutBound(Payload);
    if (data.msg) {
      return message.error(data.msg, 2);
    }
    if (!data.error) {
      message.success('Approved successfully', 2);
      this.getOutOfBand();
    } else {
      message.error('Something went wrong. please try again later.', 2);
    }
  }
  
  onReject = async (record) => {
    message.config({
      top: 110,
    });
    if (!record.empId.trim()) {
      return message.error('Please enter emp id.', 2)
    }
    if (!record.comments.trim()) {
      return message.error('Please enter comments/remarks', 2)
    }
    const Payload =  {
      appr_nbr: record.approvalNO,
      eid: record.empId,
      cmnt: record.comments,
      batchID: this.state.batchId ? this.state.batchId : null,
    };
    const data = await this._dataContext.rejectOutBound(Payload);
    if (data.msg) {
      return message.error(data.msg, 2);
    }
    if (!data.error) {
      message.success('Rejected successfully', 2);
      this.getOutOfBand();
    } else {
      message.error('Something went wrong. please try again later.', 2);
    }
  }

  render() {
    const { loading, outOfBounds = [], batchId } = this.state;
    const columns = [
      {
        title: 'Employee ID',
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
            <TextArea autosize={{ minRows: 2, maxRows: 6 }} name="comments" value={record.comments} size="small" onChange={(event) => this.onChange(event, index)} />

          );
        },
      },
      {
        title: 'Action',
        render: (record) => {
          return(
            <>
              <Button type={"primary"} size={"small"} onClick={() => this.onApprove(record)}>Approve</Button>
              <Button className="ml-10" type={"primary"} size={"small"} onClick={() => this.onReject(record)}>Reject</Button>
            </>
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
                          <h5>Out Of Band - Unix Approvals {batchId ? <b>: BATCH ID - {batchId}</b> : null}</h5>
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
