import axios from '@/utils/request'

enum Api {
    // 登录
    login = '/user/login'
}

type Register = {
    userName: string;
    password: string;
    vc: string
}

export interface Data {
    id: number;
    nickname: string;
    signature: string | null;
    gender: string;
    privilege: string;
    createdAt: string;
    updatedAt: string;
    cartNum: number
}
type LoginData = {
    data: Data;
    msg: string;
    status: number
}
export const loginFn = (data: Register) => {
    return axios.post<any, LoginData>(Api.login, data)
}