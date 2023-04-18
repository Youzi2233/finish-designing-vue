import axios from '@/utils/request'

enum Api {
    // 支付
    orderPay = '/order/pay',
}


interface OrderPayReq {
    orderId: number;
}

interface OrderPayRes {
    data: null;
    msg: string;
    status: number
}
// 购买商品
export const orderPay = (data: OrderPayReq) => {
    return axios.post<any, OrderPayRes>(Api.orderPay, data)
}
