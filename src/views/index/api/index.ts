import axios from '@/utils/request'

enum Api {
    // 获取轮播图商品
    getList = '/slider/list',
    // 获取商品分类
    getCateList = '/product/category',
    // 推荐商品
    getRecommendList = '/recommend/list',
}

export interface GetListData {
    id: number;
    img: string;
    productId: number;
    name: string;
}
type GetListResponseData = {
    data: GetListData[]
    msg: string;
    status: number
}

// 获取轮播图商品
export const getSliderList = () => {
    return axios.get<any, GetListResponseData>(Api.getList)
}


export interface GetCateListtData {
    categoryId: number;
    categoryName: string;
    categoryDescription: string;
}
type GetCateListResponseData = {
    data: GetCateListtData[]
    msg: string;
    status: number
}

// 获取商品分类
export const getCateList = () => {
    return axios.get<any, GetCateListResponseData>(Api.getCateList)
}



interface RecommendGoodsRequest {
    categoryId?: number
    minPrice?: number
    maxPrice?: number
    search?: string
    pageNum?: number
    pageSize?: number
}
export interface RecommendGoodsData {
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
interface RecommendData {
    total: number;
    list: RecommendGoodsData[];
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
type ResponseData = {
    data: RecommendData
    msg: string;
    status: number
}
// 获取推荐列表
export const getRecommendList = (data: RecommendGoodsRequest = {}) => {
    return axios.get<any, ResponseData>(Api.getRecommendList, { params: data })
}