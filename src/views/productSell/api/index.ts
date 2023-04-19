import axios from '@/utils/request'

enum Api {
    // 获取小店订单列表
    getOrderList = '/shop/list',
    // 删除订单
    delete = 'shop/del',
    // 发货
    send = 'shop/send',
}


interface OrderListReq {
    orderStatus: string;
    pageNum: number;
    pageSize?: number
}
export interface OrderListData {
    orderId: number;
    productId: number;
    orderTime: string;
    orderStatus: string;
    orderTotal: number;
    productName: string;
    productImage: string;
    productQuantity: number;
    productPrice: number;
    address: string;
}
interface OrderData {
    total: number;
    list: OrderListData[];
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
interface OrderListRes {
    data: OrderData;
    msg: string;
    status: number
}
// 获取订单列表
export const getOrderList = (data: OrderListReq) => {
    return axios.get<any, OrderListRes>(Api.getOrderList, { params: data })
}


interface DeleteReq {
    orderId: number
}
interface DeleteRes {
    data: null;
    msg: string;
    status: number
}

// 删除订单
export const deleteOrder = (data: DeleteReq) => {
    return axios.post<any, DeleteRes>(Api.delete, data)
}


interface ReceiveReq {
    orderId: number
}
interface ReceiveRes {
    data: null;
    msg: string;
    status: number
}

// 确认收货
export const send = (data: ReceiveReq) => {
    return axios.post<any, ReceiveRes>(Api.send, data)
}

