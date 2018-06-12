import {
  SET_POSITION,
  SET_ADDRESS,
} from 'constants/ActionTypes';

const initialState = {
  address: '',
  position: {
    lat: 0,
    lng: 0,
  },
};

export default function place(state = initialState, action) {
  switch (action.type) {
    case SET_POSITION: {
      return {
        ...state,
        position: action.value,
      };
    }
    case SET_ADDRESS: {
      return {
        ...state,
        address: action.value,
      };
    }
    default:
      return state;
  }
}
