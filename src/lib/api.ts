import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

type CheckErrorCallback = (message: string) => void;

const checkError = (
  error: unknown,
  onAxiosError: CheckErrorCallback,
  onOtherError: CheckErrorCallback
) => {
  console.log(error);
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || error.response?.data || 'Ocorreu um erro.';
    onAxiosError(message);
  } else if (typeof error === 'object' && error !== null && 'message' in error) {
    const message = (error as { message: string }).message;
    onOtherError(message);
  } else {
    const message = String(error);
    onOtherError(message);
  }
};

export { api, checkError };
