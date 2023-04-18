import axios from '@/utils/request'

enum Api {
    // 添加收货地址
    add = '/address/add',
    // 根据addressId获取地址信息
    getById = '/address/getById',
    // 编辑收货地址
    edit = '/address/update',
    // 删除收货地址
    delete = '/address/del'
}

interface requestData {
    addressId?: number;
    tel: string;
    name: string;
    city: string;
    province: string;
    userAddress: string
    district: string
    isDefault: string
}

type responseData = {
    data: requestData;
    msg: string;
    status: number
}
// 添加收货地址
export const addAddress = (data: requestData) => {
    return axios.post<any, responseData>(Api.add, data)
}


// 根据addressId获取地址信息
export const getAddressById = (addressId: number) => {
    return axios.get<any, responseData>(Api.getById + `?addressId=${addressId}`)
}

// 添加收货地址
export const editAddress = (data: requestData) => {
    return axios.post<any, responseData>(Api.edit, data)
}

type DelReqData = {
    addressId: number;
}

// 添加收货地址
export const deleteAddress = (data: DelReqData) => {
    return axios.post<any, responseData>(Api.delete, data)
}