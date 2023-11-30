import { ElMessage } from "element-plus"

type lengthType = number

type validateType = {
  pattern: RegExp
  trigger: string
  message: string
}

type ValidationRule = ElValidate["telReg"] | ElValidate["emailReg"] | ElValidate["passwordReg"]

class ElValidate {
  /** 可输入长度max */
  telLength: lengthType = 11
  passwordLength: lengthType = 20
  shortLength: lengthType = 10
  normalLength: lengthType = 20
  longLength: lengthType = 50
  remarkLength: lengthType = 100
  textareaLength: lengthType = 500

  /** 符合ElForm格式的校验规则 { ...$ElValidate.telReg } */
  telReg: validateType = {
    pattern: /^1[3456789]\d{9}$/,
    trigger: "blur",
    message: "请输入正确的手机号码"
  }
  emailReg: validateType = {
    pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
    trigger: "blur",
    message: "请输入正确的邮箱"
  }
  passwordReg: validateType = {
    pattern: /^[A-Za-z0-9]{6,20}$/,
    trigger: "blur",
    message: "请输入6-20位数字或字母"
  }

  /** 校验值是否符合上述正则 */
  validateValue(value: string | number, validateReg: ValidationRule): Boolean {
    if (!["string", "number"].includes(typeof value)) {
      ElMessage.error("value must be string or number")
      return false
    }
    if (!validateReg.pattern.test(String(value))) {
      ElMessage.error(validateReg.message)
      return false
    }
    return true
  }
}

export default new ElValidate()

// 一致导入命名
// import $ElValidate from "@/utils/tools/el-validate"
