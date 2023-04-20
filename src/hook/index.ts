import dayjs from 'dayjs'

export const moneyFormat = (value: number) => {
    const result = String(value * 100)
    const len = result.length
    const prefix = result.substring(0, len - 2)
    const surfix = result.substring(len - 2, len)
    return {
        prefix,
        surfix
    }
}

// 千位数字格式化
export const toThousands = (num: number) => {
    return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
};

// 获取最近 x 天日期
export const getXDate = (day: number) => {
    const result: string[] = []
    const nowTime = new Date();
    for (let i = day - 1; i >= 0; i--) {
        const date = dayjs(nowTime.getTime() - i * 24 * 3600 * 1000).format('MM-DD')
        result.push(date)
    }
    return result
}