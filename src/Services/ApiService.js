import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '',
});

// Add a 401 response0
/*axiosInstance.interceptors.response.use((response) => (response), error => {
  if (401 === (error.response && error.response.status)) {
    localStorage.removeItem('access_token');
    window.location.href =  '/login';
    return false;
  } else {
    return Promise.reject(error);
  }
});*/

export class ApiService {

  getAuthToken = () =>  `${localStorage.getItem('access_token')}`;
  getApiHost = () =>  localStorage.getItem('apiHost');
  applicationId = () => localStorage.getItem('applicationId');


  async getData(url, headers, cancelToken) {
    const config = {
      headers: {
        "content-type": "application/json",
        'authorization': `${this.getAuthToken()}`,
        ...(headers || {})
      }
    };
    if (cancelToken && cancelToken.token) {
      config.cancelToken = cancelToken.token;
    }

    let data = '';
    const response = await axiosInstance.get(url, config).catch((err) => {
      data = {error: err};
    });
    return data || response.data;
  }

  async postMethod(url, data, headers) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `${this.getAuthToken()}`,
        ...(headers || {})
      }
    };
    const response = await axiosInstance.post(url, data, config);
    return response.data;
  }

  async login({username, password}) {
    const config = {
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json',
        'origin': 'http://evil.com/',
        'X-REQUESTED-BY': '12345',
        'authorization': `Basic ${btoa(`${username}:${password}`)}`,
      }
    };
    const response = await axiosInstance.post('/token/api/v1/tokens', {}, config);
    return response.data;
  }

  async getAuditDataUserTermination() {
    const topic = localStorage.getItem('topic1') || 'User_Termination_processV1';
    return this.getData(`${this.getApiHost()}/AuditService/jersey/api/v1/allMessage?topic=${topic}`);
  }

  async getAuditDataRetryFailed() {
    const topic = localStorage.getItem('topic2') || 'Retry_failed_transaction_processV1';
    return this.getData(`${this.getApiHost()}/AuditService/jersey/api/v1/allMessage?topic=${topic}`);
  }

  async getFailures() {
    return this.getData(`${this.getApiHost()}/scimretry/jersey/retrytask/${this.applicationId()}/manual`);
  }

  async getOutOfbands() {
    const config = {
      headers: {
        "content-type": "application/json",
        'API_TOKEN' : 'IhteShoc5Yu91cN+z+Uyxp4H+pMhIGZk8fmwII5EkFmG5VpiVlOzwcL5rlqXRHppOpOCpqV6ntp97qTIAckCPg==',
        'APPLICATION_ID': '286BSAHER'
      }
    };
    let data = '';
    const response = await axiosInstance.get(`${this.getApiHost()}/OOB-Service-1.0/getApprovalDetails`, config).
    catch((err) => {
      data = {error: err};
    });
    return data || response.data;
  }

  async apporveOutBound(data) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'API_TOKEN' : 'IhteShoc5Yu91cN+z+Uyxp4H+pMhIGZk8fmwII5EkFmG5VpiVlOzwcL5rlqXRHppOpOCpqV6ntp97qTIAckCPg==',
        'APPLICATION_ID': '286BSAHER'
      }
    };
    let resData = '';
    const response = await axiosInstance.post(`${this.getApiHost()}/OOB-Service-1.0/postApprovalDetails`,
      data, config).catch((err) => {
      resData = {error: err};
    });
    return resData || response.data;
  }

  async rejectOutBound(data) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'API_TOKEN' : 'IhteShoc5Yu91cN+z+Uyxp4H+pMhIGZk8fmwII5EkFmG5VpiVlOzwcL5rlqXRHppOpOCpqV6ntp97qTIAckCPg==',
        'APPLICATION_ID': '286BSAHER'
      }
    };
    let resData = '';
    const response = await axiosInstance.post(`${this.getApiHost()}/OOB-Service-1.0/postRejectDetails`,
      data, config).catch((err) => {
      resData = {error: err};
    });
    return resData || response.data;
  }

  async retry(payload) {
    return this.postMethod(`${this.getApiHost()}/scimretry/jersey/retrytask/${this.applicationId()}/retry`, payload);
  }

}
