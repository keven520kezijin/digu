import axios from 'axios';

export const apiClient = axios.create({
  baseURL: baseUrl,
});

apiClient.interceptors.response.use(function(response) {
  const { data } = response;
  if (data.resultMessageEnum === '0000') {
    return data;
  }

  return Promise.reject(data);
});
