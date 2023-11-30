// import { request } from "@/utils/service"
import axios from "axios"
import type * as File from "./types"

/**
 * 上传文件
 * @param file
 */
export function uploadFileApi(file: File) {
  const formData = new FormData()
  formData.append("file", file)
  // 使用风筝图床: www.imgbed.link api调用文档：https://apifox.com/apidoc/shared-cb690d67-91ea-4ba2-bbd4-5224c7cca56f/doc-1154022
  return axios.post("https://imgbed.link/imgbed/file/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}
