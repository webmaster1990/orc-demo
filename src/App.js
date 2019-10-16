import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';
import Axios from 'axios';
import { createBrowserHistory } from 'history'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Loadable from 'react-loadable';
import { allReducers } from './redux/reducers';
import './App.scss';
import 'antd/dist/antd.min.css';

const store = createStore(
  allReducers,
  {},
  window.devToolsExtension && window.devToolsExtension()
);

const history = createBrowserHistory();

const loading = () => <div className="loading">{' '}<PropagateLoader color={'#165d93'} /></div>;

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading: () => null
});

// Pages
const Login = Loadable({
  loader: () => import('./views/Pages/Login'),
  loading
});

const Register = Loadable({
  loader: () => import('./views/Pages/Register'),
  loading
});

const Page404 = Loadable({
  loader: () => import('./views/Pages/Page404'),
  loading
});

const Page500 = Loadable({
  loader: () => import('./views/Pages/Page500'),
  loading
});

const PrivateRoute = ({ component: Component }) => (
  <Route render={(props) =>
    localStorage.getItem('access_token') ? <Component {...props} /> : <Redirect to='/login' />
  }/>
);

const RedirectRoute = ({ component: Component }) => (
  <Route render={(props) =>
    localStorage.getItem('access_token') ? <Redirect to='/home' /> : <Component {...props} />
  }/>
);

class App extends Component {

  state = {
    isLoading: true,
  }

  async componentWillMount() {
    const config = await Axios.get('/config.json');
    if (config) {
        localStorage.setItem('access_token', config.data.access_token);
        localStorage.setItem('apiHost', config.data.apiHost);
        localStorage.setItem('applicationId', config.data.applicationId);
        localStorage.setItem('filepath', config.data.filepath);
    }
    this.setState({
      isLoading: false,
    })
  }

  render() {
    if (this.state.isLoading) {
      return <div />
    }
    return (
     <Provider store={store}>
        <BrowserRouter history={history} basename={'/sysadmin'}>
            <Switch>
              <RedirectRoute exact path="/login" name="Login Page" component={Login} />
              <RedirectRoute exact path="/register" name="Register Page" component={Register} />
              <Route exact path="/404" name="Page 404" component={Page404} />
              <Route exact path="/500" name="Page 500" component={Page500} />
              <PrivateRoute path="/" name="Home" component={DefaultLayout} />
            </Switch>
        </BrowserRouter>
     </Provider>
    );
  }
}

export default App;
