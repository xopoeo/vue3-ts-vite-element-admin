<script setup lang="ts">
import { defineAsyncComponent, ref, reactive, onMounted, nextTick, computed, watch } from "vue"
import { PropType } from "vue"
import type { TabsPaneContext } from "element-plus"
import $iconFont from "@/utils/tools/initIconFont"
const IconList = defineAsyncComponent(() => import("@/components/IconSelector/list.vue"))
const SvgIconSecond = defineAsyncComponent(() => import("@/components/SvgIcon/second.vue"))

defineOptions({ name: "iconSelector" })

const props = defineProps({
  // 输入框前置内容
  prepend: {
    type: String,
    default: () => "ele-Pointer"
  },
  // 输入框占位文本
  placeholder: {
    type: String,
    default: () => "请输入内容搜索图标或者选择图标"
  },
  // 输入框占位文本
  size: {
    type: String as PropType<"" | "default" | "small" | "large">,
    default: () => "default"
  },
  // 弹窗标题
  title: {
    type: String,
    default: () => "请选择图标"
  },
  // 禁用
  disabled: {
    type: Boolean,
    default: () => false
  },
  // 是否可清空
  clearable: {
    type: Boolean,
    default: () => true
  },
  // 自定义空状态描述文字
  emptyDescription: {
    type: String,
    default: () => "无相关图标"
  },
  modelValue: String
})
const emit = defineEmits(["update:modelValue", "get", "clear"])

// 定义变量内容
const inputWidthRef = ref()
const state = reactive({
  fontIconPrefix: "",
  fontIconWidth: 0,
  fontIconSearch: "",
  fontIconPlaceholder: "",
  fontIconTabActive: "ali",
  fontIconList: {
    ali: [],
    ele: [],
    awe: []
  }
})

// 处理 input 获取焦点时，modelValue 有值时，改变 input 的 placeholder 值
const onIconFocus = () => {
  if (!props.modelValue) return false
  state.fontIconSearch = ""
  state.fontIconPlaceholder = props.modelValue
}

// 处理 input 失去焦点时，为空将清空 input 值，为点击选中图标时，将取原先值
const onIconBlur = () => {
  const list = fontIconTabNameList()
  setTimeout(() => {
    const icon = list.filter((icon: string) => icon === state.fontIconSearch)
    if (icon.length <= 0) state.fontIconSearch = ""
  }, 300)
}

// 图标搜索及图标数据显示
const fontIconSheetsFilterList = computed(() => {
  const list = fontIconTabNameList()
  if (!state.fontIconSearch) return list
  const search = state.fontIconSearch.trim().toLowerCase()
  return list.filter((item: string) => {
    if (item.toLowerCase().indexOf(search) !== -1) return item
  })
})

// 根据 tab name 类型设置图标
const fontIconTabNameList = () => {
  let iconList: any = []
  if (state.fontIconTabActive === "ali") iconList = state.fontIconList.ali
  else if (state.fontIconTabActive === "ele") iconList = state.fontIconList.ele
  else if (state.fontIconTabActive === "awe") iconList = state.fontIconList.awe
  return iconList
}

// 处理 icon 双向绑定数值回显
const initModeValueEcho = () => {
  const { modelValue, placeholder } = props
  if (!modelValue) {
    state.fontIconPlaceholder = placeholder
  } else {
    state.fontIconPlaceholder = state.fontIconPrefix = modelValue
  }
}

// 处理 icon 类型，用于回显时，tab 高亮与初始化数据
const initFontIconName = () => {
  let name = "ali"
  if (props.modelValue!.indexOf("iconfont") > -1) name = "ali"
  else if (props.modelValue!.indexOf("ele-") > -1) name = "ele"
  else if (props.modelValue!.indexOf("fa") > -1) name = "awe"
  // 初始化 tab 高亮回显
  state.fontIconTabActive = name
  return name
}
// 初始化数据
const initFontIconData = async (name: string) => {
  if (name === "ali") {
    // 阿里字体图标使用 `iconfont xxx`
    if (state.fontIconList.ali.length > 0) return
    await $iconFont.initIconFont.ali().then((res: any) => {
      state.fontIconList.ali = res.map((i: string) => `iconfont ${i}`)
    })
  } else if (name === "ele") {
    // element plus 图标
    if (state.fontIconList.ele.length > 0) return
    await $iconFont.initIconFont.ele().then((res: any) => {
      state.fontIconList.ele = res
    })
  } else if (name === "awe") {
    // fontawesome字体图标使用 `fa xxx`
    if (state.fontIconList.awe.length > 0) return
    await $iconFont.initIconFont.awe().then((res: any) => {
      state.fontIconList.awe = res.map((i: string) => `fa ${i}`)
    })
  }

  state.fontIconPlaceholder = props.placeholder
  // 初始化双向绑定回显
  initModeValueEcho()
}

