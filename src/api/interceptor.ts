import Axios from 'axios-observable';
import { AxiosRequestConfig } from 'axios';

/** Interceptors */
const intercept = () => {
  Axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {

      if (config.headers.hasOwnProperty('NO_INTERCEPT')) {
        return config;
      }

      config.url = (process.env.REACT_APP_HOST as string) + config.url;

      return config;
    }
  );
};

export default intercept;
