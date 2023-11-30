import { ElMessage, ElMessageBox, ElLoading } from "element-plus"
import dayJs from "dayjs"
import printJS from "print-js"

class utilsFun {
  constructor() {}

  private timer: NodeJS.Timeout | null = null

  /** ElLoading */
  showFullLoading = () => {
    ElLoading.service({ lock: true, text: "加载中...", background: "rgba(0, 0, 0, 0.7)" })
  }
  closeFullLoading = () => {
    ElLoading.service().close()
  }

  /**
   * 删除公共方法
   * @param id id
   * @param message  提示信息
   * @param deleteFun  删除函数
   * @param refreshFun  刷新函数
   */
  handleDeleteCommon = (
    id: number,
    message: string,
    deleteFun: (id: number) => Promise<ApiResponseData<Boolean>>,
    refreshFun: () => void
  ) => {
    ElMessageBox.confirm(`${message},确认删除？`, "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        this.showFullLoading()
        deleteFun(id)
          .then((res: ApiResponseData<Boolean>) => {
            if (res.code === 0) {
              ElMessage.success("删除成功")
              refreshFun()
            }
          })
          .finally(() => {
            this.closeFullLoading()
          })
      })
      .catch(() => {
        ElMessage.warning("已取消删除")
      })
  }

  /**
   * 启用/禁用/注销等公共方法
   * @param id  id
   * @param status  状态
   * @param message  提示信息
   * @param changeFun  更改状态函数
   * @param refreshFun  刷新函数
   */
  handleStatusCommon = (
    id: number,
    status: number,
    message: string,
    changeFun: (id: number, status: number) => Promise<unknown>,
    refreshFun: () => void
  ) => {
    ElMessageBox.confirm(`${message} ？`, "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        this.showFullLoading()
        changeFun(id, status)
          .then(() => {
            ElMessage.success("修改状态成功")
            refreshFun()
          })
          .finally(() => {
            this.closeFullLoading()
          })
      })
      .catch(() => {
        ElMessage.warning("已取消修改")
      })
  }

  /**
   * 导入Excel公共方法
   * @importExcelApi 导入接口
   * @refreshFun 刷新函数
   */
  handleImportExcelCommon = async (importExcelApi: (file: FormData) => Promise<unknown>, refreshFun: () => void) => {
    const input = document.createElement("input")
    input.setAttribute("type", "file")
    input.setAttribute("accept", ".xls, .xlsx")
    input.click()
    const file = await new Promise<File>((resolve) => {
      input.onchange = () => {
        const files = input.files
        if (files && files.length > 0) {
          resolve(files[0])
        }
      }
    })
    const form = new FormData()
    form.append("file", file)
    this.showFullLoading()
    importExcelApi(form)
      .then(() => {
        ElMessage.success("导入成功")
        refreshFun()
      })
      .finally(() => {
        this.closeFullLoading()
      })
  }

  /**
   * 延时执行
   * @param ms  延时时间
   */
  delay = (ms: number): Promise<void> => {
    return new Promise((resolve) => {
      this.timer = setTimeout(() => {
        resolve()
        this.timer = null
      }, ms)
    })
  }

  /**
   * 时间格式转换
   * @param time 时间
   * @params format 格式
   */
  timeFormat = (time: string | number, format: string = "YYYY-MM-DD HH:mm:ss") => {
    if (typeof time === "number") return dayJs(time).format(format)
    const parsedDate = dayJs(time)
    // 解析是否为有效的时间
    if (parsedDate.isValid()) {
      return dayJs(parsedDate.valueOf()).format(format)
    } else {
      console.error("Invalid date format")
      return null
    }
  }

  /**
   * 文件流下载
   * @param id 下载函数入参id
   * @param fileName 文件名
   * @param downloadFun 下载函数  返回二进制
   * @param fileType 文件类型
   * @param isPreview 是否预览
   * @param isDownload 是否下载
   * @param isPrint 是否打印
   */
  fileGenerate = async (
    id: number,
    fileName: string,
    downloadFun: (id: number) => Promise<BlobPart>,
    fileType: string = "pdf",
    isPreview: boolean = true,
    isDownload: boolean = true,
    isPrint: boolean = false
  ): Promise<string> => {
    try {
      this.showFullLoading()

      const res = await downloadFun(id)
      const blob = new Blob([res], { type: `application/${fileType}` })
      const objectUrl = URL.createObjectURL(blob)

      this.closeFullLoading()

      if (isDownload) {
        const a = document.createElement("a")
        a.setAttribute("href", objectUrl)
        a.setAttribute("download", `${fileName}.${fileType}`)
        a.click()
      }

      if (isPreview) {
        window.open(objectUrl)
      }

      if (isPrint) {
        printJS(objectUrl)
      }

      return objectUrl
    } catch (error) {
      ElMessage.error("生成失败，请重试")
      this.closeFullLoading()
      return ""
    }
  }

  /**
   * 打印文件
   * @param  url 文件地址
   */
  printFile = async (url: string) => {
    printJS(url)
  }

  /**
   * 生成随机文件名
   */
  createRandomFileName() {
    let str = ""
    str = Math.random().toString(36).substr(3)
    str += Date.now().toString(16).substr(4)
    return str
  }
}

export default new utilsFun()

// 一致导入命名
// import $utilsFun from "@/utils/tools/utilsFun"
