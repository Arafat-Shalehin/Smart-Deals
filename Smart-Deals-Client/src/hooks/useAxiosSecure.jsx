import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use((config) => {
      console.log(config);
      config.headers.authorization = `Bearer ${user.accessToken}`;
      return config;
    });

    const responseInterceptor = instance.interceptors.response.use(res => {
        return res;
    }, err => {
        const status = err.status;
        if(status === 401 || status === 403){
            signOutUser()
            .then(() => {
                navigate('/register');
            })
        }
    })

    return () => {
        instance.interceptors.request.eject(requestInterceptor)
        instance.interceptors.response.eject(responseInterceptor)
    }
  }, [user, signOutUser, navigate]);

  return instance;
};

export default useAxiosSecure;
