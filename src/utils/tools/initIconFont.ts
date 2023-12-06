import { nextTick, defineAsyncComponent } from "vue"
import * as svg from "@element-plus/icons-vue"
import type { App } from "vue"
const SvgIconSecond = defineAsyncComponent(() => import("@/components/SvgIcon/second.vue"))

class iconFont {
  constructor() {}

  // 字体图标cdn
  cssCdnUrlList: Array<string> = [
    "//at.alicdn.com/t/c/font_2298093_rnp72ifj3ba.css",
    "//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
  ]

  // 加载字体图标
  setCssCdn() {
    if (this.cssCdnUrlList.length <= 0) return false
    this.cssCdnUrlList.map((v) => {
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = v
      link.crossOrigin = "anonymous"
      document.getElementsByTagName("head")[0].appendChild(link)
    })
  }

  /**
   * ali cdn字体图标
   */
  private getAliCdnIconFont = (): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      nextTick(() => {
        const styles: any = document.styleSheets
        const sheetsIconList: string[] = []

        Array.from(styles)
          .filter((style: any) => style.href && style.href.includes("at.alicdn.com"))
          .forEach((style: any) => {
            Array.from(style.cssRules)
              .filter(
                (rule: any) =>
                  rule.selectorText && rule.selectorText.includes(".icon-") && rule.selectorText.includes("::before")
              )
              .forEach((rule: any) => {
                sheetsIconList.push(rule.selectorText.substring(1).replace(/::before/gi, ""))
              })
          })

        sheetsIconList.length > 0 ? resolve(sheetsIconList) : reject("未获取到值，请刷新重试")
      })
    })
  }

  /**
   * element-plus svg图标 增加ele-前缀
   */
  private getEleSvgIconFont = () => {
    return new Promise((resolve, reject) => {
      nextTick(() => {
        const icons = svg as Record<string, any>
        const sheetsIconList: string[] = []
        for (const i in icons) {
          sheetsIconList.push(`ele-${icons[i].name}`)
        }
        if (sheetsIconList.length > 0) resolve(sheetsIconList)
        else reject("未获取到值，请刷新重试")
      })
    })
  }

  /**
   * fontawesome 字体图标
   */
  private getFontAwesomeIcons = (): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      nextTick(() => {
        const styles: StyleSheetList = document.styleSheets
        const sheetsList: CSSStyleSheet[] = Array.from(styles).filter(
          (style) => style.href && style.href.includes("netdna.bootstrapcdn.com") && style instanceof CSSStyleSheet
        )

        const sheetsIconList: string[] = []

        sheetsList.forEach((sheet) => {
          Array.from(sheet.cssRules).forEach((rule: any) => {
            const selectorText = rule.selectorText

            if (
              selectorText &&
              selectorText.startsWith(".fa-") &&
              selectorText.indexOf(",") === -1 &&
              /::before/.test(selectorText)
            ) {
              sheetsIconList.push(selectorText.substring(1).replace(/::before/gi, ""))
            }
          })
        })

        sheetsIconList.length > 0 ? resolve(sheetsIconList) : reject("未获取到值，请刷新重试")
      })
    })
  }

  /**
   * 获取字体图标 `document.styleSheets`
   * @method ali 获取阿里字体图标 `<i class="iconfont 图标类名"></i>`
   * @method ele 获取 element plus 自带图标 `<i class="图标类名"></i>`
   * @method ali 获取 fontawesome 的图标 `<i class="fa 图标类名"></i>`
   */
  initIconFont = {
    ali: async () => await this.getAliCdnIconFont(),
    ele: async () => await this.getEleSvgIconFont(),
    awe: async () => await this.getFontAwesomeIcons()
  }

  /**
   * 导出全局注册 element plus svg 图标
   * @param app vue 实例
   * @description 使用：https://element-plus.gitee.io/zh-CN/component/icon.html
   */
  elSvg(app: App) {
    const icons = svg as any
    for (const i in icons) {
      app.component(`ele-${icons[i].name}`, icons[i])
    }
    app.component("SvgIconSecond", SvgIconSecond)
  }
}

export default new iconFont()
// export const initIconFont = iconFont.prototype.initIconFont

// 一致导入命名
// import { initIconFont } from "@/utils/tools/initIconFont"
// import $iconFont from "@/utils/tools/initIconFont"
