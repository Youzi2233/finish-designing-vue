import axios from '@/utils/request'
import { useUserInfoStore } from '@/store';

enum Api {
    // 获取商品列表
    getMyGoodsList = '/product/list',
    // 删除商品
    delete = '/product/del',
}

type BaseRes = {
    data: string;
    msg: string;
    status: number
}

export interface MyGoodsData {
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
    list: MyGoodsData[];
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

interface MyGoodsRequest {
    shopId: number
    pageNum?: number
    pageSize?: number
}
type MyGoodsRes = {
    data: Data
    msg: string;
    status: number
}

// 获取商品列表
export const getMyGoodsList = (data: MyGoodsRequest) => {
    return axios.get<any, MyGoodsRes>(Api.getMyGoodsList, { params: data })
}


type DelProductReq = {
    id: number
}
// 删除商品
export const deleteProduct = (data: DelProductReq) => {
    return axios.post<any, BaseRes>(Api.delete, data)
}
