import axios from '@/utils/request'

enum Api {
    // 获取商品列表
    getGoodsList = '/product/list',
    // 获取订单数量
    getCount = '/order/getCount'
}

export interface GoodsData {
    id: number;
    image: string;
    name: string;
    price: number;
    sales: number;
    shopId: number;
    status: boolean;
    stock: number;
    createTime: string;
}
interface Data {
    total: number;
    list: GoodsData[];
    pageNum: number;
    pageSize: number;
    size: number;
    startRow: number;
    endRow: number;
    pages: number;
    prePage: number;
    nextPage: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    navigatePages: number;
    navigatepageNums: number[];
    navigateFirstPage: number;
    navigateLastPage: number;
}

interface GoodsRequest {
    categoryId?: number
    minPrice?: number
    maxPrice?: number
    search?: string
    pageNum?: number
    pageSize?: number
}
type ResponseData = {
    data: Data
    msg: string;
    status: number
}
// 获取商品列表
export const getGoodsList = (data: GoodsRequest = {}) => {
    return axios.get<any, ResponseData>(Api.getGoodsList, { params: data })
}


type GetCountRes = {
    data: {
        noPay: number
        noReceive: number
    }
    msg: string;
    status: number
}
// 获取订单数量
export const getCount = () => {
    return axios.get<any, GetCountRes>(Api.getCount)
}