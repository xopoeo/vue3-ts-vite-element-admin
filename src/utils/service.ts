import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios"
import { useUserStoreHook } from "@/store/modules/user"
import { ElMessage } from "element-plus"
import { get, merge } from "lodash-es"
import { getToken } from "./cache/cookies"

function logout() {
  useUserStoreHook().logout()
  // location.reload();
}

/**
 *  @param {Set} requestSet 请求的唯一标识集合
 *  @param {Map} requestMap 请求的配置信息、url 和时间戳
 *  @param {number} requestInterval 间隔时间(ms) 小于此时间视为重复提交
 *  @param {Array} methodList 需要处理的请求类型数组
 *  @param {Array} whiteList 需要处理的请求类型白名单api
 */
const requestSet = new Set<string>()
const requestMap = new Map<string, { url: string; timestamp: number }>()
const requestInterval = 1000
const methodList = ["post", "put"]
const whiteList = [""]
const NOT_FOUND = Symbol()

/** 获取请求的唯一标识 */
function getRequestIdentifier(config: AxiosRequestConfig): string | typeof NOT_FOUND {
  if (methodList.includes(config.method as string) && !whiteList.includes(config.url as string)) {
    return `${config.method}-${config.url}`
  }
  return NOT_FOUND
}

function createService() {
  const service = axios.create()

  service.interceptors.request.use(
    (config) => {
      const requestIdentifier = getRequestIdentifier(config)

      if (requestIdentifier !== NOT_FOUND) {
        const currentTime = Date.now()
        if (requestSet.has(requestIdentifier)) {
          const previousRequest = requestMap.get(requestIdentifier)

          logRequestDetails(previousRequest, currentTime, requestInterval)

          if (currentTime - previousRequest!.timestamp <= requestInterval) {
            const message = "数据正在处理，请勿重复提交"
            ElMessage.error(message)
            return Promise.reject(new Error(message))
          }
        }

        requestSet.add(requestIdentifier)
        requestMap.set(requestIdentifier, {
          timestamp: currentTime,
          url: config.url as string
        })
      }

      return config
    },
    (error) => Promise.reject(error)
  )

  service.interceptors.response.use(
    (response) => {
      const requestIdentifier = getRequestIdentifier(response.config)

      if (requestIdentifier !== NOT_FOUND) {
        requestSet.delete(requestIdentifier)
        requestMap.delete(requestIdentifier)
      }

      const apiData = response.data
      const responseType = response.request?.responseType

      // 二进制数据则直接返回
      if (responseType === "blob" || responseType === "arraybuffer") {
        return apiData
      }

      const code = apiData.code

      if (code === undefined) {
        ElMessage.error("非本系统的接口")
        return Promise.reject(new Error("非本系统的接口"))
      }

      switch (code) {
        case 0:
          // 本系统采用 code === 0 来表示没有业务错误
          return apiData
        case 401:
          return logout()
        default:
          ElMessage.error(apiData.message || apiData.msg || "Error")
          return Promise.reject(new Error("Error"))
      }
    },
    (error) => {
      const requestIdentifier = getRequestIdentifier(error.config)

      if (requestIdentifier !== NOT_FOUND) {
        requestSet.delete(requestIdentifier)
        requestMap.delete(requestIdentifier)
      }

      const status = get(error, "response.status")

      switch (status) {
        case 400:
          error.message = "请求错误"
          break
        case 401:
          return logout()
        case 403:
          error.message = "拒绝访问"
          break
        case 404:
          error.message = "请求地址出错"
          break
        case 408:
          error.message = "请求超时"
          break
        case 500:
          error.message = "服务器内部错误"
          break
        case 501:
          error.message = "服务未实现"
          break
        case 502:
          error.message = "网关错误"
          break
        case 503:
          error.message = "服务不可用"
          break
        case 504:
          error.message = "网关超时"
          break
        case 505:
          error.message = "HTTP 版本不受支持"
          break
        default:
          break
      }

      ElMessage.error(error.message)
      return Promise.reject(error)
    }
  )

  return service
}

function createRequest(service: AxiosInstance) {
  return function <T>(config: AxiosRequestConfig): Promise<T> {
    const token = getToken()
    const defaultConfig = {
      headers: {
        token: token ? `${token}` : undefined,
        "Content-Type": "application/json"
      },
      timeout: 500000,
      baseURL: import.meta.env.VITE_BASE_API as string,
      data: {}
    }

    // 将默认配置 defaultConfig 和传入的自定义配置 config 进行合并成为 mergeConfig
    const mergeConfig = merge(defaultConfig, config)
    return service(mergeConfig)
  }
}

/** 用于网络请求的实例 */
const service = createService()
/** 用于网络请求的方法 */
export const request = createRequest(service)

/**
 * 打印请求的详细信息
 * @param previousRequest 上一个请求的信息
 * @param currentTime 当前时间
 * @param requestInterval 间隔时间(ms) 小于此时间视为重复提交
 */
function logRequestDetails(previousRequest: any, currentTime: number, requestInterval: number): void {
  console.log(
    `${previousRequest},
    "当前时间",
    ${currentTime},
    "上个重复请求的时间",
    ${previousRequest!.timestamp},
    "间隔",
    ${currentTime - previousRequest!.timestamp},
    "间隔是否满足重复重复请求的定义",
    ${currentTime - previousRequest!.timestamp <= requestInterval}`
  )
}
