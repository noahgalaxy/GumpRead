import axios from 'axios'
import {getToken} from "../cookie";

const service = axios.create({
    baseURL:'http://127.0.0.1:8090',
    timeout: 10000
})

//request拦截器
service.interceptors.request.use(config=>{
    // 携带token
    if(getToken()){
        config.headers['AuthoticationToken'] = "userToken"+getToken()
    }
    return config
}, error => {
    console.log("请求拦截器发生错误");
    return new Promise().
})
