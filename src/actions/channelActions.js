import { FETCH_CHANNELS, CREATE_CHANNEL } from './types';

export const fetchChannels = () => dispatch => {
  fetch('https://in2agdk5ja.execute-api.eu-central-1.amazonaws.com/testing/channels')
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: FETCH_CHANNELS,
        payload: data.channels
    }))
}
