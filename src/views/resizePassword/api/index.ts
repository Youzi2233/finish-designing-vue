import axios from '@/utils/request'

enum Api {
    // 修改密码
    changePassword = '/user/updatePassword'
}

export type Data = {
    oldPassword: string;
    newPassword: string;
    vc: string
}


type LoginData = {
    data: any;
    msg: string;
    status: number
}
export const changePassword = (data: Data) => {
    return axios.post<any, LoginData>(Api.changePassword, data)
}