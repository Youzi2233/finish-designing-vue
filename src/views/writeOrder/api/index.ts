import axios from '@/utils/request'

enum Api {
    // 获取默认地址
    getDefault = '/address/getDefault',
    // 购买商品
    buyProduct = '/product/buy',
    // 结算购物车
    buyCart = '/cart/buy'
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

type GetDefaultRes = {
    data: Data;
    msg: string;
    status: number
}
// 获取默认地址
export const getDefaultAddress = () => {
    return axios.get<any, GetDefaultRes>(Api.getDefault)
}


interface BuyProductReq {
    productId: number;
    count: number;
    address: string
}

export interface BuyProductData {
    orderId: number;
    productId: number;
    orderTime: string;
    orderStatus: string;
    orderTotal: number;
    productName: string;
    productImage: string;
    productQuantity: number;
    productPrice: number;
    address: string;
}

interface BuyProductRes {
    data: BuyProductData;
    msg: string;
    status: number
}
// 购买商品
export const buyProduct = (data: BuyProductReq) => {
    return axios.post<any, BuyProductRes>(Api.buyProduct, data)
}


interface BuyCartReq {
    address: string
}

interface BuyCartRes {
    data: BuyProductData[];
    msg: string;
    status: number
}
// 结算购物车
export const buyCart = (data: BuyCartReq) => {
    return axios.post<any, BuyCartRes>(Api.buyCart, data)
}