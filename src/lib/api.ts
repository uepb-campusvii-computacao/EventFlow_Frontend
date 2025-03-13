import axios from 'axios';
import Cookies from 'js-cookie'; 

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  async function (config){
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;

  },
  async function error(error){
    return Promise.reject(error);
  }
);

api.interceptors.response.use(async function (response){
  return response;
}, async function (error){
  if(error.response?.status === 401){
    Cookies.remove('token');
    window.location.href = '/sign-in';
  }
  return Promise.reject(error);
});

type CheckErrorCallback = (message: string) => void;

const checkError = (
  error: unknown,
  onAxiosError: CheckErrorCallback,
  onOtherError: CheckErrorCallback
) => {
  if (axios.isAxiosError(error)) {
    const message =
      error.response?.data?.message ||
      error.response?.data ||
      'Ocorreu um erro.';
    onAxiosError(message);
  } else if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error
  ) {
    const message = (error as { message: string }).message;
    onOtherError(message);
  } else {
    const message = String(error);
    onOtherError(message);
  }
};

export { api, checkError };
