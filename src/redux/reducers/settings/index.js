import { TOGGLE_SIDEBAR } from '../../constants';

const initialState = {
  sideBarCollapsed: false,
}

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR: {
      return {
        ...state,
        sideBarCollapsed: action.payload || action.payload === false ? action.payload : !state.sideBarCollapsed,
      }
    }
    default: {
      return state
    }
  }
}
