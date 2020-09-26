import request from "@/utils/request"

export function transToEng(text) {
    const data = {
        text
    };
    return request({
        url: 'translate/toEng',
        method: 'get',
        data: data
    })
}


