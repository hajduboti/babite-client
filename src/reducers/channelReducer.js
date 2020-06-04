import { FETCH_CHANNELS, CREATE_CHANNEL, GET_CHANNEL } from '../actions/types';

const initialState = {
  items: [],
  item: {},
  currentChannel: ''
};

export default function(state = initialState, action){
    switch (action.type) {
      case FETCH_CHANNELS:
        return {
          ...state,
          items: action.payload.Items
        };
      case CREATE_CHANNEL:
        return {
          ...state,
          item: action.payload
        }
      case GET_CHANNEL:
        return {
          ...state,
          currentChannel: action.payload
        }
      default:
        return state;

    }
}
