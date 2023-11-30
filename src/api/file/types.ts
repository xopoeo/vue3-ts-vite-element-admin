export interface FileRequestData {
  // 文件名
  name: string
  // 文件url
  url: string
}

// 文件上传响应数据
export type FileUploadResponseData = ApiResponseData<FileRequestData[]>
