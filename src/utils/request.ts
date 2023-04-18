import axios from 'axios';
import { useUserInfoStore } from '@/store';
import { useAdminStore } from '@/store/admin';
import router from '@/router';
import type { AxiosError } from "axios";
import { showFailToast } from 'vant';
import { ElMessage } from 'element-plus';

export const baseURL = '/api';

//创建一个axios实例
const service = axios.create({
    baseURL,
    timeout: 6000,
    withCredentials: true,
    headers: {
        'Content-Type': 'multipart/form-data;chartset=UTF-8',
    }
});

// 添加请求拦截器
service.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);


// 添加响应拦截器
service.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error: AxiosError) {
        // 超出2xx范围的状态码都会触发该函数
        // 对响应错误做点什么
        if (error.response?.status === 401) {
            const info = navigator.userAgent;
            const isPhone = /mobile/i.test(info);
            switch (isPhone) {
                case true:
                    const user = useUserInfoStore();
                    user.resizeState();
                    router.replace('/login')
                    showFailToast({
                        duration: 1000,
                        message: '请先登录'
                    })
                    break;
                default:
                    const admin = useUserInfoStore();
                    admin.resizeState();
                    router.replace('/management')
                    ElMessage({
                        type: "warning",
                        message: "请先登录",
                        duration: 1000,
                    })
                    break;
            }
        }
        return Promise.reject(error);
    }
);

export default service;
