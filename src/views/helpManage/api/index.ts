import axios from '@/utils/request'

enum Api {
    // 获取帮助列表
    getHelpList = '/help/list',
    // 添加帮助
    add = '/help/add',
    // 编辑帮助
    edit = '/help/update',
    // 删除
    delete = '/help/del',
    // 根据id查询帮助
    getHelpById = '/help/getById'
}

type BaseRes = {
    data: null;
    msg: string;
    status: number
}

type AddHelpReq = {
    problem: string
    answer: string
}
// 添加帮助
export const addHelp = (data: AddHelpReq) => {
    return axios.post<any, BaseRes>(Api.add, data)
}

type DelHelpReq = {
    helpId: number
}
// 删除帮助
export const deleteHelp = (data: DelHelpReq) => {
    return axios.post<any, BaseRes>(Api.delete, data)
}

export interface EditHelpReq extends DelHelpReq, AddHelpReq {
}

// 编辑帮助
export const editHelp = (data: EditHelpReq) => {
    return axios.post<any, BaseRes>(Api.delete, data)
}

export interface HelpListData extends AddHelpReq {
    id: number;
}
interface Data {
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
interface HelpRequest {
    pageNum?: number
    pageSize?: number
}
type HelpRes = {
    data: Data
    msg: string;
    status: number
}
// 获取帮助列表
export const getHelpList = (data: HelpRequest = {}) => {
    return axios.get<any, HelpRes>(Api.getHelpList, { params: data })
}