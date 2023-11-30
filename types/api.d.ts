/** 所有 api 接口的响应数据都应该准守该格式 */
interface ApiResponseData<T> {
  code: number
  data: T
  message: string
}

/** 分页数据的data类型 */
interface PageTableData<T> {
  currentPage: number
  isMore?: any
  items: T
  pageSize: number
  startIndex?: any
  totalNum: number
  totalPage: number
}
