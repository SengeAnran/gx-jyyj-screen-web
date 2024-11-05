import axios from "axios";
function checkStatus(response) {
  if (response.status === 200 || response.status === 304) {
    return response['data'];
  } else {
    throw new Error(response.data.message); // eslint-disable-line
  }
  throw new Error(response.statusText); // eslint-disable-line
}

export function request(config) {
  return axios.request(config).then(checkStatus);
}

export function get(url, params) {
  return axios.get(url, {params}).then(checkStatus);
}

