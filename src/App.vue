<script lang="ts" setup>
import { h, onMounted } from "vue"
import { useTheme } from "@/hooks/useTheme"
import { ElNotification } from "element-plus"
// 将 Element Plus 的语言设置为中文
import zhCn from "element-plus/es/locale/lang/zh-cn"
import $iconFont from "@/utils/tools/initIconFont"

onMounted(() => {
  /** 初始化图标 */
  $iconFont.setCssCdn()
})

const { initTheme } = useTheme()

/** 初始化主题 */
initTheme()

/** 作者小心思 */
ElNotification({
  title: "Hello",
  type: "success",
  message: h(
    "a",
    { style: "color: teal", target: "_blank", href: "https://github.com/un-pany/v3-admin-vite" },
    "模版引用开源项目v3-admin-vite , 欢迎点击这里支持他一个 star ！"
  ),
  duration: 0,
  position: "bottom-right"
})
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>
