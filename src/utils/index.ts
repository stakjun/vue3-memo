import dayjs from "dayjs"

export const FormatTime = (date: Date | number): string => {
  return dayjs(date).format("YYYY/MM/DD hh:mm")
}

/** 模拟网络请求 */
export const ImitateHttp = (fun: (s: Function, f: Function) => void, timer: number = 1000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fun(resolve, reject)
    }, timer)
  })
}

/** localStorage 读取数据 */
export const localGetItem = (key: string): any => {
  const data_str = localStorage.getItem(key)
  return data_str ? JSON.parse(data_str) : null
}

/** localStorage 设置数据 */
export const localSetItem = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value))
}

/** 产生随机数 */
export const geneId = (): number => {
  return Math.floor(Math.random() * 939874)
}

/** 防抖 */
export const debounce = (fn: Function, delay: number = 500) => {
  let timer: number | null = null;
  return (...args: any) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}