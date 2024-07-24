import axios from 'axios';

const axiosServices = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'http://103.174.10.6:3000' });  //http://203.223.190.112:3005

// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //

// Add a request interceptor
axiosServices.interceptors.request.use(
  (config) => {
    // Adding headers
    const serviceToken = localStorage.getItem('serviceToken');
    if (serviceToken) {
      config.headers['Authorization'] = `Bearer ${serviceToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosServices.interceptors.response.use(
  (response) => response,
  (error) => {
    if(error.response?.status === 403){
      console.log('92384872423428734293429')
    }
    if (error.response?.status === 401 && !window.location.href.includes('/login')) {
      window.location.pathname = '/login';
    }
    return Promise.reject((error.response && error.response.data) || 'Wrong Services');
  }
);

export default axiosServices;


export const register = async (formData) => {
  let response = await axiosServices.post(`/user/add`, formData);
  return response.data;
};

export const getimages  = async (data) => {
  let response = await axiosServices.post(`/generate-image`, data);
  return response.data;
};

export const getBase64Image  = async (data) => {
  let response = await axiosServices.post(`/upload`, data);
  return response.data;
};

export const deleteImages = async(phoneNumber, fileType) => {
  let response = await axiosServices.delete(`/image/${phoneNumber}?fileName=${fileType}`);
  return response.data;
};

export const getText = async (data) => {
  let response = await axiosServices.post(`/generate-sound`, data);
  return response.data;
};
export const logout = async (number) => {
  let response = await axiosServices.post(`/logout`,number);
  return response.data;
};
