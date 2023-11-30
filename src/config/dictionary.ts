class Dictionary {
  /**
   * keyCode:字典类型编码 sys-格式
   */
  private data: { [keyCode: string]: DictOptions[] } = {
    // 是否
    "sys-yesOrNo": [
      { label: "是", value: 1 },
      { label: "否", value: 0 }
    ],
    // 每月结算日/付款日
    "sys-settlementDay": [],
    // 申请审核状态
    "sys-apply-review-status": [
      { label: "全部", value: "" },
      { label: "待处理", value: 0 },
      { label: "通过", value: 1 },
      { label: "未通过", value: 2 }
    ]
  }

  constructor() {
    this.data["sys-settlementDay"] = this.settlementDay()
  }

  hasKey(key: string): boolean {
    return key in this.data
  }

  getValue(keyCode: string): DictOptions[] {
    return this.data[keyCode]
  }

  // 生成sys-settlementDay字典
  protected settlementDay(): DictOptions[] {
    const data: DictOptions[] = []
    for (let i = 1; i <= 31; i++) {
      data.push({ label: String(i), value: i })
    }
    return data
  }

  // 输出对应字段label
  public getLabelByKey(keyCode: string, value: number | undefined): string | undefined {
    if (value === undefined) return
    const data = this.data[keyCode]
    if (data) {
      const item = data.find((item) => item.value === value)
      return item ? item.label : undefined
    }
    return undefined
  }
}

export default new Dictionary()

// 部分详情页只需要展示label
export const { getLabelByKey } = Dictionary.prototype

// 一致导入命名
// import $dictionary from "@/config/dictionary"

// private 私有属性和方法 只能在类的内部访问 实例化后/子类都无法访问
// _开头的属性和方法 也是私有的 但是只是一种命名约定 不能实现真正的限制访问
// protected 受保护的属性和方法 只能在类的内部和子类中访问 实例化后无法访问
// public 公共属性和方法 可以在类的内部和外部访问 实例化后也可以访问 默认为public
// super() = 父类prototype.constructor.call(参) 可以向父类传参  super.属性/方法 可以调用父类的属性和方法

// static 静态属性和方法 只能通过类调用  例Promise.resolve()/then()  Math.random()等 且只能访问静态属性和方法 不能访问实例属性和方法

// 抽象类(基类) abstract 不能被实例化 定义的方法只能描述 不能实现 可以使用派生类继承并实现(继承后抽象类的方法必须实现)
