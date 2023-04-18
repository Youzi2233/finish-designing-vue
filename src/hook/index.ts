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