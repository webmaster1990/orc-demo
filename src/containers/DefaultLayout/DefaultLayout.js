import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
} from '@coreui/react';
import { PropagateLoader } from 'react-spinners';
import {Helmet} from "react-helmet";
import Sider from './SiderMenu';
import routes from '../../routes';

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {

  loading = () => <div className="loading">{' '}<PropagateLoader color={'#165d93'} /></div>

  signOut = () => {
    localStorage.removeItem('access_token');
    this.props.history.push('/login');
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={<div/>}>
            <DefaultHeader onLogout={this.signOut}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <Sider/>
          <main className="main">
            <AppBreadcrumb appRoutes={routes}/>
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <>
                          <Helmet>
                            <title>{route.title || route.name}</title>
                          </Helmet>
                          <route.component {...props} />
                          </>
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/home" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={<div/>}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
