import React from 'react';
import DefaultLayout from './containers/DefaultLayout';

const Home = React.lazy(() => import('./views/Home/index'));
const AuditDashboard = React.lazy(() => import('./views/Terminations/AuditDashboard'));
const Failures = React.lazy(() => import('./views/Terminations/Failures'));
const Settings = React.lazy(() => import('./views/Settings'));
const OutOfBounds = React.lazy(() => import('./views/OutOfBounds'));
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/home', name: 'Home', component: Home },
  { path: '/audit-dashboard', name: 'Audit Dashboard', component: AuditDashboard },
  { path: '/failures', name: 'Failures', component: Failures },
  { path: '/settings', name: 'Settings', component: Settings },
  { path: '/out-of-bounds', name: 'Out Of Bounds', component: OutOfBounds },
];

export default routes;
