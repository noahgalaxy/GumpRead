import request from '@/utils/request'

export function getCaptcha() {
    return request({
        url: "/getCaptchaImg",
        method: 'get'
    })
}