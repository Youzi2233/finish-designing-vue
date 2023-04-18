import axios from '@/utils/request'

enum Api {
    // 获取商品详情
    getProduct = '/product/getProduct',
    // 加入购物车
    addCart = '/cart/add'
}

interface RequestData {
    productId: number;
}
export interface GoodsData {
    id: number;
    name: string;
    image: string;
    price: number;
    stock: number;
    sales: number;
    createTime: string;
    status: boolean;
    shopId: number;
}
type GoodsDetailResponseData = {
    data: GoodsData
    msg: string;
    status: number
}
// 获取商品详情
export const getGoodsDetail = (data: RequestData) => {
    return axios.post<any, GoodsDetailResponseData>(Api.getProduct, data)
}

interface addCartRequestData {
    productId: number;
    count: number
}
type addCartResponseData = {
    data: null
    msg: string;
    status: number
}
// 获取商品详情
export const addCart = (data: addCartRequestData) => {
    return axios.post<any, addCartResponseData>(Api.addCart, data)
}