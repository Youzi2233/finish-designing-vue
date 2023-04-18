import { defineStore } from 'pinia'
import type { GetCartListData } from '@/views/cart/api/index'
import type { BuyProductData } from '@/views/writeOrder/api/index'
import type { AddressListAddress } from "vant";
import type { Data } from '@/views/login/api/index'
import { getCartList } from '@/views/cart/api/index'

const enum Store {
    UserProfile = 'UserProfile',
    OrderProduct = 'OrderProduct',
    PayProduct = 'PayProduct',
}

// 用户基本信息
export const useUserInfoStore = defineStore(Store.UserProfile, {
    state: (): Data =>
    ({
        id: 0,
        nickname: '',
        signature: '',
        gender: '',
        privilege: "",
        createdAt: "",
        updatedAt: "",
        cartNum: 0
    })
    ,
    actions: {
        resizeState() {
            this.id = 0;
            this.nickname = '';
            this.signature = '';
            this.gender = "";
            this.privilege = ""
            this.createdAt = ""
            this.updatedAt = ""
            this.cartNum = 2
        },
        async getCartSum() {
            try {
                const { data } = await getCartList()
                this.cartNum = data.size > 0 ? data.size : undefined
            } catch (error) {

            }
        }

    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'user_profile',
                storage: localStorage
            }
        ]
    }
})

export interface OrderAddress extends AddressListAddress {
    addressId: number;
    province: string;
    city: string;
    district: string;
    userAddress: string
}
interface OrderList {
    list: GetCartListData[],
    orderAddress: AddressListAddress | {}
}

// 订单页面显示商品信息
export const useOrderProductStore = defineStore(Store.OrderProduct, {
    state: (): OrderList =>
    ({
        list: [],
        orderAddress: {}
    })
    ,
    actions: {
    },
})

interface PayList {
    list: BuyProductData[],
}

// 支付页面显示订单信息
export const usePayProductStore = defineStore(Store.PayProduct, {
    state: (): PayList =>
    ({
        list: [],
    })
    ,
    actions: {
    },
})