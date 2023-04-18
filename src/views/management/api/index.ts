import axios from '@/utils/request'

enum Api {
    // 管理员登录
    login = '/admin/login',
    // 退出登录
    loginOut = '/admin/logOut'
}

type BaseRes = {
    data: null;
    msg: string;
    status: number
}

type LoginReq = {
    userName: string;
    password: string;
    vc: string
}

export interface Data {
    id: number;
    adminName: string;
}
type LoginData = {
    data: Data;
    msg: string;
    status: number
}
export const loginFn = (data: LoginReq) => {
    return axios.post<any, LoginData>(Api.login, data)
}

// 退出登录
export const loginOutFn = () => {
    return axios.get<any, BaseRes>(Api.loginOut)
}