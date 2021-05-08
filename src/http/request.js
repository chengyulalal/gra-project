/*
 * @Date: 2021-04-21 13:34:31
 * @LastEditors: chengyu.yang
 * @LastEditTime: 2021-05-08 10:24:27
 * @FilePath: \gra-project-sourcetree\src\http\request.js
 */
import axios from 'axios'
import qs from 'qs'

let baseURL
// 判断开发环境（一般用于本地代理）
if (process.env.NODE_ENV === 'development') { // 开发环境
    baseURL = '/api'    // 你设置的本地代理请求（跨域代理）
} else {                                      // 编译环境
    if (process.env.type === 'test') {        // 测试环境
       
    } else {                                  // 正式环境
        baseURL = 'http://http://127.0.0.1:3000'
    }
}
const Axios = axios.create({
    baseURL: baseURL,
    timeout: 50000,
    responseType: 'json',
    withCredentials: false
});

Axios.interceptors.request.use(
    config => {
      if (localStorage.getItem('token')) {
        config.headers.Authorization = localStorage.getItem('token');
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
);

Axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        switch (error.response.status) {
            case 401:
                router.replace({
                    path: '/login',
                    query: {redirect: router.currentRoute.fullPath}
                })
        }
        return Promise.reject(error.response.data)
    }
);
    
export default Axios 
