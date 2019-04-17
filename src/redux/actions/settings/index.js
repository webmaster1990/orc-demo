import { TOGGLE_SIDEBAR } from '../../constants';

export const toggleSideBar = (state) => ({
  type: TOGGLE_SIDEBAR,
  payload: state
});
