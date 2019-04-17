import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'http://129.213.127.79:14000/iam/governance' : '/iam/governance',
});

// Add a 401 response0
axiosInstance.interceptors.response.use((response) => (response), error => {
  if (401 === (error.response && error.response.status)) {
    localStorage.removeItem('access_token');
    window.location.href =  '/login';
    return false;
  } else {
    return Promise.reject(error);
  }
});

export class ApiService {

  getAuthToken = () => localStorage.getItem('access_token');

  async getData(url, headers, cancelToken) {
    const config = {
      headers: {
        "content-type": "application/json",
        'authorization': `Bearer ${this.getAuthToken()}`,
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
        'authorization': `Bearer ${this.getAuthToken()}`,
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

  async getPendingApprovals() {
    return this.getData('selfservice/api/v1/requests?view=pendingApprovals');
  }

  async getUserById(id) {
    return this.getData(`selfservice/api/v1/users/${id}`);
  }

  async getChallangeQuestionsById(id) {
    return this.getData(`selfservice/api/v1/users/${id}/challengequestions`);
  }

  async getPendingRequests() {
    return this.getData('selfservice/api/v1/requests?requestStatus=pending');
  }

  async getPendingCertifications() {
    return this.getData('selfservice/api/v1/certifications');
  }

  async getRoles() {
    return this.getData('selfservice/api/v1/roles?userId=1');
  }

  async getEntitlements() {
    return this.getData('selfservice/api/v1/entitlements?userId=1');
  }

  async getApplications() {
    return this.getData('selfservice/api/v1/accounts?userId=1');
  }

  async getAllManageDashboard() {
    return this.getData('selfservice/api/v1/users/1/directs');
  }
  async getCertifications() {
    return this.getData('selfservice/api/v1/certifications');
  }
  async getProxy(id) {
    return this.getData(`selfservice/api/v1/users/${id}/proxies`);
  }
  async updateProfile(data) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-REQUESTED-BY': '12345',
        'authorization': `Bearer ${this.getAuthToken()}`,
      }
    };
    const response = await axiosInstance.put('selfservice/api/v1/users/41', data, config);
    return response.data;
  }

  async changePassword(data) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-REQUESTED-BY': '12345',
        'authorization': `Bearer ${this.getAuthToken()}`,
      }
    };
    const response = await axiosInstance.put('selfservice/api/v1/users/34/password', data, config);
    return response.data;
  }
}
