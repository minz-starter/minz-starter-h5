import axios from "axios";

// baseURL 基础配置API 路径
const baseURL = import.meta.env.VITE_APP_API;

// queryService 基本的请求服务
export const queryService = axios.create({
    baseURL: baseURL,
});

// queryService 请求拦截器
queryService.interceptors.request.use(
    function(config) {

        // 获取请求的url
        const url = config.url

        // 发送请求前会做的事情
        if(!config.headers['Content-Type']){
            config.headers['Content-Type'] = "application/json"
        }

        // 非白名单匹配
        // if(!url.match(/^\/sms\/send/) || url.match(/^\/app\/user\/login/)){
        //     const authStore = ()
        //     config.headers['token'] = authStore.getToken()
        // }

        return config;
    },
    function(error) {
        // 请求错误要做的事情
        return Promise.reject(error);
    }
);

// queryService 响应拦截器
queryService.interceptors.response.use(
    function(response) {

        // 0 - 2xx的状态码会激活的函数
        if (response.status===200 && response.data?.code === 1){

            return Promise.reject(response.data)
            // alert(response.data.message)
            // return
            // return Promise.reject(new Error( response.data.message || "Error"))
        }

        // 0 - 2xx的状态码会激活的函数
        if (response.status===200 && response.data?.code === 401){
            // location.href = "/"
            return Promise.reject(new Error( response.data.message || "Error"))
        }

        return response.data
    },
    function(error) {
        // 非2xx状态码会激活的函数

        // 判断状态码 - 未登录
        // if (error.response.data.statusCode === 401){
        //     // console.log("未登录", error.response.data.message)
        //     // removeToken()
        // }
        return Promise.reject(error);
    }
);
