import { defineStore } from 'pinia'
import type { Data } from '@/views/login/api/index'
import { getCartList } from '@/views/cart/api/index'

const enum Store {
    AdminProfile = 'AdminProfile',
}

// 用户基本信息
export const useAdminStore = defineStore(Store.AdminProfile, {
    state: () =>
    ({
        id: 0,
        adminName: '',
    })
    ,
    actions: {
        resizeState() {
            this.id = 0;
            this.adminName = '';
        },

    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'admin_profile',
                storage: localStorage
            }
        ]
    }
})