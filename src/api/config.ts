import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';

axios.defaults.timeout = 600000;

axios.interceptors.request.use(
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

async function request(config: AxiosRequestConfig, hasErrTips = false, requireOriginalRes = true) {
  try {
    const res = await axios(config);
    if (!res) {
      // 主动取消
      return Promise.resolve();
    }
    if (res.status === 204) {
      return Promise.resolve();
    }
    if (requireOriginalRes) {
      return Promise.resolve(res);
    }
    // const { data } = res;
    // const url = config.url as string;
    /*  //todo 用户权限
        if(/^auth/.test(url)){

        }
        //todo vip权限
        if(/^vip/.test(url)){

        } */
  } catch (e) {
    if (hasErrTips) {
      // const errTxt = getApiErrMsg(e as any);
      // window.$message.error(errTxt);
    }
    return Promise.reject(e);
  }
}

export function get(
  url: string,
  params?: any,
  headers?: any,
  hasErrTips?: boolean,
  config: any = {},
  requireOriginalRes?: boolean
) {
  return request(
    { method: 'get', url, params, headers, ...config },
    hasErrTips,
    requireOriginalRes
  );
}

export function post(
  url: string,
  data?: any,
  headers?: any,
  hasErrTips?: boolean,
  config: any = {},
  requireOriginalRes?: boolean
) {
  return request({ method: 'post', url, data, headers, ...config }, hasErrTips, requireOriginalRes);
}

export function patch(
  url: string,
  data?: any,
  headers?: any,
  hasErrTips?: boolean,
  config: any = {},
  requireOriginalRes?: boolean
) {
  return request(
    { method: 'patch', url, data, headers, ...config },
    hasErrTips,
    requireOriginalRes
  );
}

export function del(
  url: string,
  data?: any,
  headers?: any,
  hasErrTips?: boolean,
  config: any = {},
  requireOriginalRes?: boolean
) {
  return request(
    { method: 'delete', url, data, headers, ...config },
    hasErrTips,
    requireOriginalRes
  );
}

export function put(
  url: string,
  data?: any,
  headers?: any,
  hasErrTips?: boolean,
  config: any = {},
  requireOriginalRes?: boolean
) {
  return request({ method: 'put', url, data, headers, ...config }, hasErrTips, requireOriginalRes);
}
