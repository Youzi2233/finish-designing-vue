import axios from '@/utils/request'

enum Api {
    // 获取购物车列表
    getCartList = '/cart/list',
    // 改变数量
    changeCount = '/cart/changeCount',
    // 改变选中状态
    changeChecked = '/cart/changeChecked',
    // 删除购物车商品
    delete = '/cart/delete',
    // 获取购物车数量
    cartSize = '/cart/cartSize'
}

export interface GetCartListData {
    id?: number;
    userId: number;
    productId: number;
    quantity: number;
    checked: string;
    name: string;
    image: string;
    price: number;
}
interface Data {
    total: number;
    list: GetCartListData[];
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
type GetCartListResponseData = {
    data: Data
    msg: string;
    status: number
}

// 获取购物车列表
export const getCartList = () => {
    return axios.get<any, GetCartListResponseData>(Api.getCartList)
}


interface ChangeCountRequest {
    cartId: number;
    count: number
}
type ResponseData = {
    data: null
    msg: string;
    status: number
}
// 改变购物车商品数量
export const changeCount = (data: ChangeCountRequest) => {
    return axios.post<any, ResponseData>(Api.changeCount, data)
}


interface ChangeCheckedRequest {
    cartId: number;
    checked: number
}

// 获取购物车商品选中状态
export const changeChecked = (data: ChangeCheckedRequest) => {
    return axios.post<any, ResponseData>(Api.changeChecked, data)
}



interface DeleteCartProductRequest {
    cartId: number;
}
type DeleteResponseData = {
    data: null
    msg: string;
    status: number
}
// 获取购物车商品选中状态
export const deleteCartProduct = (data: DeleteCartProductRequest) => {
    return axios.post<any, DeleteResponseData>(Api.delete, data)
}


type CartSizeRes = {
    data: number
    msg: string;
    status: number
}
// 获取购物车数量
export const getcartSize = () => {
    return axios.get<any, CartSizeRes>(Api.cartSize)
}