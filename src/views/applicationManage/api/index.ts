import axios from '@/utils/request'

enum Api {
    // 获取申请列表
    getApplicationList = '/admin/listUpgrade',
    // 更改申请状态
    modifyStatus = '/admin/modifyStatus'
}

export interface ApplicationData {
    id: number;
    userId: number;
    status: string;
    updateTime: string;
}
interface Data {
    total: number;
    list: ApplicationData[];
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
interface ApplicationRequest {
    pageNum?: number;
    pageSize?: number
}
type ResponseData = {
    data: Data
    msg: string;
    status: number
}
// 获取商品列表
export const getApplicationList = (data: ApplicationRequest) => {
    return axios.get<any, ResponseData>(Api.getApplicationList, { params: data })
}

interface ModifyStatusRequest {
    upgradeId: number;
    status: string;
}
type BaseRes = {
    data: null
    msg: string;
    status: number
}

// 更改申请状态
export const modifyStatus = (data: ModifyStatusRequest) => {
    return axios.post<any, BaseRes>(Api.modifyStatus, data)
}