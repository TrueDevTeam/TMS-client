import { SET_POSITION, SET_ADDRESS } from 'constants/ActionTypes';

export function setPosition(position) {
  return {
    type: SET_POSITION,
    value: position,
  };
}

export function setAddress(address) {
  return {
    type: SET_ADDRESS,
    value: address,
  };
}