// 图标点击切换
const onIconClick = (pane: TabsPaneContext) => {
  initFontIconData(pane.paneName as string)
  inputWidthRef.value.focus()
}

// 获取当前点击的 icon 图标
const onColClick = (v: string) => {
  state.fontIconPlaceholder = v
  state.fontIconPrefix = v
  emit("get", state.fontIconPrefix)
  emit("update:modelValue", state.fontIconPrefix)
  inputWidthRef.value.focus()
}

// 清空当前点击的 icon 图标
const onClearFontIcon = () => {
  state.fontIconPrefix = ""
  emit("clear", state.fontIconPrefix)
  emit("update:modelValue", state.fontIconPrefix)
}

// 获取 input 的宽度
const getInputWidth = () => {
  nextTick(() => {
    state.fontIconWidth = inputWidthRef.value.$el.offsetWidth
  })
}

// 监听页面宽度改变
const initResize = () => {
  window.addEventListener("resize", () => {
    getInputWidth()
  })
}
// 监听双向绑定 modelValue 的变化
watch(
  () => props.modelValue,
  () => {
    initModeValueEcho()
    initFontIconName()
  }
)

onMounted(() => {
  initFontIconData(initFontIconName())
  initResize()
  getInputWidth()
})
</script>

<template>
  <div class="icon-selector" style="width: 100%; height: 100%">
    <el-input
      v-model="state.fontIconSearch"
      :placeholder="state.fontIconPlaceholder"
      :clearable="clearable"
      :disabled="disabled"
      :size="size"
      ref="inputWidthRef"
      @clear="onClearFontIcon"
      @focus="onIconFocus"
      @blur="onIconBlur"
    >
      <template #prepend>
        <SvgIconSecond
          :name="state.fontIconPrefix === '' ? prepend : state.fontIconPrefix"
          class="font14"
          v-if="
            state.fontIconPrefix === '' ? prepend?.indexOf('ele-') > -1 : state.fontIconPrefix?.indexOf('ele-') > -1
          "
        />
        <i v-else :class="state.fontIconPrefix === '' ? prepend : state.fontIconPrefix" class="font14" />
      </template>
    </el-input>
    <el-popover
      placement="bottom"
      :width="state.fontIconWidth"
      transition="el-zoom-in-top"
      popper-class="icon-selector-popper"
      trigger="click"
      :virtual-ref="inputWidthRef"
      virtual-triggering
    >
      <template #default>
        <div class="icon-selector-warp">
          <div class="icon-selector-warp-title">{{ props.title }}</div>
          <el-tabs v-model="state.fontIconTabActive" @tab-click="onIconClick">
            <el-tab-pane lazy label="ali" name="ali">
              <IconList
                :list="fontIconSheetsFilterList"
                :empty="emptyDescription"
                :prefix="state.fontIconPrefix"
                @get-icon="onColClick"
              />
            </el-tab-pane>
            <el-tab-pane lazy label="ele" name="ele">
              <IconList
                :list="fontIconSheetsFilterList"
                :empty="emptyDescription"
                :prefix="state.fontIconPrefix"
                @get-icon="onColClick"
              />
            </el-tab-pane>
            <el-tab-pane lazy label="awe" name="awe">
              <IconList
                :list="fontIconSheetsFilterList"
                :empty="emptyDescription"
                :prefix="state.fontIconPrefix"
                @get-icon="onColClick"
              />
            </el-tab-pane>
          </el-tabs>
        </div>
      </template>
    </el-popover>
  </div>
</template>
