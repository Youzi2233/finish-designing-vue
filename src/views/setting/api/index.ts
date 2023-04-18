import axios from '@/utils/request'

enum Api {
    // 退出登录
    loginOut = '/user/logOut'
}


type Data = {
    data: any;
    msg: string;
    status: number
}
export const loginOutFn = () => {
    return axios.get<any, Data>(Api.loginOut)
}