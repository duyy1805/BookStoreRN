import axios from "axios";
import queryString from "query-string";
const REACT_APP_API_URL = `http:172.20.10.3:5000`;
const axiosClient = axios.create({
    baseURL: REACT_APP_API_URL,
    headers: {
        "content-type": "application/json",
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

// axiosClient.interceptors.request.use(async (config) => {
//     //hanlde tooken...
//     const accessToken = localStorage.getItem("accessToken");
//     if (accessToken) {
//         config.headers.authorization = `Bearer: ${accessToken}`;
//     }

//     return config;
// });

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return {
                status: response.status,
                data: response.data,
                total: response.headers["content-range"],
            };
        }

        return response;
    },
    (error) => {
        //hanlde errors
        throw error;
    }
);

export default axiosClient;
