import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';
import qs from 'qs';
import { ResultData } from './interface';
axios.defaults.timeout = 600000;

const config = {
  // 设置超时时间（10s）
  timeout: 10000,
  // 跨域时候允许携带凭证
  withCredentials: true
};
class RequestHttp {
  service: AxiosInstance;
  public constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config);
    this.service.interceptors.request.use(
      (config: any) => {
        // todo 添加token

        // 序列化get请求
        if (config.method === 'get') {
          config.paramsSerializer = (params: any) => {
            return qs.stringify(params, { arrayFormat: 'repeat' });
          };
        }
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
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
  }
  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object });
  }
  post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, params, _object);
  }
  put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.put(url, params, _object);
  }
  delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ..._object });
  }
}

export default new RequestHttp(config);
