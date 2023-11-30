import { request } from "@/utils/service"

class DictionaryApi {
  getDictData(dictId: string) {
    return request<ApiResponseData<DictOptions[]>>({
      url: `/getDict/byDictId/${dictId}`
    })
  }
}

export default new DictionaryApi()
