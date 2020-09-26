import axios from 'axios'
import {getToken} from "./cookie";
import VueCookies from 'vue-cookies'
import Vue from "vue";
Vue.use(VueCookies)

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

const service = axios.create({
    baseURL:'/gumpread',
    timeout: 10000
})

//request拦截器
service.interceptors.request.use(config=>{


    console.log("config的headers:", config.headers);
    // let token = Vue.$cookies.get('User-Token')
    let token = getToken()
    if(token){
        console.log("该请求请求头携带sesisonId",token);
        config.headers['AuthoticationToken'] = "userToken_"+token
    }
    console.log("该请求的请求头没有携带sessionId:"+token);
    console.log("request拦截器放行");
    return config
}, error => {
    console.log("request拦截器发生错误", error);
    return Promise.reject(error)
})


service.interceptors.response.use(res=>{
    return res.data;
}, error => {
    console.log("response拦截器发生错误", error);
    return Promise.reject(error)
})

export default service