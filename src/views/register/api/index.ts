import axios from '@/utils/request'

enum Api {
    // 注册
    register = '/user/register'
}

type Register = {
    userName: string;
    password: string;
    vc: string
}
type Data = {
    data: any;
    msg: string;
    status: number
}
export const registerFn = (data: Register) => {
    return axios.post<any, Data>(Api.register, data)
}