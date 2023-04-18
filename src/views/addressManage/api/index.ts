import axios from '@/utils/request'

enum Api {
    // 获取地址列表
    getAddressList = '/address/list'
}

interface Data {
    userId: number;
    addressId: number;
    tel: string;
    name: string;
    city: string;
    province: string;
    userAddress: string
    district: string
    isDefault: string
}

type responseData = {
    data: Data[];
    msg: string;
    status: number
}
// 添加收货地址
export const getAddressList = () => {
    return axios.get<any, responseData>(Api.getAddressList)
}