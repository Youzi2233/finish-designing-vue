import dayjs from 'dayjs'
import { ref, Ref } from 'vue';

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

// 识别图片颜色
interface ReturnData {
    avgColor: Ref<string | null>;
    error: Ref<Error | null>;
}

export function useImageColor(path: string): Promise<ReturnData> {
    const avgColor = ref<string | null>(null);
    const error = ref<Error | null>(null);

    return new Promise<ReturnData>((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext('2d');
            if (!ctx) {
                error.value = new Error('Failed to get canvas context');
                resolve({ avgColor, error });
                return;
            }

            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixelData = imageData.data;

            let r = 0, g = 0, b = 0;
            for (let i = 0; i < pixelData.length; i += 4) {
                r += pixelData[i];
                g += pixelData[i + 1];
                b += pixelData[i + 2];
            }
            const pixelCount = pixelData.length / 4;
            avgColor.value = `rgb(${Math.round(r / pixelCount)}, ${Math.round(g / pixelCount)}, ${Math.round(b / pixelCount)})`;
            resolve({ avgColor, error });
        };
        img.onerror = (e) => {
            error.value = new Error('Failed to load image');
            resolve({ avgColor, error });
        };
        img.src = path;
    });
}