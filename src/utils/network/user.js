import request from '@/utils/request'
import Cookies from 'js-cookie'
import {removeToken} from '../cookie'

export function signIn(userName, password, captcha, captchaId) {
    const data = {
        userName,
        password,
        captcha,
        captchaId
    }
    return request({
        url: '/signIn',
        // url: '/test',
        method: 'post',
        data: data
    })
}

export function signOut() {
    console.log("user里面登出");
    Cookies.remove("userName");
    Cookies.remove("password");
    Cookies.remove("userNickName");
    Cookies.remove("JSESSIONID");
    removeToken();
    return request({
        url:"/signOut",
        method:"post"
    })
}