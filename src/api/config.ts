import axios from 'axios';
import qs from 'qs';

axios.defaults.timeout = 600000;

axios.interceptors.request.use(
    (config: any) => {
        // todo 添加token

        // 序列化get请求
        if (config.method === 'get') {
            config.paramsSerializer = (params) => {
                return qs.stringify(params, { arrayFormat: 'repeat' });
            };
        }
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);
axios.interceptors.response.use(
    (response: any) => {
        const responseCode = response.status;
        if (responseCode >= 200 && responseCode < 300) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    (error: any) => {
        //todo 请求重试

        // 断网或者请求超时状态
        if (!error.response) {
            // 请求超时状态
            if (error.config.hideErrorMsg) {
                // 隐藏提示
            } else if (error.message.includes('timeout')) {
                window.$message.error('请求超时，请检查网络是否连接正常');
            } else if (error.message.includes('cancel')) {
                // 主动取消，不抛异常
            } else {
                window.$message.error('请求失败，请检查网络是否已连接');
            }
            return Promise.reject(error);
        }
        // todo token更新
        //  todo 统一错误码处理
    }
);
