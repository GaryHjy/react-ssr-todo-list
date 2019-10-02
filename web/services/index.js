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
    const { status, statusText } = error.response;
    if (status === 404 ) {
      notification.error({
        message: status,
        description: statusText
      });
    }
  return Promise.reject(error);
});

axiosExtra(instance);

export default instance;
