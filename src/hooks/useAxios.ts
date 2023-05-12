import { useContext, useEffect } from "react";
import axios from "../lib/axios";
import { AuthContext } from "../providers/AuthProvider";

const useAxios = () => {
  const { accessToken, storeAccessToken } = useContext(AuthContext);

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      function (config) {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axios.interceptors.response.use(
      function (response) {
        return response;
      },
      async function (error) {
        const originalRequest = error.config;

        if (
          error.response.status === 401 &&
          error.config.url !== "/refresh" &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

          const res = await axios.post("/refresh");
          const { accessToken } = res.data;

          storeAccessToken(accessToken);
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axios(originalRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken]);

  return axios;
};

export default useAxios;
