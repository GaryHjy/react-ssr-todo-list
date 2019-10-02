import axios from "axios";
import { notification } from 'antd';

function axiosExtra(axios) {
  for (const method of [
    "request",
    "delete",
    "get",
    "head",
    "options",
    "post",
    "put",
    "patch"
  ]) {
    axios["$" + method] = function () {
      return this[method].apply(this, arguments).then(res => res && res.data);
    }
  }
};

const instance = axios.create({
  timeout: 6000
});

// 拦截处理
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 响应处理
instance.interceptors.response.use(function (response) {

  const { status, data } = response;

  if (status === 401) {
    notification.error({
      message: status,
      description: data.msg || "无效的token"
    });
    return Promise.reject(data);
  }

  if (data.code >= 500) {
    notification.error({
      message: data.code,
      description: data.msg || "系统错误，请稍后再试..."
    });
    return Promise.reject(data);
  }
  
  return response;
}, function (error) {
    const { status } = error.response;
    const codeMessage = {
      400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
      401: '用户没有权限（令牌、用户名、密码错误）。',
      403: '用户得到授权，但是访问是被禁止的。',
      404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
      406: '请求的格式不可得。',
      410: '请求的资源被永久删除，且不会再得到的。',
      422: '当创建一个对象时，发生一个验证错误。',
      500: '服务器发生错误，请检查服务器。',
      502: '网关错误。',
      503: '服务不可用，服务器暂时过载或维护。',
      504: '网关超时。',
    };
    const notify = (code) => {
      notification.error({
        message: code,
        description: codeMessage[code]
      });
    }
    codeMessage[status] && notify(status);
  return Promise.reject(error);
});

axiosExtra(instance);

export default instance;
