import axios from '@/utils/request'

enum Api {
    // 获取面板数据
    getDashboard = '/data/all',
}

export interface DashboardData {
    // 活跃顾客总数
    activeCustomerCount: number;
    // 近七日订单数量
    orderCount: number[];
    // 订单总数
    orderCountSum: number;
    // 近七日成交额
    orderAmount: number[];
    // 成交总额
    orderAmountSum: number;
    // 近七日新用户数量
    newCustomerCount: number[];
    // 新用户总数
    newCustomerCountSum: number;
    // 商品数量
    productCount: number;
}

interface DashboardRes {
    data: DashboardData;
    msg: string;
    status: number
}
// 获取面板数据
export const getDashboard = () => {
    return axios.get<any, DashboardRes>(Api.getDashboard)
}