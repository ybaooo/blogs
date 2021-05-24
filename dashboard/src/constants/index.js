// 环境判断
export const isDev = process.env.NODE_ENV === 'development' ? 1 : 0

export const baseURL = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3007/' : 'https://api.ybaooo.cn/'

// export const baseURL = ''
