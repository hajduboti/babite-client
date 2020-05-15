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

export const createChannel = (channelData) => dispatch => {
  fetch('https://in2agdk5ja.execute-api.eu-central-1.amazonaws.com/testing/channels', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(channelData)
  })
    .then(res => res.json())
    .then(channel => dispatch({
      type: CREATE_CHANNEL,
        payload: channel
  }))
}
