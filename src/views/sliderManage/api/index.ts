import axios from '@/utils/request'

enum Api {
    // 获取轮播图列表
    getSliderList = '/slider/list',
    // 添加轮播图
    add = '/slider/add',
    // 删除轮播图
    delete = '/slider/del',
    // 获取商品列表
    getGoodsList = '/product/list'
}

type BaseRes = {
    data: null;
    msg: string;
    status: number
}

export interface SliderListData {
    id: number;
    img: string;
    name: string;
    productId: number;
}
type ResponseData = {
    data: SliderListData[]
    msg: string;
    status: number
}
// 获取轮播图列表
export const getSliderList = () => {
    return axios.get<any, ResponseData>(Api.getSliderList)
}

type AddSliderReq = {
    productId: number
}
// 添加轮播图
export const addSlider = (data: AddSliderReq) => {
    return axios.post<any, BaseRes>(Api.add, data)
}

type DelSliderReq = {
    sliderId: number
}
// 删除轮播图
export const deleteSlider = (data: DelSliderReq) => {
    return axios.post<any, BaseRes>(Api.delete, data)
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
type GoodsRes = {
    data: Data
    msg: string;
    status: number
}
// 获取商品列表
export const getGoodsList = (data: GoodsRequest = {}) => {
    return axios.get<any, GoodsRes>(Api.getGoodsList, { params: data })
}