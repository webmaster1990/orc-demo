import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { Menu, Icon } from 'antd';
import {
  AppSidebar,
} from '@coreui/react';
import './custom-sidebar.scss';

const SubMenu = Menu.SubMenu;

class SiderMenu extends React.Component {

  render() {
    const { sideBarCollapsed, location: { pathname } } = this.props;
    return (
      <AppSidebar fixed display="lg" style={{overflowY:"auto"}}>
        <div className="custom-sidebar">
          <Menu
            defaultSelectedKeys={[pathname.substr(1)]}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
            inlineCollapsed={sideBarCollapsed}
          >
            <Menu.Item key="home">
              <Link to='/home'>
                <Icon type='home'/>
                <span>Home</span>
              </Link>
            </Menu.Item>
            <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Terminations</span></span>}>
              <Menu.Item key="Terminations">
                <Link to='/audit-dashboard'>
                  <span>Audit Dashboard</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="Failures">
                <Link to='/failures'>
                  <span>Failures</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="settings">
                <Link to='/settings'>
                  <span>Settings</span>
                </Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="out-of-bands">
              <Link to='/out-of-bands'>
                <Icon type='appstore'/>
                <span>Out of Band - Unix</span>
              </Link>
            </Menu.Item>
          </Menu>
        </div>
      </AppSidebar>
    );
  }
}

const mapStateToProps = (state) => ({
  sideBarCollapsed: state.settings.sideBarCollapsed,
});

export default connect(mapStateToProps)(withRouter(SiderMenu))
