import axios from 'axios';


const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/users/token/refresh/', {
          refresh: localStorage.getItem('refresh'),
        },
        {
          headers: {
              'Content-Type': 'application/json',
          },
      });

        localStorage.setItem('access', response.data.access);
        localStorage.setItem('refresh', response.data.refresh);


        originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
