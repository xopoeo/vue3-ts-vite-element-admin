declare global {
  /** 字典options */
  interface DictOptions {
    label: string
    value: number | "" // ''兼容部分字典的全部选项
  }
}

export {}
