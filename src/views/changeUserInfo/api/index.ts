import axios from '@/utils/request'

enum Api {
    // 修改个人信息
    changeUserInfo = '/user/changeInfo'
}

export type Data = {
    signature: string;
    gender: string;
}


type LoginData = {
    data: any;
    msg: string;
    status: number
}
export const changeInfo = (data: Data) => {
    return axios.post<any, LoginData>(Api.changeUserInfo, data)
}