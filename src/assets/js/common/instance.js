import axios from "axios"; //引入axios
//下面这两个不一定需要引入，看你项目需要拦截的时候做什么操作，但是一般都需要引入store
import store from "@/store"; //引入store
import router from "@/router"; //引入router
//导入
import NProgress from "nprogress";

/**
 * CancelToken有一个source静态方法，调用之后返回一个对象，该对象包含一个token属性，用于标记请求和一个cancel方法，用于取消请求。
 * */
const CancelToken = axios.CancelToken;//处理重复请求
let source = CancelToken.source();//处理重复请求

//创建实例
let instance = axios.create({
    // headers: {
    //   'content-type': 'application/x-www-form-urlencoded'
    // },
    timeout: 5000, //超时设置
    // `maxContentLength` 定义允许的响应内容的最大尺寸
    maxContentLength: 2000
});

// http request 拦截器-请求拦截
/*
 * 请求拦截器的作用是在请求发送前进行一些操作
 * */
instance.interceptors.request.use(
    config => {

        config.headers.cancelToken=source.token; //处理重复请求

        NProgress.start(); // 设置加载进度条(开始..)
        const authorization = localStorage.getItem("authorization");
        if (authorization) {
            // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.authorization = authorization; //请求头加上token
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

// http response 拦截器-响应拦截
/**
 * 响应拦截器的作用是在接收到响应后进行一些操作，例如在服务器返回登录状态失效，需要重新登录的时候，跳转到登录页
 * */
instance.interceptors.response.use(
    response => {
        NProgress.done(); // 设置加载进度条(结束..)
        //拦截响应，做统一处理
        if (response.data.code===102004 || response.data.code===102005) {
            store.state.isLogin = false;
            router.replace({
                path: "login",
                query: {
                    redirect: router.currentRoute.fullPath
                }
            });
        }else{
            return response;
        }
    },
    //接口错误状态处理，也就是说无响应时的处理
    error => {
        return Promise.reject(error.response.status); // 返回接口返回的错误信息
    }
);

source.cancel();//用于取消请求

export default instance;
