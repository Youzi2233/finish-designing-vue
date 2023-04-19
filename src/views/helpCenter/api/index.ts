import axios from '@/utils/request'

enum Api {
    // 请求帮助列表
    getHelpList = '/help/list',
}


type BaseRes = {
    data: null;
    msg: string;
    status: number
}


type HelpListReq = {
    pageNum?: number
    pageSize?: number
}

export interface HelpListData {
    helpId: number
    problem: string;
    answer: string
}
interface HelpList {
    total: number;
    list: HelpListData[];
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

interface HelpListRes {
    data: HelpList
    msg: string
    status: number
}
// 退出登录
export const getHelpList = (data: HelpListReq = {}) => {
    return axios.get<any, HelpListRes>(Api.getHelpList, { params: data })
}