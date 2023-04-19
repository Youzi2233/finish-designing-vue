import axios from '@/utils/request'

enum Api {
    // 退出登录
    loginOut = '/user/logOut',
    // 申请成为店主
    upgrade = '/user/upgrade'
}


type BaseRes = {
    data: null;
    msg: string;
    status: number
}
// 退出登录
export const loginOutFn = () => {
    return axios.get<any, BaseRes>(Api.loginOut)
}
// 申请成为店主
export const applicateUpgrade = () => {
    return axios.post<any, BaseRes>(Api.upgrade)
}