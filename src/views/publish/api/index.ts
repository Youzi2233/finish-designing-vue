import axios from '@/utils/request'

enum Api {
    // 添加商品
    add = '/product/add',
    // 编辑商品
    edit = '/product/update',
    // 图片上传
    upload = '/product/upload',
    // 获取分类列表
    getCateList = '/product/category',
    // 根据id查询商品
    getById = '/product/getProduct'
}

type BaseRes = {
    data: string;
    msg: string;
    status: number
}

type AddProductReq = {
    name: string;
    image: string;
    price: number;
    stock: number
}
// 添加商品
export const addProduct = (data: AddProductReq) => {
    return axios.post<any, BaseRes>(Api.add, data)
}

type EditProductReq = {
    id: number
    name: string;
    image: string;
    price: number;
    stock: number
}
// 编辑商品
export const editProduct = (data: EditProductReq) => {
    return axios.post<any, BaseRes>(Api.edit, data)
}

type UploadReq = FormData
// 编辑商品
export const upload = (data: UploadReq) => {
    return axios.post<any, BaseRes>(Api.upload, data)
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
    categoryId: number;
    categoryName: string;
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
    return axios.post<any, GoodsDetailResponseData>(Api.getById, data)
}
